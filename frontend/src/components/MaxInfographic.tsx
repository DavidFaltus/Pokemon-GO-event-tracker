import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Activity } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, getBasePokemonNames } from '../utils/imageResolver';
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

  const locale = 'en-US';

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

// Calculate Max Particle (MP) Costs by Tier based on exact user specification:
// 1-Star: 250 MP, 2-Star: 400 MP, 3-Star: 400 MP, 5-Star (Legendary): 800 MP, 6-Star (Gigantamax): 800 MP
export function getMaxBattleMpCost(eventName: string, isGigantamax: boolean): string {
  const lower = eventName.toLowerCase();
  if (lower.includes('eternatus') || lower.includes('eternamax')) return '800 MP';
  if (isGigantamax || lower.includes('6-star') || lower.includes('5-star') || lower.includes('legendary')) return '800 MP';
  if (lower.includes('2-star') || lower.includes('3-star') || lower.includes('4-star')) return '400 MP';
  if (lower.includes('1-star')) return '250 MP';
  return '400 MP';
}

// Calculate Max Battle XP Scaling by Tier based on exact user specification:
// 1-Star: 5,000 XP, 2-Star: 6,000 XP, 3-Star: 7,500 XP, 4-Star: 10,000 XP, 5-Star: 15,000 XP, 6-Star (Gigantamax): 25,000 XP, 6-Star (Eternamax Eternatus): 50,000 XP
export function getMaxBattleXpReward(eventName: string, isGigantamax: boolean): string {
  const lower = eventName.toLowerCase();
  if (lower.includes('eternatus') || lower.includes('eternamax')) return '50,000 XP';
  if (isGigantamax || lower.includes('6-star')) return '25,000 XP';
  if (lower.includes('5-star') || lower.includes('legendary')) return '15,000 XP';
  if (lower.includes('4-star')) return '10,000 XP';
  if (lower.includes('3-star')) return '7,500 XP';
  if (lower.includes('2-star')) return '6,000 XP';
  if (lower.includes('1-star')) return '5,000 XP';
  return '10,000 XP';
}

export const MaxInfographic: React.FC<MaxInfographicProps> = ({ event }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Extract Max Boss details
  let bossName = "";

  if (event.extraData?.raidbattles?.bosses?.[0]) {
    const b = event.extraData.raidbattles.bosses[0];
    bossName = typeof b === 'string' ? b : b.name;
  }

  if (!bossName) {
    const knownNames = getBasePokemonNames();
    const eventNameLower = event.name.toLowerCase();
    for (const p of knownNames) {
      if (eventNameLower.includes(p.toLowerCase())) {
        bossName = p;
        break;
      }
    }
  }

  if (!bossName) {
    bossName = event.name
      .replace(/during\s+max\s+monday/gi, '')
      .replace(/during/gi, '')
      .replace(/max\s*monday/gi, '')
      .replace(/max\s*battles?/gi, '')
      .replace(/dynamax/gi, '')
      .replace(/gigantamax/gi, '')
      .trim() || "Max Boss";
  }

  const pokemonImg = getPokemonImage(bossName);
  const isGigantamax = event.name.toLowerCase().includes('gigantamax');
  const canBeShiny = true;

  // Format dates & times cleanly
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, 'en');

  // Exact Tier MP & XP values
  const mpCost = getMaxBattleMpCost(event.name, isGigantamax);
  const xpReward = getMaxBattleXpReward(event.name, isGigantamax);

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
      link.download = `pogo_max_${bossName.toLowerCase()}_4x5.png`;
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
      <div className="max-poster-container" ref={posterRef}>
        <div className="max-poster-glow-top"></div>

        {/* Header */}
        <div className="max-poster-header">
          <div className="max-poster-badge">
            <Activity size={14} className="max-icon-pulse" />
            <span>
              {isGigantamax ? 'GIGANTAMAX BATTLE' : 
               event.eventType === 'max-monday' || event.name.toLowerCase().includes('monday') ? 'MAX MONDAY' : 
               'DYNAMAX MAX BATTLE'}
            </span>
          </div>
          <h2 className="max-poster-title">{getPokemonName(bossName, 'en')}</h2>
          
          <div className="max-poster-time-bar">
            <div className="max-time-item">
              <Calendar size={14} />
              <span>{dateStr}</span>
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="max-time-divider">•</div>
                <div className="max-time-item">
                  <Clock size={14} />
                  <span>{timeStr}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="max-poster-main">
          {/* 1. Max Boss Showcase (Normal & Shiny Sprites Side-by-Side at the top) */}
          <div className="max-poke-showcase">
            <div className="max-sprites-pair">
              <div className="max-sprite-box">
                <img 
                  src={resolveImage(pokemonImg, event.eventType, bossName, false)} 
                  alt={bossName} 
                  className="max-poke-sprite"
                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName, false)}
                />
                <span className="sprite-tag">Normal</span>
              </div>
              {canBeShiny && (
                <div className="max-sprite-box">
                  <img 
                    src={resolveImage(pokemonImg, event.eventType, bossName, true)} 
                    alt={`${bossName} Shiny`} 
                    className="max-poke-sprite shiny-glow"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName, true)}
                  />
                  <span className="sprite-tag shiny">✨ Shiny</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Event Info Box (Moved directly below Pokemon photos) */}
          <div className="max-details-box">
            <div className="max-details-header">
              <Zap size={16} />
              <span>POWER SPOT & MAX PARTICLES</span>
            </div>

            <div className="max-details-row">
              <div className="max-detail-item">
                <img
                  src={
                    mpCost === '800 MP'
                      ? 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/mp_pack_mulit.png'
                      : 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/mp_pack.png'
                  }
                  alt="MP Pack"
                  className="max-mp-pack-img"
                />
                <div>
                  <span className="max-detail-label">MP COST:</span>
                  <span className="max-detail-val">{mpCost}</span>
                </div>
              </div>

              <div className="max-detail-item highlight">
                <div>
                  <span className="max-detail-label highlight">XP REWARD:</span>
                  <span className="max-detail-val highlight">{xpReward}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Shiny Rate Card (Single line horizontal box) */}
          <div className="max-shiny-rate-card">
            <Sparkles size={15} style={{ color: '#f472b6' }} />
            <span>
              SHINY RATE: <strong>{canBeShiny ? '~1 in 500 (0.2% Chance) ✨' : 'Not Available 🚫'}</strong>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="max-poster-footer">
          <div className="max-footer-left">
            <ShieldCheck size={16} className="max-shield-icon" />
            <span>pogoevents.app</span>
          </div>
          <span>Pokémon GO Event Tracker</span>
        </div>
      </div>

      <div className="max-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`max-download-btn ${downloadSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloadSuccess ? (
            <>
              <Check size={18} />
              Saved PNG!
            </>
          ) : downloading ? (
            <>
              <div className="btn-spinner"></div>
              Generating Image (4:5)...
            </>
          ) : (
            <>
              <Download size={18} />
              Download Infographic (4:5)
            </>
          )}
        </button>
      </div>
    </div>
  );
};
