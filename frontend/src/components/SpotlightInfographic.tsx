import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Star } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import { formatEventDateRange } from './MaxInfographic';
import './SpotlightInfographic.css';

interface SpotlightInfographicProps {
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

export const SpotlightInfographic: React.FC<SpotlightInfographicProps> = ({ event }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const spotlightData = event.extraData?.spotlight;
  const pokeName = spotlightData?.name || event.name.replace(/spotlight\s*hour/gi, '').trim();
  const pokemonImg = spotlightData?.image || getPokemonImage(pokeName);
  const canBeShiny = spotlightData?.canBeShiny ?? true;
  const rawBonus = spotlightData?.bonus || '';

  // Format dates & times cleanly in English
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, 'en');

  // Translate bonus details
  const getBonusText = (b: string) => {
    const lower = b.toLowerCase();
    if (lower.includes('stardust')) {
      return {
        title: '2× Catch Stardust',
        iconUrl: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Today%20View/TodayView_Icon_Stardust.png',
        iconEmoji: '🧪',
        color: '#f39c12'
      };
    }
    if (lower.includes('xp') && lower.includes('evolve')) {
      return {
        title: '2× Evolve XP',
        iconUrl: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Today%20View/TodayView_Icon_Evolve.png',
        iconEmoji: '⚡',
        color: '#9b59b6'
      };
    }
    if (lower.includes('xp')) {
      return {
        title: '2× Catch XP',
        iconUrl: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Today%20View/TodayView_Icon_XP.png',
        iconEmoji: '⭐',
        color: '#3498db'
      };
    }
    if (lower.includes('candy') && lower.includes('transfer')) {
      return {
        title: '2× Transfer Candy',
        iconUrl: '',
        iconEmoji: '🍬',
        color: '#e67e22'
      };
    }
    if (lower.includes('candy')) {
      return {
        title: '2× Catch Candy',
        iconUrl: '',
        iconEmoji: '🍬',
        color: '#e67e22'
      };
    }
    return {
      title: b || '2× Catch Bonus',
      iconUrl: '',
      iconEmoji: '🎁',
      color: '#f1c40f'
    };
  };

  const bonusInfo = getBonusText(rawBonus);

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
      link.download = `pogo_spotlight_${pokeName.toLowerCase()}_4x5.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate spotlight image:", err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  return (
    <div className="spotlight-infographic-wrapper">
      <div className="spotlight-poster-container" ref={posterRef}>
        <div className="spotlight-poster-glow-top"></div>

        {/* Header */}
        <div className="spotlight-poster-header">
          <div className="spotlight-poster-badge">
            <Star size={14} className="spotlight-star-icon" fill="currentColor" />
            <span>SPOTLIGHT HOUR</span>
          </div>
          <h2 className="spotlight-poster-title">{getPokemonName(pokeName, 'en')}</h2>
          
          <div className="spotlight-poster-time-bar">
            <div className="spotlight-time-item">
              <Calendar size={14} />
              <span>{dateStr}</span>
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="spotlight-time-divider">•</div>
                <div className="spotlight-time-item">
                  <Clock size={14} />
                  <span>{timeStr}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="spotlight-poster-main">
          {/* 1. Featured Pokemon Showcase (Normal & Shiny Sprites Side-by-Side, exact same sizes) */}
          <div className="spotlight-poke-showcase">
            <div className="spotlight-sprites-pair">
              <div className="spotlight-sprite-box">
                <img 
                  src={resolveImage(pokemonImg, event.eventType, pokeName, false)} 
                  alt={pokeName} 
                  className="spotlight-poke-sprite"
                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName, false)}
                />
                <span className="sprite-tag">Normal</span>
              </div>
              {canBeShiny && (
                <div className="spotlight-sprite-box">
                  <img 
                    src={resolveImage(pokemonImg, event.eventType, pokeName, true)} 
                    alt={`${pokeName} Shiny`} 
                    className="spotlight-poke-sprite shiny-glow"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName, true)}
                  />
                  <span className="sprite-tag shiny">✨ Shiny</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. Active Hour Bonus Card (Moved directly below Pokemon photos) */}
          <div className="spotlight-bonus-card" style={{ borderColor: bonusInfo.color }}>
            <div className="spotlight-bonus-header">
              <Zap size={16} style={{ color: bonusInfo.color }} />
              <span>ACTIVE HOUR BONUS</span>
            </div>
            <div className="spotlight-bonus-val-box" style={{ backgroundColor: `${bonusInfo.color}18` }}>
              {bonusInfo.iconUrl ? (
                <img src={bonusInfo.iconUrl} alt={bonusInfo.title} className="spotlight-bonus-img" />
              ) : (
                <span className="spotlight-bonus-emoji">{bonusInfo.iconEmoji}</span>
              )}
              <div className="spotlight-bonus-title" style={{ color: bonusInfo.color }}>{bonusInfo.title}</div>
            </div>
            <div className="spotlight-bonus-desc">
              Applies during the entire hour for all caught Pokémon.
            </div>
          </div>

          {/* 3. Shiny Rate Card (Clean single-line box) */}
          <div className="spotlight-shiny-rate-card">
            <Sparkles size={15} style={{ color: '#fbbf24' }} />
            <span>
              SHINY RATE: <strong>{canBeShiny ? '~1 in 500 (0.2% Chance) ✨' : 'Not Available 🚫'}</strong>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="spotlight-poster-footer">
          <div className="spotlight-footer-left">
            <ShieldCheck size={16} className="spotlight-shield-icon" />
            <span>pogoevents.app</span>
          </div>
          <span>Pokémon GO Event Tracker</span>
        </div>
      </div>

      <div className="spotlight-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`spotlight-download-btn ${downloadSuccess ? 'success' : ''}`}
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
