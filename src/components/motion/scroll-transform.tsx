"use client";

import * as React from "react";
import type { MotionValue } from "framer-motion";

type ScrollTransformProps = React.HTMLAttributes<HTMLDivElement> & {
  opacity?: MotionValue<number>;
  scale?: MotionValue<number>;
  scaleY?: MotionValue<number>;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  rotate?: MotionValue<number>;
};

/**
 * ScrollTransform — applies scroll-driven `MotionValue`s to a plain div by
 * subscribing to their changes, so scrubbed scroll effects never pull the
 * framer-motion feature bundle into the page chunk (works under the app's
 * `LazyMotion strict` setup).
 */
export function ScrollTransform({
  opacity,
  scale,
  scaleY,
  x,
  y,
  rotate,
  style,
  children,
  ...props
}: ScrollTransformProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const values = [opacity, scale, scaleY, x, y, rotate].filter(
      (v): v is MotionValue<number> => v !== undefined
    );

    const apply = () => {
      const parts: string[] = [];
      if (x) parts.push(`translateX(${x.get()}px)`);
      if (y) parts.push(`translateY(${y.get()}px)`);
      if (scale) parts.push(`scale(${scale.get()})`);
      if (scaleY) parts.push(`scaleY(${scaleY.get()})`);
      if (rotate) parts.push(`rotate(${rotate.get()}deg)`);
      node.style.transform = parts.join(" ");
      if (opacity) node.style.opacity = String(opacity.get());
    };

    const unsubscribes = values.map((value) => value.on("change", apply));
    apply();

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [opacity, scale, scaleY, x, y, rotate]);

  return (
    <div ref={ref} style={style} {...props}>
      {children}
    </div>
  );
}
