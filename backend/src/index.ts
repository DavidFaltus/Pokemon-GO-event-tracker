import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import axios from 'axios';
import crypto from 'crypto';
import {
  scrapeEvents,
  scrapeEventDetails,
} from './scraper';
import { 
  loadCustomEvents, 
  saveCustomEvents, 
  CustomEvent, 
  loadPokemonIconOverrides, 
  savePokemonIconOverrides, 
  loadCustomRaidBosses, 
  saveCustomRaidBosses, 
  CustomRaidBoss,
  loadEventsListCache,
  saveEventsListCache,
  loadRocketLineupsCache,
  saveRocketLineupsCache,
  loadEventDetailsCache,
  saveEventDetailsCache
} from './storage';
import { generateBotHtml, generate404Html, RouteTarget, Language } from './ssr';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function rateLimit(windowMs: number, maxRequests: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const forwarded = req.headers['x-forwarded-for'];
    const clientIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${req.baseUrl || req.path}:${clientIp}`;
    const now = Date.now();
    const entry = rateLimitMap.get(key);
    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    entry.count++;
    if (entry.count > maxRequests) {
      return res.status(429).json({ error: 'Too many requests, please try again later' });
    }
    next();
  };
}
// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
}, 5 * 60 * 1000);

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pogo2026admin';
const activeAdminTokens = new Set<string>();

// Enable CORS so the React app can call the API
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://pogoevents.app', 'https://pokemon-go-event-tracker.web.app']
    : true,
  credentials: true
}));
app.use(express.json());

// Apply rate limiting:
// 1) Login route (prevent brute-force): max 30 requests / min
app.use('/api/admin/login', rateLimit(60 * 1000, 30));
// 2) Authenticated admin routes: max 600 requests / min
app.use('/api/admin', rateLimit(60 * 1000, 600));
// 3) General public API routes: max 300 requests / min
app.use('/api', rateLimit(60 * 1000, 300));

// Serve sitemap.xml directly with fast streaming
app.get('/sitemap.xml', (req, res) => {
  const possiblePaths = [
    path.join(__dirname, '..', 'sitemap.xml'),
    path.join(__dirname, '..', 'dist', 'sitemap.xml'),
    path.join(__dirname, '..', '..', 'frontend', 'out', 'sitemap.xml'),
    path.join(__dirname, '..', '..', 'frontend', 'dist', 'sitemap.xml'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
      return res.sendFile(path.resolve(p));
    }
  }
  return res.status(404).send('Sitemap not found');
});

// Serve robots.txt directly
app.get('/robots.txt', (req, res) => {
  const possiblePaths = [
    path.join(__dirname, '..', 'robots.txt'),
    path.join(__dirname, '..', 'dist', 'robots.txt'),
    path.join(__dirname, '..', '..', 'frontend', 'out', 'robots.txt'),
    path.join(__dirname, '..', '..', 'frontend', 'dist', 'robots.txt'),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.sendFile(path.resolve(p));
    }
  }
  return res.type('text/plain').send('User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://pogoevents.app/sitemap.xml\n');
});

// ==========================================
// Hybrid Cache (In-Memory + Persistent Disk)
// ==========================================

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_DIR = path.join(__dirname, '..', '.cache');

/**
 * Returns fresh cached data if age < ttlMs.
 */
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

/**
 * Fallback to return last known cached data regardless of expiration age (Stale-While-Revalidate).
 * Prevents empty UI and fatal errors if remote sources are unreachable or rate-limited.
 */
function getStaleCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && entry.data) {
    return entry.data;
  }

  try {
    const cacheFilePath = path.join(CACHE_DIR, `${key}.json`);
    if (fs.existsSync(cacheFilePath)) {
      const content = fs.readFileSync(cacheFilePath, 'utf-8');
      const data = JSON.parse(content);
      if (data) {
        cache.set(key, { data, expiry: Date.now() + 60 * 60 * 1000 });
        return data;
      }
    }
  } catch (err) {
    console.error(`Failed to read stale cache for ${key}:`, err);
  }
  return null;
}

function setToCache<T>(key: string, data: T, ttlMs: number) {
  if (data === null || data === undefined) return;
  // If array and empty, don't overwrite existing good non-empty cache
  if (Array.isArray(data) && data.length === 0) {
    const existing = cache.get(key);
    if (existing && Array.isArray(existing.data) && existing.data.length > 0) {
      return;
    }
  }

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
      // If triggered manually by admin, force re-scrape active/upcoming events
      if (triggeredBy === 'admin') return true;
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
        const forceRescrape = (triggeredBy === 'admin');
        const details = await scrapeEventDetails(event.eventID, event.link, event.name, forceRescrape);
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

    // ── 5. Refresh raid bosses list ─────────────────────────────────
    await getRaidBossesList(true).catch(err => console.error('[Scheduler] Error updating raid bosses:', err));

    // ── 6. Save updated metadata ────────────────────────────────────
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
    console.error('[Scheduler] ❌ Scrape error:', err.message);
    const nextScrapeAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const meta = loadScraperMeta();
    saveScraperMeta({
      ...meta,
      lastScrapedAt: new Date().toISOString(),
      nextScrapeAt
    });
  } finally {
    scraperRunning = false;
  }
}

// ==========================================
// Authentication Middleware
// ==========================================

function isValidAdminToken(token: string): boolean {
  if (!token) return false;
  const effectivePassword = ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'pogo2026admin';

  // 1. Raw password fallback
  if (token === effectivePassword) return true;

  // 2. In-memory set check
  if (activeAdminTokens.has(token)) return true;

  // 3. Stateless HMAC verification (Format: <timestamp>.<signature>)
  const parts = token.split('.');
  if (parts.length === 2) {
    const [timestampStr, hash] = parts;
    const timestamp = parseInt(timestampStr, 10);
    if (!isNaN(timestamp)) {
      // Token valid for 30 days
      if (Date.now() - timestamp < 30 * 24 * 60 * 60 * 1000) {
        const expectedHash = crypto.createHmac('sha256', effectivePassword).update(timestampStr).digest('hex');
        if (hash.length === expectedHash.length && crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash))) {
          return true;
        }
      }
    }
  }

  return false;
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
  const token = authHeader.split(' ')[1];
  if (!isValidAdminToken(token)) {
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

// Proxy Image Endpoint (bypasses browser CORS restrictions for infographic export)
app.get('/api/proxy-image', async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }
  try {
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const rawContentType = response.headers['content-type'];
    const contentType = typeof rawContentType === 'string' ? rawContentType : 'image/png';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.send(Buffer.from(response.data));
  } catch (err: any) {
    return res.status(500).send(`Error proxying image: ${err?.message || err}`);
  }
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

  if (!scrapedData || scrapedData.length === 0) {
    try {
      scrapedData = await scrapeEvents();
      if (scrapedData && scrapedData.length > 0) {
        setToCache(cacheKey, scrapedData, 12 * 60 * 60 * 1000);
      }
    } catch (error: any) {
      console.error('[getEnrichedEventsList] Scraping events error:', error.message);
    }
  }

  // Resilient fallback: If live scraping failed, use stale cache from memory or disk
  if (!scrapedData || scrapedData.length === 0) {
    const staleData = getStaleCache<any[]>(cacheKey);
    if (staleData && staleData.length > 0) {
      scrapedData = staleData;
      console.log(`[getEnrichedEventsList] Using last known good events cache (${scrapedData.length} events).`);
    } else {
      const diskData = await loadEventsListCache().catch(() => []);
      if (diskData && diskData.length > 0) {
        scrapedData = diskData;
        setToCache(cacheKey, scrapedData, 12 * 60 * 60 * 1000);
        console.log(`[getEnrichedEventsList] Restored ${scrapedData.length} events from persistent disk storage.`);
      } else {
        scrapedData = [];
      }
    }
  }

  const customEvents = await loadCustomEvents().catch(() => []);
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
    if (!event.isDeleted) {
      const existsInMerged = mergedEvents.some((e: any) => e.eventID === event.eventID);
      if (!existsInMerged) mergedEvents.push(event);
    }
  });

  const enrichedEvents = mergedEvents.map((event: any) => {
    const detailsCache = getFromCache<any>(`details_${event.eventID}`, 24 * 60 * 60 * 1000) || getStaleCache<any>(`details_${event.eventID}`);
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
  const cachedData = forceNoCache ? null : getFromCache<any>(cacheKey, 1 * 60 * 60 * 1000); // 1 hour TTL for fresh lineup updates
  if (cachedData && cachedData.length > 0) return cachedData;

  let data: any[] = [];
  try {
    const events = await getEnrichedEventsList(false).catch(() => []);
    const { scrapeRaidBosses } = await import('./scraper');
    data = await scrapeRaidBosses(events);
  } catch (err: any) {
    console.warn(`[getRaidBossesList] Scraping failed: ${err.message}. Using last known cache.`);
  }

  // Resilient fallback: If live scraping failed, use stale cache
  if (!data || data.length === 0) {
    data = getStaleCache<any[]>(cacheKey) || [];
    if (data.length > 0) {
      console.log(`[getRaidBossesList] Served ${data.length} raid bosses from last known good cache.`);
    }
  }

  // Apply custom raid overrides & blacklists from storage
  const customRaids = await loadCustomRaidBosses().catch(() => []);
  if (customRaids.length > 0) {
    const deletedKeys = new Set(
      customRaids
        .filter(c => c.isDeleted)
        .map(c => `${c.name.toLowerCase()}-${c.tier}`)
    );

    // Filter out blacklisted/deleted bosses
    data = data.filter(b => !deletedKeys.has(`${b.name.toLowerCase()}-${b.tier}`));

    // Add custom added bosses
    for (const custom of customRaids.filter(c => c.isCustom && !c.isDeleted)) {
      const exists = data.some(b => b.tier === custom.tier && b.name.toLowerCase() === custom.name.toLowerCase());
      if (!exists) {
        data.push({
          name: custom.name,
          tier: custom.tier,
          image: custom.image || `https://img.pokemondb.net/sprites/home/normal/${custom.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          canBeShiny: custom.canBeShiny ?? true,
          cpRange: custom.cpRange,
          boostedCpRange: custom.boostedCpRange,
          weatherBoosts: custom.weatherBoosts,
          types: custom.types,
          counters: undefined
        } as any);
      }
    }
  }

  if (data && data.length > 0) {
    setToCache(cacheKey, data, 1 * 60 * 60 * 1000);
  }
  return data;
}

