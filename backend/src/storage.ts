import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';

const LOCAL_FILE_PATH = path.join(__dirname, '..', 'custom_events.json');
const BUCKET_NAME = process.env.GCS_BUCKET || 'pokego-event-tracker-2026.appspot.com';
const FILE_NAME = 'custom_events.json';

let storage: Storage | null = null;
if (process.env.NODE_ENV === 'production' || process.env.USE_GCS === 'true') {
  try {
    storage = new Storage();
  } catch (err) {
    console.error('Failed to initialize Google Cloud Storage:', err);
  }
}

export interface CustomEvent {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string; // ISO String (UTC) or local datetime string
  end: string;   // ISO String (UTC) or local datetime string
  extraData?: any;
  isDeleted?: boolean; // If true, this event (scraped or custom) is hidden/deleted
  isCustom?: boolean;  // If true, this event was created manually
}

export async function loadCustomEvents(): Promise<CustomEvent[]> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
      return [];
    } catch (err: any) {
      console.error('Failed to load custom events from GCS:', err.message);
      // Fallback to local
    }
  }

  // Local fallback
  try {
    if (fs.existsSync(LOCAL_FILE_PATH)) {
      const content = fs.readFileSync(LOCAL_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load custom events locally:', err);
  }
  return [];
}

export async function saveCustomEvents(events: CustomEvent[]): Promise<boolean> {
  const dataStr = JSON.stringify(events, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      console.log('Saved custom events to GCS');
      return true;
    } catch (err: any) {
      console.error('Failed to save custom events to GCS:', err.message);
      // Fallback to local
    }
  }

  // Local fallback
  try {
    fs.writeFileSync(LOCAL_FILE_PATH, dataStr, 'utf-8');
    console.log('Saved custom events locally');
    return true;
  } catch (err) {
    console.error('Failed to save custom events locally:', err);
    return false;
  }
}

const ICONS_FILE_PATH = path.join(__dirname, '..', 'pokemon_icons.json');
const ICONS_FILE_NAME = 'pokemon_icons.json';

