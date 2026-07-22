"use client";

import * as React from "react";

import { breakpoints } from "@/lib/design-tokens";

/**
 * useMedia — returns a mounted-safe media-query result.
 * Supresses hydration mismatches by returning `false` until mount.
 */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** useMediaLessThan — shorthand for breakpoint below checks. */
export function useMediaLessThan(bp: keyof typeof breakpoints): boolean {
  const query = `(max-width: ${breakpoints[bp] - 1}px)`;
  return useMedia(query);
}

/** useMediaGreaterThan — shorthand for breakpoint above checks. */
export function useMediaGreaterThan(bp: keyof typeof breakpoints): boolean {
  const query = `(min-width: ${breakpoints[bp]}px)`;
  return useMedia(query);
}
