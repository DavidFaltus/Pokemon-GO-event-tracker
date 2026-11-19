import { dataStore } from '../dataStore';

export type PokedleMode = 'classic' | 'lore' | 'silhouette';
export type PokedlePlayType = 'daily' | 'endless';
export type AttemptBucket = '1' | '2' | '3' | '4' | '5' | '6' | '7+';

export const POKEDLE_MIN_PUBLIC_SAMPLE = 10;
const STORE_KEY = 'pokedle_analytics';
const MAX_DAILY_HISTORY_DAYS = 90;

export interface ModeAggregate {
  played: number;
  won: number;
  gaveUp: number;
  totalWinAttempts: number;
  attemptBuckets: Record<AttemptBucket, number>;
}

export interface PokemonStatAggregate {
  pokemonId: number;
  played: number;
  won: number;
  gaveUp: number;
  totalWinAttempts: number;
}

export interface PokedleAnalyticsStore {
  updatedAt: string;
  totals: {
    played: number;
    won: number;
    gaveUp: number;
    totalWinAttempts: number;
    daily: ModeAggregate;
    endless: ModeAggregate;
    byMode: Record<PokedleMode, ModeAggregate>;
  };
  dailyHistory: Record<string, Record<PokedleMode, ModeAggregate>>;
  pokemonStats: Record<string, PokemonStatAggregate>;
  firstGuesses: Record<string, number>;
}

export interface PokedleRecordInput {
  dateKey: string;
  mode: PokedleMode;
  playType: PokedlePlayType;
  won: boolean;
  attempts: number;
  pokemonId: number;
  firstGuessId?: number;
}

export interface PublicModeSummary {
  ready: boolean;
  played: number;
  won: number;
  winRate: number;
  avgAttempts: number;
  attemptBuckets: Record<AttemptBucket, number>;
}

export interface PublicPokedleStatsResponse {
  minSampleThreshold: number;
  dateKey: string;
  globalReady: boolean;
  global: {
    played: number;
    won: number;
    winRate: number;
    avgAttempts: number;
    attemptBuckets: Record<AttemptBucket, number>;
  } | null;
  today: Record<PokedleMode, PublicModeSummary | null>;
}

export interface AdminPokemonRankItem {
  pokemonId: number;
  played: number;
  won: number;
  gaveUp: number;
  winRate: number;
  avgAttempts: number;
}

export interface AdminPokedleStatsResponse {
  updatedAt: string;
  minSampleThreshold: number;
  totals: {
    played: number;
    won: number;
    gaveUp: number;
    winRate: number;
    avgAttempts: number;
  };
  daily: PublicModeSummary;
  endless: PublicModeSummary;
  byMode: Record<PokedleMode, PublicModeSummary>;
  recentDays: Array<{
    dateKey: string;
    played: number;
    won: number;
    gaveUp: number;
    winRate: number;
    avgAttempts: number;
    byMode: Record<PokedleMode, { played: number; won: number; avgAttempts: number }>;
  }>;
  hardestPokemon: AdminPokemonRankItem[];
  easiestPokemon: AdminPokemonRankItem[];
  topFirstGuesses: Array<{ pokemonId: number; count: number; sharePct: number }>;
}

export function createEmptyModeAggregate(): ModeAggregate {
  return {
    played: 0,
    won: 0,
    gaveUp: 0,
    totalWinAttempts: 0,
    attemptBuckets: {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7+': 0,
    },
  };
}

export function createEmptyAnalyticsStore(): PokedleAnalyticsStore {
  return {
    updatedAt: new Date().toISOString(),
    totals: {
      played: 0,
      won: 0,
      gaveUp: 0,
      totalWinAttempts: 0,
      daily: createEmptyModeAggregate(),
      endless: createEmptyModeAggregate(),
      byMode: {
        classic: createEmptyModeAggregate(),
        lore: createEmptyModeAggregate(),
        silhouette: createEmptyModeAggregate(),
      },
    },
    dailyHistory: {},
    pokemonStats: {},
    firstGuesses: {},
  };
}

export function toAttemptBucket(attempts: number): AttemptBucket {
  if (attempts <= 1) return '1';
  if (attempts === 2) return '2';
  if (attempts === 3) return '3';
  if (attempts === 4) return '4';
  if (attempts === 5) return '5';
  if (attempts === 6) return '6';
  return '7+';
}

