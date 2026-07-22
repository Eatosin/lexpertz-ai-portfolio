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

/** ContactForm — Zod-validated, react-hook-form driven, accessible TRI pattern. */
export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
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
    track({ name: "contact_submit", category: "conversion", label: values.projectType });
    // TODO: route to a server action / emails API — leave as a simulated success for now.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    // eslint-disable-next-line no-console
    console.info("contact submit", { ...values, consent: "[redacted]" });
  };

  return (
    <Section id="contact" variant="muted">
      <Container className="max-w-2xl">
        <div className="mb-8 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            Start a conversation
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let's architect your intelligence.
          </h1>
          <p className="text-lg text-muted-foreground">
            Direct line to the founder — no salespeople, no bots. I answer
            every serious inquiry within one business day.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-lg border border-brand-cyan/40 bg-brand-cyan/10 p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Got it — we'll be in touch.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Check your inbox for a confirmation email and a Calendly link.
              Want to fast-track? Email{" "}
              <a
                href="mailto:tosinowadokun11@gmail.com"
                className="text-brand-cyan underline"
              >
                tosinowadokun11@gmail.com
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
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
                <option value="rag">RAG pipelines</option>
                <option value="agent">Agentic workflows</option>
                <option value="eval">Model evaluation</option>
                <option value="mlops">MLOps</option>
                <option value="strategy">AI strategy</option>
                <option value="other">Other</option>
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
