import express from 'express';
import cors from 'cors';
import {
  scrapeEvents,
  scrapeEventDetails,
  scrapeRaidBosses,
  scrapeRocketLineups
} from './scraper';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS so the React app can call the API
app.use(cors());
app.use(express.json());

// Simple In-Memory Cache
interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();

function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setToCache<T>(key: string, data: T, ttlMs: number) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs
  });
}

// ==========================================
// API Endpoints
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get Events
app.get('/api/events', async (req, res) => {
  const cacheKey = 'events_list';
  const cachedData = getFromCache<any>(cacheKey);

  if (cachedData) {
    console.log('Serving events list from cache');
    return res.json(cachedData);
  }

  try {
    const data = await scrapeEvents();
    setToCache(cacheKey, data, 24 * 60 * 60 * 1000); // Cache for 24 hours
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get Event Details
app.get('/api/events/:id/details', async (req, res) => {
  const eventId = req.params.id;
  const link = req.query.link as string;

  if (!link) {
    return res.status(400).json({ error: 'Missing link query parameter' });
  }

  const cacheKey = `details_${eventId}`;
  const cachedData = getFromCache<any>(cacheKey);

  if (cachedData) {
    console.log(`Serving details for ${eventId} from cache`);
    return res.json(cachedData);
  }

  try {
    const data = await scrapeEventDetails(eventId, link);
    if (!data) {
      return res.status(404).json({ error: 'Details not found' });
    }
    setToCache(cacheKey, data, 24 * 60 * 60 * 1000); // Cache for 24 hours
    res.json(data);
  } catch (error: any) {
    console.error(`Error scraping details for ${eventId}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// Get Raid Bosses
app.get('/api/raids', async (req, res) => {
  const cacheKey = 'raid_bosses';
  const cachedData = getFromCache<any>(cacheKey);

  if (cachedData) {
    console.log('Serving raid bosses from cache');
    return res.json(cachedData);
  }

  try {
    const data = await scrapeRaidBosses();
    setToCache(cacheKey, data, 24 * 60 * 60 * 1000); // Cache for 24 hours
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching raid bosses:', error.message);
    res.status(500).json({ error: 'Failed to fetch raid bosses' });
  }
});

// Get Rocket Lineups
app.get('/api/rocket', async (req, res) => {
  const cacheKey = 'rocket_lineups';
  const cachedData = getFromCache<any>(cacheKey);

  if (cachedData) {
    console.log('Serving rocket lineups from cache');
    return res.json(cachedData);
  }

  try {
    const data = await scrapeRocketLineups();
    setToCache(cacheKey, data, 24 * 60 * 60 * 1000); // Cache for 24 hours
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching rocket lineups:', error.message);
    res.status(500).json({ error: 'Failed to fetch rocket lineups' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