function applyToAggregate(agg: ModeAggregate, won: boolean, attempts: number): void {
  agg.played += 1;
  if (won) {
    agg.won += 1;
    agg.totalWinAttempts += attempts;
    const bucket = toAttemptBucket(attempts);
    agg.attemptBuckets[bucket] = (agg.attemptBuckets[bucket] || 0) + 1;
  } else {
    agg.gaveUp += 1;
  }
}

function computeSummary(agg: ModeAggregate, threshold = POKEDLE_MIN_PUBLIC_SAMPLE): PublicModeSummary {
  const winRate = agg.played > 0 ? Math.round((agg.won / agg.played) * 1000) / 10 : 0;
  const avgAttempts = agg.won > 0 ? Math.round((agg.totalWinAttempts / agg.won) * 10) / 10 : 0;
  return {
    ready: agg.won >= threshold,
    played: agg.played,
    won: agg.won,
    winRate,
    avgAttempts,
    attemptBuckets: { ...agg.attemptBuckets },
  };
}

function mergeBuckets(a: ModeAggregate, b: ModeAggregate): Record<AttemptBucket, number> {
  const buckets: AttemptBucket[] = ['1', '2', '3', '4', '5', '6', '7+'];
  const out = {} as Record<AttemptBucket, number>;
  for (const k of buckets) {
    out[k] = (a.attemptBuckets[k] || 0) + (b.attemptBuckets[k] || 0);
  }
  return out;
}

export function validateRecordInput(body: any): { valid: true; data: PokedleRecordInput } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  const { dateKey, mode, playType, won, attempts, pokemonId, firstGuessId } = body;
  if (typeof dateKey !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
    return { valid: false, error: 'Invalid dateKey (expected YYYY-MM-DD)' };
  }
  if (!['classic', 'lore', 'silhouette'].includes(mode)) {
    return { valid: false, error: 'Invalid mode' };
  }
  if (!['daily', 'endless'].includes(playType)) {
    return { valid: false, error: 'Invalid playType' };
  }
  if (typeof won !== 'boolean') {
    return { valid: false, error: 'Invalid won flag' };
  }
  const parsedAttempts = Number(attempts);
  if (!Number.isInteger(parsedAttempts) || parsedAttempts < 1 || parsedAttempts > 1025) {
    return { valid: false, error: 'Invalid attempts count' };
  }
  const parsedPokemonId = Number(pokemonId);
  if (!Number.isInteger(parsedPokemonId) || parsedPokemonId < 1 || parsedPokemonId > 1025) {
    return { valid: false, error: 'Invalid pokemonId' };
  }

  let parsedFirstGuess: number | undefined;
  if (firstGuessId !== undefined && firstGuessId !== null) {
    const fg = Number(firstGuessId);
    if (Number.isInteger(fg) && fg >= 1 && fg <= 1025) {
      parsedFirstGuess = fg;
    }
  }

  return {
    valid: true,
    data: {
      dateKey,
      mode,
      playType,
      won,
      attempts: parsedAttempts,
      pokemonId: parsedPokemonId,
      firstGuessId: parsedFirstGuess,
    },
  };
}

// Serialized promise queue to prevent concurrent read-modify-write races
let writeQueue: Promise<any> = Promise.resolve();

async function loadStore(): Promise<PokedleAnalyticsStore> {
  const loaded = await dataStore.get<PokedleAnalyticsStore>(STORE_KEY, {
    defaultValue: createEmptyAnalyticsStore(),
  });
  if (!loaded || !loaded.totals) {
    return createEmptyAnalyticsStore();
  }
  return loaded;
}