// Helper to fetch rocket lineups
async function getRocketLineupsList(forceNoCache: boolean = false): Promise<any> {
  const cacheKey = 'rocket_lineups';
  const cachedData = forceNoCache ? null : getFromCache<any>(cacheKey, 24 * 60 * 60 * 1000);
  if (cachedData && cachedData.giovanni) return cachedData;

  let data: any = null;
  try {
    const { scrapeRocketLineups } = await import('./scraper');
    data = await scrapeRocketLineups();
  } catch (err: any) {
    console.warn(`[getRocketLineupsList] Scraping failed: ${err.message}. Using last known cache.`);
  }

  // Resilient fallback: If live scraping failed, use stale cache
  if (!data || !data.giovanni) {
    data = getStaleCache<any>(cacheKey) || (await loadRocketLineupsCache().catch(() => null));
    if (data && data.giovanni) {
      console.log('[getRocketLineupsList] Served rocket lineups from last known good cache.');
    }
  }

  if (data) {
    setToCache(cacheKey, data, 24 * 60 * 60 * 1000);
    return data;
  }

  throw new Error('No rocket lineups data available.');
}

// Get Events (Merged Scraped + Custom)
app.get('/api/events', async (req, res) => {
  try {
    const forceNoCache = req.query.nocache === 'true';
    const data = await getEnrichedEventsList(forceNoCache);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    const stale = getStaleCache<any[]>('events_list') || (await loadEventsListCache().catch(() => [])) || [];
    res.json(stale);
  }
});

