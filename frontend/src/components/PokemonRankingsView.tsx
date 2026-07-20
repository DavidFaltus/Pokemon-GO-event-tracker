import React, { useState, useMemo, useCallback } from 'react';
import './PokemonRankingsView.css';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { pokemonRankings } from '../data/pokemonRankings';
import type { PokemonRankData } from '../data/pokemonRankings';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { TypeBadge } from './EventCard';
import { getPokemonName, getStatusTagName } from '../utils/pokemonTranslator';
import { Search, Trophy, Sword, ShieldAlert, Heart, Star, ChevronDown, ChevronUp, Target, Zap } from 'lucide-react';
import {
  getCounterTypes,
  getTopCountersForPokemon,
  getTopMovesetsForPokemon,
  isLegacyMove
} from '../utils/pokemonCountersHelper';

function getMoveTypeColor(type: string): string {
  const colors: Record<string, string> = {
    Normal: '#a8a878', Fire: '#f08030', Water: '#6890f0', Grass: '#78c850',
    Electric: '#f8d030', Ice: '#98d8d8', Fighting: '#c03028', Poison: '#a040a0',
    Ground: '#e0c068', Flying: '#a890f0', Psychic: '#f85888', Bug: '#a8b820',
    Rock: '#b8a038', Ghost: '#705898', Dragon: '#7038f8', Dark: '#705848',
    Steel: '#b8b8d0', Fairy: '#ee99ac',
  };
  return colors[type] || '#888888';
}

function getMoveTypeBadgeStyle(type: string): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: getMoveTypeColor(type),
    color: '#fff',
    fontSize: '0.62rem',
    fontWeight: 700,
    padding: '1px 6px',
    borderRadius: '20px',
    marginRight: '5px',
    verticalAlign: 'middle',
    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap' as const,
  };
}

