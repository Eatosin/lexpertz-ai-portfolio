"use client";

import { Canvas } from "@react-three/fiber";

import type { ParticleTier } from "./particle-config";
import { ParticleField } from "./particle-field";

type ParticleSceneProps = {
  tier: ParticleTier;
};

/**
 * ParticleScene — the WebGL scene root. Transparent canvas so the CSS
 * gradient poster shows through; `frameloop="demand"` (the field invalidates
 * every frame while animating and stops rendering when idle or off-screen),
 * capped DPR, no MSAA (points don't need it).
 */
export function ParticleScene({ tier }: ParticleSceneProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      fallback={null}
      className="h-full w-full"
    >
      <ParticleField tier={tier} />
    </Canvas>
  );
}
