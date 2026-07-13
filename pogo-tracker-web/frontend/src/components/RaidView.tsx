import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import type { EventData } from './EventCard';
import { API_BASE_URL } from '../config';
import { Sparkles, Trophy } from 'lucide-react';
import { CounterItem, WeatherIcon } from './CounterItem';
import { getPokemonHubRating, getEvolutionInfo } from '../data/hubRatings';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';

// Official-like Shadow Pokemon SVG Icon
const ShadowIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{
      width: '16px',
      height: '16px',
      color: '#c084fc', // purple-400
      filter: 'drop-shadow(0 0 3px rgba(168, 85, 247, 0.75))',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }}
  >
    <path d="M12 2C11.5 3.5 10 5.5 8.5 7C7 8.5 5.5 10.5 5.5 13C5.5 16.5 8.5 19.5 12 19.5C15.5 19.5 18.5 16.5 18.5 13C18.5 10.5 17 8.5 15.5 7C14 5.5 12.5 3.5 12 2ZM12 17C10.5 17 9.5 16 9.5 14.5C9.5 13 11 11.5 12 10C13 11.5 14.5 13 14.5 14.5C14.5 16 13.5 17 12 17Z" />
  </svg>
);

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

interface RaidViewProps {
  events: EventData[]; // Left for compatibility
  lang: Language;
}

interface RaidBoss {
  name: string;
  tier: '1' | '3' | '5' | 'mega' | 'shadow-1' | 'shadow-3' | 'shadow-5';
  image: string;
  canBeShiny: boolean;
  cpRange?: string;
  boostedCpRange?: string;
  weatherBoosts?: string[];
  types?: string[];
  counters?: {
    bossName: string;
    weaknesses: string[];
    megaCounters: string[];
    advancedCounters: string[];
    budgetCounters: string[];
    minCp: number;
    maxCp: number;
    minBoostedCp: number;
    maxBoostedCp: number;
    weatherBoosts: string[];
  } | null;
}

type FilterTier = 'all' | '5' | 'mega' | '3' | '1';

