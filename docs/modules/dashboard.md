# Dashboard

## Purpose

The dashboard is an admin summary screen. The current implementation shows quote-related totals grouped by category/source data returned from a Supabase RPC.

## User-Facing Routes

- `/admin/dashboard`

## Source Map

- Page: `src/app/admin/(modules)/dashboard/page.tsx`.
- Data hook: `src/features/term_taxonomy/api/getTopSourceGroupByCategory.ts`.
- Shared UI: `CardRoot`, `CardHeader`, `CardTitle`, `BreadcrumbDataSetter`.

## Data Model

- Uses Supabase RPC `top_sources_per_category`.
- React Query key: `["top-source-by-category-taxonomy"]`.
- The RPC result is displayed as rows with `id`, `name`, and `total` fields.

## Workflows

- The page sets the breadcrumb to `Dashboard`.
- It calls `useGetTopSourceGroupByCategory`.
- It renders a `Quotes` card with one row per returned item.

## Cache And State

- The dashboard uses React Query for RPC state.
- There is no local filtering, pagination, or mutation.
- The page currently logs returned data in a `useEffect`.

## Forms And Validation

The dashboard has no forms.

## Verification Notes

- Runtime verification requires a Supabase project with the `top_sources_per_category` RPC.
- Run `npm.cmd run lint` after dashboard changes.

## Open Questions

- `top_sources_per_category` is not present in `src/types/supabase.ts`, so the RPC contract is not generated in the local type source.
- The dashboard files were newly added or untracked when this documentation was generated; confirm stability before treating this module as complete.
