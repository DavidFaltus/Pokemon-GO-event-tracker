import express from 'express';
import cors from 'cors';
import {
  scrapeEvents,
  scrapeEventDetails,
  scrapeRaidBosses,
  scrapeRocketLineups
} from './scraper';
import { loadCustomEvents, saveCustomEvents, CustomEvent } from './storage';

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pogo-admin-2026';

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

// Authentication Middleware
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }

  next();
}

// ==========================================
// API Endpoints
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get Events (Merged Scraped + Custom)
app.get('/api/events', async (req, res) => {
  const cacheKey = 'events_list';
  let scrapedData = getFromCache<any[]>(cacheKey);

  if (!scrapedData) {
    try {
      scrapedData = await scrapeEvents();
      setToCache(cacheKey, scrapedData, 12 * 60 * 60 * 1000); // Cache scraped events for 12 hours
    } catch (error: any) {
      console.error('Error scraping events:', error.message);
      scrapedData = []; // Fallback to empty list so we can still serve custom events if scraper fails
    }
  }

  try {
    const customEvents = await loadCustomEvents();
    const customMap = new Map<string, CustomEvent>();
    customEvents.forEach(item => {
      customMap.set(item.eventID, item);
    });

    const mergedEvents: any[] = [];

    // 1. Process scraped events and apply overrides
    scrapedData.forEach((event: any) => {
      const override = customMap.get(event.eventID);
      if (override) {
        if (override.isDeleted) {
          return; // Skip/hide deleted events
        }
        mergedEvents.push({
          ...event,
          ...override,
          isCustom: false
        });
      } else {
        mergedEvents.push(event);
      }
    });

    // 2. Add new custom events
    customEvents.forEach((event) => {
      if (event.isCustom && !event.isDeleted) {
        const existsInScraped = scrapedData!.some((e: any) => e.eventID === event.eventID);
        if (!existsInScraped) {
          mergedEvents.push(event);
        }
      }
    });

    // Sort by start date ascending
    mergedEvents.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());

    res.json(mergedEvents);
  } catch (error: any) {
    console.error('Error merging events:', error.message);
    res.status(500).json({ error: 'Failed to process events list' });
  }
});

// Get Event Details (Fallback to scraper if not custom/overridden)
app.get('/api/events/:id/details', async (req, res) => {
  const eventId = req.params.id;
  const link = req.query.link as string;

  // 1. Check custom overrides first
  try {
    const customEvents = await loadCustomEvents();
    const match = customEvents.find(e => e.eventID === eventId);
    if (match && match.extraData) {
      console.log(`Serving details for custom/override event ${eventId}`);
      return res.json(match.extraData);
    }
  } catch (err: any) {
    console.error('Error checking custom event details:', err.message);
  }

  if (!link) {
    return res.status(400).json({ error: 'Missing link query parameter for scraped event' });
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

// ==========================================
// Admin Panel Endpoints
// ==========================================

// Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Missing password' });
  }
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get all custom events / overrides
app.get('/api/admin/events', requireAuth, async (req, res) => {
  try {
    const events = await loadCustomEvents();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update custom event / override
app.post('/api/admin/events', requireAuth, async (req, res) => {
  const newEvent: CustomEvent = req.body;
  if (!newEvent.eventID) {
    return res.status(400).json({ error: 'Missing eventID' });
  }

  try {
    const events = await loadCustomEvents();
    const index = events.findIndex(e => e.eventID === newEvent.eventID);

    if (index !== -1) {
      events[index] = { ...events[index], ...newEvent };
    } else {
      events.push(newEvent);
    }

    await saveCustomEvents(events);
    
    // Clear caches
    cache.delete('events_list');
    cache.delete(`details_${newEvent.eventID}`);

    res.json({ success: true, event: newEvent });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delete custom event or hide scraped event
app.delete('/api/admin/events/:id', requireAuth, async (req, res) => {
  const eventId = req.params.id;

  try {
    const events = await loadCustomEvents();
    const index = events.findIndex(e => e.eventID === eventId);

    if (index !== -1) {
      if (events[index].isCustom) {
        events.splice(index, 1);
      } else {
        events[index].isDeleted = true;
      }
    } else {
      // Create override block to hide it
      events.push({
        eventID: eventId,
        name: '',
        eventType: '',
        heading: '',
        link: '',
        image: '',
        start: '',
        end: '',
        isDeleted: true,
        isCustom: false
      });
    }

    await saveCustomEvents(events);
    
    // Clear caches
    cache.delete('events_list');
    cache.delete(`details_${eventId}`);

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
