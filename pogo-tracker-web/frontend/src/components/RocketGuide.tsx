import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';
import { API_BASE_URL } from '../config';
import { Zap, Users, Gift, Flame, Swords, Shield, MessageSquare, Gem, Moon, Glasses } from 'lucide-react';

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
        style={{ display: 'inline-block', verticalAlign: 'middle', color: '#c084fc' }}
      >
        <path d="M12 56V32c0-6 4-10 10-10h20c6 0 10 4 10 10v24" />
        <path d="M22 22l10 16 10-16" />
        <path d="M26 22V14c0-3 2-5 6-5s6 2 6 5v8" />
        <path d="M32 26v16l-3 4 3 4 3-4-3-4" fill="currentColor" />
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
        style={{ display: 'inline-block', verticalAlign: 'middle', transform: 'scaleX(-1)', color: '#f87171' }}
      >
        <path d="M6 20a5 5 0 0 1 5-5h1c2 0 3.5-1.5 3.5-3.5V8" />
        <path d="M15.5 8c1.2 0 2.2.8 2.2 2v2.5c0 2.5-2 4.5-4.5 4.5H6" />
        <circle cx="15.5" cy="7.5" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (cleanName === 'sierra') {
    return <Moon size={size} fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle', color: '#fb923c' }} />;
  }
  if (cleanName === 'arlo') {
    return <Glasses size={size} style={{ display: 'inline-block', verticalAlign: 'middle', color: '#34d399' }} />;
  }
  return null;
};

interface RocketGuideProps {
  lang: Language;
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
  };
  lineup: {
    slot1: string[];
    slot2: string[];
    slot3: string[];
  };
  counters: {
    bossPokemon: string;
    bestCounters: string[];
    details: string;
  }[];
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
        const response = await fetch(`${API_BASE_URL}/api/rocket`);
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
    const phrase = lang === 'cs' ? grunt.phraseCs : grunt.phraseEn;
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
              <div className="reward-card">
                <div className="reward-info">
                  <h4>{currentMember.reward.name}</h4>
                  <div className="rating-badges">
                    <span className={`rating-badge pve rating-${currentMember.reward.pveRating.toLowerCase()}`}>
                      PvE: {currentMember.reward.pveRating}
                    </span>
                    <span className={`rating-badge pvp rating-${currentMember.reward.pvpRating.toLowerCase()}`}>
                      PvP: {currentMember.reward.pvpRating}
                    </span>
                     {currentMember.reward.worthGrinding && (
                       <span className="grind-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                         <Flame size={12} fill="currentColor" stroke="none" /> {t.rocket_doporuceno}
                       </span>
                     )}
                  </div>
                  <p className="reward-reason">{currentMember.reward.reason}</p>
                </div>
              </div>
            </div>

            {/* Lineup */}
            <div className="rocket-lineup-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-red"><Swords size={16} /></span>
                 {t.rocket_lineup}
               </h3>
              <div className="lineup-grid">
                <div className="lineup-column">
                  <span className="slot-title">{t.rocket_slot_1}</span>
                  <div className="slot-items">
                    {currentMember.lineup.slot1.map(p => (
                      <div key={p} className="slot-item-card static">{p}</div>
                    ))}
                  </div>
                </div>
                <div className="lineup-column">
                  <span className="slot-title">{t.rocket_slot_2}</span>
                  <div className="slot-items">
                    {currentMember.lineup.slot2.map(p => (
                      <div key={p} className="slot-item-card random">{p}</div>
                    ))}
                  </div>
                </div>
                <div className="lineup-column">
                  <span className="slot-title">{t.rocket_slot_3}</span>
                  <div className="slot-items">
                    {currentMember.lineup.slot3.map(p => (
                      <div key={p} className="slot-item-card boss">{p}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Counters Guide */}
            <div className="rocket-counters-section">
               <h3 style={{ display: 'inline-flex', alignItems: 'center' }}>
                 <span className="duotone-icon duotone-orange"><Shield size={16} /></span>
                 {t.rocket_counters}
               </h3>
              <div className="counters-list">
                {currentMember.counters.map(counter => (
                  <div key={counter.bossPokemon} className="counter-item">
                    <div className="counter-pokemon-name">{counter.bossPokemon}</div>
                    <div className="counter-details-wrapper">
                      <div className="counter-recs">
                         <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                           <Shield size={12} style={{ color: '#fb923c' }} /> {t.rocket_best_counters}
                         </strong>
                        <div className="counter-tags">
                          {counter.bestCounters.map(c => (
                            <span key={c} className="counter-tag">{c}</span>
                          ))}
                        </div>
                      </div>
                      <p className="counter-strategy">{counter.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Grunts List Mode */
        <div className="grunts-container">
          <input
            type="text"
            placeholder={lang === 'cs' ? "Hledat podle fráze nebo typu..." : "Search by phrase or type..."}
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
                     <p className="grunt-phrase">"{lang === 'cs' ? grunt.phraseCs : grunt.phraseEn}"</p>
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
                     <div className="shadow-pokemon-tags">
                       {grunt.shadowPokemon.map(p => (
                         <span key={p} className="shadow-pokemon-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                           <ShadowIcon style={{ filter: 'none', color: '#c084fc' }} /> {p}
                         </span>
                       ))}
                     </div>
                   </div>
 
                   <div className="grunt-counters-row">
                     <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                       <Shield size={12} style={{ color: '#fb923c' }} /> {t.rocket_grunt_counters}
                     </strong>
                     <div className="grunt-counter-tags">
                       {grunt.counters.map(c => (
                         <span key={c} className="grunt-counter-tag">{c}</span>
                       ))}
                     </div>
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
