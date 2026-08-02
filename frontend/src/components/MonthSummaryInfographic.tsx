import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Calendar, Swords, Shield, Clock, X, Check, Egg, Trophy } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { API_BASE_URL } from '../config';
import './MonthSummaryInfographic.css';

interface MonthSummaryInfographicProps {
  events: EventData[];
  lang: Language;
  targetDate?: Date;
  onClose?: () => void;
}

const MONTH_NAMES: Record<Language, string[]> = {
  cs: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
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
  onClose
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Month selection state (allow switching between selected month and next month)
  const [selectedMonthOffset, setSelectedMonthOffset] = useState<number>(0);

  const activeDate = new Date(targetDate.getFullYear(), targetDate.getMonth() + selectedMonthOffset, 1);
  const monthIndex = activeDate.getMonth();
  const yearNum = activeDate.getFullYear();
  const monthName = MONTH_NAMES[lang]?.[monthIndex] || MONTH_NAMES['en'][monthIndex];

  // Filter events belonging to the active month
  const monthEvents = events.filter((e) => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    return (
      (start.getMonth() === monthIndex && start.getFullYear() === yearNum) ||
      (end.getMonth() === monthIndex && end.getFullYear() === yearNum)
    );
  });

  // Categorize events for the poster
  const communityDays = monthEvents.filter(
    (e) => e.eventType === 'community-day' || e.eventType === 'hatch-day' || e.eventType === 'research-day'
  );
  const raidEvents = monthEvents.filter((e) => e.eventType === 'raid-battles' || e.eventType === 'raid-day');
  const spotlightHours = monthEvents.filter((e) => e.eventType === 'pokemon-spotlight-hour' || e.eventType === 'raid-hour');
  const otherEvents = monthEvents.filter(
    (e) =>
      !communityDays.includes(e) &&
      !raidEvents.includes(e) &&
      !spotlightHours.includes(e)
  );

  const formatDateShort = (isoString: string) => {
    const d = new Date(isoString);
    const day = d.getDate();
    const monthStr = d.getMonth() + 1;
    return `${day}. ${monthStr}.`;
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

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: false,
        skipFonts: true,
        pixelRatio: 2,
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

  return (
    <div className="month-summary-modal-overlay">
      <div className="month-summary-modal-content">
        <div className="month-summary-modal-header">
          <h3>
            <Sparkles size={18} style={{ color: 'var(--accent-color, #38bdf8)' }} />
            {lang === 'cs' ? 'Infografika měsíce' : 'Monthly Overview Poster'}
          </h3>

          <div className="month-summary-modal-controls">
            <button
              className={`month-select-btn ${selectedMonthOffset === 0 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(0)}
            >
              {MONTH_NAMES[lang]?.[targetDate.getMonth()]}
            </button>
            <button
              className={`month-select-btn ${selectedMonthOffset === 1 ? 'active' : ''}`}
              onClick={() => setSelectedMonthOffset(1)}
            >
              {MONTH_NAMES[lang]?.[(targetDate.getMonth() + 1) % 12]}
            </button>
            {onClose && (
              <button className="month-summary-close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="month-summary-modal-body">
          {/* Printable Poster DOM Element */}
          <div className="month-summary-poster" ref={posterRef}>
            <div className="poster-header">
              <span className="poster-header-badge">Pokémon GO Event Tracker</span>
              <h2>{`${monthName.toUpperCase()} ${yearNum}`}</h2>
            </div>

            {/* Section 1: Community Days & Major Events */}
            {communityDays.length > 0 && (
              <div className="poster-section">
                <div className="poster-section-title">
                  <Sparkles size={14} />
                  {lang === 'cs' ? 'Community Days & Speciální Akce' : 'Community Days & Special Events'}
                </div>
                <div className="poster-grid">
                  {communityDays.map((item) => (
                    <div key={item.eventID} className="poster-card">
                      <div className="poster-card-icon-wrapper">
                        <img
                          src={resolveImage(item.image, item.eventType, item.name)}
                          alt={item.name}
                          className="poster-card-icon"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.name)}
                        />
                      </div>
                      <div className="poster-card-info">
                        <span className="poster-card-date">{formatDateShort(item.start)}</span>
                        <span className="poster-card-name">{item.name}</span>
                        <span className="poster-card-sub">{item.heading || item.eventType}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: 5-Star & Mega Raid Bosses */}
            {raidEvents.length > 0 && (
              <div className="poster-section">
                <div className="poster-section-title">
                  <Swords size={14} />
                  {lang === 'cs' ? 'Legendární & Mega Raidy' : 'Legendary & Mega Raids'}
                </div>
                <div className="poster-grid">
                  {raidEvents.map((item) => (
                    <div key={item.eventID} className="poster-card">
                      <div className="poster-card-icon-wrapper">
                        <img
                          src={resolveImage(item.image, item.eventType, item.name)}
                          alt={item.name}
                          className="poster-card-icon"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.name)}
                        />
                      </div>
                      <div className="poster-card-info">
                        <span className="poster-card-date">{`${formatDateShort(item.start)} – ${formatDateShort(item.end)}`}</span>
                        <span className="poster-card-name">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Spotlight & Raid Hours */}
            {spotlightHours.length > 0 && (
              <div className="poster-section">
                <div className="poster-section-title">
                  <Clock size={14} />
                  {lang === 'cs' ? 'Spotlight Hours & Raid Hours' : 'Spotlight & Raid Hours'}
                </div>
                <div className="poster-grid">
                  {spotlightHours.map((item) => (
                    <div key={item.eventID} className="poster-card">
                      <div className="poster-card-icon-wrapper">
                        <img
                          src={resolveImage(item.image, item.eventType, item.name)}
                          alt={item.name}
                          className="poster-card-icon"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.name)}
                        />
                      </div>
                      <div className="poster-card-info">
                        <span className="poster-card-date">{formatDateShort(item.start)}</span>
                        <span className="poster-card-name">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Other Active Events */}
            {otherEvents.length > 0 && (
              <div className="poster-section">
                <div className="poster-section-title">
                  <Calendar size={14} />
                  {lang === 'cs' ? 'Další události měsíce' : 'Other Monthly Events'}
                </div>
                <div className="poster-grid">
                  {otherEvents.slice(0, 6).map((item) => (
                    <div key={item.eventID} className="poster-card">
                      <div className="poster-card-icon-wrapper">
                        <img
                          src={resolveImage(item.image, item.eventType, item.name)}
                          alt={item.name}
                          className="poster-card-icon"
                          onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, item.name)}
                        />
                      </div>
                      <div className="poster-card-info">
                        <span className="poster-card-date">{`${formatDateShort(item.start)} – ${formatDateShort(item.end)}`}</span>
                        <span className="poster-card-name">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Poster Footer */}
            <div className="poster-footer">
              <span className="poster-footer-brand">pogoevents.app</span>
              <span>{lang === 'cs' ? 'Sledovač událostí Pokémon GO' : 'Pokémon GO Event Tracker'}</span>
            </div>
          </div>

          {/* Download Action Button */}
          <button className="download-poster-btn" onClick={handleDownload} disabled={downloading}>
            {downloadSuccess ? (
              <>
                <Check size={20} />
                {lang === 'cs' ? 'Uloženo jako PNG!' : 'Saved as PNG!'}
              </>
            ) : downloading ? (
              <>
                <div className="spinner" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}></div>
                {lang === 'cs' ? 'Generuji obrázek...' : 'Generating Image...'}
              </>
            ) : (
              <>
                <Download size={20} />
                {lang === 'cs' ? 'Stáhnout infografiku (PNG)' : 'Download Poster (PNG)'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
