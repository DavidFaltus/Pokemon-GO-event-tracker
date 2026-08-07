import React from 'react';
import { extractEventPokemonNames, getPokemonIconUrl, handlePokemonImageError, resolveImage } from '../utils/imageResolver';

interface MultiBossAvatarProps {
  bosses?: any[];
  eventName?: string;
  eventType?: string;
  size?: number;
}

export const MultiBossAvatar: React.FC<MultiBossAvatarProps> = ({
  bosses = [],
  eventName = '',
  eventType = '',
  size = 56
}) => {
  // Extract all pokemon names featured in this event
  const extracted = extractEventPokemonNames({ name: eventName, eventType, extraData: { bosses } });
  const namesList = extracted.slice(0, 3);

  // Fallback if no Pokemon species found in event title or extraData
  if (namesList.length === 0) {
    const fallbackUrl = resolveImage(undefined, eventType, eventName);
    return (
      <img
        src={fallbackUrl}
        alt={eventName || 'Event'}
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
        onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, eventName)}
      />
    );
  }

  // Single Pokemon event (Spotlight Hour, Community Day, Max Monday, Single Raid Boss)
  if (namesList.length === 1) {
    const pokeName = namesList[0];
    const iconUrl = getPokemonIconUrl(pokeName);
    return (
      <img
        src={iconUrl}
        alt={pokeName}
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
        onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName)}
      />
    );
  }

  // Multi-boss composite badge (2-3 overlapping 3D Pokemon sprites)
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
        const iconUrl = getPokemonIconUrl(pokeName);
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
              // Reverse zIndex so first Pokemon sits cleanly on top and doesn't get covered!
              zIndex: namesList.length - idx,
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
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName)}
            />
          </div>
        );
      })}
    </div>
  );
};
