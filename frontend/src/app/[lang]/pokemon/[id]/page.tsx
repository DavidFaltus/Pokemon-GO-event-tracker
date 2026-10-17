import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
import { pokemonRankings, getPokemonByIdOrSlug, ALL_POKEDEX_IDS } from '@/data/pokemonRankings';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from '@/utils/pokemonCountersHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import type { Language } from '@/data/translations';

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; id: string }[] = [];

  languages.forEach((lang) => {
    ALL_POKEDEX_IDS.forEach((num) => {
      params.push({ lang, id: num.toString() });
    });
  });

  return params;
}

interface PokemonPageProps {
  params: Promise<{
    lang: Language;
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

  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';
  const localizedName = getPokemonName(matched.name, validLang);

  const titleByLang: Record<Language, string> = {
    cs: `${localizedName} (#${matched.pokedexId}) – Statistiky, Nejlepší Útoky & Max CP | Pokémon GO`,
    en: `${matched.name} (#${matched.pokedexId}) – Stats, Best Moveset & Max CP | Pokémon GO`,
    ja: `${localizedName} (図鑑No.${matched.pokedexId}) – ステータス・最適技・最大CP | Pokémon GO`,
    ru: `${matched.name} (#${matched.pokedexId}) – Характеристики, лучшие атаки и макс. CP | Pokémon GO`,
  };
  const title = titleByLang[validLang] || titleByLang.en;

  const descByLang: Record<Language, string> = {
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
    alternates: buildAlternates(validLang, `/pokemon/${matched.pokedexId}`),
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
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';

  const matched = getPokemonByIdOrSlug(id);
  if (!matched) {
    notFound();
  }

  const localizedName = getPokemonName(matched.name, validLang);
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokemon/${matched.pokedexId}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${matched.pokedexId}.png`;
  const weaknesses = getCounterTypes(matched.types).map((w) => `${w.type} (${w.label})`);
  const topCounters = getTopCountersForPokemon(matched, pokemonRankings).slice(0, 5);

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
          description: `Pokémon #${matched.pokedexId} (${matched.types.join('/')}) with Attack: ${matched.attack}, Defense: ${matched.defense}, Stamina: ${matched.stamina}, Max CP: ${matched.maxCp}, Best Moveset: ${matched.bestFastMove.name} + ${matched.bestChargedMove.name}.`,
          image: imageUrl,
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: validLang === 'cs' ? `Jaké jsou nejlepší útoky a Max CP pro ${localizedName} (#${matched.pokedexId})?` : `What is the best moveset and Max CP for ${matched.name} (#${matched.pokedexId}) in Pokémon GO?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${matched.name} (#${matched.pokedexId}) is a ${matched.types.join('/')} type Pokémon with a Maximum CP of ${matched.maxCp} (Attack: ${matched.attack}, Defense: ${matched.defense}, Stamina: ${matched.stamina}). Its optimal PvE moveset is ${matched.bestFastMove.name} (Fast) and ${matched.bestChargedMove.name} (Charged), delivering ${matched.dps} DPS. It is weak to ${weaknesses.join(', ')} attacks.`,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: getBreadcrumbLabel('home', validLang),
            item: `https://pogoevents.app/${validLang}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: getBreadcrumbLabel('rankings', validLang),
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
      <article
        className="seo-entity-summary card"
        style={{
          marginBottom: '18px',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          {localizedName} (#{matched.pokedexId}) – {validLang === 'cs' ? 'Přehled statistik, útoků a slabostí' : 'Base Stats, Best Moveset & Weaknesses'}
        </h2>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          <strong>{validLang === 'cs' ? 'Typ:' : 'Type:'}</strong> {matched.types.join(' / ')} |{' '}
          <strong>Max CP (Lv 50):</strong> {matched.maxCp} CP |{' '}
          <strong>ATK / DEF / STA:</strong> {matched.attack} / {matched.defense} / {matched.stamina} |{' '}
          <strong>{validLang === 'cs' ? 'Ideální Moveset:' : 'Best Moveset:'}</strong> {matched.bestFastMove.name} + {matched.bestChargedMove.name} ({matched.dps} DPS) |{' '}
          <strong>{validLang === 'cs' ? 'Slabosti:' : 'Weaknesses:'}</strong> {weaknesses.join(', ')}
        </p>
        {topCounters.length > 0 && (
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            <strong>{validLang === 'cs' ? 'Nejlepší Counters:' : 'Top Counters:'}</strong>{' '}
            {topCounters.map((c) => `${getPokemonName(c.pokemon.name, validLang)} (${c.pokemon.bestFastMove.name} / ${c.pokemon.bestChargedMove.name})`).join(', ')}
          </p>
        )}
      </article>
      <PokemonRankingsView lang={validLang} initialSearchQuery={`#${matched.pokedexId}`} />
    </>
  );
}
