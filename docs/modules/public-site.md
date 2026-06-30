# Public Site

## Purpose

The public site presents the portfolio homepage, resume, project portfolio, quote collection, and daydream photography gallery.

## User-Facing Routes

- `/`: interactive code-style portfolio summary, about section, and tech stack.
- `/resume`: resume content from `src/data/resume.ts`, including categorized technology badges and a local PDF download.
- `/projects`: redirects to the first project type taxonomy entry.
- `/projects/[projectTypeId]`: lists projects for one project type.
- `/quotes`: redirects to the first quote category taxonomy entry.
- `/quotes/[quoteId]`: lists quotes for one quote category.
- `/daydreams`: lists daydream image cards.

## Source Map

- Public layout: `src/app/(web)/layout.tsx`.
- Shared public shell: `TheHeader`, `TheFooter`, `ContactMeSection`, `Container`, `DarkModeButton`.
- Resume components: `TechnologyBadge`, `TechnologyBadgeList`.
- Homepage sections: `PortfolioSummarySection`, `PortfolioSummaryCode`, `AboutMeSection`, `SkillsSection`.
- Project list/navigation: `ProjectNavigation`, `RedirectToProjectTypeId`, `ProjectList`, `ProjectCard`, `PreviewProjectImageDialog`.
- Quote list/navigation: `QuoteNavigation`, `RedirectToQuoteId`, `QuotesList`, `QuoteCard`.
- Daydream list/preview: `DaydreamList`, `DaydreamCard`, `DaydreamPreviewDialog`.

## Data Model

- Static content comes from `src/data` for portfolio summary, resume, skills, links, and older project data.
- `src/data/portfolioSummary.ts` owns the homepage summary name, nickname, experience, primary skills, LinkedIn link, email link, and resume download metadata.
- The downloadable resume PDF lives at `public/alexander-jeam-oro-resume.pdf`.
- Dynamic projects use `projects`, `project_screenshots`, `project_skills`, `files`, and `term_taxonomy`.
- Dynamic quotes use `quotes`, `term_taxonomy`, and `terms`.
- Dynamic daydreams use `daydreams`, `daydream_images`, and `files`.
- Project and quote navigation depend on taxonomy terms from `terms` and `term_taxonomy`.

## Workflows

- The homepage summary renders a faux code editor that can switch between JavaScript and PHP syntax while keeping links and contact metadata sourced from `PORTFOLIO_SUMMARY`.
- `/projects` fetches terms, finds `TERM_IDENTIFIER.PROJECT_TYPES`, loads taxonomy for that term, and redirects to the first taxonomy id.
- `/projects/[projectTypeId]` loads projects filtered by `project_type_id`, ordered by `project_order`, then transforms project API data into card items.
- Project screenshot preview uses `GalleryProvider` to hold the selected screenshot list and active index.
- `/resume` renders static resume entries, downloads `/alexander-jeam-oro-resume.pdf`, and categorizes technology badge labels as frontend, backend, data/API, AI/developer tools, workflow/platform, or other.
- `/quotes` fetches terms, finds `TERM_IDENTIFIER.QUOTE_CATEGORY`, loads taxonomy for that term, and redirects to the first taxonomy id.
- `/quotes/[quoteId]` loads quotes filtered by `category_id` and fetches additional pages through infinite scroll.
- `/daydreams` loads daydream posts sorted by year descending and created date descending, fetches additional pages through infinite scroll, uses the first ordered image as each cover, then uses `GalleryProvider` for selected-post image preview state.

## Cache And State

- Terms: `["terms"]`.
- Taxonomy: `["taxonomy", options]`.
- Projects: `["projects", params]`.
- Quotes: `["quotes", params]` for paginated lists and `["infinite_quotes", filters, sort, per_page]` for the public infinite list.
- Daydreams: `["daydreams", params]` for paginated lists and `["infinite_daydreams", filters, sort, per_page]` for the public infinite list.

## Forms And Validation

The public site has no write forms. It uses read-only data displays, navigation, infinite loading, pagination where route components still use it, and preview dialogs.

## Verification Notes

- Validate navigation redirects for `/projects` and `/quotes` when taxonomy data exists.
- Validate the homepage summary language switch plus LinkedIn, email, and resume links.
- Validate empty states for projects, quotes, and daydreams.
- Validate public quote and daydream infinite-scroll loading.
- Validate image preview behavior where `GalleryProvider` is used.
- Run `pnpm.cmd run lint` after UI changes.

## Open Questions

- The fallback behavior when project type or quote category taxonomy is missing is currently only a loading skeleton, not a documented error state.
