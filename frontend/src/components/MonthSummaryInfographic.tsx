import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Calendar, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { API_BASE_URL } from '../config';
import {
  filterEventsForMonth,
  categorizeMonthlyEvents,
  generateWeeklyTimeline,
  cleanEventName,
  getSpotlightBonus,
  getWeekMondayToSundayRange
} from '../utils/infographics';
import './MonthSummaryInfographic.css';

interface MonthSummaryInfographicProps {
  events: EventData[];
  lang: Language;
  targetDate?: Date;
  initialOffset?: number;
  onClose?: () => void;
}

const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Extracts a clean Pokemon name from various event titles.
 */
const extractPokemonNameFromTitle = (title: string): string | null => {
  const clean = title.toLowerCase();
  const words = clean
    .replace(/spotlight hour/g, '')
    .replace(/community day/g, '')
    .replace(/raid hour/g, '')
    .replace(/raid day/g, '')
    .replace(/max monday/g, '')
    .replace(/dynamax/g, '')
    .replace(/gigantamax/g, '')
    .replace(/mega/g, '')
    .replace(/shadow/g, '')
    .replace(/rotation/g, '')
    .replace(/raids/g, '')
    .replace(/raid/g, '')
    .replace(/ticket/g, '')
    .replace(/bounty/g, '')
    .replace(/[^a-z\s-]/g, '')
    .trim()
    .split(/\s+/);

  const candidate = words.find(w => w.length > 2);
  return candidate || null;
};

/**
 * Generates uniform 3D render image URL from PokemonDB
 */
const getPokemonDbUrl = (name: string, isShiny = false): string => {
  const cleanName = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
    
  return `https://img.pokemondb.net/sprites/home/${isShiny ? 'shiny' : 'normal'}/${cleanName}.png`;
};

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

