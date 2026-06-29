# Routes Reference

This route reference is based on files under `src/app`.

## Public Routes

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `src/app/(web)/(index)/page.tsx` | Homepage with portfolio summary, about section, and tech stack. |
| `/resume` | `src/app/(web)/resume/page.tsx` | Resume page backed by static resume data. |
| `/projects` | `src/app/(web)/projects/page.tsx` | Redirects to the first project type taxonomy entry. |
| `/projects/[projectTypeId]` | `src/app/(web)/projects/[projectTypeId]/page.tsx` | Project list for one project type. |
| `/quotes` | `src/app/(web)/quotes/page.tsx` | Redirects to the first quote category taxonomy entry. |
| `/quotes/[quoteId]` | `src/app/(web)/quotes/[quoteId]/page.tsx` | Quote list for one quote category. |
| `/daydreams` | `src/app/(web)/daydreams/page.tsx` | Public daydream image gallery. |

## Admin Routes

| Route | Source | Purpose |
| --- | --- | --- |
| `/admin/login` | `src/app/admin/login/page.tsx` | Supabase password login. |
| `/admin/dashboard` | `src/app/admin/(modules)/dashboard/page.tsx` | Dashboard summary card. |
| `/admin/gallery` | `src/app/admin/(modules)/gallery/page.tsx` | Gallery image list. |
| `/admin/gallery/create` | `src/app/admin/(modules)/gallery/create/page.tsx` | Image upload screen. |
| `/admin/gallery/[imageId]` | `src/app/admin/(modules)/gallery/[imageId]/page.tsx` | Gallery image detail/information screen. |
| `/admin/data-management` | `src/app/admin/(modules)/data-management/page.tsx` | Taxonomy list and create form. |
| `/admin/data-management/[taxonomyId]` | `src/app/admin/(modules)/data-management/[taxonomyId]/page.tsx` | Taxonomy edit form. |
| `/admin/projects` | `src/app/admin/(modules)/projects/page.tsx` | Project list, filtering, and reorder UI. |
| `/admin/projects/create` | `src/app/admin/(modules)/projects/create/page.tsx` | Project create form. |
| `/admin/projects/[projectId]` | `src/app/admin/(modules)/projects/[projectId]/page.tsx` | Project edit form. |
| `/admin/quotes` | `src/app/admin/(modules)/quotes/page.tsx` | Quote create form and quote table. |
| `/admin/quotes/[quoteId]` | `src/app/admin/(modules)/quotes/[quoteId]/page.tsx` | Quote edit form next to quote table. |
| `/admin/daydreams` | `src/app/admin/(modules)/daydreams/page.tsx` | Daydream table and create/edit shell. |
| `/admin/daydreams/create` | `src/app/admin/(modules)/daydreams/create/page.tsx` | Daydream create form. |
| `/admin/daydreams/[daydreamId]` | `src/app/admin/(modules)/daydreams/[daydreamId]/page.tsx` | Daydream edit form. |

## Layouts And Guards

| Layer | Source | Purpose |
| --- | --- | --- |
| Root layout | `src/app/layout.tsx` | Global CSS, Nuqs adapter, React Query provider, and root Suspense fallback. |
| Public layout | `src/app/(web)/layout.tsx` | Public header, footer, contact section, tooltip, toaster, and frame. |
| Admin auth layout | `src/app/admin/layout.tsx` | Auth provider, admin toaster, tooltip, and React Query Devtools. |
| Admin module layout | `src/app/admin/(modules)/layout.tsx` | Sidebar, header, breadcrumbs, and admin content shell. |
| Proxy | `src/proxy.ts` | Redirects unauthenticated `/admin/*` requests to login. |

## Related Docs

- [Routes And Layouts](../architecture/routes-and-layouts.md)
- [Application Map](../application-map.md)
