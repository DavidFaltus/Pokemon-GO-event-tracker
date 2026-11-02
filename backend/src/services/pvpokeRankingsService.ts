import fs from 'fs';
import path from 'path';
import axios from 'axios';

const GITHUB_COMMITS_API = 'https://api.github.com/repos/PvPoke/pvpoke/commits?path=src/data/rankings/all/overall&page=1&per_page=1';

const RAW_RANKINGS_BASE = 'https://raw.githubusercontent.com/PvPoke/pvpoke/master/src/data/rankings/all/overall';

export const LEAGUE_FILES = {
  great: 'rankings-1500.json',
  ultra: 'rankings-2500.json',
  master: 'rankings-10000.json',
  little: 'rankings-500.json'
} as const;

export type LeagueKey = keyof typeof LEAGUE_FILES;

const DATA_DIR = path.resolve(__dirname, '../../data');
const RANKINGS_DIR = path.resolve(DATA_DIR, 'pvpoke_rankings');
const SHA_FILE_PATH = path.resolve(DATA_DIR, '.pvpoke_rankings_sha');

export interface PvPokeRankingEntry {
  speciesId: string;
  speciesName: string;
  rating?: number;
  score: number;
  scores?: number[];
  moveset: string[];
  stats?: {
    product: number;
    atk: number;
    def: number;
    hp: number;
  };
  matchups?: Array<{ opponent: string; rating: number }>;
  counters?: Array<{ opponent: string; rating: number }>;
}

export interface RankingsSyncResult {
  updated: boolean;
  sha: string;
  leagues: Record<LeagueKey, number>;
  error?: string;
}

export async function getLatestRankingsCommitSha(): Promise<string | null> {
  try {
    const res = await axios.get(GITHUB_COMMITS_API, {
      headers: {
        'User-Agent': 'PoGoEventsTracker-Backend (https://pogoevents.app)',
        'Accept': 'application/vnd.github.v3+json'
      },
      timeout: 8000
    });
    if (Array.isArray(res.data) && res.data[0]?.sha) {
      return res.data[0].sha;
    }
    return null;
  } catch (err: any) {
    console.warn('[RankingsService] Failed to check GitHub commit SHA for PvPoke rankings:', err?.message || err);
    return null;
  }
}

export function getStoredRankingsCommitSha(): string | null {
  try {
    if (fs.existsSync(SHA_FILE_PATH)) {
      return fs.readFileSync(SHA_FILE_PATH, 'utf8').trim();
    }
  } catch {}
  return null;
}

export function saveStoredRankingsCommitSha(sha: string): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SHA_FILE_PATH, sha.trim(), 'utf8');
  } catch (err: any) {
    console.error('[RankingsService] Failed to save rankings commit SHA:', err?.message || err);
  }
}

export function getLeagueFilePath(league: LeagueKey): string {
  return path.resolve(RANKINGS_DIR, LEAGUE_FILES[league]);
}

export function loadStoredLeagueRankings(league: LeagueKey): PvPokeRankingEntry[] | null {
  try {
    const filePath = getLeagueFilePath(league);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (err: any) {
    console.warn(`[RankingsService] Failed to load stored rankings for ${league}:`, err?.message || err);
  }
  return null;
}

export async function checkAndSyncPvPokeRankings(force = false): Promise<RankingsSyncResult> {
  if (!fs.existsSync(RANKINGS_DIR)) {
    fs.mkdirSync(RANKINGS_DIR, { recursive: true });
  }

  const storedSha = getStoredRankingsCommitSha();
  const allExist = Object.keys(LEAGUE_FILES).every((k) =>
    fs.existsSync(getLeagueFilePath(k as LeagueKey))
  );

  const needFetch = force || !allExist;
  const latestSha = await getLatestRankingsCommitSha();

  if (!needFetch && latestSha && storedSha === latestSha) {
    console.log(`[RankingsService] PvPoke rankings are up-to-date (SHA: ${latestSha.substring(0, 7)}). Zero-bandwidth exit.`);
    const leagues: Record<LeagueKey, number> = { great: 0, ultra: 0, master: 0, little: 0 };
    for (const key of Object.keys(LEAGUE_FILES) as LeagueKey[]) {
      const data = loadStoredLeagueRankings(key);
      leagues[key] = data ? data.length : 0;
    }
    return { updated: false, sha: latestSha, leagues };
  }

  console.log(`[RankingsService] Fetching fresh PvPoke rankings (stored: ${storedSha?.substring(0, 7) || 'none'}, latest: ${latestSha?.substring(0, 7) || 'unknown'})...`);

  const leaguesCount: Record<LeagueKey, number> = { great: 0, ultra: 0, master: 0, little: 0 };

  try {
    for (const [leagueKey, fileName] of Object.entries(LEAGUE_FILES) as [LeagueKey, string][]) {
      const url = `${RAW_RANKINGS_BASE}/${fileName}`;
      console.log(`[RankingsService] Downloading ${leagueKey} (${url})...`);
      const res = await axios.get(url, { timeout: 25000 });
      if (Array.isArray(res.data)) {
        const dest = getLeagueFilePath(leagueKey);
        fs.writeFileSync(dest, JSON.stringify(res.data), 'utf8');
        leaguesCount[leagueKey] = res.data.length;
        console.log(`[RankingsService] Saved ${leagueKey}: ${res.data.length} rankings.`);
      }
    }

    const effectiveSha = latestSha || `sha_${Date.now()}`;
    saveStoredRankingsCommitSha(effectiveSha);

    console.log(`[RankingsService] Successfully updated all PvPoke league rankings.`);
    return { updated: true, sha: effectiveSha, leagues: leaguesCount };
  } catch (err: any) {
    console.error('[RankingsService] Failed to download PvPoke rankings:', err?.message || err);
    return {
      updated: false,
      sha: storedSha || '',
      leagues: leaguesCount,
      error: err?.message || 'Download error'
    };
  }
}
