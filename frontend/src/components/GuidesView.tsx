import React, { useState } from 'react';
import './GuidesView.css';
import { GUIDES_DATA } from '../data/guidesData';
import type { Language } from '../data/translations';
import { 
  getPokemonIconUrl, 
  handlePokemonImageError, 
  SHADOW_ICON_URL, 
  handleShadowIconError,
  MEGA_ICON_URL,
  handleMegaIconError
} from '../utils/imageResolver';
import { 
  BookOpen, 
  Search, 
  Clock, 
  ArrowLeft, 
  Lightbulb, 
  Shield, 
  Swords, 
  Calendar, 
  Sparkles, 
  Trophy, 
  ChevronRight,
  User,
  Zap,
  Target,
  Flame,
  Award
} from 'lucide-react';

interface GuidesViewProps {
  lang: Language;
  initialArticleSlug?: string;
  onSelectArticle?: (slug: string) => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ 
  lang, 
  initialArticleSlug,
  onSelectArticle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialArticleSlug || null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield size={16} />;
      case 'Swords': return <Swords size={16} />;
      case 'Calendar': return <Calendar size={16} />;
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Trophy': return <Trophy size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const selectedArticle = GUIDES_DATA.find(a => a.slug === selectedArticleSlug);

  const filteredArticles = GUIDES_DATA.filter(article => {
    const titleText = article.title[lang] || article.title.en;
    const subtitleText = article.subtitle[lang] || article.subtitle.en;
    const categoryText = article.category[lang] || article.category.en;
    const q = searchQuery.toLowerCase();
    return titleText.toLowerCase().includes(q) || subtitleText.toLowerCase().includes(q) || categoryText.toLowerCase().includes(q);
  });

