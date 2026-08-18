import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Check, ShieldCheck, Gift, Leaf, Search, Star, Egg } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, fetchImageAsBase64 } from '../utils/imageResolver';
import { getFontEmbedCSS, disableTextClipping } from '../utils/exportPoster';
import { getPokemonName } from '../utils/pokemonTranslator';
import { formatEventDateRange } from './MaxInfographic';
import { getLocalizedText } from './EventCard';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import './EventInfographic.css';

interface EventInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  /** Merged special-event details (bonuses, spawns, eggs, research, debuts) */
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
  const type = eventType.toLowerCase();
  const name = eventName.toLowerCase();

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
      icon: <Sparkles size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'RAID DAY' : 'RAID DAY',
    };
  }
  if (type === 'event') {
    return {
      accent: '#22d3ee',
      accentLight: 'rgba(34,211,238,0.13)',
      accentGlow: 'rgba(34,211,238,0.22)',
      badge: 'rgba(34,211,238,0.13)',
      icon: <Sparkles size={14} />,
      badgeLabel: (l) => l === 'cs' ? 'POKÉMON GO EVENT' : 'POKÉMON GO EVENT',
    };
  }
  // Default: major event / other
  return {
    accent: '#60a5fa',
    accentLight: 'rgba(96,165,250,0.15)',
    accentGlow: 'rgba(96,165,250,0.25)',
    badge: 'rgba(96,165,250,0.15)',
    icon: <Sparkles size={14} />,
    badgeLabel: (l) => l === 'cs' ? 'POKÉMON GO EVENT' : 'POKÉMON GO EVENT',
  };
}

// ── Small Egg SVG ─────────────────────────────────────────────────────────────
const EggSvg = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 100 120" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M50 10 C20 10, 10 60, 10 85 C10 105, 30 115, 50 115 C70 115, 90 105, 90 85 C90 60, 80 10, 50 10 Z" fill="currentColor" stroke="none" />
  </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────────
