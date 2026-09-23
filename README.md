# Slick

Static landing website for Aleksandre Ghvineria's DevOps and automation consultancy. Astro, TypeScript, and a shared Soft UI design system.

## Develop

Use Node 24 (see .nvmrc).

```sh
npm ci
npm run dev
```

Open http://localhost:4321. Shared page sections live in `src/components/LandingPage.astro`, tools and service copy in `src/data/site.ts`, and Georgian translations in `src/i18n/ka.json`. Design tokens live in `src/styles/tokens.css`.

## Validate

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

Browser checks cover desktop/mobile overflow, navigation, email links, disclosures, JavaScript-free navigation, and automated accessibility. `dist/` is the deployable static site, including self-hosted fonts.

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

Georgian is the default at `/`; English is at `/en/`. The header switcher uses ordinary links, with optional JavaScript to preserve the current section. Each version has its own canonical URL, language metadata, and hreflang links. Both versions use the same Astro components. Georgian uses self-hosted Noto Sans Georgian.

During `npm run dev`, open `/translations` for the full Georgian/English side-by-side review. That route is excluded from production builds. Run `npm run translations:review` after editing translations to refresh `docs/translations.md`. Missing Georgian translations fail the build rather than silently showing English.
