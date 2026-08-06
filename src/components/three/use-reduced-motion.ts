"use client";

import * as React from "react";

/**
 * useReducedMotion — subscribes to `prefers-reduced-motion` without tearing.
 * Used to disable the WebGL canvas entirely (static poster fallback) and to
 * gate JS-driven motion in other components.
 */
export function useReducedMotion(): boolean {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    []
  );

  const getSnapshot = React.useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
