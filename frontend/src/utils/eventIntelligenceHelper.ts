import { POKEDEX_CATALOG, POKEDEX_MAP, type PokedexCatalogEntry, type PokemonType } from '../data/pokedexCatalog';
import { pokemonRankings } from '../data/pokemonRankings';
import { raidCountersDb } from '../data/raidCounters';
import metaIndexData from '../data/pokedexMetaIndex.json';
import { getPokemonName } from './pokemonTranslator';
import { getCounterTypes, getTopCountersForPokemon } from './pokemonCountersHelper';
import type { EventData } from '../components/EventCard';
import type { Language } from '../data/translations';

const META_INDEX = metaIndexData as Record<string, any>;

const TYPE_LABELS_BY_LANG: Record<string, Record<Language, string>> = {
  Normal: { cs: 'Normální', en: 'Normal', ja: 'ノーマル', ru: 'Нормальный' },
  Fire: { cs: 'Ohnivý', en: 'Fire', ja: 'ほのお', ru: 'Огненный' },
  Water: { cs: 'Vodní', en: 'Water', ja: 'みず', ru: 'Водный' },
  Grass: { cs: 'Travní', en: 'Grass', ja: 'くさ', ru: 'Травяной' },
  Electric: { cs: 'Elektrický', en: 'Electric', ja: 'でんき', ru: 'Электрический' },
  Ice: { cs: 'Ledový', en: 'Ice', ja: 'こおり', ru: 'Ледяной' },
  Fighting: { cs: 'Bojový', en: 'Fighting', ja: 'かくとう', ru: 'Боевой' },
  Poison: { cs: 'Jedový', en: 'Poison', ja: 'どく', ru: 'Ядовитый' },
  Ground: { cs: 'Zemní', en: 'Ground', ja: 'じめん', ru: 'Земляной' },
  Flying: { cs: 'Létající', en: 'Flying', ja: 'ひこう', ru: 'Летающий' },
  Psychic: { cs: 'Psychický', en: 'Psychic', ja: 'エスパー', ru: 'Психический' },
  Bug: { cs: 'Hmyzí', en: 'Bug', ja: 'むし', ru: 'Насекомый' },
  Rock: { cs: 'Kamenný', en: 'Rock', ja: 'いわ', ru: 'Каменный' },
  Ghost: { cs: 'Duchový', en: 'Ghost', ja: 'ゴースト', ru: 'Призрачный' },
  Dragon: { cs: 'Dračí', en: 'Dragon', ja: 'ドラゴン', ru: 'Драконий' },
  Steel: { cs: 'Ocelový', en: 'Steel', ja: 'はがね', ru: 'Стальной' },
  Dark: { cs: 'Temný', en: 'Dark', ja: 'あく', ru: 'Темный' },
  Fairy: { cs: 'Vílí', en: 'Fairy', ja: 'フェアリー', ru: 'Волшебный' },
};

export function localizeTypeName(type: string, lang: Language): string {
  const clean = type.replace(/\s*\(.*\)$/, '').trim();
  const cap = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  const base = TYPE_LABELS_BY_LANG[cap]?.[lang] || cap;
  if (type.includes('2.56') || type.includes('2x')) {
    return `${base} (2.56×)`;
  }
  if (type.includes('1.6')) {
    return `${base} (1.6×)`;
  }
  return base;
}

