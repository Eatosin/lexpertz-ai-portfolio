"use client";

import * as React from "react";
import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { variants, viewportOnce } from "@/lib/motion-tokens";
import type { MotionProps } from "framer-motion";

type StaggerContainerProps = MotionProps & {
  children: React.ReactNode;
  className?: string;
  /** Number of seconds to wait before the first child animates in. */
  delayChildren?: number;
  /** Seconds between each child animation. */
  staggerChildren?: number;
};

/**
 * StaggerContainer — orchestrates child sequencing. Children must define their
 * own `variants` matching hidden/visible keys.
 */
export function StaggerContainer({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.08,
  ...props
}: StaggerContainerProps) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delayChildren, staggerChildren },
        },
      }}
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </m.div>
  );
}
StaggerContainer.displayName = "StaggerContainer";

/** StaggerItem — companion to StaggerContainer for child animations. */
export function StaggerItem({
  children,
  className,
  ...props
}: MotionProps & { children: React.ReactNode; className?: string }) {
  return (
    <m.div
      className={cn(className)}
      variants={variants.slideUp}
      {...props}
    >
      {children}
    </m.div>
  );
}
StaggerItem.displayName = "StaggerItem";
