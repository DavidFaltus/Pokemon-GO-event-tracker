import type { Metadata } from 'next';
import { FriendFinderView } from '@/components/FriendFinderView';
import type { Language } from '@/data/translations';

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
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/friends`;

  const titles: Record<Language, string> = {
    cs: '👥 Pokémon GO Přátelé & Trainer Kódy (2026) – Vivillon dárky & Remote Raidy',
    en: '👥 Pokémon GO Friend Codes & Trainer Matchmaker (2026) – Vivillon & Raids',
    ja: '👥 Pokémon GO フレンドコード募集掲示板（2026最新）– ビビヨン＆レイド招待',
    ru: '👥 Коды друзей Pokémon GO и поиск рейдов (2026) – Вивиллон и подарки',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Najděte aktivní přátele v Pokémon GO pro každodenní výměnu dárků, sběr všech 18 vzorů Vivillona, XP grind na Best Friends a pozvánky na Remote Raidy.',
    en: 'Find active Pokémon GO trainers worldwide for daily gift sending, collecting all 18 Vivillon wing patterns, XP grinding, and Remote Raid invites.',
    ja: '世界中のアクティブなポケモンGOトレーナーを検索・募集。ギフト交換、ビビヨン全18模様集め、大親友XP稼ぎ、リモートレイド招待に最適です。',
    ru: 'Ищите активных игроков Pokémon GO по всему миру для ежедневного обмена подарками, сбора всех 18 узоров Вивиллона и приглашений на Remote рейды.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/friends`,
        'en': `https://pogoevents.app/en/friends`,
        'ja': `https://pogoevents.app/ja/friends`,
        'ru': `https://pogoevents.app/ru/friends`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: 'PoGo Friends' }],
    },
  };
}

export default async function FriendsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/friends`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pokémon GO Friend Codes & Matchmaker',
    description: 'Find active Pokémon GO trainers worldwide for gift exchange, Vivillon patterns, and remote raids.',
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Pokémon GO Event Tracker',
      url: 'https://pogoevents.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pogoevents.app/logo-1080.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FriendFinderView lang={lang} />
    </>
  );
}
