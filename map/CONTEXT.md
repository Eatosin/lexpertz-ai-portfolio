# System map — how to walk it

This folder maps the repository so a cold agent can answer "what is this" and "what else moves" without reading the tree. It cites `src/` and `content/`; it never becomes a second spec.

## Walk order

1. [AGENTS.md](AGENTS.md) — pick the cluster by the change you are making.
2. `objects/<cluster>/CONTEXT.md` — the cluster's cards and the rule that holds them together.
3. One card — read its citation before editing the source.
4. For an actual change, [effects/CONTEXT.md](effects/CONTEXT.md) — first-order blast radius.

One cluster plus one card is the intended read. Never slurp all of `objects/`.

## Universes

| Universe | Meaning | Here |
|---|---|---|
| **live** | in force; implement and cite against it | `src/app`, `src/components/{ui,sections,layout,motion,forms,providers,blog}`, `src/content`, `src/lib`, `content/insights` |
| **leftover** | present, not the main path | `src/components/three/` (its hooks are live; the WebGL scene is unmounted), `public/diagrams/` (post illustration assets) |
| **ghost** | named, not wired | Lenis / `SmoothScrollProvider` / `ScrollMorphHero` claims in older docs; everything in `_archive/` |

## Status and checks

A card is `verified` only with a date, a commit and citations; `stale` is honest. Cluster `_index.md` files are generated with `python -I map/_tools/index.py objects/<cluster>` — never hand-edited.

- `python -I map/_tools/links.py` — every relative link and Inputs path resolves. Site-absolute URLs inside posts are skipped by design; the CI job runs the same check.
- `npm run build` — the only typecheck path in this repo.
