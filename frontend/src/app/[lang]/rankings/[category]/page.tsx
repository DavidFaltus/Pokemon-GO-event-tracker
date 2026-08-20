import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PokemonRankingsView } from '@/components/PokemonRankingsView';
import type { Language } from '@/data/translations';
import { pokemonRankings } from '@/data/pokemonRankings';

export const revalidate = 3600;

export const RANKING_CATEGORIES = [
  'great-league',
  'ultra-league',
  'master-league',
  'little-cup',
  'best-mega',
  'best-shadow',
  'max-cp',
  'best-gym-defenders',
  'attackers-fire',
  'attackers-water',
  'attackers-grass',
  'attackers-electric',
  'attackers-dragon',
  'attackers-ghost',
  'attackers-dark',
  'attackers-fairy',
  'attackers-steel',
  'attackers-fighting',
  'attackers-ice',
  'attackers-rock',
  'attackers-ground',
  'attackers-flying',
  'attackers-psychic',
  'attackers-poison',
  'attackers-bug',
  'attackers-normal',
] as const;

export type RankingCategory = typeof RANKING_CATEGORIES[number];

const CATEGORY_NAMES: Record<RankingCategory, Record<Language, { title: string; desc: string; filterType?: string }>> = {
  'great-league': {
    cs: { title: 'Great League Žebříček (CP ≤ 1500) | Pokémon GO', desc: 'Nejlepší Pokémoni a tier list pro PvP Great League v Pokémon GO s doporučenými útoky a counters.' },
    en: { title: 'Great League PvP Rankings (CP ≤ 1500) | Pokémon GO', desc: 'Top Pokémon rankings and tier list for Great League PvP in Pokémon GO with optimal movesets and counters.' },
    ja: { title: 'スーパーリーグ (CP 1500以下) 最強ランキング | Pokémon GO', desc: 'Pokémon GO スーパーリーグ (PvP) の最強ポケモンとおすすめ技構成ランキング。' },
    ru: { title: 'Рейтинг Великой Лиги (CP ≤ 1500) | Pokémon GO', desc: 'Лучшие покемоны и тир-лист для PvP Великой Лиги в Pokémon GO с лучшими атаками.' },
  },
  'ultra-league': {
    cs: { title: 'Ultra League Žebříček (CP ≤ 2500) | Pokémon GO', desc: 'Nejlepší Pokémoni pro PvP Ultra League v Pokémon GO včetně XL variant a ideálních útoků.' },
    en: { title: 'Ultra League PvP Rankings (CP ≤ 2500) | Pokémon GO', desc: 'Top Pokémon tier list and rankings for Ultra League PvP in Pokémon GO with movesets and XL stats.' },
    ja: { title: 'ハイパーリーグ (CP 2500以下) 最強ランキング | Pokémon GO', desc: 'Pokémon GO ハイパーリーグの最強ポケモンランキングとおすすめ対策。' },
    ru: { title: 'Рейтинг Ультра Лиги (CP ≤ 2500) | Pokémon GO', desc: 'Лучшие покемоны для PvP Ультра Лиги в Pokémon GO.' },
  },
  'master-league': {
    cs: { title: 'Master League Žebříček (Bez CP limitu) | Pokémon GO', desc: 'Nejsilnější Legendární a Master League Pokémoni v Pokémon GO (Level 50 Hundo meta).' },
    en: { title: 'Master League PvP Rankings (No CP Limit) | Pokémon GO', desc: 'Top Legendary and Master League Pokémon tier list in Pokémon GO at Level 50.' },
    ja: { title: 'マスターリーグ 最強ランキング | Pokémon GO', desc: 'Pokémon GO マスターリーグ (CP無制限) の最強伝説ポケモンランキング。' },
    ru: { title: 'Рейтинг Мастер Лиги | Pokémon GO', desc: 'Лучшие легендарные покемоны для Мастер Лиги в Pokémon GO.' },
  },
  'little-cup': {
    cs: { title: 'Little Cup Žebříček (CP ≤ 500) | Pokémon GO', desc: 'Nejlepší Pokémoni pro Little Cup (500 CP) formát v Pokémon GO.' },
    en: { title: 'Little Cup Rankings (CP ≤ 500) | Pokémon GO', desc: 'Best Pokémon and meta picks for Little Cup (500 CP) in Pokémon GO.' },
    ja: { title: 'リトルカップ (CP 500以下) 最強ランキング | Pokémon GO', desc: 'Pokémon GO リトルカップのおすすめ最強ポケモン一覧。' },
    ru: { title: 'Рейтинг Малого Кубка (CP ≤ 500) | Pokémon GO', desc: 'Лучшие покемоны для Малого Кубка (500 CP) в Pokémon GO.' },
  },
  'best-mega': {
    cs: { title: 'Nejlepší Mega Evoluce Žebříček | Pokémon GO', desc: 'Žebříček nejlepších Mega a Primal Pokémonů v Pokémon GO podle DPS a raidové síly.' },
    en: { title: 'Best Mega Evolutions Tier List | Pokémon GO', desc: 'Top Mega & Primal Pokémon tier list in Pokémon GO ranked by raid DPS and power.' },
    ja: { title: '最強メガシンカ ランキング | Pokémon GO', desc: 'Pokémon GOの最強メガシンカ・ゲンシカイキポケモンのレイドDPSランキング。' },
    ru: { title: 'Лучшие Мега-эволюции | Pokémon GO', desc: 'Рейтинг лучших Мега-покемонов в Pokémon GO по урону в рейдах.' },
  },
  'best-shadow': {
    cs: { title: 'Nejlepší Shadow Pokémoni Žebříček | Pokémon GO', desc: 'Žebříček nejlepších Shadow (stínových) útočníků s +20% bonusem k útoku v Pokémon GO.' },
    en: { title: 'Best Shadow Pokémon Tier List | Pokémon GO', desc: 'Top Shadow Pokémon tier list with +20% Attack bonus in Pokémon GO ranked for Raids and PvP.' },
    ja: { title: '最強シャドウポケモン ランキング | Pokémon GO', desc: 'Pokémon GOの攻撃力1.2倍シャドウポケモンの最強レイドアタッカーランキング。' },
    ru: { title: 'Лучшие Shadow покемоны | Pokémon GO', desc: 'Рейтинг лучших теневых покемонов в Pokémon GO.' },
  },
  'max-cp': {
    cs: { title: 'Pokémoni s nejvyšším CP (Level 50) | Pokémon GO', desc: 'Kompletní tabulka Pokémonů s nejvyšším maximálním CP v Pokémon GO.' },
    en: { title: 'Highest Max CP Pokémon Chart (Level 50) | Pokémon GO', desc: 'Complete chart of highest Max CP Pokémon in Pokémon GO at Level 50.' },
    ja: { title: '最大CPランキング (Lv50) | Pokémon GO', desc: 'Pokémon GOで最もCPが高いポケモンの最大CPランキング一覧。' },
    ru: { title: 'Покемоны с максимальным CP (Ур. 50) | Pokémon GO', desc: 'Таблица покемонов с наивысшим CP в Pokémon GO.' },
  },
  'best-gym-defenders': {
    cs: { title: 'Nejlepší obránci gymů Žebříček | Pokémon GO', desc: 'Nejlepší Pokémoni na bránění gymů (Blissey, Chansey, Snorlax) s nejvyšší výdrží.' },
    en: { title: 'Best Gym Defenders Tier List | Pokémon GO', desc: 'Top gym defenders in Pokémon GO (Blissey, Chansey, Snorlax) ranked by bulk and stamina.' },
    ja: { title: 'ジム防衛 最強ポケモンランキング | Pokémon GO', desc: 'Pokémon GOのジム防衛におすすめの高耐久ポケモンランキング。' },
    ru: { title: 'Лучшие защитники гимов | Pokémon GO', desc: 'Лучшие покемоны для защиты гимов в Pokémon GO.' },
  },
  'attackers-fire': {
    cs: { title: 'Nejlepší Ohniví Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších ohnivých (Fire) útočníků v Pokémon GO podle DPS a TDO.', filterType: 'Fire' },
    en: { title: 'Best Fire Type Attackers for Raids | Pokémon GO', desc: 'Top Fire type raid attackers in Pokémon GO ranked by DPS and TDO.', filterType: 'Fire' },
    ja: { title: 'ほのおタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのほのおタイプ最強レイドアタッカー一覧。', filterType: 'Fire' },
    ru: { title: 'Лучшие огненные атакующие покемоны | Pokémon GO', desc: 'Рейтинг огненных покемонов в Pokémon GO.', filterType: 'Fire' },
  },
  'attackers-water': {
    cs: { title: 'Nejlepší Vodní Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších vodních (Water) Pokémonů v Pokémon GO.', filterType: 'Water' },
    en: { title: 'Best Water Type Attackers for Raids | Pokémon GO', desc: 'Top Water type raid attackers in Pokémon GO ranked by DPS and TDO.', filterType: 'Water' },
    ja: { title: 'みずタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのみずタイプ最強レイドアタッカー一覧。', filterType: 'Water' },
    ru: { title: 'Лучшие водные атакующие покемоны | Pokémon GO', desc: 'Рейтинг водных покемонов в Pokémon GO.', filterType: 'Water' },
  },
  'attackers-grass': {
    cs: { title: 'Nejlepší Travní Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších travních (Grass) Pokémonů v Pokémon GO.', filterType: 'Grass' },
    en: { title: 'Best Grass Type Attackers for Raids | Pokémon GO', desc: 'Top Grass type raid attackers in Pokémon GO ranked by DPS and TDO.', filterType: 'Grass' },
    ja: { title: 'くさタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのくさタイプ最強レイドアタッカー一覧。', filterType: 'Grass' },
    ru: { title: 'Лучшие травяные атакующие покемоны | Pokémon GO', desc: 'Рейтинг травяных покемонов в Pokémon GO.', filterType: 'Grass' },
  },
  'attackers-electric': {
    cs: { title: 'Nejlepší Elektroničtí Útočníci | Pokémon GO', desc: 'Žebříček nejlepších elektrických (Electric) Pokémonů v Pokémon GO.', filterType: 'Electric' },
    en: { title: 'Best Electric Type Attackers for Raids | Pokémon GO', desc: 'Top Electric type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Electric' },
    ja: { title: 'でんきタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのでんきタイプ最強レイドアタッカー一覧。', filterType: 'Electric' },
    ru: { title: 'Лучшие электрические атакующие покемоны | Pokémon GO', desc: 'Рейтинг электрических покемонов в Pokémon GO.', filterType: 'Electric' },
  },
  'attackers-dragon': {
    cs: { title: 'Nejlepší Dračí Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších dračích (Dragon) Pokémonů v Pokémon GO.', filterType: 'Dragon' },
    en: { title: 'Best Dragon Type Attackers for Raids | Pokémon GO', desc: 'Top Dragon type raid attackers in Pokémon GO ranked by DPS and TDO.', filterType: 'Dragon' },
    ja: { title: 'ドラゴンタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのドラゴンタイプ最強レイドアタッカー一覧。', filterType: 'Dragon' },
    ru: { title: 'Лучшие драконьи атакующие покемоны | Pokémon GO', desc: 'Рейтинг драконьих покемонов в Pokémon GO.', filterType: 'Dragon' },
  },
  'attackers-ghost': {
    cs: { title: 'Nejlepší Duchoví Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších duchových (Ghost) Pokémonů v Pokémon GO.', filterType: 'Ghost' },
    en: { title: 'Best Ghost Type Attackers for Raids | Pokémon GO', desc: 'Top Ghost type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Ghost' },
    ja: { title: 'ゴーストタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのゴーストタイプ最強レイドアタッカー一覧。', filterType: 'Ghost' },
    ru: { title: 'Лучшие призрачные атакующие покемоны | Pokémon GO', desc: 'Рейтинг призрачных покемонов в Pokémon GO.', filterType: 'Ghost' },
  },
  'attackers-dark': {
    cs: { title: 'Nejlepší Temní Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších temných (Dark) Pokémonů v Pokémon GO.', filterType: 'Dark' },
    en: { title: 'Best Dark Type Attackers for Raids | Pokémon GO', desc: 'Top Dark type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Dark' },
    ja: { title: 'あくタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのあくタイプ最強レイドアタッカー一覧。', filterType: 'Dark' },
    ru: { title: 'Лучшие темные атакующие покемоны | Pokémon GO', desc: 'Рейтинг темных покемонов в Pokémon GO.', filterType: 'Dark' },
  },
  'attackers-fairy': {
    cs: { title: 'Nejlepší Vílí Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších vílích (Fairy) Pokémonů v Pokémon GO.', filterType: 'Fairy' },
    en: { title: 'Best Fairy Type Attackers for Raids | Pokémon GO', desc: 'Top Fairy type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Fairy' },
    ja: { title: 'フェアリータイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのフェアリータイプ最強レイドアタッカー一覧。', filterType: 'Fairy' },
    ru: { title: 'Лучшие волшебные атакующие покемоны | Pokémon GO', desc: 'Рейтинг волшебных покемонов в Pokémon GO.', filterType: 'Fairy' },
  },
  'attackers-steel': {
    cs: { title: 'Nejlepší Oceloví Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších ocelových (Steel) Pokémonů v Pokémon GO.', filterType: 'Steel' },
    en: { title: 'Best Steel Type Attackers for Raids | Pokémon GO', desc: 'Top Steel type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Steel' },
    ja: { title: 'はがねタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのはがねタイプ最強レイドアタッカー一覧。', filterType: 'Steel' },
    ru: { title: 'Лучшие стальные атакующие покемоны | Pokémon GO', desc: 'Рейтинг стальных покемонов в Pokémon GO.', filterType: 'Steel' },
  },
  'attackers-fighting': {
    cs: { title: 'Nejlepší Bojoví Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších bojových (Fighting) Pokémonů v Pokémon GO.', filterType: 'Fighting' },
    en: { title: 'Best Fighting Type Attackers for Raids | Pokémon GO', desc: 'Top Fighting type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Fighting' },
    ja: { title: 'かくとうタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのかくとうタイプ最強レイドアタッカー一覧。', filterType: 'Fighting' },
    ru: { title: 'Лучшие боевые атакующие покемоны | Pokémon GO', desc: 'Рейтинг боевых покемонов в Pokémon GO.', filterType: 'Fighting' },
  },
  'attackers-ice': {
    cs: { title: 'Nejlepší Ledoví Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších ledových (Ice) Pokémonů v Pokémon GO.', filterType: 'Ice' },
    en: { title: 'Best Ice Type Attackers for Raids | Pokémon GO', desc: 'Top Ice type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Ice' },
    ja: { title: 'こおりタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのこおりタイプ最強レイドアタッカー一覧。', filterType: 'Ice' },
    ru: { title: 'Лучшие ледяные атакующие покемоны | Pokémon GO', desc: 'Рейтинг ледяных покемонов в Pokémon GO.', filterType: 'Ice' },
  },
  'attackers-rock': {
    cs: { title: 'Nejlepší Kamenní Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších kamenných (Rock) Pokémonů v Pokémon GO.', filterType: 'Rock' },
    en: { title: 'Best Rock Type Attackers for Raids | Pokémon GO', desc: 'Top Rock type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Rock' },
    ja: { title: 'いわタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのいわタイプ最強レイドアタッカー一覧。', filterType: 'Rock' },
    ru: { title: 'Лучшие каменные атакующие покемоны | Pokémon GO', desc: 'Рейтинг каменных покемонов в Pokémon GO.', filterType: 'Rock' },
  },
  'attackers-ground': {
    cs: { title: 'Nejlepší Zemní Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších zemních (Ground) Pokémonů v Pokémon GO.', filterType: 'Ground' },
    en: { title: 'Best Ground Type Attackers for Raids | Pokémon GO', desc: 'Top Ground type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Ground' },
    ja: { title: 'じめんタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのじめんタイプ最強レイドアタッカー一覧。', filterType: 'Ground' },
    ru: { title: 'Лучшие земляные атакующие покемоны | Pokémon GO', desc: 'Рейтинг земляных покемонов в Pokémon GO.', filterType: 'Ground' },
  },
  'attackers-flying': {
    cs: { title: 'Nejlepší Létající Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších létajících (Flying) Pokémonů v Pokémon GO.', filterType: 'Flying' },
    en: { title: 'Best Flying Type Attackers for Raids | Pokémon GO', desc: 'Top Flying type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Flying' },
    ja: { title: 'ひこうタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのひこうタイプ最強レイドアタッカー一覧。', filterType: 'Flying' },
    ru: { title: 'Лучшие летающие атакующие покемоны | Pokémon GO', desc: 'Рейтинг летающих покемонов в Pokémon GO.', filterType: 'Flying' },
  },
  'attackers-psychic': {
    cs: { title: 'Nejlepší Psychičtí Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších psychických (Psychic) Pokémonů v Pokémon GO.', filterType: 'Psychic' },
    en: { title: 'Best Psychic Type Attackers for Raids | Pokémon GO', desc: 'Top Psychic type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Psychic' },
    ja: { title: 'エスパータイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのエスパータイプ最強レイドアタッカー一覧。', filterType: 'Psychic' },
    ru: { title: 'Лучшие психические атакующие покемоны | Pokémon GO', desc: 'Рейтинг психических покемонов в Pokémon GO.', filterType: 'Psychic' },
  },
  'attackers-poison': {
    cs: { title: 'Nejlepší Jedoví Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších jedových (Poison) Pokémonů v Pokémon GO.', filterType: 'Poison' },
    en: { title: 'Best Poison Type Attackers for Raids | Pokémon GO', desc: 'Top Poison type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Poison' },
    ja: { title: 'どくタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのどくタイプ最強レイドアタッカー一覧。', filterType: 'Poison' },
    ru: { title: 'Лучшие ядовитые атакующие покемоны | Pokémon GO', desc: 'Рейтинг ядовитых покемонов в Pokémon GO.', filterType: 'Poison' },
  },
  'attackers-bug': {
    cs: { title: 'Nejlepší Hmyzí Útočníci do Raidů | Pokémon GO', desc: 'Žebříček nejlepších hmyzích (Bug) Pokémonů v Pokémon GO.', filterType: 'Bug' },
    en: { title: 'Best Bug Type Attackers for Raids | Pokémon GO', desc: 'Top Bug type raid attackers in Pokémon GO ranked by DPS.', filterType: 'Bug' },
    ja: { title: 'むしタイプ 最強アタッカーランキング | Pokémon GO', desc: 'Pokémon GOのむしタイプ最強レイドアタッカー一覧。', filterType: 'Bug' },
    ru: { title: 'Лучшие насекомые атакующие покемоны | Pokémon GO', desc: 'Рейтинг насекомых покемонов в Pokémon GO.', filterType: 'Bug' },
  },
  'attackers-normal': {
    cs: { title: 'Nejlepší Normální Útočníci | Pokémon GO', desc: 'Žebříček normálních (Normal) Pokémonů v Pokémon GO podle CP a síly.', filterType: 'Normal' },
    en: { title: 'Best Normal Type Attackers | Pokémon GO', desc: 'Top Normal type Pokémon in Pokémon GO ranked by CP and power.', filterType: 'Normal' },
    ja: { title: 'ノーマルタイプ 最強ポケモンランキング | Pokémon GO', desc: 'Pokémon GOのノーマルタイプ最強ポケモン一覧。', filterType: 'Normal' },
    ru: { title: 'Лучшие нормальные покемоны | Pokémon GO', desc: 'Рейтинг нормальных покемонов в Pokémon GO.', filterType: 'Normal' },
  },
};

