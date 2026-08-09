import React, { useState, useEffect, useMemo } from 'react';
import './FilterGeneratorView.css';
import type { Language } from '../data/translations';
import type { EventData } from './EventCard';
import { getTopCountersForPokemonDetailed, getCounterTypesForName, getPokemonTypesByName } from '../utils/pokemonCountersHelper';
import { handlePokemonImageError, getPokemonIconUrl, getBasePokemonName } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { pokemonRankings } from '../data/pokemonRankings';
import { getRecommendedMegaForEvents } from '../utils/megaFilterHelper';
import { API_BASE_URL } from '../config';
import { Copy, Check, Search, Filter, Zap, Sparkles, Dna, ShieldCheck } from 'lucide-react';

interface FilterGeneratorViewProps {
  lang: Language;
  events?: EventData[];
  initialRaidBoss?: string;
}

// Set of 5-Star Legendary Raid Bosses and Mega/Primal Raid Bosses Only
const LEGENDARY_5STAR_AND_MEGAS = new Set<string>([
  // 5-Star Legendaries & Mythicals
  'Palkia', 'Dialga', 'Rayquaza', 'Mewtwo', 'Giratina', 'Kyogre', 'Groudon',
  'Reshiram', 'Zekrom', 'Heatran', 'Darkrai', 'Necrozma', 'Kyurem', 'Regigigas',
  'Regirock', 'Regice', 'Registeel', 'Raikou', 'Entei', 'Suicune', 'Lugia',
  'Ho-Oh', 'Latios', 'Latias', 'Cobalion', 'Terrakion', 'Virizion', 'Tornadus',
  'Thundurus', 'Landorus', 'Xerneas', 'Yveltal', 'Tapu Koko', 'Tapu Lele',
  'Tapu Bulu', 'Tapu Fini', 'Zacian', 'Zamazenta', 'Nihilego', 'Buzzwole',
  'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Blacephalon',
  'Stakataka', 'Deoxys', 'Genesect', 'Keldeo', 'Meloetta', 'Mesprit', 'Uxie', 'Azelf',

  // Megas & Primals
  'Mega Rayquaza', 'Mega Charizard Y', 'Mega Charizard X', 'Mega Lucario',
  'Mega Garchomp', 'Mega Tyranitar', 'Mega Gardevoir', 'Mega Alakazam',
  'Mega Gengar', 'Mega Blaziken', 'Mega Swampert', 'Mega Sceptile',
  'Mega Aerodactyl', 'Mega Lopunny', 'Mega Salamence', 'Mega Latios',
  'Mega Latias', 'Mega Aggron', 'Mega Steelix', 'Mega Scizor',
  'Mega Houndoom', 'Mega Ampharos', 'Mega Manectric', 'Mega Gyarados',
  'Mega Venusaur', 'Mega Blastoise', 'Mega Pinsir', 'Mega Heracross',
  'Mega Beedrill', 'Mega Pidgeot', 'Mega Kangaskhan', 'Mega Banette',
  'Mega Abomasnow', 'Mega Slowbro', 'Mega Medicham', 'Mega Glalie',
  'Mega Diancie', 'Primal Kyogre', 'Primal Groudon',
  'Lopunny', 'Charizard', 'Lucario', 'Garchomp', 'Tyranitar', 'Gardevoir',
  'Alakazam', 'Gengar', 'Blaziken', 'Swampert', 'Sceptile', 'Aerodactyl',
  'Salamence', 'Aggron', 'Steelix', 'Scizor', 'Houndoom', 'Ampharos',
  'Manectric', 'Gyarados', 'Venusaur', 'Blastoise', 'Pinsir', 'Heracross',
  'Beedrill', 'Pidgeot', 'Kangaskhan', 'Banette', 'Abomasnow', 'Slowbro',
  'Medicham', 'Glalie', 'Diancie'
]);

