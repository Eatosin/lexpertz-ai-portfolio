---
type: object
cluster: content-and-insights
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/lib/markdown.ts
---

# Markdown rendering

`src/lib/markdown.ts` compiles a post body to sanitized HTML at build time and estimates reading time.

## Why this shape

Posts can be AI-generated, so the renderer must strip raw HTML rather than trust the author: `remark-rehype` runs without `allowDangerousHtml`, which means `<img onerror=...>` in a post is discarded, not injected. The rest of the chain is the smallest set that gives GFM tables, heading anchors, and figure captions, plus a handful of local rehype plugins for site-specific markup.

## Shape

- Pipeline: `remark` → `remark-gfm` → `remark-rehype` → `rehype-slug` → `rehype-autolink-headings` → `rehype-stringify` (`src/lib/markdown.ts:18-23`).
- Local plugins: `rehypeExternalLinks` (`:35`), `rehypeWrapTables` (`:58`), `rehypeFigures` (`:86`).
- `renderMarkdown` (`:151`) is async and returns an HTML string.
- `estimateReadingTime` (`:186`) counts at 225 wpm, after stripping fenced and inline code (`:177`).

Citations: `src/lib/markdown.ts:151`

## Connected to

- **owns:** body → HTML, reading time
- **owned-by:** [insight-posts](insight-posts.md) calls it from the loader
- **joins:** `@tailwindcss/typography` styles the output; heading ids make deep links work
- **looks-like-but-is-not:** this does not validate frontmatter (that is `src/lib/insights.ts:28`) and does not read files

## If you change this

- **Hits:** adding `allowDangerousHtml` reverses the main safety guarantee; adding a remark plugin can change every post's output; changing the wpm constant changes every displayed reading time; removing `rehypeSlug` breaks anchor links.
- **Does not hit:** the post corpus, frontmatter, routes.

## Surfaces

| Surface | Role |
|---|---|
| `/insights/[slug]` | renders the returned HTML |
| post cards | display the reading time |

## See

- Source: `src/lib/markdown.ts`
- Reference: `docs/process/blog-pipeline.md`
