import type { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/config';
import { GUIDES_DATA } from '@/data/guidesData';
import { ALL_POKEDEX_IDS } from '@/data/pokemonRankings';
import { RANKING_CATEGORIES } from '@/app/[lang]/rankings/[category]/page';
import { POKEMON_TYPES } from '@/app/[lang]/types/[type]/page';
import { POPULAR_RAID_BOSSES } from '@/app/[lang]/raids/[slug]/page';
import { ROCKET_LEADERS } from '@/app/[lang]/rocket/[leader]/page';

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
    console.warn('Sitemap fetch failed, using fallback:', e);
  }

  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();

  languages.forEach((lang) => {
    // 1. Core Section Pages
    const sections = [
      { path: '', priority: 1.0, changeFrequency: 'hourly' as const },
      { path: '/events', priority: 0.95, changeFrequency: 'hourly' as const },
      { path: '/raids', priority: 0.9, changeFrequency: 'daily' as const },
      { path: '/rankings', priority: 0.9, changeFrequency: 'daily' as const },
      { path: '/rocket', priority: 0.9, changeFrequency: 'daily' as const },
      { path: '/guides', priority: 0.85, changeFrequency: 'weekly' as const },
      { path: '/ditto', priority: 0.8, changeFrequency: 'daily' as const },
      { path: '/eggs', priority: 0.8, changeFrequency: 'daily' as const },
      { path: '/filter', priority: 0.8, changeFrequency: 'weekly' as const },
      { path: '/download', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    sections.forEach((sec) => {
      routes.push({
        url: `${baseUrl}/${lang}${sec.path}`,
        lastModified: now,
        changeFrequency: sec.changeFrequency,
        priority: sec.priority,
      });
    });

    // 2. Guide Detail Pages
    GUIDES_DATA.forEach((guide) => {
      routes.push({
        url: `${baseUrl}/${lang}/guides/${guide.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });

    // 3. Event Detail Pages
    eventSlugs.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/${lang}/events/${slug}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.75,
      });
    });

    // 4. Dedicated Rankings Subpages
    RANKING_CATEGORIES.forEach((category) => {
      routes.push({
        url: `${baseUrl}/${lang}/rankings/${category}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // 5. Type Matchup Subpages
    POKEMON_TYPES.forEach((type) => {
      routes.push({
        url: `${baseUrl}/${lang}/types/${type}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    });

    // 6. Raid Boss Counter Subpages
    POPULAR_RAID_BOSSES.forEach((boss) => {
      routes.push({
        url: `${baseUrl}/${lang}/raids/${boss}-counters`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // 7. Rocket Leader Subpages
    ROCKET_LEADERS.forEach((leader) => {
      routes.push({
        url: `${baseUrl}/${lang}/rocket/${leader}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // 8. Full National Pokédex Pages (#1 to #1025)
    ALL_POKEDEX_IDS.forEach((id) => {
      routes.push({
        url: `${baseUrl}/${lang}/pokemon/${id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return routes;
}
