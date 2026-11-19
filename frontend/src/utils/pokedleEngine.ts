import type { Language } from '../data/translations';
import type { PokemonType } from '../data/pokedexCatalog';
import coreDataJson from '../data/pokedle/core.json';

export type PokedleMode = 'classic' | 'lore' | 'silhouette';
export type PokedlePlayType = 'daily' | 'endless';
export type PokedleColor =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'green'
  | 'black'
  | 'brown'
  | 'purple'
  | 'gray'
  | 'white'
  | 'pink';

export interface PokedlePokemon {
  id: number;
  slug: string;
  names: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  gen: number;
  t1: PokemonType;
  t2: PokemonType | null;
  evo: 1 | 2 | 3;
  cp: number;
  col: PokedleColor;
  go: boolean;
}

export type MatchState = 'exact' | 'partial' | 'wrong';
export type NumericMatchState = 'exact' | 'higher' | 'lower';

export interface ClassicEvaluation {
  type1: MatchState;
  type2: MatchState;
  gen: NumericMatchState;
  evo: NumericMatchState;
  cp: NumericMatchState;
  col: 'exact' | 'wrong';
  isWin: boolean;
}

export interface PokedleDailyModeState {
  guessIds: number[];
  won: boolean;
  gaveUp: boolean;
}

export interface PokedleStats {
  currentStreak: number;
  maxStreak: number;
  lastCompletedDate: string | null;
  totalWins: number;
  winsByMode: Record<PokedleMode, number>;
}

export interface PokedleStorageState {
  daily: Record<string, Partial<Record<PokedleMode, PokedleDailyModeState>>>;
  stats: PokedleStats;
}

export const POKEDLE_ALL: PokedlePokemon[] = coreDataJson as PokedlePokemon[];
export const POKEDLE_BY_ID: Record<number, PokedlePokemon> = POKEDLE_ALL.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<number, PokedlePokemon>
);
export const POKEDLE_GO_POOL: PokedlePokemon[] = POKEDLE_ALL.filter((p) => p.go);

export const COLOR_META: Record<
  PokedleColor,
  { hex: string; labels: Record<Language, string> }
> = {
  red: { hex: '#ef4444', labels: { cs: 'Červená', en: 'Red', ja: 'あか', ru: 'Красный' } },
  blue: { hex: '#3b82f6', labels: { cs: 'Modrá', en: 'Blue', ja: 'あお', ru: 'Синий' } },
  yellow: { hex: '#eab308', labels: { cs: 'Žlutá', en: 'Yellow', ja: 'きいろ', ru: 'Жёлтый' } },
  green: { hex: '#22c55e', labels: { cs: 'Zelená', en: 'Green', ja: 'みどり', ru: 'Зелёный' } },
  black: { hex: '#334155', labels: { cs: 'Černá', en: 'Black', ja: 'くろ', ru: 'Чёрный' } },
  brown: { hex: '#a16207', labels: { cs: 'Hnědá', en: 'Brown', ja: 'ちゃいろ', ru: 'Коричневый' } },
  purple: { hex: '#a855f7', labels: { cs: 'Fialová', en: 'Purple', ja: 'むらさき', ru: 'Фиолетовый' } },
  gray: { hex: '#94a3b8', labels: { cs: 'Šedá', en: 'Gray', ja: 'はいいろ', ru: 'Серый' } },
  white: { hex: '#f8fafc', labels: { cs: 'Bílá', en: 'White', ja: 'しろ', ru: 'Белый' } },
  pink: { hex: '#ec4899', labels: { cs: 'Růžová', en: 'Pink', ja: 'ももいろ', ru: 'Розовый' } },
};

const LAUNCH_EPOCH_UTC_MS = Date.UTC(2026, 10, 19); // 2026-11-19 (Day #1)
const STORAGE_KEY = 'pogo_pokedle_state_v1';

export function getPokedleLocalizedName(poke: PokedlePokemon, lang: Language): string {
  if (lang === 'ja') return poke.names.ja || poke.names.en;
  if (lang === 'ru') return poke.names.ru || poke.names.en;
  if (lang === 'cs') return poke.names.cs || poke.names.en;
  return poke.names.en;
}

export function getDailyUtcDateKey(date: Date = new Date()): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getDailyPuzzleNumber(dateKey: string): number {
  const [y, m, d] = dateKey.split('-').map(Number);
  const utcMs = Date.UTC(y, (m || 1) - 1, d || 1);
  const diffDays = Math.floor((utcMs - LAUNCH_EPOCH_UTC_MS) / 86400000);
  return Math.max(1, diffDays + 1);
}

/** Deterministic PRNG (Mulberry32) */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function deterministicShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

const MODE_SEED_SALT: Record<PokedleMode, number> = {
  classic: 0x13579bdf,
  lore: 0x2468ace0,
  silhouette: 0x55aa33cc,
};

