# V1 validation record

Status: implementation complete; most browser acceptance checks passed on 2026-09-19. Paused at the user’s request with the remaining checks below. No application code changes were needed in this session.

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
- At 360px, code client/scroll widths were 318/476px and table widths were 320/420px, both with `overflow-x: auto`; document width remained 360px. Actual horizontal scrolling remains to be verified (see below).
- Development theme control: explicit Dark and Light both applied correctly and survived reload. System restored the light system palette. Production preview initially displayed System.
- A disposable `public/acceptance-harness.html` loaded the actual production homepage in sandboxed iframes. The opaque-origin frame allowed scripts but denied local storage; both explicit choices worked, and navigating to About returned to System without breaking the page.
- The second iframe denied scripts entirely: the theme control was hidden, content stayed readable, and clicking About through native browser input navigated successfully.
- Changing the parent’s CSS `color-scheme` switched both embedded documents between light and dark live. This verifies browser preference-media behavior without changing the OS setting; it is not a direct OS appearance-toggle test.
- The sandbox harness was deleted before the final build. No temporary content or test pages remain in the source tree or production output.
- Keyboard Tab exposed the skip link with a visible 2px accent outline; Enter moved focus to `main`.
- Chrome DevTools `prefers-reduced-motion: reduce` emulation yielded `transition-duration: 0s` and `animation-name: none`. The emulation was then reset and DevTools closed.
- A nonexistent production URL rendered the custom 404, with Home/Writing recovery links. HTTP status code still needs an explicit check.
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

## Remaining acceptance checks

1. Verify real horizontal code/table scrolling at 360px. `locator('pre').press('ArrowRight')` timed out twice through the browser bridge, with no measured scroll offset. The page still rendered correctly afterward. Inspect a fresh screenshot and try native horizontal scrolling or keyboard focus; do not count the attempted calls as passes.
2. Finish keyboard navigation/focus review beyond the skip link (header links, footer links, theme selector, article links, scroll regions). Use fresh screenshots for any remaining visual concerns on Work/Writing/Projects/About, particularly mobile.
3. Finish a fresh console/network check and confirm HTTP statuses for production pages, assets, and the custom 404. Native DevTools showed two historical development `/favicon.ico` 404s even though pages declare `/favicon.svg`; their origin was not established. The temporary harness had no favicon declaration. Console was cleared before the last draft reload; inspect fresh evidence before changing assets. Expected sandbox script-block messages and deliberate missing-page responses are not application defects.
4. After any fixes, rerun the relevant checks and build. If no source changes are needed, the successful final build above remains valid; avoid repeating the entire completed matrix.
5. Update this record, commit logical changes on `build-v1`, leave a clean worktree, and deliver local review URLs plus README and any limitations. No push/deployment actions are authorized.

## Local server/tool state at pause

- Development responded at `http://localhost:4321`; production preview responded at `http://127.0.0.1:4322`.
- Astro `dev status` and `preview status` reported no managed server, even outside the sandbox. `lsof` nevertheless showed node listeners (then PIDs 49512 on IPv6 localhost:4321 and 49963 on 127.0.0.1:4322), and Chrome navigation worked. Do not start duplicates merely because the status command says none; inspect current listeners and browser response first.
- The existing user Chrome tab was the draft preview. The agent-created production tab may have been automatically closed after interruption; preserving it at pause returned “No tab with id”. Discover current tabs on resume.
- Temporary viewport overrides were reset when saving this pause. Native device toolbar and reduced-motion emulation had already been disabled; both site origins were left using System.
