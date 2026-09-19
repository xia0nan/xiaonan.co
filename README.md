# xiaonan.co

A static personal site for Xiao Nan / Shawn, built with Astro, TypeScript, Tailwind 4, MDX, and Content Collections. Work and Projects intentionally start empty. Writing includes a featured external Agoda Engineering article on Medium; the local MDX demonstration remains unpublished.

## Local development

Use **Node 24** (`.node-version`), then install the locked dependencies:

```sh
npm ci
npm run dev -- --background
```

Astro prints the local URL, normally `http://localhost:4321`. Manage that background process with:

```sh
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Other commands:

```sh
npm run check              # Astro and TypeScript diagnostics
npm test                   # Node's built-in publication tests
npm run build              # astro check && astro build
npm run preview            # serve dist, normally on port 4321
npm run astro -- preview status
npm run astro -- preview logs
npm run astro -- preview stop
```

If development already occupies port 4321, use `npm run preview -- --port 4322`. Preview serves production output: rebuild after editing. Generated files (`dist/`, `.astro/`) and dependencies are ignored by Git. The production URL is `https://xiaonan.co`, static output is explicit, and page links use trailing slashes.

## Editing the site

- `src/data/site.ts`: identity, positioning, navigation, interests, and profile links. Initially only the known GitHub profile is listed. Add other links only when ready.
- `src/data/work.ts`: professional work. Keep curated array order; set `featured: true` for homepage selection (up to three).
- `src/data/projects.ts`: independent projects and experiments, in curated order.
- `src/styles/global.css`: shared colors, typography, spacing, responsive rules, and article styles.
- `src/layouts/BaseLayout.astro`: shared shell, metadata, canonical URLs, and optional Person structured data.

Work and project entries require `id`, `title`, `summary`, `tags`, and `featured`. Both support an optional `url`. Work additionally supports `organization`, `role`, `period`, and `contribution`. Projects support `repository` and `demo`. IDs must be stable and unique within their array. Links should be valid destinations; omit absent links. There are no work or project detail routes in V1.

The theme control offers System, Light, and Dark. System follows the operating system through CSS, including changes while the page is open. Explicit preferences are applied before paint and saved in local storage. With blocked storage, the choice still applies for the current page. With JavaScript disabled, the site follows the system theme and hides the inactive control.

Browser theme-color hints follow the same choice where supported. The native appearance selector, navigation, and footer links have 44px-high targets on mobile. Printing uses a light, monochrome layout with navigation and footer hidden and article code/table content kept visible.

## Writing workflow

Create `.md` or `.mdx` files in `src/content/writing/`. For example, `systems/useful-models.mdx` becomes `/writing/systems/useful-models/`. Keep filenames and folders stable after publication because they define URLs; avoid a frontmatter `slug` override. Use lowercase, hyphenated names.

```yaml
---
title: A useful title
description: A short summary for listings, metadata, and RSS.
publishedAt: 2026-09-19
updatedAt: 2026-09-20 # optional
tags: [Applied AI, Systems]
featured: false
draft: true
---
```

`title`, `description`, and `publishedAt` are required. `tags` defaults to `[]`; `featured` and `draft` default to `false`. Use UTC ISO dates, or ISO timestamps with an explicit timezone. `updatedAt` is optional. The article layout supplies the single H1, description, dates, and tags, so start article body headings at `##`.

1. Start with `draft: true` and write the article.
2. Run the background development server. `/writing/` includes a clearly labeled local draft/scheduled preview section. Previews are marked `noindex`.
3. Review the article in both themes and at mobile widths. The supplied `draft-demonstration.mdx` shows lists, links, quotes, a table, code, and a static Astro callout.
4. Set the intended `publishedAt`, optionally `featured: true`, and change `draft` to `false`.
5. Run `npm test` and `npm run build`, then review the production preview.

Only non-draft entries whose publication date is at or before the build time appear in production. Shared helpers control homepage selections, the Writing index, local article routes, and RSS. Entries sort newest first, with the ID breaking ties. Future dates require a later build; this static site does not schedule deployments.

**Drafts are not private source files.** The production build excludes their pages and links, but source content remains visible if this repository is public. Do not commit confidential drafts.

MDX can import static `.astro` components without adding browser JavaScript. For a file directly in the writing folder:

```mdx
import Callout from '../../components/Callout.astro';

<Callout title="A note">
  <p>A small aside rendered as static HTML.</p>
</Callout>
```

