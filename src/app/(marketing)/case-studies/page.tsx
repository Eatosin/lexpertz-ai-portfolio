import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento-card";
import { SlideUp } from "@/components/motion";
import { caseStudies } from "@/content/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Anonymized engagements — real metrics, real clients.",
  openGraph: { title: "Case Studies", description: "Anonymized engagements — real metrics, real clients." },
};

export default function CaseStudiesPage() {
  return (
    <Container className="py-16 md:py-24">
      <SlideUp className="mb-10">
        <Badge variant="outline" className="mb-4 w-fit">Receipts</Badge>
        <h1 className="heading-page">
          Real work. Real metrics.
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          A few anonymized engagements — names are placeholders until NDA
          clearances land. The numbers are not.
        </p>
      </SlideUp>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs, i) => (
          <SlideUp key={cs.slug} delay={i * 0.1}>
            <Link href={`/case-studies/${cs.slug}`} className="block h-full">
              <BentoCard className="h-full">
                <Badge variant="outline" className="w-fit">{cs.industry}</Badge>
                <h2 className="heading-card mt-4">
                  {cs.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {cs.summary}
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-1">
                      <span className="font-mono text-lg font-semibold text-brand-cyan">{m.value}</span>
                      <span className="text-xs text-muted-foreground">{m.label}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </Link>
          </SlideUp>
        ))}
      </div>
    </Container>
  );
}