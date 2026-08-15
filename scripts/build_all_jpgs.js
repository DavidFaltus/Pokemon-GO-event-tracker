import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const storiesDir = path.join(projectRoot, 'stories');
const tempDir = path.join(projectRoot, 'temp_render');

if (!fs.existsSync(storiesDir)) fs.mkdirSync(storiesDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const SECTIONS = [
  {
    id: 'weekly_lineup',
    title: 'WEEKLY LINEUP',
    shortTitle: 'WEEKLY',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.75)',
    glowSoft: 'rgba(56, 189, 248, 0.18)',
    badgeColor: '#38bdf8',
    iconType: 'weekly_calendar'
  },
  {
    id: 'monthly_lineup',
    title: 'MONTHLY LINEUP',
    shortTitle: 'MONTHLY',
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.75)',
    glowSoft: 'rgba(129, 140, 248, 0.18)',
    badgeColor: '#818cf8',
    iconType: 'monthly_calendar'
  },
  {
    id: 'community_days',
    title: 'COMMUNITY DAYS',
    shortTitle: 'COMMUNITY',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.75)',
    glowSoft: 'rgba(16, 185, 129, 0.18)',
    badgeColor: '#10b981',
    iconType: 'shiny_star'
  },
  {
    id: 'spotlight_hour',
    title: 'SPOTLIGHT HOUR',
    shortTitle: 'SPOTLIGHT',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.75)',
    glowSoft: 'rgba(249, 115, 22, 0.18)',
    badgeColor: '#f97316',
    iconType: 'spotlight'
  },
  {
    id: 'raid_rotation',
    title: 'RAID ROTATION',
    shortTitle: 'RAIDS',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.75)',
    glowSoft: 'rgba(59, 130, 246, 0.18)',
    badgeColor: '#3b82f6',
    iconType: 'raids'
  },
  {
    id: 'special_events',
    title: 'SPECIAL EVENTS',
    shortTitle: 'EVENTS',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.75)',
    glowSoft: 'rgba(239, 68, 68, 0.18)',
    badgeColor: '#ef4444',
    iconType: 'special'
  }
];

