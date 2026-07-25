# Lexpertz AI — Intelligent Business Architecture

![Status](https://img.shields.io/badge/Status-Production-success)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-white?logo=next.js)

**Lexpertz AI** is a next-generation automation firm specializing in Enterprise RAG Pipelines, Logic Evaluation, and Edge AI Optimization. We transition organizations from legacy IT to intelligent, data-driven ecosystems.

## Technical Architecture

### The Stack
- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack, Server Components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (base-nova)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Hardware accelerated)
- **Type Safety:** TypeScript 5 (Strict Mode)
- **Validation:** Zod (Runtime Schema Validation)
- **Deployment:** Vercel Edge Network

## Project Structure

```
lexpertz-ai-portfolio/
├── src/
│   ├── app/            # Next.js App Router (layouts, pages, route groups)
│   ├── components/     # UI components (ui, layout, sections, motion, forms, providers)
│   ├── content/        # Static TypeScript data (services, case-studies, team, insights)
│   └── lib/            # Utilities, hooks, validators, design tokens, analytics
├── public/             # Static assets (optimized via Next.js Image)
└── skills/             # OpenCode agent skills (coding-standards, frontend, tdd, security)
```

## Deployment

Connected to Vercel for CI/CD:

1. **Push** to `main` triggers build and lint via GitHub Actions
2. **Lint + Type Check** run via `npm run build`
3. **Automatic Deployment** to the Edge Network upon success

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*2026 Lexpertz AI. Verified Expertise.*