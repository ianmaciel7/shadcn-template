# ADR 0006: Configure testing

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context

The App Router template had no automated test runner, test configuration, or
test-file convention. Without an explicit boundary, a future contributor could
create competing global test directories, mix browser and DOM tests, or move
route code only to satisfy a test runner.

Next.js documents that test files may be colocated in the App Router, that
private `_components` and `_lib` folders are safe non-routable locations, and
that a route is exposed only by a `page` or `route` file. Its Vitest guide
recommends Vitest with React Testing Library and `jsdom`. Its testing guide
recommends E2E tests for asynchronous Server
Components because unit-test support for them is incomplete. Its Playwright
guide uses a root `tests/` directory and recommends exercising a production
build.

These are framework recommendations, not a mandatory Next.js directory
convention. The project must make a consistent architectural choice about
where its own tests live and how its two runners are kept separate.

## Decision

We adopt colocation for Vitest tests and reserve the root `tests/` directory
for Playwright E2E specifications:

1. Unit tests for functions, utilities, hooks, and business logic use
   `*.test.ts` next to the module they verify.
2. React component and JSX integration tests use `*.test.tsx` next to the
   component or route-private module they verify.
3. Route-specific tests remain beside the relevant code and preserve existing
   `_components` and `_lib` private-folder boundaries. Tests do not cause route
   directories or special files to move.
4. E2E specifications live in `tests/` with the `*.spec.ts` suffix. Shared
   E2E-only fixtures and helpers may live under `tests/` only once they have
   consumers.
5. Vitest uses `vitest.config.mts` and includes only colocated files beneath
   `src/`. It runs in `jsdom` with React Testing Library and resolves the
   existing TypeScript aliases through Vite's native `tsconfigPaths` option,
   avoiding the now-redundant path plugin.
6. Playwright uses `playwright.config.ts`, discovers only `tests/`, and starts
   a production build and server for E2E execution. The first project targets
   Chromium; cross-browser projects are added only when a supported product
   requirement warrants them.
7. Test code verifies observable behavior. Use role-based accessible queries
   for rendered UI, mock collaborators only at owned boundaries, use snapshots
   only when a small stable output is the actual contract, and prefer E2E tests
   for asynchronous Server Components.
8. MSW is not installed preemptively. Add it only when repeated network mocks
   demonstrate a shared need.

This ADR supersedes the now-historical "no automated test runner" consequence
in ADR 0005. ADR 0005 remains unchanged under the repository's immutable-ADR
policy.

## Consequences

- **Positive**:
  - Tests stay close to the behavior they protect without changing App Router
    URLs or creating a parallel application hierarchy.
  - Vitest and Playwright have unambiguous ownership of their file sets and
    commands.
  - The template gains a minimal, runnable behavior test instead of empty
    scaffold directories or placeholder E2E specifications.
  - The setup follows the documented Next.js tool choices while keeping project
    folder naming and browser scope explicit as project decisions.
- **Negative / Trade-offs**:
  - A feature can contain source and test files together, so contributors must
    keep the test's concern as narrow as the module's concern.
  - Playwright requires its browser binaries to be installed before E2E tests
    can run in a new environment.
  - Asynchronous Server Components need E2E coverage rather than a Vitest
    unit-test workaround.

## References

- [Next.js testing overview](https://nextjs.org/docs/app/guides/testing)
- [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest)
- [Next.js Playwright guide](https://nextjs.org/docs/app/guides/testing/playwright)
- [Next.js project structure guide](https://nextjs.org/docs/app/getting-started/project-structure)
