/**
 * Site-wide constants: navigation, services, contact, and SEO defaults.
 * Source of truth for both marketing (Next.js) and app/agents config.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/** Primary navigation for Navbar. The "Services" group powers the dropdown. */
export const primaryNav: NavGroup[] = [
  {
    label: "Services",
    items: [
      {
        label: "AI Proof Audit",
        href: "/services/ai-proof-audit",
        description: "Two weeks to find out what your AI cannot prove.",
      },
      {
        label: "Evidence-Gated RAG",
        href: "/services/evidence-gated-rag",
        description: "Retrieval that cites, and refuses when it cannot.",
      },
      {
        label: "Agent Authority",
        href: "/services/agent-authority",
        description: "Agents with a scoped identity and an audit trail.",
      },
      {
        label: "Assurance Retainer",
        href: "/services/assurance-retainer",
        description: "Evaluation and drift monitoring that stays current.",
      },
    ],
  },
  {
    label: "Work",
    items: [
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Real client engagements and outcomes.",
      },
      {
        label: "Insights",
        href: "/insights",
        description: "Technical blog and engineering notes.",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About",
        href: "/about",
        description: "Founder, mission, and the Lexpertz story.",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Start a conversation or book a call.",
      },
    ],
  },
];

/** Flat list of top-level links for Footer and MobileMenu. */
export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Axiom Verify", href: "/products/axiom-verify" },
];

/** Grouped footer link columns (drives the light card in the footer). */
export const footerColumns: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "AI Proof Audit", href: "/services/ai-proof-audit" },
      { label: "Evidence-Gated RAG", href: "/services/evidence-gated-rag" },
      { label: "Agent Authority", href: "/services/agent-authority" },
      { label: "Assurance Retainer", href: "/services/assurance-retainer" },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Axiom Verify", href: "/products/axiom-verify" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export const siteConfig = {
  name: "Lexpertz AI",
  shortName: "Lexpertz",
  url: "https://www.lexpertzai.cc",
  description:
    "Precision AI & Logic Assurance. Enterprise RAG pipelines, agentic workflows, MLOps, and physics-informed AI auditing — engineered by a physicist who ships.",
  tagline: "Architecting intelligence through physics-based MLOps and LLMs.",
  /** The one address leads are actually delivered to (Resend sender domain). */
  contactEmail: "brief@mail.lexpertzai.cc",
  founderName: "Owadokun Tosin Tobi",
  founderImage: "/founder.jpg",
  /** Vector mark. Non-square (283:232) — size by height with `w-auto`. */
  logoMark: "/brand/logo-mark.svg",
  /** Raster mark for schema.org / platforms that reject SVG. */
  logoMarkPng: "/brand/logo-mark-512.png",
  /** Mark + wordmark lockup. */
  logoLockup: "/brand/logo-lockup.svg",
  /** Single-colour lockup for brand-blue and photography. */
  logoLockupInverse: "/brand/logo-lockup-inverse.svg",
  founder: {
    github: "https://github.com/Eatosin",
    linkedin: "https://www.linkedin.com/in/owadokun-tosin-tobi-6159091a3",
    x: "https://x.com/TosinOwadokun",
    email: "brief@mail.lexpertzai.cc",
  },
  /** Company social links — surfaced by the footer SocialCloud. */
  socials: {
    github: "https://github.com/lexpertzAI",
    linkedin: "https://www.linkedin.com/company/lexpertzai/",
    x: "https://x.com/Lexpertz_tech",
    facebook: "https://www.facebook.com/Lexpertztech/",
  },
  /** Official Substack signup embed (publication settings snippet). */
  newsletterEmbedUrl: "https://tosinowadokun.substack.com/embed",
  /** Public Substack publication — the citable link, not the embed. */
  substackUrl: "https://tosinowadokun.substack.com/",
  /** Founder's X handle, without the @. Used for share intent attribution. */
  xHandle: "TosinOwadokun",
} as const;

export type SiteConfig = typeof siteConfig;
