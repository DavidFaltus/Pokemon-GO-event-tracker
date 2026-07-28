import React, { useState, useEffect, useMemo } from 'react';
import './FilterGeneratorView.css';
import type { Language } from '../data/translations';
import type { EventData } from './EventCard';
import { getTopCountersByName, getCounterTypesForName } from '../utils/pokemonCountersHelper';
import { handlePokemonImageError, getPokemonIconUrl } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { pokemonRankings } from '../data/pokemonRankings';
import { Copy, Check, Search, Filter, Zap, Sparkles } from 'lucide-react';

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
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialRaidBoss) {
      setSelectedBoss(initialRaidBoss);
    }
  }, [initialRaidBoss]);

  // Dynamically extract ALL current & upcoming raid bosses from events list + popular legendaries
  const allRaidBosses = useMemo(() => {
    const set = new Set<string>();
    
    // Extract bosses from events (Raid Hours, Rotations, Spotlight, etc.)
    if (events && events.length > 0) {
      events.forEach(e => {
        const bosses = e.extraData?.raidbattles?.bosses;
        if (Array.isArray(bosses)) {
          bosses.forEach(b => {
            if (b.name) set.add(b.name.replace(/shadow|mega|primal/gi, '').trim());
          });
        }
        if (e.eventType === 'raid-hour' || e.eventType === 'raid-battles') {
          const clean = e.name.replace(/raid\s*(hour|battles|rotation|day)/gi, '').trim();
          if (clean && clean.length > 2) set.add(clean);
        }
      });
    }

    // Default popular legendaries and meta raid bosses
    const defaultPopular = [
      'Palkia', 'Dialga', 'Rayquaza', 'Salamence', 'Mewtwo', 'Giratina', 'Kyogre', 'Groudon',
      'Lucario', 'Tyranitar', 'Garchomp', 'Reshiram', 'Zekrom', 'Heatran', 'Darkrai',
      'Charizard', 'Baxcalibur', 'Kyurem', 'Dragonite', 'Metagross', 'Gardevoir'
    ];
    
    defaultPopular.forEach(b => set.add(b));
    if (initialRaidBoss) set.add(initialRaidBoss.replace(/shadow|mega|primal/gi, '').trim());

    return Array.from(set).filter(Boolean);
  }, [events, initialRaidBoss]);

  // Autocomplete suggestions for typed query matching 360+ species
  const autocompleteSuggestions = useMemo(() => {
    if (!selectedBoss || selectedBoss.trim().length < 2) return [];
    const q = selectedBoss.toLowerCase().trim();
    
    const allKnownNames = new Set<string>();
    pokemonRankings.forEach(p => allKnownNames.add(p.name.replace(/shadow|mega|primal/gi, '').trim()));
    allRaidBosses.forEach(b => allKnownNames.add(b));

    return Array.from(allKnownNames)
      .filter(name => name.toLowerCase().includes(q))
      .slice(0, 10);
  }, [selectedBoss, allRaidBosses]);

  const topCounters = useMemo(() => {
    return getTopCountersByName(selectedBoss, 20);
  }, [selectedBoss]);

  const counterTypes = useMemo(() => {
    return getCounterTypesForName(selectedBoss);
  }, [selectedBoss]);

  const searchFilterString = useMemo(() => {
    if (topCounters.length === 0) return '';
    const uniqueIds = Array.from(new Set(topCounters.map(c => c.pokedexId)));
    const parts: string[] = ['3*,4*'];

    if (counterTypes.length > 0) {
      const moveTypesStr = counterTypes.map(t => `@${t.toLowerCase()}`).join(',');
      parts.push(moveTypesStr);
    }

    parts.push(uniqueIds.join(','));
    return parts.join('&');
  }, [topCounters, counterTypes]);

  const handleCopy = () => {
    if (!searchFilterString) return;
    navigator.clipboard.writeText(searchFilterString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="tab-content filter-generator-view">
      <h1 className="tab-seo-title">
        <Filter size={24} style={{ color: 'var(--accent-purple, #a855f7)', verticalAlign: 'middle', marginRight: '8px' }} />
        {lang === 'cs' ? 'Filter generator' : 'Filter generator'}
      </h1>
      <p className="tab-seo-description">
        {lang === 'cs'
          ? 'Vyberte jakéhokoliv Raid bossa nebo zadejte jméno libovolného Pokémona pro okamžité vygenerování vyhledávacího filtru do Pokémon GO.'
          : 'Select any Raid boss or type any Pokémon name to instantly generate a search filter for Pokémon GO.'}
      </p>

      {/* Boss Selection & Search Card */}
      <div className="filter-generator-card">
        <div className="filter-group-header">
          <Search size={16} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          <span>{lang === 'cs' ? 'Vyberte nebo zadejte libovolného Pokémona:' : 'Select or type any Pokémon:'}</span>
        </div>
        
        <div className="filter-search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="filter-search-input"
            value={selectedBoss}
            onChange={e => setSelectedBoss(e.target.value)}
            placeholder={lang === 'cs' ? 'Napište jméno Pokémona (např. Salamence, Rayquaza, Necrozma)...' : 'Type Pokémon name (e.g. Salamence, Rayquaza, Necrozma)...'}
          />
        </div>

        {/* Autocomplete suggestions */}
        {autocompleteSuggestions.length > 0 && selectedBoss.trim().length >= 2 && (
          <div className="filter-autocomplete-bar">
            <span className="autocomplete-label">{lang === 'cs' ? 'Našeptávač:' : 'Suggestions:'}</span>
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

        {/* Boss Chips section */}
        <div className="filter-boss-section-header">
          <Sparkles size={14} style={{ color: 'var(--accent-purple, #a855f7)' }} />
          <span>{lang === 'cs' ? 'Raid bossové v nadcházejících událostech & populární:' : 'Raid bosses in upcoming events & popular:'}</span>
        </div>
        
        <div className="filter-boss-chips-container">
          {allRaidBosses.map(boss => (
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
      </div>

      {/* Main Search Filter Output Box */}
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
              {lang === 'cs' ? 'Vyhledávací filtr' : 'Search filter'}
              {selectedBoss && selectedBoss.trim() ? ` (${getPokemonName(selectedBoss.trim(), lang)})` : ''}
            </span>
          </div>
          <button
            type="button"
            className={`filter-copy-action-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? (lang === 'cs' ? 'Zkopírováno!' : 'Copied!') : (lang === 'cs' ? 'Kopírovat' : 'Copy')}</span>
          </button>
        </div>
        <div className="filter-code-display-box" onClick={handleCopy}>
          <code>{searchFilterString}</code>
        </div>
      </div>
    </div>
  );
};
