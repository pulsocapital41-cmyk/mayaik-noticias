import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export const GET: APIRoute = async () => {
  const notas = (await getCollection('noticias')).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const items = notas
    .map(
      (a) => `
    <item>
      <title><![CDATA[${a.data.title}]]></title>
      <link>${SITE.url}/noticias/${a.id}/</link>
      <guid>${SITE.url}/noticias/${a.id}/</guid>
      <description><![CDATA[${a.data.excerpt || a.data.subtitle || ''}]]></description>
      <pubDate>${a.data.pubDate.toUTCString()}</pubDate>
      <category><![CDATA[${a.data.category}]]></category>
    </item>`
    )
    .join('');
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>es-MX</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;
  return new Response(rss, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
