import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import axios from 'axios';
import {
  scrapeEvents,
  scrapeEventDetails,
} from './scraper';
import { loadCustomEvents, saveCustomEvents, CustomEvent } from './storage';
import { generateBotHtml } from './ssr';

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pogo-admin-2026';

// Enable CORS so the React app can call the API
app.use(cors());
app.use(express.json());

// ==========================================
// Hybrid Cache (In-Memory + Persistent Disk)
// ==========================================

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_DIR = path.join(__dirname, '..', '.cache');

function getFromCache<T>(key: string, ttlMs: number): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() <= entry.expiry) {
    return entry.data;
  }

  try {
    const cacheFilePath = path.join(CACHE_DIR, `${key}.json`);
    if (fs.existsSync(cacheFilePath)) {
      const stats = fs.statSync(cacheFilePath);
      const ageMs = Date.now() - stats.mtimeMs;
      if (ageMs < ttlMs) {
        const content = fs.readFileSync(cacheFilePath, 'utf-8');
        const data = JSON.parse(content);
        cache.set(key, { data, expiry: stats.mtimeMs + ttlMs });
        return data;
      }
    }
  } catch (err) {
    console.error(`Failed to read persistent cache for ${key}:`, err);
  }
  return null;
}

function setToCache<T>(key: string, data: T, ttlMs: number) {
  cache.set(key, { data, expiry: Date.now() + ttlMs });
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    const cacheFilePath = path.join(CACHE_DIR, `${key}.json`);
    fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Failed to write persistent cache for ${key}:`, err);
  }
}

function deleteFromCache(key: string) {
  cache.delete(key);
  try {
    const cacheFilePath = path.join(CACHE_DIR, `${key}.json`);
    if (fs.existsSync(cacheFilePath)) fs.unlinkSync(cacheFilePath);
  } catch (err) {
    console.error(`Failed to delete cache file for ${key}:`, err);
  }
}

// ==========================================
// Scraper Metadata (persistent JSON)
// ==========================================

interface ScraperMeta {
  lastScrapedAt: string | null;
  nextScrapeAt: string | null;
  previousEventIDs: string[];
  newEventIDs: string[];
  totalEvents: number;
}

const SCRAPER_META_PATH = path.join(CACHE_DIR, '_scraper_meta.json');

function loadScraperMeta(): ScraperMeta {
  try {
    if (fs.existsSync(SCRAPER_META_PATH)) {
      return JSON.parse(fs.readFileSync(SCRAPER_META_PATH, 'utf-8'));
    }
  } catch { /* ignore */ }
  return { lastScrapedAt: null, nextScrapeAt: null, previousEventIDs: [], newEventIDs: [], totalEvents: 0 };
}

function saveScraperMeta(meta: ScraperMeta) {
  try {
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(SCRAPER_META_PATH, JSON.stringify(meta, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save scraper meta:', err);
  }
}

// ==========================================
// Scheduled Scraper
// ==========================================

let scraperRunning = false;

/**
 * Main scheduled scraper.
 * Runs every 3 hours automatically, or on demand via admin endpoint.
 *
 * Strategy:
 *  1. Fetch event list from ScrapedDuck
 *  2. Detect new events by comparing with previous run
 *  3. For each active/upcoming event, scrape Niantic details if:
 *     - it's a new event, OR
 *     - its detail cache is older than 6 hours
 *  4. Save metadata (lastScrapedAt, newEventIDs, etc.)
 */
async function runScheduledScraper(triggeredBy: 'cron' | 'startup' | 'admin' = 'cron') {
  if (scraperRunning) {
    console.log(`[Scheduler] Already running — skipping trigger: ${triggeredBy}`);
    return;
  }

  scraperRunning = true;
  console.log(`\n[Scheduler] ▶ Starting scrape (trigger: ${triggeredBy}) at ${new Date().toISOString()}`);

  try {
    // ── 1. Fetch event list ─────────────────────────────────────────
    const events = await scrapeEvents();
    setToCache('events_list', events, 12 * 60 * 60 * 1000);

    const currentIDs = events.map((e: any) => e.eventID);

    // ── 2. Detect new events ────────────────────────────────────────
    const meta = loadScraperMeta();
    const previousSet = new Set(meta.previousEventIDs);
    const newEventIDs = currentIDs.filter((id: string) => !previousSet.has(id));

    if (newEventIDs.length > 0) {
      console.log(`[Scheduler] 🆕 New events detected: ${newEventIDs.join(', ')}`);
    } else {
      console.log(`[Scheduler] No new events since last scrape`);
    }

    // ── 3. Determine which events need detail scraping ──────────────
    const now = Date.now();
    const DETAIL_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
    const SKIP_IF_ENDED_BEFORE = now - 2 * 24 * 60 * 60 * 1000; // skip if ended >2 days ago

    const eventsToScrape = events.filter((event: any) => {
      // Skip events that ended long ago
      if (event.end && new Date(event.end).getTime() < SKIP_IF_ENDED_BEFORE) return false;
      // Always scrape new events
      if (newEventIDs.includes(event.eventID)) return true;
      // Re-scrape if detail cache is stale
      const cached = getFromCache(`details_${event.eventID}`, DETAIL_CACHE_TTL);
      return cached === null;
    });

    console.log(`[Scheduler] Scraping details: ${eventsToScrape.length} / ${events.length} events`);

    // ── 4. Scrape details sequentially ─────────────────────────────
    let successCount = 0;
    let failCount = 0;

    for (const event of eventsToScrape) {
      try {
        const details = await scrapeEventDetails(event.eventID, event.link, event.name);
        if (details) {
          setToCache(`details_${event.eventID}`, details, DETAIL_CACHE_TTL);
          successCount++;
          console.log(`[Scheduler] ✅ ${event.eventID}`);
        } else {
          console.log(`[Scheduler] ⚠️  No data returned for ${event.eventID}`);
        }
      } catch (err: any) {
        failCount++;
        console.error(`[Scheduler] ❌ Failed: ${event.eventID} — ${err.message}`);
      }

      // Polite delay between Puppeteer requests
      if (eventsToScrape.indexOf(event) < eventsToScrape.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2500));
      }
    }

    // ── 5. Save updated metadata ────────────────────────────────────
    const nextScrapeAt = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString();
    saveScraperMeta({
      lastScrapedAt: new Date().toISOString(),
      nextScrapeAt,
      previousEventIDs: currentIDs,
      newEventIDs,
      totalEvents: events.length
    });

    console.log(
      `[Scheduler] ✅ Done — total: ${events.length}, scraped: ${eventsToScrape.length}, ` +
      `ok: ${successCount}, failed: ${failCount}, next: ${nextScrapeAt}\n`
    );

  } catch (err: any) {
    console.error('[Scheduler] ❌ Fatal error:', err.message);
  } finally {
    scraperRunning = false;
  }
}

// ==========================================
// Authentication Middleware
// ==========================================

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

// Scraper Status (public — frontend uses this to detect new events)
app.get('/api/scraper/status', (req, res) => {
  const meta = loadScraperMeta();
  res.json({
    lastScrapedAt: meta.lastScrapedAt,
    nextScrapeAt: meta.nextScrapeAt,
    isRunning: scraperRunning,
    newEventIDs: meta.newEventIDs || [],
    totalEvents: meta.totalEvents || 0
  });
});

// Helper to fetch merged scraped and custom events
function getOfficialFallbackLink(eventID: string, name: string, start?: string): string {
  const cleanId = eventID.toLowerCase();
  const cleanName = name.toLowerCase();
  
  if (cleanId.includes("go-fest-2026") || cleanName.includes("go fest 2026")) {
    return "https://gofest.pokemongolive.com/";
  }
  if (cleanId.includes("road-of-legends-2026") || cleanName.includes("road of legends")) {
    return "https://pokemongolive.com/post/road-of-legends-2026-global/";
  }
  if (cleanId.includes("flying-taxi-taken-over-2026") || cleanName.includes("taken over") || cleanName.includes("taken-over")) {
    return "https://pokemongolive.com/post/flying-taxi-taken-over-2026/";
  }
  if (cleanId.includes("flying-taxi-2026") || cleanName.includes("flying taxi")) {
    return "https://pokemongolive.com/post/flying-taxi-squawkabilly-debut/";
  }
  if (cleanId.includes("rocket-takeover-june-2026") || cleanName.includes("shadow landorus") || cleanName.includes("team go rocket takeover")) {
    return "https://pokemongolive.com/post/flying-taxi-squawkabilly-debut/";
  }
  if (cleanId.includes("go-pass-june-2026") || cleanName.includes("go pass")) {
    return "https://pokemongolive.com/seasons/forever-forward";
  }
  if (cleanId.includes("season-23-forever-forward") || cleanName.includes("forever forward")) {
    return "https://pokemongolive.com/seasons/forever-forward";
  }

  // Community Days
  if (cleanId.includes("community-day") || cleanId.includes("communityday")) {
    let pokeName = "";
    if (cleanName.includes("frigibax")) pokeName = "frigibax";
    else if (cleanName.includes("bagon")) pokeName = "bagon";
    else if (cleanName.includes("beldum")) pokeName = "beldum";
    else if (cleanName.includes("goomy")) pokeName = "goomy";
    else if (cleanName.includes("litten")) pokeName = "litten";
    else if (cleanName.includes("rowlet")) pokeName = "rowlet";
    else if (cleanName.includes("popplio")) pokeName = "popplio";
    else if (cleanName.includes("bellsprout")) pokeName = "bellsprout";
    else if (cleanName.includes("chansey")) pokeName = "chansey";

    let year = "2026";
    if (start) {
      const matchYear = start.match(/^(\d{4})/);
      if (matchYear) year = matchYear[1];
    }

    let month = "june";
    if (start) {
      const dateObj = new Date(start);
      if (!isNaN(dateObj.getTime())) {
        const monthsEng = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        month = monthsEng[dateObj.getMonth()];
      }
    }

    if (pokeName) {
      return `https://pokemongolive.com/post/${pokeName}-community-day-${month}-${year}/`;
    }
  }

  // General heuristic
  let slug = cleanName
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
  
  slug = slug
    .replace(/-june-\d{4}$/, '')
    .replace(/-july-\d{4}$/, '')
    .replace(/-august-\d{4}$/, '')
    .replace(/-september-\d{4}$/, '');

  let year = "2026";
  if (start) {
    const matchYear = start.match(/^(\d{4})/);
    if (matchYear) year = matchYear[1];
  }

  return `https://pokemongolive.com/post/${slug}-${year}/`;
}