function is5StarOrMegaBoss(name: string): boolean {
  if (!name) return false;
  const clean = name.replace(/^(shadow|mega|primal)\s+/, '').trim().toLowerCase();
  for (const item of LEGENDARY_5STAR_AND_MEGAS) {
    const itemClean = item.replace(/^(shadow|mega|primal)\s+/, '').trim().toLowerCase();
    if (clean === itemClean || clean.includes(itemClean) || itemClean.includes(clean)) {
      return true;
    }
  }
  return false;
}

export const FilterGeneratorView: React.FC<FilterGeneratorViewProps> = ({
  lang,
  events = [],
  initialRaidBoss = 'Mesprit'
}) => {
  const [selectedBoss, setSelectedBoss] = useState<string>(initialRaidBoss);
  const [copiedRaid, setCopiedRaid] = useState<boolean>(false);
  const [copiedMega, setCopiedMega] = useState<boolean>(false);
  const [filterStrategy, setFilterStrategy] = useState<'resistant' | 'max_dps'>('resistant');
  const [apiRaidBosses, setApiRaidBosses] = useState<string[]>([]);

  // Fetch live active raid bosses directly from /api/raids endpoint (same source as Raids section)
  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE_URL}/api/raids`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data)) {
          const fetchedNames: string[] = [];
          data.forEach(item => {
            // Keep 5-Star, Mega, and Shadow-5 raid bosses
            if (item.tier === '5' || item.tier === 'mega' || item.tier === 'shadow-5' || (item.tier && item.tier.includes('5'))) {
              const base = getBasePokemonName(item.name);
              if (base && !fetchedNames.includes(base)) {
                fetchedNames.push(base);
              }
            }
          });
          if (fetchedNames.length > 0) {
            setApiRaidBosses(fetchedNames);
            if (!initialRaidBoss || initialRaidBoss === 'Palkia') {
              setSelectedBoss(fetchedNames[0]);
            }
          }
        }
      })
      .catch(err => console.error('FilterGeneratorView live raid fetch error:', err));

    return () => { isMounted = false; };
  }, [initialRaidBoss]);

  useEffect(() => {
    if (initialRaidBoss) {
      setSelectedBoss(initialRaidBoss);
    }
  }, [initialRaidBoss]);

  // Recommended Mega Evolution based on active events
  const recommendedMega = useMemo(() => {
    return getRecommendedMegaForEvents(events);
  }, [events]);

  // Extract STRICTLY ONLY 5-Star Legendary and Mega Raid Bosses from live API or current events
  const currentRaidBosses = useMemo(() => {
    const set = new Set<string>();

    // 1. First add live raid bosses from /api/raids (Mesprit, Shadow Giratina, Mega Blaziken)
    if (apiRaidBosses && apiRaidBosses.length > 0) {
      apiRaidBosses.forEach(b => set.add(b));
    }

    // 2. Add raid bosses from current active events
    if (events && events.length > 0) {
      events.forEach(e => {
        const isRaidEvent =
          (e.eventType || '').toLowerCase().includes('raid') ||
          (e.eventType || '').toLowerCase().includes('mega') ||
          (e.heading || '').toLowerCase().includes('raid') ||
          (e.name || '').toLowerCase().includes('raid');

        if (isRaidEvent) {
          const bossesList = [
            e.extraData?.raidbattles?.bosses,
            (e.extraData as any)?.raids,
            (e.extraData as any)?.bosses
          ];

          bossesList.forEach(list => {
            if (Array.isArray(list)) {
              list.forEach(b => {
                const rawName = typeof b === 'string' ? b : b?.name;
                if (rawName) {
                  const base = getBasePokemonName(rawName);
                  if (base && is5StarOrMegaBoss(base)) {
                    set.add(base);
                  }
                }
              });
            }
          });

          const titleBase = getBasePokemonName(e.name);
          if (titleBase && titleBase.length > 2 && is5StarOrMegaBoss(titleBase)) {
            set.add(titleBase);
          }
        }
      });
    }

    // 3. Fallback default legendaries and megas
    if (set.size === 0) {
      ['Mesprit', 'Giratina', 'Blaziken', 'Palkia', 'Dialga', 'Necrozma', 'Rayquaza', 'Groudon', 'Kyogre', 'Reshiram', 'Zekrom', 'Mewtwo', 'Heatran', 'Darkrai', 'Charizard', 'Lopunny', 'Lucario', 'Tyranitar'].forEach(b => set.add(b));
    }

    if (initialRaidBoss) {
      const baseInit = getBasePokemonName(initialRaidBoss);
      if (baseInit && is5StarOrMegaBoss(baseInit)) {
        set.add(baseInit);
      }
    }

    return Array.from(set).filter(Boolean);
  }, [apiRaidBosses, events, initialRaidBoss]);

  // Autocomplete suggestions for typed query matching 360+ species
  const autocompleteSuggestions = useMemo(() => {
    if (!selectedBoss || selectedBoss.trim().length < 2) return [];
    const q = selectedBoss.toLowerCase().trim();
    
    const allKnownNames = new Set<string>();
    pokemonRankings.forEach(p => allKnownNames.add(p.name.replace(/shadow|mega|primal/gi, '').trim()));
    currentRaidBosses.forEach(b => allKnownNames.add(b));

    return Array.from(allKnownNames)
      .filter(name => name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [selectedBoss, currentRaidBosses]);

  // Detailed Top Counters algorithm dynamically recalculating based on filterStrategy (Resistant vs Max DPS)
  const topCountersDetailed = useMemo(() => {
    const clean = selectedBoss.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
    const resolvedTypes = getPokemonTypesByName(selectedBoss);
    const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean)) || {
      name: selectedBoss, pokedexId: 9999, types: resolvedTypes, attack: 250, defense: 200, stamina: 200, maxCp: 3800, pveScore: 90, dps: 25,
      bestFastMove: { name: 'Tackle', type: resolvedTypes[0] || 'Normal' }, bestChargedMove: { name: 'Body Slam', type: resolvedTypes[0] || 'Normal' }
    };

    return getTopCountersForPokemonDetailed(targetPoke, pokemonRankings, 12, filterStrategy);
  }, [selectedBoss, filterStrategy]);

  const counterTypes = useMemo(() => {
    return getCounterTypesForName(selectedBoss);
  }, [selectedBoss]);

  const searchFilterString = useMemo(() => {
    if (topCountersDetailed.length === 0) return '';
    const uniqueIds = Array.from(new Set(topCountersDetailed.map(c => c.pokemon.pokedexId)));
    const parts: string[] = ['3*,4*'];

    if (counterTypes.length > 0) {
      const moveTypesStr = counterTypes.map(t => `@${t.toLowerCase()}`).join(',');
      parts.push(moveTypesStr);
    }

    parts.push(uniqueIds.join(','));
    return parts.join('&');
  }, [topCountersDetailed, counterTypes]);

  const handleCopyRaid = () => {
    if (!searchFilterString) return;
    navigator.clipboard.writeText(searchFilterString);
    setCopiedRaid(true);
    setTimeout(() => setCopiedRaid(false), 2500);
  };

  const handleCopyMega = () => {
    if (!recommendedMega.filterString) return;
    navigator.clipboard.writeText(recommendedMega.filterString);
    setCopiedMega(true);
    setTimeout(() => setCopiedMega(false), 2500);
  };

  const getText = (key: string) => {
    switch (key) {
      case 'title':
        if (lang === 'ja') return 'ポケモンGO 検索フィルタージェネレーター';
        if (lang === 'ru') return 'Генератор поискового фильтра для Pokémon GO';
        if (lang === 'en') return 'Pokémon GO Search Filter Generator';
        return 'Generátor vyhledávacího filtru do Pokémon GO';
      case 'desc':
        if (lang === 'ja') return 'ポケモンGOのボックス用検索文字列を自動生成します。対策ポケモンやメガシンカのフィルターを1タップでコピー！';
        if (lang === 'ru') return 'Генерирует поисковые фильтры для Pokémon GO. Быстро копируйте фильтры контр-покемонов и Мега-эволюций!';
        if (lang === 'en') return 'Generates exact search strings for Pokémon GO storage. Copy raid counters and Mega evolution filters with one tap!';
        return 'Vygeneruje přesný vyhledávací řetězec útoků, typů a Mega evolucí pro Pokémon GO inventář. Kopírujte filtry counterů i Mega evolucí jedním klepnutím!';
      case 'select_prompt':
        if (lang === 'ja') return 'レイドボスを選択または入力:';
        if (lang === 'ru') return 'Выберите или введите рейд-босса:';
        if (lang === 'en') return 'Select or type any Raid Boss:';
        return 'Vyberte nebo zadejte Raid Bosse:';
      case 'placeholder':
        if (lang === 'ja') return 'ポケモン名を入力（例: レックウザ, ギラティナ）...';
        if (lang === 'ru') return 'Введите имя босса (напр. Райкваза, Гиратина)...';
        if (lang === 'en') return 'Type boss name (e.g. Rayquaza, Giratina)...';
        return 'Napište jméno bosse (např. Rayquaza, Giratina)...';
      case 'suggestions':
        if (lang === 'ja') return '候補:';
        if (lang === 'ru') return 'Подсказки:';
        if (lang === 'en') return 'Suggestions:';
        return 'Našeptávač:';
      case 'current_bosses_header':
        if (lang === 'ja') return '現在開催中のレイドボス (5★＆メガ):';
        if (lang === 'ru') return 'Рейд-боссы в текущей ротации (только 5★ и Мега):';
        if (lang === 'en') return 'Raid bosses in current rotation (5★ & Mega Raids only):';
        return 'Raid bossové v aktuální rotaci (pouze 5★ a Mega Raidy):';
      case 'counters_showcase_header':
        if (lang === 'ja') return 'おすすめ対策ポケモン:';
        if (lang === 'ru') return 'Рекомендуемые покемоны-контрники:';
        if (lang === 'en') return 'Top Recommended Counters:';
        return 'Top Doporučení Counterři:';
      case 'filter_output':
        if (lang === 'ja') return 'レイド対策検索フィルター';
        if (lang === 'ru') return 'Фильтр контр-ポケモン';
        if (lang === 'en') return 'Raid Counter Filter';
        return 'Vyhledávací filtr Raid Counterů';
      case 'mega_title':
        if (lang === 'ja') return '🧬 イベント向けおすすめメガシンカ (アメボーナス)';
        if (lang === 'ru') return '🧬 Рекомендуемая Мега-эволюция (бонус конфет)';
        if (lang === 'en') return '🧬 Recommended Mega Evolution (Candy Bonus)';
        return '🧬 Doporučená Mega Evoluce (Bonus Candy & XL)';
      case 'copy':
        if (lang === 'ja') return 'コピー';
        if (lang === 'ru') return 'Копировать';
        if (lang === 'en') return 'Copy';
        return 'Kopírovat';
      case 'copied':
        if (lang === 'ja') return 'コピー完了！';
        if (lang === 'ru') return 'Скопировано!';
        if (lang === 'en') return 'Copied!';
        return 'Zkopírováno!';
      default:
        return '';
    }
  };

  return (
    <div className="tab-content filter-generator-view">
      <div className="filter-generator-header">
        <h1 className="tab-seo-title">
          <Filter size={24} style={{ color: 'var(--accent-purple, #a855f7)', verticalAlign: 'middle', marginRight: '8px' }} />
          {getText('title')}
        </h1>
        <p className="tab-seo-description">{getText('desc')}</p>
      </div>

      {/* Interactive Filter Strategy Cards (Clickable Toggles) */}
      <div className="filter-modes-info-banner">
        <div
          className={`mode-info-card interactive ${filterStrategy === 'resistant' ? 'active-resistant' : ''}`}
          onClick={() => setFilterStrategy('resistant')}
          role="button"
          tabIndex={0}
        >
          <div className="mode-info-header">
            <ShieldCheck size={20} className="mode-icon green" />
            <strong className="mode-title-text">
              {lang === 'cs' ? '🛡️ Režim Odolní & Tanky (Doporučeno)' : '🛡️ Tanky & NVE Resistant Mode (Recommended)'}
            </strong>
            <span className={`mode-status-badge ${filterStrategy === 'resistant' ? 'active' : ''}`}>
              {filterStrategy === 'resistant' ? (lang === 'cs' ? 'Aktivní' : 'Active') : (lang === 'cs' ? 'Vybrat' : 'Select')}
            </span>
          </div>
          <p>
            {lang === 'cs'
              ? 'Odfiltruje křehké skleněné kanóny (Glass Cannons). Výběr upřednostňuje Pokémony, kteří udělují Super Effective poškození a ZÁROVEŇ sami odolávají útokům bosse (NVE). Šetří oživovače a lektvary v raidech!'
              : 'Filters out fragile glass cannons and prioritizes high-damage counters that resist the boss’s STAB attacks (NVE). Saves revives & potions in raids!'}
          </p>
        </div>

        <div
          className={`mode-info-card interactive ${filterStrategy === 'max_dps' ? 'active-dps' : ''}`}
          onClick={() => setFilterStrategy('max_dps')}
          role="button"
          tabIndex={0}
        >
          <div className="mode-info-header">
            <Zap size={20} className="mode-icon purple" />
            <strong className="mode-title-text">
              {lang === 'cs' ? '⚡ Režim Max DPS & Všechny Countery' : '⚡ Max DPS & All Counters Mode'}
            </strong>
            <span className={`mode-status-badge ${filterStrategy === 'max_dps' ? 'active' : ''}`}>
              {filterStrategy === 'max_dps' ? (lang === 'cs' ? 'Aktivní' : 'Active') : (lang === 'cs' ? 'Vybrat' : 'Select')}
            </span>
          </div>
          <p>
            {lang === 'cs'
              ? 'Zobrazí kompletní žebříček podle nejsilnějšího poškození za sekundu (DPS) včetně skleněných útočníků, bez ohledu na jejich zranitelnost.'
              : 'Displays raw maximum damage per second (DPS) counters including fragile attackers regardless of defender vulnerabilities.'}
          </p>
        </div>
      </div>

      {/* Raid Counter Filter Generator Card */}
      <div className="filter-generator-card">
        <div className="filter-group-header">
          <Search size={16} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          <span>{getText('select_prompt')}</span>
        </div>
        
        <div className="filter-search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="filter-search-input"
            value={selectedBoss}
            onChange={e => setSelectedBoss(e.target.value)}
            placeholder={getText('placeholder')}
          />
        </div>

        {autocompleteSuggestions.length > 0 && selectedBoss.trim().length >= 2 && (
          <div className="filter-autocomplete-bar">
            <span className="autocomplete-label">{getText('suggestions')}</span>
            <div className="autocomplete-chips">
              {autocompleteSuggestions.map(name => (
                <button
                  key={name}
                  type="button"
                  className="autocomplete-chip-btn"
                  onClick={() => setSelectedBoss(name)}
                >
                  <img
                    src={getPokemonIconUrl(name)}
                    alt={name}
                    className="chip-pokemon-sprite"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                  />
                  <span>{getPokemonName(name, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Current Active Events Raid Bosses Section (STRICTLY Live API & 5-Star & Megas Only) */}
        <div className="filter-boss-section-header">
          <Sparkles size={14} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          <span>{getText('current_bosses_header')}</span>
        </div>
        
        <div className="filter-boss-chips-container">
          {currentRaidBosses.map(boss => (
            <button
              key={boss}
              type="button"
              className={`filter-boss-chip-btn ${selectedBoss.toLowerCase() === boss.toLowerCase() ? 'active' : ''}`}
              onClick={() => setSelectedBoss(boss)}
            >
              <img
                src={getPokemonIconUrl(boss)}
                alt={boss}
                className="chip-pokemon-sprite"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss)}
              />
              <span>{getPokemonName(boss, lang)}</span>
            </button>
          ))}
        </div>

        {/* Recommended Counters Showcase Grid with Defensive Resistance Badges */}
        {topCountersDetailed.length > 0 && (
          <div className="filter-counters-showcase">
            <div className="counters-showcase-header">
              <ShieldCheck size={16} style={{ color: 'var(--accent-purple, #a855f7)' }} />
              <span>{getText('counters_showcase_header')}</span>
            </div>
            <div className="counters-showcase-grid">
              {topCountersDetailed.map(c => (
                <div key={c.pokemon.name} className={`counter-card-mini ${c.defensiveRating}`}>
                  <div className="counter-sprite-wrapper">
                    <img
                      src={getPokemonIconUrl(c.pokemon.name)}
                      alt={c.pokemon.name}
                      className="counter-sprite-img"
                      onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, c.pokemon.name)}
                    />
                  </div>
                  <div className="counter-card-meta">
                    <strong className="counter-poke-name">{getPokemonName(c.pokemon.name, lang)}</strong>
                    <span className="counter-move-badge">⚔️ {c.pokemon.bestChargedMove.name}</span>
                    <span className={`counter-def-badge ${c.defensiveRating}`}>
                      {c.defensiveRating === 'resistant'
                        ? (lang === 'cs' ? '🛡️ Odolný (NVE)' : '🛡️ Resists (NVE)')
                        : c.defensiveRating === 'vulnerable'
                        ? (lang === 'cs' ? '⚠️ Glass Cannon' : '⚠️ Glass Cannon')
                        : (lang === 'cs' ? '⚔️ Neutrální' : '⚔️ Neutral')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-output-card">
        <div className="filter-output-header">
          <div className="filter-output-title-wrapper">
            {selectedBoss && selectedBoss.trim() ? (
              <img
                src={getPokemonIconUrl(selectedBoss)}
                alt={selectedBoss}
                className="header-pokemon-avatar"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, selectedBoss)}
              />
            ) : (
              <Zap size={18} style={{ color: 'var(--accent-purple, #a855f7)', filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.5))' }} />
            )}
            <span className="filter-output-title">
              {getText('filter_output')}
              {selectedBoss && selectedBoss.trim() ? ` (${getPokemonName(selectedBoss.trim(), lang)})` : ''}
            </span>
          </div>
          <button
            type="button"
            className={`filter-copy-action-btn ${copiedRaid ? 'copied' : ''}`}
            onClick={handleCopyRaid}
          >
            {copiedRaid ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedRaid ? getText('copied') : getText('copy')}</span>
          </button>
        </div>
        <div className="filter-code-display-box" onClick={handleCopyRaid}>
          <code>{searchFilterString}</code>
        </div>
      </div>

      {/* Recommended Mega Evolution Card */}
      <div className="filter-mega-card">
        <div className="filter-mega-header">
          <div className="filter-mega-title-group">
            <Dna size={20} className="mega-icon-glow" />
            <span className="filter-mega-title">{getText('mega_title')}</span>
          </div>
          <button
            type="button"
            className={`filter-copy-action-btn ${copiedMega ? 'copied' : ''}`}
            onClick={handleCopyMega}
          >
            {copiedMega ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedMega ? getText('copied') : getText('copy')}</span>
          </button>
        </div>

        <p className="filter-mega-reason">
          {lang === 'cs' ? recommendedMega.reasonCs : recommendedMega.reasonEn}
        </p>

        <div className="filter-mega-chips">
          {recommendedMega.megas.map(megaName => (
            <div key={megaName} className="filter-mega-chip">
              <img
                src={getPokemonIconUrl(megaName)}
                alt={megaName}
                className="chip-pokemon-sprite"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, megaName)}
              />
              <span>{getPokemonName(megaName, lang)}</span>
            </div>
          ))}
        </div>

        <div className="filter-code-display-box" onClick={handleCopyMega}>
          <code>{recommendedMega.filterString}</code>
        </div>
      </div>

    </div>
  );
};
