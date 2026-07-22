/**
 * Reusable Framer Motion transition presets, springs, and variants.
 *
 * Keep these in plain objects (no React) so they can be tree-shaken and reused
 * across both server components (as initial styles) and client components.
 *
 * Pair with `<m.div>` from framer-motion under `LazyMotion strict`.
 */

import type { Variants, Transition } from "framer-motion";

/** Standard duration presets (in seconds). */
export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  hero: 0.8,
} as const;

/** Cubic-bezier easings standardized across the design system. */
export const easings = {
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

/** Common transition presets — use via `transition={transitionPreset.slideUp}`. */
export const transitionPreset = {
  fadeIn: {
    duration: duration.base,
    ease: easings.easeOut as unknown as number[],
  } satisfies Transition,
  slideUp: {
    duration: duration.slow,
    ease: easings.easeOut as unknown as number[],
  } satisfies Transition,
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  } satisfies Transition,
} as const;

/** Reusable variants — use via `variants={variants.fadeIn}`. */
export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  } satisfies Variants,
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  } satisfies Variants,
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  } satisfies Variants,
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  } satisfies Variants,
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  } satisfies Variants,
} as const;

/** Viewport config for `whileInView` — triggers once, 25% visible. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
