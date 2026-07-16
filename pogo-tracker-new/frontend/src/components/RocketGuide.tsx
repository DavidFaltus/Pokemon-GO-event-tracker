import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import { CounterItem } from './CounterItem';
import { API_BASE_URL } from '../config';
import { Zap, Users, Gift, Flame, Swords, Shield, MessageSquare, Gem, Moon, Glasses, Trophy } from 'lucide-react';
import { getPokemonHubRating, getEvolutionInfo } from '../data/hubRatings';
import { resolveImage, getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';

const ShadowIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{
      width: '14px',
      height: '14px',
      color: '#c084fc',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }}
  >
    <path d="M12 2C11.5 3.5 10 5.5 8.5 7C7 8.5 5.5 10.5 5.5 13C5.5 16.5 8.5 19.5 12 19.5C15.5 19.5 18.5 16.5 18.5 13C18.5 10.5 17 8.5 15.5 7C14 5.5 12.5 3.5 12 2ZM12 17C10.5 17 9.5 16 9.5 14.5C9.5 13 11 11.5 12 10C13 11.5 14.5 13 14.5 14.5C14.5 16 13.5 17 12 17Z" />
  </svg>
);

const getLeaderIcon = (name: string, size = 16) => {
  const cleanName = name.toLowerCase();
  if (cleanName === 'giovanni') {
    return (
      <svg 
        viewBox="0 0 64 64" 
        width={size} 
        height={size} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <path d="M12 56V32c0-6 4-10 10-10h20c6 0 10 4 10 10v24" />
        <path d="M22 22l10 16 10-16" />
        <path d="M26 22V14c0-3 2-5 6-5s6 2 6 5v8" />
        <path d="M32 26v16l-3 4 3 4 3-4-3-4" fill="currentColor" fillOpacity={0.15} />
      </svg>
    );
  }
  if (cleanName === 'cliff') {
    return (
      <svg 
        viewBox="0 0 24 24" 
        width={size} 
        height={size} 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: 'middle', transform: 'scaleX(-1)' }}
      >
        <path d="M6 20a5 5 0 0 1 5-5h1c2 0 3.5-1.5 3.5-3.5V8" />
        <path d="M15.5 8c1.2 0 2.2.8 2.2 2v2.5c0 2.5-2 4.5-4.5 4.5H6" />
        <circle cx="15.5" cy="7.5" r="2" fill="currentColor" fillOpacity={0.15} />
      </svg>
    );
  }
  if (cleanName === 'sierra') {
    return <Moon size={size} fill="currentColor" fillOpacity={0.15} style={{ display: 'inline-block', verticalAlign: 'middle' }} />;
  }
  if (cleanName === 'arlo') {
    return <Glasses size={size} fill="currentColor" fillOpacity={0.15} style={{ display: 'inline-block', verticalAlign: 'middle' }} />;
  }
  return null;
};

interface RocketGuideProps {
  lang: Language;
}

interface LineupPokemon {
  name: string;
  types: string[];
  image: string;
}

interface RocketMember {
  name: string;
  avatar: string;
  reward: {
    name: string;
    pveRating: 'S' | 'A' | 'B' | 'C' | 'None';
    pvpRating: 'S' | 'A' | 'B' | 'C' | 'None';
    worthGrinding: boolean;
    reason: string;
    hubRating: string;
  };
  lineup: {
    // Backend may send string[] OR LineupPokemon[] — we normalise in renderLineupSlot
    slot1: (string | LineupPokemon)[];
    slot2: (string | LineupPokemon)[];
    slot3: (string | LineupPokemon)[];
  };
  counters: {
    megaCounters: string[];
    advancedCounters: string[];
    budgetCounters: string[];
  };
}

interface GruntData {
  phraseCs: string;
  phraseEn: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  worthFighting: boolean;
  shadowPokemon: string[];
  counters: string[];
}

type ModeType = 'leaders' | 'grunts';

