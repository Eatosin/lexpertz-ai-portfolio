import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlideUp } from "@/components/motion";
import { getServiceBySlug, services } from "@/content/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return;
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.summary },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const paragraphs = service.body?.split(/\n{2,}/) ?? [];

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <Container className="max-w-5xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All engagements
          </Link>

          <SlideUp className="mt-8 max-w-3xl">
            <Badge variant="outline" className="mb-4 w-fit">
              Engagement
            </Badge>
            <h1 className="heading-page">{service.title}</h1>
            <p className="mt-3 text-xl text-foreground/90">{service.tagline}</p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {service.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {service.engagement ? (
                <span className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {service.engagement}
                </span>
              ) : null}
              {service.durationWeeks ? (
                <span className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {service.durationWeeks} weeks
                </span>
              ) : null}
            </div>
          </SlideUp>

          <div className="mt-12 grid gap-6 md:grid-cols-[1.4fr_1fr] md:gap-10">
            <div className="flex flex-col gap-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-7 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}

              {service.forWhom ? (
                <div className="mt-2 rounded-lg border border-border bg-card p-5">
                  <h2 className="font-mono text-xs uppercase tracking-wide text-brand-cyan">
                    Who it is for
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {service.forWhom}
                  </p>
                </div>
              ) : null}

              {service.investment ? (
                <div className="rounded-lg border border-border bg-card p-5">
                  <h2 className="font-mono text-xs uppercase tracking-wide text-brand-cyan">
                    Investment
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {service.investment}
                  </p>
                </div>
              ) : null}
            </div>

            <aside className="h-fit rounded-xl border border-border bg-card p-6 md:sticky md:top-24">
              <h2 className="heading-card">What you walk away with</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {service.deliverables?.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-2 text-sm leading-6 text-muted-foreground"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan"
                    />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant="brand" size="lg" className="mt-6 w-full">
                <Link href="/contact">Start a conversation</Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Fixed scope agreed before work starts.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
