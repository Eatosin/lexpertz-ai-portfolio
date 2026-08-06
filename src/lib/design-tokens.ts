/**
 * Type-safe design tokens for the Tactile Bento-Minimalist design system.
 *
 * These mirror the HSL CSS variables declared in `src/app/globals.css` so that
 * runtime JavaScript (Canvas, Framer Motion springs, chart palettes, etc.) can
 * read the exact same values that Tailwind utilities resolve at build time.
 *
 * Uses tuple-typed HSL channels for shadcn/ui compatibility.
 */

export type ColorToken =
  | "background"
  | "foreground"
  | "card"
  | "cardForeground"
  | "popover"
  | "popoverForeground"
  | "primary"
  | "primaryForeground"
  | "secondary"
  | "secondaryForeground"
  | "muted"
  | "mutedForeground"
  | "accent"
  | "accentForeground"
  | "destructive"
  | "destructiveForeground"
  | "border"
  | "input"
  | "ring"
  | "borderStrong"
  | "surfaceRaised"
  | "scrim"
  | "success"
  | "successForeground"
  | "brandCyan"
  | "brandBlue"
  | "brandCyanForeground"
  | "brandBlueForeground"
  | "glassBg"
  | "glassBorder";

export const colors = {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: "hsl(var(--card))",
  cardForeground: "hsl(var(--card-foreground))",
  popover: "hsl(var(--popover))",
  popoverForeground: "hsl(var(--popover-foreground))",
  primary: "hsl(var(--primary))",
  primaryForeground: "hsl(var(--primary-foreground))",
  secondary: "hsl(var(--secondary))",
  secondaryForeground: "hsl(var(--secondary-foreground))",
  muted: "hsl(var(--muted))",
  mutedForeground: "hsl(var(--muted-foreground))",
  accent: "hsl(var(--accent))",
  accentForeground: "hsl(var(--accent-foreground))",
  destructive: "hsl(var(--destructive))",
  destructiveForeground: "hsl(var(--destructive-foreground))",
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  borderStrong: "hsl(var(--border-strong))",
  surfaceRaised: "hsl(var(--surface-raised))",
  scrim: "hsl(var(--scrim))",
  success: "hsl(var(--success))",
  successForeground: "hsl(var(--success-foreground))",
  brandCyan: "hsl(var(--brand-cyan))",
  brandBlue: "hsl(var(--brand-blue))",
  brandCyanForeground: "hsl(var(--brand-cyan-foreground))",
  brandBlueForeground: "hsl(var(--brand-blue-foreground))",
  glassBg: "hsl(var(--glass-bg))",
  glassBorder: "hsl(var(--glass-border))",
} as const satisfies Record<ColorToken, string>;

/** Semantic UI gradiants used by Bento cards, buttons and hero backgrounds. */
export const gradients = {
  brand: "linear-gradient(135deg, hsl(var(--brand-cyan)) 0%, hsl(var(--brand-blue)) 100%)",
  brandGlow:
    "radial-gradient(circle at center, hsl(var(--brand-cyan) / 0.15) 0%, transparent 70%)",
  mesh:
    "radial-gradient(at 30% 20%, hsl(var(--brand-cyan) / 0.18) 0px, transparent 50%), radial-gradient(at 70% 80%, hsl(var(--brand-blue) / 0.18) 0px, transparent 50%)",
} as const;

/** Mathematically scaled spacing units (8px base) to avoid layout shift. */
export const spacing = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4rem",
  "3xl": "6rem",
} as const;

/** Radii tokens (mirror --radius from globals.css). */
export const radii = {
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  full: "9999px",
} as const;

/** Layout breakpoints, kept in px for use in useMedia hook comparisons. */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radii;
export type BreakpointToken = keyof typeof breakpoints;

/**
 * Typography system — families, weights and the documented type scale.
 * Mirrors the CSS in `globals.css` and the font loading in `layout.tsx`.
 *
 * Families:
 * - `display`  → Space Grotesk (variable, weights 500/600/700) — headlines
 * - `sans`     → Geist Sans (variable) — body, UI, buttons
 * - `mono`     → Geist Mono (variable) — technical labels, metrics, indexes
 */
export const typography = {
  families: {
    display: "var(--font-display)",
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  } as const,
  weights: {
    display: ["500", "600", "700"],
    sans: ["variable"],
    mono: ["variable"],
  } as const,
  /** The standard scale. `label` is the mono eyebrow treatment. */
  scale: {
    hero: { size: "clamp(2.5rem, 5vw, 4rem)", weight: 700, tracking: "-0.03em", lineHeight: 1.06 },
    pageTitle: { size: "2.25rem / 3rem", weight: 700, tracking: "-0.025em" },
    sectionTitle: { size: "1.875rem / 2.25rem", weight: 600, tracking: "-0.02em" },
    cardTitle: { size: "1.125rem / 1.25rem", weight: 600, tracking: "-0.01em" },
    lede: { size: "1.125rem / 1.25rem", weight: 400, lineHeight: 1.6 },
    body: { size: "0.875rem / 1rem", weight: 400, lineHeight: 1.6 },
    label: { size: "0.75rem", weight: 500, tracking: "0.14em", transform: "uppercase" },
  } as const,
} as const;