// Helper to fetch merged scraped and custom events
async function getEnrichedEventsList(forceNoCache: boolean = false): Promise<any[]> {
  const cacheKey = 'events_list';
  let scrapedData = forceNoCache ? null : getFromCache<any[]>(cacheKey, 12 * 60 * 60 * 1000);

  if (!scrapedData) {
    try {
      scrapedData = await scrapeEvents();
      setToCache(cacheKey, scrapedData, 12 * 60 * 60 * 1000);
    } catch (error: any) {
      console.error('Error scraping events:', error.message);
      scrapedData = [];
    }
  }

  const customEvents = await loadCustomEvents();
  const customMap = new Map<string, CustomEvent>();
  customEvents.forEach(item => customMap.set(item.eventID, item));

  const mergedEvents: any[] = [];

  scrapedData.forEach((event: any) => {
    const override = customMap.get(event.eventID);
    if (override) {
      if (override.isDeleted) return;
      mergedEvents.push({ ...event, ...override, isCustom: false });
    } else {
      mergedEvents.push(event);
    }
  });

  customEvents.forEach((event) => {
    if (event.isCustom && !event.isDeleted) {
      const existsInScraped = scrapedData!.some((e: any) => e.eventID === event.eventID);
      if (!existsInScraped) mergedEvents.push(event);
    }
  });

  const enrichedEvents = mergedEvents.map((event: any) => {
    const detailsCache = getFromCache<any>(`details_${event.eventID}`, 24 * 60 * 60 * 1000);
    let finalLink = event.link;
    if (detailsCache && detailsCache.officialLink) {
      finalLink = detailsCache.officialLink;
    } else if (finalLink && finalLink.includes('leekduck.com')) {
      finalLink = getOfficialFallbackLink(event.eventID, event.name, event.start);
    }
    return {
      ...event,
      link: finalLink
    };
  });

  enrichedEvents.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());
  return enrichedEvents;
}

