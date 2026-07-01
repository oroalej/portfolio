---
name: portfolio-ui-patterns
description: Use when creating or changing UI in this portfolio repository, including shared React components, public portfolio pages, admin CMS screens, Tailwind styling, loading states, dialogs, cards, buttons, forms, galleries, or responsive layout.
---

# Portfolio UI Patterns

Start by reading `CLAUDE.md`. Use this skill for UI, styling, and component composition in this repository.

## Workflow

1. Inspect the nearest existing screen or shared component before adding UI.
2. Reuse shared components from `src/components` before creating a new primitive.
3. Keep route-specific UI in colocated `_components` folders.
4. Keep class composition in JSX using Tailwind and `classNames` for conditional states.
5. Preserve the visual difference between the public portfolio and admin CMS.

## Public Site Patterns

- Public routes live under `src/app/(web)`.
- The public layout uses the mono font styling, framed outer padding, dark mode classes, `TheHeader`, `ContactMeSection`, and `TheFooter`.
- Public content sections generally use `Container` from `src/app/(web)/_components/Container` and `Section` helpers from `src/components`.
- Preserve dark-mode class coverage when changing public screens.
- Use existing gallery/image preview patterns for project and daydream image interactions.

## Admin UI Patterns

- Admin routes live under `src/app/admin/(modules)`.
- Admin pages use the sidebar/header layout and dense work-focused styling.
- Admin forms generally use `CardRoot`, `CardBody`, `CardFooter`, `FormGroup`, `Label`, `InputField`, `Textarea`, `Select`, and `Button`.
- Admin destructive actions use `AlertDialog`.
- Admin pages should include loading components for route or Suspense fallback states when data fetches are involved.

## Shared Components

- Use `Button` for button and link-like actions. Preserve existing `variant`, `color`, `size`, `rounded`, `block`, `icon`, and `isLoading` props.
- Use existing form helpers for labels, inputs, textareas, input groups, and error messages.
- Use existing select components for single, searchable, and multi-searchable selection patterns.
- Use `SupabaseImage` and image preview components for Supabase storage images.
- Use existing skeleton/loading components instead of plain loading text when adjacent screens do.

## Styling

- Prefer Tailwind utility classes over new CSS modules unless a nearby component already uses a CSS module for the same concern.
- Use `classNames` for conditional styles and keep base classes readable.
- Keep layouts responsive with existing breakpoints from `tailwind.config.js`: `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`.
- Match existing radius and spacing choices. Admin controls commonly use `rounded-md`, `gap-2`, `gap-3`, and compact button sizes.
- Avoid broad palette shifts. The app mainly uses neutral surfaces with blue/danger/warning states and the custom accent colors when appropriate.

## Validation

- Run `pnpm.cmd run lint` after UI code changes.
- Use browser/manual verification for layout-heavy changes when possible.
- Run `pnpm run build` when changing layouts, route files, images config, proxy, or public/admin shell behavior.
