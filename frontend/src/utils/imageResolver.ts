import { pokemonRankings, type PokemonRankData } from '../data/pokemonRankings';
import { apiFetch, CLOUD_RUN_BACKEND_URL } from '../config';
let basePokemonNamesCache: string[] | null = null;

function getPokemonRankings(): PokemonRankData[] {
  return pokemonRankings;
}

/**
 * Converts any image URL to a Base64 data URI for safe html-to-image exports.
 * 1. Checks if already data: URL.
 * 2. Attempts DOM canvas draw if already loaded and non-tainted.
 * 3. Fetches same-origin/relative assets directly.
 * 4. Proxies via apiFetch (/api/proxy-image?url=...) with Cloud Run fallback.
 * 5. Direct Cloud Run fallback.
 * 6. Direct fetch with CORS mode.
 */
async function _fetchImageAsBase64Internal(url: string, imgElement?: HTMLImageElement): Promise<string> {
  if (!url || typeof url !== 'string' || url.startsWith('data:')) return url || '';

  // 1. Canvas conversion if DOM image is completely loaded
  if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(imgElement, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        if (dataUrl && dataUrl.startsWith('data:image') && dataUrl.length > 100) {
          return dataUrl;
        }
      }
    } catch {
      // Tainted canvas -> continue to network fetch
    }
  }

  // 2. Direct fetch for relative/same-origin assets
  if (url.startsWith('/') || (typeof window !== 'undefined' && url.startsWith(window.location.origin))) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.blob();
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string) || url);
          reader.onerror = () => resolve(url);
          reader.readAsDataURL(blob);
        });
      }
    } catch {
      // Continue to proxy
    }
  }

  // 3. Backend Proxy with Cloud Run fallback
  try {
    const res = await apiFetch(`/api/proxy-image?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const blob = await res.blob();
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string) || url);
        reader.onerror = () => resolve(url);
        reader.readAsDataURL(blob);
      });
    }
  } catch {
    // Continue
  }

  // 4. Direct Cloud Run proxy fallback if apiFetch failed
  try {
    const directCloudRunUrl = `${CLOUD_RUN_BACKEND_URL}/api/proxy-image?url=${encodeURIComponent(url)}`;
    const res = await fetch(directCloudRunUrl);
    if (res.ok) {
      const blob = await res.blob();
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string) || url);
        reader.onerror = () => resolve(url);
        reader.readAsDataURL(blob);
      });
    }
  } catch {
    // Continue
  }

  // 5. Direct cross-origin fetch
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (res.ok) {
      const blob = await res.blob();
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string) || url);
        reader.onerror = () => resolve(url);
        reader.readAsDataURL(blob);
      });
    }
  } catch {
    // Return original
  }

  return url;
}

export async function fetchImageAsBase64(url: string, imgElement?: HTMLImageElement): Promise<string> {
  const timeoutPromise = new Promise<string>((resolve) => 
    setTimeout(() => resolve(url || ''), 2500)
  );
  return Promise.race([_fetchImageAsBase64Internal(url, imgElement), timeoutPromise]);
}

export const SHADOW_ICON_URL = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Raids/shadow_icon.png";
export const SHADOW_ICON_FALLBACK = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Rocket/ic_shadow.png";
export const SHADOW_ICON_FINAL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shadow-ball.png";

export const MEGA_ICON_URL = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Megas%20and%20Primals/pokemon_details_cp_mega.png";
export const MEGA_ICON_FALLBACK = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Ui/mega_evolution.png";
export const MEGA_ICON_FINAL = "https://img.pokemondb.net/sprites/items/mega-ring.png";

export const PRIMAL_ICON_URL = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Megas%20and%20Primals/tx_raid_coin_primal.png";
export const PRIMAL_ICON_FALLBACK = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Ui/mega_evolution.png";
export const PRIMAL_ICON_FINAL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

export function handleShadowIconError(img: HTMLImageElement): void {
  if (img.src === SHADOW_ICON_URL) {
    img.src = SHADOW_ICON_FALLBACK;
  } else {
    img.onerror = null;
    img.src = SHADOW_ICON_FINAL;
  }
}

export function handleMegaIconError(img: HTMLImageElement): void {
  if (img.src === MEGA_ICON_URL) {
    img.src = MEGA_ICON_FALLBACK;
  } else {
    img.onerror = null;
    img.src = MEGA_ICON_FINAL;
  }
}

export function handlePrimalIconError(img: HTMLImageElement): void {
  if (img.src === PRIMAL_ICON_URL) {
    img.src = PRIMAL_ICON_FALLBACK;
  } else {
    img.onerror = null;
    img.src = PRIMAL_ICON_FINAL;
  }
}

// Explicit mapping of special forms, fusions, Megas and regional variants to exact PokeAPI IDs & PokemonDB slugs
export const SPECIAL_FORM_ARTWORK_MAP: Record<string, { pokeApiId: number; dbSlug: string }> = {
  // Necrozma Fusions & Ultra Form
  "dusk mane necrozma": { pokeApiId: 10155, dbSlug: "necrozma-dusk-mane" },
  "necrozma (dusk mane)": { pokeApiId: 10155, dbSlug: "necrozma-dusk-mane" },
  "dawn wings necrozma": { pokeApiId: 10156, dbSlug: "necrozma-dawn-wings" },
  "necrozma (dawn wings)": { pokeApiId: 10156, dbSlug: "necrozma-dawn-wings" },
  "ultra necrozma": { pokeApiId: 10157, dbSlug: "necrozma-ultra" },
  "necrozma (ultra)": { pokeApiId: 10157, dbSlug: "necrozma-ultra" },

  // Kyurem Fusions
  "black kyurem": { pokeApiId: 10022, dbSlug: "kyurem-black" },
  "kyurem (black)": { pokeApiId: 10022, dbSlug: "kyurem-black" },
  "white kyurem": { pokeApiId: 10023, dbSlug: "kyurem-white" },
  "kyurem (white)": { pokeApiId: 10023, dbSlug: "kyurem-white" },

  // Origin Formes
  "dialga (origin)": { pokeApiId: 10245, dbSlug: "dialga-origin" },
  "dialga (origin forme)": { pokeApiId: 10245, dbSlug: "dialga-origin" },
  "origin dialga": { pokeApiId: 10245, dbSlug: "dialga-origin" },
  "palkia (origin)": { pokeApiId: 10246, dbSlug: "palkia-origin" },
  "palkia (origin forme)": { pokeApiId: 10246, dbSlug: "palkia-origin" },
  "origin palkia": { pokeApiId: 10246, dbSlug: "palkia-origin" },
  "giratina (origin)": { pokeApiId: 10007, dbSlug: "giratina-origin" },
  "giratina (origin forme)": { pokeApiId: 10007, dbSlug: "giratina-origin" },
  "origin giratina": { pokeApiId: 10007, dbSlug: "giratina-origin" },

  // Therian Formes
  "landorus (therian)": { pokeApiId: 10021, dbSlug: "landorus-therian" },
  "landorus (therian forme)": { pokeApiId: 10021, dbSlug: "landorus-therian" },
  "therian landorus": { pokeApiId: 10021, dbSlug: "landorus-therian" },
  "thundurus (therian)": { pokeApiId: 10020, dbSlug: "thundurus-therian" },
  "thundurus (therian forme)": { pokeApiId: 10020, dbSlug: "thundurus-therian" },
  "therian thundurus": { pokeApiId: 10020, dbSlug: "thundurus-therian" },
  "tornadus (therian)": { pokeApiId: 10019, dbSlug: "tornadus-therian" },
  "tornadus (therian forme)": { pokeApiId: 10019, dbSlug: "tornadus-therian" },
  "therian tornadus": { pokeApiId: 10019, dbSlug: "tornadus-therian" },
  "enamorus (therian)": { pokeApiId: 10249, dbSlug: "enamorus-therian" },
  "enamorus (therian forme)": { pokeApiId: 10249, dbSlug: "enamorus-therian" },

  // Megas & Primals
  "mega mewtwo x": { pokeApiId: 10043, dbSlug: "mewtwo-mega-x" },
  "mega mewtwo y": { pokeApiId: 10044, dbSlug: "mewtwo-mega-y" },
  "mega charizard x": { pokeApiId: 10034, dbSlug: "charizard-mega-x" },
  "mega charizard y": { pokeApiId: 10035, dbSlug: "charizard-mega-y" },
  "mega metagross": { pokeApiId: 10076, dbSlug: "metagross-mega" },
  "mega rayquaza": { pokeApiId: 10079, dbSlug: "rayquaza-mega" },
  "primal kyogre": { pokeApiId: 10077, dbSlug: "kyogre-primal" },
  "kyogre (primal)": { pokeApiId: 10077, dbSlug: "kyogre-primal" },
  "primal groudon": { pokeApiId: 10078, dbSlug: "groudon-primal" },
  "groudon (primal)": { pokeApiId: 10078, dbSlug: "groudon-primal" },
  "mega lucario": { pokeApiId: 10059, dbSlug: "lucario-mega" },
  "mega garchomp": { pokeApiId: 10058, dbSlug: "garchomp-mega" },
  "mega tyranitar": { pokeApiId: 10049, dbSlug: "tyranitar-mega" },
  "mega salamence": { pokeApiId: 10089, dbSlug: "salamence-mega" },
  "mega gardevoir": { pokeApiId: 10051, dbSlug: "gardevoir-mega" },
  "mega gallade": { pokeApiId: 10068, dbSlug: "gallade-mega" },
  "mega gengar": { pokeApiId: 10038, dbSlug: "gengar-mega" },
  "mega heracross": { pokeApiId: 10047, dbSlug: "heracross-mega" },
  "mega pinsir": { pokeApiId: 10040, dbSlug: "pinsir-mega" },
  "mega scizor": { pokeApiId: 10046, dbSlug: "scizor-mega" },
  "mega alakazam": { pokeApiId: 10037, dbSlug: "alakazam-mega" },
  "mega blaziken": { pokeApiId: 10050, dbSlug: "blaziken-mega" },
  "mega sceptile": { pokeApiId: 10065, dbSlug: "sceptile-mega" },
  "mega swampert": { pokeApiId: 10064, dbSlug: "swampert-mega" },
  "mega venusaur": { pokeApiId: 10033, dbSlug: "venusaur-mega" },
  "mega blastoise": { pokeApiId: 10036, dbSlug: "blastoise-mega" },
  "mega houndoom": { pokeApiId: 10048, dbSlug: "houndoom-mega" },
  "mega aggron": { pokeApiId: 10053, dbSlug: "aggron-mega" },
  "mega gyarados": { pokeApiId: 10041, dbSlug: "gyarados-mega" },
  "mega aerodactyl": { pokeApiId: 10042, dbSlug: "aerodactyl-mega" },
  "mega ampharos": { pokeApiId: 10045, dbSlug: "ampharos-mega" },
  "mega banette": { pokeApiId: 10056, dbSlug: "banette-mega" },
  "mega absol": { pokeApiId: 10057, dbSlug: "absol-mega" },
  "mega manectric": { pokeApiId: 10055, dbSlug: "manectric-mega" },
  "mega glalie": { pokeApiId: 10074, dbSlug: "glalie-mega" },
  "mega abomasnow": { pokeApiId: 10060, dbSlug: "abomasnow-mega" },
  "mega beedrill": { pokeApiId: 10090, dbSlug: "beedrill-mega" },
  "mega pidgeot": { pokeApiId: 10073, dbSlug: "pidgeot-mega" },
  "mega kangaskhan": { pokeApiId: 10039, dbSlug: "kangaskhan-mega" },
  "mega lopunny": { pokeApiId: 10088, dbSlug: "lopunny-mega" },
  "mega altaria": { pokeApiId: 10067, dbSlug: "altaria-mega" },
  "mega latios": { pokeApiId: 10062, dbSlug: "latios-mega" },
  "mega latias": { pokeApiId: 10063, dbSlug: "latias-mega" },
  "mega diancie": { pokeApiId: 10075, dbSlug: "diancie-mega" },
  "mega sableye": { pokeApiId: 10066, dbSlug: "sableye-mega" },
  "mega mawile": { pokeApiId: 10052, dbSlug: "mawile-mega" },
  "mega medicham": { pokeApiId: 10054, dbSlug: "medicham-mega" },
  "mega sharpedo": { pokeApiId: 10070, dbSlug: "sharpedo-mega" },
  "mega camerupt": { pokeApiId: 10071, dbSlug: "camerupt-mega" },
  "mega audino": { pokeApiId: 10069, dbSlug: "audino-mega" },
  "mega slowbro": { pokeApiId: 10072, dbSlug: "slowbro-mega" },
  "mega steelix": { pokeApiId: 10087, dbSlug: "steelix-mega" },

  // Galar & Hisui & Paldea
  "urshifu (single strike)": { pokeApiId: 892, dbSlug: "urshifu-single-strike" },
  "urshifu (rapid strike)": { pokeApiId: 10191, dbSlug: "urshifu-rapid-strike" },
  "zacian (crowned sword)": { pokeApiId: 10188, dbSlug: "zacian-crowned" },
  "crowned sword zacian": { pokeApiId: 10188, dbSlug: "zacian-crowned" },
  "zamazenta (crowned shield)": { pokeApiId: 10189, dbSlug: "zamazenta-crowned" },
  "crowned shield zamazenta": { pokeApiId: 10189, dbSlug: "zamazenta-crowned" },
  "origin forme dialga": { pokeApiId: 10245, dbSlug: "dialga-origin" },
  "origin forme palkia": { pokeApiId: 10246, dbSlug: "palkia-origin" },
  "origin forme giratina": { pokeApiId: 10007, dbSlug: "giratina-origin" },
  "keldeo (resolute forme)": { pokeApiId: 10024, dbSlug: "keldeo-resolute" },
  "mega greninja": { pokeApiId: 10116, dbSlug: "greninja-ash" },
  "mega delphox": { pokeApiId: 655, dbSlug: "delphox" },
  "mega dragonite": { pokeApiId: 149, dbSlug: "dragonite" },
  "galarian darmanitan": { pokeApiId: 10177, dbSlug: "darmanitan-galar" },
  "galarian darmanitan (zen mode)": { pokeApiId: 10178, dbSlug: "darmanitan-galar-zen" },
  "galarian yamask": { pokeApiId: 10179, dbSlug: "yamask-galar" },
  "galarian slowbro": { pokeApiId: 10165, dbSlug: "slowbro-galar" },
  "galarian slowking": { pokeApiId: 10172, dbSlug: "slowking-galar" },
  "galarian farfetch'd": { pokeApiId: 10166, dbSlug: "farfetchd-galar" },
  "galarian weezing": { pokeApiId: 10167, dbSlug: "weezing-galar" },
  "galarian stunfisk": { pokeApiId: 10180, dbSlug: "stunfisk-galar" },
  "galarian articuno": { pokeApiId: 10169, dbSlug: "articuno-galar" },
  "galarian zapdos": { pokeApiId: 10170, dbSlug: "zapdos-galar" },
  "galarian moltres": { pokeApiId: 10171, dbSlug: "moltres-galar" },
  "hisuian typhlosion": { pokeApiId: 10232, dbSlug: "typhlosion-hisui" },
  "hisuian samurott": { pokeApiId: 10236, dbSlug: "samurott-hisui" },
  "hisuian decidueye": { pokeApiId: 10244, dbSlug: "decidueye-hisui" },
  "hisuian arcanine": { pokeApiId: 10229, dbSlug: "arcanine-hisui" },
  "hisuian electrode": { pokeApiId: 10231, dbSlug: "electrode-hisui" },
  "hisuian qwilfish": { pokeApiId: 10234, dbSlug: "qwilfish-hisui" },
  "hisuian sneasel": { pokeApiId: 10235, dbSlug: "sneasel-hisui" },
  "hisuian braviary": { pokeApiId: 10240, dbSlug: "braviary-hisui" },
  "hisuian zoroark": { pokeApiId: 10239, dbSlug: "zoroark-hisui" },
  "hisuian goodra": { pokeApiId: 10241, dbSlug: "goodra-hisui" },
  "hisuian avalugg": { pokeApiId: 10243, dbSlug: "avalugg-hisui" },
  "hisuian lilligant": { pokeApiId: 10237, dbSlug: "lilligant-hisui" },
  "alolan raichu": { pokeApiId: 10100, dbSlug: "raichu-alola" },
  "alolan marowak": { pokeApiId: 10115, dbSlug: "marowak-alola" },
  "alolan exeggutor": { pokeApiId: 10114, dbSlug: "exeggutor-alola" },
  "alolan ninetales": { pokeApiId: 10104, dbSlug: "ninetales-alola" },
  "alolan sandslash": { pokeApiId: 10102, dbSlug: "sandslash-alola" },
  "alolan muk": { pokeApiId: 10113, dbSlug: "muk-alola" },
  "alolan golem": { pokeApiId: 10111, dbSlug: "golem-alola" },
};

export function getBasePokemonNames(): string[] {
  if (basePokemonNamesCache) return basePokemonNamesCache;
  
  const namesSet = new Set<string>();
  
  // Custom legendaries / popular pokemon names that might be in event titles but not rankings
  const extraBaseNames = [
    'Solgaleo', 'Lunala', 'Necrozma', 'Kyurem', 'Zekrom', 'Reshiram', 'Palkia', 'Dialga', 'Giratina',
    'Raichu', 'Pikachu', 'Eevee', 'Charizard', 'Blastoise', 'Venusaur', 'Mewtwo', 'Mew', 'Celebi',
    'Jirachi', 'Deoxys', 'Darkrai', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Xerneas',
    'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini',
    'Cosmog', 'Cosmoem', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord',
    'Poipole', 'Naganadel', 'Stakataka', 'Blacephalon', 'Zeraora', 'Meltan', 'Melmetal', 'Zacian', 'Zamazenta',
    'Eternatus', 'Zarude', 'Regieleki', 'Regidrago', 'Roaring Moon', 'Iron Valiant', 'Koraidon', 'Miraidon',
    'Frigibax', 'Arctibax', 'Baxcalibur', 'Gimmighoul', 'Gholdengo', 'Rillaboom', 'Cinderace', 'Inteleon',
    'Groudon', 'Kyogre', 'Rayquaza'
  ];
  extraBaseNames.forEach(n => namesSet.add(n));

  for (const p of getPokemonRankings()) {
    const simplest = p.name.replace(/^Shadow\s+/i, '')
                            .replace(/^Mega\s+/i, '')
                            .replace(/^Primal\s+/i, '')
                            .replace(/\s*\(.*?\)\s*/g, '')
                            .trim();
    if (simplest) {
      namesSet.add(simplest);
    }
  }
  
  basePokemonNamesCache = Array.from(namesSet).sort((a, b) => b.length - a.length);
  return basePokemonNamesCache;
}

export function getBasePokemonName(name: string): string {
  if (!name) return '';
  let baseName = name.trim();

  // If title contains multiple pokemon names separated by comma, and, or &, pick the first item
  if (baseName.includes(',')) {
    baseName = baseName.split(',')[0].trim();
  }
  if (baseName.includes(' and ')) {
    baseName = baseName.split(' and ')[0].trim();
  }
  if (baseName.includes(' & ')) {
    baseName = baseName.split(' & ')[0].trim();
  }
  if (baseName.includes(' / ')) {
    baseName = baseName.split(' / ')[0].trim();
  }

  // Remove common phrases like "in Mega Raids", "in Raids", "during Max Monday", etc.
  baseName = baseName
    .replace(/^max\s+monday:\s*/gi, '')
    .replace(/^max\s+battles:\s*/gi, '')
    .replace(/^spotlight\s+hour:\s*/gi, '')
    .replace(/^community\s+day:\s*/gi, '')
    .replace(/^raid\s+hour:\s*/gi, '')
    .replace(/^raid\s+day:\s*/gi, '')
    .replace(/^dynamax\s+/gi, '')
    .replace(/^gigantamax\s+/gi, '')
    .replace(/^g-max\s+/gi, '')
    .replace(/\s+during\s+max\s+monday/gi, '')
    .replace(/\s+during\s+max\s+battles?/gi, '')
    .replace(/\s+during/gi, '')
    .replace(/\s+in\s+mega\s+raids?/gi, '')
    .replace(/\s+in\s+shadow\s+raids?/gi, '')
    .replace(/\s+in\s+raids?/gi, '')
    .replace(/\s+raid\s+day/gi, '')
    .replace(/\s+raid\s+hour/gi, '')
    .replace(/\s+raid\s+battles/gi, '')
    .replace(/\s+raid\s+rotation/gi, '')
    .replace(/\s+raids?/gi, '')
    .replace(/\s+spotlight\s+hour/gi, '')
    .replace(/\s+community\s+day/gi, '')
    .replace(/\s+max\s+monday/gi, '')
    .replace(/\s+takeover/gi, '')
    .replace(/\s+classic/gi, '')
    .trim();

  const lowerName = baseName.toLowerCase();

  // 1. Check if the name matches a special form in our artwork map first
  const cleanSpecialKey = lowerName.replace(/^shadow\s+/i, '').replace(/\s*\(.*?\)\s*/g, '').trim();
  if (SPECIAL_FORM_ARTWORK_MAP[lowerName] || SPECIAL_FORM_ARTWORK_MAP[cleanSpecialKey]) {
    return baseName.replace(/^shadow\s+/i, '').trim();
  }

  const knownNames = getBasePokemonNames();

  for (const known of knownNames) {
    const lowerKnown = known.toLowerCase();
    if (lowerName.includes(lowerKnown)) {
      if (/mega/i.test(name)) {
        let suffix = '';
        if (/\s+x\b/i.test(name)) suffix = ' X';
        else if (/\s+y\b/i.test(name)) suffix = ' Y';
        return `Mega ${known}${suffix}`;
      }
      if (/primal/i.test(name)) {
        return `Primal ${known}`;
      }
      return known;
    }
  }

  // Fallback to manual cleaning regexes if not found in database
  baseName = baseName.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  baseName = baseName.replace(/^Shadow\s+/i, '').replace(/^Apex\s+/i, '').replace(/^Dynamax\s+/i, '').replace(/^Gigantamax\s+/i, '').replace(/^G-Max\s+/i, '').trim();

  return baseName.trim();
}

export function getPokedexIdByName(name: string): number | null {
  const cleanName = getBasePokemonName(name).toLowerCase();
  const directKey = name.toLowerCase().trim();

  // Check special form map first
  if (SPECIAL_FORM_ARTWORK_MAP[cleanName]) {
    return SPECIAL_FORM_ARTWORK_MAP[cleanName].pokeApiId;
  }
  if (SPECIAL_FORM_ARTWORK_MAP[directKey]) {
    return SPECIAL_FORM_ARTWORK_MAP[directKey].pokeApiId;
  }

  const rankings = getPokemonRankings();
  
  // First try direct match
  let found = rankings.find(p => p.name.toLowerCase() === cleanName);
  if (found) {
    return found.pokedexId;
  }
  
  // Try matching by base name of the ranking name as well
  found = rankings.find(p => getBasePokemonName(p.name).toLowerCase() === cleanName);
  if (found) {
    return found.pokedexId;
  }
  
  return null;
}

let pokemonIconOverridesCache: Record<string, string> = {};

export function setPokemonIconOverrides(overrides: Record<string, string>): void {
  pokemonIconOverridesCache = { ...(overrides || {}) };
}

export function getPokemonIconUrl(name: string, isShiny?: boolean): string {
  if (!name) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
  }

  const baseName = getBasePokemonName(name);
  const cleanKey = baseName.toLowerCase().trim();
  const directKey = name.toLowerCase().trim();

  if (isShiny) {
    if (pokemonIconOverridesCache[cleanKey + '_shiny']) {
      return pokemonIconOverridesCache[cleanKey + '_shiny'];
    }
    if (pokemonIconOverridesCache[directKey + '_shiny']) {
      return pokemonIconOverridesCache[directKey + '_shiny'];
    }
  }

  if (pokemonIconOverridesCache[cleanKey]) {
    return pokemonIconOverridesCache[cleanKey];
  }
  if (pokemonIconOverridesCache[directKey]) {
    return pokemonIconOverridesCache[directKey];
  }

  // 1. Check special form map (Dusk Mane, Dawn Wings, Mega Mewtwo X/Y, Kyurem fusions, Origins, Therians, etc.)
  const specialForm = SPECIAL_FORM_ARTWORK_MAP[cleanKey] || SPECIAL_FORM_ARTWORK_MAP[directKey];
  if (specialForm) {
    const folder = isShiny ? 'official-artwork/shiny' : 'official-artwork';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${folder}/${specialForm.pokeApiId}.png`;
  }

  const isMegaOrPrimal = /mega|primal/i.test(name);
  const folder = isShiny ? 'shiny' : 'normal';

  // If it's a Mega or Primal form, PokemonDB provides the exact 3D home sprite for form variations (e.g. blaziken-mega, charizard-mega-x, groudon-primal)
  if (isMegaOrPrimal) {
    const knownNames = getBasePokemonNames();
    const matchedKnown = knownNames.find(kn => name.toLowerCase().includes(kn.toLowerCase()));
    let base = matchedKnown ? matchedKnown.toLowerCase() : baseName.toLowerCase();
    // Strip mega/primal prefix/suffix
    base = base.replace(/^mega\s+/i, '').replace(/^primal\s+/i, '').replace(/\s+mega$/i, '').replace(/\s+primal$/i, '').trim();
    // Strip trailing form identifiers like " x" or " y" from base (e.g. "mewtwo y" → "mewtwo")
    base = base.replace(/\s+[xy]$/i, '').trim();

    // Strip parenthetical suffixes from name for suffix detection (e.g. "Mega Mewtwo Y (Fighting)" → "Mega Mewtwo Y")
    const nameForSuffix = name.replace(/\s*\(.*?\)\s*/g, '').trim();

    let suffix = '';
    if (/\s+x\b/i.test(nameForSuffix)) {
      suffix = '-x';
    } else if (/\s+y\b/i.test(nameForSuffix)) {
      suffix = '-y';
    }

    let formClean = '';
    if (/primal/i.test(name)) {
      formClean = `${base}-primal`;
    } else {
      formClean = `${base}-mega${suffix}`;
    }

    formClean = formClean.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `https://img.pokemondb.net/sprites/home/${folder}/${formClean}.png`;
  }

  // Standard non-mega/primal Pokemon: Use ZeChrales PogoAssets (official Pokémon GO icons) for Gen 1-5 (<650)
  const pokedexId = getPokedexIdByName(baseName) || getPokedexIdByName(name);
  if (pokedexId && pokedexId < 650) {
    const padId = pokedexId.toString().padStart(3, '0');
    const shinySuffix = isShiny ? '_shiny' : '';
    return `https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_${padId}_00${shinySuffix}.png`;
  }

  // Gen 6+ (Pokedex ID >= 650) or fallback to PokemonDB
  let clean = baseName.toLowerCase()
    .replace('shadow ', '')
    .replace('apex ', '')
    .replace(/\s*\(.*?\)\s*/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return `https://img.pokemondb.net/sprites/home/${folder}/${clean}.png`;
}

export function handlePokemonImageError(img: HTMLImageElement, name: string, isShiny?: boolean): void {
  if (!name) {
    img.onerror = null;
    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    return;
  }

  const baseName = getBasePokemonName(name);
  const cleanKey = baseName.toLowerCase().trim();
  const directKey = name.toLowerCase().trim();
  const specialForm = SPECIAL_FORM_ARTWORK_MAP[cleanKey] || SPECIAL_FORM_ARTWORK_MAP[directKey];

  // Special form fallback pipeline (PokeAPI Official Artwork -> PokemonDB Home -> PokeAPI Home 3D -> Default)
  if (specialForm) {
    if (!img.getAttribute('data-fb-special-db')) {
      img.setAttribute('data-fb-special-db', 'true');
      const folder = isShiny ? 'shiny' : 'normal';
      img.src = `https://img.pokemondb.net/sprites/home/${folder}/${specialForm.dbSlug}.png`;
      return;
    }
    if (!img.getAttribute('data-fb-special-home')) {
      img.setAttribute('data-fb-special-home', 'true');
      const folder = isShiny ? 'home/shiny' : 'home';
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${folder}/${specialForm.pokeApiId}.png`;
      return;
    }
  }

  const isMegaOrPrimal = /mega|primal/i.test(name);

  // Fallback Step 1 for Mega/Primal: Try PokemonDB exact form name sprite first to avoid bouncing to base pokedexId
  if (isMegaOrPrimal && !img.getAttribute('data-fb-form-db')) {
    img.setAttribute('data-fb-form-db', 'true');
    const knownNames = getBasePokemonNames();
    const matchedKnown = knownNames.find(kn => name.toLowerCase().includes(kn.toLowerCase()));
    let base = matchedKnown ? matchedKnown.toLowerCase() : baseName.toLowerCase();
    base = base.replace(/^mega\s+/i, '').replace(/^primal\s+/i, '').replace(/\s+mega$/i, '').replace(/\s+primal$/i, '').trim();
    // Strip trailing form identifiers like " x" or " y" from base (e.g. "mewtwo y" → "mewtwo")
    base = base.replace(/\s+[xy]$/i, '').trim();

    // Strip parenthetical suffixes from name for suffix detection
    const nameForSuffix = name.replace(/\s*\(.*?\)\s*/g, '').trim();
    let suffix = '';
    if (/\s+x\b/i.test(nameForSuffix)) suffix = '-x';
    else if (/\s+y\b/i.test(nameForSuffix)) suffix = '-y';

    let formClean = /primal/i.test(name) ? `${base}-primal` : `${base}-mega${suffix}`;
    formClean = formClean.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const folder = isShiny ? 'shiny' : 'normal';
    const formUrl = `https://img.pokemondb.net/sprites/home/${folder}/${formClean}.png`;

    if (img.src !== formUrl) {
      img.src = formUrl;
      return;
    }
  }

  const pokedexId = getPokedexIdByName(baseName) || getPokedexIdByName(name);

  // Fallback Step 2: Base Pokemon Sprite (ZeChrales PogoAssets for Gen 1-5 or PokeAPI Home 3D)
  if (pokedexId && !img.getAttribute('data-fb-home')) {
    img.setAttribute('data-fb-home', 'true');
    if (pokedexId < 650) {
      const padId = pokedexId.toString().padStart(3, '0');
      const shinySuffix = isShiny ? '_shiny' : '';
      img.src = `https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_${padId}_00${shinySuffix}.png`;
    } else {
      const folder = isShiny ? 'home/shiny' : 'home';
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${folder}/${pokedexId}.png`;
    }
    return;
  }

  // Fallback Step 3: PokemonDB Home Normal/Shiny Sprite
  if (!img.getAttribute('data-fb-db')) {
    img.setAttribute('data-fb-db', 'true');
    const clean = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const folder = isShiny ? 'shiny' : 'normal';
    img.src = `https://img.pokemondb.net/sprites/home/${folder}/${clean}.png`;
    return;
  }

  // Fallback Step 4: PokeAPI Official Artwork
  if (pokedexId && !img.getAttribute('data-fb-artwork')) {
    img.setAttribute('data-fb-artwork', 'true');
    const folder = isShiny ? 'official-artwork/shiny' : 'official-artwork';
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${folder}/${pokedexId}.png`;
    return;
  }

  // Fallback Step 5: PokeAPI Front Default 2D Sprite
  if (pokedexId && !img.getAttribute('data-fb-default')) {
    img.setAttribute('data-fb-default', 'true');
    const folder = isShiny ? 'shiny' : '';
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${folder ? folder + '/' : ''}${pokedexId}.png`;
    return;
  }

  // Final Fallback: Pokéball
  img.onerror = null;
  img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
}

/**
 * Resolves an image URL by mapping hotlinked Leek Duck assets to legal, public-domain,
 * or community-hosted alternatives (like Unsplash for event banners and ZeChrales/PogoAssets for Pokémon sprites).
 */
export function resolveImage(url: string | undefined, eventType?: string, name?: string, isShiny?: boolean): string {
  if (isShiny && name) {
    return getPokemonIconUrl(name, true);
  }

  // CRITICAL RULE: If a Pokemon name is present in the event (Spotlight, Community Day, Max Monday, Raids, etc.),
  // ALWAYS FIRST point to the Pokemon's sprite photo! NEVER return Unsplash/placeholder backgrounds initially!
  if (name) {
    const baseName = getBasePokemonName(name);
    const knownNames = getBasePokemonNames();
    const hasKnownPokemon = knownNames.some(kn => name.toLowerCase().includes(kn.toLowerCase()) || (baseName && baseName.toLowerCase().includes(kn.toLowerCase())));

    if (hasKnownPokemon && baseName) {
      return getPokemonIconUrl(name, isShiny);
    }
  }


  if (!url) {
    return getFallbackImage(eventType, name, isShiny);
  }

  // If it's a Leek Duck Pokémon icon, redirect to ZeChrales' PogoAssets (exact same filenames)
  if (url.includes('cdn.leekduck.com/assets/img/pokemon_icons/')) {
    if (url.includes('pokemon_icon_000.png')) {
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    }
    
    // For Gen 6+ pokemons (Pokedex ID >= 650), ZeChrales repository will 404, causing flashing.
    // We bypass ZeChrales and directly return PokemonDB sprites when a name is provided.
    if (name) {
      const match = url.match(/pokemon_icon_(\d+)_/) || url.match(/pm(\d+)[._]/);
      if (match) {
        const dexId = parseInt(match[1], 10);
        const nameLower = name.toLowerCase();
        if (dexId >= 650 || nameLower.includes('primal') || nameLower.includes('mega') || isShiny) {
          return getPokemonIconUrl(name, isShiny);
        }
      }
    }

    return url.replace(
      'https://cdn.leekduck.com/assets/img/pokemon_icons/',
      'https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/'
    );
  }

  // If it's a Leek Duck event image, redirect to high-quality, royalty-free Unsplash images
  if (url.includes('cdn.leekduck.com/assets/img/events/')) {
    const lowerUrl = url.toLowerCase();
    
    // Intercept default/placeholder images or any event image to use pokemon sprite if name has a known pokemon
    if (name) {
      const baseName = getBasePokemonName(name);
      const knownNames = getBasePokemonNames();
      const hasPokemon = knownNames.some(kn => name.toLowerCase().includes(kn.toLowerCase()));
      if (hasPokemon && baseName) {
        return getPokemonIconUrl(name, isShiny);
      }
    }

    
    if (lowerUrl.includes('rocket-takeover') || (eventType && eventType.toLowerCase().includes('rocket'))) {
      return 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop'; // Dark purple glowing atmosphere
    }
    if (lowerUrl.includes('raidhour') || lowerUrl.includes('raid-hour') || (eventType && eventType.toLowerCase().includes('raid-hour'))) {
      return 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop'; // Energetic stage spotlight / arena
    }
    if (lowerUrl.includes('pokemonspotlighthour') || lowerUrl.includes('spotlight') || (eventType && eventType.toLowerCase().includes('spotlight'))) {
      return 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=600&auto=format&fit=crop'; // Stage/Spotlight beam
    }
    if (lowerUrl.includes('communityday') || lowerUrl.includes('community-day') || (eventType && eventType.toLowerCase().includes('community-day'))) {
      return 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=600&auto=format&fit=crop'; // Bright sky with colorful balloons
    }
    if (lowerUrl.includes('mega-default') || (eventType && eventType.toLowerCase().includes('mega'))) {
      return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'; // Abstract energetic swirl
    }
    if (lowerUrl.includes('events-default-img') || lowerUrl.includes('default')) {
      return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop'; // Colorful abstract design
    }
  }

  return url;
}

/**
 * Returns a fallback image URL for a given event type or Pokémon name.
 */
export function getFallbackImage(eventType?: string, name?: string, isShiny?: boolean): string {
  if (name) {
    try {
      const baseName = getBasePokemonName(name);
      if (baseName) {
        return getPokemonIconUrl(baseName, isShiny);
      }
    } catch (e) {
      console.warn('Failed to resolve fallback icon using getPokemonIconUrl:', e);
    }
  }

  if (eventType) {
    const type = eventType.toLowerCase();
    if (type.includes('rocket')) {
      return 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop';
    }
    if (type.includes('raid-hour') || type.includes('raid')) {
      return 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop';
    }
    if (type.includes('spotlight')) {
      return 'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=600&auto=format&fit=crop';
    }
    if (type.includes('community-day')) {
      return 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?q=80&w=600&auto=format&fit=crop';
    }
  }

  return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop';
}

/**
 * Returns the exact header avatar sprite URL for an event card.
 * For Spotlight Hours, Community Days, Max Mondays/Battles, and Raids, returns the Pokémon sprite photo.
 */
export function getEventHeaderAvatar(event: { eventType?: string; name?: string; image?: string; extraData?: any }, bosses?: any[]): string {
  const type = (event.eventType || '').toLowerCase();
  const name = event.name || '';
  const imgUrl = (event.image || '').toLowerCase();

  // 1. Spotlight Hours, Community Days, Max Mondays / Max Battles:
  if (type.includes('spotlight') || type.includes('community') || type.includes('max-monday') || type.includes('max-battle') || type.includes('dynamax') || type.includes('gigantamax') ||
      imgUrl.includes('spotlight') || imgUrl.includes('community') || imgUrl.includes('max-battle') || imgUrl.includes('photo-1503095396549') || imgUrl.includes('photo-1526726538690') || imgUrl.includes('max-battles-kanto')) {
    
    let pName = event.extraData?.spotlight?.name || event.extraData?.communityday?.name || event.extraData?.communityday?.featuredPokemon;
    if (!pName) {
      pName = getBasePokemonName(name);
    }
    if (pName) {
      const knownNames = getBasePokemonNames();
      const isKnown = knownNames.some(kn => name.toLowerCase().includes(kn.toLowerCase()) || pName.toLowerCase().includes(kn.toLowerCase()));
      if (isKnown) {
        return getPokemonIconUrl(pName);
      }
    }
  }

  // 2. Raid Hours & Raid Battles with boss list
  if (bosses && bosses.length === 1 && bosses[0]?.name) {
    return getPokemonIconUrl(bosses[0].name, bosses[0].canBeShiny);
  }
  if (type.includes('raid')) {
    const pName = getBasePokemonName(name);
    if (pName) {
      const knownNames = getBasePokemonNames();
      if (knownNames.some(kn => name.toLowerCase().includes(kn.toLowerCase()))) {
        return getPokemonIconUrl(pName);
      }
    }
  }

  // 3. Fallback to standard resolveImage for other event types
  return resolveImage(event.image, event.eventType, event.name);
}

/**
 * Robustly extracts all featured Pokémon names from an event object or title string.
 */
export function extractEventPokemonNames(event: { name?: string; eventType?: string; extraData?: any }): string[] {
  if (!event) return [];
  const foundNames: string[] = [];
  const addName = (n: string) => {
    if (!n || typeof n !== 'string') return;
    const base = getBasePokemonName(n);
    if (base && !foundNames.some(existing => existing.toLowerCase() === base.toLowerCase())) {
      foundNames.push(base);
    }
  };

  const extra = event.extraData || {};

  // 1. Check Spotlight Name
  if (extra.spotlight?.name) addName(extra.spotlight.name);

  // 2. Check Community Day Name / Featured Pokemon
  if (extra.communityday?.name) addName(extra.communityday.name);
  if (extra.communityday?.featuredPokemon) addName(extra.communityday.featuredPokemon);

  // 3. Check Raid Bosses / Max Bosses arrays
  const bossLists = [extra.raidbattles?.bosses, extra.raids, extra.bosses, extra.maxbattles?.bosses, extra.dynamax];
  bossLists.forEach(list => {
    if (Array.isArray(list)) {
      list.forEach(item => {
        if (typeof item === 'string') addName(item);
        else if (typeof item === 'object' && item?.name) addName(item.name);
      });
    }
  });

  // 4. Scan event name using getBasePokemonName and known species list
  const name = event.name || '';
  if (name) {
    const baseFromTitle = getBasePokemonName(name);
    if (baseFromTitle) {
      addName(baseFromTitle);
    }

    const known = getBasePokemonNames();
    const lowerName = name.toLowerCase();

    for (const pkmn of known) {
      const lowerPkmn = pkmn.toLowerCase();
      if (lowerName.includes(lowerPkmn)) {
        addName(pkmn);
      }
    }
  }

  return foundNames;
}

