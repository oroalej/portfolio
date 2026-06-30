# Portfolio Application Docs

This folder is an Obsidian-compatible documentation vault for the portfolio application. It documents application behavior, module boundaries, data relationships, and operational notes.

Coding standards and agent instructions live in `../CLAUDE.md`. Keep this vault focused on human-facing application knowledge.

Last source review: 2026-06-30.

## Start Here

- [Application Map](application-map.md)
- [Runbook](runbook.md)
- [Claude Commands](commands.md)
- [Known Gaps](known-gaps.md)

## Architecture

- [Routes And Layouts](architecture/routes-and-layouts.md)
- [Data Layer And Cache](architecture/data-layer-and-cache.md)
- [UI System](architecture/ui-system.md)

## Modules

- [Public Site](modules/public-site.md)
- [Admin Auth And Shell](modules/admin-auth-and-shell.md)
- [Dashboard](modules/dashboard.md)
- [Projects](modules/projects.md)
- [Quotes](modules/quotes.md)
- [Daydreams](modules/daydreams.md)
- [Gallery And Files](modules/gallery-and-files.md)
- [Data Management And Taxonomy](modules/data-management-taxonomy.md)

## References

- [Routes Reference](reference/routes.md)
- [Supabase Schema Reference](reference/supabase-schema.md)
- [Query Keys Reference](reference/query-keys.md)
- [Daydream Image Migration SQL](reference/daydream-images-migration.sql)
- [Daydream Save RPC SQL](reference/daydream-save-rpc.sql)
- [Daydream RLS SQL](reference/daydream-rls.sql)

## Maintenance Notes

- Update module docs when routes, feature APIs, Supabase relationships, URL query params, or major workflows change.
- Update [Known Gaps](known-gaps.md) when a documented uncertainty is resolved or a new recurring blocker appears.
- Keep duplicated coding rules out of this vault; link to `../CLAUDE.md` instead.
