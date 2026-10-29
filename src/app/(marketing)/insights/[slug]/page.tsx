import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";
import { AuthorCard, ShareRow } from "@/components/blog";
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
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      // Attribution on the card itself. This does not add followers on its
      // own; it makes the handle visible where the link is shared.
      creator: `@${siteConfig.xHandle}`,
      site: `@${siteConfig.xHandle}`,
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

  const url = `${siteConfig.url}/insights/${post.slug}`;

  /**
   * BlogPosting structured data. `sameAs` ties the author entity to the real
   * profiles, which is the machine-readable half of identity; the visible
   * follow card below is the half that actually converts.
   *
   * Serialization escapes `<` so a title containing `</script>` cannot break
   * out of the tag.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${siteConfig.url}/about`,
      sameAs: [
        siteConfig.founder.x,
        siteConfig.founder.linkedin,
        siteConfig.founder.github,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo-icon.png`,
      },
    },
    image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags?.join(", "),
  };

  return (
    <Container className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/*
        Animation is scoped to the header, not the whole article. `FadeIn` uses
        `viewport.amount: 0.25`, and a long post is many times taller than the
        viewport — 25% of it can never be visible at once, so wrapping the body
        would leave the entire article at `opacity: 0`. Keeping the body static
        also keeps the LCP text and cover image out from behind JS.
      */}
      <article className="mx-auto max-w-3xl">
        <FadeIn>
          <header>
            <Badge variant="outline" className="mb-4 w-fit">
              {post.category}
            </Badge>
            <h1 className="heading-page">{post.title}</h1>
            <p className="mt-3 text-xl text-muted-foreground">{post.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
        </FadeIn>

        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={`${post.title} — cover illustration`}
            width={1200}
            height={630}
            priority
            className="mt-10 w-full rounded-lg border border-border bg-card"
          />
        ) : null}

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

        <FadeIn className="mt-10 border-t border-border pt-8">
          <ShareRow
            title={post.title}
            url={url}
            via={siteConfig.xHandle}
          />
        </FadeIn>

        <AuthorCard className="mt-8" />

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
      </article>
    </Container>
  );
}
