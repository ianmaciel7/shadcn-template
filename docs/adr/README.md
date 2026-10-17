# Architecture decision records

Accepted records preserve the reasoning and implementation context at their
original date. Read current operational details in the
[documentation guide](../README.md), and follow the
[naming and immutability rule](../../.agents/rules/adr-naming.md) for new records.

## Index

| Record | Status | Subject |
| --- | --- | --- |
| [0001](0001-configure-nextjs.md) | Accepted | Next.js App Router, TypeScript, Biome, React Compiler, pnpm |
| [0002](0002-configure-shadcn-ui.md) | Accepted | Base UI, locally owned components, typography, AI Elements |
| [0003](0003-configure-theming.md) | Accepted | Class-based light, dark, and system themes |
| [0004](0004-configure-internationalization.md) | Accepted | next-intl, locale catalogs, providers, typed messages |
| [0005](0005-document-project-standards.md) | Accepted; testing detail superseded by 0006 | Documentation ownership and repository standards |
| [0006](0006-configure-testing.md) | Accepted | Colocated Vitest tests and root Playwright specifications |
| [0007](0007-configure-quality-tooling.md) | Partially superseded by 0008 | Quality tools, hooks, agent integrations |
| [0008](0008-configure-continuous-integration.md) | Accepted | Provider-independent CI and workflow hardening |

## Current operational clarifications

- ADR 0005's absence of an automated runner is historical. ADR 0006 adopted
  testing; [TESTING.md](../../TESTING.md) describes the current unit, browser,
  accessibility, visual, and mutation layers. Vitest now also includes the
  Biome rule regression tests outside `src/`.
- ADR 0007's runtime description reflects its adoption date. The supported
  Node range is now `^22.19.0 || ^24.5.0` in `package.json`; CI selects Node 22.
- ADR 0008 describes weekly Stryker and Lighthouse. The current
  `scheduled-quality.yml` schedules Lighthouse weekly and gates Stryker on
  manual dispatch until hosted behavior is verified.
- Python security tools are pinned in
  `.github/dependabot-mirror/ci-python/requirements.txt`, installed with
  `pip install -r`; they are no longer pinned inline in the workflow.
- Locale helpers in ADR 0004 do not create localized routes. Current requests
  resolve a locale from an explicit value or cookie; the application has no
  locale route segment or request proxy. See
  [Architecture](../../ARCHITECTURE.md#internationalization).

These clarifications describe the checked-in configuration. They do not claim
that a hosted run succeeded or that all tooling is installed on a contributor's
machine. Use the latest CI results as execution evidence.

## Adding a decision

Use the next unused four-digit number and an imperative kebab-case filename.
Record the context, decision, and consequences. If it replaces a decision,
identify the superseded record and scope, preserving the accepted content.
