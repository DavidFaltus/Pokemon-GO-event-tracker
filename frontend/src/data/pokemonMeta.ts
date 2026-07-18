export interface LocalizedString {
  cs: string;
  en: string;
  ja?: string;
}

export interface PokemonMetaInfo {
  name: string;
  evolution: string;
  pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pveRankText: LocalizedString;
  pvpRankText: LocalizedString;
  bestFastMove: string; // Move names are universal (same in both languages)
  bestChargedMove: string; // Move names are universal
  notes: LocalizedString;
}

export const pokemonMetaDb: Record<string, PokemonMetaInfo> = {
  swinub: {
    name: "Swinub",
    evolution: "Mamoswine",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Nejlepší ledový a špičkový zemní útočník",
      en: "Top Ice & Ground Attacker"
    },
    pvpRankText: {
      cs: "Vynikající v Master League a Premier Cupu",
      en: "Excellent in Master League & Premier Cup"
    },
    bestFastMove: "Powder Snow / Mud-Slap",
    bestChargedMove: "Avalanche & High Horsepower",
    notes: {
      cs: "Absolutní nutnost pro raidy. Shadow Mamoswine je vůbec nejlepší ne-Mega ledový útočník ve hře. Vyplatí se chytat s vysokým útokem (PvE) i dobrým PvP IV.",
      en: "An absolute must for raids. Shadow Mamoswine is the best non-Mega Ice attacker in the game. Worth catching with high Attack (PvE) and good PvP IVs."
    }
  },
  frigibax: {
    name: "Frigibax",
    evolution: "Baxcalibur",
    pveRating: "A",
    pvpRating: "A",
    pveRankText: {
      cs: "Skvělý ledový a dračí útočník",
      en: "Great Ice & Dragon Attacker"
    },
    pvpRankText: {
      cs: "Velmi silný v Master League",
      en: "Very strong in Master League"
    },
    bestFastMove: "Dragon Breath / Ice Fang",
    bestChargedMove: "Avalanche & Outrage",
    notes: {
      cs: "Vzácný drak. Baxcalibur je vynikající v Master League a velmi užitečný v raidech jako ledový útočník. Hledejte 100% IV (Hundo) pro Master League.",
      en: "A rare dragon. Baxcalibur excels in Master League and is very useful in raids as an Ice attacker. Aim for 100% IVs (Hundo) for Master League."
    }
  },
  necrozma: {
    name: "Necrozma",
    evolution: "Dusk Mane / Dawn Wings",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: {
      cs: "Absolutní král ocelových a duchových útočníků",
      en: "Absolute king of Steel & Ghost attackers"
    },
    pvpRankText: {
      cs: "Dominantní meta v Master League",
      en: "Dominant meta pick in Master League"
    },
    bestFastMove: "Shadow Claw / Metal Claw",
    bestChargedMove: "Sunsteel Strike / Moongeist Beam",
    notes: {
      cs: "Fúze s Solgaleo (Dusk Mane) a Lunala (Dawn Wings) jsou jedny z nejsilnějších forem v celé historii Pokémon GO. Dusk Mane vládne ocelovému typu, Dawn Wings duchovému. Hundo je prioritou číslo 1.",
      en: "Fusions with Solgaleo (Dusk Mane) and Lunala (Dawn Wings) are among the most powerful forms in Pokémon GO history. Dusk Mane dominates Steel, Dawn Wings dominates Ghost. Hundo is priority #1."
    }
  },
  zekrom: {
    name: "Zekrom",
    evolution: "Zekrom",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Špičkový elektrický a dračí útočník",
      en: "Top-tier Electric & Dragon Attacker"
    },
    pvpRankText: {
      cs: "Skvělý v Master League",
      en: "Excellent in Master League"
    },
    bestFastMove: "Charge Beam / Dragon Breath",
    bestChargedMove: "Fusion Bolt* & Outrage",
    notes: {
      cs: "Fusion Bolt je Signature move (vyžaduje Elite TM, pokud není chycen během speciálního eventu). Velmi silný univerzál do raidů a dobrý do Master League.",
      en: "Fusion Bolt is a Signature Move (requires Elite TM if not caught during a special event). Very strong all-rounder for raids and solid in Master League."
    }
  },
  machop: {
    name: "Machop",
    evolution: "Machamp",
    pveRating: "A",
    pvpRating: "A",
    pveRankText: {
      cs: "Dostupný a velmi silný bojový útočník",
      en: "Accessible and very strong Fighting attacker"
    },
    pvpRankText: {
      cs: "Stálice v Great a Ultra League",
      en: "Staple pick in Great & Ultra League"
    },
    bestFastMove: "Counter",
    bestChargedMove: "Cross Chop & Rock Slide",
    notes: {
      cs: "Machamp je nestárnoucí klasik. Shadow Machamp je ještě silnější (S-Tier PvE). Chytat s nízkým útokem a vysokou obranou/HP pro PvP (Great/Ultra) a vysoké IV pro PvE.",
      en: "Machamp is a timeless classic. Shadow Machamp is even stronger (S-Tier PvE). Catch with low Attack and high Defense/HP for PvP (Great/Ultra) and high IVs for PvE."
    }
  },
  beldum: {
    name: "Beldum",
    evolution: "Metagross",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Nejlepší ne-Mega ocelový útočník",
      en: "Best non-Mega Steel Attacker"
    },
    pvpRankText: {
      cs: "Nepřehlédnutelný v Master League",
      en: "Unmissable in Master League"
    },
    bestFastMove: "Bullet Punch",
    bestChargedMove: "Meteor Mash* & Earthquake",
    notes: {
      cs: "Klíčový je útok Meteor Mash (vyžaduje Elite TM nebo evoluci během eventu). Metagross je králem ocelového typu a skvěle si vede i v Master League. Shadow verze je extrémní monstrum.",
      en: "Key move is Meteor Mash (requires Elite TM or evolving during the event). Metagross is the king of Steel types and excels in Master League too. The Shadow version is an extreme powerhouse."
    }
  },
  larvitar: {
    name: "Larvitar",
    evolution: "Tyranitar",
    pveRating: "S",
    pvpRating: "B",
    pveRankText: {
      cs: "Nejlepší temný a skvělý kamenný útočník",
      en: "Best Dark & great Rock Attacker"
    },
    pvpRankText: {
      cs: "Využitelný v Master League / Premier Cupu",
      en: "Usable in Master League / Premier Cup"
    },
    bestFastMove: "Bite / Smack Down*",
    bestChargedMove: "Brutal Swing / Stone Edge",
    notes: {
      cs: "Mega Tyranitar a Shadow Tyranitar s Brutal Swing naprosto dominují temnému typu v raidech. Smack Down vyžaduje Elite Fast TM. Určitě grindovat sladkosti (Candy)!",
      en: "Mega Tyranitar and Shadow Tyranitar with Brutal Swing utterly dominate the Dark type in raids. Smack Down requires an Elite Fast TM. Definitely grind Candy!"
    }
  },
  gible: {
    name: "Gible",
    evolution: "Garchomp",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Špičkový zemní a dračí útočník",
      en: "Top-tier Ground & Dragon Attacker"
    },
    pvpRankText: {
      cs: "Silný v Master League",
      en: "Strong in Master League"
    },
    bestFastMove: "Mud-Shot / Dragon Tail",
    bestChargedMove: "Earth Power* & Outrage",
    notes: {
      cs: "Mega Garchomp a Shadow Garchomp jsou elitní zemní útočníci. Earth Power vyžaduje Elite TM (nebo event). Skvělý cíl pro grind.",
      en: "Mega Garchomp and Shadow Garchomp are elite Ground attackers. Earth Power requires an Elite TM (or event). A great target to grind."
    }
  },
  bagon: {
    name: "Bagon",
    evolution: "Salamence",
    pveRating: "S",
    pvpRating: "B",
    pveRankText: {
      cs: "Elitní dračí útočník",
      en: "Elite Dragon Attacker"
    },
    pvpRankText: {
      cs: "Průměrný v PvP",
      en: "Average in PvP"
    },
    bestFastMove: "Dragon Tail",
    bestChargedMove: "Outrage*",
    notes: {
      cs: "Outrage je nezbytný (Elite TM / event). Mega Salamence a Shadow Salamence jsou v raidech monstrózní. Pro PvP se moc nehodí, ale pro PvE je to top volba.",
      en: "Outrage is essential (Elite TM / event). Mega Salamence and Shadow Salamence are monstrous in raids. Not ideal for PvP, but a top PvE pick."
    }
  },
  gastly: {
    name: "Gastly",
    evolution: "Gengar",
    pveRating: "A",
    pvpRating: "B",
    pveRankText: {
      cs: "Vysoké poškození duchovým/jedovým typem (Glass Cannon)",
      en: "High damage Ghost/Poison type (Glass Cannon)"
    },
    pvpRankText: {
      cs: "Niche v Great/Ultra League",
      en: "Niche pick in Great/Ultra League"
    },
    bestFastMove: "Shadow Claw",
    bestChargedMove: "Shadow Ball & Sludge Bomb",
    notes: {
      cs: "Mega Gengar má nejvyšší DPS mezi duchy, ale je velmi křehký. Shadow Gengar rozdává obrovské rány, ale rychle umírá. Dobrý pro rychlé raidy.",
      en: "Mega Gengar has the highest DPS among Ghost-types, but is very fragile. Shadow Gengar hits like a truck but faints quickly. Great for fast raids."
    }
  },
  lickitung: {
    name: "Lickitung",
    evolution: "Lickitung",
    pveRating: "None",
    pvpRating: "S",
    pveRankText: {
      cs: "Nepoužitelný v raidech",
      en: "Not viable in raids"
    },
    pvpRankText: {
      cs: "Bůh Great League (XL Pokémon)",
      en: "Great League god (XL Pokémon)"
    },
    bestFastMove: "Lick",
    bestChargedMove: "Body Slam* & Power Whip",
    notes: {
      cs: "Body Slam vyžaduje Elite TM. Pro Great League potřebujete ideálně IV 8/14/15 a spoustu Candy XL (level 50). Extrémní tank, jeden z nejlepších pokémonů v PvP vůbec.",
      en: "Body Slam requires an Elite TM. For Great League, you ideally want 8/14/15 IVs and lots of Candy XL (level 50). An extreme tank and one of the best PvP Pokémon ever."
    }
  },
  carbink: {
    name: "Carbink",
    evolution: "Carbink",
    pveRating: "None",
    pvpRating: "S",
    pveRankText: {
      cs: "Nepoužitelný v raidech",
      en: "Not viable in raids"
    },
    pvpRankText: {
      cs: "Top-tier tank v Great League (XL)",
      en: "Top-tier tank in Great League (XL)"
    },
    bestFastMove: "Rock Throw",
    bestChargedMove: "Rock Slide & Moonblast",
    notes: {
      cs: "Kombinace kamenného/vílího typu s extrémní obranou z něj dělá zeď v Great League. Vyžaduje level 50 (mnoho Candy XL) a IV blízko Hundo (např. 5/15/15).",
      en: "The Rock/Fairy typing with extreme bulk makes it a wall in Great League. Requires level 50 (lots of XL Candy) and near-Hundo IVs (e.g. 5/15/15)."
    }
  },
  gligar: {
    name: "Gligar",
    evolution: "Gligar / Gliscor",
    pveRating: "None",
    pvpRating: "S",
    pveRankText: {
      cs: "Nepoužitelný v raidech",
      en: "Not viable in raids"
    },
    pvpRankText: {
      cs: "Jeden z nejlepších v Great a Ultra League",
      en: "One of the best in Great & Ultra League"
    },
    bestFastMove: "Wing Attack",
    bestChargedMove: "Aerial Ace & Dig",
    notes: {
      cs: "Gligar je momentálně králem Great League díky své flexibilitě, skvělému psaní a útoku Dig. Gliscor je zase lepší v Ultra League (s Night Slash a Earthquake).",
      en: "Gligar is currently the king of Great League thanks to its flexibility, great typing, and the move Dig. Gliscor is better in Ultra League (with Night Slash and Earthquake)."
    }
  },
  riolu: {
    name: "Riolu",
    evolution: "Lucario",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Nejlepší bojový útočník (DPS s Aura Sphere)",
      en: "Best Fighting Attacker (DPS with Aura Sphere)"
    },
    pvpRankText: {
      cs: "Velmi agresivní v PvP (Great/Ultra/Premier)",
      en: "Very aggressive in PvP (Great/Ultra/Premier)"
    },
    bestFastMove: "Counter",
    bestChargedMove: "Aura Sphere & Shadow Ball / Power-Up Punch",
    notes: {
      cs: "Mega Lucario a standardní Lucario s Aura Sphere mají neuvěřitelné poškození. V PvP je křehký, ale s Power-Up Punch dokáže bleskově navyšovat útok. Určitě chytat a vyvíjet!",
      en: "Mega Lucario and standard Lucario with Aura Sphere deal incredible damage. Fragile in PvP, but Power-Up Punch can rapidly boost Attack. Definitely catch and evolve!"
    }
  },
  ralts: {
    name: "Ralts",
    evolution: "Gardevoir / Gallade",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Nejlepší vílí útočník (Gardevoir)",
      en: "Best Fairy Attacker (Gardevoir)"
    },
    pvpRankText: {
      cs: "Velmi silný v PvP Premier pohárech",
      en: "Very strong in PvP Premier Cups"
    },
    bestFastMove: "Charm / Confusion",
    bestChargedMove: "Dazzling Gleam / Psychic",
    notes: {
      cs: "Mega Gardevoir je nejsilnější vílí pokémon pro raidy. Shadow Gardevoir s Charmem dokáže v PvP bleskově zničit draky a bojové typy. Gallade je skvělý v PvP s Leaf Blade.",
      en: "Mega Gardevoir is the strongest Fairy Pokémon for raids. Shadow Gardevoir with Charm can quickly annihilate Dragons and Fighting types in PvP. Gallade is great in PvP with Leaf Blade."
    }
  },
  belsprout: {
    name: "Bellsprout",
    evolution: "Victreebel",
    pveRating: "B",
    pvpRating: "A",
    pveRankText: {
      cs: "Průměrný travní útočník",
      en: "Average Grass Attacker"
    },
    pvpRankText: {
      cs: "Legendární 'Razor Leaf' fast-move útočník v PvP",
      en: "Legendary 'Razor Leaf' fast-move attacker in PvP"
    },
    bestFastMove: "Razor Leaf",
    bestChargedMove: "Leaf Blade & Acid Spray",
    notes: {
      cs: "Shadow Victreebel je noční můrou v PvP (Great League). Jeho rychlý útok Razor Leaf uděluje extrémní poškození bez ohledu na štíty soupeře. Vyžaduje specifické PvP IV.",
      en: "Shadow Victreebel is a nightmare in PvP (Great League). Its Razor Leaf fast move deals extreme damage regardless of opponent shields. Requires specific PvP IVs."
    }
  },
  kyogre: {
    name: "Kyogre",
    evolution: "Kyogre",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: {
      cs: "Král vodních útočníků (Primal form)",
      en: "King of Water Attackers (Primal form)"
    },
    pvpRankText: {
      cs: "Jeden z nejlepších v Master League",
      en: "One of the best in Master League"
    },
    bestFastMove: "Waterfall",
    bestChargedMove: "Origin Pulse* & Surf / Blizzard",
    notes: {
      cs: "Primal Kyogre je absolutním vrcholem vodních pokémonů. Origin Pulse vyžaduje Elite TM. V Master League je stálou hrozbou.",
      en: "Primal Kyogre is the absolute pinnacle of Water Pokémon. Origin Pulse requires an Elite TM. A constant threat in Master League."
    }
  },
  groudon: {
    name: "Groudon",
    evolution: "Groudon",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: {
      cs: "Král zemních útočníků (Primal form)",
      en: "King of Ground Attackers (Primal form)"
    },
    pvpRankText: {
      cs: "Dominantní síla v Master League",
      en: "Dominant force in Master League"
    },
    bestFastMove: "Mud-Shot",
    bestChargedMove: "Precipice Blades* & Fire Punch* / Solar Beam",
    notes: {
      cs: "Primal Groudon s Precipice Blades je nejlepším zemním útočníkem ve hře. Shadow Groudon (z Giovanniho) je rovněž špička. Precipice Blades i Fire Punch vyžadují Elite TM. Priorita na Hundo.",
      en: "Primal Groudon with Precipice Blades is the best Ground attacker in the game. Shadow Groudon (from Giovanni) is also top tier. Both Precipice Blades and Fire Punch require Elite TM. Hundo is priority."
    }
  },
  rayquaza: {
    name: "Rayquaza",
    evolution: "Rayquaza",
    pveRating: "S",
    pvpRating: "S",
    pveRankText: {
      cs: "Nejsilnější Pokémon ve hře vůbec (Mega form)",
      en: "The strongest Pokémon in the game (Mega form)"
    },
    pvpRankText: {
      cs: "Skvělý v Master League",
      en: "Excellent in Master League"
    },
    bestFastMove: "Dragon Tail",
    bestChargedMove: "Dragon Ascent* & Outrage",
    notes: {
      cs: "Mega Rayquaza s útokem Dragon Ascent (vyžaduje Meteorit) je nejsilnějším útočníkem v historii hry. Shadow Rayquaza je také extrémně silný. Rozhodně chytat a maxovat!",
      en: "Mega Rayquaza with Dragon Ascent (requires a Meteorite) is the strongest attacker in the game's history. Shadow Rayquaza is also extremely powerful. Definitely catch and power up!"
    }
  },
  kartana: {
    name: "Kartana",
    evolution: "Kartana",
    pveRating: "S",
    pvpRating: "C",
    pveRankText: {
      cs: "Nejlepší travní útočník s obrovským DPS",
      en: "Best Grass Attacker with massive DPS"
    },
    pvpRankText: {
      cs: "Příliš křehký pro PvP",
      en: "Too fragile for PvP"
    },
    bestFastMove: "Razor Leaf",
    bestChargedMove: "Leaf Blade",
    notes: {
      cs: "Jeho útok je obrovský, v raidech jako travní útočník naprosto dominuje a překonává i mnohé Shadow formy. Hledejte vysoké IV pro raidy.",
      en: "Its Attack stat is enormous — it utterly dominates raids as a Grass attacker, surpassing even many Shadow forms. Aim for high IVs for raids."
    }
  },
  xurkitree: {
    name: "Xurkitree",
    evolution: "Xurkitree",
    pveRating: "S",
    pvpRating: "C",
    pveRankText: {
      cs: "Nejlepší ne-stínový elektrický útočník",
      en: "Best non-Shadow Electric Attacker"
    },
    pvpRankText: {
      cs: "Špatný v PvP kvůli slabé obraně",
      en: "Poor in PvP due to low bulk"
    },
    bestFastMove: "Thunder Shock",
    bestChargedMove: "Discharge & Power Whip",
    notes: {
      cs: "Má fantastický útok a skvělý moveset. Power Whip jako pokrytí proti zemním typům v raidech je skvělý bonus.",
      en: "Has a fantastic Attack stat and a great moveset. Power Whip as coverage against Ground types in raids is a great bonus."
    }
  },
  terrakion: {
    name: "Terrakion",
    evolution: "Terrakion",
    pveRating: "S",
    pvpRating: "A",
    pveRankText: {
      cs: "Elitní bojový a kamenný útočník",
      en: "Elite Fighting & Rock Attacker"
    },
    pvpRankText: {
      cs: "Velmi použitelný v Master League",
      en: "Very viable in Master League"
    },
    bestFastMove: "Double Kick",
    bestChargedMove: "Sacred Sword* & Rock Slide",
    notes: {
      cs: "Sacred Sword vyžaduje Elite TM. Jeden z nejkonzistentnějších bojových útočníků ve hře, překonávající i většinu stínových bojových pokémonů.",
      en: "Sacred Sword requires an Elite TM. One of the most consistent Fighting attackers in the game, surpassing most Shadow Fighting Pokémon."
    }
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