const HubRatingBadge: React.FC<{ rating: string }> = ({ rating }) => {
  if (!rating) return null;
  
  const getRatingColor = (r: string) => {
    const rLower = r.toLowerCase();
    if (rLower === 's') return { bg: '#eab308', color: '#0c0d12' }; // Gold
    if (rLower.startsWith('a+')) return { bg: '#10b981', color: '#ffffff' }; // Emerald / Bright Green
    if (rLower.startsWith('a')) return { bg: '#22c55e', color: '#0c0d12' }; // Green
    if (rLower.startsWith('b')) return { bg: '#3b82f6', color: '#ffffff' }; // Blue
    return { bg: '#9ca3af', color: '#0c0d12' }; // Gray
  };
  
  const colors = getRatingColor(rating);
  
  return (
    <span 
      className="hub-rating-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: '2px 6px',
        fontSize: '0.65rem',
        fontWeight: 800,
        borderRadius: '4px',
        backgroundColor: colors.bg,
        color: colors.color,
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
      }}
    >
      <Trophy size={10} fill="currentColor" stroke="none" />
      {rating} Tier
    </span>
  );
};

const getGruntPhrase = (grunt: GruntData, lang: Language): string => {
  if (lang === 'ja') {
    const jaPhrases: Record<string, string> = {
      "normal": "ノーマルタイプは よわくないぞ！",
      "fire": "ポケモンの ほのおのいきは あついぞ！",
      "water": "このみずは きけんだ！",
      "grass": "くさタイプと たたかおう！",
      "electric": "でんきショックに きをつけろ！",
      "ice": "こおらせて やるぞ！",
      "fighting": "このからだは かざりじゃないぞ！",
      "poison": "どくタイプが あいてだ！",
      "ground": "じめんに たたきつけてやる！",
      "flying": "ひこうタイプと たたかえ！",
      "psychic": "エスパーパワーが こわいのか？",
      "bug": "いけ、むしタイプポケモン！",
      "rock": "ロックンロール！",
      "ghost": "ケケケケケッ！",
      "dragon": "ドラゴンタイプは つよいぞ！",
      "steel": "はがねのいしには かてないぞ！",
      "fairy": "かわいいポケモンを みてくれ！",
      "dark": "ひかりがあれば かげもある。"
    };
    const key = grunt.type.toLowerCase();
    return jaPhrases[key] || grunt.phraseEn;
  }
  return lang === 'cs' ? grunt.phraseCs : grunt.phraseEn;
};

