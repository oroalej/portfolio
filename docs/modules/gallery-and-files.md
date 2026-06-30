# Gallery And Files

## Purpose

The gallery module manages image files in Supabase storage and mirrors file metadata in the `files` table. It is used directly by the admin gallery and indirectly by project screenshots and daydream image selection.

## User-Facing Routes

- `/admin/gallery`
- `/admin/gallery/create`
- `/admin/gallery/[imageId]`

## Source Map

- Feature API: `src/features/files/api`.
- Types: `src/features/files/types`.
- Gallery wrapper: `src/app/admin/(modules)/gallery/_components/GalleryWrapper.tsx`.
- Gallery list/item: `GalleryList`, `GalleryItem`.
- Upload form: `GalleryCreateWrapper`.
- Rename dialog: `RenameDialog`.
- Query param hook: `useGalleryQueryParams`.

## Data Model

- `files`: file metadata, storage path, bucket, category, size, type, width, height, duration, bookmark state.
- Supabase storage bucket: `images`.
- `term_taxonomy`: gallery categories.
- `daydreams.file_id` and `project_screenshots.file_id` reference `files.id`.

## Workflows

- Gallery lists images through `useInfiniteFileList`.
- Filters include category, bookmark tab, and filename search.
- Upload accepts drag/drop or file input.
- Upload validates file type and max size before writing to storage and inserting metadata.
- Upload normalizes accepted image MIME types and passes that value as the Supabase storage `contentType`.
- Rename updates `files` metadata and moves the storage object when the filename changes.
- Delete removes the database row and storage object, then invalidates file list caches.
- Gallery items support preview, download, copy link, rename, bookmark toggle, detail navigation, and delete.
- Other modules can reuse `GalleryWrapper` for single or multi-select image picking.

## Cache And State

- Paginated file list: `["files", params]`.
- Infinite file list: `["infinite_files", removeEmptyValues({ q, ...filter })]`.
- File detail/public URL: `["file", id]` or `["file", path]`.
- Upload seeds `["file", id]` and invalidates file/infinite-file lists after batch upload.
- Delete invalidates `["files"]` and `["infinite_files"]`.
- Gallery filters use URL query keys `q` and `category_id`.

## Forms And Validation

- Upload form uses React Hook Form and `StoreGallerySchema`.
- Category is required.
- File validation uses file-owned image rules from `src/features/files/data`.
- Max image size is 50 MB.
- Supported upload formats are JPG, JPEG, PNG, WEBP, GIF, and AVIF. Validation accepts supported MIME types case-insensitively and falls back to lowercase filename extensions only when the browser does not provide a MIME type.
- SVG and non-image file types are rejected.
- Rejected files are shown through `RejectedFileListDialog`.

## Verification Notes

- Check upload writes both storage object and `files` row.
- Check rename moves the storage path and updates metadata.
- Check delete removes both storage object and metadata row.
- Check bookmark tab filtering and category filter behavior.
- Run `pnpm.cmd run lint` after gallery/file changes.

## Open Questions

- Only the `images` bucket is typed in `Buckets`; audio/video types exist but no route currently documents those workflows.
