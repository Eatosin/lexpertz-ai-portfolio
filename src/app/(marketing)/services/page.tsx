import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { CTASection } from "@/components/sections/cta-section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four ways to make an AI system provable: a two-week proof audit, evidence-gated retrieval, agent authority, and an assurance retainer.",
  alternates: { canonical: "/services" },
};

const ladder = [
  {
    step: "01",
    title: "Audit",
    body: "Two weeks, one system. You get a ranked gap list before committing to a build.",
  },
  {
    step: "02",
    title: "Build",
    body: "A fixed-scope system with citations, an authority model, and the tests that keep it honest.",
  },
  {
    step: "03",
    title: "Assure",
    body: "Monthly evaluation, drift monitoring, and a quarterly pack you can hand to an auditor.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section variant="hero" className="pt-24 md:pt-32">
        <Container>
          <SlideUp className="max-w-3xl">
            <Badge variant="outline" className="mb-5">
              Engagements
            </Badge>
            <h1 className="heading-page">Start with proof. Then build.</h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Most AI systems fail review because nobody can show what they did.
              Every engagement below produces evidence first, then code.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link href="/services/ai-proof-audit">Start with the audit</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to the founder</Link>
              </Button>
            </div>
          </SlideUp>
        </Container>
      </Section>

      <Section>
        <Container>
          <StaggerContainer className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <StaggerItem key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand-cyan/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wide text-brand-cyan">
                      {service.engagement ?? `~${service.durationWeeks ?? 6} weeks`}
                    </span>
                  </div>

                  <h2 className="heading-card mt-4">{service.title}</h2>
                  <p className="mt-2 text-sm font-medium text-foreground/90">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {service.summary}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-cyan">
                    Read the brief
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <SlideUp className="max-w-2xl">
            <h2 className="heading-section">How an engagement starts</h2>
            <p className="mt-3 text-muted-foreground">
              Proof first, because it is the cheapest place to be wrong. The
              audit fee is credited toward a build if you continue within 90 days.
            </p>
          </SlideUp>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ladder.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border bg-background p-6"
              >
                <span className="font-mono text-xs text-brand-cyan">
                  {item.step}
                </span>
                <h3 className="heading-card mt-2">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
