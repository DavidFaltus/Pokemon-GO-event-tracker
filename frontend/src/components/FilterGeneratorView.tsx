import React, { useState, useEffect, useMemo } from 'react';
import './FilterGeneratorView.css';
import type { Language } from '../data/translations';
import type { EventData } from './EventCard';
import { getTopCountersForPokemonDetailed, getCounterTypesForName } from '../utils/pokemonCountersHelper';
import { handlePokemonImageError, getPokemonIconUrl } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { pokemonRankings } from '../data/pokemonRankings';
import { getRecommendedMegaForEvents } from '../utils/megaFilterHelper';
import { Copy, Check, Search, Filter, Zap, Sparkles, Dna, ShieldCheck, ShieldAlert, Layers } from 'lucide-react';

interface FilterGeneratorViewProps {
  lang: Language;
  events?: EventData[];
  initialRaidBoss?: string;
}

export const FilterGeneratorView: React.FC<FilterGeneratorViewProps> = ({
  lang,
  events = [],
  initialRaidBoss = 'Palkia'
}) => {
  const [selectedBoss, setSelectedBoss] = useState<string>(initialRaidBoss);
  const [copiedRaid, setCopiedRaid] = useState<boolean>(false);
  const [copiedMega, setCopiedMega] = useState<boolean>(false);
  const [filterStrategy, setFilterStrategy] = useState<'resistant' | 'max_dps'>('resistant');

  useEffect(() => {
    if (initialRaidBoss) {
      setSelectedBoss(initialRaidBoss);
    }
  }, [initialRaidBoss]);

  // Recommended Mega Evolution based on active events
  const recommendedMega = useMemo(() => {
    return getRecommendedMegaForEvents(events);
  }, [events]);

  // Dynamically extract ONLY raid bosses from events that are CURRENTLY ACTIVE right now
  const currentRaidBosses = useMemo(() => {
    const set = new Set<string>();
    const now = new Date();

    if (events && events.length > 0) {
      events.forEach(e => {
        const start = new Date(e.start);
        const end = new Date(e.end);
        const isActive = start <= now && now <= end;

        if (isActive) {
          const bosses = e.extraData?.raidbattles?.bosses;
          if (Array.isArray(bosses)) {
            bosses.forEach(b => {
              if (b.name) set.add(b.name.replace(/shadow|mega|primal/gi, '').trim());
            });
          }
          if (e.eventType === 'raid-hour' || e.eventType === 'raid-battles' || e.eventType === 'mega-raid') {
            const clean = e.name.replace(/raid\s*(hour|battles|rotation|day)/gi, '').trim();
            if (clean && clean.length > 2) set.add(clean);
          }
        }
      });
    }

    // Fallback current active legendaries if no active raid events in database right now
    if (set.size === 0) {
      ['Palkia', 'Dialga', 'Necrozma', 'Rayquaza', 'Groudon', 'Kyogre', 'Charizard', 'Baxcalibur'].forEach(b => set.add(b));
    }

    if (initialRaidBoss) set.add(initialRaidBoss.replace(/shadow|mega|primal/gi, '').trim());

    return Array.from(set).filter(Boolean);
  }, [events, initialRaidBoss]);

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

  // Detailed Top Counters algorithm considering BOTH Offensive SE AND Defensive NVE Resistance (Task #3)
  const topCountersDetailed = useMemo(() => {
    const clean = selectedBoss.toLowerCase().replace(/^(shadow|mega|primal)\s+/, '').trim();
    const targetPoke = pokemonRankings.find(p => p.name.toLowerCase().includes(clean)) || {
      name: selectedBoss, pokedexId: 483, types: ['Dragon', 'Steel'], attack: 275, defense: 211, stamina: 205, maxCp: 4565, pveScore: 90, dps: 25,
      bestFastMove: { name: 'Dragon Breath', type: 'Dragon' }, bestChargedMove: { name: 'Draco Meteor', type: 'Dragon' }
    };

    return getTopCountersForPokemonDetailed(targetPoke, pokemonRankings, 14);
  }, [selectedBoss]);

  // Filter counters based on selected strategy (Resistant Tanky vs Max DPS)
  const filteredCounters = useMemo(() => {
    if (filterStrategy === 'resistant') {
      // Exclude fragile glass cannons (vulnerable) and prioritize NVE resistant counters
      const resistantOnly = topCountersDetailed.filter(c => c.defensiveRating !== 'vulnerable');
      return resistantOnly.length > 0 ? resistantOnly : topCountersDetailed;
    }
    // Max DPS mode: return all counters without filtering out glass cannons
    return topCountersDetailed;
  }, [topCountersDetailed, filterStrategy]);

  const counterTypes = useMemo(() => {
    return getCounterTypesForName(selectedBoss);
  }, [selectedBoss]);

  const searchFilterString = useMemo(() => {
    if (filteredCounters.length === 0) return '';
    const uniqueIds = Array.from(new Set(filteredCounters.map(c => c.pokemon.pokedexId)));
    const parts: string[] = ['3*,4*'];

    if (counterTypes.length > 0) {
      const moveTypesStr = counterTypes.map(t => `@${t.toLowerCase()}`).join(',');
      parts.push(moveTypesStr);
    }

    parts.push(uniqueIds.join(','));
    return parts.join('&');
  }, [filteredCounters, counterTypes]);

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
        if (lang === 'ja') return '現在開催中のイベントのレイドボス:';
        if (lang === 'ru') return 'Рейд-боссы в текущих активных событиях:';
        if (lang === 'en') return 'Raid bosses in current active events:';
        return 'Raid bossové v právě probíhajících událostech:';
      case 'counters_showcase_header':
        if (lang === 'ja') return 'おすすめ対策ポケモン:';
        if (lang === 'ru') return 'Рекомендуемые покемоны-контрники:';
        if (lang === 'en') return 'Top Recommended Counters:';
        return 'Top Doporučení Counterři:';
      case 'filter_output':
        if (lang === 'ja') return 'レイド対策検索フィルター';
        if (lang === 'ru') return 'Фильтр контр-покемонов';
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

      {/* Modern Filter Modes Description Banner */}
      <div className="filter-modes-info-banner">
        <div className={`mode-info-card ${filterStrategy === 'resistant' ? 'active-resistant' : ''}`}>
          <div className="mode-info-header">
            <ShieldCheck size={18} className="mode-icon green" />
            <strong>
              {lang === 'cs' ? '🛡️ Režim Odolní & Tanky (Doporučeno)' : '🛡️ Tanky & NVE Resistant Mode (Recommended)'}
            </strong>
          </div>
          <p>
            {lang === 'cs'
              ? 'Odfiltruje křehké skleněné kanóny (Glass Cannons). Výběr upřednostňuje Pokémony, kteří udělují Super Effective poškození a ZÁROVEŇ sami odolávají útokům bosse (NVE). Šetří oživovače a lektvary v raidech!'
              : 'Filters out fragile glass cannons and prioritizes high-damage counters that resist the boss’s STAB attacks (NVE). Saves revives & potions in raids!'}
          </p>
        </div>

        <div className={`mode-info-card ${filterStrategy === 'max_dps' ? 'active-dps' : ''}`}>
          <div className="mode-info-header">
            <Zap size={18} className="mode-icon purple" />
            <strong>
              {lang === 'cs' ? '⚡ Režim Max DPS & Všechny Countery' : '⚡ Max DPS & All Counters Mode'}
            </strong>
          </div>
          <p>
            {lang === 'cs'
              ? 'Zobrazí kompletní žebříček podle nejsilnějšího poškození za sekundu (DPS) včetně skleněných útočníků, bez ohledu na jejich zranitelnost.'
              : 'Displays raw maximum damage per second (DPS) counters including fragile attackers regardless of defender vulnerabilities.'}
          </p>
        </div>
      </div>

      {/* Segmented Filter Strategy Switch Toggle */}
      <div className="filter-strategy-switch-bar">
        <span className="strategy-switch-label">
          <Layers size={16} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          {lang === 'cs' ? 'Strategie filtrování:' : 'Filtering Strategy:'}
        </span>
        <div className="strategy-toggle-buttons">
          <button
            type="button"
            className={`strategy-toggle-btn ${filterStrategy === 'resistant' ? 'active resistant' : ''}`}
            onClick={() => setFilterStrategy('resistant')}
          >
            <ShieldCheck size={16} />
            <span>{lang === 'cs' ? '🛡️ Odolní & Tanky (Bez Glass Cannonů)' : '🛡️ Resistant & Tanky (No Glass Cannons)'}</span>
          </button>
          <button
            type="button"
            className={`strategy-toggle-btn ${filterStrategy === 'max_dps' ? 'active max-dps' : ''}`}
            onClick={() => setFilterStrategy('max_dps')}
          >
            <Zap size={16} />
            <span>{lang === 'cs' ? '⚡ Max DPS (Všechny Countery)' : '⚡ Max DPS (All Counters)'}</span>
          </button>
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

        {/* Current Active Events Raid Bosses Section */}
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
        {filteredCounters.length > 0 && (
          <div className="filter-counters-showcase">
            <div className="counters-showcase-header">
              <ShieldCheck size={16} style={{ color: 'var(--accent-purple, #a855f7)' }} />
              <span>{getText('counters_showcase_header')}</span>
            </div>
            <div className="counters-showcase-grid">
              {filteredCounters.map(c => (
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
