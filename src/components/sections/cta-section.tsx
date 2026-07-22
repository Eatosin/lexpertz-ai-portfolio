"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackCTA } from "@/lib/analytics";

/** CTASection — high-contrast final close for homepage and landing pages. */
export function CTASection() {
  return (
    <Section variant="hero">
      <Container className="flex max-w-3xl flex-col items-start gap-4">
        <Badge variant="brand">Let's ship</Badge>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Let's Architect Your Intelligence.
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Ready to move beyond basic automation? Whether you need an
          Enterprise RAG pipeline, a self-healing agentic workflow, or a
          specialized AI system — I'm ready to engineer the solution.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            asChild
            variant="brand"
            size="lg"
            onClick={() => trackCTA("closing_cta_primary", "/contact")}
          >
            <Link href="/contact">Book A Free Call</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">View the work</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
