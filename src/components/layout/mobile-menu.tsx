"use client";

import * as React from "react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { primaryNav } from "@/lib/constants";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { trackCTA } from "@/lib/analytics";

/**
 * MobileMenu — full-screen drawer triggered by a hamburger button on < md.
 *
 * Closes on any internal link click (router-driven), which prevents CLS by
 * avoiding hidden-then-shown state transitions across pages.
 */
export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent
        overlayClassName="bg-background/10"
        className="top-0 flex h-[100dvh] translate-y-0 flex-col overflow-y-auto rounded-none border-0 bg-background p-6 pt-20 supports-[backdrop-filter]:bg-background/55 supports-[backdrop-filter]:backdrop-blur-2xl sm:max-w-none"
      >
        <DialogTitle className="sr-only">Navigation</DialogTitle>
        <nav className="flex flex-col gap-6">
          {primaryNav.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>
              {group.label === "Services"
                ? services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => {
                        trackCTA("mobile_service", `/services/${service.slug}`);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex min-h-11 items-center rounded-md px-3 text-sm text-foreground transition-colors",
                        "hover:bg-accent"
                      )}
                    >
                      {service.title}
                    </Link>
                  ))
                : group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        trackCTA("mobile_nav", item.href);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex min-h-11 items-center rounded-md px-3 text-sm text-foreground transition-colors",
                        "hover:bg-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
            </div>
          ))}
          <Button
            asChild
            variant="brand"
            className="mt-4 h-12 w-full"
            onClick={() => {
              trackCTA("mobile_cta", "/contact");
              setOpen(false);
            }}
          >
            <Link href="/contact">Book a call</Link>
          </Button>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
