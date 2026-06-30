# Query Keys Reference

This reference lists React Query keys observed in feature APIs and route components.

## Projects

| Key | Source | Meaning |
| --- | --- | --- |
| `["projects", params]` | `useGetProjectList` | Project list filtered/searched/sorted by params. |
| `["project", id]` | `useGetProjectById` | Project detail for edit form. |

Cache notes:

- Create uses `store_project` RPC and does not seed list cache directly.
- Edit invalidates `["project", projectId]` and removes project list queries.
- Reorder writes reordered local data to `["projects", params]`.

## Quotes

| Key | Source | Meaning |
| --- | --- | --- |
| `["quotes", params]` | `useGetQuoteList` | Paginated quote list. |
| `["infinite_quotes", filters, sort, per_page]` | `useInfiniteQuoteList` | Infinite quote list used by the public quote category route. |
| `["quote", id]` | `useGetQuote` | Quote detail for edit form. |

Cache notes:

- Create invalidates active quote lists and seeds detail cache.
- Update sets detail cache and patches active paginated list cache.
- Delete removes active detail and invalidates active quote lists.

## Daydreams

| Key | Source | Meaning |
| --- | --- | --- |
| `["daydreams", params]` | `useGetDaydreamList` | Paginated daydream list. |
| `["infinite_daydreams", filters, sort, per_page]` | `useInfiniteDaydreamList` | Infinite daydream list used by the public daydream gallery. |
| `["daydream", id]` | `useGetDaydreamById` | Daydream detail for edit form. |

Cache notes:

- Create sets detail cache and invalidates daydream lists.
- Update sets detail cache and patches active paginated list cache.
- Delete removes active detail and invalidates daydream lists.

## Files And Gallery

| Key | Source | Meaning |
| --- | --- | --- |
| `["files", params]` | `useFileList` | Paginated file list. |
| `["infinite_files", filters]` | `useInfiniteFileList` | Infinite gallery list filtered by query/category/bookmark. |
| `["file", id]` | `useFileById`, upload/update mutations | File detail by id. |
| `["file", path]` | `useStoragePublicUrl` | Public URL for a storage path. |

Cache notes:

- Upload seeds file detail and invalidates file/infinite-file lists after batch upload.
- Delete invalidates file and infinite-file lists.
- Rename/bookmark updates file detail cache.

## Taxonomy And Terms

| Key | Source | Meaning |
| --- | --- | --- |
| `["terms"]` | `useGetTermList` | List of top-level taxonomy term groups. |
| `["term", [identifier]]` | `useGetTermByIdentifier` | One term group by numeric identifier. |
| `["taxonomy", options]` | `useGetTaxonomyByTermId`, `useGetTaxonomyByTermAndParentId` | Taxonomy list for selected filters/select string. |
| `["taxonomy", { id }]` | `useGetTaxonomyById` | Taxonomy detail. |
| `["taxonomy", { identifier }]` | `useGetTaxonomyByTermIdentifier` | Taxonomy list by term identifier lookup. |
| `["top-source-by-category-taxonomy"]` | `useGetTopSourceGroupByCategory` | Dashboard RPC result. |

Cache notes:

- Taxonomy create/update/delete patches matching taxonomy list caches directly.
- Term and taxonomy lists generally use infinite stale time.

## Related Docs

- [Data Layer And Cache](../architecture/data-layer-and-cache.md)
- [Supabase Schema Reference](supabase-schema.md)