export async function recordPokedleRound(
  input: PokedleRecordInput
): Promise<PublicPokedleStatsResponse> {
  const run = async (): Promise<PublicPokedleStatsResponse> => {
    const store = await loadStore();

    store.updatedAt = new Date().toISOString();
    store.totals.played += 1;
    if (input.won) {
      store.totals.won += 1;
      store.totals.totalWinAttempts += input.attempts;
    } else {
      store.totals.gaveUp += 1;
    }

    if (input.playType === 'daily') {
      applyToAggregate(store.totals.daily, input.won, input.attempts);
    } else {
      applyToAggregate(store.totals.endless, input.won, input.attempts);
    }

    if (!store.totals.byMode[input.mode]) {
      store.totals.byMode[input.mode] = createEmptyModeAggregate();
    }
    applyToAggregate(store.totals.byMode[input.mode], input.won, input.attempts);

    // Track daily history (primarily daily rounds, also tracks total daily activity by dateKey)
    if (!store.dailyHistory[input.dateKey]) {
      store.dailyHistory[input.dateKey] = {
        classic: createEmptyModeAggregate(),
        lore: createEmptyModeAggregate(),
        silhouette: createEmptyModeAggregate(),
      };
    }
    if (input.playType === 'daily') {
      applyToAggregate(store.dailyHistory[input.dateKey][input.mode], input.won, input.attempts);
    }

    // Trim daily history to last MAX_DAILY_HISTORY_DAYS
    const sortedDates = Object.keys(store.dailyHistory).sort();
    if (sortedDates.length > MAX_DAILY_HISTORY_DAYS) {
      for (const oldDate of sortedDates.slice(0, sortedDates.length - MAX_DAILY_HISTORY_DAYS)) {
        delete store.dailyHistory[oldDate];
      }
    }

    // Per-Pokémon difficulty tracking
    const pKey = String(input.pokemonId);
    if (!store.pokemonStats[pKey]) {
      store.pokemonStats[pKey] = {
        pokemonId: input.pokemonId,
        played: 0,
        won: 0,
        gaveUp: 0,
        totalWinAttempts: 0,
      };
    }
    store.pokemonStats[pKey].played += 1;
    if (input.won) {
      store.pokemonStats[pKey].won += 1;
      store.pokemonStats[pKey].totalWinAttempts += input.attempts;
    } else {
      store.pokemonStats[pKey].gaveUp += 1;
    }

    // Most common 1st guesses
    if (input.firstGuessId) {
      const fgKey = String(input.firstGuessId);
      store.firstGuesses[fgKey] = (store.firstGuesses[fgKey] || 0) + 1;
    }

    await dataStore.set(STORE_KEY, store);
    return buildPublicStatsFromStore(store, input.dateKey);
  };

  const next = writeQueue.then(run, run);
  writeQueue = next.catch(() => {});
  return next;
}

export function buildPublicStatsFromStore(
  store: PokedleAnalyticsStore,
  dateKey: string
): PublicPokedleStatsResponse {
  const globalReady = store.totals.won >= POKEDLE_MIN_PUBLIC_SAMPLE;
  const globalWinRate =
    store.totals.played > 0
      ? Math.round((store.totals.won / store.totals.played) * 1000) / 10
      : 0;
  const globalAvgAttempts =
    store.totals.won > 0
      ? Math.round((store.totals.totalWinAttempts / store.totals.won) * 10) / 10
      : 0;

  const dayRecord = store.dailyHistory[dateKey];
  const buildTodayMode = (mode: PokedleMode): PublicModeSummary | null => {
    const agg = dayRecord?.[mode];
    if (!agg || agg.won < POKEDLE_MIN_PUBLIC_SAMPLE) {
      return null;
    }
    return computeSummary(agg);
  };

  return {
    minSampleThreshold: POKEDLE_MIN_PUBLIC_SAMPLE,
    dateKey,
    globalReady,
    global: globalReady
      ? {
          played: store.totals.played,
          won: store.totals.won,
          winRate: globalWinRate,
          avgAttempts: globalAvgAttempts,
          attemptBuckets: mergeBuckets(store.totals.daily, store.totals.endless),
        }
      : null,
    today: {
      classic: buildTodayMode('classic'),
      lore: buildTodayMode('lore'),
      silhouette: buildTodayMode('silhouette'),
    },
  };
}

export async function getPublicPokedleStats(dateKey: string): Promise<PublicPokedleStatsResponse> {
  const store = await loadStore();
  return buildPublicStatsFromStore(store, dateKey);
}

