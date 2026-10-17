import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
import type { Language } from '@/data/translations';
import { TYPE_CHART, getCounterTypes } from '@/utils/pokemonCountersHelper';
import { buildAlternates, getBreadcrumbLabel } from '@/utils/seoHelper';

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
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: info.title }]
    }
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
  const weaknesses = weaknessInfos.map((w) => `${w.type} (${w.label})`);
  const resistances = Object.entries(TYPE_CHART)
    .filter(([, defMap]) => (defMap[capitalizedType] ?? 1) < 1)
    .map(([atkType]) => atkType);
  const superEffectiveTargets = Object.entries(TYPE_CHART[capitalizedType] || {})
    .filter(([, mult]) => mult > 1)
    .map(([defType]) => defType);

  const faqQuestionByLang: Record<Language, string> = {
    cs: `Jaké má ${info.name} typ slabosti a odolnosti v Pokémon GO?`,
    en: `What are ${capitalizedType}-type weaknesses and resistances in Pokémon GO?`,
    ja: `Pokémon GOにおける${info.name}タイプの弱点と耐性は？`,
    ru: `Какие слабости и сопротивления у типа «${info.name}» в Pokémon GO?`,
  };

  const faqAnswerByLang: Record<Language, string> = {
    cs: `Pokémoni typu ${info.name} (${capitalizedType}) mají v Pokémon GO slabost vůči útokům typů ${weaknesses.join(', ')} (1,6× zvýšené zranění) a naopak odolávají útokům typů ${resistances.length > 0 ? resistances.join(', ') : 'žádným'}. Útoky tohoto typu jsou super efektivní proti typům: ${superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : 'žádným'}.`,
    en: `${capitalizedType}-type Pokémon are weak to ${weaknesses.join(', ')} attacks (1.6x damage in Pokémon GO) and resist ${resistances.length > 0 ? resistances.join(', ') : 'none'}. Offensively, ${capitalizedType}-type moves deal super-effective damage against ${superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : 'no'} types.`,
    ja: `Pokémon GOの${info.name}（${capitalizedType}）タイプは、${weaknesses.join('、')}タイプの技が弱点（1.6倍ダメージ）で、${resistances.length > 0 ? resistances.join('、') : 'なし'}タイプに耐性があります。攻撃面では${superEffectiveTargets.length > 0 ? superEffectiveTargets.join('、') : 'なし'}タイプに効果ばつぐんです。`,
    ru: `Покемоны типа «${info.name}» (${capitalizedType}) в Pokémon GO уязвимы к атакам типов ${weaknesses.join(', ')} (1.6× урона) и имеют сопротивление к типам: ${resistances.length > 0 ? resistances.join(', ') : 'нет'}. В атаке этот тип суперэффективен против: ${superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : 'нет'}.`,
  };

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
        mainEntity: [
          {
            '@type': 'Question',
            name: faqQuestionByLang[lang] || faqQuestionByLang.en,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faqAnswerByLang[lang] || faqAnswerByLang.en,
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: getBreadcrumbLabel('home', lang), item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: getBreadcrumbLabel('types', lang), item: `https://pogoevents.app/${lang}/rankings` },
          { '@type': 'ListItem', position: 3, name: info.name, item: canonicalUrl }
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
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px 0' }}>{info.title}</h2>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{info.desc}</p>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
          <strong>{lang === 'cs' ? 'Slabosti (1.6× zranění):' : lang === 'ja' ? '弱点（1.6倍ダメージ）:' : lang === 'ru' ? 'Слабости (1.6× урона):' : 'Weaknesses (1.6x DMG):'}</strong>{' '}
          {weaknesses.join(', ')} |{' '}
          <strong>{lang === 'cs' ? 'Odolnosti (0.625× / 0.39×):' : lang === 'ja' ? '耐性:' : lang === 'ru' ? 'Сопротивления:' : 'Resistances:'}</strong>{' '}
          {resistances.length > 0 ? resistances.join(', ') : '—'} |{' '}
          <strong>{lang === 'cs' ? 'Silný v útoku proti:' : lang === 'ja' ? '攻撃で効果ばつぐん:' : lang === 'ru' ? 'Суперэффективен против:' : 'Super effective against:'}</strong>{' '}
          {superEffectiveTargets.length > 0 ? superEffectiveTargets.join(', ') : '—'}
        </p>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          {lang === 'cs'
            ? `Při stavbě týmu do 5★ a Mega Raidů vybírejte útočníky s bonusem stejného typu útoku (STAB, +20 % poškození) a aktivní Mega evolucí, která v raidu posiluje všechny spojence o dalších 30 %. V tabulce níže najdete kompletní žebříček nejsilnějších Pokémonů typu ${info.name} seřazený podle efektivního hodnocení (ER) a DPS.`
            : lang === 'ja'
              ? `5つ星レイドやメガレイドの対策パーティを組む際は、タイプ一致ボーナス（STAB：威力1.2倍）と味方全体を強化するメガシンカ枠（同タイプ威力1.3倍）を活用しましょう。以下のランキングでは${info.name}タイプの最強アタッカーをER（総合火力指数）とDPS順で比較できます。`
              : lang === 'ru'
                ? `При сборке команды для 5★ и Мега-рейдов выбирайте покемонов с бонусом одного типа (STAB, +20% к урону) и активной Мега-эволюцией, усиливающей союзников на 30%. В таблице ниже представлен рейтинг лучших покемонов типа «${info.name}» по показателям ER и DPS.`
                : `When building a team for 5-Star and Mega Raids, prioritize attackers that benefit from Same-Type Attack Bonus (STAB, 1.2x damage) alongside an active Mega Evolution to boost all allies' ${capitalizedType}-type attacks by 30%. The table below ranks the strongest ${capitalizedType}-type Pokémon by Effective Rating (ER) and DPS.`}
        </p>
      </article>
      <PokemonRankingsView lang={lang} initialSelectedType={capitalizedType} />
    </>
  );
}
