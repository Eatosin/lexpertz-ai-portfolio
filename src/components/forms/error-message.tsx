import * as React from "react";

import { cn } from "@/lib/utils";

export type ErrorMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

/** ErrorMessage — accessible inline error for forms and validation results. */
function ErrorMessage({ className, children, ...props }: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { ErrorMessage };
