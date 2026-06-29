# Routes And Layouts

The app uses Next.js App Router under `src/app`. Route groups separate public pages from admin pages without changing URL paths.

## Root Layout

`src/app/layout.tsx` imports global CSS, sets the root HTML language, and wraps the application in `ReactQueryClientProvider`.

The root body uses a white background and minimum viewport height. All query state shares the single client created in `src/context/ReactQueryContext.tsx`.

## Public Route Group

Public pages live under `src/app/(web)`.

`src/app/(web)/layout.tsx` provides:

- Guest tooltip with id `guest-tooltip`.
- Framed public-site layout with mono font styling.
- `TheHeader`, `ContactMeSection`, and `TheFooter`.
- `react-hot-toast` toaster.

Public dynamic sections:

- `/projects` redirects to the first project type taxonomy entry.
- `/projects/[projectTypeId]` lists projects in that type and uses `GalleryProvider` for screenshot preview state.
- `/quotes` redirects to the first quote category taxonomy entry.
- `/quotes/[quoteId]` lists quotes in that category.
- `/daydreams` lists daydream image cards and uses `GalleryProvider` for image preview state.

## Admin Route Group

Admin pages live under `src/app/admin`.

`src/app/admin/layout.tsx` wraps admin routes in:

- `AuthProvider` from `src/context/SupabaseContext.tsx`.
- React Query Devtools.
- Admin toaster.
- Admin tooltip with id `admin-tooltip`.

`src/app/admin/(modules)/layout.tsx` provides the authenticated admin shell:

- `BreadcrumbProvider`.
- Fixed sidebar.
- Header.
- Main work area with left padding for the sidebar.

## Auth Middleware

`src/middleware.ts` guards `/admin/*` except `/admin/login`.

If no Supabase session exists, the middleware redirects to `/admin/login` and preserves the requested path in the `from` query parameter.

After successful login, `AuthProvider` redirects to `from` or `/admin/dashboard`.

## Loading Boundaries

Several routes define `loading.tsx` files, especially dynamic and data-heavy pages:

- Public projects, quotes, and daydreams.
- Admin quotes, projects, daydreams, and gallery detail pages.
- Create/edit admin pages use local loading components and Suspense fallbacks around data-dependent fields.

## Related Docs

- [Routes Reference](../reference/routes.md)
- [Admin Auth And Shell](../modules/admin-auth-and-shell.md)
- [Public Site](../modules/public-site.md)
