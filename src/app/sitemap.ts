import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/constants";

/**
 * Generated sitemap covering every route, including detail pages derived
 * from the content data files — kept in sync automatically as content grows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/insights", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/products/axiom-verify", priority: 0.8 },
    ...services.map((service) => ({
      path: `/services/${service.slug}`,
      priority: 0.8,
    })),
    ...caseStudies.map((study) => ({
      path: `/case-studies/${study.slug}`,
      priority: 0.8,
    })),
    ...insights.map((post) => ({
      path: `/insights/${post.slug}`,
      priority: 0.6,
    })),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
