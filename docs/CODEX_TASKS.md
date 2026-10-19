# Codex task briefs (to run externally)

No Codex integration was available when this site was built, so none of the tasks below was executed by Codex.
Each brief is self-contained and is meant to be run in a separate branch, then reviewed before merging.

## Task 1: Footer and navigation polish
- Objective: tidy `components/SiteFooter.tsx` and `components/SiteHeader.tsx` without changing layout or design tokens.
- Files: `components/SiteFooter.tsx`, `components/SiteHeader.tsx`
- Acceptance: `npm run lint` and `npm run typecheck` pass; no new dependencies; no changes to colours or fonts.

## Task 2: Unit tests for content helpers
- Objective: add tests for `lib/services.ts` (six services, unique slugs, non-empty copy).
- Files: `lib/services.test.ts`
- Acceptance: `npm test` passes; the test does not modify the content.