export const MonthSummaryInfographic: React.FC<MonthSummaryInfographicProps> = ({
  events,
  lang,
  targetDate = new Date(),
  initialOffset = 1,
  onClose
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [summaryMode, setSummaryMode] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [monthlySlideIndex, setMonthlySlideIndex] = useState<number>(0);
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(initialOffset);

  const activeDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + selectedMonthOffset, 1);
  const monthIndex = activeDate.getMonth();
  const yearNum = activeDate.getFullYear();
  const monthName = MONTH_NAMES_EN[monthIndex];

  const currentMonthIndex = targetDate.getMonth();
  const nextMonthIndex = (currentMonthIndex + 1) % 12;

  const monthlyFilteredEvents = filterEventsForMonth(events, monthIndex, yearNum);
  const categorized = categorizeMonthlyEvents(monthlyFilteredEvents);

  const slides = [
    { key: 'communityDays', data: categorized.communityDays, theme: 'green', title: 'Community Days & Major Events' },
    { key: 'raids', data: categorized.raids, theme: 'blue', title: 'Legendary & Mega Raids' },
    { key: 'spotlights', data: categorized.spotlights, theme: 'orange', title: 'Spotlight Hours' },
    { key: 'raidHours', data: categorized.raidHours, theme: 'blue', title: 'Raid Hours' },
    { key: 'dynamax', data: categorized.dynamax, theme: 'red', title: 'Dynamax Battles' }
  ].filter(slide => slide.data.events.length > 0);

  const weeklyTimeline = generateWeeklyTimeline(monthlyFilteredEvents, selectedWeekNum, monthIndex, yearNum);

  const getWeeklyDateRangeString = () => {
    const { monday, sunday } = getWeekMondayToSundayRange(selectedWeekNum, monthIndex, yearNum);
    const startMonth = MONTH_NAMES_EN[monday.getMonth()];
    const endMonth = MONTH_NAMES_EN[sunday.getMonth()];
    
    if (startMonth === endMonth) {
      return `${startMonth} ${monday.getDate()} – ${sunday.getDate()}, ${yearNum}`;
    }
    return `${startMonth} ${monday.getDate()} – ${endMonth} ${sunday.getDate()}, ${yearNum}`;
  };

  const formatDateShort = (dateObj: Date) => {
    return `${MONTH_NAMES_EN[dateObj.getMonth()].slice(0, 3)} ${dateObj.getDate()}`;
  };

  const formatEventTime = (startStr: string, endStr: string) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    
    const durationMs = e.getTime() - s.getTime();
    const isSingleDay = durationMs < (24 * 60 * 60 * 1000);
    
    if (isSingleDay) {
      const formatTimePart = (d: Date) => {
        let hrs = d.getHours();
        const mins = d.getMinutes().toString().padStart(2, '0');
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        return `${hrs}:${mins} ${ampm}`;
      };
      return `${formatTimePart(s)} – ${formatTimePart(e)}`;
    }
    return null;
  };

  const getEventVisualSrc = (item: EventData) => {
    const pokemonName = extractPokemonNameFromTitle(item.name);
    if (pokemonName) {
      return getPokemonDbUrl(pokemonName);
    }
    return resolveImage(item.image, item.eventType, item.name);
  };
  const renderSpotlightBonusSubline = (item: EventData) => {
    const bonus = getSpotlightBonus(item);
    if (!bonus) return null;

    let icon = '🎁';
    const lower = bonus.toLowerCase();
    if (lower.includes('stardust')) icon = '✨';
    else if (lower.includes('xp')) icon = '⭐';
    else if (lower.includes('candy')) icon = '🍬';

    return (
      <div className="spotlight-bonus-subline">
        <span className="bonus-icon">{icon}</span>
        <span className="bonus-text">{bonus}</span>
      </div>
    );
  };

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
              const base64 = await fetchImageAsBase64(origSrc);
              if (base64 && base64.startsWith('data:')) {
                img.src = base64;
              }
            } catch (e) {}
          }
        })
      );

      if (typeof document !== 'undefined' && document.fonts) {
        try {
          await document.fonts.ready;
        } catch (e) {}
      }

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: false,
        skipFonts: false,
        pixelRatio: 2.5,
        width: 1080,
        height: 1350,
        style: {
          transform: 'none',
          width: '1080px',
          height: '1350px'
        },
        backgroundColor: '#090d16'
      });

      const link = document.createElement('a');
      const filenameSuffix = summaryMode === 'weekly' 
        ? `week_${selectedWeekNum}` 
        : slides[monthlySlideIndex]?.key || 'overview';
      
      link.download = `pogo_${summaryMode}_${filenameSuffix}_${monthName.toLowerCase()}_${yearNum}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate infographic:', err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  const currentSlide = slides[monthlySlideIndex];

  const renderSingleEventDetail = (item: EventData, key: string) => {
    const pokemonName = extractPokemonNameFromTitle(item.name);
    const normalUrl = pokemonName ? getPokemonDbUrl(pokemonName, false) : resolveImage(item.image, item.eventType, item.name);
    const shinyUrl = pokemonName ? getPokemonDbUrl(pokemonName, true) : null;
    const cleanedName = cleanEventName(item.name);
    const dateRangeStr = `${formatDateShort(new Date(item.start))} - ${formatDateShort(new Date(item.end))}`;
    const eventTime = formatEventTime(item.start, item.end);

    if (key === 'goPass') {
      return (
        <div className="single-event-detail go-pass-detail">
          <div className="detail-badge-header">MONTHLY GO PASS</div>
          <h3 className="detail-title">{item.name}</h3>
          <span className="detail-date-pill">{dateRangeStr}</span>

          <div className="go-pass-perks-grid">
            <div className="perk-card">
              <span className="perk-icon">🪙</span>
              <div className="perk-text">
                <strong>Daily PokéCoin Bounty</strong>
                <span>Daily login bonus coins</span>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">🎟️</span>
              <div className="perk-text">
                <strong>Extra Daily Raid Pass</strong>
                <span>1 additional free pass per day</span>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">✨</span>
              <div className="perk-text">
                <strong>15,000 XP & 10,000 Stardust</strong>
                <span>Milestone research rewards</span>
              </div>
            </div>
            <div className="perk-card">
              <span className="perk-icon">🎁</span>
              <div className="perk-text">
                <strong>Featured Encounter</strong>
                <span>Exclusive Timed Research reward</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="single-event-detail community-day-detail">
        <h3 className="detail-pokemon-name">{cleanedName}</h3>
        <div className="detail-time-badge">
          <span>{dateRangeStr}</span>
          {eventTime && <span className="highlight-time"> • {eventTime}</span>}
        </div>

        <div className="pokemon-showcase-container">
          <div className="showcase-card">
            <img 
              src={normalUrl} 
              alt={cleanedName} 
              className="showcase-img"
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, cleanedName)}
            />
            <span className="showcase-label">Normal</span>
          </div>
          {shinyUrl && (
            <div className="showcase-card shiny-card">
              <div className="shiny-sparkle-icon">✨</div>
              <img 
                src={shinyUrl} 
                alt={`${cleanedName} Shiny`} 
                className="showcase-img"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="showcase-label">Shiny</span>
            </div>
          )}
        </div>

        <div className="detail-bonuses-list">
          <div className="bonus-pill">✨ Increased Shiny Encounter Rate</div>
          <div className="bonus-pill">🍬 2× Catch Candy & 3× Catch Stardust</div>
          <div className="bonus-pill">⏳ 3-Hour Lures & Incense Duration</div>
          <div className="bonus-pill">⚔️ Featured Exclusive Attack</div>
        </div>
      </div>
    );
  };

  return (
    <div className="month-summary-container-inline">
      <div className="month-summary-controls-wrapper">
        {/* Top Toolbar */}
        <div className="infographic-toolbar">
          <div className="toolbar-group">
            <button
              type="button"
              className={`month-select-btn ${summaryMode === 'weekly' ? 'active' : ''}`}
              onClick={() => setSummaryMode('weekly')}
            >
              📅 {lang === 'cs' ? 'Týdenní (1 Slide)' : 'Weekly (1 Slide)'}
            </button>
            <button
              type="button"
              className={`month-select-btn ${summaryMode === 'monthly' ? 'active' : ''}`}
              onClick={() => {
                setSummaryMode('monthly');
                setMonthlySlideIndex(0);
              }}
            >
              🗓️ {lang === 'cs' ? 'Měsíční Slidy' : 'Monthly Slides'}
            </button>
          </div>

          <div className="toolbar-group">
            <button
              className={`month-select-btn ${selectedMonthOffset === 0 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(0)}
            >
              {MONTH_NAMES_EN[currentMonthIndex]}
            </button>
            <button
              className={`month-select-btn ${selectedMonthOffset === 1 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(1)}
            >
              ✨ {MONTH_NAMES_EN[nextMonthIndex]}
            </button>
          </div>
        </div>

        {/* Sub-toolbar */}
        {summaryMode === 'weekly' ? (
          <div className="weekly-week-selector">
            <span className="selector-label">
              {lang === 'cs' ? 'Týden:' : 'Week:'}
            </span>
            {[1, 2, 3, 4, 5].map((w) => (
              <button
                key={w}
                type="button"
                className={`month-select-btn ${selectedWeekNum === w ? 'active' : ''}`}
                onClick={() => setSelectedWeekNum(w)}
              >
                W{w}
              </button>
            ))}
          </div>
        ) : (
          slides.length > 1 && (
            <div className="monthly-carousel-controls">
              <button
                type="button"
                className="month-select-btn"
                disabled={monthlySlideIndex === 0}
                onClick={() => setMonthlySlideIndex(prev => Math.max(0, prev - 1))}
              >
                <ArrowLeft size={16} />
              </button>
              <span className="carousel-indicator">
                {currentSlide?.title} ({monthlySlideIndex + 1} / {slides.length})
              </span>
              <button
                type="button"
                className="month-select-btn"
                disabled={monthlySlideIndex === slides.length - 1}
                onClick={() => setMonthlySlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )
        )}
      </div>

      <div className="month-summary-modal-body">
        {/* Printable Poster DOM Element - Fixed 4:5 Aspect Ratio */}
        <div 
          className={`month-summary-poster aspect-4-5 mode-${summaryMode} theme-${summaryMode === 'monthly' ? currentSlide?.theme : 'weekly'}`} 
          ref={posterRef}
        >
          {/* Header */}
          <div className="poster-header">
            <div className="brand-logo">POGOEVENTS.APP</div>
            <div className="poster-title-area">
              {summaryMode === 'weekly' ? (
                <>
                  <span className="poster-header-badge">WEEKLY SUMMARY</span>
                  <h2>{getWeeklyDateRangeString()}</h2>
                </>
              ) : (
                <>
                  <span className="poster-header-badge">{currentSlide?.title.toUpperCase()}</span>
                  <h2>{monthName.toUpperCase()}</h2>
                </>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="poster-content">
            {summaryMode === 'weekly' ? (
              <div className={`weekly-timeline-grid days-count-${weeklyTimeline.length}`}>
                {weeklyTimeline.map((day, idx) => {
                  const eventTime = formatEventTime(day.event!.start, day.event!.end);
                  return (
                    <div 
                      key={idx} 
                      className={`weekly-day-row event-${day.event?.eventType}`}
                    >
                      <div className="day-info">
                        <span className="day-name">{day.dayName.slice(0, 3)}</span>
                        <span className="day-date">{formatDateShort(day.date)}</span>
                      </div>
                      
                      <div className="event-info">
                        <div className="event-badge-type">
                          {day.event?.eventType.replace(/-/g, ' ')}
                          {eventTime && <span className="event-hours-range"> • {eventTime}</span>}
                        </div>
                        <span className="event-title-text">{cleanEventName(day.event!.name)}</span>
                        {renderSpotlightBonusSubline(day.event!)}
                      </div>

                      <div className="event-visual">
                        <img 
                          src={getEventVisualSrc(day.event!)} 
                          alt={day.event!.name}
                          className="event-visual-icon"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, day.event!.name)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              currentSlide ? (
                currentSlide.data.events.length === 1 ? (
                  renderSingleEventDetail(currentSlide.data.events[0], currentSlide.key)
                ) : (
                  <div className="monthly-slide-events">
                    <div className={`slide-list events-count-${Math.min(currentSlide.data.events.length, 6)}`}>
                      {currentSlide.data.events.slice(0, 6).map((item) => {
                        const dateRangeStr = `${formatDateShort(new Date(item.start))} - ${formatDateShort(new Date(item.end))}`;
                        const eventTime = formatEventTime(item.start, item.end);
                        return (
                          <div key={item.eventID} className="monthly-event-card">
                            <div className="card-image-holder">
                              <img 
                                src={getEventVisualSrc(item)} 
                                alt={item.name} 
                                className="card-main-image"
                                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.name)}
                              />
                            </div>
                            <div className="card-text-holder">
                              <span className="card-date-badge">
                                {dateRangeStr}
                                {eventTime && <span className="event-hours-range"> • {eventTime}</span>}
                              </span>
                              <h4 className="card-event-name">{cleanEventName(item.name)}</h4>
                              {renderSpotlightBonusSubline(item)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              ) : (
                <div className="poster-empty-state">
                  <Calendar size={32} style={{ color: 'var(--text-muted)', marginBottom: 8 }} />
                  <p>No confirmed events in this category yet.</p>
                </div>
              )
            )}
          </div>

          {/* Footer */}
          <div className="poster-footer">
            <span className="brand-url">pogoevents.app</span>
            <span className="credits">Not affiliated with Niantic or Nintendo</span>
          </div>
        </div>

        {/* Download Action Button */}
        <button className="download-poster-btn" onClick={handleDownload} disabled={downloading}>
          {downloadSuccess ? (
            <>
              <Check size={20} />
              Saved to Downloads!
            </>
          ) : downloading ? (
            <>
              <div className="spinner"></div>
              Exporting 1080x1350 PNG...
            </>
          ) : (
            <>
              <Download size={20} />
              {summaryMode === 'weekly' ? 'Download Weekly Poster (PNG)' : `Download ${currentSlide?.title || 'Slide'} (PNG)`}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
