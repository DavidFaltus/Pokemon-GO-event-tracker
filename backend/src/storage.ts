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

