import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const contentPaths = [
  '/', '/about/',
  '/services/ci-cd/', '/services/code-secrets-security/',
  '/services/workflow-automation/', '/services/cloud-infrastructure/',
  '/guides/ci-cd-handover-checklist/',
];

test('previous English URLs redirect to the unprefixed pages', async ({ page }) => {
  for (const path of contentPaths) {
    await page.goto(`/en${path}`);
    await expect(page).toHaveURL(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://slick.ge${path}`);
  }
});

for (const path of contentPaths.filter(path => path !== '/')) {
  test(`${path} has accessible content and accurate page metadata`, async ({ page, isMobile }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://slick.ge${path}`);
    await expect(page.locator('link[hreflang]')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThan(40);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description!);
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())['@graph'];
    const webPage = graph.find((item: { '@id': string }) => item['@id'] === `https://slick.ge${path}#webpage`);
    expect(webPage.url).toBe(`https://slick.ge${path}`);
    expect(webPage.name).toBe(await page.title());
    const breadcrumb = graph.find((item: { '@type': string }) => item['@type'] === 'BreadcrumbList');
    expect(breadcrumb.itemListElement.at(-1).item).toBe(webPage.url);
    const visibleCrumb = page.getByRole('navigation', { name: 'Breadcrumb' }).locator('[aria-current="page"]');
    await expect(visibleCrumb).toHaveText(breadcrumb.itemListElement.at(-1).name);
    if (path.includes('/services/')) {
      const service = graph.find((item: { '@type': string }) => item['@type'] === 'Service');
      expect(service.url).toBe(webPage.url);
      expect(webPage.mainEntity['@id']).toBe(service['@id']);
      expect(service).not.toHaveProperty('offers');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
    if (path === '/about/' || path === '/services/ci-cd/' || path.includes('/guides/')) {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.screenshot({ path: `test-results/${path.split('/').filter(Boolean).join('-')}-${isMobile ? 'mobile' : 'desktop'}.png`, fullPage: true });
    }
  });
}

test('sitemap, no-JS links and first-party assets describe a complete crawlable site', async ({ browser, request, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'The HTTP crawl is viewport-independent.');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(sitemap.headers()['content-type']).toContain('xml');
  const locations = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  expect(locations.sort()).toEqual(contentPaths.map(path => `https://slick.ge${path}`).sort());
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://slick.ge/sitemap.xml');

  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const page = await context.newPage();
  const targets = new Set<string>();
  const ids = new Map<string, string[]>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of contentPaths) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(descriptions.has(description!)).toBe(false);
    descriptions.add(description!);
    const data = await page.evaluate(() => ({
      ids: [...document.querySelectorAll('[id]')].map(element => element.id),
      links: [...document.querySelectorAll<HTMLAnchorElement>('a[href]')].map(link => link.href).filter(href => href.startsWith(location.origin)),
      resources: [...document.querySelectorAll<HTMLImageElement | HTMLLinkElement>('img[src], link[rel="stylesheet"], link[as="font"]')].map(element => element instanceof HTMLImageElement ? element.src : element.href),
    }));
    ids.set(path, data.ids);
    for (const url of data.links) targets.add(url);
    for (const url of data.resources) {
      expect(new URL(url).origin).toBe(new URL(baseURL!).origin);
      targets.add(url);
    }
  }
  for (const target of targets) {
    const url = new URL(target);
    if (url.hash) expect(ids.get(url.pathname), target).toContain(decodeURIComponent(url.hash.slice(1)));
    url.hash = '';
    expect((await request.get(url.href)).status(), target).toBe(200);
  }
  const privateLink = await request.get('/about/');
  expect(await privateLink.text()).not.toContain('https://github.com/slick-ge/secret-santa-backend');
  await context.close();
});

test('error pages are excluded and tracking parameters retain the clean canonical', async ({ page, request }) => {
  const response = await page.goto('/not-a-real-service/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  const errorFile = await request.get('/404.html');
  expect(await errorFile.text()).toContain('noindex, follow');
  await page.goto('/services/ci-cd/?utm_source=verification');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://slick.ge/services/ci-cd/');
});

test('contact intent hook preserves email navigation and excludes personal data', async ({ page }) => {
  await page.goto('/services/ci-cd/?utm_source=private-campaign');
  const result = await page.evaluate(() => {
    let detail: unknown;
    window.addEventListener('slick:contact-intent', event => { detail = (event as CustomEvent).detail; }, { once: true });
    const link = document.querySelector<HTMLAnchorElement>('#contact a[href^="mailto:"]')!;
    // Prevent only this test's external mail application launch, after the site listener runs.
    let defaultWasPrevented = false;
    document.addEventListener('click', event => { defaultWasPrevented = event.defaultPrevented; event.preventDefault(); }, { once: true });
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    return { detail, defaultWasPrevented, href: link.getAttribute('href') };
  });
  expect(result.defaultWasPrevented).toBe(false);
  expect(result.href).toMatch(/^mailto:Aleksandre.Ghvineria@slick.ge/);
  expect(result.detail).toEqual({ name: 'contact_email_click', page: '/services/ci-cd/', location: 'contact' });
});

test('handover checklist download includes the same actionable checks as the guide', async ({ page, request }) => {
  await page.goto('/guides/ci-cd-handover-checklist/');
  const response = await request.get('/ci-cd-handover-checklist.md');
  expect(response.status()).toBe(200);
  const markdown = await response.text();
  const checks = await page.locator('.editorial-section[id] .editorial-list li').allTextContents();
  expect(checks.length).toBeGreaterThan(20);
  for (const check of checks) expect(markdown).toContain(`- [ ] ${check}`);
  expect(markdown).not.toContain('undefined');
});
