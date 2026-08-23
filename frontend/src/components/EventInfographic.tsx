import React, { useRef, useState } from 'react';
import { useInfographicExport } from '../hooks/useInfographicExport';
import { Download, Sparkles, Clock, Calendar, Check, ShieldCheck, Gift, Leaf, Search, Star, Egg, Swords, Layers, Zap, FolderArchive, ArrowRight, Shield } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { formatEventDateRange } from '../utils/infographicFormatters';
import { getLocalizedText } from './EventCard';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import { findRaidCounters } from '../data/raidCounters';
import { getWeaknessesForPokemon, getPokemonTypesByName } from '../utils/pokemonCountersHelper';
import { getBossDifficultyInfo } from './RaidDifficultyBox';
import './EventInfographic.css';

interface EventInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  /** Merged special-event details (bonuses, spawns, eggs, research, debuts, raids, goPass) */
  specialDetails?: any;
  isAdmin?: boolean;
}

// ── Per event-type theming ─────────────────────────────────────────────────────
interface EventTheme {
  accent: string;
  accentLight: string;
  accentGlow: string;
  badge: string;
  icon: React.ReactNode;
  badgeLabel: (lang: Language) => string;
}

function getEventTheme(eventType: string, eventName: string): EventTheme {
  const type = (eventType || '').toLowerCase();
  const name = (eventName || '').toLowerCase();

  if (type === 'hatch-day' || name.includes('hatch')) {
    return {
      accent: '#fb923c',
      accentLight: 'rgba(251,146,60,0.18)',
      accentGlow: 'rgba(251,146,60,0.28)',
      badge: 'rgba(251,146,60,0.18)',
      icon: <Egg size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'HATCH DAY' : 'HATCH DAY',
    };
  }
  if (type === 'limited-research' || name.includes('limited research')) {
    return {
      accent: '#34d399',
      accentLight: 'rgba(52,211,153,0.15)',
      accentGlow: 'rgba(52,211,153,0.25)',
      badge: 'rgba(52,211,153,0.15)',
      icon: <Search size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'LIMITED RESEARCH' : 'LIMITED RESEARCH',
    };
  }
  if (type === 'showcase' || name.includes('showcase')) {
    return {
      accent: '#a78bfa',
      accentLight: 'rgba(167,139,250,0.15)',
      accentGlow: 'rgba(167,139,250,0.25)',
      badge: 'rgba(167,139,250,0.15)',
      icon: <Star size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'POKÉSTOP SHOWCASE' : 'POKÉSTOP SHOWCASE',
    };
  }
  if (type === 'raid-day' || name.includes('raid day') || name.includes('mega raid')) {
    return {
      accent: '#f87171',
      accentLight: 'rgba(248,113,113,0.15)',
      accentGlow: 'rgba(248,113,113,0.25)',
      badge: 'rgba(248,113,113,0.15)',
      icon: <Swords size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'RAID DAY' : 'RAID DAY',
    };
  }
  if (type === 'event' || name.includes('fest') || name.includes('tour')) {
    return {
      accent: '#38bdf8',
      accentLight: 'rgba(56,189,248,0.15)',
      accentGlow: 'rgba(56,189,248,0.25)',
      badge: 'rgba(56,189,248,0.15)',
      icon: <Sparkles size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'POKÉMON GO EVENT' : 'POKÉMON GO EVENT',
    };
  }
  return {
    accent: '#60a5fa',
    accentLight: 'rgba(96,165,250,0.15)',
    accentGlow: 'rgba(96,165,250,0.25)',
    badge: 'rgba(96,165,250,0.15)',
    icon: <Sparkles size={14} />,
    badgeLabel: (l) => l === 'cs' ? 'POKÉMON GO EVENT' : 'POKÉMON GO EVENT',
  };
}

const EggSvg = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 100 120" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M50 10 C20 10, 10 60, 10 85 C10 105, 30 115, 50 115 C70 115, 90 105, 90 85 C90 60, 80 10, 50 10 Z" fill="currentColor" stroke="none" />
  </svg>
);

export type InfographicPart = 'all' | 'overview' | 'spawns' | 'raids' | 'research';