// Helper to fetch raid bosses
async function getRaidBossesList(forceNoCache: boolean = false): Promise<any[]> {
  const cacheKey = 'raid_bosses';
  const cachedData = forceNoCache ? null : getFromCache<any>(cacheKey, 24 * 60 * 60 * 1000);
  if (cachedData) return cachedData;

  const { scrapeRaidBosses } = await import('./scraper');
  const data = await scrapeRaidBosses();
  setToCache(cacheKey, data, 24 * 60 * 60 * 1000);
  return data;
}

// Helper to fetch rocket lineups
async function getRocketLineupsList(forceNoCache: boolean = false): Promise<any> {
  const cacheKey = 'rocket_lineups';
  const cachedData = forceNoCache ? null : getFromCache<any>(cacheKey, 24 * 60 * 60 * 1000);
  if (cachedData) return cachedData;

  const { scrapeRocketLineups } = await import('./scraper');
  const data = await scrapeRocketLineups();
  setToCache(cacheKey, data, 24 * 60 * 60 * 1000);
  return data;
}

// Get Events (Merged Scraped + Custom)
app.get('/api/events', async (req, res) => {
  try {
    const forceNoCache = req.query.nocache === 'true';
    const data = await getEnrichedEventsList(forceNoCache);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Failed to process events list' });
  }
});

