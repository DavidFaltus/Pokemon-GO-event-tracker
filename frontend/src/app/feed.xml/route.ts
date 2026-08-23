import { API_BASE_URL } from '@/config';

export const dynamic = 'force-static';
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const baseUrl = 'https://pogoevents.app';
  let events: any[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, { next: { revalidate: 3600 } });
    if (res.ok) {
      events = await res.json();
    }
  } catch (err) {
    console.warn('[RSS Feed] Error fetching events:', err);
  }

  const now = new Date().toUTCString();

  const itemsXml = events.slice(0, 30).map((event) => {
    const title = typeof event.name === 'object' ? (event.name.cs || event.name.en || event.heading) : (event.name || event.heading || 'Pokémon GO Event');
    const slug = event.eventID || event.id || '';
    const link = `${baseUrl}/cs/events/${slug}`;
    const pubDate = event.start ? new Date(event.start).toUTCString() : now;
    const desc = event.heading || (typeof event.name === 'object' ? event.name.en : title);
    const category = event.eventType || 'Event';

    return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(desc)}</description>
      <category>${escapeXml(category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pokémon GO Event Tracker - Live Události</title>
    <link>${baseUrl}/cs</link>
    <description>Aktuální a nadcházející události, Community Days, Raid Hours a bonusy v Pokémon GO.</description>
    <language>cs</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
