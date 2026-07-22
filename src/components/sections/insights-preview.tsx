"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";
import { insights } from "@/content/insights";
import { trackCTA } from "@/lib/analytics";

/** InsightsPreview — published technical blog tiles on the homepage. */
export function InsightsPreview() {
  return (
    <Section id="insights">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            Field Notes
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Architecture decisions, physics-informed MLOps, and agentic patterns.
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Deep technical writing on what I build and why — no listicles,
            no half-baked takes.
          </p>
        </div>
        <FadeIn>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                onClick={() => trackCTA("insight_card", `/insights/${insight.slug}`)}
                className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-brand-cyan/10"
              >
                <Badge variant="outline" className="w-fit">
                  {insight.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground">
                  {insight.title}
                </h3>
                <p className="text-sm text-muted-foreground">{insight.summary}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-2">
                  <span>{insight.author}</span>
                  <span>{insight.readingTimeMinutes} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
