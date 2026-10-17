import type { Metadata } from 'next';
import { RaidView } from '@/components/RaidView';
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
  const canonicalUrl = `https://pogoevents.app/${lang}/raids`;

  const titles: Record<Language, string> = {
    cs: 'Aktuální Raid Bossi & Přehled Counterů (2026) | Pokémon GO Event Tracker',
    en: 'Current Raid Bosses & Best Counters Guide (2026) | Pokémon GO Event Tracker',
    ja: '現在のレイドボス＆最強対策ポケモン一覧 (2026) | Pokémon GO',
    ru: 'Текущие Рейд-боссы и лучшие контр-покемоны (2026) | Pokémon GO',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Kompletní přehled aktuálních 1-Star, 3-Star, 5-Star, Mega a Shadow Raid Bossů v Pokémon GO včetně 100% IV CP hodnot, slabostí a nejlepších counterů.',
    en: 'Complete guide to active 1-Star, 3-Star, 5-Star, Mega, and Shadow Raid Bosses in Pokémon GO with 100% IV CP charts, weaknesses, and recommended counters.',
    ja: 'Pokémon GOの現在開催中の星1・星3・星5（伝説）・メガ・シャドウレイドボス一覧。弱点タイプ、100% IV CP、おすすめ対策ポケモンをリアルタイム更新。',
    ru: 'Полный список текущих боссов рейдов 1*, 3*, 5*, Мега и Теневых рейдов в Pokémon GO с таблицами 100% IV CP, уязвимостями и лучшими контр-покемонами.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '/raids', 'https://pogoevents.app/api/agent/raids.md'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: titles[lang] || titles.en }],
    },
  };
}

async function getInitialRaidBosses() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/raids`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {}
  return undefined;
}

export default async function RaidsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrappedParams.lang as Language) ? (unwrappedParams.lang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/raids`;
  const initialBosses = await getInitialRaidBosses();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        name: 'Pokémon GO Active Raid Bosses & Counters Database',
        description: 'Live rotation of Tier 1, Tier 3, Tier 5 Legendary, Mega, and Shadow Raid Bosses in Pokémon GO with CP ranges and optimal counter lineups.',
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
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('raids', lang), item: canonicalUrl },
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
      <RaidView lang={lang} initialBosses={initialBosses} />
    </>
  );
}
