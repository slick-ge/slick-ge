# cv.ghvineria.com analysis

Status: untracked working document. No resume-site implementation changes were made.

Observed: 2026-09-26

URL: https://cv.ghvineria.com/

## Executive summary

`cv.ghvineria.com` is a compact, static, single-page resume with an English root route and a Georgian `/ka/` route. It is currently served by GitHub Pages, uses a dark blue/slate visual system with cyan and purple accents, and presents a long-form chronological resume in cards. The page has useful content and a clear bilingual switch, but its opening paragraph is dense, the visual language is separate from slick.ge, and several technical SEO/accessibility details are missing.

The strongest content to carry into a slick.ge rewrite is the concrete career history, the 170+ VM scope, the Liberty Bank CI/CD work, the EPAM security work, certifications, education, and homelab/projects. The current design has a good information hierarchy for a resume but is more conventional and text-heavy than slick.ge.

## Delivery and runtime observations

- The root response is `200` and is served by GitHub Pages (`server: GitHub.com`).
- The response is static HTML with a linked stylesheet at `/assets/css/main.css`.
- The page advertises no generator or framework in the HTML inspected.
- The site uses `/` for English and `/ka/` for Georgian.
- The English page links to `/assets/pdf/Aleksandre-Ghvineria-CV-EN.pdf`.
- The Georgian page links to `/assets/pdf/Aleksandre-Ghvineria-CV-KA.pdf`, but that URL currently returned `404` during this analysis.
- `https://cv.ghvineria.com/robots.txt` returned `404`.
- `https://cv.ghvineria.com/sitemap.xml` returned `404`.
- `/assets/pdf/Aleksandre-Ghvineria-CV-EN.pdf` returned `200` and `application/pdf`.
- `/assets/images/profile.png` returned `200` and `image/png`.
- The root document uses a ten-minute cache header from GitHub Pages (`cache-control: max-age=600`).

These observations are from the public HTTP responses and may not describe the source repository or deployment workflow.

## Page structure

The page has four major regions:

1. A hero/header with role, name, long professional summary, PDF download, portrait, and contact details.
2. A primary column containing Recent Experiences.
3. A sidebar containing Languages, Interests, Education, and Projects.
4. A short footer statement.

The language switch is positioned in the hero. English displays an inactive `KA` link; Georgian displays an inactive `EN` link back to `/`.

## English content inventory

### Identity and hero

- Eyebrow: `DevOps Practitioner`.
- Name: `Aleksandre Ghvineria`.
- Page title: `Aleksandre Ghvineria — Resume`.
- Description: `Modern CV for Aleksandre Ghvineria`.
- Theme color: `#0f172a`.
- Hero summary describes experience in application lifecycle automation, application server administration, systems administration, and desktop support.
- It claims focus on critical IT infrastructure and services, application patching, IT operations standards, web services and systems troubleshooting, high uptime, virtual machines, server hardware, backups, desktop systems, and peripherals.
- It lists experience with Cloudflare, Cloudflare Zero Trust, Hetzner, Akamai Cloud, Tailscale, WireGuard, Terraform, Bitwarden Secrets Manager, HashiCorp Vault, Ansible, Docker, Filebeat, ELK Stack, Zabbix, GitHub Actions, Prometheus, Grafana, InfluxDB, and Bitbucket CI/CD.
- Primary action: `Download PDF`.

### Contact details

- Email: `ghvineriaa@gmail.com`.
- Phone: `+995 557 48 38 58`.
- GitHub: `ghvinerias`, linking to `https://github.com/ghvinerias`.
- LinkedIn: `aleksandre-ghvineria`, linking to `https://linkedin.com/in/aleksandre-ghvineria`.
- LPI verification link: `LPI ID: LPI000523471`, linking to the LPIC verification URL for code `5lhcz7x9r5`.
- The contact links use `target="_blank"`; GitHub and LinkedIn do not include `rel="noopener"` in the inspected HTML.

### Recent Experiences

The section is rendered as a vertical stack of cards, newest first.

#### System Engineer — EPAM Systems

Period: April 2025 - Present

- Work with GitHub Advanced Security (GHAS), Mend.io, and CodeQL for security scanning.
- Focus on the GCP cloud platform.
- Quick response times and high-quality work as noted by requesters.

#### Application Server Administration — JSC Liberty Bank

