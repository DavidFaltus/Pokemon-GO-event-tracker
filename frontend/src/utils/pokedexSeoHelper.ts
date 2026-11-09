import { PokemonRankData, pokemonRankings, getPokemonByIdOrSlug } from '../data/pokemonRankings';
import type { PokedexCatalogEntry } from '../data/pokedexCatalog';
import metaIndexData from '../data/pokedexMetaIndex.json';
import { getPokemonName } from './pokemonTranslator';
import { TYPE_CHART } from './pokemonCountersHelper';
import type { Language } from '../data/translations';

const META_INDEX = metaIndexData as Record<string, any>;

export interface PvpLeagueAnalysis {
  eligible: boolean;
  maxCpInLeague: number;
  bestLevel: number;
  optimalIvSpread: string;
  statProductScore: number;
  notes: Record<Language, string>;
}

/**
 * Determines whether a Pokédex entry belongs to the curated Top ~200 meta-relevant
 * Pokémon that should be indexed in sitemap-pokedex.xml and robots meta for AdSense quality compliance.
 * Excludes all unreleased Pokémon and low-relevance filler stages so the site is never flagged for Scaled Content Abuse.
 */
export function isTopMetaPokedexEntry(entry: PokedexCatalogEntry): boolean {
  if (!entry || !entry.isReleasedInGo) return false;

  if (entry.hasMega || entry.hasGigantamax) return true;
  if (['legendary', 'mythical', 'ultra_beast'].includes(entry.rarityClass)) return true;

  const meta = META_INDEX[entry.slug];
  if (meta) {
    if (
      entry.maxCp.lv50 >= 2500 &&
      (meta.pve?.score >= 78 || (meta.pve?.typeRank?.rank && meta.pve.typeRank.rank <= 12))
    ) {
      return true;
    }
    if (
      entry.maxCp.lv50 >= 1350 &&
      ((meta.pvp?.great?.rank && meta.pvp.great.rank <= 40) ||
        (meta.pvp?.ultra?.rank && meta.pvp.ultra.rank <= 40) ||
        (meta.pvp?.master?.rank && meta.pvp.master.rank <= 40))
    ) {
      return true;
    }
    if (
      entry.maxCp.lv50 >= 2400 &&
      ((meta.maxBattle?.attackerRank?.rank && meta.maxBattle.attackerRank.rank <= 5) ||
        (meta.maxBattle?.tankRank?.rank && meta.maxBattle.tankRank.rank <= 12))
    ) {
      return true;
    }
  }

  return entry.maxCp.lv50 >= 3600;
}

/**
 * Analyzes suitability and stat product for Great League (CP <= 1500)
 */
export function analyzeGreatLeague(poke: PokemonRankData): PvpLeagueAnalysis {
  if (poke.maxCp < 1100) {
    return {
      eligible: false,
      maxCpInLeague: poke.maxCp,
      bestLevel: 50,
      optimalIvSpread: '15/15/15',
      statProductScore: 0,
      notes: {
        cs: 'Maximální CP nedosahuje konkurenceschopné úrovně pro Great League.',
        en: 'Max CP is too low to be competitive in Great League.',
        ja: '最大CPが低いため、スーパーリーグでの実用性は限定的です。',
        ru: 'Максимальный CP слишком мал для конкурентной игры в Великой Лиге.',
      },
    };
  }

  const isCapped = poke.maxCp > 1500;
  const bestLvl = isCapped
    ? Math.min(45, Math.max(15, Math.round((1500 / poke.maxCp) * 50)))
    : 50;

  return {
    eligible: true,
    maxCpInLeague: isCapped ? Math.min(1500, Math.floor(1500 * 0.998)) : poke.maxCp,
    bestLevel: bestLvl,
    optimalIvSpread: isCapped ? '0/15/14 nebo 1/15/15' : '15/15/15',
    statProductScore: isCapped ? 1850 : Math.round(poke.maxCp * 1.6),
    notes: isCapped
      ? {
          cs: 'Doporučeno nízké IV na útok (0–1) a maximální obrana/výdrž pro maximalizaci stat productu pod limitem 1500 CP.',
          en: 'Low Attack IV (0–1) with high Defense/Stamina is recommended to maximize bulk below the 1500 CP limit.',
          ja: 'CP1500制限内でステータス積を最大化するため、攻撃個体値0〜1・防御HP高めが推奨されます。',
          ru: 'Рекомендуется низкий IV атаки (0–1) и высокая защита/выносливость для максимизации характеристик до 1500 CP.',
        }
      : {
          cs: 'Vyžaduje maximální IV (15/15/15) a investici XL Candy na Level 50 pro dosažení stropu ligy.',
          en: 'Requires max IV (15/15/15) and XL Candy investment up to Level 50 to reach league cap.',
          ja: 'リーグ上限に達するために100% IV（15/15/15）とアメXL（PL50強化）が必要です。',
          ru: 'Требуется максимальный IV (15/15/15) и вложение XL конфет до 50-го уровня.',
        },
  };
}

