# V1 validation record

Status: local V1 implementation and the remaining Chrome acceptance checks completed on 2026-09-19. The continuation added targeted polish and fixed keyboard focus for article tables. Historical evidence below is retained; the latest results supersede earlier pending items.

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

The installed Astro 7.3.3 / MDX 8.0.1 stack emits a Vite/Rolldown `MODULE_LEVEL_DIRECTIVE` warning about `use astro:head-inject` for the MDX propagated-assets module. The build succeeds, and the published fixture's static callout/code/table output passed inspection. The warning has not been suppressed, and no unrelated dependency upgrades were made. The draft’s callout, prose, lists, code, and table also passed Chrome visual inspection in both themes. No rendering defect has been linked to this warning.

## Browser acceptance completed on 2026-09-19

- Connected through the Chrome extension. Disabled the old native DevTools device toolbar (which was stuck at 1px), then verified real `innerWidth` values with the browser viewport capability.
- Production Home, Work, Writing, Projects, and About: navigated through links at 360, 768, and 1440 CSS pixels. Every page’s document scroll width equaled the viewport width; navigation active states were correct.
- Screenshots reviewed for the mobile/desktop homepage, tablet/mobile article header, article body in both themes, and desktop custom 404. This is not a screenshot review of every page/theme/width combination.
- Development draft: Writing stays active; draft notice, H1/H2/H3, callout, ordered/unordered lists, quote, links, highlighted code, table, and article measure render correctly.
- At 360px, code client/scroll widths were 318/476px and table widths were 320/420px, both with `overflow-x: auto`; document width remained 360px. Actual horizontal scrolling was subsequently verified (see continuation results below).
- Development theme control: explicit Dark and Light both applied correctly and survived reload. System restored the light system palette. Production preview initially displayed System.
- A disposable `public/acceptance-harness.html` loaded the actual production homepage in sandboxed iframes. The opaque-origin frame allowed scripts but denied local storage; both explicit choices worked, and navigating to About returned to System without breaking the page.
- The second iframe denied scripts entirely: the theme control was hidden, content stayed readable, and clicking About through native browser input navigated successfully.
- Changing the parent’s CSS `color-scheme` switched both embedded documents between light and dark live. This verifies browser preference-media behavior without changing the OS setting; it is not a direct OS appearance-toggle test.
- The sandbox harness was deleted before the final build. No temporary content or test pages remain in the source tree or production output.
- Keyboard Tab exposed the skip link with a visible 2px accent outline; Enter moved focus to `main`.
- Chrome DevTools `prefers-reduced-motion: reduce` emulation yielded `transition-duration: 0s` and `animation-name: none`. The emulation was then reset and DevTools closed.
- A nonexistent production URL rendered the custom 404, with Home/Writing recovery links. HTTP 404 status was subsequently verified (see continuation results below).
- Production browser warning/error logs were empty during the five-page navigation matrix, before deliberate not-found/sandbox testing.
- Final metadata audit: all six HTML pages have one H1, descriptions, and production canonicals; Home/About have valid Person JSON-LD with only the agreed GitHub profile; 404 has `noindex, follow`.
- Final XML files parse; RSS has zero entries; generated HTML contains no draft or harness links.
- After harness removal, `npm test` passed all 6 tests and `npm run build` passed: 27 files checked, 0 errors/warnings/hints from Astro check, 6 pages built. The separate known Vite directive warning remains.

## Color contrast

Computed using sRGB relative luminance. Each value is foreground contrast against page background / raised surface. All checked combinations exceed 4.5:1.

| Theme | Text | Muted | Accent |
| --- | --- | --- | --- |
| Light | 13.72 / 12.82 | 5.38 / 5.03 | 6.94 / 6.49 |
| Dark | 13.62 / 11.88 | 7.66 / 6.68 | 8.89 / 7.76 |

This checks the three site palette colors, not every Shiki syntax token or browser-native control state.

