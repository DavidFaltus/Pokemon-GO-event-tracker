'use client';

import React, { useState, useEffect } from 'react';
import './DownloadAppView.css';
import { translations, type Language } from '../data/translations';
import { PokeballLogo } from './PokeballLogo';
import { Download, Smartphone, CheckCircle, ExternalLink, ShieldCheck, Sparkles, Star, GitBranch, Bell, Zap, Copy } from 'lucide-react';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface DownloadAppViewProps {
  lang?: Language;
}

export const DownloadAppView: React.FC<DownloadAppViewProps> = ({ lang = 'cs' }) => {
  const t = translations[lang] || translations.cs;
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [copiedSha, setCopiedSha] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setCanInstallPwa(false);
      }
      setDeferredPrompt(null);
    } else {
      alert(lang === 'cs'
        ? 'Pro instalaci aplikace v prohlížeči použijte menu prohlížeče a zvolte „Přidat na plochu“ nebo „Instalovat aplikaci“.'
        : 'To install the PWA, open your browser menu and select "Add to Home Screen" or "Install App".');
    }
  };

  const GITHUB_REPO_URL = 'https://github.com/DavidFaltus/Pokemon-GO-event-tracker';
  const APK_DOWNLOAD_URL = 'https://github.com/DavidFaltus/Pokemon-GO-event-tracker/releases/latest';

  return (
    <div className="download-page-wrapper">
      {/* Hero Header Card */}
      <div className="download-hero-card">
        <div className="download-hero-glow" />
        
        <div className="download-logo-row">
          <PokeballLogo size={48} />
        </div>

        <div className="download-version-badge">
          <ShieldCheck size={13} />
          <span>v1.1.1 Stable • Android 8.0+ & PWA</span>
        </div>

        <h1 className="download-hero-title">{t.download_title}</h1>
        <p className="download-hero-subtitle">{t.download_subtitle}</p>

        <div className="download-cta-row">
          <a
            href={APK_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="download-apk-btn"
          >
            <Download size={20} />
            <span>{t.download_apk_btn}</span>
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="download-github-btn"
          >
            <GithubIcon size={20} />
            <span>{t.download_github_btn}</span>
            <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </a>

          <button
            onClick={handleInstallPwa}
            className="download-pwa-btn"
          >
            <Smartphone size={18} />
            <span>{t.download_pwa_btn}</span>
          </button>
        </div>
      </div>

      {/* Grid of features and install guides */}
      <div className="download-grid-cards">
        {/* Features Card */}
        <div className="download-card">
          <div className="download-card-header">
            <Sparkles size={20} />
            <span>{t.download_features_title}</span>
          </div>
          <div className="download-features-list">
            <div className="download-feature-item">
              <span>{t.download_feature_1}</span>
            </div>
            <div className="download-feature-item">
              <span>{t.download_feature_2}</span>
            </div>
            <div className="download-feature-item">
              <span>{t.download_feature_3}</span>
            </div>
            <div className="download-feature-item">
              <span>{t.download_feature_4}</span>
            </div>
          </div>
        </div>

        {/* Step-by-step install card */}
        <div className="download-card">
          <div className="download-card-header">
            <Smartphone size={20} />
            <span>{t.download_install_steps_title}</span>
          </div>
          <div className="download-steps-list">
            <div className="download-step-item">
              <span>{t.download_install_step_1}</span>
            </div>
            <div className="download-step-item">
              <span>{t.download_install_step_2}</span>
            </div>
            <div className="download-step-item">
              <span>{t.download_install_step_3}</span>
            </div>
            <div className="download-step-item">
              <span>{t.download_install_step_4}</span>
            </div>
          </div>
        </div>

        {/* GitHub Open Source Box */}
        <div className="download-github-box">
          <div className="download-github-left">
            <h3>
              <GithubIcon size={22} />
              <span>GitHub Open Source & Community</span>
            </h3>
            <p>{t.download_github_desc}</p>
          </div>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="download-github-btn"
            style={{ minWidth: 'auto' }}
          >
            <Star size={16} color="#fbbf24" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
