"use client";

import * as React from "react";
import Image from "next/image";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

// --- Types ---

export type AnimationPhase = "scatter" | "line" | "circle";

type Target = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
};

interface FlipCardProps {
  src: string;
  target: Target;
}

export interface ScrollMorphHeroProps {
  /** Content rendered center-stage during the intro; fades out as the arc forms. */
  intro?: React.ReactNode;
  /** Content rendered at the top once the bottom arc has formed. */
  content?: React.ReactNode;
  className?: string;
}

// --- Constants ---

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

const MAX_SCROLL = 3000;
const INTRO_LINE_DELAY_MS = 500;
const INTRO_CIRCLE_DELAY_MS = 2500;

/** Free Unsplash stock (verified 200s) curated for AI / enterprise / MLOps themes. */
const IMAGES = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&q=80",
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&q=80",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&q=80",
  "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=300&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&q=80",
  "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=300&q=80",
  "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=300&q=80",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80",
];

const TOTAL_IMAGES = IMAGES.length;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

/** Deterministic PRNG (mulberry32) — keeps render pure and SSR/hydration-safe. */
function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- FlipCard ---

function FlipCard({ src, target }: FlipCardProps) {
  return (
    <m.div
      animate={target}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group cursor-pointer"
    >
      <m.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl bg-muted shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="160px"
            draggable={false}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-700 bg-gray-900 p-4 shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="mb-1 text-[8px] font-bold uppercase tracking-widest text-brand-cyan">
            View
          </p>
          <p className="text-xs font-medium text-white">Details</p>
        </div>
      </m.div>
    </m.div>
  );
}

// --- Main component ---

export function ScrollMorphHero({ intro, content, className }: ScrollMorphHeroProps) {
  const [introPhase, setIntroPhase] = React.useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Container size drives the responsive circle/arc geometry.
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);
    setContainerSize({ width: container.offsetWidth, height: container.offsetHeight });

    return () => observer.disconnect();
  }, []);

  // Virtual scroll (wheel + touch). Released at bounds so the page can scroll
  // on once the morph and shuffle have played out.
  const virtualScroll = useMotionValue(0);
  const scrollRef = React.useRef(0);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const setVirtualScroll = (value: number) => {
      scrollRef.current = value;
      virtualScroll.set(value);
    };

    const handleWheel = (e: WheelEvent) => {
      const next = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      if (next === scrollRef.current) return;
      e.preventDefault();
      setVirtualScroll(next);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const next = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      if (next === scrollRef.current) return;
      e.preventDefault();
      setVirtualScroll(next);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  // 1. Morph progress: circle (0) -> bottom arc (1), over the first 600px.
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // 2. Shuffle rotation of the arc, over the remaining scroll range.
  const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // 3. Mouse parallax on the arc.
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Intro choreography: scatter -> line -> circle.
  React.useEffect(() => {
    const line = window.setTimeout(() => setIntroPhase("line"), INTRO_LINE_DELAY_MS);
    const circle = window.setTimeout(() => setIntroPhase("circle"), INTRO_CIRCLE_DELAY_MS);
    return () => {
      window.clearTimeout(line);
      window.clearTimeout(circle);
    };
  }, []);

  // Stable scatter positions — deterministic so render stays pure and the
  // server/client layouts match.
  const scatterPositions = React.useMemo(() => {
    const rand = createSeededRandom(0x5eed);
    return IMAGES.map(() => ({
      x: (rand() - 0.5) * 1500,
      y: (rand() - 0.5) * 1000,
      rotation: (rand() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // Render loop: subscribe to springs and push values into state so card
  // targets can be computed during render.
  const [morphValue, setMorphValue] = React.useState(0);
  const [rotateValue, setRotateValue] = React.useState(0);
  const [parallaxValue, setParallaxValue] = React.useState(0);

  React.useEffect(() => {
    const unsubMorph = smoothMorph.on("change", setMorphValue);
    const unsubRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubMorph();
      unsubRotate();
      unsubParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Content fades in once the arc has formed.
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  const introVisible = introPhase === "circle" && morphValue < 0.5;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden bg-background", className)}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        {/* Intro text (fades out as the arc forms) */}
        {intro ? (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <m.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={
                introVisible
                  ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(10px)" }
              }
              transition={{ duration: 1 }}
            >
              {intro}
            </m.div>
            <m.p
              initial={{ opacity: 0 }}
              animate={introVisible ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Scroll to explore
            </m.p>
          </div>
        ) : null}

        {/* Active content (fades in once the arc has formed) */}
        {content ? (
          <m.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="pointer-events-none absolute top-[10%] z-10 flex w-full justify-center px-4"
          >
            {content}
          </m.div>
        ) : null}

        {/* Card field */}
        <div
          aria-hidden="true"
          className="relative flex h-full w-full items-center justify-center"
        >
          {IMAGES.map((src, i) => {
            let target: Target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = IMG_WIDTH + 10;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              target = {
                x: i * lineSpacing - lineTotalWidth / 2,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
              };
            } else {
              // Responsive geometry
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // Circle position
              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Bottom arc position
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              // Bounded shuffle rotation keeps every card in view.
              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              // Morph between circle and arc
              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return <FlipCard key={src} src={src} target={target} />;
          })}
        </div>
      </div>
    </div>
  );
}
