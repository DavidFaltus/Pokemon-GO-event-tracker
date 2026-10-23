import { PokemonRankData, pokemonRankings, getPokemonByIdOrSlug } from '../data/pokemonRankings';
import type { Language } from '../data/translations';

export interface PvpLeagueAnalysis {
  eligible: boolean;
  maxCpInLeague: number;
  bestLevel: number;
  optimalIvSpread: string;
  statProductScore: number;
  notes: Record<Language, string>;
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
