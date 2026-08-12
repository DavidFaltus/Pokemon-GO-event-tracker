import React from 'react';
import './Footer.css';
import type { Language } from '../data/translations';
import type { LegalModalType } from './LegalModals';
import { PokeballLogo } from './PokeballLogo';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenTab: (tab: string) => void;
  onOpenLegalModal: (type: LegalModalType) => void;
}

export const InstagramLogo = ({ size = 15, color = '#ffffff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <circle cx="17.5" cy="6.5" r="1" fill={color}/>
  </svg>
);

export const TikTokLogo = ({ size = 15, color = '#ffffff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.11V9.32a6.33 6.33 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.27 8.27 0 0 0 4.96 1.63V7.23a4.85 4.85 0 0 1-1-.54z"/>
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ lang, onOpenTab, onOpenLegalModal }) => {
  const getTranslation = (key: string) => {
    const labels: Record<string, Record<Language, string>> = {
      brandDesc: {
        cs: "Kompletní neoficiální průvodce a real-time tracker událostí, raidů, rocket lídrů a statistik pro hru Pokémon GO.",
        en: "Ultimate unofficial real-time tracker and master guide for Pokémon GO events, raid bosses, Rocket lineups, and PvE stats.",
        ja: "Pokémon GOのイベント、レイド、ロケット団、PvE統計のリアルタイム追跡＆完全攻略ガイド。",
        ru: "Неофициальный реальный трекер и гайд по ивентам, рейдам, Ракете и PvE статистике для Pokémon GO."
      },
      navigation: {
        cs: "Navigace",
        en: "Navigation",
        ja: "ナビゲーション",
        ru: "Навигация"
      },
      navEvents: {
        cs: "Události",
        en: "Events",
        ja: "イベント",
        ru: "События"
      },
      navRaids: {
        cs: "Raid Bossové",
        en: "Raid Bosses",
        ja: "レイドボス",
        ru: "Рейд-боссы"
      },
      navRocket: {
        cs: "Team GO Rocket",
        en: "Team GO Rocket",
        ja: "Team GO Rocket",
        ru: "Team GO Rocket"
      },
      navRankings: {
        cs: "PvE Žebříčky",
        en: "PvE Rankings",
        ja: "PvEランキング",
        ru: "PvE Рейтинги"
      },
      guides: {
        cs: "Průvodce & Články",
        en: "Guides & Articles",
        ja: "ガイド & 記事",
        ru: "Гайды и Статьи"
      },
      allGuides: {
        cs: "Všechny články",
        en: "All Articles",
        ja: "すべての記事",
        ru: "Все статьи"
      },
      guideRocket: {
        cs: "Návod na Team GO Rocket",
        en: "Team GO Rocket Guide",
        ja: "GOロケット団攻略ガイド",
        ru: "Гайд по Команде GO Ракета"
      },
      guideRaid: {
        cs: "Strategie na Raidy & 100% IV",
        en: "Raid Counter Strategy",
        ja: "レイドカウンター戦略",
        ru: "Стратегии в рейдах"
      },
      socials: {
        cs: "Sledujte Nás",
        en: "Follow Us",
        ja: "フォローする",
        ru: "Мы в соцсетях"
      },
      about: {
        cs: "O projektu",
        en: "About Project",
        ja: "プロジェクト概要",
        ru: "О проекте"
      },
      privacy: {
        cs: "Zásady ochrany soukromí",
        en: "Privacy Policy",
        ja: "プライバシーポリシー",
        ru: "Конфиденциальность"
      },
      tagline: {
        cs: "Vytvořeno s vášní pro trenéry po celém světě.",
        en: "Built with passion for trainers worldwide.",
        ja: "世界中のトレーナーのために作成。",
        ru: "Создано с любовью для тренеров по всему миру."
      },
      copyrightNotice: {
        cs: "© 2026 PoGo Events. Neoficiální fanouškovská komunitní aplikace. Všechna práva k ochranným známkám Pokémon náleží společnostem Nintendo, Game Freak & Niantic, Inc.",
        en: "© 2026 PoGo Events. Unofficial fan application. Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak & Niantic, Inc.",
        ja: "© 2026 PoGo Events. 非公式ファンアプリケーション。Pokémonおよびポケモンキャラクター名は任天堂、ゲームフリーク、Niantic, Inc.の商標です。",
        ru: "© 2026 PoGo Events. Неофициальное фан-приложение. Торговые марки Pokémon принадлежат Nintendo, Game Freak и Niantic, Inc."
      }
    };
    return labels[key]?.[lang] || labels[key]?.en || '';
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <PokeballLogo size={22} />
              <span style={{ color: '#ef4444' }}>PoGo</span>
              <span style={{ color: '#38bdf8' }}>Events</span>
            </div>
            <p>{getTranslation('brandDesc')}</p>
          </div>

          <div className="footer-column">
            <h4>{getTranslation('navigation')}</h4>
            <ul>
              <li><button onClick={() => onOpenTab('events')}>{getTranslation('navEvents')}</button></li>
              <li><button onClick={() => onOpenTab('raid')}>{getTranslation('navRaids')}</button></li>
              <li><button onClick={() => onOpenTab('rocket')}>{getTranslation('navRocket')}</button></li>
              <li><button onClick={() => onOpenTab('ranking')}>{getTranslation('navRankings')}</button></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{getTranslation('guides')}</h4>
            <ul>
              <li><button onClick={() => onOpenTab('guides')}><BookOpen size={13} style={{ display: 'inline', marginRight: '4px' }} />{getTranslation('allGuides')}</button></li>
              <li><button onClick={() => onOpenTab('guides')}>{getTranslation('guideRocket')}</button></li>
              <li><button onClick={() => onOpenTab('guides')}>{getTranslation('guideRaid')}</button></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{getTranslation('socials')}</h4>
            <ul>
              <li>
                <a 
                  href="https://www.instagram.com/pogoevents/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-tab-link"
                >
                  <InstagramLogo size={14} color="#ffffff" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.tiktok.com/@pogoevents2?lang=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-tab-link"
                >
                  <TikTokLogo size={14} color="#ffffff" />
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
            <div className="footer-sub-legal" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenLegalModal('privacy')} style={{ fontSize: '0.75rem', opacity: 0.7 }}>{getTranslation('privacy')}</button>
              <button onClick={() => onOpenLegalModal('about')} style={{ fontSize: '0.75rem', opacity: 0.7 }}>{getTranslation('about')}</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-disclaimer-text">
            {getTranslation('copyrightNotice')}
          </div>
          <div>
            {getTranslation('tagline')}
          </div>
        </div>
      </div>
    </footer>
  );
};
