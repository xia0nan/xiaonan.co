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

## First Cloudflare deployment review — 2026-09-19

The owner deployed `9e33653` from `main` to Pages project `xiaonan-co`. Wrangler and the dashboard confirmed Git integration, automatic production deployments, build command `npm run build`, output `dist`, and no custom domains. The production URL is https://xiaonan-co.pages.dev/; the immutable deployment URL is https://441fda4e.xiaonan-co.pages.dev/.

Hosted curl checks returned 200 for all five public pages, icons, robots, RSS and both sitemaps; unknown and draft routes returned 404. RSS parsed with zero items, homepage canonical remained `https://xiaonan.co/`, and the custom 404 contained noindex. Python urllib returned client-specific 403s while curl succeeded; hosted visual acceptance remains pending rather than inferred from HTTP checks.

Public DNS still uses Namecheap nameservers and old GitHub Pages destinations. No DNS/custom-domain changes were made. GitHub Actions still lists zero runs, so remote CI is not recorded as passing. The earlier local-only/push-pending entries above describe historical checkpoints; [HANDOFF.md](HANDOFF.md) contains the current migration state and remaining tasks.


## Post-migration technical verification — 2026-09-20 (Asia/Singapore)

This checkpoint supersedes earlier pending DNS/custom-domain and CI-enablement notes. Infrastructure was inspected read-only; no DNS, nameserver, redirect, custom-domain, or Pages settings were modified.

