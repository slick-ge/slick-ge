import type { APIRoute } from 'astro';
import { indexablePaths } from '../lib/seo';
import { absoluteUrl } from '../lib/urls';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Set Astro site before generating the sitemap.');
  const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character]!);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map(path => `  <url><loc>${escapeXml(absoluteUrl(path, site))}</loc></url>`).join('\n')}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
