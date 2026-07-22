import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlideUp, FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { team } from "@/content/team";
import { siteConfig } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.founderName} — Physics undergraduate turned AI Architect. Building deterministic LangGraph systems, physics-informed MLOps, and zero-hallucination RAG pipelines.`,
  openGraph: {
    title: "About Lexpertz",
    description: siteConfig.description,
    images: [{ url: "/founder.jpg", width: 800, height: 800 }],
  },
};

export default function AboutPage() {
  const founder = team[0];
  if (!founder) return null;

  return (
    <Container className="py-16 md:py-24">
      <SlideUp className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-4 w-fit">Founder & Lead AI Engineer</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Built by a physicist who makes AI systems reason, act, and self-correct.
        </h1>
      </SlideUp>

      <FadeIn className="mx-auto mt-12 max-w-3xl">
        <div className="relative mb-8 aspect-[3/2] overflow-hidden rounded-lg border border-border">
          <Image
            src={founder.avatar}
            alt={founder.name}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <h2 className="text-2xl font-bold text-foreground">{founder.name}</h2>
        <p className="text-sm text-muted-foreground">{founder.role}</p>
        <p className="mt-4 text-lg text-muted-foreground">{founder.bio}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {founder.socials?.github ? (
            <Button asChild variant="outline" size="sm">
              <Link href={founder.socials.github}>GitHub</Link>
            </Button>
          ) : null}
          {founder.socials?.linkedin ? (
            <Button asChild variant="outline" size="sm">
              <Link href={founder.socials.linkedin}>LinkedIn</Link>
            </Button>
          ) : null}
          {founder.socials?.x ? (
            <Button asChild variant="outline" size="sm">
              <Link href={founder.socials.x}>X</Link>
            </Button>
          ) : null}
        </div>
      </FadeIn>

      <Section id="mission" className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground">Physics-Informed Intelligence</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Lexpertz exists because standard LLMs hallucinate, drift, and break silently in production. I bridge theoretical physics and production MLOps — building deterministic multi-agent LangGraph systems with adversarial verification, physics-informed anomaly detection, and enterprise RAG pipelines that cite their sources line-by-line. Every system I ship is measured against RAGAS telemetry and validated by a prosecutor node that forces retries until faithfulness exceeds 90%. No black boxes. No magic. Just verifiable, auditable intelligence.
        </p>
      </Section>

      <Section id="evolution" className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-6 w-fit">The Evolution Journey</Badge>
        <h2 className="text-2xl font-bold text-foreground">
          From digital marketing to Physics-informed AI architecture.
        </h2>
        <StaggerContainer className="mt-8 flex flex-col gap-6">
          {[
            {
              year: "2018",
              title: "The Foundation",
              body: "Launched Lexpertz Technologies — focused on SEO, digital marketing, and web architecture. The seed of entrepreneurship was planted during what I now call the 'Passive Learning' phase.",
            },
            {
              year: "2023",
              title: "The Catalyst: 2 Weeks to 3 Days",
              body: "Facing a complex Physics concept that traditionally required 14 days to master, I used Generative AI to deconstruct and internalize it in just 72 hours. That moment made the power of AI as a force multiplier undeniable — it became the pivot point of my career.",
            },
            {
              year: "2024",
              title: "The Strategic Pivot",
              body: "Shifted focus from general tech to deep AI Engineering. Began architecting Enterprise RAG pipelines, LangGraph-orchestrated agentic systems, and decision-making AI. Transitioned from using tools to building the intelligence behind them.",
            },
            {
              year: "2025-2026",
              title: "Lexpertz AI: The Visionary Phase",
              body: "The evolution is complete. Architecting SOTA agentic workflows with adversarial verification, physics-informed MLOps, and zero-hallucination RAG pipelines. Shipping open-source projects that prove AI can reason, act, and self-correct — not just generate.",
            },
          ].map((phase) => (
            <StaggerItem key={phase.year}>
              <div className="flex gap-6 rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-cyan/40 bg-brand-cyan/10 text-base font-bold text-brand-cyan">
                  {phase.year}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{phase.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </Container>
  );
}