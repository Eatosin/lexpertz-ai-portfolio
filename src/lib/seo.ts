import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

/**
 * One metadata builder for every route.
 *
 * Next merges metadata shallowly: a page that sets `openGraph: { title }`
 * replaces the layout's `openGraph` object wholesale, which silently drops
 * `images`. Building the whole object in one place keeps canonicals and social
 * cards from drifting route to route.
 */

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/** 1200×630 brand card used wherever a page has no image of its own. */
export const defaultOgImage: OgImage = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: "Lexpertz AI — AI systems that can prove what they did",
};

type BuildMetadataArgs = {
  /** Page title. Omit to inherit the site default (homepage). */
  title?: string;
  description: string;
  /** Root-relative path, e.g. "/about". */
  path: string;
  image?: OgImage;
  type?: "website" | "article";
  /** Emit `title` as an absolute title, bypassing the layout template. */
  absolute?: boolean;
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

export function buildMetadata({
  title,
  description,
  path,
  image = defaultOgImage,
  type = "website",
  absolute = false,
  publishedTime,
  authors,
  tags,
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = title ?? siteConfig.name;
  const pageTitle = title && absolute ? { absolute: title } : title;

  if (type === "article") {
    return {
      title: pageTitle,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        siteName: siteConfig.name,
        locale: "en_US",
        title: socialTitle,
        description,
        publishedTime,
        authors,
        tags,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title: socialTitle,
        description,
        creator: `@${siteConfig.xHandle}`,
        images: [image.url],
      },
    };
  }

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      creator: `@${siteConfig.xHandle}`,
      images: [image.url],
    },
  };
}
