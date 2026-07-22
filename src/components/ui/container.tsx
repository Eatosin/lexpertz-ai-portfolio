import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Container primitive — constrains content width and centers horizontally
 * with responsive horizontal padding. Spacing scales mathematically to
 * avoid CLS at breakpoints.
 */
const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12",
      className
    )}
    {...props}
  />
));
Container.displayName = "Container";

export { Container };
