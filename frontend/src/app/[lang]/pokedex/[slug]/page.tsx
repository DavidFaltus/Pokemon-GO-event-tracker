import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PokedexDetailView } from '@/components/PokedexDetailView';
import {
  POKEDEX_CATALOG,
  getPokedexEntryBySlug,
  getPokedexEntryById
} from '@/data/pokedexCatalog';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { buildAlternates } from '@/utils/seoHelper';
import type { Language } from '@/data/translations';

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; slug: string }[] = [];

  languages.forEach((lang) => {
    POKEDEX_CATALOG.forEach((entry) => {
      params.push({ lang, slug: entry.slug });
    });
  });

  return params;
}

interface PokedexDetailPageProps {
  params: Promise<{
    lang: Language;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PokedexDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';

  const entry = getPokedexEntryBySlug(slug) || getPokedexEntryById(slug);
  if (!entry) {
    return {
      title: 'Pokémon Not Found | Pokémon GO Event Tracker',
      description: 'Pokémon detail not found in Pokédex.',
      robots: { index: false, follow: false }
    };
  }

  const localizedName = validLang === 'ja' ? entry.names.ja : getPokemonName(entry.names.en, validLang);
  const typesJoined = entry.types.join('/');
  const maxCp50 = entry.maxCp.lv50;

  const titles: Record<Language, string> = {
    cs: `${localizedName} (#${entry.dexId}) – Kompletní Pokédex, Max CP, Útoky & Statistiky | Pokémon GO`,
    en: `${entry.names.en} (#${entry.dexId}) – Complete Pokédex, Max CP, Best Moves & Stats | Pokémon GO`,
    ja: `${entry.names.ja} (図鑑No.${entry.dexId}) – ポケモンGO 完全図鑑・最大CP・最適技・種族値`,
    ru: `${localizedName} (#${entry.dexId}) – Полный Покедекс, Макс. CP, Атаки и Характеристики | Pokémon GO`
  };

  const descriptions: Record<Language, string> = {
    cs: `Kompletní profil pro ${localizedName} (#${entry.dexId}) v Pokémon GO. Typ: ${typesJoined}, Max CP: ${maxCp50}, základní statistiky (ATK ${entry.stats.attack}, DEF ${entry.stats.defense}, HP ${entry.stats.stamina}), slabosti, 100% IV hodnoty a nejlepší útoky.`,
    en: `Complete Pokédex entry for ${entry.names.en} (#${entry.dexId}) in Pokémon GO. Type: ${typesJoined}, Max CP: ${maxCp50}, base stats (ATK ${entry.stats.attack}, DEF ${entry.stats.defense}, HP ${entry.stats.stamina}), weaknesses, 100% IV tables, and best moves.`,
    ja: `Pokémon GOの${entry.names.ja} (図鑑No.${entry.dexId}) の詳細プロフィール。タイプ: ${typesJoined}、最大CP: ${maxCp50}、種族値（攻撃${entry.stats.attack}/防御${entry.stats.defense}/HP${entry.stats.stamina}）、弱点・耐性、覚える技まとめ。`,
    ru: `Полный профиль ${localizedName} (#${entry.dexId}) в Pokémon GO. Тип: ${typesJoined}, Макс. CP: ${maxCp50}, базовые характеристики (ATK ${entry.stats.attack}, DEF ${entry.stats.defense}, HP ${entry.stats.stamina}), слабости и лучшие атаки.`
  };

  const title = titles[validLang] || titles.en;
  const description = descriptions[validLang] || descriptions.en;
  const canonicalUrl = `https://pogoevents.app/${validLang}/pokedex/${entry.slug}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${entry.dexId}.png`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    keywords: [
      entry.names.en,
      localizedName,
      `${entry.names.en} pokemon go`,
      `${entry.names.en} pokedex`,
      `${entry.names.en} max cp`,
      `${entry.names.en} best moveset`,
      `${entry.names.en} shiny pokemon go`,
      'pokemon go iv chart'
    ],
    alternates: buildAlternates(validLang, `/pokedex/${entry.slug}`),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 475,
          height: 475,
          alt: entry.names.en
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}

export default async function PokedexDetailPage({ params }: PokedexDetailPageProps) {
  const { lang, slug } = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const validLang: Language = validLanguages.includes(lang as Language) ? (lang as Language) : 'cs';

  let entry = getPokedexEntryBySlug(slug);
  if (!entry) {
    const byId = getPokedexEntryById(slug);
    if (byId) {
      entry = byId;
    }
  }

  if (!entry) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: entry.names[validLang] || entry.names.en,
    description: `Complete Pokédex profile for ${entry.names.en} (#${entry.dexId}) in Pokémon GO with CP, stats, and movesets.`,
    url: `https://pogoevents.app/${validLang}/pokedex/${entry.slug}`,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${entry.dexId}.png`,
    mainEntity: {
      '@type': 'Thing',
      name: entry.names.en,
      identifier: `#${entry.dexId}`,
      alternateName: entry.names.ja,
      description: `Pokémon #${entry.dexId} (${entry.types.join(', ')}) with Max CP ${entry.maxCp.lv50}.`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PokedexDetailView entry={entry} lang={validLang} />
    </>
  );
}
