---
name: portfolio-supabase-admin-crud
description: Use when adding or changing Supabase-backed admin CRUD flows in this portfolio repository, including feature API modules, React Query hooks, forms, Zod validation, cache updates, toasts, pagination, filtering, sorting, or delete dialogs.
---

# Portfolio Supabase Admin CRUD

Start by reading `CLAUDE.md`. Use this skill for admin CMS features backed by Supabase.

## Workflow

1. Inspect an adjacent feature before adding a new API or form. Good references include `quotes`, `projects`, `daydreams`, `files`, and `term_taxonomy`.
2. Keep raw Supabase calls in `src/features/<domain>/api`.
3. Export React Query hooks from the same API module or the feature API barrel when one already exists.
4. Keep form state in route-local admin components under `src/app/admin/(modules)/<domain>/_components`.
5. Use existing shared components for fields, cards, buttons, dialogs, selects, and loading indicators.

## Supabase Query Patterns

- Use `supabase` from `src/utils/supabase`.
- Use `Tables<"table_name">` to type rows and mutation payloads.
- Use `queryFilterBuilder` for text search, `match` filters, and sort arrays.
- Use `queryPaginationBuilder` plus `generatePaginationData` for paginated list APIs.
- Chain `.throwOnError()` when callers should handle Supabase errors.
- Return typed API structures from hooks by casting through explicit feature response interfaces when Supabase nested selects cannot infer the shape.

## React Query Patterns

- Use stable query keys that match the existing convention: plural list keys such as `["quotes"]`, singular detail keys such as `["quote", id]`.
- Set `staleTime: Infinity` where nearby list/detail hooks do so.
- After create, invalidate active list queries and seed the detail cache when the created record is returned.
- After update, update the detail cache and update active paginated list caches with `updatePaginatedDataCache` when applicable.
- After delete, invalidate active lists or remove/update cached records in the same style as the surrounding feature.
- Keep toast text in wrapper components with `toast.promise` when the workflow needs user-facing loading/success/error messages.

## Form Patterns

- Use React Hook Form with `zodResolver`.
- Define a Zod schema next to the form component.
- Define default values next to the form component.
- Use `Controller` for custom inputs, selects, image pickers, and relationship fields.
- Reset the form when the loaded item changes.
- Disable the fieldset or submit/reset/delete controls while mutations are pending.
- Use `AlertDialog` for destructive confirmation flows.

## Validation

- Run `npm.cmd run lint` after changes.
- Run `npm run build` when route-level behavior, middleware, data dependencies, or client/server boundaries changed.
- Do not treat the existing Jest suite as a passing gate until the stale `src/pages/index` import is fixed.
