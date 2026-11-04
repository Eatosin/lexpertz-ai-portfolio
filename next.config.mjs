/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // All imagery is served from /public; no remote image hosts are whitelisted.
  async redirects() {
    // Old service slugs, kept alive for inbound links and search results.
    return [
      {
        source: "/services/enterprise-rag",
        destination: "/services/evidence-gated-rag",
        permanent: true,
      },
      {
        source: "/services/agentic-workflows",
        destination: "/services/agent-authority",
        permanent: true,
      },
      {
        source: "/services/mlops-infrastructure",
        destination: "/services/assurance-retainer",
        permanent: true,
      },
      {
        source: "/services/ai-evaluation",
        destination: "/services/ai-proof-audit",
        permanent: true,
      },
      {
        source: "/services/specialized-ai",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
