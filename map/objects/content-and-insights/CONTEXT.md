# content-and-insights

Two kinds of content data: typed TypeScript modules in `src/content/`, and markdown posts in `content/insights/` read from disk at build time.

## What holds this cluster together

Static site data is compiled, so it lives in TS and fails at build time. Posts are authored, so they live in markdown and are validated by Zod when read. Both feed the same pages and the same sitemap, but they move differently: an entry is a code change, a post is a file drop.

## Cards

| Card | Open it when |
|---|---|
| [content-modules](content-modules.md) | services, case studies, team, stats, process, roadmap, or nav copy |
| [insight-posts](insight-posts.md) | a markdown post, its frontmatter, draft mode, or the loader |
| [markdown-rendering](markdown-rendering.md) | the HTML a post becomes: sanitizing, headings, tables, figures, reading time |

## Check

`npm run build` — a bad frontmatter field throws with the filename; a missing content slug breaks its detail route. Authoring rules: [blog-pipeline.md](../../../docs/process/blog-pipeline.md).
