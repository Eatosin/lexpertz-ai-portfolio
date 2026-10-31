# Lexpertz AI Portfolio — how this repo is organised

One tree, three kinds of work: the site (`src/`), the published posts (`content/insights/`), and the factory that produces changes (`docs/`, `skills/`, `.opencode/`). The map in `map/` is the catalog over all three.

## The layers

| Layer | Home | Changes |
|---|---|---|
| App code — source of truth | `src/` | per feature |
| Content — published posts | `content/insights/` | per post |
| Factory — rules, reference, harness | `docs/`, `skills/`, `.opencode/`, `opencode.json` | rarely |

`docs/` is itself a shelf with a router: [docs/CONTEXT.md](docs/CONTEXT.md).

## How a change flows

1. Find the change type in [map/effects/CONTEXT.md](map/effects/CONTEXT.md).
2. Open the cards it names — one cluster, at most one card.
3. Edit the source the card cites; update the card in the same change if the shape moved.
4. `npm run build` (the only typecheck path), then check ~375px and ≥1280px.

## Universes

- **live** — in force: `src/app`, `src/components/{ui,sections,layout,motion,forms,providers,blog}`, `src/content`, `src/lib`, `content/insights`.
- **leftover** — present, not the main path: `src/components/three/` (only its hooks are imported; the WebGL scene is unmounted).
- **ghost** — named but not wired: Lenis / `SmoothScrollProvider` / `ScrollMorphHero` in older docs, and everything in `_archive/`.

## Status

Status is what exists on disk. Do not add a status table; if a fact matters, it lives in the file it describes (a card's `status:`, a post's `draft:`, a `check.md`).
