# Resume xiaonan.co V1

Updated 2026-09-19 after the Chrome acceptance session. The user requested another pause to pick up the work later. Resume the existing V1 implementation; do not start over.

## Repository and scope

- Workspace: `/Users/shawnx/Developer/personal-branding/xiaonan.co`
- Current branch: `build-v1`; primary branch stays `master`.
- Initial starter baseline: `8d1b9f8` on master.
- Implementation commit: `91bf86c`; prior handoff/fixture cleanup: `46f7c84`. Temporary verification articles are absent from the current tree.
- This session needed no application-code changes; the checkpoint records acceptance evidence and remaining work.
- No push, merge, Cloudflare configuration, analytics, or DNS changes are authorized for this milestone.
- Agreed identity: Xiao Nan / Shawn; Applied AI · ML Systems · Product; GitHub `https://github.com/xia0nan` only.
- Quiet editorial design, warm neutral light/dark themes, serif headings, sans body, restrained rows. Honest empty Work/Projects/Writing; one unpublished MDX demonstration.

## Implemented

- Static Astro config, production URL, trailing slashes, existing Tailwind/MDX/sitemap retained.
- Type checking and build scripts, Node built-in tests, additional check/TypeScript dev dependencies.
- Shared BaseLayout/Header/Footer/ThemeToggle; metadata, canonical URLs, RSS discovery, Person JSON-LD, skip link.
- Home, Work, Writing, Projects, About, local nested articles, custom 404.
- Typed site/work/project data; reusable editorial row components.
- Writing collection/schema and shared publication/sorting/link/featured helpers; local dev previews; production exclusions; direct external links; RSS and robots.
- Scoped article typography, dual Shiki themes, static Astro callout, monogram favicon.
- README covering local commands, content authoring, publishing, draft-source visibility, and later Cloudflare Pages deployment.

## Validation so far

See `docs/validation.md` for exact evidence, contrast values, tool limitations, and the remaining checklist. Most browser acceptance is now complete:

- Chrome connected successfully; the stale 1px device emulation was fixed.
- All five production pages passed navigation/active-state and no-overflow checks at 360/768/1440 CSS pixels.
- Draft MDX was visually reviewed in both themes; article navigation correctly activates Writing.
- Light/Dark persistence, System behavior, storage-denied and script-disabled sandbox cases, live embedded light/dark preference changes, skip-link keyboard focus, and reduced-motion emulation passed.
- Custom 404 renders correctly; final metadata/Person JSON-LD, XML, empty RSS, and draft exclusion passed.
- Text/muted/accent contrast exceeds 4.5:1 against both backgrounds in both palettes.
- Disposable browser harness removed; only the original unpublished demonstration remains. Final `npm test` passed 6/6 and final `npm run build` passed with 0 Astro check diagnostics and 6 production pages.

Known warning: Vite/Rolldown still warns about MDX’s `use astro:head-inject` directive. Build and MDX visual output passed; do not hide the warning or upgrade dependencies without a reason.

## Next steps on resume

1. Read `AGENTS.md`, this handoff, and `docs/validation.md`; check Git status. Most acceptance work is done—do not redo it wholesale.
2. Discover current Chrome tabs. The existing user tab was on `http://localhost:4321/writing/draft-demonstration/`. The temporary production tab may have closed after interruption.
3. Check current server listeners/browser response before starting anything. Both URLs worked even though Astro status commands reported no managed servers:
   - Development: `http://localhost:4321`
   - Production preview: `http://127.0.0.1:4322`
   - Inspect with `lsof -nP -iTCP:4321 -iTCP:4322 -sTCP:LISTEN`.
   - If needed, start dev with `npm run dev -- --background`; manage with `npm run astro -- dev status|logs|stop`.
   - If needed, start preview with `npm run preview -- --host 127.0.0.1 --port 4322`.
4. Verify actual horizontal scrolling in mobile article code/table blocks. CSS overflow and bounded geometry passed, but browser-bridge `locator('pre').press('ArrowRight')` timed out twice. Inspect fresh UI and try native scrolling/focus; do not infer a site defect from the tool timeout.
5. Finish keyboard traversal beyond the skip link and any remaining page-specific visual review. Finish fresh console/network/HTTP status checks, including SVG favicon and custom 404 status. Two historical dev `/favicon.ico` 404s were seen; the temporary harness had no favicon declaration, so investigate fresh evidence before making changes.
6. Fix any demonstrated issue, rerun relevant checks/build if source changes, and update validation honestly. No fixtures currently need cleanup.
7. Commit any remaining logical changes on `build-v1`, leave a clean worktree, and deliver a concise final response with local review URL, README link, validation, and limitations. No push, merge, or deployment actions.

