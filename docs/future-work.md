# xiaonan.co V1.1 — professional identity and evidence

Updated 2026-09-20 after approved publication of `ab6eff2`, using the owner brief and production verification. This is the current future-work roadmap; [HANDOFF.md](HANDOFF.md) covers operations and [validation.md](validation.md) records evidence. This document plans work; it does not authorize changes to accounts or infrastructure.

## Current owner decisions and todo

- Audience: peers and collaborators. Preserve the minimal hero, name, and “Applied AI · ML Systems · Product” positioning from `bd54762`; express the current focus through About, Current interests, and metadata.
- Confirmed publishable focus: applied AI and agentic workflows, particularly reliability and scalability; professional domains remain technology and finance. No employer, tenure, role, contribution, or impact claim was supplied.
- Confirmed public profiles: [LinkedIn](https://www.linkedin.com/in/xiao-nan/) and [Medium](https://medium.com/@xiao.nan), alongside the existing GitHub profile. Shared configuration supplies Footer, About, and Person metadata.
- **Owner deferred the contribution brief on 2026-09-20.** Work and Projects remain empty for this release. This supersedes the original requirement to publish a Work entry now; the broader V1.1 milestone remains open.
- [ ] Owner: write one publishable contribution brief covering problem/users, constraints, personal role, approach, evaluation, outcome, lesson, and any public link. Unknown details may be omitted; do not put confidential material in repository documentation.
- [ ] After that brief: draft one concise featured entry with the existing Work model, review its Home/Work presentation, and obtain owner copy review before publication.
- [x] Owner approved the About/interests copy and publication; PR #2 merged as `ab6eff2`, with passing CI/deployment and production verification on 2026-09-20.
- [ ] Finish any account/device/platform checks marked pending in [validation.md](validation.md).

## Decision

The plan's direction is sound: preserve the static Astro architecture and understated editorial design, finish a bounded launch review, and put the next meaningful effort into specific positioning and demonstrated work. Keep Work, Writing, Projects, and About. No redesign or new application platform is needed.

The platform is sufficient for V1.1, rather than permanently maintenance-free. Continue ordinary dependency/security maintenance and fix demonstrated defects. Do not invent technical milestones to postpone publishing useful material.

## What the proposed plan gets right, and what changes

| Proposal or observation | Assessment and decision |
| --- | --- |
| Writing is empty; add the Agoda article | Outdated. Commit `91ad90d` already features the owner's article on Home and Writing and in RSS, linking directly to Medium with the original 2022-10-12 date. Do not add a duplicate or copy the full article. |
| Social card PR is merged | Correct. PR #1 merged as `bd39bff`; production `/social-card.png` was verified during the article publication. LinkedIn preview image/title were verified before PR #2; the new description needs a post-release recheck. WhatsApp remains unverified. |
| Search Console and analytics are set up | Verified during the launch review: sitemap success, indexed Home/About and passing live tests, analytics dashboard data, and browser beacon delivery. |
| A crawler still sees the old Minimal Mistakes homepage | Treat as an external observation, not a diagnosed production defect. The preceding direct production audit saw the Astro site. The web retrieval tool could not access the site during this review; that does not establish stale live content. Inspect Google's last crawl versus its live test before changing anything. |
| Sharpen homepage/About copy | Highest-value content work now. Preserve “Applied AI · ML Systems · Product”; support it with specific, verified experience and current interests. |
| “A decade of ML/AI”, Stripe/Agoda/OCBC, named projects and outcomes | Examples from the proposal, not a verified career record. Confirm employment, dates, personal contribution, outcomes, and what can be published before using them. Article authorship does not establish ownership of every application it describes. |
| About should be 500–700 words | Optional editorial range, not an acceptance requirement. A shorter, specific narrative can be stronger. A real photo is useful if the owner wants one and supplies an appropriate image; it is not a launch blocker. |
| Add GitHub, LinkedIn, Medium, RSS | GitHub/RSS and owner-confirmed LinkedIn/Medium profiles are live. The same profile configuration supplies Footer, About, and Person metadata. |
| Publish three Work entries | Good eventual direction, too large as the first gate. V1.1 requires one strong, owner-approved entry; expand only when more evidence is ready. |
| Populate Work before Projects | Agree. Keep Projects empty until a real, selected build is ready. Agent/evaluation/copilot examples are ideas, not existing projects or commitments. |
| Three writing pillars | Good editorial guide: applied AI/agents; ML systems/experimentation; building AI products. Treat them as flexible themes, not quotas or new tag-page requirements. |
| Separate xiaonan.co and nanx.cc | Useful proposed boundary: curated professional work here, exploratory notebook material there. Confirm the owner's intended use of nanx.cc; this roadmap does not change or migrate that site. |
| Defer legacy URL review | Keep a short inventory in the launch pass because meaningful old inbound links may already exist. Defer speculative redirect engineering, not discovery of broken valuable links. |
| Optional security/workflow features | Backlog, not prerequisites for content. Code/layout/dependency changes use branch + PR; the preview/CI path has already been exercised by PR #1. |

## Priority 1 — evidence and copy brief

The next content session should gather a small source brief, then draft homepage and About copy alongside the first Work entry. This can proceed while dashboard data or real-device checks are pending.

Inputs needed from the owner:

- Audience is confirmed as peers and collaborators; invite connection through confirmed profiles.
- Current professional description and interests; confirmed roles, employers, dates, and which details may appear publicly. Do not assume the example career narrative is accurate.
- One representative piece of work: problem, users, constraints, personal role, approach, evaluation, outcome, lesson, and any public supporting links. Metrics are optional; verified qualitative outcomes are useful.
- Exact LinkedIn and Medium profile URLs, and whether they should appear in the shared footer/About and Person structured data.
- Optional portrait and personal details the owner actually wants to share. Do not infer hobbies or generate a substitute identity photo.

Copy outcomes:

1. **Homepage:** preserve the minimal hero and existing positioning line. Refine Current interests using the owner brief; add an experience signal through Selected work only after the deferred contribution is supplied. Use direct first-person language tied to facts; avoid unsupported seniority, employer, tenure, or impact claims. Point visitors toward Work, Writing, and About through the existing navigation and sections.
2. **About:** explain what the owner does, how their interests developed, what matters now, and how they work. Add outside-work details only when supplied. Prefer a readable narrative over a chronological résumé or a word-count target.
3. **Work:** publish one concise account of a real contribution. Use problem → constraints → approach → personal contribution → evaluation/outcome → lesson as an editing checklist, not necessarily seven displayed headings. Distinguish team results from individual contribution and keep non-public details out.
4. **Elsewhere:** add only confirmed profile links and check their destinations. Keep RSS a subscription link. Avoid expanding navigation just to accommodate more social links.

Start with the existing Work data/card model (`src/data/work.ts`, `src/components/WorkCard.astro`), which already has summary, contribution, role, organization, period, tags, and an optional URL. A concise entry can fit this model. Do not build case-study detail routes or a CMS before the material demonstrates a need.

## Priority 2 — one bounded launch review

Budget one short owner session plus targeted fixes. Stop once actual problems are resolved; crawler refresh delays and small Lighthouse score variations are not reasons to extend the work indefinitely.

| Check | Action | Completion evidence |
| --- | --- | --- |
| Search Console | Confirm `https://xiaonan.co/sitemap-index.xml` is submitted/readable. Inspect Home and About; compare indexed and live results. Request indexing if missing/outdated and appropriate. | Record sitemap result, inspection date/status, and any request made. Index inclusion is an external outcome, not a guaranteed launch condition. |
| Analytics | Confirm real page-view data appears in Cloudflare Web Analytics. Browser script delivery and beacon HTTP 204 are verified; the earlier curl absence did not reproduce in Chrome. | Record an observed data point/dashboard result; do not add a second tracker. |
| Social unfurls | Owner previews `https://xiaonan.co/` in LinkedIn and WhatsApp; Slack/Telegram only if used. Check title, description, image, crop. | Platform results noted; no public post or message is required merely to prepare/review a preview. Automated checks must not send messages to others. |
| Browsers | Short Mac Safari/iPhone Safari check, including dark/system mode, navigation/back, fonts, tap targets, and overflow. | Device/browser and observed result recorded. Use the local draft for code/table checks; the published Medium entry is external. |
| Lighthouse/PageSpeed | Check Home and About once, with mobile performance included. Fix demonstrated accessibility, layout-shift, asset-size, or SEO problems. | Save findings and meaningful fixes; do not require a perfect score. Recheck affected behavior after fixes. |
| Old URLs | Inventory old repository paths, known inbound links, and Search Console findings. Test meaningful URLs and prepare any replacement mapping. | Either no meaningful broken legacy URLs found, or a specific mapping/issue list. Infrastructure redirect changes remain separately scoped. |

Google distinguishes indexed data from a live inspection, and a request or sitemap does not guarantee indexing. Do not repeatedly request indexing just because another crawler has cached an older page. See [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en) and [Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en).

For moved content, map an old URL to a genuinely relevant replacement. Removed content without a replacement can remain 404/410; avoid blanket Home redirects. See [Google migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## V1.1 completion checklist

- [x] Agoda Medium article featured on Home/Writing and included in RSS.
- [x] Branded social card merged and production image delivery verified.
- [x] Search Console sitemap success (5 pages) and indexed Home/About results recorded. Home live test passed; About live test status is recorded in validation.
- [x] Cloudflare analytics data arrival confirmed in Web Analytics, with browser beacon delivery verified.
- [ ] Social previews checked on the owner's main sharing platforms.
- [ ] Short Safari/iPhone and Home/About Lighthouse review completed; significant defects fixed.
- [x] Repository/live-sitemap legacy inventory recorded; optional feed mapping and owner-known inbound URL follow-up remain explicit.
- [x] Exact LinkedIn/Medium profile links supplied and added to shared configuration; destination-check limits are recorded in validation.
- [x] Homepage interests and About publish the owner-approved current focus and professional domains. Specific contribution evidence remains deferred.
- [ ] One evidence-backed Work entry published and surfaced appropriately on Home — owner deferred; see contribution todo above.

Projects, a portrait, three case studies, a résumé PDF, and actual Google index inclusion are not mandatory for this milestone. Once the checklist is addressed, prioritize publishing and distributing substantive work rather than extending the website itself.

## Editorial direction after V1.1

| Theme | Suitable material |
| --- | --- |
| Applied AI and agents | Evaluation, tool use, memory, reliability, retrieval, and human oversight grounded in real experiments or work. |
| ML systems and experimentation | Production tradeoffs, observability, measurement, causal reasoning, and lessons from evaluating systems. |
| Building AI products | Problem selection, AI UX, model versus product choices, and what changed between a prototype and use in practice. |

Use firsthand detail and clear reasoning. There is no required publishing cadence or quota. Future original articles can use xiaonan.co as their primary home; existing external writing remains linked unless the owner explicitly chooses to republish it.

Select Projects by evidence and relevance: what it does, who it helps, what the owner built, and a usable demo/repository or concrete explanation. Two to four strong projects is a possible eventual shape, not a requirement to invent or rush projects.

If the dual-site boundary is adopted, xiaonan.co holds curated professional work and writing; nanx.cc can hold experiments, reference notes, and learning logs. Selection should reflect usefulness and audience rather than a blanket ban on personal subjects. Avoid maintaining duplicate articles on both sites without a deliberate primary source.

## Deferred technical work and constraints

- Optional: block force pushes/deletion on `main`; consider required CI/PR rules with a deliberate policy for small direct content edits. Do not claim CI currently gates independent Pages deployment.
- Optional: DNSSEC assessment, professional email, and old-repository archival. No DNS, nameserver, redirect-rule, custom-domain, or account-security changes are authorized by this roadmap.
- Later, when useful: a stable résumé URL with an approved PDF; article-specific social images; Pagefind, tag pages, or archives when real content volume/discovery needs justify them.
- Keep the custom 404 and existing design. No CMS, database, Workers, SSR/Cloudflare Astro adapter, React migration, comments, newsletter platform, chatbot, authentication, or animation framework is part of V1.1.
- Follow `AGENTS.md` and the applicable Astro documentation before implementation. Use branch + PR for code/layout/dependency changes; content/docs may use `main` when authorized and permitted by repository rules. Validate meaningful changes and keep the handoff current.

Current implementation updates About, interests, shared profiles, and the mobile footer. No Work claims or infrastructure changes are included. Approved copy is published; release evidence is tracked in the handoff and validation record.
