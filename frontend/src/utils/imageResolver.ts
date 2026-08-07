// pokemonRankings is loaded lazily to avoid blocking initial bundle parse (115 KB dataset)
import type { PokemonRankData } from '../data/pokemonRankings';
let pokemonRankingsCache: PokemonRankData[] | null = null;
let pokemonRankingsPromise: Promise<PokemonRankData[]> | null = null;
let basePokemonNamesCache: string[] | null = null;

function getPokemonRankings(): PokemonRankData[] {
  if (pokemonRankingsCache) return pokemonRankingsCache;
  // Synchronous fallback: if not yet loaded, start the load and return empty array.
  // EventCard image resolver works fine with just the extraBaseNames static list.
  if (!pokemonRankingsPromise) {
    pokemonRankingsPromise = import('../data/pokemonRankings').then(m => {
      pokemonRankingsCache = m.pokemonRankings;
      basePokemonNamesCache = null; // Reset cache so it rebuilds with full data on next call
      return pokemonRankingsCache!;
    });
  }
  return []; // Return empty until loaded
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

  // Remove common phrases like "in Mega Raids", "in Raids", etc.
  baseName = baseName
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
    .replace(/^raid\s+hour:\s*/gi, '')
    .replace(/^raid\s+day:\s*/gi, '')
    .replace(/^spotlight\s+hour:\s*/gi, '')
    .replace(/^community\s+day:\s*/gi, '')
    .trim();

  const knownNames = getBasePokemonNames();
  const lowerName = baseName.toLowerCase();

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
  baseName = baseName.replace(/^Shadow\s+/i, '').replace(/^Apex\s+/i, '').trim();

  return baseName.trim();
}

export function getPokedexIdByName(name: string): number | null {
  const cleanName = getBasePokemonName(name).toLowerCase();
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

export function getPokemonIconOverrides(): Record<string, string> {
  return pokemonIconOverridesCache;
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

  // Standard non-mega/primal Pokemon: try PokeAPI Pokedex ID home sprite first
  const pokedexId = getPokedexIdByName(baseName);
  if (pokedexId) {
    const homeFolder = isShiny ? 'home/shiny' : 'home';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${homeFolder}/${pokedexId}.png`;
  }

  // Fallback to PokemonDB
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

  const isMegaOrPrimal = /mega|primal/i.test(name);
  const baseName = getBasePokemonName(name);

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

  // Fallback Step 3: PokeAPI Official Artwork
  if (pokedexId && !img.getAttribute('data-fb-artwork')) {
    img.setAttribute('data-fb-artwork', 'true');
    const folder = isShiny ? 'official-artwork/shiny' : 'official-artwork';
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${folder}/${pokedexId}.png`;
    return;
  }

  // Fallback Step 4: PokeAPI Front Default 2D Sprite
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
        return getPokemonIconUrl(baseName, isShiny);
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
