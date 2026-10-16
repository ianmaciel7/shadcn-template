# ADR 0003: Pre-install All shadcn/ui Components in Starter Template

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context
As a foundational template repository, developers will use this project to build complete web applications and prototypes rapidly. Having to manually look up and install individual UI components (`shadcn add dialog`, `shadcn add sheet`, etc.) creates friction during early prototyping and agent-driven feature implementations.

## Decision
We pre-install all available UI components provided by the shadcn/ui registry using:

```bash
pnpm dlx shadcn@latest add --all -y
```

Key architectural considerations:
1. **Batteries-Included Template**: All UI building blocks (dialogs, cards, forms, menus, tables, tooltips, popovers, tabs, etc.) are readily available in `src/components/ui/`.
2. **Zero Runtime Tree-Shaking Penalty**: Because Next.js and Turbopack bundle code statically per route, unused components in `src/components/ui/` do not pollute the production client bundle.
3. **Agent and Developer Velocity**: Both human developers and AI coding agents can immediately compose full interfaces without executing external CLI steps to fetch individual components.
4. **Biome Linting Consistency**: All installed components are formatted and verified against Biome rules.

## Consequences
- **Positive**:
  - Immediate availability of all UI primitives out-of-the-box.
  - Faster development and prototyping cycles.
  - Eliminates network dependency on shadcn registry during offline or CI builds.
- **Negative / Trade-offs**:
  - Increases repo file count inside `src/components/ui/`.
  - Upstream component updates across dozens of files must be maintained over time if breaking changes occur.
