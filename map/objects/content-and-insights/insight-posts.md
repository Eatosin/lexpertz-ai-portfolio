---
type: object
cluster: content-and-insights
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: content/insights
---

# Insight posts

Markdown files in `content/insights/`, one per post; the filename is the slug. `src/lib/insights.ts` validates and loads them, `src/content/insights.ts` projects them for pages.

## Why this shape

Writing a post should not require touching code, so the file is the registration: drop `my-post.md` in and it appears in the index, the sitemap, the homepage preview and prev/next. The counterpart is that the frontmatter is a build-breaking contract — `title`, `summary`, `publishedAt`, `category` are required and Zod-validated per file, because a post with `undefined` in the byline is worse than a failed build.

## Shape

- Directory: `content/insights/*.md`; `POSTS_DIR` is resolved from `process.cwd()` (`src/lib/insights.ts:22`).
- Frontmatter schema: `src/lib/insights.ts:28-42`; required fields plus optional `author`, `tags`, `coverImage`, `readingTimeMinutes`, `draft`, `slug`.
- Loader: `getInsightPosts` (`:63`) and `getPublishedPosts` (`:112`), both wrapped in React `cache()`.
- Projection: `src/content/insights.ts:20` maps a post to `InsightSurface`; `getInsights` (`:33`) and the `getPublishedInsights` alias (`:39`) keep the old consumer surface.
- Draft mode: `draft: true` renders in `next dev`, excluded from production builds and the sitemap.
- Posts are read with `fs`, so the loader must run on the server; client sections receive posts as props (`src/app/page.tsx:19`).

Citations: `src/lib/insights.ts:28`

## Connected to

- **owns:** the post corpus and its frontmatter contract
- **owned-by:** [markdown-rendering](markdown-rendering.md) turns the body into HTML
- **joins:** [routes](../app-shell/routes.md) (`generateStaticParams`), [content-modules](content-modules.md) (projection)
- **looks-like-but-is-not:** `src/content/insights.ts` is metadata only — editing it does not touch a post

## If you change this

- **Hits:** adding a required frontmatter field breaks every existing post until backfilled; changing `POSTS_DIR` breaks the build's file reads; removing `cache()` re-reads the directory per page and per `generateMetadata`.
- **Does not hit:** `src/content/*` modules, UI primitives, design tokens.

## Surfaces

| Surface | Role |
|---|---|
| authors and the `blog-*` skills | write files here |
| `/insights`, `/insights/[slug]`, `/`, `/sitemap.xml` | read via the loader |
| `npm run build` | validates every post |

## See

- Source: `src/lib/insights.ts`
- Reference: `docs/process/blog-pipeline.md`
