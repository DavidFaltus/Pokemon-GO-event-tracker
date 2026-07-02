import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import type { EventData } from './EventCard';
import { API_BASE_URL } from '../config';

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

type FilterTier = 'all' | '5' | 'mega' | '3' | '1' | 'shadow';

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
    if (activeFilter === 'shadow') return boss.tier.startsWith('shadow');
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
        <button 
          className={`filter-pill ${activeFilter === 'shadow' ? 'active' : ''}`} 
          onClick={() => { setActiveFilter('shadow'); setExpandedBoss(null); }}
        >
          Shadow
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
                    {boss.tier.startsWith('shadow') && <span className="shadow-aura-effect">😈</span>}
                    <img 
                      src={boss.image} 
                      alt={boss.name} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_000.png";
                      }}
                      className="boss-avatar-img"
                    />
                  </div>
                  
                  <div className="boss-meta-info">
                    <span className={`boss-tier-badge tier-${boss.tier.startsWith('shadow') ? 'shadow' : boss.tier}`}>
                      {getTierLabel(boss.tier)}
                    </span>
                    <h3 className="boss-title-name">{boss.name}</h3>
                    <div className="boss-sub-attributes">
                      {boss.canBeShiny && <span className="shiny-star-badge">✨ Shiny</span>}
                      {counters && (
                        <span className="cp-range-short">
                          Max CP: {counters.maxCp}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="expand-chevron">
                    {isExpanded ? '▲' : '▼'}
                  </div>
                </div>

                {isExpanded && (
                  <div className="raid-boss-expanded-details">
                    <div className="expanded-divider"></div>
                    
                    {counters ? (
                      <div className="raid-boss-counters-card no-border">
                        <div className="counters-boss-header pad-none">
                          <div className="weakness-list">
                            {t.details_weaknesses}: <span className="type-badges-flex">{counters.weaknesses.map(w => <TypeBadge key={w} typeStr={w} />)}</span>
                          </div>
                        </div>
                        
                        <div className="counters-levels-grid">
                          <div className="counter-level-col mega">
                            <span className="level-badge mega">{t.details_level_mega}</span>
                            <ul>
                              {counters.megaCounters.map(c => <li key={c}>{c}</li>)}
                            </ul>
                          </div>
                          <div className="counter-level-col advanced">
                            <span className="level-badge advanced">{t.details_level_advanced}</span>
                            <ul>
                              {counters.advancedCounters.map(c => <li key={c}>{c}</li>)}
                            </ul>
                          </div>
                          <div className="counter-level-col budget">
                            <span className="level-badge budget">{t.details_level_budget}</span>
                            <ul>
                              {counters.budgetCounters.map(c => <li key={c}>{c}</li>)}
                            </ul>
                          </div>
                        </div>

                        <div className="counters-cp-info pad-none margin-top-sm">
                          <div className="cp-row">
                            <span className="cp-header-label">{t.details_standard_cp}</span>
                            <span className="cp-span">{counters.minCp} – <strong className="hundo-label">{counters.maxCp} CP (100% IV)</strong></span>
                          </div>
                          <div className="cp-row">
                            <span className="cp-header-label">{t.details_weather_cp}</span>
                            <span className="cp-span">{counters.minBoostedCp} – <strong className="hundo-label-boost">{counters.maxBoostedCp} CP (100% IV)</strong></span>
                          </div>
                          <div className="cp-row">
                            <span className="cp-header-label">{t.details_boost_weather}</span>
                            <span className="cp-span">{counters.weatherBoosts.join(" / ")}</span>
                          </div>
                          <div className="cp-row shiny-info">
                            <span className="cp-header-label">{t.details_shiny_version}</span>
                            <span className="cp-span highlight-shiny">{t.details_shiny_available}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-counters-found">
                        <p>
                          {lang === 'cs' 
                            ? 'Doporučené counters a CP pro tohoto bossa momentálně nejsou k dispozici.' 
                            : 'Recommended counters and CP for this boss are currently unavailable.'}
                        </p>
                        {boss.cpRange && (
                          <div className="counters-cp-info pad-none margin-top-sm">
                            <div className="cp-row">
                              <span className="cp-header-label">{t.details_standard_cp}</span>
                              <span className="cp-span">{boss.cpRange} CP</span>
                            </div>
                            {boss.boostedCpRange && (
                              <div className="cp-row">
                                <span className="cp-header-label">{t.details_weather_cp}</span>
                                <span className="cp-span">{boss.boostedCpRange} CP</span>
                              </div>
                            )}
                            {boss.weatherBoosts && (
                              <div className="cp-row">
                                <span className="cp-header-label">{t.details_boost_weather}</span>
                                <span className="cp-span">{boss.weatherBoosts.join(" / ")}</span>
                              </div>
                            )}
                          </div>
                        )}
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
