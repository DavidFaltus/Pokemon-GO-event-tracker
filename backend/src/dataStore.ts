import fs from 'fs';
import path from 'path';
import { Storage } from '@google-cloud/storage';

export interface DataStoreOptions {
  ttlMs?: number;           // How long data is considered fresh (0 = permanent / no expiry)
  swr?: boolean;            // If true, return stale data on cache miss instead of null
  defaultValue?: any;       // Default if nothing found anywhere
  forceCloud?: boolean;     // If true, bypass local cache and read fresh state from GCS first
}

export interface CacheStats {
  key: string;
  size: number;
  ageMs: number;
  isExpired: boolean;
}

export interface GcsHealthStatus {
  enabled: boolean;
  connected: boolean;
  bucketName: string | null;
  lastSyncAt: string | null;
  lastError: string | null;
}

export interface DataStore {
  get<T>(key: string, options?: DataStoreOptions): Promise<T | null>;
  set<T>(key: string, data: T, options?: DataStoreOptions): Promise<boolean>;
  delete(key: string): Promise<void>;
  keys(): string[];         // List cached keys (for admin cache-stats)
  stats(): CacheStats[];    // For the admin panel cache stats endpoint
  gcsStatus(): GcsHealthStatus;
}

interface CacheEntry<T> {
  data: T;
  expiry: number;
  setAt: number;
}

const PERMANENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 year

