# Slick

Static landing website for Aleksandre Ghvineria's DevOps and automation consultancy. Astro, TypeScript, and a shared Soft UI design system.

## Develop

Use Node 24 (see .nvmrc).

```sh
npm ci
npm run dev
```

Open http://localhost:4321. Shared landing sections live in `src/components/LandingPage.astro`, the dedicated CV-style profile is at `/about/`, tools and service definitions live in `src/data/site.ts`, and localized copy is stored in `src/i18n/content.json`. Design tokens live in `src/styles/tokens.css`.

For a live-reloading Docker development server, run `docker compose -f compose.dev.yaml up --build` and open http://localhost:4321. The repository is mounted into the container, so edits reload automatically. Stop it with `docker compose -f compose.dev.yaml down`.

## Validate

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

Browser checks cover desktop/mobile overflow, navigation, email links, disclosures, JavaScript-free navigation, and automated accessibility. `dist/` is the deployable static site, including self-hosted fonts.

SEO checks also cover metadata, structured data, sitemap, robots and internal links across all seven content pages. Tests start a dedicated preview server on port 4327; keep that port free.

## SEO and content

See [implementation status and remaining deployment/account tasks](docs/seo-implementation.md). Service pages use `src/data/services.ts`; the CI/CD guide and downloadable checklist share `src/data/handover.ts`. Sitemap and robots are generated at build time using `SITE_URL` and `BASE_PATH`. Shared metadata and structured data live in `src/layouts/BaseLayout.astro` and `src/lib/seo.ts`.

## Container

```sh
docker compose up --build -d
```

Open http://localhost:8080. HTTP port 8080, UID 101, no application secrets or persistent storage. A read-only filesystem requires a writable `/tmp` (provided by Compose). Health endpoint: `/healthz`. TLS and ingress are managed externally.

## Docker Hub

The build-and-publish workflow validates pull requests and smoke-tests amd64 and arm64 containers. Pushes to main and manual dispatch also publish `DOCKERHUB_USERNAME/slick-ge:latest` and `DOCKERHUB_USERNAME/slick-ge:<full-commit-sha>` as multiarch images.

Set the repository Actions secret `BW_ACCESS_TOKEN` with access to the two Bitwarden secret IDs from the reference auth-slick-ge workflow. They resolve to `DOCKERHUB_USERNAME` and `DOCKERHUB_SECRET`. No credentials are embedded in the site or image. The old workflow's destination must change to avoid competing image updates.

## Static hosting

Publish `dist/` to a static host such as Cloudflare Pages. `SITE_URL` sets the canonical origin at build time. `BASE_PATH` supports subpath hosting (for example `/slick-ge/`, including the trailing slash). The container serves from `/`; using a container subpath would require matching NGINX configuration. Redirects and response headers are configured by the host. GitHub Pages has commercial-use restrictions; check its policy before using it for this company website.

See [the brief](docs/website-brief.md) for the agreed scope.

## GitHub Pages deployment

Pushes to main also deploy the static site to GitHub Pages with `slick.ge` as its custom domain. See [DNS and HTTPS setup](docs/github-pages.md) for the records to configure.

## Languages and translation review

English is served directly at `/`, with the profile at `/about/` and service and guide pages under `/services/` and `/guides/`. Previous `/en/` URLs redirect to their corresponding unprefixed pages. The site uses a single English route set and self-hosted Latin fonts.

Content lives in `src/i18n/content.json`, keyed by stable, descriptive IDs such as `hero.title` and `services.automation.proof`. Edit the `en` value to change copy; keep the key unchanged. Components and `src/data/site.ts` reference these keys, and the `ContentId` type catches unknown keys during `npm run check`.

Translations and locale review tooling are not part of the production site.

## Font loading

`src/components/Fonts.astro` preloads the self-hosted Latin font files. `src/styles/fonts.css` uses `font-display: optional` so fonts arriving after first paint do not move visible content. On slow connections, the browser may keep the fallback font for that navigation; the downloaded font is available for subsequent visits. The browser suite delays font responses to verify stable layout on desktop and mobile.
