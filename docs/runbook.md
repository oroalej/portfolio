# Runbook

This runbook captures the verified local commands and operational notes for working on the application.

## Local Setup

The current `README.md` still documents Yarn setup, but this workspace has no `yarn` command available and does have `package-lock.json`. Use npm unless the repository intentionally moves back to Yarn.

On Windows PowerShell, prefer `npm.cmd` because `npm.ps1` may be blocked by execution policy.

## Commands

| Task | Windows PowerShell | Other shells |
| --- | --- | --- |
| Install dependencies | `npm.cmd install` | `npm install` |
| Start dev server | `npm.cmd run dev` | `npm run dev` |
| Lint | `npm.cmd run lint` | `npm run lint` |
| Build | `npm.cmd run build` | `npm run build` |
| Run Jest CI | `npm.cmd run test:ci -- --runInBand` | `npm run test:ci -- --runInBand` |

## Verification Levels

- Use lint for routine documentation and code-change validation.
- Use build when changing routes, layouts, middleware, client/server boundaries, image config, Supabase data access, or anything that could affect runtime rendering.
- Do not treat Jest as a passing gate until the stale Pages Router test is repaired.

## Known Test State

`npm.cmd run lint` has passed in this workspace.

`npm.cmd run test:ci -- --runInBand` is currently blocked by `__tests__/index.test.tsx`, which imports `../src/pages/index`. The app now uses `src/app`, so that Pages Router import no longer resolves. The existing snapshot under `__tests__/__snapshots__` is also obsolete.

## Environment Notes

- Supabase configuration is expected through local environment variables, but the exact required keys are not documented in this repo.
- The admin area depends on Supabase Auth and redirects unauthenticated users to `/admin/login`.
- Remote images are configured in `next.config.js` for Unsplash and the project Supabase host.

## Related Docs

- [Claude Commands](commands.md)
- [Known Gaps](known-gaps.md)
- [Data Layer And Cache](architecture/data-layer-and-cache.md)
