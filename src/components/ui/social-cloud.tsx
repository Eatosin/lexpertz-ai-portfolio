import * as React from "react";
import Link from "next/link";
import { Facebook, Github, Linkedin, Mail, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * SocialCloud — row of circular social link chips.
 *
 * Color-agnostic: chips render with `currentColor`-derived fills and borders,
 * so the caller sets the tone via `className` (e.g. `text-white/80` on a brand
 * surface). Missing URLs are filtered out; the cloud renders nothing if every
 * link is absent.
 */

export interface SocialCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  /** Mailto address — rendered without `target="_blank"`. */
  emailUrl?: string;
}

const SOCIAL_ITEMS = [
  { icon: Linkedin, key: "linkedinUrl", label: "LinkedIn" },
  { icon: Twitter, key: "twitterUrl", label: "X" },
  { icon: Facebook, key: "facebookUrl", label: "Facebook" },
  { icon: Github, key: "githubUrl", label: "GitHub" },
  { icon: Mail, key: "emailUrl", label: "Email" },
] as const;

export function SocialCloud({
  className,
  githubUrl,
  twitterUrl,
  linkedinUrl,
  facebookUrl,
  emailUrl,
  ...props
}: SocialCloudProps) {
  const urls = { githubUrl, twitterUrl, linkedinUrl, facebookUrl, emailUrl };

  const items = SOCIAL_ITEMS.filter(({ key }) => {
    const url = urls[key];
    return url && url !== "#";
  });

  if (items.length === 0) return null;

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2.5", className)}
      {...props}
    >
      {items.map(({ icon: Icon, key, label }) => {
        const url = urls[key];
        if (!url) return null;
        const isMailto = url.startsWith("mailto:");
        return (
          <Link
            key={label}
            href={url}
            target={isMailto ? undefined : "_blank"}
            rel={isMailto ? undefined : "noopener noreferrer"}
            aria-label={label}
            title={label}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-current/25 bg-current/10 text-current transition-[background-color,border-color,transform] duration-300 hover:scale-105 hover:border-current/60 hover:bg-current/20"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden />
          </Link>
        );
      })}
    </div>
  );
}
