# Testing

## Validation commands

This template provides static analysis through Biome, colocated unit and
component testing through Vitest, Playwright E2E testing, and production
validation through Next.js. Run the checks relevant to a change before opening
a pull request:

```bash
pnpm lint
pnpm test
pnpm build
```

`pnpm lint` runs `biome check`. `pnpm test` runs Vitest once. `pnpm build`
performs a production Next.js build and catches TypeScript and framework
integration errors. Use `pnpm test:watch` while writing a colocated Vitest
test. Run `pnpm test:e2e` when an E2E specification is affected or added; it
builds and starts the production application through Playwright.

## Current lint baseline

`pnpm lint` currently reports existing repository-wide formatting diagnostics.
Run it for every change, report the result, and do not represent it as passing
until the baseline is repaired. When a change introduces a new diagnostic, fix
that diagnostic in the same change; do not reformat unrelated files solely to
make the command pass.

For a manual smoke test, run:

```bash
pnpm dev
```

Then verify the affected route in a browser, including its loading, error, and
localized states where applicable.

## Test placement and scope

- Place Vitest unit tests for functions, utilities, hooks, and business logic
  next to their source module with `*.test.ts`.
- Place React component and JSX integration tests next to their source module
  with `*.test.tsx`.
- Place Playwright E2E user journeys in root `tests/` with `*.spec.ts`. Keep
  E2E fixtures and helpers there only when they are E2E-specific and shared.
- Do not create empty test directories or placeholder tests. Do not create a
  global `unit/`, `components/`, or `integration/` directory, nor a
  `__tests__/` folder for every component.
- Preserve App Router organization: colocating a test does not make a route
  public, and `_components` and `_lib` remain suitable private locations.

Use Vitest with React Testing Library for synchronous units, components, and
integrations. Favor `getByRole` and other accessible queries. Test observable
behavior, not external-library internals; keep feature-specific mocks and
fixtures local until there is actual reuse. Use small snapshots only when their
output is the contract.

Use Playwright for browser journeys and asynchronous Server Components. Vitest
does not currently support async Server Components completely, so do not build
testing workarounds for them. Add MSW only when a shared network-mocking need
exists.

At minimum, new tests should be deterministic, independent of external
services, and safe to run in CI. Mock network and clock dependencies where
needed. Do not store production credentials or personal data in test fixtures.

Before the first E2E run in a new environment, install browser binaries with:

```bash
pnpm exec playwright install
```

## Pull request evidence

In the pull request description, state the commands run and the relevant
manual checks. Call out deliberately untested behavior, the reason it could
not be exercised, and any known baseline validation failure.
