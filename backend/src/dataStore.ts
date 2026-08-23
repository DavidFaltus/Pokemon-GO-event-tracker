import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';

export interface DataStoreOptions {
  ttlMs?: number;           // How long data is considered fresh
  swr?: boolean;            // If true, return stale data on cache miss instead of null
  defaultValue?: any;       // Default if nothing found anywhere
}

export interface CacheStats {
  key: string;
  size: number;
  ageMs: number;
  isExpired: boolean;
}

export interface DataStore {
  get<T>(key: string, options?: DataStoreOptions): Promise<T | null>;
  set<T>(key: string, data: T, options?: DataStoreOptions): Promise<boolean>;
  delete(key: string): Promise<void>;
  keys(): string[];         // List cached keys (for admin cache-stats)
  stats(): CacheStats[];    // For the admin panel cache stats endpoint
}

interface CacheEntry<T> {
  data: T;
  expiry: number;
  setAt: number;
}

export function createDataStore(options?: { cacheDir?: string; gcs?: Storage; bucketName?: string }): DataStore {
  const cache = new Map<string, CacheEntry<any>>();
  const cacheDir = options?.cacheDir || path.join(__dirname, '..', '.cache');
  const gcs = options?.gcs;
  const bucketName = options?.bucketName;

  // Ensure cache directory exists
  try {
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
  } catch (err: any) {
    console.warn(`[DataStore] Warning: Could not create local cache directory ${cacheDir}: ${err.message}. Operating with in-memory cache.`);
  }

  return {
    async get<T>(key: string, getOptions?: DataStoreOptions): Promise<T | null> {
      const ttlMs = getOptions?.ttlMs ?? 0;
      const swr = getOptions?.swr ?? false;
      const defaultValue = getOptions?.defaultValue ?? null;
      const now = Date.now();

      let data: T | null = null;
      let isFresh = false;

      // 1. Try in-memory cache
      const entry = cache.get(key);
      if (entry) {
        if (now <= entry.expiry) {
          data = entry.data;
          isFresh = true;
        } else if (swr) {
          data = entry.data; // Keep stale data if swr is true
        }
      }

      if (isFresh && data !== null) {
        return data;
      }

      // 2. Try disk storage
      if (!isFresh || (data === null && swr)) {
        try {
          const cacheFilePath = path.join(cacheDir, `${key}.json`);
          if (fs.existsSync(cacheFilePath)) {
            const stats = fs.statSync(cacheFilePath);
            const ageMs = now - stats.mtimeMs;
            
            const content = fs.readFileSync(cacheFilePath, 'utf-8');
            const parsed = JSON.parse(content);
            
            if (ttlMs === 0 || ageMs < ttlMs) {
              data = parsed;
              isFresh = true;
              cache.set(key, { data, expiry: stats.mtimeMs + ttlMs, setAt: stats.mtimeMs });
            } else if (swr) {
              // Only overwrite data if we don't have memory data, or we just want to update memory with disk data
              data = parsed;
              cache.set(key, { data, expiry: now, setAt: stats.mtimeMs }); // Update memory with stale disk data
            }
          }
        } catch (err) {
          console.error(`Failed to read persistent cache for ${key}:`, err);
        }
      }

      if (isFresh && data !== null) {
        return data;
      }

      // 3. Try GCS cloud persistence
      if (gcs && bucketName && (!isFresh || (data === null && swr))) {
        try {
          const bucket = gcs.bucket(bucketName);
          // Assuming key corresponds to filename if it includes .json, but for consistency we append .json if not present.
          // In storage.ts, some keys have .json in the filename. Let's assume key doesn't include .json
          const gcsFileName = key.endsWith('.json') ? key : `${key}.json`;
          const file = bucket.file(gcsFileName);
          const [exists] = await file.exists();
          
          if (exists) {
            // No easy way to get stats.mtimeMs from GCS without metadata API, just assume downloaded is fresh or rely on swr
            const [metadata] = await file.getMetadata();
            const mtimeMs = metadata.updated ? new Date(metadata.updated).getTime() : now;
            const ageMs = now - mtimeMs;
            
            if (ttlMs === 0 || ageMs < ttlMs || swr) {
              const [content] = await file.download();
              const parsed = JSON.parse(content.toString());
              data = parsed;
              isFresh = ttlMs === 0 || ageMs < ttlMs;
              cache.set(key, { data, expiry: isFresh ? mtimeMs + ttlMs : now, setAt: mtimeMs });
              
              // Sync to disk
              const cacheFilePath = path.join(cacheDir, `${key}.json`);
              fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2), 'utf-8');
            }
          }
        } catch (err: any) {
          console.error(`Failed to load from GCS for ${key}:`, err.message);
        }
      }

      if (data !== null) {
        return data;
      }

      return defaultValue;
    },

    async set<T>(key: string, data: T, setOptions?: DataStoreOptions): Promise<boolean> {
      if (data === null || data === undefined) return false;
      const ttlMs = setOptions?.ttlMs ?? (365 * 24 * 60 * 60 * 1000); // Default long TTL
      const now = Date.now();

      // Empty array protection
      if (Array.isArray(data) && data.length === 0) {
        const existing = await this.get<any>(key, { swr: true, ttlMs: 0 }); // Get any existing data
        if (existing && Array.isArray(existing) && existing.length > 0) {
          return false; // Skip write
        }
      }

      // In-memory
      cache.set(key, { data, expiry: now + ttlMs, setAt: now });
      const dataStr = JSON.stringify(data, null, 2);

      // GCS
      let gcsSuccess = false;
      if (gcs && bucketName) {
        try {
          const bucket = gcs.bucket(bucketName);
          const gcsFileName = key.endsWith('.json') ? key : `${key}.json`;
          const file = bucket.file(gcsFileName);
          await file.save(dataStr, {
            contentType: 'application/json',
            resumable: false
          });
          gcsSuccess = true;
        } catch (err: any) {
          console.error(`Failed to save to GCS for ${key}:`, err.message);
        }
      }

      // Disk (Atomic write)
      try {
        const cacheFilePath = path.join(cacheDir, `${key}.json`);
        const tmpFilePath = `${cacheFilePath}.tmp`;
        fs.writeFileSync(tmpFilePath, dataStr, 'utf-8');
        fs.renameSync(tmpFilePath, cacheFilePath);
        return gcsSuccess || true;
      } catch (err) {
        console.error(`Failed to write persistent cache for ${key}:`, err);
        return gcsSuccess; // Return true if GCS succeeded even if disk failed
      }
    },

    async delete(key: string): Promise<void> {
      cache.delete(key);
      try {
        const cacheFilePath = path.join(cacheDir, `${key}.json`);
        if (fs.existsSync(cacheFilePath)) {
          fs.unlinkSync(cacheFilePath);
        }
      } catch (err) {
        console.error(`Failed to delete cache file for ${key}:`, err);
      }
      
      if (gcs && bucketName) {
        try {
          const bucket = gcs.bucket(bucketName);
          const gcsFileName = key.endsWith('.json') ? key : `${key}.json`;
          const file = bucket.file(gcsFileName);
          const [exists] = await file.exists();
          if (exists) {
            await file.delete();
          }
        } catch (err: any) {
          console.error(`Failed to delete from GCS for ${key}:`, err.message);
        }
      }
    },

    keys(): string[] {
      // Return both memory keys and disk keys? The interface mentions "cached keys".
      const memoryKeys = Array.from(cache.keys());
      const diskKeys: string[] = [];
      try {
        if (fs.existsSync(cacheDir)) {
          const files = fs.readdirSync(cacheDir);
          for (const f of files) {
            if (f.endsWith('.json')) {
              diskKeys.push(f.replace('.json', ''));
            }
          }
        }
      } catch (e) {}
      
      return Array.from(new Set([...memoryKeys, ...diskKeys]));
    },

    stats(): CacheStats[] {
      const now = Date.now();
      const allKeys = this.keys();
      const statsList: CacheStats[] = [];

      for (const key of allKeys) {
        const entry = cache.get(key);
        let size = 0;
        let ageMs = 0;
        let isExpired = true;

        if (entry) {
          size = JSON.stringify(entry.data).length;
          ageMs = now - entry.setAt;
          isExpired = now > entry.expiry;
        } else {
          try {
            const cacheFilePath = path.join(cacheDir, `${key}.json`);
            if (fs.existsSync(cacheFilePath)) {
              const fileStats = fs.statSync(cacheFilePath);
              size = fileStats.size;
              ageMs = now - fileStats.mtimeMs;
              // Without TTL knowledge for disk-only, we assume expired unless SWR is used later
              isExpired = true; 
            }
          } catch (e) {}
        }
        
        statsList.push({
          key,
          size,
          ageMs,
          isExpired
        });
      }

      return statsList;
    }
  };
}

let storageInstance: Storage | undefined = undefined;
if (process.env.NODE_ENV === 'production' || process.env.USE_GCS === 'true') {
  try {
    storageInstance = new Storage();
  } catch (err) {
    console.error('Failed to initialize Google Cloud Storage:', err);
  }
}

export const dataStore: DataStore = createDataStore({
  gcs: storageInstance,
  bucketName: process.env.GCS_BUCKET || 'pokego-event-tracker-2026.appspot.com'
});
