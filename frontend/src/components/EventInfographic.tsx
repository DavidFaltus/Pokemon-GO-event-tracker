import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Check, ShieldCheck, Gift, Leaf, Search, Star, Egg } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import { formatEventDateRange } from './MaxInfographic';
import { getLocalizedText } from './EventCard';
import './EventInfographic.css';

interface EventInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  /** Merged special-event details (bonuses, spawns, eggs, research, debuts) */
  specialDetails?: any;
}

// Converts image URL to Base64 via backend proxy (same pattern as other infographics)
const fetchImageAsBase64 = async (url: string): Promise<string> => {
  if (!url || url.startsWith('data:')) return url;
  try {
    const proxyUrl = `${API_BASE_URL}/api/proxy-image?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return url;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string) || url);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
};

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
export const EventInfographic: React.FC<EventInfographicProps> = ({ event, lang, specialDetails }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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
  const raidBosses: any[] = extraData?.raidbattles?.bosses || [];

  const allSpawns = spawns.length > 0 ? spawns : communitydaySpawns;

  // Featured Pokémon — first spawn, first debut, or extracted from name
  const featured =
    allSpawns[0] ||
    (debuts[0] ? { name: typeof debuts[0].name === 'object' ? debuts[0].name.en : debuts[0].name, image: debuts[0].image } : null) ||
    (raidBosses[0] ? { name: raidBosses[0].name, image: raidBosses[0].image } : null) ||
    null;

  const hasFeatured = !!featured;
  const totalSections = [allSpawns.length > 0, bonuses.length > 0, eggs.length > 0, research.length > 0, debuts.length > 0].filter(Boolean).length;

  // ── Download ──────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!posterRef.current || downloading) return;
    setDownloading(true);
    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];
    try {
      const imgs = Array.from(posterRef.current.querySelectorAll('img'));
      await Promise.all(
        imgs.map(async (img) => {
          const origSrc = img.src;
          if (origSrc && !origSrc.startsWith('data:')) {
            originalSrcs.push({ img, origSrc });
            try {
              const b64 = await fetchImageAsBase64(origSrc);
              if (b64.startsWith('data:')) img.src = b64;
            } catch { /* ignore */ }
          }
        })
      );
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: false,
        skipFonts: true,
        pixelRatio: 2,
        backgroundColor: '#0d1117',
      });
      const link = document.createElement('a');
      link.download = `pogo_event_${event.eventID}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('EventInfographic: download failed', err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => { img.src = origSrc; });
      setDownloading(false);
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ei-wrapper">
      {/* Download button */}
      <div className="ei-actions">
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

      {/* Poster */}
      <div
        className="ei-poster"
        ref={posterRef}
        style={{ borderColor: `${theme.accent}55` }}
      >
        {/* Glow */}
        <div className="ei-glow-top" style={{ background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)` }} />

        {/* ── Header ── */}
        <div className="ei-header">
          <div className="ei-badge" style={{ background: theme.badge, color: theme.accent, borderColor: `${theme.accent}55` }}>
            {theme.icon}
            <span>{theme.badgeLabel(lang)}</span>
          </div>
          <h2 className="ei-title" style={{ backgroundImage: `linear-gradient(135deg, #ffffff 30%, ${theme.accent} 100%)` }}>
            {typeof event.name === 'object' ? getLocalizedText(event.name, lang) : event.name}
          </h2>
          <div className="ei-time-bar">
            <div className="ei-time-item"><Calendar size={14} /><span>{dateStr}</span></div>
            {!isMultiDay && timeStr && (
              <><div className="ei-time-sep">•</div><div className="ei-time-item"><Clock size={14} /><span>{timeStr}</span></div></>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className={`ei-body ${hasFeatured ? 'has-featured' : ''} sections-${totalSections}`}>

          {/* Featured Pokémon panel */}
          {hasFeatured && (
            <div className="ei-featured-card" style={{ borderColor: `${theme.accent}40`, background: `linear-gradient(135deg, rgba(13,17,23,0.95), ${theme.accentLight})` }}>
              <div className="ei-featured-halo" style={{ background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)` }} />
              <img
                src={resolveImage(featured.image, event.eventType, getPokeName(featured))}
                alt={getPokeName(featured)}
                className="ei-featured-img"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, getPokeName(featured))}
              />
              <div className="ei-featured-name">{getPokemonName(getPokeName(featured), lang)}</div>
              {featured.isShinyAvailable && (
                <div className="ei-shiny-chip" style={{ color: theme.accent, borderColor: `${theme.accent}55`, background: theme.accentLight }}>
                  <Sparkles size={11} />✨ Shiny
                </div>
              )}
            </div>
          )}

          {/* Right column — sections */}
          <div className="ei-sections">

            {/* Spawns */}
            {allSpawns.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Leaf size={13} />
                  <span>{lang === 'cs' ? 'Výskyt Pokémonů' : 'Featured Spawns'}</span>
                </div>
                <div className="ei-spawns-grid">
                  {allSpawns.slice(0, 12).map((s: any, i: number) => {
                    const name = getPokeName(s);
                    return (
                      <div key={i} className="ei-spawn-item">
                        <img
                          src={resolveImage(s?.image, event.eventType, name)}
                          alt={name}
                          className="ei-spawn-img"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                        />
                        <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                        {s?.isShinyAvailable && <span className="ei-shiny-dot">✨</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Egg pool */}
            {eggs.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <EggSvg size={13} />
                  <span>{lang === 'cs' ? 'Líhnutí Vajíček' : 'Egg Hatches'}</span>
                </div>
                {eggs.map((egg: any, ei: number) => {
                  const dist = typeof egg?.distance === 'string' ? egg.distance : getLocalizedText(egg?.distance, lang);
                  return (
                    <div key={ei} className="ei-egg-group">
                      <div className="ei-egg-label" style={{ color: theme.accent }}>
                        <EggSvg size={11} />{dist}
                      </div>
                      <div className="ei-spawns-grid">
                        {(egg.contents || []).slice(0, 8).map((p: any, pi: number) => {
                          const name = typeof p === 'string' ? p : getPokeName(p);
                          return (
                            <div key={pi} className="ei-spawn-item">
                              <img
                                src={resolveImage(p?.image, event.eventType, name)}
                                alt={name}
                                className="ei-spawn-img"
                                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
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

            {/* Bonuses */}
            {bonuses.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Gift size={13} />
                  <span>{lang === 'cs' ? 'Aktivní Bonusy' : 'Active Bonuses'}</span>
                </div>
                <div className="ei-bonuses-list">
                  {bonuses.slice(0, 8).map((b: any, bi: number) => (
                    <div key={bi} className="ei-bonus-row" style={{ borderColor: `${theme.accent}30` }}>
                      <span className="ei-bonus-icon">{getBonusIcon(b)}</span>
                      <span className="ei-bonus-text">{getBonusText(b)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Research */}
            {research.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Search size={13} />
                  <span>{lang === 'cs' ? 'Výzkumné úkoly' : 'Field Research'}</span>
                </div>
                <div className="ei-research-list">
                  {research.slice(0, 5).map((r: any, ri: number) => {
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

            {/* Debuts */}
            {debuts.length > 0 && (
              <div className="ei-section">
                <div className="ei-section-title" style={{ color: theme.accent }}>
                  <Sparkles size={13} />
                  <span>{lang === 'cs' ? 'Debuty Pokémonů' : 'Pokémon Debuts'}</span>
                </div>
                <div className="ei-spawns-grid">
                  {debuts.slice(0, 6).map((d: any, di: number) => {
                    const name = typeof d?.name === 'object' ? (d.name.en || d.name.cs) : (d?.name || '');
                    return (
                      <div key={di} className="ei-spawn-item">
                        <img
                          src={resolveImage(d?.image, event.eventType, name)}
                          alt={name}
                          className="ei-spawn-img"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, name)}
                        />
                        <span className="ei-spawn-name">{getPokemonName(name, lang)}</span>
                        <span className="ei-new-badge" style={{ background: theme.accentLight, color: theme.accent }}>NEW</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fallback — no data yet */}
            {allSpawns.length === 0 && bonuses.length === 0 && eggs.length === 0 && research.length === 0 && debuts.length === 0 && (
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
            <span>pogoevents.app</span>
          </div>
          <div className="ei-footer-tip">
            {lang === 'cs' ? 'Podrobnosti na pogoevents.app' : 'Full details at pogoevents.app'}
          </div>
        </div>
      </div>
    </div>
  );
};
