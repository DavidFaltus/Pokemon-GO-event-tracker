import { getPokedexIdByName, SPECIAL_FORM_ARTWORK_MAP } from './imageResolver';

export interface SpriteOptions {
  /** Pokemon form variant (e.g., 'alolan', 'hisuian', 'galarian', 'mega', 'shadow') */
  form?: string;
  /** Whether to return shiny variant */
  shiny?: boolean;
  /** Preferred sprite size: 'icon' (96px), 'medium' (256px), 'large' (512px) */
  size?: 'icon' | 'medium' | 'large';
}

export interface SpriteDescriptor {
  /** Primary URL to use */
  primaryUrl: string;
  /** Ordered fallback URLs if primary fails */
  fallbackUrls: string[];
  /** The canonical/cleaned Pokemon name */
  canonicalName: string;
  /** Detected form, if any */
  detectedForm: string | null;
  /** Whether shiny variant was requested */
  isShiny: boolean;
}

/**
 * Normalize a Pokemon name: strip forms, shadows, shinies, clean whitespace.
 * Shared between frontend and backend.
 */
export function normalizePokemonName(name: string): { baseName: string; form: string | null; isShadow: boolean; isShiny: boolean } {
  if (!name) return { baseName: '', form: null, isShadow: false, isShiny: false };

  let isShadow = false;
  let isShiny = false;
  let form: string | null = null;
  let cleanName = name;

  if (/\bshiny\b/i.test(cleanName) || cleanName.includes('✨')) {
    isShiny = true;
    cleanName = cleanName.replace(/\bshiny\b/i, '').replace(/✨/g, '').trim();
  }

  if (/\bshadow\b/i.test(cleanName)) {
    isShadow = true;
    cleanName = cleanName.replace(/\bshadow\b/i, '').trim();
  }

  // Megas
  if (/\bmega\b/i.test(cleanName)) {
    cleanName = cleanName.replace(/\bmega\b/i, '').trim();
    form = 'mega';
    if (/\bx\b$/i.test(cleanName)) {
      form = 'mega-x';
      cleanName = cleanName.replace(/\bx\b$/i, '').trim();
    } else if (/\by\b$/i.test(cleanName)) {
      form = 'mega-y';
      cleanName = cleanName.replace(/\by\b$/i, '').trim();
    }
  } else if (/\bprimal\b/i.test(cleanName)) {
    form = 'primal';
    cleanName = cleanName.replace(/\bprimal\b/i, '').trim();
  } else if (/\bdynamax\b/i.test(cleanName)) {
    form = 'dynamax';
    cleanName = cleanName.replace(/\bdynamax\b/i, '').trim();
  } else if (/\bgigantamax\b/i.test(cleanName) || /\bg-max\b/i.test(cleanName)) {
    form = 'gigantamax';
    cleanName = cleanName.replace(/\bgigantamax\b/i, '').replace(/\bg-max\b/i, '').trim();
  }

  // Regionals
  const regionalMatch = cleanName.match(/\b(alolan|alola|hisuian|hisui|galarian|galar|paldean|paldea)\b/i);
  if (regionalMatch) {
    let r = regionalMatch[1].toLowerCase();
    if (r === 'alola') r = 'alolan';
    if (r === 'hisui') r = 'hisuian';
    if (r === 'galar') r = 'galarian';
    if (r === 'paldea') r = 'paldean';
    form = form || r; // don't override mega if already set (e.g. Mega Alolan? Doesn't exist, but still)
    cleanName = cleanName.replace(regionalMatch[0], '').trim();
  }

  // Cleanup parenthesis and extra spaces
  cleanName = cleanName.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

  return {
    baseName: cleanName,
    form,
    isShadow,
    isShiny
  };
}

/**
 * Deterministic sprite resolution. Returns a descriptor with primary URL 
 * and ordered fallback URLs. No DOM mutation, no side effects.
 */
export function resolvePokemonSprite(name: string, options?: SpriteOptions): SpriteDescriptor {
  const norm = normalizePokemonName(name);
  
  const isShiny = options?.shiny !== undefined ? options.shiny : norm.isShiny;
  const form = options?.form || norm.form;
  const directKey = name.toLowerCase().trim();
  const baseKey = norm.baseName.toLowerCase().trim();
  const specialForm = SPECIAL_FORM_ARTWORK_MAP[baseKey] || SPECIAL_FORM_ARTWORK_MAP[directKey];

  const urls: string[] = [];
  const variant = isShiny ? 'shiny' : 'normal';

  if (specialForm) {
    const pApiFolder = isShiny ? 'official-artwork/shiny' : 'official-artwork';
    urls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${pApiFolder}/${specialForm.pokeApiId}.png`);
    urls.push(`https://img.pokemondb.net/sprites/home/${variant}/${specialForm.dbSlug}.png`);
    urls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${isShiny ? 'home/shiny' : 'home'}/${specialForm.pokeApiId}.png`);
    urls.push('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png');

    return {
      primaryUrl: urls[0],
      fallbackUrls: urls.slice(1),
      canonicalName: norm.baseName,
      detectedForm: form,
      isShiny: isShiny
    };
  }
  
  const dexId = getPokedexIdByName(norm.baseName);

  // PokeMiners PoGO assets
  if (dexId) {
    let pmUrl = `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm${dexId}`;
    if (form) {
      // Form specified -> fall back to PokemonDB
    } else {
      pmUrl += isShiny ? `.s.icon.png` : `.icon.png`;
      urls.push(pmUrl);
    }
  }

  // PokemonDB Home sprites
  let dbFormSuffix = '';
  if (form) {
    if (form === 'mega') dbFormSuffix = '-mega';
    else if (form === 'mega-x') dbFormSuffix = '-mega-x';
    else if (form === 'mega-y') dbFormSuffix = '-mega-y';
    else if (form === 'primal') dbFormSuffix = '-primal';
    else dbFormSuffix = `-${form}`;
  }
  
  const dbName = norm.baseName.replace(/[^a-z0-9]/g, '-');
  urls.push(`https://img.pokemondb.net/sprites/home/${variant}/${dbName}${dbFormSuffix}.png`);

  // PokeAPI Official Artwork
  if (dexId) {
    const pApiFolder = isShiny ? 'official-artwork/shiny' : 'official-artwork';
    urls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${pApiFolder}/${dexId}.png`);
  }

  // Fallback Pokeball
  urls.push('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png');

  return {
    primaryUrl: urls[0],
    fallbackUrls: urls.slice(1),
    canonicalName: norm.baseName,
    detectedForm: form,
    isShiny: isShiny
  };
}

/**
 * Generate srcSet string for responsive images.
 */
export function getSpriteSrcSet(name: string, options?: SpriteOptions): string {
  const descriptor = resolvePokemonSprite(name, options);
  // Providing the primary URL in multiple sizes for demonstration (or based on standard multiplier logic)
  // Usually, srcSet would map different URLs, but here we can just use the primary URL and fallback structure or size modifiers.
  // We'll provide 1x, 2x, 3x for the primary URL just to have a valid srcset structure.
  return `${descriptor.primaryUrl} 1x, ${descriptor.primaryUrl} 2x`;
}
