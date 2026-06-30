# Project Agent Guidance

This file is the canonical agent guidance for this repository. Keep Codex and other agent-specific bridge files small; update this file or the Claude skills when project conventions change.

## Project Shape

- This is a personal portfolio and admin CMS built with Next.js App Router, React, TypeScript strict mode, Tailwind CSS, Supabase, TanStack React Query, React Hook Form, Zod, and Radix UI primitives.
- Use `src/app` for App Router routes. Route groups separate the public site under `(web)` from the authenticated admin area under `admin`.
- Use `src/components` for shared UI primitives, `src/features` for domain data access/types/transformers, `src/context` for providers, `src/hooks` for shared hooks, `src/utils` for generic helpers, `src/data` for static portfolio content, and `src/types` for shared TypeScript types.
- Import application code through the `@/*` alias unless an existing file intentionally uses another local path.

## Commands

- Use pnpm for package management. On Windows PowerShell, prefer `pnpm.cmd`.
- Run `pnpm.cmd run lint` on Windows PowerShell, or `pnpm run lint` in shells where `pnpm` works normally.
- Run `pnpm run build` for production build validation when the change could affect routing, rendering, data fetching, or Next.js config.
- `pnpm-lock.yaml` is the canonical lockfile. Do not reintroduce `package-lock.json` or `yarn.lock`.

## Claude Slash Commands

- Local Claude slash commands may live in `.claude/commands`, which is ignored by Git. Keep local copies aligned with this file, the portfolio skills, and the human docs under `docs/`.
- Local Codex bridge skills for those commands may live in ignored `.agents/skills/<command-name>` folders. Invoke them in Codex with `$skill-name` or `/skills`; `@` is for file and context mentions.
- `/review` reviews staged changes only and uses the portfolio skills for architecture, Supabase/admin CRUD, and UI concerns.
- `/doc-sync` updates `docs/`, `CLAUDE.md`, and project skills when staged source changes affect documented behavior or agent guidance.
- `/desloppify` performs a read-only maintainability scan over a requested portfolio module or file.
- `/commit`, `/new-branch`, `/create-pr`, and `/pr-merge-review` handle Git workflow helpers with portfolio-specific scopes and `main` as the default base.
- Human-facing command notes live in `docs/commands.md`; detailed execution rules stay in the command files.

## Coding Standards

- Preserve TypeScript strictness. Prefer existing utility types from `src/types`, especially `Tables<T>`, `Filterable<T>`, `Sortable<T>`, `Searchable`, and `Paginatable`.
- Keep React hook usage lint-clean. `react-hooks/exhaustive-deps`, `immutability`, `incompatible-library`, `refs`, and `set-state-in-effect` are enforced by `eslint.config.mjs`.
- Add `"use client"` only to files that need client-only React features, browser APIs, hooks, contexts, navigation hooks, React Query hooks, or event handlers.
- Keep page/layout files thin. Put interactive behavior in colocated `_components` files or reusable components.
- Follow existing component style: named exports for shared components, default exports for many route-local wrappers, `BaseComponent` for common `children`/`className` props, and `classNames` for conditional Tailwind classes.
- Prefer existing shared UI before adding new primitives: `Button`, `Card`, `Dialog`, `Form`, `InputField`, `Select`, `Section`, `SkeletonLoader`, `Pagination`, `Tooltip`, and image helpers.
- Keep Tailwind styling close to the component. Use the existing neutral/blue/red/yellow palette and custom `AccentIndigoDye`/`AccentMing` colors when they fit current screens.
- Do not introduce new dependencies unless the task explicitly requires it and the existing stack cannot reasonably solve the problem.

## Data And API Patterns

- Put Supabase access and React Query hooks under `src/features/<domain>/api`.
- Use `supabase` from `src/utils/supabase` and compose filters with `queryFilterBuilder` and pagination with `queryPaginationBuilder` when the query supports those options.
- Use generated Supabase table types through `Tables<"table_name">` and define API response shapes in `src/features/<domain>/types`.
- Chain `.throwOnError()` on Supabase operations that should surface errors to mutation/query callers.
- Keep React Query keys stable and domain-scoped. Existing patterns use plural keys for lists such as `["quotes"]` and singular keys for detail records such as `["quote", id]`.
- On mutations, update the relevant detail cache and either invalidate active lists or update paginated list caches with `updatePaginatedDataCache` when appropriate.
- Keep UI toast messaging in wrapper components with `toast.promise` when the caller controls user-facing workflow text. Keep low-level API hooks focused on data and cache behavior.

## Forms And Validation

- Use React Hook Form for admin forms and Zod schemas for validation.
- Define default form values near the form component, and reset form state when the loaded item changes.
- Use `Controller` for controlled custom inputs and selects.
- Render field errors with existing form helpers such as `FormErrorMessage`, `InputField`, `Textarea`, `Label`, `FormGroup`, and select error props.
- Disable fieldsets or submit buttons during submission, and preserve existing Reset/Back/Delete patterns.

## Loading, Auth, And Navigation

- Use App Router `loading.tsx` files and local loading components for route-level pending states.
- Use Suspense boundaries around client components that fetch or depend on async UI state when the existing route pattern does so.
- Keep admin authentication behavior aligned with `src/proxy.ts` and `SupabaseContext`: unauthenticated `/admin/*` routes redirect to `/admin/login?from=...`.
- Use `next/navigation` hooks in client components only.

## Review Expectations

- Before editing, inspect the relevant route, feature API, types, and shared component patterns.
- Keep changes narrowly scoped. Do not refactor unrelated files or clean up existing dirty worktree changes unless asked.
- If you change behavior, validate it with focused lint/build checks or available manual verification until a test runner is reintroduced.
- Always run lint after code changes when practical. For this Windows workspace, the verified command is `pnpm.cmd run lint`.

## Project Skills

- Use `.claude/skills/portfolio-codebase-patterns/SKILL.md` for broad architecture, routing, and feature placement work.
- Use `.claude/skills/portfolio-supabase-admin-crud/SKILL.md` for Supabase-backed admin CRUD, React Query cache work, forms, and mutations.
- Use `.claude/skills/portfolio-ui-patterns/SKILL.md` for shared UI, public/admin presentation, Tailwind, loading states, and component composition.
