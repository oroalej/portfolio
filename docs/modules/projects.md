# Projects

## Purpose

Projects document portfolio work and power both the public project gallery and the admin project CMS. Projects can have a type, skills, links, screenshots, and ordering.

## User-Facing Routes

- Public:
  - `/projects`
  - `/projects/[projectTypeId]`
- Admin:
  - `/admin/projects`
  - `/admin/projects/create`
  - `/admin/projects/[projectId]`

## Source Map

- Feature API: `src/features/projects/api`.
- Types: `src/features/projects/types`.
- Transformers: `src/features/projects/transformers`.
- Admin components: `src/app/admin/(modules)/projects/_components`.
- Public components: `src/app/(web)/projects/[projectTypeId]/_components`.
- Project form: `ProjectForm`.
- Admin list: `IndexProjectListWrapper`.
- Public list: `ProjectList`.

## Data Model

- `projects`: core project row, project type, ordering, and links.
- `project_screenshots`: ordered screenshot junctions for a project.
- `project_skills`: skill junctions for a project.
- `files`: screenshot image metadata and storage paths.
- `term_taxonomy`: project types and skills.
- `store_project` RPC creates projects with skills and screenshot data.

## Workflows

- Public `/projects` redirects to the first project type taxonomy entry.
- Public project list filters by `project_type_id` and sorts by `project_order`.
- Public screenshot preview uses `GalleryProvider`, thumbnail navigation, and `PreviewProjectImageDialog`.
- Admin index filters by URL query params `type` and `q`.
- Admin index can reorder projects with `@dnd-kit` when a project type filter is active.
- Admin create uses `store_project` RPC.
- Admin edit updates the project row, diffs skills, diffs screenshots, updates junction tables, invalidates the project detail, and removes project list caches.
- Admin project cards can delete projects through `useDeleteProjectMutation`.

## Cache And State

- Project list: `["projects", params]`.
- Project detail: `["project", id]`.
- Edit mode uses cached project list data as possible initial detail data.
- Reorder updates local list state and writes the reordered list into the matching `["projects", params]` cache.
- Screenshot preview state uses `GalleryProvider`.

## Forms And Validation

- `ProjectForm` uses React Hook Form and `ProjectSchema`.
- Required fields: title, description, project type, and at least one skill.
- Optional fields: website link, design link, repository link, screenshots.
- Project type and skills are taxonomy-backed selects.
- Screenshots are selected from gallery images and stored with an order.

## Verification Notes

- Check public filtering by project type.
- Check admin create, edit, skill diffing, screenshot diffing, and reorder behavior.
- Check links are rendered with the expected URL prefixes in public preview dialogs.
- Run `npm.cmd run lint` after project changes.

## Open Questions

- The `store_project` RPC is typed, but its database implementation is not present in repo migrations.
- Project delete cache behavior should be verified in the UI because the delete API implementation was not part of the detailed docs pass.