/**
 * Deterministically picks the Daily Pokémon for a given UTC date and mode.
 * Uses cycle-based Fisher-Yates permutation so no Pokémon repeats within a full cycle,
 * and guarantees all 3 modes pick 3 distinct Pokémon on any given day.
 */
export function getDailyTargetPokemon(
  dateKey: string,
  mode: PokedleMode,
  pool: PokedlePokemon[] = POKEDLE_GO_POOL
): PokedlePokemon {
  if (pool.length === 0) {
    return POKEDLE_ALL[0];
  }
  const dayIndex = getDailyPuzzleNumber(dateKey) - 1;
  const cycle = Math.floor(dayIndex / pool.length);
  const posInCycle = ((dayIndex % pool.length) + pool.length) % pool.length;

  const pickForMode = (m: PokedleMode, offset = 0): PokedlePokemon => {
    const shuffled = deterministicShuffle(pool, (cycle + 1) * 0x9e3779b1 ^ MODE_SEED_SALT[m]);
    return shuffled[(posInCycle + offset) % shuffled.length];
  };

  const classicPick = pickForMode('classic');
  if (mode === 'classic') return classicPick;

  let lorePick = pickForMode('lore');
  if (lorePick.id === classicPick.id) {
    lorePick = pickForMode('lore', 1);
  }
  if (mode === 'lore') return lorePick;

  let silPick = pickForMode('silhouette');
  let offset = 1;
  while ((silPick.id === classicPick.id || silPick.id === lorePick.id) && offset < pool.length) {
    silPick = pickForMode('silhouette', offset++);
  }
  return silPick;
}

export function pickRandomPokemon(
  pool: PokedlePokemon[],
  excludeId?: number
): PokedlePokemon {
  const candidates = excludeId ? pool.filter((p) => p.id !== excludeId) : pool;
  const source = candidates.length > 0 ? candidates : pool;
  const idx = Math.floor(Math.random() * source.length);
  return source[idx] || POKEDLE_ALL[0];
}

export function evaluateClassicGuess(
  guess: PokedlePokemon,
  target: PokedlePokemon
): ClassicEvaluation {
  const type1: MatchState =
    guess.t1 === target.t1
      ? 'exact'
      : target.t2 !== null && guess.t1 === target.t2
        ? 'partial'
        : 'wrong';

  let type2: MatchState;
  if (guess.t2 === target.t2) {
    type2 = 'exact';
  } else if (guess.t2 !== null && guess.t2 === target.t1) {
    type2 = 'partial';
  } else {
    type2 = 'wrong';
  }

  const gen: NumericMatchState =
    guess.gen === target.gen ? 'exact' : guess.gen < target.gen ? 'higher' : 'lower';

  const evo: NumericMatchState =
    guess.evo === target.evo ? 'exact' : guess.evo < target.evo ? 'higher' : 'lower';

  const cp: NumericMatchState =
    guess.cp === target.cp ? 'exact' : guess.cp < target.cp ? 'higher' : 'lower';

  const col: 'exact' | 'wrong' = guess.col === target.col ? 'exact' : 'wrong';

  return {
    type1,
    type2,
    gen,
    evo,
    cp,
    col,
    isWin: guess.id === target.id,
  };
}

export function getSilhouetteZoomScale(wrongGuessCount: number, revealed: boolean): number {
  if (revealed) return 1.0;
  const steps = [2.15, 1.75, 1.45, 1.2, 1.0];
  return steps[Math.min(Math.max(0, wrongGuessCount), steps.length - 1)];
}

