import React from 'react';
import { resolveImage, handlePokemonImageError } from '../utils/imageResolver';

interface MultiBossAvatarProps {
  bosses?: any[];
  eventName?: string;
  eventType?: string;
  size?: number;
}

export const MultiBossAvatar: React.FC<MultiBossAvatarProps> = ({
  bosses = [],
  eventName = '',
  eventType = 'raid-hour',
  size = 56
}) => {
  const namesSet = new Set<string>();

  // Extract from bosses array
  if (Array.isArray(bosses)) {
    bosses.forEach((b: any) => {
      const name = typeof b === 'string' ? b : (b?.name || '');
      if (name) {
        if (name.includes(',')) {
          name.split(',').forEach((s: string) => { if (s.trim()) namesSet.add(s.trim()); });
        } else if (name.includes(' and ')) {
          name.split(' and ').forEach((s: string) => { if (s.trim()) namesSet.add(s.trim()); });
        } else if (name.includes(' & ')) {
          name.split(' & ').forEach((s: string) => { if (s.trim()) namesSet.add(s.trim()); });
        } else {
          namesSet.add(name.trim());
        }
      }
    });
  }

  // Also check eventName if bosses array was empty
  if (namesSet.size === 0 && eventName) {
    const knownLegendaries = [
      'Uxie', 'Mesprit', 'Azelf', 'Kyurem', 'Zekrom', 'Reshiram', 'Dialga', 'Palkia',
      'Solgaleo', 'Lunala', 'Necrozma', 'Rayquaza', 'Groudon', 'Kyogre', 'Raikou', 'Entei', 'Suicune',
      'Articuno', 'Zapdos', 'Moltres', 'Regirock', 'Regice', 'Registeel', 'Cobalion', 'Terrakion', 'Virizion'
    ];
    knownLegendaries.forEach(legend => {
      if (eventName.toLowerCase().includes(legend.toLowerCase())) {
        namesSet.add(legend);
      }
    });
  }

  const namesList = Array.from(namesSet).slice(0, 3);

  if (namesList.length <= 1) {
    const singleName = namesList[0] || eventName;
    const singleUrl = resolveImage(undefined, eventType, singleName);
    return (
      <img
        src={singleUrl}
        alt={singleName || 'Raid Boss'}
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
        onError={(e) => {
          handlePokemonImageError(e.target as HTMLImageElement, singleName);
        }}
      />
    );
  }

  // Multi-boss composite badge (2-3 overlapping sprites)
  const spriteSize = Math.round(size * 0.76);
  const stepOffset = Math.round(size * 0.32);
  const totalWidth = size + (namesList.length - 1) * stepOffset;

  return (
    <div
      className="multi-boss-avatar-wrapper"
      style={{
        position: 'relative',
        width: `${totalWidth}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexShrink: 0
      }}
      title={namesList.join(', ')}
    >
      {namesList.map((pokeName, idx) => {
        const iconUrl = resolveImage(undefined, eventType, pokeName);
        const leftOffset = idx * stepOffset;

        return (
          <div
            key={pokeName + idx}
            style={{
              position: idx === 0 ? 'relative' : 'absolute',
              left: `${leftOffset}px`,
              top: '50%',
              transform: 'translateY(-50%)',
              width: `${spriteSize}px`,
              height: `${spriteSize}px`,
              zIndex: idx + 1,

              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1.5px solid rgba(245, 158, 11, 0.5)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <img
              src={iconUrl}
              alt={pokeName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '2px'
              }}
              onError={(e) => {
                handlePokemonImageError(e.target as HTMLImageElement, pokeName);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
