# ADR 0003: Theme Provider Setup with next-themes

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context
A modern application and template must support system, dark, and light appearance modes seamlessly. We need a clean, SSR-safe client provider wrapper that integrates with Tailwind CSS class-based theming and shadcn/ui color tokens without causing hydration mismatch flashes.

## Decision
We adopt `next-themes` and create a dedicated `ThemeProvider` wrapper component in `src/components/ui/extensions/theme-provider.tsx`:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export { ThemeProvider };
```

Key architectural choices:
1. **Dedicated Client Seam**: Encapsulates client-side theme context inside a reusable boundary (`src/components/ui/extensions/theme-provider.tsx`), allowing root `layout.tsx` to remain a Server Component.
2. **Tailwind Class Synchronization**: Configured with `attribute="class"`, `defaultTheme="system"`, and `enableSystem` to toggle the `.dark` class on the `<html>` root, matching Tailwind CSS custom variant `@custom-variant dark (&:is(.dark *));`.
3. **Hydration Warning Suppression**: Root `<html>` element will include `suppressHydrationWarning` to eliminate attribute mismatch warnings from client theme injection.
4. **Standardized shadcn Component Pattern**: Strictly follows shadcn/ui component declaration and export conventions using `function Component(...)` with explicit `export { Component }` instead of inline exports.
5. **React 19 False-Positive Script Warning Suppression**: In React 19, client-side rendering logs an `Encountered a script tag while rendering React component` error for `next-themes`'s SSR hydration script. `ThemeProvider` filters this specific false positive in development to avoid intrusive Turbopack error overlays while preserving critical SSR theme injection.

## Consequences
- **Positive**:
  - Zero hydration mismatch flash during server-to-client rendering.
  - Native integration with Tailwind CSS and shadcn CSS variables.
  - Adherence to standard shadcn component declaration and export conventions.
  - Clean development experience without React 19 script-tag false-positive console error overlays.
  - Flexibility to use system preference or explicit user toggles.
- **Negative / Trade-offs**:
  - Adds `next-themes` as an explicit dependency.
