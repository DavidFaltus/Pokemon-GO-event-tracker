'use client';

import React from 'react';
import Link from 'next/link';
import './LegalPageView.css';
import type { Language } from '../data/translations';
import { LEGAL_PAGES_DATA, type LegalPageType } from '../data/legalData';
import { ShieldCheck, Info, FileText, AlertTriangle, Mail, Clock, ArrowLeft, ExternalLink } from 'lucide-react';

interface LegalPageViewProps {
  pageType: LegalPageType;
  lang: Language;
}

export const LegalPageView: React.FC<LegalPageViewProps> = ({ pageType, lang }) => {
  const pageData = LEGAL_PAGES_DATA[pageType] || LEGAL_PAGES_DATA.privacy;
  const isCzech = lang === 'cs';
  const isJapanese = lang === 'ja';
  const isRussian = lang === 'ru';

  const getPageIcon = (icon: string) => {
    switch (icon) {
      case 'ShieldCheck': return <ShieldCheck size={22} color="#10b981" />;
      case 'Info': return <Info size={22} color="#38bdf8" />;
      case 'FileText': return <FileText size={22} color="#f59e0b" />;
      case 'AlertTriangle': return <AlertTriangle size={22} color="#ef4444" />;
      case 'Mail': return <Mail size={22} color="#a855f7" />;
      default: return <Info size={22} color="#38bdf8" />;
    }
  };

  const navItems: { type: LegalPageType; label: Record<Language, string> }[] = [
    {
      type: 'privacy',
      label: {
        cs: 'Zásady soukromí',
        en: 'Privacy Policy',
        ja: 'プライバシーポリシー',
        ru: 'Конфиденциальность',
      },
    },
    {
      type: 'about',
      label: {
        cs: 'O projektu',
        en: 'About Project',
        ja: 'プロジェクト概要',
        ru: 'О проекте',
      },
    },
    {
      type: 'terms',
      label: {
        cs: 'Podmínky použití',
        en: 'Terms of Use',
        ja: '利用規約',
        ru: 'Условия',
      },
    },
    {
      type: 'disclaimer',
      label: {
        cs: 'Právní doložka',
        en: 'Disclaimer',
        ja: '免責事項',
        ru: 'Оговорка',
      },
    },
    {
      type: 'contact',
      label: {
        cs: 'Kontakt',
        en: 'Contact',
        ja: 'お問い合わせ',
        ru: 'Контакты',
      },
    },
  ];

  const getBadgeLabel = () => {
    switch (pageType) {
      case 'privacy': return isCzech ? 'Bezpečnost & GDPR' : isJapanese ? 'プライバシー・GDPR' : isRussian ? 'Безопасность и GDPR' : 'Privacy & GDPR';
      case 'about': return isCzech ? 'Komunitní nástroj' : isJapanese ? 'コミュニティツール' : isRussian ? 'Фанатский проект' : 'Community Utility';
      case 'terms': return isCzech ? 'Pravidla služby' : isJapanese ? 'サービス利用規約' : isRussian ? 'Правила сервиса' : 'Terms & Conditions';
      case 'disclaimer': return isCzech ? 'Ochranné známky' : isJapanese ? '知的財産権の告知' : isRussian ? 'Товарные знаки' : 'Fair Use & IP';
      case 'contact': return isCzech ? 'Podpora & Dotazy' : isJapanese ? '公式サポート' : isRussian ? 'Поддержка' : 'Support & Queries';
    }
  };

  const lastUpdatedLabel = isCzech
    ? 'Aktualizováno: 27. září 2026'
    : isJapanese
    ? '最終更新: 2026年9月27日'
    : isRussian
    ? 'Обновлено: 27 сентября 2026'
    : 'Last Updated: September 27, 2026';

  const backHomeLabel = isCzech
    ? 'Zpět na přehled událostí'
    : isJapanese
    ? 'イベント一覧へ戻る'
    : isRussian
    ? 'Назад к событиям'
    : 'Back to Events';

  return (
    <div className="legal-page-wrapper">
      {/* Top Legal Navigation Bar */}
      <nav className="legal-nav-bar" aria-label="Legal Navigation">
        {navItems.map((item) => (
          <Link
            key={item.type}
            href={`/${lang}/${item.type}`}
            className={`legal-nav-pill ${pageType === item.type ? 'active' : ''}`}
          >
            {item.label[lang] || item.label.en}
          </Link>
        ))}
      </nav>

      {/* Main Glassmorphic Card */}
      <article className="legal-page-card">
        <header className="legal-header">
          <div className="legal-badge-row">
            <span className="legal-badge">
              {getPageIcon(pageData.icon)}
              {getBadgeLabel()}
            </span>
            <span className="legal-updated">
              <Clock size={14} />
              {lastUpdatedLabel}
            </span>
          </div>

          <h1 className="legal-title">{pageData.title[lang] || pageData.title.en}</h1>
          <p className="legal-subtitle">{pageData.subtitle[lang] || pageData.subtitle.en}</p>
        </header>

        <div className="legal-sections-container">
          {pageData.sections.map((section) => (
            <section key={section.id} className="legal-section-block">
              <h2 className="legal-section-title">
                {section.title[lang] || section.title.en}
              </h2>
              <p className="legal-section-text">
                {section.content[lang] || section.content.en}
              </p>

              {section.listItems && (
                <ul className="legal-list">
                  {(section.listItems[lang] || section.listItems.en || []).map((item, idx) => (
                    <li key={idx} className="legal-list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Contact Special Box */}
          {pageType === 'contact' && (
            <div className="legal-contact-box">
              <Mail size={20} color="var(--accent-color)" />
              <div>
                <span>{isCzech ? 'Oficiální e-mail podpory: ' : 'Official Support Email: '}</span>
                <a href="mailto:support@pogoevents.app" className="legal-contact-email">
                  support@pogoevents.app
                </a>
              </div>
            </div>
          )}
        </div>

        <footer className="legal-card-footer">
          <Link href={`/${lang}`} className="legal-back-btn">
            <ArrowLeft size={14} />
            {backHomeLabel}
          </Link>
          <span>PoGo Events © 2026 — pogoevents.app</span>
        </footer>
      </article>
    </div>
  );
};