function getStoryIconSvg(iconType, color) {
  switch (iconType) {
    case 'weekly_calendar':
      return `
        <!-- SINGLE WEEK CALENDAR MOTIF (7 DAYS) -->
        <g transform="translate(540, 1180)">
          <!-- Pokeball above weekly strip -->
          <g transform="translate(0, -60)">
            <circle cx="0" cy="0" r="56" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="-54" y1="0" x2="-22" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="22" y1="0" x2="54" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="20" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="0" cy="0" r="7" fill="${color}"/>
          </g>

          <!-- 1-Week Timeline Bar with 7 Day Slots (Mon - Sun) -->
          <g transform="translate(0, 80)">
            <rect x="-240" y="-35" width="480" height="70" rx="20" fill="rgba(15,23,42,0.85)" stroke="${color}" stroke-width="3" stroke-opacity="0.6"/>
            <!-- 7 Day Columns -->
            <g transform="translate(-205, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">M</text>
            </g>
            <g transform="translate(-137, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">T</text>
            </g>
            <g transform="translate(-68, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">W</text>
            </g>
            <g transform="translate(0, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">T</text>
            </g>
            <g transform="translate(68, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">F</text>
            </g>
            <g transform="translate(137, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">S</text>
            </g>
            <g transform="translate(205, 0)">
              <circle cx="0" cy="0" r="16" fill="${color}" fill-opacity="0.9"/>
              <text x="0" y="5" text-anchor="middle" fill="#090d16" font-size="13" font-family="sans-serif" font-weight="900">S</text>
            </g>
          </g>
        </g>
      `;

    case 'monthly_calendar':
      return `
        <!-- SINGLE MONTH CALENDAR MOTIF (Full Month Grid) -->
        <g transform="translate(540, 1180)">
          <!-- Pokeball above monthly grid -->
          <g transform="translate(0, -90)">
            <circle cx="0" cy="0" r="54" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="-52" y1="0" x2="-22" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="22" y1="0" x2="52" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="20" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="0" cy="0" r="7" fill="${color}"/>
          </g>

          <!-- 1-Month Calendar Sheet with Days Grid -->
          <g transform="translate(-160, 0)">
            <rect x="0" y="0" width="320" height="180" rx="20" fill="rgba(15,23,42,0.85)" stroke="${color}" stroke-width="3" stroke-opacity="0.6"/>
            <!-- Calendar header line -->
            <line x1="16" y1="36" x2="304" y2="36" stroke="${color}" stroke-width="2" stroke-opacity="0.4"/>
            <!-- 4 rows x 7 days grid -->
            ${[0,1,2,3].map(row => 
              [0,1,2,3,4,5,6].map(col => `
                <rect x="${32 + col * 38}" y="${54 + row * 28}" width="22" height="16" rx="4" fill="${color}" fill-opacity="${(row*7+col) < 30 ? (col === 0 || col === 6 ? '0.9' : '0.45') : '0'}"/>
              `).join('')
            ).join('')}
          </g>
        </g>
      `;

    case 'shiny_star':
      return `
        <!-- SHINY SPARKLE STAR & POKEBALL MOTIF -->
        <g transform="translate(540, 1180)">
          <!-- Top Sparkle Star -->
          <path d="M0,-120 Q0,-65 55,-65 Q0,-65 0,-10 Q0,-65 -55,-65 Q0,-65 0,-120 Z" fill="${color}" filter="url(#glow)"/>
          <circle cx="70" cy="-90" r="7" fill="${color}" filter="url(#glow)"/>
          <circle cx="-65" cy="-35" r="5" fill="${color}" filter="url(#glow)"/>
          <!-- Pokeball -->
          <g transform="translate(0, 50)">
            <circle cx="0" cy="0" r="62" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="9" filter="url(#glow)"/>
            <line x1="-60" y1="0" x2="-24" y2="0" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
            <line x1="24" y1="0" x2="60" y2="0" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="22" fill="#090d16" stroke="${color}" stroke-width="9"/>
            <circle cx="0" cy="0" r="8" fill="${color}"/>
          </g>
        </g>
      `;

    case 'spotlight':
      return `
        <!-- SPOTLIGHT BEAM & STAR POKEBALL MOTIF -->
        <g transform="translate(540, 1180)">
          <!-- Spotlight cone light -->
          <polygon points="0,-140 -180,120 180,120" fill="url(#spotlightGrad)" opacity="0.45"/>
          <!-- Star Pokeball Badge -->
          <g transform="translate(0, 0)">
            <circle cx="0" cy="0" r="62" fill="rgba(15,23,42,0.9)" stroke="${color}" stroke-width="9" filter="url(#glow)"/>
            <line x1="-60" y1="0" x2="-24" y2="0" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
            <line x1="24" y1="0" x2="60" y2="0" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="22" fill="#090d16" stroke="${color}" stroke-width="9"/>
            <circle cx="0" cy="0" r="8" fill="${color}"/>
            <circle cx="80" cy="-60" r="8" fill="${color}" filter="url(#glow)"/>
            <circle cx="-80" cy="40" r="6" fill="${color}" filter="url(#glow)"/>
          </g>
        </g>
      `;

    case 'raids':
      return `
        <!-- RAID EGG & CROSSED SWORDS MOTIF -->
        <g transform="translate(540, 1180)">
          <!-- Raid Egg Aura -->
          <ellipse cx="0" cy="-30" rx="55" ry="72" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" stroke-dasharray="20 10" filter="url(#glow)"/>
          <!-- Crossed Swords -->
          <line x1="-70" y1="60" x2="70" y2="-80" stroke="${color}" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
          <line x1="70" y1="60" x2="-70" y2="-80" stroke="${color}" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
          <!-- Sword Pommels -->
          <circle cx="-70" cy="60" r="10" fill="${color}"/>
          <circle cx="70" cy="60" r="10" fill="${color}"/>
          <!-- Center Aura Badge -->
          <circle cx="0" cy="-10" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="0" cy="-10" r="6" fill="${color}"/>
        </g>
      `;

    case 'special':
      return `
        <!-- SPECIAL EVENT STAR & POKEBALL MOTIF -->
        <g transform="translate(540, 1180)">
          <!-- 8-point Event Star Aura -->
          <path d="M0,-120 L25,-40 L105,-40 L40,10 L65,90 L0,40 L-65,90 L-40,10 L-105,-40 L-25,-40 Z" fill="rgba(15,23,42,0.7)" stroke="${color}" stroke-width="6" filter="url(#glow)"/>
          <!-- Center Pokeball -->
          <g transform="translate(0, 15)">
            <circle cx="0" cy="0" r="54" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="-52" y1="0" x2="-20" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="20" y1="0" x2="52" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="18" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="0" cy="0" r="7" fill="${color}"/>
          </g>
        </g>
      `;
  }
}

