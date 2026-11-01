'use client';

import React, { useState, useMemo } from 'react';
import type { Language } from '../data/translations';
import { 
  MapPin, 
  ArrowLeft, 
  ZoomIn, 
  ChevronRight, 
  Sparkles, 
  Search,
  Check,
  Copy,
  Layers,
  Award,
  X
} from 'lucide-react';
import { POKELID_PREFECTURES } from '../data/specialBackgroundsData';
import { 
  ALL_POKELIDS, 
  JAPAN_REGIONS, 
  getAllPokelidsList, 
  getPokelidsByPrefecture, 
  getPokelidsByRegion, 
  type PokelidDetailItem 
} from '../data/pokelidDetailsData';
import { 
  ALL_JAPAN_PREFECTURES_PATHS, 
  PREFECTURE_LOCAL_MAPS, 
  POKELID_MAP_PINS, 
  projectCoordinatesToLocalMap 
} from '../data/japanPrefecturesMapData';
import { getPokemonIconUrl, handlePokemonImageError } from '../utils/imageResolver';
import './PokelidStampRallyInteractiveWidget.css';

export interface LightboxGalleryItem {
  url: string;
  thumb?: string;
  title?: string;
  subtitle?: string;
}

export interface PokelidStampRallyInteractiveWidgetProps {
  lang: Language;
  onOpenLightbox?: (gallery: { items: LightboxGalleryItem[]; currentIndex: number }) => void;
  onNavigateArticle?: (slug: string) => void;
}