Period: July 2022 - March 2025

- Overhauled build/deploy and rollback pipelines for all applications, frontend and backend, including new pipelines for applications without prior automation.
- Implemented playbooks for rapid environment provisioning and application deployment in a fast-paced environment.
- Implemented RabbitMQ and IIS monitoring in Zabbix with specific metrics and alerts not available in general templates.
- Troubleshoot and manage Jenkins, Nginx, IIS WebService, Windows Services, and Linux Services.
- Manage application patching procedures.

#### Systems Administration — HCOJ / High Council Of Justice Of Georgia

Period: April 2021 - July 2022

- Provisioned Dev, Test, Pre-Prod, and Prod environments for newly developed applications.
- Supported and maintained 170+ virtual machines across Windows and Linux.
- Kept server hardware, operating systems, software, and procedures aligned with organizational standards and the strategic business plan.
- Troubleshot virtual machines and hardware running hypervisors.
- Managed vCenter and ESXi hosts.
- Managed VMware vCenter backups using Veeam.

#### Desktop Support — HCOJ / High Council Of Justice Of Georgia

Period: April 2020 - March 2021

- Desktop support.
- Proactively resolved IT-related problems involving equipment and services.

#### Desktop Support — UGT / Technology Company

Period: August 2019 - March 2020

- Responded to technical-assistance requests in person, by phone, and remotely for Windows and macOS endpoints, including laptops and desktops.
- Supported desktop operating systems, Microsoft applications, hardware, and peripherals.
- Worked with individuals across the country.

#### Freelance IT Support — Freelance

Period: 2017 - 2018

- Worked for multiple pharmaceutical companies.
- For Concept Pharma: network setup and maintenance, printer and PC troubleshooting, software installations and updates, and staff training.
- For other clients: network wiring for new offices, planning and deploying networking equipment and staff PCs.
- Implemented access lists for network segmentation, firewall rules, and regular firmware/software updates.

#### Knick — Knick, smart NFC ring company

Period: 2016

- Managed manufacturing of antenna coils for smart NFC rings.
- Improved coil designs for better working range and more compact size.
- Optimized coil geometry to improve signal strength and reduce interference.
- Used an in-house jig to speed up reader-to-ring distance measurement.
- Worked with natural wood materials and natural-color ink.
- Used CNC machines and laser cutters for physical coil components.

#### IT Service Center — ITSC

Period: 2015 - 2016

- Worked after school hours and during summer.
- Troubleshot, built, and serviced computer systems and printers.
- Used an in-house website to log troubleshooting and maintenance steps.
- Used TeamViewer and Remote Desktop Connection for remote assistance.
- Common issues included network drivers, printers, software installations, password resets, and account lockouts.
- Aimed to resolve issues the same day, or within a few hours for complex problems.

#### Computer Development Center — CDS

Period: 2014

- Worked after school hours and during summer break full time.
- Troubleshot, built, and serviced computer systems and printers.
- Helped build and deploy 50+ computer systems for a hospital.
- Responsible for operating-system deployment, configuration, and quality control.
- Used Acronis Clone for disk imaging and deployment.
- Used PXE boot for faster deployment.
- Configured language settings, time zone, network settings, and domain joining.
- Baked drivers and software into images for easier post-deployment setup.
- Performed driver verification, time-zone/language/network checks, stress tests, and temperature checks under load.

#### Intellect Center — Intellect Center

Period: 2013

- Worked after school hours for six months.
- Performed basic computer hardware and software troubleshooting and servicing.
- Used a PSU tester, POST card, and multimeter.
- Disassembled and reassembled computer components.
- Used Hiren's BootCD, MemTest86, antivirus, and malware-removal tools.
- Performed operating-system installations and updates.
- Worked with Windows and Linux distributions.
- Used simple network switches, routers, access points, and modems.

### Languages

- Georgian — Native.
- English — Professional.
- Russian — Professional.

### Interests

- Electrical Engineering.
- Home Automation.
- HomeLAB.

### Education and certifications

#### LPIC-2 — Linux Professional Institute

Period: 11/2023 - 02/2024

- LPID: `LPI000523471`.
- Verification code: `pdycar254f`.

#### LPIC-1 — Linux Professional Institute

Period: 02/2022 - 04/2022

- LPID: `LPI000523471`.
- Verification code: `5lhcz7x9r5`.

