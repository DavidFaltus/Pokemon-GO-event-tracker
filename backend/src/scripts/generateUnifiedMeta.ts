import fs from 'fs';
import path from 'path';
import { loadStoredLeagueRankings, checkAndSyncPvPokeRankings, LeagueKey, LEAGUE_FILES } from '../services/pvpokeRankingsService';

interface CatalogEntry {
  dexId: number;
  slug: string;
  names: { cs: string; en: string; ja: string; ru: string };
  types: string[];
  stats: { attack: number; defense: number; stamina: number };
  maxCp: number;
  variants: Array<{
    id: string;
    slugSuffix?: string;
    name: Record<string, string>;
    types: string[];
    stats: { attack: number; defense: number; stamina: number };
    maxCp: number;
  }>;
}

interface PvERankEntry {
  pokedexId: number;
  name: string;
  slug: string;
  type?: string;
  types?: string[];
  isShadow?: boolean;
  isMega?: boolean;
  isPrimal?: boolean;
  rank?: number;
  pveScore: number;
  dps: number;
  bestFastMove: { name: string; type: string };
  bestChargedMove: { name: string; type: string };
}

const SPECIAL_SLUG_MAP: Record<string, string> = {
  'kommo_o': 'kommo-o',
  'hakamo_o': 'hakamo-o',
  'jangmo_o': 'jangmo-o',
  'ho_oh': 'ho-oh',
  'mr_mime': 'mr-mime',
  'mr_rime': 'mr-rime',
  'mime_jr': 'mime-jr',
  'tapu_koko': 'tapu-koko',
  'tapu_lele': 'tapu-lele',
  'tapu_bulu': 'tapu-bulu',
  'tapu_fini': 'tapu-fini',
  'flabebe': 'flab-b',
  'porygon_z': 'porygon-z',
  'wo_chien': 'wo-chien',
  'chien_pao': 'chien-pao',
  'ting_lu': 'ting-lu',
  'chi_yu': 'chi-yu',
  'great_tusk': 'great-tusk',
  'scream_tail': 'scream-tail',
  'brute_bonnet': 'brute-bonnet',
  'flutter_mane': 'flutter-mane',
  'slither_wing': 'slither-wing',
  'sandy_shocks': 'sandy-shocks',
  'iron_treads': 'iron-treads',
  'iron_bundle': 'iron-bundle',
  'iron_hands': 'iron-hands',
  'iron_jugulis': 'iron-jugulis',
  'iron_moth': 'iron-moth',
  'iron_thorns': 'iron-thorns',
  'roaring_moon': 'roaring-moon',
  'iron_valiant': 'iron-valiant',
  'walking_wake': 'walking-wake',
  'iron_leaves': 'iron-leaves',
  'gouging_fire': 'gouging-fire',
  'raging_bolt': 'raging-bolt',
  'iron_boulder': 'iron-boulder',
  'iron_crown': 'iron-crown'
};

