"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { Easing } from "framer-motion";

import { duration, easings } from "@/lib/motion-tokens";

type CountUpProps = {
  /** Target numeric value to animate to. */
  value: number;
  /** Decimal places to display (e.g. 1 for "99.9"). */
  decimals?: number;
  /** Rendered before the number (e.g. "<"). */
  prefix?: string;
  /** Rendered after the number (e.g. "%" or "+"). */
  suffix?: string;
  className?: string;
};

/**
 * CountUp — animates a stat value from 0 when it enters the viewport.
 * Renders the final value initially (SSR-safe, no hydration mismatch) and
 * shows the running number only after the view trigger fires. Respects
 * `prefers-reduced-motion` by skipping the animation entirely.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = React.useState(() =>
    value.toFixed(decimals)
  );

  React.useEffect(() => {
    if (!inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration: duration.counter,
      ease: easings.easeOut as unknown as Easing,
      onUpdate: (latest) => {
        setDisplay(latest.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value, decimals]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
