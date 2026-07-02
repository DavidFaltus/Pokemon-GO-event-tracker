export interface PokemonMetaInfo {
  name: string;
  evolution: string;
  pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pveRankText: string; // e.g. "Top Ground & Ice Attacker"
  pvpRankText: string; // e.g. "Great & Ultra League Meta"
  bestFastMove: string;
  bestChargedMove: string;
  notes: string;
}

export const pokemonMetaDb: Record<string, PokemonMetaInfo> = {
  swinub: {
    name: "Swinub",
    evolution: "Mamoswine",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší ledový a špičkový zemní útočník",
    pvpRankText: "Vynikající v Master League a Premier Cupu",
    bestFastMove: "Powder Snow (Ledový) / Mud-Slap (Zemní)",
    bestChargedMove: "Avalanche (Ledový) & High Horsepower (Zemní)",
    notes: "Absolutní nutnost pro raidy. Shadow Mamoswine je vůbec nejlepší ne-Mega ledový útočník ve hře. Vyplatí se chytat s vysokým útokem (PvE) i dobrým PvP IV."
  },
  frigibax: {
    name: "Frigibax",
    evolution: "Baxcalibur",
    pveRating: "A",
    pvpRating: "A",
    pveRankText: "Skvělý ledový a dračí útočník",
    pvpRankText: "Velmi silný v Master League",
    bestFastMove: "Dragon Breath (Dračí) / Ice Fang (Ledový)",
    bestChargedMove: "Avalanche (Ledový) & Outrage (Dračí)",
    notes: "Vzácný drak. Baxcalibur je vynikající v Master League a velmi užitečný v raidech jako ledový útočník. Hledejte 100% IV (Hundo) pro Master League."
  },
  necrozma: {
    name: "Necrozma",
    evolution: "Dusk Mane / Dawn Wings",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Absolutní král ocelových a duchových útočníků",
    pvpRankText: "Dominantní meta v Master League",
    bestFastMove: "Shadow Claw (Duchový) / Metal Claw (Ocelový)",
    bestChargedMove: "Sunsteel Strike (Ocelový) / Moongeist Beam (Duchový)",
    notes: "Fúze s Solgaleo (Dusk Mane) a Lunala (Dawn Wings) jsou jedny z nejsilnějších forem v celé historii Pokémon GO. Dusk Mane vládne ocelovému typu, Dawn Wings duchovému. Hundo je prioritou číslo 1."
  },
  zekrom: {
    name: "Zekrom",
    evolution: "Zekrom",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Špičkový elektrický a dračí útočník",
    pvpRankText: "Skvělý v Master League",
    bestFastMove: "Charge Beam (Elektrický) / Dragon Breath (Dračí)",
    bestChargedMove: "Fusion Bolt* (Elektrický) & Outrage (Dračí)",
    notes: "Fusion Bolt je Signature move (vyžaduje Elite TM, pokud není chycen během speciálního eventu). Velmi silný univerzál do raidů a dobrý do Master League."
  },
  machop: {
    name: "Machop",
    evolution: "Machamp",
    pveRating: "A",
    pvpRating: "A",
    pveRankText: "Dostupný a velmi silný bojový útočník",
    pvpRankText: "Stálice v Great a Ultra League",
    bestFastMove: "Counter (Bojový)",
    bestChargedMove: "Cross Chop (Bojový) & Rock Slide (Kamenný)",
    notes: "Machamp je nestárnoucí klasik. Shadow Machamp je ještě silnější (S-Tier PvE). Chytat s nízkým útokem a vysokou obranou/HP pro PvP (Great/Ultra) a vysoké IV pro PvE."
  },
  beldum: {
    name: "Beldum",
    evolution: "Metagross",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší ne-Mega ocelový útočník",
    pvpRankText: "Nepřehlédnutelný v Master League",
    bestFastMove: "Bullet Punch (Ocelový)",
    bestChargedMove: "Meteor Mash* (Ocelový) & Earthquake (Zemní)",
    notes: "Klíčový je útok Meteor Mash (vyžaduje Elite TM nebo evoluci během eventu). Metagross je králem ocelového typu a skvěle si vede i v Master League. Shadow verze je extrémní monstrum."
  },
  larvitar: {
    name: "Larvitar",
    evolution: "Tyranitar",
    pveRating: "S",
    pvpRating: "B",
    pveRankText: "Nejlepší temný a skvělý kamenný útočník",
    pvpRankText: "Využitelný v Master League / Premier Cupu",
    bestFastMove: "Bite (Temný) / Smack Down* (Kamenný)",
    bestChargedMove: "Brutal Swing (Temný) / Stone Edge (Kamenný)",
    notes: "Mega Tyranitar a Shadow Tyranitar s Brutal Swing naprosto dominují temnému typu v raidech. Smack Down vyžaduje Elite Fast TM. Určitě grindovat sladkosti (Candy)!"
  },
  gible: {
    name: "Gible",
    evolution: "Garchomp",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Špičkový zemní a dračí útočník",
    pvpRankText: "Silný v Master League",
    bestFastMove: "Mud-Shot (Zemní) / Dragon Tail (Dračí)",
    bestChargedMove: "Earth Power* (Zemní) & Outrage (Dračí)",
    notes: "Mega Garchomp a Shadow Garchomp jsou elitní zemní útočníci. Earth Power vyžaduje Elite TM (nebo event). Skvělý cíl pro grind."
  },
  bagon: {
    name: "Bagon",
    evolution: "Salamence",
    pveRating: "S",
    pvpRating: "B",
    pveRankText: "Elitní dračí útočník",
    pvpRankText: "Průměrný v PvP",
    bestFastMove: "Dragon Tail (Dračí)",
    bestChargedMove: "Outrage* (Dračí)",
    notes: "Outrage je nezbytný (Elite TM / event). Mega Salamence a Shadow Salamence jsou v raidech monstrózní. Pro PvP se moc nehodí, ale pro PvE je to top volba."
  },
  gastly: {
    name: "Gastly",
    evolution: "Gengar",
    pveRating: "A",
    pvpRating: "B",
    pveRankText: "Vysoké poškození duchovým/jedovým typem (Glass Cannon)",
    pvpRankText: "Niche v Great/Ultra League",
    bestFastMove: "Shadow Claw (Duchový)",
    bestChargedMove: "Shadow Ball (Duchový) & Sludge Bomb (Jedový)",
    notes: "Mega Gengar má nejvyšší DPS mezi duchy, ale je velmi křehký. Shadow Gengar rozdává obrovské rány, ale rychle umírá. Dobrý pro rychlé raidy."
  },
  lickitung: {
    name: "Lickitung",
    evolution: "Lickitung",
    pveRating: "None",
    pvpRating: "S",
    pveRankText: "Nepoužitelný v raidech",
    pvpRankText: "Bůh Great League (XL Pokémon)",
    bestFastMove: "Lick (Duchový)",
    bestChargedMove: "Body Slam* (Normální) & Power Whip (Travní)",
    notes: "Body Slam vyžaduje Elite TM. Pro Great League potřebujete ideálně IV 8/14/15 a spoustu Candy XL (level 50). Extrémní tank, jeden z nejlepších pokémonů v PvP vůbec."
  },
  carbink: {
    name: "Carbink",
    evolution: "Carbink",
    pveRating: "None",
    pvpRating: "S",
    pveRankText: "Nepoužitelný v raidech",
    pvpRankText: "Top-tier tank v Great League (XL)",
    bestFastMove: "Rock Throw (Kamenný)",
    bestChargedMove: "Rock Slide (Kamenný) & Moonblast (Vílí)",
    notes: "Kombinace kamenného/vílího typu s extrémní obranou z něj dělá zeď v Great League. Vyžaduje level 50 (mnoho Candy XL) a IV blízko Hundo (např. 5/15/15)."
  },
  gligar: {
    name: "Gligar",
    evolution: "Gligar / Gliscor",
    pveRating: "None",
    pvpRating: "S",
    pveRankText: "Nepoužitelný v raidech",
    pvpRankText: "Jeden z nejlepších v Great a Ultra League",
    bestFastMove: "Wing Attack (Létající)",
    bestChargedMove: "Aerial Ace (Létající) & Dig (Zemní)",
    notes: "Gligar je momentálně králem Great League díky své flexibilitě, skvělému psaní a útoku Dig. Gliscor je zase lepší v Ultra League (s Night Slash a Earthquake)."
  },
  riolu: {
    name: "Riolu",
    evolution: "Lucario",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší bojový útočník (DPS s Aura Sphere)",
    pvpRankText: "Velmi agresivní v PvP (Great/Ultra/Premier)",
    bestFastMove: "Counter (Bojový)",
    bestChargedMove: "Aura Sphere (Bojový) & Shadow Ball (Duchový) / Power-Up Punch",
    notes: "Mega Lucario a standardní Lucario s Aura Sphere mají neuvěřitelné poškození. V PvP je křehký, ale s Power-Up Punch dokáže bleskově navyšovat útok. Určitě chytat a vyvíjet!"
  },
  ralts: {
    name: "Ralts",
    evolution: "Gardevoir / Gallade",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Nejlepší vílí útočník (Gardevoir)",
    pvpRankText: "Velmi silný v PvP Premier pohárech",
    bestFastMove: "Charm (Vílí) / Confusion (Psychický)",
    bestChargedMove: "Dazzling Gleam (Vílí) / Psychic (Psychický)",
    notes: "Mega Gardevoir je nejsilnější vílí pokémon pro raidy. Shadow Gardevoir s Charmem dokáže v PvP bleskově zničit draky a bojové typy. Gallade je skvělý v PvP s Leaf Blade."
  },
  belsprout: {
    name: "Bellsprout",
    evolution: "Victreebel",
    pveRating: "B",
    pvpRating: "A",
    pveRankText: "Průměrný travní útočník",
    pvpRankText: "Legendární 'Razor Leaf' fast-move útočník v PvP",
    bestFastMove: "Razor Leaf (Travní)",
    bestChargedMove: "Leaf Blade (Travní) & Acid Spray (Jedový)",
    notes: "Shadow Victreebel je noční můrou v PvP (Great League). Jeho rychlý útok Razor Leaf uděluje extrémní poškození bez ohledu na štíty soupeře. Vyžaduje specifické PvP IV."
  },
  kyogre: {
    name: "Kyogre",
    evolution: "Kyogre",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Král vodních útočníků (Primal form)",
    pvpRankText: "Jeden z nejlepších v Master League",
    bestFastMove: "Waterfall (Vodní)",
    bestChargedMove: "Origin Pulse* (Vodní) & Surf (Vodní) / Blizzard",
    notes: "Primal Kyogre je absolutním vrcholem vodních pokémonů. Origin Pulse vyžaduje Elite TM. V Master League je stálou hrozbou."
  },
  groudon: {
    name: "Groudon",
    evolution: "Groudon",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Král zemních útočníků (Primal form)",
    pvpRankText: "Dominantní síla v Master League",
    bestFastMove: "Mud-Shot (Zemní)",
    bestChargedMove: "Precipice Blades* (Zemní) & Fire Punch* / Solar Beam",
    notes: "Primal Groudon s Precipice Blades je nejlepším zemním útočníkem ve hře. Shadow Groudon (z Giovanniho) je rovněž špička. Precipice Blades i Fire Punch vyžadují Elite TM. Priorita na Hundo."
  },
  rayquaza: {
    name: "Rayquaza",
    evolution: "Rayquaza",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: "Nejsilnější Pokémon ve hře vůbec (Mega form)",
    pvpRankText: "Skvělý v Master League",
    bestFastMove: "Dragon Tail (Dračí)",
    bestChargedMove: "Dragon Ascent* (Létající) & Outrage (Dračí)",
    notes: "Mega Rayquaza s útokem Dragon Ascent (vyžaduje Meteorit) je nejsilnějším útočníkem v historii hry. Shadow Rayquaza je také extrémně silný. Rozhodně chytat a maxovat!"
  },
  kartana: {
    name: "Kartana",
    evolution: "Kartana",
    pveRating: "S",
    pvpRating: "C",
    pveRankText: "Nejlepší travní útočník s obrovským DPS",
    pvpRankText: "Příliš křehký pro PvP",
    bestFastMove: "Razor Leaf (Travní)",
    bestChargedMove: "Leaf Blade (Travní)",
    notes: "Jeho útok je obrovský, v raidech jako travní útočník naprosto dominuje a překonává i mnohé Shadow formy. Hledejte vysoké IV pro raidy."
  },
  xurkitree: {
    name: "Xurkitree",
    evolution: "Xurkitree",
    pveRating: "S",
    pvpRating: "C",
    pveRankText: "Nejlepší ne-stínový elektrický útočník",
    pvpRankText: "Špatný v PvP kvůli slabé obraně",
    bestFastMove: "Thunder Shock (Elektrický)",
    bestChargedMove: "Discharge (Elektrický) & Power Whip (Travní)",
    notes: "Má fantastický útok a skvělý moveset. Power Whip jako pokrytí proti zemním typům v raidech je skvělý bonus."
  },
  terrakion: {
    name: "Terrakion",
    evolution: "Terrakion",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: "Elitní bojový a kamenný útočník",
    pvpRankText: "Velmi použitelný v Master League",
    bestFastMove: "Double Kick (Bojový)",
    bestChargedMove: "Sacred Sword* (Bojový) & Rock Slide (Kamenný)",
    notes: "Sacred Sword vyžaduje Elite TM. Jeden z nejkonzistentnějších bojových útočníků ve hře, překonávající i většinu stínových bojových pokémonů."
  }
};

/**
 * Helper to match a pokémon name from text to our database.
 * Returns the meta info if found.
 */
export function findPokemonMeta(text: string): PokemonMetaInfo | null {
  if (!text) return null;
  const cleanText = text.toLowerCase();
  for (const key of Object.keys(pokemonMetaDb)) {
    if (cleanText.includes(key)) {
      return pokemonMetaDb[key];
    }
    // Also check evolution name
    const evo = pokemonMetaDb[key].evolution.toLowerCase();
    if (cleanText.includes(evo)) {
      return pokemonMetaDb[key];
    }
  }
  return null;
}