// Known Dynamax & Gigantamax capable species slugs
const DYNAMAX_SPECIES: Record<string, { isGMax: boolean; gMaxMove?: string; gMaxType?: string }> = {
  'bulbasaur': { isGMax: false },
  'ivysaur': { isGMax: false },
  'venusaur': { isGMax: true, gMaxMove: 'G-Max Vine Lash', gMaxType: 'Grass' },
  'charmander': { isGMax: false },
  'charmeleon': { isGMax: false },
  'charizard': { isGMax: true, gMaxMove: 'G-Max Wildfire', gMaxType: 'Fire' },
  'squirtle': { isGMax: false },
  'wartortle': { isGMax: false },
  'blastoise': { isGMax: true, gMaxMove: 'G-Max Cannonade', gMaxType: 'Water' },
  'caterpie': { isGMax: false },
  'metapod': { isGMax: false },
  'butterfree': { isGMax: true, gMaxMove: 'G-Max Befuddle', gMaxType: 'Bug' },
  'machop': { isGMax: false },
  'machoke': { isGMax: false },
  'machamp': { isGMax: true, gMaxMove: 'G-Max Chi Strike', gMaxType: 'Fighting' },
  'gastly': { isGMax: false },
  'haunter': { isGMax: false },
  'gengar': { isGMax: true, gMaxMove: 'G-Max Terror', gMaxType: 'Ghost' },
  'krabby': { isGMax: false },
  'kingler': { isGMax: true, gMaxMove: 'G-Max Foam Burst', gMaxType: 'Water' },
  'lapras': { isGMax: true, gMaxMove: 'G-Max Resonance', gMaxType: 'Ice' },
  'eevee': { isGMax: true, gMaxMove: 'G-Max Cuddle', gMaxType: 'Normal' },
  'snorlax': { isGMax: true, gMaxMove: 'G-Max Replenish', gMaxType: 'Normal' },
  'drilbur': { isGMax: false },
  'excadrill': { isGMax: false },
  'darumaka': { isGMax: false },
  'darmanitan': { isGMax: false },
  'cryogonal': { isGMax: false },
  'beldum': { isGMax: false },
  'metang': { isGMax: false },
  'metagross': { isGMax: false },
  'wooloo': { isGMax: false },
  'dubwool': { isGMax: false },
  'skwovet': { isGMax: false },
  'greedent': { isGMax: false },
  'falinks': { isGMax: false },
  'grookey': { isGMax: false },
  'thwackey': { isGMax: false },
  'rillaboom': { isGMax: true, gMaxMove: 'G-Max Drum Solo', gMaxType: 'Grass' },
  'scorbunny': { isGMax: false },
  'raboot': { isGMax: false },
  'cinderace': { isGMax: true, gMaxMove: 'G-Max Fireball', gMaxType: 'Fire' },
  'sobble': { isGMax: false },
  'drizzile': { isGMax: false },
  'inteleon': { isGMax: true, gMaxMove: 'G-Max Hydrosnipe', gMaxType: 'Water' },
  'corviknight': { isGMax: true, gMaxMove: 'G-Max Wind Rage', gMaxType: 'Flying' },
  'drednaw': { isGMax: true, gMaxMove: 'G-Max Stonesurge', gMaxType: 'Water' },
  'coalossal': { isGMax: true, gMaxMove: 'G-Max Volcalith', gMaxType: 'Rock' },
  'flapple': { isGMax: true, gMaxMove: 'G-Max Tartness', gMaxType: 'Grass' },
  'appletun': { isGMax: true, gMaxMove: 'G-Max Sweetness', gMaxType: 'Grass' },
  'toxtricity': { isGMax: true, gMaxMove: 'G-Max Stun Shock', gMaxType: 'Electric' },
  'duraludon': { isGMax: true, gMaxMove: 'G-Max Depletion', gMaxType: 'Dragon' },
  'melmetal': { isGMax: true, gMaxMove: 'G-Max Meltdown', gMaxType: 'Steel' }
};

export function resolvePvPokeSlug(speciesId: string): { slug: string; isShadow: boolean; formId?: string } {
  const isShadow = speciesId.endsWith('_shadow');
  let clean = speciesId.replace('_shadow', '').replace('_xs', '').toLowerCase();

  if (SPECIAL_SLUG_MAP[clean]) {
    return { slug: SPECIAL_SLUG_MAP[clean], isShadow };
  }

  // Check form suffixes like _galarian, _alolan, _hisuan, _paldean, _origin, _altered, _therian, _incarnate
  const formSuffixes: Record<string, string> = {
    '_galarian': 'galar',
    '_alolan': 'alola',
    '_hisuian': 'hisui',
    '_paldean': 'paldea',
    '_origin': 'origin',
    '_altered': 'altered',
    '_therian': 'therian',
    '_incarnate': 'incarnate',
    '_defense': 'defense',
    '_attack': 'attack',
    '_speed': 'speed',
    '_primal': 'primal',
    '_complete': 'complete',
    '_10': '10-percent',
    '_50': '50-percent',
    '_dusk': 'dusk',
    '_dawn': 'dawn',
    '_ultra': 'ultra'
  };

  for (const [suffix, formId] of Object.entries(formSuffixes)) {
    if (clean.endsWith(suffix)) {
      const base = clean.substring(0, clean.length - suffix.length);
      const finalBase = SPECIAL_SLUG_MAP[base] || base;
      return { slug: finalBase, isShadow, formId };
    }
  }

  return { slug: clean, isShadow };
}

