"use client";

import { useMediaLessThan } from "@/lib/hooks";

import type { ParticleTier } from "./particle-config";

/**
 * useDeviceTier — picks the particle tier from the viewport width.
 * `mobile` (below `md`, 768px) gets a degraded scene; `desktop` gets the
 * full field. Mirrors the breakpoint tokens in `src/lib/design-tokens.ts`.
 */
export function useDeviceTier(): ParticleTier {
  const isMobile = useMediaLessThan("md");
  return isMobile ? "mobile" : "desktop";
}
