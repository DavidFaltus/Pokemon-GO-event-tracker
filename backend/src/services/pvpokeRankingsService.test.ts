import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import {
  checkAndSyncPvPokeRankings,
  getStoredRankingsCommitSha,
  saveStoredRankingsCommitSha,
  loadStoredLeagueRankings,
  LEAGUE_FILES
} from './pvpokeRankingsService';

vi.mock('axios');

describe('PvPoke Rankings Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exits with zero bandwidth when SHA matches and all files exist', async () => {
    const testSha = 'rank_sha_1234567890';
    saveStoredRankingsCommitSha(testSha);

    // Mock GitHub commit API returning same SHA
    vi.mocked(axios.get).mockImplementation(async (url: string) => {
      if (url.includes('api.github.com')) {
        return { data: [{ sha: testSha }] };
      }
      throw new Error(`Unexpected url: ${url}`);
    });

    // Ensure mock files exist in pvpoke_rankings
    const rankingsDir = path.resolve(__dirname, '../../data/pvpoke_rankings');
    fs.mkdirSync(rankingsDir, { recursive: true });
    for (const file of Object.values(LEAGUE_FILES)) {
      fs.writeFileSync(path.resolve(rankingsDir, file), JSON.stringify([{ speciesId: 'test', score: 90, moveset: [] }]));
    }

    const result = await checkAndSyncPvPokeRankings(false);
    expect(result.updated).toBe(false);
    expect(result.sha).toBe(testSha);
  });

  it('loads stored rankings correctly from disk', () => {
    const greatRankings = loadStoredLeagueRankings('great');
    expect(greatRankings).toBeDefined();
    expect(Array.isArray(greatRankings)).toBe(true);
  });
});