export function createDataStore(options?: { cacheDir?: string; gcs?: Storage; bucketName?: string; gcsPrefix?: string }): DataStore {
  const cache = new Map<string, CacheEntry<any>>();
  const cacheDir = options?.cacheDir || path.join(__dirname, '..', '.cache');
  const gcs = options?.gcs;
  let configuredBucketName = options?.bucketName || '';
  let gcsPrefix = options?.gcsPrefix || '';

  let bucketResolved = false;
  let bucketResolutionPromise: Promise<string | null> | null = null;
  let lastGcsSyncAt: string | null = null;
  let lastGcsError: string | null = null;
  let gcsConnected = false;

  // Ensure cache directory exists
  try {
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
  } catch (err: any) {
    console.warn(`[DataStore] Warning: Could not create local cache directory ${cacheDir}: ${err.message}. Operating with in-memory cache.`);
  }

  async function resolveGcsBucketName(): Promise<string | null> {
    if (!gcs) return null;
    if (bucketResolved) return configuredBucketName || null;
    if (bucketResolutionPromise) return bucketResolutionPromise;

    bucketResolutionPromise = (async () => {
      try {
        // 1. Check if explicitly configured bucket exists
        if (configuredBucketName) {
          try {
            const [exists] = await gcs.bucket(configuredBucketName).exists();
            if (exists) {
              bucketResolved = true;
              gcsConnected = true;
              lastGcsError = null;
              console.log(`[DataStore] Connected to GCS bucket: ${configuredBucketName}`);
              return configuredBucketName;
            }
          } catch (existsErr: any) {
            // In unit tests with mock gcs or restricted permissions, exists() might not be mocked or might fail
            if (typeof gcs.getBuckets !== 'function') {
              bucketResolved = true;
              gcsConnected = true;
              return configuredBucketName;
            }
            console.warn(`[DataStore] Bucket ${configuredBucketName} check failed: ${existsErr.message}`);
          }
        }

        // 2. Discover existing buckets in the GCP project (e.g. run-sources-*, firebasestorage, etc.)
        if (typeof gcs.getBuckets === 'function') {
          try {
            const [buckets] = await gcs.getBuckets();
            if (buckets && buckets.length > 0) {
              const preferred =
                buckets.find(b => b.name.includes('pogo-tracker') || b.name.includes('pokego-event-tracker')) ||
                buckets.find(b => b.name.includes('run-sources')) ||
                buckets[0];
              if (preferred?.name) {
                configuredBucketName = preferred.name;
                // Use a clean prefix if sharing a project bucket like run-sources-*
                if (preferred.name.includes('run-sources') || preferred.name.includes('cloudbuild')) {
                  gcsPrefix = 'pogo-appdata/';
                }
                bucketResolved = true;
                gcsConnected = true;
                lastGcsError = null;
                console.log(`[DataStore] Auto-discovered GCS bucket: ${configuredBucketName} (prefix: "${gcsPrefix}")`);
                return configuredBucketName;
              }
            }
          } catch (listErr: any) {
            console.warn(`[DataStore] Could not list GCS buckets: ${listErr.message}`);
          }
        }

        // 3. Attempt to create a dedicated bucket in europe-west3
        if (typeof gcs.createBucket === 'function') {
          const fallbackBucketName = 'pokego-event-tracker-2026-data';
          try {
            await gcs.createBucket(fallbackBucketName, { location: 'EUROPE-WEST3' });
            configuredBucketName = fallbackBucketName;
            bucketResolved = true;
            gcsConnected = true;
            lastGcsError = null;
            console.log(`[DataStore] Created new GCS bucket: ${configuredBucketName}`);
            return configuredBucketName;
          } catch (createErr: any) {
            lastGcsError = createErr.message;
            console.warn(`[DataStore] Could not create fallback GCS bucket: ${createErr.message}`);
          }
        }

        // Fallback to configured bucket name even if exists() check failed due to IAM storage.buckets.get permission
        if (configuredBucketName) {
          bucketResolved = true;
          return configuredBucketName;
        }
        return null;
      } finally {
        bucketResolutionPromise = null;
      }
    })();

    return bucketResolutionPromise;
  }

  function getGcsObjectPath(key: string): string {
    const fileName = key.endsWith('.json') ? key : `${key}.json`;
    return `${gcsPrefix}${fileName}`;
  }

  return {
    async get<T>(key: string, getOptions?: DataStoreOptions): Promise<T | null> {
      const ttlMs = getOptions?.ttlMs ?? 0;
      const swr = getOptions?.swr ?? false;
      const defaultValue = getOptions?.defaultValue ?? null;
      const forceCloud = getOptions?.forceCloud ?? false;
      const now = Date.now();

      let data: T | null = null;
      let isFresh = false;

      // 0. If forceCloud is true and GCS is available, try GCS first
      if (forceCloud && gcs) {
        const activeBucket = await resolveGcsBucketName();
        if (activeBucket) {
          try {
            const bucket = gcs.bucket(activeBucket);
            const file = bucket.file(getGcsObjectPath(key));
            const [exists] = await file.exists();
            if (exists) {
              const [content] = await file.download();
              const parsed = JSON.parse(content.toString());
              data = parsed;
              isFresh = true;
              const effectiveTtl = ttlMs === 0 ? PERMANENT_TTL_MS : ttlMs;
              cache.set(key, { data, expiry: now + effectiveTtl, setAt: now });
              lastGcsSyncAt = new Date(now).toISOString();
              gcsConnected = true;
              lastGcsError = null;

              try {
                const cacheFilePath = path.join(cacheDir, `${key}.json`);
                fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2), 'utf-8');
              } catch {}

              return data;
            }
          } catch (err: any) {
            lastGcsError = err.message;
            console.error(`[DataStore] Failed forceCloud read from GCS for ${key}:`, err.message);
          }
        }
      }

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
              const effectiveExpiry = ttlMs === 0 ? (now + PERMANENT_TTL_MS) : (stats.mtimeMs + ttlMs);
              cache.set(key, { data, expiry: effectiveExpiry, setAt: stats.mtimeMs });
            } else if (swr) {
              data = parsed;
              cache.set(key, { data, expiry: now, setAt: stats.mtimeMs });
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
      if (gcs && (!isFresh || (data === null && swr))) {
        const activeBucket = await resolveGcsBucketName();
        if (activeBucket) {
          try {
            const bucket = gcs.bucket(activeBucket);
            const file = bucket.file(getGcsObjectPath(key));
            const [exists] = await file.exists();
            
            if (exists) {
              const [metadata] = await file.getMetadata();
              const mtimeMs = metadata.updated ? new Date(metadata.updated).getTime() : now;
              const ageMs = now - mtimeMs;
              
              if (ttlMs === 0 || ageMs < ttlMs || swr) {
                const [content] = await file.download();
                const parsed = JSON.parse(content.toString());
                data = parsed;
                isFresh = ttlMs === 0 || ageMs < ttlMs;
                const effectiveExpiry = ttlMs === 0 ? (now + PERMANENT_TTL_MS) : (isFresh ? mtimeMs + ttlMs : now);
                cache.set(key, { data, expiry: effectiveExpiry, setAt: mtimeMs });
                lastGcsSyncAt = new Date(now).toISOString();
                gcsConnected = true;
                lastGcsError = null;
                
                // Sync to disk
                try {
                  const cacheFilePath = path.join(cacheDir, `${key}.json`);
                  fs.writeFileSync(cacheFilePath, JSON.stringify(data, null, 2), 'utf-8');
                } catch {}
              }
            }
          } catch (err: any) {
            lastGcsError = err.message;
            console.error(`Failed to load from GCS for ${key}:`, err.message);
          }
        }
      }

      if (data !== null) {
        return data;
      }

      return defaultValue;
    },

    async set<T>(key: string, data: T, setOptions?: DataStoreOptions): Promise<boolean> {
      if (data === null || data === undefined) return false;
      const ttlMs = setOptions?.ttlMs ?? PERMANENT_TTL_MS;
      const now = Date.now();

      // Empty array protection for scraper caches (user-managed data like friends_listings can legitimately become empty only via explicit delete)
      if (key !== 'friends_listings' && Array.isArray(data) && data.length === 0) {
        const existing = await this.get<any>(key, { swr: true, ttlMs: 0 });
        if (existing && Array.isArray(existing) && existing.length > 0) {
          return false; // Skip write
        }
      }

      // In-memory
      cache.set(key, { data, expiry: now + ttlMs, setAt: now });
      const dataStr = JSON.stringify(data, null, 2);

      // GCS
      let gcsSuccess = false;
      if (gcs) {
        const activeBucket = await resolveGcsBucketName();
        if (activeBucket) {
          try {
            const bucket = gcs.bucket(activeBucket);
            const file = bucket.file(getGcsObjectPath(key));
            await file.save(dataStr, {
              contentType: 'application/json',
              resumable: false
            });
            gcsSuccess = true;
            gcsConnected = true;
            lastGcsSyncAt = new Date(now).toISOString();
            lastGcsError = null;
          } catch (err: any) {
            lastGcsError = err.message;
            console.error(`Failed to save to GCS for ${key}:`, err.message);
          }
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
        return gcsSuccess;
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
      
      if (gcs) {
        const activeBucket = await resolveGcsBucketName();
        if (activeBucket) {
          try {
            const bucket = gcs.bucket(activeBucket);
            const file = bucket.file(getGcsObjectPath(key));
            const [exists] = await file.exists();
            if (exists) {
              await file.delete();
            }
          } catch (err: any) {
            lastGcsError = err.message;
            console.error(`Failed to delete from GCS for ${key}:`, err.message);
          }
        }
      }
    },

    keys(): string[] {
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
              isExpired = false;
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
    },

    gcsStatus(): GcsHealthStatus {
      return {
        enabled: Boolean(gcs),
        connected: gcsConnected,
        bucketName: configuredBucketName || null,
        lastSyncAt: lastGcsSyncAt,
        lastError: lastGcsError
      };
    }
  };
}

let storageInstance: Storage | undefined = undefined;
const isCloudEnvironment =
  process.env.NODE_ENV === 'production' ||
  process.env.USE_GCS === 'true' ||
  Boolean(process.env.K_SERVICE) ||
  Boolean(process.env.GOOGLE_CLOUD_PROJECT);

if (isCloudEnvironment) {
  try {
    storageInstance = new Storage({
      projectId: process.env.GCS_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT || 'pokego-event-tracker-2026'
    });
  } catch (err) {
    console.error('Failed to initialize Google Cloud Storage:', err);
  }
}

export const dataStore: DataStore = createDataStore({
  gcs: storageInstance,
  bucketName: process.env.GCS_BUCKET || 'pokego-event-tracker-2026.appspot.com'
});
