/**
 * generatePokedleData.ts — Generates ultra-compact PoGoDle datasets:
 *   1. `frontend/src/data/pokedle/core.json` (~35 KB Brotli)
 *      All 1,024 Pokédex species with GO-native + PokéAPI primary attributes:
 *      id, slug, names (cs/en/ja/ru), gen, t1, t2, evo (1/2/3), cp (Lv50), col, go (released).
 *   2. `frontend/public/data/pokedle/lore-{cs,en,ja,ru}.json` (lazy-loaded on demand)
 *      Official Pokédex descriptions with all species & evolution-family names cleanly masked as `[???]`.
 *
 * Usage:
 *   cd backend && npm.cmd run generate:pokedle
 */

import * as fs from 'fs';
import * as path from 'path';

const CACHE_DIR = path.resolve(__dirname, '../../.cache/pokedex_i18n');
const CATALOG_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.json');
const DESC_DIR = path.resolve(__dirname, '../../../frontend/src/data/descriptions');
const CORE_OUTPUT_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokedle/core.json');
const LORE_OUTPUT_DIR = path.resolve(__dirname, '../../../frontend/public/data/pokedle');

const POKEAPI_CSVS = [
  {
    file: 'pokemon_species.csv',
    url: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species.csv',
  },
  {
    file: 'pokemon_colors.csv',
    url: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_colors.csv',
  },
];

interface CatalogEntry {
  dexId: number;
  slug: string;
  generation: number;
  names: { cs: string; en: string; ja: string; ru: string };
  types: string[];
  maxCp: { lv50: number };
  isReleasedInGo: boolean;
  evolutionChainIds: number[];
}

export interface PokedleCoreEntry {
  id: number;
  slug: string;
  names: { cs: string; en: string; ja: string; ru: string };
  gen: number;
  t1: string;
  t2: string | null;
  evo: 1 | 2 | 3;
  cp: number;
  col: string;
  go: boolean;
}

