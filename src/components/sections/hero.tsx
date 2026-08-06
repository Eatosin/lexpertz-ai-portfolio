"use client";

import Link from "next/link";
import * as React from "react";
import { useScroll, useTransform } from "framer-motion";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollTransform } from "@/components/motion";
import { SceneCanvas } from "@/components/three";
import { trackCTA } from "@/lib/analytics";

/**
 * Hero — messaging stays fully server-rendered DOM; the WebGL particle field
 * is a decorative enhancement layered behind it.
 *
 * Layer stack (bottom → top):
 * 1. CSS gradient mesh — the always-on static poster (zero cost, loads
 *    before JS, doubles as the reduced-motion fallback).
 * 2. `<SceneCanvas>` — ambient agent/data-flow particle field, mounted only
 *    when visible + motion allowed, faded/scaled out on scroll.
 * 3. Bottom fade mask — hands off to the stats bar cleanly.
 * 4. Real DOM headline, copy, metrics and CTAs.
 */
export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Compositor-friendly exit: opacity + scale (no full-viewport blur filter).
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-glow py-24 lg:py-32"
    >
      {/* Poster — pure CSS, always painted, no runtime cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(at 30% 20%, hsl(187 92% 43% / 0.18) 0px, transparent 50%), radial-gradient(at 70% 80%, hsl(221 83% 53% / 0.18) 0px, transparent 50%)",
        }}
      />

      {/* 3D ambient layer */}
      <ScrollTransform
        aria-hidden="true"
        opacity={canvasOpacity}
        scale={canvasScale}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <SceneCanvas className="opacity-40 md:opacity-100 md:[mask-image:radial-gradient(100%_130%_at_72%_45%,black_55%,transparent_92%)]" />
      </ScrollTransform>

      {/* Handoff mask into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-b from-transparent to-background"
      />

      <Container className="flex max-w-3xl flex-col items-start gap-6">
        <Badge variant="brand">Enterprise AI That Ships — Not Just Demos</Badge>
        <h1
          id="hero-title"
          className="text-balance text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl"
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