## Continuation results — handoff assessment and polish

- Fixed a demonstrated accessibility issue: the mobile table did not receive keyboard focus (clicking it left focus on main), while Shiki code already had `tabindex="0"`. Added a filtered Sätteri HAST visitor in `astro.config.mjs` that supplies table `tabIndex=0` without replacing table semantics or adding client JavaScript.
- In Chrome at a 360px viewport, native Right Arrow moved code from scrollLeft 0 to 40. After the fix, Tab moved from code to table; Right Arrow moved the table from 0 to 40. Table focus had a solid 2px accent outline, confirmed in a screenshot. Code/table content stayed within the page width.
- Chrome used a 15px vertical scrollbar during this session: innerWidth 360, document clientWidth/scrollWidth both 345. This is bounded layout, not horizontal overflow.
- Reviewed fresh 360px production screenshots of Work, Writing, Projects, and About, plus desktop Work and the mobile article scroll area. Mobile navigation, footer links, and select measured 44px high. About had no horizontal overflow and its lower content/footer were also reviewed in Dark.
- Keyboard traversal through the wordmark, all header links, About body GitHub, footer GitHub/RSS, and native appearance select showed visible solid focus outlines with no focus trap. Article link → code → table → return link → footer/select traversal was also reviewed.
- Theme-color metadata: Dark made both tags `#20231f`; reload preserved Dark and both values. Light made both tags `#f7f5ef`. System restored separate light/dark media-specific colors. This verifies DOM hints, not actual mobile address-bar rendering. Prior storage-denied/no-JS tests above remain historical coverage and were not repeated wholesale.
- Generated ICO (16/32/48px PNG entries) and a 180px touch PNG from the existing SVG monogram using installed Sharp, with no dependency change. Inspected the touch image visually.
- Opened native Chrome print preview from the Dark article. Inspected both pages: black/gray text on white, site navigation/footer absent, code fully visible, table columns/content intact. Browser-generated date/URL/page headers remain controlled by the print dialog. Canceled without saving or printing.
- Fresh production-tab warning/error console log was empty during page review. Explicit HTTP checks returned 200 for all five public pages, SVG/ICO/touch icons, RSS, robots, both sitemap XML files, and every built `/_astro` asset. Missing URL and unpublished draft URL both returned 404.
- Static audit of all six built HTML pages passed: two theme-color meta tags, summary card declaration, touch-icon link, no draft route links. An initial ad hoc metadata assertion also matched the selector text inside scripts; narrowing it to actual `<meta>` tags corrected the audit.
- Final `npm test`: 6/6 pass. Final `npm run build`: 27 files checked, 0 Astro errors/warnings/hints, 6 pages. The existing Vite MDX directive warning remains. The table plugin uses the installed Sätteri API, not legacy rehype configuration.
- CI YAML parses and contains locked installation, tests, and checked build on Node 24. No GitHub Actions execution has occurred; the workflow is local until an authorized push.
- No temporary content or browser harness remains. No hosting configuration, dependency upgrades, push, merge, or deployment was performed.

## Remaining environment-specific checks

- Real iOS/Android chrome coloring and touch behavior, Safari/Firefox, and screen-reader review are not claimed by Chrome responsive testing.
- CI must run remotely after an authorized push. Configure required checks or include tests in the hosting build command if they must gate deployment.
- Validate hosted cache/security headers, domain redirects, TLS, real social unfurls, and production 404 behavior at deployment. Astro preview cannot prove Cloudflare behavior.
- Add and review final social imagery and real portfolio content in the next milestone. Empty sections are deliberate, not pending implementation defects.

## Local server/tool state

Development and production preview remained available at `http://localhost:4321` and `http://127.0.0.1:4322`. Existing listeners were reused. Inspect listeners before starting anything because the earlier Astro status output did not track these processes correctly. Temporary browser viewport overrides were reset, print preview was canceled, and both origins were restored to System. The production homepage was left as the local review tab.
