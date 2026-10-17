import type { Metadata } from 'next';
import { RocketGuide } from '@/components/RocketGuide';
import type { Language } from '@/data/translations';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { API_BASE_URL } from '@/config';

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
  const canonicalUrl = `https://pogoevents.app/${lang}/rocket`;

  const titles: Record<Language, string> = {
    cs: 'Team GO Rocket Průvodce (Giovanni, Lídeři & Grunti) | Pokémon GO Event Tracker',
    en: 'Team GO Rocket Lineups & Counters (Giovanni, Leaders & Grunts) | Pokémon GO',
    ja: 'GOロケット団 対策ガイド（サカキ・リーダー・したっぱの手持ち一覧）| Pokémon GO',
    ru: 'Команда GO Rocket – Составы и контр-покемоны (Джованни, Лидеры, Пехотинцы) | Pokémon GO',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Aktuální sestavy, slabosti a nejlepší protihráči (counters) pro Giovanniho, Cliffa, Sierru, Arla a řadové Rakeťáky v Pokémon GO.',
    en: 'Current lineups, weaknesses, and counter guide for Giovanni, Cliff, Sierra, Arlo, and Team GO Rocket Grunts in Pokémon GO.',
    ja: 'Pokémon GOのGOロケット団ボス（サカキ）、リーダー（クリフ・シエラ・アルロ）、したっぱの最新手持ちポケモンとおすすめ対策パーティ。',
    ru: 'Актуальные составы, слабости и лучшие контр-покемоны против Джованни, Клиффа, Сиерры, Арло и пехотинцев Команды R в Pokémon GO.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/rocket', 'https://pogoevents.app/api/agent/rocket.md'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: titles[lang] || titles.en }],
    },
  };
}

async function getInitialRocketData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rocket`, { next: { revalidate: 300 } });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {}
  return undefined;
}

export default async function RocketPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/rocket`;
  const initialRocketData = await getInitialRocketData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        name: 'Team GO Rocket Lineups & Counters Database (Giovanni, Cliff, Sierra, Arlo, Grunts)',
        description: 'Live Team GO Rocket lineups, Shadow Pokémon encounter rewards, and optimal counter teams in Pokémon GO.',
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
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('rocket', lang), item: canonicalUrl },
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
      <RocketGuide lang={lang} initialRocketData={initialRocketData} />
    </>
  );
}
