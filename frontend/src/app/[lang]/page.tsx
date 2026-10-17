import type { Metadata } from 'next';
import App from '@/App';
import type { Language } from '@/data/translations';
import { buildAlternates } from '@/utils/seoHelper';
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
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}`;

  const titles: Record<Language, string> = {
    cs: 'Pokémon GO Event Tracker - Živé události, Raidy, Rakeťáci & Průvodce',
    en: 'Pokémon GO Event Tracker - Live Events, Raids, Rocket Lineups & Guides',
    ja: 'Pokémon GO イベントトラッカー - イベント、レイド、ロケット団 & ガイド',
    ru: 'Трекер событий Pokémon GO - События, Рейды, Команда R и Руководства',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Sledujte aktuální a nadcházející události v Pokémon GO, raid bossy, sestavy Team GO Rocket, líhnutí z vajec, maskování Ditto a PvP žebříčky v reálném čase.',
    en: 'Track live and upcoming Pokémon GO events, raid bosses, Team GO Rocket lineups, egg hatches, Ditto disguises, and PvP rankings in real time.',
    ja: 'Pokémon GOのイベント、レイドボス、GOロケット団の編成、タマゴ孵化、メタモン、PvPランキングをリアルタイムで確認できます。',
    ru: 'Отслеживайте текущие и предстоящие события Pokémon GO, боссов рейдов, составы Команды R, вылупление яиц и маскировки Дитто в реальном времени.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: buildAlternates(lang, '', 'https://pogoevents.app/api/agent/events.md'),
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: 'PoGo Events' }]
    }
  };
}

async function getInitialEvents() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/events`, { next: { revalidate: 300 } });
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data : data.events || [];
    }
  } catch (err) {}
  return [];
}

export default async function HomePage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';
  const initialEvents = await getInitialEvents();

  return <App initialLang={lang} initialEvents={initialEvents} />;
}
