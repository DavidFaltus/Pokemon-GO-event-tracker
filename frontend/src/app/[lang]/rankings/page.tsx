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

  return {
    title: isCzech
      ? 'PvP Rankings & 100% IV CP Chart | Pokémon GO Event Tracker'
      : 'PvP Rankings & 100% IV CP Chart | Pokémon GO Event Tracker',
    description: isCzech
      ? 'Žebříčky PvP Pokémonů (Great League, Ultra League, Master League) a tabulka 100% IV CP hodnot.'
      : 'PvP Pokémon rankings for Great League, Ultra League, Master League, and 100% IV CP charts.',
  };
}

export default async function RankingsPage({ params }: PageProps) {
  const unwrappedParams = await params;
  const lang = unwrappedParams.lang || 'cs';

  return <PokemonRankingsView lang={lang} />;
}
