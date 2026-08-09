import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Calendar, Swords, Clock, X, Check } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, extractEventPokemonNames } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { API_BASE_URL } from '../config';
import './MonthSummaryInfographic.css';

interface MonthSummaryInfographicProps {
  events: EventData[];
  lang: Language;
  targetDate?: Date;
  initialOffset?: number;
  onClose?: () => void;
}

const MONTH_NAMES_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

/**
 * Gets all normal (non-shiny) Pokémon image URLs for a given event.
 * Returns an array of { name, url } for every featured Pokémon.
 */
const getAllEventPokemonImages = (item: EventData): { name: string; url: string }[] => {
  const names = extractEventPokemonNames({
    name: item.name,
    eventType: item.eventType,
    extraData: item.extraData
  });

  if (names.length > 0) {
    return names.map(n => ({ name: n, url: getPokemonImage(n) }));
  }

  // Fallback: use the event image itself
  return [{ name: item.name, url: resolveImage(item.image, item.eventType, item.name) }];
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

  // View Mode: 'weekly' (1 panel) vs 'monthly' (3 panels)
  const [summaryMode, setSummaryMode] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1); // 1 to 5
  const [monthlyPanelTab, setMonthlyPanelTab] = useState<number>(1); // 1, 2, 3

  // Month selection state (0 = current month, 1 = next month)
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(initialOffset);

  const activeDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + selectedMonthOffset, 1);
  const monthIndex = activeDate.getMonth();
  const yearNum = activeDate.getFullYear();
  const monthName = MONTH_NAMES_EN[monthIndex];

  const currentMonthIndex = targetDate.getMonth();
  const nextMonthIndex = (currentMonthIndex + 1) % 12;

  // Filter events belonging to or active in the selected month
  const startOfMonth = new Date(yearNum, monthIndex, 1, 0, 0, 0, 0);
  const endOfMonth = new Date(yearNum, monthIndex + 1, 0, 23, 59, 59, 999);

  // Week Date Ranges
  const weekStartDay = (selectedWeekNum - 1) * 7 + 1;
  const weekEndDay = Math.min(selectedWeekNum * 7, new Date(yearNum, monthIndex + 1, 0).getDate());
  const startOfWeek = new Date(yearNum, monthIndex, weekStartDay, 0, 0, 0, 0);
  const endOfWeek = new Date(yearNum, monthIndex, weekEndDay, 23, 59, 59, 999);

  const rawEvents = summaryMode === 'weekly'
    ? events.filter((e) => {
        const s = new Date(e.start);
        const end = new Date(e.end);
        return s <= endOfWeek && end >= startOfWeek;
      })
    : events.filter((e) => {
        const s = new Date(e.start);
        const end = new Date(e.end);
        return s <= endOfMonth && end >= startOfMonth;
      });

  // Categorize events for the poster
  const communityDays = rawEvents.filter(
    (e) =>
      e.eventType === 'community-day' ||
      e.eventType === 'hatch-day' ||
      e.eventType === 'research-day' ||
      e.eventType === 'max-mondays' ||
      e.eventType === 'wild-area' ||
      e.eventType === 'go-fest' ||
      e.eventType === 'safari-zone'
  );

  const raidEvents = rawEvents.filter(
    (e) =>
      e.eventType === 'raid-battles' ||
      e.eventType === 'raid-day' ||
      e.eventType === 'shadow-raid' ||
      e.eventType === 'mega-raid' ||
      e.eventType === 'primal-raid'
  );

  const spotlightHours = rawEvents.filter(
    (e) => e.eventType === 'pokemon-spotlight-hour' || e.eventType === 'raid-hour'
  );

  const otherEvents = rawEvents.filter(
    (e) =>
      !communityDays.includes(e) &&
      !raidEvents.includes(e) &&
      !spotlightHours.includes(e)
  );

  const formatDateShort = (isoString: string) => {
    const d = new Date(isoString);
    return `${MONTH_NAMES_EN[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
  };

  const formatDateRange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const sMonth = MONTH_NAMES_EN[s.getMonth()].slice(0, 3);
    const eMonth = MONTH_NAMES_EN[e.getMonth()].slice(0, 3);
    if (s.getDate() === e.getDate() && s.getMonth() === e.getMonth()) {
      return `${sMonth} ${s.getDate()}`;
    }
    if (s.getMonth() === e.getMonth()) {
      return `${sMonth} ${s.getDate()} – ${e.getDate()}`;
    }
    return `${sMonth} ${s.getDate()} – ${eMonth} ${e.getDate()}`;
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
        pixelRatio: 2,
        width: posterRef.current.offsetWidth,
        height: posterRef.current.offsetHeight,
        backgroundColor: '#0f172a'
      });

      const link = document.createElement('a');
      link.download = `pogo_events_${monthName.toLowerCase()}_${yearNum}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to generate month infographic:', err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  /**
   * Renders a single event row: event name (left-aligned header) with date (right-aligned),
   * followed by a row of all featured Pokémon sprites (normal versions only).
   */
  const renderEventRow = (item: EventData, showRange = false) => {
    const pokemonList = getAllEventPokemonImages(item);
    const dateLabel = showRange
      ? formatDateRange(item.start, item.end)
      : formatDateShort(item.start);

    return (
      <div key={item.eventID} className="poster-event-row">
        <div className="poster-event-header">
          <span className="poster-event-name">{item.name}</span>
          <span className="poster-event-date">{dateLabel}</span>
        </div>
        <div className="poster-event-pokemon-row">
          {pokemonList.map((poke, idx) => (
            <div key={`${poke.name}-${idx}`} className="poster-pokemon-sprite" title={poke.name}>
              <img
                src={poke.url}
                alt={poke.name}
                className="poster-pokemon-img"
                onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, poke.name)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="month-summary-container-inline">
      <div className="month-summary-controls-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginBottom: '16px' }}>
        {/* Top Toolbar: Mode Switcher & Month Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              className={`month-select-btn ${summaryMode === 'weekly' ? 'active' : ''}`}
              onClick={() => setSummaryMode('weekly')}
            >
              📅 {lang === 'cs' ? 'Týdenní Přehled (1 Panel)' : 'Weekly Overview (1 Panel)'}
            </button>
            <button
              type="button"
              className={`month-select-btn ${summaryMode === 'monthly' ? 'active' : ''}`}
              onClick={() => setSummaryMode('monthly')}
            >
              🗓️ {lang === 'cs' ? 'Měsíční Přehled (3 Panely)' : 'Monthly Overview (3 Panels)'}
            </button>
          </div>

          {/* Month Offset Picker */}
          <div className="month-summary-modal-controls">
            <button
              className={`month-select-btn ${selectedMonthOffset === 0 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(0)}
            >
              This Month ({MONTH_NAMES_EN[currentMonthIndex]})
            </button>
            <button
              className={`month-select-btn ${selectedMonthOffset === 1 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(1)}
            >
              ✨ Next Month ({MONTH_NAMES_EN[nextMonthIndex]})
            </button>
          </div>
        </div>

        {/* Sub-toolbar: Week Selector if Weekly Mode */}
        {summaryMode === 'weekly' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {lang === 'cs' ? 'Vyberte týden:' : 'Select Week:'}
            </span>
            {[1, 2, 3, 4, 5].map((w) => (
              <button
                key={w}
                type="button"
                className={`month-select-btn ${selectedWeekNum === w ? 'active' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                onClick={() => setSelectedWeekNum(w)}
              >
                Week {w}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="month-summary-modal-body" style={{ padding: 0 }}>
        {/* Printable Poster DOM Element */}
        <div className="month-summary-poster" ref={posterRef}>
          <div className="poster-header">
            <span className="poster-header-badge">
              {summaryMode === 'weekly' ? `WEEKLY OVERVIEW • WEEK ${selectedWeekNum}` : 'POKÉMON GO EVENT TRACKER'}
            </span>
            <h2>
              {summaryMode === 'weekly'
                ? `${monthName.toUpperCase()} ${weekStartDay}–${weekEndDay}, ${yearNum}`
                : `${monthName.toUpperCase()} ${yearNum}`}
            </h2>
          </div>

          {rawEvents.length === 0 ? (
            <div className="poster-empty-state">
              <Calendar size={32} style={{ color: 'var(--text-muted, #94a3b8)', marginBottom: 8 }} />
              <p>No confirmed events scheduled for this period yet.</p>
            </div>
          ) : (
            <>
              {/* Section 1: Community Days & Major Events */}
              {communityDays.length > 0 && (
                <div className="poster-section">
                  <div className="poster-section-title">
                    <Sparkles size={14} />
                    Community Days & Major Events
                  </div>
                  <div className="poster-events-list">
                    {communityDays.map((item) => renderEventRow(item, false))}
                  </div>
                </div>
              )}

              {/* Section 2: 5-Star & Mega Raid Bosses */}
              {raidEvents.length > 0 && (
                <div className="poster-section">
                  <div className="poster-section-title">
                    <Swords size={14} />
                    Legendary & Mega Raids
                  </div>
                  <div className="poster-events-list">
                    {raidEvents.map((item) => renderEventRow(item, true))}
                  </div>
                </div>
              )}

              {/* Section 3: Spotlight & Raid Hours */}
              {spotlightHours.length > 0 && (
                <div className="poster-section">
                  <div className="poster-section-title">
                    <Clock size={14} />
                    Spotlight & Raid Hours
                  </div>
                  <div className="poster-events-list">
                    {spotlightHours.map((item) => renderEventRow(item, false))}
                  </div>
                </div>
              )}

              {/* Section 4: Other Active Events */}
              {otherEvents.length > 0 && (
                <div className="poster-section">
                  <div className="poster-section-title">
                    <Calendar size={14} />
                    Other Events
                  </div>
                  <div className="poster-events-list">
                    {otherEvents.map((item) => renderEventRow(item, true))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Poster Footer */}
          <div className="poster-footer">
            <span className="poster-footer-brand">pogoevents.app</span>
            <span>Pokémon GO Event Tracker</span>
          </div>
        </div>

        {/* Download Action Button */}
        <button className="download-poster-btn" onClick={handleDownload} disabled={downloading} style={{ marginTop: '16px' }}>
          {downloadSuccess ? (
            <>
              <Check size={20} />
              Saved as PNG!
            </>
          ) : downloading ? (
            <>
              <div
                className="spinner"
                style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
              ></div>
              Generating Image...
            </>
          ) : (
            <>
              <Download size={20} />
              {summaryMode === 'weekly' ? 'Download Weekly Poster (PNG)' : 'Download Monthly Poster (PNG)'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
