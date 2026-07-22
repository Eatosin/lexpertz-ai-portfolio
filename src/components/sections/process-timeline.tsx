"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/motion";

/** ProcessTimeline — left-aligned phases with numeric markers. */
const phases = [
  {
    n: 1,
    title: "Discovery & Eval Audit",
    body:
      "Day 1. We map your stack, audit existing evals (or build an emergency golden set), and write down exactly what we will ship and what we won’t.",
  },
  {
    n: 2,
    title: "Reference Implementation",
    body:
      "Weeks 1-3. A working reference for the chosen practice area — RAG, eval harness, agent scaffold, MLOps topology, or strategic roadmap. Evaluated daily against golden set.",
  },
  {
    n: 3,
    title: "Production Handoff",
    body:
      "Weeks 4-6. We pair with your engineers to land the system in production with on-call runbooks, dashboards, and a regression CI hook.",
  },
  {
    n: 4,
    title: "Open Knowledge Transfer",
    body:
      "Throughout. Every decision is documented in your wiki. We hand off ownership, then leave.",
  },
];

export function ProcessTimeline() {
  return (
    <Section id="process">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            How we work
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From discovery to handoff, in four phases.
          </h2>
        </div>
        <StaggerContainer className="flex flex-col gap-6">
          {phases.map((phase) => (
            <StaggerItem key={phase.n}>
              <div className="flex gap-6 rounded-lg border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-cyan/40 bg-brand-cyan/10 text-base font-bold text-brand-cyan">
                  {String(phase.n).padStart(2, "0")}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {phase.title}
                  </h3>
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    {phase.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
