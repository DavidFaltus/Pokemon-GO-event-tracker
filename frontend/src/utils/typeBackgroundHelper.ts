/**
 * Helper to compute dark, glassmorphic dynamic backgrounds and glow accents
 * for all 18 Pokémon element types.
 */

export interface TypeVisualProfile {
  primaryType: string;
  gradientBackground: string;
  radialGlowColor: string;
  accentColor: string;
  borderColor: string;
  particleTint: string;
}

const TYPE_PROFILES: Record<string, { gradient: string; glow: string; accent: string; border: string; tint: string }> = {
  ghost: {
    gradient: 'linear-gradient(145deg, #0b0716 0%, #150f29 45%, #060709 100%)',
    glow: 'rgba(168, 85, 247, 0.40)',
    accent: '#c084fc',
    border: 'rgba(192, 132, 252, 0.35)',
    tint: '#9333ea'
  },
  fire: {
    gradient: 'linear-gradient(145deg, #180907 0%, #2e100a 45%, #060709 100%)',
    glow: 'rgba(239, 68, 68, 0.40)',
    accent: '#f87171',
    border: 'rgba(248, 113, 113, 0.35)',
    tint: '#ea580c'
  },
  water: {
    gradient: 'linear-gradient(145deg, #041424 0%, #08233d 45%, #060709 100%)',
    glow: 'rgba(56, 189, 248, 0.40)',
    accent: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.35)',
    tint: '#0284c7'
  },
  grass: {
    gradient: 'linear-gradient(145deg, #06170d 0%, #0e2a18 45%, #060709 100%)',
    glow: 'rgba(34, 197, 94, 0.40)',
    accent: '#4ade80',
    border: 'rgba(74, 222, 128, 0.35)',
    tint: '#16a34a'
  },
  electric: {
    gradient: 'linear-gradient(145deg, #181404 0%, #2a2308 45%, #060709 100%)',
    glow: 'rgba(234, 179, 8, 0.45)',
    accent: '#facc15',
    border: 'rgba(250, 204, 21, 0.35)',
    tint: '#ca8a04'
  },
  dragon: {
    gradient: 'linear-gradient(145deg, #0d0b28 0%, #171444 45%, #060709 100%)',
    glow: 'rgba(99, 102, 241, 0.45)',
    accent: '#818cf8',
    border: 'rgba(129, 140, 248, 0.35)',
    tint: '#4f46e5'
  },
  dark: {
    gradient: 'linear-gradient(145deg, #0b0d12 0%, #151821 45%, #060709 100%)',
    glow: 'rgba(100, 116, 139, 0.40)',
    accent: '#94a3b8',
    border: 'rgba(148, 163, 184, 0.30)',
    tint: '#475569'
  },
  fairy: {
    gradient: 'linear-gradient(145deg, #1b0a16 0%, #2f1227 45%, #060709 100%)',
    glow: 'rgba(244, 114, 182, 0.40)',
    accent: '#f472b6',
    border: 'rgba(244, 114, 182, 0.35)',
    tint: '#db2777'
  },
  steel: {
    gradient: 'linear-gradient(145deg, #0f131a 0%, #1c232f 45%, #060709 100%)',
    glow: 'rgba(148, 163, 184, 0.35)',
    accent: '#cbd5e1',
    border: 'rgba(203, 213, 225, 0.35)',
    tint: '#64748b'
  },
  ground: {
    gradient: 'linear-gradient(145deg, #1a1207 0%, #2c1f0d 45%, #060709 100%)',
    glow: 'rgba(217, 119, 6, 0.40)',
    accent: '#fbbf24',
    border: 'rgba(251, 191, 36, 0.35)',
    tint: '#b45309'
  },
  rock: {
    gradient: 'linear-gradient(145deg, #17130b 0%, #272115 45%, #060709 100%)',
    glow: 'rgba(180, 83, 9, 0.35)',
    accent: '#d97706',
    border: 'rgba(217, 119, 6, 0.35)',
    tint: '#92400e'
  },
  psychic: {
    gradient: 'linear-gradient(145deg, #1a0817 0%, #2e0e29 45%, #060709 100%)',
    glow: 'rgba(244, 63, 94, 0.40)',
    accent: '#fb7185',
    border: 'rgba(251, 113, 133, 0.35)',
    tint: '#e11d48'
  },
  ice: {
    gradient: 'linear-gradient(145deg, #061622 0%, #0d283c 45%, #060709 100%)',
    glow: 'rgba(6, 182, 212, 0.40)',
    accent: '#67e8f9',
    border: 'rgba(103, 232, 249, 0.35)',
    tint: '#0891b2'
  },
  fighting: {
    gradient: 'linear-gradient(145deg, #1c080b 0%, #2f0e13 45%, #060709 100%)',
    glow: 'rgba(225, 29, 72, 0.40)',
    accent: '#fb7185',
    border: 'rgba(251, 113, 133, 0.35)',
    tint: '#be123c'
  },
  bug: {
    gradient: 'linear-gradient(145deg, #131707 0%, #21280d 45%, #060709 100%)',
    glow: 'rgba(132, 204, 22, 0.40)',
    accent: '#a3e635',
    border: 'rgba(163, 230, 53, 0.35)',
    tint: '#65a30d'
  },
  poison: {
    gradient: 'linear-gradient(145deg, #150819 0%, #260f2e 45%, #060709 100%)',
    glow: 'rgba(168, 85, 247, 0.40)',
    accent: '#c084fc',
    border: 'rgba(192, 132, 252, 0.35)',
    tint: '#7e22ce'
  },
  flying: {
    gradient: 'linear-gradient(145deg, #0e1124 0%, #181d3d 45%, #060709 100%)',
    glow: 'rgba(129, 140, 248, 0.40)',
    accent: '#a5b4fc',
    border: 'rgba(165, 180, 252, 0.35)',
    tint: '#4338ca'
  },
  normal: {
    gradient: 'linear-gradient(145deg, #101114 0%, #1b1c22 45%, #060709 100%)',
    glow: 'rgba(148, 163, 184, 0.30)',
    accent: '#cbd5e1',
    border: 'rgba(148, 163, 184, 0.25)',
    tint: '#64748b'
  }
};

