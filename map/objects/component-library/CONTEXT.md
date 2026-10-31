# component-library

Every React component, split by role: primitives (`ui/`), page composition (`sections/`), animation (`motion/`), chrome and providers (`layout/`, `providers/`, `blog/`, `forms/`).

## What holds this cluster together

A primitive is generic and content-free — it takes props and renders tokens. A section is thin: it composes primitives plus data from `src/content/*` and is mounted once by a page. Motion lives in its own shelf so a page section never hand-rolls an animation, and `LazyMotion strict` means motion components must use `m.*`, not `motion.*`.

## Cards

| Card | Open it when |
|---|---|
| [ui-primitives](ui-primitives.md) | adding or changing a reusable UI primitive |
| [page-sections](page-sections.md) | composing a page block, or the homepage sections |
| [motion-primitives](motion-primitives.md) | any animation, scroll effect, or reduced-motion fallback |
| [layout-and-providers](layout-and-providers.md) | navbar, footer, theme, motion provider, form chrome |

## Check

`npm run build` for types, then `npm run dev` and look at ~375px and ≥1280px before calling a change done (full rule: [responsive](../../../docs/standards/responsive.md)).
