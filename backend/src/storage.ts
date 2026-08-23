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
}

const DEFAULT_SAMPLE_FRIENDS: FriendListing[] = [];

export async function loadFriendListings(): Promise<FriendListing[]> {
  const now = Date.now();
  let rawList = await dataStore.get<FriendListing[]>('friends_listings', { defaultValue: DEFAULT_SAMPLE_FRIENDS });
  if (!rawList || rawList.length === 0) {
    rawList = DEFAULT_SAMPLE_FRIENDS;
  }
  
  const activeList = rawList.filter(item => item.expiresAt > now);
  return activeList.sort((a, b) => b.createdAt - a.createdAt);
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
    expiresAt: now + 7 * 24 * 3600 * 1000
  };

  const currentList = await loadFriendListings();
  const filtered = currentList.filter(item => 
    item.trainerCode.replace(/\s/g, '') !== cleanCode.replace(/\s/g, '')
  );
  filtered.unshift(newListing);

  const trimmed = filtered.slice(0, 300);
  await saveFriendListings(trimmed);
  return newListing;
}