export function generateStaticParams() {
  const languages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const params: { lang: Language; category: string }[] = [];

  languages.forEach((lang) => {
    RANKING_CATEGORIES.forEach((category) => {
      params.push({ lang, category });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ lang: Language; category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const category = unwrapped.category as RankingCategory;

  const info = CATEGORY_NAMES[category]?.[lang] || CATEGORY_NAMES[category]?.en;
  if (!info) {
    return {
      title: 'Rankings Not Found | Pokémon GO Event Tracker',
      description: 'Category not found.',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rankings/${category}`;

  return {
    title: info.title,
    description: info.desc,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'cs': `https://pogoevents.app/cs/rankings/${category}`,
        'en': `https://pogoevents.app/en/rankings/${category}`,
        'ja': `https://pogoevents.app/ja/rankings/${category}`,
        'ru': `https://pogoevents.app/ru/rankings/${category}`,
      },
    },
    openGraph: {
      title: info.title,
      description: info.desc,
      url: canonicalUrl,
      images: [{ url: 'https://pogoevents.app/logo-banner.jpg', width: 1200, height: 630, alt: info.title }]
    }
  };
}

export default async function CategoryRankingsPage({ params }: PageProps) {
  const unwrapped = await params;
  const validLanguages: Language[] = ['cs', 'en', 'ja', 'ru'];
  const lang: Language = validLanguages.includes(unwrapped.lang as Language) ? (unwrapped.lang as Language) : 'cs';
  const category = unwrapped.category as RankingCategory;

  const info = CATEGORY_NAMES[category]?.[lang] || CATEGORY_NAMES[category]?.en;
  if (!info) {
    notFound();
  }

  const canonicalUrl = `https://pogoevents.app/${lang}/rankings/${category}`;
  const filterType = CATEGORY_NAMES[category]?.en?.filterType;

  // Schema.org ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: info.title,
        description: info.desc,
        url: canonicalUrl,
        numberOfItems: 20,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://pogoevents.app/${lang}` },
          { '@type': 'ListItem', position: 2, name: 'Rankings', item: `https://pogoevents.app/${lang}/rankings` },
          { '@type': 'ListItem', position: 3, name: info.title, item: canonicalUrl }
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
      <PokemonRankingsView lang={lang} initialSearchQuery={filterType || ''} />
    </>
  );
}
