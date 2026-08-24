'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { translations, type Language } from '../data/translations';
import { API_BASE_URL } from '../config';
import { 
  Users, 
  Copy, 
  Check, 
  Plus, 
  QrCode, 
  X, 
  Search, 
  Send, 
  Swords, 
  Sparkles, 
  Gift, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Shield,
  ChevronRight
} from 'lucide-react';
import './FriendFinderView.css';

export interface FriendListing {
  id: string;
  trainerCode: string;
  trainerName: string;
  vivillonPattern: string;
  team: 'mystic' | 'valor' | 'instinct' | 'any';
  purpose: 'all' | 'vivillon' | 'raids' | 'xp' | 'trades';
  country?: string;
  note?: string;
  createdAt: number;
  expiresAt: number;
}

export const VIVILLON_PATTERNS = [
  { id: 'continental', name: { cs: 'Continental (Střední Evropa)', en: 'Continental (Central EU)', ja: 'たいりく（中欧）', ru: 'Continental' }, emoji: '🏰', rare: false },
  { id: 'sandstorm', name: { cs: 'Sandstorm (Blízký východ)', en: 'Sandstorm (Middle East)', ja: 'さじん（中東）', ru: 'Sandstorm' }, emoji: '🏜️', rare: true },
  { id: 'sun', name: { cs: 'Sun (Mexiko/Madagaskar)', en: 'Sun (Mexico/Madagascar)', ja: 'たいよう（メキシコ等）', ru: 'Sun' }, emoji: '☀️', rare: true },
  { id: 'ocean', name: { cs: 'Ocean (Havaj/Galapágy)', en: 'Ocean (Hawaii)', ja: 'オーシャン（ハワイ）', ru: 'Ocean' }, emoji: '🌊', rare: true },
  { id: 'tundra', name: { cs: 'Tundra (Island/Norsko)', en: 'Tundra (Iceland/Norway)', ja: 'つんどら（アイスランド）', ru: 'Tundra' }, emoji: '🏔️', rare: true },
  { id: 'icy-snow', name: { cs: 'Icy Snow (Grónsko/Finsko)', en: 'Icy Snow (Greenland)', ja: 'ひょうせつ（北欧）', ru: 'Icy Snow' }, emoji: '❄️', rare: true },
  { id: 'meadow', name: { cs: 'Meadow (Francie/Itálie)', en: 'Meadow (France/Italy)', ja: 'はなぞの（フランス）', ru: 'Meadow' }, emoji: '🌸', rare: false },
  { id: 'garden', name: { cs: 'Garden (Velká Británie/NZ)', en: 'Garden (UK/NZ)', ja: 'ていえん（イギリス）', ru: 'Garden' }, emoji: '🌿', rare: false },
  { id: 'marine', name: { cs: 'Marine (Španělsko/Řecko)', en: 'Marine (Spain/Greece)', ja: 'まりん（スペイン）', ru: 'Marine' }, emoji: '⛵', rare: false },
  { id: 'elegant', name: { cs: 'Elegant (Japonsko)', en: 'Elegant (Japan)', ja: 'みやび（日本）', ru: 'Elegant' }, emoji: '🗾', rare: false },
  { id: 'jungle', name: { cs: 'Jungle (Kolumbie/Singapur)', en: 'Jungle (Singapore/LatAm)', ja: 'ジャングル（熱帯）', ru: 'Jungle' }, emoji: '🌴', rare: false },
  { id: 'monsoon', name: { cs: 'Monsoon (Tchaj-wan/Hongkong)', en: 'Monsoon (Taiwan/HK)', ja: 'モンスーン（台湾等）', ru: 'Monsoon' }, emoji: '🌧️', rare: true },
  { id: 'savanna', name: { cs: 'Savanna (Brazílie)', en: 'Savanna (Brazil)', ja: 'サバンナ（ブラジル）', ru: 'Savanna' }, emoji: '🦒', rare: true },
  { id: 'archipelago', name: { cs: 'Archipelago (Karibik)', en: 'Archipelago (Caribbean)', ja: 'ぐんとう（カリブ）', ru: 'Archipelago' }, emoji: '🏝️', rare: true },
  { id: 'river', name: { cs: 'River (Austrálie/Egypt)', en: 'River (Australia/Egypt)', ja: 'たいが（豪州）', ru: 'River' }, emoji: '🐊', rare: false },
  { id: 'high-plains', name: { cs: 'High Plains (Západ USA)', en: 'High Plains (West US)', ja: 'こうや（米西部）', ru: 'High Plains' }, emoji: '🌾', rare: false },
  { id: 'modern', name: { cs: 'Modern (Jihovýchod USA)', en: 'Modern (Southeast US)', ja: 'モダン（米南部）', ru: 'Modern' }, emoji: '🏙️', rare: false },
  { id: 'polar', name: { cs: 'Polar (Kanada/Aljaška)', en: 'Polar (Canada/Alaska)', ja: 'せつげん（カナダ）', ru: 'Polar' }, emoji: '🧊', rare: false },
];

