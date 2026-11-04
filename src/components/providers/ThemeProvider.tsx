"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * The brand is dark-only.
 *
 * This used to pass `defaultTheme="dark"` + `enableSystem` and claim light-mode
 * support, but with no toggle a visitor could never reach the light palette —
 * the `:root` tokens were dead code and the claim was untrue. Forcing the theme
 * makes that explicit and avoids a first-paint flash for light-OS visitors.
 *
 * If a toggle is ever added, drop `forcedTheme`, re-enable `enableSystem`, and
 * audit the hero and footer surfaces in light mode first.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