// ── Main Component ─────────────────────────────────────────────────────────────
export const EventInfographic: React.FC<EventInfographicProps> = ({ event, lang, specialDetails, isAdmin = false }) => {
  const { posterRef, isExporting, exportSuccess, exportAsPng } = useInfographicExport();
  const [activePart, setActivePart] = useState<InfographicPart>('all');

  const editor = useInfographicEditor(event.eventID, 'event');
  const theme = getEventTheme(event.eventType, event.name);
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, lang);

  // Pull data from both scraper extraData and local specialDetails
  const extraData = event.extraData as any;
  const spawns: any[] = extraData?.spawns || specialDetails?.spawns || [];
  const bonuses: any[] = extraData?.bonuses || specialDetails?.bonuses || [];
  const eggs: any[] = extraData?.eggs || specialDetails?.eggs || [];
  const research: any[] = extraData?.research || specialDetails?.research || [];
  const debuts: any[] = extraData?.debuts || specialDetails?.debuts || [];
  const featuredAttacks: any[] = extraData?.featuredAttacks || specialDetails?.featuredAttacks || [];
  const showcases: any[] = extraData?.showcases || specialDetails?.showcases || [];
  const paidTicket: any = extraData?.paidTicket || specialDetails?.paidTicket;
  const goPass: any = extraData?.goPass || specialDetails?.goPass;
  const highlights: any = extraData?.highlights || specialDetails?.highlights;
  const communitydaySpawns: any[] = extraData?.communityday?.spawns || [];
  const rawRaids: any[] = extraData?.raids || specialDetails?.raids || [];

  const allSpawns = spawns.length > 0 ? spawns : communitydaySpawns;

  const displaySpawns = editor.getListOverride('spawns', allSpawns);
  const displayBonuses = editor.getListOverride('bonuses', bonuses);
  const displayEggs = editor.getListOverride('eggs', eggs);
  const displayResearch = editor.getListOverride('research', research);
  const displayDebuts = editor.getListOverride('debuts', debuts);
  const displayFeaturedAttacks = editor.getListOverride('featuredAttacks', featuredAttacks);
  const displayShowcases = editor.getListOverride('showcases', showcases);

  // Collect Mega Raids and other raid bosses
  const megaRaids: any[] = [];
  const otherRaids: any[] = [];

  rawRaids.forEach((rGroup: any) => {
    const tier = (rGroup?.tier || '').toLowerCase();
    const list = rGroup?.list || [];
    list.forEach((boss: any) => {
      const bName = typeof boss === 'string' ? boss : boss.name;
      if (/mega|primal/i.test(tier) || /^mega\s+/i.test(bName) || /^primal\s+/i.test(bName)) {
        megaRaids.push(typeof boss === 'string' ? { name: boss } : boss);
      } else {
        otherRaids.push(typeof boss === 'string' ? { name: boss, tier } : { ...boss, tier });
      }
    });
  });

  // Also check if event name or extraData has mega boss
  if (megaRaids.length === 0 && (event.name.toLowerCase().includes('mega') || (extraData?.raidbattles?.bosses?.some((b: any) => (b.name || '').toLowerCase().includes('mega'))))) {
    (extraData?.raidbattles?.bosses || []).forEach((b: any) => {
      const bName = typeof b === 'string' ? b : b.name;
      if ((bName || '').toLowerCase().includes('mega')) {
        megaRaids.push(typeof b === 'string' ? { name: b } : b);
      }
    });
  }

  // Group spawns by habitat
  const habitatMap = new Map<string, any[]>();
  displaySpawns.forEach((s: any) => {
    const habName = s.habitat ? getLocalizedText(s.habitat, lang) : (lang === 'cs' ? 'Divoká příroda' : 'Wild Spawns');
    if (!habitatMap.has(habName)) habitatMap.set(habName, []);
    habitatMap.get(habName)!.push(s);
  });
  const habitatEntries = Array.from(habitatMap.entries());

  // Determine if event is extensive and calculate available parts
  const isExtensive = displaySpawns.length >= 8 || habitatEntries.length > 1 || megaRaids.length > 0 || (displayEggs.length > 0 && displayBonuses.length > 0 && displayResearch.length > 0);

  const hasOverview = displayBonuses.length > 0 || highlights !== undefined || paidTicket !== undefined || goPass !== undefined;
  const hasSpawns = displaySpawns.length > 0 || displayDebuts.length > 0 || displayShowcases.length > 0;
  const hasRaids = megaRaids.length > 0 || otherRaids.length > 0;
  const hasResearch = displayEggs.length > 0 || displayResearch.length > 0 || displayFeaturedAttacks.length > 0;

  // ── Download Helpers ──────────────────────────────────────────────────────
  ;

  const handleDownloadCurrent = async () => {
    editor.setIsExporting(true);
    let titleStr = typeof event.name === 'object' ? getLocalizedText(event.name, lang) : event.name;
    const namePart = titleStr.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const partSuffix = activePart !== 'all' ? `_${activePart}` : '';
    await exportAsPng(`pogo_event_${namePart}_${event.eventID}${partSuffix}_4x5`);
    editor.setIsExporting(false);
  };

  const handleDownloadAllParts = async () => {
    await handleDownloadCurrent();
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getPokeName = (s: any): string => {
    if (!s) return '';
    if (typeof s === 'string') return s;
    if (typeof s.name === 'object') return s.name.en || s.name.cs || '';
    return s.name || '';
  };

  const getBonusText = (b: any): string => {
    if (!b) return '';
    if (typeof b === 'string') return b;
    return getLocalizedText(b.text, lang) || getLocalizedText(b, lang) || '';
  };

  const getBonusIcon = (b: any): string => {
    if (!b) return '🎁';
    if (typeof b === 'string') return '🎁';
    return b.icon || '🎁';
  };

  const isEditing = isAdmin && editor.isEditing;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ei-wrapper">
      {/* Multi-Part Tab Bar (If Event is Extensive) */}
      {isExtensive && (
        <div className="ei-parts-nav">
          <button
            className={`ei-part-btn ${activePart === 'all' ? 'active' : ''}`}
            onClick={() => setActivePart('all')}
          >
            <Layers size={13} />
            <span>{lang === 'cs' ? 'Kompaktní přehled' : 'All-in-One'}</span>
          </button>
          {hasOverview && (
            <button
              className={`ei-part-btn ${activePart === 'overview' ? 'active' : ''}`}
              onClick={() => setActivePart('overview')}
            >
              <Gift size={13} />
              <span>{lang === 'cs' ? '1. Přehled & Bonusy' : '1. Overview & Bonuses'}</span>
              <span className="ei-part-badge">{displayBonuses.length}</span>
            </button>
          )}
          {hasSpawns && (
            <button
              className={`ei-part-btn ${activePart === 'spawns' ? 'active' : ''}`}
              onClick={() => setActivePart('spawns')}
            >
              <Leaf size={13} />
              <span>{lang === 'cs' ? '2. Spawny & Habitaty' : '2. Spawns & Habitats'}</span>
              <span className="ei-part-badge">{displaySpawns.length}</span>
            </button>
          )}
          {hasRaids && (
            <button
              className={`ei-part-btn ${activePart === 'raids' ? 'active' : ''}`}
              onClick={() => setActivePart('raids')}
            >
              <Swords size={13} />
              <span>{lang === 'cs' ? '3. Mega Raidy & Bossové' : '3. Mega Raids & Bosses'}</span>
              <span className="ei-part-badge">{megaRaids.length || otherRaids.length}</span>
            </button>
          )}
          {hasResearch && (
            <button
              className={`ei-part-btn ${activePart === 'research' ? 'active' : ''}`}
              onClick={() => setActivePart('research')}
            >
              <Egg size={13} />
              <span>{lang === 'cs' ? '4. Výzkum, Vejce & Útoky' : '4. Research & Moves'}</span>
              <span className="ei-part-badge">{displayEggs.length + displayResearch.length}</span>
            </button>
          )}
        </div>
      )}

      {/* Poster Canvas */}
      <div
        className={`ei-poster ${editor.isExporting ? 'is-exporting' : ''}`}
        ref={posterRef}
        style={{ borderColor: `${theme.accent}55` }}
      >
        {isAdmin && (
          <EditToolbar 
            isEditing={editor.isEditing} 
            onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} 
            hasOverrides={editor.hasOverrides} 
            onReset={editor.resetAll} 
            lang={lang} 
          />
        )}

        {/* Glow */}
        <div className="ei-glow-top" style={{ background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)` }} />

        {/* ── Header ── */}
        <div className="ei-header">
          <div className="ei-header-top-row">
            <div className="ei-badge" style={{ background: theme.badge, color: theme.accent, borderColor: `${theme.accent}55` }}>
              {theme.icon}
              <span>
                <EditableText
                  value={editor.getTextOverride('badgeLabel', theme.badgeLabel(lang))}
                  onChange={(v) => editor.setTextOverride('badgeLabel', v)}
                  isEditing={isEditing}
                />
              </span>
            </div>
            <div className="ei-time-pill">
              <div className="ei-time-item"><Calendar size={13} /><span><EditableText value={editor.getTextOverride('date', dateStr)} onChange={(v) => editor.setTextOverride('date', v)} isEditing={isEditing} /></span></div>
              {!isMultiDay && timeStr && (
                <><div className="ei-time-sep">•</div><div className="ei-time-item"><Clock size={13} /><span><EditableText value={editor.getTextOverride('time', timeStr)} onChange={(v) => editor.setTextOverride('time', v)} isEditing={isEditing} /></span></div></>
              )}
            </div>
          </div>
          <h2 className="ei-title">
            <EditableText
              value={editor.getTextOverride('title', typeof event.name === 'object' ? getLocalizedText(event.name, lang) : event.name)}
              onChange={(v) => editor.setTextOverride('title', v)}
              isEditing={isEditing}
            />
          </h2>
        </div>

        {/* ── Body ── */}
        <div className="ei-body">
          {/* ════════════════════════════════════════════════════════════════════════
              PART 1: OVERVIEW, BONUSES & GRIND SCORE
          ════════════════════════════════════════════════════════════════════════ */}
          {(activePart === 'all' || activePart === 'overview') && (
            <>
              {/* Event Digest & Grind Score */}
              {highlights && (highlights.pveTopPicks?.length > 0 || highlights.pvpTopPicks?.length > 0 || highlights.mustDoBonuses?.length > 0) && (
                <div className="ei-highlights-box" style={{ background: 'rgba(255, 255, 255, 0.04)', border: `1px solid ${theme.accent}44`, borderRadius: '12px', padding: '10px 14px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: theme.accent, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      🔥 {lang === 'cs' ? 'Doporučení pro hráče / Na co se zaměřit' : 'Event Digest & Highlights'}
                    </span>
                    {highlights.grindScore && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '6px', background: highlights.grindScore === 'S' ? '#eab308' : theme.accentLight, color: highlights.grindScore === 'S' ? '#000' : theme.accent }}>
                        SCORE: {highlights.grindScore}
                      </span>
                    )}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                    {highlights.mustDoBonuses?.map((b: string, idx: number) => (
                      <li key={`hb-${idx}`} style={{ marginBottom: '3px' }}><strong>{b}</strong></li>
                    ))}
                    {highlights.pveTopPicks?.map((p: string, idx: number) => (
                      <li key={`hpve-${idx}`} style={{ marginBottom: '3px' }}>⚔️ PvE: {p}</li>
                    ))}
                    {highlights.pvpTopPicks?.map((p: string, idx: number) => (
                      <li key={`hpvp-${idx}`} style={{ marginBottom: '3px' }}>🛡️ PvP: {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bonuses Section */}
              {displayBonuses.length > 0 && (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: theme.accent }}>
                    <Gift size={13} />
                    <span>
                      <EditableText value={editor.getTextOverride('bonusesTitle', lang === 'cs' ? 'Aktivní Bonusy' : 'Active Bonuses')} onChange={(v) => editor.setTextOverride('bonusesTitle', v)} isEditing={editor.isEditing} />
                    </span>
                  </div>
                  <div className="ei-bonuses-list">
                    {displayBonuses.slice(0, activePart === 'overview' ? 12 : 6).map((b: any, bi: number) => (
                      <div key={bi} className="ei-bonus-row" style={{ borderColor: `${theme.accent}30` }}>
                        <span className="ei-bonus-icon">
                          <EditableText value={editor.getTextOverride(`bonusIcon-${bi}`, getBonusIcon(b))} onChange={(v) => editor.setTextOverride(`bonusIcon-${bi}`, v)} isEditing={editor.isEditing} />
                        </span>
                        <span className="ei-bonus-text">
                          <EditableText value={editor.getTextOverride(`bonus-${bi}`, getBonusText(b))} onChange={(v) => editor.setTextOverride(`bonus-${bi}`, v)} isEditing={editor.isEditing} multiline={true} />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Paid Ticket / GO Pass */}
              {paidTicket?.bonuses && paidTicket.bonuses.length > 0 && (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: '#f59e0b' }}>
                    <span>🎟️</span>
                    <span>{paidTicket.name ? getLocalizedText(paidTicket.name, lang) : (lang === 'cs' ? 'Bonusy placeného lístku' : 'Paid Ticket Bonuses')}</span>
                  </div>
                  <div className="ei-bonuses-list">
                    {paidTicket.bonuses.map((b: any, bi: number) => (
                      <div key={bi} className="ei-bonus-row" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                        <span className="ei-bonus-icon">{getBonusIcon(b)}</span>
                        <span className="ei-bonus-text">{getBonusText(b)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════════════════════════
              PART 2: WILD SPAWNS & HABITAT ROTATIONS
          ════════════════════════════════════════════════════════════════════════ */}
          {(activePart === 'all' || activePart === 'spawns') && (
            <>
              {habitatEntries.length > 1 ? (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: theme.accent }}>
                    <Leaf size={13} />
                    <span>{lang === 'cs' ? 'Výskyt Pokémonů v Habitátech' : 'Habitat Biome Spawns'}</span>
                  </div>
                  {habitatEntries.map(([habName, habSpawns], hIdx) => (
                    <div key={hIdx} className="ei-habitat-group">
                      <div className="ei-habitat-header" style={{ color: theme.accent }}>
                        <span>📍 {habName}</span>
                        <span style={{ opacity: 0.7, fontSize: '10.5px' }}>{habSpawns.length} Pokémonů</span>
                      </div>
                      <div className="ei-spawns-grid">
                        {habSpawns.map((s: any, i: number) => {
                          const name = getPokeName(s);
                          return (
                            <div key={i} className="ei-spawn-item">
                              <EditableImage
                                src={resolveImage(s?.image, event.eventType, name)}
                                alt={name}
                                onChange={() => {}}
                                isEditing={false}
                                className="ei-spawn-img"
                                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                                pokemonName={name}
                              />
                              <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                              {s?.isShinyAvailable && <span className="ei-shiny-dot">✨</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                displaySpawns.length > 0 && (
                  <div className="ei-section">
                    <div className="ei-section-title" style={{ color: theme.accent }}>
                      <Leaf size={13} />
                      <span>{lang === 'cs' ? 'Divocí Pokémoni' : 'Featured Spawns'}</span>
                    </div>
                    <div className="ei-spawns-grid">
                      {displaySpawns.slice(0, activePart === 'spawns' ? 24 : 12).map((s: any, i: number) => {
                        const name = getPokeName(s);
                        return (
                          <div key={i} className="ei-spawn-item">
                            <EditableImage
                              src={resolveImage(s?.image, event.eventType, name)}
                              alt={name}
                              onChange={() => {}}
                              isEditing={false}
                              className="ei-spawn-img"
                              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                              pokemonName={name}
                            />
                            <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                            {s?.isShinyAvailable && <span className="ei-shiny-dot">✨</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              {/* Debuts */}
              {displayDebuts.length > 0 && (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: theme.accent }}>
                    <Sparkles size={13} />
                    <span>{lang === 'cs' ? 'Debuty Pokémonů' : 'Pokémon Debuts'}</span>
                  </div>
                  <div className="ei-spawns-grid">
                    {displayDebuts.map((d: any, di: number) => {
                      const name = typeof d?.name === 'object' ? (d.name.en || d.name.cs) : (d?.name || '');
                      return (
                        <div key={di} className="ei-spawn-item">
                          <EditableImage
                            src={resolveImage(d?.image, event.eventType, name)}
                            alt={name}
                            onChange={() => {}}
                            isEditing={false}
                            className="ei-spawn-img"
                            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                            pokemonName={name}
                          />
                          <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                          <span className="ei-new-badge" style={{ background: theme.accentLight, color: theme.accent }}>NEW</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ════════════════════════════════════════════════════════════════════════
              PART 3: ALL MEGA RAIDS & RAID ROTATION ON ONE INFOGRAPHIC
          ════════════════════════════════════════════════════════════════════════ */}
          {(activePart === 'all' || activePart === 'raids') && (megaRaids.length > 0 || otherRaids.length > 0) && (
            <div className="ei-section">
              <div className="ei-section-title" style={{ color: '#ef4444' }}>
                <Swords size={14} />
                <span>{lang === 'cs' ? 'Mega Raidy a Raidové Bitvy' : 'Mega Raids & Raid Bosses'}</span>
              </div>

              {/* Mega Raids in single cohesive cards */}
              {megaRaids.length > 0 && (
                <div className="ei-mega-grid">
                  {megaRaids.map((megaBoss: any, mi: number) => {
                    const bossName = typeof megaBoss === 'string' ? megaBoss : megaBoss.name;
                    const counters = findRaidCounters(bossName);
                    const weaknesses = counters?.weaknesses || getWeaknessesForPokemon(bossName);
                    const types = counters ? [] : getPokemonTypesByName(bossName);
                    const diffInfo = getBossDifficultyInfo(bossName, 'mega', undefined, counters?.difficultyTier, undefined, lang);
                    const diffTier = diffInfo.difficultyTier;
                    const diffBg = diffTier === 'solo' ? 'rgba(52, 211, 153, 0.2)' : diffTier === 'duo' ? 'rgba(56, 189, 248, 0.2)' : diffTier === 'hard-group' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(251, 146, 60, 0.2)';
                    const diffColor = diffTier === 'solo' ? '#34d399' : diffTier === 'duo' ? '#38bdf8' : diffTier === 'hard-group' ? '#f87171' : '#fb923c';

                    return (
                      <div key={mi} className="ei-mega-card">
                        <div className="ei-mega-header">
                          <div className="ei-mega-avatar-wrap">
                            <EditableImage
                              src={resolveImage(megaBoss?.image, 'raid', bossName)}
                              alt={bossName}
                              onChange={() => {}}
                              isEditing={false}
                              className="ei-mega-avatar"
                              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName)}
                              pokemonName={bossName}
                            />
                            {megaBoss?.canBeShiny !== false && <span className="ei-shiny-dot">✨</span>}
                          </div>
                          <div className="ei-mega-info">
                            <span className="ei-mega-name">{getPokemonName(bossName, lang)}</span>
                            <div className="ei-mega-types">
                              {types.map((t, ti) => (
                                <span key={ti} style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1' }}>{t}</span>
                              ))}
                              <span style={{ fontSize: '9.5px', padding: '1px 5px', borderRadius: '4px', background: diffBg, color: diffColor, fontWeight: 800 }}>
                                {diffInfo.recLabel || diffTier.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CP & Stats */}
                        {counters && (
                          <div className="ei-mega-details-row">
                            <span className="ei-mega-cp-label">100% IV CP:</span>
                            <span className="ei-mega-cp-value">{counters.maxCp} <span style={{ opacity: 0.7, fontSize: '9.5px' }}>({counters.maxBoostedCp} WB)</span></span>
                          </div>
                        )}

                        {/* Weaknesses */}
                        <div className="ei-mega-weaknesses">
                          <span style={{ fontWeight: 700, fontSize: '10.5px' }}>{lang === 'cs' ? 'Slabiny:' : 'Weak:'}</span>
                          <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                            {weaknesses.slice(0, 4).map((w, wi) => (
                              <span key={wi} className="ei-weakness-pill">{w}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Other 5-star / Shadow Bosses */}
              {otherRaids.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {lang === 'cs' ? 'Legendární & Ostatní Raidy' : 'Legendary & Other Raids'}
                  </span>
                  <div className="ei-spawns-grid" style={{ marginTop: '6px' }}>
                    {otherRaids.map((ob: any, obi: number) => {
                      const name = ob.name || '';
                      return (
                        <div key={obi} className="ei-spawn-item">
                          <EditableImage
                            src={resolveImage(ob.image, 'raid', name)}
                            alt={name}
                            onChange={() => {}}
                            isEditing={false}
                            className="ei-spawn-img"
                            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                            pokemonName={name}
                          />
                          <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                          <span className="ei-new-badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171' }}>{ob.tier || '5★'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════════
              PART 4: RESEARCH, EGG POOLS & EXCLUSIVE ATTACKS
          ════════════════════════════════════════════════════════════════════════ */}
          {(activePart === 'all' || activePart === 'research') && (
            <>
              {/* Featured Attacks */}
              {displayFeaturedAttacks.length > 0 && (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: '#ec4899' }}>
                    <Zap size={13} />
                    <span>{lang === 'cs' ? 'Exkluzivní Speciální Útoky při Evoluci' : 'Featured Evolution Attacks'}</span>
                  </div>
                  <div className="ei-bonuses-list">
                    {displayFeaturedAttacks.map((att: any, ai: number) => {
                      const desc = att.description ? getLocalizedText(att.description, lang) : `${att.pokemonName} získá útok ${att.moveName}`;
                      return (
                        <div key={ai} className="ei-bonus-row" style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}>
                          <span className="ei-bonus-icon">⚡</span>
                          <span className="ei-bonus-text">
                            <strong>{att.pokemonName}</strong> → <em>{att.moveName}</em> ({desc})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Egg Pools */}
              {displayEggs.length > 0 && (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: theme.accent }}>
                    <EggSvg size={13} />
                    <span>{lang === 'cs' ? 'Líhnutí Vajíček (Egg Hatch Pool)' : 'Egg Hatch Pools'}</span>
                  </div>
                  {displayEggs.map((egg: any, ei: number) => {
                    const dist = typeof egg?.distance === 'string' ? egg.distance : getLocalizedText(egg?.distance, lang);
                    return (
                      <div key={ei} className="ei-egg-group">
                        <div className="ei-egg-label" style={{ color: theme.accent }}>
                          <EggSvg size={11} />
                          <span>{dist}</span>
                        </div>
                        <div className="ei-spawns-grid">
                          {(egg.contents || []).map((p: any, pi: number) => {
                            const name = typeof p === 'string' ? p : getPokeName(p);
                            return (
                              <div key={pi} className="ei-spawn-item">
                                <EditableImage
                                  src={resolveImage(p?.image, event.eventType, name)}
                                  alt={name}
                                  onChange={() => {}}
                                  isEditing={false}
                                  className="ei-spawn-img"
                                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                                  pokemonName={name}
                                />
                                <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                                {p?.isShinyAvailable && <span className="ei-shiny-dot">✨</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Field Research */}
              {displayResearch.length > 0 && (
                <div className="ei-section">
                  <div className="ei-section-title" style={{ color: theme.accent }}>
                    <Search size={13} />
                    <span>{lang === 'cs' ? 'Field Research Úkoly' : 'Field Research Tasks'}</span>
                  </div>
                  <div className="ei-research-list">
                    {displayResearch.slice(0, activePart === 'research' ? 8 : 4).map((r: any, ri: number) => {
                      const taskText = getLocalizedText(r?.task || r?.text || r, lang);
                      const rewardText = r?.reward ? getLocalizedText(r.reward?.text || r.reward, lang) : '';
                      return (
                        <div key={ri} className="ei-research-row" style={{ borderColor: `${theme.accent}30` }}>
                          <span className="ei-research-task">{taskText}</span>
                          {rewardText && <span className="ei-research-reward">→ {rewardText}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="ei-footer">
          <div className="ei-footer-brand" style={{ color: theme.accent }}>
            <ShieldCheck size={15} />
            <span>
              <EditableText value={editor.getTextOverride('footerBrand', 'pogoevents.app')} onChange={(v) => editor.setTextOverride('footerBrand', v)} isEditing={editor.isEditing} />
            </span>
          </div>
          <div className="ei-footer-tip">
            <EditableText value={editor.getTextOverride('footerTip', lang === 'cs' ? 'Podrobnosti na pogoevents.app' : 'Full details at pogoevents.app')} onChange={(v) => editor.setTextOverride('footerTip', v)} isEditing={editor.isEditing} />
          </div>
        </div>
      </div>

      {/* ── Action Buttons Row ── */}
      <div className="ei-actions-row" style={{ marginTop: '12px' }}>
        {isExtensive && (
          <button
            className="ei-download-secondary-btn"
            onClick={handleDownloadAllParts}
            disabled={isExporting}
          >
            <FolderArchive size={16} />
            <span>{lang === 'cs' ? 'Stáhnout všechny části' : 'Download All Parts'}</span>
          </button>
        )}

        <button
          className={`ei-download-btn ${exportSuccess ? 'success' : ''}`}
          onClick={handleDownloadCurrent}
          disabled={isExporting}
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`, boxShadow: `0 4px 14px ${theme.accentGlow}` }}
        >
          {exportSuccess ? (
            <><Check size={17} />{lang === 'cs' ? 'Uloženo!' : 'Saved!'}</>
          ) : isExporting ? (
            <><div className="ei-btn-spinner" />{lang === 'cs' ? 'Generuji...' : 'Generating...'}</>
          ) : (
            <><Download size={17} />{isExtensive && activePart !== 'all' ? (lang === 'cs' ? `Stáhnout tuto část (${activePart})` : `Download Part (${activePart})`) : (lang === 'cs' ? 'Stáhnout Infografiku' : 'Download Infographic')}</>
          )}
        </button>
      </div>
    </div>
  );
};