const RECOMMENDED_MEGA_BY_TYPE: Record<PokemonType, string[]> = {
  Normal: ['Mega Lopunny', 'Mega Pidgeot', 'Mega Kangaskhan'],
  Fire: ['Mega Charizard Y', 'Primal Groudon', 'Mega Blaziken'],
  Water: ['Primal Kyogre', 'Mega Swampert', 'Mega Gyarados'],
  Grass: ['Mega Sceptile', 'Primal Groudon', 'Mega Venusaur'],
  Electric: ['Mega Rayquaza', 'Mega Manectric', 'Mega Ampharos'],
  Ice: ['Mega Abomasnow', 'Mega Glalie'],
  Fighting: ['Mega Lucario', 'Mega Blaziken', 'Mega Heracross'],
  Poison: ['Mega Gengar', 'Mega Beedrill', 'Mega Venusaur'],
  Ground: ['Primal Groudon', 'Mega Garchomp', 'Mega Swampert'],
  Flying: ['Mega Rayquaza', 'Mega Pidgeot', 'Mega Salamence'],
  Psychic: ['Mega Rayquaza', 'Mega Alakazam', 'Mega Gardevoir'],
  Bug: ['Mega Heracross', 'Mega Pinsir', 'Mega Scizor'],
  Rock: ['Mega Tyranitar', 'Mega Diancie', 'Mega Aerodactyl'],
  Ghost: ['Mega Gengar', 'Mega Banette'],
  Dragon: ['Mega Rayquaza', 'Mega Garchomp', 'Mega Salamence'],
  Dark: ['Mega Tyranitar', 'Mega Houndoom', 'Mega Gyarados'],
  Steel: ['Mega Aggron', 'Mega Scizor', 'Mega Steelix'],
  Fairy: ['Mega Gardevoir', 'Mega Diancie', 'Mega Altaria'],
};

export interface EventBossIntelligence {
  dexId: number;
  slug: string;
  name: string;
  localizedName: string;
  types: PokemonType[];
  localizedTypes: string[];
  weaknesses: string[];
  stats: { attack: number; defense: number; stamina: number };
  cpLv20: number;
  cpLv25: number;
  cpLv50: number;
  recommendedTrainers: string;
  counters: {
    name: string;
    localizedName: string;
    slug: string;
    dexId: number;
    fastMove: string;
    chargedMove: string;
    dps: number;
  }[];
}

export interface EventSpawnIntelligence {
  dexId: number;
  slug: string;
  name: string;
  localizedName: string;
  types: PokemonType[];
  localizedTypes: string[];
  canBeShiny: boolean;
  cpLv15: number;
  cpLv20: number;
  cpLv50: number;
  pveSummary: string;
  pvpSummary: string;
  recommendedMegas: string[];
  hundoFilterString: string;
  pvpFilterString: string;
}

export interface EventGblLeagueBreakdown {
  leagueKey: string;
  leagueTitle: string;
  cpLimitLabel: string;
  topPicks: {
    rank: number;
    dexId: number;
    slug: string;
    name: string;
    localizedName: string;
    types: PokemonType[];
    score: number;
    moveset: string;
  }[];
}

export interface EventIntelligenceBundle {
  featuredEntries: PokedexCatalogEntry[];
  bossBreakdowns: EventBossIntelligence[];
  spawnBreakdowns: EventSpawnIntelligence[];
  gblBreakdowns: EventGblLeagueBreakdown[];
  editorialSections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
}

function extractText(val: any, lang: Language): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') {
    if (lang === 'ja' && val.ja) return val.ja;
    if (lang === 'cs' && val.cs) return val.cs;
    if (lang === 'ru' && val.ru) return val.ru;
    return val.en || val.cs || val.ja || '';
  }
  return String(val);
}

/**
 * Matches Pokémon mentioned in event title, bosses, spawns, eggs, or spotlight against POKEDEX_CATALOG.
 */
