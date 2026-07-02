export interface RaidCounters {
  bossName: string;
  weaknesses: string[];
  megaCounters: string[];
  advancedCounters: string[];
  budgetCounters: string[];
  minCp: number;
  maxCp: number; // 100% IV CP
  minBoostedCp: number;
  maxBoostedCp: number; // 100% IV boosted CP
  weatherBoosts: string[];
}

export const raidCountersDb: Record<string, RaidCounters> = {
  "necrozma": {
    bossName: "Necrozma (Základní forma)",
    weaknesses: ["Ghost", "Dark", "Bug"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Banette"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Darkrai (Dark Pulse)", "Giratina Origin (Shadow Ball)", "Gengar (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Tyranitar (Crunch)", "Houndoom (Foul Play)", "Weavile (Foul Play)"],
    minCp: 2009,
    maxCp: 2104,
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "necrozma (dusk mane)": {
    bossName: "Necrozma (Dusk Mane)",
    weaknesses: ["Fire", "Ground", "Ghost", "Dark"],
    megaCounters: ["Mega Blaziken", "Mega Charizard Y", "Mega Houndoom", "Primal Groudon"],
    advancedCounters: ["Reshiram (Overheat)", "Chandelure (Overheat)", "Groudon (Precipice Blades)", "Darkrai (Dark Pulse)", "Shadow Chandelure"],
    budgetCounters: ["Charizard (Blast Burn)", "Flareon (Overheat)", "Excadrill (Earthquake)", "Darmanitan (Overheat)", "Tyranitar (Crunch)"],
    minCp: 2009,
    maxCp: 2104, // In raids, you catch base Necrozma after defeat
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)", "Slunečno (Sunny)"]
  },
  "necrozma (dawn wings)": {
    bossName: "Necrozma (Dawn Wings)",
    weaknesses: ["Ghost (2x)", "Dark (2x)"],
    megaCounters: ["Mega Gengar", "Mega Tyranitar", "Mega Houndoom"],
    advancedCounters: ["Hydreigon (Brutal Swing)", "Tyranitar (Brutal Swing)", "Giratina Origin (Shadow Ball)", "Darkrai (Dark Pulse)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Weavile (Foul Play)", "Honchkrow (Dark Pulse)", "Houndoom (Foul Play)"],
    minCp: 2009,
    maxCp: 2104, // In raids, you catch base Necrozma after defeat
    minBoostedCp: 2511,
    maxBoostedCp: 2630,
    weatherBoosts: ["Větrno (Windy)", "Mlha (Fog)"]
  },
  "zekrom": {
    bossName: "Zekrom",
    weaknesses: ["Dragon", "Ground", "Ice", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gardevoir", "Mega Latios"],
    advancedCounters: ["Rayquaza (Outrage)", "Salamence (Outrage)", "Garchomp (Outrage)", "Haxorus (Breaking Swipe)", "Palkia (Spacial Rend)"],
    budgetCounters: ["Dragonite (Outrage)", "Mamoswine (Avalanche)", "Gardevoir (Dazzling Gleam)", "Excadrill (Drill Run)"],
    minCp: 2217,
    maxCp: 2307,
    minBoostedCp: 2771,
    maxBoostedCp: 2884,
    weatherBoosts: ["Větrno (Windy)", "Deštivo (Rainy)"]
  },
  "mega lopunny": {
    bossName: "Mega Lopunny",
    weaknesses: ["Fighting", "Psychic", "Flying", "Fairy"],
    megaCounters: ["Mega Alakazam", "Mega Gardevoir", "Mega Rayquaza"],
    advancedCounters: ["Mewtwo (Psystrike)", "Terrakion (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Gardevoir (Psychic)", "Alakazam (Psychic)", "Gallade (Psychic)"],
    minCp: 1112,
    maxCp: 1177, // Catches regular Lopunny
    minBoostedCp: 1390,
    maxBoostedCp: 1471,
    weatherBoosts: ["Zataženo (Cloudy)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega rayquaza": {
    bossName: "Mega Rayquaza",
    weaknesses: ["Ice (2x)", "Dragon", "Rock", "Fairy"],
    megaCounters: ["Mega Gardevoir", "Mega Glalie", "Mega Latios"],
    advancedCounters: ["Mamoswine (Avalanche)", "Baxcalibur (Avalanche)", "Galarian Darmanitan (Avalanche)", "Kyurem (Glaciate)"],
    budgetCounters: ["Glaceon (Avalanche)", "Weavile (Avalanche)", "Dragonite (Outrage)", "Sylveon (Dazzling Gleam)"],
    minCp: 2102,
    maxCp: 2191, // Catches standard Rayquaza
    minBoostedCp: 2627,
    maxBoostedCp: 2739,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "mega gardevoir": {
    bossName: "Mega Gardevoir",
    weaknesses: ["Poison", "Ghost", "Steel"],
    megaCounters: ["Mega Gengar", "Mega Beedrill", "Mega Scizor"],
    advancedCounters: ["Metagross (Meteor Mash)", "Nihilego (Poison Jab)", "Gengar (Shadow Ball)", "Giratina Origin (Shadow Ball)"],
    budgetCounters: ["Chandelure (Shadow Ball)", "Excadrill (Iron Head)", "Roserade (Sludge Bomb)", "Dialga (Iron Head)"],
    minCp: 1680,
    maxCp: 1767, // Catches regular Gardevoir
    minBoostedCp: 2100,
    maxBoostedCp: 2209,
    weatherBoosts: ["Zataženo (Cloudy)", "Větrno (Windy)"]
  },
  "mega tyranitar": {
    bossName: "Mega Tyranitar",
    weaknesses: ["Fighting (2x)", "Ground", "Bug", "Water", "Grass", "Steel", "Fairy"],
    megaCounters: ["Mega Heracross", "Mega Lopunny", "Mega Blaziken"],
    advancedCounters: ["Terrakion (Sacred Sword)", "Keldeo (Sacred Sword)", "Lucario (Aura Sphere)", "Conkeldurr (Dynamic Punch)"],
    budgetCounters: ["Machamp (Dynamic Punch)", "Hariyama (Dynamic Punch)", "Breloom (Dynamic Punch)", "Toxicroak (Dynamic Punch)"],
    minCp: 2111,
    maxCp: 2199, // Catches regular Tyranitar
    minBoostedCp: 2639,
    maxBoostedCp: 2749,
    weatherBoosts: ["Mlha (Fog)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega gengar": {
    bossName: "Mega Gengar",
    weaknesses: ["Ghost", "Dark", "Ground", "Psychic"],
    megaCounters: ["Mega Tyranitar", "Mega Houndoom", "Mega Alakazam"],
    advancedCounters: ["Mewtwo (Psystrike)", "Hydreigon (Brutal Swing)", "Garchomp (Earth Power)", "Giratina Origin (Shadow Ball)"],
    budgetCounters: ["Tyranitar (Crunch)", "Chandelure (Shadow Ball)", "Excadrill (Drill Run)", "Espeon (Psychic)"],
    minCp: 1564,
    maxCp: 1644,
    minBoostedCp: 1955,
    maxBoostedCp: 2055,
    weatherBoosts: ["Mlha (Fog)", "Zataženo (Cloudy)"]
  },
  "mega scizor": {
    bossName: "Mega Scizor",
    weaknesses: ["Fire (2x)"],
    megaCounters: ["Mega Blaziken", "Mega Charizard Y", "Mega Houndoom"],
    advancedCounters: ["Reshiram (Overheat)", "Chandelure (Overheat)", "Heatran (Magma Storm)", "Shadow Entei (Overheat)"],
    budgetCounters: ["Charizard (Blast Burn)", "Flareon (Overheat)", "Blaziken (Blast Burn)", "Arcanine (Flamethrower)"],
    minCp: 1636,
    maxCp: 1714,
    minBoostedCp: 2046,
    maxBoostedCp: 2143,
    weatherBoosts: ["Deštivo (Rainy)", "Sněžení (Snow)"]
  },
  "hisuian decidueye": {
    bossName: "Hisuian Decidueye",
    weaknesses: ["Flying (2x)", "Fire", "Ice", "Poison", "Psychic", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Pidgeot", "Mega Charizard Y"],
    advancedCounters: ["Rayquaza (Dragon Ascent)", "Yveltal (Oblivion Wing)", "Shadow Staraptor (Fly)", "Enamorus (Fly)"],
    budgetCounters: ["Staraptor (Fly)", "Honchkrow (Sky Attack)", "Unfezant (Sky Attack)", "Togekiss (Air Slash)"],
    minCp: 1579,
    maxCp: 1655,
    minBoostedCp: 1974,
    maxBoostedCp: 2069,
    weatherBoosts: ["Slunečno (Sunny)", "Zataženo (Cloudy)"]
  },
  "druddigon": {
    bossName: "Druddigon",
    weaknesses: ["Ice", "Dragon", "Fairy"],
    megaCounters: ["Mega Rayquaza", "Mega Garchomp", "Mega Gardevoir"],
    advancedCounters: ["Rayquaza (Outrage)", "Salamence (Outrage)", "Garchomp (Outrage)", "Palkia (Spacial Rend)"],
    budgetCounters: ["Dragonite (Outrage)", "Glaceon (Avalanche)", "Gardevoir (Dazzling Gleam)", "Sylveon (Moonblast)"],
    minCp: 1487,
    maxCp: 1561,
    minBoostedCp: 1859,
    maxBoostedCp: 1951,
    weatherBoosts: ["Větrno (Windy)"]
  },
  "aerodactyl": {
    bossName: "Aerodactyl",
    weaknesses: ["Water", "Electric", "Ice", "Rock", "Steel"],
    megaCounters: ["Mega Blastoise", "Mega Manectric", "Mega Swampert"],
    advancedCounters: ["Kyogre (Origin Pulse)", "Zekrom (Fusion Bolt)", "Metagross (Meteor Mash)", "Mamoswine (Avalanche)"],
    budgetCounters: ["Swampert (Hydro Cannon)", "Electivire (Wild Charge)", "Glaceon (Avalanche)", "Rhyperior (Rock Wrecker)"],
    minCp: 1514,
    maxCp: 1590,
    minBoostedCp: 1893,
    maxBoostedCp: 1988,
    weatherBoosts: ["Větrno (Windy)", "Částečně zataženo (Partly Cloudy)"]
  },
  "mega skarmory": {
    bossName: "Mega Skarmory",
    weaknesses: ["Fire", "Electric"],
    megaCounters: ["Mega Charizard Y", "Mega Blaziken", "Mega Manectric"],
    advancedCounters: ["Reshiram (Fusion Flare)", "Zekrom (Fusion Bolt)", "Thundurus Therian (Wild Charge)", "Xurkitree (Discharge)", "Shadow Raikou (Wild Charge)"],
    budgetCounters: ["Chandelure (Overheat)", "Electivire (Wild Charge)", "Magnezone (Wild Charge)", "Flareon (Overheat)"],
    minCp: 1139,
    maxCp: 1204,
    minBoostedCp: 1424,
    maxBoostedCp: 1506,
    weatherBoosts: ["Větrno (Windy)", "Sněžení (Snow)"]
  }
};

/**
 * Helper to match a boss name to counters
 */
export function findRaidCounters(bossName: string): RaidCounters | null {
  if (!bossName) return null;
  const cleanName = bossName.toLowerCase();
  
  for (const key of Object.keys(raidCountersDb)) {
    if (cleanName.includes(key)) {
      return raidCountersDb[key];
    }
  }
  return null;
}
