# Slick.ge SEO audit and implementation plan

This document preserves the pre-implementation audit. See [implementation status](../seo-implementation.md) for subsequent local changes and remaining external tasks. XML and JSON-LD examples in this directory are historical proposals; the application's generated seven-page sitemap and per-page markup supersede them.

Audit date: **29 September 2026**. Live HTTP, browser, resource and lab checks were collected around **12:15–12:22 UTC**. This is an audit and proposed implementation package; production code, DNS, accounts and deployed content were not changed.

Owner input: prioritize **international clients in English**. “Both” is interpreted as **scoped implementation projects and ongoing support**. Availability, hours, response commitments, pricing and detailed engagement terms are **undecided and deferred at the owner’s request**. Omit them from public copy and structured data; they do not block the remaining work.

Evidence: [crawl, headers, resource checks, browser checks and Lighthouse results](evidence.json). Ready-to-use proposals: [sitemap.xml](sitemap.xml), [robots.txt](robots.txt), [homepage JSON-LD](homepage.jsonld), [About JSON-LD](about.jsonld), [future CI/CD page JSON-LD](ci-cd-service.jsonld). These files are examples in this audit directory, not published assets.

## A. Executive Summary

**Slick has a sound technical foundation and an underdeveloped commercial search presence.** The two substantive pages load successfully, contain server-generated HTML, use correct canonical URLs, and work on mobile. Both achieved 100 performance scores in the local mobile Lighthouse runs. The largest opportunities are clearer service positioning, useful service-specific explanations, credible evidence, and lead measurement—not a performance rebuild or a large volume of articles.

There is one urgent access defect: **HTTPS requests to www.slick.ge fail certificate validation**. Non-www HTTPS works. This blocks visitors and crawlers using that hostname before its redirect can run; it does not mean the main site is inaccessible.

Other concrete issues: the About page’s hreflang points to the homepage; its Secret Santa project link returns 404; `/404.html` itself returns 200 without noindex; no sitemap was found at the standard locations checked. The generic hero and several headings make visitors work harder to identify the service. The About page prioritizes CV download over hiring and repeats a very long tool inventory before credentials and projects.

Recommended order:

1. Repair www TLS and confirm canonical redirects.
2. Establish Search Console and inquiry baselines; fix incorrect annotations and broken proof links.
3. Make English-language, remote international consulting and the two engagement options explicit.
4. Publish a substantive CI/CD page and a code/secrets-security page, each with actual scope, deliverables, boundaries and evidence.
5. Add a permission-cleared work example, then expand only where owner expertise and buyer demand justify it.

**Measured versus unknown:** raw HTTP status, HTML, link targets, resource sizes, browser behavior and lab performance were measured. Actual Google/Bing index membership, rankings, keyword volumes, numeric keyword difficulty, backlink totals, Search Console metrics, analytics, leads and field Core Web Vitals are **unavailable**. No rankings or traffic gains are promised. Search samples are directional research, not a geo-controlled Google rank report.

## B. Current Website Inventory

### Verified identity and offer

| Question | Finding and evidence category |
|---|---|
| Business type | **Website fact:** independent personal consultancy under the name Slick; Aleksandre Ghvineria is the named practitioner. Not presented as a multi-person agency. |
| Services | **Website fact:** workflow automation; CI/CD and delivery; code and secrets security; cloud and infrastructure. |
| Audience | **Website fact:** small software teams. **Recommendation/inference:** address founders, engineering leads and CTOs buying hands-on help. |
| Value proposition | **Website fact:** less repetitive work, simpler infrastructure, dependable releases, direct collaboration and documented handover. |
| Geography | **Website fact:** .ge domain, Georgian employment/education references and +995 contact number. No explicit service area or physical business address. **Owner instruction:** international clients. Do not invent a Tbilisi office. |
| Languages | **Website fact:** English content and `lang="en"`; no Georgian version found. `/ka/` returns 404. |
| Calls to action | Mailto links, service/contact anchors, About page, CV download, phone, GitHub, LinkedIn and certification verification. No on-site lead form found. |
| Trust | Site claims include LPIC-1/LPIC-2, a degree, work at EPAM, Liberty Bank and the High Council of Justice. These are site-published claims, not independently verified employment or client endorsements. |
| Technology | Live `_astro` assets and static HTML; local package declares Astro `^7.3.4`, static output. GitHub Pages confirmed by headers and deployment documentation; Fastly/Varnish edge headers present. |

The existing website already contains specific work examples and named employment history. Preserve and deepen those; do not describe the site as having no proof. The “7+ years in production infrastructure” statement warrants owner review: the homepage’s displayed role timeline begins in 2021. Earlier work exists on the linked CV, but whether it supports that exact wording requires confirmation.

### Public URLs discovered or tested

Paths below are on `https://slick.ge` unless another origin is shown. “Eligible” means technically indexable in the audit; it does not prove indexing.

| URL | Observed behavior | Indexability / intended treatment |
|---|---|---|
| `/en/` | 200; self-canonical | Eligible; primary commercial homepage |
| `/en/about/` | 200; self-canonical | Eligible; personal profile/trust page |
| `/` | 200; immediate meta refresh to `/en/`; noindex; canonical `/en/` | Redirect document; exclude from sitemap |
| `/index.html` | Same redirect document, 200 | Same treatment as root |
| `/en` | 301 → `/en/` → 200 | Correct slash normalization |
| `/en/about` | 301 → `/en/about/` → 200 | Correct slash normalization |
| `/en/index.html` | 200 duplicate; canonical `/en/` | Consolidated duplicate; do not link or list in sitemap |
| `/en/about/index.html` | 200 duplicate; canonical `/en/about/` | Consolidated duplicate; do not link or list in sitemap |
| `/en/?utm_source=seo-audit` | 200; canonical without query | Correct for tested tracking parameter |
| `/en/about/?ref=audit` | 200; canonical without query | Correct for tested parameter |
| `/robots.txt` | 200 text file | Crawl-control resource, not a content landing page |
| `/sitemap.xml` | 404 | Proposed sitemap location |
| `/sitemap-index.xml` | 404 | No sitemap found |
| `/sitemap_index.xml` | 404 | No sitemap found |
| `/about`, `/about/` | 404 | Not current routes; not linked internally |
| `/ka/` | 404 | No Georgian homepage discovered |
| `/404.html` | 200 error document; self-canonical; no noindex | Unwanted index-eligible utility URL; may be classified as soft 404 |
| `/seo-audit-nonexistent-20260929/` | Genuine 404 | Correct missing-page behavior |
| `http://slick.ge/` | 301 → HTTPS root, then HTML redirect | Works; HTTP and HTML stages are distinct |
| `http://slick.ge/en/about/` | 301 → HTTPS equivalent → 200 | Correct |
| `http://www.slick.ge/` | 301 → `https://slick.ge/` | HTTP www redirect works |
| `https://www.slick.ge/` | TLS hostname mismatch | Blocked before normal HTTP navigation |
| `https://www.slick.ge/en/about/` | TLS hostname mismatch | Same access defect |
| `/favicon.svg` | 200 | Working SVG site identity asset |
| `/aleksandre-ghvineria.jpeg` | 200, 400×400, 12,351 bytes | Portrait asset |
| `/_astro/BaseLayout.CuKE-N7r.css` | 200, gzip | Crawlable stylesheet |
| Two `/_astro/*.woff2` URLs | 200 | Crawlable self-hosted fonts; exact URLs in evidence |

No additional substantive pages were found through internal links, source route inspection and sampled search discovery. The local route inventory corroborates the live two-page structure. Unknown historical or unlinked URLs cannot be exhaustively ruled out without Search Console and historical access data. Neither content page is orphaned; no broken internal page links or fragment links were detected.

The external CV site at `https://cv.ghvineria.com/en/` and its linked PDF returned 200. They are separate-site resources, not extra slick.ge content pages.

## C. Critical Problems

### P0: www HTTPS certificate mismatch

Both sampled HTTPS www URLs fail hostname verification. The certificate presented for www has GitHub wildcard names, not `www.slick.ge`. DNS currently resolves `www` through a CNAME to `slick.ge`. A diagnostic request with verification disabled showed a 301 behind the TLS failure; that does **not** make normal navigation valid.

**Change:** align the www DNS and GitHub Pages custom-domain setup, provision a certificate covering www, and preserve the non-www canonical host. The repository’s hosting notes specify `www CNAME slick-ge.github.io`; confirm that this is still the Pages account before changing DNS. Follow GitHub’s custom-domain procedure, wait for certificate provisioning, and verify HTTPS enforcement. Preserve mail and unrelated DNS records.