// Get Event Details
app.get('/api/events/:id/details', async (req, res) => {
  const eventId = req.params.id;
  const link = req.query.link as string;

  // 1. Check custom overrides first
  try {
    const customEvents = await loadCustomEvents();
    const match = customEvents.find(e => e.eventID === eventId);
    if (match && match.extraData) {
      return res.json(match.extraData);
    }
  } catch (err: any) {
    console.error('Error checking custom event details:', err.message);
  }

  if (!link) {
    return res.status(400).json({ error: 'Missing link query parameter for scraped event' });
  }

  const cacheKey = `details_${eventId}`;
  const forceNoCache = req.query.nocache === 'true';
  // Use a longer TTL here — scheduled scraper keeps this fresh anyway
  const cachedData = forceNoCache ? null : getFromCache<any>(cacheKey, 24 * 60 * 60 * 1000);

  if (cachedData) {
    console.log(`Serving details for ${eventId} from cache`);
    return res.json(cachedData);
  }

  // Cache miss — scrape on demand (fallback, scheduled scraper should have prevented this)
  try {
    const eventName = req.query.name as string || undefined;
    const data = await scrapeEventDetails(eventId, link, eventName);
    if (!data) return res.status(404).json({ error: 'Details not found' });
    setToCache(cacheKey, data, 24 * 60 * 60 * 1000);
    res.json(data);
  } catch (error: any) {
    console.error(`Error scraping details for ${eventId}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// Get Raid Bosses
app.get('/api/raids', async (req, res) => {
  try {
    const forceNoCache = req.query.nocache === 'true';
    const data = await getRaidBossesList(forceNoCache);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching raid bosses:', error.message);
    res.status(500).json({ error: 'Failed to fetch raid bosses' });
  }
});

// Get Rocket Lineups
app.get('/api/rocket', async (req, res) => {
  try {
    const forceNoCache = req.query.nocache === 'true';
    const data = await getRocketLineupsList(forceNoCache);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching rocket lineups:', error.message);
    res.status(500).json({ error: 'Failed to fetch rocket lineups' });
  }
});

// ==========================================
// Admin Panel Endpoints
// ==========================================

// Cache Stats (admin only)
app.get('/api/admin/cache-stats', requireAuth, (req, res) => {
  try {
    const meta = loadScraperMeta();
    const cacheFiles: string[] = [];
    let totalSizeBytes = 0;
    
    if (fs.existsSync(CACHE_DIR)) {
      const files = fs.readdirSync(CACHE_DIR);
      files.forEach(f => {
        const fp = path.join(CACHE_DIR, f);
        const stat = fs.statSync(fp);
        cacheFiles.push(f);
        totalSizeBytes += stat.size;
      });
    }

    res.json({
      scraperMeta: meta,
      isScraperRunning: scraperRunning,
      cacheFileCount: cacheFiles.length,
      cacheSizeKB: Math.round(totalSizeBytes / 1024),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cache for a specific event (admin only)
app.delete('/api/admin/cache/:id', requireAuth, (req, res) => {
  const eventId = req.params.id;
  try {
    deleteFromCache(`details_${eventId}`);
    res.json({ success: true, message: `Cache cleared for ${eventId}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Bulk import scraped data from uploaded JSON (admin only)
app.post('/api/admin/import', requireAuth, async (req, res) => {
  const { events: importedEvents, mode } = req.body;
  // mode: 'merge' (default) | 'replace'

  if (!Array.isArray(importedEvents) || importedEvents.length === 0) {
    return res.status(400).json({ error: 'No events provided in import payload' });
  }

  try {
    const existingCustom = await loadCustomEvents();
    const existingMap = new Map<string, any>(existingCustom.map(e => [e.eventID, e]));

    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    for (const ev of importedEvents) {
      if (!ev.eventID || !ev.name) {
        skippedCount++;
        continue;
      }

      const existing = existingMap.get(ev.eventID);
      if (existing) {
        // Merge: update only if mode is replace or event is custom
        if (mode === 'replace' || existing.isCustom) {
          existingMap.set(ev.eventID, { ...existing, ...ev });
          updatedCount++;
        } else {
          skippedCount++;
        }
      } else {
        existingMap.set(ev.eventID, {
          ...ev,
          isCustom: true,
          isDeleted: false,
        });
        addedCount++;
      }

      // Also store detail cache if extraData present
      if (ev.extraData) {
        setToCache(`details_${ev.eventID}`, ev.extraData, 12 * 60 * 60 * 1000);
      }
    }

    const mergedList = Array.from(existingMap.values());
    await saveCustomEvents(mergedList);
    deleteFromCache('events_list');

    res.json({
      success: true,
      added: addedCount,
      updated: updatedCount,
      skipped: skippedCount,
      total: mergedList.length,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Missing password' });
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Manually trigger scraper (admin only)
app.post('/api/admin/scrape', requireAuth, (req, res) => {
  if (scraperRunning) {
    return res.json({ success: false, message: 'Scraper is already running' });
  }
  // Fire and forget — runs in background
  runScheduledScraper('admin').catch(err => console.error('[Admin scrape] Error:', err));
  res.json({ success: true, message: 'Scraper started in background' });
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
  if (!newEvent.eventID) return res.status(400).json({ error: 'Missing eventID' });

  try {
    const events = await loadCustomEvents();
    const index = events.findIndex(e => e.eventID === newEvent.eventID);
    if (index !== -1) {
      events[index] = { ...events[index], ...newEvent };
    } else {
      events.push(newEvent);
    }

    await saveCustomEvents(events);
    deleteFromCache('events_list');
    deleteFromCache(`details_${newEvent.eventID}`);
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
      events.push({ eventID: eventId, name: '', eventType: '', heading: '', link: '', image: '', start: '', end: '', isDeleted: true, isCustom: false });
    }

    await saveCustomEvents(events);
    deleteFromCache('events_list');
    deleteFromCache(`details_${eventId}`);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// Wildcard SPA / Bot pre-rendering handler
// ==========================================

let spaShellCache = '';
async function getSpaShell(): Promise<string> {
  if (spaShellCache) return spaShellCache;
  try {
    // Try production local path first (bundled in container), then development path
    const prodPath = path.join(__dirname, 'app.html');
    const devPath = path.join(__dirname, '..', '..', 'frontend', 'dist', 'app.html');
    let localPath = '';

    if (fs.existsSync(prodPath)) {
      localPath = prodPath;
    } else if (fs.existsSync(devPath)) {
      localPath = devPath;
    }

    if (localPath) {
      spaShellCache = fs.readFileSync(localPath, 'utf-8');
      console.log(`[SPA Shell] Loaded from local path: ${localPath}`);
      return spaShellCache;
    }

    // Production fallback: fetch from the Firebase Hosting CDN
    console.log('[SPA Shell] Local file not found. Fetching from live CDN...');
    const response = await axios.get('https://pogoevents.app/app.html', { timeout: 5000 });
    spaShellCache = response.data;
    console.log('[SPA Shell] Loaded successfully from live CDN');
  } catch (err: any) {
    console.error('[SPA Shell] Failed to load SPA shell:', err.message);
    // Return standard fallback
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Pokémon GO Event Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
  }
  return spaShellCache;
}

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const botUserAgents = [
    'googlebot',
    'mediapartners-google',
    'google-adwords',
    'adsbot-google',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'sogou',
    'exabot',
    'facebot',
    'ia_archiver',
    'lighthouse',
    'twitterbot',
    'facebookexternalhit',
    'discordapp'
  ];
  const ua = userAgent.toLowerCase();
  return botUserAgents.some(bot => ua.includes(bot));
}

app.get('*', async (req, res, next) => {
  // Skip API routes and file extensions
  if (req.path.startsWith('/api/') || (req.path.includes('.') && !req.path.endsWith('.html'))) {
    return next();
  }

  const userAgent = req.headers['user-agent'];
  if (isBot(userAgent)) {
    console.log(`[Bot Detected] Serving pre-rendered HTML for ${req.path} (UA: ${userAgent})`);
    try {
      // Determine language from path
      let lang: 'cs' | 'en' | 'ja' | 'ru' = 'en';
      const match = req.path.match(/^\/(cs|en|ja|ru)\b/i);
      if (match) {
        lang = match[1].toLowerCase() as any;
      }

      // Fetch dynamic content
      const [events, raids, rocket] = await Promise.all([
        getEnrichedEventsList(false).catch(() => []),
        getRaidBossesList(false).catch(() => []),
        getRocketLineupsList(false).catch(() => [])
      ]);

      // Helper to fetch details from cache
      const getDetails = (eventId: string) => {
        return getFromCache<any>(`details_${eventId}`, 24 * 60 * 60 * 1000);
      };

      // Generate HTML
      const html = await generateBotHtml(lang, events, raids, rocket, getDetails);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (err: any) {
      console.error('[SSR Bot Error] Failed to generate pre-rendered HTML:', err.message);
      // Fallback to serving the normal SPA shell
    }
  }

  // Serve normal React SPA
  try {
    const html = await getSpaShell();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err: any) {
    return res.status(500).send('Internal Server Error');
  }
});

// ==========================================
// Start Server + Schedule + Initial Scrape
// ==========================================

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);

  // Schedule scraper every 3 hours (at minute 0: 00:00, 03:00, 06:00, ...)
  cron.schedule('0 */3 * * *', () => {
    console.log('[Cron] ⏰ Triggered scheduled scrape');
    runScheduledScraper('cron').catch(err => console.error('[Cron] Error:', err));
  });

  console.log('[Cron] Scheduled: every 3 hours');

  // Run initial scrape on startup if cache is stale (older than 3h) or missing
  const meta = loadScraperMeta();
  const lastScrapedMs = meta.lastScrapedAt ? Date.parse(meta.lastScrapedAt) : 0;
  const cacheAgeMs = Date.now() - lastScrapedMs;
  const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

  if (cacheAgeMs > THREE_HOURS_MS) {
    console.log(`[Startup] Cache is ${Math.round(cacheAgeMs / 60000)}min old — running initial scrape...`);
    runScheduledScraper('startup').catch(err => console.error('[Startup] Scrape error:', err));
  } else {
    const minsUntilNext = Math.round((THREE_HOURS_MS - cacheAgeMs) / 60000);
    console.log(`[Startup] Cache is fresh (${Math.round(cacheAgeMs / 60000)}min old). Next scrape in ~${minsUntilNext}min`);
  }
});
