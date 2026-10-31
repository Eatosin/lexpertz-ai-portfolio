---
type: process
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
consumes:
  - ../objects/app-shell/routes.md
  - ../objects/component-library/CONTEXT.md
produces:
  - ../objects/app-shell/layout-and-seo.md
---

# dev-and-build

Take a change from a local dev server to a green build.

## Input → Movement → Output

The tree as edited on disk is the input. `npm run dev` serves it with hot reload; `npm run build` prerenders every static route and insight page, renders the dynamic `[slug]` routes, and typechecks; `npm run lint` runs ESLint. The output is a build that Vercel's CI repeats on push to `main`.

## Why this shape

There is no test framework and no `tsc --noEmit` path here, so `npm run build` is the only typecheck gate. That makes the build the real check: skipping it and pushing means CI fails instead, one step later, with the same error.

## Steps

1. `npm install` once (Node 22+, `package.json:6-8`).
2. `npm run dev` → <http://localhost:3000> (`package.json:6`).
3. Edit; verify visually at ~375px and ≥1280px (`docs/standards/responsive.md`).
4. `npm run build` — typecheck plus prerender of static routes and insight pages; service and case-study detail routes render on demand (`package.json:7`).
5. `npm run lint` (`package.json:9`; CI runs it in `.github/workflows/quality.yml`).

## If you change this

- **Hits:** a changed content slug fails `build` at prerender; a type error surfaces only at step 4; a new route without a sitemap entry builds fine but is absent from `/sitemap.xml`.
- **Does not hit:** the dev server's existing session, the agent harness.

## Surfaces

| Surface | Role |
|---|---|
| developers | run the loop |
| GitHub Actions | repeats steps 1, 4, 5 on push |

## See

- Objects: [routes](../objects/app-shell/routes.md), [layout-and-seo](../objects/app-shell/layout-and-seo.md)
- Source: `package.json`