export async function runGenerateUnifiedMeta() {
  console.log('[UnifiedMeta] Starting generation of comprehensive pokedexMetaIndex.json...');

  // 1. Sync PvPoke rankings
  await checkAndSyncPvPokeRankings(false);

  // 2. Load catalog
  const catalogPath = path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.json');
  if (!fs.existsSync(catalogPath)) {
    throw new Error(`Catalog not found at: ${catalogPath}`);
  }
  const catalog: CatalogEntry[] = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const catalogBySlug = new Map<string, CatalogEntry>(catalog.map(c => [c.slug, c]));
  const catalogByDexId = new Map<number, CatalogEntry>(catalog.map(c => [c.dexId, c]));

  // 3. Load PvE Rankings
  const pvePath = path.resolve(__dirname, '../../../frontend/src/data/pokemonRankings.json');
  let pveList: PvERankEntry[] = [];
  if (fs.existsSync(pvePath)) {
    pveList = JSON.parse(fs.readFileSync(pvePath, 'utf8'));
  }

  // Pre-calculate PvE type rankings
  // Group by charged move type and sort by dps descending
  const pveByType = new Map<string, PvERankEntry[]>();
  for (const p of pveList) {
    const t = p.bestChargedMove?.type || p.type || 'Normal';
    if (!pveByType.has(t)) pveByType.set(t, []);
    pveByType.get(t)!.push(p);
  }
  for (const list of pveByType.values()) {
    list.sort((a, b) => b.dps - a.dps);
  }

  // Pre-calculate Max Battle rankings (Attacker by type & Tank overall)
  interface MaxCandidate {
    slug: string;
    dexId: number;
    types: string[];
    attackScore: number;
    tankScore: number;
    isGMax: boolean;
    gMaxMove?: string;
    isHealer: boolean;
    primaryType: string;
  }

  const maxCandidates: MaxCandidate[] = [];
  for (const [slug, meta] of Object.entries(DYNAMAX_SPECIES)) {
    const entry = catalogBySlug.get(slug);
    if (!entry) continue;

    const baseAtk = entry.stats.attack;
    const baseDef = entry.stats.defense;
    const baseSta = entry.stats.stamina;

    // Attacker score = Atk * (isGMax ? 450 : 350) / 100
    const movePower = meta.isGMax ? 450 : 350;
    const attackScore = Math.round((baseAtk * movePower * 1.2) / 10);

    // Healer check: high HP pokemon that act as anchors with Max Spirit
    const isHealer = baseSta >= 220 || slug === 'blissey' || slug === 'snorlax' || slug === 'greedent' || slug === 'lapras';
    const healerMult = isHealer ? 1.4 : 1.0;
    const tankScore = Math.round(((baseDef * baseSta) / 100) * healerMult);

    const primaryType = meta.gMaxType || entry.types[0] || 'Normal';

    maxCandidates.push({
      slug,
      dexId: entry.dexId,
      types: entry.types,
      attackScore,
      tankScore,
      isGMax: meta.isGMax,
      gMaxMove: meta.gMaxMove,
      isHealer,
      primaryType
    });
  }

  // Group Max Candidates by Type for Attacker Rank
  const maxAttackerByType = new Map<string, MaxCandidate[]>();
  for (const c of maxCandidates) {
    for (const t of c.types) {
      if (!maxAttackerByType.has(t)) maxAttackerByType.set(t, []);
      maxAttackerByType.get(t)!.push(c);
    }
  }
  for (const list of maxAttackerByType.values()) {
    list.sort((a, b) => b.attackScore - a.attackScore);
  }

  // Sort Max Candidates for Tank Rank
  const maxTanks = [...maxCandidates].sort((a, b) => b.tankScore - a.tankScore);

  // 4. Load PvPoke rankings for 4 leagues
  const pvpData: Record<LeagueKey, any[]> = {
    great: loadStoredLeagueRankings('great') || [],
    ultra: loadStoredLeagueRankings('ultra') || [],
    master: loadStoredLeagueRankings('master') || [],
    little: loadStoredLeagueRankings('little') || []
  };

  // Map each league by slug
  const pvpBySlug = new Map<string, Record<LeagueKey, { rank: number; score: number; moveset: string[]; isShadow?: boolean } | null>>();

  for (const [leagueKey, entries] of Object.entries(pvpData) as [LeagueKey, any[]][]) {
    entries.forEach((entry, idx) => {
      const rank = idx + 1;
      const { slug, isShadow, formId } = resolvePvPokeSlug(entry.speciesId);

      if (!pvpBySlug.has(slug)) {
        pvpBySlug.set(slug, { great: null, ultra: null, master: null, little: null });
      }

      const current = pvpBySlug.get(slug)![leagueKey];
      // If we don't have this league yet, or if current shadow/non-shadow has a better rank, take the best
      if (!current || rank < current.rank) {
        pvpBySlug.get(slug)![leagueKey] = {
          rank,
          score: entry.score,
          moveset: entry.moveset || [],
          isShadow
        };
      }
    });
  }

  // 5. Construct Unified Meta Index
  const metaIndex: Record<string, any> = {};

  for (const entry of catalog) {
    const slug = entry.slug;
    const pvpRanks = pvpBySlug.get(slug) || { great: null, ultra: null, master: null, little: null };

    // Find best PvE match
    const pveMatches = pveList.filter(p => p.pokedexId === entry.dexId);
    let bestPve: any = null;
    if (pveMatches.length > 0) {
      // Pick best DPS entry
      const best = [...pveMatches].sort((a, b) => b.dps - a.dps)[0];
      const chargedType = best.bestChargedMove?.type || best.type || 'Normal';
      const typeList = pveByType.get(chargedType) || [];
      const typeRankIdx = typeList.findIndex(p => p.pokedexId === best.pokedexId && p.name === best.name);
      const overallRank = pveList.findIndex(p => p.pokedexId === best.pokedexId && p.name === best.name) + 1;

      // Find all types where this Pokémon species is ranked
      const typeRanks: Array<{ type: string; rank: number; dps: number }> = [];
      for (const [t, list] of pveByType.entries()) {
        const matchIdx = list.findIndex(p => p.pokedexId === entry.dexId);
        if (matchIdx !== -1) {
          const rank = matchIdx + 1;
          const isStab = entry.types.includes(t);
          // Include if STAB type and rank <= 50, or non-STAB and top tier (rank <= 20)
          if ((isStab && rank <= 50) || (!isStab && rank <= 20)) {
            typeRanks.push({
              type: t,
              rank,
              dps: Math.round(list[matchIdx].dps * 10) / 10
            });
          }
        }
      }
      typeRanks.sort((a, b) => a.rank - b.rank);

      bestPve = {
        overallRank: overallRank > 0 ? overallRank : 1,
        typeRank: {
          type: typeRanks[0]?.type || chargedType,
          rank: typeRanks[0]?.rank || (typeRankIdx >= 0 ? typeRankIdx + 1 : 1)
        },
        typeRanks,
        score: best.pveScore,
        dps: Math.round(best.dps * 10) / 10,
        bestMoveset: {
          fast: best.bestFastMove?.name,
          charged: best.bestChargedMove?.name
        }
      };
    }

    // Find Max Battle stats
    const maxCandidate = maxCandidates.find(c => c.slug === slug);
    let maxBattleMeta: any = null;
    if (maxCandidate) {
      const typeList = maxAttackerByType.get(maxCandidate.primaryType) || [];
      const atkRank = typeList.findIndex(c => c.slug === slug) + 1;
      const tankRank = maxTanks.findIndex(c => c.slug === slug) + 1;

      maxBattleMeta = {
        isMax: true,
        isGigantamax: maxCandidate.isGMax,
        attackerRank: {
          type: maxCandidate.primaryType,
          rank: atkRank > 0 ? atkRank : 1,
          score: maxCandidate.attackScore,
          maxMove: maxCandidate.gMaxMove || `Max ${maxCandidate.primaryType}`
        },
        tankRank: {
          rank: tankRank > 0 ? tankRank : 1,
          score: maxCandidate.tankScore,
          isHealer: maxCandidate.isHealer
        }
      };
    }

    // Only include if has at least one meta data point
    const hasPvp = pvpRanks.great || pvpRanks.ultra || pvpRanks.master || pvpRanks.little;
    if (hasPvp || bestPve || maxBattleMeta) {
      metaIndex[slug] = {
        slug,
        dexId: entry.dexId,
        pvp: pvpRanks,
        pve: bestPve,
        maxBattle: maxBattleMeta
      };
    }
  }

  // 6. Write out unified index
  const frontendOut = path.resolve(__dirname, '../../../frontend/src/data/pokedexMetaIndex.json');
  const backendOut = path.resolve(__dirname, '../../data/pokedexMetaIndex.json');

  const jsonStr = JSON.stringify(metaIndex);
  fs.writeFileSync(frontendOut, jsonStr, 'utf8');
  fs.writeFileSync(backendOut, jsonStr, 'utf8');

  console.log(`[UnifiedMeta] Successfully generated pokedexMetaIndex.json with ${Object.keys(metaIndex).length} meta entries!`);
  console.log(`[UnifiedMeta] Saved to: ${frontendOut} (${(Buffer.byteLength(jsonStr) / 1024).toFixed(1)} KB)`);

  return metaIndex;
}

if (require.main === module) {
  runGenerateUnifiedMeta().catch(err => {
    console.error('[UnifiedMeta] Fatal error generating meta index:', err);
    process.exit(1);
  });
}
