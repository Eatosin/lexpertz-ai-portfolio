"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ParticleConfig, ParticleTier } from "./particle-config";
import { getParticleConfig } from "./particle-config";

const BRAND_CYAN = new THREE.Color("#06b6d4");
const BRAND_BLUE = new THREE.Color("#2563eb");
const NEAR_WHITE = new THREE.Color("#e8f6f8");

/** Max squared distance between connected nodes (world units). */
const MAX_CONNECT_DISTANCE = 1.7;

/**
 * Builds the static base layout: node positions, per-node vertex colors,
 * per-node drift phases, and the precomputed connection pairs (k-nearest
 * neighbors within a distance cap). Connection pairs are resolved once so
 * the per-frame cost stays O(n) instead of O(n²).
 */
function buildField(config: ParticleConfig) {
  const { count, spread } = config;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const base = new Float32Array(count * 3);

  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    const x = spread.x[0] + Math.random() * (spread.x[1] - spread.x[0]);
    const y = spread.y[0] + Math.random() * (spread.y[1] - spread.y[0]);
    const z = spread.z[0] + Math.random() * (spread.z[1] - spread.z[0]);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    base[i * 3] = x;
    base[i * 3 + 1] = y;
    base[i * 3 + 2] = z;

    const roll = Math.random();
    if (roll < 0.55) color.copy(BRAND_CYAN);
    else if (roll < 0.85) color.copy(BRAND_BLUE);
    else color.copy(NEAR_WHITE);
    color.offsetHSL(0, 0, (Math.random() - 0.5) * 0.08);

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    phases[i] = Math.random() * Math.PI * 2;
  }

  return { positions, colors, phases, base, pairs: buildPairs(base, config) };
}

function buildPairs(
  base: Float32Array,
  config: ParticleConfig
): number[] {
  const pairs: number[] = [];
  const maxLines = config.lineCount;
  const maxDistSq = MAX_CONNECT_DISTANCE * MAX_CONNECT_DISTANCE;
  const n = base.length / 3;

  for (let i = 0; i < n && pairs.length < maxLines * 2; i++) {
    const neighbors: Array<[number, number]> = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < maxDistSq) neighbors.push([d, j]);
    }
    neighbors.sort((a, b) => a[0] - b[0]);
    const links = Math.min(2, neighbors.length);
    for (let k = 0; k < links; k++) {
      if (pairs.length >= maxLines * 2) break;
      pairs.push(i, neighbors[k][1]);
    }
  }
  return pairs;
}

type ParticleFieldProps = {
  tier: ParticleTier;
};

/**
 * ParticleField — abstract "agents / data flow" field: drifting nodes with
 * soft connection lines and gentle mouse parallax. Renders only when the
 * parent `<SceneCanvas>` decides the canvas is on-screen and motion is
 * allowed, and invalidates the demand loop every frame while animating.
 */
export function ParticleField({ tier }: ParticleFieldProps) {
  const config = getParticleConfig(tier);
  const groupRef = React.useRef<THREE.Group>(null);
  const pointsRef = React.useRef<THREE.Points>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);
  const lineMaterialRef = React.useRef<THREE.LineBasicMaterial>(null);

  const field = React.useMemo(() => buildField(config), [config]);

  const linePositions = React.useMemo(() => {
    const arr = new Float32Array(field.pairs.length * 3);
    arr.fill(0);
    return arr;
  }, [field.pairs]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const t = state.clock.elapsedTime;
    const positionAttr = points.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = positionAttr.array as Float32Array;

    // Layered sine drift — reads like calm data flow, never rhythmic noise.
    const amp = config.driftAmplitude;
    const speed = config.driftSpeed;
    for (let i = 0; i < config.count; i++) {
      const phase = field.phases[i];
      const ix = i * 3;
      arr[ix] =
        field.base[ix] + Math.sin(t * speed + phase) * amp;
      arr[ix + 1] =
        field.base[ix + 1] + Math.sin(t * speed * 0.8 + phase * 1.7) * amp;
      arr[ix + 2] =
        field.base[ix + 2] + Math.cos(t * speed * 0.7 + phase * 2.3) * amp * 0.8;
    }
    positionAttr.needsUpdate = true;

    // Keep connection lines glued to their nodes.
    const lines = linesRef.current;
    if (lines && linePositions.length > 0) {
      const lineAttr = lines.geometry.attributes
        .position as THREE.BufferAttribute;
      const larr = lineAttr.array as Float32Array;
      const pairs = field.pairs;
      for (let k = 0; k < pairs.length; k += 2) {
        const ia = pairs[k] * 3;
        const ib = pairs[k + 1] * 3;
        const k6 = k * 3;
        larr[k6] = arr[ia];
        larr[k6 + 1] = arr[ia + 1];
        larr[k6 + 2] = arr[ia + 2];
        larr[k6 + 3] = arr[ib];
        larr[k6 + 4] = arr[ib + 1];
        larr[k6 + 5] = arr[ib + 2];
      }
      lineAttr.needsUpdate = true;
    }

    // Gentle breathing on the connection lines.
    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity =
        config.lineOpacity *
        (0.72 + 0.28 * Math.sin(t * config.linePulseSpeed));
    }

    // Soft mouse parallax on the whole field (damped).
    const group = groupRef.current;
    if (group) {
      group.rotation.y = THREE.MathUtils.damp(
        group.rotation.y,
        state.pointer.x * 0.07,
        2.2,
        delta
      );
      group.rotation.x = THREE.MathUtils.damp(
        group.rotation.x,
        -state.pointer.y * 0.045,
        2.2,
        delta
      );
    }

    // Keep the demand-driven render loop alive while animating.
    state.invalidate();
  });

  return (
    <group ref={groupRef} position={config.groupPosition}>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[field.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[field.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={config.pointSize}
          vertexColors
          transparent
          opacity={config.pointOpacity}
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {config.lineCount > 0 ? (
        <lineSegments ref={linesRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={lineMaterialRef}
            color={BRAND_CYAN}
            transparent
            opacity={config.lineOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      ) : null}
    </group>
  );
}
