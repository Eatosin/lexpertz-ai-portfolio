"use client";

import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";
import { caseStudies } from "@/content/case-studies";
import { trackCTA } from "@/lib/analytics";

/** CaseStudyCard — previews a single engagement on the homepage. */
export function CaseStudyCard({ slug }: { slug: string }) {
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return null;

  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      onClick={() => trackCTA("case_study_card", `/case-studies/${cs.slug}`)}
      className="block h-full"
    >
      <BentoCard className="h-full">
        <div className="flex h-full flex-col gap-3">
          <Badge variant="outline" className="w-fit">
            {cs.industry}
          </Badge>
          <h3 className="text-xl font-semibold text-foreground">{cs.title}</h3>
          <p className="text-sm text-muted-foreground">{cs.summary}</p>
          <div className="mt-auto grid grid-cols-3 gap-3 pt-4">
            {cs.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <span className="text-lg font-bold text-brand-cyan">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>
    </Link>
  );
}

/** CaseStudiesPreview — homepage section showing top 3 engagements. */
export function CaseStudiesPreview() {
  return (
    <Section id="work">
      <Container>
        <div className="mb-10 flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">
            Engineered Intelligence
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Deployment-ready AI architectures.
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            From autonomous agents to high-frequency quant engines — every
            project is open-source and production-tested.
          </p>
        </div>
        <FadeIn>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} slug={cs.slug} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
