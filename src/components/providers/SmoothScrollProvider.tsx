"use client";

import * as React from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider — buttery smooth wheel scrolling via Lenis.
 *
 * - Respects `prefers-reduced-motion` (skipped entirely).
 * - Native touch scrolling untouched (`syncTouch` off) — no mobile jank.
 * - Single rAF loop; destroyed on unmount.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
    });

    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
