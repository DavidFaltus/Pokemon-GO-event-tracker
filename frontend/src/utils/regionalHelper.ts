export type UserRegion = 'EMEA' | 'Americas' | 'Asia';

export interface RegionalPokemonInfo {
  name: string;
  regionCode: 'EMEA' | 'Americas' | 'Asia' | 'North' | 'South';
  label: { cs: string; en: string; ja: string; ru: string };
  shortLabel: { cs: string; en: string; ja: string; ru: string };
  flag: string;
}

export const REGIONAL_POKEMON_MAP: Record<string, RegionalPokemonInfo> = {
  'uxie': {
    name: 'Uxie',
    regionCode: 'Asia',
    label: { cs: 'Asie & Pacifik', en: 'Asia-Pacific', ja: 'アジア太平洋', ru: 'Aзия и Tихий океан' },
    shortLabel: { cs: '🌏 Asie-Pacifik', en: '🌏 Asia-Pacific', ja: '🌏 アジア太平洋', ru: '🌏 Aзия-Tихий океан' },
    flag: '🌏'
  },
  'mesprit': {
    name: 'Mesprit',
    regionCode: 'EMEA',
    label: { cs: 'Evropa, Blízký východ, Afrika & Indie', en: 'Europe, Middle East, Africa & India (EMEA)', ja: '欧州・中東・アフリカ・インド', ru: 'Европа, Ближний Восток, Африка и Индия' },
    shortLabel: { cs: '🇪🇺 Evropa & EMEA', en: '🇪🇺 Europe / EMEA', ja: '🇪🇺 欧州・EMEA', ru: '🇪🇺 Европа и EMEA' },
    flag: '🇪🇺'
  },
  'azelf': {
    name: 'Azelf',
    regionCode: 'Americas',
    label: { cs: 'Amerika & Grónsko', en: 'Americas & Greenland', ja: '南北アメリカ・グリーンランド', ru: 'Америка и Гренландия' },
    shortLabel: { cs: '🌎 Amerika', en: '🌎 Americas', ja: '🌎 アメリカ', ru: '🌎 Америка' },
    flag: '🌎'
  },
  'kartana': {
    name: 'Kartana',
    regionCode: 'North',
    label: { cs: 'Severní polokoule', en: 'Northern Hemisphere', ja: '北半球', ru: 'Северное полушарие' },
    shortLabel: { cs: '🧭 Severní polokoule', en: '🧭 Northern Hemisphere', ja: '🧭 北半球', ru: '🧭 Северное полушарие' },
    flag: '🧭'
  },
  'celesteela': {
    name: 'Celesteela',
    regionCode: 'South',
    label: { cs: 'Jižní polokoule', en: 'Southern Hemisphere', ja: '南半球', ru: 'Южное полушарие' },
    shortLabel: { cs: '🧭 Jižní polokoule', en: '🧭 Southern Hemisphere', ja: '🧭 南半球', ru: '🧭 Южное полушарие' },
    flag: '🧭'
  }
};

/**
 * Automatically detects user region based on browser timezone and locale.
 */
export function detectUserRegion(): UserRegion {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    if (
      tz.startsWith('Europe/') ||
      tz.startsWith('Africa/') ||
      tz.startsWith('Atlantic/') ||
      tz.includes('Kolkata') ||
      tz.includes('Dubai') ||
      tz.includes('Riyadh') ||
      tz.includes('Jerusalem')
    ) {
      return 'EMEA';
    }
    if (
      tz.startsWith('America/') ||
      tz.startsWith('US/') ||
      tz.startsWith('Canada/') ||
      tz.startsWith('Brazil/') ||
      tz.startsWith('Chile/')
    ) {
      return 'Americas';
    }
    if (
      tz.startsWith('Asia/') ||
      tz.startsWith('Australia/') ||
      tz.startsWith('Pacific/')
    ) {
      return 'Asia';
    }
  } catch (e) {}

  // Language fallback
  const lang = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
  if (
    lang.includes('cs') ||
    lang.includes('sk') ||
    lang.includes('de') ||
    lang.includes('fr') ||
    lang.includes('es') ||
    lang.includes('it') ||
    lang.includes('pl') ||
    lang.includes('uk') ||
    lang.includes('ru')
  ) {
    return 'EMEA';
  }
  if (lang.includes('en-us') || lang.includes('es-419') || lang.includes('pt-br')) {
    return 'Americas';
  }

  return 'EMEA'; // Default to EMEA
}

function cleanNameForRegional(name: string): string {
  if (!name) return '';
  let cleaned = name.toLowerCase().trim();
  
  // Try direct match first
  if (REGIONAL_POKEMON_MAP[cleaned]) return cleaned;

  // Clean parenthetical or text suffixes like "Uxie Asia-Pacific" -> "uxie"
  cleaned = cleaned
    .replace(/\s*\(.*?\)\s*/g, '')
    .replace(/\s+asia-pacific/gi, '')
    .replace(/\s+asia/gi, '')
    .replace(/\s+emea/gi, '')
    .replace(/\s+americas/gi, '')
    .replace(/\s+america/gi, '')
    .trim();

  return cleaned;
}

/**
 * Checks if a pokemon belongs to the user's detected regional location.
 */
export function isPokemonInUserRegion(pokemonName: string, userRegion: UserRegion = detectUserRegion()): boolean {
  const cleanKey = cleanNameForRegional(pokemonName);
  const info = REGIONAL_POKEMON_MAP[cleanKey];
  if (!info) return true; // Non-regional pokemon are available everywhere

  if (info.regionCode === 'EMEA') return userRegion === 'EMEA';
  if (info.regionCode === 'Asia') return userRegion === 'Asia';
  if (info.regionCode === 'Americas') return userRegion === 'Americas';
  if (info.regionCode === 'North') return true; // Default Northern hemisphere
  if (info.regionCode === 'South') return false;

  return true;
}

/**
 * Gets regional metadata for a pokemon name, or null if not regional.
 */
export function getRegionalInfo(pokemonName: string): RegionalPokemonInfo | null {
  if (!pokemonName) return null;
  const cleanKey = cleanNameForRegional(pokemonName);
  return REGIONAL_POKEMON_MAP[cleanKey] || null;
}
