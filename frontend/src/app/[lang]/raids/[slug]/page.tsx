import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import type { Language } from '@/data/translations';
import { pokemonRankings, getPokemonByIdOrSlug } from '@/data/pokemonRankings';
import { getPokemonName } from '@/utils/pokemonTranslator';

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

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; slug: string }[] = [];

  languages.forEach((lang) => {
    POPULAR_RAID_BOSSES.forEach((boss) => {
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/raids/${normalizedSlug}`,
        'en': `https://pogoevents.app/en/raids/${normalizedSlug}`,
        'ja': `https://pogoevents.app/ja/raids/${normalizedSlug}`,
        'ru': `https://pogoevents.app/ru/raids/${normalizedSlug}`,
      },
    },
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

  if (!matched && !POPULAR_RAID_BOSSES.some(b => rawSlug.includes(b))) {
    notFound();
  }

  const localizedName = matched ? getPokemonName(matched.name, lang) : bossName;
  const canonicalUrl = `https://pogoevents.app/${lang}/raids/${normalizedSlug}`;

  // Schema.org Guide & Breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${bossName} Raid Guide & Counters - Pokémon GO`,
        description: `How to defeat ${bossName} in Pokémon GO raids with optimal counters and movesets.`,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: 'Raid Bosses', item: `https://pogoevents.app/${lang}/raids` },
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
      <App initialLang={lang} initialTab="raid" initialPokemonSearch={bossName} />
    </>
  );
}
