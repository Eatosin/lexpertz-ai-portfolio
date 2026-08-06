"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type TiltCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Max tilt in degrees per axis (kept small — enterprise restraint). */
  maxTilt?: number;
};

/**
 * TiltCard — pointer-driven 3D tilt for cards. Pure inline transform writes
 * (no rAF loop, no motion features bundle), disabled for touch pointers and
 * `prefers-reduced-motion`. Pairs with the card's CSS hover lift.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 4,
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.transform = `perspective(900px) rotateX(${(
      -py * maxTilt
    ).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateY(-3px)`;
  };

  const handlePointerLeave = () => {
    const node = ref.current;
    if (node) node.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("transition-transform duration-300 will-change-transform", className)}
      {...props}
    >
      {children}
    </div>
  );
}
