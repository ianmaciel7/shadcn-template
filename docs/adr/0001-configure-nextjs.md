# ADR 0001: Configure Next.js

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context
We need a modern, high-performance base template for Next.js applications featuring shadcn/ui. The project requires fast linting/formatting, strict typing, and forward-looking React capabilities.

## Decision
We bootstrap the base project using the following command and configuration:

```bash
pnpm create next-app . --ts --tailwind --biome --app --src-dir --react-compiler
```

Key architectural choices:
1. **Next.js App Router**: Modern React Server Components architecture inside `src/app`.
2. **Biome**: Adopted for linting and formatting in place of traditional ESLint + Prettier for faster execution and unified toolchain.
3. **React Compiler**: Enabled out-of-the-box to automate memoization (`useMemo`, `useCallback`).
4. **Tailwind CSS**: Utility-first CSS configured for styling and integration with shadcn/ui.
5. **Package Manager**: `pnpm` for deterministic, disk-efficient dependency resolution.

## Consequences
- **Positive**:
  - Blazing fast lint/format via Biome.
  - Automatic component optimization via React Compiler.
  - Standardized directory structure under `src/`.
- **Negative / Trade-offs**:
  - Some third-party ESLint rules/plugins do not have 1:1 Biome equivalents.
  - React Compiler requires strictly following the Rules of React without mutable workarounds.