## Browser tooling notes

- Use `cua_repl`; inspect its current documentation on reconnect. Chrome extension supports read-only DOM evaluation, Playwright locators, screenshots, and a browser `viewport` capability.
- Native DevTools device emulation can conflict with viewport overrides. It has now been turned off. Verify `innerWidth` after setting a viewport.
- Viewport override was reset at this pause. Reduced-motion emulation was reset and DevTools closed. Theme controls were left on System.
- The storage/no-JS checks used a temporary static harness serving actual production pages in sandboxed iframes. It has been deleted and the clean production output rebuilt. See validation for the exact coverage; no need to recreate it unless a theme fix warrants retesting.

## Essential best practices & deployment considerations

Beyond the current acceptance checklist, the following lightweight, zero-overhead best practices should be considered before final launch:

1. **Mobile browser chrome integration (`theme-color`)**:
   - Add dual `<meta name="theme-color">` tags in `BaseLayout.astro` targeting light (`#f7f5ef`) and dark (`#20231f`) with `media="(prefers-color-scheme: ...)"`. This ensures the mobile browser address and status bars match the page background seamlessly with zero runtime JavaScript.

2. **Favicon fallback and touch icons**:
   - Modern browsers parse `favicon.svg`, but desktop bookmark bars, legacy user agents, homescreen shortcuts, and RSS aggregators request `/favicon.ico` and `/apple-touch-icon.png` at root by convention. Supplying static fallbacks in `public/` avoids noisy 404 logs.

3. **Social card completeness**:
   - Add `<meta name="twitter:card" content="summary" />` in `BaseLayout.astro`. Twitter/X, Discord, Slack, and LinkedIn bots often require this property to reliably unfurl summary cards alongside Open Graph tags.
   - Prepare a simple, branded 1200×630 fallback image for `og:image` when visual brand assets are finalized.

4. **Production hosting headers (`public/_headers`)**:
   - For Cloudflare Pages, configure static caching and basic HTTP security headers via a static `public/_headers` file:
     - Long-term immutable caching for hashed assets (`/_astro/*`: `Cache-Control: public, max-age=31536000, immutable`).
     - Immediate revalidation for HTML pages (`/*`: `Cache-Control: public, max-age=0, must-revalidate`).
     - Standard baseline security: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`.

5. **Domain canonicalization**:
   - In Cloudflare DNS/Page Rules, establish a permanent 301 redirect from `www.xiaonan.co` to the apex `https://xiaonan.co` to prevent split indexing and preserve canonical authority.

6. **Print stylesheet**:
   - Add a minimal `@media print` block in `global.css` (hiding `.skip-link`, navigation, `.theme-control`, and `.site-footer`, while ensuring high-contrast monochrome text) to ensure clean "Print to PDF" exports for portfolios and articles.

7. **CI test validation**:
   - Cloudflare Pages runs `npm run build` on deployment (which runs `astro check`), but omits `npm test`. A minimal GitHub Actions workflow or pre-push hook running `npm test && npm run build` guarantees that publication filters and date logic are continuously verified.

## Useful files

- `src/data/site.ts`, `src/data/work.ts`, `src/data/projects.ts`
- `src/lib/writing.ts`, `tests/writing.test.ts`, `src/content.config.ts`
- `src/layouts/BaseLayout.astro`, `src/layouts/ArticleLayout.astro`
- `src/components/ThemeToggle.astro`, `src/styles/global.css`
- `src/content/writing/draft-demonstration.mdx`
- `README.md`, `docs/validation.md`

Only theme behavior ships browser JavaScript. System theme follows CSS media queries, including live changes, while explicit choices use a root data attribute and local storage. The control is hidden without JS. The head script applies an explicit preference before paint and catches storage failures.

Astro guides were consulted for routing, components, styling, content collections, TypeScript checks, and RSS. Cloudflare Astro/build-image documentation was consulted for the README deployment guide. No skills or subagents were required.
