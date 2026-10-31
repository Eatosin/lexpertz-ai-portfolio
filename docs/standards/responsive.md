# Responsive requirements (mandatory)

Every component and design ships **mobile-first**, and is verified at both ~375px and ≥1280px before it is called done. This applies to every change, not only new pages.

## Rules

- **Mobile-first.** Base Tailwind classes describe the mobile layout; `sm:` / `md:` / `lg:` are progressive upgrades. Never write desktop-first and squeeze down.
- **Two-breakpoint check.** Verify visually at ~375px and ≥1280px before marking complete. `npm run build` does not catch layout.
- **Touch targets ≥ 44px.** No hover-dependent UI without `[@media(hover:hover)]:` gating.
- **Contain absolute/fixed layers.** An absolute or fixed child with an explicit `top`/`height` must be contained by a real height on its parent (inline `height`, `md:h-[...]`), or it paints over the next section. This bug class has hit the hero pin and the process zigzag — always confirm the container grows. See [lessons-learned](../process/lessons-learned.md).
- **Viewport units.** Prefer `svh` / `dvh` over `vh` for above-the-fold and pinned sections.
- **Responsive scroll animation.** Use `gsap.matchMedia()` (or `useMediaGreaterThan`) for per-breakpoint scroll distances; never compute `isMobile` once at mount.
- **Decorative layers.** Gradients, textures and connector SVGs get `hidden md:block`.
- **Reduced motion.** Stays gated everywhere (`prefers-reduced-motion` / `useReducedMotion`) at every breakpoint.

## Where it is enforced

- Shared primitives already implement the rhythm: `src/components/ui/section.tsx` (`py-12 sm:py-16 lg:py-20`), `container.tsx`, `motion/*`.
- The reduced-motion hook: `src/components/three/use-reduced-motion.ts`.
- Known breakages and their fixes: [lessons-learned](../process/lessons-learned.md).

## Check

A person resizes the page to ~375px and ≥1280px, in both themes, and confirms: no horizontal scroll, no overlapping section, every tap target reachable, and motion off under `prefers-reduced-motion`.
