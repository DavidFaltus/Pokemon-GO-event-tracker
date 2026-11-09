import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
import type { Language } from '@/data/translations';
import { TYPE_CHART, getCounterTypes } from '@/utils/pokemonCountersHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';
import { localizeTypeName } from '@/utils/eventIntelligenceHelper';
import { pokemonRankings } from '@/data/pokemonRankings';
import { isPokemonReleasedInGo } from '@/utils/pokemonReleaseHelper';
import { getPokemonName } from '@/utils/pokemonTranslator';
import { getPokedexEntryById } from '@/data/pokedexCatalog';

export const revalidate = 3600;

export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'
] as const;

export type PokemonTypeSlug = typeof POKEMON_TYPES[number];

const TYPE_TRANSLATIONS: Record<PokemonTypeSlug, Record<Language, { name: string; title: string; desc: string }>> = {
  normal: {
    cs: { name: 'Normální', title: 'Normální Typ (Normal) - Slabosti, Odolnosti a Counters | Pokémon GO', desc: 'Přehled normálního typu v Pokémon GO: slabosti (Bojový), odolnosti (Duch) a nejlepší normální Pokémoni.' },
    en: { name: 'Normal', title: 'Normal Type Weakness, Counters & Strengths | Pokémon GO', desc: 'Complete Normal type guide in Pokémon GO: weaknesses (Fighting), immunities (Ghost), and top Normal attackers.' },
    ja: { name: 'ノーマル', title: 'ノーマルタイプの弱点・耐性と対策ポケモン | Pokémon GO', desc: 'Pokémon GO ノーマルタイプの弱点（かくとう）、耐性（ゴースト）とおすすめポケモン。' },
    ru: { name: 'Нормальный', title: 'Нормальный тип - Уязвимости и контр-покемоны | Pokémon GO', desc: 'Гайд по нормальному типу в Pokémon GO: слабости, сопротивления и лучшие покемоны.' },
  },
  fire: {
    cs: { name: 'Ohnivý', title: 'Ohnivý Typ (Fire) - Slabosti, Odolnosti a Counters | Pokémon GO', desc: 'Ohnivý typ v Pokémon GO: slabosti (Voda, Země, Kámen), odolnosti a nejlepší ohniví Pokémoni do raidů.' },
    en: { name: 'Fire', title: 'Fire Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Fire type guide in Pokémon GO: weaknesses (Water, Ground, Rock), resistances, and best Fire attackers.' },
    ja: { name: 'ほのお', title: 'ほのおタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO ほのおタイプの弱点（みず、じめん、いわ）と最強アタッカー一覧。' },
    ru: { name: 'Огненный', title: 'Огненный тип - Уязвимости и лучшие атакующие | Pokémon GO', desc: 'Огненный тип в Pokémon GO: слабости против воды, земли и камня, и лучшие рейдовые бойцы.' },
  },
  water: {
    cs: { name: 'Vodní', title: 'Vodní Typ (Water) - Slabosti, Odolnosti a Counters | Pokémon GO', desc: 'Vodní typ v Pokémon GO: slabosti (Tráva, Elektro), odolnosti a nejlepší vodní Pokémoni.' },
    en: { name: 'Water', title: 'Water Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Water type guide in Pokémon GO: weaknesses (Grass, Electric), resistances, and top Water raid attackers.' },
    ja: { name: 'みず', title: 'みずタイプの弱点・耐性とおすすめ対策 | Pokémon GO', desc: 'Pokémon GO みずタイプの弱点（くさ、でんき）と最強レイドアタッカー一覧。' },
    ru: { name: 'Водный', title: 'Водный тип - Уязвимости и лучшие покемоны | Pokémon GO', desc: 'Водный тип в Pokémon GO: уязвимости против травы и электричества.' },
  },
  grass: {
    cs: { name: 'Travní', title: 'Travní Typ (Grass) - Slabosti, Odolnosti a Counters | Pokémon GO', desc: 'Travní typ v Pokémon GO: slabosti (Oheň, Led, Jed, Létající, Hmyz) a nejlepší travní Pokémoni.' },
    en: { name: 'Grass', title: 'Grass Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Grass type guide in Pokémon GO: weaknesses (Fire, Ice, Poison, Flying, Bug) and top Grass attackers.' },
    ja: { name: 'くさ', title: 'くさタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO くさタイプの弱点とおすすめレイドポケモン一覧。' },
    ru: { name: 'Травяной', title: 'Травяной тип - Уязвимости и контр-покемоны | Pokémon GO', desc: 'Травяной тип в Pokémon GO: слабости и лучшие покемоны.' },
  },
  electric: {
    cs: { name: 'Elektrický', title: 'Elektrický Typ (Electric) - Slabosti a Counters | Pokémon GO', desc: 'Elektrický typ v Pokémon GO: jediná slabost (Země) a nejlepší elektroničtí Pokémoni.' },
    en: { name: 'Electric', title: 'Electric Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Electric type guide in Pokémon GO: weakness (Ground) and top Electric attackers.' },
    ja: { name: 'でんき', title: 'でんきタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO でんきタイプの弱点（じめん）と最強レイドアタッカー一覧。' },
    ru: { name: 'Электрический', title: 'Электрический тип - Уязвимости и counters | Pokémon GO', desc: 'Электрический тип в Pokémon GO: слабости и лучшие атакующие.' },
  },
  ice: {
    cs: { name: 'Ledový', title: 'Ledový Typ (Ice) - Slabosti, Odolnosti a Counters | Pokémon GO', desc: 'Ledový typ v Pokémon GO: slabosti (Oheň, Boj, Kámen, Ocel) a nejlepší ledoví ničitelé draků.' },
    en: { name: 'Ice', title: 'Ice Type Weakness, Counters & Dragon Killers | Pokémon GO', desc: 'Ice type guide in Pokémon GO: weaknesses, counters, and top Ice attackers for Dragon raids.' },
    ja: { name: 'こおり', title: 'こおりタイプの弱点・耐性とおすすめポケモン | Pokémon GO', desc: 'Pokémon GO こおりタイプの弱点と最強ドラゴンキラー一覧。' },
    ru: { name: 'Ледяной', title: 'Ледяной тип - Уязвимости и лучшие ледяные бойцы | Pokémon GO', desc: 'Ледяной тип в Pokémon GO: слабости и контр-покемоны.' },
  },
  fighting: {
    cs: { name: 'Bojový', title: 'Bojový Typ (Fighting) - Slabosti a Counters | Pokémon GO', desc: 'Bojový typ v Pokémon GO: slabosti (Létající, Psychický, Vílí) a nejlepší bojovníci.' },
    en: { name: 'Fighting', title: 'Fighting Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Fighting type guide in Pokémon GO: weaknesses (Flying, Psychic, Fairy) and top gym breakers.' },
    ja: { name: 'かくとう', title: 'かくとうタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO かくとうタイプの弱点とおすすめポケモン。' },
    ru: { name: 'Боевой', title: 'Боевой тип - Уязвимости и лучшие бойцы | Pokémon GO', desc: 'Боевой тип в Pokémon GO: слабости и лучшие покемоны.' },
  },
  poison: {
    cs: { name: 'Jedový', title: 'Jedový Typ (Poison) - Slabosti a Counters | Pokémon GO', desc: 'Jedový typ v Pokémon GO: slabosti (Země, Psychický) a nejlepší jedoví Pokémoni.' },
    en: { name: 'Poison', title: 'Poison Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Poison type guide in Pokémon GO: weaknesses (Ground, Psychic) and top Poison attackers.' },
    ja: { name: 'どく', title: 'どくタイプの弱点・耐性とおすすめ対策 | Pokémon GO', desc: 'Pokémon GO どくタイプの弱点とおすすめアタッカー。' },
    ru: { name: 'Ядовитый', title: 'Ядовитый тип - Уязвимости и контр-покемоны | Pokémon GO', desc: 'Ядовитый тип в Pokémon GO.' },
  },
  ground: {
    cs: { name: 'Zemní', title: 'Zemní Typ (Ground) - Slabosti a Counters | Pokémon GO', desc: 'Zemní typ v Pokémon GO: slabosti (Voda, Tráva, Led) a nejlepší zemní útočníci.' },
    en: { name: 'Ground', title: 'Ground Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Ground type guide in Pokémon GO: weaknesses (Water, Grass, Ice) and top Ground attackers.' },
    ja: { name: 'じめん', title: 'じめんタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO じめんタイプの弱点と最強ポケモン。' },
    ru: { name: 'Земляной', title: 'Земляной тип - Уязвимости и лучшие атакующие | Pokémon GO', desc: 'Земляной тип в Pokémon GO.' },
  },
  flying: {
    cs: { name: 'Létající', title: 'Létající Typ (Flying) - Slabosti a Counters | Pokémon GO', desc: 'Létající typ v Pokémon GO: slabosti (Elektro, Led, Kámen) a nejlepší létající útočníci.' },
    en: { name: 'Flying', title: 'Flying Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Flying type guide in Pokémon GO: weaknesses (Electric, Ice, Rock) and top Flying attackers.' },
    ja: { name: 'ひこう', title: 'ひこうタイプの弱点・耐性とおすすめポケモン | Pokémon GO', desc: 'Pokémon GO ひこうタイプの弱点とおすすめアタッカー。' },
    ru: { name: 'Летающий', title: 'Летающий тип - Уязвимости и контр-покемоны | Pokémon GO', desc: 'Летающий тип в Pokémon GO.' },
  },
  psychic: {
    cs: { name: 'Psychický', title: 'Psychický Typ (Psychic) - Slabosti a Counters | Pokémon GO', desc: 'Psychický typ v Pokémon GO: slabosti (Hmyz, Duch, Temný) a nejlepší psychičtí Pokémoni.' },
    en: { name: 'Psychic', title: 'Psychic Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Psychic type guide in Pokémon GO: weaknesses (Bug, Ghost, Dark) and top Psychic attackers.' },
    ja: { name: 'エスパー', title: 'エスパータイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO エスパータイプの弱点と最強エスパーポケモン。' },
    ru: { name: 'Психический', title: 'Психический тип - Уязвимости и лучшие бойцы | Pokémon GO', desc: 'Психический тип в Pokémon GO.' },
  },
  bug: {
    cs: { name: 'Hmyzí', title: 'Hmyzí Typ (Bug) - Slabosti a Counters | Pokémon GO', desc: 'Hmyzí typ v Pokémon GO: slabosti (Oheň, Létající, Kámen) a nejlepší hmyzí Pokémoni.' },
    en: { name: 'Bug', title: 'Bug Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Bug type guide in Pokémon GO: weaknesses (Fire, Flying, Rock) and top Bug attackers.' },
    ja: { name: 'むし', title: 'むしタイプの弱点・耐性とおすすめ対策 | Pokémon GO', desc: 'Pokémon GO むしタイプの弱点とおすすめアタッカー。' },
    ru: { name: 'Насекомый', title: 'Насекомый тип - Уязвимости и counters | Pokémon GO', desc: 'Насекомый тип в Pokémon GO.' },
  },
  rock: {
    cs: { name: 'Kamenný', title: 'Kamenný Typ (Rock) - Slabosti a Counters | Pokémon GO', desc: 'Kamenný typ v Pokémon GO: slabosti (Voda, Tráva, Boj, Země, Ocel) a nejlepší kamenní útočníci.' },
    en: { name: 'Rock', title: 'Rock Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Rock type guide in Pokémon GO: weaknesses and top Rock raid attackers.' },
    ja: { name: 'いわ', title: 'いわタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO いわタイプの弱点と最強レイドポケモン。' },
    ru: { name: 'Каменный', title: 'Каменный тип - Уязвимости и лучшие бойцы | Pokémon GO', desc: 'Каменный тип в Pokémon GO.' },
  },
  ghost: {
    cs: { name: 'Duchový', title: 'Duchový Typ (Ghost) - Slabosti a Counters | Pokémon GO', desc: 'Duchový typ v Pokémon GO: slabosti (Duch, Temný) a nejlepší duchoví útočníci.' },
    en: { name: 'Ghost', title: 'Ghost Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Ghost type guide in Pokémon GO: weaknesses (Ghost, Dark) and top Ghost attackers.' },
    ja: { name: 'ゴースト', title: 'ゴーストタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO ゴーストタイプの弱点と最強ゴーストポケモン。' },
    ru: { name: 'Призрачный', title: 'Призрачный тип - Уязвимости и контр-покемоны | Pokémon GO', desc: 'Призрачный тип в Pokémon GO.' },
  },
  dragon: {
    cs: { name: 'Dračí', title: 'Dračí Typ (Dragon) - Slabosti a Counters | Pokémon GO', desc: 'Dračí typ v Pokémon GO: slabosti (Led, Drak, Víla) a nejsilnější dračí legendy.' },
    en: { name: 'Dragon', title: 'Dragon Type Weakness, Counters & Top Attackers | Pokémon GO', desc: 'Dragon type guide in Pokémon GO: weaknesses (Ice, Dragon, Fairy) and top Dragon raid attackers.' },
    ja: { name: 'ドラゴン', title: 'ドラゴンタイプの弱点・耐性と最強レイドポケモン | Pokémon GO', desc: 'Pokémon GO ドラゴンタイプの弱点と最強伝説ドラゴン一覧。' },
    ru: { name: 'Драконий', title: 'Драконий тип - Уязвимости и лучшие драконы | Pokémon GO', desc: 'Драконий тип в Pokémon GO: слабости против льда, драконов и фей.' },
  },
  steel: {
    cs: { name: 'Ocelový', title: 'Ocelový Typ (Steel) - Slabosti a Odolnosti | Pokémon GO', desc: 'Ocelový typ v Pokémon GO: nejodolnější typ ve hře (10 odolností + 1 imunita) a nejlepší counters.' },
    en: { name: 'Steel', title: 'Steel Type Weakness, Resistances & Best Attackers | Pokémon GO', desc: 'Steel type guide in Pokémon GO: ultimate defensive typing with 10 resistances and top Steel attackers.' },
    ja: { name: 'はがね', title: 'はがねタイプの弱点・10の耐性と最強ポケモン | Pokémon GO', desc: 'Pokémon GO はがねタイプの弱点・耐性と最強はがねアタッカー。' },
    ru: { name: 'Стальной', title: 'Стальной тип - Уязвимости, сопротивления и counters | Pokémon GO', desc: 'Стальной тип в Pokémon GO: самый защищенный тип в игре.' },
  },
  dark: {
    cs: { name: 'Temný', title: 'Temný Typ (Dark) - Slabosti a Counters | Pokémon GO', desc: 'Temný typ v Pokémon GO: slabosti (Boj, Hmyz, Víla) a nejlepší temní útočníci.' },
    en: { name: 'Dark', title: 'Dark Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Dark type guide in Pokémon GO: weaknesses (Fighting, Bug, Fairy) and top Dark attackers.' },
    ja: { name: 'あく', title: 'あくタイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO あくタイプの弱点と最強あくアタッカー一覧。' },
    ru: { name: 'Темный', title: 'Темный тип - Уязвимости и лучшие атакующие | Pokémon GO', desc: 'Темный тип в Pokémon GO.' },
  },
  fairy: {
    cs: { name: 'Vílí', title: 'Vílí Typ (Fairy) - Slabosti a Counters | Pokémon GO', desc: 'Vílí typ v Pokémon GO: slabosti (Jed, Ocel), imunita proti drakům a nejlepší vílí Pokémoni.' },
    en: { name: 'Fairy', title: 'Fairy Type Weakness, Counters & Best Attackers | Pokémon GO', desc: 'Fairy type guide in Pokémon GO: weaknesses (Poison, Steel), Dragon immunity, and top Fairy attackers.' },
    ja: { name: 'フェアリー', title: 'フェアリータイプの弱点・耐性と最強アタッカー | Pokémon GO', desc: 'Pokémon GO フェアリータイプの弱点（どく、はがね）と最強ポケモン。' },
    ru: { name: 'Волшебный', title: 'Волшебный тип - Уязвимости и контр-покемоны | Pokémon GO', desc: 'Волшебный тип в Pokémon GO: иммунитет к драконам.' },
  },
};

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; type: string }[] = [];

  languages.forEach((lang) => {
    POKEMON_TYPES.forEach((type) => {
      params.push({ lang, type });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; type: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const typeSlug = unwrapped.type.toLowerCase() as PokemonTypeSlug;

  const info = TYPE_TRANSLATIONS[typeSlug]?.[lang] || TYPE_TRANSLATIONS[typeSlug]?.en;
  if (!info) {
    return {
      title: 'Type Not Found | Pokémon GO Event Tracker',
      description: 'Type not found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/types/${typeSlug}`;

  return {
    title: info.title,
    description: info.desc,
    alternates: buildAlternates(lang, `/types/${typeSlug}`),
    openGraph: {
      title: info.title,
      description: info.desc,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: info.title }],
    },
  };
}

export default async function PokemonTypePage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const typeSlug = unwrapped.type.toLowerCase() as PokemonTypeSlug;

  const info = TYPE_TRANSLATIONS[typeSlug]?.[lang] || TYPE_TRANSLATIONS[typeSlug]?.en;
  if (!info) {
    notFound();
  }

  const capitalizedType = typeSlug.charAt(0).toUpperCase() + typeSlug.slice(1);
  const canonicalUrl = `https://pogoevents.app/${lang}/types/${typeSlug}`;

  const weaknessInfos = getCounterTypes([capitalizedType]);
  const weaknesses = weaknessInfos.map((w) => `${localizeTypeName(w.type, lang)} (${w.label})`);
  const resistances = Object.entries(TYPE_CHART)
    .filter(([, defMap]) => (defMap[capitalizedType] ?? 1) < 1)
    .map(([atkType]) => localizeTypeName(atkType, lang));
  const superEffectiveTargets = Object.entries(TYPE_CHART[capitalizedType] || {})
    .filter(([, mult]) => mult > 1)
    .map(([defType]) => localizeTypeName(defType, lang));

  const topTypeAttackers = pokemonRankings
    .filter(isPokemonReleasedInGo)
    .filter((p) => p.types.includes(capitalizedType) || p.bestChargedMove?.type === capitalizedType)
    .sort((a, b) => (b.pveScore * 10 + b.dps * 0.5) - (a.pveScore * 10 + a.dps * 0.5))
    .slice(0, 10);

  const topNamesList = topTypeAttackers
    .slice(0, 5)
    .map((p) => getPokemonName(p.name, lang))
    .join(', ');

  const faqs = [
    {
      question:
        lang === 'cs'
          ? `Jaké má ${info.name} typ slabosti a odolnosti v Pokémon GO?`
          : lang === 'ja'
            ? `Pokémon GOにおける${info.name}タイプの弱点と耐性は？`
            : lang === 'ru'
              ? `Какие слабости и сопротивления у типа «${info.name}» в Pokémon GO?`
              : `What are ${capitalizedType}-type weaknesses and resistances in Pokémon GO?`,
      answer:
        lang === 'cs'
          ? `Pokémoni typu ${info.name} (${capitalizedType}) mají v Pokémon GO slabost vůči útokům typů ${weaknesses.join(', ')} (1,6× zvýšené zranění) a naopak odolávají útokům typů ${resistances.length > 0 ? resistances.join(', ') : 'žádným'}. Útoky tohoto typu jsou super efektivní proti typům: ${superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : 'žádným'}.`
          : lang === 'ja'
            ? `Pokémon GOの${info.name}タイプは、${weaknesses.join('、')}タイプの技が弱点（1.6倍ダメージ）で、${resistances.length > 0 ? resistances.join('、') : 'なし'}タイプに耐性があります。攻撃面では${superEffectiveTargets.length > 0 ? superEffectiveTargets.join('、') : 'なし'}タイプに効果ばつぐんです。`
            : lang === 'ru'
              ? `Покемоны типа «${info.name}» (${capitalizedType}) в Pokémon GO уязвимы к атакам типов ${weaknesses.join(', ')} (1.6× урона) и имеют сопротивление к типам: ${resistances.length > 0 ? resistances.join(', ') : 'нет'}. В атаке этот тип суперэффективен против: ${superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : 'нет'}.`
              : `${capitalizedType}-type Pokémon are weak to ${weaknesses.join(', ')} attacks (1.6x damage in Pokémon GO) and resist ${resistances.length > 0 ? resistances.join(', ') : 'none'}. Offensively, ${capitalizedType}-type moves deal super-effective damage against ${superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : 'no'} types.`,
    },
    {
      question:
        lang === 'cs'
          ? `Kteří Pokémoni jsou nejsilnější útočníci typu ${info.name} do raidů?`
          : lang === 'ja'
            ? `${info.name}タイプの最強レイドアタッカーはどのポケモンですか？`
            : lang === 'ru'
              ? `Какие покемоны типа «${info.name}» являются лучшими атакующими для рейдов?`
              : `Which Pokémon are the strongest ${capitalizedType}-type raid attackers?`,
      answer:
        lang === 'cs'
          ? `Mezi 5 nejsilnějších vydaných útočníků typu ${info.name} podle efektivního raidového skóre (ER) a DPS patří: ${topNamesList}. Kompletní Top 10 tabulku s doporučenými Fast a Charged útoky najdete přímo na této stránce.`
          : lang === 'ja'
            ? `${info.name}タイプのレイド総合火力（ER・DPS）トップ5は ${topNamesList} です。最適技構成を含むトップ10一覧は本ページのテーブルで確認できます。`
            : lang === 'ru'
              ? `В топ-5 сильнейших доступных атакующих типа «${info.name}» по показателям ER и DPS входят: ${topNamesList}. Полная таблица Топ-10 с лучшими атаками приведена на этой странице.`
              : `The top 5 strongest released ${capitalizedType}-type raid attackers by Effective Rating (ER) and DPS are ${topNamesList}. See the full Top 10 table on this page for optimal Fast and Charged movesets.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: info.title,
        description: info.desc,
        url: canonicalUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('types', lang), item: `https://pogoevents.app/${lang}/rankings` },
          { '@type': 'ListItem', position: 3, name: info.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Type Mastery Guide Article */}
      <article
        className="seo-entity-summary card"
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {/* Quick Type Navigation Bar */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {POKEMON_TYPES.map((tSlug) => {
            const tInfo = TYPE_TRANSLATIONS[tSlug]?.[lang] || TYPE_TRANSLATIONS[tSlug]?.en;
            const active = tSlug === typeSlug;
            return (
              <Link
                key={tSlug}
                href={`/${lang}/types/${tSlug}`}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 750,
                  textDecoration: 'none',
                  background: active ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.03)',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  border: active ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid var(--border-color)',
                }}
              >
                {tInfo.name}
              </Link>
            );
          })}
        </div>

        <h1 style={{ fontSize: '1.45rem', fontWeight: 850, margin: '0 0 8px 0' }}>{info.title}</h1>
        <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{info.desc}</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginBottom: '16px',
            alignItems: 'start',
          }}
        >
          <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.07)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <strong style={{ display: 'block', fontSize: '0.8rem', color: '#f87171', marginBottom: '4px' }}>
              {lang === 'cs' ? 'Slabosti (1.6× zranění):' : lang === 'ja' ? '弱点（1.6倍ダメージ）:' : lang === 'ru' ? 'Слабости (1.6× урона):' : 'Weaknesses (1.6x DMG):'}
            </strong>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 650 }}>
              {weaknesses.join(', ')}
            </span>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.07)', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
            <strong style={{ display: 'block', fontSize: '0.8rem', color: '#4ade80', marginBottom: '4px' }}>
              {lang === 'cs' ? 'Odolnosti (0.625× / 0.39×):' : lang === 'ja' ? '耐性（ダメージ軽減）:' : lang === 'ru' ? 'Сопротивления:' : 'Resistances (0.625x / 0.39x):'}
            </strong>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 650 }}>
              {resistances.length > 0 ? resistances.join(', ') : '—'}
            </span>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.07)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <strong style={{ display: 'block', fontSize: '0.8rem', color: '#38bdf8', marginBottom: '4px' }}>
              {lang === 'cs' ? 'Silný v útoku proti:' : lang === 'ja' ? '攻撃で効果ばつぐん:' : lang === 'ru' ? 'Суперэффективен против:' : 'Super effective against:'}
            </strong>
            <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 650 }}>
              {superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : '—'}
            </span>
          </div>
        </div>

        <p style={{ margin: '0 0 16px 0', fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {lang === 'cs'
            ? `Při stavbě týmu do 5★ a Mega Raidů vybírejte útočníky s bonusem stejného typu útoku (STAB, +20 % poškození) a aktivní Mega evolucí, která v raidu posiluje všechny spojence o dalších 30 %. V přehledu níže najdete Top 10 nejsilnějších vydaných Pokémonů typu ${info.name} seřazených podle efektivního hodnocení (ER) a DPS.`
            : lang === 'ja'
              ? `5つ星レイドやメガレイドの対策パーティを組む際は、タイプ一致ボーナス（STAB：威力1.2倍）と味方全体を強化するメガシンカ枠（同タイプ威力1.3倍）を活用しましょう。以下では${info.name}タイプの最強アタッカーTOP10と全ランキングをER（総合火力指数）・DPS順で比較できます。`
              : lang === 'ru'
                ? `При сборке команды для 5★ и Мега-рейдов выбирайте покемонов с бонусом одного типа (STAB, +20% к урону) и активной Мега-эволюцией, усиливающей союзников на 30%. Ниже представлены Топ-10 лучших доступных покемонов типа «${info.name}» по показателям ER и DPS.`
                : `When building a team for 5-Star and Mega Raids, prioritize attackers that benefit from Same-Type Attack Bonus (STAB, 1.2x damage) alongside an active Mega Evolution to boost all allies' ${capitalizedType}-type attacks by 30%. Below are the Top 10 strongest released ${capitalizedType}-type attackers ranked by Effective Rating (ER) and DPS.`}
        </p>

        {/* Server-rendered Top 10 Type Attackers Table */}
        {topTypeAttackers.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '8px 10px' }}>#</th>
                  <th style={{ padding: '8px 10px' }}>Pokémon</th>
                  <th style={{ padding: '8px 10px' }}>Max CP (Lv50)</th>
                  <th style={{ padding: '8px 10px' }}>Fast / Charged Move</th>
                  <th style={{ padding: '8px 10px' }}>DPS / ER</th>
                </tr>
              </thead>
              <tbody>
                {topTypeAttackers.map((poke, idx) => {
                  const dexEntry = getPokedexEntryById(poke.pokedexId);
                  const slug = dexEntry?.slug || String(poke.pokedexId);
                  return (
                    <tr key={`${poke.pokedexId}-${poke.name}-${idx}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 800, color: idx < 3 ? '#facc15' : 'var(--text-muted)' }}>
                        #{idx + 1}
                      </td>
                      <td style={{ padding: '8px 10px', fontWeight: 750 }}>
                        <Link
                          href={`/${lang}/pokedex/${slug}`}
                          style={{ color: 'var(--cyan-accent)', textDecoration: 'none' }}
                        >
                          {getPokemonName(poke.name, lang)}
                        </Link>
                      </td>
                      <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>{poke.maxCp} CP</td>
                      <td style={{ padding: '8px 10px', color: 'var(--text-secondary)' }}>
                        {poke.bestFastMove.name} + <strong>{poke.bestChargedMove.name}</strong>
                      </td>
                      <td style={{ padding: '8px 10px', color: '#4ade80', fontWeight: 700 }}>
                        {poke.dps.toFixed(1)} DPS ({poke.pveScore} ER)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </article>

      <PokemonRankingsView lang={lang} initialSelectedType={capitalizedType} />
    </div>
  );
}
