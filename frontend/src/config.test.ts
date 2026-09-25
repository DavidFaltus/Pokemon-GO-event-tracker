import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiFetch, CLOUD_RUN_BACKEND_URL } from './config';

describe('apiFetch', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns response when primary endpoint succeeds', async () => {
    const mockSuccessResponse = new Response(JSON.stringify([{ name: 'Rayquaza' }]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    global.fetch = vi.fn().mockResolvedValue(mockSuccessResponse);

    const res = await apiFetch('/api/raids');
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data[0].name).toBe('Rayquaza');
  });

  it('falls back to Cloud Run when primary endpoint throws network error', async () => {
    const mockCloudRunResponse = new Response(JSON.stringify([{ name: 'Mewtwo' }]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('localhost:4000')) {
        return Promise.reject(new TypeError('Failed to fetch'));
      }
      if (url.includes(CLOUD_RUN_BACKEND_URL)) {
        return Promise.resolve(mockCloudRunResponse);
      }
      return Promise.reject(new Error('Unknown url'));
    });

    const res = await apiFetch('/api/raids');
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data[0].name).toBe('Mewtwo');
  });

  it('falls back to ScrapedDuck CDN when primary and Cloud Run fail', async () => {
    const mockCdnResponse = new Response(JSON.stringify([{ name: 'Groudon' }]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('jsdelivr.net') || url.includes('githubusercontent.com')) {
        return Promise.resolve(mockCdnResponse);
      }
      return Promise.reject(new TypeError('Failed to fetch'));
    });

    const res = await apiFetch('/api/raids');
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data[0].name).toBe('Groudon');
  });

  it('throws network error when all endpoints fail', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(apiFetch('/api/raids')).rejects.toThrow('Failed to fetch');
  });
});
