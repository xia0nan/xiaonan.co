# xiaonan.co V1 handoff

Updated 2026-09-20 (Asia/Singapore). **Infrastructure is complete; the site is in launch/hardening mode.** Production is live at **https://xiaonan.co/**. Keep the static Astro architecture and do not repeat the historical migration steps below.

**Future-work source of truth:** [V1.1 roadmap](future-work.md). The next substantial milestone is owner-verified homepage/About positioning and one evidence-backed Work entry, alongside a bounded launch review. The proposed plan's empty-Writing observation is outdated; the Medium article is already live. Do not treat its sample employers, tenure, or project outcomes as verified biography.

## Launch progress and immediate next step

Content update: the owner's [Agoda NLP article](https://medium.com/agoda-engineering/from-tf-idf-to-prompt-based-learning-agodas-nlp-applications-2dfe8abd942a) is live via commit `91ad90d` as a published, featured external entry dated 2022-10-12. Production Home/Writing and the single RSS item were verified; no local article page or sitemap URL is generated. Earlier empty-Writing/RSS observations below describe historical checkpoints.

| Item | Status | Evidence / follow-up |
| --- | --- | --- |
| Infrastructure, HTTPS, www redirect, custom 404 | Complete | Cloudflare and production audit passed, including the post-cleanup deployment. |
| Local validation and remote CI | Complete at latest publication | Article commit `91ad90d`: local tests/build, [CI run 35474382775](https://github.com/xia0nan/xiaonan.co/actions/runs/35474382775), and Cloudflare production deployment passed. |
| Google Search Console | Site added — owner confirmed | Property type, verification details, and sitemap submission were not independently inspected. Confirm `https://xiaonan.co/sitemap-index.xml` is submitted and readable if not already done. |
| Cloudflare Web Analytics | Enabled — owner confirmed | Confirm data arrives; do not add a duplicate analytics snippet or GA4. Dashboard data was not inspected in this update. |
| Branded social preview image and metadata | [PR #1](https://github.com/xia0nan/xiaonan.co/pull/1) merged as `bd39bff` | Static 1200 × 630 PNG, editable SVG, complete OG image metadata, and `summary_large_image`. Local checks and [implementation CI](https://github.com/xia0nan/xiaonan.co/actions/runs/35471384065) pass; Pages preview deployment and HTTP checks pass. |
| Real social unfurls | Pending platform review | PR #1 is merged. Check the production image/title/description on the platforms the owner actually uses. |
| Real-device Safari and Lighthouse pass | Pending | Earlier responsive Chrome and HTTP checks remain valid; they do not substitute for these checks. |
| Old URL inventory | Pending short review | Old custom-domain removal is complete, but legacy URL coverage is a separate check. |

**Next task:** gather the owner's verified experience, one Work example, and exact LinkedIn/Medium profile URLs using the [V1.1 source brief](future-work.md#priority-1--evidence-and-copy-brief). Draft specific homepage/About copy and one Work entry from that material. The remaining social-unfurl, Safari/Lighthouse, analytics, Search Console, and legacy-URL checks can proceed in parallel; do not wait for indexing before developing the content. The social card is implemented; source/export instructions are in [design/README.md](../design/README.md).

Social-card acceptance: local tests/build and PR CI passed; preview HTTP checks passed, and production `/social-card.png` was verified byte-identical to the visually reviewed local export during the `91ad90d` publication. Chrome blocked the remote preview with `ERR_BLOCKED_BY_CLIENT`, so no hosted browser visual sign-off is claimed. Actual platform unfurls remain pending. No image service, generator dependency, or runtime JavaScript was added.

## Current technical cleanup and verification

- Cloudflare GET-only API checks using existing Wrangler OAuth credentials confirmed zone `xiaonan.co` is `active`, unpaused, with nameservers `guy.ns.cloudflare.com` and `meiling.ns.cloudflare.com`; public NS lookup agrees.
- Pages project `xiaonan-co` uses GitHub repository `xia0nan/xiaonan.co`, production branch `main`, automatic production deployments, build `npm run build`, and output `dist`. Apex custom-domain status, verification, and validation are all `active`.
- Cleanup commit `4bcf3f6` was pushed to `main`. Production deployment `fbf29aba-0671-4f59-89d7-c496ef00a9c9` successfully built and deployed that commit, and the post-deployment HTTP audit passed. This is the verified cleanup checkpoint, not a claim that no later deployment exists.
- Production HTTP/metadata audit passed for all five public pages, RSS, both sitemaps, robots, linked CSS/icons, and the custom 404. Unknown and unpublished-draft routes return 404 with `noindex`. RSS now contains one external article after publication of `91ad90d`. See [validation.md](validation.md).
- `https://www.xiaonan.co/about?test=1` returns 301 to `https://xiaonan.co/about?test=1`, then 308 to `/about/?test=1`, then 200; path and query survive both redirects.
- Old repository `shawn-nx/shawn-nx.github.io` has Pages `cname: null`, no `CNAME` file, and serves its own GitHub hostname. Commit `1a81e6f` removed CNAME. No remaining production-domain impact was found; the repository/history remains intact.
- GitHub Actions is enabled and the validation workflow is active. Added `workflow_dispatch` while retaining both existing triggers and all validation steps. [Cleanup run 35466095246](https://github.com/xia0nan/xiaonan.co/actions/runs/35466095246) passed `npm ci`, `npm test`, and `npm run build` individually. The workflow does not gate independent Pages deployments.
- Removed the uncommitted Wrangler dependency addition and restored the previously committed manifest/lockfile exactly. No existing dependency versions changed. Wrangler was only used for account diagnostics; Astro development/build and Git-based Pages deployment do not require its Worker/emulator dependency tree. Use separately managed tooling for future account diagnostics.
- No DNS, nameserver, redirect, custom-domain, or Pages settings were changed by this cleanup. The push uses the existing automatic deployment integration.

## Historical deployment review — 2026-09-19, before manual migration

The following review records the earlier state and is superseded by the launch progress and current verification above wherever it describes migration, domain attachment, Wrangler dependencies, CI, or analytics as pending. Historical commands and setup instructions are evidence, not the current next-step checklist.

## Scope and current state

- Workspace: `/Users/shawnx/Developer/personal-branding/xiaonan.co`.
- Development branch: `build-v1`; primary and production deployment branch: `main`. The initial V1 is published on both branches.
- Baseline: `8d1b9f8`; initial implementation: `91bf86c`. Earlier acceptance evidence is retained in [validation.md](validation.md).
- Identity: Xiao Nan / Shawn; Applied AI · ML Systems · Product; only the agreed GitHub profile, `https://github.com/xia0nan`.
- Quiet editorial design, warm neutral light/dark themes, serif headings, sans body, restrained rows.
- Work/Projects/published Writing intentionally remain empty. The sole article is an unpublished MDX demonstration. No invented portfolio claims or temporary fixtures.
- GitHub repository: `xia0nan/xiaonan.co`; `main` is the default branch. V1 was pushed as commit `9e33653` on `main` and `build-v1`.
- The owner created Cloudflare Pages project `xiaonan-co` and deployed V1 at **https://xiaonan-co.pages.dev/**. Git integration, automatic deployments, and production branch `main` are verified in the dashboard.
- The apex/custom-domain migration has **not** happened: Namecheap remains authoritative for DNS and the public records still point to the old GitHub Pages site. No custom domain is attached to the Pages project.
- The owner installed local Wrangler and authorized Cloudflare agent setup/OAuth. Existing `package.json` and `package-lock.json` changes adding Wrangler were preserved; they were already uncommitted when this review began.
- This continuation checked the existing deployment and configured local agent integrations. It did not change DNS, attach a domain, enable analytics, or create another deployment.

## Progress against the migration guide

| Guide phases | Status | Evidence / remaining work |
| --- | --- | --- |
| 0–7: architecture, repo, tools, Astro, collections | Complete | Existing static Astro + TypeScript + Tailwind 4 + MDX + Content Collections; production URL configured. No server adapter required. |
| 8–10: V1, local validation, GitHub | Complete | V1 implemented and reviewed locally; `main` pushed to the main GitHub account. |
| 11–13: Cloudflare account, Pages project, first deployment | Complete | Owner completed setup; Git-connected project and live `pages.dev` deployment verified. |
| 14: hosted deployment review | In progress | HTTP, metadata and RSS smoke checks pass. Hosted mobile/desktop/theme/keyboard visual sign-off still needed; prior full visual checks were local. |
| 15–19: DNS inventory and nameserver migration | Pending | Current authoritative nameservers are still Namecheap. Cloudflare zone existence/import state has not been inspected. |
| 20–21: apex domain and www redirect | Pending | Pages custom-domain list is empty. Attach apex only after DNS preparation; verify HTTPS and path/query-preserving www redirect. |
| 22: retire old GitHub Pages domain | Pending | Keep old hosting/domain configuration until the new custom domain passes review. Preserve the Jekyll history. |
| 23: analytics | Optional, pending | No analytics enablement was performed; choose whether to enable it after cutover. |
| 24–27: routine content and branch workflow | Partly ready | `main` → Pages automatic production deploy is enabled. Verify a branch/PR preview when the next development branch is pushed. |
| 28 / V2–V3 extras | Deferred | Keep V1 static and small; real writing/work/projects take priority over new features. |

## Verified Cloudflare deployment

- Project: `xiaonan-co`; production URL: https://xiaonan-co.pages.dev/.
- Repository: https://github.com/xia0nan/xiaonan.co; production branch: `main`.
- Deployed commit: `9e33653` (`Use main as the primary deployment branch`).
- Deployment ID: `441fda4e-fe3b-4405-8f7c-62ea3e546327`; immutable deployment URL: https://441fda4e.xiaonan-co.pages.dev/.
- Dashboard build command: `npm run build`; output: `dist`; root directory: blank (repository root); build system: version 3. Node 24 is declared in `.node-version`; the remote Node log line was not independently inspected.
- Automatic deployments: enabled. Git provider: connected. No custom domains attached.
- Wrangler: local dev dependency `^4.135.0`, installed version `4.135.0`; existing OAuth login verified. Use `npm exec -- wrangler ...` from this repository, not a presumed global `wrangler` binary.
- Read-only commands used: `npm exec -- wrangler whoami`, `npm exec -- wrangler pages project list --json`, and `npm exec -- wrangler pages deployment list --project-name xiaonan-co --json` (the installed binary was invoked directly during this check).
- Routine deployment stays Git-based. Do not introduce `wrangler deploy`, a Worker, or an Astro Cloudflare adapter for this static Pages site.
- GitHub Actions workflow is pushed, but the GitHub API still listed **zero workflow runs** during this review. Do not report remote CI as passing. Pages build success is separate from `npm test`: the current Pages build command does not run the tests.

### Hosted smoke checks (2026-09-19)

Using curl, Home/Work/Writing/Projects/About, SVG/ICO/touch icons, robots, RSS, and both sitemap files returned HTTP 200. An unknown route and `/writing/draft-demonstration/` returned 404. RSS parsed successfully with zero entries, matching the deliberate empty Writing section; Work showed the expected empty state. The custom 404 included noindex. Homepage metadata and canonical `https://xiaonan.co/` were present.

Observed homepage headers included `Cache-Control: public, max-age=0, must-revalidate`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`. These are observed hosted defaults, not evidence of a repository `_headers` file. Hashed-asset caching and full hosted browser/network review remain to be checked.

Tool limitation: the web retrieval tool could not access this Pages URL and Python urllib received 403 responses; curl returned the expected 200/404 responses. Do not interpret those client-specific failures as a demonstrated site outage. Hosted visual acceptance has not been marked complete.

### Current public DNS snapshot (read-only)

- NS: `dns1.registrar-servers.com`, `dns2.registrar-servers.com` (Namecheap).
- Apex A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (old GitHub Pages destinations).
- `www` CNAME: `shawn-nx.github.io`.
- Public DS lookup returned no records in this check; confirm DNSSEC state at the registrar before changing nameservers.
- This is **not a complete DNS backup**. MX/TXT/AAAA/CAA and other subdomains must still be inventoried before cutover. No DNS records were edited.

## Cloudflare agent setup

Followed the Codex section of the owner-supplied [official Cloudflare setup instructions](https://developers.cloudflare.com/agent-setup/prompt.md).

- Installed all 14 current official `cloudflare/skills` skills into `/Users/shawnx/.codex/skills/` using the Codex skill installer. These include `cloudflare`, `wrangler`, `web-perf`, and `workers-best-practices`; installation does not change this site’s architecture.
- Registered all five global MCP entries in `/Users/shawnx/.codex/config.toml`: `cloudflare`, `cloudflare-docs`, `cloudflare-bindings`, `cloudflare-builds`, and `cloudflare-observability`.
- OAuth login commands completed successfully for the four account-backed connections. `cloudflare-docs` is public and does not need OAuth. The owner explicitly approved authorization; credentials remain in local credential storage, never in the repository.
- Restart Codex to load the newly registered MCP servers. The skills are now discoverable; MCP tools were not available in the current tool inventory, so no end-to-end MCP tool call is claimed yet. Verify a read-only account/project query after restart.
- Wrangler authentication and Codex MCP authentication are separate; both were configured successfully.

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

## Reviewed launch checklist — current

The [V1.1 roadmap](future-work.md) supersedes this checklist for priority, content scope, and milestone completion. The technical notes below remain useful. Keep the remaining technical pass small; indexing and analytics data arrival are asynchronous and should not hold up publishing useful content.

1. **Close the two setup follow-ups, without repeating setup.** Confirm sitemap submission/readability in Search Console and data arrival in Cloudflare Web Analytics. Search Console registration does not establish indexing or sitemap submission. Low-traffic sites may lack Core Web Vitals field data. If analytics was enabled through Pages, automatic snippet injection takes effect on the next deployment; check before adding any source snippet. See [Google's sitemap report](https://support.google.com/webmasters/answer/7451001?hl=en), [Core Web Vitals report](https://support.google.com/webmasters/answer/9205520?hl=en), and [Cloudflare setup behavior](https://developers.cloudflare.com/web-analytics/get-started/).
2. **Check real unfurls for the merged social image.** Use the acceptance criteria above and [Open Graph image metadata](https://ogp.me/#structured). Review LinkedIn and WhatsApp, plus Slack/Telegram only if useful to the owner. Exact cropping/text varies by platform; verify the result rather than assuming HTML metadata guarantees it. The owner can perform actual sharing; do not send messages to others as part of an automated audit.
3. **Check meaningful old URLs during this launch pass.** Use the old repository's published paths, Search Console, and known inbound links; `site:xiaonan.co` is only supplementary, since [Google does not return an exhaustive list](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site). Prepare a mapping only for pages with relevant replacements. A genuine removed page can remain 404/410; do not redirect everything to Home ([Google migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)). Redirect changes remain outside the existing infrastructure authorization.
4. **Do one bounded browser and performance pass.** Mac Safari and iPhone Safari, including dark/system mode; Chrome as a baseline and Android only if available. Check navigation/back, fonts, tap targets, scrolling, and overflow. There are no published code articles yet: use the local draft when checking code/table behavior rather than publishing a test article. Run Lighthouse/PageSpeed on the production homepage and one representative inner page; fix demonstrated performance/accessibility/SEO defects, not small score fluctuations. Recheck only affected behavior after fixes.
5. **Use a practical branch workflow for the next code change.** Code/layout/dependencies → feature branch → PR to `main` → CI and Pages preview → owner review → merge → production. Preview and CI can run in parallel. Current CI already runs on PRs targeting `main`; an arbitrary feature-branch push alone does not match the push trigger (`main`, `build-v1`). Tiny content/docs edits may go directly to `main` if permitted by the eventual rules. The branch/PR preview path was verified on PR #1; continue checking the actual code-change PRs.
6. **Keep repository/security policy optional and separate.** Blocking force pushes and branch deletion is a useful minimal ruleset. Required CI/PR rules need an explicit policy choice: they also affect direct content pushes unless a deliberate bypass is granted. Do not promise both unrestricted direct edits and universally required checks. See [GitHub rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets). DNSSEC can be evaluated separately with the registrar; do not change DNS, nameservers, redirects, custom domains, or security settings during this launch documentation task.

**Deferred or already sufficient:** the existing custom 404 already has Home/Writing recovery links. The supplied Medium article is already published as an external link; full republication is a separate editorial decision. A stable résumé URL is useful when an approved PDF exists. Professional email is optional; this audit has not verified forwarding or outbound delivery. Search, tags, archives, and related-post features should follow an actual discovery need, not a fixed article-count threshold. The old Jekyll repository can optionally be archived while preserving history.

**Stopping point:** once the social image/unfurls, short browser/performance pass, and legacy-URL review are addressed, treat the platform as finished and prioritize positioning, case studies, projects, writing, and distribution. No CMS, database, Workers/SSR/adapter, React, comments, newsletter infrastructure, authentication, chatbot, or animation framework is justified by this checklist.

### Resume local development

Before resuming, read `AGENTS.md`, this file, and the validation record; inspect Git status. Reuse the current servers when responsive:

- Development: `http://localhost:4321` (draft preview: `/writing/draft-demonstration/`).
- Production preview: `http://127.0.0.1:4322`.
- Inspect listeners: `lsof -nP -iTCP:4321 -iTCP:4322 -sTCP:LISTEN`.
- If needed, start dev with `npm run dev -- --background`; manage with `npm run astro -- dev status|logs|stop`.
- Preview if needed: `npm run preview -- --host 127.0.0.1 --port 4322`.

Existing listeners survived the earlier local acceptance session; their current state must be checked on resume. Earlier Astro status commands reported no managed servers despite working URLs, so inspect listeners before starting duplicates. Browser tabs are ephemeral; discover them anew. Temporary viewport overrides were reset, print preview canceled, and both origins returned to System.

Useful files: `README.md`, `docs/validation.md`, `src/data/`, `src/lib/writing.ts`, `tests/writing.test.ts`, `src/content.config.ts`, `astro.config.mjs`, `src/layouts/`, `src/components/ThemeToggle.astro`, `src/styles/global.css`, `.github/workflows/ci.yml`.
