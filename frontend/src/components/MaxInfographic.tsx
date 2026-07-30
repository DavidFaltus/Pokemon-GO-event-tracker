import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Shield, Flame, Activity } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import './MaxInfographic.css';

interface MaxInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
}

// Converts image URL to Base64 Data URL via Express backend proxy
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

// Formats date & time range for single day and multi-day events
export function formatEventDateRange(startInput: string | Date, endInput: string | Date, lang: Language) {
  const start = new Date(startInput);
  const end = new Date(endInput);

  const isSameDay = start.getFullYear() === end.getFullYear() &&
                    start.getMonth() === end.getMonth() &&
                    start.getDate() === end.getDate();

  const locale = lang === 'cs' ? 'cs-CZ' : lang === 'ja' ? 'ja-JP' : 'en-US';

  if (isSameDay) {
    const dateStr = start.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeStr = `${start.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`;
    return { dateStr, timeStr, isMultiDay: false };
  } else {
    const startDateStr = start.toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric'
    });
    const endDateStr = end.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const startTimeStr = start.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const endTimeStr = end.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

    const dateStr = `${startDateStr} (${startTimeStr}) — ${endDateStr} (${endTimeStr})`;
    return { dateStr, timeStr: '', isMultiDay: true };
  }
}

export const MaxInfographic: React.FC<MaxInfographicProps> = ({ event, lang }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Extract Max Boss details
  let bossName = "Dynamax Pokémon";
  const match = event.name.match(/(?:max\s+monday|dynamax|gigantamax):\s*([^\.]+)/i) || event.name.match(/([A-Za-z-'\s]+?)\s+(?:max\s+battle|max\s+monday)/i);
  if (match) {
    bossName = match[1].trim();
  } else {
    bossName = event.name.replace(/max\s*monday/gi, "").replace(/max\s*battles?/gi, "").trim() || "Max Boss";
  }

  const pokemonImg = getPokemonImage(bossName);
  const isGigantamax = event.name.toLowerCase().includes('gigantamax');

  // Format dates & times cleanly for multi-day support
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, lang);

  // Download handler
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
        backgroundColor: '#0d1117'
      });

      const link = document.createElement('a');
      link.download = `pogo_max_${bossName.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate max battle image:", err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  return (
    <div className="max-infographic-wrapper">
      <div className="max-infographic-actions">
        <button 
          className={`max-download-btn ${downloadSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloadSuccess ? (
            <>
              <Check size={18} />
              {lang === 'cs' ? 'Uloženo!' : 'Saved!'}
            </>
          ) : downloading ? (
            <>
              <div className="btn-spinner"></div>
              {lang === 'cs' ? 'Generuji obrázek...' : 'Generating image...'}
            </>
          ) : (
            <>
              <Download size={18} />
              {lang === 'cs' ? 'Stáhnout Infografiku' : 'Download Infographic'}
            </>
          )}
        </button>
      </div>

      <div className="max-poster-container" ref={posterRef}>
        <div className="max-poster-glow-top"></div>

        {/* Header */}
        <div className="max-poster-header">
          <div className="max-poster-badge">
            <Activity size={14} className="max-icon-pulse" />
            <span>{isGigantamax ? 'GIGANTAMAX BATTLE' : event.eventType === 'max-monday' || event.name.toLowerCase().includes('monday') ? 'MAX MONDAY (18:00 - 19:00)' : 'DYNAMAX MAX BATTLE'}</span>
          </div>
          <h2 className="max-poster-title">{getPokemonName(bossName, lang)}</h2>
          
          <div className="max-poster-time-bar">
            <div className="max-time-item">
              <Calendar size={15} />
              <span>{dateStr}</span>
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="max-time-divider">•</div>
                <div className="max-time-item">
                  <Clock size={15} />
                  <span>{timeStr}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="max-poster-main">
          {/* Max Boss Showcase */}
          <div className="max-poke-card">
            <div className="max-image-halo"></div>
            <img 
              src={resolveImage(pokemonImg, event.eventType, bossName)} 
              alt={bossName} 
              className="max-poke-img"
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName)}
            />
            <h3 className="max-poke-name">{getPokemonName(bossName, lang)}</h3>
            
            <div className="max-shiny-chip">
              <Sparkles size={13} />
              <span>✨ Max Battle Encounter</span>
            </div>
          </div>

          {/* Max Particle & Spot Box */}
          <div className="max-details-box">
            <div className="max-details-header">
              <Zap size={16} />
              <span>{lang === 'cs' ? 'POWER SPOT & MAX PARTICLES' : 'POWER SPOT & MAX PARTICLES'}</span>
            </div>

            <div className="max-details-row">
              <div className="max-detail-item">
                <span className="max-detail-label">{lang === 'cs' ? 'Vstupní Max Particles:' : 'Cost Max Particles:'}</span>
                <span className="max-detail-val">800 MP</span>
              </div>
              <div className="max-detail-item highlight">
                <span className="max-detail-label">{lang === 'cs' ? 'Odměna za výhru:' : 'Battle Reward:'}</span>
                <span className="max-detail-val highlight">10,000 XP + MP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-poster-footer">
          <div className="max-footer-left">
            <ShieldCheck size={16} className="max-shield-icon" />
            <span>pogoevents.app</span>
          </div>
        </div>
      </div>
    </div>
  );
};