export const PokelidStampRallyInteractiveWidget: React.FC<PokelidStampRallyInteractiveWidgetProps> = ({ 
  lang,
  onOpenLightbox,
  onNavigateArticle
}) => {
  const [pokelidFilter, setPokelidFilter] = useState<string>('all');
  const [pokelidSearch, setPokelidSearch] = useState<string>('');
  const [selectedPrefectureId, setSelectedPrefectureId] = useState<string | null>(null);
  const [hoveredPrefectureId, setHoveredPrefectureId] = useState<string | null>(null);
  const [hoveredLocalLidId, setHoveredLocalLidId] = useState<string | null>(null);
  const [pokelidLidSearch, setPokelidLidSearch] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const setLightboxGallery = (gallery: { items: LightboxGalleryItem[]; currentIndex: number }) => {
    if (onOpenLightbox) {
      onOpenLightbox(gallery);
    } else {
      if (gallery.items.length > 0) {
        window.open(gallery.items[gallery.currentIndex].url, '_blank');
      }
    }
  };

  const handleArticleClick = (slug: string) => {
    if (onNavigateArticle) {
      onNavigateArticle(slug);
    } else {
      window.location.href = `/${lang}/guides/${slug}`;
    }
  };

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

const pokelidFilterTabs = [
        { id: 'all', label: { cs: '🗾 Všechny (482)', en: '🗾 All (482)', ja: '🗾 全国（482）', ru: '🗾 Все (482)' } },
        { id: 'full-coverage', label: { cs: '⭐ 100% Pokrytí (7)', en: '⭐ 100% Coverage (7)', ja: '⭐ 全域コンプ（7）', ru: '⭐ 100% Покрытие (7)' } },
        { id: 'hokkaido', label: { cs: '❄️ Hokkaidó (50)', en: '❄️ Hokkaido (50)', ja: '❄️ 北海道（50）', ru: '❄️ Хоккайдо (50)' } },
        { id: 'tohoku', label: { cs: '🏔️ Tóhoku (128)', en: '🏔️ Tohoku (128)', ja: '🏔️ 東北地方（128）', ru: '🏔️ Тохоку (128)' } },
        { id: 'kanto', label: { cs: '⚡ Kanto (33)', en: '⚡ Kanto (33)', ja: '⚡ 関東地方（33）', ru: '⚡ Канто (33)' } },
        { id: 'chubu', label: { cs: '🦖 Čúbu (57)', en: '🦖 Chubu (57)', ja: '🦖 中部地方（57）', ru: '🦖 Тюбу (57)' } },
        { id: 'kansai', label: { cs: '🦦 Kansai (62)', en: '🦦 Kansai (62)', ja: '🦦 近畿地方（62）', ru: '🦦 Кансай (62)' } },
        { id: 'chugoku', label: { cs: '🏜️ Čúgoku (33)', en: '🏜️ Chugoku (33)', ja: '🏜️ 中国地方（33）', ru: '🏜️ Тюгоку (33)' } },
        { id: 'shikoku', label: { cs: '🍜 Šikoku (41)', en: '🍜 Shikoku (41)', ja: '🍜 四国地方（41）', ru: '🍜 Сикоку (41)' } },
        { id: 'kyushu', label: { cs: '⚡ Kjúšú (61)', en: '⚡ Kyushu (61)', ja: '⚡ 九州地方（61）', ru: '⚡ Кюсю (61)' } },
        { id: 'okinawa', label: { cs: '🌺 Okinawa (17)', en: '🌺 Okinawa (17)', ja: '🌺 沖縄地方（17）', ru: '🌺 Окинава (17)' } },
      ];

      const prefectureNameMap: Record<string, string> = {};
      POKELID_PREFECTURES.forEach(p => {
        prefectureNameMap[p.id] = p.prefecture[lang] || p.prefecture.en;
      });

      // Filtered Prefectures
      const filteredPokelids = POKELID_PREFECTURES.filter(item => {
        if (selectedPrefectureId !== 'all') {
          return item.id === selectedPrefectureId;
        }
        if (pokelidFilter === 'full-coverage' && !item.hasFullCoverage) return false;
        if (pokelidFilter !== 'all' && pokelidFilter !== 'full-coverage') {
          const regionObj = JAPAN_REGIONS.find(r => r.id === pokelidFilter);
          if (regionObj && !regionObj.prefectures.includes(item.id)) return false;
        }
        
        if (pokelidSearch.trim()) {
          const q = pokelidSearch.toLowerCase();
          const matchPref = (item.prefecture[lang] || item.prefecture.en).toLowerCase().includes(q);
          const matchAmb = (item.ambassadorName[lang] || item.ambassadorName.en).toLowerCase().includes(q) || item.ambassadorPokemon.toLowerCase().includes(q);
          const matchTheme = (item.backgroundTheme[lang] || item.backgroundTheme.en).toLowerCase().includes(q);
          if (!matchPref && !matchAmb && !matchTheme) return false;
        }
        return true;
      });

      // Active Lids Resolution
      let activeLidsList: PokelidDetailItem[] = [];
      if (selectedPrefectureId !== 'all') {
        activeLidsList = getPokelidsByPrefecture(selectedPrefectureId);
      } else {
        if (pokelidFilter === 'full-coverage') {
          const fullCoverageIds = POKELID_PREFECTURES.filter(p => p.hasFullCoverage).map(p => p.id);
          activeLidsList = getPokelidsByRegion(fullCoverageIds);
        } else if (pokelidFilter !== 'all') {
          const regionObj = JAPAN_REGIONS.find(r => r.id === pokelidFilter);
          if (regionObj) {
            activeLidsList = getPokelidsByRegion(regionObj.prefectures);
          } else {
            activeLidsList = getAllPokelidsList();
          }
        } else {
          activeLidsList = getAllPokelidsList();
        }
      }

      // Live search filter on municipality lids
      const filteredLids = activeLidsList.filter(lid => {
        if (!pokelidLidSearch.trim()) return true;
        const q = pokelidLidSearch.toLowerCase().trim();
        const matchCity = lid.city.toLowerCase().includes(q);
        const matchCityEn = lid.cityEn.toLowerCase().includes(q);
        const matchId = lid.descId.includes(q);
        const prefName = (prefectureNameMap[lid.prefectureId] || '').toLowerCase();
        return matchCity || matchCityEn || matchId || prefName.includes(q);
      });

      const openPokelidsInLightbox = (lidsList: PokelidDetailItem[], startIndex: number) => {
        const items = lidsList.map((lid, idx) => {
          const prefTitle = prefectureNameMap[lid.prefectureId] || lid.prefectureId;
          const cityTitle = lid.cityEn && lid.cityEn !== lid.city 
            ? `${lid.city} (${lid.cityEn})` 
            : lid.city;
          return {
            url: lid.largeImage,
            thumb: lid.smallImage,
            title: `${cityTitle} — ${prefTitle}`,
            subtitle: `${lang === 'cs' ? 'Poké Lid' : lang === 'ja' ? 'ポケふた' : lang === 'ru' ? 'Люк' : 'Poké Lid'} #${lid.descId} • ${idx + 1} / ${lidsList.length}`,
            badge: `#${lid.descId}`,
            city: cityTitle,
            prefecture: prefTitle,
            descId: lid.descId,
            lat: lid.lat,
            lng: lid.lng
          };
        });
        setLightboxGallery({
          items,
          currentIndex: startIndex
        });
      };

      const selectedPrefItem = POKELID_PREFECTURES.find(p => p.id === selectedPrefectureId);

      return (
        <div className="guide-pokelid-widget">
          {/* Header Banner */}
          <div className="pokelid-hero-banner">
            <h3>{lang === 'cs' ? 'Poké Lid Stamp Rally & Ambasadoři prefektur' : lang === 'ja' ? 'ポケふたスタンプラリー＆推しポケモン名鑑' : lang === 'ru' ? 'Poké Lid Stamp Rally и покемоны-амбассадоры' : 'Poké Lid Stamp Rally & Regional Ambassadors'}</h3>
            <p>
              {lang === 'cs' 
                ? 'Navštivte skutečné litinové poklopy v Japonsku, sbírejte razítka v albu Scrapbook a za každé 2 razítka získejte garantovaného Pikachu s lokačním pozadím dané prefektury!' 
                : lang === 'ja'
                ? '実在する世界に1枚のポケふたを巡り、現地スピンでスタンプを収集。同一県内で2個集めるごとに、限定ロケーション背景付きピカチュウを確定ゲット！'
                : lang === 'ru'
                ? 'Посещайте чугунные люки в Японии, собирайте штампы и за каждые 2 штампа получайте гарантированного Пикачу с фоном префектуры!'
                : 'Explore authentic utility hole covers in Japan, collect stamps in your Scrapbook, and unlock guaranteed Pikachu encounters with exclusive prefectural Location Cards every 2 stamps!'}
            </p>
          </div>

          {/* Reward Banner */}
          <div className="pokelid-reward-callout">
            <div className="reward-icon-frame">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                alt="Pikachu" 
                className="reward-pikachu-img" 
              />
            </div>
            <div className="reward-callout-text">
              <span className="reward-tag">🎁 {lang === 'cs' ? 'Garantovaná Odměna' : lang === 'ja' ? '確定リワード遭遇' : lang === 'ru' ? 'Гарантированная награда' : 'Guaranteed Encounter'}</span>
              <h4>{lang === 'cs' ? 'Každá 2 Razítka = Pikachu s Lokačním Pozadím' : lang === 'ja' ? 'スタンプ2個ごとに限定背景ピカチュウ確定！' : lang === 'ru' ? 'Каждые 2 штампа = Пикачу с фоном локации' : 'Every 2 Stamps = Location Background Pikachu'}</h4>
              <p>
                {lang === 'cs' 
                  ? 'Střetnutí s Pikachu, který má na obrazovce shrnutí originální umělecké pozadí dané prefektury. Může být Shiny! Opakovatelné bez omezení.' 
                  : lang === 'ja' 
                  ? '詳細画面にご当地の名所が描かれた限定背景ピカチュウが出現！色違い判定あり、回数無制限で何度でも獲得可能。' 
                  : lang === 'ru' 
                  ? 'Пикачу с уникальным фоном префектуры на экране. Может быть Shiny! Безлимитный сбор.' 
                  : 'Encounter Pikachu bearing custom regional backdrop art. Can be Shiny! Fully repeatable without cap.'}
              </p>
            </div>
          </div>

          {/* Interactive Japan Poké Lids Map Card */}
          <div className="pokelid-interactive-map-card">
            <div className="map-card-header">
              <div className="map-title-badge">
                <MapPin size={15} />
                <span>{lang === 'cs' ? 'Interaktivní Mapa & Regiony' : lang === 'ja' ? 'インタラクティブ日本地図' : lang === 'ru' ? 'Интерактивная карта Японии' : 'Interactive Japan Map'}</span>
              </div>
              <h3>
                {selectedPrefectureId === 'all'
                  ? (lang === 'cs' ? 'Mapa Poké Lids v Japonsku (47 prefektur)' : lang === 'ja' ? '全国47都道府県ポケふた設置マップ' : lang === 'ru' ? 'Карта люков Poké Lids в Японии (47 префектур)' : 'Japan Poké Lids Map (47 Prefectures)')
                  : (selectedPrefItem ? `${selectedPrefItem.prefecture[lang] || selectedPrefItem.prefecture.en} — ${lang === 'cs' ? 'Detailní mapa poklopů' : lang === 'ja' ? '地域詳細マップ' : lang === 'ru' ? 'Подробная карта люков' : 'Municipality Map'}` : 'Poké Lids Map')
                }
              </h3>
              <p>
                {selectedPrefectureId === 'all'
                    ? (lang === 'cs' 
                    ? 'Prohlédněte si všech 47 prefektur Japonska. 42 aktivních prefektur má vlastní oficiální Poké Lids (482 poklopů). Kliknutím na prefekturu na mapě nebo v rychlém výběru níže otevřete její detail se všemi umístěnými poklopy.' 
                    : lang === 'ja' 
                    ? '日本全国47都道府県の境界を正確に表示。ポケふたが配備された42都道府県をクリックすると、設置位置をプロットした詳細マップが開きます。' 
                    : lang === 'ru' 
                    ? 'Все 47 префектур Японии. Нажмите на любую из 42 префектур с люками Poké Lids для перехода к подробной карте с точным расположением.' 
                    : 'Explore all 47 Japanese prefectures. Click any of the 42 official prefectures with Poké Lids to zoom into high-detail vector map with exact lid coordinates.')
                  : (lang === 'cs'
                    ? 'Všechny poklopy jsou umístěny na reálných GPS souřadnicích. Kliknutím na poklop na mapě otevřete jeho detail ve vysokém rozlišení nebo navigaci v Google Maps.'
                    : lang === 'ja'
                    ? 'すべてのポケふたが実際のGPS座標に正確に配置されています。ピンをクリックすると高解像度ビューが起動します。'
                    : lang === 'ru'
                    ? 'Все люки нанесены на карту по реальным координатам GPS. Нажмите на люк для детального просмотра и навигации.'
                    : 'All Poké Lids plotted at verified real-world GPS coordinates. Click any lid pin on the map to inspect in full resolution or navigate.')
                }
              </p>

              {/* Stats Bar */}
              <div className="map-stats-strip">
                <div className="map-stat-badge">
                  <span className="stat-num">{selectedPrefectureId === 'all' ? getAllPokelidsList().length : activeLidsList.length}</span>
                  <span className="stat-label">{lang === 'cs' ? 'Litinových poklopů' : lang === 'ja' ? '設置ポケふた' : lang === 'ru' ? 'Люков' : 'Poké Lids'}</span>
                </div>
                <div className="map-stat-badge">
                  <span className="stat-num">{selectedPrefectureId === 'all' ? POKELID_PREFECTURES.length : '1'}</span>
                  <span className="stat-label">{lang === 'cs' ? 'Aktivních prefektur' : lang === 'ja' ? '参加都道府県' : lang === 'ru' ? 'Префектур' : 'Prefectures'}</span>
                </div>
                {selectedPrefItem?.hasFullCoverage ? (
                  <div className="map-stat-badge highlight-stat">
                    <span className="stat-num">⭐ 100%</span>
                    <span className="stat-label">{lang === 'cs' ? 'Plné pokrytí obcí' : lang === 'ja' ? '市町村全域コンプ' : lang === 'ru' ? '100% Покрытие' : '100% Coverage'}</span>
                  </div>
                ) : (
                  <div className="map-stat-badge highlight-stat">
                    <span className="stat-num">⭐ 7</span>
                    <span className="stat-label">{lang === 'cs' ? '100% Pokrytí obcí' : lang === 'ja' ? '全域配備完了' : lang === 'ru' ? '100% Покрытие' : '100% Coverage'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Region Selector Pills (in National Map Mode) */}
            {selectedPrefectureId === 'all' ? (
              <div className="map-region-filter-pills">
                {pokelidFilterTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`map-region-pill ${pokelidFilter === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setPokelidFilter(tab.id as any);
                    }}
                  >
                    {tab.label[lang] || tab.label.en}
                  </button>
                ))}
              </div>
            ) : (
              /* Prefecture Detail Navigation Header */
              <div className="local-map-nav-header">
                <button
                  className="local-back-to-japan-btn"
                  onClick={() => setSelectedPrefectureId('all')}
                >
                  <ArrowLeft size={16} />
                  <span>{lang === 'cs' ? 'Zpět na celou mapu Japonska' : lang === 'ja' ? '全国マップに戻る' : lang === 'ru' ? 'Назад ко всей карте' : 'Back to Japan Map'}</span>
                </button>
                {selectedPrefItem && (
                  <div className="local-header-title-badge">
                    <img 
                      src={getPokemonIconUrl(selectedPrefItem.ambassadorPokemon)} 
                      alt={selectedPrefItem.ambassadorName[lang] || selectedPrefItem.ambassadorName.en}
                      className="local-ambassador-badge-avatar"
                      onError={(e) => handlePokemonImageError(e.currentTarget, selectedPrefItem.ambassadorPokemon)}
                    />
                    <span className="local-header-pref-name">{selectedPrefItem.prefecture[lang] || selectedPrefItem.prefecture.en}</span>
                    <span className="local-header-count-tag">{activeLidsList.length} {lang === 'cs' ? 'poklopů' : lang === 'ja' ? '枚' : lang === 'ru' ? 'люков' : 'lids'}</span>
                  </div>
                )}
              </div>
            )}

            {/* SVG Visual Map Container */}
            <div className="pokelid-svg-viewport">
              {selectedPrefectureId === 'all' ? (
                /* NATIONAL MAP: Accurate 47 Prefectures Boundaries */
                <svg viewBox="15 15 580 465" className="pokelid-japan-svg" preserveAspectRatio="xMidYMid meet">
                  {/* All 47 Japanese Prefectures */}
                  <g className="map-all-prefectures-layer">
                    {ALL_JAPAN_PREFECTURES_PATHS.map(pref => {
                      if (pref.id === 'okinawa') return null; // Rendered in dedicated inset box in top-left corner
                      const isPokelidPref = pref.hasPokelid;
                      const isHovered = hoveredPrefectureId === pref.id;
                      const prefName = pref.name[lang] || pref.name.en;
                      const isRegionActive = 
                        (pokelidFilter === 'hokkaido' && pref.id === 'hokkaido') ||
                        (pokelidFilter === 'tohoku' && ['iwate', 'miyagi', 'fukushima'].includes(pref.id)) ||
                        (pokelidFilter === 'chubu' && pref.id === 'fukui') ||
                        (pokelidFilter === 'kansai' && pref.id === 'mie') ||
                        (pokelidFilter === 'chugoku' && pref.id === 'tottori') ||
                        (pokelidFilter === 'shikoku' && ['kagawa', 'kochi'].includes(pref.id)) ||
                        (pokelidFilter === 'kyushu' && ['nagasaki', 'miyazaki', 'kagoshima'].includes(pref.id)) ||
                        (pokelidFilter === 'full-coverage' && ['miyagi', 'kagawa', 'tottori', 'miyazaki'].includes(pref.id));

                      return (
                        <path
                          key={pref.id}
                          d={pref.path}
                          className={`map-pref-path ${isPokelidPref ? 'has-pokelid' : 'subtle-prefecture'} ${isRegionActive ? 'region-highlighted' : ''} ${isHovered ? 'is-hovered' : ''}`}
                          onMouseEnter={() => {
                            if (isPokelidPref) setHoveredPrefectureId(pref.id);
                          }}
                          onMouseLeave={() => {
                            if (isPokelidPref) setHoveredPrefectureId(null);
                          }}
                          onClick={() => {
                            if (isPokelidPref) {
                              setSelectedPrefectureId(pref.id);
                              const el = document.getElementById('pokelid-gallery-anchor');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          style={{ cursor: isPokelidPref ? 'pointer' : 'default' }}
                        >
                          <title>{prefName}{isPokelidPref ? ` • ${pref.pokelidCount} Poké Lids (${lang === 'cs' ? 'Kliknutím zobrazit detail' : 'Click to view detail'})` : ''}</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Okinawa Inset Box (Moved to Top-Left Corner) */}
                  <g 
                    className={`map-okinawa-inset-group ${hoveredPrefectureId === 'okinawa' ? 'is-hovered' : ''}`}
                    onMouseEnter={() => setHoveredPrefectureId('okinawa')}
                    onMouseLeave={() => setHoveredPrefectureId(null)}
                    onClick={() => {
                      setSelectedPrefectureId('okinawa');
                      const el = document.getElementById('pokelid-gallery-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect x="24" y="24" width="120" height="92" rx="10" className="map-okinawa-box" />
                    <text x="32" y="40" className="map-inset-tag">OKINAWA / 沖縄</text>
                    <g 
                      transform="translate(28, 40) scale(0.15)" 
                    >
                      <path 
                        d={PREFECTURE_LOCAL_MAPS['okinawa']?.path} 
                        className={`map-pref-path has-pokelid okinawa-inset-path ${pokelidFilter === 'okinawa' ? 'region-highlighted' : ''} ${hoveredPrefectureId === 'okinawa' ? 'is-hovered' : ''}`} 
                      >
                        <title>Okinawa (17 Poké Lids)</title>
                      </path>
                    </g>
                  </g>

                  {/* Connecting rally routes */}
                  <path 
                    d="M 475,95 L 424,215 L 415,245 L 390,276 L 291,323 L 303,362 L 237,335 L 241,364 L 223,395 L 132,393 L 180,425 L 155,451" 
                    className="map-route-line" 
                  />
                  <path 
                    d="M 155,451 C 60,420 30,220 84,116" 
                    className="map-route-line map-route-okinawa-line" 
                  />

                  {/* Subtle location markers for Pokélid Prefectures (when not hovered) */}
                  {POKELID_MAP_PINS.map(pin => {
                    if (hoveredPrefectureId === pin.id) return null;
                    return (
                      <g 
                        key={`subtle-dot-${pin.id}`} 
                        transform={`translate(${pin.x}, ${pin.y})`}
                        className="map-subtle-dot-group"
                        style={{ pointerEvents: 'none' }}
                      >
                        <circle r="4" className="pin-subtle-dot-halo" />
                        <circle r="2.5" className="pin-subtle-dot-center" />
                      </g>
                    );
                  })}

                  {/* Regional Pokémon Pin: Revealed ONLY on hover over a specific prefecture */}
                  {hoveredPrefectureId && (() => {
                    const activePin = POKELID_MAP_PINS.find(p => p.id === hoveredPrefectureId);
                    if (!activePin) return null;
                    const labelText = activePin.label[lang] || activePin.label.en;
                    const prefData = POKELID_PREFECTURES.find(p => p.id === activePin.id);
                    const ambName = prefData ? (prefData.ambassadorName[lang] || prefData.ambassadorName.en) : activePin.pokemon;
                    const fullLabel = `${labelText} • ${ambName}`;

                    return (
                      <g 
                        key={`hovered-pin-${activePin.id}`} 
                        className="map-pin-group hovered"
                        transform={`translate(${activePin.x}, ${activePin.y})`}
                        style={{ pointerEvents: 'none' }}
                      >
                        <circle r="24" className="pin-pulse-ring" />
                        <circle r="18" className="pin-circle" />
                        <image 
                          href={getPokemonIconUrl(activePin.pokemon)} 
                          x="-15" 
                          y="-15" 
                          width="30" 
                          height="30" 
                          className="pin-pokemon-img"
                        />
                        {/* Label Badge */}
                        <g transform="translate(0, 26)">
                          <rect 
                            x={-fullLabel.length * 4.2 - 12} 
                            y="-9" 
                            width={fullLabel.length * 8.4 + 24} 
                            height="18" 
                            rx="9" 
                            className="pin-label-bg" 
                          />
                          <text textAnchor="middle" y="4" className="pin-label-text">
                            {fullLabel}
                          </text>
                        </g>
                        {/* Count Pill */}
                        <text textAnchor="middle" y="44" className="pin-count-text">
                          {activePin.count} 🕳️ {lang === 'cs' ? 'poklopů' : lang === 'ja' ? '枚' : lang === 'ru' ? 'люков' : 'lids'}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              ) : (
                /* LOCAL PREFECTURE DETAIL MAP WITH PLOTTED POKÉ LIDS */
                <div className="local-prefecture-map-wrapper">
                  {PREFECTURE_LOCAL_MAPS[selectedPrefectureId] && (
                    <svg viewBox="0 0 500 400" className="pokelid-local-prefecture-svg" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <clipPath id="localLidPinClip">
                          <circle cx="0" cy="0" r="14" />
                        </clipPath>
                        <filter id="localPinShadow" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
                        </filter>
                      </defs>

                      {/* Prefecture Boundary Polygon */}
                      <path 
                        d={PREFECTURE_LOCAL_MAPS[selectedPrefectureId].path} 
                        className="local-prefecture-boundary-path" 
                      />

                      {/* Plotted Poké Lids at Real GPS Positions (Covers only, names/numbers hidden until hover) */}
                      {activeLidsList.map((lid, idx) => {
                        const { x, y } = projectCoordinatesToLocalMap(lid.lat, lid.lng, PREFECTURE_LOCAL_MAPS[selectedPrefectureId]);
                        const isLidHovered = hoveredLocalLidId === lid.id;
                        const cityDisplay = lid.cityEn && lid.cityEn !== lid.city ? `${lid.city} (${lid.cityEn})` : lid.city;
                        return (
                          <g
                            key={lid.id}
                            className={`local-lid-pin-group ${isLidHovered ? 'is-hovered' : ''}`}
                            transform={`translate(${x}, ${y})`}
                            onMouseEnter={() => setHoveredLocalLidId(lid.id)}
                            onMouseLeave={() => setHoveredLocalLidId(null)}
                            onClick={() => {
                              openPokelidsInLightbox(activeLidsList, idx);
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label={`#${lid.descId} • ${cityDisplay}`}
                          >
                            <title>{`#${lid.descId} • ${cityDisplay} (GPS: ${lid.lat.toFixed(4)}, ${lid.lng.toFixed(4)})`}</title>

                            {/* Invisible Stable Hit-Test Target: Guarantees stable mouse interaction without jitter */}
                            <circle r="22" fill="transparent" stroke="none" className="local-lid-hit-target" />

                            {/* Visual Scaled Pin Container */}
                            <g className="local-lid-pin-visual" transform={isLidHovered ? 'scale(1.25)' : 'scale(1)'}>
                              {/* Halo / Base circle */}
                              <circle r="17" className="local-lid-pin-halo" />
                              <circle r="15" className="local-lid-pin-bg" />

                              {/* Circular Cover Thumbnail */}
                              <image
                                href={lid.smallImage}
                                x="-14"
                                y="-14"
                                width="28"
                                height="28"
                                clipPath="url(#localLidPinClip)"
                                className="local-lid-cover-image"
                              />
                            </g>
                          </g>
                        );
                      })}

                      {/* Topmost Floating Tooltip for Hovered Lid (Renders above all pins) */}
                      {hoveredLocalLidId && (() => {
                        const lid = activeLidsList.find(l => l.id === hoveredLocalLidId);
                        if (!lid) return null;
                        const { x, y } = projectCoordinatesToLocalMap(lid.lat, lid.lng, PREFECTURE_LOCAL_MAPS[selectedPrefectureId]);
                        const cityDisplay = lid.cityEn && lid.cityEn !== lid.city ? `${lid.city} (${lid.cityEn})` : lid.city;
                        return (
                          <g
                            className="local-lid-active-overlay"
                            transform={`translate(${x}, ${y})`}
                            style={{ pointerEvents: 'none' }}
                          >
                            {/* Active Glowing Ring */}
                            <circle r="20" className="local-lid-active-ring" />

                            {/* Prominent #ID Badge above Pin */}
                            <g transform="translate(0, -22)">
                              <rect
                                x={-String(lid.descId).length * 4.5 - 10}
                                y="-8"
                                width={String(lid.descId).length * 9 + 20}
                                height="16"
                                rx="8"
                                className="local-lid-id-rect"
                              />
                              <text textAnchor="middle" y="4" className="local-lid-id-text">
                                #{lid.descId}
                              </text>
                            </g>

                            {/* City Label Below */}
                            <g transform="translate(0, 26)">
                              <rect
                                x={-Math.min(cityDisplay.length * 4 + 10, 80)}
                                y="-8"
                                width={Math.min(cityDisplay.length * 8 + 20, 160)}
                                height="16"
                                rx="8"
                                className="local-lid-city-rect"
                              />
                              <text textAnchor="middle" y="4" className="local-lid-city-text">
                                {cityDisplay}
                              </text>
                            </g>
                          </g>
                        );
                      })()}
                    </svg>
                  )}
                </div>
              )}
            </div>

            {/* 13 Prefecture Quick Selector Chips */}
            <div className="map-prefecture-chips-strip">
              <span className="chips-title">{lang === 'cs' ? 'Rychlý výběr prefektury:' : lang === 'ja' ? '都道府県クイック選択：' : lang === 'ru' ? 'Быстрый выбор:' : 'Select Prefecture:'}</span>
              <div className="chips-container">
                <button
                  className={`pref-chip-btn ${selectedPrefectureId === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedPrefectureId('all')}
                >
                  <span>🗾 {lang === 'cs' ? 'Všechny (337)' : lang === 'ja' ? '全国（337）' : lang === 'ru' ? 'Все (337)' : 'All (337)'}</span>
                </button>
                {POKELID_PREFECTURES.map(pref => {
                  const isChipActive = selectedPrefectureId === pref.id;
                  return (
                    <button
                      key={pref.id}
                      className={`pref-chip-btn ${isChipActive ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredPrefectureId(pref.id)}
                      onMouseLeave={() => setHoveredPrefectureId(null)}
                      onClick={() => {
                        setSelectedPrefectureId(pref.id);
                        const el = document.getElementById('pokelid-gallery-anchor');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <img 
                        src={getPokemonIconUrl(pref.ambassadorPokemon)} 
                        alt={pref.ambassadorName[lang] || pref.ambassadorName.en}
                        className="pref-chip-avatar"
                        onError={(e) => handlePokemonImageError(e.currentTarget, pref.ambassadorPokemon)}
                      />
                      <span>{pref.prefecture[lang] || pref.prefecture.en}</span>
                      <span className="pref-chip-count">{pref.manholeCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Prefecture Showcase or All Prefectures Cards */}
          <div className="pokelid-grid">
            {filteredPokelids.map(item => (
              <div key={item.id} className={`pokelid-card ${selectedPrefectureId === item.id ? 'highlighted-prefecture' : ''}`}>
                <div className="pokelid-card-header">
                  <div className="pokelid-pref-title">
                    <h4>{item.prefecture[lang] || item.prefecture.en}</h4>
                    <span className="pokelid-region-badge">{item.region[lang] || item.region.en}</span>
                  </div>
                  {item.hasFullCoverage && (
                    <span className="pokelid-coverage-badge" title="100% municipal coverage">
                      ⭐ 100% {lang === 'cs' ? 'Pokrytí' : lang === 'ja' ? '全域配備' : lang === 'ru' ? 'Покрытие' : 'Coverage'}
                    </span>
                  )}
                </div>

                <div className="pokelid-ambassador-row">
                  <div className="pokelid-avatar-frame">
                    <img
                      src={getPokemonIconUrl(item.ambassadorPokemon)}
                      alt={item.ambassadorName[lang] || item.ambassadorName.en}
                      className="pokelid-avatar-img"
                      onError={(e) => handlePokemonImageError(e.currentTarget, item.ambassadorPokemon)}
                    />
                  </div>
                  <div className="pokelid-ambassador-info">
                    <span className="pokelid-amb-label">{lang === 'cs' ? 'Oficiální Ambasador' : lang === 'ja' ? '推しポケモン' : lang === 'ru' ? 'Амбассадор' : 'Official Ambassador'}</span>
                    <strong>{item.ambassadorName[lang] || item.ambassadorName.en}</strong>
                    <span className="pokelid-count-pill">{item.manholeCount} {lang === 'cs' ? 'poklopů Poké Lids' : lang === 'ja' ? '箇所のポケふた' : lang === 'ru' ? 'люков' : 'Poké Lids'}</span>
                  </div>
                </div>

                {/* Visual Card Artwork Showcase */}
                <div className="pokelid-visual-showcase">
                  {item.locationCardUrl && (
                    <div 
                      className="pokelid-card-frame" 
                      title={lang === 'cs' ? 'Kliknutím zvětšit herní pozadí' : 'Click to enlarge in-game card'}
                      onClick={() => setLightboxGallery({
                        items: [{
                          url: item.locationCardUrl!,
                          thumb: item.locationCardUrl!,
                          title: `${item.prefecture[lang] || item.prefecture.en} — ${lang === 'cs' ? 'Herní Lokační Pozadí' : 'In-game Location Background'}`,
                          subtitle: lang === 'cs' ? 'Odměna za 2 žlutá razítka' : 'Reward for 2 Yellow Stamps'
                        }],
                        currentIndex: 0
                      })}
                    >
                      <img 
                        src={item.locationCardUrl} 
                        alt={`${item.prefecture[lang] || item.prefecture.en} Location Background`} 
                        className="pokelid-card-img" 
                        loading="lazy" 
                      />
                      <span className="visual-badge card-badge">📱 {lang === 'cs' ? 'Herní pozadí' : 'Location Card'}</span>
                      <span className="visual-zoom-indicator"><ZoomIn size={12} /></span>
                    </div>
                  )}
                  {item.manholeImageUrl && (
                    <div 
                      className="pokelid-manhole-frame" 
                      title={lang === 'cs' ? 'Kliknutím zvětšit oficiální poklop' : 'Click to enlarge Poké Lid cover'}
                      onClick={() => {
                        const lids = getPokelidsByPrefecture(item.id);
                        if (lids.length > 0) {
                          openPokelidsInLightbox(lids, 0);
                        } else {
                          setLightboxGallery({
                            items: [{
                              url: item.manholeImageUrl!,
                              thumb: item.manholeImageUrl!,
                              title: `${item.prefecture[lang] || item.prefecture.en} — ${lang === 'cs' ? 'Oficiální Poklop Poké Lid' : 'Official Poké Lid Manhole Cover'}`,
                              subtitle: `${item.manholeCount} ${lang === 'cs' ? 'poklopů' : 'lids'}`
                            }],
                            currentIndex: 0
                          });
                        }
                      }}
                    >
                      <img 
                        src={item.manholeImageUrl} 
                        alt={`${item.prefecture[lang] || item.prefecture.en} Poké Lid`} 
                        className="pokelid-manhole-img" 
                        loading="lazy" 
                      />
                      <span className="visual-badge manhole-badge">🕳️ {lang === 'cs' ? 'Oficiální Poklop' : 'Poké Lid'}</span>
                      <span className="visual-zoom-indicator"><ZoomIn size={12} /></span>
                    </div>
                  )}
                </div>

                <p className="pokelid-rationale">
                  {item.culturalRationale[lang] || item.culturalRationale.en}
                </p>

                <div className="pokelid-bg-theme-row">
                  <span className="bg-theme-label">{lang === 'cs' ? 'Vzhled Lokačního pozadí:' : lang === 'ja' ? 'ロケーション背景テーマ：' : lang === 'ru' ? 'Тема фона локации:' : 'Location Card Motif:'}</span>
                  <p className="bg-theme-text">{item.backgroundTheme[lang] || item.backgroundTheme.en}</p>
                </div>

                <div className="pokelid-card-footer">
                  <button 
                    className="pokelid-view-lids-btn"
                    onClick={() => {
                      setSelectedPrefectureId(item.id);
                      const el = document.getElementById('pokelid-gallery-anchor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>🕳️ {lang === 'cs' ? `Zobrazit všech ${item.manholeCount} poklopů` : lang === 'ja' ? `全${item.manholeCount}枚のポケふたを見る` : lang === 'ru' ? `Смотреть все ${item.manholeCount} люков` : `View all ${item.manholeCount} Poké Lids`}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DEDICATED POKÉ LID EXPLORER GALLERY */}
          <div id="pokelid-gallery-anchor" className="pokelid-lids-explorer-section">
            <div className="explorer-header">
              <div className="explorer-header-left">
                <div className="explorer-badge">
                  <Sparkles size={14} />
                  <span>{lang === 'cs' ? 'Katalog všech poklopů' : lang === 'ja' ? 'ポケふた一覧図鑑' : lang === 'ru' ? 'Каталог люков' : 'Poké Lids Catalog'}</span>
                </div>
                <h3>
                  {selectedPrefItem 
                    ? `${selectedPrefItem.prefecture[lang] || selectedPrefItem.prefecture.en} — ${selectedPrefItem.manholeCount} ${lang === 'cs' ? 'originálních poklopů' : lang === 'ja' ? '枚のポケふた' : lang === 'ru' ? 'оригинальных люков' : 'Authentic Poké Lids'}`
                    : `${lang === 'cs' ? 'Všech 337 originálních poklopů Poké Lids' : lang === 'ja' ? '全国337枚のポケふた一覧' : lang === 'ru' ? 'Все 337 люков Poké Lids' : 'All 337 Japan Poké Lids'}`
                  }
                </h3>
                <p className="explorer-subtitle">
                  {lang === 'cs'
                    ? 'Kliknutím na kterýkoliv poklop otevřete detailní zobrazení ve vysokém rozlišení s možností plynulého listování šipkami (← / →) a spodním pásem miniatur.'
                    : lang === 'ja'
                    ? 'サムネイルをクリックすると高解像度ビューが開き、矢印キーや下のミニチュア一覧で快適にスライド閲覧できます。'
                    : lang === 'ru'
                    ? 'Нажмите на любой люк, чтобы открыть просмотр в высоком разрешении с перелистыванием стрелками и лентой миниатюр.'
                    : 'Click any Poké Lid thumbnail to open high-resolution modal with arrow key navigation (← / →) and thumbnail preview strip.'}
                </p>
              </div>

              {/* Action: Open Lightbox from beginning */}
              {filteredLids.length > 0 && (
                <button
                  className="explorer-fullscreen-btn"
                  onClick={() => openPokelidsInLightbox(filteredLids, 0)}
                >
                  <ZoomIn size={16} />
                  <span>{lang === 'cs' ? 'Prohlížet ve velkém (Spustit galerii)' : lang === 'ja' ? '大画面ギャラリーを起動' : lang === 'ru' ? 'Открыть галерею во весь экран' : 'Open Fullscreen Gallery'}</span>
                </button>
              )}
            </div>

            {/* Search within Municipality Lids */}
            <div className="explorer-search-bar">
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder={lang === 'cs' ? 'Hledat město nebo obec (např. Sendai, Betsukai, Naha)...' : lang === 'ja' ? '市区町村名で検索（例：仙台市、別海町、那覇市）...' : lang === 'ru' ? 'Поиск города или муниципалитета (напр. Sendai, Naha)...' : 'Search municipality (e.g. Sendai, Betsukai, Naha)...'}
                value={pokelidLidSearch}
                onChange={e => setPokelidLidSearch(e.target.value)}
              />
              {pokelidLidSearch && (
                <button className="clear-search-btn" onClick={() => setPokelidLidSearch('')}>
                  <X size={14} />
                </button>
              )}
              <span className="lids-count-tag">
                {filteredLids.length} {lang === 'cs' ? 'poklopů' : lang === 'ja' ? '枚' : lang === 'ru' ? 'люков' : 'lids'}
              </span>
            </div>

            {/* Poké Lids Grid */}
            {filteredLids.length === 0 ? (
              <div className="pokelid-empty-search">
                <p>{lang === 'cs' ? 'Žádné poklopy neodpovídají zadanému filtru.' : lang === 'ja' ? '該当するポケふたが見つかりませんでした。' : lang === 'ru' ? 'По вашему запросу ничего не найдено.' : 'No Poké Lids matched your search query.'}</p>
                <button className="reset-filter-btn" onClick={() => { setPokelidLidSearch(''); setSelectedPrefectureId('all'); setPokelidFilter('all'); }}>
                  {lang === 'cs' ? 'Zobrazit všechny poklopy' : lang === 'ja' ? '全ポケふたを表示' : lang === 'ru' ? 'Показать все' : 'Show All Poké Lids'}
                </button>
              </div>
            ) : (
              <div className="pokelid-lids-grid">
                {filteredLids.map((lid, idx) => {
                  const prefTitle = prefectureNameMap[lid.prefectureId] || lid.prefectureId;
                  const cityDisplay = lid.cityEn && lid.cityEn !== lid.city 
                    ? `${lid.city} (${lid.cityEn})` 
                    : lid.city;
                  return (
                    <div 
                      key={lid.id}
                      id={`pokelid-card-${lid.descId}`}
                      className={`pokelid-lid-item-card ${hoveredLocalLidId === lid.id ? 'is-hovered' : ''}`}
                      onMouseEnter={() => setHoveredLocalLidId(lid.id)}
                      onMouseLeave={() => setHoveredLocalLidId(null)}
                      onClick={() => openPokelidsInLightbox(filteredLids, idx)}
                      title={lang === 'cs' ? `Zvětšit: #${lid.descId} • ${cityDisplay} (${prefTitle})` : `Enlarge: #${lid.descId} • ${cityDisplay}`}
                    >
                      {/* Prominent Header with #ID Badge & Google Maps Navigation Link */}
                      <div className="lid-card-top-bar">
                        <div className="lid-card-id-pill">
                          <span className="lid-card-hash">#</span>
                          <span className="lid-card-id-number">{lid.descId}</span>
                        </div>
                        {lid.lat && lid.lng && (
                          <a
                            href={`https://maps.google.com/maps?q=${lid.lat},${lid.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lid-card-map-btn"
                            onClick={(e) => e.stopPropagation()}
                            title={lang === 'cs' ? 'Navigovat / Otevřít v Google Maps' : 'Open in Google Maps'}
                          >
                            <MapPin size={11} />
                            <span>Maps</span>
                          </a>
                        )}
                      </div>

                      <div className="lid-thumbnail-frame">
                        <img 
                          src={lid.smallImage} 
                          alt={cityDisplay}
                          className="lid-thumb-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="lid-item-info">
                        <strong className="lid-city-name">{cityDisplay}</strong>
                        <span className="lid-pref-tag">{prefTitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cross Link Banner to Special Backgrounds */}
          <div className="guide-crosslink-banner">
            <div className="crosslink-content">
              <Sparkles size={20} color="#aa3bff" />
              <div>
                <h4>{lang === 'cs' ? 'Zajímají vás globální Speciální pozadí a Lokační karty z celého světa?' : lang === 'ja' ? '世界各国のGO Festやウルトラホールのスペシャル背景もチェック！' : lang === 'ru' ? 'Интересуют глобальные фоны и карточки с GO Fest по всему миру?' : 'Explore Global Special Backgrounds & City Location Cards worldwide!'}</h4>
                <p>{lang === 'cs' ? 'Přečtěte si o kartách z Madridu, New Yorku, Ultra Space červích dírách a fúzích Necrozmy.' : 'Learn about Madrid, NYC, Ultra Space Wormholes, and Necrozma & Kyurem fusion mechanics.'}</p>
              </div>
            </div>
            <button 
              className="crosslink-btn"
              onClick={() => handleArticleClick('special-backgrounds-location-cards-guide')}
            >
              <span>{lang === 'cs' ? 'Otevřít Velký Průvodce Pozadími' : lang === 'ja' ? 'スペシャル背景ガイドを開く' : lang === 'ru' ? 'Открыть гайд по фонам' : 'Open Special Backgrounds Guide'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      );
};
