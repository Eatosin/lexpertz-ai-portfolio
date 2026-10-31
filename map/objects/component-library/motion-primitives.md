---
type: object
cluster: component-library
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/components/motion
---

# Motion primitives

Six Framer Motion wrappers in `src/components/motion/`, all exported from one barrel, all required to use `m.*` under `LazyMotion strict`.

## Why this shape

Animation is a cross-cutting concern, so it gets its own shelf and its own barrel. `MotionProvider` loads the `domMax` bundle once in strict mode (`src/components/providers/MotionProvider.tsx:15-19`); inside a strict tree a `motion.div` silently fails, which is why every primitive here imports `m`. Two motion systems coexist: Framer Motion for these primitives, GSAP ScrollTrigger inside `ui/cinematic-hero.tsx`.

## Shape

- Barrel: `src/components/motion/index.ts:1-6`.
- `FadeIn`, `SlideUp`, `StaggerContainer`/`StaggerItem`, `CountUp`, `ScrollTransform`, `TiltCard`.
- Tokens (durations, easings) are not inline: `src/lib/motion-tokens.ts`.
- Reduced motion is read through `useReducedMotion` from `src/components/three/use-reduced-motion.ts` — a live hook that happens to live in the dormant 3D folder.

Citations: `src/lib/motion-tokens.ts:1`

## Connected to

- **owns:** `src/components/motion/*`
- **owned-by:** `MotionProvider` supplies the `LazyMotion` context
- **joins:** [design-tokens](../design-system/design-tokens.md) (motion tokens mirror the same shape)
- **looks-like-but-is-not:** `ui/animated-roadmap.tsx` and `ui/profile-card.tsx` use Framer Motion directly; they are not members of this shelf

## If you change this

- **Hits:** swapping `m` for `motion` in a primitive breaks it at runtime with no type error; changing a token changes every consumer; removing `domMax` (layout projection) breaks `ui/cards-stack`.
- **Does not hit:** server components (they cannot import these), static sections, the GSAP hero scene.

## Surfaces

| Surface | Role |
|---|---|
| `sections/`, `ui/`, marketing pages | consume the wrappers |
| `prefers-reduced-motion` users | get the gated/no-motion path |

## See

- Source: `src/components/motion/index.ts`
- Reference: `docs/design/design-system.md`
