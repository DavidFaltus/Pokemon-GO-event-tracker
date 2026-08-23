import React, { useRef, useState } from 'react';
import { useInfographicExport } from '../hooks/useInfographicExport';
import { Download, Sparkles, Clock, Calendar, Zap, Check, ShieldCheck, Activity } from 'lucide-react';
import type { EventData } from './EventCard';
import type { Language } from '../data/translations';
import { resolveImage, handlePokemonImageError, getBasePokemonNames } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';
import { getPokemonName } from '../utils/pokemonTranslator';
import { useInfographicEditor } from '../hooks/useInfographicEditor';
import { formatEventDateRange } from '../utils/infographicFormatters';
import { EditableText, EditableImage, EditToolbar } from './InfographicEditable';
import './MaxInfographic.css';

interface MaxInfographicProps {
  event: EventData;
  lang: Language;
  timezone?: string;
  isAdmin?: boolean;
}


// Max Particle (MP) Costs & Limits:
// Tier 1 Cost: 250 MP | Tier 3 Cost: 400 MP | Tier 5 / Gigantamax Cost: 800 MP
// Daily MP Collection Cap: 800 MP per day (excluding specific bonuses or starter claims)
// Max MP Storage: 1,000 MP
// Note: Only Tiers 1, 3, and 5/Gigantamax exist for Max Battles — no Tier 2 or 4.
export function getMaxBattleMpCost(eventName: string, isGigantamax: boolean): string {
  const lower = eventName.toLowerCase();
  if (lower.includes('eternatus') || lower.includes('eternamax')) return '800 MP';
  if (isGigantamax || lower.includes('6-star') || lower.includes('gigantamax')) return '800 MP';
  if (lower.includes('5-star') || lower.includes('legendary')) return '800 MP';
  if (lower.includes('3-star')) return '400 MP';
  if (lower.includes('1-star')) return '250 MP';
  return '400 MP';
}

// XP Rewards by Tier:
// Tier 1: 5,000 XP | Tier 2: 6,000 XP | Tier 3: 7,500 XP | Tier 4: 10,000 XP | Tier 5: 15,000 XP
// Gigantamax (Tier 6): 25,000 XP (up to 50,000 XP with Lucky Egg)
// In-Person Bonus: +2,500 XP additional for local, in-person participation
export function getMaxBattleXpReward(eventName: string, isGigantamax: boolean): string {
  const lower = eventName.toLowerCase();
  if (lower.includes('eternatus') || lower.includes('eternamax')) return '50,000 XP';
  if (isGigantamax || lower.includes('6-star') || lower.includes('gigantamax')) return '25,000 XP';
  if (lower.includes('5-star') || lower.includes('legendary')) return '15,000 XP';
  if (lower.includes('4-star')) return '10,000 XP';
  if (lower.includes('3-star')) return '7,500 XP';
  if (lower.includes('2-star')) return '6,000 XP';
  if (lower.includes('1-star')) return '5,000 XP';
  return '7,500 XP';
}

