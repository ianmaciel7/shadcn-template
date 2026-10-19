# Project skills

This directory contains five installed skills. `skills-lock.json` at the
repository root records upstream sources, paths, and computed hashes for external
skills.

| Skill | Entrypoint | Upstream | Use |
| --- | --- | --- | --- |
| ask-matt | [SKILL.md](ask-matt/SKILL.md) | `mattpocock/skills` | Route engineering work to relevant workflows |
| context7-cli | [SKILL.md](context7-cli/SKILL.md) | `upstash/context7` | Resolve a library and query current documentation |
| save | [SKILL.md](save/SKILL.md) | Project-local | Persist knowledge, rules, decisions, and conventions to canonical documentation |
| setup-matt-pocock-skills | [SKILL.md](setup-matt-pocock-skills/SKILL.md) | `mattpocock/skills` | Configure engineering skill and tracker documentation |
| shadcn | [SKILL.md](shadcn/SKILL.md) | `shadcn/ui` | Work with shadcn components, registries, and design systems |

Supporting Markdown under each skill is an upstream reference, not a claim
that every example, provider, or workflow is configured in this application.
The tracker and domain configuration for this repository live in
[docs/agents](../../docs/agents/).

## Maintenance

Keep upstream skill content and `skills-lock.json` aligned when updating an
installed skill. Review upstream changes rather than rewriting their examples
to describe the template. Keep repository-specific guidance in `AGENTS.md`,
`.agents/rules/`, and `docs/agents/`.

For a new, explicitly requested project skill, use a kebab-case directory with
`SKILL.md` containing `name` and a specific `description` in YAML front matter.
Keep its instructions narrow and reusable. Run `agents sync` and
`agents sync --check` after changing reusable instructions, as described in
[the agent guide](../README.md).
