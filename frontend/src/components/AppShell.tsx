'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { translations, type Language } from '../data/translations';
import { PokeballLogo } from './PokeballLogo';
import { Footer } from './Footer';
import { LegalModals, type LegalModalType } from './LegalModals';
import { Calendar, Swords, Shield, Clock, Egg, Sparkles, Trophy, Filter, Settings, BookOpen, Download, Users, ScrollText, Zap, X, Search, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

export type TabType = 'events' | 'guides' | 'friends' | 'raid' | 'rocket' | 'research' | 'ditto' | 'eggs' | 'ranking' | 'filter' | 'settings' | 'admin' | 'download' | 'types' | '404';

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
    if (cleanPath.includes('/friends')) return 'friends';
    if (cleanPath.includes('/raids')) return 'raid';
    if (cleanPath.includes('/rocket')) return 'rocket';
    if (cleanPath.includes('/research')) return 'research';
    if (cleanPath.includes('/ditto')) return 'ditto';
    if (cleanPath.includes('/eggs')) return 'eggs';
    if (cleanPath.includes('/rankings') || cleanPath.includes('/pokemon')) return 'ranking';
    if (cleanPath.includes('/filter')) return 'filter';
    if (cleanPath.includes('/types')) return 'types';
    if (cleanPath.includes('/download') || cleanPath.includes('/app')) return 'download';
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
      case 'friends': return `${prefix}/friends`;
      case 'raid': return `${prefix}/raids`;
      case 'rocket': return `${prefix}/rocket`;
      case 'research': return `${prefix}/research`;
      case 'ranking': return `${prefix}/rankings`;
      case 'ditto': return `${prefix}/ditto`;
      case 'eggs': return `${prefix}/eggs`;
      case 'filter': return `${prefix}/filter`;
      case 'types': return `${prefix}/types`;
      case 'download': return `${prefix}/download`;
      case 'settings': return `${prefix}/settings`;
      case 'events':
      default: return `${prefix}`;
    }
  };

  // Mobile Hub Menu State
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [hubSearch, setHubSearch] = useState('');

  // Lock body scroll when mobile Hub is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isHubOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isHubOpen]);

  // Close Hub on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isHubOpen) {
        setIsHubOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHubOpen]);

  // Close Hub whenever pathname changes
  useEffect(() => {
    setIsHubOpen(false);
    setHubSearch('');
  }, [pathname]);

  interface HubMenuItem {
    tab: TabType;
    icon: React.ReactNode;
    title: string;
    description?: string;
    category: 'live' | 'db' | 'tools';
    keywords: string[];
  }

  const hubMenuItems: HubMenuItem[] = [
    // Live events & research
    {
      tab: 'rocket',
      icon: <Shield size={20} style={{ color: '#ef4444' }} />,
      title: t.tabs_rocket || 'Rocket',
      description: lang === 'cs' ? 'Grunti, lídři & Giovanni' : (lang === 'ja' ? 'したっぱ・リーダー・サカキ' : (lang === 'ru' ? 'Лидеры, бойцы и Джованни' : 'Grunts, Leaders & Giovanni')),
      category: 'live',
      keywords: ['rocket', 'rakeťáci', 'giovanni', 'cliff', 'sierra', 'arlo', 'shadow', 'grunt', 'stín', 'ракета', 'ロケット団']
    },
    {
      tab: 'research',
      icon: <ScrollText size={20} style={{ color: '#38bdf8' }} />,
      title: t.tabs_research || 'Výzkum',
      description: lang === 'cs' ? 'Polní úkoly z Pokéstopů' : (lang === 'ja' ? 'フィールドリサーチタスク' : (lang === 'ru' ? 'Полевые исследования и квесты' : 'Field Research & Rewards')),
      category: 'live',
      keywords: ['research', 'výzkum', 'úkoly', 'field', 'odměny', 'pokestop', 'quest', 'квесты', 'リサーチ']
    },
    // Database & mechanics
    {
      tab: 'eggs',
      icon: <Egg size={20} style={{ color: '#fbbf24' }} />,
      title: t.tabs_eggs || 'Vejce',
      description: lang === 'cs' ? 'Líhnutí 2km, 5km, 7km, 10km, 12km' : (lang === 'ja' ? 'タマゴ孵化一覧 (2-12km)' : (lang === 'ru' ? 'Вылупление яиц 2-12 км' : 'Egg Hatches 2km-12km')),
      category: 'db',
      keywords: ['eggs', 'vejce', 'líhnutí', 'hatch', '2km', '5km', '7km', '10km', '12km', 'яйца', 'タマゴ']
    },
    {
      tab: 'ditto',
      icon: <Sparkles size={20} style={{ color: '#ec4899' }} />,
      title: t.tabs_ditto || 'Ditto',
      description: lang === 'cs' ? 'Aktuální maskování v divočině' : (lang === 'ja' ? 'へんしん・変装リスト' : (lang === 'ru' ? 'Текущие маскировки в дикой природе' : 'Current wild disguises')),
      category: 'db',
      keywords: ['ditto', 'maskování', 'disguise', 'proměna', 'transform', 'метаморф', 'メタモン']
    },
    {
      tab: 'guides',
      icon: <BookOpen size={20} style={{ color: '#a855f7' }} />,
      title: t.tabs_guides || 'Průvodce',
      description: lang === 'cs' ? 'Infografiky a herní návody' : (lang === 'ja' ? 'インフォグラフィックと攻略' : (lang === 'ru' ? 'Инфографика и гайды' : 'Infographics & Guides')),
      category: 'db',
      keywords: ['guides', 'průvodce', 'návody', 'infografiky', 'infographics', 'tips', 'гайды', 'ガイド']
    },
    // Tools & More
    {
      tab: 'filter',
      icon: <Filter size={20} style={{ color: '#06b6d4' }} />,
      title: t.tabs_filter || 'Generátor filtrů',
      description: lang === 'cs' ? 'Tvorba vlastních filtrů do hry' : (lang === 'ja' ? 'カスタム検索コード生成' : (lang === 'ru' ? 'Генератор поисковых строк' : 'Custom search strings')),
      category: 'tools',
      keywords: ['filter', 'filtr', 'generátor', 'search string', 'iv', 'hundo', 'pvp', 'фильтры', 'フィルター']
    },
    {
      tab: 'download',
      icon: <Download size={20} style={{ color: '#10b981' }} />,
      title: t.tabs_download || 'Stáhnout aplikaci',
      description: lang === 'cs' ? 'Instalace PWA nebo Android APK' : (lang === 'ja' ? 'PWA / APKアプリをインストール' : (lang === 'ru' ? 'Установка PWA / APK' : 'Install PWA or Android APK')),
      category: 'tools',
      keywords: ['download', 'stáhnout', 'aplikace', 'pwa', 'apk', 'install', 'приложение', 'アプリ']
    },
    {
      tab: 'settings',
      icon: <Settings size={20} style={{ color: '#94a3b8' }} />,
      title: t.tabs_settings || 'Nastavení',
      description: lang === 'cs' ? 'Notifikace, jazyk & téma' : (lang === 'ja' ? '通知、言語、テーマ設定' : (lang === 'ru' ? 'Уведомления, язык и тема' : 'Notifications, language & theme')),
      category: 'tools',
      keywords: ['settings', 'nastavení', 'jazyk', 'language', 'theme', 'notifications', 'notifikace', 'настройки', '設定']
    },
  ];

  const searchNormalized = hubSearch.trim().toLowerCase();
  const filteredHubItems = searchNormalized
    ? hubMenuItems.filter(item =>
        item.title.toLowerCase().includes(searchNormalized) ||
        (item.description && item.description.toLowerCase().includes(searchNormalized)) ||
        item.keywords.some(k => k.toLowerCase().includes(searchNormalized))
      )
    : hubMenuItems;

  return (
    <div className="web-app-layout">
      {/* Desktop Left Sidebar Navigation */}
      <aside className="desktop-sidebar">
        <div className="sidebar-logo">
          <PokeballLogo size={28} />
          <h1>PoGo Events</h1>
        </div>
        <div className="sidebar-stats" style={{ minHeight: '44px' }}>
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

          <Link href={getSectionPath(lang, 'research')} className={`sidebar-nav-item ${activeTab === 'research' ? 'active' : ''}`}>
            <ScrollText size={18} />
            <span>{t.tabs_research || 'Výzkum'}</span>
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

          <Link href={getSectionPath(lang, 'friends')} className={`sidebar-nav-item ${activeTab === 'friends' ? 'active' : ''}`}>
            <Users size={18} />
            <span>{t.tabs_friends || 'Přátelé & Kódy'}</span>
          </Link>

          <Link href={getSectionPath(lang, 'settings')} className={`sidebar-nav-item settings-item ${activeTab === 'settings' ? 'active' : ''}`}>
            <Settings size={18} />
            <span>{t.tabs_settings || 'Nastavení'}</span>
          </Link>
        </nav>

        {/* Desktop Sidebar Footer */}
        <div 
          className="sidebar-footer" 
          style={{ 
            marginTop: 'auto', 
            paddingTop: '14px', 
            borderTop: '1px solid var(--border-color)', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {/* Subtle download button above social links */}
          <Link
            href={getSectionPath(lang, 'download')}
            className={`sidebar-download-pill-btn ${activeTab === 'download' ? 'active' : ''}`}
          >
            <Download size={15} />
            <span>{t.tabs_download || 'Stáhnout aplikaci'}</span>
          </Link>
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
        <div className="app-page-content-wrapper">
          {children}
        </div>

        {/* Footer */}
        <Footer lang={lang} onOpenTab={() => {}} onOpenLegalModal={(type) => setLegalModal(type)} />

        {/* Mobile Bottom Navigation Bar (4 Pillars + Center Pokéball Hub) */}
        <nav className="bottom-nav" aria-label="Mobile Navigation">
          {/* Pillar 1: Events */}
          <Link
            href={getSectionPath(lang, 'events')}
            className={`nav-item ${activeTab === 'events' && !isHubOpen ? 'active' : ''}`}
            onClick={() => setIsHubOpen(false)}
          >
            <span className="nav-icon"><Calendar size={20} /></span>
            <span className="nav-text">{t.tabs_events}</span>
          </Link>

          {/* Pillar 2: Raids */}
          <Link
            href={getSectionPath(lang, 'raid')}
            className={`nav-item ${activeTab === 'raid' && !isHubOpen ? 'active' : ''}`}
            onClick={() => setIsHubOpen(false)}
          >
            <span className="nav-icon"><Swords size={20} /></span>
            <span className="nav-text">{t.tabs_raid}</span>
          </Link>

          {/* Pillar Center: Pokéball Hub Button */}
          <button
            type="button"
            className={`nav-item nav-hub-trigger ${isHubOpen ? 'hub-active' : ''} ${
              !['events', 'raid', 'ranking', 'friends', 'admin'].includes(activeTab) ? 'subpage-active' : ''
            }`}
            onClick={() => setIsHubOpen(prev => !prev)}
            aria-label={t.tabs_menu || 'Menu'}
            aria-expanded={isHubOpen}
          >
            <div className="nav-hub-icon-wrapper">
              <PokeballLogo size={28} />
            </div>
            <span className="nav-text">{t.tabs_menu || 'Menu'}</span>
          </button>

          {/* Pillar 3: Rankings */}
          <Link
            href={getSectionPath(lang, 'ranking')}
            className={`nav-item ${activeTab === 'ranking' && !isHubOpen ? 'active' : ''}`}
            onClick={() => setIsHubOpen(false)}
          >
            <span className="nav-icon"><Trophy size={20} /></span>
            <span className="nav-text">{t.tabs_ranking}</span>
          </Link>

          {/* Pillar 4: Friends */}
          <Link
            href={getSectionPath(lang, 'friends')}
            className={`nav-item ${activeTab === 'friends' && !isHubOpen ? 'active' : ''}`}
            onClick={() => setIsHubOpen(false)}
          >
            <span className="nav-icon"><Users size={20} /></span>
            <span className="nav-text">
              {lang === 'en' ? 'Friends' : (t.tabs_friends ? t.tabs_friends.split('&')[0].trim() : 'Přátelé')}
            </span>
          </Link>
        </nav>

        {/* Mobile Nav Backdrop */}
        <div
          className={`mobile-nav-backdrop ${isHubOpen ? 'open' : ''}`}
          onClick={() => setIsHubOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Glass Hub Sheet */}
        <div
          className={`mobile-hub-sheet ${isHubOpen ? 'open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={t.tabs_menu || 'Menu'}
        >
          {/* Drag Handle & Header */}
          <div className="hub-sheet-header">
            <div className="hub-drag-pill" />
            <div className="hub-title-row">
              <div className="hub-brand-badge">
                <PokeballLogo size={24} />
                <span className="brand-title">PoGo Events</span>
              </div>
              <button
                type="button"
                className="hub-close-btn"
                onClick={() => setIsHubOpen(false)}
                aria-label={t.nav_close || 'Zavřít'}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* In-Menu Instant Search Bar */}
          <div className="hub-search-container">
            <Search size={16} className="hub-search-icon" />
            <input
              type="text"
              className="hub-search-input"
              value={hubSearch}
              onChange={(e) => setHubSearch(e.target.value)}
              placeholder={t.nav_search_placeholder || 'Hledat sekci nebo nástroj...'}
              autoComplete="off"
            />
            {hubSearch && (
              <button
                type="button"
                className="hub-search-clear"
                onClick={() => setHubSearch('')}
                aria-label="Vymazat"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categorized Menu Items */}
          <div className="hub-sheet-content">
            {filteredHubItems.length === 0 ? (
              <div className="hub-empty-state">
                <p>{t.nav_no_results || 'Žádná sekce neodpovídá hledání'}</p>
              </div>
            ) : hubSearch.trim() ? (
              <div className="hub-category-section">
                <div className="hub-category-title">{t.nav_quick_access || 'Nalezené sekce'}</div>
                <div className="hub-grid">
                  {filteredHubItems.map((item) => (
                    <Link
                      key={item.tab}
                      href={getSectionPath(lang, item.tab)}
                      className={`hub-grid-item ${activeTab === item.tab ? 'active' : ''}`}
                      onClick={() => setIsHubOpen(false)}
                    >
                      <span className="hub-item-icon">{item.icon}</span>
                      <div className="hub-item-info">
                        <span className="hub-item-title">{item.title}</span>
                        {item.description && <span className="hub-item-desc">{item.description}</span>}
                      </div>
                      <ChevronRight size={16} className="hub-item-arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* 1. Live Events & Research */}
                <div className="hub-category-section">
                  <div className="hub-category-title">{t.nav_cat_live || 'Živé akce & Výzkum'}</div>
                  <div className="hub-grid">
                    {hubMenuItems.filter(i => i.category === 'live').map((item) => (
                      <Link
                        key={item.tab}
                        href={getSectionPath(lang, item.tab)}
                        className={`hub-grid-item ${activeTab === item.tab ? 'active' : ''}`}
                        onClick={() => setIsHubOpen(false)}
                      >
                        <span className="hub-item-icon">{item.icon}</span>
                        <div className="hub-item-info">
                          <span className="hub-item-title">{item.title}</span>
                          {item.description && <span className="hub-item-desc">{item.description}</span>}
                        </div>
                        <ChevronRight size={16} className="hub-item-arrow" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 2. Database & Mechanics */}
                <div className="hub-category-section">
                  <div className="hub-category-title">{t.nav_cat_db || 'Databáze & Mechaniky'}</div>
                  <div className="hub-grid">
                    {hubMenuItems.filter(i => i.category === 'db').map((item) => (
                      <Link
                        key={item.tab}
                        href={getSectionPath(lang, item.tab)}
                        className={`hub-grid-item ${activeTab === item.tab ? 'active' : ''}`}
                        onClick={() => setIsHubOpen(false)}
                      >
                        <span className="hub-item-icon">{item.icon}</span>
                        <div className="hub-item-info">
                          <span className="hub-item-title">{item.title}</span>
                          {item.description && <span className="hub-item-desc">{item.description}</span>}
                        </div>
                        <ChevronRight size={16} className="hub-item-arrow" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 3. Tools & More */}
                <div className="hub-category-section">
                  <div className="hub-category-title">{t.nav_cat_tools || 'Nástroje & Ostatní'}</div>
                  <div className="hub-grid">
                    {hubMenuItems.filter(i => i.category === 'tools').map((item) => (
                      <Link
                        key={item.tab}
                        href={getSectionPath(lang, item.tab)}
                        className={`hub-grid-item ${activeTab === item.tab ? 'active' : ''}`}
                        onClick={() => setIsHubOpen(false)}
                      >
                        <span className="hub-item-icon">{item.icon}</span>
                        <div className="hub-item-info">
                          <span className="hub-item-title">{item.title}</span>
                          {item.description && <span className="hub-item-desc">{item.description}</span>}
                        </div>
                        <ChevronRight size={16} className="hub-item-arrow" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Legal Modals */}
        <LegalModals modalType={legalModal} lang={lang} onClose={() => setLegalModal(null)} />
      </div>
    </div>
  );
};
