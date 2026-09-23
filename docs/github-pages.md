# GitHub Pages and slick.ge

GitHub Pages uses the custom Actions workflow in `.github/workflows/deploy-pages.yaml`. The site is built at the domain root with `https://slick.ge` as the canonical origin. The custom domain is configured in repository Settings → Pages; a CNAME file is not needed for an Actions deployment.

## DNS

Configure these records with your DNS provider:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | slick-ge.github.io |

The www record is optional; GitHub redirects it to slick.ge. Replace conflicting web records at these names; preserve mail records and unrelated subdomains. Remove obsolete apex AAAA records, or replace them with all four GitHub IPv6 addresses: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

With Cloudflare, start with DNS-only records (proxy disabled) so GitHub can validate the domain and issue its certificate. After DNS validates and the certificate becomes available, enable Enforce HTTPS in repository Settings → Pages. Certificate provisioning can take time after DNS propagation.

Official reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
