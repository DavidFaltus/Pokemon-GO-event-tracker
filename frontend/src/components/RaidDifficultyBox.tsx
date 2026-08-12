import React from 'react';
import type { Language } from '../data/translations';
import { ExternalLink, Users, User, AlertTriangle } from 'lucide-react';

interface RaidDifficultyBoxProps {
  bossName: string;
  tier?: string;
  playersRecommended?: string | { cs: string; en: string; ja?: string; ru?: string };
  difficultyTier?: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group';
  difficultyNotes?: { cs: string; en: string; ja?: string; ru?: string };
  pokebattlerUrl?: string;
  lang: Language;
}

export function getBossDifficultyInfo(
  bossName: string,
  tier: string = '5',
  playersRecommended?: any,
  difficultyTier?: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group',
  difficultyNotes?: any,
  lang: Language = 'en'
): { difficultyTier: 'solo' | 'duo' | 'trio' | 'group' | 'hard-group'; recLabel: string; noteText: string } {
  const lowerName = bossName.toLowerCase().trim();
  let dt = difficultyTier;

  if (!dt) {
    if (tier === '1' || tier === 'shadow-1') {
      dt = 'solo';
    } else if (tier === '3' || tier === 'shadow-3') {
      dt = (lowerName.includes('shuckle') || lowerName.includes('blissey')) ? 'trio' : 'solo';
    } else if (lowerName.includes('primal') || lowerName.includes('shadow lugia') || lowerName.includes('shadow mewtwo') || lowerName.includes('mega rayquaza') || lowerName.includes('mega latios') || lowerName.includes('mega latias')) {
      dt = 'hard-group';
    } else if (lowerName.includes('registeel') || lowerName.includes('regirock') || lowerName.includes('regice') || lowerName.includes('regigigas') || lowerName.includes('deoxys') || lowerName.includes('cresselia') || lowerName.includes('lugia') || lowerName.includes('armored mewtwo')) {
      dt = 'group';
    } else if (lowerName.includes('kartana') || lowerName.includes('rayquaza') || lowerName.includes('landorus') || lowerName.includes('genesect') || lowerName.includes('heatran') || lowerName.includes('guzzlord') || lowerName.includes('nihilego') || lowerName.includes('terrakion') || lowerName.includes('virizion') || lowerName.includes('moltres') || lowerName.includes('articuno') || lowerName.includes('ho-oh')) {
      dt = 'duo';
    } else {
      dt = 'trio';
    }
  }

  let recLabel = '';
  if (typeof playersRecommended === 'object' && playersRecommended !== null) {
    recLabel = (playersRecommended as any)[lang] || (playersRecommended as any).en || (playersRecommended as any).cs;
  } else if (typeof playersRecommended === 'string' && playersRecommended.trim().length > 0) {
    if (lang !== 'cs') {
      recLabel = playersRecommended
        .replace(/1 hráč \(Solo\)/gi, '1 Player (Solo)')
        .replace(/1–2 hráči \(Duo\)/gi, '1–2 Players (Duo)')
        .replace(/2–3 hráči \(Trio\)/gi, '2–3 Players (Trio)')
        .replace(/2–3 hráči/gi, '2–3 Players')
        .replace(/3–5 hráčů/gi, '3–5 Players')
        .replace(/5\+ hráčů/gi, '5+ Players')
        .replace(/hráčů|hráči|hráč/gi, 'Players');
    } else {
      recLabel = playersRecommended;
    }
  }

  if (!recLabel) {
    if (dt === 'solo') {
      recLabel = lang === 'cs' ? '1 hráč (Solo)' : lang === 'ja' ? '1人 (ソロ)' : lang === 'ru' ? '1 игрок (Соло)' : '1 Player (Solo)';
    } else if (dt === 'duo') {
      recLabel = lang === 'cs' ? '1–2 hráči (Duo)' : lang === 'ja' ? '1-2人 (デュオ)' : lang === 'ru' ? '1–2 игрока (Дуэт)' : '1–2 Players (Duo)';
    } else if (dt === 'trio') {
      recLabel = lang === 'cs' ? '2–3 hráči (Trio)' : lang === 'ja' ? '2-3人 (トリオ)' : lang === 'ru' ? '2–3 игрока (Трио)' : '2–3 Players (Trio)';
    } else if (dt === 'group') {
      recLabel = lang === 'cs' ? '3–5 hráčů (Skupina)' : lang === 'ja' ? '3-5人 (グループ)' : lang === 'ru' ? '3–5 игроков (Группа)' : '3–5 Players (Group)';
    } else {
      recLabel = lang === 'cs' ? '5+ hráčů (Velká skupina)' : lang === 'ja' ? '5人以上' : lang === 'ru' ? '5+ игроков (Большая группа)' : '5+ Players (Large Group)';
    }
  }

  let noteText = '';
  if (difficultyNotes) {
    noteText = (difficultyNotes as any)[lang] || (difficultyNotes as any).en || (difficultyNotes as any).cs || '';
  }

  if (!noteText) {
    if (tier === '1' || tier === 'shadow-1') {
      noteText = lang === 'cs' ? 'Velmi snadný raid. Zvládne 1 hráč s jakýmikoliv běžnými pokémony.' : 'Very easy raid. Soloable by 1 player with standard Pokémon.';
    } else if (tier === '3' || tier === 'shadow-3') {
      if (lowerName.includes('shuckle') || lowerName.includes('blissey')) {
        noteText = lang === 'cs' ? 'Nezvykle vysoká obrana! Pro sólo vyžaduje L40+ countery.' : 'Unusually high Defense! Requires L40+ counters for solo.';
      } else {
        noteText = lang === 'cs' ? 'Vhodné pro 1 hráče s doporučenými countery na L30+.' : 'Soloable by 1 player using recommended counters at Level 30+.';
      }
    } else if (dt === 'hard-group') {
      noteText = lang === 'cs' ? 'Extrémně obtížný raid! Vyžaduje alespoň 5–8 hráčů s Mega evolucemi, Purified Gems a Party Play.' : 'Extremely difficult raid! Recommend at least 5–8 players with Megas, Purified Gems, and Party Play.';
    } else if (dt === 'group') {
      noteText = lang === 'cs' ? 'Vysoká obrana (Defense stat)! Doporučujeme skupinu 3–5 hráčů s countery L35+.' : 'High Defense stat! Recommend a group of 3–5 players with L35+ counters.';
    } else if (dt === 'duo') {
      noteText = lang === 'cs' ? 'Tento boss má 4x typovou slabost! Dva hráči s countery L35+ ho snadno porazí.' : 'This boss has a 4x type weakness! Duoable with L35+ counters with plenty of time remaining.';
    } else if (tier === 'shadow-5' || lowerName.includes('shadow')) {
      noteText = lang === 'cs' ? 'Tento Shadow 5* raid je zvládnutelný ve 3 lidech (případně ve 2 se silnými Mega countery a Purified Gems).' : 'This Shadow 5* raid is manageable with 3 players (or 2 with strong Megas and Purified Gems).';
    } else {
      noteText = lang === 'cs' ? 'Zvládnutelné ve 2–3 hráčích se silnými typovými countery L35+ a Mega evolucemi.' : 'Manageable with 2–3 players using strong L35+ counters and Megas.';
    }
  }

  return { difficultyTier: dt, recLabel, noteText };
}