function buildStoryHtml(section) {
  const { title, color, glowColor, glowSoft, iconType } = section;
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body { width:1080px; height:1920px; overflow:hidden; background:#090d16; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .canvas {
      position:relative;
      width:1080px;
      height:1920px;
      background: radial-gradient(circle at 50% 18%, ${glowSoft} 0%, #0d1424 45%, #090d16 100%);
      display:flex;
      align-items:center;
      justify-content:center;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <svg viewBox="0 0 1080 1920" width="1080" height="1920">
      <defs>
        <!-- Card Fill Gradient -->
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.55)"/>
          <stop offset="100%" stop-color="rgba(15, 23, 42, 0.8)"/>
        </linearGradient>

        <!-- Card Border Glow -->
        <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.9"/>
        </linearGradient>

        <!-- Neon Glow Filter -->
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur2"/>
          <feMerge>
            <feMergeNode in="blur2"/>
            <feMergeNode in="blur1"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <!-- Soft Glow Filter -->
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <linearGradient id="spotlightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Background Tech Lines -->
      <g stroke="${color}" stroke-opacity="0.1" stroke-width="2" fill="none">
        <path d="M-100,450 L420,120 L1180,880"/>
        <path d="M1200,1350 L680,1850 L-100,1520"/>
        <polygon points="540,160 960,580 540,1000 120,580" stroke-opacity="0.06"/>
      </g>

      <!-- Ambient Glow Behind Card -->
      <circle cx="540" cy="960" r="380" fill="${glowSoft}" filter="url(#softGlow)"/>

      <!-- Main Frosted Glass Card -->
      <rect x="140" y="300" width="800" height="1320" rx="44" fill="url(#cardGrad)" stroke="url(#borderGrad)" stroke-width="3.5" filter="drop-shadow(0 25px 50px rgba(0,0,0,0.85))"/>

      <!-- Card Top Glass Glare -->
      <path d="M144,344 Q144,304 184,304 L896,304 Q936,304 936,344 L936,364 L144,364 Z" fill="rgba(255,255,255,0.06)"/>

      <!-- Top Pill Badge: POGOEVENTS.APP -->
      <g transform="translate(370, 420)">
        <rect x="0" y="0" width="340" height="66" rx="33" fill="rgba(9, 13, 22, 0.88)" stroke="${color}" stroke-width="2.5" filter="url(#glow)"/>
        <text x="170" y="42" text-anchor="middle" fill="#ffffff" font-size="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" letter-spacing="2.5">POGOEVENTS.APP</text>
      </g>

      <!-- Title Headline -->
      <g transform="translate(540, 890)">
        <text x="0" y="0" text-anchor="middle" fill="#ffffff" font-size="76" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" letter-spacing="2">${title}</text>
      </g>

      <!-- Category Icon Motif -->
      ${getStoryIconSvg(iconType, color)}
    </svg>
  </div>
</body>
</html>`;
}

function buildCoverHtml(section) {
  const { shortTitle, color, glowColor, glowSoft, iconType } = section;

  let centerIcon = '';
  switch (iconType) {
    case 'weekly_calendar':
      centerIcon = `
        <!-- Single Week Highlight Icon -->
        <g transform="translate(540, 470)">
          <!-- Pokeball -->
          <circle cx="0" cy="-45" r="46" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="-44" y1="-45" x2="-18" y2="-45" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="18" y1="-45" x2="44" y2="-45" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="0" cy="-45" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="0" cy="-45" r="6" fill="${color}"/>
          <!-- 1-Week Timeline (7 day dots) -->
          <rect x="-160" y="25" width="320" height="50" rx="16" fill="rgba(15,23,42,0.85)" stroke="${color}" stroke-width="3" stroke-opacity="0.6"/>
          ${[-120, -80, -40, 0, 40, 80, 120].map(x => `<circle cx="${x}" cy="50" r="11" fill="${color}"/>`).join('')}
        </g>
      `;
      break;

    case 'monthly_calendar':
      centerIcon = `
        <!-- Single Month Highlight Icon -->
        <g transform="translate(540, 460)">
          <!-- Pokeball -->
          <circle cx="0" cy="-60" r="44" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="-42" y1="-60" x2="-18" y2="-60" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="18" y1="-60" x2="42" y2="-60" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="0" cy="-60" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="0" cy="-60" r="6" fill="${color}"/>
          <!-- Month Grid -->
          <g transform="translate(-110, 0)">
            <rect x="0" y="0" width="220" height="130" rx="14" fill="rgba(15,23,42,0.85)" stroke="${color}" stroke-width="3" stroke-opacity="0.6"/>
            ${[0,1,2].map(r => [0,1,2,3,4].map(c => `<rect x="${20 + c * 38}" y="${24 + r * 32}" width="18" height="14" rx="3" fill="${color}" fill-opacity="${c === 0 || c === 4 ? '0.9' : '0.45'}"/>`).join('')).join('')}
          </g>
        </g>
      `;
      break;

    case 'shiny_star':
      centerIcon = `
        <g transform="translate(540, 470)">
          <path d="M0,-95 Q0,-50 45,-50 Q0,-50 0,-5 Q0,-50 -45,-50 Q0,-50 0,-95 Z" fill="${color}" filter="url(#glow)"/>
          <g transform="translate(0, 40)">
            <circle cx="0" cy="0" r="50" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="-48" y1="0" x2="-20" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="20" y1="0" x2="48" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="18" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="0" cy="0" r="7" fill="${color}"/>
          </g>
        </g>
      `;
      break;

    case 'spotlight':
      centerIcon = `
        <g transform="translate(540, 480)">
          <polygon points="0,-100 -120,70 120,70" fill="${color}" fill-opacity="0.25"/>
          <circle cx="0" cy="0" r="50" fill="rgba(15,23,42,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
          <line x1="-48" y1="0" x2="-20" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <line x1="20" y1="0" x2="48" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="18" fill="#090d16" stroke="${color}" stroke-width="8"/>
          <circle cx="0" cy="0" r="7" fill="${color}"/>
        </g>
      `;
      break;

    case 'raids':
      centerIcon = `
        <g transform="translate(540, 480)">
          <ellipse cx="0" cy="-20" rx="42" ry="58" fill="none" stroke="${color}" stroke-width="7" stroke-dasharray="14 7" filter="url(#glow)"/>
          <line x1="-55" y1="50" x2="55" y2="-60" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
          <line x1="55" y1="50" x2="-55" y2="-60" stroke="${color}" stroke-width="8" stroke-linecap="round" filter="url(#glow)"/>
          <circle cx="-55" cy="50" r="8" fill="${color}"/>
          <circle cx="55" cy="50" r="8" fill="${color}"/>
        </g>
      `;
      break;

    case 'special':
      centerIcon = `
        <g transform="translate(540, 480)">
          <path d="M0,-85 L18,-25 L80,-25 L30,12 L50,70 L0,32 L-50,70 L-30,12 L-80,-25 L-18,-25 Z" fill="none" stroke="${color}" stroke-width="5" filter="url(#glow)" opacity="0.6"/>
          <g transform="translate(0, 15)">
            <circle cx="0" cy="0" r="44" fill="rgba(9,13,22,0.9)" stroke="${color}" stroke-width="8" filter="url(#glow)"/>
            <line x1="-42" y1="0" x2="-18" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <line x1="18" y1="0" x2="42" y2="0" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="16" fill="#090d16" stroke="${color}" stroke-width="8"/>
            <circle cx="0" cy="0" r="6" fill="${color}"/>
          </g>
        </g>
      `;
      break;
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body { width:1080px; height:1080px; overflow:hidden; background:#070a12; font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .canvas {
      position:relative;
      width:1080px;
      height:1080px;
      background: radial-gradient(circle at 50% 50%, #141e33 0%, #070a12 100%);
      display:flex;
      align-items:center;
      justify-content:center;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <svg viewBox="0 0 1080 1080" width="1080" height="1080">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
          <stop offset="50%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.95"/>
        </linearGradient>

        <radialGradient id="innerGlass" cx="35%" cy="35%" r="75%">
          <stop offset="0%" stop-color="rgba(30, 41, 59, 0.75)"/>
          <stop offset="100%" stop-color="rgba(9, 13, 22, 0.96)"/>
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
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Ambient Glow Behind Ring -->
      <circle cx="540" cy="540" r="390" fill="${glowSoft}" filter="url(#glow)"/>

      <!-- Outer Neon Ring (Highlights Circle) -->
      <circle cx="540" cy="540" r="375" fill="none" stroke="url(#ringGrad)" stroke-width="8" filter="url(#ringGlow)"/>

      <!-- Inner Obsidian Glass Button -->
      <circle cx="540" cy="540" r="352" fill="url(#innerGlass)" stroke="rgba(255,255,255,0.08)" stroke-width="2.5"/>

      <!-- Glass Arc Highlight -->
      <path d="M260,340 A352,352 0 0,1 680,205" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Center Category Icon -->
      ${centerIcon}

      <!-- Bottom Category Label -->
      <g transform="translate(540, 715)">
        <text x="0" y="0" text-anchor="middle" fill="${color}" font-size="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" letter-spacing="4.5" filter="url(#glow)">${shortTitle}</text>
      </g>
    </svg>
  </div>
</body>
</html>`;
}

// 1. Write HTML render files
console.log('Writing HTML render templates to temp_render...');
SECTIONS.forEach(sec => {
  fs.writeFileSync(path.join(tempDir, `story_${sec.id}.html`), buildStoryHtml(sec), 'utf8');
  fs.writeFileSync(path.join(tempDir, `cover_${sec.id}.html`), buildCoverHtml(sec), 'utf8');
});

// 2. Render all via PowerShell script
console.log('Running PowerShell rasterizer via Edge headless...');
execSync(`powershell -ExecutionPolicy Bypass -File "${path.join(__dirname, 'render_all.ps1')}"`, { stdio: 'inherit' });

// 3. Clean up temporary render directory & leftover SVGs
console.log('Cleaning up temporary render files and old SVGs...');
fs.rmSync(tempDir, { recursive: true, force: true });

// Remove any .svg files in storiesDir
const existingStoriesFiles = fs.readdirSync(storiesDir);
for (const file of existingStoriesFiles) {
  if (file.endsWith('.svg') || file.endsWith('.png')) {
    fs.unlinkSync(path.join(storiesDir, file));
  }
}

console.log('DONE! All 12 assets are now 100% crisp JPG files in stories directory.');
