import type { Metadata } from 'next';
import App from '@/App';
import type { Language } from '@/data/translations';
import { GUIDES_DATA } from '@/data/guidesData';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/guides`;

  const titles: Record<Language, string> = {
    cs: 'Pokémon GO Strategické Průvodce & Návody (2026) | PoGo Events',
    en: 'Pokémon GO Strategy Guides & Tutorials (2026) | PoGo Events',
    ja: 'Pokémon GO 攻略ガイド・戦略マニュアル一覧 (2026) | PoGo Events',
    ru: 'Стратегические гайды и руководства Pokémon GO (2026) | PoGo Events',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Detailní návody pro Pokémon GO: jak porazit Giovanniho a lídry Team GO Rocket, nejlepší countery na Raidy, líhnutí vajec, maskování Ditto, Stardust pokémoni a 100% IV hodnoty.',
    en: 'In-depth Pokémon GO strategy guides: defeating Team GO Rocket Leaders & Giovanni, best Raid counters, Egg hatching pools, Ditto disguises, extra Stardust Pokémon, and 100% IV charts.',
    ja: 'Pokémon GOの詳細攻略ガイド：GOロケット団（サカキ・リーダー）対策、最強レイド対策、タマゴ孵化一覧、メタモン変装、ほしのすなボーナス、100% IV早見表。',
    ru: 'Подробные гайды по Pokémon GO: как победить Джованни и лидеров Команды R, лучшие контр-покемоны для рейдов, вылупление яиц, маскировки Дитто и бонусная звездная пыль.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/guides'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: titles[lang] || titles.en }],
    },
  };
}

export default async function GuidesPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/guides`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Pokémon GO Strategy Guides & Tutorials',
        url: canonicalUrl,
        numberOfItems: GUIDES_DATA.length,
        itemListElement: GUIDES_DATA.map((guide, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: guide.title[lang] || guide.title.en,
          url: `https://pogoevents.app/${lang}/guides/${guide.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('guides', lang), item: canonicalUrl },
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
      <App initialLang={lang} initialTab="guides" />
    </>
  );
}
