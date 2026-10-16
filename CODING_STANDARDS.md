# Coding Standards

## Sources of truth

When standards conflict, apply them in this order:

1. `AGENTS.md` for repository-wide engineering rules.
2. Accepted ADRs in `docs/adr/` for architectural decisions.
3. Tool configuration (`biome.json`, `tsconfig.json`, `next.config.ts`, and
   `components.json`) for executable rules.
4. This document for day-to-day conventions that do not belong in tooling.

## TypeScript and React

- Write TypeScript that passes the repository's strict compiler configuration.
- Follow the Rules of React. React Compiler is enabled; do not add manual
  memoization without a measured reason.
- Prefer Server Components. Add `"use client"` only at the smallest boundary
  that needs browser APIs, state, effects, or event handlers.
- Keep client-only providers in dedicated component seams so route layouts can
  remain Server Components.

## Next.js App Router

- Keep route entrypoints and Next.js special files in `src/app`.
- Use the generated `PageProps`, `LayoutProps`, and `RouteContext` helpers for
  route parameters rather than hand-written equivalents.
- Colocate route-specific code when it improves locality. Use `_components` or
  `_lib` when marking the folder as a private implementation detail is useful.
- Use route groups only to organize routes or layouts without changing the URL.

## Components and styling

- Reuse `src/components/ui` primitives before creating new ones.
- Follow the existing shadcn component convention: declare a named function
  and export it explicitly (for example, `function Button()` then
  `export { Button }`).
- Use the configured `@/*` path aliases instead of deep relative imports when
  crossing module boundaries.
- Use Tailwind CSS and the existing design tokens. Avoid inline styles unless a
  value must be computed at runtime.

## Internationalization

- Put user-facing application text in the `next-intl` message catalogs under
  `src/messages/`.
- Do not introduce hardcoded JSX text outside the documented UI primitive
  exceptions. Biome enforces this rule for application code.
- When metadata varies by locale, use the `next-intl` metadata pattern from
  ADR 0004.

## Quality gate

- Format only the files you changed, then run the relevant checks from
  [TESTING.md](TESTING.md).
- Do not weaken or disable a lint rule to accommodate new application code
  without recording the rationale in an ADR when the decision is durable.
- Keep changes focused and add or update tests when automated test tooling is
  introduced.
