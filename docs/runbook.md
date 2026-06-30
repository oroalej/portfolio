# Runbook

This runbook captures the verified local commands and operational notes for working on the application.

## Local Setup

This repository uses pnpm. `pnpm-lock.yaml` is the canonical lockfile; do not reintroduce `package-lock.json` or `yarn.lock`.

On Windows PowerShell, prefer `pnpm.cmd`.

## Commands

| Task | Windows PowerShell | Other shells |
| --- | --- | --- |
| Install dependencies | `pnpm.cmd install` | `pnpm install` |
| Start dev server | `pnpm.cmd run dev` | `pnpm run dev` |
| Lint | `pnpm.cmd run lint` | `pnpm run lint` |
| Build | `pnpm.cmd run build` | `pnpm run build` |

## Verification Levels

- Use lint for routine documentation and code-change validation. The ESLint config extends Next core web vitals and enforces the React Hooks rules configured in `eslint.config.mjs`.
- Use build when changing routes, layouts, proxy, client/server boundaries, image config, Supabase data access, or anything that could affect runtime rendering.

## Known Test State

`package.json` currently has no `test` or `test:ci` script after the Jest setup was removed.

Run `pnpm.cmd run lint` and `pnpm.cmd run build` after package, routing, proxy, or framework changes.

## Environment Notes

- Supabase configuration requires `NEXT_PUBLIC_SUPABASE_URL` plus either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or the fallback `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- GitHub Actions exposes missing secrets as empty strings, so the Supabase client treats an empty publishable key as absent and falls back to the anon key.
- Preview deployments validate the Supabase and Vercel secrets before build, then pass the Supabase values to Vercel as build and runtime environment variables.
- The admin area depends on Supabase Auth and redirects unauthenticated users to `/admin/login`.
- Remote images are configured in `next.config.js` for Unsplash and the project Supabase host. Next image qualities are limited to 65 and 75.

## Related Docs

- [Claude Commands](commands.md)
- [Known Gaps](known-gaps.md)
- [Data Layer And Cache](architecture/data-layer-and-cache.md)
