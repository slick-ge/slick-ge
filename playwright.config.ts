import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4327' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  // Always test this build, never an unrelated development server on Astro's default port.
  webServer: { command: 'astro preview --host 127.0.0.1 --port 4327 --ignore-lock', url: 'http://127.0.0.1:4327', reuseExistingServer: false },
});
