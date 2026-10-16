# Architecture

## Overview

This repository is a Next.js 16 application using the App Router, React 19,
TypeScript, Tailwind CSS, shadcn/ui, and `next-intl`. It uses the optional
`src/` directory to keep application source separate from project
configuration and repository documentation.

## Repository layout

```text
.
├── docs/
│   ├── adr/                 # Accepted architecture decisions
│   └── agents/              # Instructions for automated contributors
├── public/                  # Static assets served by Next.js
├── src/
│   ├── app/                 # App Router routes, layouts, and global styles
│   ├── components/          # Reusable application and UI components
│   ├── hooks/               # Reusable React hooks
│   ├── i18n/                # Locale routing, navigation, and request config
│   ├── lib/                 # Framework-independent utilities
│   ├── messages/            # Locale message catalogs
│   └── types/               # Shared TypeScript declarations
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── CODING_STANDARDS.md
├── DER.md                 # Entity-relationship diagram (pending persistence)
├── GLOSSARY.md
├── SECURITY.md
├── TESTING.md
└── TOOLING.md
```

`package.json`, Next.js configuration, TypeScript configuration, environment
files, and `public/` remain at the repository root, as required by the Next.js
`src/` directory convention.

## Application boundaries

- `src/app` contains routes and Next.js special files only, such as
  `page.tsx`, `layout.tsx`, `loading.tsx`, and `route.ts`.
- Shared UI belongs in `src/components`; shared non-UI helpers belong in
  `src/lib`.
- Route-specific implementation details may be colocated with a route. Use an
  underscore-prefixed folder such as `_components` or `_lib` when explicitly
  marking it as non-routable is useful.
- Use App Router route groups, for example `(marketing)`, to organize related
  routes or layouts without changing their URLs.

## Test boundaries

- Colocate Vitest tests with the `src/` code they verify: use `*.test.ts` for
  non-JSX modules and `*.test.tsx` for React or JSX integrations.
- Keep Playwright E2E specifications in root `tests/` with `*.spec.ts`.
  Feature-specific fixtures and helpers stay with their consumer unless shared
  by multiple E2E specifications.
- Keep route-private test subjects under existing `_components` and `_lib`
  boundaries; test placement must not alter a route's URL or structure.

See ADR 0006 for the adopted architecture and [TESTING.md](TESTING.md) for
commands and implementation conventions.
- Internationalization is implemented through `src/i18n` and
  `src/messages`; see ADR 0004 for the adopted `next-intl` design.

## Decision records

Architecture decisions that have lasting consequences are recorded in
`docs/adr/`. New ADRs are numbered sequentially and must describe the context,
decision, and consequences before the related implementation is merged.
