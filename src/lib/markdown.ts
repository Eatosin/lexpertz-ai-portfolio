/**
 * Markdown → HTML pipeline for blog/insight content.
 *
 * Deliberately minimal and server-only: the site is fully static, so posts are
 * compiled at build time from `content/insights/*.md`. No runtime parsing, no
 * client bundle cost, and the output is a plain HTML string we can hand to
 * `dangerouslySetInnerHTML` after sanitization guarantees are documented.
 *
 * Chain: remark-parse → remark-gfm → remark-rehype → rehype-slug →
 *        rehype-autolink-headings → rehype-external-links →
 *        rehype-wrap-tables → rehype-stringify
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
import { visit, SKIP } from "unist-util-visit";
import type { Root, Element } from "hast";

/**
 * Open outbound links in a new tab with `rel="noopener noreferrer"`.
 *
 * Only absolute `http(s)` links are touched — relative anchors and `mailto:`
 * links keep their default behavior. `noopener` prevents the destination from
 * retaining a `window.opener` handle; `noreferrer` also strips the Referer
 * header, which keeps internal URLs out of third-party logs.
 */
function rehypeExternalLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "a") return;
      const href = node.properties?.href;
      if (typeof href !== "string" || !/^https?:\/\//i.test(href)) return;

      node.properties.target = "_blank";
      node.properties.rel = ["noopener", "noreferrer"];
    });
  };
}

/**
 * Wrap tables in a scroll container.
 *
 * A wide table (four or more columns) cannot fit a 375px viewport, and because
 * `table` is a block-level element with intrinsic min-width, it pushes the whole
 * page into horizontal scroll rather than shrinking. Wrapping each table in an
 * overflow container keeps the page width intact and lets the table scroll on
 * its own axis. Done here rather than in CSS-only so `.prose table` styling
 * keeps applying to the table itself.
 */
function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "table" || !parent || typeof index !== "number") {
        return;
      }

      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrap"] },
        children: [node],
      };

      parent.children[index] = wrapper;
      return SKIP;
    });
  };
}

/**
 * Wrap body images in a figure with an optional caption.
 *
 * Markdown image titles become captions: `![alt](/x.svg "Figure 1 — ...")`.
 * The title is removed from the `img` so it does not render twice (browsers
 * show `title` as a tooltip). Images are marked lazy + async-decoding so a
 * long post with several diagrams does not block the text.
 */
function rehypeFigures() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "img" || !parent || typeof index !== "number") {
        return;
      }

      const title = node.properties?.title;
      const caption =
        typeof title === "string" && title.trim().length > 0 ? title : undefined;

      node.properties = {
        ...node.properties,
        loading: "lazy",
        decoding: "async",
      };
      delete node.properties.title;

      // Link the image to its own source file so a reader on a 375px screen can
      // open the diagram at full resolution. Vector diagrams scale cleanly when
      // opened directly in the browser.
      const src = node.properties?.src;
      const imageNode =
        typeof src === "string"
          ? {
              type: "element" as const,
              tagName: "a",
              properties: {
                href: src,
                target: "_blank",
                rel: ["noopener", "noreferrer"],
                className: ["figure-link"],
                "aria-label": "Open this diagram at full size",
              },
              children: [node],
            }
          : node;

      parent.children[index] = {
        type: "element",
        tagName: "figure",
        properties: { className: ["figure"] },
        children: [
          imageNode,
          ...(caption
            ? [
                {
                  type: "element" as const,
                  tagName: "figcaption",
                  properties: {},
                  children: [{ type: "text" as const, value: caption }],
                },
              ]
            : []),
        ],
      };

      return SKIP;
    });
  };
}

/**
 * Render a markdown body to sanitized HTML.
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
    .use(rehypeExternalLinks)
    .use(rehypeWrapTables)
    .use(rehypeFigures)
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
