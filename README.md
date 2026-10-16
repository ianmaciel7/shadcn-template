# shadcn template

This is a [Next.js](https://nextjs.org) template using the App Router,
TypeScript, Tailwind CSS, shadcn/ui, Biome, and `next-intl`.

## Getting Started

Install dependencies and start the development server with the repository's
pinned package manager:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page
auto-updates as you edit the file.

## Documentation

- [Architecture](ARCHITECTURE.md)
- [Coding standards](CODING_STANDARDS.md)
- [Tooling](TOOLING.md)
- [Testing](TESTING.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Glossary](GLOSSARY.md)
- [Entity-relationship diagram](DER.md)
- [Architecture decision records](docs/adr/)

## Validation

Run the following before opening a pull request:

```bash
pnpm verify:fast   # lint, typecheck, unit tests (seconds)
pnpm verify:full   # adds analysis, browser tests, build, and size budgets
pnpm verify:e2e    # Playwright: functional, accessibility, visual
```

Develop components in isolation with `pnpm ladle`. See [TESTING.md](TESTING.md)
for the test strategy and [TOOLING.md](TOOLING.md) for every command and host
prerequisite.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js)
for framework source and release notes.
