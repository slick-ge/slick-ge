import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('landing page is accessible, responsive, and functional', async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
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
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.screenshot({ path: `test-results/landing-${isMobile ? 'mobile' : 'desktop'}.png`, fullPage: true });
});

test('content remains navigable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Services' })).toBeVisible();
  await context.close();
});
