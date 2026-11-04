import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { SlideUp, FadeIn } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { caseStudySchema } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return;
  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
    publishedTime: study.publishedAt,
    authors: [siteConfig.founderName],
    tags: study.tags,
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd data={caseStudySchema(study)} />
      <Container className="py-16 md:py-24">
        <FadeIn className="mx-auto max-w-3xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All case studies
          </Link>

          <Badge variant="outline" className="mt-8 flex w-fit">
            {study.industry} · {study.client}
          </Badge>
          <h1 className="heading-page mt-4">{study.title}</h1>
          <p className="mt-3 text-xl text-muted-foreground">{study.summary}</p>
          <time
            dateTime={study.publishedAt}
            className="mt-4 block font-mono text-xs uppercase tracking-wide text-muted-foreground"
          >
            {new Date(study.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {study.metrics.map((metric, index) => (
              <SlideUp key={metric.label} delay={index * 0.1}>
                <StatCard {...metric} />
              </SlideUp>
            ))}
          </div>

          {study.sections?.length ? (
            <div className="mt-12 flex flex-col gap-8">
              {study.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="heading-card mb-3">{section.heading}</h2>
                  <p className="text-base leading-7 text-muted-foreground">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          ) : null}

          {study.tags?.length ? (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Stack">
              {study.tags.map((tag) => (
                <li key={tag}>
                  <span className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="lg">
              <Link href="/contact">Start a similar engagement</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/case-studies">All case studies</Link>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