// Get Single Event by ID
app.get('/api/events/:id', async (req, res) => {
  try {
    const data = await getEnrichedEventsList(false);
    const event = data.find((e: any) => e.eventID === req.params.id);
    if (event) {
      return res.json(event);
    }
    return res.status(404).json({ error: 'Event not found' });
  } catch (error: any) {
    console.error('Error fetching event by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch event' });
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

  const cacheKey = `details_${eventId}`;
  const forceNoCache = req.query.nocache === 'true';
  const cachedData = forceNoCache ? null : getFromCache<any>(cacheKey, 24 * 60 * 60 * 1000);

  if (cachedData) {
    return res.json(cachedData);
  }

  // Cache miss or expired — attempt scrape
  try {
    const eventName = req.query.name as string || undefined;
    const data = await scrapeEventDetails(eventId, link || '', eventName);
    if (data) {
      setToCache(cacheKey, data, 24 * 60 * 60 * 1000);
      return res.json(data);
    }
  } catch (error: any) {
    console.warn(`[details] Error scraping details for ${eventId}:`, error.message);
  }

  // Resilient Fallback: Return stale cache if available
  const staleData = getStaleCache<any>(cacheKey);
  if (staleData) {
    console.log(`[details] Serving stale cached details for ${eventId} due to remote refusal/error`);
    return res.json(staleData);
  }

  // Check persistent disk cache storage
  try {
    const allDetails = await loadEventDetailsCache();
    if (allDetails && allDetails[eventId]?.details) {
      return res.json(allDetails[eventId].details);
    }
  } catch {}

  return res.status(404).json({ error: 'Details not found' });
});