  const handleArticleClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    if (onSelectArticle) {
      onSelectArticle(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPokemonChip = (name: string, isShadow = false, isShiny = false) => {
    const iconUrl = getPokemonIconUrl(name, isShiny);
    return (
      <div key={name} className="guide-pokemon-chip">
        <img 
          src={iconUrl} 
          alt={name} 
          onError={(e) => handlePokemonImageError(e.currentTarget, name, isShiny)}
        />
        <span>{name}</span>
        {isShadow && (
          <img 
            src={SHADOW_ICON_URL} 
            alt="Shadow" 
            style={{ width: 14, height: 14, marginLeft: 2 }}
            onError={(e) => handleShadowIconError(e.currentTarget)}
          />
        )}
      </div>
    );
  };

  const renderVisualArticleWidget = (slug: string) => {
    if (slug === 'rocket-leaders-giovanni-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Shield size={18} color="#ef4444" />
            {lang === 'cs' ? 'Aktuální Sestava Boss Giovanni & Doporučené Countery' : 'Current Boss Giovanni Lineup & Recommended Counters'}
          </h3>
          <div className="guide-lineup-slots">
            <div className="guide-slot-card">
              <div className="guide-slot-header">Slot 1: Lead (Fixed)</div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Persian', true)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
                {lang === 'cs' ? 'Nejlepší countery (Fighting):' : 'Best Counters (Fighting):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Machamp')}
                {renderPokemonChip('Lucario')}
                {renderPokemonChip('Terrakion')}
              </div>
            </div>

            <div className="guide-slot-card">
              <div className="guide-slot-header">Slot 2: Rotující Shadow</div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Nidoking', true)}
                {renderPokemonChip('Rhyperior', true)}
                {renderPokemonChip('Kingler', true)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
                {lang === 'cs' ? 'Nejlepší countery (Water/Grass):' : 'Best Counters (Water/Grass):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Swampert')}
                {renderPokemonChip('Kyogre')}
                {renderPokemonChip('Kartana')}
              </div>
            </div>

            <div className="guide-slot-card">
              <div className="guide-slot-header">Slot 3: Shadow Legendary</div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Rayquaza', true)}
                {renderPokemonChip('Kyogre', true)}
                {renderPokemonChip('Groudon', true)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
                {lang === 'cs' ? 'Nejlepší countery (Ice/Dragon):' : 'Best Counters (Ice/Dragon):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Mamoswine')}
                {renderPokemonChip('Baxcalibur')}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slug === 'raid-battles-counter-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Swords size={18} color="#38bdf8" />
            {lang === 'cs' ? 'TOP S-Tier Raidoví Útočníci v Pokémon GO' : 'TOP S-Tier Raid Attackers in Pokémon GO'}
          </h3>
          <div className="guide-pokemon-chips" style={{ gap: 12 }}>
            {renderPokemonChip('Mega Rayquaza')}
            {renderPokemonChip('Mewtwo', true)}
            {renderPokemonChip('Primal Groudon')}
            {renderPokemonChip('Primal Kyogre')}
            {renderPokemonChip('Terrakion')}
            {renderPokemonChip('Reshiram')}
          </div>
        </div>
      );
    }

    if (slug === 'spotlight-community-day-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Award size={18} color="#f59e0b" />
            {lang === 'cs' ? 'Doporučené Předměty pro Eventy' : 'Recommended Event Items'}
          </h3>
          <div className="guide-pokemon-chips">
            <div className="guide-pokemon-chip">
              <Sparkles size={16} color="#f59e0b" />
              <span>Star Piece (+50% Stardust)</span>
            </div>
            <div className="guide-pokemon-chip">
              <Zap size={16} color="#eab308" />
              <span>Lucky Egg (2x XP)</span>
            </div>
            <div className="guide-pokemon-chip">
              <Target size={16} color="#10b981" />
              <span>Pinap Berry (2x Candy)</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getTranslation = (key: string) => {
    const labels: Record<string, Record<Language, string>> = {
      headerBadge: {
        cs: "Průvodce & Tipy",
        en: "Guides & Tips",
        ja: "ガイド & ヒント",
        ru: "Гайды и Советы"
      },
      headerTitle: {
        cs: "Pokémon GO Strategické Průvodce a Návody",
        en: "Pokémon GO Strategy Guides & Tutorials",
        ja: "Pokémon GO 戦略ガイド & チュートリアル",
        ru: "Стратегические гайды и инструкции Pokémon GO"
      },
      headerDesc: {
        cs: "Kompletní návody na poražení lídrů Team GO Rocket, nejlepší countery na Raidy, rozbor 100% IV hodnot a jak maximálně využít bonusy v Community Days a Spotlight Hours.",
        en: "In-depth guides for beating Team GO Rocket Leaders, best Raid counters, 100% IV appraisal deep dives, and maximizing Community Day & Spotlight Hour bonuses.",
        ja: "GOロケット団リーダー攻略、レイドカウンター最適化、個体値100%判別法、コミュニティ・デイ＆スポットライトアワーの活用テクニックを徹底解説。",
        ru: "Подробные инструкции по победам над Лидерами Ракеты, контерам на Райды, 100% IV значениям и максимизации бонусов на ивентах."
      },
      searchPlaceholder: {
        cs: "Hledat v průvodcích...",
        en: "Search guides...",
        ja: "ガイドを検索...",
        ru: "Поиск в гайдах..."
      },
      backToList: {
        cs: "Zpět na seznam průvodců",
        en: "Back to all guides",
        ja: "ガイド一覧に戻る",
        ru: "Назад к списку гайдов"
      },
      proTips: {
        cs: "Tipy pro maximální efektivitu:",
        en: "Pro Tips for Max Efficiency:",
        ja: "効率化のためのプロヒント：",
        ru: "Советы для максимальной эффективности:"
      },
      noResults: {
        cs: "Nenalezeny žádné průvodce odpovídající vašemu vyhledávání.",
        en: "No guides found matching your search.",
        ja: "該当するガイドが見つかりませんでした。",
        ru: "Гайдов по вашему запросу не найдено."
      }
    };

    return labels[key]?.[lang] || labels[key]?.en || '';
  };

  if (selectedArticle) {
    return (
      <div className="guides-container">
        <div className="guide-article-reader">
          <button className="back-btn" onClick={() => setSelectedArticleSlug(null)}>
            <ArrowLeft size={16} />
            {getTranslation('backToList')}
          </button>

          {selectedArticle.imageUrl && (
            <img 
              src={selectedArticle.imageUrl} 
              alt={selectedArticle.title[lang] || selectedArticle.title.en} 
              className="article-banner"
            />
          )}

          <header className="article-header">
            <div className="guide-card-tag">
              {getCategoryIcon(selectedArticle.iconName)}
              {selectedArticle.category[lang] || selectedArticle.category.en}
            </div>

            <h1>{selectedArticle.title[lang] || selectedArticle.title.en}</h1>

            <p className="article-subtitle">
              {selectedArticle.subtitle[lang] || selectedArticle.subtitle.en}
            </p>

            <div className="guide-card-meta">
              <span><User size={14} /> {selectedArticle.author}</span>
              <span><Clock size={14} /> {selectedArticle.readTime}</span>
              <span>{selectedArticle.updatedAt}</span>
            </div>
          </header>

          <main style={{ marginTop: '28px' }}>
            {renderVisualArticleWidget(selectedArticle.slug)}

            {selectedArticle.sections.map((section) => (
              <section key={section.id} className="article-section">
                <h2>{section.heading[lang] || section.heading.en}</h2>
                <p>{section.content[lang] || section.content.en}</p>

                {section.tips && (
                  <div className="tips-box">
                    <h4><Lightbulb size={16} /> {getTranslation('proTips')}</h4>
                    <ul>
                      {(section.tips[lang] || section.tips.en).map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="guides-container">
      <header className="guides-header">
        <div className="guides-title-badge">
          <BookOpen size={16} />
          {getTranslation('headerBadge')}
        </div>

        <h1>{getTranslation('headerTitle')}</h1>
        <p>{getTranslation('headerDesc')}</p>

        <div className="guides-controls">
          <div className="guides-search">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder={getTranslation('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <p>{getTranslation('noResults')}</p>
        </div>
      ) : (
        <div className="guides-grid">
          {filteredArticles.map((article) => {
            const isFeatured = article.featured && !searchQuery;
            return (
              <article 
                key={article.id} 
                className={`guide-card ${isFeatured ? 'featured' : ''}`}
                onClick={() => handleArticleClick(article.slug)}
              >
                {article.imageUrl && (
                  <div className="guide-card-image-wrapper">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title[lang] || article.title.en} 
                      className="guide-card-image"
                    />
                    <div className="guide-card-image-overlay" />
                  </div>
                )}

                <div className="guide-card-content">
                  <div className="guide-card-tag">
                    {getCategoryIcon(article.iconName)}
                    {article.category[lang] || article.category.en}
                  </div>

                  <h2>{article.title[lang] || article.title.en}</h2>
                  <p>{article.subtitle[lang] || article.subtitle.en}</p>

                  <div className="guide-card-meta">
                    <span><Clock size={14} /> {article.readTime}</span>
                    <span><ChevronRight size={16} color="#38bdf8" style={{ marginLeft: 'auto' }} /></span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
