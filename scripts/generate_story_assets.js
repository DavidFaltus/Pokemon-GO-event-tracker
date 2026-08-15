import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storiesDir = path.resolve(__dirname, '../stories');

if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

const SECTIONS = [
  {
    id: 'weekly_lineup',
    title: 'WEEKLY LINEUP',
    shortTitle: 'WEEKLY',
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.6)',
    glowSoft: 'rgba(56, 189, 248, 0.15)',
    type: 'weekly',
    iconType: 'calendar'
  },
  {
    id: 'monthly_lineup',
    title: 'MONTHLY LINEUP',
    shortTitle: 'MONTHLY',
    color: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.6)',
    glowSoft: 'rgba(129, 140, 248, 0.15)',
    type: 'monthly',
    iconType: 'calendar'
  },
  {
    id: 'community_days',
    title: 'COMMUNITY DAYS',
    shortTitle: 'COMMUNITY',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.6)',
    glowSoft: 'rgba(16, 185, 129, 0.15)',
    type: 'community',
    iconType: 'shiny'
  },
  {
    id: 'spotlight_hour',
    title: 'SPOTLIGHT HOUR',
    shortTitle: 'SPOTLIGHT',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.6)',
    glowSoft: 'rgba(249, 115, 22, 0.15)',
    type: 'spotlight',
    iconType: 'spotlight'
  },
  {
    id: 'raid_rotation',
    title: 'RAID ROTATION',
    shortTitle: 'RAIDS',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.6)',
    glowSoft: 'rgba(59, 130, 246, 0.15)',
    type: 'raids',
    iconType: 'raids'
  },
  {
    id: 'special_events',
    title: 'SPECIAL EVENTS',
    shortTitle: 'EVENTS',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.6)',
    glowSoft: 'rgba(239, 68, 68, 0.15)',
    type: 'special',
    iconType: 'special'
  }
];

function getIconSvg(iconType, color) {
  switch (iconType) {
    case 'calendar':
      return `
        <!-- Calendar Grid & Pokeball Motif -->
        <g transform="translate(440, 1080)">
          <!-- Pokeball circle -->
          <circle cx="100" cy="40" r="48" fill="none" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="52" y1="40" x2="82" y2="40" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="118" y1="40" x2="148" y2="40" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="100" cy="40" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="100" cy="40" r="6" fill="${color}"/>
          <!-- Calendar sheet -->
          <rect x="20" y="110" width="160" height="130" rx="16" fill="rgba(255,255,255,0.03)" stroke="${color}" stroke-width="4" stroke-opacity="0.5"/>
          <!-- Calendar grid dots -->
          <circle cx="50" cy="145" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="83" cy="145" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="116" cy="145" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="150" cy="145" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="50" cy="180" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="83" cy="180" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="116" cy="180" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="150" cy="180" r="7" fill="${color}" fill-opacity="0.8"/>
          <circle cx="50" cy="215" r="7" fill="${color}" fill-opacity="0.4"/>
          <circle cx="83" cy="215" r="7" fill="${color}" fill-opacity="0.4"/>
          <circle cx="116" cy="215" r="7" fill="${color}" fill-opacity="0.4"/>
          <circle cx="150" cy="215" r="7" fill="${color}" fill-opacity="0.4"/>
        </g>
      `;
    case 'shiny':
      return `
        <!-- Shiny Sparkle & Pokeball Motif -->
        <g transform="translate(440, 1080)">
          <!-- Top Sparkle -->
          <path d="M100,0 Q100,50 150,50 Q100,50 100,100 Q100,50 50,50 Q100,50 100,0 Z" fill="${color}" filter="url(#glow)"/>
          <circle cx="155" cy="30" r="5" fill="${color}"/>
          <circle cx="45" cy="70" r="4" fill="${color}"/>
          <!-- Pokeball -->
          <g transform="translate(0, 120)">
            <circle cx="100" cy="50" r="56" fill="none" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="44" y1="50" x2="80" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="120" y1="50" x2="156" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="100" cy="50" r="18" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="100" cy="50" r="6" fill="${color}"/>
          </g>
        </g>
      `;
    case 'spotlight':
      return `
        <!-- Spotlight Rays & Star Pokeball Motif -->
        <g transform="translate(440, 1080)">
          <!-- Spotlight cones -->
          <polygon points="100,-40 20,120 180,120" fill="url(#spotlightGrad)" opacity="0.4"/>
          <!-- Star Pokeball Badge -->
          <circle cx="100" cy="50" r="56" fill="rgba(15,23,42,0.8)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="44" y1="50" x2="80" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="120" y1="50" x2="156" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="100" cy="50" r="18" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="100" cy="50" r="6" fill="${color}"/>
          <!-- Sparkles -->
          <circle cx="160" cy="20" r="6" fill="${color}" filter="url(#glow)"/>
          <circle cx="40" cy="80" r="5" fill="${color}" filter="url(#glow)"/>
        </g>
      `;
    case 'raids':
      return `
        <!-- Raid Egg & Crossed Swords Motif -->
        <g transform="translate(440, 1080)">
          <!-- Raid Egg Aura -->
          <ellipse cx="100" cy="50" rx="46" ry="60" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="16 8" filter="url(#glow)"/>
          <!-- Crossed Swords -->
          <line x1="50" y1="120" x2="150" y2="20" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
          <line x1="150" y1="120" x2="50" y2="20" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
          <!-- Sword Hilts -->
          <circle cx="50" cy="120" r="8" fill="${color}"/>
          <circle cx="150" cy="120" r="8" fill="${color}"/>
          <circle cx="100" cy="70" r="12" fill="#090d16" stroke="${color}" stroke-width="6"/>
        </g>
      `;
    case 'special':
      return `
        <!-- Special Event Star & Pokeball Motif -->
        <g transform="translate(440, 1080)">
          <!-- Star burst -->
          <path d="M100,-20 L115,25 L160,25 L125,55 L140,100 L100,70 L60,100 L75,55 L40,25 L85,25 Z" fill="none" stroke="${color}" stroke-width="6" filter="url(#glow)" opacity="0.6"/>
          <!-- Center Pokeball -->
          <g transform="translate(0, 50)">
            <circle cx="100" cy="50" r="50" fill="rgba(15,23,42,0.8)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="50" y1="50" x2="80" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="120" y1="50" x2="150" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="100" cy="50" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="100" cy="50" r="5" fill="${color}"/>
          </g>
        </g>
      `;
  }
}

