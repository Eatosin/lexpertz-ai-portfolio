"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "@/lib/utils";
import type { ChartPoint } from "@/content/featured-stats";

type ChartTooltipEntry = {
  name: string;
  value: number;
};

/** Brand-styled chart tooltip (recharts renders it into the DOM root). */
function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartTooltipEntry }>;
}) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-muted-foreground">{point.name}</p>
      <p className="font-mono text-lg font-semibold text-foreground">
        {point.value}
      </p>
    </div>
  );
}

type GrowthChartProps = {
  className?: string;
  data: ChartPoint[];
  /** Stable id per chart instance — required when more than one is mounted. */
  gradientId?: string;
};

/**
 * GrowthChart — brand-gradient area chart powered by recharts.
 * Presentational only; data and height sizing come from the caller.
 */
export function GrowthChart({
  className,
  data,
  gradientId = "growth-chart-area",
}: GrowthChartProps) {
  return (
    <div className={cn("h-48 w-full md:h-56", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--brand-cyan))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--brand-cyan))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={{ stroke: "hsl(var(--border-strong))", strokeWidth: 1 }}
            content={<ChartTooltip />}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--brand-cyan))"
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
