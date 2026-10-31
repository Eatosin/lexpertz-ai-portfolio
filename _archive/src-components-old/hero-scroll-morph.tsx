"use client";

import * as React from "react";
import Link from "next/link";

import { ScrollMorphHero } from "./scroll-morph-hero";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useReducedMotion } from "@/components/three/use-reduced-motion";
import { trackCTA } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * HeroScrollMorph — full-viewport hero built on the ScrollMorphHero animation.
 *
 * Intro phase shows the badge + headline center-stage while the cards assemble
 * into a circle; scrolling morphs the circle into a bottom arc, shuffles it,
 * then releases the page to scroll on. `prefers-reduced-motion` swaps the whole
 * scene for a static gradient poster with the same messaging.
 */

const heroCopy =
  "We architect Enterprise RAG Pipelines and Edge AI solutions that turn data into decision-making power — engineered by a physicist who builds systems that reason, act, and self-correct.";

function HeroIntro({ align = "center" }: { align?: "center" | "start" }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start"
      )}
    >
      <Badge variant="brand">Enterprise AI That Ships — Not Just Demos</Badge>
      <h1
        id="hero-title"
        className="text-balance text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl"
      >
        Innovate. Create.{" "}
        <span className="text-gradient-brand">Excel Intelligently.</span>
      </h1>
    </div>
  );
}

function HeroActions({ align = "center" }: { align?: "center" | "start" }) {
  return (
    <div
      className={cn("flex flex-wrap gap-3", align === "center" && "justify-center")}
    >
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
  );
}

/** Static poster used under `prefers-reduced-motion`. */
function StaticHeroPoster() {
  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden bg-brand-glow py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(at 30% 20%, hsl(187 92% 43% / 0.18) 0px, transparent 50%), radial-gradient(at 70% 80%, hsl(221 83% 53% / 0.18) 0px, transparent 50%)",
        }}
      />
      <Container className="flex max-w-3xl flex-col items-start gap-6">
        <HeroIntro align="start" />
        <p className="max-w-2xl text-lg text-muted-foreground">{heroCopy}</p>
        <HeroActions align="start" />
      </Container>
    </section>
  );
}

export function HeroScrollMorph() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticHeroPoster />;
  }

  return (
    <section aria-label="Hero" className="relative isolate overflow-hidden bg-brand-glow">
      {/* Brand gradient mesh behind the scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(at 30% 20%, hsl(187 92% 43% / 0.18) 0px, transparent 50%), radial-gradient(at 70% 80%, hsl(221 83% 53% / 0.18) 0px, transparent 50%)",
        }}
      />

      {/* Viewport-filling animation stage (navbar is h-16, so main has pt-16) */}
      <div className="relative h-[calc(100svh-4rem)] min-h-[640px] w-full overflow-hidden">
        <ScrollMorphHero
          intro={<HeroIntro />}
          content={
            <div className="pointer-events-auto flex max-w-2xl flex-col items-center gap-6">
              <p className="text-lg text-muted-foreground">{heroCopy}</p>
              <HeroActions />
            </div>
          }
        />
      </div>

      {/* Handoff mask into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
