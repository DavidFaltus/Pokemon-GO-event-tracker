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
import { VIVILLON_PATTERNS, getVivillonSpriteUrl } from './FriendFinderView';
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
  Award,
  Globe,
  Star,
  CheckCircle2,
  Footprints,
  Compass,
  Moon,
  CloudRain,
  RotateCw
} from 'lucide-react';

interface GuidesViewProps {
  lang: Language;
  initialArticleSlug?: string;
  onSelectArticle?: (slug: string) => void;
}

const EVOLUTION_QUEST_ITEMS = [
  {
    base: 'Farfetchd-Galarian',
    evolved: 'Sirfetchd',
    category: 'buddy',
    task: { 
      cs: '10× Excellent hodů jako Buddy Pokémon', 
      en: '10 Excellent Throws as Buddy Pokémon', 
      ja: '相棒にしてエクセレントスロー10回', 
      ru: '10 Excellent бросков с бадди' 
    },
    tip: { 
      cs: 'Hody nemusí jít za sebou! Použijte Nanab Berry na velké raid bossy (Wailmer, Snorlax, Ponyta).', 
      en: 'Throws do not need to be in a row! Use Nanab Berries on large raid bosses for easy targets.',
      ja: '連続で投げる必要はありません！レイドボスにナナのみを使って落ち着いて狙いましょう。',
      ru: 'Броски не обязательно делать подряд! Используйте Nanab Berry на крупных рейдовых боссах.'
    },
    badge: '10× Excellent'
  },
  {
    base: 'Pancham',
    evolved: 'Pangoro',
    category: 'buddy',
    task: { 
      cs: 'Chytit 32 Dark-type Pokémonů jako Buddy', 
      en: 'Catch 32 Dark-type Pokémon as Buddy', 
      ja: '相棒にしてあくタイプ32匹捕獲', 
      ru: 'Поймать 32 Темных покемона с бадди' 
    },
    tip: { 
      cs: 'Bojujte s Dark-type Rocket Gruntem ("Kde je světlo, tam je stín") nebo lovte během nočních spawnů.', 
      en: 'Hunt Dark Rocket Grunts or catch Dark-types during night spawns.',
      ja: 'ロケット団のあくタイプしたっぱと戦うか、夜間の出現を狙いましょう。',
      ru: 'Сражайтесь с тёмными пешками Ракеты или ловите тёмных покемонов ночью.'
    },
    badge: '32 Dark-type'
  },
  {
    base: 'Primeape',
    evolved: 'Annihilape',
    category: 'combat',
    task: { 
      cs: 'Porazit 30 Ghost nebo Psychic Pokémonů v bitvách', 
      en: 'Defeat 30 Ghost or Psychic Pokémon in Trainer Battles', 
      ja: '相棒にしてゴースト/エスパー30匹撃破', 
      ru: 'Победить 30 Призраков/Психических в битвах' 
    },
    tip: { 
      cs: '⚡ Blanche ML Trik: Spusťte trénink proti Blanche v Master League. Její Metagross je Psychic. Porazte Metagrosse a okamžitě vzdejte bitvu — 30 killů máte za pár minut!', 
      en: '⚡ Blanche ML Trick: Battle Blanche in Master League (Metagross is Psychic). Defeat Metagross and surrender to quickly farm all 30 kills!',
      ja: '⚡ ブランシェ裏技：マスターリーグでブランシェと対戦し、メタグロス（エスパー）を倒したら即降参を繰り返せば数分で達成！',
      ru: '⚡ Трюк с Бланш: Сражайтесь с Бланш в Master League. Побеждайте Metagross и сдавайтесь — 30 побед за пару минут!'
    },
    badge: '30 Ghost/Psychic'
  },
  {
    base: 'Charcadet',
    evolved: 'Armarouge',
    altEvolved: 'Ceruledge',
    category: 'combat',
    task: { 
      cs: 'Porazit 30 Psychic (Armarouge) NEBO 30 Ghost (Ceruledge)', 
      en: 'Defeat 30 Psychic (Armarouge) OR 30 Ghost (Ceruledge)', 
      ja: '相棒にしてエスパー30匹（グレンアルマ）/ゴースト30匹（ソウブレイズ）撃破', 
      ru: 'Победить 30 Психических (Armarouge) ИЛИ 30 Призраков (Ceruledge)' 
    },
    tip: { 
      cs: 'Trénink s lídrem Blanche v Master League funguje i na Armarouge!', 
      en: 'Training against Blanche in Master League works for Armarouge too!',
      ja: 'マスターリーグのブランシェ特訓はグレンアルマの進化条件にも有効です！',
      ru: 'Тренировка с лидером Бланш в Master League подходит и для Armarouge!'
    },
    badge: '30 Defeated'
  },
  {
    base: 'Inkay',
    evolved: 'Malamar',
    category: 'special',
    task: { 
      cs: 'Otočit telefon fyzicky vzhůru nohama 🙃 + 50 Candy', 
      en: 'Turn phone physically upside down 🙃 + 50 Candy', 
      ja: '端末を逆さまにして進化ボタンを押す＋アメ50個', 
      ru: 'Перевернуть телефон вверх ногами 🙃 + 50 конфет' 
    },
    tip: { 
      cs: 'Vypněte zámek otáčení obrazovky (Screen Rotation Lock) v telefonu, aby gyroskop detekoval polohu.', 
      en: 'Ensure Screen Rotation Lock is turned off so your phone gyroscope detects the upside down angle.',
      ja: '端末の画面回転ロックを解除し、ジャイロセンサーが機能していることを確認してください。',
      ru: 'Отключите блокировку поворота экрана, чтобы гироскоп зафиксировал перевёрнутое положение.'
    },
    badge: 'Gyro Invert 🙃'
  },
  {
    base: 'Feebas',
    evolved: 'Milotic',
    category: 'walk',
    task: { 
      cs: 'Ujít 20 km jako Buddy Pokémon + 100 Candy', 
      en: 'Walk 20 km as Buddy Pokémon + 100 Candy', 
      ja: '相棒にして20km歩く＋100アメ', 
      ru: 'Пройти 20 км с бадди + 100 конфет' 
    },
    tip: { 
      cs: 'Použijte Poffin na zkrácení vzdálenosti pro sběr Candy na 2.5 km.', 
      en: 'Use a Poffin to halve candy finding distance.',
      ja: 'ポフィンを使うとアメ獲得に必要な歩行距離を半減（2.5km）できます。',
      ru: 'Используйте Poffin, чтобы сократить дистанцию для поиска конфет до 2.5 км.'
    },
    badge: '20 km Buddy Walk'
  },
  {
    base: 'Pawmo',
    evolved: 'Pawmot',
    category: 'walk',
    task: { 
      cs: 'Ujít 25 km jako Buddy Pokémon + 100 Candy', 
      en: 'Walk 25 km as Buddy Pokémon + 100 Candy', 
      ja: '相棒にして25km歩く＋100アメ', 
      ru: 'Пройти 25 км с бадди + 100 конфет' 
    },
    tip: { 
      cs: 'Jako buddyho musíte mít Pawmo (2. fázi), ne základního Pawmi!', 
      en: 'Must have Pawmo (stage 2) equipped as your active buddy, not basic Pawmi!',
      ja: '進化前のパモではなく、第2形態のパモットを相棒にして歩く必要があります！',
      ru: 'Напарником должен быть именно Pawmo (2-я стадия), а не базовый Pawmi!'
    },
    badge: '25 km Buddy Walk'
  },
  {
    base: 'Ursaring',
    evolved: 'Ursaluna',
    category: 'special',
    task: { 
      cs: '100 Candy během astronomického Úplňku 🌕', 
      en: '100 Candy during real-world Full Moon night 🌕', 
      ja: '現実の満月の夜に進化ボタンが解禁＋アメ100個', 
      ru: '100 конфет во время реального полнолуния 🌕' 
    },
    tip: { 
      cs: 'Hra se synchronizuje s reálným astronomickým kalendářem. Sledujte noční oblohu ve hře.', 
      en: 'Synchronizes with real astronomical lunar calendars.',
      ja: '現実の天文学的月齢カレンダーと同期しています。ゲーム内の夜空をチェックしましょう。',
      ru: 'Синхронизируется с реальным астрономическим лунным календарём. Следите за ночным небом в игре.'
    },
    badge: 'Full Moon 🌕'
  },
  {
    base: 'Sliggoo',
    evolved: 'Goodra',
    altEvolved: 'Goodra-Hisuian',
    category: 'special',
    task: { 
      cs: 'Během deště 🌧️ NEBO v dosahu Rainy Lure Modulu', 
      en: 'During in-game Rain 🌧️ OR near active Rainy Lure Module', 
      ja: '雨天時またはレイニールアーの近くで進化', 
      ru: 'Во время дождя 🌧️ ИЛИ у Rainy Lure' 
    },
    tip: { 
      cs: 'Aktivujte modrý Rainy Lure Modul na libovolném PokéStopu pro okamžitou evoluci.', 
      en: 'Drop a Rainy Lure Module on any PokéStop to unlock the evolution instantly.',
      ja: 'ポケストップにレイニールアーを使用すれば天候に関係なく即座に進化できます。',
      ru: 'Установите модуль Rainy Lure на любой покестоп для мгновенной эволюции.'
    },
    badge: 'Rain / Rainy Lure 🌧️'
  },
  {
    base: 'Poipole',
    evolved: 'Naganadel',
    category: 'buddy',
    task: { 
      cs: 'Chytit 20 Dragon-type Pokémonů jako Buddy + 200 Candy', 
      en: 'Catch 20 Dragon-type Pokémon as Buddy + 200 Candy', 
      ja: '相棒にしてドラゴンタイプ20匹捕獲＋アメ200個', 
      ru: 'Поймать 20 Драконов с бадди + 200 конфет' 
    },
    tip: { 
      cs: 'Využijte Dragon raidy nebo Dragon Rocket Grunta ("ROAR... Jak se ti líbí tohle?").', 
      en: 'Clear Dragon-tier raids or Dragon Rocket Grunts.',
      ja: 'ドラゴンレイドやロケット団のドラゴンタイプしたっぱを活用しましょう。',
      ru: 'Используйте рейды на драконов или пешек Ракеты с драконьим типом.'
    },
    badge: '20 Dragon-type'
  },
  {
    base: 'Sneasel-Hisuian',
    evolved: 'Sneasler',
    category: 'walk',
    task: { 
      cs: 'Ujít 7 km jako Buddy + Denní doba (Daytime ☀️)', 
      en: 'Walk 7 km as Buddy + Daytime evolve ☀️', 
      ja: '相棒にして7km歩く＋昼間に進化', 
      ru: 'Пройти 7 км с бадди + днём ☀️' 
    },
    tip: { 
      cs: 'V noci se tlačítko evoluce zamkne. Počkejte na východ slunce ve hře.', 
      en: 'Evolution button locks during night hours. Evolve when the in-game sky is bright.',
      ja: '夜間は進化ボタンがロックされます。ゲーム内マップが昼間の明るさの時に進化させてください。',
      ru: 'Ночью кнопка эволюции блокируется. Дождитесь светлого времени суток на игровой карте.'
    },
    badge: '7 km + Day ☀️'
  },
  {
    base: 'Eevee',
    evolved: 'Sylveon',
    altEvolved: 'Espeon',
    category: 'buddy',
    task: { 
      cs: 'Sylveon (70 srdcí), Espeon/Umbreon (10 km + Den/Noc), Leafeon/Glaceon (Lure)', 
      en: 'Sylveon (70 hearts), Espeon/Umbreon (10 km + Day/Night), Leafeon/Glaceon (Lures)', 
      ja: 'ニンフィア（ハート70個）、エーフィ/ブラッキー（10km＋昼/夜）、リーフィア/グレイシア（ルアー）', 
      ru: 'Sylveon (70 сердец), Espeon/Umbreon (10км + день/ночь), Leafeon/Glaceon (Lure)' 
    },
    tip: { 
      cs: 'Jednorázové triky se jmény: Kira ➔ Sylveon, Sakura ➔ Espeon, Tamao ➔ Umbreon, Linnea ➔ Leafeon, Rea ➔ Glaceon.', 
      en: 'One-time name tricks: Kira (Sylveon), Sakura (Espeon), Tamao (Umbreon), Linnea (Leafeon), Rea (Glaceon).',
      ja: '初回限定名前裏技：Kira（ニンフィア）、Sakura（エーフィ）、Tamao（ブラッキー）、Linnea（リーフィア）、Rea（グレイシア）',
      ru: 'Одноразовые имена: Kira (Sylveon), Sakura (Espeon), Tamao (Umbreon), Linnea (Leafeon), Rea (Glaceon).'
    },
    badge: 'Eeveelutions'
  }
];

