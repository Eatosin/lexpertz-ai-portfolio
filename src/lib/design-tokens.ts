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
