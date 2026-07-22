import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/motion";
import { insights } from "@/content/insights";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Sharp opinions on RAG, evals, and agents — mostly after we ship them.",
};

export default function InsightsPage() {
  return (
    <Container className="py-16 md:py-24">
      <SlideUp className="mb-10">
        <Badge variant="outline" className="mb-4 w-fit">Field notes</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Engineering notes from production ML.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          No listicles. No half-baked takes. Just things we learned building
          retrievers, agents, and eval harnesses for real clients.
        </p>
      </SlideUp>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight) => (
          <StaggerItem key={insight.slug}>
            <Link
              href={`/insights/${insight.slug}`}
              className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-brand-cyan/10"
            >
              <Badge variant="outline" className="w-fit">
                {insight.category}
              </Badge>
              <h2 className="text-lg font-semibold text-foreground">
                {insight.title}
              </h2>
              <p className="text-sm text-muted-foreground">{insight.summary}</p>
              <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>{insight.author}</span>
                <span>{insight.readingTimeMinutes} min read</span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Container>
  );
}