export async function loadPokemonIconOverrides(): Promise<Record<string, string>> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(ICONS_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
      return {};
    } catch (err: any) {
      console.error('Failed to load pokemon icons from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(ICONS_FILE_PATH)) {
      const content = fs.readFileSync(ICONS_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load pokemon icons locally:', err);
  }
  return {};
}

export async function savePokemonIconOverrides(overrides: Record<string, string>): Promise<boolean> {
  const dataStr = JSON.stringify(overrides, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(ICONS_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save pokemon icons to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(ICONS_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save pokemon icons locally:', err);
    return false;
  }
}

const RAIDS_FILE_PATH = path.join(__dirname, '..', 'custom_raids.json');
const RAIDS_FILE_NAME = 'custom_raids.json';

export interface CustomRaidBoss {
  id?: string;
  name: string;
  tier: '1' | '3' | '5' | 'mega' | 'shadow-1' | 'shadow-3' | 'shadow-5';
  image?: string;
  canBeShiny?: boolean;
  cpRange?: string;
  boostedCpRange?: string;
  weatherBoosts?: string[];
  types?: string[];
  isDeleted?: boolean;
  isCustom?: boolean;
  playersRecommended?: string;
  difficultyTier?: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group';
  difficultyNotes?: { cs: string; en: string };
  pokebattlerUrl?: string;
}

export async function loadCustomRaidBosses(): Promise<CustomRaidBoss[]> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(RAIDS_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
      return [];
    } catch (err: any) {
      console.error('Failed to load custom raids from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(RAIDS_FILE_PATH)) {
      const content = fs.readFileSync(RAIDS_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load custom raids locally:', err);
  }
  return [];
}

export async function saveCustomRaidBosses(raids: CustomRaidBoss[]): Promise<boolean> {
  const dataStr = JSON.stringify(raids, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(RAIDS_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save custom raids to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(RAIDS_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save custom raids locally:', err);
    return false;
  }
}

// ─── EVENT DETAILS & VERIFIED IMAGES PERSISTENT CACHE ───────────────
const DETAILS_FILE_PATH = path.join(__dirname, '..', 'event_details_cache.json');
const DETAILS_FILE_NAME = 'event_details_cache.json';

const IMAGES_FILE_PATH = path.join(__dirname, '..', 'verified_images_cache.json');
const IMAGES_FILE_NAME = 'verified_images_cache.json';

export async function loadEventDetailsCache(): Promise<Record<string, any>> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(DETAILS_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load event details cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(DETAILS_FILE_PATH)) {
      const content = fs.readFileSync(DETAILS_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load event details cache locally:', err);
  }
  return {};
}

export async function saveEventDetailsCache(detailsMap: Record<string, any>): Promise<boolean> {
  const dataStr = JSON.stringify(detailsMap, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(DETAILS_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save event details cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(DETAILS_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save event details cache locally:', err);
    return false;
  }
}

export async function loadVerifiedImagesCache(): Promise<Record<string, string>> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(IMAGES_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load verified images cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(IMAGES_FILE_PATH)) {
      const content = fs.readFileSync(IMAGES_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load verified images cache locally:', err);
  }
  return {};
}

export async function saveVerifiedImagesCache(imagesMap: Record<string, string>): Promise<boolean> {
  const dataStr = JSON.stringify(imagesMap, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(IMAGES_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save verified images cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(IMAGES_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save verified images cache locally:', err);
    return false;
  }
}

// ─── EVENTS LIST PERSISTENT DISK CACHE (429 & OFFLINE RESILIENCE) ───
const EVENTS_LIST_FILE_PATH = path.join(__dirname, '..', 'events_list_cache.json');
const EVENTS_LIST_FILE_NAME = 'events_list_cache.json';

export async function loadEventsListCache(): Promise<any[]> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(EVENTS_LIST_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load events list cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(EVENTS_LIST_FILE_PATH)) {
      const content = fs.readFileSync(EVENTS_LIST_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load events list cache locally:', err);
  }
  return [];
}

export async function saveEventsListCache(events: any[]): Promise<boolean> {
  const dataStr = JSON.stringify(events, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(EVENTS_LIST_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save events list cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(EVENTS_LIST_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save events list cache locally:', err);
    return false;
  }
}

// ─── ROCKET LINEUPS PERSISTENT DISK CACHE ─────────────────────────
const ROCKET_FILE_PATH = path.join(__dirname, '..', 'rocket_lineups_cache.json');
const ROCKET_FILE_NAME = 'rocket_lineups_cache.json';

export async function loadRocketLineupsCache(): Promise<any | null> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(ROCKET_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load rocket lineups cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(ROCKET_FILE_PATH)) {
      const content = fs.readFileSync(ROCKET_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load rocket lineups cache locally:', err);
  }
  return null;
}

export async function saveRocketLineupsCache(rocketData: any): Promise<boolean> {
  const dataStr = JSON.stringify(rocketData, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(ROCKET_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save rocket lineups cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(ROCKET_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save rocket lineups cache locally:', err);
    return false;
  }
}

// ─── EGG POOL PERSISTENT DISK CACHE ───────────────────────────────
const EGGS_FILE_PATH = path.join(__dirname, '..', 'eggs_cache.json');
const EGGS_FILE_NAME = 'eggs_cache.json';

export async function loadEggPoolCache(): Promise<any[]> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(EGGS_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load egg pool cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(EGGS_FILE_PATH)) {
      const content = fs.readFileSync(EGGS_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load egg pool cache locally:', err);
  }
  return [];
}

export async function saveEggPoolCache(eggs: any[]): Promise<boolean> {
  const dataStr = JSON.stringify(eggs, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(EGGS_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save egg pool cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(EGGS_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save egg pool cache locally:', err);
    return false;
  }
}

// ─── FIELD RESEARCH PERSISTENT DISK CACHE ─────────────────────────
const RESEARCH_FILE_PATH = path.join(__dirname, '..', 'research_cache.json');
const RESEARCH_FILE_NAME = 'research_cache.json';

export async function loadResearchCache(): Promise<any[]> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(RESEARCH_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load research cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(RESEARCH_FILE_PATH)) {
      const content = fs.readFileSync(RESEARCH_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load research cache locally:', err);
  }
  return [];
}

export async function saveResearchCache(research: any[]): Promise<boolean> {
  const dataStr = JSON.stringify(research, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(RESEARCH_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save research cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(RESEARCH_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save research cache locally:', err);
    return false;
  }
}

// ─── RAID BOSSES PERSISTENT DISK CACHE ─────────────────────────────
const RAIDS_CACHE_FILE_PATH = path.join(__dirname, '..', 'raids_cache.json');
const RAIDS_CACHE_FILE_NAME = 'raids_cache.json';

export async function loadRaidBossesCache(): Promise<any[]> {
  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(RAIDS_CACHE_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        return JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load raids cache from GCS:', err.message);
    }
  }

  try {
    if (fs.existsSync(RAIDS_CACHE_FILE_PATH)) {
      const content = fs.readFileSync(RAIDS_CACHE_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Failed to load raids cache locally:', err);
  }
  return [];
}

export async function saveRaidBossesCache(raids: any[]): Promise<boolean> {
  const dataStr = JSON.stringify(raids, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(RAIDS_CACHE_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save raids cache to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(RAIDS_CACHE_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save raids cache locally:', err);
    return false;
  }
}


// ─── FRIEND CODES & MATCHMAKER PERSISTENCE ─────────────────────────
export interface FriendListing {
  id: string;
  trainerCode: string;
  trainerName: string;
  vivillonPattern: string;
  team: 'mystic' | 'valor' | 'instinct' | 'any';
  purpose: 'all' | 'vivillon' | 'raids' | 'xp' | 'trades';
  country?: string;
  note?: string;
  createdAt: number;
  expiresAt: number;
}

const FRIENDS_FILE_PATH = path.join(__dirname, '..', 'friends_listings.json');
const FRIENDS_FILE_NAME = 'friends_listings.json';

const DEFAULT_SAMPLE_FRIENDS: FriendListing[] = [];

export async function loadFriendListings(): Promise<FriendListing[]> {
  const now = Date.now();
  let rawList: FriendListing[] = [];

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(FRIENDS_FILE_NAME);
      const [exists] = await file.exists();
      if (exists) {
        const [content] = await file.download();
        rawList = JSON.parse(content.toString());
      }
    } catch (err: any) {
      console.error('Failed to load friends listings from GCS:', err.message);
    }
  }

  if (rawList.length === 0) {
    try {
      if (fs.existsSync(FRIENDS_FILE_PATH)) {
        const content = fs.readFileSync(FRIENDS_FILE_PATH, 'utf-8');
        rawList = JSON.parse(content);
      }
    } catch (err) {
      console.error('Failed to load friends listings locally:', err);
    }
  }

  if (rawList.length === 0) {
    rawList = DEFAULT_SAMPLE_FRIENDS;
  }

  // Filter out expired entries (> 7 days)
  const activeList = rawList.filter(item => item.expiresAt > now);
  return activeList.sort((a, b) => b.createdAt - a.createdAt);
}

export async function saveFriendListings(listings: FriendListing[]): Promise<boolean> {
  const dataStr = JSON.stringify(listings, null, 2);

  if (storage) {
    try {
      const bucket = storage.bucket(BUCKET_NAME);
      const file = bucket.file(FRIENDS_FILE_NAME);
      await file.save(dataStr, {
        contentType: 'application/json',
        resumable: false
      });
      return true;
    } catch (err: any) {
      console.error('Failed to save friends listings to GCS:', err.message);
    }
  }

  try {
    fs.writeFileSync(FRIENDS_FILE_PATH, dataStr, 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to save friends listings locally:', err);
    return false;
  }
}

export async function addFriendListing(data: {
  trainerCode: string;
  trainerName: string;
  vivillonPattern: string;
  team: 'mystic' | 'valor' | 'instinct' | 'any';
  purpose: 'all' | 'vivillon' | 'raids' | 'xp' | 'trades';
  country?: string;
  note?: string;
}): Promise<FriendListing | null> {
  const now = Date.now();
  const cleanCode = data.trainerCode.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  if (cleanCode.replace(/\s/g, '').length !== 12) {
    return null;
  }

  const newListing: FriendListing = {
    id: `trainer-${now}-${Math.random().toString(36).substring(2, 7)}`,
    trainerCode: cleanCode,
    trainerName: (data.trainerName || 'Trainer').trim().substring(0, 30),
    vivillonPattern: (data.vivillonPattern || 'continental').toLowerCase().trim(),
    team: data.team || 'any',
    purpose: data.purpose || 'all',
    country: (data.country || '').trim().substring(0, 50),
    note: (data.note || '').trim().substring(0, 150),
    createdAt: now,
    expiresAt: now + 7 * 24 * 3600 * 1000 // 7 Days (1 Week) TTL
  };

  const currentList = await loadFriendListings();
  // Avoid exact duplicates posted within 2 hours
  const filtered = currentList.filter(item => 
    item.trainerCode.replace(/\s/g, '') !== cleanCode.replace(/\s/g, '')
  );
  filtered.unshift(newListing);

  // Keep maximum 300 active listings
  const trimmed = filtered.slice(0, 300);
  await saveFriendListings(trimmed);
  return newListing;
}


