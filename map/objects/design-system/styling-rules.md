---
type: object
cluster: design-system
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/app/globals.css
---

# Styling rules

The conventions a component must follow: token classes only, the shared heading utilities, mobile-first breakpoints, and the reduced-motion gate.

## Why this shape

Tailwind's utility classes are already the styling API; the extra rules exist to stop three specific drifts — hex literals, one-off headings, and desktop-first layout. The heading utilities (`.heading-page`, `.heading-section`, `.heading-card`, `.eyebrow`) exist so a page cannot invent a fifth type scale; `src/app/globals.css:212` is their home.

## Shape

- Utilities live under `@layer utilities` in `src/app/globals.css:212`.
- Semantic color classes come from `tailwind.config.ts:14`; brand classes from the brand tokens.
- Typography: Space Grotesk display, Geist Sans body, Geist Mono labels, all via `font-display` / `font-sans` / `font-mono` (`tailwind.config.ts:79-85`).
- Prose styling for posts is `@tailwindcss/typography` wired to the same tokens (`src/app/(marketing)/insights/[slug]/page.tsx`).
- Motion gating: `prefers-reduced-motion` via `useReducedMotion`; CSS transitions are gated in `globals.css`.

Citations: `src/app/globals.css:212`

## Connected to

- **owns:** the naming and usage conventions
- **owned-by:** [design-tokens](design-tokens.md) supplies the values
- **joins:** `docs/standards/responsive.md` owns the breakpoint/touch-target rules
- **looks-like-but-is-not:** `docs/design/design-system.md` explains the *why* of the scale; this card only says where the rules are enforced

## If you change this

- **Hits:** renaming a heading utility breaks every page that uses it; adding a hex literal bypasses dark mode; a desktop-first class order regresses mobile.
- **Does not hit:** token values, component props, content data.

## Surfaces

| Surface | Role |
|---|---|
| every component | applies the classes |
| `docs/standards/reusable-blocks.md` | the checklist a new block follows |

## See

- Source: `src/app/globals.css`
- Reference: `docs/design/design-system.md`
