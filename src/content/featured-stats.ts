/**
 * Featured stats section content — heading, headline metrics, and the
 * 12-month growth series powering the area chart on the homepage.
 *
 * The stats deliberately echo the cinematic hero's artifacts (p95 latency,
 * source verification) so the strip reads as the hero's evidence bar —
 * lead magnet first, proof immediately after.
 */

export type FeaturedStat = {
  label: string;
  value: string;
  hint?: string;
};

export type ChartPoint = {
  name: string;
  value: number;
};

export const featuredStats = {
  heading: "Proof over promises.",
  highlight:
    "Every system we ship is scored the way your stakeholders will audit it — retrieval latency, source fidelity, and uptime. The numbers behind the hero.",
  stats: [
    { label: "p95 Retrieval Latency", value: "0.9s" },
    { label: "Sources Cited per Answer", value: "4" },
    { label: "RAG Pipelines in Production", value: "250+" },
    { label: "Uptime Guarantee", value: "99.9%" },
  ] satisfies FeaturedStat[],
  chart: [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 80 },
    { name: "May", value: 100 },
    { name: "Jun", value: 130 },
    { name: "Jul", value: 160 },
  ] satisfies ChartPoint[],
} as const;