/**
 * Analyzes suitability and stat product for Ultra League (CP <= 2500)
 */
export function analyzeUltraLeague(poke: PokemonRankData): PvpLeagueAnalysis {
  if (poke.maxCp < 2100) {
    return {
      eligible: false,
      maxCpInLeague: poke.maxCp,
      bestLevel: 50,
      optimalIvSpread: '15/15/15',
      statProductScore: 0,
      notes: {
        cs: 'Maximální CP nedosahuje konkurenceschopné úrovně pro Ultra League.',
        en: 'Max CP is too low to be competitive in Ultra League.',
        ja: '最大CPが低いため、ハイパーリーグでの実用性は限定的です。',
        ru: 'Максимальный CP слишком мал для конкурентной игры в Ультра Лиге.',
      },
    };
  }

  const isCapped = poke.maxCp > 2500;
  const bestLvl = isCapped
    ? Math.min(50, Math.max(25, Math.round((2500 / poke.maxCp) * 50)))
    : 50;

  return {
    eligible: true,
    maxCpInLeague: isCapped ? Math.min(2500, Math.floor(2500 * 0.998)) : poke.maxCp,
    bestLevel: bestLvl,
    optimalIvSpread: isCapped ? '0/15/15 nebo 1/15/14' : '15/15/15',
    statProductScore: isCapped ? 3450 : Math.round(poke.maxCp * 1.4),
    notes: isCapped
      ? {
          cs: 'Skvělá volba pro Ultra League; maximalizujte stat product s nízkým útočným IV.',
          en: 'Strong choice for Ultra League; optimize stat product with low Attack IV.',
          ja: 'ハイパーリーグで強力です。攻撃個体値を抑えて耐久ステータスを優先しましょう。',
          ru: 'Отличный выбор для Ультра Лиги; оптимизируйте выживаемость низким показателем атаки.',
        }
      : {
          cs: 'Dosahuje stropu ligy s 100% IV blízko Levelu 50.',
          en: 'Reaches the league threshold with 100% IV close to Level 50.',
          ja: 'PL50近くの100%個体値でリーグ上限付近に到達します。',
          ru: 'Достигает порога лиги со 100% IV около 50-го уровня.',
        },
  };
}

/**
 * Finds neighboring Pokédex entries and Mega forms
 */
export function getEvolutionFamily(poke: PokemonRankData): {
  prev: PokemonRankData | null;
  next: PokemonRankData | null;
  megaVariants: PokemonRankData[];
} {
  const prev = poke.pokedexId > 1 ? getPokemonByIdOrSlug((poke.pokedexId - 1).toString()) || null : null;
  const next = poke.pokedexId < 1025 ? getPokemonByIdOrSlug((poke.pokedexId + 1).toString()) || null : null;

  const megaVariants = pokemonRankings.filter(
    (p) => p.pokedexId === poke.pokedexId && (p.isMega || p.isPrimal) && p.name !== poke.name
  );

  return { prev, next, megaVariants };
}

export interface PokedexEditorialReport {
  paragraphs: { heading: string; text: string }[];
  faqs: { question: string; answer: string }[];
}

/**
 * Generates a deep, multi-paragraph editorial analysis & FAQ for a Pokédex entry
 * using actual base stats, move pools, PvE/PvP/Max Battle meta indices, and type effectiveness.
 */
