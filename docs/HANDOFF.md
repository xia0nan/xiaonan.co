# xiaonan.co V1 handoff

Updated 2026-09-20 (Asia/Singapore). The owner completed the manual infrastructure migration; production is live at **https://xiaonan.co/**. Keep the static Astro architecture and do not repeat the historical migration steps below.

## Current technical cleanup and verification

- Cloudflare GET-only API checks using existing Wrangler OAuth credentials confirmed zone `xiaonan.co` is `active`, unpaused, with nameservers `guy.ns.cloudflare.com` and `meiling.ns.cloudflare.com`; public NS lookup agrees.
- Pages project `xiaonan-co` uses GitHub repository `xia0nan/xiaonan.co`, production branch `main`, automatic production deployments, build `npm run build`, and output `dist`. Apex custom-domain status, verification, and validation are all `active`.
- Before the cleanup push, production deployment `441fda4e-fe3b-4405-8f7c-62ea3e546327` at commit `9e33653` had successful build/deploy stages. Recheck the latest deployment after each push; this ID is a dated checkpoint.
- Production HTTP/metadata audit passes for all five public pages, RSS, both sitemaps, robots, linked CSS/icons, and the custom 404. Unknown and unpublished-draft routes return 404 with `noindex`. RSS is intentionally empty. See [validation.md](validation.md).
- `https://www.xiaonan.co/about?test=1` returns 301 to `https://xiaonan.co/about?test=1`, then 308 to `/about/?test=1`, then 200; path and query survive both redirects.
- Old repository `shawn-nx/shawn-nx.github.io` has Pages `cname: null`, no `CNAME` file, and serves its own GitHub hostname. Commit `1a81e6f` removed CNAME. No remaining production-domain impact was found; the repository/history remains intact.
- GitHub Actions is enabled and the validation workflow is active. Added `workflow_dispatch` while retaining both existing triggers and all validation steps. Inspect the cleanup push's [Actions run](https://github.com/xia0nan/xiaonan.co/actions/workflows/ci.yml) for remote results; the workflow does not gate independent Pages deployments.
- Removed the uncommitted Wrangler dependency addition and restored the previously committed manifest/lockfile exactly. No existing dependency versions changed. Wrangler was only used for account diagnostics; Astro development/build and Git-based Pages deployment do not require its Worker/emulator dependency tree. Use separately managed tooling for future account diagnostics.
- No DNS, nameserver, redirect, custom-domain, or Pages settings were changed by this cleanup. The push uses the existing automatic deployment integration.

## Historical deployment review — 2026-09-19, before manual migration

The following review records the earlier state and is superseded by the current verification above wherever it describes migration, domain attachment, Wrangler dependencies, or CI enablement as pending.

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

## Remaining recommended work

1. Prioritize real Work/Projects/Writing content and final social imagery; use factual owner-supplied material.
2. Consider required CI checks or tests in the hosting build command if tests should gate deployment. No settings were changed during this cleanup.
3. Verify branch/PR preview behavior on the next real development change. Complete Safari/Firefox, real mobile, screen-reader, and social-unfurl review as appropriate; prior browser acceptance was local Chrome.
4. The old Jekyll repository may be archived separately if desired; its custom-domain configuration is already removed. Analytics remains optional.

### Resume local development

Before resuming, read `AGENTS.md`, this file, and the validation record; inspect Git status. Reuse the current servers when responsive:

- Development: `http://localhost:4321` (draft preview: `/writing/draft-demonstration/`).
- Production preview: `http://127.0.0.1:4322`.
- Inspect listeners: `lsof -nP -iTCP:4321 -iTCP:4322 -sTCP:LISTEN`.
- If needed, start dev with `npm run dev -- --background`; manage with `npm run astro -- dev status|logs|stop`.
- Preview if needed: `npm run preview -- --host 127.0.0.1 --port 4322`.

Existing listeners survived the earlier local acceptance session; their current state must be checked on resume. Earlier Astro status commands reported no managed servers despite working URLs, so inspect listeners before starting duplicates. Browser tabs are ephemeral; discover them anew. Temporary viewport overrides were reset, print preview canceled, and both origins returned to System.

Useful files: `README.md`, `docs/validation.md`, `src/data/`, `src/lib/writing.ts`, `tests/writing.test.ts`, `src/content.config.ts`, `astro.config.mjs`, `src/layouts/`, `src/components/ThemeToggle.astro`, `src/styles/global.css`, `.github/workflows/ci.yml`.
