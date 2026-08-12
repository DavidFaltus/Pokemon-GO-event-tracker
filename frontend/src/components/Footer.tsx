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
      guideSpotlight: {
        cs: "Spotlight & Community Day",
        en: "Spotlight & Community Day",
        ja: "スポットライト & コミュニティデイ",
        ru: "Spotlight и День сообщества"
      },
      legal: {
        cs: "Informace & Právo",
        en: "Legal & About",
        ja: "法的情報 & 概要",
        ru: "Правовая информация"
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
      terms: {
        cs: "Podmínky použití",
        en: "Terms of Service",
        ja: "利用規約",
        ru: "Условия использования"
      },
      disclaimer: {
        cs: "Právní doložka",
        en: "Trademark Disclaimer",
        ja: "免責事項",
        ru: "Отказ от ответственности"
      },
      contact: {
        cs: "Kontakt & Podpora",
        en: "Contact & Support",
        ja: "お問い合わせ",
        ru: "Контакты"
      },
      tagline: {
        cs: "Vytvořeno s vášní pro trenéry po celém světě.",
        en: "Built with passion for trainers worldwide.",
        ja: "世界中のトレーナーのために作成。",
        ru: "Создано с любовью для тренеров по всему миру."
      },
      copyrightNotice: {
        cs: "© 2026 PoGo Events. Neoficiální fanouškovská komunitní aplikace. Všechna práva k ochranným známkám Pokémon náleží společním Nintendo, Game Freak & Niantic, Inc.",
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
              <li><button onClick={() => onOpenTab('guides')}>{getTranslation('guideSpotlight')}</button></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{getTranslation('legal')}</h4>
            <ul>
              <li><button onClick={() => onOpenLegalModal('about')}>{getTranslation('about')}</button></li>
              <li><button onClick={() => onOpenLegalModal('privacy')}>{getTranslation('privacy')}</button></li>
              <li><button onClick={() => onOpenLegalModal('terms')}>{getTranslation('terms')}</button></li>
              <li><button onClick={() => onOpenLegalModal('disclaimer')}>{getTranslation('disclaimer')}</button></li>
              <li><button onClick={() => onOpenLegalModal('contact')}>{getTranslation('contact')}</button></li>
            </ul>
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
