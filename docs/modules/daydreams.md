# Daydreams

## Purpose

Daydreams are photography-style entries with an image, year, description, and camera settings. They power the public daydream gallery and the admin daydream CMS.

## User-Facing Routes

- Public:
  - `/daydreams`
- Admin:
  - `/admin/daydreams`
  - `/admin/daydreams/create`
  - `/admin/daydreams/[daydreamId]`

## Source Map

- Feature API: `src/features/daydreams/api`.
- Feature constants: `src/features/daydreams/data`.
- Types: `src/features/daydreams/types`.
- Transformers: `src/features/daydreams/transformers`.
- Admin components: `src/app/admin/(modules)/daydreams/_components`.
- Public components: `src/app/(web)/daydreams/_components`.
- Form: `DaydreamForm`.
- Table: `DaydreamTable`.
- Public list: `DaydreamList`.

## Data Model

- `daydreams`: year, description, ISO, shutter speed, aperture, and file relationship.
- `files`: image metadata and storage path.
- Gallery category taxonomy is used when selecting images from the gallery dialog.

## Workflows

- Public daydream list loads 21 items at a time, sorted by year descending and created date descending, then fetches the next page through an intersection-observer sentinel.
- Public preview uses `GalleryProvider` plus `DaydreamPreviewDialog`.
- Admin index supports search, year filtering, pagination, row selection, and delete confirmation.
- Admin create/edit uses a gallery dialog to select the image file.
- Image selection writes `file_id` into the form and keeps local image preview state.
- Delete invalidates daydream lists and removes active detail queries.

## Cache And State

- Daydream list: `["daydreams", params]`.
- Public infinite daydream list: `["infinite_daydreams", filters, sort, per_page]`.
- Daydream detail: `["daydream", id]`.
- Create seeds detail cache and invalidates daydream lists.
- Update sets detail cache and patches active paginated list cache.
- Delete removes active detail cache and invalidates daydream lists.
- Admin pagination uses URL query state.
- Public daydream pagination is held in the infinite query state, not the URL.
- Public preview state uses `GalleryProvider`.

## Forms And Validation

- `DaydreamForm` uses React Hook Form and `DreamSchema`.
- Required fields: image, year, description, ISO, shutter speed, aperture.
- Defaults come from `src/features/daydreams/data`.
- Gallery upload image rules are owned by `src/features/files/data`.
- Accepted gallery upload types are JPG, JPEG, PNG, WEBP, GIF, and AVIF.
- Max gallery image size is 50 MB.

## Verification Notes

- Check gallery image selection and clear behavior.
- Check year filter and search in admin list.
- Check public preview and infinite-scroll behavior.
- Run `pnpm.cmd run lint` after daydream changes.

## Open Questions

- Admin delete confirmation text says "customer record"; this appears copied from another context and should be reviewed.
