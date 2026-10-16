# ADR 0005: Document Project Standards

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context

The template already uses the Next.js App Router with the optional `src/`
directory, but its architectural boundaries and contributor expectations are
not documented in one discoverable place. This makes it easy for future work to
mix routing, shared code, route-private code, security practices, and test
expectations inconsistently.

The Next.js 16 documentation available when this decision was made confirms
that `src/` is supported for application code while `public/`, project
configuration, and environment files remain at the repository root. It also
supports colocating non-routable files with routes, underscore-prefixed private
folders, and URL-neutral route groups.

## Decision

We retain the existing repository layout and document it rather than moving
application code. A conforming repository must provide the following
documentation entrypoints, except for the domain records described below:

1. `AGENTS.md` provides instructions and documentation pointers for coding
   agents.
2. `README.md` introduces the template, its package-manager workflow, and the
   documentation index for all contributors.
3. `docs/agents/issue-tracker.md` and `docs/agents/domain.md` configure the
   installed engineering skills. `docs/agents/triage-labels.md` is required
   only when the `triage` skill is installed.
4. `ARCHITECTURE.md` defines the repository layout and App Router boundaries.
5. `SECURITY.md` defines the vulnerability-reporting policy, its currently
   published channels, and baseline secure contribution practices.
6. `CONTRIBUTING.md` defines Conventional Branch and Conventional Commit rules
   along with pull-request expectations.
7. `TESTING.md` defines the validation commands (`pnpm lint` and `pnpm build`),
   their current baseline status, and expectations for future test tooling.
8. `GLOSSARY.md` is the single-context domain glossary when product-specific
   terminology is agreed.
9. `DER.md` is the single entrypoint for the entity-relationship diagram. Until
   a database and persistence model are adopted, it must state that it is
   pending and must not include speculative entities or relationships. Once
   persistence is introduced, it must document the implemented entities,
   relevant attributes, relationships, cardinalities, and integrity
   constraints.
10. `TOOLING.md` is the operational inventory of every installed or configured
   development tool, including its version or status, purpose, and source of
   truth. It covers the package manager, build toolchain, code-quality tools
   (including Biome and GritQL rules), UI scaffolding, commands, and agent
   tooling; it does not duplicate the application dependency catalog.
11. `CODING_STANDARDS.md` consolidates day-to-day code conventions whose
   executable form is split across tool configuration and accepted ADRs.

Lasting architectural choices continue to be recorded as sequential ADRs in
`docs/adr/`. Future ADRs follow the filename and title convention in
`.agents/rules/adr-naming.md`. Accepted ADRs remain immutable: a changed
decision is captured in a new record that supersedes the earlier one, rather
than by renaming, renumbering, or rewriting it.

## Missing-document policy

If a required documentation entrypoint is missing, restore it before relying on
the practice it defines. Recreate `AGENTS.md`, `README.md`, and the relevant
root document using this decision, the current repository configuration, and
the linked documentation as sources of truth. Restore agent configuration files
by running `setup-matt-pocock-skills` rather than inventing tracker or label
conventions.

`GLOSSARY.md` and `docs/adr/` are intentionally created lazily by the domain
modeling workflow when a term or a durable decision is resolved. A template may
therefore omit the glossary and contain no ADRs until those conditions occur.
If `GLOSSARY.md` is present before a domain is defined, it must state that its
content is pending. Do not create `GLOSSARY-MAP.md` unless the repository has
multiple domain contexts.

`DER.md` is required even before a database exists. In that state, it must
clearly state that its content is pending the adoption of a database and
persistence model.

## Consequences

- **Positive**:
  - New contributors can find core practices without inspecting implementation
    details.
  - The existing `src/` layout is explicitly aligned with the Next.js 16
    guidance used for this decision.
  - Future test or security tooling changes have clear documentation owners.
  - Contributors have a single source for installed and configured tooling,
    including its ownership and configuration, and a prepared location for
    agreed domain vocabulary and the future data model.
  - Code conventions are discoverable without duplicating tool configuration.
- **Negative / Trade-offs**:
  - These documents must be maintained whenever practices or tooling change.
  - The template does not yet provide an automated test runner; contributors
    must rely on the documented static analysis, production build, and relevant
    manual verification until one is adopted.
