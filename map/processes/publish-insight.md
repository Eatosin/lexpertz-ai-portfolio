---
type: process
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
consumes:
  - ../objects/content-and-insights/insight-posts.md
  - ../objects/content-and-insights/markdown-rendering.md
produces:
  - ../objects/content-and-insights/insight-posts.md
---

# publish-insight

Turn a draft post into a page that appears in the index, the sitemap, the homepage preview and prev/next.

## Input → Movement → Output

A markdown file with valid frontmatter is the input. The loader validates it with Zod, the sitemap and index pick it up on the next build, and the detail page prerenders it. The output is a live `/insights/<slug>` URL.

## Why this shape

The file *is* the registration: there is no registry to update and no CMS. The price is that frontmatter is a build-breaking contract, so the check sits at the build, not at publish time. Draft mode exists so an unfinished post can be previewed without leaking into the production sitemap.

## Steps

1. Write `content/insights/<slug>.md` with `title`, `summary`, `publishedAt` (`YYYY-MM-DD`), `category`; see the schema at `src/lib/insights.ts:28-42`.
2. Set `draft: true` while iterating — visible in `next dev`, excluded from production and the sitemap.
3. Run `npm run build`; a bad field names the file and the Zod error.
4. Verify the rendered page at ~375px and ≥1280px, including tables and figures (`src/lib/markdown.ts:58,86`).
5. Remove `draft` and commit; the sitemap picks up `publishedAt` as `lastModified` (`src/app/sitemap.ts:58`).

## If you change this

- **Hits:** adding a required frontmatter field breaks every existing post; raw HTML in a post is stripped by design (`src/lib/markdown.ts:18-23`) — use markdown, not tags; a duplicate slug overwrites the route.
- **Does not hit:** `src/content/*` modules, UI primitives, the agent harness.

## Surfaces

| Surface | Role |
|---|---|
| authors / `blog-*` skills | produce the markdown |
| `npm run build` | validates and prerenders |
| crawlers | read the sitemap entry |

## See

- Objects: [insight-posts](../objects/content-and-insights/insight-posts.md), [markdown-rendering](../objects/content-and-insights/markdown-rendering.md)
- Source: `docs/process/blog-pipeline.md`