export async function getAdminPokedleStats(): Promise<AdminPokedleStatsResponse> {
  const store = await loadStore();

  const totalWinRate =
    store.totals.played > 0
      ? Math.round((store.totals.won / store.totals.played) * 1000) / 10
      : 0;
  const totalAvgAttempts =
    store.totals.won > 0
      ? Math.round((store.totals.totalWinAttempts / store.totals.won) * 10) / 10
      : 0;

  const recentDays = Object.entries(store.dailyHistory)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 14)
    .map(([dateKey, modes]) => {
      const c = modes.classic || createEmptyModeAggregate();
      const l = modes.lore || createEmptyModeAggregate();
      const s = modes.silhouette || createEmptyModeAggregate();
      const played = c.played + l.played + s.played;
      const won = c.won + l.won + s.won;
      const gaveUp = c.gaveUp + l.gaveUp + s.gaveUp;
      const totalWinAttempts = c.totalWinAttempts + l.totalWinAttempts + s.totalWinAttempts;
      return {
        dateKey,
        played,
        won,
        gaveUp,
        winRate: played > 0 ? Math.round((won / played) * 1000) / 10 : 0,
        avgAttempts: won > 0 ? Math.round((totalWinAttempts / won) * 10) / 10 : 0,
        byMode: {
          classic: {
            played: c.played,
            won: c.won,
            avgAttempts: c.won > 0 ? Math.round((c.totalWinAttempts / c.won) * 10) / 10 : 0,
          },
          lore: {
            played: l.played,
            won: l.won,
            avgAttempts: l.won > 0 ? Math.round((l.totalWinAttempts / l.won) * 10) / 10 : 0,
          },
          silhouette: {
            played: s.played,
            won: s.won,
            avgAttempts: s.won > 0 ? Math.round((s.totalWinAttempts / s.won) * 10) / 10 : 0,
          },
        },
      };
    });

  const allPokeStats: AdminPokemonRankItem[] = Object.values(store.pokemonStats).map((p) => ({
    pokemonId: p.pokemonId,
    played: p.played,
    won: p.won,
    gaveUp: p.gaveUp,
    winRate: p.played > 0 ? Math.round((p.won / p.played) * 1000) / 10 : 0,
    avgAttempts: p.won > 0 ? Math.round((p.totalWinAttempts / p.won) * 10) / 10 : 0,
  }));

  const eligibleForRanking =
    allPokeStats.filter((p) => p.played >= 2).length >= 5
      ? allPokeStats.filter((p) => p.played >= 2)
      : allPokeStats;

  const hardestPokemon = [...eligibleForRanking]
    .sort((a, b) => a.winRate - b.winRate || b.avgAttempts - a.avgAttempts || b.played - a.played)
    .slice(0, 10);

  const easiestPokemon = [...eligibleForRanking]
    .filter((p) => p.won > 0)
    .sort((a, b) => b.winRate - a.winRate || a.avgAttempts - b.avgAttempts || b.played - a.played)
    .slice(0, 10);

  const totalFirstGuesses = Object.values(store.firstGuesses).reduce((sum, n) => sum + n, 0);
  const topFirstGuesses = Object.entries(store.firstGuesses)
    .map(([id, count]) => ({
      pokemonId: Number(id),
      count,
      sharePct: totalFirstGuesses > 0 ? Math.round((count / totalFirstGuesses) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    updatedAt: store.updatedAt,
    minSampleThreshold: POKEDLE_MIN_PUBLIC_SAMPLE,
    totals: {
      played: store.totals.played,
      won: store.totals.won,
      gaveUp: store.totals.gaveUp,
      winRate: totalWinRate,
      avgAttempts: totalAvgAttempts,
    },
    daily: computeSummary(store.totals.daily),
    endless: computeSummary(store.totals.endless),
    byMode: {
      classic: computeSummary(store.totals.byMode.classic || createEmptyModeAggregate()),
      lore: computeSummary(store.totals.byMode.lore || createEmptyModeAggregate()),
      silhouette: computeSummary(store.totals.byMode.silhouette || createEmptyModeAggregate()),
    },
    recentDays,
    hardestPokemon,
    easiestPokemon,
    topFirstGuesses,
  };
}

export async function resetPokedleStats(): Promise<void> {
  const run = async () => {
    await dataStore.set(STORE_KEY, createEmptyAnalyticsStore());
  };
  const next = writeQueue.then(run, run);
  writeQueue = next.catch(() => {});
  return next;
}
