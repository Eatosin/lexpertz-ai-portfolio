import Image from "next/image";
import { Rss, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { team } from "@/content/team";
import { cn } from "@/lib/utils";

/**
 * AuthorCard — end-of-post identity block with a follow action.
 *
 * Placement is deliberate: the end of an article is where intent peaks, so
 * this is where a follow CTA converts. The X link carries `rel="me"`, which
 * lets the profile assert ownership of this domain (IndieWeb identity
 * verification) — it is a cheap, standards-based signal that costs nothing.
 */

const author = team[0];

export function AuthorCard({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex flex-col gap-5 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-start",
        className,
      )}
      aria-label="About the author"
    >
      <Image
        src={author.avatar}
        alt={author.name}
        width={72}
        height={72}
        className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Written by
        </p>
        <p className="mt-1 font-display text-lg font-semibold">{author.name}</p>
        <p className="text-sm text-muted-foreground">{author.role}</p>

        <p className="mt-3 text-sm text-muted-foreground">
          I build production AI systems — RAG, agents, and the evaluation
          harnesses that keep them honest. Follow along for the next one.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a
              href={siteConfig.founder.x}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`Follow ${author.name} on X`}
            >
              <Twitter className="mr-2 h-4 w-4" aria-hidden />
              Follow on X
            </a>
          </Button>

          <Button asChild variant="outline" size="lg">
            <a
              href={siteConfig.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Edge Cases on Substack"
            >
              <Rss className="mr-2 h-4 w-4" aria-hidden />
              Subscribe
            </a>
          </Button>
        </div>
      </div>
    </aside>
  );
}
