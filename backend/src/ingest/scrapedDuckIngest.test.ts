import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import {
  fetchFromScrapedDuckWithFailover,
  fetchScrapedDuckEvents,
  fetchScrapedDuckRaids,
  fetchScrapedDuckEggs,
  fetchScrapedDuckResearch,
  fetchScrapedDuckRocketLineups,
  SCRAPED_DUCK_MIRRORS
} from './scrapedDuckIngest';

describe('ScrapedDuck Ingestion & Multi-CDN Failover', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully fetches feed from primary CDN mirror (jsdelivr)', async () => {
    const mockData = [{ eventID: 'test-event', name: 'Test Event' }];
    vi.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await fetchFromScrapedDuckWithFailover<any[]>('events.min.json');

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(SCRAPED_DUCK_MIRRORS[0]),
      expect.objectContaining({ timeout: expect.any(Number) })
    );
  });

  it('cascades to next mirrors on 429 rate limit or 5xx network errors', async () => {
    const mockData = [{ name: 'Pikachu', eggType: '2 km' }];
    
    // First mirror fails with 429
    const err429: any = new Error('Rate Limited');
    err429.response = { status: 429 };
    // Second mirror fails with 500
    const err500: any = new Error('Server Error');
    err500.response = { status: 500 };
    // Third mirror succeeds
    vi.spyOn(axios, 'get')
      .mockRejectedValueOnce(err429)
      .mockRejectedValueOnce(err500)
      .mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await fetchFromScrapedDuckWithFailover<any[]>('eggs.min.json');

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(3);
  });

  it('throws an error if all CDN mirrors fail and no backup is available', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network error'));

    await expect(
      fetchFromScrapedDuckWithFailover('research.min.json')
    ).rejects.toThrow(/failed/i);
  });

  it('provides typed wrapper functions for all 5 feeds', async () => {
    const spy = vi.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: [] });

    await fetchScrapedDuckEvents();
    await fetchScrapedDuckRaids();
    await fetchScrapedDuckEggs();
    await fetchScrapedDuckResearch();
    await fetchScrapedDuckRocketLineups();

    expect(spy).toHaveBeenCalledTimes(5);
  });
});
