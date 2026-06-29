# Public Site

## Purpose

The public site presents the portfolio homepage, resume, project portfolio, quote collection, and daydream photography gallery.

## User-Facing Routes

- `/`: portfolio summary, about section, and tech stack.
- `/resume`: resume content from `src/data/resume.ts`.
- `/projects`: redirects to the first project type taxonomy entry.
- `/projects/[projectTypeId]`: lists projects for one project type.
- `/quotes`: redirects to the first quote category taxonomy entry.
- `/quotes/[quoteId]`: lists quotes for one quote category.
- `/daydreams`: lists daydream image cards.

## Source Map

- Public layout: `src/app/(web)/layout.tsx`.
- Shared public shell: `TheHeader`, `TheFooter`, `ContactMeSection`, `Container`, `DarkModeButton`.
- Homepage sections: `PortfolioSummarySection`, `AboutMeSection`, `SkillsSection`.
- Project list/navigation: `ProjectNavigation`, `RedirectToProjectTypeId`, `ProjectList`, `ProjectCard`, `PreviewProjectImageDialog`.
- Quote list/navigation: `QuoteNavigation`, `RedirectToQuoteId`, `QuotesList`, `QuoteCard`.
- Daydream list/preview: `DaydreamList`, `DaydreamCard`, `DaydreamPreviewDialog`.

## Data Model

- Static content comes from `src/data` for resume, skills, links, and older project data.
- Dynamic projects use `projects`, `project_screenshots`, `project_skills`, `files`, and `term_taxonomy`.
- Dynamic quotes use `quotes`, `term_taxonomy`, and `terms`.
- Dynamic daydreams use `daydreams` and `files`.
- Project and quote navigation depend on taxonomy terms from `terms` and `term_taxonomy`.

## Workflows

- `/projects` fetches terms, finds `TERM_IDENTIFIER.PROJECT_TYPES`, loads taxonomy for that term, and redirects to the first taxonomy id.
- `/projects/[projectTypeId]` loads projects filtered by `project_type_id`, ordered by `project_order`, then transforms project API data into card items.
- Project screenshot preview uses `GalleryProvider` to hold the selected screenshot list and active index.
- `/quotes` fetches terms, finds `TERM_IDENTIFIER.QUOTE_CATEGORY`, loads taxonomy for that term, and redirects to the first taxonomy id.
- `/quotes/[quoteId]` loads paginated quotes filtered by `category_id`.
- `/daydreams` loads daydreams sorted by year descending and created date descending, then uses `GalleryProvider` for preview state.

## Cache And State

- Terms: `["terms"]`.
- Taxonomy: `["taxonomy", options]`.
- Projects: `["projects", params]`.
- Quotes: `["quotes", params]`.
- Daydreams: `["daydreams", params]`.
- Public quote and daydream pagination stores the selected page in the URL query key `per_page`, even though it represents the current page value in those components.

## Forms And Validation

The public site has no write forms. It uses read-only data displays, navigation, pagination, and preview dialogs.

## Verification Notes

- Validate navigation redirects for `/projects` and `/quotes` when taxonomy data exists.
- Validate empty states for projects, quotes, and daydreams.
- Validate image preview behavior where `GalleryProvider` is used.
- Run `npm.cmd run lint` after UI changes.

## Open Questions

- The fallback behavior when project type or quote category taxonomy is missing is currently only a loading skeleton, not a documented error state.
