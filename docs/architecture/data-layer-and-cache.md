# Data Layer And Cache

The application uses Supabase for persistence and TanStack React Query for client-side data fetching, mutations, cache updates, and invalidation.

## Supabase Client

`src/utils/supabase.ts` exports a typed browser client from `createBrowserClient<Database>()` in `@supabase/ssr`.

The browser client and `src/proxy.ts` both require `NEXT_PUBLIC_SUPABASE_URL` plus either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or the fallback `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Most feature API modules import this `supabase` instance directly.

## Query Builders

`queryFilterBuilder` applies common list behavior:

- Full-text search through `textSearch`.
- Exact-match filters through `match(removeEmptyValues(filter))`.
- Sort arrays through repeated `order` calls.

`queryPaginationBuilder` applies Supabase ranges based on `page` and `per_page`.

Files are the main exception: file list search uses `ilike("name", "%...%")` instead of `textSearch`.

## Pagination Utilities

`src/utils/pagination.ts` provides:

- `DEFAULT_PAGINATION_VALUES`.
- `getRange`.
- `generatePaginationData`.
- `updatePaginatedDataCache` for replacing one item inside the active paginated cache.

## React Query Defaults

`src/context/ReactQueryContext.tsx` creates a single `QueryClient` with:

- `queries.retry = 0`.

Feature hooks then choose their own `staleTime`, placeholder behavior, and cache update strategy.

## Query Key Conventions

List keys are usually plural and detail keys are usually singular:

- `["projects", params]` and `["project", id]`.
- `["quotes", params]` and `["quote", id]`.
- `["daydreams", params]` and `["daydream", id]`.
- `["files", params]`, `["infinite_files", filters]`, and `["file", id]`.
- `["taxonomy", options]`, `["taxonomy", { id }]`, and `["terms"]`.

See [Query Keys Reference](../reference/query-keys.md) for the full module map.

## Mutation Patterns

- Create mutations commonly seed detail cache and invalidate active list queries.
- Update mutations commonly update detail cache and patch active paginated caches.
- Delete mutations commonly remove detail cache and invalidate list queries.
- Taxonomy mutations directly patch matching taxonomy list caches because taxonomy lists are used by many selectors.
- Project edit is multi-step: update project row, diff skills, update project skill junctions, diff screenshots, update screenshot junctions, invalidate detail, and remove project list queries.

## Runtime Caveats

- There are no committed Supabase migrations in this repo.
- Generated types document `store_project`, but the dashboard RPC `top_sources_per_category` is not present in the generated function list.
- The docs describe source behavior, not live database policies or data.

## Related Docs

- [Supabase Schema Reference](../reference/supabase-schema.md)
- [Query Keys Reference](../reference/query-keys.md)
- [Known Gaps](../known-gaps.md)