Adjust relative imports for nested folders. Code blocks use GitHub light/dark Shiki themes. Tables and code blocks scroll within the article; Tab focuses them and arrow keys scroll horizontally. The Sätteri plugin in `astro.config.mjs` adds table focusability at build time. Supply descriptive alt text for images.

### External writing

Use a metadata-only Markdown entry with an HTTP(S) `externalUrl`:

```yaml
---
title: An article published elsewhere
description: A short summary of the original article.
publishedAt: 2026-09-19
tags: [Applied AI]
featured: true
draft: false
externalUrl: https://example.com/original-article
---
```

The Writing index, homepage selections, and summary RSS link directly to the original. An external-source label appears in lists. No local article route or sitemap entry is created. External entries obey the same draft/date rules and do not appear as local draft previews.

RSS lives at `/rss.xml`, including when there are no published articles. Sitemap output is `/sitemap-index.xml`; `/robots.txt` points to it. The custom `/404.html` is `noindex` and excluded from the sitemap. Home and About include Person JSON-LD using only the configured identity and profiles.

The shared layout declares a large-image social card using the static 1200 × 630 `public/social-card.png`, with absolute production URLs and image alt text. The editable SVG and export instructions are in [design/](design/README.md). Page titles and descriptions remain specific to each page. Actual platform unfurls still need checking after the image reaches production. `public/favicon.ico` (16/32/48px) and `public/apple-touch-icon.png` (180px) are static raster exports of the existing `public/favicon.svg` monogram; update all three together if the mark changes.

## Deployment: Cloudflare Pages

The repository uses `main` as its primary and production deployment branch, with `build-v1` retained as the V1 development branch. Production is live at [xiaonan.co](https://xiaonan.co/). Cloudflare Pages project `xiaonan-co` is connected to this repository with automatic deployments from `main`; [xiaonan-co.pages.dev](https://xiaonan-co.pages.dev/) remains available. The manual DNS/custom-domain migration is complete; see [the handoff](docs/HANDOFF.md) for verification and remaining work.

The owner has added the site to Google Search Console and enabled Cloudflare Web Analytics. The branded fallback social image and metadata were merged in PR #1; production delivery and real unfurls are the follow-up checks. A short Safari/Lighthouse/legacy-URL review follows. See the [current launch checklist](docs/HANDOFF.md#reviewed-launch-checklist--current); sitemap submission and analytics data arrival remain follow-up confirmations, not new setup tasks.

The current Pages project uses these settings:

| Setting | Value |
| --- | --- |
| Repository | `xia0nan/xiaonan.co` |
| Production branch | `main` |
| Root directory | Repository root (leave blank) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `24`, supplied by the root `.node-version` |

Use the current Pages build image supporting the `.node-version` override. If configuring `NODE_VERSION` explicitly, keep it aligned with `24`. No adapter, server, database, or runtime secrets are needed for this static output.

These settings follow the [Cloudflare Astro deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) and [Cloudflare build environment configuration](https://developers.cloudflare.com/pages/configuration/build-image/).

Cloudflare is authoritative for `xiaonan.co`, and the apex Pages custom domain is active. HTTPS `www` redirects preserve the path and query string; Pages then normalizes trailing slashes. DNS, redirects, and custom domains are managed separately from this repository.

Continue checking hosted headers and redirects after relevant deployment changes. No repository `_headers` or redirects have been added; the Pages project is configured in Cloudflare’s dashboard. Avoid overlapping broad revalidation and immutable asset rules: Pages combines matching header rules. Local Astro preview does not verify Cloudflare headers or redirects.

Wrangler is not a project dependency: development, tests, and builds use Astro, and Pages deploys through Git integration. Read-only account diagnostics can use separately managed Wrangler tooling; this site does not need its Worker/emulator dependencies.

`.github/workflows/ci.yml` runs Node 24 validation for manual dispatch, pushes to `main`/`build-v1`, and pull requests to `main`, running `npm ci`, `npm test`, and `npm run build`. GitHub runs this workflow when matching branches are pushed or pull requests are opened; inspect the latest Actions result before deployment. To make tests a release gate later, configure required checks or include `npm test` in the Pages build command. A workflow alone does not block an independent deployment.

## Scope and validation

V1 is English-only. Search, tag archives, article tables of contents, reading time, résumé downloads, newsletters, comments, and interactive demos are deferred.

See [the validation record](docs/validation.md) for completed checks and any review limitations. Astro reference guides: [content collections](https://docs.astro.build/en/guides/content-collections/), [RSS](https://docs.astro.build/en/recipes/rss/), and [type checking](https://docs.astro.build/en/guides/typescript/#type-checking).
