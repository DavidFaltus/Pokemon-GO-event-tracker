/**
 * generateRankings.ts — Build-time ranking data generator
 *
 * Modernized pipeline that:
 * 1. Harmonizes Pokémon stats and moves from API and local caches.
 * 2. Incorporates Mega Level 4 Plus Moves (+), Apex Moves (++), and Signature Moves.
 * 3. Applies 1.30x STAB for Mega / Primal Pokémon and 1.20x for standard/shadow.
 * 4. Generates canonical Pokédex slugs and variant IDs on EVERY entry for deep linking.
 * 5. Emits lightweight `pokemonRankings.json` (~290 KB) to drastically speed up Next.js builds.
 * 6. Generates backward-compatible `pokemonRankings.ts` facade for existing imports.
 *
 * Usage:
 *   cd backend && npm.cmd run generate:rankings
 */

import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

// ─── CONFIG & PATHS ──────────────────────────────────────────────────────────

const API_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json';
const CACHE_PATH = path.resolve(__dirname, '../../data_pokedex_cache.json');
const POKEDEX_CATALOG_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.json');

const FRONTEND_JSON_OUTPUT = path.resolve(__dirname, '../../../frontend/src/data/pokemonRankings.json');
const FRONTEND_TS_OUTPUT = path.resolve(__dirname, '../../../frontend/src/data/pokemonRankings.ts');
const BACKEND_DATA_DIR = path.resolve(__dirname, '../../data');
const BACKEND_JSON_OUTPUT = path.resolve(BACKEND_DATA_DIR, 'pokemonRankings.json');

// Multipliers
const SHADOW_ATK_MULT = 1.2;
const SHADOW_DEF_MULT = 5 / 6; // 0.8333...
const STAB_STANDARD = 1.2;
const STAB_MEGA = 1.3;

// CP formula constants (CPM at key levels)
const CP_MULTIPLIER_50 = 0.84029999;
const CP_MULTIPLIER_40 = 0.7903;
const CP_MULTIPLIER_25 = 0.667934;
const CP_MULTIPLIER_20 = 0.5974;
const CP_MULTIPLIER_15 = 0.51739395;

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface MoveData {
  name: string;
  type: string;
  isElite?: boolean;
  isPlus?: boolean;
}

export interface AlternativeMoveset {
  fastMove: MoveData;
  chargedMove: MoveData;
  dps: number;
  score: number;
}

export interface PokemonRankData {
  name: string;
  pokedexId: number;
  slug: string;
  variantId?: string;
  variantSlug?: string;
  types: string[];
  attackType?: string;
  isOverallBest?: boolean;
  attack: number;
  defense: number;
  stamina: number;
  maxCp: number;
  maxCp40?: number;
  cpRaid100?: number;
  cpWeather100?: number;
  cpResearch100?: number;
  pveScore: number;
  dps: number;
  bestFastMove: MoveData;
  bestChargedMove: MoveData;
  alternativeMovesets?: AlternativeMoveset[];
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
  generation?: number;
}

interface MoveDef {
  id: string;
  power: number;
  energy: number;
  durationMs: number;
  type: { type: string };
  names: Record<string, string>;
  isElite?: boolean;
  isPlus?: boolean;
}

interface ApiMove {
  id: string;
  power: number;
  energy: number;
  durationMs: number;
  type: { type: string; names?: Record<string, string> };
  names: Record<string, string>;
  isElite?: boolean;
  isPlus?: boolean;
}

interface ApiStats {
  stamina: number;
  attack: number;
  defense: number;
}

interface ApiMega {
  id: string;
  names: Record<string, string>;
  stats: ApiStats;
  primaryType: { type: string };
  secondaryType?: { type: string } | null;
  quickMoves?: Record<string, ApiMove>;
  cinematicMoves?: Record<string, ApiMove>;
  eliteQuickMoves?: Record<string, ApiMove>;
  eliteCinematicMoves?: Record<string, ApiMove>;
}

interface ApiRegionForm {
  id: string;
  formId?: string;
  names: Record<string, string>;
  stats: ApiStats;
  primaryType: { type: string };
  secondaryType?: { type: string } | null;
  quickMoves?: Record<string, ApiMove>;
  cinematicMoves?: Record<string, ApiMove>;
  eliteQuickMoves?: Record<string, ApiMove>;
  eliteCinematicMoves?: Record<string, ApiMove>;
}

interface ApiPokemon {
  id: string;
  formId: string;
  dexNr: number;
  generation: number;
  names: Record<string, string>;
  stats: ApiStats;
  primaryType: { type: string };
  secondaryType?: { type: string } | null;
  pokemonClass: string | null;
  quickMoves: Record<string, ApiMove>;
  cinematicMoves: Record<string, ApiMove>;
  eliteQuickMoves?: Record<string, ApiMove>;
  eliteCinematicMoves?: Record<string, ApiMove>;
  regionForms?: Record<string, ApiRegionForm> | unknown[];
  hasMegaEvolution: boolean;
  megaEvolutions?: Record<string, ApiMega> | unknown[];
}

// ─── COMPREHENSIVE SIGNATURE, APEX & PLUS MOVES REGISTRY ────────────────────

