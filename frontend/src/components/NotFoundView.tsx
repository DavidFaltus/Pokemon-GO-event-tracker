'use client';

import React from 'react';
import Link from 'next/link';
import './NotFoundView.css';
import { translations, type Language } from '../data/translations';
import { PokeballLogo } from './PokeballLogo';
import { Compass, Calendar, Swords, Shield, BookOpen, ArrowLeft } from 'lucide-react';

interface NotFoundViewProps {
  lang?: Language;
  onGoHome?: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ lang = 'cs', onGoHome }) => {
  const t = translations[lang] || translations.cs;

  return (
    <div className="not-found-container">
      <div className="not-found-visual">
        <div className="not-found-glow" />
        <div className="not-found-icon-wrapper">
          <PokeballLogo size={56} />
        </div>
      </div>

      <div className="not-found-code-badge">404</div>
      <h1 className="not-found-title">{t.not_found_title}</h1>
      <div className="not-found-subtitle">{t.not_found_subtitle}</div>
      <p className="not-found-desc">{t.not_found_desc}</p>

      <div className="not-found-actions">
        {onGoHome ? (
          <button onClick={onGoHome} className="not-found-btn-primary">
            <Calendar size={18} />
            <span>{t.not_found_home_btn}</span>
          </button>
        ) : (
          <Link href={`/${lang}/events`} className="not-found-btn-primary">
            <Calendar size={18} />
            <span>{t.not_found_home_btn}</span>
          </Link>
        )}

        <Link href={`/${lang}/raids`} className="not-found-btn-secondary">
          <Swords size={16} />
          <span>{t.tabs_raid}</span>
        </Link>

        <Link href={`/${lang}/rocket`} className="not-found-btn-secondary">
          <Shield size={16} />
          <span>{t.tabs_rocket}</span>
        </Link>

        <Link href={`/${lang}/guides`} className="not-found-btn-secondary">
          <BookOpen size={16} />
          <span>{t.tabs_guides}</span>
        </Link>
      </div>
    </div>
  );
};
