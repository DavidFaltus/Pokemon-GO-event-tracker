export interface FriendListing {
  id: string;
  trainerCode: string;
  trainerName: string;
  vivillonPattern: string;
  team: 'mystic' | 'valor' | 'instinct' | 'any';
  purpose: 'all' | 'vivillon' | 'raids' | 'xp' | 'trades';
  country?: string;
  note?: string;
  createdAt: number;
  expiresAt: number;
}

export const SEED_COMMUNITY_FRIENDS: FriendListing[] = [
  {
    id: 'seed-continental-1',
    trainerCode: '3829 4019 5821',
    trainerName: 'PragueHunter',
    vivillonPattern: 'continental',
    team: 'mystic',
    purpose: 'all',
    country: 'Česká republika (Praha)',
    note: 'Denní dárky z Prahy, zvu na Raidy a točím pokéstopy!',
    createdAt: 1770000020000,
    expiresAt: 0
  },
  {
    id: 'seed-sandstorm-1',
    trainerCode: '4829 1048 3921',
    trainerName: 'DesertRanger',
    vivillonPattern: 'sandstorm',
    team: 'mystic',
    purpose: 'vivillon',
    country: 'United Arab Emirates (Dubai)',
    note: 'Daily Sandstorm gifts! Looking for active players.',
    createdAt: 1770000019000,
    expiresAt: 0
  },
  {
    id: 'seed-ocean-1',
    trainerCode: '7193 4028 1195',
    trainerName: 'AlohaKoa',
    vivillonPattern: 'ocean',
    team: 'valor',
    purpose: 'vivillon',
    country: 'USA (Hawaii)',
    note: 'Daily Ocean postcards from Honolulu.',
    createdAt: 1770000018000,
    expiresAt: 0
  },
  {
    id: 'seed-tundra-1',
    trainerCode: '5029 3817 9920',
    trainerName: 'ReykjavikRider',
    vivillonPattern: 'tundra',
    team: 'instinct',
    purpose: 'vivillon',
    country: 'Iceland',
    note: 'Sending Tundra gifts daily. Need XP & gifts in return.',
    createdAt: 1770000017000,
    expiresAt: 0
  },
  {
    id: 'seed-icysnow-1',
    trainerCode: '3910 8274 6619',
    trainerName: 'NordicAurora',
    vivillonPattern: 'icy-snow',
    team: 'mystic',
    purpose: 'vivillon',
    country: 'Finland',
    note: 'Icy Snow postcards from Lapland. Daily sender.',
    createdAt: 1770000016000,
    expiresAt: 0
  },
  {
    id: 'seed-sun-1',
    trainerCode: '6284 1928 4731',
    trainerName: 'SolAzteca',
    vivillonPattern: 'sun',
    team: 'valor',
    purpose: 'vivillon',
    country: 'Mexico',
    note: 'Sun pattern postcards! Open & send daily.',
    createdAt: 1770000015000,
    expiresAt: 0
  },
  {
    id: 'seed-savanna-1',
    trainerCode: '8392 0184 7261',
    trainerName: 'SambaMaster',
    vivillonPattern: 'savanna',
    team: 'instinct',
    purpose: 'vivillon',
    country: 'Brazil (São Paulo)',
    note: 'Savanna postcards daily + Remote Raid invites.',
    createdAt: 1770000014000,
    expiresAt: 0
  },
  {
    id: 'seed-monsoon-1',
    trainerCode: '2948 1039 5820',
    trainerName: 'TaipeiTyphoon',
    vivillonPattern: 'monsoon',
    team: 'mystic',
    purpose: 'vivillon',
    country: 'Taiwan',
    note: 'Monsoon gifts! Fast sender.',
    createdAt: 1770000013000,
    expiresAt: 0
  },
  {
    id: 'seed-archipelago-1',
    trainerCode: '1093 8472 9183',
    trainerName: 'CaribbeanBreeze',
    vivillonPattern: 'archipelago',
    team: 'valor',
    purpose: 'vivillon',
    country: 'Puerto Rico',
    note: 'Archipelago postcards. Active every day.',
    createdAt: 1770000012000,
    expiresAt: 0
  },
  {
    id: 'seed-river-1',
    trainerCode: '9381 0294 8572',
    trainerName: 'SydneyCrocs',
    vivillonPattern: 'river',
    team: 'instinct',
    purpose: 'raids',
    country: 'Australia',
    note: 'River gifts + early raid invites (time zone advantage)!',
    createdAt: 1770000011000,
    expiresAt: 0
  },
  {
    id: 'seed-elegant-1',
    trainerCode: '4820 1938 4729',
    trainerName: 'TokyoSamurai',
    vivillonPattern: 'elegant',
    team: 'mystic',
    purpose: 'all',
    country: 'Japan (Tokyo)',
    note: 'Elegant gifts & 5-star Legendary raids.',
    createdAt: 1770000010000,
    expiresAt: 0
  },
  {
    id: 'seed-jungle-1',
    trainerCode: '7291 8374 0192',
    trainerName: 'LionCityTrainer',
    vivillonPattern: 'jungle',
    team: 'valor',
    purpose: 'vivillon',
    country: 'Singapore',
    note: 'Jungle pattern daily gifts.',
    createdAt: 1770000009000,
    expiresAt: 0
  },
  {
    id: 'seed-continental-2',
    trainerCode: '8192 3049 1827',
    trainerName: 'MoraviaGo',
    vivillonPattern: 'continental',
    team: 'valor',
    purpose: 'raids',
    country: 'Česká republika (Brno)',
    note: 'Aktivní raider, zvu na všechny 5-star a Mega raidy.',
    createdAt: 1770000008000,
    expiresAt: 0
  },
  {
    id: 'seed-meadow-1',
    trainerCode: '3819 0284 7561',
    trainerName: 'BellaItalia',
    vivillonPattern: 'meadow',
    team: 'mystic',
    purpose: 'xp',
    country: 'Italy (Rome)',
    note: 'Meadow postcards. Daily XP grind to Best Friends.',
    createdAt: 1770000007000,
    expiresAt: 0
  },
  {
    id: 'seed-garden-1',
    trainerCode: '5920 1847 3819',
    trainerName: 'LondonEyePogo',
    vivillonPattern: 'garden',
    team: 'instinct',
    purpose: 'all',
    country: 'United Kingdom',
    note: 'Garden postcards & raid invitations.',
    createdAt: 1770000006000,
    expiresAt: 0
  },
  {
    id: 'seed-marine-1',
    trainerCode: '8294 7102 9384',
    trainerName: 'SantoriniSun',
    vivillonPattern: 'marine',
    team: 'valor',
    purpose: 'vivillon',
    country: 'Greece',
    note: 'Marine postcards from the Greek islands.',
    createdAt: 1770000005000,
    expiresAt: 0
  },
  {
    id: 'seed-polar-1',
    trainerCode: '1928 4739 5018',
    trainerName: 'MapleKnight',
    vivillonPattern: 'polar',
    team: 'mystic',
    purpose: 'xp',
    country: 'Canada (Montreal)',
    note: 'Polar gifts daily, pushing to Best Friends!',
    createdAt: 1770000004000,
    expiresAt: 0
  },
  {
    id: 'seed-highplains-1',
    trainerCode: '6019 2847 1938',
    trainerName: 'CaliforniaDream',
    vivillonPattern: 'high-plains',
    team: 'instinct',
    purpose: 'all',
    country: 'USA (California)',
    note: 'High Plains postcards, active raid host.',
    createdAt: 1770000003000,
    expiresAt: 0
  },
  {
    id: 'seed-modern-1',
    trainerCode: '4918 2039 4817',
    trainerName: 'AtlantaFalcon',
    vivillonPattern: 'modern',
    team: 'valor',
    purpose: 'xp',
    country: 'USA (Georgia)',
    note: 'Modern gifts, quick gift openers welcome.',
    createdAt: 1770000002000,
    expiresAt: 0
  }
];
