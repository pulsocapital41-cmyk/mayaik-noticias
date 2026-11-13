import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, SECTIONS } from '../config';

export const GET: APIRoute = async () => {
  const notas = (await getCollection('noticias')).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const fijas = [
    `<url><loc>${SITE.url}/</loc><changefreq>hourly</changefreq><priority>1.0</priority></url>`,
    ...SECTIONS.map((s) => `<url><loc>${SITE.url}/seccion/${s.slug}/</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`),
  ];
  const urls = notas.map(
    (a) => `  <url>
    <loc>${SITE.url}/noticias/${a.id}/</loc>
    <lastmod>${a.data.pubDate.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${fijas.join('\n  ')}
${urls.join('\n')}
</urlset>`;
  return new Response(xml.trim(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
