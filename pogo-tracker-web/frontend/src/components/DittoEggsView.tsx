import React, { useState } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import { dittoDisguises, eggPools } from '../data/dittoEggs';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';
import { TypeBadge } from './EventCard';
import { Sparkles } from 'lucide-react';

interface DittoEggsViewProps {
  lang: Language;
  mode: 'ditto' | 'eggs';
}

// Egg icon matching Pokemon GO design
export const EggIcon = ({ size = 24, color = '#4ade80' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 100 120" width={size} height={size} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M50 10 C20 10, 10 60, 10 85 C10 105, 30 115, 50 115 C70 115, 90 105, 90 85 C90 60, 80 10, 50 10 Z" fill={color} stroke="#1f2937" strokeWidth="4"/>
    {/* Spots on egg */}
    <ellipse cx="35" cy="50" rx="8" ry="12" fill="white" opacity="0.6" transform="rotate(-15 35 50)"/>
    <ellipse cx="65" cy="45" rx="7" ry="10" fill="white" opacity="0.6" transform="rotate(15 65 45)"/>
    <ellipse cx="45" cy="85" rx="9" ry="14" fill="white" opacity="0.6" transform="rotate(5 45 85)"/>
    <ellipse cx="25" cy="75" rx="6" ry="8" fill="white" opacity="0.6" transform="rotate(-30 25 75)"/>
    <ellipse cx="75" cy="75" rx="6" ry="8" fill="white" opacity="0.6" transform="rotate(30 75 75)"/>
  </svg>
);

export const DittoEggsView: React.FC<DittoEggsViewProps> = ({ lang, mode }) => {
  const t = translations[lang];
  const [selectedEgg, setSelectedEgg] = useState<string>("2 km");

  return (
    <div className="ditto-eggs-view-container">
      {mode === 'ditto' ? (
        <div className="ditto-section">
          <div className="ditto-disguises-grid">
            {dittoDisguises.map(poke => (
              <div key={poke.name} className="disguise-card">
                <div className="disguise-img-container">
                  <img 
                    src={resolveImage(poke.image, 'ditto', poke.name)} 
                    alt={poke.name} 
                    className="disguise-pokemon-img"
                    onError={(e) => {
                      handlePokemonImageError(e.target as HTMLImageElement, poke.name);
                    }}
                  />
                  {poke.isShiny && (
                    <span className="shiny-badge-absolute" title="Shiny available">
                      <Sparkles size={14} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                    </span>
                  )}
                </div>
                <div className="disguise-info">
                  <span className="disguise-name">{poke.name}</span>
                  <div className="disguise-types">
                    {poke.types.map(type => (
                      <TypeBadge key={type} typeStr={type} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="eggs-section">
          {/* Egg Tiers Selector */}
          <div className="egg-tiers-selector">
            {eggPools.map(pool => (
              <button
                key={pool.distance}
                className={`egg-tier-btn ${selectedEgg === pool.distance ? 'active' : ''}`}
                onClick={() => setSelectedEgg(pool.distance)}
                style={{ 
                  borderColor: selectedEgg === pool.distance ? pool.color : 'transparent',
                  boxShadow: selectedEgg === pool.distance ? `0 0 12px ${pool.color}40` : 'none'
                }}
              >
                <EggIcon size={36} color={pool.color} />
                <span className="egg-tier-label">{pool.distance}</span>
              </button>
            ))}
          </div>

          {/* Selected Egg content */}
          {(() => {
            const currentPool = eggPools.find(p => p.distance === selectedEgg);
            if (!currentPool) return null;
            return (
              <div className="egg-pool-details-card">
                <div className="egg-pool-details-header" style={{ borderLeftColor: currentPool.color }}>
                  <EggIcon size={48} color={currentPool.color} />
                  <div>
                    <h3>{currentPool.distance} {t.eggs_pool_title}</h3>
                    <span className="hatch-count-pill">{currentPool.contents.length} Pokémon</span>
                  </div>
                </div>

                <div className="egg-hatches-grid">
                  {currentPool.contents.map(pokemon => (
                    <div key={pokemon.name} className="egg-hatch-card">
                      <div className="hatch-img-container">
                        <img 
                          src={resolveImage(pokemon.image, 'egg-hatch', pokemon.name)} 
                          alt={pokemon.name} 
                          className="hatch-pokemon-img"
                          onError={(e) => {
                            handlePokemonImageError(e.target as HTMLImageElement, pokemon.name);
                          }}
                        />
                        {pokemon.isShinyAvailable && (
                          <span className="shiny-badge-absolute" title="Shiny available">
                            <Sparkles size={14} fill="currentColor" stroke="none" style={{ color: '#fbbf24' }} />
                          </span>
                        )}
                      </div>
                      <div className="hatch-info">
                        <span className="hatch-name">{pokemon.name}</span>
                        {pokemon.cpMax && (
                          <span className="hatch-cp">
                            <strong>CP:</strong> {pokemon.cpMax}
                          </span>
                        )}
                        <div className="hatch-rarity-row">
                          <span className="rarity-label">{t.rarity_level}:</span>
                          <div className="rarity-eggs-flex">
                            {Array.from({ length: pokemon.rarityTier }).map((_, i) => (
                              <EggIcon key={i} size={12} color={currentPool.color} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
