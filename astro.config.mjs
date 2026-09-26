import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://slick.ge',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 150,
      },
    },
  },
});
