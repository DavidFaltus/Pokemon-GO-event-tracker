import React, { useRef, useState } from 'react';
import { useInfographicExport } from '../hooks/useInfographicExport';
import { Download, Clock, Calendar, Check, ShieldCheck, Flame, Skull, AlertTriangle } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { formatEventDateRange } from '../utils/infographicFormatters';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import './RocketInfographic.css';

interface RocketInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  isAdmin?: boolean;
}

export const RocketInfographic: React.FC<RocketInfographicProps> = ({ event, lang, isAdmin = false }) => {
  const { posterRef, isExporting, exportSuccess, exportAsPng } = useInfographicExport();
  const editor = useInfographicEditor(event.eventID, 'rocket');
  const isEditing = isAdmin && editor.isEditing;

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
    editor.setIsExporting(true);
    await exportAsPng(`pogo_rocket_4x5`);
    editor.setIsExporting(false);
  };

  return (
    <div className="rocket-infographic-wrapper">
      <div className={`rocket-poster-container ${editor.isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {isAdmin && (
          <EditToolbar isEditing={editor.isEditing} onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} hasOverrides={editor.hasOverrides} onReset={editor.resetAll} lang={lang} />
        )}
        <div className="rocket-poster-glow-top"></div>

        {/* Header */}
        <div className="rocket-poster-header">
          <div className="rocket-header-top-row">
            <div className="rocket-poster-badge">
              <Skull size={13} className="rocket-skull-icon" />
              <EditableText value={editor.getTextOverride('badge', 'TEAM GO ROCKET TAKEOVER')} onChange={(v) => editor.setTextOverride('badge', v)} isEditing={isEditing} />
            </div>
            <div className="rocket-poster-time-pill">
              <div className="rocket-time-item">
                <Calendar size={13} />
                <EditableText value={editor.getTextOverride('date', dateStr)} onChange={(v) => editor.setTextOverride('date', v)} isEditing={isEditing} />
              </div>
              {!isMultiDay && timeStr && (
                <>
                  <div className="rocket-time-divider">•</div>
                  <div className="rocket-time-item">
                    <Clock size={13} />
                    <EditableText value={editor.getTextOverride('time', timeStr)} onChange={(v) => editor.setTextOverride('time', v)} isEditing={editor.isEditing} />
                  </div>
                </>
              )}
            </div>
          </div>
          <EditableText value={editor.getTextOverride('title', event.name)} onChange={(v) => editor.setTextOverride('title', v)} isEditing={isEditing} as="h2" className="rocket-poster-title" />
        </div>

        {/* Main Section */}
        <div className="rocket-poster-main">
          {/* Giovanni & Shadow Boss Showcase */}
          <div className="rocket-poke-card">
            <div className="rocket-image-halo"></div>
            <EditableImage 
              src={editor.getImageOverride('bossImg', resolveImage(pokemonImg, event.eventType, mainBoss))}
              alt={mainBoss}
              onChange={(url) => editor.setImageOverride('bossImg', url)}
              isEditing={editor.isEditing}
              className="rocket-poke-img"
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, mainBoss)}
              pokemonName={mainBoss}
            />
            <EditableText value={editor.getTextOverride('bossName', getPokemonName(mainBoss, lang))} onChange={(v) => editor.setTextOverride('bossName', v)} isEditing={editor.isEditing} as="h3" className="rocket-poke-name" />
            
            <div className="rocket-shadow-chip">
              <Flame size={13} />
              <EditableText value={editor.getTextOverride('shadowChip', '🔮 Shadow Boss')} onChange={(v) => editor.setTextOverride('shadowChip', v)} isEditing={editor.isEditing} />
            </div>
          </div>

          {/* Frustration TM Highlight Box */}
          <div className="rocket-tm-box">
            <div className="rocket-tm-header">
              <AlertTriangle size={16} />
              <EditableText 
                value={editor.getTextOverride('tmHeader', lang === 'cs' ? 'KLÍČOVÝ BONUS EVENTU' : 'KEY EVENT BONUS')} 
                onChange={(v) => editor.setTextOverride('tmHeader', v)} 
                isEditing={editor.isEditing} 
              />
            </div>

            <div className="rocket-tm-content">
              <EditableText 
                value={editor.getTextOverride('tmTitle', lang === 'cs' ? '⚡ Odnaučte Frustration!' : '⚡ Forget Frustration!')} 
                onChange={(v) => editor.setTextOverride('tmTitle', v)} 
                isEditing={editor.isEditing} 
                as="div" 
                className="rocket-tm-title" 
              />
              <EditableText 
                value={editor.getTextOverride('tmDesc', lang === 'cs' 
                  ? 'Použijte Charged TM k odnaučení Frustration u Shadow Pokémonů během tohoto eventu!' 
                  : 'Use a Charged TM to help Shadow Pokémon forget the Charged Attack Frustration!')} 
                onChange={(v) => editor.setTextOverride('tmDesc', v)} 
                isEditing={editor.isEditing} 
                as="div" 
                className="rocket-tm-desc" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rocket-poster-footer">
          <div className="rocket-footer-left">
            <ShieldCheck size={16} className="rocket-shield-icon" />
            <EditableText value={editor.getTextOverride('footerBrand', 'pogoevents.app')} onChange={(v) => editor.setTextOverride('footerBrand', v)} isEditing={editor.isEditing} />
          </div>
        </div>
      </div>

      <div className="rocket-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`rocket-download-btn ${exportSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={isExporting}
        >
          {exportSuccess ? (
            <>
              <Check size={18} />
              {lang === 'cs' ? 'Uloženo!' : 'Saved!'}
            </>
          ) : isExporting ? (
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
