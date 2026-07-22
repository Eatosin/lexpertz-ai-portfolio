"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type StatCardProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: React.ReactNode;
  /** Optional sub-label or trend indicator rendered beneath the value. */
  hint?: React.ReactNode;
};

/**
 * StatCard — data-display primitive for metrics like "40ms p95", "+87% ROI".
 * Designed for `StatsBar` and the dashboard product.
 */
const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, hint, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 rounded-lg border border-border bg-card p-5",
        className
      )}
      {...props}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-2xl font-bold tracking-tight text-foreground">
        {value}
      </span>
      {hint ? (
        <span className="text-sm text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  )
);
StatCard.displayName = "StatCard";

export { StatCard };