export const GuidesView: React.FC<GuidesViewProps> = ({ 
  lang, 
  initialArticleSlug,
  onSelectArticle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialArticleSlug || null);
  const [evolutionCategoryFilter, setEvolutionCategoryFilter] = useState<'all' | 'buddy' | 'combat' | 'walk' | 'special'>('all');
  const [vivillonRarityFilter, setVivillonRarityFilter] = useState<'all' | 'rare' | 'common'>('all');

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
          loading="lazy"
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
    // 1. All Evolution Quests Master Widget
    if (slug === 'pokemon-evolution-quests-guide') {
      const filteredQuests = EVOLUTION_QUEST_ITEMS.filter(q => {
        if (evolutionCategoryFilter === 'all') return true;
        return q.category === evolutionCategoryFilter;
      });

      return (
        <div className="guide-visual-widget guide-evolution-widget">
          <div className="widget-header-row">
            <h3>
              <Sparkles size={20} color="#38bdf8" />
              {lang === 'cs' ? 'Interaktivní Katalog Všech Evolve Questů' : 'Interactive Evolution Quests Catalog'}
            </h3>
            <div className="widget-filter-tabs">
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('all')}
              >
                {lang === 'cs' ? 'Všechny' : 'All'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'buddy' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('buddy')}
              >
                {lang === 'cs' ? '🎯 Buddy & Úkoly' : '🎯 Buddy Tasks'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'combat' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('combat')}
              >
                {lang === 'cs' ? '⚔️ Bitvy & Trik' : '⚔️ Battles & Trick'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'walk' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('walk')}
              >
                {lang === 'cs' ? '👟 Chůze' : '👟 Walking'}
              </button>
              <button 
                className={`widget-tab-btn ${evolutionCategoryFilter === 'special' ? 'active' : ''}`}
                onClick={() => setEvolutionCategoryFilter('special')}
              >
                {lang === 'cs' ? '🌀 Speciální (Gyro/Měsíc)' : '🌀 Special (Gyro/Moon)'}
              </button>
            </div>
          </div>

          <div className="guide-evolution-grid">
            {filteredQuests.map((item, idx) => (
              <div key={idx} className="guide-evolution-card">
                <div className="evolution-card-top">
                  <div className="evolution-sprite-deck">
                    <div className="pokemon-avatar-box">
                      <img 
                        src={`https://img.pokemondb.net/sprites/home/normal/${item.base.toLowerCase()}.png`} 
                        alt={item.base} 
                        className="evolution-avatar-img"
                        loading="lazy"
                      />
                      <span className="evolution-avatar-name">{item.base.replace('-Galarian', ' (Galarian)').replace('-Hisuian', ' (Hisuian)')}</span>
                    </div>

                    <div className="evolution-arrow-badge">
                      <span className="arrow-sym">➔</span>
                      <span className="req-pill">{item.badge}</span>
                    </div>

                    <div className="pokemon-avatar-box">
                      <img 
                        src={`https://img.pokemondb.net/sprites/home/normal/${item.evolved.toLowerCase()}.png`} 
                        alt={item.evolved} 
                        className="evolution-avatar-img"
                        loading="lazy"
                      />
                      <span className="evolution-avatar-name">{item.evolved}</span>
                    </div>
                  </div>
                </div>

                <div className="evolution-card-body">
                  <div className="quest-task-line">
                    <CheckCircle2 size={15} color="#10b981" />
                    <strong>{item.task[lang] || item.task.en}</strong>
                  </div>
                  {item.tip && (
                    <div className="quest-pro-tip">
                      <Lightbulb size={13} color="#eab308" />
                      <span>{item.tip[lang] || item.tip.en}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 2. Vivillon 18 Patterns Showcase Widget
    if (slug === 'vivillon-patterns-postcard-guide') {
      const filteredPatterns = VIVILLON_PATTERNS.filter(pat => {
        if (vivillonRarityFilter === 'rare') return pat.rare;
        if (vivillonRarityFilter === 'common') return !pat.rare;
        return true;
      });

      return (
        <div className="guide-visual-widget guide-vivillon-widget">
          <div className="widget-header-row">
            <h3>
              <Globe size={20} color="#38bdf8" />
              {lang === 'cs' ? 'Všech 18 Vzorů Vivillona – Oficiální 3D Art Gallery & Regiony' : 'All 18 Vivillon Wing Patterns – Official 3D Gallery & Regions'}
            </h3>
            <div className="widget-filter-tabs">
              <button 
                className={`widget-tab-btn ${vivillonRarityFilter === 'all' ? 'active' : ''}`}
                onClick={() => setVivillonRarityFilter('all')}
              >
                {lang === 'cs' ? 'Všech 18 vzorů' : 'All 18 Patterns'}
              </button>
              <button 
                className={`widget-tab-btn ${vivillonRarityFilter === 'rare' ? 'active' : ''}`}
                onClick={() => setVivillonRarityFilter('rare')}
              >
                {lang === 'cs' ? '⭐ Nejcennější vzory' : '⭐ Rarest Tiers'}
              </button>
              <button 
                className={`widget-tab-btn ${vivillonRarityFilter === 'common' ? 'active' : ''}`}
                onClick={() => setVivillonRarityFilter('common')}
              >
                {lang === 'cs' ? 'Standardní vzory' : 'Common Patterns'}
              </button>
            </div>
          </div>

          <div className="guide-vivillon-grid">
            {filteredPatterns.map(pat => (
              <div key={pat.id} className={`guide-vivillon-card ${pat.rare ? 'rare' : ''}`}>
                <div className="vivillon-img-wrapper">
                  <img 
                    src={getVivillonSpriteUrl(pat.id)} 
                    alt={pat.id} 
                    className="vivillon-3d-sprite"
                    loading="lazy"
                  />
                  {pat.rare && (
                    <span className="vivillon-rare-tag">
                      <Star size={11} fill="#eab308" color="#eab308" /> {lang === 'cs' ? 'Vzácný' : 'Rare'}
                    </span>
                  )}
                </div>
                <div className="vivillon-card-info">
                  <h4>{pat.name[lang] || pat.name.en}</h4>
                  <p className="vivillon-region-text">
                    {pat.emoji} {pat.id.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Postcard Milestone Indicator */}
          <div className="postcard-milestone-box">
            <div className="milestone-title">
              <Sparkles size={16} color="#38bdf8" />
              <strong>{lang === 'cs' ? 'Postcard Book Milníky pro Scatterbug Encounter:' : 'Postcard Book Milestones for Scatterbug Encounters:'}</strong>
            </div>
            <div className="milestone-steps">
              <div className="milestone-step">
                <span className="milestone-num">1. Medaile</span>
                <span className="milestone-val">3 Pohlednice</span>
              </div>
              <span className="milestone-arrow">➔</span>
              <div className="milestone-step">
                <span className="milestone-num">2. Medaile</span>
                <span className="milestone-val">9 Pohlednic</span>
              </div>
              <span className="milestone-arrow">➔</span>
              <div className="milestone-step">
                <span className="milestone-num">3. Medaile a další</span>
                <span className="milestone-val">15 Pohlednic</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Weekly Mini-Events Widget
    if (slug === 'weekly-hidden-mini-events-guide') {
      return (
        <div className="guide-visual-widget weekly-schedule-widget">
          <h3>
            <Calendar size={20} color="#38bdf8" />
            {lang === 'cs' ? 'Přehled týdenních minieventů a rutin trenéra' : 'Weekly Mini-Events & Trainer Routines Breakdown'}
          </h3>
          <p className="widget-subtitle">
            {lang === 'cs' ? 'Karty rozdělené podle herních disciplín s přesnými časy, bonusy a klíčovými tipy:' : 'Categorized by game mechanics with exact schedules, perks, and pro tips:'}
          </p>

          <div className="mini-events-category-grid">
            <div className="mini-event-category-card combat-card">
              <div className="category-header">
                <span className="category-badge badge-combat"><Swords size={14} /> {lang === 'cs' ? 'Bojové Minieventy' : 'Combat Mini-Events'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Max Mondays</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Pondělí 18:00–19:00' : 'Mondays 6–7 PM'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Dynamax Pokémoni na téměř všech Power Spotech. Zvýšený sběr Max Particles.' : 'Featured Dynamax Pokémon take over Power Spots with boosted Max Particles.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Raid Hour</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Středa 18:00–19:00' : 'Wednesdays 6–7 PM'}</span>
                  </div>
                  <p>{lang === 'cs' ? '5★ Legendární boss na všech gymech. Hrajte v Party Play pro 2× Charged Move damage!' : '5★ Legendary boss across all gyms. Activate Party Play for 2x Charged Move damage!'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card social-card">
              <div className="category-header">
                <span className="category-badge badge-social"><User size={14} /> {lang === 'cs' ? 'Sociální & Trade Zvyky' : 'Social & Trading'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Friendship Friday</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Každý Pátek' : 'Every Friday'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Otevírání max počtu dárků (30–40/den) pro urychlení Best Friends a Lucky Friends statusu.' : 'Maximize gift opening (30–40/day) to trigger Lucky Friends and farm 100k XP.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Trade Weekend</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Sobota & Neděle' : 'Weekends'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Výměna Pokémonů s odstupem 100+ km pro garantovanou Candy XL pro oba trenéry.' : 'Trading Pokémon caught 100+ km apart awards 1 guaranteed Candy XL to both players.'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card collector-card">
              <div className="category-header">
                <span className="category-badge badge-collector"><Sparkles size={14} /> {lang === 'cs' ? 'Sběratelské & Showcases' : 'Collector & Showcases'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Spotlight Hour</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Úterý 18:00–19:00' : 'Tuesdays 6–7 PM'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Masivní spawn 1 Pokémona a 1 z 5 rotujících bonusů (2× Stardust, 2× XP, 2× Candy atd.).' : 'Intensive spawns of 1 species and rotating 2x Stardust/XP/Candy bonuses.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>PokéStop Showcases</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Čtvrtek až Neděle' : 'Thu to Sun'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Soutěže o největšího XXL Pokémona s odměnami: Incubators, Star Pieces, Lures a 10k XP.' : 'Size competitions (XXL) at PokéStops rewarding Incubators, Star Pieces, and 10k XP.'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card daily-card">
              <div className="category-header">
                <span className="category-badge badge-daily"><Clock size={14} /> {lang === 'cs' ? 'Denní Trenérské Rutiny' : 'Daily Trainer Habits'}</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>Daily Adventure Incense</strong>
                    <span className="event-time-pill">{lang === 'cs' ? '15 minut denně' : '15 mins/day'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Bezplatné kadidlo při chůzi se šancí na legendární Galarian Articuno, Zapdos a Moltres.' : 'Free walking incense with chance to encounter Galarian Articuno, Zapdos, and Moltres.'}</p>
                </div>
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>50 PokéCoins Gym Defense</strong>
                    <span className="event-time-pill">{lang === 'cs' ? 'Denní limit' : 'Daily Cap'}</span>
                  </div>
                  <p>{lang === 'cs' ? 'Obsazení 2–3 gymů denně (1 500 coinů měsíčně zdarma na Storage a Raid Passy).' : 'Defend Gyms daily for 50 coins = 1,500 monthly free coins for Storage & Passes.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 4. Rocket Leaders & Giovanni Widget
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
                {lang === 'cs' ? 'Nejlepší countery (Fighting - Shield Breakers):' : 'Best Counters (Fighting - Shield Breakers):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Lucario')}
                {renderPokemonChip('Machamp')}
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
                {lang === 'cs' ? 'Nejlepší countery (Water/Grass/Ground):' : 'Best Counters (Water/Grass/Ground):'}
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
                {lang === 'cs' ? 'Nejlepší countery (Ice/Dragon/Water):' : 'Best Counters (Ice/Dragon/Water):'}
              </div>
              <div className="guide-pokemon-chips">
                {renderPokemonChip('Mamoswine')}
                {renderPokemonChip('Baxcalibur')}
                {renderPokemonChip('Glaceon')}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 5. Raid Battles Guide Widget
    if (slug === 'raid-battles-counter-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Swords size={18} color="#38bdf8" />
            {lang === 'cs' ? 'TOP S-Tier Raidoví Útočníci v Pokémon GO (2026 Meta)' : 'TOP S-Tier Raid Attackers in Pokémon GO (2026 Meta)'}
          </h3>
          <div className="guide-pokemon-chips" style={{ gap: 12 }}>
            {renderPokemonChip('Mega Rayquaza')}
            {renderPokemonChip('Mewtwo', true)}
            {renderPokemonChip('Primal Groudon')}
            {renderPokemonChip('Primal Kyogre')}
            {renderPokemonChip('Terrakion')}
            {renderPokemonChip('Reshiram')}
            {renderPokemonChip('Kartana')}
            {renderPokemonChip('Necrozma')}
          </div>
        </div>
      );
    }

    // 6. Spotlight & Community Day Widget
    if (slug === 'spotlight-community-day-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Award size={18} color="#f59e0b" />
            {lang === 'cs' ? 'Klíčové Předměty pro Stacking Bonusů' : 'Key Items for Bonus Stacking'}
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
              <span>Pinap / Silver Pinap (2x+ Candy)</span>
            </div>
          </div>
        </div>
      );
    }

    // 7. IV & Appraisal Widget
    if (slug === 'pokemon-iv-cp-appraise-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Sparkles size={18} color="#a855f7" />
            {lang === 'cs' ? 'Porovnání: PvE 100% IV vs PvP Great/Ultra League IV' : 'Comparison: PvE 100% IV vs PvP Great/Ultra League IV'}
          </h3>
          <div className="mini-events-category-grid" style={{ marginTop: 12 }}>
            <div className="mini-event-category-card combat-card">
              <div className="category-header">
                <span className="category-badge badge-combat">PvE Raidy & Gymy</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>15 / 15 / 15 (100% IV - Hundo)</strong>
                    <span className="event-time-pill">4★</span>
                  </div>
                  <p>{lang === 'cs' ? 'V raidech není žádný CP limit. 15 Attack zaručuje maximální možné poškození za sekundu.' : 'No CP cap in raids. 15 Attack ensures maximum possible damage output.'}</p>
                </div>
              </div>
            </div>

            <div className="mini-event-category-card social-card">
              <div className="category-header">
                <span className="category-badge badge-social">PvP Great & Ultra League</span>
              </div>
              <div className="category-items">
                <div className="event-item">
                  <div className="event-item-top">
                    <strong>0 / 15 / 15 (Stat Product #1)</strong>
                    <span className="event-time-pill">Max Bulk</span>
                  </div>
                  <p>{lang === 'cs' ? 'Nízký Attack umožní posunout Pokémona na vyšší Level pod limitem 1500/2500 CP, což dává obrovskou výdrž a HP.' : 'Low Attack allows powering up to higher levels under 1,500/2,500 CP caps, maximizing bulk.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 8. Mega & Dynamax Widget
    if (slug === 'mega-dynamax-mechanics-guide') {
      return (
        <div className="guide-visual-widget">
          <h3>
            <Trophy size={18} color="#ec4899" />
            {lang === 'cs' ? 'Úrovně Mega Evoluce & Dynamax Max Moves' : 'Mega Evolution Tiers & Dynamax Max Moves'}
          </h3>
          <div className="guide-pokemon-chips" style={{ gap: 10 }}>
            <div className="guide-pokemon-chip">
              <span style={{ fontWeight: 800, color: '#94a3b8' }}>Tier 1 (Base):</span>
              <span>+1 Candy, 7 dní cooldown</span>
            </div>
            <div className="guide-pokemon-chip">
              <span style={{ fontWeight: 800, color: '#38bdf8' }}>Tier 2 (High):</span>
              <span>+1 Candy, +10% Candy XL, 5 dní cooldown</span>
            </div>
            <div className="guide-pokemon-chip">
              <span style={{ fontWeight: 800, color: '#10b981' }}>Tier 3 (Max):</span>
              <span>+2 Candy, +25% Candy XL, 3 dny cooldown</span>
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

          <header className="article-header">
            <div className="article-hero-deck">
              <div className="article-hero-info">
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
              </div>

              {selectedArticle.imageUrl && (
                <div className="article-hero-art-frame">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title[lang] || selectedArticle.title.en} 
                    className="article-hero-art-img"
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </header>

          <main style={{ marginTop: '28px' }}>
            {renderVisualArticleWidget(selectedArticle.slug)}

            {selectedArticle.sections.map((section) => (
              <section key={section.id} className="article-section">
                <h2>{section.heading[lang] || section.heading.en}</h2>

                {section.pokemon && section.pokemon.length > 0 && (
                  <div className="guide-section-pokemon-deck">
                    <span className="deck-label">{lang === 'cs' ? 'Pokémoni v této sekci:' : 'Featured Pokémon in this section:'}</span>
                    <div className="guide-pokemon-chips">
                      {section.pokemon.map(p => renderPokemonChip(p))}
                    </div>
                  </div>
                )}

                <div className="article-text-flow">
                  {(section.content[lang] || section.content.en).split('\n').map((paragraph, pIdx) => {
                    if (!paragraph.trim()) return null;
                    if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                      return (
                        <div key={pIdx} className="guide-bullet-point-row">
                          <span className="bullet-dot" />
                          <span>{paragraph.replace(/^[•-]\s*/, '')}</span>
                        </div>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>

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
                      className="guide-card-art-img"
                      loading="lazy"
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
