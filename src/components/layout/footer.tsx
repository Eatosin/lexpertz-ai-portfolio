"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { footerNav, siteConfig } from "@/lib/constants";
import { trackCTA } from "@/lib/analytics";

/** Footer — minimal, brandful, with quick nav and a contact CTA. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => trackCTA("footer_logo", "/")}
            >
              <Image
                src={siteConfig.logoIcon}
                alt={`${siteConfig.name} logo`}
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {siteConfig.shortName}
                <span className="text-brand-cyan">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-3 md:items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sitemap
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {footerNav.map((item) => (
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
          </nav>

          {/* Contact CTA */}
          <div className="flex flex-col gap-3 md:items-end">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Talk to us
            </h3>
            <a
              href="mailto:tosinowadokun11@gmail.com"
              className="text-sm text-foreground hover:text-brand-cyan"
              onClick={() => trackCTA("footer_email", "mailto:tosinowadokun11@gmail.com")}
            >
              tosinowadokun11@gmail.com
            </a>
            <p className="text-sm text-muted-foreground">
              Lagos • Remote-first • Serving global clients
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Architecting intelligence through physics-based MLOps.
          </span>
          <span className="hidden sm:inline">
            Built with Next.js, Tailwind, Framer Motion, and shadcn/ui.
          </span>
        </div>
      </Container>
    </footer>
  );
}
