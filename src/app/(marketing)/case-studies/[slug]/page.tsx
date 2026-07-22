import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { SlideUp, FadeIn } from "@/components/motion";
import { getCaseStudyBySlug } from "@/content/case-studies";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return;
  return { title: cs.title, description: cs.summary };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <Container className="py-16 md:py-24">
      <FadeIn className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-4 w-fit">{cs.industry} • {cs.client}</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {cs.title}
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">{cs.summary}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cs.metrics.map((m, i) => (
            <SlideUp key={m.label} delay={i * 0.1}>
              <StatCard {...m} />
            </SlideUp>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg">
            <Link href="/contact">Start a similar engagement</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">All case studies</Link>
          </Button>
        </div>
      </FadeIn>
    </Container>
  );
}