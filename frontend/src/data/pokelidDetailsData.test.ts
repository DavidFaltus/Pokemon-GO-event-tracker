import { describe, it, expect } from 'vitest';
import { 
  ALL_POKELIDS, 
  JAPAN_REGIONS, 
  getAllPokelidsList, 
  getPokelidsByPrefecture, 
  getPokelidsByRegion 
} from './pokelidDetailsData';
import { POKELID_PREFECTURES } from './specialBackgroundsData';

describe('pokelidDetailsData', () => {
  it('should include all 42 active prefectures in ALL_POKELIDS', () => {
    const prefectureKeys = Object.keys(ALL_POKELIDS);
    expect(prefectureKeys.length).toBe(42);
    expect(POKELID_PREFECTURES.length).toBe(42);
    for (const pref of POKELID_PREFECTURES) {
      expect(ALL_POKELIDS).toHaveProperty(pref.id);
      expect(ALL_POKELIDS[pref.id].length).toBeGreaterThan(0);
      expect(ALL_POKELIDS[pref.id].length).toBe(pref.manholeCount);
    }
  });

  it('should contain exactly 482 unique Poké Lids', () => {
    const allLids = getAllPokelidsList();
    expect(allLids.length).toBe(482);

    // Verify all IDs are unique
    const uniqueIds = new Set(allLids.map(l => l.id));
    expect(uniqueIds.size).toBe(482);
  });

  it('should have valid fields and images for every single Poké Lid', () => {
    const allLids = getAllPokelidsList();
    for (const lid of allLids) {
      expect(lid.id).toBeTruthy();
      expect(lid.descId).toBeTruthy();
      expect(lid.city).toBeTruthy();
      expect(lid.cityEn).toBeTruthy();
      expect(lid.prefectureId).toBeTruthy();
      expect(lid.smallImage).toMatch(/^https:\/\/local\.pokemon\.jp\/img\/p\/manhole\/.*_m\.png$/);
      expect(lid.largeImage).toMatch(/^https:\/\/local\.pokemon\.jp\/img\/p\/manhole\/.*_l\.png$/);
      expect(typeof lid.lat).toBe('number');
      expect(typeof lid.lng).toBe('number');
      expect(lid.lat).toBeGreaterThan(20);
      expect(lid.lat).toBeLessThan(50);
      expect(lid.lng).toBeGreaterThan(120);
      expect(lid.lng).toBeLessThan(155);
    }
  });

  it('should correctly retrieve lids by prefecture', () => {
    const miyagiLids = getPokelidsByPrefecture('miyagi');
    expect(miyagiLids.length).toBe(37);
    expect(miyagiLids.every(l => l.prefectureId === 'miyagi')).toBe(true);

    const kagawaLids = getPokelidsByPrefecture('kagawa');
    expect(kagawaLids.length).toBe(18);
    expect(kagawaLids.every(l => l.prefectureId === 'kagawa')).toBe(true);

    const tokyoLids = getPokelidsByPrefecture('tokyo');
    expect(tokyoLids.length).toBe(13);
    expect(tokyoLids.every(l => l.prefectureId === 'tokyo')).toBe(true);

    const nonExistent = getPokelidsByPrefecture('unknown_pref');
    expect(nonExistent).toEqual([]);
  });

  it('should correctly retrieve lids by region', () => {
    const tohokuLids = getPokelidsByRegion(['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima']);
    // Aomori 2 + Iwate 36 + Miyagi 37 + Akita 5 + Yamagata 5 + Fukushima 43 = 128
    expect(tohokuLids.length).toBe(128);

    const kantoLids = getPokelidsByRegion(['ibaraki', 'tochigi', 'saitama', 'chiba', 'tokyo', 'kanagawa']);
    // Ibaraki 5 + Tochigi 3 + Saitama 3 + Chiba 4 + Tokyo 13 + Kanagawa 5 = 33
    expect(kantoLids.length).toBe(33);
  });

  it('should contain all 9 geographic regions in JAPAN_REGIONS', () => {
    expect(JAPAN_REGIONS.length).toBe(9);
    const regionIds = JAPAN_REGIONS.map(r => r.id);
    expect(regionIds).toContain('hokkaido');
    expect(regionIds).toContain('tohoku');
    expect(regionIds).toContain('kanto');
    expect(regionIds).toContain('chubu');
    expect(regionIds).toContain('kansai');
    expect(regionIds).toContain('chugoku');
    expect(regionIds).toContain('shikoku');
    expect(regionIds).toContain('kyushu');
    expect(regionIds).toContain('okinawa');
  });
});
