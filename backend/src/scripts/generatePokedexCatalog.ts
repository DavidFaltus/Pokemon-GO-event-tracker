/**
 * generatePokedexCatalog.ts — Synthesizes raw Pokemon GO data into a lightweight static Pokédex catalog.
 *
 * Generates:
 *   - `frontend/src/data/pokedexCatalog.json` (Compact, high-speed static dataset)
 *   - `frontend/src/data/pokedexCatalog.ts` (Type-safe accessors & helpers)
 *
 * Usage:
 *   cd backend && npm.cmd run generate:pokedex
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── PATHS & CONSTANTS ────────────────────────────────────────────────────────

const CACHE_PATH = path.resolve(__dirname, '../../data_pokedex_cache.json');
const JSON_OUTPUT_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.json');
const TS_OUTPUT_PATH = path.resolve(__dirname, '../../../frontend/src/data/pokedexCatalog.ts');

// CP Multipliers
const CPM_LV50 = 0.84029999;
const CPM_LV40 = 0.7903;
const CPM_LV25 = 0.667934;
const CPM_LV20 = 0.5974;
const CPM_LV15 = 0.51739395;

function calculateCp(atk: number, def: number, sta: number, cpm: number, iv = 15): number {
  const effectiveAtk = (atk + iv) * cpm;
  const effectiveDef = (def + iv) * cpm;
  const effectiveSta = (sta + iv) * cpm;
  return Math.max(10, Math.floor(effectiveAtk * Math.sqrt(effectiveDef) * Math.sqrt(effectiveSta) / 10));
}

// ─── VARIANT POKEAPI IDS ──────────────────────────────────────────────────────

const GMAX_POKEAPI_IDS: Record<string, number> = {
  'venusaur': 10195,
  'charizard': 10196,
  'blastoise': 10197,
  'butterfree': 10198,
  'pikachu': 10199,
  'meowth': 10200,
  'machamp': 10201,
  'gengar': 10202,
  'kingler': 10203,
  'lapras': 10204,
  'eevee': 10205,
  'snorlax': 10206,
  'garbodor': 10207,
  'melmetal': 10208,
  'rillaboom': 10209,
  'cinderace': 10210,
  'inteleon': 10211,
  'corviknight': 10212,
  'orbeetle': 10213,
  'drednaw': 10214,
  'coalossal': 10215,
  'flapple': 10216,
  'appletun': 10217,
  'sandaconda': 10218,
  'toxtricity': 10219,
  'centiskorch': 10220,
  'hatterene': 10221,
  'grimmsnarl': 10222,
  'alcremie': 10223,
  'copperajah': 10224,
  'duraludon': 10225,
  'urshifu': 10226
};

const GMAX_MOVES: Record<string, string> = {
  'venusaur': 'G-Max Vine Lash',
  'charizard': 'G-Max Wildfire',
  'blastoise': 'G-Max Cannonade',
  'butterfree': 'G-Max Befuddle',
  'pikachu': 'G-Max Volt Crash',
  'meowth': 'G-Max Gold Rush',
  'machamp': 'G-Max Chi Strike',
  'gengar': 'G-Max Terror',
  'kingler': 'G-Max Foam Burst',
  'lapras': 'G-Max Resonance',
  'eevee': 'G-Max Cuddle',
  'snorlax': 'G-Max Replenish',
  'garbodor': 'G-Max Malodor',
  'melmetal': 'G-Max Meltdown',
  'rillaboom': 'G-Max Drum Solo',
  'cinderace': 'G-Max Fireball',
  'inteleon': 'G-Max Hydrosnipe',
  'corviknight': 'G-Max Wind Rage',
  'orbeetle': 'G-Max Gravitas',
  'drednaw': 'G-Max Stonesurge',
  'coalossal': 'G-Max Volcalith',
  'flapple': 'G-Max Tartness',
  'appletun': 'G-Max Sweetness',
  'sandaconda': 'G-Max Sandblast',
  'toxtricity': 'G-Max Stun Shock',
  'centiskorch': 'G-Max Centiferno',
  'hatterene': 'G-Max Smite',
  'grimmsnarl': 'G-Max Snooze',
  'alcremie': 'G-Max Finale',
  'copperajah': 'G-Max Steelsurge',
  'duraludon': 'G-Max Depletion',
  'urshifu': 'G-Max One Blow'
};

const DYNAMAX_ELIGIBLE_DEX_IDS = new Set<number>([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 52, 66, 67, 68, 92, 93, 94, 98, 99, 131, 133, 143, 144, 145, 146,
  243, 244, 245, 374, 375, 376, 480, 481, 482, 529, 530, 569, 615, 809,
  810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 831, 832, 833, 834, 837, 838, 839,
  840, 841, 842, 843, 844, 848, 849, 850, 851, 856, 857, 858, 859, 860, 861, 868, 869, 870, 878, 879, 884, 891, 892
]);

const CANONICAL_MEGA_POKEAPI_IDS: Record<string, number> = {
  'VENUSAUR_MEGA': 10033,
  'CHARIZARD_MEGA_X': 10034,
  'CHARIZARD_MEGA_Y': 10035,
  'BLASTOISE_MEGA': 10036,
  'BEEDRILL_MEGA': 10063,
  'PIDGEOT_MEGA': 10064,
  'ALAKAZAM_MEGA': 10037,
  'SLOWBRO_MEGA': 10065,
  'GENGAR_MEGA': 10038,
  'KANGASKHAN_MEGA': 10039,
  'PINSIR_MEGA': 10040,
  'GYARADOS_MEGA': 10041,
  'AERODACTYL_MEGA': 10042,
  'MEWTWO_MEGA_X': 10043,
  'MEWTWO_MEGA_Y': 10044,
  'AMPHAROS_MEGA': 10045,
  'STEELIX_MEGA': 10066,
  'SCIZOR_MEGA': 10046,
  'HERACROSS_MEGA': 10047,
  'HOUNDOOM_MEGA': 10048,
  'TYRANITAR_MEGA': 10049,
  'SCEPTILE_MEGA': 10067,
  'BLAZIKEN_MEGA': 10050,
  'SWAMPERT_MEGA': 10068,
  'GARDEVOIR_MEGA': 10051,
  'SABLEYE_MEGA': 10069,
  'MAWILE_MEGA': 10052,
  'AGGRON_MEGA': 10053,
  'MEDICHAM_MEGA': 10054,
  'MANECTRIC_MEGA': 10055,
  'SHARPEDO_MEGA': 10070,
  'CAMERUPT_MEGA': 10071,
  'ALTARIA_MEGA': 10072,
  'BANETTE_MEGA': 10056,
  'ABSOL_MEGA': 10057,
  'GLALIE_MEGA': 10073,
  'SALAMENCE_MEGA': 10074,
  'METAGROSS_MEGA': 10082,
  'LATIAS_MEGA': 10058,
  'LATIOS_MEGA': 10059,
  'KYOGRE_PRIMAL': 10075,
  'GROUDON_PRIMAL': 10076,
  'RAYQUAZA_MEGA': 10077,
  'LOPUNNY_MEGA': 10078,
  'GARCHOMP_MEGA': 10060,
  'LUCARIO_MEGA': 10061,
  'ABOMASNOW_MEGA': 10062,
  'GALLADE_MEGA': 10079,
  'AUDINO_MEGA': 10080,
  'DIANCIE_MEGA': 10081
};

const REGIONAL_POKEAPI_IDS: Record<string, number> = {
  // Alola
  'RATTATA_ALOLA': 10091,
  'RATICATE_ALOLA': 10092,
  'RAICHU_ALOLA': 10100,
  'SANDSHREW_ALOLA': 10101,
  'SANDSLASH_ALOLA': 10102,
  'VULPIX_ALOLA': 10103,
  'NINETALES_ALOLA': 10104,
  'DIGLETT_ALOLA': 10105,
  'DUGTRIO_ALOLA': 10106,
  'MEOWTH_ALOLA': 10107,
  'PERSIAN_ALOLA': 10108,
  'GEODUDE_ALOLA': 10109,
  'GRAVELER_ALOLA': 10110,
  'GOLEM_ALOLA': 10111,
  'GRIMER_ALOLA': 10112,
  'MUK_ALOLA': 10113,
  'EXEGGUTOR_ALOLA': 10114,
  'MAROWAK_ALOLA': 10115,

  // Galar
  'MEOWTH_GALARIAN': 10161,
  'PONYTA_GALARIAN': 10162,
  'RAPIDASH_GALARIAN': 10163,
  'SLOWPOKE_GALARIAN': 10164,
  'SLOWBRO_GALARIAN': 10165,
  'FARFETCHD_GALARIAN': 10166,
  'WEEZING_GALARIAN': 10167,
  'MR_MIME_GALARIAN': 10168,
  'ARTICUNO_GALARIAN': 10169,
  'ZAPDOS_GALARIAN': 10170,
  'MOLTRES_GALARIAN': 10171,
  'SLOWKING_GALARIAN': 10172,
  'CORSOLA_GALARIAN': 10173,
  'ZIGZAGOON_GALARIAN': 10174,
  'LINOONE_GALARIAN': 10175,
  'DARUMAKA_GALARIAN': 10176,
  'DARMANITAN_GALARIAN': 10177,
  'DARMANITAN_GALARIAN_STANDARD': 10177,
  'YAMASK_GALARIAN': 10179,
  'STUNFISK_GALARIAN': 10180,

  // Hisui
  'GROWLITHE_HISUIAN': 10229,
  'ARCANINE_HISUIAN': 10230,
  'VOLTORB_HISUIAN': 10231,
  'ELECTRODE_HISUIAN': 10232,
  'TYPHLOSION_HISUIAN': 10233,
  'QWILFISH_HISUIAN': 10234,
  'SNEASEL_HISUIAN': 10235,
  'SAMUROTT_HISUIAN': 10236,
  'LILLIGANT_HISUIAN': 10237,
  'ZORUA_HISUIAN': 10238,
  'ZOROARK_HISUIAN': 10239,
  'BRAVIARY_HISUIAN': 10240,
  'SLIGGOO_HISUIAN': 10241,
  'GOODRA_HISUIAN': 10242,
  'AVALUGG_HISUIAN': 10243,
  'DECIDUEYE_HISUIAN': 10244,

  // Paldea
  'WOOPER_PALDEA': 10253,
  'TAUROS_PALDEA_COMBAT': 10250,
  'TAUROS_PALDEA_BLAZE': 10251,
  'TAUROS_PALDEA_AQUA': 10252
};

// ─── SPECIAL, FUSION, BATTLE & ALTERNATE FORMS ──────────────────────────────

const SPECIAL_FORM_POKEAPI_IDS: Record<string, number> = {
  // Rotom Formes (All 5 appliances)
  'ROTOM_HEAT': 10008,
  'ROTOM_WASH': 10009,
  'ROTOM_FROST': 10010,
  'ROTOM_FAN': 10011,
  'ROTOM_MOW': 10012,

  // Castform Formes (Weather forms)
  'CASTFORM_SUNNY': 10013,
  'CASTFORM_RAINY': 10014,
  'CASTFORM_SNOWY': 10015,

  // Deoxys Formes
  'DEOXYS_ATTACK': 10001,
  'DEOXYS_DEFENSE': 10002,
  'DEOXYS_SPEED': 10003,

  // Wormadam Cloaks
  'WORMADAM_SANDY': 10004,
  'WORMADAM_TRASH': 10005,

  // Shaymin Sky
  'SHAYMIN_SKY': 10006,

  // Giratina Origin
  'GIRATINA_ORIGIN': 10007,

  // Basculin
  'BASCULIN_BLUE_STRIPED': 10016,
  'BASCULIN_WHITE_STRIPED': 10247,

  // Darmanitan Zen Modes
  'DARMANITAN_ZEN': 10017,
  'DARMANITAN_GALARIAN_ZEN': 10178,

  // Meloetta Pirouette
  'MELOETTA_PIROUETTE': 10018,

  // Therian Genies
  'TORNADUS_THERIAN': 10019,
  'THUNDURUS_THERIAN': 10020,
  'LANDORUS_THERIAN': 10021,
  'ENAMORUS_THERIAN': 10249,

  // Kyurem Fusions
  'KYUREM_BLACK': 10022,
  'KYUREM_WHITE': 10023,

  // Keldeo Resolute
  'KELDEO_RESOLUTE': 10024,

  // Aegislash Blade
  'AEGISLASH_BLADE': 10026,

  // Pumpkaboo & Gourgeist Sizes
  'PUMPKABOO_SMALL': 10027,
  'PUMPKABOO_LARGE': 10028,
  'PUMPKABOO_SUPER': 10029,
  'GOURGEIST_SMALL': 10030,
  'GOURGEIST_LARGE': 10031,
  'GOURGEIST_SUPER': 10032,

  // Zygarde
  'ZYGARDE_TEN_PERCENT': 10181,
  'ZYGARDE_COMPLETE': 10120,
  'ZYGARDE_COMPLETE_FIFTY_PERCENT': 10120,
  'ZYGARDE_COMPLETE_TEN_PERCENT': 10181,

  // Hoopa Unbound
  'HOOPA_UNBOUND': 10086,

  // Oricorio Styles
  'ORICORIO_POMPOM': 10123,
  'ORICORIO_PAU': 10124,
  'ORICORIO_SENSU': 10125,

  // Lycanroc Forms
  'LYCANROC_MIDNIGHT': 10126,
  'LYCANROC_DUSK': 10152,

  // Wishiwashi School
  'WISHIWASHI_SCHOOL': 10127,

  // Necrozma Fusions & Ultra
  'NECROZMA_DUSK_MANE': 10155,
  'NECROZMA_DAWN_WINGS': 10156,
  'NECROZMA_ULTRA': 10157,

  // Toxtricity Low Key
  'TOXTRICITY_LOW_KEY': 10184,

  // Eiscue Noice Face
  'EISCUE_NOICE': 10186,

  // Morpeko Hangry
  'MORPEKO_HANGRY': 10187,

  // Zacian & Zamazenta Crowned Forms
  'ZACIAN_CROWNED_SWORD': 10188,
  'ZAMAZENTA_CROWNED_SHIELD': 10189,

  // Eternatus
  'ETERNATUS_ETERNAMAX': 10190,

  // Urshifu Rapid Strike
  'URSHIFU_RAPID_STRIKE': 10191,

  // Calyrex Fusions
  'CALYREX_ICE_RIDER': 10193,
  'CALYREX_SHADOW_RIDER': 10194,

  // Dialga & Palkia Origin
  'DIALGA_ORIGIN': 10245,
  'PALKIA_ORIGIN': 10246,

  // Palafin Hero
  'PALAFIN_HERO': 10256
};

// Fusion Keys Set
const FUSION_KEYS = new Set<string>([
  'NECROZMA_DUSK_MANE',
  'NECROZMA_DAWN_WINGS',
  'NECROZMA_ULTRA',
  'KYUREM_BLACK',
  'KYUREM_WHITE',
  'CALYREX_ICE_RIDER',
  'CALYREX_SHADOW_RIDER'
]);

// Battle Forms Set
const BATTLE_FORM_KEYS = new Set<string>([
  'ZACIAN_CROWNED_SWORD',
  'ZACIAN_HERO',
  'ZAMAZENTA_CROWNED_SHIELD',
  'ZAMAZENTA_HERO',
  'DIALGA_ORIGIN',
  'PALKIA_ORIGIN',
  'GIRATINA_ORIGIN',
  'DEOXYS_ATTACK',
  'DEOXYS_DEFENSE',
  'DEOXYS_SPEED',
  'SHAYMIN_SKY',
  'TORNADUS_THERIAN',
  'THUNDURUS_THERIAN',
  'LANDORUS_THERIAN',
  'ENAMORUS_THERIAN',
  'URSHIFU_RAPID_STRIKE',
  'URSHIFU_SINGLE_STRIKE',
  'ZYGARDE_TEN_PERCENT',
  'ZYGARDE_COMPLETE',
  'ZYGARDE_COMPLETE_FIFTY_PERCENT',
  'ZYGARDE_COMPLETE_TEN_PERCENT',
  'HOOPA_UNBOUND',
  'MELOETTA_PIROUETTE',
  'DARMANITAN_ZEN',
  'DARMANITAN_GALARIAN_ZEN',
  'AEGISLASH_BLADE',
  'WISHIWASHI_SCHOOL',
  'PALAFIN_HERO',
  'ETERNATUS_ETERNAMAX',
  'KELDEO_RESOLUTE'
]);

// Fusion Metadata Dictionary
const FUSION_METADATA: Record<string, {
  partner: string;
  energyType: string;
  energyAmount: number;
  candy1: string;
  candy1Amount: number;
  candy2?: string;
  candy2Amount?: number;
  signatureMove: { name: string; type: string; pvePower: number; pvpPower: number };
  adventureEffect?: { cs: string; en: string; ja: string; ru: string };
}> = {
  'NECROZMA_DUSK_MANE': {
    partner: 'Solgaleo',
    energyType: 'Solar Fusion Energy',
    energyAmount: 1000,
    candy1: 'Necrozma Candy',
    candy1Amount: 30,
    candy2: 'Cosmog Candy',
    candy2Amount: 30,
    signatureMove: { name: 'Sunsteel Strike', type: 'Steel', pvePower: 230, pvpPower: 135 },
    adventureEffect: {
      cs: 'Aktivuje denní efekty na 10 minut: promění herní oblohu na den, umožňuje denní evoluce (např. Tyrantrum, Midday Lycanroc) a přitahuje denní Pokémony.',
      en: 'Activates daytime in-game effects for 10 minutes: transforms skybox to day, enables daytime evolutions, and attracts daytime Pokémon spawns.',
      ja: '10分間フィールドを昼状態にし、昼限定の進化を可能にし、昼に出現するポケモンを引き寄せます。',
      ru: 'Активирует дневной эффект на 10 минут: меняет небо на день, позволяет дневные эволюции и привлекает дневных покемонов.'
    }
  },
  'NECROZMA_DAWN_WINGS': {
    partner: 'Lunala',
    energyType: 'Lunar Fusion Energy',
    energyAmount: 1000,
    candy1: 'Necrozma Candy',
    candy1Amount: 30,
    candy2: 'Cosmog Candy',
    candy2Amount: 30,
    signatureMove: { name: 'Moongeist Beam', type: 'Ghost', pvePower: 230, pvpPower: 135 },
    adventureEffect: {
      cs: 'Aktivuje noční efekty na 10 minut: promění herní oblohu na noc, umožňuje noční evoluce (např. Aurorus, Midnight Lycanroc) a přitahuje noční Pokémony.',
      en: 'Activates nighttime in-game effects for 10 minutes: transforms skybox to night, enables nighttime evolutions, and attracts nighttime Pokémon spawns.',
      ja: '10分間フィールドを夜状態にし、夜限定の進化を可能にし、夜に出現するポケモンを引き寄せます。',
      ru: 'Активирует ночной эффект на 10 минут: меняет небо на ночь, позволяет ночные эволюции и привлекает ночных покемонов.'
    }
  },
  'NECROZMA_ULTRA': {
    partner: 'Solgaleo / Lunala (Ultra Burst)',
    energyType: 'Light Energy',
    energyAmount: 0,
    candy1: 'Necrozma Candy',
    candy1Amount: 0,
    signatureMove: { name: 'Light That Burns the Sky', type: 'Psychic', pvePower: 250, pvpPower: 150 }
  },
  'KYUREM_BLACK': {
    partner: 'Zekrom',
    energyType: 'DNA Splicers / Volt Energy',
    energyAmount: 1000,
    candy1: 'Kyurem Candy',
    candy1Amount: 30,
    candy2: 'Zekrom Candy',
    candy2Amount: 30,
    signatureMove: { name: 'Freeze Shock', type: 'Ice', pvePower: 140, pvpPower: 130 }
  },
  'KYUREM_WHITE': {
    partner: 'Reshiram',
    energyType: 'DNA Splicers / Flare Energy',
    energyAmount: 1000,
    candy1: 'Kyurem Candy',
    candy1Amount: 30,
    candy2: 'Reshiram Candy',
    candy2Amount: 30,
    signatureMove: { name: 'Ice Burn', type: 'Ice', pvePower: 140, pvpPower: 130 }
  },
  'CALYREX_ICE_RIDER': {
    partner: 'Glastrier',
    energyType: 'Reins of Unity',
    energyAmount: 1,
    candy1: 'Calyrex Candy',
    candy1Amount: 30,
    candy2: 'Glastrier Candy',
    candy2Amount: 30,
    signatureMove: { name: 'Glacial Lance', type: 'Ice', pvePower: 140, pvpPower: 130 }
  },
  'CALYREX_SHADOW_RIDER': {
    partner: 'Spectrier',
    energyType: 'Reins of Unity',
    energyAmount: 1,
    candy1: 'Calyrex Candy',
    candy1Amount: 30,
    candy2: 'Spectrier Candy',
    candy2Amount: 30,
    signatureMove: { name: 'Astral Barrage', type: 'Ghost', pvePower: 140, pvpPower: 130 }
  }
};

// Signature Move & Adventure Effect Metadata for Battle / Origin Forms
const SIGNATURE_FORM_METADATA: Record<string, {
  signatureMove: { name: string; type: string; pvePower: number; pvpPower: number };
  adventureEffect?: { cs: string; en: string; ja: string; ru: string };
}> = {
  'DIALGA_ORIGIN': {
    signatureMove: { name: 'Roar of Time', type: 'Dragon', pvePower: 160, pvpPower: 150 },
    adventureEffect: {
      cs: 'Zastaví odpočítávání časovačů u předmětů jako Incense, Lucky Egg a Star Piece na dobu 6 minut až 24 hodin.',
      en: 'Pauses the timer of in-game items such as Incense, Lucky Eggs, and Star Pieces for 6 minutes up to 24 hours.',
      ja: 'おこう、しあわせタマゴ、ほしのかけら等の有効時間を6分〜最長24時間停止させます。',
      ru: 'Останавливает таймеры предметов Incense, Lucky Egg и Star Piece на время от 6 минут до 24 часов.'
    }
  },
  'PALKIA_ORIGIN': {
    signatureMove: { name: 'Spacial Rend', type: 'Dragon', pvePower: 160, pvpPower: 105 },
    adventureEffect: {
      cs: 'Rozšiřuje dosah detekce divokých Pokémonů na mapě z 80 metrů na 160 metrů na dobu 10 minut až 24 hodin.',
      en: 'Expands the map radius for encountering wild Pokémon from 80m to 160m for 10 minutes up to 24 hours.',
      ja: '野生のポケモンと遭遇できるマップ上の範囲を80mから160mへ拡大します。',
      ru: 'Увеличивает радиус обнаружения диких покемонов на карте с 80 до 160 метров на 10 минут до 24 часов.'
    }
  },
  'GIRATINA_ORIGIN': {
    signatureMove: { name: 'Shadow Force', type: 'Ghost', pvePower: 140, pvpPower: 120 }
  },
  'ZACIAN_CROWNED_SWORD': {
    signatureMove: { name: 'Behemoth Blade', type: 'Steel', pvePower: 150, pvpPower: 130 }
  },
  'ZAMAZENTA_CROWNED_SHIELD': {
    signatureMove: { name: 'Behemoth Bash', type: 'Steel', pvePower: 150, pvpPower: 130 }
  }
};

const STARTER_DEX_IDS = new Set<number>([
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  152, 153, 154, 155, 156, 157, 158, 159, 160,
  252, 253, 254, 255, 256, 257, 258, 259, 260,
  387, 388, 389, 390, 391, 392, 393, 394, 395,
  495, 496, 497, 498, 499, 500, 501, 502, 503,
  650, 651, 652, 653, 654, 655, 656, 657, 658,
  722, 723, 724, 725, 726, 727, 728, 729, 730,
  810, 811, 812, 813, 814, 815, 816, 817, 818,
  906, 907, 908, 909, 910, 911, 912, 913, 914
]);

const BABY_DEX_IDS = new Set<number>([
  172, 173, 174, 175, 236, 238, 239, 240,
  298, 360, 406, 433, 438, 439, 440, 446, 447, 458, 848
]);

const PARADOX_DEX_IDS = new Set<number>([
  984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995,
  1005, 1006, 1009, 1010, 1020, 1021, 1022, 1023
]);

const UNRELEASED_GEN_1_TO_7_IDS = new Set<number>([
  489, 490, 493, 746, 771, 772, 773, 774, 778, 801
]);

const RELEASED_GEN_8_IDS = new Set<number>([
  810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820,
  821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832,
  833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844,
  845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856,
  857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 870,
  872, 873, 874, 876, 877, 884, 885, 886, 887, 888, 889, 890,
  891, 892, 893, 894, 895, 899, 900, 901, 903, 904, 905
]);

const RELEASED_GEN_9_IDS = new Set<number>([
  906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916,
  917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927,
  928, 929, 930, 935, 936, 937, 938, 939, 944, 945, 953,
  954, 955, 956, 957, 958, 959, 960, 961, 962, 965, 966,
  968, 971, 972, 974, 975, 978, 979, 980, 982, 983, 996,
  997, 998, 999, 1000, 1011, 1012, 1013, 1019
]);

const PURIFICATION_1000_IDS = new Set<number>([
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 41, 42, 129, 130, 161, 162, 263, 264, 265, 266, 267, 268, 269, 304, 305, 306
]);

const FORMS_EXCLUDED_FROM_SHADOW = new Set<string>([
  'NECROZMA_DAWN_WINGS', 'NECROZMA_DUSK_MANE', 'NECROZMA_ULTRA',
  'KYUREM_BLACK', 'KYUREM_WHITE',
  'ZACIAN_CROWNED_SWORD', 'ZAMAZENTA_CROWNED_SHIELD',
  'ETERNATUS_ETERNAMAX', 'ETERNATUS',
  'CALYREX_ICE_RIDER', 'CALYREX_SHADOW_RIDER', 'CALYREX',
  'PALAFIN_HERO', 'PALAFIN_ZERO',
  'KORAIDON_APEX', 'KORAIDON',
  'MIRAIDON_ULTIMATE', 'MIRAIDON',
  'TERAPAGOS_STELLAR', 'TERAPAGOS_TERASTAL', 'TERAPAGOS',
  'PECHARUNT', 'OGERPON',
  'TING_LU', 'CHIEN_PAO', 'WO_CHIEN', 'CHI_YU',
  'OKIDOGI', 'MUNKIDORI', 'FEZANDIPITI'
]);

// Shadow duplicates to skip from regionForms
const SHADOW_DUPLICATE_KEYS = new Set<string>([
  'RAIKOU_S', 'ENTEI_S', 'SUICUNE_S', 'LUGIA_S', 'HO_OH_S', 'LATIAS_S', 'LATIOS_S'
]);

// ─── HELPERS ────────────────────────────────────────────────────────────────

function parseTypeName(apiType: string | undefined): string {
  if (!apiType) return 'Normal';
  return apiType
    .replace('POKEMON_TYPE_', '')
    .toLowerCase()
    .replace(/^./, c => c.toUpperCase());
}

function getTypes(primary: { type: string } | undefined | null, secondary: { type: string } | undefined | null): string[] {
  const types: string[] = [];
  if (primary?.type) types.push(parseTypeName(primary.type));
  if (secondary?.type) types.push(parseTypeName(secondary.type));
  return types.length > 0 ? types : ['Normal'];
}

function formatSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getRarityClass(p: any): string {
  const dex = p.dexNr;
  if (p.pokemonClass === 'POKEMON_CLASS_LEGENDARY') return 'legendary';
  if (p.pokemonClass === 'POKEMON_CLASS_MYTHICAL') return 'mythical';
  if (p.pokemonClass === 'POKEMON_CLASS_ULTRA_BEAST') return 'ultra_beast';
  if (PARADOX_DEX_IDS.has(dex)) return 'paradox';
  if (STARTER_DEX_IDS.has(dex)) return 'starter';
  if (BABY_DEX_IDS.has(dex)) return 'baby';
  return 'standard';
}

function isPokemonReleased(dex: number): boolean {
  if (dex <= 809) return !UNRELEASED_GEN_1_TO_7_IDS.has(dex);
  if (dex <= 905) return RELEASED_GEN_8_IDS.has(dex);
  if (dex <= 1025) return RELEASED_GEN_9_IDS.has(dex);
  return false;
}

function getPurificationCost(dex: number, rarityClass: string): number {
  if (rarityClass === 'legendary' || rarityClass === 'mythical' || rarityClass === 'ultra_beast') return 20000;
  if (PURIFICATION_1000_IDS.has(dex)) return 1000;
  if (rarityClass === 'starter' || dex > 700) return 3000;
  return 3000;
}

function extractMoves(source: any): { quickMoves: any[]; cinematicMoves: any[] } {
  const quickMoves: any[] = [];
  const seenQuick = new Set<string>();
  if (source.quickMoves && typeof source.quickMoves === 'object') {
    for (const m of Object.values(source.quickMoves as Record<string, any>)) {
      const name = m.names?.English || m.id;
      if (!seenQuick.has(name)) {
        seenQuick.add(name);
        quickMoves.push({
          name,
          type: parseTypeName(m.type?.type),
          isElite: false
        });
      }
    }
  }
  if (source.eliteQuickMoves && typeof source.eliteQuickMoves === 'object') {
    for (const m of Object.values(source.eliteQuickMoves as Record<string, any>)) {
      const name = m.names?.English || m.id;
      if (!seenQuick.has(name)) {
        seenQuick.add(name);
        quickMoves.push({
          name,
          type: parseTypeName(m.type?.type),
          isElite: true
        });
      }
    }
  }

  const cinematicMoves: any[] = [];
  const seenCharged = new Set<string>();
  if (source.cinematicMoves && typeof source.cinematicMoves === 'object') {
    for (const m of Object.values(source.cinematicMoves as Record<string, any>)) {
      const name = m.names?.English || m.id;
      if (!seenCharged.has(name)) {
        seenCharged.add(name);
        cinematicMoves.push({
          name,
          type: parseTypeName(m.type?.type),
          isElite: false
        });
      }
    }
  }
  if (source.eliteCinematicMoves && typeof source.eliteCinematicMoves === 'object') {
    for (const m of Object.values(source.eliteCinematicMoves as Record<string, any>)) {
      const name = m.names?.English || m.id;
      if (!seenCharged.has(name)) {
        seenCharged.add(name);
        cinematicMoves.push({
          name,
          type: parseTypeName(m.type?.type),
          isElite: true
        });
      }
    }
  }

  return { quickMoves, cinematicMoves };
}

// ─── MAIN BUILD PIPELINE ────────────────────────────────────────────────────

async function main() {
  console.log('🔄 Loading cached Game Master data from:', CACHE_PATH);
  if (!fs.existsSync(CACHE_PATH)) {
    throw new Error(`Pokedex cache not found at ${CACHE_PATH}! Run scraper or check backend data.`);
  }

  const rawData = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
  console.log(`📊 Loaded ${rawData.length} raw entries.`);

  // 1. Build Adjacency Graph for Evolution Families
  const idToDex = new Map<string, number>();
  for (const p of rawData) {
    idToDex.set(p.id, p.dexNr);
  }

  const adj = new Map<number, Set<number>>();
  for (const p of rawData) {
    if (!adj.has(p.dexNr)) adj.set(p.dexNr, new Set());
    if (p.evolutions && Array.isArray(p.evolutions)) {
      for (const evo of p.evolutions) {
        const targetDex = idToDex.get(evo.id);
        if (targetDex && targetDex !== p.dexNr) {
          adj.get(p.dexNr)!.add(targetDex);
          if (!adj.has(targetDex)) adj.set(targetDex, new Set());
          adj.get(targetDex)!.add(p.dexNr);
        }
      }
    }
  }

  function getFamily(startDex: number): number[] {
    const visited = new Set<number>();
    const queue = [startDex];
    visited.add(startDex);
    while (queue.length > 0) {
      const cur = queue.shift()!;
      const neighbors = adj.get(cur) || new Set();
      for (const n of neighbors) {
        if (!visited.has(n)) {
          visited.add(n);
          queue.push(n);
        }
      }
    }
    return Array.from(visited).sort((a, b) => a - b);
  }

  // 2. Synthesize each species
  const catalogEntries: any[] = [];

  for (const p of rawData) {
    const dexId = p.dexNr;
    const nameEn = p.names?.English || p.id;
    const nameJa = p.names?.Japanese || nameEn;
    const slug = formatSlug(nameEn);

    // Canonical Base Types Correction (Zacian & Zamazenta Hero forms)
    let types = getTypes(p.primaryType, p.secondaryType);
    if (p.id === 'ZACIAN') {
      types = ['Fairy'];
    } else if (p.id === 'ZAMAZENTA') {
      types = ['Fighting'];
    }

    const stats = {
      attack: p.stats?.attack || 10,
      defense: p.stats?.defense || 10,
      stamina: p.stats?.stamina || 10
    };

    const maxCp = {
      lv15: calculateCp(stats.attack, stats.defense, stats.stamina, CPM_LV15),
      lv20: calculateCp(stats.attack, stats.defense, stats.stamina, CPM_LV20),
      lv25: calculateCp(stats.attack, stats.defense, stats.stamina, CPM_LV25),
      lv40: calculateCp(stats.attack, stats.defense, stats.stamina, CPM_LV40),
      lv50: calculateCp(stats.attack, stats.defense, stats.stamina, CPM_LV50)
    };

    const rarityClass = getRarityClass(p);
    const isReleased = isPokemonReleased(dexId);
    const hasDyn = DYNAMAX_ELIGIBLE_DEX_IDS.has(dexId) || Boolean(GMAX_POKEAPI_IDS[slug]);
    const hasGmax = Boolean(GMAX_POKEAPI_IDS[slug]);
    const hasShadow = isReleased && !FORMS_EXCLUDED_FROM_SHADOW.has(p.id) && rarityClass !== 'mythical';

    // Build Variants
    const variants: any[] = [];

    // A. Megas & Primals
    let hasMega = false;
    if (p.megaEvolutions && typeof p.megaEvolutions === 'object' && !Array.isArray(p.megaEvolutions)) {
      for (const [megaKey, megaVal] of Object.entries(p.megaEvolutions as Record<string, any>)) {
        if (CANONICAL_MEGA_POKEAPI_IDS[megaKey]) {
          hasMega = true;
          const isPrimal = megaKey.includes('PRIMAL');
          const mTypes = getTypes(megaVal.primaryType, megaVal.secondaryType);
          const mStats = {
            attack: megaVal.stats?.attack || stats.attack,
            defense: megaVal.stats?.defense || stats.defense,
            stamina: megaVal.stats?.stamina || stats.stamina
          };
          const mCp = calculateCp(mStats.attack, mStats.defense, mStats.stamina, CPM_LV50);
          const pokeapiId = CANONICAL_MEGA_POKEAPI_IDS[megaKey];

          variants.push({
            id: megaKey,
            category: isPrimal ? 'primal' : 'mega',
            name: {
              cs: megaVal.names?.English || megaKey,
              en: megaVal.names?.English || megaKey,
              ja: megaVal.names?.Japanese || (isPrimal ? `ゲンシ${nameJa}` : `メガ${nameJa}`),
              ru: megaVal.names?.English || megaKey
            },
            types: mTypes,
            stats: mStats,
            maxCp: mCp,
            megaEnergyFirstCost: megaVal.energyCost || (isPrimal ? 400 : 200),
            spriteOverrides: {
              officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeapiId}.png`,
              shinyArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeapiId}.png`
            }
          });
        }
      }
    }

    // B. Gigantamax
    if (hasGmax) {
      const gmaxId = GMAX_POKEAPI_IDS[slug];
      const gmaxMove = GMAX_MOVES[slug] || 'G-Max Strike';
      variants.push({
        id: `${p.id}_GMAX`,
        category: 'gigantamax',
        name: {
          cs: `Gigantamax ${nameEn}`,
          en: `Gigantamax ${nameEn}`,
          ja: `キョダイマックス ${nameJa}`,
          ru: `Гигантамакс ${nameEn}`
        },
        types: types,
        stats: stats,
        maxCp: maxCp.lv50,
        gmaxMoveName: gmaxMove,
        spriteOverrides: {
          officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${gmaxId}.png`,
          shinyArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${gmaxId}.png`
        }
      });
    }

    // C. Dynamax
    if (hasDyn && !hasGmax) {
      variants.push({
        id: `${p.id}_DYNAMAX`,
        category: 'dynamax',
        name: {
          cs: `Dynamax ${nameEn}`,
          en: `Dynamax ${nameEn}`,
          ja: `ダイマックス ${nameJa}`,
          ru: `Динамакс ${nameEn}`
        },
        types: types,
        stats: stats,
        maxCp: maxCp.lv50
      });
    }

    // D. Shadow
    if (hasShadow) {
      const shadowStats = {
        attack: Math.round(stats.attack * 1.2),
        defense: Math.round(stats.defense * (5 / 6)),
        stamina: stats.stamina
      };
      variants.push({
        id: `${p.id}_SHADOW`,
        category: 'shadow',
        name: {
          cs: `Shadow ${nameEn}`,
          en: `Shadow ${nameEn}`,
          ja: `シャドウ ${nameJa}`,
          ru: `Теневой ${nameEn}`
        },
        types: types,
        stats: shadowStats,
        maxCp: maxCp.lv50,
        purificationStardust: getPurificationCost(dexId, rarityClass)
      });
    }

    // E. Comprehensive RegionForms (Regional, Fusions, Battle Forms, Alternate Forms)
    let hasRegional = false;
    let hasFusion = false;
    let hasBattleForm = false;
    let hasAlternateForm = false;

    if (p.regionForms && typeof p.regionForms === 'object' && !Array.isArray(p.regionForms)) {
      for (const [rfKey, rfVal] of Object.entries(p.regionForms as Record<string, any>)) {
        if (SHADOW_DUPLICATE_KEYS.has(rfKey)) continue;
        if (rfKey.startsWith('UNOWN_') || rfKey.startsWith('SPINDA_')) continue;
        if (rfKey.includes('HALLOWEEN')) continue;

        // Determine Classification
        const isRegional = rfKey.includes('ALOLA') || rfKey.includes('GALAR') || rfKey.includes('HISUI') || rfKey.includes('PALDEA');
        const isFusion = FUSION_KEYS.has(rfKey);
        const isBattleForm = BATTLE_FORM_KEYS.has(rfKey);

        let category: 'regional' | 'fusion' | 'battle_form' | 'alternate_form' = 'alternate_form';
        if (isRegional) {
          category = 'regional';
          hasRegional = true;
        } else if (isFusion) {
          category = 'fusion';
          hasFusion = true;
        } else if (isBattleForm) {
          category = 'battle_form';
          hasBattleForm = true;
        } else {
          category = 'alternate_form';
          hasAlternateForm = true;
        }

        let region: 'alola' | 'galar' | 'hisui' | 'paldea' | undefined = undefined;
        if (isRegional) {
          if (rfKey.includes('GALARIAN') || rfKey.includes('GALAR')) region = 'galar';
          else if (rfKey.includes('HISUIAN') || rfKey.includes('HISUI')) region = 'hisui';
          else if (rfKey.includes('PALDEA')) region = 'paldea';
          else region = 'alola';
        }

        const rTypes = getTypes(rfVal.primaryType, rfVal.secondaryType);
        const rStats = {
          attack: rfVal.stats?.attack || stats.attack,
          defense: rfVal.stats?.defense || stats.defense,
          stamina: rfVal.stats?.stamina || stats.stamina
        };
        const rCp = calculateCp(rStats.attack, rStats.defense, rStats.stamina, CPM_LV50);

        // Sprite Resolution
        const pokeapiId = SPECIAL_FORM_POKEAPI_IDS[rfKey] || REGIONAL_POKEAPI_IDS[rfKey];
        let spriteOverrides: { officialArtwork?: string; shinyArtwork?: string; goAsset?: string } | undefined = undefined;

        if (pokeapiId) {
          spriteOverrides = {
            officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeapiId}.png`,
            shinyArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeapiId}.png`
          };
        } else if (rfVal.assets?.image) {
          spriteOverrides = {
            goAsset: rfVal.assets.image,
            officialArtwork: rfVal.assets.image,
            shinyArtwork: rfVal.assets.shinyImage || rfVal.assets.image
          };
        }

        // Form Movesets
        const { quickMoves: formQuick, cinematicMoves: formCinematic } = extractMoves(rfVal);

        // Fusion & Signature Metadata
        const fusionData = FUSION_METADATA[rfKey];
        const signatureData = SIGNATURE_FORM_METADATA[rfKey];

        const formVariant: any = {
          id: rfKey,
          category,
          name: {
            cs: rfVal.names?.English || rfKey,
            en: rfVal.names?.English || rfKey,
            ja: rfVal.names?.Japanese || (region ? `${nameJa} (${region})` : (rfVal.names?.English || rfKey)),
            ru: rfVal.names?.English || rfKey
          },
          types: rTypes,
          stats: rStats,
          maxCp: rCp
        };

        if (region) formVariant.regionalRegion = region;
        if (spriteOverrides) formVariant.spriteOverrides = spriteOverrides;
        if (formQuick.length > 0) formVariant.quickMoves = formQuick;
        if (formCinematic.length > 0) formVariant.cinematicMoves = formCinematic;

        if (fusionData) {
          formVariant.fusionPartner = fusionData.partner;
          formVariant.fusionEnergyCost = {
            energyType: fusionData.energyType,
            energyAmount: fusionData.energyAmount,
            candy1: fusionData.candy1,
            candy1Amount: fusionData.candy1Amount,
            candy2: fusionData.candy2,
            candy2Amount: fusionData.candy2Amount
          };
          formVariant.signatureMove = fusionData.signatureMove;
          if (fusionData.adventureEffect) formVariant.adventureEffect = fusionData.adventureEffect;
        }

        if (signatureData) {
          formVariant.signatureMove = signatureData.signatureMove;
          if (signatureData.adventureEffect) formVariant.adventureEffect = signatureData.adventureEffect;
        }

        variants.push(formVariant);
      }
    }

    // F. Synthesize Missing Calyrex Shadow Rider (#898)
    if (p.id === 'CALYREX') {
      const hasShadowRider = variants.some(v => v.id === 'CALYREX_SHADOW_RIDER');
      if (!hasShadowRider) {
        hasFusion = true;
        const shadowStats = { attack: 324, defense: 186, stamina: 205 };
        variants.push({
          id: 'CALYREX_SHADOW_RIDER',
          category: 'fusion',
          name: {
            cs: 'Calyrex (Shadow Rider)',
            en: 'Calyrex (Shadow Rider)',
            ja: 'バドレックス (こくばじょうのすがた)',
            ru: 'Calyrex (Shadow Rider)'
          },
          types: ['Psychic', 'Ghost'],
          stats: shadowStats,
          maxCp: calculateCp(shadowStats.attack, shadowStats.defense, shadowStats.stamina, CPM_LV50),
          fusionPartner: 'Spectrier',
          fusionEnergyCost: {
            energyType: 'Reins of Unity',
            energyAmount: 1,
            candy1: 'Calyrex Candy',
            candy1Amount: 30,
            candy2: 'Spectrier Candy',
            candy2Amount: 30
          },
          signatureMove: {
            name: 'Astral Barrage',
            type: 'Ghost',
            pvePower: 140,
            pvpPower: 130
          },
          spriteOverrides: {
            officialArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10194.png',
            shinyArtwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/10194.png'
          },
          quickMoves: [
            { name: 'Confusion', type: 'Psychic', isElite: false },
            { name: 'Hex', type: 'Ghost', isElite: false }
          ],
          cinematicMoves: [
            { name: 'Shadow Ball', type: 'Ghost', isElite: false },
            { name: 'Psychic', type: 'Psychic', isElite: false },
            { name: 'Energy Ball', type: 'Grass', isElite: false }
          ]
        });
      }
    }

    // Evolutions
    const evolutions: any[] = [];
    if (p.evolutions && Array.isArray(p.evolutions)) {
      for (const evo of p.evolutions) {
        const targetDex = idToDex.get(evo.id);
        if (targetDex) {
          evolutions.push({
            targetDexId: targetDex,
            targetName: evo.id,
            candies: evo.candies || 25,
            itemRequired: evo.item?.id || null,
            questRequirement: evo.quests?.[0]?.names?.English || null
          });
        }
      }
    }

    // Movesets (Clean & compact for base species)
    const { quickMoves, cinematicMoves } = extractMoves(p);

    catalogEntries.push({
      dexId,
      slug,
      generation: p.generation || 1,
      names: {
        cs: nameEn,
        en: nameEn,
        ja: nameJa,
        ru: nameEn
      },
      types,
      stats,
      maxCp,
      rarityClass,
      isReleasedInGo: isReleased,
      canBeShinyInGo: isReleased && dexId <= 800,
      hasDynamax: hasDyn,
      hasGigantamax: hasGmax,
      hasMega,
      hasShadow,
      hasRegionalVariants: hasRegional,
      hasFusions: hasFusion,
      hasBattleForms: hasBattleForm,
      hasAlternateForms: hasAlternateForm,
      variants,
      evolutions,
      evolutionChainIds: getFamily(dexId),
      quickMoves,
      cinematicMoves
    });
  }

  // Sort by dexId ascending
  catalogEntries.sort((a, b) => a.dexId - b.dexId);

  // 1. Write pokedexCatalog.json (compact minified)
  const jsonContent = JSON.stringify(catalogEntries);
  fs.writeFileSync(JSON_OUTPUT_PATH, jsonContent, 'utf-8');
  console.log(`✅ Pokedex JSON written to: ${JSON_OUTPUT_PATH}`);
  console.log(`📦 JSON Size: ${(Buffer.byteLength(jsonContent, 'utf-8') / 1024).toFixed(1)} KB`);

  // 2. Write pokedexCatalog.ts (clean TypeScript interface and typed wrapper)
  const tsContent = `/**
 * pokedexCatalog.ts — Complete Static Pokédex Database for Pokémon GO
 *
 * Generated automatically by backend/src/scripts/generatePokedexCatalog.ts
 */

