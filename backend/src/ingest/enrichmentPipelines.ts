import {
  ScrapedDuckRaidItem,
  ScrapedDuckEggItem,
  ScrapedDuckResearchItem,
  ScrapedDuckRocketItem,
  ScrapedRaidBoss,
  EnrichedEggGroup,
  EnrichedEgg,
  EnrichedResearchTask,
  RocketMember,
  GruntData
} from '../types';
import {
  findRaidCounters,
  translateTextToCs,
  resolvePokemonAsset,
  findPokemonMeta,
  POKEMON_TYPES_DB,
  LEADER_COUNTERS_DB,
  GRUNT_MAP,
  HUB_RATING_DB,
  getPokemonImageUrl
} from '../scraper';

// ============================================================================
// 1. Raid Boss Enrichment
// ============================================================================

export function mapScrapedDuckRaidTier(rawTier: string): ScrapedRaidBoss['tier'] {
  const lower = rawTier.toLowerCase();
  const isShadow = lower.includes('shadow');

  if (lower.includes('mega')) return 'mega';
  if (lower.includes('5-star') || lower.includes('tier 5') || lower.includes('legendary') || lower.includes('5')) {
    return isShadow ? 'shadow-5' : '5';
  }
  if (lower.includes('3-star') || lower.includes('tier 3') || lower.includes('3')) {
    return isShadow ? 'shadow-3' : '3';
  }
  if (lower.includes('1-star') || lower.includes('tier 1') || lower.includes('1')) {
    return isShadow ? 'shadow-1' : '1';
  }
  return '1';
}

export function enrichScrapedDuckRaids(rawRaids: ScrapedDuckRaidItem[]): ScrapedRaidBoss[] {
  if (!Array.isArray(rawRaids)) return [];

  return rawRaids.map(raw => {
    const tier = mapScrapedDuckRaidTier(raw.tier);
    
    // Normal CP Range
    let cpRange: string | undefined;
    if (raw.combatPower?.normal) {
      const { min, max } = raw.combatPower.normal;
      cpRange = min === max ? `${min}` : `${min} - ${max}`;
    }

    // Boosted CP Range
    let boostedCpRange: string | undefined;
    if (raw.combatPower?.boosted) {
      const { min, max } = raw.combatPower.boosted;
      boostedCpRange = min === max ? `${min}` : `${min} - ${max}`;
    }

    // Types
    const types = (raw.types || []).map(t => {
      const name = typeof t === 'string' ? t : t.name;
      return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
    }).filter(Boolean);

    // Weather Boosts
    const weatherBoosts = (raw.boostedWeather || []).map(w => {
      const name = typeof w === 'string' ? w : w.name;
      return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
    }).filter(Boolean);

    // Calculate raid counters & difficulty
    const counters = findRaidCounters(raw.name, types, cpRange, boostedCpRange, weatherBoosts);

    let difficultyTier: ScrapedRaidBoss['difficultyTier'] = counters?.difficultyTier;
    if (!difficultyTier) {
      if (tier === '1' || tier === 'shadow-1') difficultyTier = 'solo';
      else if (tier === '3' || tier === 'shadow-3') difficultyTier = 'solo';
      else if (tier === 'mega') difficultyTier = 'duo';
      else if (tier === '5' || tier === 'shadow-5') difficultyTier = 'trio';
      else difficultyTier = 'group';
    }

    return {
      name: raw.name,
      tier,
      image: raw.image || resolvePokemonAsset(raw.name, false),
      canBeShiny: Boolean(raw.canBeShiny),
      cpRange,
      boostedCpRange,
      weatherBoosts: weatherBoosts.length > 0 ? weatherBoosts : undefined,
      types: types.length > 0 ? types : undefined,
      counters: counters || null,
      difficultyTier,
      playersRecommended: counters?.playersRecommended,
      difficultyNotes: counters?.difficultyNotes,
      pokebattlerUrl: counters?.pokebattlerUrl
    };
  });
}

// ============================================================================
// 2. Egg Pool Enrichment
// ============================================================================

