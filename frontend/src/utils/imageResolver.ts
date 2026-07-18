import { pokemonRankings } from '../data/pokemonRankings';

let basePokemonNamesCache: string[] | null = null;

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

  for (const p of pokemonRankings) {
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
  let baseName = name.trim();
  
  const knownNames = getBasePokemonNames();
  const lowerName = baseName.toLowerCase();
  
  for (const known of knownNames) {
    const lowerKnown = known.toLowerCase();
    if (lowerName.includes(lowerKnown)) {
      return known;
    }
  }

  // Fallback to manual cleaning regexes if not found in database
  // 1. Remove "Mega" prefix/suffix
  const megaMatch = baseName.match(/^Mega\s+(.+)$/i);
  if (megaMatch) {
    baseName = megaMatch[1];
  } else {
    const megaSuffixMatch = baseName.match(/^(.+)\s+Mega$/i);
    if (megaSuffixMatch) {
      baseName = megaSuffixMatch[1];
    }
  }

  // 2. Remove "Primal" prefix/suffix
  const primalMatch = baseName.match(/^Primal\s+(.+)$/i);
  if (primalMatch) {
    baseName = primalMatch[1];
  } else {
    const primalSuffixMatch = baseName.match(/^(.+)\s+Primal$/i);
    if (primalSuffixMatch) {
      baseName = primalSuffixMatch[1];
    }
  }

  // 3. Remove Mega X / Y suffixes if we had mega/primal
  if (/mega|primal/i.test(name)) {
    baseName = baseName.replace(/\s+[XY]$/i, '');
  }

  // 4. Remove parentheses and everything inside them (costumes, alternate forms, etc.)
  baseName = baseName.replace(/\s*\(.*?\)\s*/g, ' ').trim();

  // 5. Remove shadow/apex
  baseName = baseName.replace(/^Shadow\s+/i, '')
                     .replace(/^Apex\s+/i, '')
                     .trim();

  // 6. Remove regional prefixes or other form prefixes
  const prefixesToRemove = [
    /^Dusk\s+Mane\s+/i,
    /^Dawn\s+Wings\s+/i,
    /^Origin\s+Forme?\s+/i,
    /^Altered\s+Forme?\s+/i,
    /^Galarian\s+/i,
    /^Alolan\s+/i,
    /^Hisuian\s+/i,
    /^Paldean\s+/i,
  ];

  for (const regex of prefixesToRemove) {
    baseName = baseName.replace(regex, '');
  }

  return baseName.trim();
}

export function getPokedexIdByName(name: string): number | null {
  const cleanName = getBasePokemonName(name).toLowerCase();
  
  // First try direct match
  let found = pokemonRankings.find(p => p.name.toLowerCase() === cleanName);
  if (found) {
    return found.pokedexId;
  }
  
  // Try matching by base name of the ranking name as well
  found = pokemonRankings.find(p => getBasePokemonName(p.name).toLowerCase() === cleanName);
  if (found) {
    return found.pokedexId;
  }
  
  return null;
}

export function getPokemonIconUrl(name: string): string {
  // Resolve base name first so we don't request "Kyurem Raid Hour" or "Solgaleo Raid Hour"
  const baseName = getBasePokemonName(name);

  // Try to find the Pokedex ID for PokeAPI home sprite first
  const pokedexId = getPokedexIdByName(baseName);
  if (pokedexId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokedexId}.png`;
  }

  // Fallback to PokemonDB only if pokedex ID was not found in pokemonRankings
  let clean = baseName.toLowerCase()
    .replace('shadow ', '')
    .replace('apex ', '')
    .replace(' (origin)', '-origin')
    .replace(' origin', '-origin')
    .replace(' (altered)', '-altered')
    .replace(' altered', '-altered')
    .replace(' (dusk mane)', '-dusk-mane')
    .replace(' (dawn wings)', '-dawn-wings')
    .replace(' (regular)', '')
    .trim();
  
  const isPrimal = clean.includes('primal');
  if (isPrimal) {
    clean = clean.replace('primal ', '').replace(' primal', '');
  }

  if (clean.startsWith('mega ')) {
    const base = clean.replace('mega ', '');
    clean = `${base}-mega`;
  }
  
  clean = clean.replace(/\s*\(.*?\)\s*/g, '').trim();
  clean = clean.replace(/\s+/g, '-');
  clean = clean.replace(/[^a-z0-9-]/g, '');

  if (isPrimal) {
    clean = `${clean}-primal`;
  }

  return `https://img.pokemondb.net/sprites/home/normal/${clean}.png`;
}

export function handlePokemonImageError(img: HTMLImageElement, name: string): void {
  if (!name) {
    img.onerror = null;
    img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    return;
  }

  // 1. Try to extract Pokedex ID from the failed image source URL first
  let pokedexId: number | null = null;
  const match = img.src.match(/pokemon_icon_(\d+)_/) || img.src.match(/pm(\d+)[._]/);
  if (match) {
    pokedexId = parseInt(match[1], 10);
  }

  // 2. If not found in URL, try to look up in rankings database
  if (!pokedexId) {
    pokedexId = getPokedexIdByName(name);
  }

  // 3. Fallback logic using Pokedex ID to PokeAPI home sprite (safe from hotlinking blocks)
  if (pokedexId) {
    if (!img.getAttribute('data-fallback-tried')) {
      img.setAttribute('data-fallback-tried', 'true');
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokedexId}.png`;
      return;
    }
  }

  // 4. Try base name PokemonDB url if we have no Pokedex ID and haven't tried DB fallback yet
  if (!img.getAttribute('data-db-fallback-tried')) {
    img.setAttribute('data-db-fallback-tried', 'true');
    const baseName = getBasePokemonName(name);
    if (baseName.toLowerCase() !== name.toLowerCase()) {
      img.src = getPokemonIconUrl(baseName);
      return;
    }
  }

  // 5. Final fallback to Poké Ball
  img.onerror = null;
  img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
}

/**
 * Resolves an image URL by mapping hotlinked Leek Duck assets to legal, public-domain,
 * or community-hosted alternatives (like Unsplash for event banners and ZeChrales/PogoAssets for Pokémon sprites).
 */
export function resolveImage(url: string | undefined, eventType?: string, name?: string): string {
  if (!url) {
    return getFallbackImage(eventType, name);
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
        if (dexId >= 650 || nameLower.includes('primal') || nameLower.includes('mega')) {
          return getPokemonIconUrl(name);
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
    
    // Intercept default/placeholder images to use pokemon sprite if name has a known pokemon
    if (lowerUrl.includes('default') || lowerUrl.includes('raidhour') || lowerUrl.includes('spotlight')) {
      if (name) {
        const baseName = getBasePokemonName(name);
        const knownNames = getBasePokemonNames();
        if (knownNames.some(kn => name.toLowerCase().includes(kn.toLowerCase()))) {
          return getPokemonIconUrl(baseName);
        }
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
export function getFallbackImage(eventType?: string, name?: string): string {
  if (name) {
    try {
      const baseName = getBasePokemonName(name);
      const knownNames = getBasePokemonNames();
      if (knownNames.some(kn => name.toLowerCase().includes(kn.toLowerCase()))) {
        return getPokemonIconUrl(baseName);
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
