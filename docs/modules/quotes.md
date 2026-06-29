# Quotes

## Purpose

Quotes store quote content with category, source, and optional media-detail taxonomy relationships. They power the public quote collection and the admin quote manager.

## User-Facing Routes

- Public:
  - `/quotes`
  - `/quotes/[quoteId]`
- Admin:
  - `/admin/quotes`
  - `/admin/quotes/[quoteId]`

## Source Map

- Feature API: `src/features/quotes/api`.
- Types: `src/features/quotes/types`.
- Admin components: `src/app/admin/(modules)/quotes/_components`.
- Public components: `src/app/(web)/quotes`.
- Form: `QuoteForm`.
- Table: `QuotesTable`.
- Filter: `QuoteTableFilter`.

## Data Model

- `quotes`: quote content, category, source, optional media detail.
- `term_taxonomy`: quote categories, sources, and media details.
- `terms`: identifies quote category, source, and media-detail term groups.

## Workflows

- Public `/quotes` redirects to the first quote category taxonomy entry.
- Public quote navigation lists quote categories.
- Public quote list filters by `category_id`, sorts by newest first, and paginates.
- Admin index combines a sticky create form with a paginated table.
- Admin search filters quote content through `q`.
- Admin filters use URL query params `category_id`, `source_id`, and `media_detail_id`.
- Selecting a quote row opens the edit route while preserving query params.
- Delete can happen from the table confirmation dialog or the edit form confirmation dialog.

## Cache And State

- Quote list: `["quotes", params]`.
- Quote detail: `["quote", id]`.
- Create invalidates active quote lists and seeds detail cache.
- Update sets detail cache and patches active paginated list cache.
- Delete removes the active detail query and invalidates active quote lists.
- Public and admin pagination use URL query state.

## Forms And Validation

- `QuoteForm` uses React Hook Form and `QuoteSchema`.
- Required fields: content, category, source.
- `media_detail_id` is required unless the selected category matches the hard-coded `INDIVIDUAL_ID`.
- Changing category clears source and media detail.
- Changing source clears media detail.
- Category, source, and media detail selectors are taxonomy-backed and can create taxonomy items.

## Verification Notes

- Check source/media-detail dependency when category changes.
- Check the `INDIVIDUAL_ID` branch for quotes that do not require media detail.
- Check admin filtering preserves pagination behavior.
- Run `pnpm.cmd run lint` after quote changes.

## Open Questions

- The meaning and source of the hard-coded `INDIVIDUAL_ID` should be documented as taxonomy seed data or replaced with a named lookup.
