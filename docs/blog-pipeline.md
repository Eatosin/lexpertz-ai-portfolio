# Blog Pipeline

How a blog post gets from a prompt to a published page, and how the
`claude-blog` skill suite is wired into OpenCode V2.

---

## 1. Where posts live

Posts are **markdown files with frontmatter**, one per post:

```
content/insights/
├── ai-powered-security-agents.md
└── my-new-post.md
```

The filename (minus `.md`) becomes the URL slug: `my-new-post.md` →
`/insights/my-new-post`.

Nothing is registered by hand. Drop a file in the directory and it appears in
the index, the sitemap, the homepage preview, and prev/next navigation on the
next build.

### Frontmatter contract

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | yes | string | H1. Keep under ~60 chars for SERP. |
| `summary` | yes | string | Meta description + card excerpt. ~155 chars. |
| `publishedAt` | yes | `YYYY-MM-DD` | Validated by regex; a bad format fails the build. |
| `category` | yes | string | Rendered as the card badge. |
| `author` | no | string | Defaults to `Owadokun Tosin Tobi`. |
| `tags` | no | string[] | Rendered as chips; used in `keywords` meta. |
| `coverImage` | no | string | Drives `og:image` + `twitter:image`. |
| `readingTimeMinutes` | no | number | Overrides the computed estimate. |
| `draft` | no | boolean | Default `false`. See below. |
| `slug` | no | string | Overrides the filename-derived slug. |

Invalid frontmatter **throws at build time** with the filename and the Zod
error. This is intentional — a post shipping with `undefined` in its byline is
worse than a failed build.

### Draft mode

`draft: true` posts render in `next dev` so you can preview them, and are
excluded from production builds and the sitemap. They are *not* route-protected
in dev — treat dev as trusted.

---

## 2. Rendering

`src/lib/markdown.ts` compiles markdown to HTML at build time:

```
remark-parse → remark-gfm → remark-rehype → rehype-slug → rehype-autolink-headings → rehype-stringify
```

- **GFM** — tables, strikethrough, task lists, autolinks.
- **Heading slugs** — every `##` gets an `id`, so deep links work.
- **Heading anchors** — headings are wrapped in anchor links for linking to a
  specific section.
- **No raw HTML.** `remark-rehype` runs *without* `allowDangerousHtml`, so
  HTML written inside a post is stripped rather than injected. This is the
  primary safety guarantee for AI-generated content: a post cannot emit markup
  the renderer didn't construct. Verified with an `<img onerror=...>` probe.

Styling uses `@tailwindcss/typography` (`prose` classes) wired to the site's
HSL tokens, so posts follow light/dark automatically. `prose-headings:font-display`
picks up Space Grotesk to match the rest of the site.

**Reading time** is computed from the body at 225 wpm (deliberately slower than
the common 265 figure — technical prose reads slower than the median). Fenced
code blocks and inline code are stripped before counting, since code is scanned
rather than read.

### Adding new markdown features

New syntax (e.g. footnotes) needs a plugin in the `remark` chain plus a version
bump. Check whether `remark-gfm` already covers it before adding a dependency.

---

## 3. Using the blog skills

### Setup

The skill suite is vendored, not committed:

```bash
git clone --depth 1 https://github.com/AgriciDaniel/claude-blog \
  .opencode/vendor/claude-blog
```

`opencode.json` registers `.opencode/vendor/claude-blog/skills` in its `skills`
array, which OpenCode V2 discovers automatically. `.opencode/vendor/` is
gitignored, so **every clone and CI runner needs that git clone step.**

### Writing a post

1. Invoke the skill — either `/blog-write <topic>` in the TUI, or just ask:
   *"write a blog post about X"* and let the router pick it.
2. The skill produces a markdown file. **Write it to `content/insights/`**
   with the frontmatter contract above. The skill's own defaults (author,
   output paths, HTML assumptions) are Claude Code conventions — the filename,
   location, and frontmatter fields are what this site needs.
3. `npm run build` validates frontmatter and prerenders.

### Which skills work here

| Skill | Status | Why |
|---|---|---|
| `blog`, `blog-write`, `blog-rewrite`, `blog-outline`, `blog-brief` | Full | Pure prose generation |
| `blog-analyze`, `blog-seo-check`, `blog-factcheck`, `blog-geo` | Full | Text in, text out |
| `blog-style`, `blog-persona`, `blog-brand` | Full | Write `VOICE.md` / `BRAND.md` at repo root |
| `blog-cannibalization` | Full | Grep-based local mode works |
| `blog-chart` | Full | Emits standalone inline SVG |
| `blog-image` | Degraded | Needs `@ycse/nanobanana-mcp` (Gemini). Fails gracefully — supply hero images manually. |
| `blog-audio`, `blog-notebooklm` | Unused | Google API keys not configured |
| `blog-google`, `blog-decay` | Unused | Needs Search Console / GA4 credentials |
| `blog-translate`, `blog-localize`, `blog-multilingual` | Unused | Site is English-only; no i18n routing yet |

### Known incompatibilities

- **No `/blog <subcommand>` syntax.** V2 uses `slash: true` in frontmatter, not
  the suite's `user-invokable` / `argument-hint`. Skills are invoked as
  `/blog-write`, `/blog-analyze`, etc. — flat, not nested.
- **Repo-root paths.** The suite references `scripts/`, `brain/`, `templates/`
  relative to the *claude-blog* repo root. That's why the vendor clone must stay
  intact rather than being copied into `.opencode/skills/`.
- **`agents/` is not loaded.** The five `blog-*.md` agent files use Claude Code's
  agent schema. Skills that reference delegation to them won't find a subagent.
  Behavior degrades to the main agent doing the work inline.
- **Python 3.11+ via `uv`** is needed by the scripting skills. The site itself
  has no Python dependency.

---

## 4. Checklist for a new post

- [ ] File at `content/insights/<slug>.md`
- [ ] `title`, `summary`, `publishedAt`, `category` present and valid
- [ ] `summary` under ~155 characters
- [ ] Headings form a clean `##`/`###` hierarchy (no skipped levels)
- [ ] `coverImage` set if the post is a feature (drives social cards)
- [ ] At least one internal link to another insight or service page
- [ ] `npm run build` passes
- [ ] Verified at ~375px and ≥1280px
- [ ] `draft: true` while iterating; removed before commit

---

## 5. Architecture notes

```
content/insights/*.md          ← authored here (manual or via skills)
        │
        ▼
src/lib/insights.ts            ← read + validate frontmatter (Zod) + sort
src/lib/markdown.ts            ← markdown → sanitized HTML, reading time
        │
        ├──► app/(marketing)/insights/page.tsx        index
        ├──► app/(marketing)/insights/[slug]/page.tsx detail (SSG)
        ├──► app/page.tsx                             homepage preview (top 3)
        └──► app/sitemap.ts                           SEO
```

Posts are read via `fs` on the **server only**, so any component that needs
them must be a server component. `InsightsPreview` is a client component (it
needs `trackCTA`), so `app/page.tsx` does the read and passes props down.
If you add another client component that needs post data, follow that pattern.

`getInsightPosts` is wrapped in React `cache()` — the index, detail, and
`generateMetadata` all read independently and would otherwise re-read and
re-render the directory multiple times per build.
