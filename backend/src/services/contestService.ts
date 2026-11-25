import crypto from 'crypto';
import { dataStore } from '../dataStore';
import {
  type InventoryComboConfig,
  type InventoryComboRuleMode,
  runInventoryComboVerification,
} from './contestOcrService';

export type { InventoryComboConfig, InventoryComboRuleMode };

export type ContestStatus = 'draft' | 'upcoming' | 'active' | 'finished';
export type ContestType =
  | 'info'
  | 'registration'
  | 'inventory_combo'
  | 'stats_delta'
  | 'game_placeholder';

export type ContestEntryStatus = 'approved' | 'pending_review' | 'rejected';

export interface ContestMotif {
  mode: 'pokemon' | 'image';
  pokemonDexId?: number;
  pokemonName?: string;
  shiny?: boolean;
  imageUrl?: string;
}

export interface ContestWinner {
  id: string;
  trainerName: string;
  prize?: string;
  place?: number;
  drawnAt: string;
  entryId?: string;
}

export interface StatsMetricConfig {
  id: string;
  label: string;
  unit: string;
  enabled: boolean;
  threshold: number;
  allowDecimal?: boolean;
  isCustom?: boolean;
}

export interface StatsDeltaConfig {
  baselineDeadline?: string;
  finalOpenAt?: string;
  matchMode: 'all' | 'min_count';
  minMetricsRequired: number;
  metrics: StatsMetricConfig[];
}

export interface ContestItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  rules: string[];
  prizes: string[];
  status: ContestStatus;
  contestType: ContestType;
  gameModule?: string | null;
  startDate?: string;
  endDate?: string;
  registrationEnabled: boolean;
  requireAnswer?: boolean;
  answerPrompt?: string;
  requireContact?: boolean;
  contactPrompt?: string;
  externalUrl?: string;
  externalUrlLabel?: string;
  motif: ContestMotif;
  winners: ContestWinner[];
  pinned?: boolean;
  showQualifiedList?: boolean;
  inventoryComboConfig?: InventoryComboConfig;
  statsDeltaConfig?: StatsDeltaConfig;
  createdAt: string;
  updatedAt: string;
}

export interface ContestEntryOcrMeta {
  provider: 'google_vision' | 'tesseract' | 'none';
  detectedPokemon: string[];
  matchedSequence?: string[];
  matchedDirection?: 'forward' | 'reverse';
  age0Detected: boolean;
  rawTextSnippet?: string;
  checkedAt: string;
}

export interface ContestEntry {
  id: string;
  contestId: string;
  trainerName: string;
  trainerCode?: string;
  answer?: string;
  contact?: string;
  createdAt: string;
  addedByAdmin?: boolean;
  status: ContestEntryStatus;
  statusReason?: string;
  reviewedByAdmin?: boolean;
  // Inventory Combo fields
  screenshotUrl?: string;
  ocrResult?: ContestEntryOcrMeta;
  // Stats Delta fields (no screenshots!)
  statsPhase?: 'baseline_only' | 'completed';
  baselineValues?: Record<string, number>;
  baselineSubmittedAt?: string;
  finalValues?: Record<string, number>;
  finalSubmittedAt?: string;
  deltas?: Record<string, number>;
  metMetrics?: string[];
  failedMetrics?: string[];
}

export interface ContestHubSettings {
  groupName: string;
  hubTitle: string;
  hubSubtitle: string;
  announcement?: string;
  communityUrl?: string;
  communityLabel?: string;
}

export interface ContestStoreState {
  settings: ContestHubSettings;
  contests: ContestItem[];
  entries: ContestEntry[];
}

export const CONTESTS_STORE_KEY = 'contests_store';

// Default fallback credentials (overridable via CONTEST_ADMIN_USERS or CONTEST_ADMIN_USERNAME + CONTEST_ADMIN_PASSWORD)
const DEFAULT_CONTEST_USERNAME = 'admin';
const DEFAULT_CONTEST_PASSWORD_HASH =
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';
const CONTEST_TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
const MAX_IMAGE_DATA_URL_LENGTH = 700_000; // ~520KB binary

const activeContestTokens = new Set<string>();
const inFlightInventorySubmissions = new Set<string>();

export const DEFAULT_STATS_METRICS: StatsMetricConfig[] = [
  {
    id: 'distance_walked',
    label: 'Distance walked',
    unit: 'km',
    enabled: true,
    threshold: 5,
    allowDecimal: true,
    isCustom: false,
  },
  {
    id: 'pokemon_caught',
    label: 'Pokémon caught',
    unit: 'ks',
    enabled: true,
    threshold: 50,
    allowDecimal: false,
    isCustom: false,
  },
  {
    id: 'pokestops_visited',
    label: 'PokéStops visited',
    unit: 'ks',
    enabled: false,
    threshold: 30,
    allowDecimal: false,
    isCustom: false,
  },
  {
    id: 'total_xp',
    label: 'Total XP',
    unit: 'XP',
    enabled: false,
    threshold: 50000,
    allowDecimal: false,
    isCustom: false,
  },
];

export const DEFAULT_CONTEST_SETTINGS: ContestHubSettings = {
  groupName: 'Lokální Pokémon GO komunita',
  hubTitle: 'Komunitní soutěže',
  hubSubtitle:
    'Soukromý portál soutěží a akcí pro naši lokální Pokémon GO skupinu. Přístup pouze přes QR kód nebo přímý odkaz.',
  announcement: '',
  communityUrl: '',
  communityLabel: '',
};

export function getDefaultContestStore(): ContestStoreState {
  return {
    settings: { ...DEFAULT_CONTEST_SETTINGS },
    contests: [],
    entries: [],
  };
}

