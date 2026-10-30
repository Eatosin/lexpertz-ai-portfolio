import type { MetadataRoute } from "next";

import { getPublishedInsights } from "@/content/insights";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/constants";

/**
 * Generated sitemap covering every route, including detail pages derived
 * from the content data files — kept in sync automatically as content grows.
 *
 * `lastModified` is the real publication date where one exists. The previous
 * implementation stamped every entry with `new Date()`, which told crawlers
 * that all 19 URLs changed on every deploy. That is a noisy signal at best and
 * a reason to distrust the sitemap at worst. Static marketing routes omit the
 * field entirely rather than claiming a date they cannot support.
 *
 * Async because the insights catalog is read from markdown on disk at build
 * time (see `@/lib/insights`); the static imports above remain synchronous.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const insights = await getPublishedInsights();

  /** Static routes: no defensible modification date, so none is claimed. */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/case-studies`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${baseUrl}/products/axiom-verify`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: new Date(study.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...insights.map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