export const RocketGuide: React.FC<RocketGuideProps> = ({ lang }) => {
  const [mode, setMode] = useState<ModeType>('leaders');
  const [selectedLeader, setSelectedLeader] = useState<string>('Giovanni');
  const [gruntSearch, setGruntSearch] = useState<string>('');
  
  const [rocketData, setRocketData] = useState<{ giovanni: RocketMember; leaders: RocketMember[]; grunts: GruntData[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    const fetchRocket = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/rocket?nocache=true`);
        if (!response.ok) throw new Error('Failed to fetch rocket lineups');
        const data = await response.json();
        setRocketData(data);
      } catch (err) {
        console.error('Failed to load rocket lineups from API:', err);
        setError(lang === 'cs' ? 'Chyba při načítání Team GO Rocket rotací z API.' : 'Failed to load Team GO Rocket lineups from API.');
      } finally {
        setLoading(false);
      }
    };

    fetchRocket();
  }, [lang]);

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>{lang === 'cs' ? 'Načítání Team GO Rocket z serveru...' : 'Loading Team GO Rocket from server...'}</p>
      </div>
    );
  }

  if (error || !rocketData) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '40px', color: '#ff4d4d' }}>
        <p>{error || 'Failed to load data.'}</p>
      </div>
    );
  }

  const getMember = (name: string): RocketMember => {
    if (name === 'Giovanni') return rocketData.giovanni;
    return rocketData.leaders.find(l => l.name === name) || rocketData.giovanni;
  };

  const currentMember = getMember(selectedLeader);

  const filteredGrunts = rocketData.grunts.filter(grunt => {
    const phrase = getGruntPhrase(grunt, lang);
    const matchesSearch = 
      phrase.toLowerCase().includes(gruntSearch.toLowerCase()) ||
      grunt.type.toLowerCase().includes(gruntSearch.toLowerCase());
    return matchesSearch;
  });

  const getDifficultyLabel = (diff: string) => {
    if (diff === 'Easy') return t.rocket_difficulty_easy;
    if (diff === 'Medium') return t.rocket_difficulty_medium;
    return t.rocket_difficulty_hard;
  };

  const renderLineupSlot = (pokemon: (string | LineupPokemon)[], slotLabel: string) => {
    const normalised: LineupPokemon[] = pokemon.map(p =>
      typeof p === 'string'
        ? { name: p, types: [], image: '' }
        : p
    );

    return (
      <div className="lineup-column">
        <span className="slot-title">{slotLabel}</span>
        <div className="slot-items">
          {normalised.map((p, i) => (
            <React.Fragment key={p.name + i}>
              {i > 0 && (
                <span className="slot-or-separator">{t.rocket_or}</span>
              )}
              <div className={`slot-item-card-v2 ${slotLabel === t.rocket_slot_3 ? 'boss' : ''}`}>
                <img
                  src={p.image ? resolveImage(p.image, 'rocket', p.name) : getPokemonIconUrl(p.name)}
                  alt={p.name}
                  className="slot-pokemon-img"
                  onError={(e) => {
                    handlePokemonImageError(e.target as HTMLImageElement, p.name);
                  }}
                />
                <div className="slot-pokemon-info">
                  <span className="slot-pokemon-name">{p.name}</span>
                  {p.types && p.types.length > 0 && (
                    <div className="slot-type-badges">
                      {p.types.map(type => (
                        <TypeBadge key={type} typeStr={type} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const activeRewardName = currentMember.reward.name;
  const activeRewardRating = currentMember.reward.hubRating || getPokemonHubRating(activeRewardName);

  return (
    <div className="rocket-guide">
      {/* Mode Switcher */}
      <div className="mode-switcher">
        <button 
          className={`mode-btn ${mode === 'leaders' ? 'active' : ''}`}
          onClick={() => setMode('leaders')}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Zap size={14} style={{ marginRight: '6px' }} /> {t.rocket_tab_leaders}
        </button>
        <button 
          className={`mode-btn ${mode === 'grunts' ? 'active' : ''}`}
          onClick={() => setMode('grunts')}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Users size={14} style={{ marginRight: '6px' }} /> {t.rocket_tab_grunts}
        </button>
      </div>

      {mode === 'leaders' ? (
        <>
          {/* Selector Tabs */}
          <div className="rocket-tabs">
            <button
               className={`rocket-tab-btn giovanni-btn ${selectedLeader === 'Giovanni' ? 'active' : ''}`}
               onClick={() => setSelectedLeader('Giovanni')}
               style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
             >
               <span className="emoji" style={{ display: 'inline-flex' }}>{getLeaderIcon('Giovanni', 14)}</span> Giovanni
             </button>
            {rocketData.leaders.map(leader => (
              <button
                key={leader.name}
                className={`rocket-tab-btn leader-btn ${selectedLeader === leader.name ? 'active' : ''}`}
                onClick={() => setSelectedLeader(leader.name)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span className="emoji" style={{ display: 'inline-flex' }}>{getLeaderIcon(leader.name, 14)}</span> {leader.name}
              </button>
            ))}
          </div>

          {/* Main Info */}
          <div className="rocket-content-card">
            <div className="rocket-header">
              <div className="rocket-title-group">
                <span className="rocket-badge">
                  {currentMember.name === 'Giovanni' ? t.rocket_boss_badge : t.rocket_leader_badge}
                </span>
                <h2>{currentMember.name}</h2>
              </div>
               <div className="member-avatar" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                 {getLeaderIcon(currentMember.name, 40)}
               </div>
            </div>

            {/* Reward Alert */}
            <div className="rocket-reward-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-purple"><Gift size={16} /></span>
                 {t.rocket_active_reward}
               </h3>
              <div className="reward-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  className="reward-image-wrapper" 
                  style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    width: '74px',
                    height: '74px',
                    flexShrink: 0
                  }}
                >
                  <ShadowIcon 
                    style={{ 
                      position: 'absolute', 
                      top: '-4px', 
                      right: '-4px', 
                      width: '18px', 
                      height: '18px', 
                      filter: 'drop-shadow(0 0 3px rgba(168, 85, 247, 0.75))' 
                    }} 
                  />
                  <img 
                    src={getPokemonIconUrl(activeRewardName)} 
                    alt={activeRewardName}
                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                    onError={(e) => {
                      handlePokemonImageError(e.target as HTMLImageElement, activeRewardName);
                    }}
                  />
                </div>
                <div className="reward-info" style={{ flex: 1 }}>
                  <h4>{activeRewardName}</h4>
                  <div className="rating-badges">
                    {activeRewardRating && (
                      <HubRatingBadge rating={activeRewardRating} />
                    )}
                     {currentMember.reward.worthGrinding && (
                       <span className="grind-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                         <Flame size={12} fill="currentColor" stroke="none" /> {t.rocket_doporuceno}
                       </span>
                     )}
                  </div>
                  <p className="reward-reason">{currentMember.reward.reason}</p>
                  {(() => {
                    const evoInfo = getEvolutionInfo(activeRewardName);
                    if (evoInfo && ['S', 'A+', 'A'].includes(evoInfo.rating) && activeRewardName.toLowerCase() !== evoInfo.evolution.toLowerCase()) {
                      return (
                        <div style={{
                          marginTop: '8px',
                          padding: '6px 10px',
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#34d399',
                          fontWeight: 550
                        }}>
                          <span style={{ display: 'inline-block' }}>🔥</span>
                          <span>
                            {lang === 'cs' 
                              ? `Evoluuje na špičkového Shadow ${evoInfo.evolution} (${evoInfo.rating} Tier)`
                              : `Evolves into top-tier Shadow ${evoInfo.evolution} (${evoInfo.rating} Tier)`
                            }
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </div>

            {/* Lineup with Pokemon images and types */}
            <div className="rocket-lineup-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-red"><Swords size={16} /></span>
                 {t.rocket_lineup}
               </h3>
              <div className="lineup-grid">
                {renderLineupSlot(currentMember.lineup.slot1, t.rocket_slot_1)}
                {renderLineupSlot(currentMember.lineup.slot2, t.rocket_slot_2)}
                {renderLineupSlot(currentMember.lineup.slot3, t.rocket_slot_3)}
              </div>
            </div>

            {/* Overall Lineup Counters - Primal/Advanced/Budget */}
            <div className="rocket-counters-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-orange"><Shield size={16} /></span>
                 {t.rocket_counters}
               </h3>
              
              <div className="counters-levels-grid">
                {currentMember.counters.megaCounters && currentMember.counters.megaCounters.length > 0 && (
                  <div className="counter-level-col mega">
                    <span className="level-badge mega">{t.details_level_mega}</span>
                    <ul>
                      {currentMember.counters.megaCounters.map(c => <CounterItem key={c} counterStr={c} />)}
                    </ul>
                  </div>
                )}
                {currentMember.counters.advancedCounters && currentMember.counters.advancedCounters.length > 0 && (
                  <div className="counter-level-col advanced">
                    <span className="level-badge advanced">{t.details_level_advanced}</span>
                    <ul>
                      {currentMember.counters.advancedCounters.map(c => <CounterItem key={c} counterStr={c} />)}
                    </ul>
                  </div>
                )}
                {currentMember.counters.budgetCounters && currentMember.counters.budgetCounters.length > 0 && (
                  <div className="counter-level-col budget">
                    <span className="level-badge budget">{t.details_level_budget}</span>
                    <ul>
                      {currentMember.counters.budgetCounters.map(c => <CounterItem key={c} counterStr={c} />)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Grunts List Mode */
        <div className="grunts-container">
          <input
            type="text"
            placeholder={lang === 'ja' ? "セリフやタイプでさがす..." : lang === 'cs' ? "Hledat podle fráze nebo typu..." : "Search by phrase or type..."}
            className="search-input"
            value={gruntSearch}
            onChange={(e) => setGruntSearch(e.target.value)}
          />

          <div className="grunts-list">
            {filteredGrunts.map((grunt, idx) => (
              <div key={idx} className="grunt-card">
                 <div className="grunt-card-header">
                   <div className="phrase-box">
                     <span className="grunt-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       <MessageSquare size={12} style={{ color: '#a78bfa' }} /> {t.rocket_grunt_phrase}
                     </span>
                     <p className="grunt-phrase">"{getGruntPhrase(grunt, lang)}"</p>
                   </div>
                   <TypeBadge typeStr={grunt.type} />
                 </div>
                 
                 <div className="grunt-card-body">
                   <div className="grunt-info-row">
                     <span className="info-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       <Zap size={12} style={{ color: '#fbbf24' }} /> {t.rocket_grunt_difficulty}
                     </span>
                     <span className={`difficulty-badge ${grunt.difficulty.toLowerCase()}`}>
                       {getDifficultyLabel(grunt.difficulty)}
                     </span>
                   </div>
 
                   <div className="grunt-info-row">
                     <span className="info-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                       <Gem size={12} style={{ color: '#60a5fa' }} /> {t.rocket_grunt_worth}
                     </span>
                     <span className={`worth-badge ${grunt.worthFighting ? 'yes' : 'no'}`}>
                       {grunt.worthFighting ? t.rocket_yes : t.rocket_no}
                     </span>
                   </div>
 
                   <div className="grunt-reward-row">
                     <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                       <Gift size={12} style={{ color: '#c084fc' }} /> {t.rocket_grunt_reward}
                     </strong>
                     <div className="shadow-pokemon-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {grunt.shadowPokemon.map(p => {
                          const pRating = getPokemonHubRating(p);
                          const evoInfo = getEvolutionInfo(p);
                          const isTopEvo = evoInfo && ['S', 'A+', 'A'].includes(evoInfo.rating) && p.toLowerCase() !== evoInfo.evolution.toLowerCase();
                          return (
                            <div 
                              key={p} 
                              className="shadow-pokemon-tag-v2" 
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                padding: '4px 8px', 
                                borderRadius: '8px', 
                                border: isTopEvo ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)', 
                                backgroundColor: isTopEvo ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              <div style={{ position: 'relative', display: 'inline-flex' }}>
                                <ShadowIcon style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', filter: 'none', color: '#c084fc' }} />
                                 <img 
                                   src={getPokemonIconUrl(p)} 
                                   alt={p} 
                                   style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                                   onError={(e) => {
                                     handlePokemonImageError(e.target as HTMLImageElement, p);
                                   }}
                                 />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{p}</span>
                                {isTopEvo && (
                                  <span style={{ fontSize: '0.58rem', color: '#34d399', fontWeight: 600 }}>
                                    ➔ Shadow {evoInfo.evolution}
                                  </span>
                                )}
                              </div>
                              {pRating && (
                                <HubRatingBadge rating={pRating} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                   </div>
 
                   <div className="grunt-counters-row">
                     <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                       <Shield size={12} style={{ color: '#fb923c' }} /> {t.rocket_grunt_counters}
                     </strong>
                     <ul className="rocket-counter-grid">
                       {grunt.counters.map(c => (
                         <CounterItem key={c} counterStr={c} />
                       ))}
                     </ul>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
