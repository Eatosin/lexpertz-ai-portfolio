---
type: object
cluster: component-library
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/components/providers
---

# Layout and providers

Persistent chrome (`layout/`), the two client providers (`providers/`), and the small form/blog shelves.

## Why this shape

Chrome and providers are mounted once at the root layout, so they must be safe on every route and must not depend on per-page data. `layout/navbar.tsx` and `layout/mobile-menu.tsx` are client components because they hold scroll/menu state; `footer.tsx` is mostly static.

## Shape

- `layout/navbar.tsx` — fixed, turns `glass` past scrollY > 8; nav items from `src/lib/constants.ts:18`.
- `layout/mobile-menu.tsx`, `layout/footer.tsx` — chrome.
- `providers/ThemeProvider.tsx` — `next-themes` wrapper.
- `providers/MotionProvider.tsx` — `LazyMotion strict` + `domMax` (`src/components/providers/MotionProvider.tsx:15`).
- `blog/` — `author-card`, `share-row` for insight pages.
- `forms/` — `form-field`, `error-message` used by `sections/contact-form.tsx`.

Citations: `src/app/layout.tsx:5-9`

## Connected to

- **owns:** `src/components/{layout,providers,blog,forms}/`
- **owned-by:** `src/app/layout.tsx` mounts providers and chrome
- **joins:** [routes](../app-shell/routes.md) — every route inherits this chrome
- **looks-like-but-is-not:** there is **no** Lenis / `SmoothScrollProvider` in the tree. Older docs claim one; the code has none (`package.json` has no `lenis` dependency)

## If you change this

- **Hits:** adding a provider here loads it on every route; changing navbar height breaks the hero's `-mt-16` pull; changing nav data in `src/lib/constants.ts` changes desktop and mobile menus together.
- **Does not hit:** page bodies, content modules, the sitemap.

## Surfaces

| Surface | Role |
|---|---|
| every route | renders the chrome and provider context |
| `src/app/layout.tsx` | the only mount point |

## See

- Source: `src/components/layout/`
- Docs: `docs/process/development.md`
