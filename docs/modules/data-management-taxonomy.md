# Data Management And Taxonomy

## Purpose

Data Management is the admin interface for managing taxonomy data. Taxonomy values drive project types, project skills, quote categories, quote sources, media details, and gallery categories.

## User-Facing Routes

- `/admin/data-management`
- `/admin/data-management/[taxonomyId]`

## Source Map

- Terms API: `src/features/terms/api`.
- Taxonomy API: `src/features/term_taxonomy/api`.
- Taxonomy constants: `src/data/index.ts`.
- Admin components: `src/app/admin/(modules)/data-management/_components`.
- Form: `DataManagementForm`.
- Table: `DataManagementTable`.
- Header/type selector: `DataManagementHeader`.

## Data Model

- `terms`: top-level taxonomy groups with numeric identifiers.
- `term_taxonomy`: taxonomy entries linked to one term group and optional parent taxonomy.
- `TERM_IDENTIFIER` maps semantic groups:
  - `SKILL = 1`
  - `SKILL_CATEGORIES = 2`
  - `SOURCE = 3`
  - `MEDIA_DETAIL = 4`
  - `QUOTE_CATEGORY = 5`
  - `PROJECT_TYPES = 6`
  - `GALLERY_CATEGORIES = 7`

## Workflows

- Header loads all terms and stores selected term id in URL query key `type`.
- Table loads taxonomy rows filtered by selected `term_id`.
- If no `type` is selected, the table asks the user to select a type.
- Create uses the currently selected `type` as `term_id`.
- Edit loads taxonomy by id and preserves the selected `type` in breadcrumbs.
- Parent taxonomy is required for media detail and source entries:
  - Media detail parent type is source.
  - Source parent type is quote category.
- Delete removes a taxonomy row and patches matching taxonomy list caches.

## Cache And State

- Terms: `["terms"]`.
- Taxonomy lists: `["taxonomy", options]`.
- Taxonomy detail: `["taxonomy", { id }]`.
- Create patches matching taxonomy list caches and sorts by name.
- Update patches matching taxonomy list caches and sets detail cache.
- Delete patches matching taxonomy list caches by removing the deleted id.
- URL query key `type` controls selected taxonomy group.

## Forms And Validation

- `DataManagementForm` uses React Hook Form and a dynamic Zod schema.
- Name is required.
- Description is optional.
- Parent type is required only when the selected term requires a parent.
- Parent select options are loaded from taxonomy rows for the required parent term.

## Verification Notes

- Check the `type` query param is preserved when creating and editing.
- Check source/media-detail parent requirements.
- Check taxonomy selector consumers in projects, quotes, daydreams, and gallery after taxonomy changes.
- Run `pnpm.cmd run lint` after taxonomy changes.

## Open Questions

- Taxonomy seed values are not committed as migrations or seed files, so runtime identifiers must match `TERM_IDENTIFIER`.
