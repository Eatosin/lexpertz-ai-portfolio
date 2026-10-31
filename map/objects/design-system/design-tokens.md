---
type: object
cluster: design-system
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/app/globals.css
---

# Design tokens

HSL CSS variables in `src/app/globals.css`, mapped to Tailwind classes in `tailwind.config.ts`, mirrored as typed constants in `src/lib/design-tokens.ts`.

## Why this shape

A token has to work in three places: a CSS class, a Tailwind theme key, and a chart/inline-style value. CSS variables make the light/dark swap free (the same class resolves to a different value), Tailwind makes the class name authoritative, and the TS mirror gives non-CSS consumers the same values without a second palette. The cost is three edits per token; the benefit is one theme source and no hex literals in components.

## Shape

- Light values on `:root`, dark values under `.dark`, both in `src/app/globals.css:5-104`.
- Brand tokens are separate from shadcn semantic tokens: `--brand-cyan` `187 92% 43%` (`#06b6d4`) and `--brand-blue` (`src/app/globals.css:46-49,94-97`).
- Tailwind maps each variable: `tailwind.config.ts:14-60`; fonts at `tailwind.config.ts:79-85`.
- TS mirror: `colors` (`src/lib/design-tokens.ts:43`), `gradients` (`:77`), `spacing` (`:86`), `radii` (`:97`), `breakpoints` (`:106`), `typography` (`:127`).
- `MotionProvider` and charts read the TS mirror, not CSS.

Citations: `src/lib/design-tokens.ts:43`

## Connected to

- **owns:** the palette and scale values
- **owned-by:** [styling-rules](styling-rules.md) consumes them as classes
- **joins:** `src/app/layout.tsx:12-28` sets the font variables; `src/lib/motion-tokens.ts` follows the same mirror pattern
- **looks-like-but-is-not:** `src/lib/design-tokens.ts` is not generated from CSS — the two drift silently if you edit one

## If you change this

- **Hits:** a renamed variable breaks every `hsl(var(--x))` in `globals.css` and `tailwind.config.ts`; changing `--brand-cyan` changes buttons, links, charts and focus rings at once; adding a token means editing all three files plus the type union.
- **Does not hit:** post markdown (it uses `prose` classes), `content/insights/*`, the sitemap.

## Surfaces

| Surface | Role |
|---|---|
| every component | reads classes that resolve to these variables |
| `GrowthChart` | reads the TS color mirror |
| theme toggle | flips `.dark` |

## See

- Source: `src/app/globals.css`
- Reference: `docs/design/design-system.md`
