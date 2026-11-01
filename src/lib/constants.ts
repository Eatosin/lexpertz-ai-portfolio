/**
 * Site-wide constants: navigation, services, pricing, and SEO defaults.
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
    ],
  },
];

/** Pricing config placeholder — replace with real tiers when product launches. */
export const pricing = {
  currency: "USD" as const,
  tiers: [
    {
      name: "Starter",
      price: 0,
      description: "For solo developers kicking the tires.",
    },
    {
      name: "Growth",
      price: 499,
      description: "For teams shipping AI features to production.",
    },
    {
      name: "Enterprise",
      price: null,
      description: "Custom deployments and SLAs.",
    },
  ],
};

export const siteConfig = {
  name: "Lexpertz AI",
  shortName: "Lexpertz",
  url: "https://www.lexpertzai.cc",
  description:
    "Precision AI & Logic Assurance. Enterprise RAG pipelines, agentic workflows, MLOps, and physics-informed AI auditing — engineered by a physicist who ships.",
  tagline: "Architecting Intelligence Through Physics-Based MLOps and LLMs.",
  founderName: "Owadokun Tosin Tobi",
  founderImage: "/founder.jpg",
  logoFull: "/logo-full.png",
  logoIcon: "/logo-icon.png",
  founder: {
    github: "https://github.com/Eatosin",
    linkedin: "https://www.linkedin.com/in/owadokun-tosin-tobi-6159091a3",
    x: "https://x.com/TosinOwadokun",
    email: "lexpertzai@cc.cc",
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
