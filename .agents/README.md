# Agent configuration

Project-local instructions, MCP configuration, and reusable skills.

## Configured integrations

`.agents/agents.json` enables Codex, Claude, Claude Desktop, Gemini, Cursor,
and Antigravity, with `syncMode` set to `source-only`.

| MCP server | Command | Purpose |
| --- | --- | --- |
| Serena | `serena start-mcp-server --project-from-cwd --context=codex` | Project-local semantic symbol analysis |
| Next.js DevTools | `pnpm exec next-devtools-mcp` | Runtime diagnostics and route inspection |

These are configured servers, not a statement that the executables are
installed or that runtime connectivity has been verified. Serena and the
Agents CLI are host tools; `next-devtools-mcp` is a project dependency.

## Installed skills

The repository contains `ask-matt`, `context7-cli`, `save`,
`setup-matt-pocock-skills`, and `shadcn`. See the
[skill inventory](skills/README.md) for entrypoints and provenance.

Persistent rules cover [English as the default language](rules/language.md)
and [ADR naming and immutability](rules/adr-naming.md).

## Source and local files

- `agents.json`: enabled integrations, MCP servers, and workspace behavior.
- `skills/*/SKILL.md`: reusable skill instructions and supporting references.
- `rules/*.md`: persistent guidance for coding agents.
- [AGENTS.md](../AGENTS.md): canonical repository instructions.
- `local.json`: private machine-specific overrides and secrets; do not commit.

## Maintenance workflow

Use the externally provided Agents CLI when changing configuration or reusable
skill instructions:

```bash
agents status
agents sync
agents sync --check
```

When introducing a server, also run `agents mcp test --runtime`. Do not add
unrequested servers or approve package-provided agent skills (ADR 0007).

Generated tool configuration and local state must remain untracked. The
selected integrations and sync mode determine the materialized outputs; use
`agents status` instead of assuming every supported output exists.