export const getVivillonSpriteUrl = (patternId: string): string => {
  const clean = patternId.toLowerCase().trim();
  return `https://img.pokemondb.net/sprites/home/normal/vivillon-${clean}.png`;
};

const FALLBACK_LISTINGS: FriendListing[] = [];

interface FriendFinderViewProps {
  lang: Language;
}

export const FriendFinderView: React.FC<FriendFinderViewProps> = ({ lang }) => {
  const t = translations[lang] || translations.en;

  const [listings, setListings] = useState<FriendListing[]>(FALLBACK_LISTINGS);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState<FriendListing | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedPurpose, setSelectedPurpose] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form State
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formPattern, setFormPattern] = useState('continental');
  const [formTeam, setFormTeam] = useState<'mystic' | 'valor' | 'instinct' | 'any'>('mystic');
  const [formPurpose, setFormPurpose] = useState<'all' | 'vivillon' | 'raids' | 'xp' | 'trades'>('vivillon');
  const [formCountry, setFormCountry] = useState('');
  const [formNote, setFormNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch from API
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/friends`);
        if (res.ok) {
          const data = await res.json();
          if (data.listings && Array.isArray(data.listings) && data.listings.length > 0) {
            setListings(data.listings);
          }
        }
      } catch (err) {
        console.warn('Could not load friends from API, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  // Format Trainer Code input as XXXX XXXX XXXX
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 12);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setFormCode(formatted);
  };

  const copyToClipboard = (listing: FriendListing) => {
    const plainCode = listing.trainerCode.replace(/\s/g, '');
    navigator.clipboard.writeText(plainCode);
    setCopiedId(listing.id);
    setToastMessage(`${listing.trainerName}: ${plainCode} ${t.friends_copied_toast}`);
    setTimeout(() => setCopiedId(null), 2500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const clean = formCode.replace(/\D/g, '');
    if (clean.length !== 12) {
      setFormError('Trainer code must be exactly 12 digits (e.g. 1234 5678 9012).');
      return;
    }
    if (!formName.trim()) {
      setFormError('Please enter your in-game Trainer Name.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/friends`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainerCode: formCode,
          trainerName: formName,
          vivillonPattern: formPattern,
          team: formTeam,
          purpose: formPurpose,
          country: formCountry,
          note: formNote
        })
      });

      const json = await res.json();
      if (res.ok && json.listing) {
        setListings(prev => [json.listing, ...prev]);
        setShowPostModal(false);
        setFormCode('');
        setFormName('');
        setFormNote('');
        setToastMessage(t.friends_copied_toast || 'Code published successfully!');
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        setFormError(json.error || 'Failed to submit code.');
      }
    } catch (err) {
      // Fallback local addition if offline
      const localListing: FriendListing = {
        id: `local-${Date.now()}`,
        trainerCode: formCode,
        trainerName: formName,
        vivillonPattern: formPattern,
        team: formTeam,
        purpose: formPurpose,
        country: formCountry,
        note: formNote,
        createdAt: Date.now(),
        expiresAt: 0
      };
      setListings(prev => [localListing, ...prev]);
      setShowPostModal(false);
      setToastMessage('Code added to your local list!');
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vivillon filter picker popup
  const [showPatternPicker, setShowPatternPicker] = useState(false);

  const selectedPatternData = selectedPattern !== 'all'
    ? VIVILLON_PATTERNS.find(p => p.id === selectedPattern)
    : null;

  // ... rest of component continues

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (selectedPattern !== 'all' && item.vivillonPattern.toLowerCase() !== selectedPattern.toLowerCase()) {
        return false;
      }
      if (selectedPurpose !== 'all' && item.purpose !== selectedPurpose && item.purpose !== 'all') {
        return false;
      }
      if (selectedTeam !== 'all' && item.team !== selectedTeam && item.team !== 'any') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.trainerName.toLowerCase().includes(q);
        const matchesCode = item.trainerCode.replace(/\s/g, '').includes(q.replace(/\s/g, ''));
        const matchesCountry = item.country?.toLowerCase().includes(q);
        const matchesNote = item.note?.toLowerCase().includes(q);
        const matchesPattern = item.vivillonPattern.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesCountry && !matchesNote && !matchesPattern) {
          return false;
        }
      }
      return true;
    });
  }, [listings, selectedPattern, selectedPurpose, selectedTeam, searchQuery]);

  const formatHoursAgo = (timestamp: number) => {
    const diffHours = Math.max(0, Math.floor((Date.now() - timestamp) / (1000 * 3600)));
    if (diffHours < 1) return t.friends_posted_just_now;
    return (t.friends_posted_hours_ago || '{h}h ago').replace('{h}', diffHours.toString());
  };

  const getTeamBadge = (team: string) => {
    switch (team) {
      case 'mystic':
        return <span className="team-badge mystic"><Shield size={12} /> Mystic</span>;
      case 'valor':
        return <span className="team-badge valor"><Flame size={12} /> Valor</span>;
      case 'instinct':
        return <span className="team-badge instinct"><Zap size={12} /> Instinct</span>;
      default:
        return null;
    }
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case 'vivillon': return <span className="purpose-pill vivillon"><Gift size={11} /> {t.friends_purpose_vivillon}</span>;
      case 'raids': return <span className="purpose-pill raids"><Swords size={11} /> {t.friends_purpose_raids}</span>;
      case 'xp': return <span className="purpose-pill xp"><Sparkles size={11} /> {t.friends_purpose_xp}</span>;
      case 'trades': return <span className="purpose-pill trades"><ShieldCheck size={11} /> {t.friends_purpose_trades}</span>;
      default: return null;
    }
  };

  return (
    <div className="friend-finder-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="friend-toast-alert animate-pop">
          <Check size={18} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="friend-header-card guides-header">
        <div className="friend-header-content">
          <div className="guides-title-badge">
            <Users size={14} />
            <span>COMMUNITY MATCHMAKER 2026</span>
          </div>
          <h1 className="friend-title">{t.friends_title}</h1>
          <p className="friend-subtitle">{t.friends_subtitle}</p>

          <div className="friend-actions-bar">
            <button 
              className="btn-share-code"
              onClick={() => setShowPostModal(true)}
            >
              <Plus size={18} />
              <span>{t.friends_share_btn}</span>
            </button>
            <div className="auto-expire-tag">
              <Clock size={13} />
              <span>{t.friends_auto_expire_notice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="friend-controls-panel">
        <div className="friend-search-row">
          <div className="friend-search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={t.friends_search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="friend-search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Purpose Tabs */}
          <div className="purpose-filter-tabs">
            {[
              { id: 'all', label: t.friends_purpose_all, icon: Users },
              { id: 'vivillon', label: t.friends_purpose_vivillon, icon: Gift },
              { id: 'raids', label: t.friends_purpose_raids, icon: Swords },
              { id: 'xp', label: t.friends_purpose_xp, icon: Sparkles },
            ].map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  className={`purpose-tab-btn ${selectedPurpose === p.id ? 'active' : ''}`}
                  onClick={() => setSelectedPurpose(p.id)}
                >
                  <Icon size={14} />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vivillon Pattern Picker Dropdown */}
        <div className="pattern-picker-wrapper">
          <button
            className={`pattern-picker-trigger ${selectedPattern !== 'all' ? 'has-selection' : ''}`}
            onClick={() => setShowPatternPicker(prev => !prev)}
            type="button"
          >
            {selectedPatternData ? (
              <>
                <img
                  src={getVivillonSpriteUrl(selectedPatternData.id)}
                  alt={selectedPatternData.id}
                  className="picker-trigger-sprite"
                  width={24}
                  height={24}
                />
                <span>{selectedPatternData.name[lang] || selectedPatternData.name.en}</span>
              </>
            ) : (
              <>
                <Globe size={16} />
                <span>{t.friends_filter_pattern_all}</span>
              </>
            )}
            <ChevronRight size={14} className={`picker-chevron ${showPatternPicker ? 'open' : ''}`} />
          </button>

          {selectedPattern !== 'all' && (
            <button
              className="pattern-picker-clear"
              onClick={() => { setSelectedPattern('all'); setShowPatternPicker(false); }}
              title="Clear filter"
              type="button"
            >
              <X size={14} />
            </button>
          )}

          {showPatternPicker && (
            <>
              <div className="pattern-picker-backdrop" onClick={() => setShowPatternPicker(false)} />
              <div className="pattern-picker-popover">
                <div className="picker-popover-header">
                  <span>{lang === 'cs' ? 'Vyberte vzor Vivillona' : lang === 'ja' ? 'ビビヨンの模様を選択' : lang === 'ru' ? 'Выберите узор Вивиллона' : 'Select Vivillon Pattern'}</span>
                  <button className="modal-close-btn" onClick={() => setShowPatternPicker(false)} type="button">
                    <X size={16} />
                  </button>
                </div>
                <div className="picker-popover-grid">
                  <button
                    className={`picker-popover-tile ${selectedPattern === 'all' ? 'selected' : ''}`}
                    onClick={() => { setSelectedPattern('all'); setShowPatternPicker(false); }}
                    type="button"
                  >
                    <Globe size={28} className="picker-all-icon" />
                    <span>{t.friends_filter_pattern_all}</span>
                  </button>
                  {VIVILLON_PATTERNS.map(pat => (
                    <button
                      key={pat.id}
                      className={`picker-popover-tile ${pat.rare ? 'rare' : ''} ${selectedPattern === pat.id ? 'selected' : ''}`}
                      onClick={() => { setSelectedPattern(pat.id); setShowPatternPicker(false); }}
                      type="button"
                    >
                      <img
                        src={getVivillonSpriteUrl(pat.id)}
                        alt={pat.id}
                        className="picker-tile-sprite"
                        loading="lazy"
                        width={40}
                        height={40}
                      />
                      <span>{pat.id.replace(/-/g, ' ')}</span>
                      {pat.rare && <span className="picker-tile-rare-dot" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="friend-cards-grid">
        {filteredListings.length === 0 ? (
          <div className="friend-empty-card">
            <Users size={48} className="empty-icon" />
            <h3>{t.friends_empty}</h3>
            <button className="btn-share-code" onClick={() => setShowPostModal(true)}>
              <Plus size={16} /> {t.friends_share_btn}
            </button>
          </div>
        ) : (
          filteredListings.map(listing => {
            const isCopied = copiedId === listing.id;
            const pat = VIVILLON_PATTERNS.find(p => p.id === listing.vivillonPattern);

            return (
              <div key={listing.id} className="friend-card animate-fade-in">
                <div className="card-top-row">
                  <div className="trainer-info">
                    <div className="trainer-name-row">
                      <span className="trainer-name">{listing.trainerName}</span>
                      {getTeamBadge(listing.team)}
                    </div>
                    {listing.country && (
                      <span className="trainer-location">
                        <Globe size={12} /> {listing.country}
                      </span>
                    )}
                  </div>
                  <span className="posted-time">
                    <Clock size={11} /> {formatHoursAgo(listing.createdAt)}
                  </span>
                </div>

                <div className="card-tags-row">
                  {pat && (
                    <span className={`pattern-badge ${pat.rare ? 'rare' : ''}`}>
                      <img 
                        src={getVivillonSpriteUrl(pat.id)} 
                        alt={pat.id} 
                        className="badge-vivillon-sprite" 
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                      {pat.name[lang] || pat.name.en}
                    </span>
                  )}
                  {getPurposeLabel(listing.purpose)}
                </div>

                {listing.note && (
                  <div className="trainer-note-box">
                    "{listing.note}"
                  </div>
                )}

                <div className="card-code-section">
                  <div className="trainer-code-display">
                    {listing.trainerCode}
                  </div>
                  <div className="card-buttons-row">
                    <button
                      className={`btn-copy-code ${isCopied ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(listing)}
                    >
                      {isCopied ? <Check size={16} /> : <Copy size={16} />}
                      <span>{isCopied ? t.friends_copied_toast : t.friends_copy_btn}</span>
                    </button>
                    <button
                      className="btn-qr-code"
                      title={t.friends_show_qr}
                      onClick={() => setShowQrModal(listing)}
                    >
                      <QrCode size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Post Trainer Code */}
      {showPostModal && (
        <div className="friend-modal-overlay animate-fade-in" onClick={() => setShowPostModal(false)}>
          <div className="friend-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-row">
                <Users size={20} className="modal-header-icon" />
                <h2>{t.friends_form_title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setShowPostModal(false)}>
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="form-error-banner">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="friend-submit-form">
              <div className="form-group">
                <label>{t.friends_form_code_label} *</label>
                <input
                  type="text"
                  required
                  placeholder="1234 5678 9012"
                  value={formCode}
                  onChange={handleCodeChange}
                  className="form-input code-input"
                  maxLength={14}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>{t.friends_form_name_label} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AshKetchum99"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="form-input"
                    maxLength={30}
                  />
                </div>

                <div className="form-group">
                  <label>{t.friends_form_team_label}</label>
                  <select
                    value={formTeam}
                    onChange={(e) => setFormTeam(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="mystic">Mystic (Blue)</option>
                    <option value="valor">Valor (Red)</option>
                    <option value="instinct">Instinct (Yellow)</option>
                    <option value="any">Any / Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t.friends_form_purpose_label}</label>
                <select
                  value={formPurpose}
                  onChange={(e) => setFormPurpose(e.target.value as any)}
                  className="form-select"
                >
                  <option value="vivillon">{t.friends_purpose_vivillon}</option>
                  <option value="raids">{t.friends_purpose_raids}</option>
                  <option value="xp">{t.friends_purpose_xp}</option>
                  <option value="trades">{t.friends_purpose_trades}</option>
                  <option value="all">{t.friends_purpose_all}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t.friends_form_pattern_label}</label>
                <div className="form-vivillon-picker-grid">
                  {VIVILLON_PATTERNS.map(pat => (
                    <button
                      key={pat.id}
                      type="button"
                      className={`vivillon-picker-tile ${formPattern === pat.id ? 'selected' : ''} ${pat.rare ? 'rare' : ''}`}
                      onClick={() => setFormPattern(pat.id)}
                      title={pat.name[lang] || pat.name.en}
                    >
                      <img
                        src={getVivillonSpriteUrl(pat.id)}
                        alt={pat.id}
                        className="picker-tile-sprite"
                        loading="lazy"
                        width={36}
                        height={36}
                      />
                      <span className="picker-tile-label">{pat.id.replace(/-/g, ' ')}</span>
                      {pat.rare && <span className="picker-tile-rare-dot" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>{t.friends_form_country_label}</label>
                <input
                  type="text"
                  placeholder="e.g. Prague, Czechia or Dubai, UAE"
                  value={formCountry}
                  onChange={(e) => setFormCountry(e.target.value)}
                  className="form-input"
                  maxLength={50}
                />
              </div>

              <div className="form-group">
                <label>{t.friends_form_note_label}</label>
                <input
                  type="text"
                  placeholder="e.g. Daily gifts & raid invites! Looking for Sandstorm."
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  className="form-input"
                  maxLength={120}
                />
              </div>

              <div className="form-actions-row">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowPostModal(false)}
                >
                  {t.friends_form_cancel_btn}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Posting...' : t.friends_form_submit_btn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: QR Code Scanner */}
      {showQrModal && (
        <div className="friend-modal-overlay animate-fade-in" onClick={() => setShowQrModal(null)}>
          <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-row">
                <QrCode size={20} className="modal-header-icon" />
                <h2>{t.friends_qr_title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setShowQrModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="qr-box-container">
              <div className="qr-code-canvas-wrapper">
                {/* SVG QR Code generation via standard QR API */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(showQrModal.trainerCode.replace(/\s/g, ''))}&bgcolor=ffffff&color=0f1015&margin=2`}
                  alt={`QR Code for ${showQrModal.trainerName}`}
                  className="qr-image"
                  width={220}
                  height={220}
                />
              </div>
              <div className="qr-trainer-name">{showQrModal.trainerName}</div>
              <div className="qr-code-number">{showQrModal.trainerCode}</div>
              <p className="qr-instructions">{t.friends_qr_desc}</p>

              <button
                className="btn-copy-code-qr"
                onClick={() => copyToClipboard(showQrModal)}
              >
                <Copy size={16} /> {t.friends_copy_btn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