const MoveTypeBadgeWithIcon: React.FC<{ type: string }> = ({ type }) => {
  const typeClass = type.toLowerCase();
  return (
    <span style={getMoveTypeBadgeStyle(type)} className="move-type-badge">
      <img
        src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeClass}.svg`}
        alt={type}
        className="move-type-icon"
      />
      {type}
    </span>
  );
};

interface PokemonRankingsViewProps {
  lang: Language;
}

const ALL_TYPES = [
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice", 
  "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", 
  "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"
];

const sortFn = (a: { pveScore: number; attack: number; maxCp: number }, b: { pveScore: number; attack: number; maxCp: number }) => {
  if (b.pveScore !== a.pveScore) return b.pveScore - a.pveScore;
  if (b.attack !== a.attack) return b.attack - a.attack;
  return b.maxCp - a.maxCp;
};

export const PokemonRankingsView: React.FC<PokemonRankingsViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedPokes, setExpandedPokes] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((pokeKey: string) => {
    setExpandedPokes(prev => {
      const next = new Set(prev);
      if (next.has(pokeKey)) {
        next.delete(pokeKey);
      } else {
        next.add(pokeKey);
      }
      return next;
    });
  }, []);

  // Compute the FULL sorted list (no filters) — used to derive stable ranks
  const fullSortedRankings = useMemo(() => {
    return [...pokemonRankings].sort(sortFn);
  }, []);

  // Map: uniqueKey -> overall rank (1-based)
  const overallRankMap = useMemo(() => {
    const map = new Map<string, number>();
    fullSortedRankings.forEach((poke, idx) => {
      const key = `${poke.name}-${poke.pokedexId}-${poke.isShadow}-${poke.isMega}-${poke.isPrimal}`;
      map.set(key, idx + 1);
    });
    return map;
  }, [fullSortedRankings]);

  // Map: uniqueKey -> rank within its attack type (based on bestChargedMove.type)
  const typeRankMap = useMemo(() => {
    const map = new Map<string, number>();
    const byType = new Map<string, typeof pokemonRankings>();
    fullSortedRankings.forEach(poke => {
      const attackType = poke.bestChargedMove.type;
      if (!byType.has(attackType)) byType.set(attackType, []);
      byType.get(attackType)!.push(poke);
    });
    byType.forEach(list => {
      list.forEach((poke, idx) => {
        const key = `${poke.name}-${poke.pokedexId}-${poke.isShadow}-${poke.isMega}-${poke.isPrimal}`;
        map.set(key, idx + 1);
      });
    });
    return map;
  }, [fullSortedRankings]);

  const getPokeKey = useCallback((poke: PokemonRankData) =>
    `${poke.name}-${poke.pokedexId}-${poke.isShadow}-${poke.isMega}-${poke.isPrimal}`, []);

  // Filtered + sorted list for display
  const filteredRankings = useMemo(() => {
    let result = [...pokemonRankings];

    // Filter by type (based on attack type)
    if (selectedType) {
      result = result.filter(poke => poke.bestChargedMove.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(poke =>
        poke.name.toLowerCase().includes(q) ||
        poke.pokedexId.toString() === q
      );
    }

    return result.sort(sortFn);
  }, [searchQuery, selectedType]);

  return (
    <div className="pokemon-rankings-container">
      <p className="tab-seo-description">{(t as any).seo_ranking_desc}</p>
      <div className="rankings-header-card">
        <div className="rankings-title-row">
          <Trophy size={28} className="trophy-icon" />
          <h1 className="tab-seo-title" style={{ margin: 0, padding: 0 }}>{t.ranking_title}</h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text"
            className="ranking-search-input"
            placeholder={t.ranking_search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Type Filter Selector */}
        <div className="types-filter-container">
          <button 
            className={`type-filter-btn ${selectedType === null ? 'active' : ''}`}
            onClick={() => setSelectedType(null)}
          >
            <Trophy size={14} style={{ marginRight: '6px' }} />
            {t.ranking_type_all}
          </button>
          {ALL_TYPES.map(type => {
            const typeClass = type.toLowerCase();
            return (
              <button
                key={type}
                className={`type-filter-btn type-${typeClass} ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                <img
                  src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeClass}.svg`}
                  alt={type}
                  className="filter-type-icon"
                />
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rankings List */}
      <div className="rankings-list">
        {filteredRankings.length === 0 ? (
          <div className="no-rankings-found">
            <p>{t.ranking_no_results}</p>
          </div>
        ) : (
          filteredRankings.map((poke) => {
            const pokeKey = getPokeKey(poke);
            const overallRank = overallRankMap.get(pokeKey) ?? 0;
            const typeRank = typeRankMap.get(pokeKey) ?? 0;
            const primaryType = poke.bestChargedMove.type;
            const isExpanded = expandedPokes.has(pokeKey);

            const isFastLegacy = isLegacyMove(poke.bestFastMove.name);
            const isChargedLegacy = isLegacyMove(poke.bestChargedMove.name);
            const counterTypes = getCounterTypes(poke.types);
            const topCounters = getTopCountersForPokemon(poke, fullSortedRankings);
            const topMovesets = getTopMovesetsForPokemon(poke);

            return (
              <div 
                key={pokeKey} 
                className={`ranking-pokemon-row ${!isExpanded ? 'collapsed' : ''}`}
                onClick={() => toggleExpand(pokeKey)}
                style={{ cursor: 'pointer' }}
              >
                {/* Main Row summary content */}
                <div className="ranking-row-top-main">
                  {/* Left rank column: overall + type rank stacked with # ON THE LEFT */}
                  <div className="ranking-rank-col">
                    <div className="rank-badge rank-overall" title="Celkové pořadí">
                      <div className="rank-num-row">
                        <span className="rank-hash">#</span>
                        <span className="rank-num">{overallRank}</span>
                      </div>
                      <span className="rank-lbl">OVERALL</span>
                    </div>
                    <div className="rank-badge rank-type" title={`Pořadí v typu ${primaryType}`} style={{ background: `linear-gradient(135deg, ${getMoveTypeColor(primaryType)}cc, ${getMoveTypeColor(primaryType)}66)` }}>
                      <div className="rank-num-row">
                        <span className="rank-hash">#</span>
                        <span className="rank-num">{typeRank}</span>
                      </div>
                      <span className="rank-lbl">{primaryType.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* PVE Score badge */}
                  <div className="ranking-score-badge" style={{
                    background: poke.pveScore >= 95
                      ? 'linear-gradient(135deg, #eab308, #ca8a04)'
                      : poke.pveScore >= 90
                      ? 'linear-gradient(135deg, #a855f7, #7e22ce)'
                      : 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                  }}>
                    <span className="score-val">{poke.pveScore}</span>
                    <span className="score-lbl">PVE</span>
                  </div>

                  {/* Pokemon Sprite */}
                  <div className="ranking-poke-img-wrapper">
                    <img 
                      src={resolveImage(undefined, undefined, poke.name)} 
                      alt={poke.name} 
                      className="ranking-poke-img"
                      onError={(e) => {
                        handlePokemonImageError(e.target as HTMLImageElement, poke.name);
                      }}
                    />
                  </div>

                  {/* Info and Type column */}
                  <div className="ranking-poke-main-info">
                    <div className="poke-title-flex" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <span className="poke-name">{getPokemonName(poke.name, lang)}</span>
                      <span className="poke-dex-id">#{poke.pokedexId}</span>
                      <div className="collapse-chevron-wrapper" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', opacity: 0.6, color: 'var(--text-muted)' }}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                    <div className="poke-badges-flex">
                      <div className="poke-types-row">
                        {poke.types.map(type => (
                          <TypeBadge key={type} typeStr={type} lang={lang} />
                        ))}
                      </div>
                      {/* Special status tags */}
                      {poke.isShadow && <span className="status-tag shadow-tag">{getStatusTagName('Shadow', lang)}</span>}
                      {poke.isMega && <span className="status-tag mega-tag">{getStatusTagName('Mega', lang)}</span>}
                      {poke.isPrimal && <span className="status-tag primal-tag">{getStatusTagName('Primal', lang)}</span>}
                    </div>
                  </div>

                  {/* Base Stats column */}
                  <div className="ranking-stats-col">
                    <div className="stat-item">
                      <span className="stat-label-icon"><Sword size={12} style={{ color: '#f87171' }} /></span>
                      <span className="stat-val"><strong>{poke.attack}</strong> {t.ranking_attack}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label-icon"><ShieldAlert size={12} style={{ color: '#60a5fa' }} /></span>
                      <span className="stat-val"><strong>{poke.defense}</strong> {t.ranking_defense}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label-icon"><Heart size={12} style={{ color: '#4ade80' }} /></span>
                      <span className="stat-val"><strong>{poke.stamina}</strong> {t.ranking_stamina}</span>
                    </div>
                    <div className="stat-item max-cp-item">
                      <span className="stat-label-icon"><Star size={12} style={{ color: '#fbbf24' }} /></span>
                      <span className="stat-val"><strong>{poke.maxCp}</strong> CP</span>
                    </div>
                  </div>

                  {/* Ideal Moveset column with Type SVG Icons & Legacy asterisk (*) */}
                  <div className="ranking-moveset-col">
                    <div className="moveset-header-row">
                      <span className="moveset-header">{t.ranking_ideal_moveset}:</span>
                      {poke.dps && poke.dps > 0 && (
                        <span className="moveset-dps">
                          DPS: <strong>{poke.dps.toFixed(1)}</strong>
                        </span>
                      )}
                    </div>
                    <div className="moves-box">
                      <span className="fast-move">
                        <MoveTypeBadgeWithIcon type={poke.bestFastMove.type} />
                        <span>{poke.bestFastMove.name}{isFastLegacy && <span className="legacy-asterisk" title="Legacy / Elite TM Move">*</span>}</span>
                      </span>
                      <span className="move-divider">+</span>
                      <span className="charged-move">
                        <MoveTypeBadgeWithIcon type={poke.bestChargedMove.type} />
                        <span>{poke.bestChargedMove.name}{isChargedLegacy && <span className="legacy-asterisk" title="Legacy / Elite TM Move">*</span>}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section: Top 5 Movesets & Counter Pokémon */}
                {isExpanded && (
                  <div className="poke-expanded-details-panel" onClick={(e) => e.stopPropagation()}>
                    <div className="expanded-divider"></div>

                    <div className="expanded-sections-grid">
                      {/* Top 5 Moveset Combinations */}
                      <div className="movesets-top5-card">
                        <h4 className="expanded-card-title">
                          <Zap size={15} style={{ color: '#c084fc' }} />
                          {lang === 'cs' ? 'Top 5 Kombinací Movesetů' : 'Top 5 Moveset Combinations'}
                        </h4>
                        <div className="movesets-table">
                          {topMovesets.map((ms, index) => (
                            <div key={index} className={`moveset-row-item ${index === 0 ? 'best-moveset' : ''}`}>
                              <span className="moveset-rank-index">#{index + 1}</span>
                              <div className="moveset-moves-pair">
                                <span className="moveset-move">
                                  <MoveTypeBadgeWithIcon type={ms.fastMove.type} />
                                  <span>{ms.fastMove.name}{ms.fastMove.isLegacy && <span className="legacy-asterisk" title="Elite TM / Legacy">*</span>}</span>
                                </span>
                                <span className="moveset-plus">+</span>
                                <span className="moveset-move">
                                  <MoveTypeBadgeWithIcon type={ms.chargedMove.type} />
                                  <span>{ms.chargedMove.name}{ms.chargedMove.isLegacy && <span className="legacy-asterisk" title="Elite TM / Legacy">*</span>}</span>
                                </span>
                              </div>
                              <div className="moveset-stats-badge">
                                <span className="moveset-dps-val">{ms.dps} DPS</span>
                                <span className="moveset-pct">{ms.pctOfBest}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <span className="legacy-legend-hint">
                          <span className="legacy-asterisk">*</span> {lang === 'cs' ? 'Elite TM / Eventový legacy útok' : 'Elite TM / Event legacy move'}
                        </span>
                      </div>

                      {/* Optimal Counters & Weaknesses */}
                      <div className="counters-section-card">
                        <h4 className="expanded-card-title">
                          <Target size={15} style={{ color: '#f87171' }} />
                          {lang === 'cs' ? `Nejlepší Countery & Slabiny (${getPokemonName(poke.name, lang)})` : `Top Counters & Weaknesses (${getPokemonName(poke.name, lang)})`}
                        </h4>

                        {/* Optimal Counter Types Row */}
                        <div className="counter-types-box">
                          <span className="counter-box-lbl">{lang === 'cs' ? 'Optimální typy útoků:' : 'Optimal counter types:'}</span>
                          <div className="counter-types-list">
                            {counterTypes.map(ct => (
                              <span key={ct.type} className={`counter-type-badge ${ct.multiplier >= 2 ? 'double-weakness' : ''}`}>
                                <MoveTypeBadgeWithIcon type={ct.type} />
                                <span className="weakness-mult">{ct.label}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Top 5 Counter Pokémon list */}
                        <div className="top-counters-list">
                          <span className="counter-box-lbl" style={{ marginBottom: '4px' }}>
                            {lang === 'cs' ? 'Top 5 Pokémonů pro souboj (Counters):' : 'Top 5 Counter Pokémon:'}
                          </span>
                          {topCounters.map((cp, idx) => (
                            <div key={idx} className="counter-poke-item">
                              <span className="counter-poke-rank">#{idx + 1}</span>
                              <img
                                src={resolveImage(undefined, undefined, cp.pokemon.name)}
                                alt={cp.pokemon.name}
                                className="counter-poke-img"
                                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, cp.pokemon.name)}
                              />
                              <div className="counter-poke-info">
                                <span className="counter-poke-name">{getPokemonName(cp.pokemon.name, lang)}</span>
                                <span className="counter-poke-moves">
                                  <MoveTypeBadgeWithIcon type={cp.pokemon.bestFastMove.type} />
                                  {cp.pokemon.bestFastMove.name} + {cp.pokemon.bestChargedMove.name}
                                </span>
                              </div>
                              <span className="counter-score-pill">
                                {cp.counterRating} pts
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