export function generatePokedexEditorialAnalysis(
  entry: PokedexCatalogEntry,
  lang: Language
): PokedexEditorialReport {
  const localName = lang === 'ja' ? entry.names.ja : getPokemonName(entry.names.en, lang);
  const typesStr = entry.types.join(' / ');
  const meta = META_INDEX[entry.slug];
  const { attack, defense, stamina } = entry.stats;
  const statTotal = attack + defense + stamina;

  const allTypes = Object.keys(TYPE_CHART);
  const weakList: string[] = [];
  const resistList: string[] = [];
  allTypes.forEach((atkType) => {
    let mult = 1.0;
    entry.types.forEach((defType) => {
      const m = TYPE_CHART[atkType]?.[defType];
      if (m !== undefined) mult *= m;
    });
    if (mult > 1.05) weakList.push(`${atkType} (${mult >= 2.0 ? '2.56×' : '1.6×'})`);
    if (mult < 0.95) resistList.push(atkType);
  });

  const bestFast = meta?.pve?.bestMoveset?.fast || entry.quickMoves[0]?.name || 'Tackle';
  const bestCharged = meta?.pve?.bestMoveset?.charged || entry.cinematicMoves[0]?.name || 'Struggle';
  const pveDps = meta?.pve?.dps ? `${meta.pve.dps} DPS` : '';
  const pveTypeRank = meta?.pve?.typeRank
    ? `#${meta.pve.typeRank.rank} (${meta.pve.typeRank.type})`
    : null;

  const glRank = meta?.pvp?.great?.rank ? `#${meta.pvp.great.rank} (skóre ${meta.pvp.great.score})` : null;
  const ulRank = meta?.pvp?.ultra?.rank ? `#${meta.pvp.ultra.rank} (skóre ${meta.pvp.ultra.score})` : null;
  const mlRank = meta?.pvp?.master?.rank ? `#${meta.pvp.master.rank} (skóre ${meta.pvp.master.score})` : null;

  const paragraphs: { heading: string; text: string }[] = [];
  const faqs: { question: string; answer: string }[] = [];

  if (lang === 'cs') {
    paragraphs.push({
      heading: `Strategický profil a rozložení statistik: ${localName} (#${entry.dexId})`,
      text: `${localName} (národní Pokédex #${entry.dexId}, Generace ${entry.generation}) je Pokémon typu ${typesStr} se součtem základních statistik ${statTotal} bodů (Útok ${attack}, Obrana ${defense}, Výdrž/HP ${stamina}). V Pokémon GO dosahuje na úrovni 40 (bez XL Candy) maximálního CP ${entry.maxCp.lv40} a na plně vylepšené úrovni 50 se 100% IV (15/15/15 Hundo) stropu ${entry.maxCp.lv50} CP. Při chytání z raidů (Level 20) má 100% IV kus hodnotu ${entry.maxCp.lv20} CP, případně ${entry.maxCp.lv25} CP na úrovni 25 při aktivním bonusu počasí (Weather Boost). ${entry.isReleasedInGo ? `Tento druh je ve hře již oficiálně vydán${entry.canBeShinyInGo ? ' a trenéři mohou narazit i na jeho vzácnou Shiny variantu' : ''}.` : 'Tento druh zatím čeká na své oficiální uvedení do Pokémon GO v některé z budoucích sezónních událostí.'}`,
    });

    paragraphs.push({
      heading: `Hodnocení v PvE Raidech, Gym bitvách a Max Battles`,
      text: `Z hlediska PvE ofenzivy (${attack} ATK) využívá ${localName} jako nejefektivnější kombinaci útoků rychlý útok ${bestFast} a nabíjecí útok ${bestCharged}${pveDps ? ` s výkonem ${pveDps}` : ''}${pveTypeRank ? `, což jej v rámci svého živlu řadí na pozici ${pveTypeRank}` : ''}. ${entry.hasMega ? `Díky dostupnosti Mega / Primal evoluce přináší ${localName} v raidech klíčový 30% bonus k poškození pro všechny spojence v lobby, kteří útočí stejným typem.` : entry.hasShadow ? `Ve hře existuje také Shadow varianta od Team GO Rocket, která získává +20 % k útočné síle výměnou za o 20 % nižší obranu, což z ní dělá výrazně rychlejšího raidového útočníka.` : 'Při nasazení do raidů dbejte na shodu typu útoků s typem Pokémona (STAB bonus +20 % poškození).'} ${entry.hasGigantamax || entry.hasDynamax ? `Navíc je ${localName} způsobilý pro Power Spot Max Battles (${entry.hasGigantamax ? 'včetně exkluzivní Gigantamax formy s G-Max útokem' : 've své Dynamax formě'}), kde plní roli ${meta?.maxBattle?.tankRank?.rank <= 20 ? 'odolného tanku i útočníka' : 'specializovaného Max útočníka'}.` : ''}`,
    });

    paragraphs.push({
      heading: `Analýza pro PvP GO Battle League a typové slabosti`,
      text: `V obraně má kombinace typů ${typesStr} slabost vůči útokům typu ${weakList.length > 0 ? weakList.join(', ') : 'žádnému běžnému typu'} a naopak odolává útokům typu ${resistList.length > 0 ? resistList.join(', ') : 'žádnému'}. V ligových soubojích GO Battle League dosahuje ${localName} následujících výsledků: ${glRank ? `Great League (do 1500 CP): ${glRank}` : 'v Great League se uplatňuje jen okrajově'}, ${ulRank ? `Ultra League (do 2500 CP): ${ulRank}` : 'v Ultra League má omezené využití'}${mlRank ? ` a v neomezené Master League: ${mlRank}` : ''}. Pro ligy s omezením CP (Great a Ultra League) hledejte jedince s nízkým útočným IV (např. 0/15/15), pokud ${localName} přesahuje limit dané ligy, zatímco do Master League a raidů je vždy ideální 100% IV (4*).`,
    });

    faqs.push(
      {
        question: `Jaké jsou nejlepší útoky (Best Moveset) pro ${localName} v Pokémon GO?`,
        answer: `Nejlepší PvE moveset pro ${localName} do raidů a gymů je rychlý útok ${bestFast} v kombinaci s nabíjecím útokem ${bestCharged}${pveDps ? ` (${pveDps})` : ''}.`,
      },
      {
        question: `Jaké má ${localName} slabosti a čím ho nejlépe porazit?`,
        answer: `${localName} (${typesStr}) je zranitelný vůči útokům typu ${weakList.join(', ')}. Při stavbě counter týmu vybírejte Mega a Shadow Pokémony právě těchto živlů.`,
      },
      {
        question: `Jaké je 100% IV (Hundo) CP pro ${localName}?`,
        answer: `100% IV ${localName} má maximálně ${entry.maxCp.lv50} CP na úrovni 50 (${entry.maxCp.lv40} CP na úrovni 40). Z raidů má 100% IV hodnotu ${entry.maxCp.lv20} CP (Level 20) a ${entry.maxCp.lv25} CP při Weather Boostu (Level 25). Ze zadań Field Research (Level 15) je 100% IV přesně ${entry.maxCp.lv15} CP.`,
      }
    );
  } else if (lang === 'ja') {
    paragraphs.push({
      heading: `${localName} (図鑑No.${entry.dexId}) の種族値・最大CP・基本性能`,
      text: `${localName}（全国図鑑No.${entry.dexId}・第${entry.generation}世代）は${typesStr}タイプのポケモンで、種族値は攻撃${attack}・防御${defense}・HP${stamina}（合計${statTotal}）です。Pokémon GOにおける最大CPはPL40で${entry.maxCp.lv40}、アメXLを使用したPL50（個体値100%）で${entry.maxCp.lv50}に達します。レイドバトル捕獲時（PL20）の100%個体値CPは${entry.maxCp.lv20}、天候ブースト時（PL25）は${entry.maxCp.lv25}、フィールドリサーチ（PL15）では${entry.maxCp.lv15}となります。`,
    });
    paragraphs.push({
      heading: `レイドバトル（PvE）およびマックスバトルでの評価・最適技`,
      text: `PvE（レイド・ジム攻撃）における${localName}の最適技構成は、ノーマルアタック「${bestFast}」とスペシャルアタック「${bestCharged}」の組み合わせです${pveDps ? `（${pveDps}）` : ''}。${entry.hasMega ? 'メガシンカ／ゲンシカイキに対応しており、味方全体の同タイプ技の威力を30%引き上げるサポーター兼アタッカーとして非常に優秀です。' : ''}${entry.hasGigantamax || entry.hasDynamax ? 'さらにパワースポットのマックスバトル（ダイマックス／キョダイマックス）にも参加可能です。' : ''}`,
    });
    paragraphs.push({
      heading: `GOバトルリーグ（PvP）適性と弱点・耐性`,
      text: `${typesStr}タイプの${localName}は、${weakList.join('・')}タイプの技が弱点で、${resistList.length > 0 ? resistList.join('・') : 'なし'}タイプに耐性があります。PvPでは${glRank ? `スーパーリーグ${glRank}` : 'スーパーリーグ'}、${ulRank ? `ハイパーリーグ${ulRank}` : 'ハイパーリーグ'}で独自の役割を持ちます。`,
    });

    faqs.push(
      {
        question: `${localName}の最強技構成（おすすめ技）は？`,
        answer: `${localName}のレイド・ジム向け最適技は「${bestFast}」と「${bestCharged}」です。`,
      },
      {
        question: `${localName}の弱点タイプと100%個体値CPは？`,
        answer: `弱点は${weakList.join('、')}です。個体値100%のCPはPL20で${entry.maxCp.lv20}、PL25（天候ブースト）で${entry.maxCp.lv25}、PL50最大で${entry.maxCp.lv50}です。`,
      }
    );
  } else if (lang === 'ru') {
    paragraphs.push({
      heading: `Стратегический профиль и характеристики: ${localName} (#${entry.dexId})`,
      text: `${localName} (#${entry.dexId} в Национальном Покедексе, Поколение ${entry.generation}) — покемон типа ${typesStr} с суммой базовых характеристик ${statTotal} (Атака ${attack}, Защита ${defense}, Выносливость ${stamina}). В Pokémon GO его максимальный CP составляет ${entry.maxCp.lv40} на 40-м уровне и ${entry.maxCp.lv50} CP на 50-м уровне (100% IV). При поимке в рейде 100% IV соответствует ${entry.maxCp.lv20} CP (Ур. 20) или ${entry.maxCp.lv25} CP с погодным бустом (Ур. 25).`,
    });
    paragraphs.push({
      heading: `Эффективность в PvE рейдах и Макс-Битвах`,
      text: `Лучший набор атак (Moveset) для ${localName} в рейдах — быстрая атака ${bestFast} и заряженная атака ${bestCharged}${pveDps ? ` (${pveDps})` : ''}${pveTypeRank ? `, что ставит его на место ${pveTypeRank}` : ''}. ${entry.hasMega ? 'Наличие Мега-эволюции дает бонус +30% к урону союзникам в рейде.' : ''}`,
    });
    paragraphs.push({
      heading: `Анализ для PvP GO Battle League и уязвимости`,
      text: `${localName} уязвим к атакам типов: ${weakList.join(', ')}, и имеет сопротивление к: ${resistList.length > 0 ? resistList.join(', ') : 'нет'}. В PvP лигах: ${glRank ? `Великая лига ${glRank}` : 'Великая лига'}, ${ulRank ? `Ультра лига ${ulRank}` : 'Ультра лига'}.`,
    });

    faqs.push(
      {
        question: `Какие лучшие атаки для ${localName} в Pokémon GO?`,
        answer: `Лучший набор атак для ${localName} в PvE — ${bestFast} и ${bestCharged}.`,
      },
      {
        question: `Какой CP у 100% IV (Hundo) ${localName}?`,
        answer: `100% IV ${localName} имеет ${entry.maxCp.lv20} CP на 20 уровне (рейд), ${entry.maxCp.lv25} CP на 25 уровне (погода), ${entry.maxCp.lv15} CP на 15 уровне (квесты) и ${entry.maxCp.lv50} CP на 50 уровне.`,
      }
    );
  } else {
    paragraphs.push({
      heading: `Strategic Profile & Base Stats Breakdown: ${entry.names.en} (#${entry.dexId})`,
      text: `${entry.names.en} (National Pokédex #${entry.dexId}, Generation ${entry.generation}) is a ${typesStr}-type Pokémon with a combined base stat total of ${statTotal} (Attack: ${attack}, Defense: ${defense}, Stamina: ${stamina}). In Pokémon GO, it reaches a maximum CP of ${entry.maxCp.lv40} at Level 40 and ${entry.maxCp.lv50} CP at Level 50 with perfect 100% IVs (15/15/15). When caught from Raid Battles, its 100% IV Hundo CP is ${entry.maxCp.lv20} at Level 20 and ${entry.maxCp.lv25} CP at Level 25 (Weather Boosted), while Field Research encounters (Level 15) cap at ${entry.maxCp.lv15} CP.`,
    });
    paragraphs.push({
      heading: `PvE Raid Performance, Best Moveset & Max Battles`,
      text: `In PvE Raid and Gym combat, ${entry.names.en} performs best with the Fast Move ${bestFast} paired with the Charged Move ${bestCharged}${pveDps ? ` (${pveDps})` : ''}${pveTypeRank ? `, ranking ${pveTypeRank} among its elemental peers` : ''}. ${entry.hasMega ? `Because ${entry.names.en} has access to Mega/Primal Evolution, deploying it in raids grants a 30% damage multiplier to all allied trainers using matching-type attacks.` : entry.hasShadow ? `Its Shadow form rescued from Team GO Rocket gains a +20% Attack bonus in exchange for -20% Defense, significantly decreasing time-to-win against raid bosses.` : 'Always prioritize Same-Type Attack Bonus (STAB, +20% damage) when building your raid lineup.'} ${entry.hasGigantamax || entry.hasDynamax ? `Furthermore, ${entry.names.en} is eligible for Power Spot Max Battles (${entry.hasGigantamax ? 'featuring an exclusive Gigantamax form and G-Max move' : 'as a Dynamax contender'}).` : ''}`,
    });
    paragraphs.push({
      heading: `GO Battle League (PvP) Viability & Type Weaknesses`,
      text: `Defensively, ${entry.names.en} (${typesStr}) is vulnerable to ${weakList.length > 0 ? weakList.join(', ') : 'standard'} attacks while resisting ${resistList.length > 0 ? resistList.join(', ') : 'no'} moves. Across GO Battle League formats, it records the following standings: ${glRank ? `Great League (1500 CP): ${glRank}` : 'niche utility in Great League'}, ${ulRank ? `Ultra League (2500 CP): ${ulRank}` : 'situational play in Ultra League'}${mlRank ? `, and Master League: ${mlRank}` : ''}. For CP-capped leagues, aim for low Attack and high Defense/Stamina IVs (such as 0/15/15) whenever ${entry.names.en}'s max CP exceeds the league ceiling.`,
    });

    faqs.push(
      {
        question: `What is the best moveset for ${entry.names.en} in Pokémon GO?`,
        answer: `The optimal PvE raid moveset for ${entry.names.en} is ${bestFast} (Fast Move) and ${bestCharged} (Charged Move)${pveDps ? `, delivering ${pveDps}` : ''}.`,
      },
      {
        question: `What are ${entry.names.en}'s weaknesses and best counters?`,
        answer: `${entry.names.en} (${typesStr}) takes super-effective damage from ${weakList.join(', ')} attacks. Use top Shadow and Mega attackers of those types to defeat it quickly.`,
      },
      {
        question: `What is the 100% IV Hundo CP for ${entry.names.en}?`,
        answer: `A 100% IV ${entry.names.en} has ${entry.maxCp.lv20} CP at Level 20 (regular raid catch), ${entry.maxCp.lv25} CP at Level 25 (weather-boosted raid), ${entry.maxCp.lv15} CP at Level 15 (Field Research), ${entry.maxCp.lv40} CP at Level 40, and ${entry.maxCp.lv50} CP at Level 50.`,
      }
    );
  }

  return { paragraphs, faqs };
}
