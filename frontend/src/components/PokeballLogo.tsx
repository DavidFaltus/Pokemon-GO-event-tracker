import React from 'react';

export const PokeballLogo: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 24, style }) => {
  const uid = 'pbl';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ flexShrink: 0, marginRight: '8px', ...style }}
      aria-label="PoGo Events logo"
    >
      <defs>
        <linearGradient id={`${uid}-top`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d4d" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id={`${uid}-bot`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <clipPath id={`${uid}-clip`}>
          <circle cx="50" cy="50" r="42" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="46" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.5" fill="none" filter={`url(#${uid}-glow)`} />
      <circle cx="50" cy="50" r="42" fill={`url(#${uid}-bot)`} stroke="#0f172a" strokeWidth="1.5" />
      <g clipPath={`url(#${uid}-clip)`}>
        <path d="M 8,50 A 42,42 0 0,1 92,50 Z" fill={`url(#${uid}-top)`} />
      </g>
      <line x1="8" y1="50" x2="92" y2="50" stroke="#090d16" strokeWidth="5.5" />
      <circle cx="50" cy="50" r="14" fill="#090d16" />
      <circle cx="50" cy="50" r="10" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="50" cy="50" r="4.5" fill="#38bdf8" filter={`url(#${uid}-glow)`} />
      <circle cx="50" cy="50" r="3" fill="#ffffff" />
    </svg>
  );
};
