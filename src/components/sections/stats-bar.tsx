"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { StatCard } from "@/components/ui/stat-card";
import { SlideUp } from "@/components/motion";

/**
 * StatsBar — top-line metric strip used on Homepage and About.
 * Numbers are static placeholders — align with real engagements before launch.
 */
const stats = [
  { label: "Citation accuracy", value: "99.9%", hint: "Axiom Engine adversarial verification" },
  { label: "GitHub stars", value: "69+", hint: "Across 19 open-source projects" },
  { label: "Agent speed", value: "<60s", hint: "End-to-end content creation pipeline" },
  { label: "Detection accuracy", value: "100%", hint: "Spectre deepfake audio detection" },
];

export function StatsBar() {
  return (
    <Section variant="muted">
      <Container>
        <SlideUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </SlideUp>
      </Container>
    </Section>
  );
}