export function enrichScrapedDuckEggs(rawEggs: ScrapedDuckEggItem[]): EnrichedEggGroup[] {
  if (!Array.isArray(rawEggs)) return [];

  const groupsMap = new Map<string, EnrichedEgg[]>();

  for (const raw of rawEggs) {
    let distanceKey = raw.eggType || '2 km';
    if (raw.isAdventureSync) {
      distanceKey = distanceKey.toLowerCase().includes('adventure') 
        ? distanceKey 
        : `Adventure Sync (${distanceKey})`;
    }

    if (!groupsMap.has(distanceKey)) {
      groupsMap.set(distanceKey, []);
    }

    const eggItem: EnrichedEgg = {
      name: raw.name,
      image: resolvePokemonAsset(raw.name, false) || raw.image,
      canBeShiny: Boolean(raw.canBeShiny),
      minCp: raw.combatPower?.min,
      maxCp: raw.combatPower?.max,
      rarity: raw.rarity,
      isAdventureSync: Boolean(raw.isAdventureSync),
      isRegional: Boolean(raw.isRegional),
      isGiftExchange: Boolean(raw.isGiftExchange)
    };

    groupsMap.get(distanceKey)!.push(eggItem);
  }

  const result: EnrichedEggGroup[] = [];

  for (const [distance, eggs] of groupsMap.entries()) {
    let csTitle = `${distance} Vajíčka`;
    let enTitle = `${distance} Eggs`;

    if (distance.includes('7 km') || distance.includes('7km')) {
      csTitle = '7 km Vajíčka (Dárky od přátel)';
      enTitle = '7 km Eggs (Gift Exchange)';
    } else if (distance.includes('12 km') || distance.includes('12km')) {
      csTitle = '12 km Temná vajíčka (Team GO Rocket)';
      enTitle = '12 km Strange Eggs (Team GO Rocket)';
    } else if (distance.toLowerCase().includes('adventure')) {
      csTitle = `Adventure Sync (${distance}) Odměny`;
      enTitle = `Adventure Sync (${distance}) Rewards`;
    }

    result.push({
      distance,
      title: { cs: csTitle, en: enTitle },
      eggs
    });
  }

  // Desired ordering: 2km, 5km, 7km, 10km, 12km, Adventure Sync
  const orderRank = (dist: string) => {
    if (dist.startsWith('2')) return 1;
    if (dist.startsWith('5') && !dist.includes('Adventure')) return 2;
    if (dist.startsWith('7')) return 3;
    if (dist.startsWith('10') && !dist.includes('Adventure')) return 4;
    if (dist.startsWith('12')) return 5;
    if (dist.includes('Adventure')) return 6;
    return 10;
  };

  return result.sort((a, b) => orderRank(a.distance) - orderRank(b.distance));
}

// ============================================================================
// 3. Field Research Enrichment
// ============================================================================

