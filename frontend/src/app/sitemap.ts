import type { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/config';
import { GUIDES_DATA } from '@/data/guidesData';
import { ALL_POKEDEX_IDS } from '@/data/pokemonRankings';
import { raidCountersDb } from '@/data/raidCounters';
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

const ALL_RAID_SLUGS = Array.from(
  new Set([
    ...POPULAR_RAID_BOSSES,
    ...Object.keys(raidCountersDb).map((name) =>
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    ),
  ])
);

function buildSitemapAlternates(baseUrl: string, pathSuffix: string) {
  const cleanSuffix = pathSuffix ? (pathSuffix.startsWith('/') ? pathSuffix : `/${pathSuffix}`) : '';
  return {
    languages: {
      cs: `${baseUrl}/cs${cleanSuffix}`,
      en: `${baseUrl}/en${cleanSuffix}`,
      ja: `${baseUrl}/ja${cleanSuffix}`,
      ru: `${baseUrl}/ru${cleanSuffix}`,
      'x-default': `${baseUrl}/en${cleanSuffix}`,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pogoevents.app';
  const languages = ['cs', 'en', 'ja', 'ru'] as const;

  let eventSlugs: string[] = [];

  const eventSources = [
    `${API_BASE_URL}/api/events`,
    'https://pogo-tracker-backend-1084389140873.europe-west3.run.app/api/events',
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/events.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/events.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json'
  ];

  for (const src of eventSources) {
    try {
      const res = await fetch(src, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const events: SimpleEvent[] = data.events || data || [];
        const foundSlugs = events.map((e) => e.eventID || e.id || '').filter(Boolean);
        if (foundSlugs.length > 0) {
          eventSlugs = foundSlugs;
          break;
        }
      }
    } catch {
      // Continue to next mirror
    }
  }

  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();

  languages.forEach((lang) => {
    // 1. Core Section Pages (only canonical 200 OK routes — no 404s or redirects)
    const sections = [
      { path: '', priority: 1.0, changeFrequency: 'hourly' as const },
      { path: '/friends', priority: 0.92, changeFrequency: 'daily' as const },
      { path: '/raids', priority: 0.9, changeFrequency: 'daily' as const },
      { path: '/rankings', priority: 0.9, changeFrequency: 'daily' as const },
      { path: '/rocket', priority: 0.9, changeFrequency: 'daily' as const },
      { path: '/guides', priority: 0.88, changeFrequency: 'weekly' as const },
      { path: '/filter', priority: 0.8, changeFrequency: 'weekly' as const },
      { path: '/download', priority: 0.7, changeFrequency: 'monthly' as const },
      { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
      { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
    ];

    sections.forEach((sec) => {
      routes.push({
        url: `${baseUrl}/${lang}${sec.path}`,
        lastModified: now,
        changeFrequency: sec.changeFrequency,
        priority: sec.priority,
        alternates: buildSitemapAlternates(baseUrl, sec.path),
      });
    });

    // 2. Guide Detail Pages
    GUIDES_DATA.forEach((guide) => {
      const suffix = `/guides/${guide.slug}`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: guide.updatedAt ? new Date(`${guide.updatedAt}T12:00:00Z`) : now,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });

    // 3. Event Detail Pages
    eventSlugs.forEach((slug) => {
      const suffix = `/events/${slug}`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: now,
        changeFrequency: 'daily',
        priority: 0.75,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });

    // 4. Dedicated Rankings Subpages
    RANKING_CATEGORIES.forEach((category) => {
      const suffix = `/rankings/${category}`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });

    // 5. Type Matchup Subpages
    POKEMON_TYPES.forEach((type) => {
      const suffix = `/types/${type}`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });

    // 6. Raid Boss Counter Subpages
    ALL_RAID_SLUGS.forEach((boss) => {
      const suffix = `/raids/${boss}-counters`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });

    // 7. Rocket Leader Subpages
    ROCKET_LEADERS.forEach((leader) => {
      const suffix = `/rocket/${leader}`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });

    // 8. Full National Pokédex Pages (#1 to #1025)
    ALL_POKEDEX_IDS.forEach((id) => {
      const suffix = `/pokemon/${id}`;
      routes.push({
        url: `${baseUrl}/${lang}${suffix}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: buildSitemapAlternates(baseUrl, suffix),
      });
    });
  });

  return routes;
}
