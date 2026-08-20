import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import App from '@/App';
import { pokemonRankings, getPokemonByIdOrSlug, isValidPokemonId, ALL_POKEDEX_IDS } from '@/data/pokemonRankings';
import { getPokemonName } from '@/utils/pokemonTranslator';

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: 'cs' | 'en' | 'ja' | 'ru'; id: string }[] = [];

  languages.forEach((lang) => {
    ALL_POKEDEX_IDS.forEach((num) => {
      params.push({ lang, id: num.toString() });
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
  const matched = getPokemonByIdOrSlug(id);

  if (!matched) {
    return {
      title: 'Pokémon Not Found | Pokémon GO Event Tracker',
      description: 'Pokémon detail not found.',
      robots: { index: false, follow: false },
    };
  }

  const validLanguages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  const validLang = validLanguages.includes(lang as any) ? (lang as any) : 'cs';
  const localizedName = getPokemonName(matched.name, validLang);
  const title = `${localizedName} (#${matched.pokedexId}) - Stats, Best Moves & Max CP | Pokémon GO`;
  
  const descByLang: Record<string, string> = {
    cs: `Kompletní statistiky pro ${localizedName} (#${matched.pokedexId}) v Pokémon GO. Typ: ${matched.types.join('/')}, Max CP: ${matched.maxCp}, nejlepší útoky: ${matched.bestFastMove.name} a ${matched.bestChargedMove.name}, 100% IV hodnoty a counters.`,
    en: `Complete stats for ${matched.name} (#${matched.pokedexId}) in Pokémon GO. Type: ${matched.types.join('/')}, Max CP: ${matched.maxCp}, best fast & charged moves (${matched.bestFastMove.name} / ${matched.bestChargedMove.name}), 100% IV values, and top counters.`,
    ja: `Pokémon GOの${localizedName} (図鑑No.${matched.pokedexId}) のステータス、最大CP (${matched.maxCp})、おすすめ最適技 (${matched.bestFastMove.name} / ${matched.bestChargedMove.name})、タイプ相性と対策まとめ。`,
    ru: `Полные характеристики ${matched.name} (#${matched.pokedexId}) в Pokémon GO. Тип: ${matched.types.join('/')}, Макс. CP: ${matched.maxCp}, лучшие атаки, 100% IV и контр-покемоны.`
  };
  const description = descByLang[validLang] || descByLang.en;
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokemon/${matched.pokedexId}`;

  return {
    title,
    description,
    keywords: [
      matched.name,
      localizedName,
      `${matched.name} pokemon go`,
      `${matched.name} max cp`,
      `${matched.name} best moveset`,
      `${matched.name} counters`,
      'pokemon go iv chart',
      'pokemon rankings'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/pokemon/${matched.pokedexId}`,
        'en': `https://pogoevents.app/en/pokemon/${matched.pokedexId}`,
        'ja': `https://pogoevents.app/ja/pokemon/${matched.pokedexId}`,
        'ru': `https://pogoevents.app/ru/pokemon/${matched.pokedexId}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`,
          width: 475,
          height: 475,
          alt: matched.name,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`],
    }
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { lang, id } = await params;
  const validLanguages: ('cs' | 'en' | 'ja' | 'ru')[] = ['cs', 'en', 'ja', 'ru'];
  const validLang = validLanguages.includes(lang as any) ? (lang as any) : 'cs';

  const matched = getPokemonByIdOrSlug(id);
  if (!matched) {
    notFound();
  }

  const localizedName = getPokemonName(matched.name, validLang);
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokemon/${matched.pokedexId}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`;

  // Structured Data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemPage',
        '@id': canonicalUrl,
        name: `${localizedName} (#${matched.pokedexId}) - Pokémon GO Guide & Stats`,
        description: `Complete stats, fast/charged movesets, max CP and PvP/PvE rankings for ${matched.name} in Pokémon GO.`,
        url: canonicalUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
        mainEntity: {
          '@type': 'Thing',
          name: matched.name,
          identifier: matched.pokedexId.toString(),
          description: `Pokémon #${matched.pokedexId} with Attack: ${matched.attack}, Defense: ${matched.defense}, Stamina: ${matched.stamina}, Max CP: ${matched.maxCp}.`,
          image: imageUrl,
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `https://pogoevents.app/${validLang}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pokédex & Rankings',
            item: `https://pogoevents.app/${validLang}/rankings`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${localizedName} (#${matched.pokedexId})`,
            item: canonicalUrl
          }
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
      <App initialLang={validLang} initialTab="ranking" initialPokemonSearch={matched.pokedexId.toString()} />
    </>
  );
}
