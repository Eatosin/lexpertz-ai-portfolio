"use client";

import Link from "next/link";

import { CinematicHero } from "@/components/ui/cinematic-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { trackCTA } from "@/lib/analytics";

/**
 * HeroCinematic — full-viewport hero built on the CinematicHero scroll scene.
 *
 * The section pulls itself up over the layout's `pt-16` (via `-mt-16`) so the
 * pinned scene owns the entire viewport while the fixed navbar floats above
 * it — it turns `glass` as soon as the user scrolls (scrollY > 8), so the
 * deep-blue card never sits under a transparent navbar.
 *
 * `prefers-reduced-motion` swaps the scene for a static poster with the same
 * messaging and no JS motion.
 */

const badgeCopy = "Enterprise AI That Ships — Not Just Demos";

const taglineCopy = [
  "We architect AI systems that",
  "reason, act, and self-correct.",
] as const;

const cardCopy = {
  heading: "RAG pipelines, deployed.",
  description:
    "Lexpertz designs enterprise-grade RAG and edge AI systems that turn proprietary data into decisions your teams can trust — observable, auditable, and production-ready.",
};

const ctaCopy = {
  heading: "Ship AI that holds up in production.",
  description:
    "Book a 30-minute architecture review. We'll audit your data layer, identify the highest-ROI AI surface, and leave you with a concrete plan.",
};

function BrandGlowMesh() {
  return (
    <div
      aria-hidden="true"
      className="bg-brand-mesh pointer-events-none absolute inset-0 -z-10"
    />
  );
}

function HeroCTAs({ align = "start" }: { align?: "center" | "start" }) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center gap-4 sm:flex-row"
          : "flex flex-col gap-4 sm:flex-row"
      }
    >
      <Button
        asChild
        variant="brand"
        size="lg"
        className="btn-tactile-brand rounded-xl"
        onClick={() => trackCTA("hero_primary", "/contact")}
      >
        <Link href="/contact">Start Automation</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="btn-tactile-outline rounded-xl"
        onClick={() => trackCTA("hero_secondary", "/case-studies")}
      >
        <Link href="/case-studies">View Solutions</Link>
      </Button>
    </div>
  );
}

/** Static poster used under `prefers-reduced-motion`. */
function StaticCinematicHero() {
  return (
    <section
      aria-label="Hero"
      className="cinematic-hero relative isolate overflow-hidden bg-brand-glow py-24 lg:py-32"
    >
      <BrandGlowMesh />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <Container className="relative flex max-w-3xl flex-col items-start gap-6">
        <Badge variant="brand">{badgeCopy}</Badge>
        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {taglineCopy[0]}{" "}
          <span className="text-gradient-brand">{taglineCopy[1]}</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{ctaCopy.description}</p>
        <HeroCTAs align="start" />
      </Container>
    </section>
  );
}

export function HeroCinematic() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticCinematicHero />;
  }

  return (
    <section aria-label="Hero" className="relative -mt-16">
      <CinematicHero
        brandName="Lexpertz"
        tagline1={taglineCopy[0]}
        tagline2={taglineCopy[1]}
        cardHeading={cardCopy.heading}
        cardDescription={cardCopy.description}
        ctaHeading={ctaCopy.heading}
        ctaDescription={ctaCopy.description}
        primaryCtaLabel="Start Automation"
        primaryCtaHref="/contact"
        secondaryCtaLabel="View Solutions"
        secondaryCtaHref="/case-studies"
      />
    </section>
  );
}
