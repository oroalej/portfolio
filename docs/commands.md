# Claude Commands

This page documents the project-specific Claude slash commands available under `.claude/commands/`.

Agent and coding standards remain canonical in `../CLAUDE.md`. These notes describe command intent and operational expectations for humans working in this repository.

## Commands

| Command | Purpose | Notes |
| --- | --- | --- |
| `/commit` | Generate a conventional commit from already staged changes. | Does not stage or modify files. Uses portfolio scopes such as `projects`, `quotes`, `docs`, and `agent`. |
| `/create-pr` | Push the current branch and open a GitHub pull request with `gh`. | Requires a clean worktree. Draft PRs are the default unless `--ready` is supplied. |
| `/desloppify` | Run a read-only maintainability scan. | Uses `CLAUDE.md`, portfolio skills, and `docs/` to find stale patterns or cleanup opportunities. |
| `/doc-sync` | Synchronize docs and agent guidance with staged application changes. | Uses `docs/` as the Obsidian vault. It must not create `docs/obsidian` or monorepo app folders. |
| `/new-branch` | Create a portfolio-scoped branch from `main`. | Infers names from staged or unstaged paths when no explicit name is supplied. |
| `/pr-merge-review` | Evaluate whether a PR can still merge into current `main`. | Read-only by default and does not merge. |
| `/review` | Review staged changes for correctness and project-pattern risks. | Staged-change only. Uses portfolio skills and documented app behavior as context. |

## Repository Defaults

- Use `main` as the base branch; this workspace has `origin/main`.
- Use npm commands. On Windows PowerShell, prefer `npm.cmd`.
- Use `npm.cmd run lint` for routine validation.
- Do not require `npm.cmd run test:ci` until the stale `../src/pages/index` Jest import is fixed.
- Keep `CLAUDE.md` and `.claude/skills/portfolio-*` as the source of truth for coding standards.

## Maintenance

Update this page when a command is added, renamed, removed, or materially changes behavior. Keep the detailed workflow in the command file itself.
