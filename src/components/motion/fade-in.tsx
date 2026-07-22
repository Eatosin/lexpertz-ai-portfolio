"use client";

import * as React from "react";
import type { MotionProps, Variants } from "framer-motion";

import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { transitionPreset, variants, viewportOnce } from "@/lib/motion-tokens";

type FadeInProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
  /** Delay (in seconds) before the animation runs. Useful for stagger. */
  delay?: number;
};

/** FadeIn — soft opacity fade in. Respects reduced motion via CSS utilities. */
export function FadeIn({
  children,
  className,
  delay = 0,
  ...props
}: FadeInProps) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      variants={variants.fadeIn}
      transition={{ ...transitionPreset.fadeIn, delay }}
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </m.div>
  );
}
FadeIn.displayName = "FadeIn";
