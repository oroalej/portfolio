---
name: portfolio-codebase-patterns
description: Use when working in this portfolio repository on Next.js App Router routes, feature placement, TypeScript structure, data flow, providers, hooks, or broad codebase architecture. Applies to tasks that need project-specific file organization and coding standards.
---

# Portfolio Codebase Patterns

Start by reading `CLAUDE.md`. Use this skill for architecture and placement decisions in this repository.

## Workflow

1. Identify whether the change belongs to the public site, admin CMS, shared components, feature data layer, context, hooks, utilities, static data, or shared types.
2. Keep route files in `src/app` thin. Put interactive or large UI logic in colocated `_components` folders or existing shared components.
3. Use the existing `@/*` path alias for app imports.
4. Preserve client/server boundaries. Add `"use client"` only when the file uses hooks, browser APIs, navigation hooks, React Query, contexts, or event handlers.
5. Reuse existing shared helpers before creating new abstractions.
6. Keep changes scoped to the requested behavior. Do not reorganize unrelated feature folders or static data.

## Placement Guide

- Put reusable UI primitives in `src/components`.
- Put route-local UI in `src/app/<route>/_components`.
- Put Supabase queries, mutations, and query hooks in `src/features/<domain>/api`.
- Put API response types in `src/features/<domain>/types`.
- Put domain-specific mapping logic in `src/features/<domain>/transformers`.
- Put reusable React state hooks in `src/hooks`.
- Put generic non-React helpers in `src/utils`.
- Put static portfolio/resume/skill content in `src/data`.

## TypeScript And React

- Prefer `interface` for object props and form structures when matching nearby code.
- Use `BaseComponent` for common `children` and `className` props.
- Use `Tables<"table_name">` for Supabase table rows and derive form/API types from it when practical.
- Keep React Query hooks near the API function they wrap.
- Keep default form values and schemas near their form component unless multiple screens share them.

## Validation

- Run `pnpm.cmd run lint` on Windows PowerShell after code changes.
- Use `pnpm run build` when changing routing, layouts, config, proxy, server/client boundaries, or data fetching behavior.
