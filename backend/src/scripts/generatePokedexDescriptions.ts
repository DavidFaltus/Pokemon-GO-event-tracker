/**
 * generatePokedexDescriptions.ts — Generates per-locale official Pokédex descriptions
 * (Base species + Mega/Primal/Gigantamax/Regional/Fusion/Battle forms) for all 1,024 species.
 *
 * Primary Source (98.3% + all GO forms):
 *   PokeMiners/pogo_assets Texts/Latest APK/JSON/i18n_{english,japanese,russian}.json
 *   (NEVER uses Russian.txt which is mislabeled Spanish in upstream repo!)
 *
 * Fallback Source (Gen 9 DLC #1009–#1025):
 *   PokeAPI/pokeapi pokemon_species_flavor_text.csv (latest mainline game)
 *
 * Static Translation Cache (CS 100% + 17 Gen 9 DLC for JA/RU):
 *   backend/data/pokedex_descriptions_translations.json
 *
 * Output (Server-only JSONs -> 0 KB client JS bundle impact):
 *   frontend/src/data/descriptions/{cs,en,ja,ru}.json
 *
 * Usage:
 *   cd backend && npm.cmd run generate:pokedex-descriptions
 *   cd backend && npm.cmd run generate:pokedex-descriptions -- --extract-todo
 */

import * as fs from 'fs';
import * as path from 'path';

interface CatalogVariant {
  id: string;
  category: string;
}

interface CatalogEntry {
  dexId: number;
  slug: string;
  names: { cs: string; en: string; ja: string; ru: string };
  variants: CatalogVariant[];
}

export interface PokedexDescriptionVariantEntry {
  text: string;
  source: string;
}

export interface PokedexDescriptionEntry {
  text: string;
  source: string;
  variants?: Record<string, PokedexDescriptionVariantEntry>;
}

type DescriptionsMap = Record<string, PokedexDescriptionEntry>;

interface TranslationsCache {
  cs: Record<string, string>; // key: "<dexId>" or "<dexId>:<variantId>"
  ja: Record<string, string>; // key: "<dexId>" (Gen 9 DLC #1009-1025)
  ru: Record<string, string>; // key: "<dexId>" (Gen 9 DLC #1009-1025)
}

const CACHE_DIR = path.resolve(__dirname, '../../.cache/pokedex_i18n');
const CATALOG_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.json');
const TRANSLATIONS_PATH = path.resolve(__dirname, '../../data/pokedex_descriptions_translations.json');
const OUTPUT_DIR = path.resolve(__dirname, '../../../frontend/src/data/descriptions');

const REMOTE_SOURCES: Array<{ file: string; url: string }> = [
  {
    file: 'i18n_english.json',
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/JSON/i18n_english.json',
  },
  {
    file: 'i18n_japanese.json',
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/JSON/i18n_japanese.json',
  },
  {
    file: 'i18n_russian.json',
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/JSON/i18n_russian.json',
  },
  {
    file: 'pokemon_species_flavor_text.csv',
    url: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_flavor_text.csv',
  },
  {
    file: 'versions.csv',
    url: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/versions.csv',
  },
];

// Explicit base fallback keys for the 7 species in pogo_assets that only ship form-suffixed keys
const BASE_KEY_FALLBACKS: Record<number, string> = {
  905: 'pokemon_desc_0905_2802', // Enamorus Incarnate
  916: 'pokemon_desc_0916_2981', // Oinkologne Male
  925: 'pokemon_desc_0925_2983', // Maushold Family of Four
  931: 'pokemon_desc_0931_2985', // Squawkabilly Green
  964: 'pokemon_desc_0964_2989', // Palafin Zero
  978: 'pokemon_desc_0978_2991', // Tatsugiri Curly
  982: 'pokemon_desc_0982_2994', // Dudunsparce Two-Segment
  1007: 'pokemon_desc_1007_2996', // Koraidon
  1008: 'pokemon_desc_1008_2997', // Miraidon
};

