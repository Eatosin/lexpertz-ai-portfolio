import { siteConfig } from "@/lib/constants";
import type { CaseStudySurface, ServiceSurface } from "@/content/types";

/**
 * schema.org graphs for the site. Kept as plain objects so they can be tested
 * and serialised without React.
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logoIcon}`,
  description: siteConfig.description,
  email: siteConfig.contactEmail,
  founder: {
    "@type": "Person",
    name: siteConfig.founderName,
    jobTitle: "Founder & Lead AI Engineer",
    sameAs: [
      siteConfig.founder.github,
      siteConfig.founder.linkedin,
      siteConfig.founder.x,
    ],
  },
  sameAs: [
    siteConfig.socials.github,
    siteConfig.socials.linkedin,
    siteConfig.socials.x,
    siteConfig.socials.facebook,
    siteConfig.substackUrl,
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export function serviceSchema(service: ServiceSurface) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
  };
}

export function caseStudySchema(study: CaseStudySurface) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    datePublished: study.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.founderName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/case-studies/${study.slug}`,
    keywords: (study.tags ?? []).join(", "),
  };
}