export const MaxInfographic: React.FC<MaxInfographicProps> = ({ event, lang = 'en', isAdmin = false }) => {
  const editor = useInfographicEditor(event.eventID, 'max');
  const { posterRef, isExporting, exportSuccess, exportAsPng } = useInfographicExport();
  const isEditing = isAdmin && editor.isEditing;

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
  const { dateStr, timeStr, isMultiDay } = formatEventDateRange(event.start, event.end, lang);

  // Exact Tier MP & XP values
  const mpCost = getMaxBattleMpCost(event.name, isGigantamax);
  const xpReward = getMaxBattleXpReward(event.name, isGigantamax);

  // Download handler
  const handleDownload = async () => {
    editor.setIsExporting(true);
    await exportAsPng(`pogo_max_${bossName.toLowerCase()}_4x5`);
    editor.setIsExporting(false);
  };

  return (
    <div className="max-infographic-wrapper">
      <div className={`max-poster-container ${editor.isExporting ? 'is-exporting' : ''}`} ref={posterRef}>
        {isAdmin && (
          <EditToolbar 
            isEditing={editor.isEditing} 
            onToggleEdit={() => editor.setIsEditing(!editor.isEditing)} 
            hasOverrides={editor.hasOverrides} 
            onReset={editor.resetAll} 
            lang={lang} 
          />
        )}
        <div className="max-poster-glow-top"></div>

        {/* Header */}
        <div className="max-poster-header">
          <div className="max-header-top-row">
            <div className="max-poster-badge">
              <Activity size={13} className="max-icon-pulse" />
              <EditableText 
                value={editor.getTextOverride('badgeText', isGigantamax ? 'GIGANTAMAX BATTLE' : event.eventType === 'max-monday' || event.name.toLowerCase().includes('monday') ? 'MAX MONDAY' : 'DYNAMAX MAX BATTLE')} 
                onChange={(v) => editor.setTextOverride('badgeText', v)} 
                isEditing={isEditing} 
                as="span" 
              />
            </div>
            <div className="max-poster-time-pill">
              <div className="max-time-item">
                <Calendar size={13} />
                <EditableText 
                  value={editor.getTextOverride('dateStr', dateStr)} 
                  onChange={(v) => editor.setTextOverride('dateStr', v)} 
                  isEditing={editor.isEditing} 
                  as="span" 
                />
              </div>
              {!isMultiDay && timeStr && (
                <>
                  <div className="max-time-divider">•</div>
                  <div className="max-time-item">
                    <Clock size={13} />
                    <EditableText 
                      value={editor.getTextOverride('timeStr', timeStr)} 
                      onChange={(v) => editor.setTextOverride('timeStr', v)} 
                      isEditing={editor.isEditing} 
                      as="span" 
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <EditableText 
            value={editor.getTextOverride('title', getPokemonName(bossName, lang))} 
            onChange={(v) => editor.setTextOverride('title', v)} 
            isEditing={isEditing} 
            as="h2" 
            className="max-poster-title" 
          />
        </div>

        {/* Main Section */}
        <div className="max-poster-main">
          {/* 1. Max Boss Showcase (Normal & Shiny Sprites Side-by-Side at the top) */}
          <div className="max-poke-showcase">
            <div className="max-sprites-pair">
              <div className="max-sprite-box">
                <EditableImage 
                  src={editor.getImageOverride('normalSprite', resolveImage(pokemonImg, event.eventType, bossName, false))} 
                  alt={bossName} 
                  onChange={(url) => editor.setImageOverride('normalSprite', url)} 
                  isEditing={editor.isEditing} 
                  className="max-poke-sprite"
                  onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName, false)}
                  pokemonName={bossName}
                />
                <EditableText 
                  value={editor.getTextOverride('normalTag', 'Normal')} 
                  onChange={(v) => editor.setTextOverride('normalTag', v)} 
                  isEditing={editor.isEditing} 
                  className="sprite-tag" 
                />
              </div>
              {canBeShiny && (
                <div className="max-sprite-box">
                  <EditableImage 
                    src={editor.getImageOverride('shinySprite', resolveImage(pokemonImg, event.eventType, bossName, true))} 
                    alt={`${bossName} Shiny`} 
                    onChange={(url) => editor.setImageOverride('shinySprite', url)} 
                    isEditing={editor.isEditing} 
                    className="max-poke-sprite shiny-glow"
                    onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, bossName, true)}
                    pokemonName={bossName}
                  />
                  <EditableText 
                    value={editor.getTextOverride('shinyTag', '✨ Shiny')} 
                    onChange={(v) => editor.setTextOverride('shinyTag', v)} 
                    isEditing={editor.isEditing} 
                    className="sprite-tag shiny" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. Event Info Box */}
          <div className="max-details-box">
            <div className="max-details-header">
              <Zap size={16} />
              <EditableText 
                value={editor.getTextOverride('detailsHeader', lang === 'cs' ? 'POWER SPOT & MAX PARTICLES' : 'POWER SPOT & MAX PARTICLES')} 
                onChange={(v) => editor.setTextOverride('detailsHeader', v)} 
                isEditing={editor.isEditing} 
                as="span" 
              />
            </div>

            <div className="max-details-row">
              <div className="max-detail-item">
                <EditableImage
                  src={editor.getImageOverride('mpPackImg', mpCost === '800 MP' ? 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/mp_pack_mulit.png' : 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Items/mp_pack.png')}
                  alt="MP Pack"
                  onChange={(url) => editor.setImageOverride('mpPackImg', url)}
                  isEditing={editor.isEditing}
                  className="max-mp-pack-img"
                />
                <div>
                  <EditableText 
                    value={editor.getTextOverride('mpCostLabel', lang === 'cs' ? 'CENA V MP:' : 'MP COST:')} 
                    onChange={(v) => editor.setTextOverride('mpCostLabel', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-label" 
                  />
                  <EditableText 
                    value={editor.getTextOverride('mpCostVal', mpCost)} 
                    onChange={(v) => editor.setTextOverride('mpCostVal', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-val" 
                  />
                </div>
              </div>

              <div className="max-detail-item highlight">
                <div>
                  <EditableText 
                    value={editor.getTextOverride('xpRewardLabel', lang === 'cs' ? 'ODMĚNA XP:' : 'XP REWARD:')} 
                    onChange={(v) => editor.setTextOverride('xpRewardLabel', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-label highlight" 
                  />
                  <EditableText 
                    value={editor.getTextOverride('xpRewardVal', xpReward)} 
                    onChange={(v) => editor.setTextOverride('xpRewardVal', v)} 
                    isEditing={editor.isEditing} 
                    className="max-detail-val highlight" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Shiny Rate Card */}
          <div className="max-shiny-rate-card">
            <Sparkles size={15} style={{ color: '#f472b6' }} />
            <EditableText 
              value={editor.getTextOverride('shinyRateText', canBeShiny 
                ? (lang === 'cs' ? 'ŠANCE NA SHINY: ~1 z 500 (0,2% šance) ✨' : 'SHINY RATE: ~1 in 500 (0.2% Chance) ✨')
                : (lang === 'cs' ? 'SHINY: Není k dispozici 🚫' : 'SHINY RATE: Not Available 🚫'))} 
              onChange={(v) => editor.setTextOverride('shinyRateText', v)} 
              isEditing={editor.isEditing} 
              as="span" 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="max-poster-footer">
          <div className="max-footer-left">
            <ShieldCheck size={16} className="max-shield-icon" />
            <EditableText 
              value={editor.getTextOverride('footerLeft', 'pogoevents.app')} 
              onChange={(v) => editor.setTextOverride('footerLeft', v)} 
              isEditing={editor.isEditing} 
              as="span" 
            />
          </div>
          <EditableText 
            value={editor.getTextOverride('footerRight', 'Pokémon GO Event Tracker')} 
            onChange={(v) => editor.setTextOverride('footerRight', v)} 
            isEditing={editor.isEditing} 
            as="span" 
          />
        </div>
      </div>

      <div className="max-infographic-actions" style={{ marginTop: '12px' }}>
        <button 
          className={`max-download-btn ${exportSuccess ? 'success' : ''}`}
          onClick={handleDownload}
          disabled={isExporting}
        >
          {exportSuccess ? (
            <>
              <Check size={18} />
              Saved PNG!
            </>
          ) : isExporting ? (
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
