"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useScroll } from "@/lib/hooks/use-scroll";
import { useMediaGreaterThan } from "@/lib/hooks/use-media";
import { primaryNav, siteConfig } from "@/lib/constants";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { trackCTA } from "@/lib/analytics";

/**
 * Navbar — floating glassmorphic top bar.
 *
 * Uses Radix-ui NavigationMenu (full keyboard nav, sub-text on dropdown items).
 * Adopts `glass` utility once the user scrolls past 8px to keep initial paint
 * transparent for the hero section. Layout shifts are avoided by locking the
 * header height with `h-16` (matches the body `pt-20` in layout.tsx).
 */
export function Navbar() {
  const scrollY = useScroll();
  const isScrolled = scrollY > 8;
  const isDesktop = useMediaGreaterThan("md");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300",
        isScrolled ? "glass" : "bg-transparent"
      )}
    >
      <Container className="flex h-full items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => trackCTA("logo", "/")}
        >
          <Image
            src={siteConfig.logoIcon}
            alt={`${siteConfig.name} logo`}
            width={32}
            height={32}
            priority
            className="h-8 w-8"
          />
          <span className="text-base font-semibold tracking-tight text-foreground">
            {siteConfig.shortName}
            <span className="text-brand-cyan">.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {primaryNav.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[--radix-navigation-menu-viewport-width] gap-3 p-4 md:w-[460px] lg:w-[560px]">
                    {group.label === "Services"
                      ? services.map((service) => (
                          <li key={service.slug}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={`/services/${service.slug}`}
                                className="block rounded-md p-3 transition-colors hover:bg-accent"
                              >
                                <div className="text-sm font-medium text-foreground">
                                  {service.title}
                                </div>
                                <div className="line-clamp-2 text-sm text-muted-foreground">
                                  {service.summary}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))
                      : group.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block rounded-md p-3 transition-colors hover:bg-accent"
                              >
                                <div className="text-sm font-medium text-foreground">
                                  {item.label}
                                </div>
                                {item.description ? (
                                  <div className="text-sm text-muted-foreground">
                                    {item.description}
                                  </div>
                                ) : null}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right-side: CTA + mobile menu */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="brand"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/contact" onClick={() => trackCTA("navbar_cta", "/contact")}>
              Book A Free Call
            </Link>
          </Button>
          {!isDesktop ? <MobileMenu /> : null}
        </div>
      </Container>
    </header>
  );
}
