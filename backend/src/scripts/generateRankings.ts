/**
 * generateRankings.ts — Build-time ranking data generator
 *
 * Fetches complete Pokemon data from the Pokemon GO Pokedex API,
 * computes PvE DPS / pveScore for every Pokemon (Normal, Shadow, Mega, Primal, regional forms),
 * and writes frontend/src/data/pokemonRankings.ts with the exact PokemonRankData interface and helpers.
 *
 * Usage:
 *   cd backend && npm.cmd run generate:rankings
 *
 * Data source:
 *   https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json
 */

import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

const API_URL = 'https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json';
const OUTPUT_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokemonRankings.ts');
const CACHE_PATH = path.resolve(__dirname, '../../data_pokedex_cache.json');

// Shadow multipliers (Niantic official)
const SHADOW_ATK_MULT = 1.2;
const SHADOW_DEF_MULT = 5 / 6; // 0.8333...

// CP formula constants (CPM at key levels)
const CP_MULTIPLIER_50 = 0.84029999;
const CP_MULTIPLIER_40 = 0.7903;
const CP_MULTIPLIER_25 = 0.667934;  // Weather boosted raid catch (L25)
const CP_MULTIPLIER_20 = 0.5974;    // Standard raid catch (L20)
const CP_MULTIPLIER_15 = 0.51739395;// Research encounter (L15)

// STAB multiplier
const STAB = 1.2;

// ─── SIGNATURE & ELITE MOVES INJECTION ───────────────────────────────────────

interface MoveDef {
  id: string;
  power: number;
  energy: number;
  durationMs: number;
  type: { type: string };
  names: Record<string, string>;
}

