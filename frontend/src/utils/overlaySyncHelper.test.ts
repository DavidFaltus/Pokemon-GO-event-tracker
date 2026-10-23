// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Capacitor } from '@capacitor/core';
import OverlayPlugin from './overlayPlugin';
import { syncRaidDataToNativeOverlay } from './overlaySyncHelper';

vi.mock('./overlayPlugin', () => {
  return {
    default: {
      syncRaidData: vi.fn().mockResolvedValue({ success: true }),
      isOverlayRunning: vi.fn().mockResolvedValue({ running: false }),
      isPermissionGranted: vi.fn().mockResolvedValue({ granted: true }),
      startOverlay: vi.fn().mockResolvedValue({ started: true }),
      stopOverlay: vi.fn().mockResolvedValue({ stopped: true })
    }
  };
});

describe('overlaySyncHelper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('gracefully exits and returns false when not running in native Capacitor environment', async () => {
    vi.spyOn(Capacitor, 'isNativePlatform').mockReturnValue(false);
    const result = await syncRaidDataToNativeOverlay([]);
    expect(result).toBe(false);
  });

  it('processes raid data and syncs metagame filters with variants (Universal, Budget, Hardcore) when Capacitor is active', async () => {
    vi.spyOn(Capacitor, 'isNativePlatform').mockReturnValue(true);

    const sampleRaids = [
      { name: 'Kyurem', tier: '5', types: ['Dragon', 'Ice'] },
      { name: 'Mega Aggron', tier: 'Mega', types: ['Steel'] },
      { name: 'Pikachu', tier: '1', types: ['Electric'] } // Should be skipped as active 5*/Mega
    ];

    const result = await syncRaidDataToNativeOverlay(sampleRaids, 'cs');
    expect(result).toBe(true);
    expect(OverlayPlugin.syncRaidData).toHaveBeenCalledTimes(1);

    const callArgs = (OverlayPlugin.syncRaidData as any).mock.calls[0][0];
    expect(callArgs.lang).toBe('cs');
    expect(callArgs.bosses.length).toBeGreaterThanOrEqual(2);

    const kyurem = callArgs.bosses.find((b: any) => b.name === 'Kyurem');
    expect(kyurem).toBeDefined();
    expect(kyurem?.tier).toBe('5');
    expect(kyurem?.universalFilter).toContain('448'); // Lucario ID in top counters
    expect(kyurem?.budgetFilter).toBeDefined();
    expect(kyurem?.hardcoreFilter).toBeDefined();
    expect(kyurem?.weaknesses).toContain('Fighting');

    const aggron = callArgs.bosses.find((b: any) => b.name === 'Mega Aggron');
    expect(aggron).toBeDefined();
    expect(aggron?.tier).toBe('mega');
    expect(aggron?.weaknesses).toContain('Ground');
  });

  it('uses default fallbacks if raid list is empty', async () => {
    vi.spyOn(Capacitor, 'isNativePlatform').mockReturnValue(true);

    const result = await syncRaidDataToNativeOverlay([], 'en');
    expect(result).toBe(true);
    expect(OverlayPlugin.syncRaidData).toHaveBeenCalledTimes(1);

    const callArgs = (OverlayPlugin.syncRaidData as any).mock.calls[0][0];
    expect(callArgs.bosses.length).toBeGreaterThan(0);
    expect(callArgs.bosses.some((b: any) => b.name.includes('Kyurem'))).toBe(true);
  });
});
