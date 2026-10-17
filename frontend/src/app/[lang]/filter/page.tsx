import type { Metadata } from 'next';
import { FilterGeneratorView } from '@/components/FilterGeneratorView';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/filter`;

  const titles: Record<Language, string> = {
    cs: 'Search String Generátor (In-game filtry) | Pokémon GO Event Tracker',
    en: 'In-Game Search String Generator & IV Filter | Pokémon GO Event Tracker',
    ja: 'ポケモンGO 検索ワード生成ツール（個体値・ボックス整理フィルター）| PoGo Events',
    ru: 'Генератор поисковых строк и фильтров IV | Pokémon GO Event Tracker',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Generátor vyhledávacích řetězců pro 100% IV (4*), PvP IV, rychlé mazání (Trash string) a čištění batohu přímo do Pokémon GO.',
    en: 'Interactive search string builder for 100% IV (4*), PvP IVs, Fast Catch storage cleanup, and Raid filters directly inside Pokémon GO.',
    ja: 'Pokémon GOのボックス整理・個体値厳選を高速化する検索コマンド（検索文字列）自動生成ツール。',
    ru: 'Интерактивный генератор поисковых строк для фильтрации 100% IV, PvP покемонов и быстрой очистки хранилища в Pokémon GO.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/filter'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: titles[lang] || titles.en }],
    },
  };
}

export default async function FilterPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/filter`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Pokémon GO Search String Generator',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        url: canonicalUrl,
        description: 'Build custom Pokémon GO inventory search strings for IVs, types, distance trades, and storage cleanup.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('filter', lang), item: canonicalUrl },
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
      <FilterGeneratorView lang={lang} />
    </>
  );
}
