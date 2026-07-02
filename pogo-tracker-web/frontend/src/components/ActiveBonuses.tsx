import React from 'react';
import type { EventData } from './EventCard';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { Gift, Zap, Coins, Star, Sparkles, Play } from 'lucide-react';

interface ActiveBonusesProps {
  events: EventData[];
  lang: Language;
  onClose: () => void;
}

export const ActiveBonuses: React.FC<ActiveBonusesProps> = ({ events, lang, onClose }) => {
  const t = translations[lang];
  const now = new Date();

  // Find active events
  const activeEvents = events.filter(event => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return now >= start && now <= end;
  });

  const hasActiveCd = activeEvents.some(e => e.eventType === 'community-day');
  const hasActiveRocket = activeEvents.some(e => e.eventType === 'rocket-takeover');
  const hasActiveSpotlight = activeEvents.some(e => e.eventType === 'pokemon-spotlight-hour');

  const hasEventBonuses = hasActiveCd || hasActiveRocket || hasActiveSpotlight;

  return (
    <div className="bonuses-card">
      <div className="bonuses-header">
        <div className="bonuses-header-left">
          <span className="bonuses-icon" style={{ display: 'inline-flex', color: '#c084fc' }}>
            <Gift size={20} />
          </span>
          <h3>{t.bonuses_title}</h3>
        </div>
        <button className="bonuses-close-btn" onClick={onClose} aria-label="Close bonuses">
          ✕
        </button>
      </div>
      
      <div className="bonuses-body">
        {/* Baseline Daily Bonuses */}
        <div className="bonus-group baseline">
          <div className="bonus-item-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="bonus-bullet" style={{ display: 'inline-flex', color: '#fbbf24' }}>
              <Zap size={14} fill="currentColor" stroke="none" />
            </span>
            <span className="bonus-text">{t.bonuses_free_pass}</span>
          </div>
          <div className="bonus-item-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="bonus-bullet" style={{ display: 'inline-flex', color: '#fbbf24' }}>
              <Coins size={14} />
            </span>
            <span className="bonus-text">{t.bonuses_max_coins}</span>
          </div>
        </div>

        {/* Dynamic Event-specific Bonuses */}
        {hasEventBonuses && (
          <div className="bonus-group dynamic">
            <h4 className="bonus-subtitle">{t.bonuses_active_now}</h4>
            
            {hasActiveCd && (
              <>
                <div className="bonus-item-row active-highlight community-day" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="bonus-bullet" style={{ display: 'inline-flex', color: '#34d399' }}>
                    <Play size={14} fill="currentColor" stroke="none" />
                  </span>
                  <span className="bonus-text">{t.bonuses_cd_special}</span>
                </div>
                <div className="bonus-item-row active-highlight community-day" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="bonus-bullet" style={{ display: 'inline-flex', color: '#34d399' }}>
                    <Star size={14} fill="currentColor" stroke="none" />
                  </span>
                  <span className="bonus-text">{t.bonuses_cd_stardust}</span>
                </div>
              </>
            )}

            {hasActiveRocket && (
              <div className="bonus-item-row active-highlight rocket" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="bonus-bullet" style={{ display: 'inline-flex', color: '#c084fc' }}>
                  <Zap size={14} fill="currentColor" stroke="none" />
                </span>
                <span className="bonus-text">{t.bonuses_rocket_frustration}</span>
              </div>
            )}

            {hasActiveSpotlight && (
              <div className="bonus-item-row active-highlight spotlight" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="bonus-bullet" style={{ display: 'inline-flex', color: '#60a5fa' }}>
                  <Sparkles size={14} />
                </span>
                <span className="bonus-text">{t.bonuses_spotlight_double}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
