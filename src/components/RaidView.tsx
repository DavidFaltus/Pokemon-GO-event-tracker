import React, { useState } from 'react';
import { findRaidCounters } from '../data/raidCounters';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import type { EventData } from './EventCard';

interface RaidViewProps {
  events: EventData[];
  lang: Language;
}

interface RaidBoss {
  name: string;
  tier: '5' | 'mega' | '3' | '1' | 'shadow';
  image: string;
  canBeShiny: boolean;
}

const LOCAL_DATABASE_3_STAR: RaidBoss[] = [
  {
    name: "Aerodactyl",
    tier: "3",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_142_00.png",
    canBeShiny: true
  },
  {
    name: "Hisuian Decidueye",
    tier: "3",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_724_11.png",
    canBeShiny: true
  },
  {
    name: "Druddigon",
    tier: "3",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_621_00.png",
    canBeShiny: true
  }
];

const LOCAL_DATABASE_1_STAR: RaidBoss[] = [
  {
    name: "Omanyte",
    tier: "1",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_138_00.png",
    canBeShiny: true
  },
  {
    name: "Kabuto",
    tier: "1",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_140_00.png",
    canBeShiny: true
  },
  {
    name: "Beldum",
    tier: "1",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_374_00.png",
    canBeShiny: true
  },
  {
    name: "Rockruff",
    tier: "1",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_744_00.png",
    canBeShiny: true
  }
];

const LOCAL_DATABASE_SHADOW: RaidBoss[] = [
  {
    name: "Shadow Dialga",
    tier: "shadow",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_483_00.png",
    canBeShiny: true
  }
];

const FALLBACK_5_STAR: RaidBoss[] = [
  {
    name: "Necrozma",
    tier: "5",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_800_00.png",
    canBeShiny: true
  },
  {
    name: "Zekrom",
    tier: "5",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_644_00.png",
    canBeShiny: true
  }
];

const FALLBACK_MEGA: RaidBoss[] = [
  {
    name: "Mega Scizor",
    tier: "mega",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_212_51.png",
    canBeShiny: true
  },
  {
    name: "Mega Lopunny",
    tier: "mega",
    image: "https://cdn.leekduck.com/assets/img/pokemon_icons/pokemon_icon_428_51.png",
    canBeShiny: true
  }
];

type FilterTier = 'all' | '5' | 'mega' | '3' | '1' | 'shadow';

export const RaidView: React.FC<RaidViewProps> = ({ events, lang }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTier>('all');
  const [expandedBoss, setExpandedBoss] = useState<string | null>(null);

  const t = translations[lang];

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case '5': return '5★ Raidy';
      case 'mega': return 'Mega Raidy';
      case '3': return '3★ Raidy';
      case '1': return '1★ Raidy';
      case 'shadow': return 'Shadow Raidy';
      default: return 'Raid';
    }
  };

  const getActiveBosses = (): RaidBoss[] => {
    const now = new Date();
    const activeEvents = events.filter(e => {
      const start = new Date(e.start);
      const end = new Date(e.end);
      return now >= start && now <= end;
    });

    const live5StarBosses: RaidBoss[] = [];
    const liveMegaBosses: RaidBoss[] = [];

    activeEvents.forEach(e => {
      if (e.eventType === 'raid-battles' || e.eventType === 'raid-hour') {
        const bosses = e.extraData?.raidbattles?.bosses || [];
        const isMega = e.name.toLowerCase().includes("mega") || e.eventID.toLowerCase().includes("mega");
        
        bosses.forEach(boss => {
          const mappedBoss: RaidBoss = {
            name: boss.name,
            tier: isMega ? 'mega' : '5',
            image: boss.image,
            canBeShiny: boss.canBeShiny
          };
          
          if (isMega) {
            if (!liveMegaBosses.some(b => b.name === boss.name)) {
              liveMegaBosses.push(mappedBoss);
            }
          } else {
            if (!live5StarBosses.some(b => b.name === boss.name)) {
              live5StarBosses.push(mappedBoss);
            }
          }
        });
      }
    });

    const final5Star = live5StarBosses.length > 0 ? live5StarBosses : FALLBACK_5_STAR;
    const finalMega = liveMegaBosses.length > 0 ? liveMegaBosses : FALLBACK_MEGA;

    return [
      ...final5Star,
      ...finalMega,
      ...LOCAL_DATABASE_3_STAR,
      ...LOCAL_DATABASE_1_STAR,
      ...LOCAL_DATABASE_SHADOW
    ];
  };

  const activeBosses = getActiveBosses();

  const filteredBosses = activeFilter === 'all'
    ? activeBosses
    : activeBosses.filter(boss => boss.tier === activeFilter);

  const toggleExpandBoss = (name: string) => {
    if (expandedBoss === name) {
      setExpandedBoss(null);
    } else {
      setExpandedBoss(name);
    }
  };

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
        {filteredBosses.map((boss, idx) => {
          const isExpanded = expandedBoss === boss.name;
          const counters = findRaidCounters(boss.name);
          const uniqueKey = `${boss.name}-${boss.tier}-${idx}`;

          return (
            <div 
              key={uniqueKey} 
              className={`raid-boss-card tier-${boss.tier} ${isExpanded ? 'expanded' : ''}`}
            >
              <div 
                className="raid-boss-summary" 
                onClick={() => toggleExpandBoss(boss.name)}
              >
                <div className="boss-img-wrapper">
                  {boss.tier === 'shadow' && <span className="shadow-aura-effect">😈</span>}
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
                  <span className={`boss-tier-badge tier-${boss.tier}`}>
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
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
