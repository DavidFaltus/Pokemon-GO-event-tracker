import type { Metadata } from 'next';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
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
  const lang = unwrappedParams.lang || 'cs';
  const isCzech = lang === 'cs';
  const canonicalUrl = `https://pogoevents.app/${lang}/rankings`;

  const titles: Record<Language, string> = {
    cs: 'PvP & PvE Žebříčky Pokémonů | Pokémon GO Event Tracker',
    en: 'PvP & PvE Pokémon Rankings & IV Chart | Pokémon GO Event Tracker',
    ja: '最強ポケモンランキング & 個体値表 | Pokémon GO',
    ru: 'Рейтинг покемонов PvP & PvE | Pokémon GO',
  };

  const descriptions: Record<Language, string> = {
    cs: 'Žebříčky PvP Pokémonů (Great, Ultra, Master League), nejlepší útočníci do raidů a tabulka 100% IV CP hodnot.',
    en: 'PvP Pokémon rankings for Great League, Ultra League, Master League, top raid attackers and 100% IV CP charts.',
    ja: 'スーパー・ハイパー・マスターリーグの最強ポケモンランキングとレイド対策まとめ。',
    ru: 'Рейтинг покемонов для PvP и рейдов в Pokémon GO, таблицы 100% IV.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/rankings`,
        'en': `https://pogoevents.app/en/rankings`,
        'ja': `https://pogoevents.app/ja/rankings`,
        'ru': `https://pogoevents.app/ru/rankings`,
      },
    },
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
  const lang = unwrappedParams.lang || 'cs';

  return <PokemonRankingsView lang={lang} />;
}