export function matchFeaturedPokemonForEvent(
  event: EventData,
  rawDetails?: any
): PokedexCatalogEntry[] {
  const matchedMap = new Map<number, PokedexCatalogEntry>();

  const candidateStrings: string[] = [event.name || ''];
  const extra = event.extraData as any;

  if (extra?.spotlight?.name) candidateStrings.push(extra.spotlight.name);
  if (Array.isArray(extra?.raidbattles?.bosses)) {
    extra.raidbattles.bosses.forEach((b: any) => candidateStrings.push(typeof b === 'string' ? b : b?.name || ''));
  }
  if (Array.isArray(extra?.communityday?.spawns)) {
    extra.communityday.spawns.forEach((s: any) => candidateStrings.push(typeof s === 'string' ? s : s?.name || ''));
  }
  if (Array.isArray(rawDetails?.spawns)) {
    rawDetails.spawns.forEach((s: any) => candidateStrings.push(typeof s === 'string' ? s : extractText(s?.name || s, 'en')));
  }
  if (Array.isArray(rawDetails?.raids)) {
    rawDetails.raids.forEach((r: any) => candidateStrings.push(typeof r === 'string' ? r : extractText(r?.name || r, 'en')));
  }
  if (Array.isArray(rawDetails?.debuts)) {
    rawDetails.debuts.forEach((d: any) => candidateStrings.push(typeof d === 'string' ? d : extractText(d?.name || d, 'en')));
  }
  if (Array.isArray(rawDetails?.eggs)) {
    rawDetails.eggs.forEach((eg: any) => candidateStrings.push(typeof eg === 'string' ? eg : extractText(eg?.name || eg, 'en')));
  }

  const combinedText = candidateStrings.join(' | ').toLowerCase();

  // Sort catalog by longest name first so e.g. "mr. mime" or "charizard" matches cleanly
  const sortedCatalog = [...POKEDEX_CATALOG].sort((a, b) => b.names.en.length - a.names.en.length);

  for (const entry of sortedCatalog) {
    if (matchedMap.size >= 8) break;
    const enLower = entry.names.en.toLowerCase();
    if (enLower.length < 3) continue;
    const escaped = enLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    if (regex.test(combinedText)) {
      matchedMap.set(entry.dexId, entry);
    }
  }

  return Array.from(matchedMap.values());
}

