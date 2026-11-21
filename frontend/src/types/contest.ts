export type ContestStatus = 'draft' | 'upcoming' | 'active' | 'finished';

export type ContestType =
  | 'info'
  | 'registration'
  | 'inventory_combo'
  | 'stats_delta'
  | 'game_placeholder';

export type ContestEntryStatus = 'approved' | 'pending_review' | 'rejected';

export type InventoryComboRuleMode = 'alphabetical' | 'word_cipher' | 'specific_pokemon';

export interface InventoryComboConfig {
  ruleMode: InventoryComboRuleMode;
  comboLength: number;
  targetWord?: string;
  requiredPokemon?: string[];
  requireAge0: boolean;
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
  /** Computed counts exposed on public endpoint without leaking private details */
  entryCount?: number;
  qualifiedCount?: number;
  qualifiedTrainers?: string[];
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
  screenshotUrl?: string;
  ocrResult?: ContestEntryOcrMeta;
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

export interface PublicContestsResponse {
  settings: ContestHubSettings;
  contests: ContestItem[];
}

export interface OcrMonthlyUsage {
  month: string;
  visionCalls: number;
  visionLimit: number;
}

export interface AdminContestsStateResponse {
  settings: ContestHubSettings;
  contests: ContestItem[];
  entries: ContestEntry[];
  gcsStatus?: {
    enabled: boolean;
    connected: boolean;
    bucketName: string | null;
    lastSyncAt: string | null;
    lastError: string | null;
  };
  ocrUsage?: OcrMonthlyUsage;
}

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

export function cleanMetricLabel(label: string): string {
  return (label || '')
    .replace(/\s*\((Nachozeno|Chyceno Pokémonů|Vytočeno PokéStopů|Celkové XP)\)\s*$/i, '')
    .trim();
}

export function getContestMotifImageUrl(motif?: ContestMotif): string | null {
  if (!motif) return null;
  if (motif.mode === 'image' && motif.imageUrl?.trim()) {
    return motif.imageUrl.trim();
  }
  if (motif.mode === 'pokemon' && motif.pokemonDexId && motif.pokemonDexId > 0) {
    return motif.shiny
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${motif.pokemonDexId}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${motif.pokemonDexId}.png`;
  }
  return null;
}
