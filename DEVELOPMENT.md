# Development Guide

## Prerequisites

- **Node.js** 20+ (LTS)
- **npm** 10+
- **Git** 2.30+

## Quick Start

```bash
# Clone and install
git clone <repo-url>
cd lexpertz-ai-portfolio
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start Turbopack dev server (port 3000) |
| `npm run build` | Build + typecheck (Vercel CI path) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |

## Agent Harness (ECC)

This project uses [ECC](https://github.com/affaan-m/ECC) — an agent harness optimization system that provides skills, agents, commands, hooks, and security scanning.

### Available Commands

| Command | Agent | Description |
|---|---|---|
| `/plan` | planner | Create implementation plans for complex features |
| `/tdd` | tdd-guide | Enforce TDD workflow with 80%+ coverage |
| `/code-review` | code-reviewer | Review code for quality, security, maintainability |
| `/security` | security-reviewer | Comprehensive security review |
| `/build-fix` | build-error-resolver | Fix build and TypeScript errors |
| `/e2e` | e2e-runner | Generate and run E2E tests |
| `/refactor-clean` | refactor-cleaner | Remove dead code and consolidate duplicates |
| `/orchestrate` | planner | Multi-agent orchestration for complex tasks |
| `/verify` | — | Run verification loop (build, types, lint, tests) |

### Available Agents

- **planner** — Implementation planning for complex features
- **architect** — System design and architectural decisions
- **code-reviewer** — Code quality, security, and maintainability review
- **security-reviewer** — Security vulnerability detection and remediation
- **tdd-guide** — Test-driven development workflow enforcement
- **build-error-resolver** — Build and TypeScript error resolution
- **e2e-runner** — End-to-end testing with Playwright
- **database-reviewer** — PostgreSQL/Supabase database optimization
- **doc-updater** — Documentation and codemap updates
- **refactor-cleaner** — Dead code cleanup and consolidation

### Available Skills

Skills are loaded automatically. Key skills include:
- `coding-standards` — Naming, readability, immutability, code quality
- `frontend-patterns` — React, Next.js, state management, performance
- `tdd-workflow` — Test-driven development with 80%+ coverage
- `security-review` — Security checklist and patterns
- `verification-loop` — Comprehensive verification system
- `eval-harness` — Eval-driven development framework

## Context7 MCP

[Context7](https://context7.com) provides up-to-date library documentation for AI coding assistants.

### CLI Commands

```bash
# Search for libraries
ctx7 library "next.js" "middleware authentication"

# Fetch documentation
ctx7 docs /vercel/next.js "middleware authentication redirect"
```

### MCP Tools

- `resolve-library-id` — Resolve a library name to a Context7 library ID
- `query-docs` — Retrieve documentation for a library

### Setup

```bash
# Install CLI
npm install -g ctx7

# Configure for OpenCode
npx ctx7 setup --opencode --mcp --yes
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Avoid `any` — use proper types
- Prefer immutability (spread operator, no direct mutation)
- Use Zod schemas for input validation

### React

- Functional components with typed props
- Composition over inheritance
- Custom hooks for reusable logic
- Memoization for performance (`useMemo`, `useCallback`, `React.memo`)

### File Organization

- Many small files (200-400 lines typical, 800 max)
- High cohesion, low coupling
- Organize by feature/domain, not by type
- Barrel exports (`index.ts`) for module public API

### Error Handling

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('User-friendly message')
}
```

## Testing

This project uses `npm run build` as the primary typecheck path. No separate test framework is currently installed.

For new features, use the `/tdd` command to enforce test-driven development with 80%+ coverage.

## Project Structure

```
lexpertz-ai-portfolio/
├── src/
│   ├── app/              # Next.js App Router (layouts, pages, route groups)
│   │   ├── (marketing)/  # Marketing routes (about, case-studies, contact, etc.)
│   │   ├── products/     # Product pages (axiom-verify)
│   │   └── globals.css   # Global styles with HSL design tokens
│   ├── components/
│   │   ├── ui/           # shadcn/ui primitives
│   │   ├── layout/       # Custom layout components
│   │   ├── sections/     # Homepage section components
│   │   ├── motion/       # Framer Motion wrappers
│   │   ├── forms/        # Form components
│   │   └── providers/    # Context providers
│   ├── content/          # Static TypeScript data (services, case-studies, team, insights)
│   └── lib/
│       ├── validators/   # Zod schemas
│       ├── design-tokens.ts  # HSL color tokens
│       ├── motion-tokens.ts  # Animation tokens
│       └── utils/        # Utility functions
├── skills/               # OpenCode agent skills
├── public/               # Static assets
├── AGENTS.md             # Agent guide (commands, architecture, tools)
├── DEVELOPMENT.md        # This file
└── README.md             # Project overview
```

## Deployment

Connected to Vercel for CI/CD:

1. Push to `main` triggers build and lint via GitHub Actions
2. Lint + Type Check run via `npm run build`
3. Automatic deployment to Vercel Edge Network upon success

## Useful Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [ECC Repository](https://github.com/affaan-m/ECC)
- [Context7](https://context7.com)
