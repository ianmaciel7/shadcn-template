# ADR 0005: Theme Provider Setup with next-themes

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context
A modern application and template must support system, dark, and light appearance modes seamlessly. We need a clean, SSR-safe client provider wrapper that integrates with Tailwind CSS class-based theming and shadcn/ui color tokens without causing hydration mismatch flashes.

## Decision
We adopt `next-themes` and create a dedicated `ThemeProvider` wrapper component in `src/components/theme-provider.tsx`:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

Key architectural choices:
1. **Dedicated Client Seam**: Encapsulates client-side theme context inside a reusable boundary (`src/components/theme-provider.tsx`), allowing root `layout.tsx` to remain a Server Component.
2. **Tailwind Class Synchronization**: Configured with `attribute="class"`, `defaultTheme="system"`, and `enableSystem` to toggle the `.dark` class on the `<html>` root, matching Tailwind CSS custom variant `@custom-variant dark (&:is(.dark *));`.
3. **Hydration Warning Suppression**: Root `<html>` element will include `suppressHydrationWarning` to eliminate attribute mismatch warnings from client theme injection.
4. **Interactive Theme Toggle (`src/components/mode-toggle.tsx`)**: Provide a ready-to-use toggle button/dropdown with `useTheme()` from `next-themes` and Lucide icons (`SunIcon`, `MoonIcon`) using shadcn `Button` and `DropdownMenu`.

## Consequences
- **Positive**:
  - Zero hydration mismatch flash during server-to-client rendering.
  - Native integration with Tailwind CSS and shadcn CSS variables.
  - Flexibility to use system preference or explicit user toggles.
- **Negative / Trade-offs**:
  - Adds `next-themes` as an explicit dependency.
