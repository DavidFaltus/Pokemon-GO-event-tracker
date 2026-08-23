import { SpecialEventDetails, EventHighlights } from '../types';
import { evaluateBonusImpact } from './bonusWeights';

export interface PokemonMetaInfo {
  name: string;
  evolution: string;
  pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
  pveRankText: string;
  pvpRankText: string;
  bestFastMove: string;
  bestChargedMove: string;
  notes: string;
}

export function evaluateEventMetaAndHighlights(
  details: SpecialEventDetails,
  metaDb: Record<string, PokemonMetaInfo>,
  eventName?: string
): EventHighlights {
  const pveTopPicks: string[] = [];
  const pvpTopPicks: string[] = [];
  const mustDoBonuses: string[] = [];
  let scorePoints = 0;

  // 1. Check Spawns, Debuts, Raids, Eggs & Featured Attacks against metaDb
  const candidatePokemonNames = new Set<string>();

  (details.spawns || []).forEach((s) => candidatePokemonNames.add(s.name));
  (details.debuts || []).forEach((d) => candidatePokemonNames.add(d.name));
  (details.featuredAttacks || []).forEach((a) => candidatePokemonNames.add(a.pokemonName));
  (details.raids || []).forEach((r) => r.list?.forEach((b) => candidatePokemonNames.add(b.name)));
  (details.eggs || []).forEach((e) => e.contents?.forEach((p) => candidatePokemonNames.add(p.name)));

  const seenPve = new Set<string>();
  const seenPvp = new Set<string>();

  candidatePokemonNames.forEach((rawName) => {
    const cleanKey = rawName
      .toLowerCase()
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/^shadow\s+/i, '')
      .replace(/^shiny\s+/i, '')
      .replace(/^mega\s+/i, '')
      .trim();

    const meta = metaDb[cleanKey];
    if (meta) {
      if (meta.pveRating === 'S' && !seenPve.has(cleanKey)) {
        seenPve.add(cleanKey);
        pveTopPicks.push(
          `${rawName} (${meta.evolution !== rawName && !meta.evolution.toLowerCase().includes(cleanKey) ? meta.evolution + ' - ' : ''}${meta.pveRankText})`
        );
        scorePoints += 3;
      } else if (meta.pveRating === 'A' && !seenPve.has(cleanKey)) {
        seenPve.add(cleanKey);
        pveTopPicks.push(`${rawName} (${meta.pveRankText})`);
        scorePoints += 2;
      }

      if (meta.pvpRating === 'S' && !seenPvp.has(cleanKey)) {
        seenPvp.add(cleanKey);
        pvpTopPicks.push(`${rawName} (${meta.pvpRankText})`);
        scorePoints += 3;
      } else if (meta.pvpRating === 'A' && !seenPvp.has(cleanKey)) {
        seenPvp.add(cleanKey);
        pvpTopPicks.push(`${rawName} (${meta.pvpRankText})`);
        scorePoints += 2;
      }
    }
  });

  // 2. Check Featured Attacks
  if (details.featuredAttacks && details.featuredAttacks.length > 0) {
    details.featuredAttacks.forEach((att) => {
      scorePoints += 2;
      mustDoBonuses.push(`⚔️ Speciální útok: ${att.pokemonName} získá útok ${att.moveName} při evoluci`);
    });
  }

  // 3. Check High-Value Bonuses & Paid Ticket
  const allBonuses = [
    ...(details.bonuses || []),
    ...(details.paidTicket?.bonuses || []),
    ...(details.goPass?.milestones || [])
  ];

  const seenBonusCategories = new Set<string>();

  allBonuses.forEach((b) => {
    const textEn = b.text?.en || '';
    const textCs = b.text?.cs || '';
    const evaluated = evaluateBonusImpact(textEn, textCs);

    if (evaluated.weight > 0) {
      scorePoints += evaluated.weight;
      if (!seenBonusCategories.has(evaluated.highlightCs)) {
        seenBonusCategories.add(evaluated.highlightCs);
        mustDoBonuses.push(evaluated.highlightCs);
      }
    }
  });

  // 4. Calculate Grind Score ($S / A / B / C$)
  let grindScore: 'S' | 'A' | 'B' | 'C' = 'C';
  if (scorePoints >= 5) grindScore = 'S';
  else if (scorePoints >= 3) grindScore = 'A';
  else if (scorePoints >= 1) grindScore = 'B';

  return {
    pveTopPicks: pveTopPicks.slice(0, 5),
    pvpTopPicks: pvpTopPicks.slice(0, 5),
    mustDoBonuses: mustDoBonuses.slice(0, 6),
    grindScore
  };
}
