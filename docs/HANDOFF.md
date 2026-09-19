# xiaonan.co V1 handoff

Updated 2026-09-19 for the initial GitHub push and migration to `main`, after completing V1 polish and the remaining local acceptance checks. Resume this implementation; do not start over.

## Scope and current state

- Workspace: `/Users/shawnx/Developer/personal-branding/xiaonan.co`.
- Development branch: `build-v1`; primary and production deployment branch: `main`. The initial V1 is published on both branches.
- Baseline: `8d1b9f8`; initial implementation: `91bf86c`. Earlier acceptance evidence is retained in [validation.md](validation.md).
- Identity: Xiao Nan / Shawn; Applied AI · ML Systems · Product; only the agreed GitHub profile, `https://github.com/xia0nan`.
- Quiet editorial design, warm neutral light/dark themes, serif headings, sans body, restrained rows.
- Work/Projects/published Writing intentionally remain empty. The sole article is an unpublished MDX demonstration. No invented portfolio claims or temporary fixtures.
- The user authorized pushing V1 and using `main` instead of `master` for deployment. The empty remote is initialized with V1 on `main` and `build-v1`. Cloudflare configuration, deployment, analytics, and DNS changes remain separate milestones.

## Implemented

- Static Astro site with Home, Work, Writing, Projects, About, nested local article routes, and custom 404.
- Shared layouts/navigation, reusable editorial rows, typed identity/work/project data.
- Publication/date filtering shared by listings, article routes, featured writing, and RSS; external writing links directly to its source. Draft/scheduled previews are local-only and noindex.
- Canonicals, descriptions, Open Graph, summary social card, Person JSON-LD, RSS, sitemap, robots, SVG/ICO/touch icons.
- System/Light/Dark appearance with early saved preference, storage-failure fallback, CSS system behavior, and matching theme-color hints.
- Article typography, Shiki light/dark code, static Astro callouts, keyboard-scrollable code and tables, and monochrome print layout.
- Mobile navigation/footer links and appearance selector have 44px-high targets. Row title hover/focus uses the accent; dates use tabular numerals; code gets a small radius and two-space tabs.
- GitHub Actions runs locked install, tests, and checked build on Node 24 for pushes to `main`/`build-v1` and pull requests to `main`. Check the latest remote run before deploying.

Only appearance handling ships browser JavaScript. Table focusability is added through the existing Sätteri processor at build time; no new dependencies were needed. Native select rendering is retained.

## Assessment of the appended suggestions

The earlier “Essential best practices” and “Frontend design” suggestions were attributed to **gemini-3.8-flash** (commits `7c0dc29`, `0a3a4c8`, `345e7fa`). They were useful proposals, not all requirements or guaranteed improvements. The decisions below supersede that unchecked list.

| Suggestion | Assessment and decision |
| --- | --- |
| Dual theme-color metadata | Implemented with a correction: media queries alone follow the OS, not the site's explicit theme. Existing appearance scripts now update both tags for explicit choices and restore the media-specific colors for System. Browser support varies. |
| ICO and touch-icon fallbacks | Implemented as raster exports of the existing SVG monogram. Useful compatibility assets, not evidence that the prior historical favicon errors came from the site. |
| Social card and fallback image | Added `twitter:card=summary`. It does not guarantee unfurls across platforms. A branded social image and real bot checks remain for the content/launch milestone. |
| Cloudflare cache/security headers | Sensible deployment work, deferred. The proposed `/*` revalidation rule overlaps `/_astro/*`; Pages joins duplicate header values, so that recipe would produce conflicting cache directives. Use non-conflicting rules and verify actual hosted responses. |
| www canonicalization | Sensible launch work, deferred. Configure an HTTP redirect with HTTPS coverage and preserve paths/queries; DNS alone does not redirect URLs. |
| Print styles | Implemented, including wrapping code and printable table widths so horizontally hidden content is not lost. Verified in Chrome print preview from Dark mode. |
| CI validation | Implemented in GitHub Actions. A workflow is not a deployment gate by itself; required checks or a Pages build command including tests must be configured at launch if desired. |
| Row title accent hover | Implemented for hover and keyboard focus. Reuses the existing link transition and reduced-motion rule. |
| Firefox/macOS font smoothing | Deferred. Platform-specific smoothing is an aesthetic preference, not a cross-browser consistency guarantee. No demonstrated rendering issue. |
| Tabular date numerals | Implemented; improves numeric alignment where the selected font supports it. Month-name widths still vary. |
| Custom theme-selector chevron | Deferred. The native control is clear and works with keyboard/platform conventions; a custom arrow is optional cosmetic work. |
| 44px mobile touch targets | Implemented, also for footer links and appearance control. Correction: WCAG 2.5.8 specifies 24×24 CSS pixels with exceptions; 44px is the larger target-size goal, not its minimum. |
| Code radius and tab size | Implemented. Radius is cosmetic; tab size affects literal tabs, not existing spaces. |
| Footnote styling | Deferred until real writing uses footnotes, when references, return links, and semantics can be reviewed together. |
| More desktop section spacing | Deferred. Current homepage already has generous empty-state spacing. The rule is in `global.css`, not `index.astro`; reassess with real content. |

