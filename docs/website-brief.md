# Slick website brief

Slick is Aleksandre Ghvineria's independent DevOps and automation consultancy for small software teams. Use Slick, not LLC, and first-person copy. Contact: Aleksandre.Ghvineria@slick.ge. No case studies, testimonials, customer logos, or unsupported metrics.

## Content and design

Hero, four services, working process, confirmed tool inventory, about, and email contact. Content lives in src/data/site.ts and src/pages/index.astro.

The user-supplied Neumorphism / Soft UI direction supersedes the earlier off-white/green proposal: cool grey #E0E5EC, translucent opposing shadows, violet accents, 32px cards, 16px controls, inset wells, self-hosted Plus Jakarta Sans and DM Sans. Shared tokens are in src/styles/tokens.css. Muted and functional accent colors are darkened for text contrast. Keyboard focus and forced-color outlines are accessibility exceptions to borderless styling. Motion respects reduced-motion preferences.

## Architecture and delivery

Astro static output, TypeScript, plain CSS, reusable Astro components, local content. Navigation is progressively enhanced; toolkit disclosures use native details/summary. No runtime Node.js, database, analytics, or third-party browser requests.

Docker Hub DOCKERHUB_USERNAME/slick-ge, linux/amd64 and linux/arm64, latest and full-commit-SHA tags. Follow the reference auth-slick-ge workflow: Bitwarden credentials, QEMU, Buildx, Docker Hub login, and GHA cache. User manages ingress and certificates. The other repository will change its image destination separately.

The container serves HTTP on 8080 as UID 101, supports a read-only root with writable /tmp, and exposes /healthz. Static dist output remains independently deployable. SITE_URL and BASE_PATH are build-time options for static hosting. The supplied container configuration serves at the domain root. Kubernetes resources are out of scope.
