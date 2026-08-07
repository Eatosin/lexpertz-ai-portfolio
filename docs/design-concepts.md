# Design Concepts — Progress Tracker

Tracks the component concepts dropped into this codebase and the ones
queued for modernization. The goal: every section and primitive on the site
meets the quality bar set by the hero and featured-stats section (distinctive
visual identity, semantic tokens, layered motion, clean composition).

**Status legend**

- ✅ **Shipped** — merged to `main` and live on the site.
- 🔲 **Pending** — concept agreed, not yet implemented.
- 📋 **Proposed** — idea documented, awaiting review.
- ❌ **Dropped** — considered and intentionally skipped.

---

## Shipped

### 1. Scroll-Morph Hero ✅

| | |
|---|---|
| Concept | Replace the WebGL particle hero with a Framer Motion flip-card scene. |
| Behavior | 20 cards assemble scatter → line → circle, morph to a bottom arc on a captured virtual scroll, then shuffle; scroll released at bounds. Hover flips cards. |
| Content | Existing badge / headline / copy / CTAs preserved. |
| Fallback | `prefers-reduced-motion` → static gradient poster with full content. |
| Files | `src/components/ui/scroll-morph-hero.tsx` · `src/components/sections/hero-scroll-morph.tsx` |
| Commit | `8fbe9d9` |

### 2. Featured Stats Section ✅

| | |
|---|---|
| Concept | Replace the removed placeholder `StatsBar` with a headline stats strip + growth chart. |
| Behavior | `Section variant="muted"` after the hero; staggered metric grid + brand-gradient recharts area chart that fades in; custom token-styled tooltip. |
| Content | Headline, 4 metrics, 7-month growth series (`src/content/featured-stats.ts`). |
| Files | `src/components/ui/growth-chart.tsx` · `src/components/sections/featured-stats-section.tsx` · `src/content/featured-stats.ts` |
| Commit | `80ee2f8` |

---

## Pending

### 3. ServicesGrid — Signature Card Interaction 🔲

**Why:** currently generic `BentoCard` + `TiltCard`. Five services are the core
value prop and deserve a distinctive interaction like the hero's flip-cards.

**Concept:** `ServiceCard` primitive with hover flip (front: title + summary →
back: tech stack, deliverables, timeline). Optional scroll-linked entrance
(spring stagger) or a shared animated mesh background tying into the hero's
aesthetic.

**New primitive:** `ServiceCard` (ui) → replaces `BentoCard` + `TiltCard`
in `sections/services-grid.tsx`.

### 4. ProcessTimeline — Living Pipeline 🔲

**Why:** phases are static cards; the scroll-line is the only motion.

**Concept:** each phase reveals KPIs / artifacts on scroll (eval scores,
latency, handoff checklist) — "process as a live dashboard". Reuse `GrowthChart`
as mini sparklines per phase.

**New primitive:** `PhaseCard` (ui) with an artifact slot.

### 5. TeamSection — Founder Anchor 🔲

**Why:** single `SlideUp` only; the founder is the brand anchor.

**Concept:** interactive expertise tags (physics, ML, quant) + scroll-reveal
bio chunks or a radial skill chart echoing the growth-chart aesthetic.

**New primitive:** `RadialProgress` (ui).

### 6. InsightsPreview — Case-Study Cards 🔲

**Why:** flat `glow-border` cards; read as generic blog tiles.

**Concept:** hover reveals a "problem → approach → result" triple; category
color coding; optional reading-progress ring.

### 7. CTASection — Entrance Choreography 🔲

**Why:** uses the hero gradient but has no scroll-triggered entrance.

**Concept:** materialize on scroll (opacity + scale + gradient sweep) synced
with the hero's scroll-release handoff.

### 8. ContactForm — Interaction Polish 🔲

**Why:** functional but static.

**Concept:** focus spring on inputs (brand-cyan ring), submit success burst,
field-level motion using existing motion tokens.

---

## Proposed

- **`ScrollReveal` (ui)** — consolidated `whileInView` + spring + stagger
  config to replace ad-hoc `FadeIn`/`SlideUp`/`Stagger` usage.
- **`MetricSparkline` (ui)** — tiny `GrowthChart` variant (no tooltip, fixed
  height) for inline KPIs on case-study detail pages and process phases.

---

## Roadmap

| # | Concept | Priority | Status |
|---|---------|----------|--------|
| 1 | Scroll-Morph Hero | — | ✅ Shipped |
| 2 | Featured Stats Section | — | ✅ Shipped |
| 3 | ServicesGrid card interaction | Tier 1 | 🔲 Pending |
| 4 | ProcessTimeline living pipeline | Tier 1 | 🔲 Pending |
| 5 | TeamSection founder anchor | Tier 2 | 🔲 Pending |
| 6 | InsightsPreview case cards | Tier 2 | 🔲 Pending |
| 7 | CTASection entrance | Tier 2 | 🔲 Pending |
| 8 | ContactForm polish | Tier 3 | 🔲 Pending |

**How to add a concept:** append a numbered entry to its status section
(pick ✅ / 🔲 / 📋 / ❌), fill the "Concept / Behavior / Files" table, and add
a row to the Roadmap. Keep this file in sync when a PR ships — update status
to ✅ with the commit hash.
