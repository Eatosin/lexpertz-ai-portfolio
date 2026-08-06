/**
 * Per-device-tier rendering config for the hero particle field.
 *
 * Mobile keeps only a low-opacity point drift (no connection lines) so the
 * WebGL cost stays trivial on low-end GPUs; desktop gets the full field.
 * Tune densities here without touching scene code.
 */

export type ParticleTier = "mobile" | "desktop";

export type ParticleConfig = {
  /** Total number of floating nodes. */
  count: number;
  /** Max connection segments drawn between nearby nodes (0 disables lines). */
  lineCount: number;
  /** World-space offset of the whole field (right-biased on desktop). */
  groupPosition: [number, number, number];
  /** Spawn volume (min/max per axis). */
  spread: {
    x: [number, number];
    y: [number, number];
    z: [number, number];
  };
  /** Max per-axis drift amplitude (world units). */
  driftAmplitude: number;
  /** Drift speed multiplier — keep slow and calm. */
  driftSpeed: number;
  pointSize: number;
  pointOpacity: number;
  lineOpacity: number;
  /** Breathing speed of the connection-line glow. */
  linePulseSpeed: number;
};

export const particleConfigs: Record<ParticleTier, ParticleConfig> = {
  desktop: {
    count: 600,
    lineCount: 140,
    groupPosition: [2.4, 0.2, 0],
    spread: {
      x: [0.4, 4.0],
      y: [-2.8, 2.8],
      z: [-2.5, 1.0],
    },
    driftAmplitude: 0.32,
    driftSpeed: 0.22,
    pointSize: 0.055,
    pointOpacity: 0.85,
    lineOpacity: 0.14,
    linePulseSpeed: 0.5,
  },
  mobile: {
    count: 180,
    lineCount: 0,
    groupPosition: [0, 0, 0],
    spread: {
      x: [-3.6, 3.6],
      y: [-2.6, 2.6],
      z: [-2.5, 1.0],
    },
    driftAmplitude: 0.28,
    driftSpeed: 0.22,
    pointSize: 0.07,
    pointOpacity: 0.55,
    lineOpacity: 0,
    linePulseSpeed: 0,
  },
};

export function getParticleConfig(tier: ParticleTier): ParticleConfig {
  return particleConfigs[tier];
}