/**
 * Returns dynamic styling properties based on one or more Pokémon types.
 * For dual-type Pokémon, blends primary glow with secondary ambient accents.
 */
export function getTypeBackgroundStyle(types: string[] = []): TypeVisualProfile {
  if (!types || types.length === 0) {
    return {
      primaryType: 'default',
      gradientBackground: 'linear-gradient(145deg, #090d16 0%, #0d1117 50%, #1e1b4b 100%)',
      radialGlowColor: 'rgba(168, 85, 247, 0.25)',
      accentColor: '#aa3bff',
      borderColor: 'rgba(168, 85, 247, 0.30)',
      particleTint: '#a855f7'
    };
  }

  const primary = (types[0] || '').toLowerCase().trim();
  const secondary = types[1] ? types[1].toLowerCase().trim() : null;

  const primProf = TYPE_PROFILES[primary] || TYPE_PROFILES['normal'];

  if (!secondary || !TYPE_PROFILES[secondary] || secondary === primary) {
    return {
      primaryType: primary,
      gradientBackground: primProf.gradient,
      radialGlowColor: primProf.glow,
      accentColor: primProf.accent,
      borderColor: primProf.border,
      particleTint: primProf.tint
    };
  }

  // Dual type blend
  const secProf = TYPE_PROFILES[secondary];
  return {
    primaryType: `${primary}-${secondary}`,
    gradientBackground: primProf.gradient,
    radialGlowColor: primProf.glow,
    accentColor: primProf.accent,
    borderColor: secProf.border,
    particleTint: primProf.tint
  };
}
