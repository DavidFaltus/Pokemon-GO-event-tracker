import React, { useId } from 'react';

export const PokeballLogo: React.FC<{ size?: number; style?: React.CSSProperties; className?: string }> = ({
  size = 24,
  style,
  className
}) => {
  const reactId = useId().replace(/:/g, '_');
  const uid = `pbl_${reactId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', ...style }}
      aria-label="PoGo Events logo"
    >
      <defs>
        {/* Outer Badge Background */}
        <radialGradient id={`${uid}-bg`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="70%" stopColor="#0f1015" />
          <stop offset="100%" stopColor="#090a0f" />
        </radialGradient>

        {/* Red Top Shell */}
        <linearGradient id={`${uid}-red`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>

        {/* White Bottom Shell */}
        <linearGradient id={`${uid}-white`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Inner Button Glow */}
        <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
          <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </radialGradient>

        {/* Subtle Glow Filter */}
        <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <clipPath id={`${uid}-clip`}>
          <circle cx="256" cy="256" r="200" />
        </clipPath>
      </defs>

      {/* Dark Circular Badge Background */}
      <circle cx="256" cy="256" r="248" fill={`url(#${uid}-bg)`} stroke="#ef4444" strokeWidth="3" strokeOpacity="0.4" filter={`url(#${uid}-glow)`} />

      {/* Outer Ring Glow */}
      <circle cx="256" cy="256" r="208" fill="none" stroke="#ef4444" strokeWidth="4" strokeOpacity="0.3" filter={`url(#${uid}-glow)`} />

      {/* Pokéball Bottom Shell */}
      <circle cx="256" cy="256" r="200" fill={`url(#${uid}-white)`} stroke="#0f172a" strokeWidth="8" />

      {/* Pokéball Top Red Shell */}
      <g clipPath={`url(#${uid}-clip)`}>
        <path d="M 36,256 A 200,200 0 0,1 476,256 Z" fill={`url(#${uid}-red)`} />
      </g>

      {/* Center Black Belt */}
      <line x1="36" y1="256" x2="476" y2="256" stroke="#090d16" strokeWidth="26" />

      {/* Center Button Outer Ring (Dark Obsidian) */}
      <circle cx="256" cy="256" r="64" fill="#090d16" stroke="#1e293b" strokeWidth="4" />

      {/* Center Button Inner Metallic Shell */}
      <circle cx="256" cy="256" r="46" fill="#f8fafc" stroke="#38bdf8" strokeWidth="6" />

      {/* Center Glowing Cyan Gem */}
      <circle cx="256" cy="256" r="22" fill={`url(#${uid}-core)`} filter={`url(#${uid}-glow)`} />
      <circle cx="256" cy="256" r="14" fill="#ffffff" />

      {/* Sparkle Accent 1 (Top-Right) */}
      <g transform="translate(390, 110)" filter={`url(#${uid}-glow)`}>
        <line x1="0" y1="-20" x2="0" y2="20" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* Sparkle Accent 2 (Bottom-Left) */}
      <g transform="translate(110, 390)" opacity="0.8">
        <line x1="0" y1="-14" x2="0" y2="14" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        <line x1="-14" y1="0" x2="14" y2="0" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
};
