import type { Metadata } from 'next';
import App from '@/App';
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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs`,
        'en': `https://pogoevents.app/en`,
        'ja': `https://pogoevents.app/ja`,
        'ru': `https://pogoevents.app/ru`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: 'PoGo Events' }]
    }
  };
}

export default async function HomePage({ params }: PageProps) {
  const unwrappedParams = await params;
  const rawLang = unwrappedParams.lang || 'cs';
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(rawLang as Language) ? (rawLang as Language) : 'cs';

  return <App initialLang={lang} />;
}