export function formatCountdownToUtcMidnight(now: Date = new Date()): string {
  const nextMidnight = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0
  );
  const diffSec = Math.max(0, Math.floor((nextMidnight - now.getTime()) / 1000));
  const h = String(Math.floor(diffSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const s = String(diffSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function buildShareText(params: {
  mode: PokedleMode;
  dayNumber: number;
  guesses: PokedlePokemon[];
  target: PokedlePokemon;
  won: boolean;
  streak: number;
  lang: Language;
  isEndless: boolean;
}): string {
  const { mode, dayNumber, guesses, target, won, streak, lang, isEndless } = params;

  const modeNames: Record<PokedleMode, Record<Language, string>> = {
    classic: { cs: 'Klasický', en: 'Classic', ja: 'クラシック', ru: 'Классика' },
    lore: { cs: 'Pokédex Hláška', en: 'Pokédex Entry', ja: '図鑑説明', ru: 'Описание' },
    silhouette: { cs: 'Silueta', en: 'Silhouette', ja: 'シルエット', ru: 'Силуэт' },
  };

  const triesLabel: Record<Language, string> = {
    cs: `${guesses.length} ${guesses.length === 1 ? 'pokus' : guesses.length < 5 ? 'pokusy' : 'pokusů'}`,
    en: `${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}`,
    ja: `${guesses.length}回`,
    ru: `${guesses.length} поп.`,
  };

  const headerTag = isEndless
    ? `PoGoDle ∞ • ${modeNames[mode][lang]}`
    : `PoGoDle #${dayNumber} • ${modeNames[mode][lang]}`;
  const statusStr = won ? `✅ ${triesLabel[lang]}` : '🏳️ X';
  const streakStr = !isEndless && streak > 0 ? ` • 🔥 ${streak}` : '';

  const lines: string[] = [`${headerTag} (${statusStr}${streakStr})`];

  if (mode === 'classic') {
    const displayed = guesses.slice(-6);
    if (guesses.length > 6) {
      lines.push(`… (+${guesses.length - 6})`);
    }
    for (const g of displayed) {
      const ev = evaluateClassicGuess(g, target);
      const c1 = ev.type1 === 'exact' ? '🟩' : ev.type1 === 'partial' ? '🟧' : '🟥';
      const c2 = ev.type2 === 'exact' ? '🟩' : ev.type2 === 'partial' ? '🟧' : '🟥';
      const cGen = ev.gen === 'exact' ? '🟩' : ev.gen === 'higher' ? '⬆️' : '⬇️';
      const cEvo = ev.evo === 'exact' ? '🟩' : ev.evo === 'higher' ? '⬆️' : '⬇️';
      const cCp = ev.cp === 'exact' ? '🟩' : ev.cp === 'higher' ? '⬆️' : '⬇️';
      const cCol = ev.col === 'exact' ? '🟩' : '🟥';
      lines.push(`${c1}${c2}${cGen}${cEvo}${cCp}${cCol}`);
    }
  } else {
    const row = guesses.map((g) => (g.id === target.id ? '🟩' : '🟥')).join('');
    lines.push(row);
  }

  lines.push(`https://pogoevents.app/${lang}/pokedle`);
  return lines.join('\n');
}

export function getDefaultStorageState(): PokedleStorageState {
  return {
    daily: {},
    stats: {
      currentStreak: 0,
      maxStreak: 0,
      lastCompletedDate: null,
      totalWins: 0,
      winsByMode: { classic: 0, lore: 0, silhouette: 0 },
    },
  };
}

export function loadPokedleStorage(): PokedleStorageState {
  if (typeof window === 'undefined') return getDefaultStorageState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStorageState();
    const parsed = JSON.parse(raw) as Partial<PokedleStorageState>;
    const def = getDefaultStorageState();
    return {
      daily: parsed.daily && typeof parsed.daily === 'object' ? parsed.daily : {},
      stats: {
        ...def.stats,
        ...(parsed.stats || {}),
        winsByMode: {
          ...def.stats.winsByMode,
          ...(parsed.stats?.winsByMode || {}),
        },
      },
    };
  } catch {
    return getDefaultStorageState();
  }
}

export function savePokedleStorage(state: PokedleStorageState): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep last 14 days of daily history to keep localStorage lightweight
    const dates = Object.keys(state.daily).sort();
    const trimmedDaily: PokedleStorageState['daily'] = {};
    for (const d of dates.slice(-14)) {
      trimmedDaily[d] = state.daily[d];
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ daily: trimmedDaily, stats: state.stats })
    );
  } catch {
    // Ignore private browsing quota errors
  }
}

export function getPreviousUtcDateKey(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const prev = new Date(Date.UTC(y, (m || 1) - 1, (d || 1) - 1));
  return getDailyUtcDateKey(prev);
}

export type PokedleAttemptBucket = '1' | '2' | '3' | '4' | '5' | '6' | '7+';

export interface PokedlePublicModeSummary {
  ready: boolean;
  played: number;
  won: number;
  winRate: number;
  avgAttempts: number;
  attemptBuckets: Record<PokedleAttemptBucket, number>;
}

export interface PokedlePublicStats {
  minSampleThreshold: number;
  dateKey: string;
  globalReady: boolean;
  global: {
    played: number;
    won: number;
    winRate: number;
    avgAttempts: number;
    attemptBuckets: Record<PokedleAttemptBucket, number>;
  } | null;
  today: Record<PokedleMode, PokedlePublicModeSummary | null>;
}

/**
 * Computes percentage of winning players who needed strictly MORE attempts than the current player.
 * Returns null if total sample is below 10.
 */
export function computeBetterThanPercentile(
  attempts: number,
  buckets: Record<PokedleAttemptBucket, number>
): number | null {
  const ordered: Array<{ bucket: PokedleAttemptBucket; minVal: number }> = [
    { bucket: '1', minVal: 1 },
    { bucket: '2', minVal: 2 },
    { bucket: '3', minVal: 3 },
    { bucket: '4', minVal: 4 },
    { bucket: '5', minVal: 5 },
    { bucket: '6', minVal: 6 },
    { bucket: '7+', minVal: 7 },
  ];
  let total = 0;
  let slower = 0;
  for (const item of ordered) {
    const cnt = buckets[item.bucket] || 0;
    total += cnt;
    if (item.minVal > attempts) {
      slower += cnt;
    }
  }
  if (total < 10) return null;
  return Math.round((slower / total) * 100);
}
