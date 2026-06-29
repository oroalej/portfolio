# Claude Commands

This page documents the project-specific local Claude slash commands available under `.claude/commands/` and their local Codex bridge skills.

Agent and coding standards remain canonical in `../CLAUDE.md`. These notes describe command intent and operational expectations for humans working in this repository.

## Local-Only Behavior

- `.claude/commands/` is ignored by Git. These files remain available on this machine but are not committed.
- Local Codex bridge skills may live under ignored `.agents/skills/<command-name>/` folders.
- In Codex, invoke bridge skills with `$commit`, `$review`, `$doc-sync`, `$create-pr`, `$new-branch`, `$pr-merge-review`, or `$desloppify`.
- Use `/skills` to browse skills. Do not use `@commit`; `@` is for file and context mentions.

## Commands

| Claude command | Codex skill | Purpose | Notes |
| --- | --- | --- | --- |
| `/commit` | `$commit` | Generate a conventional commit from already staged changes. | Does not stage or modify files. Uses portfolio scopes such as `projects`, `quotes`, `docs`, and `agent`. |
| `/create-pr` | `$create-pr` | Push the current branch and open a GitHub pull request with `gh`. | Requires a clean worktree. Draft PRs are the default unless `--ready` is supplied. |
| `/desloppify` | `$desloppify` | Run a read-only maintainability scan. | Uses `CLAUDE.md`, portfolio skills, and `docs/` to find stale patterns or cleanup opportunities. |
| `/doc-sync` | `$doc-sync` | Synchronize docs and agent guidance with staged application changes. | Uses `docs/` as the Obsidian vault. It must not create alternate vault or monorepo app folders. |
| `/new-branch` | `$new-branch` | Create a portfolio-scoped branch from `main`. | Infers names from staged or unstaged paths when no explicit name is supplied. |
| `/pr-merge-review` | `$pr-merge-review` | Evaluate whether a PR can still merge into current `main`. | Read-only by default and does not merge. |
| `/review` | `$review` | Review staged changes for correctness and project-pattern risks. | Staged-change only. Uses portfolio skills and documented app behavior as context. |

## Repository Defaults

- Use `main` as the base branch; this workspace has `origin/main`.
- Use pnpm commands. On Windows PowerShell, prefer `pnpm.cmd`.
- Use `pnpm.cmd run lint` for routine validation.
- Keep `CLAUDE.md` and `.claude/skills/portfolio-*` as the source of truth for coding standards.

## Maintenance

Update this page when a command or local bridge skill is added, renamed, removed, or materially changes behavior. Keep the detailed workflow in the command file itself.
