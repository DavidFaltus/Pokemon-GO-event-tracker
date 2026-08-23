import React from 'react';
import { extractEventPokemonNames, handlePokemonImageError, resolveImage } from '../utils/imageResolver';
import { getPokemonImage } from '../data/specialEvents';

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
  size = 86
}) => {
  // Extract all pokemon names featured in this event
  const extracted = extractEventPokemonNames({ name: eventName, eventType, extraData: { bosses } });
  const namesList = extracted.slice(0, 3);

  const isDynamax = (eventType || '').toLowerCase().includes('max-monday') ||
                    (eventType || '').toLowerCase().includes('max-battle') ||
                    (eventType || '').toLowerCase().includes('dynamax') ||
                    (eventType || '').toLowerCase().includes('gigantamax') ||
                    (eventName || '').toLowerCase().includes('max monday') ||
                    (eventName || '').toLowerCase().includes('max battle') ||
                    (eventName || '').toLowerCase().includes('dynamax') ||
                    (eventName || '').toLowerCase().includes('gigantamax');

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
    const iconUrl = getPokemonImage(pokeName);

    if (isDynamax) {
      return (
        <div
          className="dynamax-avatar-wrapper"
          style={{
            position: 'relative',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.45) 0%, rgba(15, 23, 42, 0.9) 100%)',
            border: '2px solid #ec4899',
            boxShadow: '0 0 14px rgba(236, 72, 153, 0.8), 0 0 24px rgba(217, 70, 239, 0.6)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
          title={`${pokeName} (Dynamax)`}
        >
          <img
            src={iconUrl}
            alt={pokeName}
            width={size}
            height={size}
            style={{
              width: '95%',
              height: '95%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.95))'
            }}
            onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName)}
          />
        </div>
      );
    }

    return (
      <img
        src={iconUrl}
        alt={pokeName}
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
        onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName)}
      />
    );
  }

  // Multi-boss composite badge (2-3 overlapping 3D Pokemon sprites)
  const spriteSize = Math.round(size * 0.82);
  const stepOffset = Math.round(size * 0.35);
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
        const iconUrl = getPokemonImage(pokeName);
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
              zIndex: namesList.length - idx,
              borderRadius: '50%',
              background: isDynamax
                ? 'radial-gradient(circle, rgba(236, 72, 153, 0.45) 0%, rgba(15, 23, 42, 0.85) 100%)'
                : 'rgba(15, 23, 42, 0.75)',
              border: isDynamax ? '1.5px solid #ec4899' : '1.5px solid rgba(245, 158, 11, 0.5)',
              boxShadow: isDynamax
                ? '0 0 10px rgba(236, 72, 153, 0.7), 0 4px 10px rgba(0, 0, 0, 0.6)'
                : '0 4px 10px rgba(0, 0, 0, 0.6)',
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
                padding: '2px',
                filter: isDynamax ? 'drop-shadow(0 0 4px rgba(244, 63, 94, 0.8))' : 'none'
              }}
              onError={(e) => handlePokemonImageError(e.target as HTMLImageElement, pokeName)}
            />
          </div>
        );
      })}
    </div>
  );
};
