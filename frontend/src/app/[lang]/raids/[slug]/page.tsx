import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RaidView } from '@/components/RaidView';
import type { Language } from '@/data/translations';
import { pokemonRankings, getPokemonByIdOrSlug } from '@/data/pokemonRankings';
import { raidCountersDb } from '@/data/raidCounters';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from '@/utils/pokemonCountersHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

export const revalidate = 3600;

export const POPULAR_RAID_BOSSES = [
  'kyurem', 'shadow-palkia', 'mega-aggron', 'rayquaza', 'mewtwo', 'mega-lucario',
  'groudon', 'kyogre', 'dialga', 'palkia', 'giratina', 'heatran', 'regigigas',
  'zekrom', 'reshiram', 'xerneas', 'yveltal', 'necrozma', 'solgaleo', 'lunala',
  'mega-rayquaza', 'mega-garchomp', 'mega-tyranitar', 'mega-salamence', 'mega-gardevoir',
  'mega-charizard-y', 'mega-blastoise', 'mega-venusaur', 'shadow-mewtwo', 'shadow-raikou',
  'shadow-entei', 'shadow-suicune', 'shadow-moltres', 'shadow-zapdos', 'shadow-articuno',
  'shadow-kyogre', 'shadow-groudon', 'shadow-ho-oh', 'shadow-lugia', 'shadow-cresselia',
  'primal-groudon', 'primal-kyogre', 'zacian', 'zamazenta', 'eternatus', 'urshifu',
  'calyrex', 'koraidon', 'miraidon', 'terapagos', 'pecharunt'
];

