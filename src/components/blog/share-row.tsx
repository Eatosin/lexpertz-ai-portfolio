"use client";

import * as React from "react";
import { Check, Link2, Linkedin, Share2, Twitter } from "lucide-react";

import { trackCTA } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * ShareRow — share intents for a blog post.
 *
 * Built from plain intent URLs rather than the X/LinkedIn JS SDKs. The SDKs
 * add third-party scripts, layout shift, and tracking you did not ask for, in
 * exchange for nothing the intent URL does not already do.
 *
 * The native button appears only when `navigator.share` exists, so the mobile
 * share sheet is used where it is available and never rendered on desktop.
 */

export interface ShareRowProps {
  /** Post title, used as the share text. */
  title: string;
  /** Absolute canonical URL — resolved on the server to avoid window access. */
  url: string;
  /** X handle without the @, used for attribution via `via=`. */
  via: string;
  className?: string;
}

const buttonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 [@media(hover:hover)]:hover:border-brand-cyan/50 [@media(hover:hover)]:hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Capability detection without `setState` in an effect.
 *
 * `navigator.share` is only available in the browser, so reading it during
 * render would mismatch the server output. `useSyncExternalStore` gives us the
 * server snapshot (`false`) for SSR and the real value after hydration, which
 * is the supported way to read a browser-only value without a flash of the
 * wrong UI. The store never changes, so subscribe is a no-op.
 */
const subscribeToNothing = () => () => {};
const getShareSnapshot = () =>
  typeof navigator !== "undefined" && !!navigator.share;
const getShareServerSnapshot = () => false;

export function ShareRow({ title, url, via, className }: ShareRowProps) {
  const [copied, setCopied] = React.useState(false);
  const canNativeShare = React.useSyncExternalStore(
    subscribeToNothing,
    getShareSnapshot,
    getShareServerSnapshot,
  );
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const intent = {
    x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=${encodeURIComponent(via)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackCTA("share_copy_link", url);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, denied permission). Falling
      // back to an alert would be worse than doing nothing visible, so leave
      // the button state unchanged.
    }
  }

  async function handleNative() {
    try {
      await navigator.share({ title, url });
      trackCTA("share_native", url);
    } catch {
      // User dismissed the share sheet — not an error worth surfacing.
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Share
      </span>

      <div className="flex items-center gap-2">
        {canNativeShare ? (
          <button type="button" onClick={handleNative} className={buttonClass} aria-label="Share this post">
            <Share2 className="h-[18px] w-[18px]" aria-hidden />
          </button>
        ) : null}

        <a
          href={intent.x}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on X"
          onClick={() => trackCTA("share_x", url)}
        >
          <Twitter className="h-[18px] w-[18px]" aria-hidden />
        </a>

        <a
          href={intent.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          aria-label="Share on LinkedIn"
          onClick={() => trackCTA("share_linkedin", url)}
        >
          <Linkedin className="h-[18px] w-[18px]" aria-hidden />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className={buttonClass}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? (
            <Check className="h-[18px] w-[18px] text-brand-cyan" aria-hidden />
          ) : (
            <Link2 className="h-[18px] w-[18px]" aria-hidden />
          )}
        </button>

        <span aria-live="polite" className="sr-only">
          {copied ? "Link copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
}