async function ensurePokeApiCsvs(): Promise<void> {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  for (const item of POKEAPI_CSVS) {
    const dest = path.join(CACHE_DIR, item.file);
    if (!fs.existsSync(dest)) {
      console.log(`⬇️  Downloading ${item.file}...`);
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${item.url}`);
      fs.writeFileSync(dest, await res.text(), 'utf-8');
    }
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Masks Pokémon names (and evolution family names) in a Pokédex description
 * across CS, EN, JA, and RU (including Czech & Russian case inflections).
 */
export function maskPokemonNamesInText(
  text: string,
  namesToMask: { en: string[]; ja: string[]; ru: string[] },
  lang: 'cs' | 'en' | 'ja' | 'ru'
): string {
  let result = text;

  if (lang === 'ja') {
    const sortedJa = [...new Set(namesToMask.ja.filter((n) => n && n.length >= 2))].sort(
      (a, b) => b.length - a.length
    );
    for (const name of sortedJa) {
      result = result.replace(new RegExp(escapeRegex(name), 'g'), '[???]');
    }
    return result.replace(/(\[\?\?\?\]\s*){2,}/g, '[???]');
  }

  if (lang === 'ru') {
    const ruCandidates = new Set<string>();
    for (const raw of namesToMask.ru) {
      if (!raw) continue;
      const clean = raw.trim();
      ruCandidates.add(clean);
      // Handle multi-word Russian names (e.g., "Мистер Майм", "Тапу Коко")
      if (clean.length >= 4 && /[А-Яа-яЁё]/.test(clean)) {
        // Strip common Russian final vowel/sign to catch inflected forms (e.g. Бульбазавр -> Бульбазавра, Чармандер -> Чармандером, Пиджи -> Пиджи)
        const stem = clean.replace(/[аяоеиыьйу]$/i, '');
        if (stem.length >= 3) ruCandidates.add(stem);
      }
    }
    const sortedRu = [...ruCandidates].sort((a, b) => b.length - a.length);
    for (const cand of sortedRu) {
      if (!/[А-Яа-яЁё]/.test(cand)) continue;
      const esc = escapeRegex(cand);
      const suffixPattern = cand.length >= 4 ? '[А-Яа-яЁё]{0,4}' : '';
      const re = new RegExp(`(?<![А-Яа-яЁё])${esc}${suffixPattern}(?![А-Яа-яЁё])`, 'gi');
      result = result.replace(re, '[???]');
    }
  }

  // Mask English / Latin names (for EN, CS, and any untranslated Latin name in RU)
  const latinCandidates = new Set<string>();
  for (const raw of namesToMask.en) {
    if (!raw) continue;
    const clean = raw.trim();
    latinCandidates.add(clean);
    // Strip gender symbols (Nidoran♀ / Nidoran♂)
    const noGender = clean.replace(/[♀♂]/g, '').trim();
    if (noGender.length >= 3) latinCandidates.add(noGender);
    // Normalize apostrophes (Farfetch'd / Sirfetch'd)
    if (clean.includes("'") || clean.includes('’')) {
      latinCandidates.add(clean.replace(/['’]/g, "'"));
      latinCandidates.add(clean.replace(/['’]/g, '’'));
    }
  }

  const sortedLatin = [...latinCandidates].sort((a, b) => b.length - a.length);
  for (const cand of sortedLatin) {
    const esc = escapeRegex(cand);
    if (lang === 'cs' && cand.length >= 4) {
      // Catch Czech declensions: Ivysaur -> Ivysaura/Ivysaurovi/Ivysaurem, Pikachu -> Pikachua, etc.
      const stem = cand.replace(/[aeioy]$/i, '');
      const stemPattern = stem.length >= 4 && stem !== cand ? `(?:${esc}|${escapeRegex(stem)})` : esc;
      const re = new RegExp(
        `(?<![A-Za-zÀ-ž])${stemPattern}[a-záéíóúůýčďěňřšťž]{0,4}(?![A-Za-zÀ-ž])`,
        'gi'
      );
      result = result.replace(re, '[???]');
    } else if (lang === 'en') {
      // Catch English possessive ('s / ’s) and plural (s)
      const re = new RegExp(`(?<![A-Za-z])${esc}(?:['’]s|s)?(?![A-Za-z])`, 'gi');
      result = result.replace(re, '[???]');
    } else {
      const re = new RegExp(`(?<![A-Za-z])${esc}(?![A-Za-z])`, 'gi');
      result = result.replace(re, '[???]');
    }
  }

  return result.replace(/(\[\?\?\?\]\s*){2,}/g, '[???] ').trim();
}

async function main() {
  await ensurePokeApiCsvs();

  // 1. Parse pokemon_colors.csv
  const colorById = new Map<number, string>();
  const colorLines = fs
    .readFileSync(path.join(CACHE_DIR, 'pokemon_colors.csv'), 'utf-8')
    .trim()
    .split(/\r?\n/)
    .slice(1);
  for (const line of colorLines) {
    const [idStr, identifier] = line.split(',');
    colorById.set(Number(idStr), identifier.trim());
  }

  // 2. Parse pokemon_species.csv (id, identifier, generation_id, evolves_from_species_id, evolution_chain_id, color_id, ...)
  const evolvesFrom = new Map<number, number | null>();
  const speciesColor = new Map<number, string>();
  const speciesLines = fs
    .readFileSync(path.join(CACHE_DIR, 'pokemon_species.csv'), 'utf-8')
    .trim()
    .split(/\r?\n/)
    .slice(1);
  for (const line of speciesLines) {
    const cols = line.split(',');
    const id = Number(cols[0]);
    const evFrom = cols[3] ? Number(cols[3]) : null;
    const colId = Number(cols[5]);
    evolvesFrom.set(id, evFrom);
    speciesColor.set(id, colorById.get(colId) || 'gray');
  }

  function computeEvoStage(dexId: number): 1 | 2 | 3 {
    let stage = 1;
    let curr = evolvesFrom.get(dexId) ?? null;
    let guard = 0;
    while (curr && guard < 4) {
      stage++;
      curr = evolvesFrom.get(curr) ?? null;
      guard++;
    }
    return Math.min(3, Math.max(1, stage)) as 1 | 2 | 3;
  }

  // 3. Load pokedexCatalog.json
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf-8')) as CatalogEntry[];
  const byId = new Map(catalog.map((c) => [c.dexId, c]));

  const coreList: PokedleCoreEntry[] = catalog.map((c) => ({
    id: c.dexId,
    slug: c.slug,
    names: c.names,
    gen: c.generation,
    t1: c.types[0] || 'Normal',
    t2: c.types[1] || null,
    evo: computeEvoStage(c.dexId),
    cp: c.maxCp.lv50,
    col: speciesColor.get(c.dexId) || 'gray',
    go: Boolean(c.isReleasedInGo),
  }));

  fs.mkdirSync(path.dirname(CORE_OUTPUT_PATH), { recursive: true });
  const coreJson = JSON.stringify(coreList);
  fs.writeFileSync(CORE_OUTPUT_PATH, coreJson, 'utf-8');
  console.log(
    `✅ Wrote ${CORE_OUTPUT_PATH} (${coreList.length} Pokémon, ${(Buffer.byteLength(coreJson) / 1024).toFixed(1)} KB)`
  );

  // 4. Generate masked lore JSONs per language into frontend/public/data/pokedle/
  fs.mkdirSync(LORE_OUTPUT_DIR, { recursive: true });
  for (const lang of ['cs', 'en', 'ja', 'ru'] as const) {
    const descMap = JSON.parse(
      fs.readFileSync(path.join(DESC_DIR, `${lang}.json`), 'utf-8')
    ) as Record<string, { text: string; source: string }>;

    const maskedMap: Record<string, { text: string; source: string }> = {};
    let leakCount = 0;

    for (const c of catalog) {
      const entry = descMap[String(c.dexId)];
      if (!entry) continue;

      const familyIds = new Set<number>([c.dexId, ...(c.evolutionChainIds || [])]);
      const enNames: string[] = [];
      const jaNames: string[] = [];
      const ruNames: string[] = [];
      for (const fid of familyIds) {
        const fam = byId.get(fid);
        if (!fam) continue;
        enNames.push(fam.names.en);
        jaNames.push(fam.names.ja);
        ruNames.push(fam.names.ru);
      }

      const masked = maskPokemonNamesInText(
        entry.text,
        { en: enNames, ja: jaNames, ru: ruNames },
        lang
      );

      // Leak self-check against exact own name
      const ownName =
        lang === 'ja' ? c.names.ja : lang === 'ru' ? c.names.ru : c.names.en;
      if (ownName && ownName.length >= 3) {
        const checkRe =
          lang === 'ja'
            ? new RegExp(escapeRegex(ownName))
            : lang === 'ru' && /[А-Яа-яЁё]/.test(ownName)
              ? new RegExp(`(?<![А-Яа-яЁё])${escapeRegex(ownName)}(?![А-Яа-яЁё])`, 'i')
              : new RegExp(`(?<![A-Za-z])${escapeRegex(ownName)}(?![A-Za-z])`, 'i');
        if (checkRe.test(masked)) {
          leakCount++;
          console.warn(`⚠️  Potential leak [${lang}] #${c.dexId} (${ownName}): ${masked}`);
        }
      }

      maskedMap[String(c.dexId)] = {
        text: masked,
        source: entry.source,
      };
    }

    const dest = path.join(LORE_OUTPUT_DIR, `lore-${lang}.json`);
    const json = JSON.stringify(maskedMap);
    fs.writeFileSync(dest, json, 'utf-8');
    console.log(
      `✅ Wrote ${dest} (${(Buffer.byteLength(json) / 1024).toFixed(1)} KB, leaks=${leakCount})`
    );
    if (leakCount > 0) {
      throw new Error(`Found ${leakCount} unmasked Pokémon names in lore-${lang}.json!`);
    }
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Error generating PoGoDle data:', err);
    process.exit(1);
  });
}
