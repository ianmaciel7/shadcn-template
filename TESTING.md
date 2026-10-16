# Testing

## Current validation baseline

This template currently provides static analysis through Biome and production
validation through Next.js. Run both before opening a pull request:

```bash
pnpm lint
pnpm build
```

`pnpm lint` runs `biome check`. `pnpm build` performs a production Next.js
build and catches TypeScript and framework integration errors.

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

## Adding automated tests

No unit, integration, or end-to-end test runner is configured yet. When adding
one, choose it deliberately, add a package script, document the command here,
and cover the behavior changed rather than implementation details.

At minimum, new tests should be deterministic, independent of external
services, and safe to run in CI. Mock network and clock dependencies where
needed. Do not store production credentials or personal data in test fixtures.

## Pull request evidence

In the pull request description, state the commands run and the relevant
manual checks. Call out deliberately untested behavior, the reason it could
not be exercised, and any known baseline validation failure.
