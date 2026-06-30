# UI System

The UI is built with Tailwind CSS, small shared React components, route-local components, and a few Radix primitives.

## Shared Component Layer

Shared components live under `src/components`.

Important shared groups:

- `Button`: button and Next.js link actions with variants, colors, sizes, rounded/block/icon/loading props.
- `Card`: card root/body/header/footer/title patterns used heavily in admin screens.
- `Dialog`: standard, alert, gallery, and image preview dialogs. Open dialogs lock document scrolling, support optional overlay hiding, and allow custom overlay classes.
- `Form`: labels, inputs, textareas, input groups, and form error messages.
- `Select`: simple, searchable, multi-searchable, and single-simple select patterns.
- `Pagination`: full and simple pagination controls.
- `Image`: Supabase image rendering and preview helpers. `ImagePreviewContainer` provides labeled gallery navigation controls, clamps first/last navigation through `GalleryProvider`, and can temporarily disable navigation while a preview is loading.
- `SkeletonLoader`: base and image loading placeholders.
- `Dropdown`, `Popover`, `Tooltip`, and `Scrollbar`.
- `Code`: faux editor primitives for line numbers, indentation, language-aware tokens, comments, and properties. Current token themes support JavaScript and PHP.

## Styling Conventions

- Tailwind utilities are used directly in JSX.
- `classnames` is used for conditional class composition.
- Admin screens favor compact neutral cards, tables, filters, and action buttons.
- Public screens use the framed web layout, mono font styling, dark-mode classes, and larger portfolio sections.
- Existing custom Tailwind colors are `AccentIndigoDye` and `AccentMing`.
- The configured breakpoints are `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`.

## Public UI Patterns

Public UI lives under `src/app/(web)`.

Common public patterns:

- `Container` wraps page sections.
- `Section` helpers structure homepage sections.
- `PortfolioSummarySection` uses the shared `Code` primitives for a faux editor with JavaScript/PHP language selection.
- `NavLink` handles active taxonomy navigation for projects and quotes.
- `GalleryProvider` powers project screenshot previews and daydream previews, stores a nullable selected item, and clamps previous/next navigation to the available image list.
- `SupabaseImage` displays images from storage.

## Admin UI Patterns

Admin UI lives under `src/app/admin`.

Common admin patterns:

- Sidebar and header frame the authenticated work area.
- Breadcrumbs are set by route pages through `BreadcrumbDataSetter`.
- Tables pair with filter headers and pagination footers.
- Forms use React Hook Form, Zod, shared form controls, and Card wrappers.
- Destructive actions use `AlertDialog`.
- Long-running mutations are usually wrapped with `toast.promise`.

## Related Docs

- [Routes And Layouts](routes-and-layouts.md)
- [Public Site](../modules/public-site.md)
- [Admin Auth And Shell](../modules/admin-auth-and-shell.md)