- Cloudflare API (using existing Wrangler OAuth authentication): zone active and unpaused; `guy.ns.cloudflare.com` / `meiling.ns.cloudflare.com`, matching public NS lookup. Pages project `xiaonan-co`: Git integration enabled, production branch `main`, build `npm run build`, output `dist`, automatic production deployments enabled. Custom domain `xiaonan.co`: status, verification, and validation all active.
- Pre-push production deployment `441fda4e-fe3b-4405-8f7c-62ea3e546327` (`9e33653`) had successful build/deploy stages. After cleanup commit `4bcf3f6` was pushed, deployment `fbf29aba-0671-4f59-89d7-c496ef00a9c9` successfully built/deployed the same commit and became the canonical production deployment. The production route/metadata/asset/redirect audit below passed again after deployment.
- HTTPS GET audit: `/`, `/about/`, `/work/`, `/writing/`, `/projects/`, `/rss.xml`, `/sitemap-index.xml`, `/sitemap-0.xml`, and `/robots.txt` all returned 200. All five HTML pages have one H1, a description, and the correct production canonical. Linked CSS and SVG/ICO/touch icons returned 200.
- RSS and both sitemaps parse as XML. RSS contains zero entries as intended. Sitemap lists exactly the five public pages, excludes drafts/404, and robots allows crawling with the correct sitemap URL.
- Unknown `/__verification_missing_page__/` and unpublished `/writing/draft-demonstration/` return HTTP 404, the custom recovery content, and `noindex, follow`. Direct `/404.html` is normalized by Pages with 308; the actual missing-route responses above verify 404 behavior.
- `https://www.xiaonan.co/about?test=1` → 301 `https://xiaonan.co/about?test=1` → 308 `https://xiaonan.co/about/?test=1` → 200. Both redirects preserve the query and path, with trailing-slash normalization at the apex.
- Observed HTML headers: `Cache-Control: public, max-age=0, must-revalidate`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`; 404 responses use `Cache-Control: no-store`. HTTPS certificate validation succeeded through curl. This is a technical HTTP/metadata audit, not a new cross-browser visual sign-off.
- Old GitHub Pages repository `shawn-nx/shawn-nx.github.io`: `status: built`, `cname: null`, `html_url: https://shawn-nx.github.io/`, no CNAME file in the `master` tree, and Jekyll `url` unset. Commit `1a81e6f` deleted CNAME. No remaining effect on the production domain was found; no old hosting settings were changed.
- GitHub API confirms Actions enabled and `Validate site` active. Added `workflow_dispatch`, retaining push (`main`, `build-v1`) and pull-request (`main`) triggers, read-only contents permissions, and the existing install/test/build steps. [Run 35466095246](https://github.com/xia0nan/xiaonan.co/actions/runs/35466095246), triggered by push of `4bcf3f6`, completed successfully. Job `105958579436` reports individual success for `npm ci`, `npm test`, and `npm run build`; this is remote evidence, not inferred from local tests.
- Removed the uncommitted Wrangler addition: restored package manifest and lockfile exactly to their committed versions, with no dependency upgrades. The only pre-existing lockfile changes were Wrangler's dependency tree and optional/devOptional flags for Sharp and `@img/colour`. Astro and Git-integrated Pages do not need Wrangler. Future account diagnostics can use separately managed tooling.
- Fresh `npm ci` passed (303 packages); npm reported an unapproved optional macOS `fsevents` install script. `npm test` passed 6/6. `npm run build` passed: 27 files checked, 0 Astro errors/warnings/hints, 6 static pages. The previously documented Vite MDX directive warning remains non-blocking and was not suppressed.

Remaining recommendations: decide separately whether CI must gate deployment; check branch previews on the next actual development change; review real mobile/Safari/Firefox/assistive technology and social unfurls as needed; add factual portfolio content. No architectural changes are required by this audit.

## Launch planning update — 2026-09-20

- Owner confirmed the site has been added to Google Search Console and Cloudflare Web Analytics has been enabled. These are owner-reported setup completions; property type/verification, sitemap submission, indexing, analytics snippet delivery, and dashboard data arrival were not independently checked in this update.
- Recorded the preceding session's successful cleanup CI/deployment above so it no longer reads as awaiting a push. No new CI run or deployment was performed for this documentation update.
- Inspected `src/layouts/BaseLayout.astro`: `twitter:card` is still `summary`; `og:image` and `twitter:image` are absent. One static fallback social image plus metadata is the next implementation task, followed by platform unfurls, a short real-device/Lighthouse pass, and legacy-URL review. See the [reviewed launch checklist](HANDOFF.md#reviewed-launch-checklist--current).
- This update changes documentation only. No infrastructure, application code, dependencies, or account settings changed. Existing test/build results remain the last executable-code validation; tests were not rerun for prose edits.

## Social preview implementation — 2026-09-20

- Continued on feature branch `social-preview`, preserving the preceding uncommitted launch documentation. Added editable `design/social-card.svg` and the committed static `public/social-card.png`; documented the export process in `design/README.md`. Inspected the rendered PNG: warm ivory background, Georgia name, green positioning line, domain footer; 1200 × 630, opaque RGB, 23,601 bytes. No dependency changes or runtime image service.
- Shared layout now supplies an absolute production `og:image`/`twitter:image`, PNG type, 1200 × 630 dimensions, matching image alt text, and `twitter:card=summary_large_image`. Existing page titles/descriptions, canonicals, publication metadata, and site UI are preserved.
- `npm test`: all 6 pass. `npm run build`: 27 files checked, 0 Astro errors/warnings/hints, 6 static pages. The existing Vite MDX directive warning remains. Parsed all six generated HTML files to assert single, correct social metadata values; checked canonical/title/description presence and PNG dimensions/copy integrity.
- Existing local production preview was reused and the rebuilt homepage opened in Chrome. No new dev server was started. After merge, check production image delivery and actual social unfurls. Preview metadata intentionally points to production, so unfurling the preview before merge is not the final platform acceptance test.
- Implementation commit `52fd689` is on `social-preview` in [PR #1](https://github.com/xia0nan/xiaonan.co/pull/1). [CI run 35471384065](https://github.com/xia0nan/xiaonan.co/actions/runs/35471384065) passed each of `npm ci`, `npm test`, and `npm run build`. Cloudflare preview deployment `860222cd-eece-4463-a7d4-9ce8bd84ae5f` succeeded for the same commit; [immutable preview](https://860222cd.xiaonan-co.pages.dev/) and [branch preview](https://social-preview.xiaonan-co.pages.dev/) are available. This verifies the branch/PR preview path.
- Hosted HTTPS audit: all five public pages return 200 with the correct image URLs/card type; `/social-card.png` returns 200 as `image/png`, is 1200 × 630, and is byte-identical to the visually reviewed local PNG. Chrome's preview request was blocked with `ERR_BLOCKED_BY_CLIENT`; hosted browser visual acceptance is not claimed. No merge, production deployment, or social message was performed.

## First published external writing — 2026-09-20

- The owner supplied the Medium URL and confirmed authorship. Verified the original title and October 12, 2022 publication date from [the article](https://medium.com/agoda-engineering/from-tf-idf-to-prompt-based-learning-agodas-nlp-applications-2dfe8abd942a). Added a metadata-only Markdown entry with a short summary, `featured: true`, and `externalUrl` through the existing content model.
- Local `npm test`: 6/6 pass. `npm run build`: 27 files checked, 0 Astro errors/warnings/hints, 6 static pages; existing MDX directive warning remains. Generated Home/Writing each contain exactly one link to the original article and the original publication date. RSS parses and contains exactly one item with the Medium URL and date. No duplicate local article route or sitemap entry is created; the local draft remains excluded.
- PR #1 was already merged as `bd39bff` before this content-only addition. Updated local `main` with a fast-forward; no layout, dependency, or infrastructure changes are part of this publication.
- Publication completed as commit `91ad90d`. [CI run 35474382775](https://github.com/xia0nan/xiaonan.co/actions/runs/35474382775) and Cloudflare deployment `34852c9b-2b08-4414-8b35-c4f171d0fe82` succeeded. The production audit confirmed HTTP 200, the external link/date on Home and Writing, one correct RSS item, no duplicate sitemap entry, and a production social PNG byte-identical to the reviewed local asset. These results were observed in the publication session and recorded here during the subsequent roadmap update.

## V1.1 roadmap review — 2026-09-20

Added [future-work.md](future-work.md) after comparing the owner's proposed plan with the current repository and preceding production evidence. Corrected the outdated empty-Writing and pending-production-image assumptions; distinguished sample career claims from verified facts; defined a small source brief, one Work entry, and a bounded launch-review milestone. Search Console/analytics dashboard results, real-device checks, and actual platform unfurls remain unverified. Web retrieval could not access the site in this review; no new live-site defect or cache diagnosis is inferred. This update changes documentation only; no application tests or deployment were rerun.

## V1.1 focus, profiles, and launch review — 2026-09-20

### Scope and copy

Baseline `bd54762` retains the minimal name/positioning hero and adds hero SVG/HTML/Figma script assets. Its [CI run 35492488837](https://github.com/xia0nan/xiaonan.co/actions/runs/35492488837) was independently verified successful. The removed `design/social-card.svg` is historical evidence, not a currently editable asset; `public/social-card.png` remains unchanged. Figma import/script execution was not tested.

The owner confirmed applied AI and agentic workflows, particularly reliability and scalability, with technology and finance as professional domains. The owner explicitly deferred writing a contribution; [future-work.md](future-work.md#current-owner-decisions-and-todo) contains that todo. Work and Projects remain empty. About, Current interests, Home/About descriptions, and shared public profiles are updated on `v1-1-content-launch`; the hero is unchanged. No employers, dates, personal contribution, or impact have been inferred.

Both exact owner-supplied profiles opened successfully in signed-in Chrome: LinkedIn `/in/xiao-nan/` and Medium `/@xiao.nan` (which lists the existing Agoda article). Curl received 999/403 respectively; this is a client restriction, not evidence of broken profiles. Footer, About, and Person `sameAs` use the same configuration.

### Local acceptance

- `npm test`: 6/6 pass. `npm run build`: 28 files, zero Astro errors/warnings/hints, six static pages. The existing MDX `use astro:head-inject` bundler warning remains.
- Generated-output assertions pass for profiles on all five public pages, exact Person profile list on Home/About, absolute social image/card metadata, unchanged PNG, one original Agoda link on Home/Writing, exactly one RSS item, exactly five expected sitemap URLs, and draft exclusion.
- Chrome visually reviewed Home and About at 390px mobile (including dark mode) and 1440px desktop light. Adding profiles initially crowded the mobile footer; fixed by stacking identity/links on mobile and allowing links to wrap. Corrected mobile About/Home screenshots show readable copy and a clean footer. Desktop layout has no horizontal overflow.
- Keyboard activation of Skip to content focuses `main`. Navigation to Work renders its intended empty state. Full keyboard traversal and a complete Home/About/Work light/dark matrix remain pending; do not confuse the checks above with that complete matrix.
- Mac Safari loads the revised About page, profiles, and native theme selector; System and explicit Dark were observed, and the Dark page was visually reviewed. Complete Safari navigation/back, explicit Light, OS-theme switching, and iPhone Safari touch/overflow checks remain pending. No iPhone was available through the tools.

### Production/account evidence (before this branch is published)

- Search Console domain property: `https://xiaonan.co/sitemap-index.xml` shows **Success**, submitted/read Sep 20, 2026, with **5 discovered pages**. Home and About both show **URL is on Google / Page is indexed**. Live tests show **URL is available to Google / Page can be indexed** (Home 14:02 and About 14:14, Asia/Singapore). No indexing request was made; the new draft is not yet published.
- Cloudflare Web Analytics for `xiaonan.co`, last 24 hours (GMT+8), shows nonzero visits and page views. Data arrival is verified. Chrome's production DOM contains the Cloudflare beacon; Lighthouse network evidence records script HTTP 200 and `/cdn-cgi/rum` HTTP 204 on both pages. Curl's homepage HTML lacks the injected script. That client difference does not demonstrate a configuration failure; no analytics settings or snippet changed.
- LinkedIn Post Inspector fetched Home with HTTP 200 and the correct canonical, title, and branded image. Visually verified image crop and title. Inspector warns the current production description is under 100 characters; this branch's description is longer, but its ingestion needs rechecking after release. Inspector also inferred Article/date from the listing despite the page's explicit `og:type=website`; no public post was sent. WhatsApp preview remains pending; no messages sent.
- Production Agoda link/date, single RSS item, external-only sitemap behavior, and social image delivery all pass; production PNG is byte-identical to the committed image. No production change is claimed for this branch.

### Mobile Lighthouse

Lighthouse 13.5.0, mobile simulated throttling, clean headless Chrome against production on Sep 20. These are lab results for the baseline, not field guarantees or measurements of the pending branch. [Machine-readable summary](launch-2026-09-20/lighthouse-summary.json); full temporary reports are `/private/tmp/xiaonan-v11-{home,about}-lighthouse.report.{html,json}`.

| Page | Performance | Accessibility | Best practices | SEO | FCP / LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 99 | 100 | 100 | 100 | 1.7s / 1.7s | 0ms | 0 |
| About | 100 | 100 | 100 | 100 | 0.9s / 0.9s | 0ms | 0 |

Home's minor cache (~4 KiB) and legacy-JS (~11 KiB) opportunities concern the third-party Cloudflare beacon. No site-code performance fix was justified; do not add preloads or change infrastructure just for these scores. The responsive footer fix addresses an observed branch layout problem independently of Lighthouse.

### Legacy URL inventory

Read the old `shawn-nx/shawn-nx.github.io` Pages source (`master`, root), tree, config, navigation, and live sitemap/feed. There are no root `_posts` or `_pages`; `/docs` and `/test` theme samples are excluded from the build. Live sitemap contains only Home; the Atom feed has no entries. No evidence supports inventing redirects for theme sample paths.

| Old path on xiaonan.co | Current result / relevant replacement | Decision |
| --- | --- | --- |
| `/` | Current Astro Home, 200 | Preserved. |
| `/sitemap.xml` | New sitemap index is `/sitemap-index.xml` and is successfully submitted to Google | Optional compatibility mapping only; not implemented in this branch. |
| `/feed.xml` | 404; `/rss.xml` is the relevant feed replacement | Record for a separately scoped redirect decision; old feed was empty. |

Owner-known inbound links and Search Console link-level history were not exhaustively inventoried. Any subsequently supplied meaningful URL needs its own relevant replacement/removal decision. No redirect/account/security changes were made.

### Release status

Copy review, PR CI/Pages preview, merge, and post-merge production verification are tracked below as evidence becomes available. The deferred contribution and pending device/platform checks keep the broader V1.1 milestone open.