// Generate 9:16 Story SVG (1080x1920)
function generateStorySvg(section) {
  const { title, color, glow, glowSoft, iconType } = section;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="20%" r="80%">
      <stop offset="0%" stop-color="${glowSoft}" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#0e1726" stop-opacity="1"/>
      <stop offset="100%" stop-color="#090d16" stop-opacity="1"/>
    </radialGradient>

    <!-- Card Gradient -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 41, 59, 0.55)"/>
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.75)"/>
    </linearGradient>

    <!-- Card Border Glow -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="${color}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Soft Glow Filter -->
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <linearGradient id="spotlightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .font-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 900; }
    .font-badge { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 700; letter-spacing: 2px; }
  </style>

  <!-- Canvas Background -->
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>

  <!-- Subtle Geometric Angular Tech Lines in Background -->
  <g stroke="${color}" stroke-opacity="0.12" stroke-width="2" fill="none">
    <path d="M-100,400 L400,100 L1180,900"/>
    <path d="M1200,1400 L700,1800 L-100,1500"/>
    <path d="M200,2000 L900,1200 L1200,1600"/>
    <polygon points="540,150 950,550 540,950 130,550" stroke-opacity="0.08"/>
  </g>

  <!-- Ambient Glow Behind Card -->
  <circle cx="540" cy="960" r="350" fill="${glowSoft}" filter="url(#softGlow)"/>

  <!-- Main Glassmorphism Frosted Card -->
  <rect x="140" y="300" width="800" height="1320" rx="44" fill="url(#cardGrad)" stroke="url(#borderGrad)" stroke-width="3" filter="drop-shadow(0 20px 40px rgba(0,0,0,0.8))"/>
  
  <!-- Subtle Top Highlight inside Card -->
  <path d="M143,344 Q143,303 184,303 L896,303 Q937,303 937,344 L937,360 L143,360 Z" fill="rgba(255,255,255,0.06)"/>

  <!-- Top Pill Badge: POGOEVENTS.APP -->
  <g transform="translate(370, 410)">
    <rect x="0" y="0" width="340" height="64" rx="32" fill="rgba(9, 13, 22, 0.85)" stroke="${color}" stroke-width="2.5" filter="url(#glow)"/>
    <text x="170" y="41" text-anchor="middle" fill="#ffffff" font-size="20" class="font-badge">POGOEVENTS.APP</text>
  </g>

  <!-- Main Headline Title -->
  <g transform="translate(540, 880)">
    <text x="0" y="0" text-anchor="middle" fill="#ffffff" font-size="78" class="font-title" letter-spacing="1.5">${title}</text>
  </g>

  <!-- Icon Section -->
  ${getIconSvg(iconType, color)}

