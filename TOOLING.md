# Tooling

## Tool inventory

This is the operational inventory of tools installed or configured by this
repository. It is not a catalog of every runtime library; `package.json` and
`pnpm-lock.yaml` remain the source of truth for those dependencies.

| Category | Tool | Version or status | Purpose | Source of truth |
| --- | --- | --- | --- | --- |
| Package management | pnpm | 12.11.2 | Installs dependencies and runs project commands. Do not use npm or Yarn to modify dependencies. | `package.json`, `pnpm-lock.yaml` |
| Application build | Next.js | 16.4.1 | App Router framework, development server, production build, and server runtime. | `package.json`, `next.config.ts` |
| Bundler | Turbopack | Included with Next.js | Bundles development and production builds; loads Tailwind CSS through `@tailwindcss/turbopack`. | `next.config.ts` |
| Language | TypeScript | `^5` (5.9.3 locked) | Provides type checking and the `@/*` import alias. | `package.json`, `tsconfig.json`, `pnpm-lock.yaml` |
| Compiler | React Compiler | 1.0.0 | Optimizes React components through Next.js configuration. | `package.json`, `next.config.ts` |
| Styling | Tailwind CSS | `^4` | Generates utility CSS and is loaded by Turbopack. | `package.json`, `next.config.ts`, `src/app/globals.css` |
| Code quality | Biome | 2.4.2 | Formats code, runs lint checks, and organizes imports. | `package.json`, `biome.json` |
| Custom code quality rules | GritQL | Executed by Biome; no standalone CLI | Supplies the three project-specific Next.js rules for layout props, page props, and route context. | `.biome/rules/nextjs/*.grit`, `biome.json` |
| UI scaffolding | shadcn/ui CLI | 4.21.5 | Adds and maintains locally owned UI components using the configured aliases and style. | `package.json`, `components.json` |
| Agent configuration | Agents CLI | Repository configuration; CLI is externally provided | Synchronizes reusable agent skills and MCP settings. | `.agents/agents.json`, `.agents/skills/` |

## Host prerequisites

- **Node.js:** required to run pnpm and the application toolchain, but its
  version is not pinned by this repository.
- **Git:** used by Biome's VCS integration and the repository workflow.

## Package management

Use [pnpm](https://pnpm.io/) `12.11.2`, as pinned by the `packageManager`
field in `package.json`. The `pnpm-lock.yaml` file is the lockfile of record.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server. |
| `pnpm build` | Create and validate the optimized production build. |
| `pnpm start` | Serve a completed production build. |
| `pnpm lint` | Run Biome checks. |
| `pnpm format` | Apply Biome formatting changes. |

See [TESTING.md](TESTING.md) for the required validation and manual smoke-test
workflow.

## Application libraries

The application additionally uses React 19, `next-intl`, `next-themes`, Lucide
icons, and the locally owned shadcn/ui component source. These are application
libraries rather than developer tools; see `package.json` for their complete,
current list. Internationalization starts at `src/i18n/request.ts`, and the
theming decision is recorded in ADR 0003.

## Configuration sources

| File | Responsibility |
| --- | --- |
| `package.json` | Dependencies and executable scripts. |
| `pnpm-workspace.yaml` | pnpm workspace and native-build allowlist. |
| `next.config.ts` | Next.js, Turbopack, React Compiler, and `next-intl` configuration. |
| `tsconfig.json` | TypeScript compiler settings and the `@/*` alias. |
| `biome.json` | Biome formatting, linting, and custom-rule configuration. |
| `.biome/rules/nextjs/*.grit` | GritQL source for project-specific Biome rules. |
| `components.json` | shadcn/ui configuration and import aliases. |
| `.agents/agents.json` | Agent and MCP configuration. |

## Agent tooling

Reusable agent skills and MCP configuration live in `.agents/`. Run
`agents sync` after changing `.agents/agents.json` or reusable skills, and use
`agents sync --check` before opening a pull request that changes them.

Use Context7 when current library documentation is needed. The project-local
`context7-cli` skill documents its two-step library lookup and documentation
query flow.
