import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import { getInsightBySlug } from "@/content/insights";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return;
  return { title: insight.title, description: insight.summary };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <Container className="py-16 md:py-24">
      <FadeIn className="mx-auto max-w-3xl">
        <Badge variant="outline" className="mb-4 w-fit">{insight.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {insight.title}
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">{insight.summary}</p>
        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{insight.author}</span>
          <span>·</span>
          <span>{insight.readingTimeMinutes} min read</span>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold mb-3">Article body (placeholder)</h2>
          <p className="text-sm text-muted-foreground">
            The full markdown body for &quot;{insight.title}&quot; will be rendered
            here when it&rsquo;s ready to publish. For now, this page demonstrates the
            slug-based detail layout with proper metadata.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="lg">
            <Link href="/insights">All insights</Link>
          </Button>
        </div>
      </FadeIn>
    </Container>
  );
}