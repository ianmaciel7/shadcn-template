# Tooling

## Package management

Use [pnpm](https://pnpm.io/) `12.11.2`, as pinned by the `packageManager`
field in `package.json`. Do not add or update dependencies with another package
manager; `pnpm-lock.yaml` is the lockfile of record.

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

## Application toolchain

- **Framework:** Next.js 16.4.1 with the App Router and Turbopack.
- **Language:** TypeScript with strict type checking and the Next.js TypeScript
  plugin.
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, and Lucide icons.
- **Internationalization:** `next-intl`; its request configuration is
  `src/i18n/request.ts`.
- **Theming:** `next-themes`; see ADR 0003.
- **Code quality:** Biome 2.4.2 performs formatting, linting, and import
  organization. Project-specific Next.js rules live in `.biome/rules/nextjs/`.

## Configuration sources

| File | Responsibility |
| --- | --- |
| `package.json` | Dependencies and executable scripts. |
| `pnpm-workspace.yaml` | pnpm workspace and native-build allowlist. |
| `next.config.ts` | Next.js, Turbopack, React Compiler, and `next-intl` configuration. |
| `tsconfig.json` | TypeScript compiler settings and the `@/*` alias. |
| `biome.json` | Biome formatting, linting, and custom-rule configuration. |
| `components.json` | shadcn/ui configuration and import aliases. |

## Agent tooling

Reusable agent skills and MCP configuration live in `.agents/`. Run
`agents sync` after changing `.agents/agents.json` or reusable skills, and use
`agents sync --check` before opening a pull request that changes them.

Use Context7 when current library documentation is needed. The project-local
`context7-cli` skill documents its two-step library lookup and documentation
query flow.
