# Admin Auth And Shell

## Purpose

The admin area provides an authenticated CMS shell for managing projects, quotes, daydreams, gallery files, taxonomy data, and dashboard summaries.

## User-Facing Routes

- `/admin/login`: login form.
- `/admin/dashboard`: dashboard summary.
- `/admin/gallery/*`: file and image management.
- `/admin/data-management/*`: taxonomy management.
- `/admin/projects/*`: project management.
- `/admin/quotes/*`: quote management.
- `/admin/daydreams/*`: daydream management.

## Source Map

- Middleware guard: `src/middleware.ts`.
- Admin auth wrapper: `src/app/admin/layout.tsx`.
- Admin shell layout: `src/app/admin/(modules)/layout.tsx`.
- Auth context: `src/context/SupabaseContext.tsx`.
- Breadcrumb context: `src/context/BreadcrumbContext.tsx`.
- Sidebar: `src/app/admin/(modules)/_components/Sidebar`.
- Header and breadcrumb components: `src/app/admin/(modules)/_components`.
- Login form: `src/app/admin/login/_components/LoginForm.tsx`.

## Data Model

- Auth uses Supabase Auth session data.
- The shell itself does not own a database table.
- Module pages inside the shell own their own feature data.

## Workflows

- `src/middleware.ts` allows `/admin/login` and guards all other `/admin/*` paths.
- If no session exists, middleware redirects to `/admin/login?from=<requested-path>`.
- `AuthProvider` checks the current Supabase session on mount.
- Login calls `supabase.auth.signInWithPassword`.
- Successful login redirects to `from` or `/admin/dashboard`.
- Logout calls `supabase.auth.signOut`, clears user state, redirects to `/`, and shows a toast.
- Admin module pages set breadcrumbs through `BreadcrumbDataSetter`.

## Cache And State

- Auth state is local React state inside `AuthProvider`.
- Breadcrumb state is local React context inside `BreadcrumbProvider`.
- Admin modules use React Query through the root `ReactQueryClientProvider`.
- React Query Devtools are enabled in the admin layout.

## Forms And Validation

- Login uses React Hook Form with a Zod schema.
- Email must be a valid email and password is required.
- Login errors from Supabase are stored in auth context and displayed above the form.

## Verification Notes

- Check unauthenticated `/admin/projects` redirects to `/admin/login?from=/admin/projects`.
- Check successful login uses the `from` parameter when present.
- Check sidebar active states for admin module routes.
- Run `npm.cmd run lint` after shell or auth changes.

## Open Questions

- There is no role-based authorization layer documented in source; any valid Supabase session appears sufficient for admin access.
- Required Supabase environment variables are not documented in a committed `.env.example`.
