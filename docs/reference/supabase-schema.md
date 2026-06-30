# Supabase Schema Reference

This reference summarizes the generated types in `src/types/supabase.ts` and source-level storage/RPC usage.

## Tables

### `daydreams`

Fields: `id`, `created_at`, `description`, `year`, `iso`, `shutter_speed`, `aperture`.

Used by:

- [Daydreams](../modules/daydreams.md)

### `daydream_images`

Fields: `id`, `daydream_id`, `file_id`, `image_order`.

Relationships:

- `daydream_id` references `daydreams.id`.
- `file_id` references `files.id`.

Reference SQL:

- [Daydream image migration SQL](daydream-images-migration.sql)
- [Daydream save RPC SQL](daydream-save-rpc.sql)
- [Daydream RLS SQL](daydream-rls.sql)

These files are checked-in reference snippets; this repo still does not have a Supabase migrations directory.

Used by:

- [Daydreams](../modules/daydreams.md)

### `files`

Fields: `id`, `created_at`, `bucket_name`, `storage_file_path`, `name`, `type`, `size`, `width`, `height`, `duration`, `category_id`, `is_bookmarked`.

Relationships:

- `category_id` references `term_taxonomy.id`.

Storage:

- The typed bucket union currently includes `images`.
- Upload/delete/rename workflows also write to Supabase storage.

Used by:

- [Gallery And Files](../modules/gallery-and-files.md)
- [Projects](../modules/projects.md)
- [Daydreams](../modules/daydreams.md)

### `projects`

Fields: `id`, `created_at`, `title`, `description`, `project_order`, `project_type_id`, `website_link`, `design_link`, `repository_link`.

Relationships:

- `project_type_id` references `term_taxonomy.id`.

Used by:

- [Projects](../modules/projects.md)

### `project_screenshots`

Fields: `id`, `project_id`, `file_id`, `title`, `description`, `screenshot_order`.

Relationships:

- `project_id` references `projects.id`.
- `file_id` references `files.id`.

Used by:

- [Projects](../modules/projects.md)

### `project_skills`

Fields: `id`, `created_at`, `project_id`, `skill_id`.

Relationships:

- `project_id` references `projects.id`.
- `skill_id` references `term_taxonomy.id`.

Used by:

- [Projects](../modules/projects.md)

### `quotes`

Fields: `id`, `created_at`, `content`, `category_id`, `source_id`, `media_detail_id`.

Relationships:

- `category_id` references `term_taxonomy.id`.
- `source_id` references `term_taxonomy.id`.
- `media_detail_id` references `term_taxonomy.id`.

Used by:

- [Quotes](../modules/quotes.md)

### `terms`

Fields: `id`, `name`, `description`, `identifier`.

Used by:

- [Data Management And Taxonomy](../modules/data-management-taxonomy.md)
- Public project and quote navigation.
- Admin taxonomy-backed selectors.

### `term_taxonomy`

Fields: `id`, `term_id`, `parent_id`, `name`, `description`.

Relationships:

- `term_id` references `terms.id`.
- `parent_id` references `term_taxonomy.id`.

Used by:

- [Data Management And Taxonomy](../modules/data-management-taxonomy.md)
- [Projects](../modules/projects.md)
- [Quotes](../modules/quotes.md)
- [Gallery And Files](../modules/gallery-and-files.md)

## RPC Functions

### `save_daydream`

Generated type exists in `src/types/supabase.ts`.

Arguments:

- nullable `p_id`; pass `null` for creates and the daydream id for updates
- `p_year`
- `p_description`
- `p_iso`
- `p_shutter_speed`
- `p_aperture`
- `p_image_file_ids`

Returns:

- one JSON daydream record shaped like `DaydreamAPIDataStructure`, including ordered nested images and file metadata

Used by:

- Daydream create and update.

### `store_project`

Generated type exists in `src/types/supabase.ts`.

Arguments:

- `title`
- `description`
- `project_type_id`
- `skills`
- optional `screenshots`
- optional `website_link`
- optional `design_link`
- optional `repository_link`

Returns:

- project id as `string`

Used by:

- Project creation.

### `top_sources_per_category`

Used by `src/features/term_taxonomy/api/getTopSourceGroupByCategory.ts`.

This RPC is not present in the generated `src/types/supabase.ts` function list at the time of this documentation pass.

Used by:

- [Dashboard](../modules/dashboard.md)

## Composite Types

### `screenshot_form`

Fields:

- `title`
- `screenshot_order`
- `file_id`

Used by:

- `store_project` RPC.

## Related Docs

- [Data Layer And Cache](../architecture/data-layer-and-cache.md)
- [Known Gaps](../known-gaps.md)
