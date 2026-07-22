import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlideUp } from "@/components/motion";
import { siteConfig } from "@/lib/constants";
import { services, getServiceBySlug } from "@/content/services";
import type { Metadata } from "next";

// generateStaticParams for SSG if desired in future — no-op for now.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = (await params);
  const service = getServiceBySlug(slug);
  if (!service) return;
  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = (await params);
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <Container className="py-16 md:py-24">
      <SlideUp>
        <div className="mx-auto max-w-3xl">
          <Badge variant="outline" className="mb-4 w-fit">
            Practice
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">{service.summary}</p>

          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">
              What you'll walk away with
            </h2>
            <ul className="flex flex-col gap-2">
              {service.deliverables?.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan" />
                  {d}
                </li>
              ))}
            </ul>
            {service.durationWeeks ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Typical engagement: {service.durationWeeks} weeks.
              </p>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              asChild
              variant="brand"
              size="lg"
            >
              <Link href="/contact">Start an engagement</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">All practices</Link>
            </Button>
          </div>
        </div>
      </SlideUp>
    </Container>
  );
}