import { getPokemonIconUrl } from '../components/CounterItem';

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
      const match = url.match(/pokemon_icon_(\d+)_/);
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
      return getPokemonIconUrl(name);
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
