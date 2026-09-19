# V1 validation record

Status: implementation complete; browser acceptance review pending. Paused at the user's request to restart Codex and enable Chrome computer use.

## Completed

- Node 24.21.0; installed the planned `@astrojs/check` and `typescript` dev dependencies without upgrading the existing site dependencies.
- `npm test`: all 6 focused tests pass (eligibility, exact publication boundary, future/draft exclusions, sorting, featured limits, nested/external URLs, local routes, empty collections).
- Final `npm run build`: successful after removing all temporary content. `astro check`: 0 errors, 0 warnings, 0 hints.
- Final output contains Home, Work, Writing, Projects, About, and `404.html`, plus robots, RSS, sitemap, and local assets.
- Final RSS and sitemap XML parse successfully; final RSS contains zero entries as intended.
- Final generated HTML/XML contains no temporary article titles, draft article URLs, or localhost URLs.
- Temporary local published MDX, external writing, and future-dated fixtures were built and inspected, then removed and the site rebuilt.
- Fixture audit verified nested article generation; direct external RSS links; no external local route; no future or draft production route/link/feed/sitemap entry; one H1 per page; descriptions and production canonicals; all generated internal links/assets resolved on disk.
- Fixture MDX output contained the Astro callout, H2/H3 headings, highlighted code with both Shiki theme variables, table, lists, and article publication metadata.
- Chrome loaded the development homepage with the correct identity, navigation, featured fixture rows, and then the final empty state after fixture removal.

## Known build warning

The installed Astro 7.3.3 / MDX 8.0.1 stack emits a Vite/Rolldown `MODULE_LEVEL_DIRECTIVE` warning about `use astro:head-inject` for the MDX propagated-assets module. The build succeeds, and the published fixture's static callout/code/table output passed inspection. The warning has not been suppressed, and no unrelated dependency upgrades were made. Complete visual verification before deciding whether further investigation is necessary.

## Pending browser acceptance

- Visual review at 360, 768, and 1440 CSS pixels; no page-wide horizontal overflow.
- All navigation, active states, custom 404, and production preview behavior.
- Draft MDX callout, headings, lists, links, code, table, and article measure in both themes.
- Theme first visit, explicit Light/Dark, persistence/reload, System changes, unavailable storage, and JavaScript disabled.
- Keyboard access, visible focus, skip link, heading order, color contrast, reduced motion.
- Browser console/network checks for application errors and missing assets.
- Final metadata/JSON-LD review and final clean Git status after any fixes.

Do not count the interrupted responsive session as a passed check. Chrome's native UI width control ended up at 1px rather than the intended 360px; the last console measurement was therefore invalid for acceptance. Reset the device width before continuing.