const SIGNATURE_MOVES: Record<string, MoveDef[]> = {
  'NECROZMA_DAWN_WINGS': [
    { id: 'MOONGEIST_BEAM', power: 230, energy: -100, durationMs: 3200, type: { type: 'POKEMON_TYPE_GHOST' }, names: { English: 'Moongeist Beam' } }
  ],
  'NECROZMA_DUSK_MANE': [
    { id: 'SUNSTEEL_STRIKE', power: 230, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_STEEL' }, names: { English: 'Sunsteel Strike' } }
  ],
  'RAYQUAZA': [
    { id: 'DRAGON_ASCENT', power: 140, energy: -50, durationMs: 3500, type: { type: 'POKEMON_TYPE_FLYING' }, names: { English: 'Dragon Ascent' } }
  ],
  'DIALGA_ORIGIN': [
    { id: 'ROAR_OF_TIME', power: 160, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Roar of Time' } }
  ],
  'PALKIA_ORIGIN': [
    { id: 'SPACIAL_REND', power: 160, energy: -100, durationMs: 3000, type: { type: 'POKEMON_TYPE_DRAGON' }, names: { English: 'Spacial Rend' } }
  ],
  'XERNEAS': [
    { id: 'GEOMANCY_FAST', power: 20, energy: 14, durationMs: 1500, type: { type: 'POKEMON_TYPE_FAIRY' }, names: { English: 'Geomancy' } }
  ],
  'ZACIAN_CROWNED_SWORD': [
    { id: 'BEHEMOTH_BLADE', power: 100, energy: -50, durationMs: 2000, type: { type: 'POKEMON_TYPE_STEEL' }, names: { English: 'Behemoth Blade' } }
  ],
  'ZAMAZENTA_CROWNED_SHIELD': [
    { id: 'BEHEMOTH_BASH', power: 100, energy: -50, durationMs: 2000, type: { type: 'POKEMON_TYPE_STEEL' }, names: { English: 'Behemoth Bash' } }
  ],
  'LUCARIO': [
    { id: 'FORCE_PALM_FAST', power: 13, energy: 9, durationMs: 1000, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Force Palm' } }
  ],
  'MACHAMP': [
    { id: 'DYNAMIC_PUNCH', power: 90, energy: -50, durationMs: 2700, type: { type: 'POKEMON_TYPE_FIGHTING' }, names: { English: 'Dynamic Punch' } }
  ],
  'KYOGRE': [
    { id: 'ORIGIN_PULSE', power: 130, energy: -100, durationMs: 1700, type: { type: 'POKEMON_TYPE_WATER' }, names: { English: 'Origin Pulse' } }
  ],
  'GROUDON': [
    { id: 'PRECIPICE_BLADES', power: 130, energy: -100, durationMs: 1700, type: { type: 'POKEMON_TYPE_GROUND' }, names: { English: 'Precipice Blades' } }
  ],
  'MEWTWO': [
    { id: 'PSYSTRIKE', power: 90, energy: -50, durationMs: 2300, type: { type: 'POKEMON_TYPE_PSYCHIC' }, names: { English: 'Psystrike' } }
  ],
  'KYUREM_BLACK': [
    { id: 'FREEZE_SHOCK', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_ICE' }, names: { English: 'Freeze Shock' } },
    { id: 'FUSION_BOLT', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_ELECTRIC' }, names: { English: 'Fusion Bolt' } }
  ],
  'KYUREM_WHITE': [
    { id: 'ICE_BURN', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_ICE' }, names: { English: 'Ice Burn' } },
    { id: 'FUSION_FLARE', power: 140, energy: -100, durationMs: 2500, type: { type: 'POKEMON_TYPE_FIRE' }, names: { English: 'Fusion Flare' } }
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
  // Always keep regional forms (Alola, Galar, Hisui, Paldea) even if they contain _STANDARD
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

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface ApiMove {
  id: string;
  power: number;
  energy: number;
  durationMs: number;
  type: { type: string; names?: Record<string, string> };
  names: Record<string, string>;
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

export interface MoveData {
  name: string;
  type: string;
}

export interface PokemonRankData {
  name: string;
  pokedexId: number;
  slug?: string;
  types: string[];
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
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
  generation?: number;
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
    fastMoves.push(...Object.values(eliteQuick));
  }
  if (eliteCharged && typeof eliteCharged === 'object' && !Array.isArray(eliteCharged)) {
    chargedMoves.push(...Object.values(eliteCharged));
  }

  extraMoves.forEach(m => {
    if (m.id.endsWith('_FAST') || m.energy > 0) {
      fastMoves.push(m as ApiMove);
    } else {
      chargedMoves.push(m as ApiMove);
    }
  });

  return { fastMoves, chargedMoves };
}

function calculateCycleDps(
  fastMove: ApiMove,
  chargedMove: ApiMove,
  attackStat: number,
  pokemonTypes: string[],
  isShadow = false
): number {
  const fastType = parseTypeName(fastMove.type?.type);
  const chargedType = parseTypeName(chargedMove.type?.type);
  const fastStab = pokemonTypes.includes(fastType) ? STAB : 1.0;
  const chargedStab = pokemonTypes.includes(chargedType) ? STAB : 1.0;

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

function findBestMoveset(
  fastMoves: ApiMove[],
  chargedMoves: ApiMove[],
  attackStat: number,
  pokemonTypes: string[],
  isShadow = false
): { fastMove: ApiMove | null; chargedMove: ApiMove | null; dps: number } {
  let bestDps = 0;
  let bestFast: ApiMove | null = null;
  let bestCharged: ApiMove | null = null;

  for (const fast of fastMoves) {
    for (const charged of chargedMoves) {
      const dps = calculateCycleDps(fast, charged, attackStat, pokemonTypes, isShadow);
      if (dps > bestDps) {
        bestDps = dps;
        bestFast = fast;
        bestCharged = charged;
      }
    }
  }

  return { fastMove: bestFast, chargedMove: bestCharged, dps: bestDps };
}

function computePveScore(dps: number, defense: number, stamina: number, isShadow = false): number {
  if (dps <= 0) return 10;
  const effDef = defense * (isShadow ? SHADOW_DEF_MULT : 1.0);
  const bulk = (effDef * stamina) / 100;
  const tdo = dps * (bulk / 45.0);
  const rawEr = Math.pow(Math.pow(dps, 3) * tdo, 0.25);
  return Math.min(100, Math.max(15, Math.round(rawEr * (100.0 / 96.5))));
}

function formatMoveName(move: ApiMove | null): string {
  if (!move) return 'Tackle';
  return move.names?.English || move.id.replace(/_FAST$/, '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

function formatMoveType(move: ApiMove | null): string {
  if (!move?.type?.type) return 'Normal';
  return parseTypeName(move.type.type);
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

  // Exact standardizations for key meta forms
  if (formKey === 'NECROZMA_DAWN_WINGS') name = 'Dawn Wings Necrozma';
  else if (formKey === 'NECROZMA_DUSK_MANE') name = 'Dusk Mane Necrozma';
  else if (formKey === 'NECROZMA_ULTRA') name = 'Ultra Necrozma';
  else if (formKey === 'KYUREM_BLACK') name = 'Black Kyurem';
  else if (formKey === 'KYUREM_WHITE') name = 'White Kyurem';
  else if (formKey === 'DIALGA_ORIGIN') name = 'Origin Forme Dialga';
  else if (formKey === 'PALKIA_ORIGIN') name = 'Origin Forme Palkia';
  else if (formKey === 'GIRATINA_ORIGIN') name = 'Giratina (Origin)';
  else if (formKey === 'GIRATINA_ALTERED') name = 'Giratina (Altered Forme)';
  else if (formKey === 'DARMANITAN_GALARIAN_STANDARD') name = 'Galarian Darmanitan';
  else if (formKey === 'DARMANITAN_GALARIAN_ZEN') name = 'Galarian Darmanitan (Zen Mode)';
  else if (formKey === 'DARMANITAN_STANDARD') name = 'Darmanitan';
  else if (formKey === 'DARMANITAN_ZEN') name = 'Darmanitan (Zen Mode)';
  else if (!name || name === baseName) {
    if (formKey?.includes('_GALARIAN')) name = 'Galarian ' + baseName;
    else if (formKey?.includes('_ALOLA')) name = 'Alolan ' + baseName;
    else if (formKey?.includes('_HISUIAN')) name = 'Hisuian ' + baseName;
    else if (formKey?.includes('_PALDEA')) name = 'Paldean ' + baseName;
    else name = baseName;
  }

  if (isShadow) return `Shadow ${name}`;
  if (isPrimal && !name.startsWith('Primal')) return `Primal ${name}`;
  if (isMega && !name.startsWith('Mega')) return `Mega ${name}`;
  return name;
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

      // ── Normal base ──
      const normalBest = findBestMoveset(baseMoves.fastMoves, baseMoves.chargedMoves, baseAtk, baseTypes, false);
      if (normalBest.fastMove && normalBest.chargedMove) {
        addEntry({
          name: baseName,
          pokedexId: pokemon.dexNr,
          types: baseTypes,
          attack: baseAtk,
          defense: baseDef,
          stamina: baseSta,
          maxCp: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_50),
          maxCp40: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_40),
          cpRaid100: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_20),
          cpWeather100: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_25),
          cpResearch100: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_15),
          pveScore: computePveScore(normalBest.dps, baseDef, baseSta, false),
          dps: normalBest.dps,
          bestFastMove: { name: formatMoveName(normalBest.fastMove), type: formatMoveType(normalBest.fastMove) },
          bestChargedMove: { name: formatMoveName(normalBest.chargedMove), type: formatMoveType(normalBest.chargedMove) },
          isShadow: false,
          isMega: false,
          isPrimal: false,
          generation: pokemon.generation
        });
      }

      // ── Shadow base (only for standard species) ──
      if (!FORMS_EXCLUDED_FROM_SHADOW.has(pokemon.id)) {
        const shadowBest = findBestMoveset(baseMoves.fastMoves, baseMoves.chargedMoves, baseAtk, baseTypes, true);
        if (shadowBest.fastMove && shadowBest.chargedMove) {
          addEntry({
            name: `Shadow ${baseName}`,
            pokedexId: pokemon.dexNr,
            types: baseTypes,
            attack: baseAtk,
            defense: baseDef,
            stamina: baseSta,
            maxCp: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_50),
            maxCp40: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_40),
            cpRaid100: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_20),
            cpWeather100: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_25),
            cpResearch100: calculateCp(baseAtk, baseDef, baseSta, CP_MULTIPLIER_15),
            pveScore: computePveScore(shadowBest.dps, baseDef, baseSta, true),
            dps: shadowBest.dps,
            bestFastMove: { name: formatMoveName(shadowBest.fastMove), type: formatMoveType(shadowBest.fastMove) },
            bestChargedMove: { name: formatMoveName(shadowBest.chargedMove), type: formatMoveType(shadowBest.chargedMove) },
            isShadow: true,
            isMega: false,
            isPrimal: false,
            generation: pokemon.generation
          });
        }
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

        const formName = formatPokemonName(baseName, rfKey, rf, false);
        const rfAtk = rf.stats.attack;
        const rfDef = rf.stats.defense;
        const rfSta = rf.stats.stamina;

        // Normal regional form
        const rfNormalBest = findBestMoveset(fastMoves, chargedMoves, rfAtk, rfTypes, false);
        if (rfNormalBest.fastMove && rfNormalBest.chargedMove) {
          addEntry({
            name: formName,
            pokedexId: pokemon.dexNr,
            types: rfTypes,
            attack: rfAtk,
            defense: rfDef,
            stamina: rfSta,
            maxCp: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_50),
            maxCp40: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_40),
            cpRaid100: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_20),
            cpWeather100: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_25),
            cpResearch100: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_15),
            pveScore: computePveScore(rfNormalBest.dps, rfDef, rfSta, false),
            dps: rfNormalBest.dps,
            bestFastMove: { name: formatMoveName(rfNormalBest.fastMove), type: formatMoveType(rfNormalBest.fastMove) },
            bestChargedMove: { name: formatMoveName(rfNormalBest.chargedMove), type: formatMoveType(rfNormalBest.chargedMove) },
            isShadow: false,
            isMega: false,
            isPrimal: false,
            generation: pokemon.generation
          });
        }

        // Shadow regional form (only if allowed)
        if (!FORMS_EXCLUDED_FROM_SHADOW.has(rfKey)) {
          const rfShadowBest = findBestMoveset(fastMoves, chargedMoves, rfAtk, rfTypes, true);
          if (rfShadowBest.fastMove && rfShadowBest.chargedMove) {
            addEntry({
              name: `Shadow ${formName}`,
              pokedexId: pokemon.dexNr,
              types: rfTypes,
              attack: rfAtk,
              defense: rfDef,
              stamina: rfSta,
              maxCp: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_50),
              maxCp40: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_40),
              cpRaid100: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_20),
              cpWeather100: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_25),
              cpResearch100: calculateCp(rfAtk, rfDef, rfSta, CP_MULTIPLIER_15),
              pveScore: computePveScore(rfShadowBest.dps, rfDef, rfSta, true),
              dps: rfShadowBest.dps,
              bestFastMove: { name: formatMoveName(rfShadowBest.fastMove), type: formatMoveType(rfShadowBest.fastMove) },
              bestChargedMove: { name: formatMoveName(rfShadowBest.chargedMove), type: formatMoveType(rfShadowBest.chargedMove) },
              isShadow: true,
              isMega: false,
              isPrimal: false,
              generation: pokemon.generation
            });
          }
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
        const chargedMoves = megaMoves.chargedMoves.length > 0 ? megaMoves.chargedMoves : baseMoves.chargedMoves;
        if (fastMoves.length === 0 || chargedMoves.length === 0) continue;

        const megaName = formatPokemonName(baseName, megaKey, mega, false, !isPrimal, isPrimal);
        const megaAtk = mega.stats.attack;
        const megaDef = mega.stats.defense;
        const megaSta = mega.stats.stamina;

        const megaBest = findBestMoveset(fastMoves, chargedMoves, megaAtk, megaTypes, false);
        if (megaBest.fastMove && megaBest.chargedMove) {
          addEntry({
            name: megaName,
            pokedexId: pokemon.dexNr,
            types: megaTypes,
            attack: megaAtk,
            defense: megaDef,
            stamina: megaSta,
            maxCp: calculateCp(megaAtk, megaDef, megaSta, CP_MULTIPLIER_50),
            maxCp40: calculateCp(megaAtk, megaDef, megaSta, CP_MULTIPLIER_40),
            cpRaid100: calculateCp(megaAtk, megaDef, megaSta, CP_MULTIPLIER_20),
            cpWeather100: calculateCp(megaAtk, megaDef, megaSta, CP_MULTIPLIER_25),
            cpResearch100: calculateCp(megaAtk, megaDef, megaSta, CP_MULTIPLIER_15),
            pveScore: computePveScore(megaBest.dps, megaDef, megaSta, false),
            dps: megaBest.dps,
            bestFastMove: { name: formatMoveName(megaBest.fastMove), type: formatMoveType(megaBest.fastMove) },
            bestChargedMove: { name: formatMoveName(megaBest.chargedMove), type: formatMoveType(megaBest.chargedMove) },
            isShadow: false,
            isMega: !isPrimal,
            isPrimal: isPrimal,
            generation: pokemon.generation
          });
        }
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

  // Write TypeScript file directly with helpers
  const tsContent = `// AUTO-GENERATED by backend/src/scripts/generateRankings.ts
// Source: ${API_URL}
// Generated: ${new Date().toISOString()}
// Total entries: ${entries.length}

export interface MoveData {
  name: string;
  type: string;
}

export interface PokemonRankData {
  name: string;
  pokedexId: number;
  slug?: string;
  types: string[];
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
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
  generation?: number;
}

export const pokemonRankings: PokemonRankData[] = ${JSON.stringify(entries, null, 2)};

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
    (p) => p.name.toLowerCase() === str || (p.slug && p.slug.toLowerCase() === str)
  );
  if (directMatch) return directMatch;

  const unhyphenated = str.replace(/-/g, ' ');
  return pokemonRankings.find((p) => p.name.toLowerCase() === unhyphenated);
}
`;

  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');
  console.log(`🎉 Successfully written to ${OUTPUT_PATH}`);
  console.log(`   File size: ${(Buffer.byteLength(tsContent) / 1024).toFixed(0)} KB`);
}

// Direct execution
if (require.main === module) {
  generateRankings().catch(err => {
    console.error('❌ Error executing generateRankings:', err);
    process.exit(1);
  });
}
