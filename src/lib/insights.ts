/**
 * Filesystem-backed content loader for insight/blog posts.
 *
 * Posts live as markdown files in `content/insights/` so they can be written
 * and edited without touching TypeScript. Each file carries frontmatter that
 * maps onto `InsightSurface` — see `docs/process/blog-pipeline.md` for the contract.
 *
 * Posts without a `draft: true` flag are included in production builds; draft
 * posts are visible in `next dev` so they can be previewed, and are excluded
 * from the sitemap either way.
 */

import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

import { estimateReadingTime, renderMarkdown } from "@/lib/markdown";
import type { InsightSurface } from "@/content/types";

const POSTS_DIR = path.join(process.cwd(), "content", "insights");

/**
 * Frontmatter contract. Authoring mistakes should fail loudly at build time
 * rather than silently rendering a post with `undefined` in the byline.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  author: z.string().min(1).default("Owadokun Tosin Tobi"),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD"),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  /** Explicit override; otherwise computed from the body. */
  readingTimeMinutes: z.number().int().positive().optional(),
  /** Excluded from production builds and the sitemap. */
  draft: z.boolean().default(false),
  /** Overrides the filename-derived slug. */
  slug: z.string().min(1).optional(),
});

export type InsightPost = InsightSurface & {
  /** Rendered HTML body, ready for display. */
  html: string;
  draft: boolean;
};

/** Stable slug from filename: `my-post.md` → `my-post`. */
const slugFromFilename = (filename: string) =>
  path.basename(filename, path.extname(filename));

const isMarkdown = (filename: string) => filename.endsWith(".md");

/**
 * Read and validate every post on disk.
 *
 * Memoized per request via React `cache` — the insights list page, the detail
 * page, and `generateMetadata` all read posts independently and would
 * otherwise re-read and re-render the whole directory three times.
 */
export const getInsightPosts = cache(async (): Promise<InsightPost[]> => {
  let filenames: string[];

  try {
    filenames = await fs.readdir(POSTS_DIR);
  } catch {
    // No content directory yet — a fresh clone renders an empty index rather
    // than crashing the build.
    return [];
  }

  const posts = await Promise.all(
    filenames
      .filter(isMarkdown)
      .map(async (filename): Promise<InsightPost> => {
        const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
        const { data, content } = matter(raw);

        const parsed = frontmatterSchema.safeParse(data);
        if (!parsed.success) {
          throw new Error(
            `Invalid frontmatter in content/insights/${filename}:\n${parsed.error.message}`,
          );
        }

        const fm = parsed.data;

        return {
          slug: fm.slug ?? slugFromFilename(filename),
          title: fm.title,
          summary: fm.summary,
          author: fm.author,
          publishedAt: fm.publishedAt,
          category: fm.category,
          coverImage: fm.coverImage,
          tags: fm.tags,
          draft: fm.draft,
          readingTimeMinutes:
            fm.readingTimeMinutes ?? estimateReadingTime(content),
          html: await renderMarkdown(content),
        };
      }),
  );

  // Newest first — the insights index is a reverse-chronological feed.
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

/** Published posts only, newest first. */
export const getPublishedPosts = cache(async (): Promise<InsightPost[]> => {
  const posts = await getInsightPosts();
  const includeDrafts = process.env.NODE_ENV !== "production";
  return posts.filter((post) => includeDrafts || !post.draft);
});

export const getPostBySlug = cache(
  async (slug: string): Promise<InsightPost | undefined> => {
    const posts = await getInsightPosts();
    return posts.find((post) => post.slug === slug);
  },
);
