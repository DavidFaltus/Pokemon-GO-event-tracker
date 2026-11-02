import fs from 'fs';
import path from 'path';
import axios from 'axios';

const GITHUB_COMMITS_API = 'https://api.github.com/repos/PvPoke/pvpoke/commits?path=src/data/gamemaster.json&page=1&per_page=1';
const RAW_GAMEMASTER_URL = 'https://raw.githubusercontent.com/PvPoke/pvpoke/master/src/data/gamemaster.json';

const DATA_DIR = path.resolve(__dirname, '../../data');
const SHA_FILE_PATH = path.resolve(DATA_DIR, '.gamemaster_sha');
const CACHE_GAMEMASTER_PATH = path.resolve(DATA_DIR, 'pvpoke_gamemaster_cache.json');

export interface GamemasterSyncResult {
  updated: boolean;
  sha: string;
  error?: string;
}

export async function getLatestCommitSha(): Promise<string | null> {
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
    console.warn('[GamemasterService] Failed to check GitHub commit SHA:', err?.message || err);
    return null;
  }
}

export function getStoredCommitSha(): string | null {
  try {
    if (fs.existsSync(SHA_FILE_PATH)) {
      return fs.readFileSync(SHA_FILE_PATH, 'utf8').trim();
    }
  } catch {}
  return null;
}

export function saveStoredCommitSha(sha: string): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SHA_FILE_PATH, sha.trim(), 'utf8');
  } catch (err: any) {
    console.error('[GamemasterService] Failed to save commit SHA:', err?.message || err);
  }
}

export async function checkAndSyncPvPokeGamemaster(force = false): Promise<GamemasterSyncResult> {
  const storedSha = getStoredCommitSha();
  const cacheExists = fs.existsSync(CACHE_GAMEMASTER_PATH);

  // If cache doesn't exist, we must force fetch
  const needFetch = force || !cacheExists;

  const latestSha = await getLatestCommitSha();

  if (!needFetch && latestSha && storedSha === latestSha) {
    console.log(`[GamemasterService] PvPoke Gamemaster is up-to-date (SHA: ${latestSha.substring(0, 7)}). Zero-bandwidth exit.`);
    return { updated: false, sha: latestSha };
  }

  console.log(`[GamemasterService] Fetching fresh PvPoke Gamemaster (stored: ${storedSha?.substring(0, 7) || 'none'}, latest: ${latestSha?.substring(0, 7) || 'unknown'})...`);

  try {
    const res = await axios.get(RAW_GAMEMASTER_URL, { timeout: 20000 });
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CACHE_GAMEMASTER_PATH, JSON.stringify(res.data), 'utf8');

    const effectiveSha = latestSha || `sha_${Date.now()}`;
    saveStoredCommitSha(effectiveSha);

    console.log(`[GamemasterService] Successfully saved PvPoke Gamemaster cache (${CACHE_GAMEMASTER_PATH}).`);
    return { updated: true, sha: effectiveSha };
  } catch (err: any) {
    console.error('[GamemasterService] Failed to download raw gamemaster:', err?.message || err);
    return { updated: false, sha: storedSha || '', error: err?.message || 'Download error' };
  }
}
