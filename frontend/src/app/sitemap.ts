import { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/config';

export const dynamic = 'force-static';

interface SimpleEvent {
  eventID?: string;
  id?: string;
  name?: { cs?: string; en?: string } | string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pogoevents.app';
  const languages = ['cs', 'en', 'ja', 'ru'];

  let eventSlugs: string[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      const events: SimpleEvent[] = data.events || data || [];
      eventSlugs = events.map((e) => e.eventID || e.id || '').filter(Boolean);
    }
  } catch (e) {
    console.error('Sitemap fetch failed:', e);
  }

  const routes: MetadataRoute.Sitemap = [];

  // Static section URLs for each language
  languages.forEach((lang) => {
    routes.push(
      {
        url: `${baseUrl}/${lang}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${lang}/raids`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/${lang}/rocket`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }
    );

    // Event detail pages
    eventSlugs.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/${lang}/events/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  return routes;
}