// Exact deterministic mapping: PokedexVariant.id -> PokeMiners i18n key
export const VARIANT_ID_TO_POGO_KEY: Record<string, string> = {
  // Alolan Regional Forms
  RATTATA_ALOLA: 'pokemon_desc_0019_0046',
  RATICATE_ALOLA: 'pokemon_desc_0020_0048',
  RAICHU_ALOLA: 'pokemon_desc_0026_0050',
  SANDSHREW_ALOLA: 'pokemon_desc_0027_0052',
  SANDSLASH_ALOLA: 'pokemon_desc_0028_0054',
  VULPIX_ALOLA: 'pokemon_desc_0037_0056',
  NINETALES_ALOLA: 'pokemon_desc_0038_0058',
  DIGLETT_ALOLA: 'pokemon_desc_0050_0060',
  DUGTRIO_ALOLA: 'pokemon_desc_0051_0062',
  MEOWTH_ALOLA: 'pokemon_desc_0052_0064',
  PERSIAN_ALOLA: 'pokemon_desc_0053_0066',
  GEODUDE_ALOLA: 'pokemon_desc_0074_0068',
  GRAVELER_ALOLA: 'pokemon_desc_0075_0070',
  GOLEM_ALOLA: 'pokemon_desc_0076_0072',
  GRIMER_ALOLA: 'pokemon_desc_0088_0074',
  MUK_ALOLA: 'pokemon_desc_0089_0076',
  EXEGGUTOR_ALOLA: 'pokemon_desc_0103_0078',
  MAROWAK_ALOLA: 'pokemon_desc_0105_0080',

  // Galarian Regional Forms
  MEOWTH_GALARIAN: 'pokemon_desc_0052_2335',
  PONYTA_GALARIAN: 'pokemon_desc_0077_2336',
  RAPIDASH_GALARIAN: 'pokemon_desc_0078_2337',
  SLOWPOKE_GALARIAN: 'pokemon_desc_0079_2582',
  SLOWBRO_GALARIAN: 'pokemon_desc_0080_2583',
  FARFETCHD_GALARIAN: 'pokemon_desc_0083_2338',
  WEEZING_GALARIAN: 'pokemon_desc_0110_0944',
  MR_MIME_GALARIAN: 'pokemon_desc_0122_2339',
  ARTICUNO_GALARIAN: 'pokemon_desc_0144_2801',
  ZAPDOS_GALARIAN: 'pokemon_desc_0145_2800',
  MOLTRES_GALARIAN: 'pokemon_desc_0146_2799',
  SLOWKING_GALARIAN: 'pokemon_desc_0199_2584',
  CORSOLA_GALARIAN: 'pokemon_desc_0222_2340',
  ZIGZAGOON_GALARIAN: 'pokemon_desc_0263_0946',
  LINOONE_GALARIAN: 'pokemon_desc_0264_0948',
  DARUMAKA_GALARIAN: 'pokemon_desc_0554_2341',
  DARMANITAN_GALARIAN_STANDARD: 'pokemon_desc_0555_2342',
  YAMASK_GALARIAN: 'pokemon_desc_0562_2344',
  STUNFISK_GALARIAN: 'pokemon_desc_0618_2345',

  // Hisuian Regional Forms
  GROWLITHE_HISUIAN: 'pokemon_desc_0058_2792',
  ARCANINE_HISUIAN: 'pokemon_desc_0059_2793',
  VOLTORB_HISUIAN: 'pokemon_desc_0100_2728',
  ELECTRODE_HISUIAN: 'pokemon_desc_0101_2735',
  TYPHLOSION_HISUIAN: 'pokemon_desc_0157_2786',
  QWILFISH_HISUIAN: 'pokemon_desc_0211_2788',
  SNEASEL_HISUIAN: 'pokemon_desc_0215_2794',
  SAMUROTT_HISUIAN: 'pokemon_desc_0503_2787',
  LILLIGANT_HISUIAN: 'pokemon_desc_0549_2789',
  ZORUA_HISUIAN: 'pokemon_desc_0570_2796',
  ZOROARK_HISUIAN: 'pokemon_desc_0571_2797',
  BRAVIARY_HISUIAN: 'pokemon_desc_0628_2798',
  SLIGGOO_HISUIAN: 'pokemon_desc_0705_2790',
  GOODRA_HISUIAN: 'pokemon_desc_0706_2791',
  AVALUGG_HISUIAN: 'pokemon_desc_0713_2795',
  DECIDUEYE_HISUIAN: 'pokemon_desc_0724_2785',

  // Paldean Regional Forms
  TAUROS_PALDEA_COMBAT: 'pokemon_desc_0128_3006',
  TAUROS_PALDEA_BLAZE: 'pokemon_desc_0128_3007',
  TAUROS_PALDEA_AQUA: 'pokemon_desc_0128_3008',
  WOOPER_PALDEA: 'pokemon_desc_0194_3009',

  // Origin, Fusion, Battle & Alternate Forms
  DIALGA_ORIGIN: 'pokemon_desc_0483_2829',
  PALKIA_ORIGIN: 'pokemon_desc_0484_2830',
  KYUREM_BLACK: 'pokemon_desc_0646_0147',
  KYUREM_WHITE: 'pokemon_desc_0646_0148',
  HOOPA_UNBOUND: 'pokemon_desc_0720_2652',
  ORICORIO_BAILE: 'pokemon_desc_0741_2679',
  ORICORIO_POMPOM: 'pokemon_desc_0741_2680',
  ORICORIO_PAU: 'pokemon_desc_0741_2681',
  ORICORIO_SENSU: 'pokemon_desc_0741_2683',
  LYCANROC_MIDDAY: 'pokemon_desc_0745_2684',
  LYCANROC_MIDNIGHT: 'pokemon_desc_0745_2685',
  LYCANROC_DUSK: 'pokemon_desc_0745_2686',
  WISHIWASHI_SCHOOL: 'pokemon_desc_0746_school',
  WISHIWASHI_SOLO: 'pokemon_desc_0746_solo',
  NECROZMA_DUSK_MANE: 'pokemon_desc_0800_2718',
  NECROZMA_DAWN_WINGS: 'pokemon_desc_0800_2719',
  CRAMORANT_GORGING: 'pokemon_desc_0845_gorging',
  CRAMORANT_GULPING: 'pokemon_desc_0845_gulping',
  TOXTRICITY_AMPED: 'pokemon_desc_0849_2463',
  TOXTRICITY_LOW_KEY: 'pokemon_desc_0849_2464',
  SINISTEA_ANTIQUE: 'pokemon_desc_0854_antique',
  SINISTEA_PHONY: 'pokemon_desc_0854_phony',
  POLTEAGEIST_ANTIQUE: 'pokemon_desc_0855_antique',
  POLTEAGEIST_PHONY: 'pokemon_desc_0855_phony',
  EISCUE_ICE: 'pokemon_desc_0875_ice',
  EISCUE_NOICE: 'pokemon_desc_0875_noice',
  INDEEDEE_FEMALE: 'pokemon_desc_0876_female',
  INDEEDEE_MALE: 'pokemon_desc_0876_male',
  MORPEKO_FULL_BELLY: 'pokemon_desc_0877_full',
  MORPEKO_HANGRY: 'pokemon_desc_0877_hangry',
  ZACIAN_CROWNED_SWORD: 'pokemon_desc_0888_2576',
  ZACIAN_HERO: 'pokemon_desc_0888_default',
  ZAMAZENTA_CROWNED_SHIELD: 'pokemon_desc_0889_2578',
  ZAMAZENTA_HERO: 'pokemon_desc_0889_default',
  ETERNATUS_ETERNAMAX: 'pokemon_desc_0890_2581',
  URSHIFU_RAPID_STRIKE: 'pokemon_desc_0892_rs',
  URSHIFU_SINGLE_STRIKE: 'pokemon_desc_0892_ss',
  CALYREX_ICE_RIDER: 'pokemon_desc_0898_ice',
  CALYREX_SHADOW_RIDER: 'pokemon_desc_0898_shadow',
  ENAMORUS_INCARNATE: 'pokemon_desc_0905_2802',
  ENAMORUS_THERIAN: 'pokemon_desc_0905_2803',
  OINKOLOGNE_FEMALE: 'pokemon_desc_0916_2982',
  MAUSHOLD_FAMILY_OF_FOUR: 'pokemon_desc_0925_2983',
  MAUSHOLD_FAMILY_OF_THREE: 'pokemon_desc_0925_2984',
  SQUAWKABILLY_GREEN: 'pokemon_desc_0931_2985',
  SQUAWKABILLY_BLUE: 'pokemon_desc_0931_2986',
  SQUAWKABILLY_YELLOW: 'pokemon_desc_0931_2987',
  SQUAWKABILLY_WHITE: 'pokemon_desc_0931_2988',
  PALAFIN_ZERO: 'pokemon_desc_0964_2989',
  PALAFIN_HERO: 'pokemon_desc_0964_2990',
  TATSUGIRI_CURLY: 'pokemon_desc_0978_2991',
  TATSUGIRI_DROOPY: 'pokemon_desc_0978_2992',
  TATSUGIRI_STRETCHY: 'pokemon_desc_0978_2993',
  DUDUNSPARCE_TWO: 'pokemon_desc_0982_2994',
  DUDUNSPARCE_THREE: 'pokemon_desc_0982_2995',
  KORAIDON_APEX: 'pokemon_desc_1007_2996',
  MIRAIDON_ULTIMATE: 'pokemon_desc_1008_2997',
};

