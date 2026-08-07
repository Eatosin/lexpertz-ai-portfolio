/**
 * Featured stats section content — heading, headline metrics, and the
 * 12-month growth series powering the area chart on the homepage.
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
  heading: "Powering teams with real-time insights.",
  highlight:
    "Our next-gen analytics dashboard helps you track performance, manage clients, and make data-driven decisions in seconds.",
  stats: [
    { label: "Projects Managed", value: "50,000+" },
    { label: "Uptime Guarantee", value: "99.9%" },
    { label: "Enterprise Clients", value: "1,200+" },
    { label: "Avg. Response Time", value: "1.2s" },
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