function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function timingSafeHexEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
}

interface ContestAccount {
  username: string;
  passwordHash: string;
}

function getConfiguredContestAccounts(): ContestAccount[] {
  const accounts = new Map<string, ContestAccount>();

  const rawUsers = (process.env.CONTEST_ADMIN_USERS || '').trim();
  if (rawUsers) {
    let parsedJson = false;
    if (rawUsers.startsWith('{')) {
      try {
        const obj = JSON.parse(rawUsers);
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
          for (const [u, p] of Object.entries(obj)) {
            const cleanUser = u.trim();
            const cleanPass = typeof p === 'string' ? p : '';
            if (cleanUser && cleanPass) {
              accounts.set(cleanUser.toLowerCase(), {
                username: cleanUser,
                passwordHash: sha256Hex(cleanPass),
              });
            }
          }
          parsedJson = true;
        }
      } catch {
        // Fallback to pair parser below
      }
    }

    if (!parsedJson) {
      for (const entry of rawUsers.split(/[;\n,]+/)) {
        const trimmed = entry.trim();
        if (!trimmed) continue;
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx <= 0) continue;
        const cleanUser = trimmed.slice(0, colonIdx).trim();
        const cleanPass = trimmed.slice(colonIdx + 1).trim();
        if (cleanUser && cleanPass) {
          accounts.set(cleanUser.toLowerCase(), {
            username: cleanUser,
            passwordHash: sha256Hex(cleanPass),
          });
        }
      }
    }
  }

  const singlePass = process.env.CONTEST_ADMIN_PASSWORD;
  if (singlePass) {
    const singleUser = (process.env.CONTEST_ADMIN_USERNAME || DEFAULT_CONTEST_USERNAME).trim();
    if (singleUser) {
      accounts.set(singleUser.toLowerCase(), {
        username: singleUser,
        passwordHash: sha256Hex(singlePass),
      });
    }
  }

  if (accounts.size === 0) {
    const fallbackUser = (process.env.CONTEST_ADMIN_USERNAME || DEFAULT_CONTEST_USERNAME).trim();
    accounts.set(fallbackUser.toLowerCase(), {
      username: fallbackUser,
      passwordHash: DEFAULT_CONTEST_PASSWORD_HASH,
    });
  }

  return Array.from(accounts.values());
}

function getContestHmacSecretForAccount(account: ContestAccount): string {
  return `contest-admin-v2:${account.username.toLowerCase()}:${account.passwordHash}`;
}

export function verifyContestCredentials(username: string, password: string): boolean {
  if (typeof username !== 'string' || typeof password !== 'string') return false;
  const trimmedUser = username.trim().toLowerCase();
  if (!trimmedUser || !password) return false;

  const incomingPassHash = sha256Hex(password);
  const accounts = getConfiguredContestAccounts();
  let matched = false;

  for (const account of accounts) {
    const userMatches = timingSafeHexEqual(
      sha256Hex(trimmedUser),
      sha256Hex(account.username.toLowerCase())
    );
    const passMatches = timingSafeHexEqual(incomingPassHash, account.passwordHash);
    if (userMatches && passMatches) {
      matched = true;
    }
  }

  return matched;
}

export function issueContestAdminToken(username: string): string {
  const normalizedUser = username.trim().toLowerCase();
  const account = getConfiguredContestAccounts().find(
    (a) => a.username.toLowerCase() === normalizedUser
  );
  if (!account) {
    throw new Error('Account not found');
  }

  const timestampStr = Date.now().toString();
  const userHash = sha256Hex(normalizedUser).slice(0, 16);
  const payload = `contest.${timestampStr}.${userHash}`;
  const signature = crypto
    .createHmac('sha256', getContestHmacSecretForAccount(account))
    .update(payload)
    .digest('hex');
  const token = `${payload}.${signature}`;
  activeContestTokens.add(token);
  return token;
}

export function isValidContestAdminToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== 'contest') return false;

  const [, timestampStr, userHash, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;
  const age = Date.now() - timestamp;
  if (age < -60_000 || age > CONTEST_TOKEN_TTL_MS) return false;

  const payload = `contest.${timestampStr}.${userHash}`;
  const accounts = getConfiguredContestAccounts();

  for (const account of accounts) {
    const expectedUserHash = sha256Hex(account.username.toLowerCase()).slice(0, 16);
    if (!timingSafeHexEqual(userHash, expectedUserHash)) continue;

    const expectedSig = crypto
      .createHmac('sha256', getContestHmacSecretForAccount(account))
      .update(payload)
      .digest('hex');

    if (timingSafeHexEqual(signature, expectedSig)) {
      return true;
    }
  }

  return false;
}

export function revokeContestAdminToken(token: string): void {
  activeContestTokens.delete(token);
}

