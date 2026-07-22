"use client";

import * as React from "react";

/**
 * useIntersection — observes an element and reports when it crosses the
 * viewport. Pairs with `FadeIn` for deferred client-only embeds.
 */
export function useIntersection<T extends Element>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = React.useRef<T>(null);
  const [intersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, intersecting];
}
