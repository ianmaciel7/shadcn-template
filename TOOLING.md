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
| Styling | Tailwind CSS | `^4` | Generates utility CSS and is loaded by Turbopack (and by Vite for Ladle). | `package.json`, `next.config.ts`, `.ladle/vite.config.mjs`, `src/app/globals.css` |
| Code quality | Biome | 2.4.2 | Formats code, runs lint checks, and organizes imports. | `package.json`, `biome.json` |
| Custom code quality rules | GritQL | Executed by Biome; no standalone CLI | Supplies the three project-specific Next.js rules for layout props, page props, and route context. | `.biome/rules/nextjs/*.grit`, `biome.json` |
| UI scaffolding | shadcn/ui CLI | 4.21.5 | Adds and maintains locally owned UI components using the configured aliases and style. | `package.json`, `components.json` |
| Component workbench | Ladle | 5.1.1 | Develops and reviews components in isolation through colocated `*.stories.tsx` files. | `.ladle/`, `package.json` |
| Unit and component testing | Vitest + React Testing Library | Vitest 5.0.5 | Runs colocated unit, hook, and component tests in `jsdom` (`unit` project). | `vitest.config.mts`, `package.json` |
| Property-based testing | fast-check | 4.10.2 | Generates inputs for pure logic such as `isLocale`. | `package.json`, `src/i18n/routing.test.ts` |
| Browser component testing | Vitest Browser Mode + `vitest-browser-react` | Chromium through Playwright | Runs `*.browser.test.tsx` files in a real browser (`browser` project). | `vitest.config.mts`, `package.json` |
| End-to-end testing | Playwright | `^1.64.1` | Runs `tests/*.spec.ts` against a production build. | `playwright.config.ts`, `tests/` |
| Accessibility testing | `@axe-core/playwright` | 4.14.0 | Scans pages for WCAG 2.x A/AA violations in Playwright (`@a11y`). | `tests/a11y.spec.ts` |
| Visual regression | Playwright screenshots | Committed per-platform baselines | Compares full-page screenshots against baselines (`@visual`). | `tests/visual.spec.ts`, `tests/visual.spec.ts-snapshots/` |
| Mutation testing | Stryker + Vitest runner | 10.0.0 (see [Known limitations](#known-limitations)) | On-demand mutation analysis of selected logic. | `stryker.config.json`, `vitest.mutation.config.mts` |
| Unused code | Knip | 6.41.0 | Finds unused files, exports, and dependencies. | `knip.jsonc` |
| Architecture boundaries | dependency-cruiser | 18.6.0 | Enforces layering rules and forbids dependency cycles. | `.dependency-cruiser.cjs` |
| Duplication | jscpd | 5.4.1 | Reports meaningful duplicated code. | `.jscpd.json` |
| Complexity and health | Fallow | 3.33.1 | Reports complexity, CRAP score (from real coverage), and hotspots. Dead-code, duplication, and architecture analysis stay with Knip, jscpd, and dependency-cruiser. | `.fallowrc.json` |
| React diagnostics | React Doctor | 0.9.18 | Scans application React code for correctness, performance, and security issues. | `doctor.config.json` |
| Bundle budgets | Size Limit + `@size-limit/file` | 14.2.0 | Fails when generated client JavaScript or CSS exceeds its gzip budget. | `.size-limit.json` |
| Performance audit | Lighthouse | 13.5.0 | On-demand performance and accessibility report. | `package.json` |
| Spelling | CSpell | 10.4.0 | Checks spelling in code, JSON, and Markdown. | `cspell.json` |
| Markdown | markdownlint-cli2 | 0.23.3 | Lints repository Markdown. | `.markdownlint-cli2.jsonc` |
| Static security | Semgrep | Host tool | Runs project security rules. | `.semgrep.yml` |
| Secret scanning | Gitleaks | Host tool | Scans history and working tree for secrets. | `package.json` (`check:secrets`) |
| Dependency audit | `pnpm audit` | Included with pnpm | Reports known vulnerable dependencies. | `pnpm-workspace.yaml` (`auditConfig`) |
| Workflow linting | actionlint, zizmor | Host tools | Lint and audit GitHub Actions workflows once `.github/workflows` exists. | None yet |
| Codebase graph | Graphify | Host tool | Builds an on-demand knowledge graph; output goes to the ignored `graphify-out/`. | None |
| Git hooks | Husky + lint-staged + Commitlint | 9.1.7 / 16.4.0 / 21.2.3 | Check staged files with Biome and validate commit messages. | `.husky/`, `package.json`, `commitlint.config.mjs` |
| Repository integrity | pre-commit | Host tool | Runs file-integrity hooks (large files, case conflicts, JSON/YAML, merge markers). | `.pre-commit-config.yaml` |
| Agent configuration | Agents CLI | Repository configuration; CLI is externally provided | Synchronizes reusable agent skills and MCP settings (Serena, Next.js DevTools). | `.agents/agents.json`, `.agents/skills/` |

## Host prerequisites

The repository's own dependencies install with `pnpm install`. These tools live
outside pnpm and are only needed for the commands noted next to them:

| Tool | Needed for | Check |
| --- | --- | --- |
| Node.js `^22.19.0 \|\| ^24.5.0` | Everything (`engines` in `package.json`) | `node --version` |
| Git | Biome VCS integration, hooks, Fallow hotspots | `git --version` |
| Playwright browsers | `test:browser`, `test:e2e`, `test:a11y`, `test:visual` | `pnpm exec playwright install chromium` |
| pre-commit | Repository-integrity checks in the Git hook | `pre-commit --version` |
| Semgrep | `check:security` | `semgrep --version` |
| Gitleaks | `check:secrets` | `gitleaks version` |
| actionlint, zizmor | Linting workflows, once they exist | `actionlint -version`, `zizmor --version` |
| Graphify | On-demand codebase graph | `graphify --version` |

Missing `pre-commit` does not block a commit; the hook prints a warning and skips
only the integrity checks. Biome, Commitlint, and everything else run through
pnpm. In CI or on production installs, set `HUSKY=0` to skip hook installation.

On Windows, `pre-commit` can fail while building its Python virtual environment
with `WinError 206` (path too long) when Python comes from the Microsoft Store.
Either enable Windows long paths or set a short cache location, for example
`VIRTUALENV_OVERRIDE_APP_DATA=C:\vc`, before committing.

## Package management

Use [pnpm](https://pnpm.io/) `12.11.2`, as pinned by the `packageManager`
field in `package.json`. The `pnpm-lock.yaml` file is the lockfile of record.

Do not run `pnpm approve` or install tools that add agent skills; ADR 0007
forbids both. If a package reports "agent skills awaiting approval" (Fallow does),
leave them unapproved.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Develop, build, and serve the Next.js application. |
| `pnpm lint` / `pnpm lint:ci` / `pnpm format` | Biome check, CI check, and formatting. |
| `pnpm typecheck` | Generate route types and run `tsc --noEmit`. |
| `pnpm test` | Fast `unit` Vitest project in `jsdom`. |
| `pnpm test:watch` / `pnpm test:coverage` | Watch mode / coverage (writes `coverage/`). |
| `pnpm test:browser` | `browser` Vitest project in Chromium. |
| `pnpm test:e2e` | Functional Playwright specs (excludes `@a11y` and `@visual`). |
| `pnpm test:a11y` | Axe accessibility scans. |
| `pnpm test:visual` | Compare screenshots with baselines. Never rewrites them. |
| `pnpm test:visual:update` | Rewrite baselines after a reviewed, intentional UI change. |
| `pnpm test:mutation` | Stryker on selected logic (on demand; see limitations). |
| `pnpm ladle` / `pnpm ladle:build` | Serve or build the component workbench (`reports/ladle`). |
| `pnpm check:architecture` | dependency-cruiser. |
| `pnpm check:unused` | Knip. |
| `pnpm check:duplicates` | jscpd. |
| `pnpm check:spelling` / `pnpm check:markdown` | CSpell / markdownlint. |
| `pnpm check:security` / `pnpm check:secrets` / `pnpm audit` | Semgrep / Gitleaks / dependency audit. |
| `pnpm analyze:health` | Unit tests with coverage, then Fallow complexity and CRAP. |
| `pnpm analyze:react` | React Doctor. |
| `pnpm analyze:size` | Production build, then Size Limit budgets. |
| `pnpm analyze:bundle` | Next.js bundle analyzer. |
| `pnpm analyze:lighthouse` | Lighthouse report against a running server. |

### Verification entry points

| Command | Responsibility | Time |
| --- | --- | --- |
| `pnpm verify:fast` | Biome CI, typecheck, and the unit tests only. Meant to run constantly. | seconds |
| `pnpm verify:full` | `verify:fast`, plus architecture, unused code, duplication, spelling, Markdown, Fallow health, React Doctor, browser tests, and a production build with size budgets. | minutes |
| `pnpm verify:e2e` | The whole Playwright suite: functional, accessibility, and visual. | minutes |
| `pnpm verify:security` | Semgrep, Gitleaks, and the dependency audit. Needs the host tools. | seconds |

`verify:full` intentionally excludes Playwright, security scanners, mutation
testing, and Lighthouse because they are slow or need host tools. Run
`verify:e2e` and `verify:security` before opening a pull request that touches
what they cover.

See [TESTING.md](TESTING.md) for the test strategy and workflows.

## Application libraries

The application additionally uses React 19, `next-intl`, `next-themes`, Lucide
icons, and the locally owned shadcn/ui component source. These are application
libraries rather than developer tools; see `package.json` for their complete,
current list. Internationalization starts at `src/i18n/request.ts`, and the
theming decision is recorded in ADR 0003.

## Configuration sources

| File | Responsibility |
| --- | --- |
| `package.json` | Dependencies, scripts, and `lint-staged`. |
| `pnpm-workspace.yaml` | Native-build allowlist, security `overrides`, and `auditConfig`. |
| `next.config.ts` | Next.js, Turbopack, React Compiler, and `next-intl` configuration. |
| `tsconfig.json` | TypeScript compiler settings and the `@/*` alias. |
| `biome.json` | Biome formatting, linting, and custom-rule configuration. |
| `.biome/rules/nextjs/*.grit` | GritQL source for project-specific Biome rules. |
| `components.json` | shadcn/ui configuration and import aliases. |
| `vitest.config.mts` | `unit` and `browser` projects and coverage. |
| `vitest.mutation.config.mts` | Unit-only Vitest config used by Stryker. |
| `playwright.config.ts` | Playwright projects, web server, and screenshot tolerance. |
| `.ladle/config.mjs`, `.ladle/vite.config.mjs`, `.ladle/components.tsx` | Ladle stories glob, Vite (Tailwind, `@` alias), and global providers and CSS. |
| `.size-limit.json` | Size budgets for `.next/static/chunks`. |
| `knip.jsonc`, `.dependency-cruiser.cjs`, `.jscpd.json`, `.fallowrc.json`, `doctor.config.json` | Analysis tool configuration. |
| `cspell.json`, `.markdownlint-cli2.jsonc` | Documentation quality. |
| `.semgrep.yml` | Static security rules. |
| `.husky/`, `commitlint.config.mjs`, `.pre-commit-config.yaml` | Git hooks and commit validation. |
| `.gitattributes` | Enforces LF line endings so Biome and hooks behave the same on Windows. |
| `.agents/agents.json` | Agent and MCP configuration. |

Generated output (`reports/`, `coverage/`, `.next/`, `test-results/`,
`playwright-report/`, `.stryker-tmp/`, `graphify-out/`) is ignored. Ladle
configuration in `.ladle/` is versioned; only its build output is ignored.

## Known limitations

- **Stryker mutation testing is not reliable on this stack.** With
  `@stryker-mutator/vitest-runner` 10.0.0 and Vitest 5.0.5, only mutants that
  execute at import time are detected; mutants inside functions are never
  activated and always survive, so the reported score is meaningless. Activating
  a mutant manually through `__STRYKER_ACTIVE_MUTANT__` makes the tests fail as
  expected, so the targets and tests are sound. Treat `pnpm test:mutation` as
  unusable until the runner supports Vitest 5.
- **Dependency audit exception.** `braces` (GHSA-vfj7-8cjw-p6xm) has no patched
  release and is ignored in `auditConfig`. Reassess when one exists.
- **Visual baselines are per platform.** The committed screenshots are named
  `*-chromium-win32.png`. A different OS needs its own baselines, generated with
  `pnpm test:visual:update` and reviewed. Do this in the CI image once CI exists.
- **No workflows yet.** actionlint and zizmor are installed but have nothing to
  check until `.github/workflows` exists.
- **ast-grep has no rules.** `@ast-grep/cli` is installed (ADR 0007) but the
  project defines no structural rules yet, so it is not wired into any command.

## Agent tooling

Reusable agent skills and MCP configuration live in `.agents/`. Run
`agents sync` after changing `.agents/agents.json` or reusable skills, and use
`agents sync --check` before opening a pull request that changes them.

Use Context7 when current library documentation is needed. The project-local
`context7-cli` skill documents its two-step library lookup and documentation
query flow.
