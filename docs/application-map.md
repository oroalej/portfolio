# Application Map

This is a personal portfolio and admin CMS built on Next.js App Router. The public site presents portfolio content, projects, quotes, resume data, and daydream images. The admin area manages Supabase-backed content for projects, quotes, daydreams, files, and taxonomy data.

## Runtime Stack

- Next.js 13 App Router with React 18.
- TypeScript strict mode with generated Supabase table types.
- Tailwind CSS for styling.
- Supabase Auth, database tables, storage, and RPC functions.
- TanStack React Query for query/mutation state.
- React Hook Form and Zod for admin forms.
- Radix primitives for dialogs, dropdowns, popovers, and related UI surfaces.

## Main Areas

| Area | Primary routes | Main source roots | Main data |
| --- | --- | --- | --- |
| Public site | `/`, `/resume`, `/projects`, `/quotes`, `/daydreams` | `src/app/(web)`, `src/data` | Static data plus projects, quotes, daydreams, taxonomy, files |
| Admin shell | `/admin/login`, `/admin/*` | `src/app/admin`, `src/context/SupabaseContext.tsx`, `src/middleware.ts` | Supabase auth session |
| Projects | `/projects/*`, `/admin/projects/*` | `src/features/projects`, project route components | `projects`, `project_screenshots`, `project_skills`, `files`, `term_taxonomy` |
| Quotes | `/quotes/*`, `/admin/quotes/*` | `src/features/quotes`, quote route components | `quotes`, `term_taxonomy`, `terms` |
| Daydreams | `/daydreams`, `/admin/daydreams/*` | `src/features/daydreams`, daydream route components | `daydreams`, `files` |
| Gallery/files | `/admin/gallery/*` | `src/features/files`, gallery route components | `files`, Supabase storage bucket `images`, `term_taxonomy` |
| Taxonomy | `/admin/data-management/*` | `src/features/term_taxonomy`, `src/features/terms` | `terms`, `term_taxonomy` |
| Dashboard | `/admin/dashboard` | dashboard route, taxonomy RPC | `top_sources_per_category` RPC |

## Shared Infrastructure

- `src/app/layout.tsx` loads global CSS and wraps the app in `ReactQueryClientProvider`.
- `src/context/ReactQueryContext.tsx` creates one `QueryClient` with query retry disabled.
- `src/utils/supabase.ts` exports the typed Supabase client plus filter and pagination query builders.
- `src/utils/pagination.ts` centralizes pagination metadata and paginated cache updates.
- `src/types/index.ts` contains shared utility types and Supabase table row helpers.

## Module Boundaries

- Route-level UI lives under `src/app`.
- Reusable UI primitives live under `src/components`.
- Domain data access lives under `src/features/<domain>/api`.
- Domain API response shapes live under `src/features/<domain>/types`.
- Mapping between Supabase API shapes and UI shapes lives under feature `transformers` folders.
- Static portfolio content lives under `src/data`.

## Related Docs

- [Routes And Layouts](architecture/routes-and-layouts.md)
- [Data Layer And Cache](architecture/data-layer-and-cache.md)
- [Supabase Schema Reference](reference/supabase-schema.md)