export function buildEventIntelligence(
  event: EventData,
  rawDetails: any,
  lang: Language
): EventIntelligenceBundle {
  const featuredEntries = matchFeaturedPokemonForEvent(event, rawDetails);
  const typeLower = (event.eventType || '').toLowerCase();
  const nameLower = (event.name || '').toLowerCase();

  const isRaidOrMaxEvent =
    typeLower.includes('raid') ||
    typeLower.includes('max') ||
    nameLower.includes('raid') ||
    nameLower.includes('dynamax') ||
    nameLower.includes('gigantamax') ||
    nameLower.includes('max monday') ||
    nameLower.includes('max battle') ||
    Boolean((event.extraData as any)?.raidbattles?.bosses?.length) ||
    Boolean(rawDetails?.raids?.length);

  const isGblEvent =
    typeLower.includes('go-battle-league') ||
    typeLower.includes('pvp') ||
    nameLower.includes('great league') ||
    nameLower.includes('ultra league') ||
    nameLower.includes('master league') ||
    nameLower.includes('cup');

  const bossBreakdowns: EventBossIntelligence[] = [];
  const spawnBreakdowns: EventSpawnIntelligence[] = [];

  featuredEntries.forEach((entry) => {
    const localizedName = lang === 'ja' ? entry.names.ja : getPokemonName(entry.names.en, lang);
    const localizedTypes = entry.types.map((t) => localizeTypeName(t, lang));
    const weaknessObjs = getCounterTypes(entry.types);
    const weaknesses = weaknessObjs.map((w) => localizeTypeName(`${w.type} (${w.label})`, lang));
    const hasDoubleWeakness = weaknessObjs.some((w) => w.multiplier >= 2.0);

    const rankMatch =
      pokemonRankings.find((p) => p.pokedexId === entry.dexId && !p.isShadow && !p.isMega && !p.isPrimal) ||
      pokemonRankings.find((p) => p.pokedexId === entry.dexId);

    const computedCounters = rankMatch ? getTopCountersForPokemon(rankMatch, pokemonRankings).slice(0, 6) : [];
    const dbKey = Object.keys(raidCountersDb).find(
      (k) => k.toLowerCase().includes(entry.names.en.toLowerCase())
    );
    const dbCounters = dbKey ? raidCountersDb[dbKey] : undefined;

    const counters =
      computedCounters.length > 0
        ? computedCounters.map((c) => {
            const cEntry = POKEDEX_MAP[c.pokemon.pokedexId];
            return {
              name: c.pokemon.name,
              localizedName: getPokemonName(c.pokemon.name, lang),
              slug: cEntry?.slug || String(c.pokemon.pokedexId),
              dexId: c.pokemon.pokedexId,
              fastMove: c.pokemon.bestFastMove.name,
              chargedMove: c.pokemon.bestChargedMove.name,
              dps: c.pokemon.dps,
            };
          })
        : (dbCounters?.advancedCounters || []).slice(0, 6).map((raw) => {
            const m = raw.match(/^([^(]+)\(([^)]+)\)$/);
            const cName = m ? m[1].trim() : raw;
            return {
              name: cName,
              localizedName: getPokemonName(cName, lang),
              slug: 'mewtwo',
              dexId: 150,
              fastMove: 'Optimal Fast',
              chargedMove: m ? m[2].trim() : 'Optimal Charged',
              dps: 42.0,
            };
          });

    if (isRaidOrMaxEvent && bossBreakdowns.length < 4) {
      const recTrainers = hasDoubleWeakness
        ? lang === 'cs'
          ? '2–3 trenéři (Lv 40+ countery díky 2.56× dvojité slabosti)'
          : lang === 'ja'
            ? '2〜3人（二重弱点2.56倍を活用）'
            : lang === 'ru'
              ? '2–3 тренера (двойная уязвимость 2.56×)'
              : '2–3 Trainers (exploiting 2.56x double weakness)'
        : lang === 'cs'
          ? '3–5 trenérů (doporučeno Party Power + Mega evoluce)'
          : lang === 'ja'
            ? '3〜5人（チームコラボ＋メガシンカ推奨）'
            : lang === 'ru'
              ? '3–5 тренеров (с Party Power и Мега-эволюцией)'
              : '3–5 Trainers (with Party Power & Mega boost)';

      bossBreakdowns.push({
        dexId: entry.dexId,
        slug: entry.slug,
        name: entry.names.en,
        localizedName,
        types: entry.types,
        localizedTypes,
        weaknesses,
        stats: entry.stats,
        cpLv20: entry.maxCp.lv20,
        cpLv25: entry.maxCp.lv25,
        cpLv50: entry.maxCp.lv50,
        recommendedTrainers: recTrainers,
        counters,
      });
    }

    const meta = META_INDEX[entry.slug];
    const bestFast = meta?.pve?.bestMoveset?.fast || entry.quickMoves[0]?.name || 'Tackle';
    const bestCharged = meta?.pve?.bestMoveset?.charged || entry.cinematicMoves[0]?.name || 'Struggle';
    const pveDps = meta?.pve?.dps ? `${meta.pve.dps} DPS` : '';
    const glRank = meta?.pvp?.great?.rank ? `Great League #${meta.pvp.great.rank}` : null;
    const ulRank = meta?.pvp?.ultra?.rank ? `Ultra League #${meta.pvp.ultra.rank}` : null;
    const mlRank = meta?.pvp?.master?.rank ? `Master League #${meta.pvp.master.rank}` : null;
    const pvpRanks = [glRank, ulRank, mlRank].filter(Boolean);

    const megasSet = new Set<string>();
    entry.types.forEach((t) => {
      (RECOMMENDED_MEGA_BY_TYPE[t] || []).forEach((m) => megasSet.add(m));
    });

    spawnBreakdowns.push({
      dexId: entry.dexId,
      slug: entry.slug,
      name: entry.names.en,
      localizedName,
      types: entry.types,
      localizedTypes,
      canBeShiny: entry.canBeShinyInGo,
      cpLv15: entry.maxCp.lv15,
      cpLv20: entry.maxCp.lv20,
      cpLv50: entry.maxCp.lv50,
      pveSummary: `${bestFast} + ${bestCharged}${pveDps ? ` (${pveDps})` : ''}`,
      pvpSummary:
        pvpRanks.length > 0
          ? pvpRanks.join(' • ')
          : lang === 'cs'
            ? 'Sběratelský / PvE zaměřený druh'
            : lang === 'ja'
              ? 'コレクション・PvE向け'
              : lang === 'ru'
                ? 'Коллекционный / PvE покемон'
                : 'Collection & PvE specialist',
      recommendedMegas: Array.from(megasSet).slice(0, 3),
      hundoFilterString: `${entry.dexId}&4*`,
      pvpFilterString: `${entry.dexId}&0-1attack&3-4defense&3-4hp`,
    });
  });

  // GBL League breakdowns if GBL event
  const gblBreakdowns: EventGblLeagueBreakdown[] = [];
  if (isGblEvent) {
    const activeLeagues: { key: 'great' | 'ultra' | 'master' | 'little'; title: Record<Language, string>; cpLabel: string }[] = [];
    if (nameLower.includes('great') || nameLower.includes('cup')) {
      activeLeagues.push({
        key: 'great',
        title: {
          cs: 'Great League & Speciální Poháry (do 1 500 CP)',
          en: 'Great League & Specialty Cups (1,500 CP Cap)',
          ja: 'スーパーリーグ＆限定カップ（CP 1,500以下）',
          ru: 'Великая Лига и Кубки (до 1 500 CP)',
        },
        cpLabel: 'Max 1,500 CP',
      });
    }
    if (nameLower.includes('ultra')) {
      activeLeagues.push({
        key: 'ultra',
        title: {
          cs: 'Ultra League (do 2 500 CP)',
          en: 'Ultra League (2,500 CP Cap)',
          ja: 'ハイパーリーグ（CP 2,500以下）',
          ru: 'Ультра Лига (до 2 500 CP)',
        },
        cpLabel: 'Max 2,500 CP',
      });
    }
    if (nameLower.includes('master')) {
      activeLeagues.push({
        key: 'master',
        title: {
          cs: 'Master League (Bez omezení CP – Level 50 Meta)',
          en: 'Master League (No CP Limit – Level 50 Meta)',
          ja: 'マスターリーグ（CP無制限・PL50環境）',
          ru: 'Мастер Лига (Без лимита CP)',
        },
        cpLabel: 'No CP Cap (Lv 50)',
      });
    }
    if (nameLower.includes('little')) {
      activeLeagues.push({
        key: 'little',
        title: {
          cs: 'Little Cup (do 500 CP)',
          en: 'Little Cup (500 CP Cap)',
          ja: 'リトルカップ（CP 500以下）',
          ru: 'Малый Кубок (до 500 CP)',
        },
        cpLabel: 'Max 500 CP',
      });
    }
    if (activeLeagues.length === 0) {
      activeLeagues.push({
        key: 'great',
        title: {
          cs: 'GO Battle League Meta Přehled',
          en: 'GO Battle League Meta Tier List',
          ja: 'GOバトルリーグ環境トップポケモン',
          ru: 'Топ меты GO Battle League',
        },
        cpLabel: '1,500 CP',
      });
    }

    activeLeagues.forEach((lg) => {
      const candidates: EventGblLeagueBreakdown['topPicks'] = [];
      for (const [slug, mData] of Object.entries(META_INDEX)) {
        const lgInfo = mData?.pvp?.[lg.key];
        const entry = POKEDEX_MAP[mData.dexId];
        if (lgInfo && lgInfo.rank && lgInfo.rank <= 25 && entry && entry.isReleasedInGo) {
          candidates.push({
            rank: lgInfo.rank,
            dexId: entry.dexId,
            slug: entry.slug,
            name: entry.names.en,
            localizedName: lang === 'ja' ? entry.names.ja : getPokemonName(entry.names.en, lang),
            types: entry.types,
            score: lgInfo.score,
            moveset: Array.isArray(lgInfo.moveset)
              ? lgInfo.moveset.map((mv: string) => mv.replace(/_/g, ' ')).join(' + ')
              : '',
          });
        }
      }
      candidates.sort((a, b) => a.rank - b.rank);
      gblBreakdowns.push({
        leagueKey: lg.key,
        leagueTitle: lg.title[lang] || lg.title.en,
        cpLimitLabel: lg.cpLabel,
        topPicks: candidates.slice(0, 6),
      });
    });
  }

  // Build deep editorial sections & FAQs
  const startFormatted = event.start ? event.start.replace('T', ' ').slice(0, 16) : '';
  const endFormatted = event.end ? event.end.replace('T', ' ').slice(0, 16) : '';
  const primaryPokeName =
    spawnBreakdowns[0]?.localizedName || bossBreakdowns[0]?.localizedName || '';
  const primaryMegaList =
    spawnBreakdowns[0]?.recommendedMegas.join(', ') || 'Mega Rayquaza, Primal Kyogre, Primal Groudon';

  const editorialSections: { heading: string; paragraphs: string[] }[] = [];
  const faqs: { question: string; answer: string }[] = [];

  if (lang === 'cs') {
    editorialSections.push({
      heading: `Kompletní strategický rozbor a harmonogram události ${event.name}`,
      paragraphs: [
        `Událost „${event.name}“ (kategorie: ${event.heading || event.eventType}) probíhá v Pokémon GO v termínu od ${startFormatted} do ${endFormatted} místního času. Tento podrobný redakční průvodce shrnuje veškeré potvrzené herní bonusy, divoké spawny, raidové bosse a doporučené taktiky, abyste z časově omezeného okna vytěžili maximum XP, Stardustu i vzácných XL Candy.`,
        isRaidOrMaxEvent
          ? `Protože se jedná o bojově zaměřenou událost (${event.heading || 'Raid / Max Battle'}), klíčem k úspěchu je předběžná příprava 6členného týmu s optimálními útoky a maximální využití mechaniky Party Power v partě přátel, která zdvojnásobuje poškození nabíjecích útoků (Charged Moves). Před vstupem do lobby si také ověřte 100% IV (Hundo) CP hodnoty uvedené v naší tabulce níže, abyste okamžitě poznali perfektní úlovek a případně na něj použili Pinap Berry nebo Master Ball.`
          : isGblEvent
            ? `Během této rotace GO Battle League mají trenéři možnost odehrát denně standardních 5 sad po 5 zápasech (celkem 25 soubojů denně, případně až 50–100 během Battle Weekendů) a získávat tisíce Stardustu, Rare Candy, Elite TM a setkání s legendárními bossy od Ranku 20 výše.`
            : `Pro maximální efektivitu během události „${event.name}“ doporučujeme před začátkem vyčistit batoh na předměty (alespoň 150–200 Ultra Ballů a Pinap Berries) a uvolnit úložiště Pokémonů pomocí předpřipraveného vyhledávacího filtru. Nezapomeňte aktivovat Mega evoluci na úrovni Mega Level 2 nebo Mega Level 3 (${primaryMegaList}), která vám za každého chyceného Pokémona stejného typu přidá +1 až +2 Candy a výrazně zvýší šanci na zisk XL Candy.`,
      ],
    });

    editorialSections.push({
      heading: `Checklist přípravy trenéra: Jak maximalizovat Stardust, XP a XL Candy`,
      paragraphs: [
        `1. Aktivace Mega Evoluce: Ještě před prvním chycením nebo vstupem do raidu aktivujte Mega Pokémona odpovídajícího typu (${primaryMegaList}). Na maximální úrovni (Max Mega Level) získáte o 25 % vyšší pravděpodobnost padnutí Candy XL, což ušetří desítky kilometrů chůze s Buddym.`,
        `2. Načasování Star Piece a Lucky Egg: Pokud událost zahrnuje násobiče Stardustu či XP (nebo chystáte hromadné vyzvednutí odměn z Field/Timed Research a přátelství), zapněte Star Piece (+50 % Stardust) a Lucky Egg (+100 % XP) v nejhustší části hraní.`,
        `3. Rychlé vyhodnocení IV v terénu: Využijte naše vyhledávací řetězce níže. Zadáním „4*“ okamžitě odhalíte 100% IV (Hundo) kusy pro raidy a Master League, zatímco řetězec „0-1attack&3-4defense&3-4hp“ vyfiltruje kandidáty s nejvyšším stat productem pro Great a Ultra League.`,
      ],
    });

    faqs.push(
      {
        question: `Kdy přesně začíná a končí událost ${event.name} v Pokémon GO?`,
        answer: `Událost ${event.name} začíná ${startFormatted} a končí ${endFormatted}. Veškeré časově omezené výzkumy (Timed Research) a exkluzivní bonusy je nutné dokončit a vyzvednout před uplynutím konečného času.`,
      },
      {
        question: primaryPokeName
          ? `Jakou Mega evoluci zapnout pro ${primaryPokeName} během ${event.name}?`
          : `Jakou Mega evoluci je nejlepší aktivovat během události ${event.name}?`,
        answer: `Pro maximální zisk běžných Candy (+1 až +2 za chycení) i zvýšenou šanci na Candy XL doporučujeme aktivovat ${primaryMegaList}.`,
      },
      {
        question: `Může být hlavní Pokémon během události ${event.name} Shiny?`,
        answer:
          spawnBreakdowns.some((s) => s.canBeShiny) || bossBreakdowns.length > 0
            ? `Ano, vybraní hlavní Pokémoni této události mohou být chyceni v lesklé (Shiny) variantě. U Community Day je šance přibližně 1 z 25, u Raid Day 1 z 10, u 5★ legendárních raidů 1 z 20 a u standardních eventových spawnů 1 z 64 až 1 z 512.`
            : `Dostupnost Shiny variant se řídí oficiálním přehledem debutů pro danou sezónu v Pokémon GO.`,
      }
    );
  } else if (lang === 'ja') {
    editorialSections.push({
      heading: `イベント「${event.name}」完全攻略ガイド・開催スケジュール`,
      paragraphs: [
        `Pokémon GOのイベント「${event.name}」は、${startFormatted}から${endFormatted}まで開催されます。本ガイドでは、イベント期間中に発生するボーナス、野生出現ポケモン、レイドボス対策、個体値100%（Hundo）のCPラインやメガシンカの活用法を詳しく解説します。`,
        `イベント開始前にモンスターボールやパイルのみを十分に確保し、対象ポケモンと同タイプのメガシンカ（${primaryMegaList}など）を発動させておくことで、捕獲時のアメとアメXLの獲得効率を最大化できます。`,
      ],
    });
    faqs.push(
      {
        question: `「${event.name}」の開催期間はいつですか？`,
        answer: `開始日時は${startFormatted}、終了日時は${endFormatted}です。タイムチャレンジの報酬は終了時刻までに必ず受け取りましょう。`,
      },
      {
        question: `おすすめのメガシンカポケモンは？`,
        answer: `アメとアメXLのボーナスを得るために、${primaryMegaList}などの同タイプメガシンカを発動させるのが最適です。`,
      }
    );
  } else if (lang === 'ru') {
    editorialSections.push({
      heading: `Полный гайд и расписание события «${event.name}» в Pokémon GO`,
      paragraphs: [
        `Событие «${event.name}» проходит в Pokémon GO с ${startFormatted} по ${endFormatted}. В этом подробном руководстве собраны все активные бонусы, спавны, рейд-боссы, таблицы 100% IV CP и рекомендации по выбору Мега-эволюций.`,
        `Перед началом события активируйте Мега-эволюцию подходящего типа (${primaryMegaList}), чтобы получать дополнительные конфеты и повысить шанс выпадения XL конфет при каждой поимке.`,
      ],
    });
    faqs.push(
      {
        question: `Когда проходит событие «${event.name}»?`,
        answer: `Событие начинается ${startFormatted} и заканчивается ${endFormatted}.`,
      },
      {
        question: `Какую Мега-эволюцию лучше активировать?`,
        answer: `Рекомендуем активировать ${primaryMegaList} для получения бонусных конфет и XL конфет.`,
      }
    );
  } else {
    editorialSections.push({
      heading: `Complete Strategy Guide & Schedule for ${event.name}`,
      paragraphs: [
        `The "${event.name}" event (${event.heading || event.eventType}) runs in Pokémon GO from ${startFormatted} until ${endFormatted} local time. This comprehensive editorial breakdown covers all confirmed event bonuses, wild spawns, raid boss counters, 100% IV (Hundo) CP charts, and optimal preparation strategies.`,
        isRaidOrMaxEvent
          ? `Because "${event.name}" focuses on high-tier Raid or Max Battle encounters, assembling a pre-built team of Level 40+ counters and coordinating Party Power with friends in the lobby (which doubles Charged Attack damage) will drastically reduce your time-to-win and save Revives. Review the 100% IV catch CP thresholds below before throwing your Premier Balls.`
          : isGblEvent
            ? `During this GO Battle League rotation, trainers can complete their daily battle sets to farm Stardust, Rare Candy, and encounters while climbing toward Ace, Veteran, Expert, and Legend ranks.`
            : `To maximize your resource gains during "${event.name}", stock up on Ultra Balls and Pinap Berries ahead of time and clear Pokémon storage space using our custom search strings. Always activate a Mega Level 2 or Level 3 Pokémon of a matching elemental type (${primaryMegaList}) to earn +1 to +2 bonus Catch Candy and up to a +25% Candy XL drop rate boost.`,
      ],
    });

    editorialSections.push({
      heading: `Trainer Preparation Checklist: Maximizing Stardust, XP & Candy XL`,
      paragraphs: [
        `1. Matching Mega Evolution Boost: Activate ${primaryMegaList} before catching event spawns or entering raid lobbies to boost both ally raid damage (+30%) and Catch Candy XL drops.`,
        `2. Star Piece & Lucky Egg Stacking: Coordinate your Star Piece (+50% Stardust) and Lucky Egg (+100% XP) timers with active event multipliers and Timed Research reward claims.`,
        `3. Instant IV Appraisal Strings: Use the search filters below ("4*" for 100% IV Hundos and "0-1attack&3-4defense&3-4hp" for Great/Ultra League PvP IV spreads) to rapidly sort your catches.`,
      ],
    });

    faqs.push(
      {
        question: `When does the ${event.name} event start and end in Pokémon GO?`,
        answer: `The ${event.name} event begins on ${startFormatted} and concludes on ${endFormatted}. Be sure to complete and claim all Timed Research tasks before the event timer expires.`,
      },
      {
        question: `Which Mega Evolution should I activate during ${event.name}?`,
        answer: `We recommend activating ${primaryMegaList} to maximize bonus Catch Candy and increase your Candy XL drop chance across the event's featured Pokémon.`,
      },
      {
        question: `Can featured Pokémon be Shiny during ${event.name}?`,
        answer: `Yes, eligible featured Pokémon and raid bosses during ${event.name} can be encountered in their Shiny forms (with boosted 1/25 odds on Community Days, 1/10 on Raid Days, and 1/20 in 5-Star Legendary Raids).`,
      }
    );
  }

  return {
    featuredEntries,
    bossBreakdowns,
    spawnBreakdowns,
    gblBreakdowns,
    editorialSections,
    faqs,
  };
}
