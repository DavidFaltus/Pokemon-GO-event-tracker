import { API_BASE_URL } from '../config';
import { GUIDES_DATA } from '../data/guidesData';
import { POKEDEX_CATALOG } from '../data/pokedexCatalog';
import { raidCountersDb } from '../data/raidCounters';
import {
  CORE_SECTIONS,
  RANKING_CATEGORIES,
  POKEMON_TYPES,
  POPULAR_RAID_BOSSES,
  ROCKET_LEADERS,
} from '../data/sitemapConstants';

export const BASE_URL = 'https://pogoevents.app';
export const LANGUAGES = ['cs', 'en', 'ja', 'ru'] as const;

export { CORE_SECTIONS, RANKING_CATEGORIES, POKEMON_TYPES, POPULAR_RAID_BOSSES, ROCKET_LEADERS };

export interface SitemapUrlEntry {
  url: string;
  lastmod?: string | Date;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
}

export interface SubSitemapInfo {
  loc: string;
  lastmod?: string | Date;
}

interface SimpleEvent {
  eventID?: string;
  id?: string;
  name?: { cs?: string; en?: string } | string;
}

export function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export function formatIsoDate(date?: string | Date): string {
  if (!date) return new Date().toISOString();
  if (typeof date === 'string') {
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  }
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export function buildSitemapAlternates(baseUrl: string, pathSuffix: string) {
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

export function renderUrlEntry(entry: SitemapUrlEntry): string {
  const parts: string[] = ['  <url>'];
  parts.push(`    <loc>${escapeXml(entry.url)}</loc>`);
  if (entry.lastmod) {
    parts.push(`    <lastmod>${formatIsoDate(entry.lastmod)}</lastmod>`);
  }
  if (entry.changefreq) {
    parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  }
  if (typeof entry.priority === 'number') {
    parts.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
  }
  if (entry.alternates?.languages) {
    for (const [lang, href] of Object.entries(entry.alternates.languages)) {
      parts.push(`    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(href)}"/>`);
    }
  }
  parts.push('  </url>');
  return parts.join('\n');
}

export function renderUrlsetXml(entries: SitemapUrlEntry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(renderUrlEntry).join('\n')}
</urlset>`;
}

export function renderSitemapIndexXml(subSitemaps: SubSitemapInfo[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subSitemaps
  .map(
    (s) => `  <sitemap>
    <loc>${escapeXml(s.loc)}</loc>
    <lastmod>${formatIsoDate(s.lastmod)}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;
}

export function getSitemapIndexXml(lastmod: Date = new Date()): string {
  return renderSitemapIndexXml([
    { loc: `${BASE_URL}/sitemap-core.xml`, lastmod },
    { loc: `${BASE_URL}/sitemap-pokedex.xml`, lastmod },
    { loc: `${BASE_URL}/sitemap-guides.xml`, lastmod },
    { loc: `${BASE_URL}/sitemap-events.xml`, lastmod },
    { loc: `${BASE_URL}/sitemap-raids-rocket.xml`, lastmod },
  ]);
}

export function getCoreSitemapXml(now: Date = new Date()): string {
  const entries: SitemapUrlEntry[] = [];

  LANGUAGES.forEach((lang) => {
    CORE_SECTIONS.forEach((sec) => {
      entries.push({
        url: `${BASE_URL}/${lang}${sec.path}`,
        lastmod: now,
        changefreq: sec.changeFrequency,
        priority: sec.priority,
        alternates: buildSitemapAlternates(BASE_URL, sec.path),
      });
    });
  });

  return renderUrlsetXml(entries);
}

export function getPokedexSitemapXml(now: Date = new Date()): string {
  const entries: SitemapUrlEntry[] = [];

  LANGUAGES.forEach((lang) => {
    POKEDEX_CATALOG.forEach((poke) => {
      const suffix = `/pokedex/${poke.slug}`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: poke.isReleasedInGo ? 0.8 : 0.6,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });
  });

  return renderUrlsetXml(entries);
}

export async function getGuidesSitemapXml(now: Date = new Date()): Promise<string> {
  let allGuides = GUIDES_DATA;

  try {
    const guidesRes = await fetch(`${API_BASE_URL}/api/guides`, { next: { revalidate: 3600 } });
    if (guidesRes.ok) {
      const gData = await guidesRes.json();
      if (Array.isArray(gData) && gData.length > 0) {
        allGuides = gData;
      }
    }
  } catch {
    // fallback to GUIDES_DATA
  }

  const entries: SitemapUrlEntry[] = [];

  LANGUAGES.forEach((lang) => {
    allGuides.forEach((guide) => {
      const suffix = `/guides/${guide.slug}`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: guide.updatedAt ? new Date(`${guide.updatedAt}T12:00:00Z`) : now,
        changefreq: 'weekly',
        priority: 0.85,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });
  });

  return renderUrlsetXml(entries);
}

export async function getEventsSitemapXml(now: Date = new Date()): Promise<string> {
  let eventSlugs: string[] = [];

  const eventSources = [
    `${API_BASE_URL}/api/events`,
    'https://pogo-tracker-backend-1084389140873.europe-west3.run.app/api/events',
    'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/events.min.json',
    'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data/events.min.json',
    'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json',
  ];

  for (const src of eventSources) {
    try {
      const res = await fetch(src, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const events: SimpleEvent[] = data.events || data || [];
        const foundSlugs = events.map((e) => e.eventID || e.id || '').filter(Boolean);
        if (foundSlugs.length > 0) {
          eventSlugs = Array.from(new Set(foundSlugs));
          break;
        }
      }
    } catch {
      // Continue to next mirror
    }
  }

  const entries: SitemapUrlEntry[] = [];

  LANGUAGES.forEach((lang) => {
    eventSlugs.forEach((slug) => {
      const suffix = `/events/${slug}`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.75,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });
  });

  return renderUrlsetXml(entries);
}

export function getRaidsRocketSitemapXml(now: Date = new Date()): string {
  const ALL_RAID_SLUGS = Array.from(
    new Set([
      ...POPULAR_RAID_BOSSES,
      ...Object.keys(raidCountersDb).map((name) =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      ),
    ])
  );

  const entries: SitemapUrlEntry[] = [];

  LANGUAGES.forEach((lang) => {
    // 1. Dedicated Rankings Subpages
    RANKING_CATEGORIES.forEach((category) => {
      const suffix = `/rankings/${category}`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });

    // 2. Type Matchup Subpages
    POKEMON_TYPES.forEach((type) => {
      const suffix = `/types/${type}`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.75,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });

    // 3. Raid Boss Counter Subpages
    ALL_RAID_SLUGS.forEach((boss) => {
      const suffix = `/raids/${boss}-counters`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });

    // 4. Rocket Leader Subpages
    ROCKET_LEADERS.forEach((leader) => {
      const suffix = `/rocket/${leader}`;
      entries.push({
        url: `${BASE_URL}/${lang}${suffix}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: 0.8,
        alternates: buildSitemapAlternates(BASE_URL, suffix),
      });
    });
  });

  return renderUrlsetXml(entries);
}
