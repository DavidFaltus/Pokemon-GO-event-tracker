import { findPokemonMeta } from './pokemonMeta';

export interface LocalizedString {
  cs: string;
  en: string;
}

export interface SpecialEventBonus {
  text: LocalizedString;
  icon: string;
}

export interface SpecialEventSpawn {
  name: string;
  image: string;
  isShinyAvailable?: boolean;
  isHighPriority?: boolean; // Highlight in UI if it's meta relevant
  habitat?: LocalizedString; // Optional habitat name (e.g. Forest, Meadow)
}

export interface SpecialEventEgg {
  distance: string; // e.g. "2km", "7km", "10km"
  contents: {
    name: string;
    image: string;
    isShinyAvailable?: boolean;
  }[];
}

export interface SpecialEventResearch {
  task: LocalizedString;
  reward: string;
  image?: string;
  isShinyAvailable?: boolean;
}

export interface SpecialEventDetails {
  eventID: string;
  bonuses?: SpecialEventBonus[];
  spawns?: SpecialEventSpawn[];
  eggs?: SpecialEventEgg[];
  research?: SpecialEventResearch[];
  debuts?: { name: string; image: string; description: LocalizedString }[];
}

export const SPECIAL_EVENTS_DATABASE: Record<string, SpecialEventDetails> = {
  "pokemon-go-fest-2026-global": {
    eventID: "pokemon-go-fest-2026-global",
    bonuses: [
      { text: { cs: "1/2 vzdálenost na líhnutí vajec", en: "1/2 Hatch Distance" }, icon: "🥚" },
      { text: { cs: "Až 9 bezplatných Raid Passů z Gymů", en: "Up to 9 free Raid Passes from Gyms" }, icon: "🎟️" },
      { text: { cs: "Dvojnásobné bonbóny za chytání (Catch Candy)", en: "2x Catch Candy" }, icon: "🍬" },
      { text: { cs: "Zvýšená šance na Shiny Pokémony", en: "Increased Shiny rate" }, icon: "✨" },
      { text: { cs: "Speciální 7km vejce s exkluzivním obsahem", en: "Special 7km Eggs" }, icon: "🍳" }
    ],
    spawns: [
      // Meadow Habitat
      { name: "Pikachu (Sun Crown)", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_025_00.png", isShinyAvailable: true, habitat: { cs: "Louka (Meadow)", en: "Meadow" } },
      { name: "Marill", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_183_00.png", isShinyAvailable: true, habitat: { cs: "Louka (Meadow)", en: "Meadow" } },
      { name: "Ralts", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_280_00.png", isShinyAvailable: true, isHighPriority: true, habitat: { cs: "Louka (Meadow)", en: "Meadow" } },
      { name: "Jangmo-o", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_782_00.png", isShinyAvailable: true, isHighPriority: true, habitat: { cs: "Louka (Meadow)", en: "Meadow" } },
      // Mountain Habitat
      { name: "Pikachu (Moon Crown)", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_025_00.png", isShinyAvailable: true, habitat: { cs: "Hory (Mountain)", en: "Mountain" } },
      { name: "Larvitar", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_246_00.png", isShinyAvailable: true, isHighPriority: true, habitat: { cs: "Hory (Mountain)", en: "Mountain" } },
      { name: "Bagon", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_371_00.png", isShinyAvailable: true, isHighPriority: true, habitat: { cs: "Hory (Mountain)", en: "Mountain" } },
      { name: "Carbink", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_703_00.png", isShinyAvailable: true, isHighPriority: true, habitat: { cs: "Hory (Mountain)", en: "Mountain" } },
      // Forest Habitat
      { name: "Scyther", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_123_00.png", isShinyAvailable: true, habitat: { cs: "Les (Forest)", en: "Forest" } },
      { name: "Beldum", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_374_00.png", isShinyAvailable: true, isHighPriority: true, habitat: { cs: "Les (Forest)", en: "Forest" } },
      { name: "Phantump", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_708_00.png", isShinyAvailable: true, habitat: { cs: "Les (Forest)", en: "Forest" } }
    ],
    eggs: [
      {
        distance: "7km",
        contents: [
          { name: "Larvesta", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_636_00.png", isShinyAvailable: true },
          { name: "Jangmo-o", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_782_00.png", isShinyAvailable: true },
          { name: "Carbink", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_703_00.png" }
        ]
      }
    ],
    debuts: [
      {
        name: "Marshadow",
        image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_802_00.png",
        description: { cs: "Speciální výzkum zpřístupní mýtického Pokémona Marshadow", en: "Special Research unlocks the Mythical Pokémon Marshadow" }
      },
      {
        name: "Necrozma (Dusk Mane & Dawn Wings)",
        image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_800_12.png",
        description: { cs: "Fúzování pomocí Solgaleo/Lunala energie", en: "Fusion using Solar/Lunar energy debuts globally" }
      }
    ],
    research: [
      { task: { cs: "Protoč 10 Pokéstopů", en: "Spin 10 PokéStops" }, reward: "Carbink Encounter", isShinyAvailable: true },
      { task: { cs: "Vyhraj 3 Raidy", en: "Win 3 Raids" }, reward: "Jangmo-o Encounter", isShinyAvailable: true }
    ]
  },
  "flying-taxi-2026": {
    eventID: "flying-taxi-2026",
    bonuses: [
      { text: { cs: "2x Zkušenosti (XP) za chycení létajících Pokémonů", en: "2x Catch XP for Flying-type Pokémon" }, icon: "⚡" },
      { text: { cs: "1/2 vzdálenost na vylíhnutí 2km vajec", en: "1/2 Hatch Distance for 2km eggs" }, icon: "🥚" }
    ],
    spawns: [
      { name: "Rookidee", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_821_00.png", isShinyAvailable: true },
      { name: "Skarmory", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_227_00.png", isShinyAvailable: true, isHighPriority: true },
      { name: "Aerodactyl", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_142_00.png", isShinyAvailable: true, isHighPriority: true },
      { name: "Noibat", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_714_00.png", isShinyAvailable: true },
      { name: "Pidgey", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_016_00.png", isShinyAvailable: true }
    ],
    eggs: [
      {
        distance: "2km",
        contents: [
          { name: "Rookidee", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_821_00.png", isShinyAvailable: true },
          { name: "Zubat", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_041_00.png", isShinyAvailable: true },
          { name: "Noibat", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_714_00.png", isShinyAvailable: true }
        ]
      }
    ],
    debuts: [
      {
        name: "Shiny Rookidee",
        image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_821_00.png",
        description: { cs: "Poprvé ve hře lze chytit zářivou (Shiny) verzi Rookidee!", en: "Shiny Rookidee family debuts in Pokémon GO!" }
      }
    ],
    research: [
      { task: { cs: "Chyť 10 Pokémonů létajícího typu", en: "Catch 10 Flying-type Pokémon" }, reward: "Rookidee Encounter", isShinyAvailable: true },
      { task: { cs: "Evolvuj 3 Pokémony", en: "Evolve 3 Pokémon" }, reward: "Pidgeot Mega Energy x50" }
    ]
  },
  "road-of-legends-2026": {
    eventID: "road-of-legends-2026",
    bonuses: [
      { text: { cs: "Až 2 bezplatné Raid Passy denně z Gymů", en: "Up to 2 free Raid Passes daily from Gyms" }, icon: "🎟️" },
      { text: { cs: "Garantované Candy XL za tradování (od Lvl 31)", en: "Guaranteed Candy XL for trading (Lvl 31+)" }, icon: "🍬" },
      { text: { cs: "Zrušen denní limit na Remote Raidy (6.–12. července)", en: "No Remote Raid Pass limit (July 6–12)" }, icon: "📡" },
      { text: { cs: "Možnost naučit Origin Forme Dialgu / Palkiu jejich podpisové útoky pomocí Elite Charged TM!", en: "Origin Forme Dialga & Palkia can learn Roar of Time / Spacial Rend using Elite Charged TM!" }, icon: "⚔️" },
      { text: { cs: "Šance na získání speciálních suvenýrových pozadí z 5*, Primal a Mega raidů", en: "Chance to receive special souvenir backgrounds from 5-star, Primal, and Mega raids" }, icon: "🖼️" }
    ],
    debuts: [
      {
        name: "Origin Forme Dialga / Palkia signature moves",
        image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_483_11.png",
        description: {
          cs: "Během tohoto eventu můžete použít Elite Charged TM k naučení Roar of Time / Spacial Rend u Origin forem Dialgy a Palkii!",
          en: "During this event, use an Elite Charged TM to teach Roar of Time / Spacial Rend to Origin Forme Dialga and Palkia!"
        }
      }
    ]
  },
  "go-pass-june-2026": {
    eventID: "go-pass-june-2026",
    bonuses: [
      { text: { cs: "Sbírejte GO body za aktivity: Chytání (5 b.), Líhnutí (40 b.), Raidy (100 b.)", en: "Earn GO Points: Catch (5 pts), Hatch (40 pts), Raid (100 pts)" }, icon: "⭐" },
      { text: { cs: "Odměna za 100. úroveň: Setkání s Lugia!", en: "Rank 100 Reward: Encounter with Lugia!" }, icon: "👾" },
      { text: { cs: "Deluxe verze obsahuje extra časový inkubátor s neomezeným použitím do 14. července!", en: "Deluxe track rewards include a Timed Incubator with unlimited uses until July 14!" }, icon: "🥚" },
      { text: { cs: "Deluxe verze zvyšuje kapacitu dárků a dropy z PokéStopů", en: "Deluxe track upgrades gift capacity and PokéStop drop limits" }, icon: "🎁" }
    ]
  },
  "skarmory-super-mega-raid-day-2026": {
    eventID: "skarmory-super-mega-raid-day-2026",
    bonuses: [
      { text: { cs: "Až 6 bezplatných Raid Passů denně z protáčení fotodisků Gymů během akce", en: "Receive up to 6 free Raid Passes by spinning Gym Photo Discs" }, icon: "🎟️" },
      { text: { cs: "Zvýšená šance na chycení Shiny Skarmory", en: "Increased chance of encountering Shiny Skarmory" }, icon: "✨" },
      { text: { cs: "Navýšení denního limitu na Remote Raidy na 20 (26.6. 17:00 PDT – 27.6. 20:00 PDT)", en: "Remote Raid Pass limit increased to 20 (Friday, June 26, at 5:00 p.m. PDT to Saturday, June 27, at 8:00 p.m. PDT)" }, icon: "📡" },
      { text: { cs: "Držitelé vstupenky (4.99 USD): +8 bezplatných Raid Passů (celkem 14), vyšší šance na Rare Candy XL z raidů, o 5 000 XP a 5 000 Stardust více z raidů", en: "Ticket holders (US$4.99) get: +8 free Raid Passes (14 total), increased chance of Rare Candy XL from raids, 5,000 extra XP, and 5,000 extra Stardust from raids" }, icon: "🎫" }
    ],
    debuts: [
      {
        name: "Mega Skarmory",
        image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_227_00.png",
        description: { cs: "Debut Mega Skarmory v Super Mega Raidech! Chycený Skarmory bude mít odemčený Mega Level 1.", en: "Mega Skarmory debuts in Super Mega Raids! Caught Skarmory will have Mega Level 1 unlocked." }
      }
    ],
    research: [
      { task: { cs: "Exkluzivní časově omezený výzkum", en: "Event Timed Research" }, reward: "Premium Battle Pass & Houndoom encounter" }
    ]
  },
  "flying-taxi-taken-over-2026": {
    eventID: "flying-taxi-taken-over-2026",
    bonuses: [
      { text: { cs: "Team GO Rocket se objevuje častěji u Pokéstopů a v balónech (každé 2 hodiny)", en: "Team GO Rocket will appear more frequently at PokéStops and in balloons (every 2 hours)" }, icon: "🎈" },
      { text: { cs: "Lze použít Charged TM k zapomenutí útočného útoku Frustration u Shadow Pokémonů", en: "You can use a Charged TM to help a Shadow Pokémon forget the Charged Attack Frustration" }, icon: "🟣" },
      { text: { cs: "Pokémoni chycení v 1-hvězdičkových a 3-hvězdičkových Shadow raidech budou mít větší rozptyl IV statů (Attack, Defense, HP)", en: "Pokémon caught via 1-star and 3-star Shadow Raids will have a wider variance of Attack, Defense, and HP stats" }, icon: "💀" },
      { text: { cs: "GO Pass: Flying Taxi (zdarma) přináší Super Rocket Radar na chycení Shadow Reshirama, Mysterious Components a Shadow Shardy", en: "GO Pass: Flying Taxi (free) offers a Super Rocket Radar to encounter Shadow Reshiram, Mysterious Components, and Shadow Shards" }, icon: "🎟️" }
    ],
    debuts: [
      {
        name: "Shadow Reshiram",
        image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_643_00.png",
        description: { cs: "Giovanni přichází s Shadow Reshiram (může být i Shiny)! Porazte ho pomocí Super Rocket Radaru z GO Passu.", en: "Defeat Giovanni using the Super Rocket Radar from the GO Pass to rescue Shadow Reshiram (can be Shiny)!" }
      }
    ],
    spawns: [
      { name: "Shadow Seel", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_086_00.png", isShinyAvailable: true, isHighPriority: true },
      { name: "Shadow Hoothoot", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_163_00.png", isShinyAvailable: true },
      { name: "Shadow Noibat", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_714_00.png", isShinyAvailable: true, isHighPriority: true },
      { name: "Shadow Rookidee", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pm821.icon.png", isShinyAvailable: true, isHighPriority: true }
    ],
    research: [
      { task: { cs: "Tematické úkoly ve Field Research", en: "Event Field Research Tasks" }, reward: "Fast TM / Charged TM / Mysterious Component" }
    ]
  }
};

/**
 * Returns special event metadata if found.
 * If there is no exact ID match, we try to generate fallback data based on the event name.
 */
export function getSpecialEventDetails(eventID: string, eventName: string): SpecialEventDetails | null {
  const cleanID = eventID.toLowerCase();
  
  // 1. Exact Match
  if (SPECIAL_EVENTS_DATABASE[eventID]) {
    return SPECIAL_EVENTS_DATABASE[eventID];
  }
  
  // 2. Wildcard Matches

  // GO Pass Wildcard
  if (cleanID.includes("go-pass") || eventName.toLowerCase().includes("go pass")) {
    return {
      eventID,
      bonuses: [
        { text: { cs: "Získávejte GO body za chytání (5 b.), líhnutí (40 b.) a raidy (100 b.)", en: "Earn GO Points: Catch (5 pts), Hatch (40 pts), Raid (100 pts)" }, icon: "⭐" },
        { text: { cs: "Odměna za 100. úroveň: Setkání s Legendárním Pokémonem (Lugia v červnu)", en: "Rank 100 Reward: Encounter with a Legendary Pokémon (Lugia in June)" }, icon: "👾" },
        { text: { cs: "Deluxe verze: Extra neomezený časový inkubátor a zvýšené dárkové limity", en: "Deluxe Pass: Extra unlimited Timed Incubator & upgraded gift limits" }, icon: "🎁" }
      ]
    };
  }
  
  // Go Fest Wildcard
  if (cleanID.includes("go-fest") || eventName.toLowerCase().includes("go fest")) {
    return {
      eventID,
      bonuses: [
        { text: { cs: "Až 9 bezplatných Raid Passů z Gymů", en: "Up to 9 free Raid Passes from Gyms" }, icon: "🎟️" },
        { text: { cs: "Dvojnásobné bonbóny za chytání", en: "2x Catch Candy" }, icon: "🍬" },
        { text: { cs: "Zvýšená šance na Shiny Pokémony", en: "Increased Shiny rate" }, icon: "✨" }
      ],
      debuts: [
        {
          name: "Mýtický Pokémon / Fúze",
          image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_802_00.png",
          description: { cs: "Exkluzivní výzkum a raidové debuty", en: "Exclusive research and raid debuts" }
        }
      ]
    };
  }

  // Anniversary Wildcard (e.g. 10th Anniversary)
  if (cleanID.includes("anniversary") || cleanID.includes("vyroci") || eventName.toLowerCase().includes("anniversary") || eventName.toLowerCase().includes("výročí")) {
    return {
      eventID,
      bonuses: [
        { text: { cs: "Zvýšená šance na Lucky Trade", en: "Increased Lucky Trade chance" }, icon: "🤝" },
        { text: { cs: "Častější výskyt Star Starter Pokémonů", en: "Starter Pokémon spawning more often" }, icon: "⭐" },
        { text: { cs: "Speciální časově omezený výzkum k výročí", en: "Special Anniversary Timed Research" }, icon: "⏱️" }
      ],
      spawns: [
        { name: "Bulbasaur", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_001_00.png", isShinyAvailable: true },
        { name: "Charmander", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_004_00.png", isShinyAvailable: true, isHighPriority: true },
        { name: "Squirtle", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_007_00.png", isShinyAvailable: true },
        { name: "Pikachu (Party Hat)", image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_025_00.png", isShinyAvailable: true, isHighPriority: true }
      ],
      debuts: [
        {
          name: "Speciální kostýmový Pikachu",
          image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_025_00.png",
          description: { cs: "Exkluzivní výroční Pikachu debutuje ve hře", en: "Exclusive anniversary Pikachu makes its debut" }
        }
      ]
    };
  }

  // Generic Event Smart Scanner (based on name text)
  if (cleanID.includes("rocket") || eventName.toLowerCase().includes("rocket") || eventName.toLowerCase().includes("takeover") || cleanID.includes("taken-over") || eventName.toLowerCase().includes("taken over")) {
    return {
      eventID,
      bonuses: [
        { text: { cs: "Lze zapomenout útok Frustration pomocí Charged TM", en: "Remove Frustration with a Charged TM" }, icon: "🟣" },
        { text: { cs: "Častější balóny Team GO Rocket (každé 3 hodiny)", en: "Team GO Rocket balloons appear every 3 hours" }, icon: "🎈" }
      ]
    };
  }

  // Community Day Wildcard Scanner
  if (cleanID.includes("community-day") || cleanID.includes("communityday") || eventName.toLowerCase().includes("community day")) {
    // Detect featured Pokemon
    let featuredPokemon = "Featured Pokémon";
    const cdMatch = eventName.match(/([A-Za-z-'\s]+?)\s+(?:Community\s+Day|Classic)/i);
    if (cdMatch) {
      featuredPokemon = cdMatch[1].trim();
    } else {
      featuredPokemon = eventName.replace(/community\s*day/gi, "").replace(/classic/gi, "").trim();
    }

    const meta = findPokemonMeta(featuredPokemon);
    const evolution = meta ? meta.evolution : featuredPokemon;
    const dexImage = getPokemonImage(featuredPokemon);

    // Determine special move & bonuses for known ones
    let specialMove = "";
    let catchBonus = { cs: "3× XP za chycení Pokémona", en: "3× Catch XP" };

    if (featuredPokemon.toLowerCase() === "frigibax" || eventName.toLowerCase().includes("frigibax")) {
      specialMove = "Glaive Rush (Charged Move)";
      catchBonus = { cs: "3× Stardust za chycení Pokémona", en: "3× Catch Stardust" };
    } else if (featuredPokemon.toLowerCase() === "bagon" || eventName.toLowerCase().includes("bagon")) {
      specialMove = "Outrage (Charged Move)";
      catchBonus = { cs: "3× XP za chycení Pokémona", en: "3× Catch XP" };
    } else if (featuredPokemon.toLowerCase() === "beldum" || eventName.toLowerCase().includes("beldum")) {
      specialMove = "Meteor Mash (Charged Move)";
      catchBonus = { cs: "1/4 Hatch Distance na vejce", en: "1/4 Hatch Distance" };
    } else if (featuredPokemon.toLowerCase() === "goomy" || eventName.toLowerCase().includes("goomy")) {
      specialMove = "Thunder Punch (Charged Move)";
      catchBonus = { cs: "2× Candy za chycení Pokémona", en: "2× Catch Candy" };
    }

    const specialMoveTextCs = specialMove
      ? `Vyviňte Arctibax/druhou fázi na ${evolution} během eventu nebo do 5 hodin po něm a získá exkluzivní útok: ${specialMove}.`
      : `Vyviňte druhou fázi na ${evolution} během eventu nebo do 5 hodin po něm a získá exkluzivní útok (Special Charged Attack).`;
    
    const specialMoveTextEn = specialMove
      ? `Evolve second stage into ${evolution} during the event or up to 5 hours after to get the exclusive featured move: ${specialMove}.`
      : `Evolve second stage into ${evolution} during the event or up to 5 hours after to get the exclusive featured move.`;

    const details: SpecialEventDetails = {
      eventID,
      bonuses: [
        { text: { cs: specialMoveTextCs, en: specialMoveTextEn }, icon: "⚔️" },
        { text: catchBonus, icon: "🎁" },
        { text: { cs: "2× Candy za chycení Pokémona a 2× šance na XL Candy (od Lvl 31)", en: "2× Catch Candy & 2× chance for XL Candy (Lvl 31+)" }, icon: "🍬" },
        { text: { cs: "Incense a Lure moduly aktivované během eventu trvají 3 hodiny", en: "Incense & Lure Modules activated during the event last 3 hours" }, icon: "⏱️" },
        { text: { cs: "1 dodatečný Special Trade (max 2 denně) a o 50% méně stardustu na tradování (do 22:00)", en: "1 extra Special Trade (max 2/day) & 50% less Stardust for Trades (until 10 PM)" }, icon: "🤝" },
        { text: { cs: "5× překvapení z fotky (Snapshot photobomb)", en: "5× surprise encounters from snapshots" }, icon: "📸" }
      ],
      spawns: [
        { 
          name: featuredPokemon, 
          image: dexImage,
          isShinyAvailable: true, 
          isHighPriority: true 
        }
      ],
      debuts: [
        {
          name: `Shiny ${featuredPokemon}`,
          image: dexImage,
          description: { 
            cs: `Máte šanci chytit Shiny ${featuredPokemon} se zvýšeným poměrem ~1:25!`, 
            en: `High chance of encountering Shiny ${featuredPokemon} with boosted rates (~1 in 25)!` 
          }
        }
      ],
      research: [
        { 
          task: { cs: `Chyť 3 ${featuredPokemon}`, en: `Catch 3 ${featuredPokemon}` }, 
          reward: `${featuredPokemon} Encounter / Stardust / Great Balls`, 
          isShinyAvailable: true 
        }
      ],
      eggs: [
        {
          distance: "2km",
          contents: [
            { name: featuredPokemon, image: dexImage, isShinyAvailable: true }
          ]
        }
      ]
    };

    // Add 4-star raids description for the 2nd stage evolution
    const secondStage = meta ? (meta.name === "Frigibax" ? "Arctibax" : meta.name === "Bagon" ? "Shelgon" : meta.name === "Beldum" ? "Metang" : meta.name === "Goomy" ? "Sliggoo" : "druhou fázi") : "druhou fázi";
    details.debuts?.push({
      name: `Speciální 4-hvězdičkové Raidy (${secondStage})`,
      image: getPokemonImage(secondStage),
      description: {
        cs: `Od 17:00 do 22:00 probíhají 4* raidy. Po jejich poražení se v okolí Gymu na 30 minut zvýší výskyt ${featuredPokemon} se stejnou shiny šancí.`,
        en: `From 5:00 PM to 10:00 PM, fight ${secondStage} in 4-star raids. Defeating it spawns ${featuredPokemon} nearby for 30 minutes.`
      }
    });

    return details;
  }

  // If no match, return null so we don't display empty details,
  // but we will still allow adding custom user notes/checklist!
  return null;
}

const POKEMON_DEX_IDS: Record<string, string> = {
  frigibax: "996",
  arctibax: "997",
  baxcalibur: "998",
  swinub: "220",
  mamoswine: "473",
  bagon: "371",
  salamence: "373",
  beldum: "374",
  metagross: "376",
  gible: "443",
  garchomp: "445",
  larvitar: "246",
  tyranitar: "248",
  riolu: "447",
  lucario: "448",
  goomy: "704",
  goodra: "706",
  litten: "725",
  incineroar: "727",
  rowlet: "722",
  decidueye: "724",
  popplio: "728",
  primarina: "730",
  bellsprout: "069",
  victreebel: "071",
  chansey: "113",
  blissey: "242"
};

export function getPokemonImage(name: string): string {
  const cleanName = name.toLowerCase().trim();
  const dexId = POKEMON_DEX_IDS[cleanName];
  if (dexId) {
    return `https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_${dexId}_00.png`;
  }
  for (const [key, val] of Object.entries(POKEMON_DEX_IDS)) {
    if (cleanName.includes(key)) {
      return `https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_${val}_00.png`;
    }
  }
  return "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_000.png";
}
