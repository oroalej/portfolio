# Known Gaps

These are known documentation, tooling, or source-truth gaps observed during the docs pass.

## Supabase Source Of Truth

- `src/types/supabase.ts` documents the database tables and `store_project` RPC, but not the `top_sources_per_category` RPC used by the dashboard.
- The repository does not include Supabase migration files or a documented schema-generation command.

## Dashboard Stability

- `src/app/admin/(modules)/dashboard/page.tsx` and `src/features/term_taxonomy/api/getTopSourceGroupByCategory.ts` are currently part of the visible worktree but were untracked or newly added when this documentation was generated.
- Confirm intended ownership before treating the dashboard module as stable product behavior.

## Runtime Verification

- These docs are source-grounded, but runtime Supabase data, auth policies, storage bucket contents, and RPC behavior were not verified against a live Supabase project.

## Related Docs

- [Runbook](runbook.md)
- [Dashboard](modules/dashboard.md)
- [Supabase Schema Reference](reference/supabase-schema.md)
