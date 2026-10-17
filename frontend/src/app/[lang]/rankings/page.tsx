import type { Metadata } from 'next';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
import type { Language } from '@/data/translations';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

export const revalidate = 300;

export function generateStaticParams() {
  return [
    { lang: 'cs' },
    { lang: 'en' },
    { lang: 'ja' },
    { lang: 'ru' },
  ];
}

interface PageProps {
  params: Promise<{ lang: Language }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/rankings`;

  const titles: Record<Language, string> = {
    cs: 'PvP & PvE Žebříčky Pokémonů | Pokémon GO Event Tracker',
    en: 'PvP & PvE Pokémon Rankings & IV Chart | Pokémon GO Event Tracker',
    ja: '最強ポケモンランキング & 個体値表 | Pokémon GO',
    ru: 'Рейтинг покемонов PvP & PvE | Pokémon GO',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Žebříčky PvP Pokémonů (Great, Ultra, Master League), nejlepší útočníci do raidů podle ER/DPS a tabulka 100% IV CP hodnot.',
    en: 'PvP Pokémon rankings for Great League, Ultra League, Master League, top raid attackers ranked by ER/DPS, and 100% IV CP charts.',
    ja: 'スーパー・ハイパー・マスターリーグの最強ポケモンランキングとレイド対策まとめ。',
    ru: 'Рейтинг покемонов для PvP и рейдов в Pokémon GO, таблицы 100% IV.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/rankings'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: 'Rankings' }]
    }
  };
}

export default async function RankingsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/rankings`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        name: 'Pokémon GO PvE & PvP Rankings Database (DialgaDex ER & GamePress DPS)',
        description: 'Comprehensive tier list and rankings of all Pokémon GO attackers, Mega evolutions, Shadow Pokémon, and PvP leagues.',
        url: canonicalUrl,
        license: 'https://creativecommons.org/licenses/by-nc/4.0/',
        creator: {
          '@type': 'Organization',
          name: 'PoGo Events Tracker',
          url: 'https://pogoevents.app',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('rankings', lang), item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PokemonRankingsView lang={lang} />
    </>
  );
}