const ALL_RAID_SLUGS = Array.from(
  new Set([
    ...POPULAR_RAID_BOSSES,
    ...Object.keys(raidCountersDb).map((name) =>
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    ),
  ])
);

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; slug: string }[] = [];

  languages.forEach((lang) => {
    ALL_RAID_SLUGS.forEach((boss) => {
      params.push({ lang, slug: `${boss}-counters` });
      params.push({ lang, slug: boss });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; slug: string }>;
}

function cleanBossName(slug: string): string {
  return slug
    .replace(/-counters$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const rawSlug = unwrapped.slug.toLowerCase();
  const normalizedSlug = rawSlug.endsWith('-counters') ? rawSlug : `${rawSlug}-counters`;
  const bossName = cleanBossName(rawSlug);
  const matched = getPokemonByIdOrSlug(bossName.replace(/shadow|mega|primal/gi, '').trim());

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;

  const titleByLang: Record<Language, string> = {
    cs: `${localizedName} Raid Counters & Slabosti | Pokémon GO`,
    en: `${bossName} Raid Counters, Weaknesses & Strategy | Pokémon GO`,
    ja: `${localizedName} レイド対策・弱点とおすすめポケモン | Pokémon GO`,
    ru: `${bossName} - Лучшие контр-покемоны и слабости в рейдах | Pokémon GO`,
  };

  const descByLang: Record<Language, string> = {
    cs: `Kompletní průvodce a nejlepší counters pro raid bosse ${localizedName} v Pokémon GO. Slabosti, Mega evoluce, 100% IV CP hodnoty a duo/trio obtížnost.`,
    en: `Complete raid guide and top counters for ${bossName} in Pokémon GO. Type weaknesses, best Mega & Shadow counters, 100% IV CP chart, and raid difficulty.`,
    ja: `Pokémon GOの${localizedName}レイドバトル対策ガイド。弱点タイプ、おすすめメガシンカ、100% IV CP値と討伐人数。`,
    ru: `Полный гайд и лучшие контр-покемоны для рейда против ${bossName} в Pokémon GO. Уязвимости, CP со 100% IV и тактика.`,
  };

  return {
    title: titleByLang[lang] || titleByLang.en,
    description: descByLang[lang] || descByLang.en,
    keywords: [
      `${bossName} counters`,
      `${bossName} raid guide`,
      `${bossName} pokemon go`,
      `${bossName} weaknesses`,
      `${bossName} 100 iv cp`,
    ],
    alternates: buildAlternates(lang, `/raids/${normalizedSlug}`, 'https://pogoevents.app/api/agent/raids.md'),
    openGraph: {
      title: titleByLang[lang] || titleByLang.en,
      description: descByLang[lang] || descByLang.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: bossName }]
    }
  };
}

export default async function RaidBossCounterPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const rawSlug = unwrapped.slug.toLowerCase();
  const normalizedSlug = rawSlug.endsWith('-counters') ? rawSlug : `${rawSlug}-counters`;
  const bossName = cleanBossName(rawSlug);
  const matched = getPokemonByIdOrSlug(bossName.replace(/shadow|mega|primal/gi, '').trim());
  const dbKey = Object.keys(raidCountersDb).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === rawSlug.replace(/-counters$/i, '')
  );
  const dbCounters = dbKey ? raidCountersDb[dbKey] : undefined;

  if (!matched && !dbCounters && !ALL_RAID_SLUGS.some(b => rawSlug.includes(b))) {
    notFound();
  }

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;
  const types = matched?.types || ['Normal'];
  const weaknesses = dbCounters?.weaknesses?.length
    ? dbCounters.weaknesses
    : getCounterTypes(types).map((w) => `${w.type} (${w.label})`);
  const computedCounters = matched ? getTopCountersForPokemon(matched, pokemonRankings).slice(0, 6) : [];
  const countersList = computedCounters.length > 0
    ? computedCounters.map((c) => ({
        name: c.pokemon.name,
        fastMove: c.pokemon.bestFastMove.name,
        chargedMove: c.pokemon.bestChargedMove.name,
      }))
    : (dbCounters?.advancedCounters || []).slice(0, 6).map((entry) => {
        const match = entry.match(/^([^(]+)\(([^)]+)\)$/);
        return {
          name: match ? match[1].trim() : entry,
          fastMove: 'Optimal Fast',
          chargedMove: match ? match[2].trim() : 'Optimal Charged',
        };
      });

  const lv20MaxCp = dbCounters?.maxCp
    ?? (matched ? Math.floor(((matched.attack + 15) * Math.sqrt(matched.defense + 15) * Math.sqrt(matched.stamina + 15) * (0.5974 * 0.5974)) / 10) : null);
  const lv25MaxCp = dbCounters?.maxBoostedCp
    ?? (matched ? Math.floor(((matched.attack + 15) * Math.sqrt(matched.defense + 15) * Math.sqrt(matched.stamina + 15) * (0.667934 * 0.667934)) / 10) : null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${bossName} Raid Guide & Counters - Pokémon GO`,
        description: `How to defeat ${bossName} in Pokémon GO raids with optimal counters (${countersList.slice(0, 3).map((c) => c.name).join(', ')}) and 100% IV CP chart.`,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        author: { '@type': 'Organization', name: 'PoGo Events Tracker', url: 'https://pogoevents.app' },
        publisher: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          logo: { '@type': 'ImageObject', url: 'https://pogoevents.app/logo-icon-1080.png' },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: lang === 'cs' ? `Jaké jsou nejlepší counters na ${localizedName} v Pokémon GO?` : `What are the best raid counters for ${bossName} in Pokémon GO?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${bossName} (${types.join('/')}) is weak to ${weaknesses.join(', ')} attacks. The top raid counters are ${countersList.map((c) => `${c.name} (${c.fastMove} + ${c.chargedMove})`).join(', ')}.`,
            },
          },
          ...(lv20MaxCp && lv25MaxCp
            ? [
                {
                  '@type': 'Question',
                  name: lang === 'cs' ? `Jaké je 100% IV (Hundo) CP pro ${localizedName} z raidu?` : `What is the 100% IV Hundo CP for ${bossName} in raids?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `100% IV ${bossName} has ${lv20MaxCp} CP at Level 20 (normal catch) and ${lv25MaxCp} CP at Level 25 (weather boosted).`,
                  },
                },
              ]
            : []),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('raids', lang), item: `https://pogoevents.app/${lang}/raids` },
          { '@type': 'ListItem', position: 3, name: `${localizedName} Counters`, item: canonicalUrl }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className="seo-entity-summary card"
        style={{
          marginBottom: '20px',
          padding: '18px 22px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          {lang === 'cs'
            ? `${localizedName} – Rychlý přehled slabostí, 100% IV CP a Top Counterů`
            : lang === 'ja'
              ? `${localizedName} レイド対策・弱点・100% IV CP 早見表`
              : lang === 'ru'
                ? `${bossName} – Слабости, 100% IV CP и лучшие контр-покемоны`
                : `${bossName} Raid Guide – Weaknesses, 100% IV CP & Top Counters`}
        </h2>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>{lang === 'cs' ? 'Typ:' : 'Type:'}</strong> {types.join(' / ')} |{' '}
          <strong>{lang === 'cs' ? 'Slabosti (Counter typy):' : 'Weaknesses:'}</strong> {weaknesses.join(', ')}
          {lv20MaxCp && lv25MaxCp ? (
            <>
              {' '}| <strong>100% IV CP (Lv 20):</strong> {lv20MaxCp} CP | <strong>100% IV Weather Boost (Lv 25):</strong> {lv25MaxCp} CP
            </>
          ) : null}
        </p>
        {countersList.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '6px 8px' }}>#</th>
                  <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Counter Pokémon' : 'Counter Pokémon'}</th>
                  <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Rychlý útok (Fast Move)' : 'Fast Move'}</th>
                  <th style={{ padding: '6px 8px' }}>{lang === 'cs' ? 'Nabíjecí útok (Charged Move)' : 'Charged Move'}</th>
                </tr>
              </thead>
              <tbody>
                {countersList.map((c, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{idx + 1}</td>
                    <td style={{ padding: '6px 8px', fontWeight: 700 }}>{getPokemonName(c.name, lang)}</td>
                    <td style={{ padding: '6px 8px' }}>{c.fastMove}</td>
                    <td style={{ padding: '6px 8px' }}>{c.chargedMove}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
      <RaidView lang={lang} initialExpandedBoss={dbKey || bossName} />
    </>
  );
}
