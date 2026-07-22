"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants";
import { trackCTA } from "@/lib/analytics";

/**
 * Hero — cinematic mesh background with technical brand copy.
 *
 * Stays fully server-renderable — only CSS-driven animation here (mesh-radial,
 * subtle floating glow). Heavy motion work is left to subsequent sections where
 * LazyMotion benefits the bundle.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-glow py-24 lg:py-32"
    >
      {/* Mesh background — pure CSS, no runtime cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(at 30% 20%, hsl(187 92% 43% / 0.18) 0px, transparent 50%), radial-gradient(at 70% 80%, hsl(221 83% 53% / 0.18) 0px, transparent 50%)",
        }}
      />

      <Container className="flex max-w-3xl flex-col items-start gap-6">
        <Badge variant="brand">Enterprise AI That Ships — Not Just Demos</Badge>
        <h1
          id="hero-title"
          className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Innovate. Create.{" "}
          <span className="text-gradient-brand">Excel Intelligently.</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          We architect Enterprise RAG Pipelines and Edge AI solutions that turn
          data into decision-making power — engineered by a physicist who builds
          systems that reason, act, and self-correct.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            asChild
            variant="brand"
            size="lg"
            onClick={() => trackCTA("hero_primary", "/contact")}
          >
            <Link href="/contact">Start Automation</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">View Solutions</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
