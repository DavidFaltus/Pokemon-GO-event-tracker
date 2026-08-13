import type { Metadata } from 'next';
import App from '@/App';
import { pokemonRankings } from '@/data/pokemonRankings';

export const revalidate = 300;

export async function generateStaticParams() {
  const languages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  // Provide static params for top 50 Pokemon IDs plus common test IDs
  const pokemonIds = Array.from(
    new Set(pokemonRankings.map((p) => p.pokedexId.toString()).concat(['1', '4', '7', '15', '25', '150', '384', '644']))
  );

  const params: { lang: 'cs' | 'en' | 'ja' | 'ru'; id: string }[] = [];
  languages.forEach((lang) => {
    pokemonIds.forEach((id) => {
      params.push({ lang, id });
    });
  });

  return params;
}

interface PokemonPageProps {
  params: Promise<{
    lang: 'cs' | 'en' | 'ja' | 'ru';
    id: string;
  }>;
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const matched = pokemonRankings.find(
    (p) => p.pokedexId.toString() === id || p.name.toLowerCase() === id.toLowerCase()
  );
  const pokeName = matched ? matched.name : `Pokémon #${id}`;
  const canonicalUrl = `https://pogoevents.app/${lang}/pokemon/${id}`;

  return {
    title: `${pokeName} | PvP & PvE Rankings | Pokémon GO Event Tracker`,
    description: `Statistiky, nejlepší útoky, counters a žebříček pro ${pokeName} v Pokémon GO.`,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/pokemon/${id}`,
        'en': `https://pogoevents.app/en/pokemon/${id}`,
        'ja': `https://pogoevents.app/ja/pokemon/${id}`,
        'ru': `https://pogoevents.app/ru/pokemon/${id}`,
      },
    },
    openGraph: {
      title: `${pokeName} | PvP & PvE Rankings`,
      description: `Přehled vlastností a hodnocení pro ${pokeName} v Pokémon GO.`,
      url: canonicalUrl,
    },
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { lang, id } = await params;
  const validLanguages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  const validLang = validLanguages.includes(lang as any) ? (lang as any) : 'en';

  return <App initialLang={validLang} initialTab="ranking" initialPokemonSearch={id} />;
}
