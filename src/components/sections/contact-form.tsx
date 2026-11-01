"use client";

import * as React from "react";
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

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CONTACT_EMAIL = "brief@mail.lexpertzai.cc";

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

  const onSubmit = async (values: ContactInput) => {
    setErrorMessage(null);
    setFallbackHref(null);
    const utm = readUtm();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values,
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
          <div className="rounded-lg border border-success/40 bg-success/10 p-6">
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

            <FormField id="name" label="Name" error={errors.name?.message}>
              <Input id="name" placeholder="Your name" {...register("name")} />
            </FormField>

            <FormField id="email" label="Work email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
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

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-input text-brand-cyan focus:ring-brand-cyan"
                {...register("consent")}
              />
              <span>
                I agree to be contacted about this engagement and accept the
                privacy policy.
              </span>
            </label>
            {errors.consent ? (
              <ErrorMessage>{errors.consent.message as string}</ErrorMessage>
            ) : null}

            <Button type="submit" variant="brand" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send the brief"}
            </Button>
          </form>
        )}
      </Container>
    </Section>
  );
}
