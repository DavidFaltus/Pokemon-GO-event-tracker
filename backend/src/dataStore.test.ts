import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createDataStore, DataStore } from './dataStore';

describe('DataStore', () => {
  const TEST_DIR = path.join(__dirname, '..', '.test_cache');
  let store: DataStore;

  beforeEach(() => {
    store = createDataStore({ cacheDir: TEST_DIR });
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it('get() returns null when key does not exist', async () => {
    const result = await store.get('non_existent');
    expect(result).toBeNull();
  });

  it('set() + get() round-trips data correctly', async () => {
    await store.set('test_key', { hello: 'world' });
    const result = await store.get('test_key');
    expect(result).toEqual({ hello: 'world' });
  });

  it('TTL expiry works (set with short TTL, wait, get returns null)', async () => {
    await store.set('ttl_key', { ok: true }, { ttlMs: 100 });
    const immediate = await store.get('ttl_key');
    expect(immediate).toEqual({ ok: true });
    
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const afterWait = await store.get('ttl_key', { ttlMs: 100 });
    expect(afterWait).toBeNull();
  });

  it('SWR mode returns stale data after expiry', async () => {
    await store.set('swr_key', { stale: true }, { ttlMs: 100 });
    
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Normal get fails
    const normalGet = await store.get('swr_key', { ttlMs: 100 });
    expect(normalGet).toBeNull();

    // SWR get succeeds
    const swrGet = await store.get('swr_key', { ttlMs: 100, swr: true });
    expect(swrGet).toEqual({ stale: true });
  });

  it('Empty array protection: setting empty array does not overwrite non-empty', async () => {
    await store.set('array_key', [1, 2, 3]);
    await store.set('array_key', []);
    const result = await store.get('array_key');
    expect(result).toEqual([1, 2, 3]);
  });

  it('delete() removes data', async () => {
    await store.set('delete_key', 'value');
    await store.delete('delete_key');
    const result = await store.get('delete_key');
    expect(result).toBeNull();
  });

  it('keys() lists cached keys', async () => {
    await store.set('key1', 'v1');
    await store.set('key2', 'v2');
    const keys = store.keys();
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
  });
});
