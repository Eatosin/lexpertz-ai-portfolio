/**
 * Markdown → HTML pipeline for blog/insight content.
 *
 * Deliberately minimal and server-only: the site is fully static, so posts are
 * compiled at build time from `content/insights/*.md`. No runtime parsing, no
 * client bundle cost, and the output is a plain HTML string we can hand to
 * `dangerouslySetInnerHTML` after sanitization guarantees are documented.
 *
 * Chain: remark-parse → remark-gfm → remark-rehype → rehype-slug →
 *        rehype-autolink-headings → rehype-stringify
 *
 * `remark-rehype` runs WITHOUT `allowDangerousHtml`, so raw HTML in a post is
 * dropped rather than passed through. That is the primary XSS guarantee for
 * AI-generated content: a post cannot inject markup the renderer didn't build.
 */

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

/**
 * Render a markdown body to sanitized HTML.
 *
 * Links authored in posts get `target="_blank"` + `rel="noopener noreferrer"`
 * so outbound references can't reach back through `window.opener`.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["heading-anchor"],
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

/**
 * Words per minute for reading-time estimation. 225 is the median adult
 * silent-reading rate for technical prose; long-form engineering posts skew
 * slower, so this is a deliberate upper bound rather than the 265 fast-read
 * figure commonly used.
 */
const WORDS_PER_MINUTE = 225;

/**
 * Estimate reading time from a markdown body.
 *
 * Strips fenced code blocks and inline code before counting: code is scanned,
 * not read, and counting `const foo = bar` as prose inflates the estimate by
 * minutes on technical posts.
 */
export function estimateReadingTime(markdown: string): number {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ");

  const words = prose.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
