import React from 'react';
import './LegalModals.css';
import type { Language } from '../data/translations';
import { X, Info, ShieldCheck, FileText, AlertTriangle, Mail } from 'lucide-react';

export type LegalModalType = 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact' | null;

interface LegalModalsProps {
  modalType: LegalModalType;
  lang: Language;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ modalType, lang, onClose }) => {
  if (!modalType) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'about':
        return (
          <>
            <h3>{lang === 'cs' ? 'O projektu PoGo Events' : 'About PoGo Events'}</h3>
            <p>
              {lang === 'cs'
                ? 'PoGo Events je nezávislá komunitní webová aplikace a mobilní nástroj navržený pro trenéry hry Pokémon GO. Naším cílem je poskytovat přehledné, přesné a okamžitě aktualizované informace o živých událostech, raidových bossech, sestavách Team GO Rocket a PvE statistikách.'
                : 'PoGo Events is an independent community web application and mobile utility designed for Pokémon GO trainers worldwide. Our goal is to provide clear, accurate, and real-time updated information on live events, raid bosses, Team GO Rocket lineups, and PvE statistics.'}
            </p>
            <h3>{lang === 'cs' ? 'Zdroje dat a synchronizace' : 'Data Sources & Sync'}</h3>
            <p>
              {lang === 'cs'
                ? 'Aplikace automaticky zpracovává živé informace z komunitních zdrojů, oficiálních oznámení a ověřených API databází. Veškeré časové údaje jsou automaticky přepočítávány na vaše lokální časové pásmo.'
                : 'The app automatically aggregates live details from verified community APIs and official announcements. All timestamps are dynamically converted into your local browser timezone.'}
            </p>
            <h3>{lang === 'cs' ? 'Transparentnost a vývoj' : 'Transparency & Development'}</h3>
            <p>
              {lang === 'cs'
                ? 'Aplikace je neustále vyvíjena s důrazem na vysokou rychlost, úsporu dat a prémiový uživatelský zážitek na mobilních zařízeních i počítačích.'
                : 'The platform is continuously enhanced focusing on low bandwidth consumption, fast loading times, and a state-of-the-art dark glassmorphic UI across all screen sizes.'}
            </p>
          </>
        );

      case 'privacy':
        return (
          <>
            <h3>{lang === 'cs' ? 'Zásady ochrany osobních údajů (Privacy Policy)' : 'Privacy Policy'}</h3>
            <p>
              {lang === 'cs'
                ? 'Vaše soukromí je pro nás důležité. Tyto zásady popisují, jaké informace shromažďujeme a jak s nimi nakládáme při používání webové stránky pogoevents.app.'
                : 'Your privacy is paramount. This Privacy Policy document outlines the types of information collected and recorded by pogoevents.app and how we use it.'}
            </p>

            <h3>{lang === 'cs' ? 'Google AdSense a soubory Cookie' : 'Google AdSense & Cookies'}</h3>
            <p>
              {lang === 'cs'
                ? 'Náš web využívá službu Google AdSense k zobrazování reklam. Google jako dodavatel třetí strany používá soubory cookie (např. DART cookie) k zobrazování reklam uživatelům na základě jejich předchozí návštěvy našeho webu nebo jiných webových stránek na internetu.'
                : 'Our website uses Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies (including DART cookies) to serve ads based on users\' prior visits to our site or other websites across the internet.'}
            </p>
            <p>
              {lang === 'cs'
                ? 'Uživatelé mohou používání souborů DART cookie odmítnout v zásadách ochrany osobních údajů pro reklamní síť a síť obsahu Google na adrese https://policies.google.com/technologies/ads.'
                : 'Users may opt-out of the use of DART cookies by visiting the Google AdSense Privacy Policy at https://policies.google.com/technologies/ads.'}
            </p>

            <h3>{lang === 'cs' ? 'Google Analytics a Analytika' : 'Google Analytics'}</h3>
            <p>
              {lang === 'cs'
                ? 'Používáme Google Analytics pro měření návštěvnosti a anonymní analýzu chování uživatelů za účelem zlepšování funkčnosti webu. Neukládáme žádné osobní identifikovatelné údaje (PII).'
                : 'We utilize Google Analytics to measure visitor traffic and aggregate user behavior anonymously in order to improve site performance and usability. No personally identifiable information (PII) is stored.'}
            </p>

            <h3>{lang === 'cs' ? 'GDPR a vaší volby' : 'GDPR Compliance & User Rights'}</h3>
            <p>
              {lang === 'cs'
                ? 'Uživatelé z Evropského hospodářského prostoru (EHP) mají právo na přístup, opravu nebo výmaz svých údajů. Můžete zakázat ukládání cookies přímo ve svém prohlížeči.'
                : 'Users residing within the EEA have the right to access, rectify, or erase personal data. You can manage or block cookies through your individual browser options at any time.'}
            </p>
          </>
        );

      case 'terms':
        return (
          <>
            <h3>{lang === 'cs' ? 'Podmínky použití webové aplikace' : 'Terms of Use'}</h3>
            <p>
              {lang === 'cs'
                ? 'Vstupem a používáním webové aplikace pogoevents.app souhlasíte s dodržováním těchto podmínek použití a všech platných zákonů.'
                : 'By accessing and using pogoevents.app, you accept and agree to be bound by these terms of use and all applicable laws and regulations.'}
            </p>
            <h3>{lang === 'cs' ? 'Omezení odpovědnosti za data' : 'Disclaimer of Data Accuracy'}</h3>
            <p>
              {lang === 'cs'
                ? 'Veškerá herní data, časy eventů a odhady jsou poskytovány "tak jak jsou" pro informační účely. Přestože vyvíjíme maximální úsilí o přesnost, neručíme za případné neohlášené změny provedené vývojáři hry Niantic, Inc.'
                : 'All game data, event timings, and counter recommendations are provided "as is" for informational purposes. While we strive for 100% accuracy, we are not responsible for unannounced schedule alterations by game developers Niantic, Inc.'}
            </p>
            <h3>{lang === 'cs' ? 'Pravidla používání' : 'Fair Use Rules'}</h3>
            <p>
              {lang === 'cs'
                ? 'Je zakázáno provádět jakékoliv automatizované přěžěžování serveru (DDoS), zneužívat backendové API nebo obcházet bezpečnostní prvky webu.'
                : 'Automated overloading of servers, API abuse, or scraping intended to bypass site security components is strictly prohibited.'}
            </p>
          </>
        );

      case 'disclaimer':
        return (
          <>
            <h3>{lang === 'cs' ? 'Právní doložka & Ochranné známky' : 'Copyright & Trademark Disclaimer'}</h3>
            <p>
              {lang === 'cs'
                ? 'Tato webová stránka je neoficiálním fanouškovským průvodcem a není nijak spojená, sponzorovaná ani schválená společností Niantic, Inc., The Pokémon Company ani Nintendo.'
                : 'This website is an unofficial fan guide and is not affiliated with, endorsed, sponsored, or specifically approved by Niantic, Inc., The Pokémon Company, or Nintendo.'}
            </p>
            <p>
              {lang === 'cs'
                ? 'Pokémon a názvy Pokémon postav jsou ochrannými známkami společností Nintendo, Creatures Inc., GAME FREAK inc. a Niantic, Inc. Veškeré grafické prvy a ochranné známky náleží jejich příslušným vlastníkům.'
                : 'Pokémon and Pokémon character names are trademarks of Nintendo, Creatures Inc., GAME FREAK inc., and Niantic, Inc. All images and trademarks belong to their respective owners.'}
            </p>
          </>
        );

      case 'contact':
        return (
          <>
            <h3>{lang === 'cs' ? 'Kontakt a Podpora' : 'Contact & Support'}</h3>
            <p>
              {lang === 'cs'
                ? 'Máte dotaz, návrh na novou funkci nebo jste objevit chybu? Rádi od vás uslyšíme!'
                : 'Have a question, feature proposal, or bug report? We would love to hear from you!'}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.1)', padding: '12px 16px', borderRadius: '10px', color: '#38bdf8' }}>
              <Mail size={18} />
              <span>Email: <strong>support@pogoevents.app</strong></span>
            </p>
          </>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (modalType) {
      case 'about': return lang === 'cs' ? 'O projektu' : 'About Project';
      case 'privacy': return lang === 'cs' ? 'Zásady soukromí' : 'Privacy Policy';
      case 'terms': return lang === 'cs' ? 'Podmínky použití' : 'Terms of Use';
      case 'disclaimer': return lang === 'cs' ? 'Právní doložka' : 'Disclaimer';
      case 'contact': return lang === 'cs' ? 'Kontakt' : 'Contact Us';
      default: return '';
    }
  };

  const getIcon = () => {
    switch (modalType) {
      case 'about': return <Info size={20} color="#38bdf8" />;
      case 'privacy': return <ShieldCheck size={20} color="#10b981" />;
      case 'terms': return <FileText size={20} color="#f59e0b" />;
      case 'disclaimer': return <AlertTriangle size={20} color="#ef4444" />;
      case 'contact': return <Mail size={20} color="#a855f7" />;
      default: return null;
    }
  };

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2>
            {getIcon()}
            {getTitle()}
          </h2>
          <button className="legal-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="legal-modal-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
