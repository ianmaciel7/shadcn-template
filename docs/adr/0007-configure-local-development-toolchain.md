# ADR 0007: Configure local development toolchain

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context

The template needs a reproducible, local-first development toolchain that
improves feedback for a solo developer and coding agents without duplicating
the existing responsibilities of Biome, Vitest, Playwright, or Next.js.

The existing project already adopts strict TypeScript, Biome with project GritQL
rules, Vitest with React Testing Library, and Playwright. ADR 0006 establishes
test placement and explicitly defers MSW until a shared HTTP-mocking need is
demonstrated. Those decisions remain in force.

## Decision

1. Keep pnpm as the only JavaScript package manager and Node.js 22 LTS as the
   supported runtime. Pin pnpm with `packageManager`, document the compatible
   Node range in `engines`, and use frozen-lockfile installs for verification.
2. Retain Biome as the sole formatter and primary linter. Keep its existing
   Next.js, React, import-organization, and narrowly scoped GritQL rules; do
   not add ESLint or Prettier.
3. Add focused local analysis tools with separate responsibilities: Knip for
   unused code, dependency-cruiser for dependency boundaries and cycles, jscpd
   for meaningful duplication, ast-grep for structural analysis, CSpell and
   markdownlint-cli2 for documentation quality, and Semgrep/Gitleaks/pnpm audit
   for security checks.
4. Extend the existing test strategy without changing ADR 0006 placement:
   React Testing Library helpers and Vitest Browser Mode cover component
   behavior; Playwright remains the E2E owner and uses axe-core for automated
   accessibility scans. Stryker, fast-check, Lighthouse, screenshot assertions,
   and bundle/size analysis are on-demand deep checks.
5. Husky owns effective Git hook installation. lint-staged owns staged-file
   Biome checks, Commitlint owns commit-message validation, and pre-commit is
   configured only for repository-integrity checks rather than duplicate code
   formatting. Enforce LF line endings through `.gitattributes` so Biome and
   the hooks behave identically on Windows.
6. Add only the Serena and Next.js DevTools MCP servers through the existing
   agents CLI configuration. Keep generated graphs, reports, browser output,
   and local MCP state untracked.
7. Do not install MSW unless ADR 0006 is superseded after a demonstrated shared
   HTTP-mocking requirement. Do not approve third-party build scripts unless a
   reviewed package needs the script for documented core functionality. Do not
   approve tools that install agent skills or add unrequested MCP servers.

## Consequences

- **Positive**: feedback remains fast by default, deeper checks are available
  on demand, and every tool has a clear owner and configuration location.
- **Positive**: analysis, security scanning, and documentation checks run
  locally without requiring paid services or uploading application source.
- **Negative**: the larger dependency graph and optional native binaries need
  periodic compatibility review with the Node LTS release.
- **Negative**: Browser, mutation, performance, and history scans are
  intentionally slower and are not pre-commit checks.

## Alternatives considered

- Add ESLint and Prettier: rejected because Biome already owns overlapping
  linting, formatting, and import organization.
- Install MSW now: rejected because it conflicts with ADR 0006's accepted
  deferred-adoption rule.
- Use multiple competing hook managers: rejected because Git hooks need a
  single effective owner for predictable cross-platform behavior.

## References

- [Next.js TypeScript](https://nextjs.org/docs/app/api-reference/config/typescript)
- [Next.js testing](https://nextjs.org/docs/app/guides/testing)
- [Biome configuration](https://biomejs.dev/reference/configuration/)
- [Vitest Browser Mode](https://vitest.dev/guide/browser/)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Knip configuration](https://knip.dev/reference/configuration)
- [Husky documentation](https://typicode.github.io/husky/)
