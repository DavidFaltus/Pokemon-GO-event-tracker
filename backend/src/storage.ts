import { dataStore } from './dataStore';

export interface CustomEvent {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
  extraData?: any;
  isDeleted?: boolean;
  isCustom?: boolean;
}

export async function loadCustomEvents(): Promise<CustomEvent[]> {
  return await dataStore.get<CustomEvent[]>('custom_events', { defaultValue: [] }) || [];
}

export async function saveCustomEvents(events: CustomEvent[]): Promise<boolean> {
  return await dataStore.set('custom_events', events);
}

export async function loadPokemonIconOverrides(): Promise<Record<string, string>> {
  return await dataStore.get<Record<string, string>>('pokemon_icons', { defaultValue: {} }) || {};
}

export async function savePokemonIconOverrides(overrides: Record<string, string>): Promise<boolean> {
  return await dataStore.set('pokemon_icons', overrides);
}

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
  return await dataStore.get<CustomRaidBoss[]>('custom_raids', { defaultValue: [] }) || [];
}

export async function saveCustomRaidBosses(raids: CustomRaidBoss[]): Promise<boolean> {
  return await dataStore.set('custom_raids', raids);
}

export async function loadEventDetailsCache(): Promise<Record<string, any>> {
  return await dataStore.get<Record<string, any>>('event_details_cache', { defaultValue: {} }) || {};
}

export async function saveEventDetailsCache(detailsMap: Record<string, any>): Promise<boolean> {
  return await dataStore.set('event_details_cache', detailsMap);
}

export async function loadVerifiedImagesCache(): Promise<Record<string, string>> {
  return await dataStore.get<Record<string, string>>('verified_images_cache', { defaultValue: {} }) || {};
}

export async function saveVerifiedImagesCache(imagesMap: Record<string, string>): Promise<boolean> {
  return await dataStore.set('verified_images_cache', imagesMap);
}

export async function loadEventsListCache(): Promise<any[]> {
  return await dataStore.get<any[]>('events_list_cache', { defaultValue: [] }) || [];
}

export async function saveEventsListCache(events: any[]): Promise<boolean> {
  return await dataStore.set('events_list_cache', events);
}

export async function loadRocketLineupsCache(): Promise<any | null> {
  return await dataStore.get<any>('rocket_lineups_cache', { defaultValue: null });
}

export async function saveRocketLineupsCache(rocketData: any): Promise<boolean> {
  return await dataStore.set('rocket_lineups_cache', rocketData);
}

export async function loadEggPoolCache(): Promise<any[]> {
  return await dataStore.get<any[]>('eggs_cache', { defaultValue: [] }) || [];
}

export async function saveEggPoolCache(eggs: any[]): Promise<boolean> {
  return await dataStore.set('eggs_cache', eggs);
}

export async function loadResearchCache(): Promise<any[]> {
  return await dataStore.get<any[]>('research_cache', { defaultValue: [] }) || [];
}

export async function saveResearchCache(research: any[]): Promise<boolean> {
  return await dataStore.set('research_cache', research);
}

export async function loadRaidBossesCache(): Promise<any[]> {
  return await dataStore.get<any[]>('raids_cache', { defaultValue: [] }) || [];
}

export async function saveRaidBossesCache(raids: any[]): Promise<boolean> {
  return await dataStore.set('raids_cache', raids);
}

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
  ownerToken?: string;
}

import crypto from 'crypto';
import { SEED_COMMUNITY_FRIENDS } from './data/seedFriends';

export function mergeFriendListings(...lists: (FriendListing[] | null | undefined)[]): FriendListing[] {
  const map = new Map<string, FriendListing>();

  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const item of list) {
      if (!item || typeof item.trainerCode !== 'string') continue;
      const digits = item.trainerCode.replace(/\D/g, '');
      if (digits.length !== 12) continue;

      const formattedCode = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      const existing = map.get(digits);
      if (!existing || (item.createdAt || 0) >= (existing.createdAt || 0)) {
        map.set(digits, {
          ...existing,
          ...item,
          trainerCode: formattedCode,
          ownerToken: item.ownerToken || existing?.ownerToken,
          expiresAt: 0
        });
      } else if (!existing.ownerToken && item.ownerToken) {
        existing.ownerToken = item.ownerToken;
      }
    }
  }

  return Array.from(map.values())
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 1000);
}