import pokedexDataJson from './pokedexCatalog.json';

export type PokemonType =
  | 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice'
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug'
  | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export type VariantCategory =
  | 'mega'
  | 'primal'
  | 'gigantamax'
  | 'dynamax'
  | 'shadow'
  | 'regional'
  | 'fusion'
  | 'battle_form'
  | 'alternate_form';

export type RegionalRegion = 'alola' | 'galar' | 'hisui' | 'paldea';
export type RarityClass = 'standard' | 'starter' | 'baby' | 'legendary' | 'mythical' | 'ultra_beast' | 'paradox';

export interface PokedexMove {
  name: string;
  type: PokemonType;
  isElite?: boolean;
}

export interface PokedexVariant {
  id: string;
  category: VariantCategory;
  name: Record<'cs' | 'en' | 'ja' | 'ru', string>;
  types: PokemonType[];
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
  maxCp: number;
  regionalRegion?: RegionalRegion;
  gmaxMoveName?: string;
  megaEnergyFirstCost?: number;
  purificationStardust?: number;
  // Fusion & Signature mechanics
  fusionPartner?: string;
  fusionEnergyCost?: {
    energyType: string;
    energyAmount: number;
    candy1: string;
    candy1Amount: number;
    candy2?: string;
    candy2Amount?: number;
  };
  signatureMove?: {
    name: string;
    type: PokemonType;
    pvePower?: number;
    pvpPower?: number;
  };
  adventureEffect?: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  quickMoves?: PokedexMove[];
  cinematicMoves?: PokedexMove[];
  spriteOverrides?: {
    officialArtwork?: string;
    shinyArtwork?: string;
    goAsset?: string;
  };
}