const SIGNATURE_MOVES: Record<string, MoveDef[]> = {
  // ── Apex Shadow & Purified Plus Moves ──
  'LUGIA': [
    { id: 'AEROBLAST_PLUS', power: 170, energy: -100, durationMs: 3400, type: { type: 'POKEMON_TYPE_FLYING' }, names: { English: 'Aeroblast+' }, isPlus: true, isElite: true },
    { id: 'AEROBLAST_PLUS_PLUS', power: 225, energy: -100, durationMs: 3400, type: { type: 'POKEMON_TYPE_FLYING' }, names: { English: 'Aeroblast++' }, isPlus: true, isElite: true },
  ],
  'HO_OH': [
    { id: 'SACRED_FIRE_PLUS', power: 145, energy: -100, durationMs: 2600, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Sacred Fire+' }, isPlus: true, isElite: true },
    { id: 'SACRED_FIRE_PLUS_PLUS', power: 155, energy: -100, durationMs: 2600, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Sacred Fire++' }, isPlus: true, isElite: true },
  ],

  // ── Mega Level 4 Plus Moves (+) ──
  'MEWTWO_MEGA_X': [
    { id: 'DYNAMIC_PUNCH_PLUS', power: 130, energy: -100, durationMs: 2700, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Dynamic Punch+' }, isPlus: true },
  ],
  'MEWTWO_MEGA_Y': [
    { id: 'FUTURE_SIGHT_PLUS', power: 160, energy: -100, durationMs: 2700, type: { type: 'POKEMON_TYPE_PSYCHIC' }, names: { English: 'Future Sight+' }, isPlus: true },
  ],
  'CHARIZARD_MEGA_X': [
    { id: 'BLAST_BURN_PLUS', power: 150, energy: -100, durationMs: 3300, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Blast Burn+' }, isPlus: true },
    { id: 'OUTRAGE_PLUS', power: 150, energy: -100, durationMs: 3900, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Outrage+' }, isPlus: true },
  ],
  'CHARIZARD_MEGA_Y': [
    { id: 'BLAST_BURN_PLUS', power: 150, energy: -100, durationMs: 3300, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Blast Burn+' }, isPlus: true },
  ],
  'BLASTOISE_MEGA': [
    { id: 'HYDRO_CANNON_PLUS', power: 125, energy: -100, durationMs: 1900, type: { type: 'POKEMON_TYPE_WATER' }, names: { English: 'Hydro Cannon+' }, isPlus: true },
  ],
  'VENUSAUR_MEGA': [
    { id: 'FRENZY_PLANT_PLUS', power: 135, energy: -100, durationMs: 2600, type: { type: 'POKEMON_TYPE_GRASS' }, names: { English: 'Frenzy Plant+' }, isPlus: true },
  ],
  'BLAZIKEN_MEGA': [
    { id: 'BLAST_BURN_PLUS', power: 150, energy: -100, durationMs: 3300, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Blast Burn+' }, isPlus: true },
    { id: 'BRICK_BREAK_PLUS', power: 105, energy: -100, durationMs: 1600, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Brick Break+' }, isPlus: true },
  ],
  'SWAMPERT_MEGA': [
    { id: 'HYDRO_CANNON_PLUS', power: 125, energy: -100, durationMs: 1900, type: { type: 'POKEMON_TYPE_WATER' }, names: { English: 'Hydro Cannon+' }, isPlus: true },
  ],
  'SCEPTILE_MEGA': [
    { id: 'FRENZY_PLANT_PLUS', power: 135, energy: -100, durationMs: 2600, type: { type: 'POKEMON_TYPE_GRASS' }, names: { English: 'Frenzy Plant+' }, isPlus: true },
  ],
  'RAYQUAZA': [
    { id: 'DRAGON_ASCENT', power: 140, energy: -50, durationMs: 3500, type: { type: 'POKEMON_TYPE_FLYING' }, names: { English: 'Dragon Ascent' }, isElite: true },
    { id: 'OUTRAGE_PLUS', power: 150, energy: -100, durationMs: 3900, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Outrage+' }, isPlus: true },
    { id: 'DRACO_METEOR_PLUS', power: 180, energy: -100, durationMs: 3600, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Draco Meteor+' }, isPlus: true },
  ],
  'RAYQUAZA_MEGA': [
    { id: 'DRAGON_ASCENT', power: 140, energy: -50, durationMs: 3500, type: { type: 'POKEMON_TYPE_FLYING' }, names: { English: 'Dragon Ascent' }, isElite: true },
    { id: 'OUTRAGE_PLUS', power: 150, energy: -100, durationMs: 3900, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Outrage+' }, isPlus: true },
    { id: 'DRACO_METEOR_PLUS', power: 180, energy: -100, durationMs: 3600, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Draco Meteor+' }, isPlus: true },
  ],
  'GARCHOMP_MEGA': [
    { id: 'OUTRAGE_PLUS', power: 150, energy: -100, durationMs: 3900, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Outrage+' }, isPlus: true },
  ],
  'SALAMENCE_MEGA': [
    { id: 'OUTRAGE_PLUS', power: 150, energy: -100, durationMs: 3900, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Outrage+' }, isPlus: true },
  ],
  'TYRANITAR_MEGA': [
    { id: 'DARK_PULSE_PLUS', power: 120, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_DARK' }, names: { English: 'Dark Pulse+' }, isPlus: true },
  ],
  'GENGAR_MEGA': [
    { id: 'DARK_PULSE_PLUS', power: 120, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_DARK' }, names: { English: 'Dark Pulse+' }, isPlus: true },
    { id: 'NIGHT_SHADE_PLUS', power: 115, energy: -100, durationMs: 2600, type: { type: 'POKEMON_TYPE_GHOST' }, names: { English: 'Night Shade+' }, isPlus: true },
  ],
  'BEEDRILL_MEGA': [
    { id: 'FELL_STINGER_PLUS', power: 75, energy: -100, durationMs: 1500, type: { type: 'POKEMON_TYPE_BUG' }, names: { English: 'Fell Stinger+' }, isPlus: true },
  ],
  'PIDGEOT_MEGA': [
    { id: 'BRAVE_BIRD_PLUS', power: 150, energy: -100, durationMs: 2000, type: { type: 'POKEMON_TYPE_FLYING' }, names: { English: 'Brave Bird+' }, isPlus: true },
  ],
  'AMPHAROS_MEGA': [
    { id: 'ZAP_CANNON_PLUS', power: 175, energy: -100, durationMs: 3700, type: { type: 'POKEMON_TYPE_ELECTRIC' }, names: { English: 'Zap Cannon+' }, isPlus: true },
  ],
  'LUCARIO_MEGA': [
    { id: 'FORCE_PALM_FAST', power: 13, energy: 9, durationMs: 1000, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Force Palm' } },
    { id: 'DYNAMIC_PUNCH_PLUS', power: 130, energy: -100, durationMs: 2700, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Dynamic Punch+' }, isPlus: true },
  ],
  'ALAKAZAM_MEGA': [
    { id: 'FUTURE_SIGHT_PLUS', power: 160, energy: -100, durationMs: 2700, type: { type: 'POKEMON_TYPE_PSYCHIC' }, names: { English: 'Future Sight+' }, isPlus: true },
  ],
  'GARDEVOIR_MEGA': [
    { id: 'FUTURE_SIGHT_PLUS', power: 160, energy: -100, durationMs: 2700, type: { type: 'POKEMON_TYPE_PSYCHIC' }, names: { English: 'Future Sight+' }, isPlus: true },
  ],

  // ── Signature & Fusion & Adventure Effects Moves ──
  'NECROZMA_DAWN_WINGS': [
    { id: 'MOONGEIST_BEAM', power: 230, energy: -100, durationMs: 3200, type: { type: 'POKEMON_TYPE_GHOST' }, names: { English: 'Moongeist Beam' }, isElite: true }
  ],
  'NECROZMA_DUSK_MANE': [
    { id: 'SUNSTEEL_STRIKE', power: 230, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_STEEL' }, names: { English: 'Sunsteel Strike' }, isElite: true }
  ],
  'DIALGA_ORIGIN': [
    { id: 'ROAR_OF_TIME', power: 160, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Roar of Time' }, isElite: true }
  ],
  'PALKIA_ORIGIN': [
    { id: 'SPACIAL_REND', power: 160, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Spacial Rend' }, isElite: true }
  ],
  'XERNEAS': [
    { id: 'GEOMANCY_FAST', power: 20, energy: 14, durationMs: 1500, type: { type: 'POKEMON_TYPE_FAIRY' }, names: { English: 'Geomancy' }, isElite: true }
  ],
  'ZACIAN_CROWNED_SWORD': [
    { id: 'BEHEMOTH_BLADE', power: 100, energy: -50, durationMs: 2000, type: { type: 'POKEMON_TYPE_STEEL' }, names: { English: 'Behemoth Blade' }, isElite: true }
  ],
  'ZAMAZENTA_CROWNED_SHIELD': [
    { id: 'BEHEMOTH_BASH', power: 100, energy: -50, durationMs: 2000, type: { type: 'POKEMON_TYPE_STEEL' }, names: { English: 'Behemoth Bash' }, isElite: true }
  ],
  'LUCARIO': [
    { id: 'FORCE_PALM_FAST', power: 13, energy: 9, durationMs: 1000, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Force Palm' } }
  ],
  'MACHAMP': [
    { id: 'DYNAMIC_PUNCH', power: 90, energy: -50, durationMs: 2700, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Dynamic Punch' } }
  ],
  'KYOGRE': [
    { id: 'ORIGIN_PULSE', power: 130, energy: -100, durationMs: 1700, type: { type: 'POKEMON_TYPE_WATER' }, names: { English: 'Origin Pulse' }, isElite: true }
  ],
  'KYOGRE_PRIMAL': [
    { id: 'ORIGIN_PULSE', power: 130, energy: -100, durationMs: 1700, type: { type: 'POKEMON_TYPE_WATER' }, names: { English: 'Origin Pulse' }, isElite: true }
  ],
  'GROUDON': [
    { id: 'PRECIPICE_BLADES', power: 130, energy: -100, durationMs: 1700, type: { type: 'POKEMON_TYPE_GROUND' }, names: { English: 'Precipice Blades' }, isElite: true },
    { id: 'FIRE_PUNCH', power: 55, energy: -33, durationMs: 2200, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Fire Punch' }, isElite: true }
  ],
  'GROUDON_PRIMAL': [
    { id: 'PRECIPICE_BLADES', power: 130, energy: -100, durationMs: 1700, type: { type: 'POKEMON_TYPE_GROUND' }, names: { English: 'Precipice Blades' }, isElite: true },
    { id: 'FIRE_PUNCH', power: 55, energy: -33, durationMs: 2200, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Fire Punch' }, isElite: true }
  ],
  'MEWTWO': [
    { id: 'PSYSTRIKE', power: 90, energy: -50, durationMs: 2300, type: { type: 'POKEMON_TYPE_PSYCHIC' }, names: { English: 'Psystrike' }, isElite: true }
  ],
  'KYUREM_BLACK': [
    { id: 'FREEZE_SHOCK', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_ICE' }, names: { English: 'Freeze Shock' }, isElite: true },
    { id: 'FUSION_BOLT', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_ELECTRIC' }, names: { English: 'Fusion Bolt' }, isElite: true }
  ],
  'KYUREM_WHITE': [
    { id: 'ICE_BURN', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_ICE' }, names: { English: 'Ice Burn' }, isElite: true },
    { id: 'FUSION_FLARE', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Fusion Flare' }, isElite: true }
  ]
};

// Forms that cannot exist in Shadow variant in Pokémon GO
const FORMS_EXCLUDED_FROM_SHADOW = new Set([
  'NECROZMA_DAWN_WINGS', 'NECROZMA_DUSK_MANE', 'NECROZMA_ULTRA',
  'KYUREM_BLACK', 'KYUREM_WHITE',
  'ZACIAN_CROWNED_SWORD', 'ZAMAZENTA_CROWNED_SHIELD',
  'ETERNATUS_ETERNAMAX', 'ETERNATUS',
  'CALYREX_ICE_RIDER', 'CALYREX_SHADOW_RIDER', 'CALYREX',
  'PALAFIN_HERO', 'PALAFIN_ZERO',
  'KORAIDON_APEX', 'KORAIDON',
  'MIRAIDON_ULTIMATE', 'MIRAIDON',
  'TERAPAGOS_STELLAR', 'TERAPAGOS_TERASTAL', 'TERAPAGOS',
  'PECHARUNT', 'OGERPON',
  'TING_LU', 'CHIEN_PAO', 'WO_CHIEN', 'CHI_YU',
  'OKIDOGI', 'MUNKIDORI', 'FEZANDIPITI',
  'GOUGING_FIRE', 'RAGING_BOLT', 'IRON_BOULDER', 'IRON_CROWN',
  'WALKING_WAKE', 'IRON_LEAVES'
]);

// Cosmetic form prefixes in GameMaster that should not generate duplicate cards
const COSMETIC_FORM_PREFIXES = [
  'SPINDA_', 'UNOWN_', 'VIVILLON_', 'SCATTERBUG_', 'SPEWPA_',
  'BURMY_PLANT', 'BURMY_SANDY', 'BURMY_TRASH',
  'SHELLOS_EAST', 'SHELLOS_WEST',
  'GASTRODON_EAST', 'GASTRODON_WEST',
  'DEERLING_SPRING', 'DEERLING_SUMMER', 'DEERLING_AUTUMN', 'DEERLING_WINTER',
  'SAWSBUCK_SPRING', 'SAWSBUCK_SUMMER', 'SAWSBUCK_AUTUMN', 'SAWSBUCK_WINTER',
  'FLABEBE_', 'FLOETTE_', 'FLORGES_',
  'FURFROU_', 'MINIOR_', 'ALCREMIE_',
  'SINISTEA_PHONY', 'POLTEAGEIST_PHONY',
  'POLTCHAGEIST_COUNTERFEIT', 'SINISTCHA_UNREMARKABLE',
  'DUDUNSPARCE_THREE', 'MAUSHOLD_FAMILY_OF_FOUR',
  'SQUAWKABILLY_BLUE', 'SQUAWKABILLY_WHITE', 'SQUAWKABILLY_YELLOW',
  'TATSUGIRI_DROOPY', 'TATSUGIRI_STRETCHY'
];

function shouldSkipRegionForm(rfKey: string): boolean {
  if (
    rfKey.includes('_GALARIAN') ||
    rfKey.includes('_ALOLA') ||
    rfKey.includes('_HISUIAN') ||
    rfKey.includes('_PALDEA')
  ) {
    return false;
  }

  if (
    rfKey.endsWith('_S') ||
    rfKey.endsWith('_SHADOW') ||
    rfKey.endsWith('_PURIFIED') ||
    rfKey.endsWith('_NORMAL') ||
    rfKey.endsWith('_STANDARD') ||
    rfKey.endsWith('_COPY_2019') ||
    rfKey.endsWith('_FALL_2019')
  ) {
    return true;
  }
  for (const prefix of COSMETIC_FORM_PREFIXES) {
    if (rfKey.startsWith(prefix)) return true;
  }
  return false;
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function parseTypeName(apiType: string | undefined): string {
  if (!apiType) return 'Normal';
  return apiType
    .replace('POKEMON_TYPE_', '')
    .toLowerCase()
    .replace(/^./, c => c.toUpperCase());
}

function getTypes(primary: { type: string } | undefined | null, secondary: { type: string } | undefined | null): string[] {
  const types: string[] = [];
  if (primary?.type) types.push(parseTypeName(primary.type));
  if (secondary?.type) types.push(parseTypeName(secondary.type));
  return types.length > 0 ? types : ['Normal'];
}

function calculateCp(atk: number, def: number, sta: number, cpMultiplier: number, ivAtk = 15, ivDef = 15, ivSta = 15): number {
  const effectiveAtk = (atk + ivAtk) * cpMultiplier;
  const effectiveDef = (def + ivDef) * cpMultiplier;
  const effectiveSta = (sta + ivSta) * cpMultiplier;
  return Math.max(10, Math.floor(effectiveAtk * Math.sqrt(effectiveDef) * Math.sqrt(effectiveSta) / 10));
}

function isPlusMove(move: ApiMove | null): boolean {
  if (!move) return false;
  if (move.isPlus) return true;
  if (move.id?.includes('_PLUS')) return true;
  const name = move.names?.English || '';
  return name.endsWith('+') || name.endsWith('++');
}

function isEliteMove(move: ApiMove | null): boolean {
  if (!move) return false;
  return !!move.isElite;
}

function getAllMoves(
  quickMoves?: Record<string, ApiMove>,
  cinematicMoves?: Record<string, ApiMove>,
  eliteQuick?: Record<string, ApiMove>,
  eliteCharged?: Record<string, ApiMove>,
  extraMoves: MoveDef[] = []
): { fastMoves: ApiMove[]; chargedMoves: ApiMove[] } {
  const fastMoves: ApiMove[] = [];
  const chargedMoves: ApiMove[] = [];

  if (quickMoves && typeof quickMoves === 'object' && !Array.isArray(quickMoves)) {
    fastMoves.push(...Object.values(quickMoves));
  }
  if (cinematicMoves && typeof cinematicMoves === 'object' && !Array.isArray(cinematicMoves)) {
    chargedMoves.push(...Object.values(cinematicMoves));
  }
  if (eliteQuick && typeof eliteQuick === 'object' && !Array.isArray(eliteQuick)) {
    for (const m of Object.values(eliteQuick)) {
      fastMoves.push({ ...m, isElite: true });
    }
  }
  if (eliteCharged && typeof eliteCharged === 'object' && !Array.isArray(eliteCharged)) {
    for (const m of Object.values(eliteCharged)) {
      chargedMoves.push({ ...m, isElite: true });
    }
  }

  extraMoves.forEach(m => {
    const enriched: ApiMove = {
      id: m.id,
      power: m.power,
      energy: m.energy,
      durationMs: m.durationMs,
      type: m.type,
      names: m.names,
      isElite: m.isElite,
      isPlus: m.isPlus
    };
    if (m.id.endsWith('_FAST') || m.energy > 0) {
      fastMoves.push(enriched);
    } else {
      chargedMoves.push(enriched);
    }
  });

  return { fastMoves, chargedMoves };
}

function enrichMegaPlusMoves(chargedMoves: ApiMove[], megaTypes: string[]): ApiMove[] {
  const result: ApiMove[] = [...chargedMoves];
  const existingPlusNames = new Set(
    chargedMoves.filter(m => isPlusMove(m)).map(m => (m.names?.English || '').replace(/\+{1,2}$/, '').toLowerCase())
  );

  for (const move of chargedMoves) {
    if (isPlusMove(move)) continue;
    const moveType = parseTypeName(move.type?.type);
    const moveName = move.names?.English || '';
    const cleanName = moveName.toLowerCase();

    // Auto-generate Mega Level 4 Plus version for STAB or signature moves (>= 45 power)
    if (megaTypes.includes(moveType) && !existingPlusNames.has(cleanName) && (move.power || 0) >= 45) {
      existingPlusNames.add(cleanName);
      result.push({
        id: `${move.id}_PLUS`,
        power: Math.round((move.power || 80) * 1.15),
        energy: move.energy || -50,
        durationMs: move.durationMs || 2500,
        type: move.type,
        names: {
          English: `${moveName}+`
        },
        isPlus: true,
        isElite: move.isElite
      });
    }
  }

  return result;
}

function calculateCycleDps(
  fastMove: ApiMove,
  chargedMove: ApiMove,
  attackStat: number,
  pokemonTypes: string[],
  isShadow = false,
  isMega = false,
  isPrimal = false
): number {
  const fastType = parseTypeName(fastMove.type?.type);
  const chargedType = parseTypeName(chargedMove.type?.type);
  const stabMultiplier = (isMega || isPrimal) ? STAB_MEGA : STAB_STANDARD;

  const fastStab = pokemonTypes.includes(fastType) ? stabMultiplier : 1.0;
  const chargedStab = pokemonTypes.includes(chargedType) ? stabMultiplier : 1.0;

  const effAtk = attackStat * (isShadow ? SHADOW_ATK_MULT : 1.0);
  const atkFactor = (effAtk + 15) / 150;

  const fastPower = fastMove.power || 0;
  const fastDuration = Math.max(0.5, (fastMove.durationMs || 500) / 1000);
  const fastEnergy = Math.max(1, fastMove.energy || 1);
  const fastDmg = Math.max(1, Math.floor(fastPower * fastStab * atkFactor * 0.5) + 1);

  const chargedPower = chargedMove.power || 0;
  const chargedDuration = Math.max(1.0, (chargedMove.durationMs || 2500) / 1000);
  const chargedEnergyCost = Math.abs(chargedMove.energy || 50);
  const chargedDmg = Math.max(5, Math.floor(chargedPower * chargedStab * atkFactor * 0.5) + 1);

  const fastCount = Math.ceil(chargedEnergyCost / fastEnergy);
  const totalCycleDamage = (fastCount * fastDmg) + chargedDmg;
  const totalCycleTime = (fastCount * fastDuration) + chargedDuration;

  const rawDps = totalCycleDamage / totalCycleTime;
  return Number((rawDps * 1.85).toFixed(2));
}

function formatMoveName(move: ApiMove | null): string {
  if (!move) return 'Tackle';
  if (move.names?.English) return move.names.English;

  let formatted = move.id
    .replace(/_FAST$/, '')
    .replace(/_PLUS_PLUS$/, '++')
    .replace(/_PLUS$/, '+')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());

  if (move.id.endsWith('_PLUS_PLUS') && !formatted.endsWith('++')) formatted += '++';
  else if (move.id.endsWith('_PLUS') && !formatted.endsWith('+')) formatted += '+';

  return formatted;
}

function formatMoveType(move: ApiMove | null): string {
  if (!move?.type?.type) return 'Normal';
  return parseTypeName(move.type.type);
}

function findTopMovesets(
  fastMoves: ApiMove[],
  chargedMoves: ApiMove[],
  attackStat: number,
  pokemonTypes: string[],
  isShadow = false,
  isMega = false,
  isPrimal = false
): {
  bestFast: ApiMove | null;
  bestCharged: ApiMove | null;
  dps: number;
  alternativeMovesets: AlternativeMoveset[];
} {
  const combos: { fast: ApiMove; charged: ApiMove; dps: number }[] = [];

  for (const fast of fastMoves) {
    for (const charged of chargedMoves) {
      const dps = calculateCycleDps(fast, charged, attackStat, pokemonTypes, isShadow, isMega, isPrimal);
      combos.push({ fast, charged, dps });
    }
  }

  combos.sort((a, b) => b.dps - a.dps);

  if (combos.length === 0) {
    return { bestFast: null, bestCharged: null, dps: 0, alternativeMovesets: [] };
  }

  const best = combos[0];
  const maxDps = best.dps > 0 ? best.dps : 1;

  // Select up to 4 top unique movesets
  const seenCombos = new Set<string>();
  const alternatives: AlternativeMoveset[] = [];

  for (const c of combos) {
    const fName = formatMoveName(c.fast);
    const cName = formatMoveName(c.charged);
    const comboKey = `${fName}-${cName}`;
    if (seenCombos.has(comboKey)) continue;
    seenCombos.add(comboKey);

    alternatives.push({
      fastMove: {
        name: fName,
        type: formatMoveType(c.fast),
        isElite: isEliteMove(c.fast),
        isPlus: isPlusMove(c.fast)
      },
      chargedMove: {
        name: cName,
        type: formatMoveType(c.charged),
        isElite: isEliteMove(c.charged),
        isPlus: isPlusMove(c.charged)
      },
      dps: c.dps,
      score: Math.min(100, Math.max(10, Math.round((c.dps / maxDps) * 100)))
    });

    if (alternatives.length >= 4) break;
  }

  return {
    bestFast: best.fast,
    bestCharged: best.charged,
    dps: best.dps,
    alternativeMovesets: alternatives
  };
}

function computePveScore(dps: number, defense: number, stamina: number, isShadow = false): number {
  if (dps <= 0) return 10;
  const effDef = defense * (isShadow ? SHADOW_DEF_MULT : 1.0);
  const bulk = (effDef * stamina) / 100;
  const tdo = dps * (bulk / 45.0);
  const rawEr = Math.pow(Math.pow(dps, 3) * tdo, 0.25);
  return Math.min(100, Math.max(15, Math.round(rawEr * (100.0 / 96.5))));
}

function formatPokemonName(
  baseName: string,
  formKey?: string,
  rf?: ApiRegionForm | ApiMega,
  isShadow = false,
  isMega = false,
  isPrimal = false
): string {
  let name = rf?.names?.English;
  const cleanKey = (formKey || '').replace(/_SHADOW$/, '');

  // Exact standardizations for key meta forms
  if (cleanKey === 'NECROZMA_DAWN_WINGS') name = 'Dawn Wings Necrozma';
  else if (cleanKey === 'NECROZMA_DUSK_MANE') name = 'Dusk Mane Necrozma';
  else if (cleanKey === 'NECROZMA_ULTRA') name = 'Ultra Necrozma';
  else if (cleanKey === 'KYUREM_BLACK') name = 'Black Kyurem';
  else if (cleanKey === 'KYUREM_WHITE') name = 'White Kyurem';
  else if (cleanKey === 'DIALGA_ORIGIN') name = 'Origin Forme Dialga';
  else if (cleanKey === 'PALKIA_ORIGIN') name = 'Origin Forme Palkia';
  else if (cleanKey === 'GIRATINA_ORIGIN') name = 'Giratina (Origin)';
  else if (cleanKey === 'GIRATINA_ALTERED') name = 'Giratina (Altered Forme)';
  else if (cleanKey === 'DARMANITAN_GALARIAN_STANDARD') name = 'Galarian Darmanitan';
  else if (cleanKey === 'DARMANITAN_GALARIAN_ZEN') name = 'Galarian Darmanitan (Zen Mode)';
  else if (cleanKey === 'DARMANITAN_STANDARD') name = 'Darmanitan';
  else if (cleanKey === 'DARMANITAN_ZEN') name = 'Darmanitan (Zen Mode)';
  else if (cleanKey?.includes('_MEGA_X')) name = `Mega ${baseName} X`;
  else if (cleanKey?.includes('_MEGA_Y')) name = `Mega ${baseName} Y`;
  else if (!name || name === baseName) {
    if (cleanKey?.includes('_GALARIAN')) name = 'Galarian ' + baseName;
    else if (cleanKey?.includes('_ALOLA')) name = 'Alolan ' + baseName;
    else if (cleanKey?.includes('_HISUIAN')) name = 'Hisuian ' + baseName;
    else if (cleanKey?.includes('_PALDEA')) name = 'Paldean ' + baseName;
    else name = baseName;
  }

  if (isShadow) return `Shadow ${name}`;
  if (isPrimal && !name.startsWith('Primal')) return `Primal ${name}`;
  if (isMega && !name.startsWith('Mega')) return `Mega ${name}`;
  return name;
}

function generateTypeBuilds(
  baseName: string,
  dexNr: number,
  baseSlug: string,
  variantId: string | undefined,
  variantSlug: string,
  baseTypes: string[],
  atk: number,
  def: number,
  sta: number,
  fastMoves: ApiMove[],
  chargedMoves: ApiMove[],
  isShadow = false,
  isMega = false,
  isPrimal = false,
  generation?: number,
  customForm?: ApiRegionForm | ApiMega
): PokemonRankData[] {
  if (fastMoves.length === 0 || chargedMoves.length === 0) return [];

  // Group charged moves by attack type
  const chargedTypes = Array.from(new Set(chargedMoves.map(m => formatMoveType(m))));
  const typeBuilds: PokemonRankData[] = [];

  for (const cType of chargedTypes) {
    const typeChargedMoves = chargedMoves.filter(m => formatMoveType(m) === cType);
    const topResult = findTopMovesets(fastMoves, typeChargedMoves, atk, baseTypes, isShadow, isMega, isPrimal);

    if (topResult.bestFast && topResult.bestCharged) {
      typeBuilds.push({
        name: formatPokemonName(baseName, variantId, customForm, isShadow, isMega, isPrimal),
        pokedexId: dexNr,
        slug: baseSlug,
        variantId,
        variantSlug,
        types: baseTypes,
        attackType: cType,
        isOverallBest: false,
        attack: atk,
        defense: def,
        stamina: sta,
        maxCp: calculateCp(atk, def, sta, CP_MULTIPLIER_50),
        maxCp40: calculateCp(atk, def, sta, CP_MULTIPLIER_40),
        cpRaid100: calculateCp(atk, def, sta, CP_MULTIPLIER_20),
        cpWeather100: calculateCp(atk, def, sta, CP_MULTIPLIER_25),
        cpResearch100: calculateCp(atk, def, sta, CP_MULTIPLIER_15),
        pveScore: computePveScore(topResult.dps, def, sta, isShadow),
        dps: topResult.dps,
        bestFastMove: {
          name: formatMoveName(topResult.bestFast),
          type: formatMoveType(topResult.bestFast),
          isElite: isEliteMove(topResult.bestFast),
          isPlus: isPlusMove(topResult.bestFast)
        },
        bestChargedMove: {
          name: formatMoveName(topResult.bestCharged),
          type: formatMoveType(topResult.bestCharged),
          isElite: isEliteMove(topResult.bestCharged),
          isPlus: isPlusMove(topResult.bestCharged)
        },
        alternativeMovesets: topResult.alternativeMovesets,
        isShadow,
        isMega,
        isPrimal,
        generation
      });
    }
  }

  // Mark the single highest DPS build across all types as isOverallBest
  typeBuilds.sort((a, b) => b.dps - a.dps);
  if (typeBuilds.length > 0) {
    typeBuilds[0].isOverallBest = true;
  }

  return typeBuilds;
}

// ─── MAIN PIPELINE ──────────────────────────────────────────────────────────

export async function generateRankings(): Promise<void> {
  console.log('🔄 Fetching Pokemon GO Pokedex data...');

  let apiData: ApiPokemon[];
  try {
    const res = await axios.get<ApiPokemon[]>(API_URL, { timeout: 15000 });
    apiData = res.data;
    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(apiData), 'utf8');
    } catch {}
    console.log(`✅ Successfully fetched ${apiData.length} Pokemon from API`);
  } catch (err) {
    console.warn('⚠️ API fetch failed, falling back to local cache...', err instanceof Error ? err.message : err);
    if (fs.existsSync(CACHE_PATH)) {
      apiData = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
      console.log(`✅ Loaded ${apiData.length} Pokemon from local cache`);
    } else {
      throw new Error('No API data and no local cache available!');
    }
  }

  // Load Pokédex Catalog for canonical slug harmonization
  const pokedexSlugMap: Record<number, { slug: string; variants?: { id: string }[] }> = {};
  try {
    if (fs.existsSync(POKEDEX_CATALOG_PATH)) {
      const catalog = JSON.parse(fs.readFileSync(POKEDEX_CATALOG_PATH, 'utf8'));
      if (Array.isArray(catalog)) {
        catalog.forEach((entry: any) => {
          if (entry.dexId && entry.slug) {
            pokedexSlugMap[entry.dexId] = { slug: entry.slug, variants: entry.variants };
          }
        });
        console.log(`📖 Loaded ${Object.keys(pokedexSlugMap).length} canonical slugs from Pokédex Catalog`);
      }
    }
  } catch (err: any) {
    console.warn('⚠️ Could not load Pokédex catalog for slug mapping:', err?.message || err);
  }

  const entries: PokemonRankData[] = [];
  const seenUniqueKeys = new Set<string>();

  function addEntry(entry: PokemonRankData) {
    const key = `${entry.name}-${entry.pokedexId}-${entry.bestChargedMove?.type || 'none'}-${entry.bestChargedMove?.name || 'none'}-${entry.bestFastMove?.name || 'none'}-${entry.isShadow ? '1' : '0'}-${entry.isMega ? '1' : '0'}-${entry.isPrimal ? '1' : '0'}`;
    if (seenUniqueKeys.has(key)) return;
    seenUniqueKeys.add(key);
    entries.push(entry);
  }

  for (const pokemon of apiData) {
    const baseName = pokemon.names?.English || pokemon.id;
    const baseTypes = getTypes(pokemon.primaryType, pokemon.secondaryType);
    const extraMoves = SIGNATURE_MOVES[pokemon.id] || [];

    const baseSlug = pokedexSlugMap[pokemon.dexNr]?.slug || baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const baseMoves = getAllMoves(
      pokemon.quickMoves,
      pokemon.cinematicMoves,
      pokemon.eliteQuickMoves,
      pokemon.eliteCinematicMoves,
      extraMoves
    );

    if (baseMoves.fastMoves.length > 0 && baseMoves.chargedMoves.length > 0) {
      const baseAtk = pokemon.stats.attack;
      const baseDef = pokemon.stats.defense;
      const baseSta = pokemon.stats.stamina;

      // ── Normal base builds (one per charged move type) ──
      const normalBuilds = generateTypeBuilds(
        baseName,
        pokemon.dexNr,
        baseSlug,
        undefined,
        baseSlug,
        baseTypes,
        baseAtk,
        baseDef,
        baseSta,
        baseMoves.fastMoves,
        baseMoves.chargedMoves,
        false,
        false,
        false,
        pokemon.generation
      );
      normalBuilds.forEach(addEntry);

      // ── Shadow base builds ──
      if (!FORMS_EXCLUDED_FROM_SHADOW.has(pokemon.id)) {
        const shadowVariantId = `${pokemon.id}_SHADOW`;
        const shadowVariantSlug = `${baseSlug}-shadow`;
        const shadowBuilds = generateTypeBuilds(
          baseName,
          pokemon.dexNr,
          baseSlug,
          shadowVariantId,
          shadowVariantSlug,
          baseTypes,
          baseAtk,
          baseDef,
          baseSta,
          baseMoves.fastMoves,
          baseMoves.chargedMoves,
          true,
          false,
          false,
          pokemon.generation
        );
        shadowBuilds.forEach(addEntry);
      }
    }

    // ── Regional forms ──
    if (pokemon.regionForms && typeof pokemon.regionForms === 'object' && !Array.isArray(pokemon.regionForms)) {
      for (const [rfKey, rf] of Object.entries(pokemon.regionForms)) {
        if (!rf || !rf.stats || shouldSkipRegionForm(rfKey)) continue;
        const rfTypes = getTypes(rf.primaryType, rf.secondaryType);
        const rfExtra = SIGNATURE_MOVES[rfKey] || [];
        const rfMoves = getAllMoves(
          rf.quickMoves,
          rf.cinematicMoves,
          rf.eliteQuickMoves,
          rf.eliteCinematicMoves,
          rfExtra
        );
        const fastMoves = rfMoves.fastMoves.length > 0 ? rfMoves.fastMoves : baseMoves.fastMoves;
        const chargedMoves = rfMoves.chargedMoves.length > 0 ? rfMoves.chargedMoves : baseMoves.chargedMoves;
        if (fastMoves.length === 0 || chargedMoves.length === 0) continue;

        const rfAtk = rf.stats.attack;
        const rfDef = rf.stats.defense;
        const rfSta = rf.stats.stamina;

        const rfSlugSuffix = rfKey.toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9-]/g, '');
        const rfVariantSlug = `${baseSlug}-${rfSlugSuffix}`;

        // Normal regional form builds
        const rfNormalBuilds = generateTypeBuilds(
          baseName,
          pokemon.dexNr,
          baseSlug,
          rfKey,
          rfVariantSlug,
          rfTypes,
          rfAtk,
          rfDef,
          rfSta,
          fastMoves,
          chargedMoves,
          false,
          false,
          false,
          pokemon.generation,
          rf
        );
        rfNormalBuilds.forEach(addEntry);

        // Shadow regional form builds
        if (!FORMS_EXCLUDED_FROM_SHADOW.has(rfKey)) {
          const rfShadowBuilds = generateTypeBuilds(
            baseName,
            pokemon.dexNr,
            baseSlug,
            `${rfKey}_SHADOW`,
            `${rfVariantSlug}-shadow`,
            rfTypes,
            rfAtk,
            rfDef,
            rfSta,
            fastMoves,
            chargedMoves,
            true,
            false,
            false,
            pokemon.generation,
            rf
          );
          rfShadowBuilds.forEach(addEntry);
        }
      }
    }

    // ── Mega / Primal evolutions ──
    if (pokemon.megaEvolutions && typeof pokemon.megaEvolutions === 'object' && !Array.isArray(pokemon.megaEvolutions)) {
      for (const [megaKey, mega] of Object.entries(pokemon.megaEvolutions)) {
        if (!mega || !mega.stats) continue;
        const isPrimal = megaKey.includes('PRIMAL');
        const megaTypes = getTypes(mega.primaryType, mega.secondaryType);
        const megaExtra = SIGNATURE_MOVES[megaKey] || SIGNATURE_MOVES[pokemon.id] || [];
        const megaMoves = getAllMoves(
          mega.quickMoves,
          mega.cinematicMoves,
          mega.eliteQuickMoves,
          mega.eliteCinematicMoves,
          megaExtra
        );
        const fastMoves = megaMoves.fastMoves.length > 0 ? megaMoves.fastMoves : baseMoves.fastMoves;
        const rawChargedMoves = megaMoves.chargedMoves.length > 0 ? megaMoves.chargedMoves : baseMoves.chargedMoves;
        const chargedMoves = enrichMegaPlusMoves(rawChargedMoves, megaTypes);
        if (fastMoves.length === 0 || chargedMoves.length === 0) continue;

        const megaAtk = mega.stats.attack;
        const megaDef = mega.stats.defense;
        const megaSta = mega.stats.stamina;

        const megaSlugSuffix = megaKey.toLowerCase().replace(/_/g, '-').replace(/[^a-z0-9-]/g, '');
        const megaVariantSlug = `${baseSlug}-${megaSlugSuffix}`;

        const megaBuilds = generateTypeBuilds(
          baseName,
          pokemon.dexNr,
          baseSlug,
          megaKey,
          megaVariantSlug,
          megaTypes,
          megaAtk,
          megaDef,
          megaSta,
          fastMoves,
          chargedMoves,
          false,
          !isPrimal,
          isPrimal,
          pokemon.generation,
          mega
        );
        megaBuilds.forEach(addEntry);
      }
    }
  }

  // Sort by pveScore desc, then by DPS desc
  entries.sort((a, b) => {
    if (b.pveScore !== a.pveScore) return b.pveScore - a.pveScore;
    return b.dps - a.dps;
  });

  console.log(`✅ Generated ${entries.length} clean unique Pokemon entries`);
  const normalCount = entries.filter(e => !e.isShadow && !e.isMega && !e.isPrimal).length;
  const shadowCount = entries.filter(e => e.isShadow).length;
  const megaCount = entries.filter(e => e.isMega).length;
  const primalCount = entries.filter(e => e.isPrimal).length;
  console.log(`   Normal: ${normalCount} | Shadow: ${shadowCount} | Mega: ${megaCount} | Primal: ${primalCount}`);

  // 1. Emit compact JSON to Frontend and Backend
  const jsonContent = JSON.stringify(entries);
  fs.writeFileSync(FRONTEND_JSON_OUTPUT, jsonContent, 'utf8');
  console.log(`🎉 Saved compact JSON to ${FRONTEND_JSON_OUTPUT} (${(Buffer.byteLength(jsonContent) / 1024).toFixed(0)} KB)`);

  if (!fs.existsSync(BACKEND_DATA_DIR)) {
    fs.mkdirSync(BACKEND_DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(BACKEND_JSON_OUTPUT, jsonContent, 'utf8');
  console.log(`🎉 Saved compact JSON to ${BACKEND_JSON_OUTPUT}`);

  // 2. Emit lightweight TypeScript facade with full backward compatibility
  const tsContent = `// AUTO-GENERATED by backend/src/scripts/generateRankings.ts
// Source: ${API_URL}
// Generated: ${new Date().toISOString()}
// Total entries: ${entries.length}

import rawRankings from './pokemonRankings.json';

export interface MoveData {
  name: string;
  type: string;
  isElite?: boolean;
  isPlus?: boolean;
}

export interface AlternativeMoveset {
  fastMove: MoveData;
  chargedMove: MoveData;
  dps: number;
  score: number;
}

export interface PokemonRankData {
  name: string;
  pokedexId: number;
  slug?: string;
  variantId?: string;
  variantSlug?: string;
  types: string[];
  attackType?: string;
  isOverallBest?: boolean;
  attack: number;
  defense: number;
  stamina: number;
  maxCp: number;
  maxCp40?: number;
  cpRaid100?: number;
  cpWeather100?: number;
  cpResearch100?: number;
  pveScore: number;
  dps: number;
  bestFastMove: MoveData;
  bestChargedMove: MoveData;
  alternativeMovesets?: AlternativeMoveset[];
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
  generation?: number;
}

export const pokemonRankings: PokemonRankData[] = rawRankings as PokemonRankData[];

// ─── HELPER EXPORTS FOR APP ROUTER & SITEMAP ────────────────────────────────

export const ALL_POKEDEX_IDS: number[] = Array.from(
  new Set(pokemonRankings.map((p) => p.pokedexId))
).sort((a, b) => a - b);

export function isValidPokemonId(id: string | number): boolean {
  const num = typeof id === 'number' ? id : parseInt(id, 10);
  return !isNaN(num) && ALL_POKEDEX_IDS.includes(num);
}

export function getPokemonByIdOrSlug(idOrSlug: string | number): PokemonRankData | undefined {
  if (!idOrSlug) return undefined;
  const str = String(idOrSlug).trim().toLowerCase();
  const num = parseInt(str, 10);

  if (!isNaN(num)) {
    const matches = pokemonRankings.filter((p) => p.pokedexId === num);
    if (matches.length > 0) {
      const base = matches.find((p) => !p.isShadow && !p.isMega && !p.isPrimal);
      return base || matches[0];
    }
  }

  const directMatch = pokemonRankings.find(
    (p) =>
      p.name.toLowerCase() === str ||
      (p.slug && p.slug.toLowerCase() === str) ||
      (p.variantSlug && p.variantSlug.toLowerCase() === str)
  );
  if (directMatch) return directMatch;

  const unhyphenated = str.replace(/-/g, ' ');
  return pokemonRankings.find((p) => p.name.toLowerCase() === unhyphenated);
}
`;

  fs.writeFileSync(FRONTEND_TS_OUTPUT, tsContent, 'utf8');
  console.log(`🎉 Successfully updated ${FRONTEND_TS_OUTPUT}`);
  console.log(`   Facade file size: ${(Buffer.byteLength(tsContent) / 1024).toFixed(1)} KB`);
}

// Direct execution
if (require.main === module) {
  generateRankings().catch(err => {
    console.error('❌ Error executing generateRankings:', err);
    process.exit(1);
  });
}