export async function loadFriendListings(options?: {
  forceCloud?: boolean;
  includeOwnerTokens?: boolean;
}): Promise<FriendListing[]> {
  const localList = await dataStore.get<FriendListing[]>('friends_listings', {
    defaultValue: SEED_COMMUNITY_FRIENDS
  });

  let merged: FriendListing[];
  if (options?.forceCloud) {
    const cloudList = await dataStore.get<FriendListing[]>('friends_listings', {
      defaultValue: SEED_COMMUNITY_FRIENDS,
      forceCloud: true
    });
    merged = mergeFriendListings(cloudList, localList, SEED_COMMUNITY_FRIENDS);
  } else {
    merged = mergeFriendListings(localList, SEED_COMMUNITY_FRIENDS);
  }

  if (options?.includeOwnerTokens) {
    return merged;
  }

  return merged.map(({ ownerToken, ...publicListing }) => publicListing);
}

export async function saveFriendListings(listings: FriendListing[]): Promise<boolean> {
  return await dataStore.set('friends_listings', listings);
}

export async function addFriendListing(data: {
  trainerCode: string;
  trainerName: string;
  vivillonPattern: string;
  team: 'mystic' | 'valor' | 'instinct' | 'any';
  purpose: 'all' | 'vivillon' | 'raids' | 'xp' | 'trades';
  country?: string;
  note?: string;
  ownerToken?: string;
}): Promise<FriendListing | null> {
  const now = Date.now();
  const cleanDigits = data.trainerCode.replace(/\D/g, '');
  if (cleanDigits.length !== 12) {
    return null;
  }
  const cleanCode = cleanDigits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();

  // Always read & merge with cloud before writing so cold-started instances never overwrite existing listings
  const currentList = await loadFriendListings({ forceCloud: true, includeOwnerTokens: true });
  const existing = currentList.find(item => item.trainerCode.replace(/\D/g, '') === cleanDigits);

  const effectiveOwnerToken =
    existing?.ownerToken ||
    (data.ownerToken && data.ownerToken.trim().length >= 8 ? data.ownerToken.trim() : crypto.randomBytes(16).toString('hex'));

  const newListing: FriendListing = {
    id: existing?.id || `trainer-${now}-${Math.random().toString(36).substring(2, 7)}`,
    trainerCode: cleanCode,
    trainerName: (data.trainerName || 'Trainer').trim().substring(0, 30),
    vivillonPattern: (data.vivillonPattern || 'continental').toLowerCase().trim(),
    team: data.team || 'any',
    purpose: data.purpose || 'all',
    country: (data.country || '').trim().substring(0, 50),
    note: (data.note || '').trim().substring(0, 150),
    createdAt: now,
    expiresAt: 0, // Permanent — no automatic expiration
    ownerToken: effectiveOwnerToken
  };

  const merged = mergeFriendListings([newListing], currentList);
  await saveFriendListings(merged);
  return newListing;
}

export async function deleteFriendListing(
  trainerCode: string,
  options?: { ownerToken?: string; isAdmin?: boolean }
): Promise<boolean> {
  const cleanDigits = trainerCode.replace(/\D/g, '');
  if (cleanDigits.length !== 12) {
    return false;
  }

  const currentList = await loadFriendListings({ forceCloud: true, includeOwnerTokens: true });
  const target = currentList.find(item => item.trainerCode.replace(/\D/g, '') === cleanDigits);
  if (!target) {
    return false;
  }

  // Enforce ownership check when options is passed and caller is not admin
  if (options && !options.isAdmin) {
    if (target.ownerToken && target.ownerToken !== options.ownerToken) {
      return false;
    }
  }

  const filtered = currentList.filter(
    item => item.trainerCode.replace(/\D/g, '') !== cleanDigits
  );

  await saveFriendListings(filtered);
  return true;
}

export async function importFriendListings(
  incoming: FriendListing[],
  mode: 'merge' | 'replace' = 'merge'
): Promise<{ total: number; added: number }> {
  const currentList = mode === 'replace'
    ? []
    : await loadFriendListings({ forceCloud: true, includeOwnerTokens: true });

  const beforeCount = currentList.length;
  const merged = mergeFriendListings(incoming, currentList);
  await saveFriendListings(merged);

  return {
    total: merged.length,
    added: Math.max(0, merged.length - beforeCount)
  };
}