export const RaidDifficultyBox: React.FC<RaidDifficultyBoxProps> = ({
  bossName,
  tier = '5',
  playersRecommended,
  difficultyTier,
  difficultyNotes,
  pokebattlerUrl,
  lang = 'en'
}) => {
  const cleanName = bossName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_');
  let levelParam = 'RAID_LEVEL_5';
  if (tier === '1') levelParam = 'RAID_LEVEL_1';
  else if (tier === '3') levelParam = 'RAID_LEVEL_3';
  else if (tier === 'mega') levelParam = 'RAID_LEVEL_MEGA';
  else if (tier === 'shadow-1') levelParam = 'RAID_LEVEL_SHADOW_1';
  else if (tier === 'shadow-3') levelParam = 'RAID_LEVEL_SHADOW_3';
  else if (tier === 'shadow-5') levelParam = 'RAID_LEVEL_SHADOW_5';

  const defaultPokebattlerUrl = pokebattlerUrl || `https://www.pokebattler.com/raids/defenders/${cleanName}/levels/${levelParam}/attackers/levels/40/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC`;

  const { difficultyTier: dt, recLabel, noteText } = getBossDifficultyInfo(
    bossName,
    tier,
    playersRecommended,
    difficultyTier,
    difficultyNotes,
    lang
  );

  let badgeBg = 'rgba(234, 179, 8, 0.15)';
  let badgeBorder = 'rgba(234, 179, 8, 0.3)';
  let badgeColor = '#facc15';

  if (dt === 'solo') {
    badgeBg = 'rgba(34, 197, 94, 0.15)';
    badgeBorder = 'rgba(34, 197, 94, 0.3)';
    badgeColor = '#4ade80';
  } else if (dt === 'duo') {
    badgeBg = 'rgba(59, 130, 246, 0.15)';
    badgeBorder = 'rgba(59, 130, 246, 0.3)';
    badgeColor = '#60a5fa';
  } else if (dt === 'trio') {
    badgeBg = 'rgba(168, 85, 247, 0.15)';
    badgeBorder = 'rgba(168, 85, 247, 0.3)';
    badgeColor = '#c084fc';
  } else if (dt === 'hard-group') {
    badgeBg = 'rgba(239, 68, 68, 0.15)';
    badgeBorder = 'rgba(239, 68, 68, 0.3)';
    badgeColor = '#f87171';
  }

  const recHeaderTitle = lang === 'cs' ? 'Doporučený počet hráčů:' : lang === 'ja' ? '推奨人数:' : lang === 'ru' ? 'Рекомендуемое число игроков:' : 'Recommended Players:';

  return (
    <div 
      className="raid-difficulty-box" 
      style={{ 
        background: 'rgba(15, 23, 42, 0.65)', 
        border: '1px solid var(--border-color)', 
        borderRadius: '14px', 
        padding: '12px 14px', 
        marginBottom: '12px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {recHeaderTitle}
          </span>
          <span 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '5px', 
              padding: '3px 9px', 
              fontSize: '0.78rem', 
              fontWeight: 700, 
              borderRadius: '8px', 
              background: badgeBg, 
              border: `1px solid ${badgeBorder}`, 
              color: badgeColor 
            }}
          >
            {dt === 'solo' ? <User size={13} /> : dt === 'hard-group' ? <AlertTriangle size={13} /> : <Users size={13} />}
            {recLabel}
          </span>
        </div>

        <a
          href={defaultPokebattlerUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '5px', 
            fontSize: '0.78rem', 
            fontWeight: 700, 
            color: '#38bdf8', 
            textDecoration: 'none', 
            background: 'rgba(56, 189, 248, 0.12)', 
            border: '1px solid rgba(56, 189, 248, 0.3)', 
            padding: '5px 11px', 
            borderRadius: '8px', 
            transition: 'all 0.2s' 
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.25)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)'; }}
        >
          <span>Pokebattler.com</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {noteText && (
        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
          💡 {noteText}
        </p>
      )}
    </div>
  );
};
