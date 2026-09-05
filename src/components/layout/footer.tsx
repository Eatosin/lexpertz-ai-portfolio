"use client";

import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { SocialCloud } from "@/components/ui/social-cloud";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { footerColumns, siteConfig } from "@/lib/constants";
import { trackCTA } from "@/lib/analytics";

/** Brand line shown on the footer's blue brand card. */
const FOOTER_BRAND_LINE =
  "Architecting intelligence through physics-based MLOps.";

/** Footer — dual-card close: brand card + link card with Substack embed. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <Container className="py-12 md:py-16">
        <StaggerContainer
          className="flex flex-col gap-5 md:flex-row md:gap-6"
          delayChildren={0.05}
          staggerChildren={0.12}
        >
          {/* Brand card */}
          <StaggerItem className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-brand-blue p-8 md:min-h-[560px] md:w-1/3 md:p-10">
            {/* Film-grain noise overlay */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.12] mix-blend-multiply"
              aria-hidden
            >
              <filter id="footer-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#footer-noise)" />
            </svg>

            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 inline-flex items-center gap-3 self-start"
              onClick={() => trackCTA("footer_logo", "/")}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <Image
                  src={siteConfig.logoIcon}
                  alt=""
                  width={500}
                  height={500}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>

            {/* Brand line + socials + copyright */}
            <div className="relative z-10 flex flex-col items-start gap-6">
              <p className="max-w-xs font-display text-2xl font-bold leading-snug text-white">
                {FOOTER_BRAND_LINE}
              </p>
              <SocialCloud
                className="text-white/80"
                githubUrl={siteConfig.socials.github}
                twitterUrl={siteConfig.socials.x}
                linkedinUrl={siteConfig.socials.linkedin}
                facebookUrl={siteConfig.socials.facebook}
                emailUrl={`mailto:${siteConfig.founder.email}`}
              />
              <p className="text-xs text-white/60">
                © {year} {siteConfig.name}. All rights reserved.
              </p>
            </div>
          </StaggerItem>

          {/* Link + newsletter card */}
          <StaggerItem className="flex w-full flex-col rounded-2xl border border-border bg-card p-8 md:w-2/3 md:p-12">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 md:grid-cols-3">
              {footerColumns.map((column) => (
                <div key={column.label} className="flex flex-col gap-4">
                  <h4 className="font-display text-sm font-semibold text-foreground">
                    {column.label}
                  </h4>
                  <ul className="flex flex-col gap-2.5 text-sm">
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() => trackCTA("footer_nav", item.href)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Substack embed */}
            <div className="mt-auto pt-10">
              <div className="w-full max-w-[480px] overflow-hidden rounded-xl border border-border bg-white">
                <iframe
                  src={siteConfig.newsletterEmbedUrl}
                  title="Subscribe to the Lexpertz AI newsletter on Substack"
                  loading="lazy"
                  className="block h-[380px] w-full sm:h-[320px]"
                />
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </footer>
  );
}