const VERSION_LABELS: Record<string, string> = {
  scarlet: 'Pokémon Scarlet',
  violet: 'Pokémon Violet',
  'legends-arceus': 'Pokémon Legends: Arceus',
  sword: 'Pokémon Sword',
  shield: 'Pokémon Shield',
  'ultra-sun': 'Pokémon Ultra Sun',
  'ultra-moon': 'Pokémon Ultra Moon',
};

const VERSION_PRIORITY = [
  'scarlet',
  'violet',
  'legends-arceus',
  'sword',
  'shield',
  'ultra-sun',
  'ultra-moon',
];

export function normalizeFlavorText(raw: string): string {
  return raw
    .replace(/[\f\r\n]+/g, ' ')
    .replace(/\u00ad\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function pad4(num: number): string {
  return String(num).padStart(4, '0');
}

async function ensureCachedFiles(): Promise<void> {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  for (const src of REMOTE_SOURCES) {
    const dest = path.join(CACHE_DIR, src.file);
    if (!fs.existsSync(dest)) {
      console.log(`⬇️  Downloading ${src.file}...`);
      const res = await fetch(src.url);
      if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${src.url}`);
      const text = await res.text();
      fs.writeFileSync(dest, text, 'utf-8');
    }
  }
}

function loadPogoI18nMap(filename: string): Map<string, string> {
  const raw = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, filename), 'utf-8')) as { data: string[] };
  const map = new Map<string, string>();
  for (let i = 0; i < raw.data.length; i += 2) {
    map.set(raw.data[i], raw.data[i + 1]);
  }
  return map;
}

function parseCsvRows(content: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inQuotes) {
      if (ch === '"') {
        if (content[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && content[i + 1] === '\n') i++;
      row.push(field);
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function loadPokeApiEnglishFallbacks(): Map<number, { text: string; source: string }> {
  const versionsCsv = fs.readFileSync(path.join(CACHE_DIR, 'versions.csv'), 'utf-8');
  const versionById = new Map<number, string>();
  for (const cols of parseCsvRows(versionsCsv).slice(1)) {
    versionById.set(Number(cols[0]), cols[2]);
  }

  const flavorCsv = fs.readFileSync(path.join(CACHE_DIR, 'pokemon_species_flavor_text.csv'), 'utf-8');
  const perSpecies = new Map<number, Array<{ version: string; text: string }>>();
  for (const cols of parseCsvRows(flavorCsv).slice(1)) {
    const speciesId = Number(cols[0]);
    const versionId = Number(cols[1]);
    const langId = Number(cols[2]);
    if (langId !== 9) continue; // English only
    const version = versionById.get(versionId) || 'mainline';
    const text = normalizeFlavorText(cols[3] || '');
    if (!text) continue;
    const list = perSpecies.get(speciesId) || [];
    list.push({ version, text });
    perSpecies.set(speciesId, list);
  }

  const result = new Map<number, { text: string; source: string }>();
  for (const [speciesId, list] of perSpecies.entries()) {
    list.sort((a, b) => {
      const ia = VERSION_PRIORITY.indexOf(a.version);
      const ib = VERSION_PRIORITY.indexOf(b.version);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
    const best = list[0];
    result.set(speciesId, {
      text: best.text,
      source: VERSION_LABELS[best.version] || 'Pokémon',
    });
  }
  return result;
}

export function resolvePogoKeyForVariant(
  dexId: number,
  variant: CatalogVariant,
  enMap: Map<string, string>
): string | null {
  const id = variant.id;

  // 1. Explicit deterministic map (Regional, Fusion, Battle, Alternate forms)
  if (VARIANT_ID_TO_POGO_KEY[id] && enMap.has(VARIANT_ID_TO_POGO_KEY[id])) {
    return VARIANT_ID_TO_POGO_KEY[id];
  }

  // 2. Mega & Primal evolutions (pokemon_desc_tmpevo_XXXX_0001..0003)
  if (variant.category === 'mega' || variant.category === 'primal') {
    const suffix = id.endsWith('_MEGA_X') ? '0002' : id.endsWith('_MEGA_Y') ? '0003' : '0001';
    const key = `pokemon_desc_tmpevo_${pad4(dexId)}_${suffix}`;
    if (enMap.has(key)) return key;
  }

  // 3. Gigantamax forms (pokemon_desc_XXXX_*_2)
  if (variant.category === 'gigantamax') {
    const prefix = `pokemon_desc_${pad4(dexId)}_`;
    for (const key of enMap.keys()) {
      if (key.startsWith(prefix) && key.endsWith('_2')) {
        return key;
      }
    }
  }

  // 4. Minior Meteor vs Exposed & Silvally Disc forms
  if (dexId === 774) {
    const key = id.includes('METEOR') ? 'pokemon_desc_0774_meteor' : 'pokemon_desc_0774_exposed';
    if (enMap.has(key)) return key;
  }
  if (dexId === 773 && variant.category === 'alternate_form') {
    if (enMap.has('pokemon_desc_0773_disc')) return 'pokemon_desc_0773_disc';
  }

  return null;
}

async function main() {
  const extractTodo = process.argv.includes('--extract-todo');
  await ensureCachedFiles();

  const enMap = loadPogoI18nMap('i18n_english.json');
  const jaMap = loadPogoI18nMap('i18n_japanese.json');
  const ruMap = loadPogoI18nMap('i18n_russian.json');

  // Guardrail against the upstream Russian.txt Spanish-mislabeled bug
  const ruIvysaur = ruMap.get('pokemon_desc_0002') || '';
  if (!/[А-Яа-яЁё]/.test(ruIvysaur)) {
    throw new Error(`Sanity check failed: i18n_russian.json does not contain Russian Cyrillic! Got: "${ruIvysaur}"`);
  }

  const pokeApiEn = loadPokeApiEnglishFallbacks();
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8')) as CatalogEntry[];

  const translations: TranslationsCache = fs.existsSync(TRANSLATIONS_PATH)
    ? JSON.parse(fs.readFileSync(TRANSLATIONS_PATH, 'utf-8'))
    : { cs: {}, ja: {}, ru: {} };

  const out: Record<'en' | 'ja' | 'ru' | 'cs', DescriptionsMap> = {
    en: {},
    ja: {},
    ru: {},
    cs: {},
  };

  const todoCs: Array<{ key: string; dexId: number; name: string; variantId?: string; en: string }> = [];
  const todoJaRu: Array<{ key: string; dexId: number; name: string; en: string; source: string }> = [];

  let pogoBaseCount = 0;
  let fallbackBaseCount = 0;
  let variantUniqueCount = 0;

  for (const entry of catalog) {
    const dexKey = String(entry.dexId);
    const basePogoKey = `pokemon_desc_${pad4(entry.dexId)}`;
    const resolvedBaseKey = enMap.has(basePogoKey)
      ? basePogoKey
      : BASE_KEY_FALLBACKS[entry.dexId] && enMap.has(BASE_KEY_FALLBACKS[entry.dexId])
        ? BASE_KEY_FALLBACKS[entry.dexId]
        : null;

    let enText = '';
    let jaText = '';
    let ruText = '';
    let source = 'Pokémon GO';

    if (resolvedBaseKey) {
      pogoBaseCount++;
      enText = normalizeFlavorText(enMap.get(resolvedBaseKey) || '');
      jaText = normalizeFlavorText(jaMap.get(resolvedBaseKey) || '');
      ruText = normalizeFlavorText(ruMap.get(resolvedBaseKey) || '');
    } else {
      const fb = pokeApiEn.get(entry.dexId);
      if (!fb) {
        throw new Error(`Missing English flavor text for #${entry.dexId} ${entry.names.en}`);
      }
      fallbackBaseCount++;
      enText = fb.text;
      source = fb.source;
      jaText = normalizeFlavorText(translations.ja?.[dexKey] || '');
      ruText = normalizeFlavorText(translations.ru?.[dexKey] || '');
      if (!jaText || !ruText) {
        todoJaRu.push({ key: dexKey, dexId: entry.dexId, name: entry.names.en, en: enText, source });
      }
    }

    const csText = normalizeFlavorText(translations.cs?.[dexKey] || '');
    if (!csText) {
      todoCs.push({ key: dexKey, dexId: entry.dexId, name: entry.names.en, en: enText });
    }

    out.en[dexKey] = { text: enText, source };
    out.ja[dexKey] = { text: jaText, source };
    out.ru[dexKey] = { text: ruText, source };
    out.cs[dexKey] = { text: csText, source };

    // Resolve variant-specific official descriptions
    for (const variant of entry.variants) {
      const pogoVarKey = resolvePogoKeyForVariant(entry.dexId, variant, enMap);
      if (!pogoVarKey) continue;

      const vEn = normalizeFlavorText(enMap.get(pogoVarKey) || '');
      if (!vEn || vEn === enText) continue; // Deduplicate identical descriptions

      const vJa = normalizeFlavorText(jaMap.get(pogoVarKey) || '');
      const vRu = normalizeFlavorText(ruMap.get(pogoVarKey) || '');
      const csVarKey = `${dexKey}:${variant.id}`;
      const vCs = normalizeFlavorText(translations.cs?.[csVarKey] || '');

      if (!vCs) {
        todoCs.push({
          key: csVarKey,
          dexId: entry.dexId,
          name: entry.names.en,
          variantId: variant.id,
          en: vEn,
        });
      }

      variantUniqueCount++;
      out.en[dexKey].variants = out.en[dexKey].variants || {};
      out.en[dexKey].variants![variant.id] = { text: vEn, source: 'Pokémon GO' };

      if (vJa) {
        out.ja[dexKey].variants = out.ja[dexKey].variants || {};
        out.ja[dexKey].variants![variant.id] = { text: vJa, source: 'Pokémon GO' };
      }
      if (vRu) {
        out.ru[dexKey].variants = out.ru[dexKey].variants || {};
        out.ru[dexKey].variants![variant.id] = { text: vRu, source: 'Pokémon GO' };
      }
      if (vCs) {
        out.cs[dexKey].variants = out.cs[dexKey].variants || {};
        out.cs[dexKey].variants![variant.id] = { text: vCs, source: 'Pokémon GO' };
      }
    }
  }

  console.log(`📊 Pokédex Descriptions Summary:`);
  console.log(`   Base species from Pokémon GO: ${pogoBaseCount}`);
  console.log(`   Base species from PokéAPI fallback: ${fallbackBaseCount}`);
  console.log(`   Unique form/variant descriptions: ${variantUniqueCount}`);
  console.log(`   Missing CS translations: ${todoCs.length}`);
  console.log(`   Missing JA/RU DLC translations: ${todoJaRu.length}`);

  if (extractTodo) {
    const todoPath = path.join(CACHE_DIR, 'todo_translations.json');
    fs.writeFileSync(todoPath, JSON.stringify({ todoCs, todoJaRu }, null, 2), 'utf-8');
    console.log(`📝 Wrote translation TODO list to: ${todoPath}`);
    return;
  }

  if (todoCs.length > 0 || todoJaRu.length > 0) {
    throw new Error(
      `Cannot write production description files while translations are incomplete (missing CS: ${todoCs.length}, missing JA/RU: ${todoJaRu.length}). Run with --extract-todo first.`
    );
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const lang of ['en', 'ja', 'ru', 'cs'] as const) {
    const dest = path.join(OUTPUT_DIR, `${lang}.json`);
    const json = JSON.stringify(out[lang]);
    fs.writeFileSync(dest, json, 'utf-8');
    console.log(`✅ Wrote ${dest} (${(Buffer.byteLength(json, 'utf-8') / 1024).toFixed(1)} KB)`);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Error generating Pokédex descriptions:', err);
    process.exit(1);
  });
}
