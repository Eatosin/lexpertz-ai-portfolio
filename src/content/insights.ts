/**
 * Backwards-compatible accessor for the insights catalog.
 *
 * The catalog is now derived from markdown files in `content/insights/` (see
 * `@/lib/insights`) rather than being hand-maintained here. This module keeps the
 * original `getInsights` / `getInsightBySlug` surface so existing consumers —
 * `/insights`, `sitemap.ts`, and the homepage preview — keep working unchanged.
 *
 * `InsightPost` extends `InsightSurface` with the compiled `html` body and a
 * `draft` flag. Neither belongs in a list view or a sitemap entry, so this
 * module projects down to the metadata-only shape.
 */

import type { InsightSurface } from "./types";
import type { InsightPost } from "@/lib/insights";

import { getInsightPosts } from "@/lib/insights";

/** Drop build-time-only fields to get the metadata-only catalog shape. */
const toSurface = (post: InsightPost): InsightSurface => ({
  slug: post.slug,
  title: post.title,
  summary: post.summary,
  author: post.author,
  publishedAt: post.publishedAt,
  category: post.category,
  coverImage: post.coverImage,
  tags: post.tags,
  readingTimeMinutes: post.readingTimeMinutes,
});

/** Every post on disk, metadata only, newest first. */
export const getInsights = async (): Promise<InsightSurface[]> => {
  const posts = await getInsightPosts();
  return posts.map(toSurface);
};

/** Posts rendered on the index page — drafts are excluded in production. */
export const getPublishedInsights = getInsights;

export const getInsightBySlug = async (
  slug: string,
): Promise<InsightSurface | undefined> => {
  const posts = await getInsightPosts();
  const post = posts.find((p) => p.slug === slug);
  return post ? toSurface(post) : undefined;
};

export type { InsightPost };