export interface EvolutionNode {
  targetDexId: number;
  targetName: string;
  candies: number;
  itemRequired?: string | null;
  questRequirement?: string | null;
}

export interface PokedexCatalogEntry {
  dexId: number;
  slug: string;
  generation: number;
  names: {
    cs: string;
    en: string;
    ja: string;
    ru: string;
  };
  types: PokemonType[];
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
  maxCp: {
    lv15: number;
    lv20: number;
    lv25: number;
    lv40: number;
    lv50: number;
  };
  rarityClass: RarityClass;
  isReleasedInGo: boolean;
  canBeShinyInGo: boolean;
  hasDynamax: boolean;
  hasGigantamax: boolean;
  hasMega: boolean;
  hasShadow: boolean;
  hasRegionalVariants: boolean;
  hasFusions?: boolean;
  hasBattleForms?: boolean;
  hasAlternateForms?: boolean;
  variants: PokedexVariant[];
  evolutions: EvolutionNode[];
  evolutionChainIds: number[];
  quickMoves: PokedexMove[];
  cinematicMoves: PokedexMove[];
}

export const POKEDEX_CATALOG: PokedexCatalogEntry[] = pokedexDataJson as unknown as PokedexCatalogEntry[];

export const POKEDEX_MAP: Record<number, PokedexCatalogEntry> = POKEDEX_CATALOG.reduce((acc, entry) => {
  acc[entry.dexId] = entry;
  return acc;
}, {} as Record<number, PokedexCatalogEntry>);

export function getPokedexEntryById(id: number | string): PokedexCatalogEntry | undefined {
  const num = typeof id === 'number' ? id : parseInt(id, 10);
  return POKEDEX_MAP[num];
}

export function getPokedexEntryBySlug(slug: string): PokedexCatalogEntry | undefined {
  const clean = slug.toLowerCase().trim();
  return POKEDEX_CATALOG.find(e => e.slug === clean || e.names.en.toLowerCase() === clean);
}
`;

  fs.writeFileSync(TS_OUTPUT_PATH, tsContent, 'utf-8');
  console.log(`✅ Pokedex TS wrapper written to: ${TS_OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('❌ Error generating pokedex catalog:', err);
  process.exit(1);
});
