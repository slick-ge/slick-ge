import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('landing page is accessible, responsive, and functional', async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/en/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Less manual work');
  await expect(page.getByRole('link', { name: 'Let’s simplify your setup' })).toHaveAttribute('href', 'mailto:Aleksandre.Ghvineria@slick.ge');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  if (isMobile) {
    const menu = page.locator('.menu-toggle');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Toolkit' }).click();
  await expect(page).toHaveURL(/#tools$/);
  const group = page.locator('details').filter({ hasText: 'Security & secrets' });
  await group.locator('summary').click();
  await expect(group).toHaveAttribute('open', '');
  await expect(group.getByText('CodeQL', { exact: true })).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.goto('/en/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.screenshot({ path: `test-results/landing-${isMobile ? 'mobile' : 'desktop'}.png`, fullPage: true });
});

test('content remains navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/en/');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Services' })).toBeVisible();
  await context.close();
});


test('English is the default and switching language preserves the section', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Less manual work.');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://slick.ge/en/');
  await expect(page.locator('link[hreflang="ka"]')).toHaveAttribute('href', 'https://slick.ge/ka/');
  await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('aria-current', 'page');
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}px`).toBe(true);
  }
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  await page.goto('/en/#about');
  await page.getByRole('link', { name: 'ქართული', exact: true }).click();
  await expect(page).toHaveURL('/ka/#about');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ka');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL('/en/#about');
  await page.goto('/en/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'test-results/georgian-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'test-results/georgian-mobile.png', fullPage: true });
});

test('language switching works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await page.getByRole('link', { name: 'ქართული', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ka');
  await expect(page).toHaveURL('http://127.0.0.1:4321/ka/');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL('http://127.0.0.1:4321/en/');
  await context.close();
});
