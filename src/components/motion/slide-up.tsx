"use client";

import * as React from "react";
import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { transitionPreset, variants, viewportOnce } from "@/lib/motion-tokens";

type SlideUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Pixel offset to slide from. Defaults to 24. */
  y?: number;
};

/** SlideUp — clean micro-transition slide effect (fade + translate). */
export function SlideUp({
  children,
  className,
  delay = 0,
  y = 24,
}: SlideUpProps) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ ...transitionPreset.slideUp, delay }}
      viewport={viewportOnce}
    >
      {children}
    </m.div>
  );
}
SlideUp.displayName = "SlideUp";
