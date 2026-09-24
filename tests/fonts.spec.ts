import { test, expect } from '@playwright/test';

for (const path of ['/', '/en/']) {
  test(`late fonts do not move visible content on ${path}`, async ({ page }) => {
    // Hold every font past first paint to simulate a cold, slow connection.
    let releaseFonts!: () => void;
    const fontGate = new Promise<void>(resolve => { releaseFonts = resolve; });
    const fontRequests: string[] = [];
    await page.route('**/*.woff2', async route => {
      fontRequests.push(route.request().url());
      await fontGate;
      await route.continue();
    });
    try {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('h1')).toBeVisible();
      // Let the font display period and navigation enhancement settle.
      await page.waitForTimeout(350);
      const elements = page.locator('.hero h1, .hero-description, .hero-actions, .specialties');
      const before = await elements.evaluateAll(nodes => nodes.map(node => {
        const { x, y, width, height } = node.getBoundingClientRect();
        return { x, y, width, height };
      }));
      releaseFonts();
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      const after = await elements.evaluateAll(nodes => nodes.map(node => {
        const { x, y, width, height } = node.getBoundingClientRect();
        return { x, y, width, height };
      }));
      expect(fontRequests.length).toBeGreaterThan(0);
      for (let index = 0; index < before.length; index++) {
        for (const dimension of ['x', 'y', 'width', 'height'] as const) {
          expect(Math.abs(after[index][dimension] - before[index][dimension]), `${path} element ${index} ${dimension}`).toBeLessThanOrEqual(1);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    } finally {
      releaseFonts();
    }
  });
}
