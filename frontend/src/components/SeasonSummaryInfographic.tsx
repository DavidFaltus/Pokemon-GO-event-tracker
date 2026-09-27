import React, { useState } from 'react';
import { useInfographicExport } from '../hooks/useInfographicExport';
import { Download, Sparkles, Layers, Trophy, Calendar, Gift, Star, Egg, Globe, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import { resolveEventThematicBackground } from '../utils/thematicBackgroundResolver';
import './SeasonSummaryInfographic.css';

interface SeasonSummaryInfographicProps {
  events?: EventData[];
  lang: Language;
  isAdmin?: boolean;
  onClose?: () => void;
}

export const SeasonSummaryInfographic: React.FC<SeasonSummaryInfographicProps> = ({
  events = [],
  lang = 'cs',
  isAdmin = false,
  onClose
}) => {
  const [activeSlide, setActiveSlide] = useState<1 | 2>(1);
  const { posterRef, isExporting, exportSuccess, exportAsPng } = useInfographicExport();
  const editor = useInfographicEditor(`season_${activeSlide}`, 'seasonSummary');
  const isEditing = isAdmin && editor.isEditing;

  // Find any season event in data or fallback
  const seasonEvent = events.find(e => 
    e.eventType === 'season' || 
    (typeof e.name === 'string' && e.name.toLowerCase().includes('season'))
  );

  const defaultSeasonName = lang === 'cs' ? 'Sezóna: Might & Mastery' : 'Season: Might & Mastery';
  const defaultDates = lang === 'cs' ? '1. Březen – 1. Červen' : 'March 1 – June 1';

  // Default Season Bonuses
  const defaultBonuses = [
    { emoji: '🎟️', text: lang === 'cs' ? '+1 Denní Raid Pass navíc' : '+1 Daily Raid Pass from Gyms' },
    { emoji: '🤝', text: lang === 'cs' ? '+1 Speciální výměna denně' : '+1 Special Trade per day' },
    { emoji: '🍬', text: lang === 'cs' ? 'Garantovaný Candy XL při výměně' : 'Guaranteed Candy XL from trades' },
    { emoji: '💨', text: lang === 'cs' ? '2× Trvání Incense při chůzi' : '2× Incense duration when moving' },
    { emoji: '⚔️', text: lang === 'cs' ? 'Zvýšené poškození v raidech s přáteli' : 'Increased friendship raid damage' },
    { emoji: '⭐', text: lang === 'cs' ? 'Zvýšený XP & Stardust za průlom' : 'Increased Research Breakthrough rewards' }
  ];

  // Default Egg Tiers
  const defaultEggTiers = [
    { tier: '2 km', pokemon: 'Togepi, Cleffa, Igglybuff' },
    { tier: '5 km', pokemon: 'Machop, Tyrogue, Mareep' },
    { tier: '7 km', pokemon: 'Alolan Meowth, Galarian Farfetch\'d' },
    { tier: '10 km', pokemon: 'Larvitar, Bagon, Beldum, Frigibax' }
  ];

  // GO Pass Milestones Data
  const defaultMilestones = [
    { rank: 'Rank 1', free: '10× Poké Ball', deluxe: '1× Super Incubator' },
    { rank: 'Rank 10', free: '1h Lure Bonus 🌿', deluxe: '1× Lucky Egg + Puffer' },
    { rank: 'Rank 25', free: '3× Rare Candy', deluxe: '1× Elite Fast TM ⚡' },
    { rank: 'Rank 50', free: 'Origin Encounter 🐋', deluxe: 'Shiny Boost + Avatar Outfit ✨' }
  ];

  const bgOverride = editor.getBackgroundOverride();
  const autoThematicBg = resolveEventThematicBackground(seasonEvent) || '/backgrounds/might-and-mastery-season.png';
  const activeBgImage = bgOverride === 'none' ? null : (bgOverride || autoThematicBg);

  const handleDownload = async () => {
    editor.setIsExporting(true);
    await exportAsPng(`pogo_season_${activeSlide === 1 ? 'overview' : 'gopass'}_4x5`);
    editor.setIsExporting(false);
  };

  return (
    <div className="ssi-wrapper">
      {/* Toolbar & Slide Switcher */}
      <div className="ssi-toolbar">
        <div className="ssi-tabs-row">
          <button
            type="button"
            className={`ssi-tab-btn ${activeSlide === 1 ? 'active' : ''}`}
            onClick={() => setActiveSlide(1)}
          >
            <Layers size={14} />
            <span>{lang === 'cs' ? '1. Sezónní přehled & Bonusy' : '1. Season Overview & Bonuses'}</span>
          </button>
          <button
            type="button"
            className={`ssi-tab-btn ${activeSlide === 2 ? 'active' : ''}`}
            onClick={() => setActiveSlide(2)}
          >
            <Trophy size={14} />
            <span>{lang === 'cs' ? '2. GO Pass Roadmap' : '2. GO Pass Roadmap'}</span>
          </button>
        </div>

        <div className="ssi-download-actions">
          <button
            type="button"
            className="ssi-download-btn"
            onClick={handleDownload}
            disabled={isExporting}
          >
            <Download size={14} />
            <span>
              {isExporting 
                ? (lang === 'cs' ? 'Generuji...' : 'Exporting...') 
                : (lang === 'cs' ? `Stáhnout Slide ${activeSlide} (PNG 4:5)` : `Download Slide ${activeSlide} (PNG 4:5)`)}
            </span>
          </button>
        </div>
      </div>

      {/* 4:5 Poster Container */}
      <div className={`ssi-poster ${isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {activeBgImage && (
          <div
            className="ssi-bg-layer"
            style={{ backgroundImage: `url(${activeBgImage})` }}
          />
        )}

        {isAdmin && (
          <EditToolbar
            isEditing={editor.isEditing}
            onToggleEdit={() => editor.setIsEditing(!editor.isEditing)}
            hasOverrides={editor.hasOverrides}
            onReset={editor.resetAll}
            lang={lang}
            currentBackground={bgOverride}
            onSelectBackground={(bg) => editor.setBackgroundOverride(bg)}
          />
        )}

        <div className="ssi-glow-top" />

        {/* Poster Header */}
        <div className="ssi-header">
          <div className="ssi-header-top">
            <div className="ssi-badge">
              {activeSlide === 1 ? <Layers size={13} /> : <Trophy size={13} />}
              <span>
                <EditableText
                  value={editor.getTextOverride(`badge_${activeSlide}`, activeSlide === 1 ? (lang === 'cs' ? 'SEZÓNNÍ PŘEHLED' : 'SEASON OVERVIEW') : 'GO PASS PROGRESSION')}
                  onChange={(v) => editor.setTextOverride(`badge_${activeSlide}`, v)}
                  isEditing={isEditing}
                />
              </span>
            </div>
            <div className="ssi-date-pill">
              <Calendar size={12} />
              <span>
                <EditableText
                  value={editor.getTextOverride('seasonDates', defaultDates)}
                  onChange={(v) => editor.setTextOverride('seasonDates', v)}
                  isEditing={isEditing}
                />
              </span>
            </div>
          </div>
          <h2 className="ssi-title">
            <EditableText
              value={editor.getTextOverride('seasonTitle', defaultSeasonName)}
              onChange={(v) => editor.setTextOverride('seasonTitle', v)}
              isEditing={isEditing}
            />
          </h2>
        </div>

        {/* Poster Body */}
        <div className="ssi-body">
          {activeSlide === 1 ? (
            <>
              {/* SLIDE 1: Global Bonuses Card */}
              <div className="ssi-section-card">
                <div className="ssi-card-title">
                  <Gift size={13} />
                  <span>{lang === 'cs' ? 'Celosezónní globální bonusy' : 'All-Season Global Bonuses'}</span>
                </div>
                <div className="ssi-bonuses-grid">
                  {defaultBonuses.map((b, idx) => (
                    <div key={idx} className="ssi-bonus-item">
                      <span className="ssi-bonus-emoji">{b.emoji}</span>
                      <span>
                        <EditableText
                          value={editor.getTextOverride(`bonus_${idx}`, b.text)}
                          onChange={(v) => editor.setTextOverride(`bonus_${idx}`, v)}
                          isEditing={isEditing}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seasonal Egg Pools */}
              <div className="ssi-section-card">
                <div className="ssi-card-title">
                  <Egg size={13} />
                  <span>{lang === 'cs' ? 'Sezónní bazény vajec (Egg Pools)' : 'Seasonal Egg Pools'}</span>
                </div>
                <div className="ssi-egg-tiers-row">
                  {defaultEggTiers.map((tier, ti) => (
                    <div key={ti} className="ssi-egg-tier-col">
                      <span className="ssi-egg-tier-header">{tier.tier}</span>
                      <span style={{ fontSize: '0.64rem', color: '#cbd5e1', lineHeight: 1.2 }}>
                        <EditableText
                          value={editor.getTextOverride(`egg_${ti}`, tier.pokemon)}
                          onChange={(v) => editor.setTextOverride(`egg_${ti}`, v)}
                          isEditing={isEditing}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biomes & Hemisphere Rotations */}
              <div className="ssi-section-card">
                <div className="ssi-card-title">
                  <Globe size={13} />
                  <span>{lang === 'cs' ? 'Biomy & Hemisférové rotace' : 'Biomes & Hemisphere Rotations'}</span>
                </div>
                <div className="ssi-biomes-grid">
                  <div className="ssi-biome-col">
                    <strong style={{ color: '#38bdf8' }}>🏙️ Města / Cities:</strong>
                    <div style={{ fontSize: '0.64rem', color: '#cbd5e1' }}>Magnemite, Trubbish, Pidove</div>
                  </div>
                  <div className="ssi-biome-col">
                    <strong style={{ color: '#4ade80' }}>🌲 Lesy / Forests:</strong>
                    <div style={{ fontSize: '0.64rem', color: '#cbd5e1' }}>Caterpie, Shroomish, Phantump</div>
                  </div>
                  <div className="ssi-biome-col">
                    <strong style={{ color: '#fbbf24' }}>⛰️ Hory / Mountains:</strong>
                    <div style={{ fontSize: '0.64rem', color: '#cbd5e1' }}>Geodude, Roggenrola, Beldum</div>
                  </div>
                  <div className="ssi-biome-col">
                    <strong style={{ color: '#67e8f9' }}>🌊 Voda / Water:</strong>
                    <div style={{ fontSize: '0.64rem', color: '#cbd5e1' }}>Poliwag, Magikarp, Marill</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* SLIDE 2: GO Pass Progression Roadmap */}
              <div className="ssi-gopass-hero">
                <div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#facc15', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={15} />
                    {lang === 'cs' ? 'GO Battle Pass: Rank 1 – 100' : 'GO Battle Pass: Rank 1 – 100'}
                  </span>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                    {lang === 'cs' ? 'Sbírej GO body chytáním, raidy a úkoly' : 'Earn GO points by catching, raiding & tasks'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#94a3b8' }}>
                  Max: <strong>10,000 pts</strong>
                </div>
              </div>

              {/* Free Track vs Deluxe Track Comparison */}
              <div className="ssi-gopass-tracks">
                <div className="ssi-track-row">
                  <div className="ssi-track-title free">
                    <span>🟢 {lang === 'cs' ? 'Basic Cesta (Zdarma pro všechny)' : 'Free Track (All Trainers)'}</span>
                    <span style={{ fontSize: '0.65rem' }}>FREE</span>
                  </div>
                  <div className="ssi-track-milestones">
                    {defaultMilestones.map((m, mi) => (
                      <div key={mi} className="ssi-milestone-pill">
                        <span className="ssi-milestone-rank">{m.rank}</span>
                        <span className="ssi-milestone-reward" title={m.free}>{m.free}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ssi-track-row deluxe">
                  <div className="ssi-track-title deluxe">
                    <span>⭐ {lang === 'cs' ? 'Deluxe Cesta (Prémiové odměny)' : 'Deluxe Track (Premium Rewards)'}</span>
                    <span style={{ fontSize: '0.65rem' }}>$4.99 / DELUXE</span>
                  </div>
                  <div className="ssi-track-milestones">
                    {defaultMilestones.map((m, mi) => (
                      <div key={mi} className="ssi-milestone-pill" style={{ borderColor: 'rgba(250, 204, 21, 0.3)' }}>
                        <span className="ssi-milestone-rank" style={{ color: '#facc15' }}>{m.rank}</span>
                        <span className="ssi-milestone-reward" style={{ color: '#fef08a' }} title={m.deluxe}>{m.deluxe}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestone Perks Highlight */}
              <div className="ssi-section-card">
                <div className="ssi-card-title" style={{ color: '#facc15' }}>
                  <Zap size={13} />
                  <span>{lang === 'cs' ? 'Trvalé milníkové perky (Aktivní po celou sezónu)' : 'Permanent Milestone Perks'}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '0.72rem' }}>
                  <div className="ssi-bonus-item">
                    <span>🌿</span>
                    <span>Rank 10: 1h Mossy Lure trvání</span>
                  </div>
                  <div className="ssi-bonus-item">
                    <span>🥚</span>
                    <span>Rank 20: +50% Stardust z líhnutí</span>
                  </div>
                  <div className="ssi-bonus-item">
                    <span>⚔️</span>
                    <span>Rank 30: +25% XP z Legendárních raidů</span>
                  </div>
                  <div className="ssi-bonus-item">
                    <span>⚡</span>
                    <span>Rank 40: Garantovaný Elite TM drop</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Poster Footer */}
        <div className="ssi-footer">
          <span className="ssi-footer-brand">pogoevents.app</span>
          <span>{lang === 'cs' ? 'Kompletní průvodce a IV CP kalkulačka v aplikaci' : 'Full guides & IV CP ranges at pogoevents.app'}</span>
        </div>
      </div>
    </div>
  );
};
