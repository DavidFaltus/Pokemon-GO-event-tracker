import axios from 'axios';
import { loadVerifiedImagesCache, saveVerifiedImagesCache } from '../storage';

let verifiedImagesMemoryCache: Record<string, string> | null = null;

export function resolvePokemonAsset(name: string, isShiny: boolean = false): string {
  if (!name) return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  const isActuallyShiny = isShiny || /\bshiny\b/i.test(name) || name.includes('✨');
  const variant = isActuallyShiny ? 'shiny' : 'normal';
  const cleanName = name.replace(/✨/g, '').trim();

  // Regional forms (Alolan, Hisuian, Galarian, Paldean)
  const regionalMatch = cleanName.match(/(alolan|alola|hisuian|hisui|galarian|galar|paldean|paldea)/i);
  if (regionalMatch) {
    let form = regionalMatch[1].toLowerCase();
    if (form.startsWith('alola')) form = 'alolan';
    else if (form.startsWith('hisui')) form = 'hisuian';
    else if (form.startsWith('galar')) form = 'galarian';
    else if (form.startsWith('paldea')) form = 'paldean';

    const base = cleanName
      .toLowerCase()
      .replace(/alolan|alola|hisuian|hisui|galarian|galar|paldean|paldea/gi, '')
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/^shadow\s+/i, '')
      .replace(/^shiny\s+/i, '')
      .replace(/^mega\s+/i, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    if (base && form) {
      return `https://img.pokemondb.net/sprites/home/${variant}/${base}-${form}.png`;
    }
  }

  // Mega forms (Mega Charizard X, Mega Gengar, etc.)
  if (/^mega\s+/i.test(cleanName)) {
    let base = cleanName
      .toLowerCase()
      .replace(/^mega\s+/i, '')
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/^shiny\s+/i, '')
      .trim();
    if (base.endsWith(' x')) base = base.replace(/\s+x$/, '-mega-x');
    else if (base.endsWith(' y')) base = base.replace(/\s+y$/, '-mega-y');
    else base = `${base}-mega`;
    base = base.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `https://img.pokemondb.net/sprites/home/${variant}/${base}.png`;
  }

  // Standard clean name
  const clean = cleanName
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^shadow\s+/i, '')
    .replace(/^shiny\s+/i, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return `https://img.pokemondb.net/sprites/home/${variant}/${clean}.png`;
}

/**
 * 4-Tier Waterfall image verification on backend.
 */
export async function verifyAndResolveImageOnBackend(
  url: string | undefined,
  category: string,
  name: string,
  isShiny: boolean = false
): Promise<string> {
  if (verifiedImagesMemoryCache === null) {
    verifiedImagesMemoryCache = await loadVerifiedImagesCache();
  }

  const cacheKey = `${category}__${(name || '').toLowerCase().trim()}__${isShiny ? 'shiny' : 'normal'}`;
  if (verifiedImagesMemoryCache[cacheKey]) {
    return verifiedImagesMemoryCache[cacheKey];
  }

  let finalUrl = url || '';

  // Tier 1: Check provided URL
  if (finalUrl && finalUrl.startsWith('http')) {
    try {
      const res = await axios.head(finalUrl, {
        timeout: 2500,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      });
      if (res.status !== 200) {
        finalUrl = '';
      }
    } catch {
      finalUrl = '';
    }
  }

  // Tier 2: Pokémon DB Home Sprite
  if (!finalUrl && name) {
    const pogoDbUrl = resolvePokemonAsset(name, isShiny);
    try {
      const res = await axios.head(pogoDbUrl, {
        timeout: 2500,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      });
      if (res.status === 200) {
        finalUrl = pogoDbUrl;
      }
    } catch {
      finalUrl = '';
    }
  }

  // Tier 3: PokeAPI item / standard sprite fallback
  if (!finalUrl) {
    if (category === 'research' || category === 'item') {
      finalUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    } else {
      finalUrl = resolvePokemonAsset(name, isShiny);
    }
  }

  verifiedImagesMemoryCache[cacheKey] = finalUrl;
  saveVerifiedImagesCache(verifiedImagesMemoryCache).catch(() => {});
  return finalUrl;
}
