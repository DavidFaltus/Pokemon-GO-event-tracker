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
