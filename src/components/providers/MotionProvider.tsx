"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Wraps the app in Framer Motion's `LazyMotion` (strict mode) loaded with the
 * asynchronous `domAnimation` feature bundle. This keeps the main bundle small
 * — only animation-capable components pull in motion features on demand.
 *
 * Components under this provider MUST use `<m.div>` (not `<motion.div>`) to
 * stay within the strict bundle.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