**Why:** affected users and crawlers cannot reach the redirect securely. **Verify:** normal `curl` without `-k` and a clean browser must reach `/en/` or the same inner path on the apex, with valid TLS and no loop. [GitHub custom-domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### Other confirmed defects, with proportionate severity

- **P2 — Incorrect hreflang on About:** both `en` and `x-default` refer to `/en/`, not an equivalent About page. Remove the unnecessary annotations while English is the only language. Verify absence in generated and live head HTML.
- **P1 — Broken portfolio evidence:** `https://github.com/slick-ge/secret-santa-backend` returns 404 to an anonymous visitor. Correct the public destination or remove the link and explain the project on-page. A private repository is also unavailable to prospects. Verify anonymously.
- **P2 — Public error-file indexability:** add noindex to the 404 template; preserve genuine 404 status for missing routes. Do not block it in robots. Verify both `/404.html` and a random missing path.
- **P1 — Incomplete buying information:** the live content does not state remote international coverage, scoped versus ongoing engagement, support boundaries or what an inquiry should include. Add the confirmed coverage and engagement options. Omit undecided support boundaries and commercial promises; their absence is not a launch blocker.

No evidence of a sitewide robots block, noindex on the two content pages, broken core rendering, or a Core Web Vitals field failure was found. Missing schema, missing sitemap and generic headings are not critical crawl blockers.

## D. Keyword & Search Intent Map

### Research method and limits

Searches sampled English commercial topics including DevOps consulting for small teams, CI/CD consulting, GitHub Actions consulting, GitHub Advanced Security consulting, Terraform consulting, workflow automation/API integrations, and DevOps consulting in Tbilisi/Georgia. Georgian samples included `DevOps კონსულტაცია`, `DevOps კონსულტაცია საქართველოში`, `დევოპს მომსახურება`, `CI/CD ავტომატიზაცია მომსახურება საქართველო`, and `პროცესების ავტომატიზაცია`.

**Search volumes and numeric competition scores are unavailable.** The competition descriptions below are qualitative judgments based on the kinds of suppliers and vendor pages returned, not tool-derived difficulty metrics or claims about exact Google positions.

| Category and topic | Intent | Target and why | Priority / competition inference | New page? |
|---|---|---|---|---|
| Primary: independent DevOps consultant; DevOps consulting for small software teams | Hire a hands-on practitioner | `/en/`: overall offer, audience and engagement model | P1; substantial international agency/consultant competition | No |
| Primary: CI/CD consulting; CI/CD pipeline automation services | Fix or implement delivery | `/en/services/ci-cd/`: specific buying problem and demonstrable work history | P1; strong commercial competition | Yes |
| Secondary: GitHub Actions consultant; deployment automation; rollback pipeline help | Tool/problem-specific implementation | Sections of CI/CD page; avoid fragmenting one offer into thin tool pages | P1; specialist service pages compete | No separate tool page yet |
| Primary: code and secrets security consulting; GitHub Advanced Security implementation | Integrate security into development | `/en/services/code-secrets-security/`: matches visible GHAS/CodeQL experience | P1; vendor services and partners compete | Yes |
| Secondary/long-tail: CodeQL setup help; secret scanning rollout; dependency checks in CI/CD | Narrow implementation help | Security page with boundaries and examples | P1; narrower intent, difficulty unquantified | No separate pages yet |
| Primary: workflow automation consultant for software teams | Remove repetitive engineering/operations work | `/en/services/workflow-automation/`: reporting/integrations context distinguishes from marketing automation | P2; mixed SaaS, CRM and consultancy intent | Yes, after a useful example is ready |
| Secondary: API integration automation; recurring report automation | Defined workflow problem | Automation page and reporting work example | P2; query fit more important than breadth | Shared page |
| Primary: infrastructure as code consulting; Terraform consulting | Make infrastructure reproducible | `/en/services/cloud-infrastructure/`: architecture, implementation and handover | P2; established specialists compete | Yes, once scope is documented |
| Secondary: Ansible automation consultant; cloud infrastructure review | Operational implementation | Infrastructure page; do not imply every cloud has equal expertise | P2; unquantified | Shared page |
| Informational: CI/CD handover checklist; deployment pipeline documentation checklist | Learn and assess readiness | `/en/guides/ci-cd-handover-checklist/`: reusable practitioner resource that leads naturally to delivery work | P2; mixed documentation/tutorial competition | One original guide |
| Proof-seeking: reporting automation example; workflow automation case study | Evaluate ability | `/en/work/reporting-automation/`: show the actual project and tradeoffs | P1; not primarily volume-led | One evidence-based work page |
| Branded: Slick DevOps; slick.ge; Aleksandre Ghvineria DevOps | Find business/person | Homepage for Slick; About for person | P1 hygiene; “Slick” alone is ambiguous | No |
| Local: DevOps consultant Georgia; DevOps consulting Tbilisi | Find nearby supplier | Defer dedicated targeting; add truthful base/coverage only if owner confirms | P3 for international strategy; local suppliers present | No location pages |
| Georgian commercial: `DevOps კონსულტაცია`; `CI/CD ავტომატიზაცია`; `ინფრასტრუქტურის ავტომატიზაცია` | Potentially hire, but mixed learning intent | Research backlog; English pages remain priority | P3; volume and difficulty unavailable | No current recommendation |
| Georgian broad: `პროცესების ავტომატიზაცია` | Business process/CRM/software solutions | Too broad to make a primary target for this engineering offer | Defer | No |

Avoid targeting “DevOps jobs,” “DevOps course,” generic cybersecurity, penetration testing, software development, AI agency or 24/7 managed operations unless those become confirmed offers. A tool appearing in the toolkit is not evidence that Slick sells every service associated with it.

### Search-result and competitor findings

These are pages returned in the sampled searches. They are not a verified ordered top ten.

| Observed page | Content, trust and structure observed | Practical lesson for Slick |
|---|---|---|
| [KartvelOps](https://kops.ge/) | Local consultancy homepage, explicit Tbilisi coverage, scope/process/operating model, service anchors; ProfessionalService JSON-LD | Explain coverage and responsibility clearly. Its local positioning is not Slick’s chosen primary market. |
| [INNOVATE cloud/DevOps](https://innovate.ge/services/cloud-devops) | Dedicated service page, buyer problems, delivery capabilities, engagement process, case-study and related-service links; organization/business JSON-LD | Give each major service substantive buying information and relevant evidence. Competitor claims are self-published, not audited here. |
| [Strataform](https://www.strataform.uk/) | Small-team positioning, defined engagement options, handover terms, contact routes and FAQs; links to pricing/services/work | Scope and next-step clarity matter. Its sampled JSON-LD contains references to another hostname, illustrating why competitors’ markup should not be copied. |
| [MeteorOps GitHub Actions](https://meteorops.com/technologies/github-actions) | Specific consulting landing page, delivery process, detailed implementation topics, case-study links, testimonials and contact; Service and BreadcrumbList markup | Answer “what will you do in my stack?” and link proof. Do not reproduce its large tool-page catalogue without distinct content. |
| [PineWise CI/CD](https://www.pinewise.com/cicd-consultants) | CI/CD-specific page, small-team fit, pain points, tooling and contact route; no JSON-LD found in sampled raw HTML | A clear service page can satisfy intent without elaborate schema. |
| [GitHub security advisory](https://github.com/services/ghas-security-advisory-services) | Vendor page specifies audience, assessment, deliverables, schedule/scoping and prerequisites | Security buyers need concrete boundaries and rollout outcomes. Slick should present independent implementation help without implying GitHub partner status. |
| [Lnx IT Services](https://lnx.ge/) | Georgian-language search presentation with Linux/DevOps service and local/remote scope; raw HTML includes WebSite/WebPage/business markup | Georgian commercial pages exist, but this does not establish search volume or justify translating now. |

The recurring gap is **specific delivery information**, not simply word count. Broad automation searches also returned workflow tools and CRM-oriented vendors; keep Slick’s software-team context visible. Terraform searches returned dedicated implementation pages such as [InfraZen](https://infrazen.io/terraform-consulting), supporting a future focused infrastructure page rather than a generic technology list.

## E. Page-by-Page Audit

### 1. Homepage — https://slick.ge/en/

**Purpose:** win qualified inquiries for independent DevOps and automation consulting. **Intent:** commercial investigation/hiring. **Primary topic:** DevOps consulting for small software teams. **Secondary:** CI/CD, workflow automation, code/secrets security, infrastructure as code, scoped projects and ongoing support.

| Element | Existing | Exact recommendation |
|---|---|---|
| Title | `Slick - DevOps & automation for small software teams` | `DevOps Consulting for Small Software Teams \| Slick` |
| Description | `I help small software teams automate workflows, improve CI/CD, strengthen code security, and simplify infrastructure.` | `Work directly with Aleksandre Ghvineria to automate workflows, improve CI/CD, secure code and secrets, and simplify cloud infrastructure.` |
| H1 | `Less manual work. More forward motion.` | `DevOps and automation for small software teams` |
| Canonical | `https://slick.ge/en/` | Keep unchanged |
| Robots | No meta robots or X-Robots-Tag restriction detected | Keep default indexability; explicit `index,follow` is unnecessary |

The current title and description are relevant and unique; they are not broken. The proposed title explicitly identifies a service purchase. Keep the current slogan as supporting copy rather than the sole main heading. Google may generate different title links/snippets; there is no mandatory 60/160-character rule. [Title guidance](https://developers.google.com/search/docs/appearance/title-link), [snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

**Suggested hero copy, based on current services and owner input:**

> Work directly with Aleksandre Ghvineria to automate recurring work, improve CI/CD, bring code and secrets checks into your workflow, and simplify infrastructure. I work remotely with international software teams on scoped implementation projects and ongoing support.

Primary CTA: **“Discuss your DevOps project”** → existing mailto initially, then the proposed contact page. Secondary CTA: **“Explore services”** → `#services`. Immediately beneath: “Tell me about your stack, the problem, and whether you need a defined project or ongoing help.” Do not add response-time or free-assessment promises without confirmation.

**Recommended heading/content order:**

- H2 `DevOps services` → H3 `Workflow automation`, `CI/CD and delivery`, `Code and secrets security`, `Cloud and infrastructure`. Keep existing outcome phrases as supporting sentences. Each card should state a typical problem, actual work performed, tangible deliverables and a link to its detailed page when live.
- H2 `Scoped projects and ongoing support` → H3 `A defined implementation project`; H3 `Ongoing engineering support`. Use the confirmed engagement types without defining undecided terms. Suggested copy: “Discuss a defined implementation project or ongoing engineering support. Tell me about your current setup and what you want to improve.” Omit fees, response windows, availability and fixed deliverable packages.
- H2 `How we work together` → preserve the useful Understand / Plan / Build / Handover sequence. Add examples of handover artifacts only if actually provided.
- H2 `Relevant engineering experience` → preserve the named roles, clearly labeled employment experience. Do not convert employers into Slick clients or endorsements.
- H2 `About Aleksandre Ghvineria` → short profile and descriptive About link.
- H2 `Tools selected for your system` → retain a concise selection; move the exhaustive list to expandable groups or the profile after proof. Do not turn every tool into a keyword page.
- H2 `Discuss your setup` → email, project prompt and engagement next step.

**Current content weakness:** a visitor encounters a large tool catalogue while important buying details remain unanswered. Replace some catalogue prominence with service deliverables and a real work example. The existing proof paragraphs are valuable; expand the strongest into an approved work page.

**Internal links:** each service card to its new page; experience section to `/en/work/reporting-automation/` when published; named profile link to `/en/about/`; contact link in header/footer. Before pages exist, preserve working anchors rather than creating 404 links.

**Images:** the tiny hero portrait duplicates the adjacent name, so empty alt is appropriate. The About-card portrait can retain `alt="Aleksandre Ghvineria"`. Decorative technology icons should keep empty alt because visible labels name the tools. Keep dimensions and below-fold lazy loading. Responsive portrait variants are optional, not urgent.

**Schema:** use the homepage graph in section G after changing the visible title. **Verification:** inspect raw HTML; confirm one clear H1, matching OG data, every service link working, and analytics event delivery. Compare relevant non-branded landing-page impressions, CTR and qualified inquiries over comparable periods.

### 2. About — https://slick.ge/en/about/

**Purpose:** establish the named practitioner’s credibility and help prospects decide to contact him. **Intent:** branded/person research and supplier validation. **Primary topic:** Aleksandre Ghvineria, independent DevOps consultant. **Secondary:** production experience, credentials, public projects and technical approach.

| Element | Existing | Exact recommendation |
|---|---|---|
| Title | `Aleksandre Ghvineria — About me` | `Aleksandre Ghvineria, DevOps Consultant \| Slick` |
| Description | `Independent DevOps and automation consultant working under the name Slick.` | `Meet Aleksandre Ghvineria, the independent DevOps consultant behind Slick. Explore his production experience, technical background, and selected projects.` |
| H1 | `Aleksandre Ghvineria` | Keep unchanged |
| Role line | `DevOps Practitioner` | `Independent DevOps and automation consultant` |
| Canonical | `https://slick.ge/en/about/` | Keep unchanged |
| Hreflang | `en` and `x-default` both link to homepage | Remove while English-only |

**Recommended headings/order:** H2 `My background in production systems`; H3s for the three already stated roles with approved dates/responsibilities; H2 `How I work with software teams`; H2 `Education and certifications`; H2 `Selected projects`; H3 `Reporting automation` when documented, `Golang Tools`, `HomeLAB`, and Secret Santa only with a usable public destination or on-page explanation; H2 `Tools I work with`; H2 `Discuss a project or ongoing support`.

Move credentials and projects before the exhaustive tool grid. Replace vague “Learning that stays useful” with a descriptive heading. Preserve the original voice in paragraph copy.

**CTA:** make “Discuss a project or ongoing support” the primary action; retain “Download CV (PDF)” as secondary. The existing page uses `aleksandre@ghvineria.com` while the homepage uses `Aleksandre.Ghvineria@slick.ge`. Both may be valid; preserve the existing contact destinations for now. A later inbox-consolidation decision is optional and does not block the SEO changes. This is clarity and lead-routing work, not a claimed ranking penalty.

**Proof:** fix the Secret Santa 404; use “View Golang tools on GitHub” and “Explore the homelab repository” instead of repeated “View project.” Keep the certification verification link; confirm what its dates mean and avoid implying currently valid certification status without checking. Add a service link beside each relevant example so the profile leads back to hiring information.

**Accessibility:** change the LPI link’s accessible name from `Linux Professional Institute` to `LPI certification verification — Linux Professional Institute`, or use this as visible text. Lighthouse detected that the accessible name does not include visible “LPI.” Enlarge the 19px-high social link hit areas; this is an accessibility/usability improvement, not a ranking claim.

**Images/schema:** keep the named portrait alt; optional responsive variants; AboutPage + ProfilePage + Person and a visible `Home > About Aleksandre` breadcrumb as detailed below. **Verify:** anonymous outbound link checks, keyboard/accessibility retest, schema validation and branded query/lead performance.

### 3. Utility pages and duplicate variants

`/`, `/index.html`, parameter variants, explicit `index.html` pages and the error document are not additional service landing pages. Retain canonical consolidation for duplicates. Keep root excluded from the sitemap while it is a redirect. Add noindex to the 404 template and avoid service metadata/schema on it. `/about/` currently returns 404; only create a redirect if historical links or Search Console show it was a real former URL.

## F. Technical SEO Audit

### Crawling, indexing and canonicalization

Both canonical pages return 200 and full text, headings and links before JavaScript runs. Requests with Googlebot and Bingbot user-agent strings also returned 200; spoofed user-agent checks do not prove access from the engines’ actual IP ranges. There are no restrictive robots meta tags or X-Robots-Tag headers on these pages. CSS and fonts are accessible. JavaScript enhances navigation and the toolkit rather than supplying the main content.

**Conclusion:** no detected technical obstacle prevents Google or Bing from crawling the two canonical content pages. Actual indexing, engine-selected canonicals and rendered screenshots must be checked in their webmaster tools.

Retain these exact canonical tags:

```html
<!-- Homepage -->
<link rel="canonical" href="https://slick.ge/en/">
<!-- About -->
<link rel="canonical" href="https://slick.ge/en/about/">
```

The tested query strings and explicit index files already use these clean canonicals. Preserve that behavior and keep internal links consistent. Server redirects for explicit index files are optional if a programmable host/edge is later available. Do not use noindex to resolve normal canonical duplicates, and do not block those URLs before crawlers can read canonical tags. [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

The root’s 200 + immediate meta refresh is generated by Astro’s static build even though its source calls `Astro.redirect(..., 301)`. **Changing that source argument alone will not create a GitHub Pages HTTP 301.** Google documents immediate meta refresh as a permanent redirect signal; the current root is not a demonstrated indexing blocker. Keep the working fallback on GitHub Pages. If hosting later supports HTTP redirect rules, use a path-preserving apex/www/HTTPS policy and a 301/308 for root → `/en/`. Do not add a new proxy solely for this small optimization. [Astro routing](https://docs.astro.build/en/guides/routing/#redirects), [Google redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects).

### robots.txt and sitemap

Actual live file:

```text
User-agent: *
Allow: /
```

`User-agent: *` applies the group to all crawlers. `Allow: /` permits all paths; it is redundant with the normal allow-by-default behavior but harmless. There are no disallows, crawl delays or engine-specific exceptions. The file does not prevent indexing and should not be used for that purpose. [Google robots guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro).

**Replacement `public/robots.txt`:**

```text
User-agent: *
Allow: /

Sitemap: https://slick.ge/sitemap.xml
```

**Create `public/sitemap.xml`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://slick.ge/en/</loc></url>
  <url><loc>https://slick.ge/en/about/</loc></url>
</urlset>
```

A sitemap is not essential for crawling two well-linked pages. It is still a low-effort discovery and monitoring aid, especially as service pages are added. Include only live, canonical, indexable URLs. Omit root redirects, 404s, parameters and unpublished proposals. Omit `lastmod` until actual content-change dates can be maintained; do not set every date to deployment time. `priority` and `changefreq` are unnecessary. [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

### Head metadata and Astro implementation

Both content pages have unique titles/descriptions, UTF-8, a correct viewport, `lang="en"`, a working SVG favicon, and OG title/description/type/URL. Neither has JSON-LD, an OG image, `og:site_name`, or explicit Twitter/X card metadata. `og:locale="en_US"` is not an SEO country-targeting instruction; do not mistake it for US coverage.

Recommended implementation locations:

| File | Change |
|---|---|
| `src/i18n/content.json` | Homepage title, description, H1, service labels and revised copy from E |
| `src/components/AboutPage.astro` | About metadata, heading order, contact priority, descriptive project links and LPI label |
| `src/data/profile.ts` | Correct/remove unavailable project URL; approved contact identity |
| `src/layouts/BaseLayout.astro` | Remove English-only hreflang output; add optional noindex and page-specific JSON-LD props; synchronized social metadata |
| `src/pages/404.astro` | Pass noindex; page-specific error description; no business/service schema |
| `public/robots.txt`, `public/sitemap.xml` | Exact files above |
| `astro.config.mjs` | Optional explicit `trailingSlash: 'always'` to document the existing URL convention; verify actual host behavior separately |

Minimal layout additions, merged with the existing Props and frontmatter rather than replacing the whole file:

```astro
---
// Add to existing Props:
// noindex?: boolean;
// structuredData?: Record<string, unknown>;
const { noindex = false, structuredData } = Astro.props;
// Change existing alternates default to false while English-only,
// or remove its unused hreflang block entirely.
---
{noindex && <meta name="robots" content="noindex, follow" />}
{!noindex && <link rel="canonical" href={canonical} />}
{structuredData && (
  <script type="application/ld+json" set:html={
    JSON.stringify(structuredData).replace(/</g, '\\u003c')
  } />
)}
```

Replace the current unconditional canonical line with the conditional line above; do not output both. Pass `noindex` to the existing 404 `<BaseLayout>` and set its description to `The requested page could not be found. Return to Slick’s DevOps consulting homepage.` The 404 HTTP response is still required for unknown routes; a meta directive does not supply that status.

For the two content pages, synchronize social metadata with the final title/description and add:

```html
<meta property="og:site_name" content="Slick">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="DevOps Consulting for Small Software Teams | Slick">
<meta name="twitter:description" content="Work directly with Aleksandre Ghvineria to automate workflows, improve CI/CD, secure code and secrets, and simplify cloud infrastructure.">
<meta property="og:image" content="https://slick.ge/aleksandre-ghvineria.jpeg">
<meta property="og:image:alt" content="Aleksandre Ghvineria, the independent consultant behind Slick">
<meta name="twitter:image" content="https://slick.ge/aleksandre-ghvineria.jpeg">
<meta name="twitter:image:alt" content="Aleksandre Ghvineria, the independent consultant behind Slick">
```

Use About’s own title and description on About. This conservative example uses an existing 400×400 image; a designed 1200×630 social image is an optional later asset and should not be referenced before it exists. These tags improve sharing clarity, not demonstrated ranking performance. No X account is invented. Keep the favicon; no favicon redesign is needed.

### Performance and Core Web Vitals

**Field data: unavailable.** Search Console/analytics were not supplied. The unauthenticated PageSpeed API returned HTTP 429 shared-quota exhaustion. This is a tool limitation, not evidence of missing CrUX coverage or bad performance. No p75 LCP, INP or CLS pass/fail conclusion can be made for real users.

**Lab data: Lighthouse 13.5.0, one navigation run per page, mobile 412×823, simulated 150ms RTT / 1,638.4kbps throughput / 4× CPU slowdown.** Timings and diagnostics are retained in evidence.json.

| Metric | `/en/` | `/en/about/` |
|---|---:|---:|
| Run UTC | 12:20:10 | 12:20:54 |
| Performance score | 100 | 100 |
| Accessibility score | 100 | 100 |
| Basic SEO score | 100 | 100 |
| Simulated LCP | 1.375s | 1.448s |
| Lab CLS | 0 | 0 |
| Total Blocking Time | 0ms | 0ms |
| Lighthouse modeled TTFB | 0.775s | 0.755s |
| Simulated FCP | 0.952s | 0.973s |
| INP | Not measured | Not measured |

A separate, unthrottled Chromium check at 390×844 measured LCP 0.748s/0.636s and navigation response-start TTFB 0.413s/0.397s respectively. These are local observations, not representative mobile network or field data. They should not be combined with Lighthouse timings into one benchmark. No layout shifts occurred during the observed initial windows. H1 text was the largest contentful element in those runs.

Google’s field targets are p75 LCP ≤2.5s, INP ≤200ms and CLS ≤0.1, segmented by mobile/desktop. Lighthouse’s TBT is not INP. Scores of 100 do not prove rankings, field CWV compliance or complete accessibility. [Web Vitals definitions and lab/field distinction](https://web.dev/articles/vitals), [PageSpeed methodology](https://developers.google.com/speed/docs/insights/v5/about).

**Asset findings and proportionate actions:**

- **Images:** 12.1KiB, 400×400 portrait; no responsive srcset. Lighthouse estimates 11KiB homepage and 16KiB About image-delivery savings, including an external logo on About. Supply an 80px/160px avatar and suitable 200px/400px portrait variants when convenient; compare actual bytes and retain quality at high DPR. Do not lazy-load the above-fold profile portrait. Below-fold portraits and tool icons already use lazy loading. **P3, low impact** because the original portrait is already small.
- **Fonts:** two self-hosted Latin variable WOFF2 files, 27,348 + 36,932 bytes, preloaded with `font-display: optional`. Current behavior is reasonable. Do not reflexively change to swap or add external font services. Verify layout/font fallback on slow connections after design changes.
- **CSS:** 18,721 decoded bytes, about 4.8KB gzip. One render-blocking stylesheet is normal here. Lighthouse flags it, but there is no demonstrated need for critical-CSS complexity; preserve this light setup.
- **JavaScript:** two inline modules totaling roughly 2.1KB on home, one roughly 0.9KB module on About. No analytics, chat or advertising scripts were detected in the sampled pages. Preserve minimal scripting when adding measurement.
- **Third-party images:** 85 technology badges appear on About, many sharing URLs. jsDelivr `simple-icons@latest` and a GitHub avatar create external dependencies. All checked image URLs returned 200. Pin versions or vendor the needed icons locally for stability; use accurate icons or text instead of mapped substitutes. **P2 reliability, low expected ranking impact.** Verify after scrolling and expanding every group.
- **Caching/compression/CDN:** gzip was observed for HTML/CSS/SVG; WOFF2/JPEG are already compressed formats. GitHub/Fastly edge delivery, ETags and `max-age=600` are present. Lighthouse estimates repeat-view cache savings of 74KiB/85KiB. GitHub Pages controls these headers: a `_headers` file alone will not fix them. If a configurable host/edge is adopted for other reasons, cache content-hashed assets for one year with `immutable`, while keeping HTML revalidatable. **P3**, not a reason to migrate now.

No major performance remediation is justified by this snapshot. Repeat mobile lab checks after substantive changes; use field/RUM data if available before diagnosing a real-user failure.

### Mobile and accessibility

Checked widths: 320, 390, 768 and 1280 CSS pixels. No horizontal document overflow was detected. Screenshots show readable content stacking and responsive navigation. Body text is 16px, but some badges/contact labels use roughly 10–12px text; consider 12–14px minimum for secondary details where layout allows.

Positive findings: header/nav/main/footer landmarks, one H1 per content page, orderly H2/H3 nesting, a working skip link that advances the next Tab into main content, labeled menu toggle, Escape closing with focus returned, visible navigation without JS, named portrait alt, decorative icon handling, and reduced-motion CSS. There are no lead-form inputs requiring label checks yet.

Automated axe checks for the selected WCAG A/AA rule sets reported no violations in four page/viewport combinations. Lighthouse additionally found an **unscored LPI visible-label/accessibility-name mismatch**; fix it as in E. This demonstrates why a 100 accessibility score is not certification. Contrast checks found no automated failures in sampled states; manually review small muted text, focus styling and expanded/mobile states.

Increase About’s GitHub/LinkedIn/LPI link hit areas from 19px height to comfortable 44px boxes where possible. The current spacing may satisfy target-size exceptions; do not call their dimensions alone a proven WCAG failure. Verify keyboard order, menu open/close, toolkit disclosure controls, 200% text zoom, voice-control labels and a screen-reader pass. These primarily improve access and usability; they are not interchangeable with SEO ranking factors.

### International and local/service SEO

Keep `/en/` and `/en/about/`; one English version can serve international buyers. Add remote international availability and the two confirmed engagement models in visible copy. Omit undecided working hours, response expectations, commercial terms and more specific regional commitments. Do not add placeholders for them. An English site does not require US-targeted copy or invented US addresses.

`.ge` is a country-code domain and is not on Google’s listed generic ccTLD exceptions. It is a country signal, but does not make international ranking impossible. Keep the existing brand for now; assess target-country impressions and qualified leads over time. A generic-domain migration is a separate branding decision requiring acquisition, redirect and migration planning, not an immediate fix. [Google international-site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

**Current action:** remove the single-language hreflang block on both pages. Keep `lang="en"` and self-canonicals. If genuine Georgian service delivery and buyer demand later justify localization, use `/ka/` and equivalent inner URLs, native-reviewed copy/metadata and `lang="ka"`. Each translation keeps its own canonical. Add reciprocal, page-equivalent tags only for pages that exist, for example on both future About translations:

```html
<link rel="alternate" hreflang="en" href="https://slick.ge/en/about/">
<link rel="alternate" hreflang="ka" href="https://slick.ge/ka/about/">
<link rel="alternate" hreflang="x-default" href="https://slick.ge/en/about/">
```

Do not put these future tags live now. Do not point all translations to a homepage, canonicalize Georgian to English, or force IP-based language redirects. [Google localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).

No city/service-area landing pages are justified by the chosen international strategy. A Google Business Profile is conditional on actual eligibility, including in-person customer contact; an online-only consultancy should not invent an address or service area to obtain one. [Business Profile guidelines](https://support.google.com/business/answer/3038177).

## G. Structured Data

No JSON-LD, microdata or RDFa business/profile markup was found in the sampled first-party content HTML. This absence is not an indexing failure.

**P2 recommendation:** use a Person for Aleksandre, a WebSite for Slick, a WebPage for home, and Service entities matching the four visible offers. Use AboutPage + ProfilePage for the person-focused About page, with `mainEntity` set to the Person. Add BreadcrumbList only alongside a visible matching breadcrumb. Do not add ratings, reviews, partner status, certifications with unverified validity, invented opening hours, prices, employee counts or address.

| Type | Applicability and search interpretation |
|---|---|
| Person | Accurate entity identification; no guaranteed standalone rich result |
| WebSite | Accurate site identity. Google’s site-name feature requires root-homepage placement; placing this only on `/en/` is not a reliable implementation of that feature. Root currently redirects and is noindexed, so treat the supplied graph as semantic markup. Do not migrate URLs just to chase site-name display. |
| WebPage / AboutPage | Page classification; primarily semantic |
| ProfilePage | Appropriate to the About page’s single affiliated person, following Google’s profile guidelines; potentially usable in supported search features, not a guaranteed special appearance |
| Service | Accurately describes the visible services; no general Google “consulting service rich result” |
| BreadcrumbList | Eligible for supported breadcrumb presentation when valid and matching the page hierarchy; display is not guaranteed |
| Organization | Optional if the owner wants to describe a distinct business entity; not needed to represent the current one-person offer |
| ProfessionalService / LocalBusiness | Do not deploy as a local-rich-result tactic without confirmed business/address facts. The current public content does not provide enough evidence for Google’s required local-business fields. |
| FAQPage | Useful questions belong in visible content; no FAQ rich-result strategy for this consultancy. Google restricts that feature to qualifying authoritative government/health sites. |

Documentation checked: [structured-data principles](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [site names](https://developers.google.com/search/docs/appearance/site-names), [breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [FAQ eligibility](https://developers.google.com/search/blog/2023/08/howto-faq-changes), [Schema.org Service](https://schema.org/Service).

### Homepage graph

Deploy after the proposed visible metadata/content changes. The Service URLs deliberately point to the existing visible services section. Once detailed pages are live, update the relevant Service `url` consistently while retaining stable entity IDs. The graph does not assert unconfirmed geographic coverage or organizational status.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://slick.ge/#website",
      "url": "https://slick.ge/",
      "name": "Slick",
      "inLanguage": "en",
      "publisher": {
        "@id": "https://slick.ge/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://slick.ge/#person",
      "name": "Aleksandre Ghvineria",
      "url": "https://slick.ge/en/about/",
      "image": "https://slick.ge/aleksandre-ghvineria.jpeg",
      "description": "Independent DevOps and automation consultant working under the name Slick.",
      "sameAs": [
        "https://github.com/ghvinerias",
        "https://www.linkedin.com/in/aleksandre-ghvineria",
        "https://cv.ghvineria.com/en/"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://slick.ge/en/#webpage",
      "url": "https://slick.ge/en/",
      "name": "DevOps Consulting for Small Software Teams | Slick",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://slick.ge/#website"
      },
      "about": {
        "@id": "https://slick.ge/#person"
      },
      "mainEntity": [
        {
          "@id": "https://slick.ge/#service-automation"
        },
        {
          "@id": "https://slick.ge/#service-delivery"
        },
        {
          "@id": "https://slick.ge/#service-security"
        },
        {
          "@id": "https://slick.ge/#service-infrastructure"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://slick.ge/#service-automation",
      "name": "Workflow automation",
      "description": "Connect tools and automate recurring tasks.",
      "url": "https://slick.ge/en/#services",
      "provider": {
        "@id": "https://slick.ge/#person"
      }
    },
    {
      "@type": "Service",
      "@id": "https://slick.ge/#service-delivery",
      "name": "CI/CD & delivery",
      "description": "Build pipelines, repeatable releases, and release automation.",
      "url": "https://slick.ge/en/#services",
      "provider": {
        "@id": "https://slick.ge/#person"
      }
    },
    {
      "@type": "Service",
      "@id": "https://slick.ge/#service-security",
      "name": "Code & secrets security",
      "description": "Integrate code scanning, dependency checks, and secrets management into developer workflows.",
      "url": "https://slick.ge/en/#services",
      "provider": {
        "@id": "https://slick.ge/#person"
      }
    },
    {
      "@type": "Service",
      "@id": "https://slick.ge/#service-infrastructure",
      "name": "Cloud & infrastructure",
      "description": "Simplify environments and move manual configuration into repeatable infrastructure as code.",
      "url": "https://slick.ge/en/#services",
      "provider": {
        "@id": "https://slick.ge/#person"
      }
    }
  ]
}
```

### About graph

Add a visible `Home > About Aleksandre` breadcrumb before deploying this graph. Repeated Person facts must remain consistent across pages.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://slick.ge/#person",
      "name": "Aleksandre Ghvineria",
      "url": "https://slick.ge/en/about/",
      "image": "https://slick.ge/aleksandre-ghvineria.jpeg",
      "description": "Independent DevOps and automation consultant working under the name Slick.",
      "sameAs": [
        "https://github.com/ghvinerias",
        "https://www.linkedin.com/in/aleksandre-ghvineria",
        "https://cv.ghvineria.com/en/"
      ]
    },
    {
      "@type": [
        "AboutPage",
        "ProfilePage"
      ],
      "@id": "https://slick.ge/en/about/#webpage",
      "url": "https://slick.ge/en/about/",
      "name": "Aleksandre Ghvineria, DevOps Consultant | Slick",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://slick.ge/#website"
      },
      "mainEntity": {
        "@id": "https://slick.ge/#person"
      },
      "breadcrumb": {
        "@id": "https://slick.ge/en/about/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://slick.ge/en/about/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://slick.ge/en/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Aleksandre",
          "item": "https://slick.ge/en/about/"
        }
      ]
    }
  ]
}
```

### Future CI/CD page

The complete [CI/CD Service + WebPage + Person + BreadcrumbList example](ci-cd-service.jsonld) is ready for the proposed service page. Deploy only after that page and its visible breadcrumb exist. Use the same pattern for the other services with their actual titles, descriptions and URLs; do not emit all page-specific graphs on every URL.

**Validation:** supplied JSON parses successfully, but a syntax check is not a Google eligibility result. Run Schema.org Validator for semantic types and Google Rich Results Test for supported features, then compare markup against visible content and inspect rendered HTML. A “no rich results detected” response for Service/WebSite alone is not proof of invalid Schema.org markup. Check live pages again after deployment; no live markup has been deployed by this audit.

## H. Content Gap Analysis

The two-page structure is sufficient for a small brochure but does not answer the different purchase questions behind CI/CD, security, workflow automation and infrastructure queries. Expand by buyer problem, not by every tool, city or keyword. Publish only when a page has distinct scope, useful explanations and evidence; there is no minimum word count.

### Proposed pages with implementation-ready briefs

**1. `/en/services/ci-cd/` — P1, publish first**

- Purpose/intent: hire help implementing or improving delivery; primary topic CI/CD consulting; secondary topics GitHub Actions, GitLab/Jenkins where relevant, repeatable releases, rollback and handover.
- Title: `CI/CD Consulting & Pipeline Automation | Slick`
- H1: `CI/CD pipelines your team can operate confidently`
- Description: `Improve builds, releases, and rollback with hands-on CI/CD consulting for small software teams. Work directly with Aleksandre Ghvineria.`
- Outline: H2 `When your delivery pipeline needs attention` (manual deploys, unreliable builds, unclear rollback); H2 `What the engagement can include` (review, implementation, validation, documentation); H3 `Build and test`, `Release and rollback`, `Credentials and approvals`; H2 `Working with your existing tools`; H2 `Relevant experience` (approved Liberty Bank work, clearly employment experience); H2 `What your team receives` (only confirmed artifacts); H2 `Project or ongoing support`; H2 `Before we begin` (stack, repositories, environments, owner responsibilities); H2 `Discuss your pipeline`.
- Suggested opener: “Manual releases and fragile pipelines take time away from product work. I help small software teams build a clearer path from commit to deployment, with repeatable releases and a handover the team can use.”
- Links: home service card → page; About experience → page; page → About, security service, handover guide and contact when live.
- Independent justification: delivery/rollback decisions and scope differ materially from infrastructure or security engagements.
- Verify: page-specific queries begin landing here; inquiry descriptions match delivery needs; no duplicate targeting with a second generic DevOps page.

**2. `/en/services/code-secrets-security/` — P1**

- Purpose/intent: commission implementation of code/dependency/secrets checks. Primary topic code and secrets security consulting; secondary GHAS, CodeQL, dependency scanning and secrets management.
- Title: `Code & Secrets Security Consulting | Slick`
- H1: `Bring code and secrets security into your workflow`
- Description: `Integrate code scanning, dependency checks, and secrets management into development workflows with independent, hands-on DevOps support.`
- Outline: H2 `Where security checks fit into development`; H2 `Implementation scope`; H3 `Code scanning`, `Dependency checks`, `Secret scanning and management`; H2 `Rollout and developer feedback`; H2 `Relevant production experience` (approved EPAM role description, no customer endorsement); H2 `Deliverables and handover`; H2 `What this service does and does not cover`; H2 `Discuss your repositories and workflow`.
- Describe the code scanning and secrets-management services already visible on the site. Defer custom CodeQL-query commitments, licensing arrangements and ongoing-triage terms until decided. Do not imply penetration testing, incident response, compliance certification or guaranteed vulnerability elimination.
- Links: home and About → page; page ↔ CI/CD where relevant; page → contact. No standalone CodeQL/GHAS landing pages initially.
- Independent justification: buyer concerns include permissions, rollout, alert ownership and remediation responsibility, distinct from shipping pipelines.
- Verify: compare security-topic impressions and qualified requests; review claims against the actual offer and product terminology.

**3. `/en/services/workflow-automation/` — P2**

- Purpose/intent: buy automation of recurring software-team operations; primary workflow automation consulting; secondary API integrations, reporting and custom tooling.
- Title: `Workflow Automation for Software Teams | Slick`
- H1: `Automate recurring work across your tools`
- Description: `Connect tools and automate recurring reporting and operational tasks. Practical workflow automation designed for software teams and clear handover.`
- Outline: H2 `Which recurring tasks are worth automating`; H2 `A reporting automation example`; H2 `How the workflow is designed`; H3 `Inputs and integration points`, `Error handling and retries`, `Logging and ownership`; H2 `Choosing scripts or workflow tools`; H2 `Testing and maintenance`; H2 `Discuss a repetitive task`.
- Use the actual report-generation/download/parsing/visualization example from the homepage. Establish inputs, constraints and results with the owner rather than inventing time savings. Discuss tool choices as options, not an unsupported promise of every integration.
- Links: homepage → service → reporting work page → service/contact; contextual links from About.
- Independent justification: recurring operations integration is a different buying intent from deploying code.
- Verify: relevant workflow/API/reporting inquiries rather than unrelated marketing-automation traffic.

**4. `/en/services/cloud-infrastructure/` — P2**

- Purpose/intent: buy infrastructure simplification and reproducibility. Primary infrastructure-as-code consulting; secondary Terraform, Ansible, cloud/on-prem environments, containers and documentation.
- Title: `Cloud & Infrastructure as Code Consulting | Slick`
- H1: `Make infrastructure repeatable and easier to maintain`
- Description: `Simplify cloud and on-prem environments with infrastructure as code, practical automation, and documentation your software team can use.`
- Outline: H2 `Signs your infrastructure needs attention`; H2 `Review the current environment`; H2 `Move repeatable configuration into code`; H3 `Terraform and provisioning`, `Ansible and configuration`, `Environment ownership`; H2 `Containers where they help`; H2 `Validation, rollback and documentation`; H2 `Production experience and homelab work` (clearly distinguished); H2 `Scope a project or ongoing support`.
- Confirm cloud-platform depth and boundaries. Do not promise blanket multi-cloud migration, cost savings, high availability or 24/7 operations because those tools appear in the catalogue.
- Links: homepage and relevant About work → page; page → CI/CD, security and contact.
- Independent justification: environment configuration/state, operational constraints and handover differ from CI/CD implementation.
- Verify: infrastructure-specific query/lead relevance and demonstrable scope.

**5. `/en/work/reporting-automation/` — P1 when evidence is available**

- Purpose/intent: validate practical ability; primary reporting automation example; secondary recurring downloads, parsing, visualization, reliability and maintenance.
- Title: `Reporting Automation: Project Walkthrough | Slick`
- H1: `Automating a recurring reporting workflow`
- Description: `A practical walkthrough of report generation, downloads, data parsing, and visualization, with implementation choices and maintenance considerations.`
- Outline: H2 `The recurring task`; H2 `Constraints and requirements`; H2 `My role`; H2 `Workflow before and after`; H2 `Implementation decisions`; H2 `Testing and failure handling`; H2 `Results and limitations`; H2 `Who maintains it`; H2 `Discuss a similar workflow`.
- Obtain publication permission and sanitize examples. Use a diagram or sample data when allowed. Label a demonstration as a demonstration. Publish measured outcomes only with a baseline and method; qualitative verified results are acceptable.
- Links: homepage proof, About and automation page → work page; work page → automation/contact. A work index is unnecessary for one item.
- Independent justification: evidence can be reviewed in depth without bloating the service pitch.
- Verify: public artifacts open anonymously; every claim is owner-approved; work-page assisted inquiries are recorded.

**6. `/en/contact/` — P2, when improving inquiry handling**

- Purpose/intent: contact/hire Slick; primary branded contact intent; secondary project versus ongoing support, process and coverage.
- Title: `Discuss a DevOps Project or Ongoing Support | Slick`
- H1: `Tell me what your team needs`
- Description: `Contact Aleksandre Ghvineria at Slick about a DevOps implementation project or ongoing support for your software team.`
- Outline: H2 `A project or ongoing support`; H2 `What to include`; H2 `What happens next`; H2 `Other ways to get in touch`. State remote international coverage; add confirmed hours/time zone and response expectation only when supplied.
- Include name, work email, engagement type, and problem/stack fields; timeline/time zone can be optional. Provide visible labels, understandable errors and a confirmed success state. Retain a visible email fallback. No file-upload or credential fields are needed for an initial inquiry.
- GitHub Pages is static: a real form needs a backend/form service with delivery/error handling. A mailto form must not report a sent lead merely because it opened a mail client.
- Links: header/footer and all service CTAs → contact; contact → relevant services/About for reassurance.
- Independent justification: useful if it provides actual intake, next steps and support boundaries. If it only repeats an email address, retain the existing homepage contact section instead.
- Verify: an owner-run test submission reaches the inbox and the success event fires once. Do not count a click as a received inquiry.

**7. `/en/guides/ci-cd-handover-checklist/` — P2**

- Purpose/intent: help teams evaluate a handover; primary CI/CD handover checklist; secondary release ownership, rollback, credentials and runbooks.
- Title: `CI/CD Handover Checklist for Small Teams | Slick`
- H1: `A practical CI/CD handover checklist`
- Description: `Check pipeline ownership, release steps, rollback, credentials, and documentation before taking over a CI/CD system.`
- Outline: H2 `Who this checklist is for`; H2 `Repository and access ownership`; H2 `Build and deployment instructions`; H2 `Environment configuration and secrets`; H2 `Rollback rehearsal`; H2 `Monitoring and failure response`; H2 `Acceptance walkthrough`; H2 `Copyable handover checklist`; H2 `When outside help is useful`.
- Include an original, tested template and example. Show author and true review date. Avoid a generic definition of DevOps or fabricated project experience. A standalone blog index is unnecessary for one guide.
- Links: CI/CD page and an appropriate work example → guide; guide → CI/CD service and About author.
- Independent justification: serves a learning/task-completion intent separate from buying consulting.
- Verify: readers find/use the template, informational queries land here, and some proceed to a relevant service page; do not judge it solely by lead count.

### Authority and discoverable presence

The inspected [GitHub profile](https://github.com/ghvinerias) links to `https://slick.ge`. The [CV site](https://cv.ghvineria.com/en/) links to the Slick homepage and contact section. A [LinkedIn profile for Aleksandre Ghvineria](https://ge.linkedin.com/in/aleksandre-ghvineria) appeared in name searches. These are useful identity connections, largely owner-controlled; they are not proof of strong independent editorial authority.

Sampled `site:slick.ge` and domain/name searches did not establish a meaningful indexed inventory or independent backlink footprint. This is not proof of zero indexed pages or zero backlinks. No paid backlink index or Search Console Links export was available.

**P2 actions:** keep profile descriptions, name and primary website link consistent; link the CV footer directly to `/en/` where practical; improve public repository READMEs with purpose, screenshots/examples, setup and ownership; publish the approved work example; contribute useful fixes and technical explanations to relevant projects/communities. Seek an editorial mention from a real collaboration, technical talk or approved customer story when earned. Verify referring URLs and qualified referral/organic leads, not just a backlink count.

**P3:** consider a relevant professional marketplace/directory only if it fits the actual consulting model and allows truthful solo-practitioner profiles and real reviews. Do not buy directory packages or manufacture local citations. No paid links, mass submissions, PBNs, automated comments or deceptive guest articles.

## I. Proposed Site Architecture

Existing English URLs remain stable. Directories below do not imply that empty index pages should be created.

```text
https://slick.ge/
├── /                         redirect to /en/
├── /en/                      existing commercial homepage
│   ├── about/                existing practitioner profile
│   ├── services/             grouping only; no thin index required
│   │   ├── ci-cd/            first service page
│   │   ├── code-secrets-security/
│   │   ├── workflow-automation/    later, evidence-led
│   │   └── cloud-infrastructure/   later, scope-led
│   ├── work/                 grouping only
│   │   └── reporting-automation/   publish after evidence review
│   ├── guides/               grouping only
│   │   └── ci-cd-handover-checklist/
│   └── contact/              only with useful intake/process content
├── robots.txt
├── sitemap.xml
└── 404.html                  noindex utility; missing paths return 404
```

Do not create an additional `/en/services/devops-consulting/` duplicating the homepage, one page per toolkit logo, or city pages for locations not served. No `/ka/` launch is recommended for the owner’s current English/international priority. Keep all substantive pages within two clicks of home; add contextual links rather than relying only on a footer.

## J. Implementation Backlog

URLs are on `https://slick.ge` unless stated otherwise. Impact is a reasoned expectation, not a traffic forecast. Effort: Low = a small content/configuration edit; Medium = a coordinated change or substantive page; High = substantial evidence gathering, content or integration work. DNS provisioning can introduce waiting independent of implementation effort.

| Priority | URL | Problem | Exact Action | Expected Impact | Effort | Verification |
|---|---|---|---|---|---|---|
| P0 | `https://www.slick.ge/`, `https://www.slick.ge/en/about/` | TLS certificate does not cover www | Correct Pages/DNS configuration and provision www certificate; redirect to apex while preserving path | High for affected visits: removes a complete access failure; total affected traffic unknown | Medium | Normal TLS-verified requests and clean browsers reach apex without errors/loops |
| P1 | `/en/`, `/en/about/` and future content | No supplied search/lead baseline | Verify Search Console; inspect both URLs; export baseline; define qualified leads | High decision value: prevents optimizing against guesses; no direct ranking gain | Low | Verified property, baseline saved, conversion definition documented |
| P1 | `/en/` | Offer not explicit in main heading; coverage/engagement unclear | Apply exact metadata, H1 and hero copy in E; add remote international and project/support sections | High relevance/conversion potential: buyers can recognize fit and next step | Medium | Live HTML and mobile review; topic-level impressions, CTR and qualified leads |
| P1 | `/en/about/` | Weak person/service title; CV-first hierarchy; diffuse proof | Apply exact About metadata; move evidence before full toolkit; prioritize consulting CTA; review experience/credential wording | Medium: clearer identity and supplier evaluation | Medium | Metadata, content order, verified claims and contact events |
| P1 | `/en/about/` | Secret Santa destination returns 404 | Correct public repo URL or remove link and add truthful project explanation | Medium trust value: a visible proof link currently fails | Low | Anonymous GET/browser succeeds or unavailable link is removed |
| P1 | `/en/`, `/en/about/`, future `/en/contact/` | Inquiry measurement and inbox identity unclear | Preserve current contact destinations; log contact intents separately from received and qualified inquiries; defer inbox consolidation | High business value: identifies which organic visits create viable work | Medium | Owner-run end-to-end contact test; deduplicated events; lead record attribution |
| P1 | `/en/services/ci-cd/` | Distinct delivery intent lacks a dedicated explanation | Publish section H’s CI/CD brief using existing public service facts; omit undecided packages/terms; link from home/About | High relevance opportunity: aligns a confirmed offer with purchase-specific searches | High | 200, self-canonical, raw HTML, internal links, relevant queries and lead fit |
| P1 | `/en/services/code-secrets-security/` | Security offer lacks scope/boundaries | Publish section H’s security brief using existing public service facts; omit unconfirmed scope commitments | High relevance opportunity: clearer specialized offer supported by stated experience | High | Same technical checks; claims review; security-topic queries/inquiries |
| P1 | `/en/work/reporting-automation/` | Existing example lacks inspectable detail | Publish permission-cleared walkthrough with actual role, method and verified results | High trust potential: supplies evidence a buyer can evaluate | High | Claim/artifact review; no invented outcomes; service/contact links and assisted leads |
| P2 | `/en/`, `/en/about/` | Unnecessary and incorrect single-language annotations | Remove current hreflang block while English-only | Low: corrects a real semantic inconsistency; not a current language-launch blocker | Low | No unrelated-page alternates in head |
| P2 | `/sitemap.xml`, `/robots.txt` | No sitemap discovered | Publish exact two-URL sitemap and robots directive; add new pages only on publication | Low–Medium discovery/monitoring value; not a prerequisite for indexing | Low | XML parses; 200 XML response; accepted in webmaster tools |
| P2 | `/404.html`, arbitrary missing paths | Error asset itself serves 200 without noindex | Add noindex in 404 template; preserve missing-path 404 status | Low: excludes an unwanted utility page | Low | 404.html has noindex; random path returns 404; neither in sitemap |
| P2 | Existing content and future services | No structured entity/page markup | Deploy page-specific graphs from G with matching visible breadcrumb/content | Medium semantic clarity; feature eligibility only where supported | Low | JSON parse, Schema.org Validator, Rich Results Test and live HTML |
| P2 | `/en/services/workflow-automation/` | Automation buyer questions unanswered | Publish H3 after documenting real example and integration scope | Medium: distinct service relevance and qualification | High | Service-specific queries and relevant inquiries |
| P2 | `/en/services/cloud-infrastructure/` | Infrastructure scope lacks detail | Publish section H’s infrastructure brief using established service facts; omit unconfirmed platform-depth and package claims | Medium: clarifies a confirmed but broad offer | High | Claim review, technical checks and infrastructure lead relevance |
| P2 | `/en/contact/` | Mailto alone limits structured intake | Build H6 only if useful intake/next-step content is added; retain email fallback | Medium conversion potential; not needed merely to add a page | Medium | Real message delivery, error states, labels and single success event |
| P2 | `/en/guides/ci-cd-handover-checklist/` | No reusable practitioner resource | Publish original checklist/template from H7 and link to service | Medium long-tail/authority potential; outcome uncertain | Medium | Content usefulness, relevant informational queries and service transitions |
| P2 | All published content | Future pages risk being weakly linked | Add service-card, evidence and contextual links; keep key pages within two clicks | Medium discovery and navigation value | Low | Full crawl finds no orphans, broken pages or fragments |
| P2 | `/en/about/` | LPI visible label absent from accessible name; small social hit areas | Fix LPI label and enlarge social targets; review small text and focus states | Medium accessibility value; no direct ranking promise | Low | Label audit, keyboard/voice-control check, target dimensions and zoom |
| P2 | `/en/`, `/en/about/` | Mutable external icon dependencies | Pin/vendor used icons; replace inaccurate substitutions with correct marks or text | Low SEO, Medium reliability/identity value | Medium | All icons load after disclosure/scroll; no misleading logo mappings |
| P2 | GitHub profile, CV site, LinkedIn; new work/guide pages | Limited confirmed independent authority | Maintain identity links; improve real repos; publish useful work and earn relevant references | Medium long-term credibility/referral potential | Medium | Live referring links, referral quality and relevant mentions |
| P2 | All canonical content | Bing visibility unmeasured | Verify/import Bing property, submit sitemap and inspect key URLs | Low–Medium additional discovery and diagnostics | Low | Verified ownership, fetched sitemap, URL inspection |
| P3 | `/`, index.html variants | HTML root redirect and crawlable canonical duplicates | Keep current fallback; use server 301/308 and direct canonical links if host supports them later | Low incremental value; current behavior is interpretable | Medium | Path/query-preserving redirects and unchanged canonical targets |
| P3 | Existing and new content | Social previews incomplete | Add OG site name, existing portrait image and X summary metadata; optionally design sharing image later | Low SEO; useful sharing presentation | Low | Preview rendering and valid image responses |
| P3 | `/aleksandre-ghvineria.jpeg`, `/_astro/*`, content pages | Small image/cache opportunities | Responsive portrait variants; long immutable caching only on suitable host/edge | Low: already strong measured lab performance | Low–Medium | Compare bytes, repeat navigation and mobile lab metrics |
| P3 | Published changed URLs | Optional faster participating-engine notification | Consider IndexNow on deployments only if content changes justify it | Low for two slowly changing pages | Low | Key file accessible, accepted submission and engine inspection |
| P3 | Potential `/ka/`; geographic pages/domain strategy | No demonstrated need under current English/international goal | Defer localization/city pages/domain move; reassess only with demand and business evidence | Avoids low-value work and unsupported targeting | Low research; High if later pursued | Target-country/language query and qualified-lead evidence |

## K. First 10 Changes

1. **Repair www TLS and retest both home and inner-page redirects.** Do this before adding more content.
2. **Verify the Search Console Domain property for `slick.ge` and inspect `/en/` and `/en/about/`.** Save available query/page/country/device data as the baseline.
3. **Remove the incorrect single-language hreflang block** in `BaseLayout.astro`; preserve both self-canonicals and English language declarations.
4. **Add noindex to the 404 template.** Keep arbitrary missing routes as HTTP 404 and out of the sitemap.
5. **Fix the Secret Santa public link and the LPI accessible name** in the About component/data; verify without a logged-in GitHub session.
6. **Publish the supplied sitemap and updated robots.txt.** Submit the sitemap in Search Console and Bing after it returns 200.
7. **Apply the exact homepage/About titles and descriptions, homepage H1, and revised content hierarchy in E.** Add confirmed remote international coverage and both engagement types.
8. **Instrument inquiry intent using the existing contact destinations.** Validate received/qualified leads separately. Defer inbox consolidation, support hours and response expectations.
9. **Publish the CI/CD service page first**, using the first page brief in section H and existing public service/experience facts, without undecided engagement terms; add contextual links and its sitemap entry. Then publish the security page as the next content task.
10. **Deploy matching page-specific JSON-LD and visible breadcrumbs**, validate, then run the complete post-deployment check in M. Never publish markup for future pages before their content exists.

These are implementation order, not a claim that a sitemap has more impact than good service content; low-effort hygiene precedes the larger writing work.

## L. 30 / 60 / 90 Day Plan

| Period | Practical work | Completion criteria |
|---|---|---|
| Days 1–30 | Repair www; fix annotations/error indexing/broken proof link; publish sitemap; establish GSC/Bing and lead baseline; improve both existing pages; publish CI/CD page with undecided commercial/support terms omitted | TLS-valid host variants; two existing pages plus published service technically eligible; no broken internal links; working inquiry route; baseline export saved |
| Days 31–60 | Publish security page; add a reporting work example only if usable evidence is already available; add contextual links; improve profile/repository descriptions; review early query/country/landing-page fit; build contact intake only if needed | Distinct content tied to actual offers; evidence checked; key URLs inspected; inquiries classified by service and fit |
| Days 61–90 | Publish automation/infrastructure pages only with adequate scope/evidence; release original handover checklist if useful; improve snippets from actual query data; revisit low-priority image/icon issues; review lead quality and international reach | Comparable-period query and conversion review; no crawl/render regressions; explicit decision to expand, revise or defer each remaining page |

Success after 90 days is not a promised position or percentage increase. It is a technically sound, clearly scoped, measurable site with stronger topic coverage and evidence—and enough observations to make the next investment intelligently. New or low-traffic sites may need more time to show stable trends.

## M. Verification Plan

### Search Console setup and operating checklist

1. Add the **Domain property `slick.ge`**, copy the exact Google-provided DNS TXT token to the DNS provider, verify it, and retain the record. This covers protocols and subdomains. Do not invent a verification token. [Ownership verification](https://support.google.com/webmasters/answer/9008080).
2. Inspect `/en/` and `/en/about/` individually. Review index status, crawl permission, last crawl, rendered content and Google-selected canonical. Use the live test for reachability; it is not proof of inclusion in the index. After substantive fixes, request indexing once for each important changed URL.
3. Submit `https://slick.ge/sitemap.xml`; check fetch success and discovered canonical URLs. Sitemap submission is a discovery hint, not an indexing guarantee.
4. Review **Page Indexing**: diagnose unexpected exclusions of content pages. Redirects, duplicate variants and the error page should not all be forced into the index. For “crawled/discovered, currently not indexed,” examine content value and internal links rather than repeatedly requesting indexing.
5. Review **Core Web Vitals**, separating mobile/desktop and field URL groups. If data is insufficient, record that limitation; use lab checks and optional lightweight real-user monitoring.
6. Review **HTTPS** reporting where available/populated, and independently test both hostnames; a report cannot replace the observed certificate check.
7. Review **Manual Actions** and **Security Issues**. Their status is currently unknown because account access/data were not supplied; do not infer either a penalty or a clean report from public crawling.
8. In **Performance → Search results**, export queries/pages/countries/devices with impressions, clicks, CTR and average position. Segment branded and non-branded terms. Review the current branded-query filter if available; use an explicit reviewed query list/regex as a fallback. Low-volume/anonymized queries mean the visible table may not sum to all totals. [Current branded-query filter guidance](https://developers.google.com/search/blog/2025/11/search-console-branded-filter).
9. Review weekly for the first month and monthly after stabilization. Compare equivalent 28-day windows, annotate deployments, and use longer periods if volume is small. [Google Search Console workflow](https://developers.google.com/search/docs/monitor-debug/search-console-start).

### Other search engines

**Bing, P2:** add and verify the site or import the verified Google property; submit the same sitemap; inspect the two existing pages and each new service page; review crawl/index issues and query performance. [Bing verification/import documentation](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b).

**IndexNow, P3:** optional on a site with few changes. If implemented, generate a compliant key, publish its UTF-8 key file at the documented same-host location, and submit only URLs actually added/updated/deleted through a deployment step after those changes are live. Confirm an accepted response and monitor participating engines. It is not a Google indexing API or a ranking guarantee. [IndexNow documentation](https://www.indexnow.org/documentation).

Do not invest in extra engines or specialized directories without evidence they reach the chosen international engineering buyers.

### Measurement framework

| Measure | Baseline now | Definition and collection | Evaluation |
|---|---|---|---|
| Indexed canonical content | Unknown; two technically eligible pages observed | GSC URL Inspection + Page Indexing, reconciled with published sitemap | All intended substantive pages eligible; investigate unexpected exclusions, not duplicate/error exclusions |
| Non-branded impressions | Unavailable | GSC, excluding reviewed Slick/name/domain branded queries; group by service | Growth in relevant commercial topics and target countries, not unrelated DevOps jobs/courses |
| Organic clicks | Unavailable | GSC by query, landing page, country and device | Compare equivalent periods; interpret volume alongside relevance |
| CTR | Unavailable | Clicks/impressions for comparable query/device/country/position cohorts | Assess title/snippet changes without a universal CTR target |
| Relevant query visibility | Unavailable | Topic groups from D; GSC average position as a directional aggregate | Track target-page alignment; do not equate average position to a fixed Google rank |
| Organic contact intent | Unavailable | `contact_email_click`, `contact_phone_click`, later `contact_form_success`; include page and CTA location | Useful leading indicators, not all completed leads |
| Qualified organic leads | Unavailable | Owner/CRM log: landing/source where known, service need, fit, project/support type, next step, outcome | Primary business measure; anonymous/no-referrer inquiries may require self-reported attribution |
| Landing-page effectiveness | Unavailable | Organic visits, contact intents, received inquiries and qualified inquiries per page | Compare service relevance and qualification, not raw sessions alone |
| Field CWV | Unavailable | GSC/CrUX or real-user monitoring; p75 mobile/desktop LCP, INP and CLS | Target ≤2.5s / ≤200ms / ≤0.1 with adequate sample size |
| Lab performance regression | Current Lighthouse snapshot in F | Same mobile configuration after material releases | Preserve current speed and stability; investigate meaningful regression rather than chase decorative scores |
| Authority/referral quality | GitHub and CV references verified; totals unavailable | GSC Links where available, public mentions and analytics referrals | Relevant earned references and qualified visits; no arbitrary link-count target |

Do not send names, email addresses or free-text inquiry contents to analytics. Count a form success only after backend acceptance, deduplicate repeated events, and keep mailto/telephone clicks as intent events. GitHub Pages provides no form/analytics backend by itself. Record qualified leads manually if a lightweight analytics setup cannot establish reliable attribution.

### Technical acceptance checks

| Change | Exact acceptance check |
|---|---|
| TLS/host repair | GET both protocols/hosts with certificate verification; direct HTTPS www → apex works; path is preserved; no loop |
| Content eligibility | Canonical page GET is 200; robots permits it; no noindex/X-Robots restriction; page text and links present without JS |
| Canonicals | Exactly one absolute HTTPS canonical to the preferred slash URL; query/index variants point to the same target |
| Hreflang | None while English-only; future alternates must be live equivalent translations, self-referencing and reciprocal |
| 404 | Random unknown path is HTTP 404; direct error file has noindex; no redirects of missing pages to homepage |
| Sitemap/robots | Robots 200 text; sitemap 200 XML; every listed URL 200/indexable/self-canonical; no redirected or proposed URLs |
| Metadata | Unique final title/description/H1 per content page; OG/X values correspond to that page; image URLs load |
| Internal/external links | All content links and fragments resolve; public proof links work anonymously; no unlinked new page |
| Schema | JSON parses; semantic validator has no material errors; supported feature tests checked; every property matches visible facts |
| Responsive/accessibility | Repeat 320/390/768/1280 checks; menu/skip/disclosures by keyboard; LPI label corrected; zoom/readability/contrast/labels checked |
| Performance | Repeat same mobile lab configuration after changes; compare assets/network and field data separately |
| Conversion | Owner-run contact test reaches intended inbox; event recorded once; intent versus qualified lead remains distinct |
| Search outcomes | Recheck after recrawl; compare topic/page/country cohorts over sufficient time; no guarantee that submitted metadata becomes the exact snippet |

Example read-only HTTP checks:

```bash
curl -sS -L -o /dev/null -w '%{http_code} %{url_effective}\n' https://www.slick.ge/en/about/
curl -sS -D - -o /dev/null https://slick.ge/en/
curl -sS https://slick.ge/robots.txt
curl -sS https://slick.ge/sitemap.xml
curl -sS -D - -o /dev/null https://slick.ge/verify-missing-page-20260929/
```

For an implementation in this Astro repository, run `npm run check`, `npm run build`, and relevant existing Playwright checks after code changes. Inspect generated `dist/en/index.html`, `dist/en/about/index.html`, `dist/404.html`, `dist/robots.txt` and `dist/sitemap.xml`, then repeat the same checks against deployment. Build output alone cannot prove DNS, TLS, HTTP redirect or indexing behavior.

### Deferred business decisions — not implementation blockers

At the owner’s request, skip undecided pricing, availability, working hours, response commitments, support terms and fixed deliverable packages. Do not request these again as prerequisites for the technical changes or existing-page improvements. Omit the corresponding public sections/properties rather than publishing placeholders or assumptions.

Proceed with the confirmed services, international English-language audience, and both scoped projects and ongoing support. Service pages can explain existing public capabilities and invite visitors to discuss their needs without promising a fixed package, price or service level. Preserve current contact destinations until an inbox change is decided.

Use this neutral contact copy:

> Tell me about your team, your current setup, and what you want to improve. Let me know whether you are looking for a defined project or ongoing engineering support.

New case studies, outcomes, credentials or deeper scope claims still need supporting evidence. If it is unavailable, omit the new claim or defer that particular content item; do not hold up the rest of the plan. In particular, the reporting walkthrough is optional until there is enough publishable material. Search Console/analytics data also remain unavailable rather than being estimated.

The technical fixes, metadata, sitemap, robots.txt, and supplied JSON-LD remain implementation-ready. This revision updates the audit scope; it does not deploy changes to the website.