Reference checks: [Astro components](https://docs.astro.build/en/basics/astro-components/), [styling](https://docs.astro.build/en/guides/styling/), [Markdown processor plugins](https://docs.astro.build/en/guides/markdown-content/#markdown-processor-plugins), [theme-color](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color), [WCAG target minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Cloudflare header merging](https://developers.cloudflare.com/pages/configuration/headers/), and official [checkout](https://github.com/actions/checkout)/[setup-node](https://github.com/actions/setup-node) usage.

## Validation and limitations

See [validation.md](validation.md) for historical and current evidence. Current results:

- `npm test`: 6/6 pass. `npm run build`: 0 Astro errors/warnings/hints; 6 production pages.
- Mobile keyboard scrolling verified: code and table each moved 40px with Right Arrow. Tables now receive Tab focus and a visible outline.
- Header, article, footer, and appearance keyboard paths reviewed; remaining mobile page screenshots reviewed.
- Production pages, all built assets, icons, RSS, robots, and sitemaps return 200. Unknown URL and unpublished draft URL return 404.
- Theme-color values verified for explicit choices, persisted Dark on reload, and System reset.
- Both article print-preview pages reviewed: monochrome from Dark mode, no site navigation/footer, full code/table content.
- No fresh warning/error console entries in the production review tab. No temporary fixtures remain.

Known Vite/Rolldown warning remains: MDX's `use astro:head-inject` directive. Build and visual output pass; do not suppress it or upgrade dependencies without a reason. Browser verification is Chrome desktop with responsive viewport overrides, not real iOS/Android, Safari, Firefox, or assistive-technology certification. Mobile browser chrome coloring, hosted headers/redirects, and real social unfurls still require their corresponding environment. Remote CI status is available in GitHub Actions.

## Next development milestone

The local V1 shell is ready for review. Prioritize real Work/Projects/Writing content and final identity assets next; content needs factual source material from the owner. Do not fabricate entries just to fill empty states. Deployment remains a separate authorized milestone, following the README's `pages.dev` review before domain migration.

Before resuming, read `AGENTS.md`, this file, and the validation record; inspect Git status. Reuse the current servers when responsive:

- Development: `http://localhost:4321` (draft preview: `/writing/draft-demonstration/`).
- Production preview: `http://127.0.0.1:4322`.
- Inspect listeners: `lsof -nP -iTCP:4321 -iTCP:4322 -sTCP:LISTEN`.
- If needed, start dev with `npm run dev -- --background`; manage with `npm run astro -- dev status|logs|stop`.
- Preview if needed: `npm run preview -- --host 127.0.0.1 --port 4322`.

Existing listeners survived this session. Earlier Astro status commands reported no managed servers despite working URLs, so inspect listeners before starting duplicates. Browser tabs are ephemeral; discover them anew. Temporary viewport overrides were reset, print preview canceled, and both origins returned to System.

Useful files: `README.md`, `docs/validation.md`, `src/data/`, `src/lib/writing.ts`, `tests/writing.test.ts`, `src/content.config.ts`, `astro.config.mjs`, `src/layouts/`, `src/components/ThemeToggle.astro`, `src/styles/global.css`, `.github/workflows/ci.yml`.