export function slugifyContestTitle(input: string): string {
  const normalized = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  return normalized || `soutez-${Date.now()}`;
}

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function sanitizeStringArray(value: unknown, maxItems: number, maxItemLen: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => sanitizeString(item, maxItemLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

function sanitizeSafeDataImage(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.trim();
  if (
    trimmed.length <= MAX_IMAGE_DATA_URL_LENGTH &&
    /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(trimmed)
  ) {
    return trimmed;
  }
  return '';
}

function sanitizeMotif(raw: any): ContestMotif {
  const mode = raw?.mode === 'image' ? 'image' : 'pokemon';
  if (mode === 'image') {
    let imageUrl = typeof raw?.imageUrl === 'string' ? raw.imageUrl.trim() : '';
    const isHttp = /^https?:\/\/.+/i.test(imageUrl);
    const isSafeDataImage = Boolean(sanitizeSafeDataImage(imageUrl));
    if ((!isHttp && !isSafeDataImage) || imageUrl.length > MAX_IMAGE_DATA_URL_LENGTH) {
      imageUrl = '';
    }
    return { mode: 'image', imageUrl };
  }

  const rawDex = Number(raw?.pokemonDexId);
  const pokemonDexId = Number.isInteger(rawDex) && rawDex >= 1 && rawDex <= 1025 ? rawDex : 25;
  const pokemonName = sanitizeString(raw?.pokemonName, 60) || 'Pikachu';
  return {
    mode: 'pokemon',
    pokemonDexId,
    pokemonName,
    shiny: Boolean(raw?.shiny),
  };
}

function sanitizeWinners(raw: unknown): ContestWinner[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((w: any, idx: number): ContestWinner | null => {
      const trainerName = sanitizeString(w?.trainerName, 60);
      if (!trainerName) return null;
      const placeNum = Number(w?.place);
      return {
        id: sanitizeString(w?.id, 64) || `winner-${Date.now()}-${idx}`,
        trainerName,
        prize: sanitizeString(w?.prize, 140) || undefined,
        place: Number.isInteger(placeNum) && placeNum >= 1 && placeNum <= 100 ? placeNum : idx + 1,
        drawnAt: sanitizeString(w?.drawnAt, 40) || new Date().toISOString(),
        entryId: sanitizeString(w?.entryId, 64) || undefined,
      };
    })
    .filter((w): w is ContestWinner => w !== null)
    .slice(0, 50);
}

function sanitizeUrl(value: unknown): string {
  const str = sanitizeString(value, 500);
  if (!str) return '';
  return /^https?:\/\/.+/i.test(str) ? str : '';
}

function sanitizeInventoryComboConfig(raw: any): InventoryComboConfig {
  const validModes: InventoryComboRuleMode[] = ['alphabetical', 'word_cipher', 'specific_pokemon'];
  const ruleMode: InventoryComboRuleMode = validModes.includes(raw?.ruleMode)
    ? raw.ruleMode
    : 'alphabetical';

  const comboLength = Math.max(2, Math.min(8, Math.round(Number(raw?.comboLength) || 3)));
  const targetWord = sanitizeString(raw?.targetWord, 12)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase();
  const requiredPokemon = sanitizeStringArray(raw?.requiredPokemon, 12, 40);

  return {
    ruleMode,
    comboLength,
    targetWord: targetWord || (ruleMode === 'word_cipher' ? 'POG' : undefined),
    requiredPokemon: requiredPokemon.length > 0 ? requiredPokemon : undefined,
    requireAge0: raw?.requireAge0 !== undefined ? Boolean(raw.requireAge0) : true,
  };
}

function stripLegacyMetricSuffix(label: string): string {
  return label
    .replace(/\s*\((Nachozeno|Chyceno Pokémonů|Vytočeno PokéStopů|Celkové XP)\)\s*$/i, '')
    .trim();
}

function sanitizeStatsDeltaConfig(raw: any): StatsDeltaConfig {
  const rawMetrics: any[] = Array.isArray(raw?.metrics) && raw.metrics.length > 0
    ? raw.metrics
    : DEFAULT_STATS_METRICS;

  const seenIds = new Set<string>();
  const metrics: StatsMetricConfig[] = [];

  for (const m of rawMetrics.slice(0, 15)) {
    const label = stripLegacyMetricSuffix(sanitizeString(m?.label, 80));
    if (!label) continue;
    let id = sanitizeString(m?.id, 48)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_');
    if (!id) id = `custom_${metrics.length + 1}`;
    while (seenIds.has(id)) {
      id = `${id}_${metrics.length + 1}`;
    }
    seenIds.add(id);

    const rawThreshold =
      typeof m?.threshold === 'string'
        ? Number(m.threshold.replace(/\s+/g, '').replace(',', '.'))
        : Number(m?.threshold);
    const threshold = Number.isFinite(rawThreshold) && rawThreshold >= 0 ? rawThreshold : 0;

    metrics.push({
      id,
      label,
      unit: sanitizeString(m?.unit, 16) || 'ks',
      enabled: Boolean(m?.enabled),
      threshold,
      allowDecimal: Boolean(m?.allowDecimal),
      isCustom: Boolean(m?.isCustom),
    });
  }

  const enabledCount = metrics.filter((m) => m.enabled).length;
  const matchMode = raw?.matchMode === 'min_count' ? 'min_count' : 'all';
  const minMetricsRequired = Math.max(
    1,
    Math.min(Math.max(1, enabledCount), Math.round(Number(raw?.minMetricsRequired) || 1))
  );

  return {
    baselineDeadline: sanitizeString(raw?.baselineDeadline, 40) || undefined,
    finalOpenAt: sanitizeString(raw?.finalOpenAt, 40) || undefined,
    matchMode,
    minMetricsRequired,
    metrics,
  };
}

function normalizeEntry(e: any): ContestEntry {
  const validStatuses: ContestEntryStatus[] = ['approved', 'pending_review', 'rejected'];
  return {
    ...e,
    status: validStatuses.includes(e?.status) ? e.status : 'approved',
  };
}

function normalizeContestItem(c: any): ContestItem {
  if (!c || typeof c !== 'object') return c;
  if (c.statsDeltaConfig && Array.isArray(c.statsDeltaConfig.metrics)) {
    return {
      ...c,
      statsDeltaConfig: {
        ...c.statsDeltaConfig,
        metrics: c.statsDeltaConfig.metrics.map((m: any) => ({
          ...m,
          label: typeof m?.label === 'string' ? stripLegacyMetricSuffix(m.label) : m?.label,
        })),
      },
    };
  }
  return c;
}

function normalizeStoreState(raw: any): ContestStoreState {
  const defaults = getDefaultContestStore();
  if (!raw || typeof raw !== 'object') return defaults;
  return {
    settings: {
      ...defaults.settings,
      ...(raw.settings && typeof raw.settings === 'object' ? raw.settings : {}),
    },
    contests: Array.isArray(raw.contests) ? raw.contests.map(normalizeContestItem) : [],
    entries: Array.isArray(raw.entries) ? raw.entries.map(normalizeEntry) : [],
  };
}

export async function loadContestStore(options?: {
  forceCloud?: boolean;
}): Promise<ContestStoreState> {
  const raw = await dataStore.get<ContestStoreState>(CONTESTS_STORE_KEY, {
    defaultValue: getDefaultContestStore(),
    forceCloud: options?.forceCloud ?? false,
  });
  return normalizeStoreState(raw);
}

export async function saveContestStore(state: ContestStoreState): Promise<boolean> {
  return await dataStore.set(CONTESTS_STORE_KEY, state);
}

export async function getPublicContestsData(): Promise<{
  settings: ContestHubSettings;
  contests: (ContestItem & {
    entryCount: number;
    qualifiedCount: number;
    qualifiedTrainers?: string[];
  })[];
}> {
  const state = await loadContestStore({ forceCloud: false });
  const entryCounts = new Map<string, number>();
  const qualifiedMap = new Map<string, string[]>();

  for (const entry of state.entries) {
    entryCounts.set(entry.contestId, (entryCounts.get(entry.contestId) || 0) + 1);
    if (entry.status === 'approved') {
      const list = qualifiedMap.get(entry.contestId) || [];
      list.push(entry.trainerName);
      qualifiedMap.set(entry.contestId, list);
    }
  }

  const visibleContests = state.contests
    .filter((c) => c.status !== 'draft')
    .sort((a, b) => {
      if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
      const statusRank: Record<ContestStatus, number> = {
        active: 0,
        upcoming: 1,
        finished: 2,
        draft: 3,
      };
      if (statusRank[a.status] !== statusRank[b.status]) {
        return statusRank[a.status] - statusRank[b.status];
      }
      return Date.parse(b.updatedAt || b.createdAt) - Date.parse(a.updatedAt || a.createdAt);
    })
    .map((contest) => {
      const qualified = qualifiedMap.get(contest.id) || [];
      return {
        ...contest,
        entryCount: entryCounts.get(contest.id) || 0,
        qualifiedCount: qualified.length,
        qualifiedTrainers: contest.showQualifiedList ? qualified : undefined,
      };
    });

  return {
    settings: state.settings,
    contests: visibleContests,
  };
}

export async function updateContestHubSettings(
  patch: Partial<ContestHubSettings>
): Promise<ContestHubSettings> {
  const state = await loadContestStore({ forceCloud: true });
  const updated: ContestHubSettings = {
    groupName: sanitizeString(patch.groupName, 80) || state.settings.groupName,
    hubTitle: sanitizeString(patch.hubTitle, 100) || state.settings.hubTitle,
    hubSubtitle: sanitizeString(patch.hubSubtitle, 350),
    announcement: sanitizeString(patch.announcement, 400),
    communityUrl: sanitizeUrl(patch.communityUrl),
    communityLabel: sanitizeString(patch.communityLabel, 60),
  };
  state.settings = updated;
  await saveContestStore(state);
  return updated;
}

export async function upsertContest(
  input: Partial<ContestItem>,
  existingId?: string
): Promise<{ contest: ContestItem; created: boolean }> {
  const title = sanitizeString(input.title, 120);
  if (!title) {
    throw new Error('Název soutěže je povinný.');
  }

  const state = await loadContestStore({ forceCloud: true });
  const nowIso = new Date().toISOString();
  const targetId = existingId || sanitizeString(input.id, 64);
  const existingIdx = targetId ? state.contests.findIndex((c) => c.id === targetId) : -1;
  const existing = existingIdx >= 0 ? state.contests[existingIdx] : undefined;

  const validStatuses: ContestStatus[] = ['draft', 'upcoming', 'active', 'finished'];
  const status: ContestStatus = validStatuses.includes(input.status as ContestStatus)
    ? (input.status as ContestStatus)
    : existing?.status || 'draft';

  const validTypes: ContestType[] = [
    'info',
    'registration',
    'inventory_combo',
    'stats_delta',
    'game_placeholder',
  ];
  const contestType: ContestType = validTypes.includes(input.contestType as ContestType)
    ? (input.contestType as ContestType)
    : existing?.contestType || (input.registrationEnabled ? 'registration' : 'info');

  const baseSlug = slugifyContestTitle(sanitizeString(input.slug, 80) || title);
  let uniqueSlug = baseSlug;
  let suffix = 2;
  while (state.contests.some((c) => c.slug === uniqueSlug && c.id !== existing?.id)) {
    uniqueSlug = `${baseSlug}-${suffix++}`;
  }

  const registrationEnabled =
    contestType === 'inventory_combo' || contestType === 'stats_delta'
      ? true
      : Boolean(input.registrationEnabled);

  const contest: ContestItem = {
    id: existing?.id || `contest-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    slug: uniqueSlug,
    title,
    subtitle: sanitizeString(input.subtitle, 180) || undefined,
    description: sanitizeString(input.description, 3000),
    rules: sanitizeStringArray(input.rules, 25, 300),
    prizes: sanitizeStringArray(input.prizes, 20, 200),
    status,
    contestType,
    gameModule: sanitizeString(input.gameModule, 60) || null,
    startDate: sanitizeString(input.startDate, 40) || undefined,
    endDate: sanitizeString(input.endDate, 40) || undefined,
    registrationEnabled,
    requireAnswer: Boolean(input.requireAnswer),
    answerPrompt: sanitizeString(input.answerPrompt, 160) || undefined,
    requireContact: Boolean(input.requireContact),
    contactPrompt: sanitizeString(input.contactPrompt, 160) || undefined,
    externalUrl: sanitizeUrl(input.externalUrl) || undefined,
    externalUrlLabel: sanitizeString(input.externalUrlLabel, 60) || undefined,
    motif: sanitizeMotif(input.motif ?? existing?.motif),
    winners:
      input.winners !== undefined ? sanitizeWinners(input.winners) : existing?.winners || [],
    pinned: Boolean(input.pinned),
    showQualifiedList: Boolean(input.showQualifiedList),
    inventoryComboConfig:
      contestType === 'inventory_combo'
        ? sanitizeInventoryComboConfig(input.inventoryComboConfig ?? existing?.inventoryComboConfig)
        : undefined,
    statsDeltaConfig:
      contestType === 'stats_delta'
        ? sanitizeStatsDeltaConfig(input.statsDeltaConfig ?? existing?.statsDeltaConfig)
        : undefined,
    createdAt: existing?.createdAt || nowIso,
    updatedAt: nowIso,
  };

  if (existingIdx >= 0) {
    state.contests[existingIdx] = contest;
  } else {
    state.contests.unshift(contest);
  }

  await saveContestStore(state);
  return { contest, created: existingIdx < 0 };
}

export async function deleteContest(contestId: string): Promise<boolean> {
  const state = await loadContestStore({ forceCloud: true });
  const before = state.contests.length;
  state.contests = state.contests.filter((c) => c.id !== contestId);
  if (state.contests.length === before) return false;

  state.entries = state.entries.filter((e) => e.contestId !== contestId);
  await saveContestStore(state);
  return true;
}

export async function addContestEntry(
  contestId: string,
  payload: {
    trainerName?: string;
    trainerCode?: string;
    answer?: string;
    contact?: string;
  },
  options?: { addedByAdmin?: boolean }
): Promise<ContestEntry> {
  const state = await loadContestStore({ forceCloud: true });
  const contest = state.contests.find((c) => c.id === contestId);
  if (!contest) {
    throw new Error('Soutěž nebyla nalezena.');
  }

  if (!options?.addedByAdmin) {
    if (contest.status !== 'active' || !contest.registrationEnabled) {
      throw new Error('Přihlašování do této soutěže není momentálně otevřeno.');
    }
  }

  const trainerName = sanitizeString(payload.trainerName, 40);
  if (trainerName.length < 2) {
    throw new Error('Zadej prosím své trenérské jméno o délce alespoň 2 znaky.');
  }

  const answer = sanitizeString(payload.answer, 400);
  if (!options?.addedByAdmin && contest.requireAnswer && !answer) {
    throw new Error('Vyplň prosím soutěžní odpověď.');
  }

  const contact = sanitizeString(payload.contact, 120);
  if (!options?.addedByAdmin && contest.requireContact && !contact) {
    throw new Error('Vyplň prosím kontakt pro předání výhry.');
  }

  const rawCode = sanitizeString(payload.trainerCode, 24).replace(/\D/g, '');
  const formattedCode =
    rawCode.length === 12 ? rawCode.replace(/(\d{4})(?=\d)/g, '$1 ').trim() : undefined;

  const normalizedName = trainerName.toLowerCase();
  const duplicate = state.entries.find(
    (e) => e.contestId === contestId && e.trainerName.trim().toLowerCase() === normalizedName
  );
  if (duplicate) {
    throw new Error(`Trenér „${trainerName}“ je do této soutěže již přihlášen.`);
  }

  const entry: ContestEntry = {
    id: `entry-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    contestId,
    trainerName,
    trainerCode: formattedCode,
    answer: answer || undefined,
    contact: contact || undefined,
    createdAt: new Date().toISOString(),
    addedByAdmin: Boolean(options?.addedByAdmin),
    status: 'approved',
  };

  state.entries.unshift(entry);
  await saveContestStore(state);
  return entry;
}

/**
 * Template 1: Inventářová štafeta (Inventory Combo) — 1 submission per trainer, OCR verified.
 */
export async function submitInventoryComboEntry(
  contestId: string,
  payload: {
    trainerName?: string;
    trainerCode?: string;
    contact?: string;
    screenshotDataUrl?: string;
  }
): Promise<ContestEntry> {
  const state = await loadContestStore({ forceCloud: true });
  const contest = state.contests.find((c) => c.id === contestId);
  if (!contest) {
    throw new Error('Soutěž nebyla nalezena.');
  }
  if (contest.contestType !== 'inventory_combo' || !contest.inventoryComboConfig) {
    throw new Error('Tato soutěž není typu Inventářová štafeta.');
  }
  if (contest.status !== 'active') {
    throw new Error('Tato soutěž momentálně neprobíhá.');
  }

  const now = Date.now();
  if (contest.startDate) {
    const startMs = Date.parse(contest.startDate);
    if (!isNaN(startMs) && now < startMs) {
      throw new Error('Nahrávání screenshotů ještě nebylo otevřeno.');
    }
  }
  if (contest.endDate) {
    const endMs = Date.parse(contest.endDate);
    if (!isNaN(endMs) && now > endMs) {
      throw new Error('Čas pro odevzdání screenshotů již vypršel.');
    }
  }

  const trainerName = sanitizeString(payload.trainerName, 40);
  if (trainerName.length < 2) {
    throw new Error('Zadej prosím své trenérské jméno o délce alespoň 2 znaky.');
  }

  const contact = sanitizeString(payload.contact, 120);
  if (contest.requireContact && !contact) {
    throw new Error('Vyplň prosím kontakt pro předání výhry.');
  }

  const normalizedName = trainerName.toLowerCase();
  const duplicate = state.entries.find(
    (e) => e.contestId === contestId && e.trainerName.trim().toLowerCase() === normalizedName
  );
  if (duplicate) {
    throw new Error(
      `Trenér „${trainerName}“ už do této soutěže screenshot odeslal. Povolen je 1 pokus.`
    );
  }

  const lockKey = `${contestId}:${normalizedName}`;
  if (inFlightInventorySubmissions.has(lockKey)) {
    throw new Error(
      `Trenér „${trainerName}“ už do této soutěže screenshot odeslal. Povolen je 1 pokus.`
    );
  }

  const screenshotUrl = sanitizeSafeDataImage(payload.screenshotDataUrl);
  if (!screenshotUrl) {
    throw new Error('Nahraj prosím platný screenshot inventáře ve formátu PNG, JPG nebo WebP.');
  }

  const rawCode = sanitizeString(payload.trainerCode, 24).replace(/\D/g, '');
  const formattedCode =
    rawCode.length === 12 ? rawCode.replace(/(\d{4})(?=\d)/g, '$1 ').trim() : undefined;

  inFlightInventorySubmissions.add(lockKey);
  try {
    const evaluation = await runInventoryComboVerification(
      screenshotUrl,
      contest.inventoryComboConfig
    );

    // Re-read store after async OCR so concurrent submissions aren't overwritten
    const freshState = await loadContestStore({ forceCloud: true });
    const raceDuplicate = freshState.entries.find(
      (e) => e.contestId === contestId && e.trainerName.trim().toLowerCase() === normalizedName
    );
    if (raceDuplicate) {
      throw new Error(
        `Trenér „${trainerName}“ už do této soutěže screenshot odeslal. Povolen je 1 pokus.`
      );
    }

    const entry: ContestEntry = {
      id: `entry-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      contestId,
      trainerName,
      trainerCode: formattedCode,
      contact: contact || undefined,
      createdAt: new Date().toISOString(),
      status: evaluation.status,
      statusReason: evaluation.reason,
      screenshotUrl,
      ocrResult: {
        provider: evaluation.provider,
        detectedPokemon: evaluation.detectedPokemon,
        matchedSequence: evaluation.matchedSequence,
        matchedDirection: evaluation.matchedDirection,
        age0Detected: evaluation.age0Detected,
        rawTextSnippet: evaluation.rawTextSnippet,
        checkedAt: evaluation.checkedAt,
      },
    };

    freshState.entries.unshift(entry);
    await saveContestStore(freshState);
    return entry;
  } finally {
    inFlightInventorySubmissions.delete(lockKey);
  }
}

/**
 * Template 2 (Phase 1): Stats Delta Baseline — manual numbers only, NO screenshot.
 */
export async function submitStatsDeltaBaseline(
  contestId: string,
  payload: {
    trainerName?: string;
    trainerCode?: string;
    contact?: string;
    values?: Record<string, number | string>;
  }
): Promise<ContestEntry> {
  const state = await loadContestStore({ forceCloud: true });
  const contest = state.contests.find((c) => c.id === contestId);
  if (!contest) {
    throw new Error('Soutěž nebyla nalezena.');
  }
  if (contest.contestType !== 'stats_delta' || !contest.statsDeltaConfig) {
    throw new Error('Tato soutěž není typu Statistiky trenéra.');
  }
  if (contest.status !== 'active') {
    throw new Error('Tato soutěž momentálně neprobíhá.');
  }

  const now = Date.now();
  const phase1DeadlineStr = contest.startDate || contest.statsDeltaConfig.baselineDeadline;
  if (phase1DeadlineStr) {
    const deadlineMs = Date.parse(phase1DeadlineStr);
    if (!isNaN(deadlineMs) && now > deadlineMs) {
      throw new Error('Čas pro zadání 1. fáze (počátečních statistik) již vypršel.');
    }
  }
  if (contest.endDate) {
    const endMs = Date.parse(contest.endDate);
    if (!isNaN(endMs) && now > endMs) {
      throw new Error('Čas pro zadání počátečních statistik již vypršel.');
    }
  }

  const trainerName = sanitizeString(payload.trainerName, 40);
  if (trainerName.length < 2) {
    throw new Error('Zadej prosím své trenérské jméno o délce alespoň 2 znaky.');
  }

  const contact = sanitizeString(payload.contact, 120);
  if (contest.requireContact && !contact) {
    throw new Error('Vyplň prosím kontakt pro předání výhry.');
  }

  const normalizedName = trainerName.toLowerCase();
  const existing = state.entries.find(
    (e) => e.contestId === contestId && e.trainerName.trim().toLowerCase() === normalizedName
  );
  if (existing) {
    throw new Error(
      `Trenér „${trainerName}“ už má počáteční statistiky zapsané. Pokračuj ve 2. fázi pro zadání finálního stavu.`
    );
  }

  const enabledMetrics = contest.statsDeltaConfig.metrics.filter((m) => m.enabled);
  if (enabledMetrics.length === 0) {
    throw new Error('Soutěž nemá nastavenou žádnou sledovanou statistiku.');
  }

  const baselineValues: Record<string, number> = {};
  for (const metric of enabledMetrics) {
    const rawVal = payload.values?.[metric.id];
    const parsed = typeof rawVal === 'string' ? Number(rawVal.replace(/\s+/g, '').replace(',', '.')) : Number(rawVal);
    if (!Number.isFinite(parsed) || parsed < 0) {
      throw new Error(`Zadej platnou nezápornou hodnotu pro „${metric.label}“.`);
    }
    baselineValues[metric.id] = metric.allowDecimal ? Math.round(parsed * 100) / 100 : Math.round(parsed);
  }

  const rawCode = sanitizeString(payload.trainerCode, 24).replace(/\D/g, '');
  const formattedCode =
    rawCode.length === 12 ? rawCode.replace(/(\d{4})(?=\d)/g, '$1 ').trim() : undefined;

  const nowIso = new Date().toISOString();
  const entry: ContestEntry = {
    id: `entry-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    contestId,
    trainerName,
    trainerCode: formattedCode,
    contact: contact || undefined,
    createdAt: nowIso,
    status: 'pending_review',
    statusReason: 'Start zapsán – čeká se na zadání finálních statistik.',
    statsPhase: 'baseline_only',
    baselineValues,
    baselineSubmittedAt: nowIso,
  };

  state.entries.unshift(entry);
  await saveContestStore(state);
  return entry;
}

/**
 * Template 2 (Phase 2): Stats Delta Final — paired case-insensitively by trainerName, NO screenshot.
 */
export async function submitStatsDeltaFinal(
  contestId: string,
  payload: {
    trainerName?: string;
    values?: Record<string, number | string>;
  }
): Promise<ContestEntry> {
  const state = await loadContestStore({ forceCloud: true });
  const contest = state.contests.find((c) => c.id === contestId);
  if (!contest) {
    throw new Error('Soutěž nebyla nalezena.');
  }
  if (contest.contestType !== 'stats_delta' || !contest.statsDeltaConfig) {
    throw new Error('Tato soutěž není typu Statistiky trenéra.');
  }
  if (contest.status !== 'active') {
    throw new Error('Tato soutěž momentálně neprobíhá.');
  }

  const now = Date.now();
  if (contest.endDate) {
    const endMs = Date.parse(contest.endDate);
    if (!isNaN(endMs) && now > endMs) {
      throw new Error('Čas pro odevzdání finálních statistik již vypršel.');
    }
  }

  const trainerName = sanitizeString(payload.trainerName, 40);
  if (trainerName.length < 2) {
    throw new Error('Zadej prosím své trenérské jméno.');
  }

  const normalizedName = trainerName.toLowerCase();
  const entryIdx = state.entries.findIndex(
    (e) => e.contestId === contestId && e.trainerName.trim().toLowerCase() === normalizedName
  );
  if (entryIdx < 0) {
    throw new Error(
      `Pro trenéra „${trainerName}“ nebyl nalezen počáteční záznam z 1. fáze. Zkontroluj překlepy ve jméně.`
    );
  }

  const entry = state.entries[entryIdx];
  if (entry.statsPhase === 'completed') {
    throw new Error(
      `Finální statistiky pro trenéra „${entry.trainerName}“ už byly odevzdány a jsou uzamčeny.`
    );
  }

  const enabledMetrics = contest.statsDeltaConfig.metrics.filter((m) => m.enabled);
  const finalValues: Record<string, number> = {};
  const deltas: Record<string, number> = {};
  const metMetrics: string[] = [];
  const failedMetrics: string[] = [];

  for (const metric of enabledMetrics) {
    const startVal = entry.baselineValues?.[metric.id];
    if (typeof startVal !== 'number') {
      throw new Error(`Chybí počáteční hodnota pro „${metric.label}“.`);
    }
    const rawVal = payload.values?.[metric.id];
    const parsed = typeof rawVal === 'string' ? Number(rawVal.replace(/\s+/g, '').replace(',', '.')) : Number(rawVal);
    if (!Number.isFinite(parsed) || parsed < 0) {
      throw new Error(`Zadej platnou nezápornou hodnotu pro „${metric.label}“.`);
    }
    const finalVal = metric.allowDecimal ? Math.round(parsed * 100) / 100 : Math.round(parsed);
    const delta = Math.round((finalVal - startVal) * 100) / 100;

    if (delta < 0) {
      throw new Error(
        `Chyba zadání: finální hodnota u „${metric.label}“ je nižší než startovní.`
      );
    }

    finalValues[metric.id] = finalVal;
    deltas[metric.id] = delta;

    if (delta >= metric.threshold) {
      metMetrics.push(metric.id);
    } else {
      failedMetrics.push(metric.id);
    }
  }

  const requiredCount =
    contest.statsDeltaConfig.matchMode === 'min_count'
      ? Math.max(1, Math.min(enabledMetrics.length, contest.statsDeltaConfig.minMetricsRequired || 1))
      : enabledMetrics.length;

  const qualified = metMetrics.length >= requiredCount;
  const nowIso = new Date().toISOString();

  const updatedEntry: ContestEntry = {
    ...entry,
    statsPhase: 'completed',
    finalValues,
    finalSubmittedAt: nowIso,
    deltas,
    metMetrics,
    failedMetrics,
    status: qualified ? 'approved' : 'rejected',
    statusReason: qualified
      ? `Splněno ${metMetrics.length} z ${enabledMetrics.length} statistik – automaticky zařazeno do slosování!`
      : `Nesplněno: splněno ${metMetrics.length} z požadovaných ${requiredCount} statistik.`,
  };

  state.entries[entryIdx] = updatedEntry;
  await saveContestStore(state);
  return updatedEntry;
}

export async function getPublicTrainerEntryStatus(
  contestId: string,
  trainerName: string
): Promise<{
  found: boolean;
  trainerName?: string;
  status?: ContestEntryStatus;
  statusReason?: string;
  statsPhase?: 'baseline_only' | 'completed';
  baselineValues?: Record<string, number>;
  finalValues?: Record<string, number>;
  deltas?: Record<string, number>;
  metMetrics?: string[];
  failedMetrics?: string[];
  ocrMatchedSequence?: string[];
} | null> {
  const cleanName = sanitizeString(trainerName, 40).toLowerCase();
  if (!cleanName) return { found: false };

  const state = await loadContestStore({ forceCloud: false });
  const contest = state.contests.find((c) => c.id === contestId);
  if (!contest || contest.status === 'draft') return null;

  const entry = state.entries.find(
    (e) => e.contestId === contestId && e.trainerName.trim().toLowerCase() === cleanName
  );
  if (!entry) return { found: false };

  return {
    found: true,
    trainerName: entry.trainerName,
    status: entry.status,
    statusReason: entry.statusReason,
    statsPhase: entry.statsPhase,
    baselineValues: entry.baselineValues,
    finalValues: entry.finalValues,
    deltas: entry.deltas,
    metMetrics: entry.metMetrics,
    failedMetrics: entry.failedMetrics,
    ocrMatchedSequence: entry.ocrResult?.matchedSequence,
  };
}

export async function updateContestEntryStatus(
  contestId: string,
  entryId: string,
  status: ContestEntryStatus,
  reason?: string
): Promise<ContestEntry | null> {
  const validStatuses: ContestEntryStatus[] = ['approved', 'pending_review', 'rejected'];
  if (!validStatuses.includes(status)) {
    throw new Error('Neplatný stav přihlášky.');
  }

  const state = await loadContestStore({ forceCloud: true });
  const idx = state.entries.findIndex((e) => e.contestId === contestId && e.id === entryId);
  if (idx < 0) return null;

  const updated: ContestEntry = {
    ...state.entries[idx],
    status,
    statusReason:
      sanitizeString(reason, 240) ||
      (status === 'approved'
        ? 'Ručně schváleno adminem do slosování.'
        : status === 'rejected'
          ? 'Vyřazeno adminem.'
          : 'Vráceno ke kontrole adminem.'),
    reviewedByAdmin: true,
  };

  state.entries[idx] = updated;
  await saveContestStore(state);
  return updated;
}

export async function deleteContestEntry(contestId: string, entryId: string): Promise<boolean> {
  const state = await loadContestStore({ forceCloud: true });
  const before = state.entries.length;
  state.entries = state.entries.filter(
    (e) => !(e.contestId === contestId && e.id === entryId)
  );
  if (state.entries.length === before) return false;

  await saveContestStore(state);
  return true;
}

export async function drawContestWinners(
  contestId: string,
  options: {
    count?: number;
    excludeExistingWinners?: boolean;
    saveToWinners?: boolean;
  } = {}
): Promise<{
  drawn: ContestWinner[];
  totalEligible: number;
  contest: ContestItem;
}> {
  const state = await loadContestStore({ forceCloud: true });
  const contestIdx = state.contests.findIndex((c) => c.id === contestId);
  if (contestIdx < 0) {
    throw new Error('Soutěž nebyla nalezena.');
  }

  const contest = state.contests[contestIdx];
  const excludeExisting = options.excludeExistingWinners !== false;
  const existingWinnerNames = new Set(
    contest.winners.map((w) => w.trainerName.trim().toLowerCase())
  );
  const existingWinnerEntryIds = new Set(
    contest.winners.map((w) => w.entryId).filter((id): id is string => Boolean(id))
  );

  // Only qualified ('approved') entries enter the raffle!
  const qualifiedEntries = state.entries.filter(
    (e) => e.contestId === contestId && e.status === 'approved'
  );
  const eligible = excludeExisting
    ? qualifiedEntries.filter(
        (e) =>
          !existingWinnerEntryIds.has(e.id) &&
          !existingWinnerNames.has(e.trainerName.trim().toLowerCase())
      )
    : [...qualifiedEntries];

  if (eligible.length === 0) {
    throw new Error(
      'V této soutěži nejsou žádní schválení účastníci k vylosování.'
    );
  }

  const requestedCount = Math.max(1, Math.min(20, Number(options.count) || 1));
  const drawCount = Math.min(requestedCount, eligible.length);

  const pool = [...eligible];
  const picked: ContestEntry[] = [];
  for (let i = 0; i < drawCount; i++) {
    const randIndex = crypto.randomInt(0, pool.length);
    picked.push(pool.splice(randIndex, 1)[0]);
  }

  const nowIso = new Date().toISOString();
  const basePlace = contest.winners.length;
  const drawn: ContestWinner[] = picked.map((entry, idx) => {
    const place = basePlace + idx + 1;
    return {
      id: `winner-${Date.now()}-${crypto.randomBytes(2).toString('hex')}-${idx}`,
      trainerName: entry.trainerName,
      place,
      prize: contest.prizes[place - 1] || undefined,
      drawnAt: nowIso,
      entryId: entry.id,
    };
  });

  if (options.saveToWinners) {
    contest.winners = [...contest.winners, ...drawn];
    contest.updatedAt = nowIso;
    state.contests[contestIdx] = contest;
    await saveContestStore(state);
  }

  return {
    drawn,
    totalEligible: eligible.length,
    contest,
  };
}
