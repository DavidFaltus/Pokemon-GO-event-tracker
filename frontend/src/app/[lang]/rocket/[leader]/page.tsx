import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import type { Language } from '@/data/translations';

export const revalidate = 3600;

export const ROCKET_LEADERS = ['giovanni', 'cliff', 'sierra', 'arlo', 'grunts'] as const;
export type RocketLeaderSlug = typeof ROCKET_LEADERS[number];

const LEADER_INFO: Record<RocketLeaderSlug, Record<Language, { name: string; title: string; desc: string }>> = {
  giovanni: {
    cs: { name: 'Giovanni', title: 'Boss Giovanni Sestava & Nejlepší Counters | Pokémon GO', desc: 'Aktuální sestava a doporučení protihráči na Bosse Giovanniho v Pokémon GO. Jak snadno porazit Shadow Legendárního Pokémona.' },
    en: { name: 'Giovanni', title: 'Giovanni Lineup & Best Counters Guide | Pokémon GO', desc: 'Current lineup, weakness guide, and top counters to defeat Team GO Rocket Boss Giovanni in Pokémon GO.' },
    ja: { name: 'サカキ', title: 'サカキの手持ちポケモンと対策・倒し方 | Pokémon GO', desc: 'Pokémon GO GOロケット団のボス・サカキの最新手持ちポケモンとおすすめ対策パーティ。' },
    ru: { name: 'Джованни', title: 'Джованни - Состав и лучшие контр-покемоны | Pokémon GO', desc: 'Актуальный состав и гайд по победе над Боссом Джованни в Pokémon GO.' },
  },
  cliff: {
    cs: { name: 'Cliff', title: 'Lídr Cliff Sestava & Nejlepší Counters | Pokémon GO', desc: 'Aktuální Pokémoni a slabosti lídra Cliffa (Team GO Rocket) v Pokémon GO.' },
    en: { name: 'Cliff', title: 'Leader Cliff Lineup & Counters Guide | Pokémon GO', desc: 'Team GO Rocket Leader Cliff lineup, weaknesses, and top counters in Pokémon GO.' },
    ja: { name: 'クリフ', title: 'リーダー・クリフの手持ちと対策ポケモン | Pokémon GO', desc: 'Pokémon GO GOロケット団リーダー・クリフの対策とおすすめポケモン。' },
    ru: { name: 'Клифф', title: 'Лидер Клифф - Состав и контр-покемоны | Pokémon GO', desc: 'Гайд по победе над лидером Клиффом в Pokémon GO.' },
  },
  sierra: {
    cs: { name: 'Sierra', title: 'Lídr Sierra Sestava & Nejlepší Counters | Pokémon GO', desc: 'Aktuální Pokémoni a slabosti lídryně Sierry (Team GO Rocket) v Pokémon GO.' },
    en: { name: 'Sierra', title: 'Leader Sierra Lineup & Counters Guide | Pokémon GO', desc: 'Team GO Rocket Leader Sierra lineup, weaknesses, and best battle counters in Pokémon GO.' },
    ja: { name: 'シエラ', title: 'リーダー・シエラの手持ちと対策ポケモン | Pokémon GO', desc: 'Pokémon GO GOロケット団リーダー・シエラの対策とおすすめポケモン。' },
    ru: { name: 'Сиерра', title: 'Лидер Сиерра - Состав и контр-покемоны | Pokémon GO', desc: 'Гайд по победе над лидером Сиеррой в Pokémon GO.' },
  },
  arlo: {
    cs: { name: 'Arlo', title: 'Lídr Arlo Sestava & Nejlepší Counters | Pokémon GO', desc: 'Aktuální Pokémoni a slabosti lídra Arla (Team GO Rocket) v Pokémon GO.' },
    en: { name: 'Arlo', title: 'Leader Arlo Lineup & Counters Guide | Pokémon GO', desc: 'Team GO Rocket Leader Arlo lineup, weaknesses, and top counters in Pokémon GO.' },
    ja: { name: 'アルロ', title: 'リーダー・アルロの手持ちと対策ポケモン | Pokémon GO', desc: 'Pokémon GO GOロケット団リーダー・アルロの対策とおすすめポケモン。' },
    ru: { name: 'Арло', title: 'Лидер Арло - Состав и контр-покемоны | Pokémon GO', desc: 'Гайд по победе над лидером Арло в Pokémon GO.' },
  },
  grunts: {
    cs: { name: 'Rakeťáci (Grunts)', title: 'Team GO Rocket Grunts Hlášky & Sestavy | Pokémon GO', desc: 'Kompletní přehled hlášek řadových Rakeťáků, typů Pokémonů a Shadow odměn v Pokémon GO.' },
    en: { name: 'Rocket Grunts', title: 'Team GO Rocket Grunts Taunts & Lineups | Pokémon GO', desc: 'Complete guide to Team GO Rocket Grunt phrases, types, and encounter rewards in Pokémon GO.' },
    ja: { name: 'したっぱ', title: 'GOロケット団したっぱのセリフと手持ち一覧 | Pokémon GO', desc: 'Pokémon GO GOロケット団したっぱのセリフ別タイプと対策一覧。' },
    ru: { name: 'Пехотинцы Команды R', title: 'Фразы и составы пехотинцев Команды R | Pokémon GO', desc: 'Полный список фраз и составов пехотинцев Команды R в Pokémon GO.' },
  },
};

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; leader: string }[] = [];

  languages.forEach((lang) => {
    ROCKET_LEADERS.forEach((leader) => {
      params.push({ lang, leader });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; leader: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const leaderSlug = unwrapped.leader.toLowerCase() as RocketLeaderSlug;

  const info = LEADER_INFO[leaderSlug]?.[lang] || LEADER_INFO[leaderSlug]?.en;
  if (!info) {
    return {
      title: 'Leader Not Found | Pokémon GO Event Tracker',
      description: 'Leader not found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rocket/${leaderSlug}`;

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/rocket/${leaderSlug}`,
        'en': `https://pogoevents.app/en/rocket/${leaderSlug}`,
        'ja': `https://pogoevents.app/ja/rocket/${leaderSlug}`,
        'ru': `https://pogoevents.app/ru/rocket/${leaderSlug}`,
      },
    },
    openGraph: {
      title: info.title,
      description: info.desc,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: info.title }]
    }
  };
}

export default async function RocketLeaderPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const leaderSlug = unwrapped.leader.toLowerCase() as RocketLeaderSlug;

  const info = LEADER_INFO[leaderSlug]?.[lang] || LEADER_INFO[leaderSlug]?.en;
  if (!info) {
    notFound();
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rocket/${leaderSlug}`;

  // Schema.org Article & Breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: info.title,
        description: info.desc,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: 'Team GO Rocket', item: `https://pogoevents.app/${lang}/rocket` },
          { '@type': 'ListItem', position: 3, name: info.name, item: canonicalUrl }
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
      <App initialLang={lang} initialTab="rocket" />
    </>
  );
}