#### System administration and security course — Scientific Cyber Security Association

Period: 11/2020 - 12/2020.

#### BSc in Electrical & Computer Engineering — Agricultural University of Tbilisi

Period: 2016 - 2021

- Participated with two friends in the Edison League tournament for 11th-12th grade students.
- Solved STEM problems including building a paper arch supporting the most weight, solving a gear puzzle, and building a rubber-band-powered car that drove the longest distance.
- Each participant received a ₾10,000 grant to cover university fees.
- Built a remote-start system for a Gen 2/3 Toyota Prius as a university project.

### Projects

#### Secret Santa

- Personal Golang project.
- Backend uses Gin and GORM.
- Frontend was built by a friend using React.
- Link: `https://github.com/slick-ge/secret-santa-backend`.

#### Golang Tools

- Collection of tools including a TCP port checker, HTTP load tester, web scraper, and MKV file converter using `mkvmerge`.
- Link: `https://github.com/Ghvinerias/learning-golang`.

#### HomeLAB

- Proxmox, Kubernetes, Docker, LXC, UniFi, and OPNsense.
- Services include Jellyfin, Home Assistant, EMQX, Grafana, Prometheus, Zabbix, Loki, Infisical, Nginx, Ollama, and RabbitMQ.
- Updates are automated with Jenkins and Ansible.
- Link: `https://github.com/Ghvinerias/homelab`.

### Footer

`Built with caffeine and good intentions. No AI was harmed.`

## Georgian version

The `/ka/` page keeps the same layout, contact details, date ranges, companies, projects, and links, with Georgian translations for the role labels, summary, section headings, experience bullets, education, and download action.

Observed localized labels include:

- `DevOps სპეციალისტი` for the eyebrow.
- `ბოლოდროინდელი გამოცდილება` for Recent Experiences.
- `PDF ჩამოტვირთვა` for the PDF action.
- `სისტემური ინჟინერი` for System Engineer.
- `აპლიკაციური სერვერების ადმინისტრირება` for Application Server Administration.

The Georgian contact labels remain in English (`Email`, `Phone`, `GitHub`, `LinkedIn`, `LPI`). The Georgian page’s English link points to `/`, while the English page’s Georgian link points to `/ka/`.

The Georgian hero paragraph is also very long and dense. A future rewrite should preserve the technical facts but split the summary into a short positioning statement plus a focused capability list.

## Visual system

The current visual language is a dark technical resume:

- Background: `#0b0f19`.
- Main panel: `#111827`.
- Card background: `#0f172a`.
- Text: `#e5e7eb`.
- Muted text: `#94a3b8`.
- Border: `#1f2937`.
- Primary accent: cyan `#38bdf8`.
- Secondary accent: purple `#a78bfa`.
- Body font: Inter, system-ui fallback.
- Content width: `min(1120px, 92%)`.
- Hero layout: two-column grid, approximately `1.3fr 0.7fr`.
- Main content layout: approximately `1.5fr 0.8fr`.
- Cards use 14-16px rounded corners, thin borders, and dark surfaces.
- Metadata uses pill-shaped cyan labels.
- Links are mostly underlined or outlined pills.
- The hero has cyan and purple radial gradients at the top.
- At widths below 900px, hero and main grids collapse to one column and the portrait/contact card moves before the hero copy.
- Print styling exists as a separate `.print` system, but the inspected homepage does not expose a print route.

## Accessibility and UX observations

Strengths:

- The document declares `lang="en"` or `lang="ka"`.
- There is one clear page-level `h1`.
- Major content uses `h2` and `h3` headings.
- The portrait has descriptive alt text.
- Download and project actions are visible and understandable.
- The layout collapses at mobile widths.
- The main information is server-rendered HTML and does not depend on JavaScript.

Potential improvements:

- The page should have a skip link to the main content.
- The language switch should have an accessible group label and explicit current-language state.
- External links opened in new tabs should consistently use `rel="noopener noreferrer"`.
- The `Mend.io` link currently uses `http://Mend.io`, which should be corrected to a valid HTTPS URL or plain text.
- Contact information is exposed directly in HTML. That is intentional for a resume, but email obfuscation or spam protection could be considered.
- The stylesheet contains an invalid-looking nested `::after` rule inside `.contact-list a`; it should be verified or removed during the rewrite.
- Long experience bullet lists need stronger scan landmarks on mobile, such as compact skill labels or a deliberate timeline treatment.
- The footer sentence is personable but does not provide the professional links available on slick.ge.

