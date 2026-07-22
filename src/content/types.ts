/**
 * CMS-ready content type schemas for the Lexpertz marketing site.
 *
 * Each interface is shaped to map cleanly to Sanity / Contentful document
 * schemas when the content layer migrates to a headless CMS. Fields use plain
 * string ids and string slugs (not branded ids) so they round-trip without
 * conversion.
 *
 * Convention: every audience-facing record has `slug`, `title`, `summary`,
 * and `publishedAt` fields so list views and SEO helpers can be generic.
 */

export type ServiceSlug =
  | "enterprise-rag"
  | "agentic-workflows"
  | "mlops-infrastructure"
  | "ai-evaluation"
  | "specialized-ai";

export type ServiceSurface = {
  slug: ServiceSlug;
  title: string;
  /** Short marketing tagline shown in navbar dropdown and bento cards. */
  tagline: string;
  /** 1-2 sentence summary for service catalog cards. */
  summary: string;
  /** Optional hero visual (icon name or image path). */
  icon?: string;
  /** Detailed markdown body for the service detail page. */
  body?: string;
  /** Known deliverables (e.g., "Architecture diagram", "Reference implementation"). */
  deliverables?: string[];
  /** Optional estimated engagement length. */
  durationWeeks?: number;
};

export type CaseStudySurface = {
  slug: string;
  title: string;
  client: string;
  /** Industry for filtering (fin-tech, healthcare, B2B SaaS, etc.). */
  industry: string;
  /** 2-3 sentence summary shown on the catalog card. */
  summary: string;
  /** Key outcome metrics — surfaced as `StatCard`s on the detail page. */
  metrics: { label: string; value: string }[];
  /** Hero image or video poster (optional). */
  heroImage?: string;
  /** ISO date string. */
  publishedAt: string;
  /** Markdown body for the detailed case study. */
  body?: string;
  /** Optional tags for cross-linking similar case studies and insights. */
  tags?: string[];
};

export type InsightSurface = {
  slug: string;
  title: string;
  /** 1-2 sentence excerpt that appears on /insights. */
  summary: string;
  /** Author handle — usually the founder but extends to guest authors. */
  author: string;
  /** ISO date string. */
  publishedAt: string;
  /** Cover image for social sharing and insights catalog. */
  coverImage?: string;
  /** Primary category (e.g., "Engineering", "Research", "Migration"). */
  category: string;
  /** Reading time in minutes, computed at author time, not runtime. */
  readingTimeMinutes: number;
  body?: string;
  tags?: string[];
};

export type TeamMemberSurface = {
  slug: string;
  name: string;
  role: string;
  /** Optional secondary descriptor — e.g., "Founder & ML Architect". */
  bio: string;
  /** Headshot path from /public. */
  avatar: string;
  /** Social handles — omitted if not relevant. */
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    email?: string;
  };
};