// Get Raid Bosses
app.get('/api/raids', async (req, res) => {
  try {
    const forceNoCache = req.query.nocache === 'true';
    const data = await getRaidBossesList(forceNoCache);
    res.json(data);
  } catch (error: any) {
    console.error('Error fetching raid bosses:', error.message);
    const stale = getStaleCache<any[]>('raid_bosses') || [];
    res.json(stale);
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
    const stale = getStaleCache<any>('rocket_lineups') || (await loadRocketLineupsCache().catch(() => null));
    if (stale) {
      return res.json(stale);
    }
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
  const effectivePassword = ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'pogo2026admin';
  if (password === effectivePassword) {
    const timestampStr = Date.now().toString();
    const signature = crypto.createHmac('sha256', effectivePassword).update(timestampStr).digest('hex');
    const sessionToken = `${timestampStr}.${signature}`;
    activeAdminTokens.add(sessionToken);
    res.json({ success: true, token: sessionToken });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Manually trigger scraper (admin only)
app.post('/api/admin/scrape', requireAuth, (req, res) => {
  if (scraperRunning && req.query.force !== 'true') {
    return res.json({ 
      success: false, 
      message: 'Scraper na pozadí již právě běží. Pokud chcete vynutit nový start, použijte force parameter.' 
    });
  }
  scraperRunning = false;
  // Fire and forget — runs in background
  runScheduledScraper('admin').catch(err => console.error('[Admin scrape] Error:', err));
  res.json({ success: true, message: 'Scraper byl úspěšně spuštěn na pozadí' });
});

// Get all pokemon icon overrides (public)
app.get('/api/pokemon-icons', async (_req, res) => {
  try {
    const overrides = await loadPokemonIconOverrides();
    res.json({ success: true, overrides });
  } catch (err: any) {
    res.json({ success: true, overrides: {} });
  }
});

// Update pokemon icon overrides (admin only)
app.post('/api/admin/pokemon-icons', requireAuth, async (req, res) => {
  try {
    const { overrides } = req.body;
    if (typeof overrides !== 'object' || overrides === null) {
      return res.status(400).json({ error: 'Invalid overrides object' });
    }
    const ok = await savePokemonIconOverrides(overrides);
    if (ok) {
      deleteFromCache('events_list');
      res.json({ success: true, overrides });
    } else {
      res.status(500).json({ error: 'Failed to save icon overrides' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get all raid bosses & custom overrides (admin only)
app.get('/api/admin/raids', requireAuth, async (req, res) => {
  try {
    const live = await getRaidBossesList(false);
    const overrides = await loadCustomRaidBosses();
    res.json({ live, overrides });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update raid boss override / blacklist (admin only)
app.post('/api/admin/raids/override', requireAuth, async (req, res) => {
  try {
    const { name, tier, image, canBeShiny, cpRange, boostedCpRange, weatherBoosts, types, isDeleted, isCustom } = req.body;
    if (!name || !tier) {
      return res.status(400).json({ error: 'Name and Tier are required' });
    }

    const current = await loadCustomRaidBosses();
    const existingIdx = current.findIndex(c => c.name.toLowerCase() === name.toLowerCase() && c.tier === tier);

    const newBoss: CustomRaidBoss = {
      id: existingIdx >= 0 ? current[existingIdx].id : `custom-raid-${Date.now()}`,
      name: name.trim(),
      tier,
      image,
      canBeShiny,
      cpRange,
      boostedCpRange,
      weatherBoosts,
      types,
      isDeleted: Boolean(isDeleted),
      isCustom: isCustom !== undefined ? Boolean(isCustom) : true
    };

    if (existingIdx >= 0) {
      current[existingIdx] = newBoss;
    } else {
      current.push(newBoss);
    }

    await saveCustomRaidBosses(current);
    deleteFromCache('raid_bosses');
    const updatedLive = await getRaidBossesList(true);

    res.json({ success: true, live: updatedLive, overrides: current });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Remove custom raid override or un-blacklist (admin only)
app.delete('/api/admin/raids/override/:name/:tier', requireAuth, async (req, res) => {
  try {
    const { name, tier } = req.params;
    let current = await loadCustomRaidBosses();
    current = current.filter(c => !(c.name.toLowerCase() === name.toLowerCase() && c.tier === tier));
    await saveCustomRaidBosses(current);
    deleteFromCache('raid_bosses');
    const updatedLive = await getRaidBossesList(true);
    res.json({ success: true, live: updatedLive, overrides: current });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Force refresh & re-scrape raid bosses (admin only)
app.post('/api/admin/raids/refresh', requireAuth, async (req, res) => {
  try {
    deleteFromCache('raid_bosses');
    const updatedLive = await getRaidBossesList(true);
    res.json({ success: true, message: 'Raid bosses refreshed successfully', live: updatedLive });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
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

// Re-scrape a specific event from a new URL (admin only)
app.post('/api/admin/events/:id/rescrape', requireAuth, async (req, res) => {
  const eventId = req.params.id;
  const { url } = req.body;

  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Missing or invalid URL. Must start with http(s).' });
  }

  try {
    // Clear existing detail cache for this event
    deleteFromCache(`details_${eventId}`);
    console.log(`[Admin Rescrape] Cache cleared for ${eventId}, scraping from: ${url}`);

    // Find event name from scraped or custom events for better scraping context
    let eventName: string | undefined;
    try {
      const customEvents = await loadCustomEvents();
      const customMatch = customEvents.find(e => e.eventID === eventId);
      if (customMatch && customMatch.name) {
        eventName = typeof customMatch.name === 'string' ? customMatch.name : (customMatch.name as any).en || (customMatch.name as any).cs;
      }
    } catch { /* ignore */ }

    // Run scraper with the new URL (forceRescrape = true)
    const details = await scrapeEventDetails(eventId, url, eventName, true);

    if (!details) {
      return res.status(404).json({ error: 'Scraper returned no data for the provided URL' });
    }

    // Save to cache
    const DETAIL_CACHE_TTL = 24 * 60 * 60 * 1000;
    setToCache(`details_${eventId}`, details, DETAIL_CACHE_TTL);
    console.log(`[Admin Rescrape] ✅ Successfully scraped ${eventId} from ${url}`);

    res.json({ success: true, details });
  } catch (err: any) {
    console.error(`[Admin Rescrape] ❌ Failed for ${eventId}:`, err.message);
    res.status(500).json({ error: `Scraping failed: ${err.message}` });
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
    const candidatePaths = [
      path.join(__dirname, 'app.html'),
      path.join(__dirname, '..', 'app.html'),
      path.join(process.cwd(), 'app.html'),
      path.join(process.cwd(), 'dist', 'app.html'),
      path.join(__dirname, '..', '..', 'frontend', 'dist', 'app.html')
    ];

    const localPath = candidatePaths.find(p => fs.existsSync(p));

    if (localPath) {
      spaShellCache = fs.readFileSync(localPath, 'utf-8');
      console.log(`[SPA Shell] Loaded from local path: ${localPath}`);
      return spaShellCache;
    }

    // Production fallback: fetch from the Firebase Hosting CDN
    console.log('[SPA Shell] Local file not found. Fetching from live CDN...');
    const response = await axios.get('https://pogoevents.app/cs.html', { timeout: 5000 });
    if (response.data && response.data.length > 5000) {
      spaShellCache = response.data;
      console.log('[SPA Shell] Loaded successfully from live CDN');
      return spaShellCache;
    }
  } catch (err: any) {
    console.error('[SPA Shell] Failed to load SPA shell:', err.message);
  }
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
  // Skip API routes and static files with extensions
  if (req.path.startsWith('/api/') || (req.path.includes('.') && !req.path.endsWith('.html'))) {
    return next();
  }

  const userAgent = req.headers['user-agent'];
  console.log(`[Request] Serving route: ${req.path} (UA: ${userAgent || 'Unknown'})`);

  // 1. Determine language
  let lang: Language = 'cs';
  let cleanPath = req.path;
  const langMatch = req.path.match(/^\/(cs|en|ja|ru)(\/.*)?$/i);
  if (langMatch) {
    lang = langMatch[1].toLowerCase() as Language;
    cleanPath = langMatch[2] || '';
  }

  // Normalize cleanPath
  cleanPath = cleanPath.replace(/\/+$/, '');
  if (!cleanPath) cleanPath = '/';

  // 2. Disallow invalid/broken characters (e.g. /$, /undefined, /null)
  if (cleanPath === '/$' || cleanPath.includes('undefined') || cleanPath.includes('null')) {
    return res.status(404).send(generate404Html(lang));
  }

  // 3. Resolve Target Route
  let target: RouteTarget | null = null;

  if (cleanPath === '/' || cleanPath === '/events') {
    target = { type: 'events', lang, canonicalPath: `/${lang}/events` };
  } else if (cleanPath.startsWith('/events/')) {
    const eventSlug = cleanPath.replace('/events/', '').trim();
    if (eventSlug && !eventSlug.includes('/')) {
      target = { type: 'event-detail', lang, canonicalPath: `/${lang}/events/${eventSlug}`, param: eventSlug };
    }
  } else if (cleanPath === '/pokemon' || cleanPath === '/rankings') {
    target = { type: 'rankings', lang, canonicalPath: `/${lang}/rankings` };
  } else if (cleanPath.startsWith('/pokemon/')) {
    const pokeId = cleanPath.replace('/pokemon/', '').trim();
    const num = parseInt(pokeId, 10);
    // Valid Pokédex ID is 1 to 1025
    if (!isNaN(num) && num >= 1 && num <= 1025) {
      target = { type: 'pokemon-detail', lang, canonicalPath: `/${lang}/pokemon/${num}`, param: num.toString() };
    } else if (/^[a-zA-Z0-9-]+$/.test(pokeId)) {
      target = { type: 'pokemon-detail', lang, canonicalPath: `/${lang}/pokemon/${pokeId}`, param: pokeId };
    }
  } else if (cleanPath.startsWith('/rankings/')) {
    const cat = cleanPath.replace('/rankings/', '').trim();
    if (cat && !cat.includes('/')) {
      target = { type: 'ranking-category', lang, canonicalPath: `/${lang}/rankings/${cat}`, param: cat };
    }
  } else if (cleanPath.startsWith('/types/')) {
    const typeSlug = cleanPath.replace('/types/', '').trim().toLowerCase();
    const validTypes = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'];
    if (validTypes.includes(typeSlug)) {
      target = { type: 'types', lang, canonicalPath: `/${lang}/types/${typeSlug}`, param: typeSlug };
    }
  } else if (cleanPath === '/raids') {
    target = { type: 'raids', lang, canonicalPath: `/${lang}/raids` };
  } else if (cleanPath.startsWith('/raids/')) {
    const raidSlug = cleanPath.replace('/raids/', '').trim();
    if (raidSlug && !raidSlug.includes('/')) {
      target = { type: 'raid-counters', lang, canonicalPath: `/${lang}/raids/${raidSlug}`, param: raidSlug };
    }
  } else if (cleanPath === '/rocket') {
    target = { type: 'rocket', lang, canonicalPath: `/${lang}/rocket` };
  } else if (cleanPath.startsWith('/rocket/')) {
    const leader = cleanPath.replace('/rocket/', '').trim().toLowerCase();
    if (['giovanni', 'cliff', 'sierra', 'arlo', 'grunts'].includes(leader)) {
      target = { type: 'rocket-leader', lang, canonicalPath: `/${lang}/rocket/${leader}`, param: leader };
    }
  } else if (cleanPath === '/guides') {
    target = { type: 'guides', lang, canonicalPath: `/${lang}/guides` };
  } else if (cleanPath.startsWith('/guides/')) {
    const guideSlug = cleanPath.replace('/guides/', '').trim();
    if (guideSlug && !guideSlug.includes('/')) {
      target = { type: 'guide-detail', lang, canonicalPath: `/${lang}/guides/${guideSlug}`, param: guideSlug };
    }
  } else if (cleanPath === '/ditto') {
    target = { type: 'ditto', lang, canonicalPath: `/${lang}/ditto` };
  } else if (cleanPath === '/eggs') {
    target = { type: 'eggs', lang, canonicalPath: `/${lang}/eggs` };
  } else if (cleanPath === '/filter') {
    target = { type: 'filter', lang, canonicalPath: `/${lang}/filter` };
  } else if (cleanPath === '/download' || cleanPath === '/app' || cleanPath === '/apk') {
    target = { type: 'download', lang, canonicalPath: `/${lang}/download` };
  }

  // 4. If route is completely unknown / invalid -> Return strict 404!
  if (!target) {
    console.warn(`[Route 404] Unknown route requested: ${req.path}`);
    return res.status(404).send(generate404Html(lang));
  }

  try {
    // Fetch dynamic content
    const [events, raids, rocket] = await Promise.all([
      getEnrichedEventsList(false).catch(() => []),
      getRaidBossesList(false).catch(() => []),
      getRocketLineupsList(false).catch(() => [])
    ]);

    // If event detail requested but event does not exist -> 404
    if (target.type === 'event-detail' && target.param) {
      const exists = events.some(e => e.eventID === target?.param);
      if (!exists) {
        console.warn(`[Event 404] Event not found: ${target.param}`);
        return res.status(404).send(generate404Html(lang));
      }
    }

    // Helper to fetch details from cache (fresh or stale)
    const getDetails = (eventId: string) => {
      return getFromCache<any>(`details_${eventId}`, 24 * 60 * 60 * 1000) || getStaleCache<any>(`details_${eventId}`);
    };

    // Generate pre-rendered HTML with exact canonical and matching hreflangs
    let html = await generateBotHtml(target, events, raids, rocket, getDetails);

    // If client is a standard browser, attempt to inject the client JS bundle from SPA shell
    try {
      const spaShell = await getSpaShell();
      const scriptMatches = spaShell.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/gi);
      if (scriptMatches && scriptMatches.length > 0) {
        const scriptsHtml = scriptMatches.join('\n');
        html = html.replace('</body>', `<div id="root"></div>\n${scriptsHtml}\n</body>`);
      }
    } catch { /* ignore script injection if shell missing */ }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (err: any) {
    console.error('[SSR Route Error] Failed to generate pre-rendered HTML:', err.message);
    return res.status(404).send(generate404Html(lang));
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