export function enrichScrapedDuckResearch(rawTasks: ScrapedDuckResearchItem[]): EnrichedResearchTask[] {
  if (!Array.isArray(rawTasks)) return [];

  return rawTasks.map(raw => {
    // Strip HTML tags like <span>...</span>
    const cleanText = (raw.text || '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const translatedCs = translateTextToCs(cleanText);

    // Derive category
    const lower = cleanText.toLowerCase();
    let category: EnrichedResearchTask['category'] = 'misc';

    if (raw.type === 'catch' || lower.includes('catch') || lower.includes('chyť')) {
      category = 'catch';
    } else if (raw.type === 'throw' || lower.includes('throw') || lower.includes('curveball') || lower.includes('great') || lower.includes('excellent') || lower.includes('nice')) {
      category = 'throw';
    } else if (raw.type === 'raid' || lower.includes('raid') || lower.includes('win')) {
      category = 'raid';
    } else if (raw.type === 'buddy' || lower.includes('buddy') || lower.includes('feed') || lower.includes('parťák')) {
      category = 'buddy';
    } else if (lower.includes('power up') || lower.includes('evolve') || lower.includes('vylepši') || lower.includes('vyviň')) {
      category = 'power_up';
    } else if (lower.includes('spin') || lower.includes('pokéstop') || lower.includes('protoč')) {
      category = 'spin';
    }

    const rewards = (raw.rewards || []).map(r => ({
      name: r.name,
      image: resolvePokemonAsset(r.name, false) || r.image,
      canBeShiny: Boolean(r.canBeShiny),
      minCp: r.combatPower?.min,
      maxCp: r.combatPower?.max,
      amount: r.amount
    }));

    return {
      task: {
        en: cleanText,
        cs: translatedCs
      },
      category,
      rewards
    };
  });
}

// ============================================================================
// 4. Team GO Rocket Enrichment
// ============================================================================

export function enrichScrapedDuckRocketLineups(rawLineups: ScrapedDuckRocketItem[]): {
  giovanni?: RocketMember;
  leaders: RocketMember[];
  grunts: GruntData[];
} {
  if (!Array.isArray(rawLineups)) {
    return { leaders: [], grunts: [] };
  }

  let giovanni: RocketMember | undefined;
  const leaders: RocketMember[] = [];
  const grunts: GruntData[] = [];

  const mapSlot = (pokemonList?: { name: string; image: string; types?: string[] }[]) => {
    return (pokemonList || []).map(p => ({
      name: p.name,
      types: (p.types && p.types.length > 0) ? p.types.map(t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()) : (POKEMON_TYPES_DB[p.name.toLowerCase()] || ['Normal']),
      image: resolvePokemonAsset(p.name, false) || p.image || getPokemonImageUrl(p.name)
    }));
  };

  for (const item of rawLineups) {
    const name = item.name.trim();
    const isGiovanni = name.toLowerCase().includes('giovanni');
    const isLeader = ['cliff', 'arlo', 'sierra'].includes(name.toLowerCase()) || (item.title && item.title.toLowerCase().includes('leader'));

    if (isGiovanni || isLeader) {
      let avatar = '👤';
      if (isGiovanni) avatar = '👑';
      else if (name.toLowerCase().includes('cliff')) avatar = '💪';
      else if (name.toLowerCase().includes('arlo')) avatar = '👓';
      else if (name.toLowerCase().includes('sierra')) avatar = '🧣';

      const slot1 = mapSlot(item.firstPokemon);
      const slot2 = mapSlot(item.secondPokemon);
      const slot3 = mapSlot(item.thirdPokemon);

      // Encounter reward
      const encounterInSlot1 = (item.firstPokemon || []).find(p => p.isEncounter)?.name;
      const encounterInSlot3 = (item.thirdPokemon || []).find(p => p.isEncounter)?.name;
      const rewardName = encounterInSlot1 || encounterInSlot3 || (isGiovanni ? slot3[0]?.name : slot1[0]?.name) || name;

      const meta = findPokemonMeta(rewardName);
      const leaderKey = isGiovanni ? 'giovanni' : name.toLowerCase();
      const counters = LEADER_COUNTERS_DB[leaderKey] || {
        megaCounters: ["Mega Gardevoir", "Mega Rayquaza", "Mega Swampert"],
        advancedCounters: ["Lucario (Counter/Aura Sphere)", "Mamoswine (Powder Snow/Avalanche)", "Mewtwo (Confusion/Psystrike)"],
        budgetCounters: ["Machamp (Counter/Dynamic Punch)", "Gardevoir (Charm/Dazzling Gleam)", "Glaceon (Frost Breath/Avalanche)"]
      };

      const member: RocketMember = {
        name: isGiovanni ? 'Giovanni' : name,
        avatar,
        reward: {
          name: rewardName,
          pveRating: meta?.pveRating || 'None',
          pvpRating: meta?.pvpRating || 'None',
          worthGrinding: meta ? (meta.pveRating === 'S' || meta.pveRating === 'A' || meta.pvpRating === 'S' || meta.pvpRating === 'A') : false,
          reason: meta?.notes || `Shadow ${rewardName} je užitečný pokémon do hry.`,
          hubRating: HUB_RATING_DB[rewardName.toLowerCase()] || ''
        },
        lineup: { slot1, slot2, slot3 },
        counters
      };

      if (isGiovanni) {
        giovanni = member;
      }
      leaders.push(member);
    } else {
      // Grunt
      const type = item.type || 'Normal';
      const typeKey = type.toLowerCase();
      const mappedGrunt = GRUNT_MAP[typeKey] || {
        phraseCs: `Bojuj s mým ${type} typem!`,
        difficulty: "Easy" as const,
        worthFighting: false,
        counters: ["Machamp", "Mamoswine", "Kyogre"]
      };

      const shadowPokemon = (item.firstPokemon || []).map(p => p.name);
      if (shadowPokemon.length === 0 && item.secondPokemon?.length) {
        shadowPokemon.push(...item.secondPokemon.map(p => p.name));
      }

      grunts.push({
        phraseCs: mappedGrunt.phraseCs,
        phraseEn: item.quote || "Don't bother, I've already won!",
        type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
        difficulty: mappedGrunt.difficulty,
        worthFighting: mappedGrunt.worthFighting,
        shadowPokemon: shadowPokemon.length > 0 ? shadowPokemon : ['Shadow Pokémon'],
        counters: mappedGrunt.counters
      });
    }
  }

  return { giovanni, leaders, grunts };
}