</svg>`;
}

// Generate 1:1 Highlight Cover SVG (1080x1080)
function generateCoverSvg(section) {
  const { shortTitle, color, glow, glowSoft, iconType } = section;

  let centerIcon = '';
  switch (iconType) {
    case 'calendar':
      centerIcon = `
        <g transform="translate(465, 400)">
          <!-- Pokeball -->
          <circle cx="75" cy="40" r="44" fill="none" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="31" y1="40" x2="58" y2="40" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="92" y1="40" x2="119" y2="40" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="75" cy="40" r="15" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="75" cy="40" r="5" fill="${color}"/>
          <!-- Calendar -->
          <rect x="0" y="105" width="150" height="120" rx="16" fill="rgba(255,255,255,0.03)" stroke="${color}" stroke-width="4" stroke-opacity="0.6"/>
          <circle cx="35" cy="140" r="7" fill="${color}"/>
          <circle cx="75" cy="140" r="7" fill="${color}"/>
          <circle cx="115" cy="140" r="7" fill="${color}"/>
          <circle cx="35" cy="175" r="7" fill="${color}"/>
          <circle cx="75" cy="175" r="7" fill="${color}"/>
          <circle cx="115" cy="175" r="7" fill="${color}"/>
        </g>
      `;
      break;
    case 'shiny':
      centerIcon = `
        <g transform="translate(465, 380)">
          <path d="M75,0 Q75,45 120,45 Q75,45 75,90 Q75,45 30,45 Q75,45 75,0 Z" fill="${color}" filter="url(#glow)"/>
          <circle cx="125" cy="25" r="5" fill="${color}"/>
          <circle cx="25" cy="65" r="4" fill="${color}"/>
          <g transform="translate(0, 110)">
            <circle cx="75" cy="45" r="50" fill="none" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="25" y1="45" x2="58" y2="45" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="92" y1="45" x2="125" y2="45" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="75" cy="45" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="75" cy="45" r="5" fill="${color}"/>
          </g>
        </g>
      `;
      break;
    case 'spotlight':
      centerIcon = `
        <g transform="translate(465, 390)">
          <polygon points="75,-20 10,110 140,110" fill="${color}" fill-opacity="0.25"/>
          <circle cx="75" cy="50" r="50" fill="rgba(15,23,42,0.8)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="25" y1="50" x2="58" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="92" y1="50" x2="125" y2="50" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="75" cy="50" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="75" cy="50" r="5" fill="${color}"/>
        </g>
      `;
      break;
    case 'raids':
      centerIcon = `
        <g transform="translate(465, 390)">
          <ellipse cx="75" cy="45" rx="40" ry="55" fill="none" stroke="${color}" stroke-width="7" stroke-dasharray="14 7" filter="url(#glow)"/>
          <line x1="30" y1="110" x2="120" y2="20" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
          <line x1="120" y1="110" x2="30" y2="20" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
          <circle cx="30" cy="110" r="7" fill="${color}"/>
          <circle cx="120" cy="110" r="7" fill="${color}"/>
        </g>
      `;
      break;
    case 'special':
      centerIcon = `
        <g transform="translate(465, 390)">
          <path d="M75,-15 L87,20 L125,20 L95,45 L107,80 L75,55 L43,80 L55,45 L25,20 L63,20 Z" fill="none" stroke="${color}" stroke-width="5" filter="url(#glow)" opacity="0.6"/>
          <g transform="translate(0, 45)">
            <circle cx="75" cy="45" r="45" fill="rgba(15,23,42,0.8)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="30" y1="45" x2="58" y2="45" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="92" y1="45" x2="120" y2="45" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="75" cy="45" r="15" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="75" cy="45" r="5" fill="${color}"/>
          </g>
        </g>
      `;
      break;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <radialGradient id="coverBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#141e33" stop-opacity="1"/>
      <stop offset="100%" stop-color="#070a12" stop-opacity="1"/>
    </radialGradient>

    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
      <stop offset="50%" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0.9"/>
    </linearGradient>

    <radialGradient id="innerGlass" cx="35%" cy="35%" r="75%">
      <stop offset="0%" stop-color="rgba(30, 41, 59, 0.7)"/>
      <stop offset="100%" stop-color="rgba(10, 15, 26, 0.95)"/>
    </radialGradient>

    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <style>
    .font-cover-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-weight: 800; letter-spacing: 4px; }
  </style>

  <!-- Background -->
  <rect width="1080" height="1080" fill="url(#coverBg)"/>

  <!-- Ambient Light -->
  <circle cx="540" cy="540" r="380" fill="${glowSoft}" filter="url(#glow)"/>

  <!-- Outer Neon Ring (Highlights Circle) -->
  <circle cx="540" cy="540" r="370" fill="none" stroke="url(#ringGrad)" stroke-width="8" filter="url(#ringGlow)"/>

  <!-- Inner Obsidian Glass Button -->
  <circle cx="540" cy="540" r="350" fill="url(#innerGlass)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>

  <!-- Glass Light Reflection Arc -->
  <path d="M260,340 A350,350 0 0,1 680,210" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round"/>

  <!-- Center Motif Icon -->
  ${centerIcon}

  <!-- Bottom Label -->
  <g transform="translate(540, 710)">
    <text x="0" y="0" text-anchor="middle" fill="${color}" font-size="34" class="font-cover-title" filter="url(#glow)">${shortTitle}</text>
  </g>
</svg>`;
}

// Generate all files
SECTIONS.forEach(sec => {
  const storySvg = generateStorySvg(sec);
  const coverSvg = generateCoverSvg(sec);

  fs.writeFileSync(path.join(storiesDir, `story_${sec.id}.svg`), storySvg, 'utf8');
  fs.writeFileSync(path.join(storiesDir, `cover_${sec.id}.svg`), coverSvg, 'utf8');
  console.log(`Generated SVG for ${sec.id}`);
});

console.log('All 12 SVGs generated successfully in stories directory!');
