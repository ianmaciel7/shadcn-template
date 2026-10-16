# Testing

## Validation commands

Run the checks relevant to a change before opening a pull request. See
[TOOLING.md](TOOLING.md) for every command and the tools behind them.

| Command | Use it for |
| --- | --- |
| `pnpm verify:fast` | Every change: Biome CI, typecheck, and unit tests. Runs in seconds. |
| `pnpm verify:full` | Before a pull request: adds architecture, unused code, duplication, spelling, Markdown, complexity, React diagnostics, browser tests, and a production build with size budgets. |
| `pnpm verify:e2e` | Changes that affect pages or visual output: functional, accessibility, and visual Playwright specs. |
| `pnpm verify:security` | Dependency or configuration changes: Semgrep, Gitleaks, and `pnpm audit`. Needs the host tools in [TOOLING.md](TOOLING.md#host-prerequisites). |

`pnpm verify:fast` must stay fast. It runs only the `unit` Vitest project; browser,
end-to-end, visual, and mutation tests are deliberately outside it.

For a manual smoke test, run `pnpm dev` and verify the affected route in a
browser, including its loading, error, and localized states where applicable.

## Test layers

| Layer | Location and name | Runner | Command | Use for |
| --- | --- | --- | --- | --- |
| Unit and hook | `src/**/*.test.ts(x)` next to the source | Vitest `unit` project, `jsdom` | `pnpm test` | Functions, utilities, hooks, and business logic. |
| Property-based | Inside unit tests, with `fast-check` | Vitest `unit` | `pnpm test` | Pure logic with a large input space, such as `isLocale`. |
| Browser component | `src/**/*.browser.test.tsx` | Vitest `browser` project, Chromium | `pnpm test:browser` | Behavior that needs a real browser: viewport and media queries, focus, real events. |
| End-to-end | `tests/*.spec.ts` | Playwright | `pnpm test:e2e` | User journeys against a production build. |
| Accessibility | `tests/a11y.spec.ts`, titled `@a11y` | Playwright and axe-core | `pnpm test:a11y` | Automated WCAG 2.x A/AA scans in light and dark mode. |
| Visual regression | `tests/visual.spec.ts`, titled `@visual` | Playwright screenshots (CI only) | `pnpm test:visual` | Layout and theme changes in rendered pages. |
| Mutation | `stryker.config.json` | Stryker | `pnpm test:mutation` | On-demand check of test strength. Currently unreliable; see [TOOLING.md](TOOLING.md#known-limitations). |

Choose the lightest layer that can fail for the right reason. Keep a behavior
in `jsdom` when a stub is enough, and move it to Browser Mode only when the real
browser matters (for example, `use-mobile.browser.test.tsx` uses a real viewport
instead of a stubbed `matchMedia`).

## Test placement and scope

- Place Vitest unit tests for functions, utilities, hooks, and business logic
  next to their source module with `*.test.ts`.
- Place React component and JSX integration tests next to their source module
  with `*.test.tsx`. Use `*.browser.test.tsx` for Browser Mode tests.
- Place Playwright specifications in root `tests/` with `*.spec.ts`. Keep E2E
  fixtures and helpers there only when they are E2E-specific and shared.
- Do not create empty test directories or placeholder tests. Do not create a
  global `unit/`, `components/`, or `integration/` directory, nor a
  `__tests__/` folder for every component.
- Preserve App Router organization: colocating a test does not make a route
  public, and `_components` and `_lib` remain suitable private locations.
- Do not write a test only to make a tool report success. When a tool has no
  suitable subject yet, leave it unused and say so.

Use Vitest with React Testing Library for synchronous units, components, and
integrations. Favor `getByRole` and other accessible queries. Test observable
behavior, not external-library internals; keep feature-specific mocks and
fixtures local until there is actual reuse. Use small snapshots only when their
output is the contract.

Use Playwright for browser journeys and asynchronous Server Components. Vitest
does not currently support async Server Components completely, so do not build
testing workarounds for them. Add MSW only when a shared network-mocking need
exists (ADR 0006).

At minimum, new tests should be deterministic, independent of external
services, and safe to run in CI. Mock network and clock dependencies where
needed. Do not store production credentials or personal data in test fixtures.

## Visual regression workflow

Baselines are Linux screenshots, generated and compared in CI inside the pinned
Playwright container, so they never depend on your machine. Locally, the
`@visual` specs are skipped (set `PLAYWRIGHT_VISUAL=1` to run them anyway).

1. Open a pull request or push. The **End-to-end, accessibility and visual** job
   compares screenshots and uploads the `playwright-report` artifact; open it to
   see the expected, actual, and diff images.
2. If the change is not intentional, fix the code.
3. If it is intentional, run the **Update visual baselines** workflow (Actions
   tab, or `gh workflow run visual-baselines.yml --ref <branch>`), then download
   and review the images and commit them:

   ```bash
   gh run download <run-id> --name visual-baselines      --dir tests/visual.spec.ts-snapshots
   ```

Differences up to 1% of pixels are tolerated (`maxDiffPixelRatio` in
`playwright.config.ts`). Never update baselines just to silence a failure.

## Component workbench

Write a colocated `*.stories.tsx` next to a component to review it in isolation:

```bash
pnpm ladle         # serve the workbench
pnpm ladle:build   # production build in reports/ladle
```

`.ladle/components.tsx` wraps every story in the same providers as
`src/app/layout.tsx` (theme, intl, tooltip) and loads `src/app/globals.css`.
Cover the variants and states a reviewer needs to see, not every prop.

## Coverage, complexity, and size

- `pnpm test:coverage` writes `coverage/`. It measures application code and
  leaves out the vendored `src/components/ui` and `src/components/ai-elements`.
- `pnpm analyze:health` feeds that coverage to Fallow so CRAP scores reflect real
  tests. Add a test before accepting a complex, untested function.
- `pnpm analyze:size` builds the app and fails when generated client JavaScript or
  CSS exceeds the gzip budgets in `.size-limit.json`. Raise a budget only with a
  reason in the pull request.

## Continuous integration

`.github/workflows/ci.yml` runs `pnpm verify:full`, `pnpm verify:e2e`, and
`pnpm audit` on pushes to `main` and on pull requests. Run `pnpm check:workflows`
after editing a workflow, and keep actions and the Playwright container pinned
by commit SHA or digest.

## First-time setup

Install the browser binaries once per environment:

```bash
pnpm exec playwright install chromium
```

Playwright starts the application itself (`pnpm build && pnpm start`), reusing a
server on port 3000 when one is already running outside CI.

## Pull request evidence

In the pull request description, state the commands run and the relevant
manual checks. Call out deliberately untested behavior, the reason it could
not be exercised, and any known baseline validation failure.
