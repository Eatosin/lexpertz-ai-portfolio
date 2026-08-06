"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { useIntersection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { useDeviceTier } from "./use-device-tier";
import { useReducedMotion } from "./use-reduced-motion";

const ParticleScene = dynamic(
  () => import("./particle-scene").then((mod) => mod.ParticleScene),
  {
    ssr: false,
    loading: () => null,
  }
);

/** Preload the scene slightly before it enters the viewport. */
const VIEWPORT_GATE: IntersectionObserverInit = {
  rootMargin: "300px 0px 0px 0px",
};

type SceneCanvasProps = {
  className?: string;
};

/**
 * True only after hydration — lets the canvas fade in instead of popping in.
 * `useSyncExternalStore` keeps the SSR snapshot (`false`) stable so there is
 * no hydration mismatch.
 */
const CLIENT_SNAPSHOT = true;
const SERVER_SNAPSHOT = false;
const subscribe = () => () => undefined;

/**
 * ErrorBoundary — if the lazily-loaded WebGL chunk ever fails (network,
 * WebGL unsupported), fail silently to the CSS gradient poster underneath.
 */
class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("SceneCanvas failed:", error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function SceneCanvas({ className }: SceneCanvasProps) {
  const [gateRef, isInView] = useIntersection<HTMLDivElement>(VIEWPORT_GATE);
  const reduceMotion = useReducedMotion();
  const tier = useDeviceTier();
  const isClient = React.useSyncExternalStore(
    subscribe,
    () => CLIENT_SNAPSHOT,
    () => SERVER_SNAPSHOT
  );

  const renderScene = isClient && isInView && !reduceMotion;

  return (
    <div
      ref={gateRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-1000",
        !renderScene && "opacity-0",
        className
      )}
    >
      {renderScene ? (
        <SceneErrorBoundary>
          <ParticleScene tier={tier} />
        </SceneErrorBoundary>
      ) : null}
    </div>
  );
}
