import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import { getPostBySlug, getPublishedPosts } from "@/lib/insights";
import { siteConfig } from "@/lib/constants";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/insights/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const posts = await getPublishedPosts();
  const currentIndex = posts.findIndex((p) => p.slug === post.slug);
  const newer = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const older =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : undefined;

  return (
    <Container className="py-16 md:py-24">
      <FadeIn className="mx-auto max-w-3xl">
        <header>
          <Badge variant="outline" className="mb-4 w-fit">
            {post.category}
          </Badge>
          <h1 className="heading-page">{post.title}</h1>
          <p className="mt-3 text-xl text-muted-foreground">{post.summary}</p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </header>

        {/*
          Body is compiled from trusted local markdown at build time. The
          `remark-rehype` step runs without `allowDangerousHtml`, so raw HTML in
          a post is stripped rather than rendered — see `@/lib/markdown`.
        */}
        <div
          className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-cyan prose-pre:bg-muted prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.tags && post.tags.length > 0 ? (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}

        {(newer || older) ? (
          <nav
            aria-label="Adjacent insights"
            className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {older ? (
              <Link
                href={`/insights/${older.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand-cyan/40"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Previous
                </span>
                <span className="mt-1 block font-medium">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/insights/${newer.slug}`}
                className="rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-brand-cyan/40"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Next
                </span>
                <span className="mt-1 block font-medium">{newer.title}</span>
              </Link>
            )}
          </nav>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="lg">
            <Link href="/insights">All insights</Link>
          </Button>
        </div>
      </FadeIn>
    </Container>
  );
}
