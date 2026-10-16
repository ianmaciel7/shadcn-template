# Contributing

This repository follows [Conventional Branch 1.1.0](https://conventionalbranch.org/)
for branch names and [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
for commit messages. These rules apply to both human contributors and AI agents.

## Branches

Format: `<type>/<short-kebab-case-description>`

| Type | Use |
| --- | --- |
| `feat/` | New features |
| `fix/` | Bug fixes |
| `hotfix/` | Urgent fixes |
| `chore/` | Setup and maintenance |
| `release/` | Release preparation |

Keep names lowercase, short, and descriptive. AI agents may use an
agent-specific source prefix (`ai/`, `codex/`, `claude/`, `copilot/`, or
`cursor/`) when appropriate. An agent source prefix replaces the work type; do
not combine both prefixes.

Example: `chore/setup-nextjs`

Example with an agent prefix: `codex/add-sign-in`.

Dependabot PRs may retain their generated `dependabot/npm_and_yarn/` or
`dependabot/github_actions/` branch names when authored by `dependabot[bot]`.
Their PR titles and commit messages still follow Conventional Commits.

## Commits

Format: `<type>[optional scope][!]: <description>`

- Use `feat` for features and `fix` for bug fixes.
- Other allowed types: `chore`, `docs`, `refactor`, `test`, `perf`, `ci`,
  `build`, `style`.
- Use `!` or a `BREAKING CHANGE:` footer for incompatible changes.

Examples:

```text
chore: initialize nextjs project
feat(auth): add sign-in
fix(auth): handle expired sessions
```

## Releases and tags

Releases and git tags follow [Semantic Versioning (SemVer)](https://semver.org/).

## Before opening a pull request

Run the checks in [TESTING.md](TESTING.md), keep changes focused, and update
architecture or security documentation when the change affects those concerns.
