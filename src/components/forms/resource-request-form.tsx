"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";
import { ErrorMessage } from "@/components/forms/error-message";
import { resourceSchema, type ResourceInput } from "@/lib/validators";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/constants";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.sessionStorage.getItem("lexpertz_utm");
    if (stored) return JSON.parse(stored) as Record<string, string>;

    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length > 0) {
      window.sessionStorage.setItem("lexpertz_utm", JSON.stringify(found));
    }
    return found;
  } catch {
    return {};
  }
}

type ResourceResponse = {
  downloadUrl?: string;
  emailSent?: boolean;
  error?: string;
};

/**
 * Email-gated request form for the RAG Permission Test Kit.
 *
 * On success the API returns a download URL immediately, so the reader is
 * never blocked by mail delivery. The confirmation makes clear whether the
 * email copy actually sent.
 */
export function ResourceRequestForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);
  const [emailSent, setEmailSent] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResourceInput>({
    resolver: zodResolver(resourceSchema),
    defaultValues: { name: "", email: "", company: "", consent: false },
  });

  const onSubmit = async (
    values: ResourceInput,
    event?: React.BaseSyntheticEvent
  ) => {
    setErrorMessage(null);
    const utm = readUtm();
    const formData = new FormData(event?.target as HTMLFormElement | undefined);
    const website = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: { ...values, website },
          utm,
          page: window.location.pathname,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as ResourceResponse;

      if (response.ok && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setEmailSent(Boolean(data.emailSent));
        setSubmittedEmail(values.email);
        setSubmitted(true);
        track({
          name: "resource_request",
          category: "conversion",
          label: "rag_permission_test_kit",
        });
        return;
      }

      // Resend is not configured: still give the reader the asset, but do not
      // pretend the email copy was sent.
      if (response.status === 503 && data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        setEmailSent(false);
        setSubmittedEmail(values.email);
        setSubmitted(true);
        track({
          name: "resource_request",
          category: "conversion",
          label: "rag_permission_test_kit_fallback",
        });
        return;
      }

      setErrorMessage(
        data.error === "rate_limited"
          ? "Too many requests from this network. Try again in a few minutes."
          : "The request did not send. Email brief@mail.lexpertzai.cc and I will send the kit directly."
      );
    } catch {
      setErrorMessage(
        "The network dropped the request. Email brief@mail.lexpertzai.cc and I will send the kit directly."
      );
    }
  };

  if (submitted && downloadUrl) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-success/40 bg-success/10 p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h2 className="heading-card">Your kit is ready.</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {emailSent
            ? `I also sent a copy to ${submittedEmail}. `
            : `The email copy is not configured right now, so download it below. `}
          Run it against one vendor before the next demo.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track({
                  name: "resource_download",
                  category: "conversion",
                  label: "rag_permission_test_kit",
                })
              }
            >
              Download the PDF
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services/ai-proof-audit">See the audit</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Want the kit applied to your deployment? The{" "}
          <Link href="/services/ai-proof-audit" className="text-brand-cyan underline">
            two-week AI Proof Audit
          </Link>{" "}
          starts with the same test.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {errorMessage ? (
        <ErrorMessage>
          {errorMessage}{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
            Send it by email
          </a>
          .
        </ErrorMessage>
      ) : null}

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="resource-website">Website</label>
        <input id="resource-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <FormField id="resource-name" label="Name" error={errors.name?.message}>
        <Input
          id="resource-name"
          autoComplete="name"
          placeholder="Your name"
          {...register("name")}
        />
      </FormField>

      <FormField id="resource-email" label="Work email" error={errors.email?.message}>
        <Input
          id="resource-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          {...register("email")}
        />
      </FormField>

      <FormField
        id="resource-company"
        label="Company (optional)"
        error={errors.company?.message}
      >
        <Input
          id="resource-company"
          autoComplete="organization"
          placeholder="Company name"
          {...register("company")}
        />
      </FormField>

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            id="resource-consent"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "resource-consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 rounded border-input text-brand-cyan focus:ring-brand-cyan"
            {...register("consent")}
          />
          <span>
            I agree to receive the kit and occasional field notes. I accept the{" "}
            <Link href="/privacy" className="text-brand-cyan underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="resource-consent-error" role="alert" className="text-sm font-medium text-destructive">
            {errors.consent.message as string}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="brand" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send me the kit"}
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        One email with the PDF. No sequence unless you ask for one.
      </p>
    </form>
  );
}