export const RaidView: React.FC<RaidViewProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTier>('all');
  const [expandedBoss, setExpandedBoss] = useState<string | null>(null);
  const [bosses, setBosses] = useState<RaidBoss[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    const fetchRaids = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/raids`);
        if (!response.ok) throw new Error('Failed to fetch raids');
        const data = await response.json();
        if (Array.isArray(data)) {
          setBosses(data);
        }
      } catch (err) {
        console.error('Failed to load raids from backend:', err);
        setError(lang === 'cs' ? 'Chyba při načítání raidů z API.' : 'Failed to load raids from API.');
      } finally {
        setLoading(false);
      }
    };

    fetchRaids();
  }, [lang]);

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case '5': return '5★ Raid';
      case 'mega': return 'Mega Raid';
      case '3': return '3★ Raid';
      case '1': return '1★ Raid';
      case 'shadow-5': return 'Shadow 5★';
      case 'shadow-3': return 'Shadow 3★';
      case 'shadow-1': return 'Shadow 1★';
      default: return 'Raid';
    }
  };

  const filteredBosses = bosses.filter(boss => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '5') return boss.tier === '5' || boss.tier === 'shadow-5';
    if (activeFilter === '3') return boss.tier === '3' || boss.tier === 'shadow-3';
    if (activeFilter === '1') return boss.tier === '1' || boss.tier === 'shadow-1';
    return boss.tier === activeFilter;
  });

  const toggleExpandBoss = (name: string) => {
    if (expandedBoss === name) {
      setExpandedBoss(null);
    } else {
      setExpandedBoss(name);
    }
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '40px' }}>
        <p>{lang === 'cs' ? 'Načítání raidů ze serveru...' : 'Loading raids from server...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '40px', color: '#ff4d4d' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="raid-view-container">
      {/* Tier Filter Pills */}
      <div className="filter-pill-container font-small">
        <button 
          className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`} 
          onClick={() => { setActiveFilter('all'); setExpandedBoss(null); }}
        >
          {lang === 'cs' ? 'Vše' : 'All'}
        </button>
        <button 
          className={`filter-pill ${activeFilter === '5' ? 'active' : ''}`} 
          onClick={() => { setActiveFilter('5'); setExpandedBoss(null); }}
        >
          5★
        </button>
        <button 
          className={`filter-pill ${activeFilter === 'mega' ? 'active' : ''}`} 
          onClick={() => { setActiveFilter('mega'); setExpandedBoss(null); }}
        >
          Mega
        </button>
        <button 
          className={`filter-pill ${activeFilter === '3' ? 'active' : ''}`} 
          onClick={() => { setActiveFilter('3'); setExpandedBoss(null); }}
        >
          3★
        </button>
        <button 
          className={`filter-pill ${activeFilter === '1' ? 'active' : ''}`} 
          onClick={() => { setActiveFilter('1'); setExpandedBoss(null); }}
        >
          1★
        </button>
      </div>

      {/* Grid of bosses */}
      <div className="raid-bosses-grid">
        {filteredBosses.length === 0 ? (
          <div className="no-bosses-found" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>
            <p>{lang === 'cs' ? 'Žádní aktivní bossové v této kategorii.' : 'No active bosses in this category.'}</p>
          </div>
        ) : (
          filteredBosses.map((boss, idx) => {
            const isExpanded = expandedBoss === boss.name;
            const counters = boss.counters;
            const uniqueKey = `${boss.name}-${boss.tier}-${idx}`;

            return (
              <div 
                key={uniqueKey} 
                className={`raid-boss-card tier-${boss.tier.startsWith('shadow') ? 'shadow' : boss.tier} ${isExpanded ? 'expanded' : ''}`}
              >
                <div 
                  className="raid-boss-summary" 
                  onClick={() => toggleExpandBoss(boss.name)}
                >
                  <div className="boss-img-wrapper">
                    {boss.tier.startsWith('shadow') && (
                      <ShadowIcon 
                        className="shadow-aura-effect" 
                        style={{ 
                          position: 'absolute', 
                          top: '-4px', 
                          right: '-4px',
                          width: '18px',
                          height: '18px'
                        }} 
                      />
                    )}
                    <img 
                      src={resolveImage(boss.image, 'raid', boss.name)} 
                      alt={boss.name} 
                      onError={(e) => {
                        handlePokemonImageError(e.target as HTMLImageElement, boss.name);
                      }}
                      className="boss-avatar-img"
                    />
                  </div>
                  
                  <div className="boss-meta-info">
                     <span className={`boss-tier-badge tier-${boss.tier.startsWith('shadow') ? 'shadow' : boss.tier}`}>
                       {getTierLabel(boss.tier)}
                     </span>
                     <h3 className="boss-title-name" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                       {boss.tier.startsWith('shadow') && (
                         <ShadowIcon style={{ marginRight: '6px', width: '14px', height: '14px', filter: 'none' }} />
                       )}
                       <span>{boss.name}</span>
                       {/* PoGO Hub Rating & Evolution Info */}
                       {(() => {
                         const rating = getPokemonHubRating(boss.name);
                         const evoInfo = getEvolutionInfo(boss.name);
                         const showEvo = evoInfo && ['S', 'A+', 'A'].includes(evoInfo.rating) && boss.name.toLowerCase() !== evoInfo.evolution.toLowerCase();
                         
                         if (!rating && !showEvo) return null;
                         
                         return (
                           <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                             {rating && (
                               <HubRatingBadge rating={rating} />
                             )}
                             {showEvo && (
                               <span 
                                 style={{ 
                                   fontSize: '0.62rem', 
                                   color: '#34d399', 
                                   fontWeight: 600, 
                                   backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                   border: '1px solid rgba(16, 185, 129, 0.25)',
                                   padding: '1px 5px',
                                   borderRadius: '4px',
                                   display: 'inline-flex',
                                   alignItems: 'center',
                                   gap: '3px'
                                 }}
                               >
                                 <span>➔ {boss.tier.startsWith('shadow') ? 'Shadow' : ''} {evoInfo.evolution}</span>
                                 <span style={{ fontWeight: 800 }}>({evoInfo.rating})</span>
                               </span>
                             )}
                           </span>
                         );
                       })()}
                     </h3>

                     {boss.canBeShiny && (
                       <div style={{ marginTop: '3px' }}>
                         <span className="shiny-star-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '1px 5px', fontSize: '0.65rem', borderRadius: '4px', backgroundColor: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                           <Sparkles size={8} fill="currentColor" stroke="none" /> Shiny
                         </span>
                       </div>
                     )}
                   </div>

                  <div className="boss-right-info" style={{ marginLeft: 'auto', marginRight: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', textAlign: 'right' }}>
                    {/* CP range */}
                    {counters && counters.maxCp > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {counters.minCp} – <strong className="hundo-label" style={{ color: 'var(--tier-s)', fontWeight: 700 }}>{counters.maxCp} CP</strong>
                        </span>
                        {counters.maxBoostedCp > 0 && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <span style={{ color: '#60a5fa' }}>⚡</span> {counters.minBoostedCp} – <strong className="hundo-label-boost" style={{ color: '#60a5fa', fontWeight: 600 }}>{counters.maxBoostedCp} CP</strong>
                          </span>
                        )}
                      </div>
                    ) : boss.cpRange ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {boss.cpRange} CP
                        </span>
                        {boss.boostedCpRange && (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <span style={{ color: '#60a5fa' }}>⚡</span> {boss.boostedCpRange} CP
                          </span>
                        )}
                      </div>
                    ) : null}

                    {/* Weather Boosts */}
                    {counters && counters.weatherBoosts.length > 0 ? (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {counters.weatherBoosts.map(w => <WeatherIcon key={w} weatherStr={w} />)}
                      </div>
                    ) : (boss.weatherBoosts && boss.weatherBoosts.length > 0) ? (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {boss.weatherBoosts.map(w => <WeatherIcon key={w} weatherStr={w} />)}
                      </div>
                    ) : null}
                  </div>

                  <div className="expand-chevron">
                    {isExpanded ? '▲' : '▼'}
                  </div>
                </div>

                {isExpanded && (
                  <div className="raid-boss-expanded-details">
                    <div className="expanded-divider"></div>
                    
                    {counters ? (
                      <div className="raid-boss-counters-card no-border" style={{ paddingBottom: 0 }}>
                        <div className="counters-boss-header pad-none">
                          <div className="weakness-list">
                            {t.details_weaknesses}: <span className="type-badges-flex">{counters.weaknesses.map(w => <TypeBadge key={w} typeStr={w} />)}</span>
                          </div>
                        </div>
                        
                        <div className="counters-levels-grid">
                          {counters.megaCounters.length > 0 && (
                            <div className="counter-level-col mega">
                              <span className="level-badge mega">{t.details_level_mega}</span>
                              <ul>
                                {counters.megaCounters.map(c => <CounterItem key={c} counterStr={c} />)}
                              </ul>
                            </div>
                          )}
                          {counters.advancedCounters.length > 0 && (
                            <div className="counter-level-col advanced">
                              <span className="level-badge advanced">{t.details_level_advanced}</span>
                              <ul>
                                {counters.advancedCounters.map(c => <CounterItem key={c} counterStr={c} />)}
                              </ul>
                            </div>
                          )}
                          {counters.budgetCounters.length > 0 && (
                            <div className="counter-level-col budget">
                              <span className="level-badge budget">{t.details_level_budget}</span>
                              <ul>
                                {counters.budgetCounters.map(c => <CounterItem key={c} counterStr={c} />)}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="no-counters-found">
                        <p style={{ margin: 0, padding: '8px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {lang === 'cs' 
                            ? 'Doporučené counters a CP pro tohoto bossa momentálně nejsou k dispozici.' 
                            : 'Recommended counters and CP for this boss are currently unavailable.'}
                        </p>
                      </div>
                    )}
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
