import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Clock, Calendar, Check, ShieldCheck, Flame, Skull, AlertTriangle } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { API_BASE_URL } from '../config';
import { formatEventDateRange } from './MaxInfographic';
import './RocketInfographic.css';

interface RocketInfographicProps {
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

export const RocketInfographic: React.FC<RocketInfographicProps> = ({ event, lang }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Extract Rocket Boss details
  let mainBoss = "Shadow Legendary";
  const match = event.name.match(/(?:shadow|takeover):\s*([^\.]+)/i) || event.name.match(/shadow\s+([A-Za-z-'\s]+)/i);
  if (match) {
    mainBoss = match[1].trim();
  } else {
    mainBoss = event.name.replace(/team\s*go\s*rocket/gi, "").replace(/takeover/gi, "").trim() || "Shadow Raid";
  }

  const pokemonImg = getPokemonImage(mainBoss);

  // Format dates & times cleanly supporting multi-day range
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
      link.download = `pogo_rocket_${mainBoss.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate rocket image:", err);
    } finally {
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      setDownloading(false);
    }
  };

  return (
    <div className="rocket-infographic-wrapper">
      <div className="rocket-poster-container" ref={posterRef}>
        <div className="rocket-poster-glow-top"></div>

        {/* Header */}
        <div className="rocket-poster-header">
          <div className="rocket-poster-badge">
            <Skull size={14} className="rocket-skull-icon" />
            <span>TEAM GO ROCKET TAKEOVER</span>
          </div>
          <h2 className="rocket-poster-title">{event.name}</h2>
          
          <div className="rocket-poster-time-bar">
            <div className="rocket-time-item">
              <Calendar size={15} />
              <span>{dateStr}</span>
            </div>
            {!isMultiDay && timeStr && (
              <>
                <div className="rocket-time-divider">•</div>
                <div className="rocket-time-item">
                  <Clock size={15} />
                  <span>{timeStr}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Section */}
        <div className="rocket-poster-main">
          {/* Giovanni & Shadow Boss Showcase */}
          <div className="rocket-poke-card">
            <div className="rocket-image-halo"></div>
            <img 
              src={resolveImage(pokemonImg, event.eventType, mainBoss)} 
              alt={mainBoss} 
              className="rocket-poke-img"
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, mainBoss)}
            />
            <h3 className="rocket-poke-name">{getPokemonName(mainBoss, lang)}</h3>
            
            <div className="rocket-shadow-chip">
              <Flame size={13} />
              <span>🔮 Shadow Boss</span>
            </div>
          </div>

          {/* Frustration TM Highlight Box */}
          <div className="rocket-tm-box">
            <div className="rocket-tm-header">
              <AlertTriangle size={16} />
              <span>{lang === 'cs' ? 'KLÍČOVÝ BONUS EVENTU' : 'KEY EVENT BONUS'}</span>
            </div>

            <div className="rocket-tm-content">
              <div className="rocket-tm-title">
                {lang === 'cs' ? '⚡ Odnaučte Frustration!' : '⚡ Forget Frustration!'}
              </div>
              <div className="rocket-tm-desc">
                {lang === 'cs' 
                  ? 'Použijte Charged TM k odnaučení Frustration u Shadow Pokémonů během tohoto eventu!' 
                  : 'Use a Charged TM to help Shadow Pokémon forget the Charged Attack Frustration!'}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rocket-poster-footer">
          <div className="rocket-footer-left">
            <ShieldCheck size={16} className="rocket-shield-icon" />
            <span>pogoevents.app</span>
          </div>
        </div>
      </div>

      <div className="rocket-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`rocket-download-btn ${downloadSuccess ? 'success' : ''}`}
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
    </div>
  );
};
