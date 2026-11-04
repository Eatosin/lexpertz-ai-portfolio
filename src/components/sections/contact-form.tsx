"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormField } from "@/components/forms/form-field";
import { ErrorMessage } from "@/components/forms/error-message";
import { contactSchema, type ContactInput } from "@/lib/validators";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/constants";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CONTACT_EMAIL = siteConfig.contactEmail;

/** First-touch attribution: keep the first UTM set this session, ignore later ones. */
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

function mailtoLink(values: ContactInput, utm: Record<string, string>) {
  const subject = `[${values.projectType}] ${values.company || values.name}`;
  const body = [
    values.message,
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "—"}`,
    Object.entries(utm)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n"),
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/** ContactForm — Zod-validated, react-hook-form driven, accessible TRI pattern. */
export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = React.useState<string | null>(null);
  const successRef = React.useRef<HTMLDivElement>(null);

  // Focus the confirmation once it replaces the form. Done in an effect (not
  // in the submit handler) so the handler does not capture a ref during render.
  React.useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (
    values: ContactInput,
    event?: React.BaseSyntheticEvent
  ) => {
    setErrorMessage(null);
    setFallbackHref(null);
    const utm = readUtm();
    // Read the honeypot from the submitted form data rather than a ref:
    // bots fill the field programmatically (no React onChange), so state would
    // stay empty, and reading a ref inside the submit closure trips the
    // react-hooks/refs rule.
    const formData = new FormData(event?.target as HTMLFormElement | undefined);
    const website = String(formData.get("website") ?? "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // The honeypot lives outside react-hook-form: the zod resolver strips
          // unknown keys, so registering it would mean it never reached the API.
          values: { ...values, website },
          utm,
          page: window.location.pathname,
        }),
      });

      if (response.ok) {
        track({
          name: "contact_submit",
          category: "conversion",
          label: values.projectType,
        });
        setSubmitted(true);
        return;
      }

      if (response.status === 503) {
        const href = mailtoLink(values, utm);
        setFallbackHref(href);
        window.location.assign(href);
        return;
      }

      setErrorMessage(
        "The message did not send. Email brief@mail.lexpertzai.cc and I will pick it up there."
      );
    } catch {
      setErrorMessage(
        "The network dropped the message. Email brief@mail.lexpertzai.cc and I will pick it up there."
      );
    }
  };

  return (
    <Section id="contact" variant="muted">
      <Container className="max-w-2xl">
        <div className="mb-8 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            Start a conversation
          </Badge>
          <h1 className="heading-page">
            Let&apos;s architect your intelligence.
          </h1>
          <p className="text-lg text-muted-foreground">
            Direct line to the founder — no salespeople, no bots. I answer
            every serious inquiry within one business day.
          </p>
        </div>

        {submitted ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="rounded-lg border border-success/40 bg-success/10 p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <h2 className="heading-card">Got it — we&apos;ll be in touch.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your brief is in. I reply within one business day. Want to
              fast-track? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-brand-cyan underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            {errorMessage ? (
              <ErrorMessage>
                {errorMessage}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  Send it by email
                </a>
                .
              </ErrorMessage>
            ) : null}

            {fallbackHref ? (
              <div className="rounded-md border border-border bg-background p-4 text-sm text-muted-foreground">
                Your email app should be opening with the brief filled in. If it
                did not,{" "}
                <a href={fallbackHref} className="text-brand-cyan underline">
                  open it here
                </a>
                .
              </div>
            ) : null}

            {/* Honeypot: visually hidden, unfocusable, never announced. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <FormField id="name" label="Name" error={errors.name?.message}>
              <Input
                id="name"
                autoComplete="name"
                placeholder="Your name"
                {...register("name")}
              />
            </FormField>

            <FormField id="email" label="Work email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                {...register("email")}
              />
            </FormField>

            <FormField
              id="company"
              label="Company (optional)"
              error={errors.company?.message}
            >
              <Input
                id="company"
                autoComplete="organization"
                placeholder="Company name"
                {...register("company")}
              />
            </FormField>

            <FormField
              id="projectType"
              label="What do you need?"
              error={errors.projectType?.message}
            >
              <select
                id="projectType"
                aria-label="Project type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...register("projectType")}
              >
                <option value="">Select…</option>
                <option value="audit">AI proof audit</option>
                <option value="rag">Evidence-gated RAG</option>
                <option value="agent">Agent authority & integration</option>
                <option value="retainer">Assurance retainer</option>
                <option value="other">Something else</option>
              </select>
            </FormField>

            <FormField
              id="message"
              label="What's on fire?"
              error={errors.message?.message}
            >
              <textarea
                id="message"
                rows={5}
                placeholder="One paragraph: what you have, what you want, when you need it."
                className="flex w-full rounded-md border border-input bg-background p-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...register("message")}
              />
            </FormField>

            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input
                  id="consent"
                  type="checkbox"
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-input text-brand-cyan focus:ring-brand-cyan"
                  {...register("consent")}
                />
                <span>
                  I agree to be contacted about this engagement and accept the{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-cyan underline underline-offset-4"
                  >
                    privacy policy
                  </Link>
                  .
                </span>
              </label>
              {errors.consent ? (
                <p id="consent-error" role="alert" className="text-sm font-medium text-destructive">
                  {errors.consent.message as string}
                </p>
              ) : null}
            </div>

            <Button type="submit" variant="brand" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send the brief"}
            </Button>
          </form>
        )}
      </Container>
    </Section>
  );
}