## SEO audit against the Google starter guidance

### Already present

- Descriptive page title.
- Meta description.
- Separate language URL.
- Localized `lang` attribute.
- Crawlable static HTML.
- Descriptive section headings.
- Relevant text close to the profile image.
- Human-readable dates, organizations, roles, and project names.
- Useful links to source projects and professional profiles.

### Missing or weak

- No `robots.txt`.
- No sitemap.
- No `hreflang` links in the inspected pages.
- No canonical link was present in the inspected `<head>`.
- No Open Graph tags or Twitter card tags.
- No JSON-LD structured data for Person, ProfilePage, or WebSite.
- The meta description is generic and identical in shape across locales.
- The title does not communicate DevOps, automation, or location.
- No explicit image dimensions or social preview image metadata were observed for sharing.
- The English root and Georgian `/ka/` are logically distinct, but their relationship is only represented by navigation links.
- The missing Georgian PDF is a broken high-value resource.

Recommended minimum SEO foundation for the rewrite:

1. Add `robots.txt` with a sitemap URL.
2. Generate a sitemap containing `/` or `/en/` according to the chosen canonical English URL and `/ka/`.
3. Add canonical and reciprocal `hreflang` links.
4. Add localized title and description values.
5. Add `og:title`, `og:description`, `og:url`, `og:image`, and Twitter card metadata.
6. Add JSON-LD for Aleksandre as a `Person`, with `sameAs` links to GitHub, LinkedIn, and the CV.
7. Repair or remove the broken Georgian PDF link.

## Content quality and rewrite considerations

The current content has excellent factual raw material but needs editorial compression for a slick.ge-style presentation.

Keep prominently:

- EPAM Systems: GHAS, CodeQL, Mend.io, GCP.
- Liberty Bank: CI/CD, deployment, rollback, provisioning, monitoring, Jenkins/Nginx/IIS.
- HCOJ: 170+ Windows and Linux VMs, VMware, vCenter, ESXi, Veeam, environment provisioning.
- LPIC-1 and LPIC-2.
- Electrical and Computer Engineering degree.
- HomeLAB and its operational services.
- GitHub projects with direct links.
- Prius remote-start university project.

Compress or move below the fold:

- Early school and service-center roles from 2013-2016.
- Repeated desktop troubleshooting details.
- Long lists of individual tools in the hero paragraph.
- Low-level hardware details unless the resume is explicitly targeting infrastructure support roles.

The slick.ge voice should turn the current summary into a concise point of view, then use proof-driven sections. A likely hierarchy is:

1. Role and positioning.
2. One credibility line with years and scope.
3. Selected experience with three high-value roles.
4. Certifications and education.
5. Projects and homelab.
6. Full CV download and contact links.

## Proposed content model for a future rewrite

The current slick.ge repository already uses one localized content JSON. The resume rewrite should use the same model, with each entry containing both language versions together. Resume-specific arrays should cover:

- `experience`: role, organization, dates, summary, bullets, and optional links.
- `education`: qualification, institution, dates, detail, and verification link.
- `projects`: name, description, tools, and URL.
- `languages`: name and level.
- `interests`: localized labels.
- `contact`: email, phone, GitHub, LinkedIn, LPI, and CV URLs.
- `metadata`: title, description, social preview text, and structured-data fields.

Technical product names should remain shared values where they do not need translation. Dates should be stored as structured values if the new design needs sorting or timeline calculations, rather than as one translated sentence.

## Open decisions before implementation

- Should the new site remain a dedicated resume domain, or should it become a resume route linked from slick.ge?
- Is the English URL `/` or `/en/` the preferred canonical URL for the resume domain?
- Should phone and personal email remain visible to crawlers?
- Is the current PDF the source of truth, or should the page become the source of truth and generate/update the PDF separately?
- Should early experience remain visible in the main page, move into an expandable section, or be limited to the downloadable CV?
- Should the new visual system reuse the slick.ge neumorphic light theme or translate the resume’s dark technical palette into the slick.ge component language?
- Which claims and dates should be treated as current and reviewed before publication?
- Should the two LPI verification codes be public on the web page, or should only the verification link be shown?
