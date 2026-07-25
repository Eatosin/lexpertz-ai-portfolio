"use client";

import * as React from "react";

import { breakpoints } from "@/lib/design-tokens";

export function useMedia(query: string): boolean {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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