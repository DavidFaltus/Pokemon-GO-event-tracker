import React, { useState } from 'react';
import { rocketData, gruntsData } from '../data/rocketData';
import type { RocketMember } from '../data/rocketData';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { TypeBadge } from './EventCard';

interface RocketGuideProps {
  lang: Language;
}

type ModeType = 'leaders' | 'grunts';

export const RocketGuide: React.FC<RocketGuideProps> = ({ lang }) => {
  const [mode, setMode] = useState<ModeType>('leaders');
  const [selectedLeader, setSelectedLeader] = useState<string>('Giovanni');
  const [gruntSearch, setGruntSearch] = useState<string>('');

  const getMember = (name: string): RocketMember => {
    if (name === 'Giovanni') return rocketData.giovanni;
    return rocketData.leaders.find(l => l.name === name) || rocketData.giovanni;
  };

  const currentMember = getMember(selectedLeader);

  const t = translations[lang];

  const filteredGrunts = gruntsData.filter(grunt => {
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
        >
          🚀 {t.rocket_tab_leaders}
        </button>
        <button 
          className={`mode-btn ${mode === 'grunts' ? 'active' : ''}`}
          onClick={() => setMode('grunts')}
        >
          👤 {t.rocket_tab_grunts}
        </button>
      </div>

      {mode === 'leaders' ? (
        <>
          {/* Selector Tabs */}
          <div className="rocket-tabs">
            <button
              className={`rocket-tab-btn giovanni-btn ${selectedLeader === 'Giovanni' ? 'active' : ''}`}
              onClick={() => setSelectedLeader('Giovanni')}
            >
              <span className="emoji">👑</span> Giovanni
            </button>
            {rocketData.leaders.map(leader => (
              <button
                key={leader.name}
                className={`rocket-tab-btn leader-btn ${selectedLeader === leader.name ? 'active' : ''}`}
                onClick={() => setSelectedLeader(leader.name)}
              >
                <span className="emoji">{leader.avatar}</span> {leader.name}
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
              <div className="member-avatar">{currentMember.avatar}</div>
            </div>

            {/* Reward Alert */}
            <div className="rocket-reward-section">
              <h3>{t.rocket_active_reward}</h3>
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
                      <span className="grind-badge">{t.rocket_doporuceno}</span>
                    )}
                  </div>
                  <p className="reward-reason">{currentMember.reward.reason}</p>
                </div>
              </div>
            </div>

            {/* Lineup */}
            <div className="rocket-lineup-section">
              <h3>{t.rocket_lineup}</h3>
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
              <h3>{t.rocket_counters}</h3>
              <div className="counters-list">
                {currentMember.counters.map(counter => (
                  <div key={counter.bossPokemon} className="counter-item">
                    <div className="counter-pokemon-name">{counter.bossPokemon}</div>
                    <div className="counter-details-wrapper">
                      <div className="counter-recs">
                        <strong>{t.rocket_best_counters}</strong>
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
                    <span className="grunt-label">{t.rocket_grunt_phrase}</span>
                    <p className="grunt-phrase">"{lang === 'cs' ? grunt.phraseCs : grunt.phraseEn}"</p>
                  </div>
                  <TypeBadge typeStr={grunt.type} />
                </div>
                
                <div className="grunt-card-body">
                  <div className="grunt-info-row">
                    <span className="info-label">{t.rocket_grunt_difficulty}</span>
                    <span className={`difficulty-badge ${grunt.difficulty.toLowerCase()}`}>
                      {getDifficultyLabel(grunt.difficulty)}
                    </span>
                  </div>

                  <div className="grunt-info-row">
                    <span className="info-label">{t.rocket_grunt_worth}</span>
                    <span className={`worth-badge ${grunt.worthFighting ? 'yes' : 'no'}`}>
                      {grunt.worthFighting ? t.rocket_yes : t.rocket_no}
                    </span>
                  </div>

                  <div className="grunt-reward-row">
                    <strong>{t.rocket_grunt_reward}</strong>
                    <div className="shadow-pokemon-tags">
                      {grunt.shadowPokemon.map(p => (
                        <span key={p} className="shadow-pokemon-tag">😈 {p}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grunt-counters-row">
                    <strong>{t.rocket_grunt_counters}</strong>
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
