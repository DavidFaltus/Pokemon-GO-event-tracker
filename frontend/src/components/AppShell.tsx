'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { translations, type Language } from '../data/translations';
import { PokeballLogo } from './PokeballLogo';
import { Footer } from './Footer';
import { LegalModals, type LegalModalType } from './LegalModals';
import { Calendar, Swords, Shield, Clock, Egg, Sparkles, Trophy, Filter, Settings, BookOpen } from 'lucide-react';
import { API_BASE_URL } from '../config';

export type TabType = 'events' | 'guides' | 'raid' | 'rocket' | 'ditto' | 'eggs' | 'ranking' | 'filter' | 'settings' | 'admin';

const InstagramLogo = ({ size = 15, color = '#ffffff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <circle cx="17.5" cy="6.5" r="1" fill={color}/>
  </svg>
);

const TikTokLogo = ({ size = 15, color = '#ffffff' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.11V9.32a6.33 6.33 0 0 0-1-.08 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.27 8.27 0 0 0 4.96 1.63V7.23a4.85 4.85 0 0 1-1-.54z"/>
  </svg>
);

interface AppShellProps {
  children: React.ReactNode;
  lang: Language;
}

export const AppShell: React.FC<AppShellProps> = ({ children, lang }) => {
  const pathname = usePathname() || `/${lang}`;
  const t = translations[lang] || translations.en;
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [scraperStatus, setScraperStatus] = useState<{
    lastScrapedAt: string | null;
    nextScrapeAt: string | null;
    isRunning: boolean;
    totalEvents: number;
  }>({ lastScrapedAt: null, nextScrapeAt: null, isRunning: false, totalEvents: 0 });

  // Save active language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pogo_tracker_lang', lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Fetch status from API
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/scraper/status`);
        if (res.ok) setScraperStatus(await res.json());
      } catch {}
    };
    fetchStatus();
  }, []);

  // Determine current active section from pathname
  const getActiveTab = (): TabType => {
    const cleanPath = pathname.toLowerCase();
    if (cleanPath.includes('/admin')) return 'admin';
    if (cleanPath.includes('/guides')) return 'guides';
    if (cleanPath.includes('/raids')) return 'raid';
    if (cleanPath.includes('/rocket')) return 'rocket';
    if (cleanPath.includes('/ditto')) return 'ditto';
    if (cleanPath.includes('/eggs')) return 'eggs';
    if (cleanPath.includes('/rankings') || cleanPath.includes('/pokemon')) return 'ranking';
    if (cleanPath.includes('/filter')) return 'filter';
    if (cleanPath.includes('/settings')) return 'settings';
    return 'events';
  };

  const activeTab = getActiveTab();

  // Helper to build section path for a given language
  const getSectionPath = (targetLang: Language, section: TabType = activeTab): string => {
    if (section === 'admin') return '/admin';
    const prefix = `/${targetLang}`;
    switch (section) {
      case 'guides': return `${prefix}/guides`;
      case 'raid': return `${prefix}/raids`;
      case 'rocket': return `${prefix}/rocket`;
      case 'ranking': return `${prefix}/rankings`;
      case 'ditto': return `${prefix}/ditto`;
      case 'eggs': return `${prefix}/eggs`;
      case 'filter': return `${prefix}/filter`;
      case 'settings': return `${prefix}/settings`;
      case 'events':
      default: return `${prefix}/events`;
    }
  };

  return (
    <div className="web-app-layout">
      {/* Desktop Left Sidebar Navigation */}
      <aside className="desktop-sidebar">
        <div className="sidebar-logo">
          <PokeballLogo size={28} />
          <h1>PoGo Events</h1>
        </div>
        <div className="sidebar-stats">
          {scraperStatus.lastScrapedAt && (
            <span
              title={scraperStatus.isRunning
                ? (lang === 'cs' ? 'Stahování dat...' : 'Fetching data...')
                : (lang === 'cs' ? `Příští aktualizace: ${new Date(scraperStatus.nextScrapeAt || '').toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}` : `Next update: ${new Date(scraperStatus.nextScrapeAt || '').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)}
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '2px'
              }}
            >
              {scraperStatus.isRunning ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: 'var(--accent-color)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  {lang === 'cs' ? 'Aktualizuji...' : 'Updating...'}
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={10} />
                  {lang === 'cs' ? 'Aktualizováno: ' : 'Updated: '}
                  {new Date(scraperStatus.lastScrapedAt).toLocaleTimeString(
                    lang === 'cs' ? 'cs-CZ' : 'en-US',
                    { hour: '2-digit', minute: '2-digit' }
                  )}
                </span>
              )}
            </span>
          )}

          {/* Language Switcher Links */}
          <div className="sidebar-lang-switcher" style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
            {(['cs', 'en', 'ja', 'ru'] as Language[]).map(l => (
              <Link
                key={l}
                href={getSectionPath(l)}
                className={`lang-btn ${lang === l ? 'active' : ''}`}
                style={{
                  padding: '2px 7px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                  border: '1px solid var(--border-color)',
                  background: lang === l ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                  color: lang === l ? '#000' : 'var(--text-muted)',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease'
                }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="sidebar-nav">
          <Link href={getSectionPath(lang, 'events')} className={`sidebar-nav-item ${activeTab === 'events' ? 'active' : ''}`}>
            <Calendar size={18} />
            <span>{t.tabs_events}</span>
          </Link>

          <Link href={getSectionPath(lang, 'raid')} className={`sidebar-nav-item ${activeTab === 'raid' ? 'active' : ''}`}>
            <Swords size={18} />
            <span>{t.tabs_raid}</span>
          </Link>

          <Link href={getSectionPath(lang, 'rocket')} className={`sidebar-nav-item ${activeTab === 'rocket' ? 'active' : ''}`}>
            <Shield size={18} />
            <span>{t.tabs_rocket}</span>
          </Link>

          <Link href={getSectionPath(lang, 'ditto')} className={`sidebar-nav-item ${activeTab === 'ditto' ? 'active' : ''}`}>
            <Sparkles size={18} />
            <span>{t.tabs_ditto}</span>
          </Link>

          <Link href={getSectionPath(lang, 'eggs')} className={`sidebar-nav-item ${activeTab === 'eggs' ? 'active' : ''}`}>
            <Egg size={18} />
            <span>{t.tabs_eggs}</span>
          </Link>

          <Link href={getSectionPath(lang, 'ranking')} className={`sidebar-nav-item ${activeTab === 'ranking' ? 'active' : ''}`}>
            <Trophy size={18} />
            <span>{t.tabs_ranking}</span>
          </Link>

          <Link href={getSectionPath(lang, 'filter')} className={`sidebar-nav-item ${activeTab === 'filter' ? 'active' : ''}`}>
            <Filter size={18} />
            <span>{t.tabs_filter}</span>
          </Link>

          <Link href={getSectionPath(lang, 'guides')} className={`sidebar-nav-item ${activeTab === 'guides' ? 'active' : ''}`}>
            <BookOpen size={18} />
            <span>{t.tabs_guides || 'Průvodce'}</span>
          </Link>

          <Link href={getSectionPath(lang, 'settings')} className={`sidebar-nav-item settings-item ${activeTab === 'settings' ? 'active' : ''}`} style={{ marginTop: '28px' }}>
            <Settings size={18} />
            <span>{t.tabs_settings || 'Nastavení'}</span>
          </Link>
        </nav>

        {/* Desktop Sidebar Footer */}
        <div 
          className="sidebar-footer" 
          style={{ 
            marginTop: 'auto', 
            paddingTop: '16px', 
            borderTop: '1px solid var(--border-color)', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
            {lang === 'cs' 
              ? 'Tato aplikace je neoficiální fanouškovský projekt. Nemá žádné přidružení ke společnostmi Niantic, Nintendo nebo The Pokémon Company.' 
              : 'This app is an unofficial fan project and has no affiliation with Niantic, Nintendo, or The Pokémon Company.'
            }
          </p>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
            {lang === 'cs' ? 'Data událostí poskytuje ' : 'Event data powered by '}{' '}
            <a 
              href="https://leekduck.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--accent-color)', fontWeight: 'bold', textDecoration: 'none' }}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Leek Duck
            </a>.
          </p>
          <div className="sidebar-social-flex" style={{ display: 'flex', gap: '10px', marginTop: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <a 
              href="https://www.instagram.com/pogoevents/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Instagram @pogoevents"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#cbd5e1', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#38bdf8')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#cbd5e1')}
            >
              <InstagramLogo size={13} color="#ffffff" />
              <span>Instagram</span>
            </a>
            <span style={{ color: 'var(--border-color)', fontSize: '10px' }}>•</span>
            <a 
              href="https://www.tiktok.com/@pogoevents2?lang=en" 
              target="_blank" 
              rel="noopener noreferrer"
              title="TikTok @pogoevents2"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#cbd5e1', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#38bdf8')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#cbd5e1')}
            >
              <TikTokLogo size={13} color="#ffffff" />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <header className="app-header">
          <div className="header-brand">
            <PokeballLogo size={24} />
            <span className="brand-title">PoGo Events</span>
          </div>

          <div className="header-actions">
            <div className="header-lang-switcher" style={{ display: 'flex', gap: '4px' }}>
              {(['cs', 'en', 'ja', 'ru'] as Language[]).map(l => (
                <Link
                  key={l}
                  href={getSectionPath(l)}
                  className={`lang-btn ${lang === l ? 'active' : ''}`}
                  style={{
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: lang === l ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                    color: lang === l ? '#000' : 'var(--text-muted)',
                    textTransform: 'uppercase'
                  }}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="app-main">
          {children}
        </main>

        {/* Footer */}
        <Footer lang={lang} onOpenTab={() => {}} onOpenLegalModal={(type) => setLegalModal(type)} />

        {/* Mobile Bottom Navigation Bar */}
        <nav className="bottom-nav">
          <Link href={getSectionPath(lang, 'events')} className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}>
            <span className="nav-icon"><Calendar size={18} /></span>
            <span className="nav-text">{t.tabs_events}</span>
          </Link>

          <Link href={getSectionPath(lang, 'raid')} className={`nav-item ${activeTab === 'raid' ? 'active' : ''}`}>
            <span className="nav-icon"><Swords size={18} /></span>
            <span className="nav-text">{t.tabs_raid}</span>
          </Link>

          <Link href={getSectionPath(lang, 'rocket')} className={`nav-item ${activeTab === 'rocket' ? 'active' : ''}`}>
            <span className="nav-icon"><Shield size={18} /></span>
            <span className="nav-text">{t.tabs_rocket}</span>
          </Link>

          <Link href={getSectionPath(lang, 'ditto')} className={`nav-item ${activeTab === 'ditto' ? 'active' : ''}`}>
            <span className="nav-icon"><Sparkles size={18} /></span>
            <span className="nav-text">{t.tabs_ditto}</span>
          </Link>

          <Link href={getSectionPath(lang, 'eggs')} className={`nav-item ${activeTab === 'eggs' ? 'active' : ''}`}>
            <span className="nav-icon"><Egg size={18} /></span>
            <span className="nav-text">{t.tabs_eggs}</span>
          </Link>

          <Link href={getSectionPath(lang, 'ranking')} className={`nav-item ${activeTab === 'ranking' ? 'active' : ''}`}>
            <span className="nav-icon"><Trophy size={18} /></span>
            <span className="nav-text">{t.tabs_ranking}</span>
          </Link>

          <Link href={getSectionPath(lang, 'filter')} className={`nav-item ${activeTab === 'filter' ? 'active' : ''}`}>
            <span className="nav-icon"><Filter size={18} /></span>
            <span className="nav-text">{t.tabs_filter}</span>
          </Link>
        </nav>

        {/* Legal Modals */}
        <LegalModals modalType={legalModal} lang={lang} onClose={() => setLegalModal(null)} />
      </div>
    </div>
  );
};
