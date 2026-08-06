import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlideUp } from "@/components/motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Axiom Verify",
  description: "LLM answer verification and guardrail platform built by engineers who deploy at scale. Coming soon.",
};

export default function AxiomVerifyPage() {
  return (
    <Container className="py-16 md:py-24">
      <SlideUp className="mx-auto max-w-3xl">
        <Badge variant="brand" className="mb-4 w-fit">Product</Badge>
        <h1 className="heading-page">
          Axiom Verify
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          LLM answer verification and guardrail platform for teams shipping
          retrieval and agentic systems to production.
        </p>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="heading-card mb-3">Coming soon</h2>
          <p className="text-sm text-muted-foreground">
            Axiom Verify is in private beta. Sign up for early access and
            we&rsquo;ll get you a sandbox within a business day.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <Link href="/contact?product=axiom-verify">Request access</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Learn about our foundation services</Link>
          </Button>
        </div>
      </SlideUp>
    </Container>
  );
}