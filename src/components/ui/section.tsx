import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Optional id for in-page navigation (e.g., `/contact#book`). */
  id?: string;
  /** Visual emphasis. Default is muted (subtle bottom border). */
  variant?: "default" | "muted" | "accent" | "hero";
};

const sectionVariants: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "",
  muted: "bg-muted/30",
  accent: "bg-accent/30",
  hero: "relative isolate overflow-hidden bg-brand-glow",
};

/**
 * Section primitive — standardizes vertical rhythm across pages.
 * Each section is paced with `py-20` on desktop and `py-12` on mobile.
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        "relative py-12 sm:py-16 lg:py-20",
        sectionVariants[variant],
        className
      )}
      {...props}
    />
  )
);
Section.displayName = "Section";

export { Section };