export const EventInfographic: React.FC<EventInfographicProps> = ({ event, lang, specialDetails, isAdmin = false }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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
  const communitydaySpawns: any[] = extraData?.communityday?.spawns || [];

  const allSpawns = spawns.length > 0 ? spawns : communitydaySpawns;

  const displaySpawns = editor.getListOverride('spawns', allSpawns);
  const displayBonuses = editor.getListOverride('bonuses', bonuses);
  const displayEggs = editor.getListOverride('eggs', eggs);
  const displayResearch = editor.getListOverride('research', research);
  const displayDebuts = editor.getListOverride('debuts', debuts);

  const totalSections = [displaySpawns.length > 0, displayBonuses.length > 0, displayEggs.length > 0, displayResearch.length > 0, displayDebuts.length > 0].filter(Boolean).length;

  // ── Download ──────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!posterRef.current || downloading) return;
    setDownloading(true);
    editor.setIsExporting(true);
    await new Promise(r => setTimeout(r, 100)); // allow render to hide edit UI

    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];
    let restoreClipping: (() => void) | null = null;
    try {
      const imgs = Array.from(posterRef.current.querySelectorAll('img'));
      await Promise.all(
        imgs.map(async (img) => {
          const origSrc = img.src;
          if (origSrc && !origSrc.startsWith('data:')) {
            originalSrcs.push({ img, origSrc });
            try {
              const b64 = await fetchImageAsBase64(origSrc, img);
              if (b64 && b64.startsWith('data:')) {
                img.src = b64;
              } else {
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              }
            } catch {
              img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
          }
        })
      );
      if (typeof document !== 'undefined' && (document as any).fonts) {
        await (document as any).fonts.ready;
      }
      if (!posterRef.current) return;

      if (posterRef.current) {
        restoreClipping = disableTextClipping(posterRef.current);
      }
      const fontEmbedCSS = await getFontEmbedCSS();
      const rect = posterRef.current.getBoundingClientRect();
      const w = Math.round(rect.width) || posterRef.current.offsetWidth || 480;
      const h = Math.round(w * 1.25);
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: false,
        skipFonts: !fontEmbedCSS,
        fontEmbedCSS: fontEmbedCSS || undefined,
        width: w,
        height: h,
        canvasWidth: 1080,
        canvasHeight: 1350,
        pixelRatio: 1080 / w,
        backgroundColor: '#0d1117',
        style: {
          width: `${w}px`,
          height: `${h}px`,
          maxWidth: `${w}px`,
          minWidth: `${w}px`,
          fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: '0',
          transform: 'none',
        }
      });
      const link = document.createElement('a');
      link.download = `pogo_event_${event.eventID}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 500);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('EventInfographic: download failed', err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => { img.src = origSrc; });
      if (restoreClipping) {
        restoreClipping();
      }
      setDownloading(false);
      editor.setIsExporting(false);
    }
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
      {/* Poster */}
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
        <div className={`ei-body sections-${totalSections}`}>
          {/* Main sections grid */}
          <div className="ei-sections">

            {/* Spawns */}
            {displaySpawns.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Leaf size={13} />
                  <span>
                    <EditableText value={editor.getTextOverride('spawnsTitle', lang === 'cs' ? 'Výskyt Pokémonů' : 'Featured Spawns')} onChange={(v) => editor.setTextOverride('spawnsTitle', v)} isEditing={editor.isEditing} />
                  </span>
                </div>
                <div className="ei-spawns-grid">
                  {displaySpawns.slice(0, 12).map((s: any, i: number) => {
                    const name = getPokeName(s);
                    return (
                      <div key={i} className="ei-spawn-item">
                        {editor.isEditing && (
                          <button className="ei-remove-item-btn" onClick={() => editor.removeListItem('spawns', allSpawns, i)}>×</button>
                        )}
                        <EditableImage
                          src={editor.getImageOverride(`spawnImage-${i}`, resolveImage(s?.image, event.eventType, name))}
                          alt={name}
                          onChange={(url) => editor.setImageOverride(`spawnImage-${i}`, url)}
                          isEditing={editor.isEditing}
                          className="ei-spawn-img"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                          pokemonName={name}
                        />
                        <span className="ei-spawn-name">
                          <EditableText value={editor.getTextOverride(`spawnName-${i}`, getPokemonName(name, lang))} onChange={(v) => editor.setTextOverride(`spawnName-${i}`, v)} isEditing={editor.isEditing} />
                        </span>
                        {s?.isShinyAvailable && <span className="ei-shiny-dot">✨</span>}
                      </div>
                    );
                  })}
                  {editor.isEditing && (
                    <button className="ei-add-item-btn" onClick={() => editor.addListItem('spawns', allSpawns, { name: 'New Spawn' })}>+</button>
                  )}
                </div>
              </div>
            )}

            {/* Egg pool */}
            {displayEggs.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <EggSvg size={13} />
                  <span>
                    <EditableText value={editor.getTextOverride('eggsTitle', lang === 'cs' ? 'Líhnutí Vajíček' : 'Egg Hatches')} onChange={(v) => editor.setTextOverride('eggsTitle', v)} isEditing={editor.isEditing} />
                  </span>
                </div>
                {displayEggs.map((egg: any, ei: number) => {
                  const dist = typeof egg?.distance === 'string' ? egg.distance : getLocalizedText(egg?.distance, lang);
                  return (
                    <div key={ei} className="ei-egg-group">
                      <div className="ei-egg-label" style={{ color: theme.accent }}>
                        <EggSvg size={11} />
                        <EditableText value={editor.getTextOverride(`eggDist-${ei}`, dist)} onChange={(v) => editor.setTextOverride(`eggDist-${ei}`, v)} isEditing={editor.isEditing} />
                        {editor.isEditing && (
                          <button className="ei-remove-item-btn" style={{ marginLeft: 8 }} onClick={() => editor.removeListItem('eggs', eggs, ei)}>×</button>
                        )}
                      </div>
                      <div className="ei-spawns-grid">
                        {(egg.contents || []).slice(0, 8).map((p: any, pi: number) => {
                          const name = typeof p === 'string' ? p : getPokeName(p);
                          return (
                            <div key={pi} className="ei-spawn-item">
                              <EditableImage
                                src={editor.getImageOverride(`eggImage-${ei}-${pi}`, resolveImage(p?.image, event.eventType, name))}
                                alt={name}
                                onChange={(url) => editor.setImageOverride(`eggImage-${ei}-${pi}`, url)}
                                isEditing={editor.isEditing}
                                className="ei-spawn-img"
                                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                                pokemonName={name}
                              />
                              <span className="ei-spawn-name">
                                <EditableText value={editor.getTextOverride(`eggName-${ei}-${pi}`, getPokemonName(name, lang))} onChange={(v) => editor.setTextOverride(`eggName-${ei}-${pi}`, v)} isEditing={editor.isEditing} />
                              </span>
                              {p?.isShinyAvailable && <span className="ei-shiny-dot">✨</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                {editor.isEditing && (
                  <button className="ei-add-item-btn" onClick={() => editor.addListItem('eggs', eggs, { distance: '5 km', contents: [] })}>+</button>
                )}
              </div>
            )}

            {/* Bonuses */}
            {displayBonuses.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Gift size={13} />
                  <span>
                    <EditableText value={editor.getTextOverride('bonusesTitle', lang === 'cs' ? 'Aktivní Bonusy' : 'Active Bonuses')} onChange={(v) => editor.setTextOverride('bonusesTitle', v)} isEditing={editor.isEditing} />
                  </span>
                </div>
                <div className="ei-bonuses-list">
                  {displayBonuses.slice(0, 8).map((b: any, bi: number) => (
                    <div key={bi} className="ei-bonus-row" style={{ borderColor: `${theme.accent}30` }}>
                      {editor.isEditing && (
                        <button className="ei-remove-item-btn" onClick={() => editor.removeListItem('bonuses', bonuses, bi)}>×</button>
                      )}
                      <span className="ei-bonus-icon">
                        <EditableText value={editor.getTextOverride(`bonusIcon-${bi}`, getBonusIcon(b))} onChange={(v) => editor.setTextOverride(`bonusIcon-${bi}`, v)} isEditing={editor.isEditing} />
                      </span>
                      <span className="ei-bonus-text">
                        <EditableText value={editor.getTextOverride(`bonus-${bi}`, getBonusText(b))} onChange={(v) => editor.setTextOverride(`bonus-${bi}`, v)} isEditing={editor.isEditing} multiline={true} />
                      </span>
                    </div>
                  ))}
                  {editor.isEditing && (
                    <button className="ei-add-item-btn" onClick={() => editor.addListItem('bonuses', bonuses, { text: 'New Bonus', icon: '🎁' })}>+</button>
                  )}
                </div>
              </div>
            )}

            {/* Research */}
            {displayResearch.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Search size={13} />
                  <span>
                    <EditableText value={editor.getTextOverride('researchTitle', lang === 'cs' ? 'Výzkumné úkoly' : 'Field Research')} onChange={(v) => editor.setTextOverride('researchTitle', v)} isEditing={editor.isEditing} />
                  </span>
                </div>
                <div className="ei-research-list">
                  {displayResearch.slice(0, 5).map((r: any, ri: number) => {
                    const taskText = getLocalizedText(r?.task || r?.text || r, lang);
                    const rewardText = r?.reward ? getLocalizedText(r.reward?.text || r.reward, lang) : '';
                    return (
                      <div key={ri} className="ei-research-row" style={{ borderColor: `${theme.accent}30` }}>
                        {editor.isEditing && (
                          <button className="ei-remove-item-btn" onClick={() => editor.removeListItem('research', research, ri)}>×</button>
                        )}
                        <span className="ei-research-task">
                          <EditableText value={editor.getTextOverride(`researchTask-${ri}`, taskText)} onChange={(v) => editor.setTextOverride(`researchTask-${ri}`, v)} isEditing={editor.isEditing} multiline={true} />
                        </span>
                        {(rewardText || editor.isEditing) && (
                          <span className="ei-research-reward">→ 
                            <EditableText value={editor.getTextOverride(`researchReward-${ri}`, rewardText)} onChange={(v) => editor.setTextOverride(`researchReward-${ri}`, v)} isEditing={editor.isEditing} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                  {editor.isEditing && (
                    <button className="ei-add-item-btn" onClick={() => editor.addListItem('research', research, { text: 'New Task', reward: { text: 'Reward' } })}>+</button>
                  )}
                </div>
              </div>
            )}

            {/* Debuts */}
            {displayDebuts.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Sparkles size={13} />
                  <span>
                    <EditableText value={editor.getTextOverride('debutsTitle', lang === 'cs' ? 'Debuty Pokémonů' : 'Pokémon Debuts')} onChange={(v) => editor.setTextOverride('debutsTitle', v)} isEditing={editor.isEditing} />
                  </span>
                </div>
                <div className="ei-spawns-grid">
                  {displayDebuts.slice(0, 6).map((d: any, di: number) => {
                    const name = typeof d?.name === 'object' ? (d.name.en || d.name.cs) : (d?.name || '');
                    return (
                      <div key={di} className="ei-spawn-item">
                        {editor.isEditing && (
                          <button className="ei-remove-item-btn" onClick={() => editor.removeListItem('debuts', debuts, di)}>×</button>
                        )}
                        <EditableImage
                          src={editor.getImageOverride(`debutImage-${di}`, resolveImage(d?.image, event.eventType, name))}
                          alt={name}
                          onChange={(url) => editor.setImageOverride(`debutImage-${di}`, url)}
                          isEditing={editor.isEditing}
                          className="ei-spawn-img"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                          pokemonName={name}
                        />
                        <span className="ei-spawn-name">
                          <EditableText value={editor.getTextOverride(`debutName-${di}`, getPokemonName(name, lang))} onChange={(v) => editor.setTextOverride(`debutName-${di}`, v)} isEditing={editor.isEditing} />
                        </span>
                        <span className="ei-new-badge" style={{ background: theme.accentLight, color: theme.accent }}>NEW</span>
                      </div>
                    );
                  })}
                  {editor.isEditing && (
                    <button className="ei-add-item-btn" onClick={() => editor.addListItem('debuts', debuts, { name: 'New Debut' })}>+</button>
                  )}
                </div>
              </div>
            )}

            {/* Fallback — no data yet */}
            {displaySpawns.length === 0 && displayBonuses.length === 0 && displayEggs.length === 0 && displayResearch.length === 0 && displayDebuts.length === 0 && (
              <div className="ei-no-data">
                <Sparkles size={28} style={{ color: theme.accent, opacity: 0.5 }} />
                <p>{lang === 'cs' ? 'Detaily budou brzy k dispozici.' : 'Details will be available soon.'}</p>
              </div>
            )}
          </div>
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

      {/* Download button */}
      <div className="ei-actions" style={{ marginTop: '12px' }}>
        <button
          className={`ei-download-btn ${downloadSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={downloading}
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`, boxShadow: `0 4px 14px ${theme.accentGlow}` }}
        >
          {downloadSuccess ? (
            <><Check size={17} />{lang === 'cs' ? 'Uloženo!' : 'Saved!'}</>
          ) : downloading ? (
            <><div className="ei-btn-spinner" />{lang === 'cs' ? 'Generuji...' : 'Generating...'}</>
          ) : (
            <><Download size={17} />{lang === 'cs' ? 'Stáhnout Infografiku' : 'Download Infographic'}</>
          )}
        </button>
      </div>
    </div>
  );
};
