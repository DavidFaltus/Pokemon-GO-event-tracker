import axios from 'axios';
import {
  EventData,
  ScrapedDuckRaidItem,
  ScrapedDuckEggItem,
  ScrapedDuckResearchItem,
  ScrapedDuckRocketItem
} from '../types';

export const SCRAPED_DUCK_MIRRORS = [
  'https://cdn.jsdelivr.net/gh/bigfoott/ScrapedDuck@data',
  'https://fastly.jsdelivr.net/gh/bigfoott/ScrapedDuck@data',
  'https://gcore.jsdelivr.net/gh/bigfoott/ScrapedDuck@data',
  'https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data'
];

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache'
};

export async function fetchFromScrapedDuckWithFailover<T>(
  feedFile: string,
  options?: { timeout?: number }
): Promise<T> {
  const timeout = options?.timeout ?? 10000;
  // Hourly cache-busting timestamp to avoid stale CDN caching
  const cacheBuster = Math.floor(Date.now() / 3600000);
  let lastError: Error | null = null;

  for (const mirror of SCRAPED_DUCK_MIRRORS) {
    const url = `${mirror}/${feedFile}?t=${cacheBuster}`;
    try {
      const response = await axios.get<T>(url, {
        headers: DEFAULT_HEADERS,
        timeout
      });

      if (response.data !== undefined && response.data !== null) {
        return response.data;
      }
    } catch (err: any) {
      lastError = err;
      const status = err.response?.status;
      if (status === 429) {
        console.warn(`[scrapedDuckIngest] Mirror ${url} rate-limited (HTTP 429). Trying next mirror...`);
      } else {
        console.warn(`[scrapedDuckIngest] Mirror ${url} failed (${status || err.message}). Trying next mirror...`);
      }
    }
  }

  throw new Error(`All ScrapedDuck mirrors failed for ${feedFile}: ${lastError?.message || 'unknown error'}`);
}

export async function fetchScrapedDuckEvents(): Promise<EventData[]> {
  return fetchFromScrapedDuckWithFailover<EventData[]>('events.min.json');
}

export async function fetchScrapedDuckRaids(): Promise<ScrapedDuckRaidItem[]> {
  return fetchFromScrapedDuckWithFailover<ScrapedDuckRaidItem[]>('raids.min.json');
}

export async function fetchScrapedDuckEggs(): Promise<ScrapedDuckEggItem[]> {
  return fetchFromScrapedDuckWithFailover<ScrapedDuckEggItem[]>('eggs.min.json');
}

export async function fetchScrapedDuckResearch(): Promise<ScrapedDuckResearchItem[]> {
  return fetchFromScrapedDuckWithFailover<ScrapedDuckResearchItem[]>('research.min.json');
}

export async function fetchScrapedDuckRocketLineups(): Promise<ScrapedDuckRocketItem[]> {
  return fetchFromScrapedDuckWithFailover<ScrapedDuckRocketItem[]>('rocketLineups.min.json');
}
