---
type: object
cluster: app-shell
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/app/layout.tsx
---

# Layout and SEO

The root layout owns fonts, providers, navbar/footer, and the default metadata; each route adds only what is different.

## Why this shape

Every page needs the same three fonts, theme provider, motion provider, tooltip provider and chrome. Putting them in `src/app/layout.tsx` means a new route inherits them by existing. Metadata is split the same way: a site-wide default in the root layout plus `siteConfig`, and per-page overrides only where the page has something specific (a canonical URL, a title template, an `og:image`).

## Shape

- Fonts loaded with `next/font/google` and exposed as CSS variables: `--font-geist-sans`, `--font-geist-mono`, `--font-display` (`src/app/layout.tsx:12-28`).
- Providers wrap `children`: `ThemeProvider`, `MotionProvider`, `TooltipProvider` (`src/app/layout.tsx:5-7`).
- Chrome: `Navbar`, `Footer` (`src/app/layout.tsx:8-9`).
- Site identity (`url`, name, social handles) is one object: `src/lib/constants.ts:150`.
- Canonical URLs are built from `siteConfig.url` (`src/app/(marketing)/insights/[slug]/page.tsx:28,35`), never from a request header.

Citations: `src/app/layout.tsx:12`

## Connected to

- **owns:** the `<html>`/`<body>` shell and default metadata
- **owned-by:** `src/lib/constants.ts` supplies `siteConfig`
- **joins:** [design-tokens](../design-system/design-tokens.md) defines the font variables the layout sets
- **looks-like-but-is-not:** `src/app/(marketing)/services/layout.tsx` is a metadata-only segment, not a second shell

## If you change this

- **Hits:** changing `siteConfig.url` changes every canonical URL, every Open Graph URL and every sitemap entry; changing a font variable name breaks `tailwind.config.ts:79-84` and `src/lib/design-tokens.ts:127`; adding a provider here loads it on every route.
- **Does not hit:** page bodies, `src/content/*` values, the markdown renderer.

## Surfaces

| Surface | Role |
|---|---|
| every route | inherits the shell |
| search engines and social cards | read the default metadata and per-page overrides |
| `src/app/sitemap.ts` | reads `siteConfig.url` |

## See

- Source: `src/app/layout.tsx`
- Reference: `docs/design/design-system.md`
