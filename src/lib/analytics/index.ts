/**
 * Lightweight analytics dispatcher.
 *
 * Routes events to Vercel Analytics (custom event) and any user-supplied
 * window.dataLayer (GTM, PostHog, Plausible). Stays a no-op in dev unless
 * NEXT_PUBLIC_ANALYTICS_ENABLED is truthy.
 */

export type AnalyticsEvent = {
  name: string;
  category?: string;
  label?: string;
  value?: number;
};

const isEnabled =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" ||
  process.env.NODE_ENV === "production";

export function track(event: AnalyticsEvent): void {
  if (!isEnabled) return;

  try {
    if (typeof window !== "undefined" && "va" in window) {
      const va = (window as unknown as { va: (e: AnalyticsEvent) => void }).va;
      va(event);
    }
  } catch {
    // never let analytics break the page
  }

  try {
    if (typeof window !== "undefined" && "dataLayer" in window) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: event.name,
        category: event.category ?? "general",
        label: event.label,
        value: event.value,
      });
    }
  } catch {
    // no-op
  }
}

export function trackCTA(label: string, destination?: string) {
  track({ name: "cta_click", category: "conversion", label, value: destination ? 1 : 0 });
}
