import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  getStoredCommitSha,
  saveStoredCommitSha,
  checkAndSyncPvPokeGamemaster
} from './pvpokeGamemasterService';
import axios from 'axios';

vi.mock('axios');

describe('PvPoke Gamemaster Service', () => {
  const dataDir = path.resolve(__dirname, '../../data');
  const shaFile = path.resolve(dataDir, '.gamemaster_sha');
  const cacheFile = path.resolve(dataDir, 'pvpoke_gamemaster_cache.json');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('saves and retrieves stored commit SHA', () => {
    const testSha = 'abc1234567890';
    saveStoredCommitSha(testSha);
    expect(getStoredCommitSha()).toBe(testSha);
  });

  it('performs zero-bandwidth exit when commit SHA is unchanged and cache exists', async () => {
    const currentSha = 'test_sha_match';
    saveStoredCommitSha(currentSha);

    // Ensure mock cache exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(cacheFile, JSON.stringify({ moves: [] }), 'utf8');

    // Mock commit API returning same SHA
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [{ sha: currentSha }]
    });

    const res = await checkAndSyncPvPokeGamemaster(false);
    expect(res.updated).toBe(false);
    expect(res.sha).toBe(currentSha);
    // Should NOT call the raw gamemaster URL
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
