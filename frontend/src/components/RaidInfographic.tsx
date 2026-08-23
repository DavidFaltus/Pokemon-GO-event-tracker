import React, { useRef, useState } from 'react';
import { useInfographicExport } from '../hooks/useInfographicExport';
import { Download, Sparkles, Clock, Calendar, Check, ShieldCheck, Swords, Shield, Trophy, Layers, Zap, Users, User, AlertTriangle, Crown } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, getBasePokemonNames } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { getRegionalInfo } from '../utils/regionalHelper';
import { findRaidCounters } from '../data/raidCounters';
import { TypeBadge } from './EventCard';
import { WeatherIcon } from './CounterItem';
import { pokemonRankings } from '../data/pokemonRankings';
import { formatEventDateRange } from '../utils/infographicFormatters';
import { getPokemonTypesByName, getWeaknessesForPokemon, getPokemonRankingInfo, getAccurateRaidCounters } from '../utils/pokemonCountersHelper';
import { getBossDifficultyInfo } from './RaidDifficultyBox';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import './RaidInfographic.css';

interface RaidInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  showTabs?: boolean;
  isAdmin?: boolean;
}

// Helper component to display purely the type icon (NO text label like "Fire" or "Fighting")
export const TypeIconOnly: React.FC<{ typeStr: string }> = ({ typeStr }) => {
  const lower = typeStr.toLowerCase();
  let typeClass = 'normal';

  if (lower.includes('ghost')) { typeClass = 'ghost'; }
  else if (lower.includes('dark')) { typeClass = 'dark'; }
  else if (lower.includes('bug')) { typeClass = 'bug'; }
  else if (lower.includes('fire')) { typeClass = 'fire'; }
  else if (lower.includes('ground')) { typeClass = 'ground'; }
  else if (lower.includes('dragon')) { typeClass = 'dragon'; }
  else if (lower.includes('ice')) { typeClass = 'ice'; }
  else if (lower.includes('fairy')) { typeClass = 'fairy'; }
  else if (lower.includes('fighting')) { typeClass = 'fighting'; }
  else if (lower.includes('psychic')) { typeClass = 'psychic'; }
  else if (lower.includes('flying') || lower.includes('fly')) { typeClass = 'flying'; }
  else if (lower.includes('poison')) { typeClass = 'poison'; }
  else if (lower.includes('steel')) { typeClass = 'steel'; }
  else if (lower.includes('water')) { typeClass = 'water'; }
  else if (lower.includes('grass')) { typeClass = 'grass'; }
  else if (lower.includes('rock')) { typeClass = 'rock'; }
  else if (lower.includes('electric')) { typeClass = 'electric'; }
  else if (lower.includes('normal')) { typeClass = 'normal'; }

  return (
    <span className={`type-badge icon-only-badge pogo-type-${typeClass}`} title={typeStr}>
      <img
        src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeClass}.svg`}
        alt={typeStr}
        className="type-badge-icon"
      />
    </span>
  );
};

// Check if all featured bosses share the same primary type & weaknesses (e.g. Uxie, Mesprit, Azelf)
const areBossesSimilar = (bosses: { name: string }[]): boolean => {
  if (bosses.length <= 1) return true;
  const firstTypes = getPokemonTypesByName(bosses[0].name).sort().join(',');
  const firstWeaknesses = getWeaknessesForPokemon(bosses[0].name).sort().join(',');

  return bosses.every(b => {
    const bTypes = getPokemonTypesByName(b.name).sort().join(',');
    const bWeaknesses = getWeaknessesForPokemon(b.name).sort().join(',');
    return bTypes === firstTypes && bWeaknesses === firstWeaknesses;
  });
};

export const RaidInfographic: React.FC<RaidInfographicProps> = ({ event, lang, showTabs = false, isAdmin = false }) => {
  const editor = useInfographicEditor(event.eventID, 'raid');
  const { posterRef, isExporting, exportSuccess, exportAsPng } = useInfographicExport();
  const [activeSlide, setActiveSlide] = useState<number>(() => {
    if (event.eventType === 'raid-hour') return 2; // 2 = Raid Hour
    return 1; // 1 = Raid Rotation
  });
  const [selectedBossIndex, setSelectedBossIndex] = useState<number>(0);
  const isEditing = isAdmin && editor.isEditing;

  // Extract Bosses List
  const raidData = event.extraData?.raidbattles;
  const bossesList: { name: string; image: string; canBeShiny?: boolean }[] = [];
  const nameSet = new Set<string>();

  if (raidData?.bosses && raidData.bosses.length > 0) {
    raidData.bosses.forEach((b: any) => {
      const bName = typeof b === 'string' ? b : b.name;
      if (bName && !nameSet.has(bName.toLowerCase())) {
        nameSet.add(bName.toLowerCase());
        bossesList.push({
          name: bName,
          image: (typeof b === 'object' && b.image) ? b.image : getPokemonImage(bName),
          canBeShiny: typeof b === 'object' ? b.canBeShiny : true
        });
      }
    });
  }

  if (bossesList.length === 0) {
    const knownNames = getBasePokemonNames();
    const eventNameLower = event.name.toLowerCase();
    knownNames.forEach(n => {
      if (eventNameLower.includes(n.toLowerCase()) && !nameSet.has(n.toLowerCase())) {
        nameSet.add(n.toLowerCase());
        bossesList.push({
          name: n,
          image: getPokemonImage(n),
          canBeShiny: true
        });
      }
    });
  }

  if (bossesList.length === 0) {
    let fallbackName = event.name.replace(/raid\s*(hour|battles|rotation|day)/gi, "").trim() || "Raid Boss";
    bossesList.push({
      name: fallbackName,
      image: getPokemonImage(fallbackName),
      canBeShiny: true
    });
  }

  // Determine if bosses should be COMBINED (same type/counters e.g. Uxie/Mesprit/Azelf) or SEPARATE (different types e.g. Kyogre/Groudon)
  const isCombined = areBossesSimilar(bossesList);

  // Current active boss or all bosses
  const activeBoss = isCombined ? bossesList[0] : bossesList[selectedBossIndex] || bossesList[0];
  const primaryBossName = activeBoss.name;

  // Retrieve counter data & stats from raidCounters DB
  const countersData = findRaidCounters(primaryBossName);
  const weaknessesList = (countersData?.weaknesses && countersData.weaknesses.length > 0) 
    ? countersData.weaknesses 
    : getWeaknessesForPokemon(primaryBossName);
  const minCp = countersData?.minCp || 1669;
  const maxCp = countersData?.maxCp || 1747;
  const minBoostedCp = countersData?.minBoostedCp || 2087;
  const maxBoostedCp = countersData?.maxBoostedCp || 2184;
  const weatherBoostsList = countersData?.weatherBoosts || ['Windy'];

  const bossTier = (activeBoss as any)?.tier || (event.eventType?.includes('mega') ? 'mega' : event.eventType?.includes('shadow') ? 'shadow-5' : '5');

  const diffInfo = getBossDifficultyInfo(
    primaryBossName,
    bossTier,
    (activeBoss as any)?.playersRecommended || countersData?.playersRecommended,
    (activeBoss as any)?.difficultyTier || countersData?.difficultyTier,
    (activeBoss as any)?.difficultyNotes || countersData?.difficultyNotes,
    lang
  );

  // Primary Boss Element Types for Title Badges
  const primaryBossTypes = getPokemonTypesByName(primaryBossName);

  // Attacker Tier Ranking Info (e.g. #1 DRAGON ATTACKER) from pokemonRankings
  const bossRankingInfo = getPokemonRankingInfo(primaryBossName);

  // Assemble Top 7 Counters directly from pokemonRankings as Single Source of Truth
  const topCountersList = getAccurateRaidCounters(primaryBossName, 7);

  // Format dates for Slide 1 (Raid Rotation)
  const { dateStr, timeStr } = formatEventDateRange(event.start, event.end, 'en');

  // Exact Raid Hour Date Calculation for Slide 2 (Raid Hour)
  const getRaidHourInfo = () => {
    if ((event.extraData as any)?.raidHourDate) {
      const { dateStr: rhDate, timeStr: rhTime } = formatEventDateRange(
        (event.extraData as any).raidHourDate,
        (event.extraData as any).raidHourEnd || (event.extraData as any).raidHourDate,
        'en'
      );
      return { dateStr: rhDate, timeStr: rhTime || '18:00 - 19:00' };
    }

    if (event.eventType === 'raid-hour') {
      return { dateStr, timeStr: timeStr || '18:00 - 19:00' };
    }

    // For multi-day raid rotation, calculate Wednesday 18:00 - 19:00
    const start = new Date(event.start);
    const end = new Date(event.end);
    let wednesday = new Date(start);
    while (wednesday <= end && wednesday.getDay() !== 3) {
      wednesday.setDate(wednesday.getDate() + 1);
    }
    if (wednesday > end) wednesday = new Date(start);

    const rhFormatted = formatEventDateRange(wednesday.toISOString(), wednesday.toISOString(), 'en').dateStr;
    return { dateStr: rhFormatted, timeStr: '18:00 - 19:00' };
  };

  const raidHourInfo = getRaidHourInfo();

  // Single Slide Download Helper
  ;

  // Download Current Slide
  const handleDownloadCurrent = async () => {
    editor.setIsExporting(true);
    await exportAsPng(`pogo_raid_${activeSlide}_4x5`);
    editor.setIsExporting(false);
  };

  // Bulk Download All 3 Slides
  const handleDownloadAll = async () => {
    await handleDownloadCurrent();
  };

  return (
    <div className="raid-infographic-wrapper">
      {/* Slide Navigation & Boss Selector Toolbar */}
      {(showTabs || (!isCombined && bossesList.length > 1)) && (
        <div className="raid-carousel-toolbar">
          {!isCombined && bossesList.length > 1 && (
            <div className="boss-switcher-tabs flex-row">
              <span className="boss-switcher-label">Select Pokémon:</span>
              {bossesList.map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`boss-tab-btn ${selectedBossIndex === idx ? 'active' : ''}`}
                  onClick={() => setSelectedBossIndex(idx)}
                >
                  {getPokemonName(b.name, 'en')}
                </button>
              ))}
            </div>
          )}

          {showTabs && (
            <div className="slide-tabs flex-row">
              <button
                type="button"
                className={`slide-tab-btn ${activeSlide === 1 ? 'active' : ''}`}
                onClick={() => setActiveSlide(1)}
              >
                {lang === 'cs' ? '1. Raidová rotace' : '1. Raid Rotation'}
              </button>
              <button
                type="button"
                className={`slide-tab-btn ${activeSlide === 2 ? 'active' : ''}`}
                onClick={() => setActiveSlide(2)}
              >
                {lang === 'cs' ? '2. Raid Hour' : '2. Raid Hour'}
              </button>
              <button
                type="button"
                className={`slide-tab-btn ${activeSlide === 3 ? 'active' : ''}`}
                onClick={() => setActiveSlide(3)}
              >
                {lang === 'cs' ? '3. Nejlepší countery' : '3. Top Counters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4:5 Aspect Ratio Poster Element */}
      <div className={`raid-poster-container-4x5 ${editor.isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {isAdmin && (
          <EditToolbar isEditing={editor.isEditing} onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} hasOverrides={editor.hasOverrides} onReset={editor.resetAll} lang={lang} />
        )}
        <div className="raid-poster-glow-top"></div>

        {/* Poster Header (With ICON-ONLY type badges in the main title) */}
        <div className="raid-poster-header">
          <div className="raid-header-top-row">
            <div className="raid-poster-badge">
              <Swords size={14} className="raid-swords-icon" />
              <span>
                <EditableText 
                  value={editor.getTextOverride(`slide${activeSlide}_badge`, activeSlide === 1 
                    ? (lang === 'cs' ? 'RAIDOVÁ ROTACE' : 'RAID ROTATION') 
                    : activeSlide === 2 
                    ? 'RAID HOUR' 
                    : (lang === 'cs' ? 'NEJLEPŠÍ COUNTERY' : 'TOP COUNTERS'))} 
                  onChange={(v) => editor.setTextOverride(`slide${activeSlide}_badge`, v)} 
                  isEditing={isEditing} 
                />
              </span>
            </div>

            {/* Date & Time Pill: Slide 1 = Rotation Date, Slide 2 = Raid Hour Date, Slide 3 = Removed */}
            {activeSlide === 1 && (
              <div className="raid-poster-time-pill">
                <div className="raid-time-item">
                  <Calendar size={13} />
                  <span><EditableText value={editor.getTextOverride('slide1_date', dateStr)} onChange={(v) => editor.setTextOverride('slide1_date', v)} isEditing={editor.isEditing} /></span>
                </div>
                {timeStr && (
                  <>
                    <div className="raid-time-divider">•</div>
                    <div className="raid-time-item">
                      <Clock size={13} />
                      <span><EditableText value={editor.getTextOverride('slide1_time', timeStr)} onChange={(v) => editor.setTextOverride('slide1_time', v)} isEditing={editor.isEditing} /></span>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeSlide === 2 && (
              <div className="raid-poster-time-pill">
                <div className="raid-time-item">
                  <Calendar size={13} />
                  <span><EditableText value={editor.getTextOverride('slide2_date', raidHourInfo.dateStr)} onChange={(v) => editor.setTextOverride('slide2_date', v)} isEditing={editor.isEditing} /></span>
                </div>
                {raidHourInfo.timeStr && (
                  <>
                    <div className="raid-time-divider">•</div>
                    <div className="raid-time-item">
                      <Clock size={13} />
                      <span><EditableText value={editor.getTextOverride('slide2_time', raidHourInfo.timeStr)} onChange={(v) => editor.setTextOverride('slide2_time', v)} isEditing={editor.isEditing} /></span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <h2 className="raid-poster-title flex-title-row">
            <div className="title-left-group">
              {activeSlide === 3 && (
                <img
                  src={resolveImage(activeBoss.image, event.eventType, primaryBossName, false)}
                  alt={primaryBossName}
                  className="header-counter-target-sprite"
                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, primaryBossName, false)}
                />
              )}
              <span className="boss-title-text">
                <EditableText value={editor.getTextOverride(`slide${activeSlide}_title`, isCombined && bossesList.length > 1 
                    ? bossesList.map(b => getPokemonName(b.name, lang)).join(' • ')
                    : getPokemonName(primaryBossName, lang))} onChange={(v) => editor.setTextOverride(`slide${activeSlide}_title`, v)} isEditing={isEditing} />
              </span>
            </div>
            <span className="title-type-badges">
              {primaryBossTypes.map((t) => (
                <TypeIconOnly key={t} typeStr={t} />
              ))}
            </span>
          </h2>
        </div>

        {/* SLIDE 1: RAID ROTATION (Displays 2 top, 1 bottom for 3 bosses with names above sprites) */}
        {activeSlide === 1 && (
          <div className="slide-content-block slide1">
            {/* Attacker Tier Ranking Badges (up to 3 types in top 10 with type icons) */}
            {bossRankingInfo && bossRankingInfo.topTypeRanks && bossRankingInfo.topTypeRanks.length > 0 && (
              <div className="slide1-rank-pill-container">
                {bossRankingInfo.topTypeRanks.map((rankItem, rIdx) => (
                  <div key={rIdx} className="slide1-rank-pill">
                    <TypeIconOnly typeStr={rankItem.typeName} />
                    <span>
                      <EditableText
                        value={editor.getTextOverride(`slide1_rank_badge_${rIdx}`, lang === 'cs' ? rankItem.badgeLabelCs : rankItem.badgeLabelEn)}
                        onChange={(v) => editor.setTextOverride(`slide1_rank_badge_${rIdx}`, v)}
                        isEditing={editor.isEditing}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className={`slide1-bosses-expanded ${isCombined && bossesList.length === 3 ? 'multi-3-grid' : isCombined && bossesList.length === 2 ? 'multi-2-grid' : ''}`}>
              {(isCombined ? bossesList : [activeBoss]).map((boss, idx) => {
                const count = isCombined ? bossesList.length : 1;
                const spriteClass = count >= 3 ? 'boss-sprite-grid-3' : count === 2 ? 'boss-sprite-combined-2' : 'boss-sprite-giant-max';

                return (
                  <div key={idx} className="slide1-expanded-card">
                    {/* Name ABOVE the sprite pair */}
                    {count > 1 && (
                      <span className="boss-individual-name">
                        <EditableText value={editor.getTextOverride(`slide1_boss_name_${idx}`, getPokemonName(boss.name, lang))} onChange={(v) => editor.setTextOverride(`slide1_boss_name_${idx}`, v)} isEditing={editor.isEditing} />
                      </span>
                    )}

                    <div className="sprites-large-pair">
                      <div className="sprite-large-box">
                        <EditableImage src={editor.getImageOverride(`slide1_boss_img_normal_${idx}`, resolveImage(boss.image, event.eventType, boss.name, false))} alt={boss.name} onChange={(url) => editor.setImageOverride(`slide1_boss_img_normal_${idx}`, url)} isEditing={editor.isEditing} className={spriteClass} onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, false)} />
                        <span className="sprite-label">
                          <EditableText value={editor.getTextOverride('slide1_sprite_label_normal', "Normal")} onChange={(v) => editor.setTextOverride('slide1_sprite_label_normal', v)} isEditing={editor.isEditing} />
                        </span>
                      </div>
                      {boss.canBeShiny && (
                        <div className="sprite-large-box">
                          <EditableImage src={editor.getImageOverride(`slide1_boss_img_shiny_${idx}`, resolveImage(boss.image, event.eventType, boss.name, true))} alt={`${boss.name} Shiny`} onChange={(url) => editor.setImageOverride(`slide1_boss_img_shiny_${idx}`, url)} isEditing={editor.isEditing} className={`${spriteClass} shiny-glow`} onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, true)} />
                          <span className="sprite-label shiny">
                            <EditableText value={editor.getTextOverride('slide1_sprite_label_shiny', "✨ Shiny")} onChange={(v) => editor.setTextOverride('slide1_sprite_label_shiny', v)} isEditing={editor.isEditing} />
                          </span>
                        </div>
                      )}
                    </div>

                    {(() => {
                      const regInfo = getRegionalInfo(boss.name);
                      if (!regInfo) return null;
                      return (
                        <div className="boss-meta-row">
                          <span className="regional-tag">
                            {regInfo.shortLabel.en || regInfo.shortLabel.cs}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>

            {/* Info Cards Row: Recommended Party & Type Weaknesses */}
            <div className="slide1-info-cards-flex">
              <div className="slide1-weakness-card centered">
                <div className="weakness-header centered">
                  {diffInfo.difficultyTier === 'solo' ? (
                    <User size={14} style={{ color: '#4ade80' }} />
                  ) : diffInfo.difficultyTier === 'hard-group' ? (
                    <AlertTriangle size={14} style={{ color: '#f87171' }} />
                  ) : (
                    <Users size={14} style={{ color: '#38bdf8' }} />
                  )}
                  <span><EditableText value={editor.getTextOverride('slide1_rec_party_header', lang === 'cs' ? 'DOPORUČENÁ SKUPINA' : 'RECOMMENDED PARTY')} onChange={(v) => editor.setTextOverride('slide1_rec_party_header', v)} isEditing={editor.isEditing} /></span>
                </div>
                <div className="type-badges-row centered">
                  <span className={`diff-infographic-pill tier-${diffInfo.difficultyTier}`}>
                    {diffInfo.difficultyTier === 'solo' ? (
                      <User size={12} />
                    ) : diffInfo.difficultyTier === 'hard-group' ? (
                      <AlertTriangle size={12} />
                    ) : (
                      <Users size={12} />
                    )}
                    <EditableText value={editor.getTextOverride('slide1_diff_label', diffInfo.recLabel)} onChange={(v) => editor.setTextOverride('slide1_diff_label', v)} isEditing={editor.isEditing} />
                  </span>
                </div>
              </div>

              <div className="slide1-weakness-card centered">
                <div className="weakness-header centered">
                  <Zap size={14} style={{ color: '#f87171' }} />
                  <span><EditableText value={editor.getTextOverride('slide1_type_weak_header', lang === 'cs' ? 'TYPOVÉ SLABOSTI' : 'TYPE WEAKNESSES')} onChange={(v) => editor.setTextOverride('slide1_type_weak_header', v)} isEditing={editor.isEditing} /></span>
                </div>
                <div className="type-badges-row centered">
                  {weaknessesList.map((w) => (
                    <TypeBadge key={w} typeStr={w} lang={lang} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: RAID HOUR (2 top, 1 bottom for 3 bosses with names above sprites) */}
        {activeSlide === 2 && (
          <div className="slide-content-block slide2">
            <div className="slide2-boss-maximized">
              <div className={`max-sprites-grid ${isCombined && bossesList.length === 3 ? 'multi-3-grid' : isCombined && bossesList.length === 2 ? 'multi-2-grid' : ''}`}>
                {(isCombined ? bossesList : [activeBoss]).map((boss, idx) => {
                  const count = isCombined ? bossesList.length : 1;
                  const spriteClass = count >= 3 ? 'boss-sprite-grid-3' : count === 2 ? 'boss-sprite-combined-2' : 'boss-max-sprite-giant';

                  return (
                    <div key={idx} className="max-sprite-card-item">
                      {count > 1 && (
                        <span className="boss-individual-name">
                          <EditableText value={editor.getTextOverride(`slide2_boss_name_${idx}`, getPokemonName(boss.name, lang))} onChange={(v) => editor.setTextOverride(`slide2_boss_name_${idx}`, v)} isEditing={editor.isEditing} />
                        </span>
                      )}
                      <div className="max-sprite-pair-flex">
                        <EditableImage src={editor.getImageOverride(`slide2_boss_img_normal_${idx}`, resolveImage(boss.image, event.eventType, boss.name, false))} alt={boss.name} onChange={(url) => editor.setImageOverride(`slide2_boss_img_normal_${idx}`, url)} isEditing={editor.isEditing} className={spriteClass} onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, false)} />
                        {boss.canBeShiny && (
                          <EditableImage src={editor.getImageOverride(`slide2_boss_img_shiny_${idx}`, resolveImage(boss.image, event.eventType, boss.name, true))} alt={`${boss.name} Shiny`} onChange={(url) => editor.setImageOverride(`slide2_boss_img_shiny_${idx}`, url)} isEditing={editor.isEditing} className={`${spriteClass} shiny-glow`} onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, boss.name, true)} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Unified CP Box */}
            <div className="unified-cp-box">
              <div className="cp-box-title">
                <Shield size={13} />
                <span><EditableText value={editor.getTextOverride('slide2_cp_title', lang === 'cs' ? 'ROZSAH CP PŘI CHYCENÍ' : 'ENCOUNTER CP RANGES')} onChange={(v) => editor.setTextOverride('slide2_cp_title', v)} isEditing={editor.isEditing} /></span>
              </div>

              <div className="cp-unified-rows">
                <div className="cp-line-item">
                  <span className="cp-line-label">
                    <EditableText value={editor.getTextOverride('slide2_cp_normal_label', lang === 'cs' ? 'Běžné (Lvl 20):' : 'Normal (Lvl 20):')} onChange={(v) => editor.setTextOverride('slide2_cp_normal_label', v)} isEditing={editor.isEditing} />
                  </span>
                  <div className="cp-line-val">
                    <EditableText value={editor.getTextOverride('slide2_cp_normal_val', `CP ${minCp.toLocaleString()} – `)} onChange={(v) => editor.setTextOverride('slide2_cp_normal_val', v)} isEditing={editor.isEditing} />
                    <strong className="gold-hundo-glow">
                      <EditableText value={editor.getTextOverride('slide2_cp_normal_max', `${maxCp.toLocaleString()} CP 👑`)} onChange={(v) => editor.setTextOverride('slide2_cp_normal_max', v)} isEditing={editor.isEditing} />
                    </strong>
                  </div>
                </div>

                <div className="cp-line-item boost">
                  <span className="cp-line-label boost">
                    <EditableText value={editor.getTextOverride('slide2_cp_boost_label', lang === 'cs' ? 'Počasí (Lvl 25):' : 'Boosted (Lvl 25):')} onChange={(v) => editor.setTextOverride('slide2_cp_boost_label', v)} isEditing={editor.isEditing} />
                  </span>
                  <div className="cp-line-val">
                    <EditableText value={editor.getTextOverride('slide2_cp_boost_val', `CP ${minBoostedCp.toLocaleString()} – `)} onChange={(v) => editor.setTextOverride('slide2_cp_boost_val', v)} isEditing={editor.isEditing} />
                    <strong className="gold-hundo-glow">
                      <EditableText value={editor.getTextOverride('slide2_cp_boost_max', `${maxBoostedCp.toLocaleString()} CP 👑`)} onChange={(v) => editor.setTextOverride('slide2_cp_boost_max', v)} isEditing={editor.isEditing} />
                    </strong>
                  </div>
                </div>

                <div className="cp-line-item weather-row">
                  <span className="cp-line-label">
                    <EditableText value={editor.getTextOverride('slide2_weather_label', lang === 'cs' ? 'Počasí:' : 'Boosted by:')} onChange={(v) => editor.setTextOverride('slide2_weather_label', v)} isEditing={editor.isEditing} />
                  </span>
                  <div className="weather-icons-flex">
                    {weatherBoostsList.map((w, idx) => (
                      <WeatherIcon key={idx} weatherStr={w} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="slide2-shiny-rate-card">
              <Sparkles size={14} style={{ color: '#fbbf24' }} />
              <span className="shiny-card-single-text">
                <EditableText value={editor.getTextOverride('slide2_shiny_rate_text', lang === 'cs' ? 'ŠANCE NA SHINY: ' : 'SHINY RATE: ')} onChange={(v) => editor.setTextOverride('slide2_shiny_rate_text', v)} isEditing={editor.isEditing} />
                <strong>
                  <EditableText value={editor.getTextOverride('slide2_shiny_rate_val', lang === 'cs' ? '~1 z 20 (5% šance) ✨' : '~1 in 20 (5% Chance) ✨')} onChange={(v) => editor.setTextOverride('slide2_shiny_rate_val', v)} isEditing={editor.isEditing} />
                </strong>
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 3: TOP COUNTERS (Top 7 Counters Centered, Equal Height, Single Source of Truth) */}
        {activeSlide === 3 && (
          <div className="slide-content-block slide3">
            <div className="slide3-counters-grid-7">
              {topCountersList.slice(0, 7).map((counter, idx) => (
                <div key={idx} className={`slide3-counter-card-7 ${idx === 0 ? 'top-1-winner' : ''}`}>
                  {idx === 0 ? (
                    <>
                      <div className="top-1-ribbon">
                        <Crown size={11} className="ribbon-crown-icon" />
                        <span>
                          <EditableText
                            value={editor.getTextOverride('slide3_top1_ribbon_text', 'TOP 1 COUNTER')}
                            onChange={(v) => editor.setTextOverride('slide3_top1_ribbon_text', v)}
                            isEditing={editor.isEditing}
                          />
                        </span>
                      </div>
                      <div className="top-1-inner-flex">
                        <div className="counter-img-wrapper-7 top1-img-wrapper">
                          <EditableImage
                            src={editor.getImageOverride(`slide3_counter_img_${idx}`, counter.image)}
                            alt={counter.name}
                            onChange={(url) => editor.setImageOverride(`slide3_counter_img_${idx}`, url)}
                            isEditing={editor.isEditing}
                            className="counter-img-top1"
                            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, counter.name)}
                          />
                        </div>
                        <div className="counter-body-centered top1-body">
                          <span className="counter-title-7">
                            <EditableText
                              value={editor.getTextOverride(`slide3_counter_name_${idx}`, getPokemonName(counter.name, lang))}
                              onChange={(v) => editor.setTextOverride(`slide3_counter_name_${idx}`, v)}
                              isEditing={editor.isEditing}
                            />
                          </span>
                          {counter.move && (
                            <span className="counter-attack-7">
                              <EditableText
                                value={editor.getTextOverride(`slide3_counter_move_${idx}`, counter.move)}
                                onChange={(v) => editor.setTextOverride(`slide3_counter_move_${idx}`, v)}
                                isEditing={editor.isEditing}
                              />
                            </span>
                          )}
                          <div className="counter-element-badges-centered">
                            {counter.types.map((t) => (
                              <TypeBadge key={t} typeStr={t} lang={lang} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="counter-img-wrapper-7">
                        <EditableImage
                          src={editor.getImageOverride(`slide3_counter_img_${idx}`, counter.image)}
                          alt={counter.name}
                          onChange={(url) => editor.setImageOverride(`slide3_counter_img_${idx}`, url)}
                          isEditing={editor.isEditing}
                          className="counter-img-normal"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, counter.name)}
                        />
                      </div>
                      <div className="counter-body-centered">
                        <span className="counter-title-7">
                          <EditableText
                            value={editor.getTextOverride(`slide3_counter_name_${idx}`, getPokemonName(counter.name, lang))}
                            onChange={(v) => editor.setTextOverride(`slide3_counter_name_${idx}`, v)}
                            isEditing={editor.isEditing}
                          />
                        </span>
                        {counter.move && (
                          <span className="counter-attack-7">
                            <EditableText
                              value={editor.getTextOverride(`slide3_counter_move_${idx}`, counter.move)}
                              onChange={(v) => editor.setTextOverride(`slide3_counter_move_${idx}`, v)}
                              isEditing={editor.isEditing}
                            />
                          </span>
                        )}
                        <div className="counter-element-badges-centered">
                          {counter.types.map((t) => (
                            <TypeBadge key={t} typeStr={t} lang={lang} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Poster Footer */}
        <div className="raid-poster-footer">
          <div className="raid-footer-left">
            <ShieldCheck size={14} className="raid-shield-icon" />
            <span><EditableText value={editor.getTextOverride('footer_left', "pogoevents.app")} onChange={(v) => editor.setTextOverride('footer_left', v)} isEditing={editor.isEditing} /></span>
          </div>
          <span><EditableText value={editor.getTextOverride('footer_right', "Pokémon GO Event Tracker")} onChange={(v) => editor.setTextOverride('footer_right', v)} isEditing={editor.isEditing} /></span>
        </div>
      </div>

      <div className="download-actions-flex" style={{ marginTop: '12px' }}>
        <button 
          className={`raid-download-btn ${exportSuccess ? 'success' : ''}`}
          onClick={handleDownloadCurrent}
          disabled={isExporting}
        >
          <Download size={15} />
          {exportSuccess ? (lang === 'cs' ? 'Uloženo!' : 'Saved PNG!') : (lang === 'cs' ? 'Stáhnout Infografiku' : 'Download Infographic')}
        </button>

        {showTabs && (
          <button 
            className="raid-download-btn bulk"
            onClick={handleDownloadAll}
            disabled={isExporting}
          >
            <Layers size={15} />
            Download All 3 Infographics (PNG Package)
          </button>
        )}
      </div>
    </div>
  );
};
