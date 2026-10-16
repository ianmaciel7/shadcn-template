# ADR 0004: Install and Configure shadcn/typeset for Scoped Markdown Typography

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context
When building documentation, blogs, or rich-text/markdown surfaces (such as AI chat outputs or MDX articles), styling markdown elements (headings, tables, lists, code blocks, math) often bleeds into other parts of the application or requires heavy utility-class mapping on every AST node. We need a scoped, self-contained typography stylesheet that styles only wrapped content while leaving the rest of the application untouched.

## Decision
We adopt `shadcn/typeset` as the typography standard for rich content and markdown rendering:

1. **Standalone Stylesheet**: Download `https://ui.shadcn.com/typeset.css` and store it as `src/app/typeset.css` alongside the main Tailwind stylesheet.
2. **Global Import**: Import `./typeset.css` inside `src/app/globals.css` immediately after Tailwind CSS imports.
3. **Font Token Standardization**: Expose Geist font variables as `--font-geist` and `--font-geist-mono` in `src/app/layout.tsx`.
4. **Docs Preset**: Define the `.typeset-docs` configuration in `src/app/globals.css`:
   ```css
   .typeset-docs {
     --typeset-font-body: var(--font-geist);
     --typeset-font-heading: var(--font-geist);
     --typeset-font-mono: var(--font-geist-mono);
     --typeset-size: 15px;
     --typeset-leading: 1.75;
     --typeset-flow: 1.25em;
   }
   ```
5. **Scoped Application**: The `.typeset` class is applied exclusively to dedicated markdown/content containers (`<div className="typeset typeset-docs max-w-[37em]">`), with escape hatches (`.not-typeset`, `data-not-typeset`) for embedded interactive components.

## Consequences
- **Positive**:
  - Predictable, beautiful typography for rendered markdown without class bloat on individual elements.
  - Complete isolation from other UI components (buttons, cards, forms retain their original styles).
  - Out-of-the-box support for headings, blockquotes, code blocks, lists, and tables.
- **Negative / Trade-offs**:
  - `typeset.css` is a static asset vendored in the project that must be refreshed if upstream updates are desired.
