# Resume xiaonan.co V1

The user requested a pause to restart Codex and enable Chrome computer use. Resume the existing V1 implementation; do not start over.

## Repository and scope

- Workspace: `/Users/shawnx/Developer/personal-branding/xiaonan.co`
- Current branch: `build-v1`; primary branch stays `master`.
- Initial starter baseline: `8d1b9f8` on master.
- Implementation commit: `91bf86c` (temporary verification articles were included there; this checkpoint removes them from the final tree).
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

See `docs/validation.md` for exact evidence and remaining checks. Six tests and the final checked production build pass. Temporary published/external/future entries were validated, removed, and the final site rebuilt. Production now contains only the six intended pages and an empty feed. The draft remains source-only in production.

Known warning: Vite/Rolldown warns about MDX's `use astro:head-inject` directive. Build and fixture output passed; do not hide the warning or upgrade dependencies without a reason.

## Immediate TODO after restart

1. Read `AGENTS.md`, this handoff, and `docs/validation.md`. Check Git status.
2. Connect to Chrome using the now-enabled browser tools. A local-site Chrome tab may already exist.
3. Inspect server status, starting only if needed:
   ```sh
   npm run astro -- dev status
   npm run dev -- --background
   npm run astro -- preview status
   npm run preview -- --host 127.0.0.1 --port 4322
   ```
   Previously dev was `http://localhost:4321` and production preview `http://127.0.0.1:4322`. The last sandbox status calls reported neither running; this may reflect sandbox process visibility, so verify in the appropriate permission context. Initial startup and localhost HTTP checks required escalation.
4. Reset Chrome device emulation. Native accessibility `setValue` on the Width stepper did not work; it left the width at 1px. This was a tool/input issue, not a measured responsive defect. Use the newly enabled browser control for reliable 360/768/1440 viewports.
5. Complete browser checks in `docs/validation.md`, including theme/storage/JS-disabled cases, keyboard/focus, responsive overflow, MDX rendering, and production navigation/404.
6. If needed, reintroduce disposable published/external/future fixtures for browser checks, then remove them and rebuild. Keep only `draft-demonstration.mdx` in the delivered content collection. Do not leave fixture files in the final tree.
7. Inspect and fix any visual/runtime issues. Compute contrast for the existing text/muted/accent colors in both palettes; verify code/table scrolling. Confirm article navigation activates Writing.
8. Re-run tests/build after fixes; update validation record honestly, commit logical changes on `build-v1`, and leave a clean worktree. No external deployment actions.
9. Deliver a concise final response with local review URL, README link, and validation/limitations.

## Useful files

- `src/data/site.ts`, `src/data/work.ts`, `src/data/projects.ts`
- `src/lib/writing.ts`, `tests/writing.test.ts`, `src/content.config.ts`
- `src/layouts/BaseLayout.astro`, `src/layouts/ArticleLayout.astro`
- `src/components/ThemeToggle.astro`, `src/styles/global.css`
- `src/content/writing/draft-demonstration.mdx`
- `README.md`, `docs/validation.md`

Only theme behavior ships browser JavaScript. System theme follows CSS media queries, including live changes, while explicit choices use a root data attribute and local storage. The control is hidden without JS. The head script applies an explicit preference before paint and catches storage failures.

Astro guides were consulted for routing, components, styling, content collections, TypeScript checks, and RSS. Cloudflare Astro/build-image documentation was consulted for the README deployment guide. No skills or subagents were required.
