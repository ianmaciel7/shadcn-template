# ADR naming

Apply this rule when creating an Architecture Decision Record in `docs/adr/`.

- Name each new record `NNNN-<imperative-verb-phrase>.md`.
- Use the next unused four-digit decimal number for `NNNN`; never reuse a
  number.
- Use lowercase ASCII kebab case for the phrase. Make it a concise,
  present-tense imperative that describes the implementation stage, for example
  `0006-configure-database-migrations.md` or
  `0007-document-api-versioning.md`.
- Use the heading `# ADR NNNN: <Sentence-case imperative phrase>` inside the
  record.
- Do not rename, renumber, or rewrite an accepted ADR. When a decision
  changes, add a new ADR and mark the old one as superseded by the new record.

This convention applies to every current and future ADR. The original five ADR
filenames were migrated to this convention on 2026-10-16 at the repository
maintainer's direction; that one-time migration does not authorize further
renames of accepted records.
