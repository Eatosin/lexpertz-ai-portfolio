"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * BentoCard — Card primitive with neon hover-glow for the Bento feature grid.
 * Servers can compose it (server component by default) and client children can
 * still trigger the hover glow via pure CSS (no JS needed).
 */
const BentoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** Optional href — wraps the card in a hover-able anchor for CTA use. */
    asChild?: boolean;
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glow-border group relative overflow-hidden rounded-lg border border-border bg-card p-6 text-card-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-brand-cyan/10",
      className
    )}
    {...props}
  />
));
BentoCard.displayName = "BentoCard";

export { BentoCard };
