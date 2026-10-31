---
type: process
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
consumes:
  - ../objects/component-library/ui-primitives.md
  - ../objects/component-library/page-sections.md
  - ../objects/design-system/design-tokens.md
produces:
  - ../objects/component-library/page-sections.md
---

# add-page-section

Add a new page block the repository's way: check for a primitive, compose, then wire the page.

## Input → Movement → Output

The input is a design or a copy block. The movement is a reuse check against `docs/standards/reusable-blocks.md`, then either composing existing primitives in `src/components/sections/` or promoting a generic piece into `src/components/ui/`. The output is a thin section mounted by a page, with its data in `src/content/`.

## Why this shape

The repo has survived by composing, not rewriting: every section is primitives plus content. Skipping the reuse check is what produces a third card variant that diverges from the design tokens. The order matters — decide primitive-vs-section before writing JSX, because promoting later means touching every call site.

## Steps

1. Read `docs/standards/reusable-blocks.md`; if a primitive covers it, compose it.
2. If generic and reusable, add it to `src/components/ui/` and export from `src/components/ui/index.ts`; if site-specific, add a section in `src/components/sections/`.
3. Put copy and data in `src/content/*.ts` — never inline page data.
4. Mount it in the page (`src/app/page.tsx` for the homepage).
5. Mobile-first: base classes for ~375px, `sm:`/`md:`/`lg:` upgrades, touch targets ≥44px (`docs/standards/responsive.md`).
6. `npm run build`, then check both breakpoints in both themes.

## If you change this

- **Hits:** a new primitive needs a barrel export or pages cannot import it; a new content module needs a type in `src/content/types.ts`; adding a section to the homepage changes its scroll rhythm.
- **Does not hit:** the sitemap (unless you add a route), the markdown renderer, `content/insights/`.

## Surfaces

| Surface | Role |
|---|---|
| pages | mount the section |
| `docs/standards/reusable-blocks.md` | must be updated when a primitive ships |

## See

- Objects: [ui-primitives](../objects/component-library/ui-primitives.md), [page-sections](../objects/component-library/page-sections.md), [design-tokens](../objects/design-system/design-tokens.md)
- Source: `docs/standards/reusable-blocks.md`
