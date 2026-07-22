"use client";

import * as React from "react";

/**
 * useScroll — returns the current vertical scroll position.
 * Remounts-safe (starts at 0).
 */
export function useScroll(): number {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return scrollY;
}
