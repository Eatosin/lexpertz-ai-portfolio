import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

/**
 * PWA / home-screen manifest. Icons are opaque squares because iOS and Android
 * apply their own masking; `logo-tile-512` carries the mark at 70% width so it
 * survives the maskable safe zone.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050506",
    theme_color: "#050506",
    icons: [
      {
        src: "/brand/logo-tile-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/logo-tile-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/logo-tile-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
