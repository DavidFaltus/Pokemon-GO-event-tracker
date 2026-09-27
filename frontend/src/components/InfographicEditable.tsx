import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Eye, RotateCcw, Camera, Upload, Search, Link, X, Check, Sparkles } from 'lucide-react';
import { getPokemonIconUrl } from '../utils/imageResolver';
import { Language } from '../data/translations';
import { THEMATIC_BACKGROUNDS } from '../utils/thematicBackgroundResolver';
import './InfographicEditable.css';

export const EditableText = ({
  value,
  onChange,
  isEditing,
  className = '',
  style = {},
  as: Component = 'span',
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: any;
  multiline?: boolean;
}) => {
  const [isInputting, setIsInputting] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isInputting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputting]);

  const handleBlur = () => {
    setIsInputting(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setIsInputting(false);
      setTempValue(value);
    }
  };

  if (!isEditing) {
    return <Component className={className} style={style}>{value}</Component>;
  }

  if (isInputting) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`editable-text-input ${className}`}
          style={style}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`editable-text-input ${className}`}
        style={style}
      />
    );
  }

  return (
    <Component 
      className={`editable-text editing ${className}`} 
      style={style}
      onClick={() => setIsInputting(true)}
    >
      {value}
      <Pencil className="editable-text-icon" size={14} />
    </Component>
  );
};

export const PokemonImagePicker = ({
  isOpen,
  onClose,
  onSelect,
  currentUrl,
  initialPokemonName = ''
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentUrl: string;
  initialPokemonName?: string;
}) => {
  const [tab, setTab] = useState<'search' | 'url' | 'upload'>('search');
  const [searchName, setSearchName] = useState(initialPokemonName);
  const [isShiny, setIsShiny] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentUrl);

  useEffect(() => {
    if (tab === 'search') {
      if (searchName) {
        setPreviewUrl(`https://img.pokemondb.net/sprites/home/${isShiny ? 'shiny' : 'normal'}/${searchName.toLowerCase()}.png`);
      }
    } else if (tab === 'url') {
      setPreviewUrl(customUrl || currentUrl);
    }
  }, [tab, searchName, isShiny, customUrl, currentUrl]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pokemon-picker-modal">
      <div className="pokemon-picker-content">
        <div className="pokemon-picker-header">
          <h3>Edit Image</h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>
        
        <div className="pokemon-picker-tabs">
          <button className={tab === 'search' ? 'active' : ''} onClick={() => setTab('search')}><Search size={16}/> Search</button>
          <button className={tab === 'url' ? 'active' : ''} onClick={() => setTab('url')}><Link size={16}/> URL</button>
          <button className={tab === 'upload' ? 'active' : ''} onClick={() => setTab('upload')}><Upload size={16}/> Upload</button>
        </div>

        <div className="pokemon-picker-body">
          <div className="pokemon-picker-preview">
            <img src={previewUrl} alt="Preview" onError={(e) => { (e.target as HTMLImageElement).src = currentUrl; }} />
          </div>

          <div className="pokemon-picker-controls">
            {tab === 'search' && (
              <>
                <input 
                  type="text" 
                  value={searchName} 
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Pokemon name (e.g. pikachu)"
                  className="pokemon-picker-search-input"
                />
                <label className="pokemon-picker-shiny-toggle">
                  <input type="checkbox" checked={isShiny} onChange={(e) => setIsShiny(e.target.checked)} />
                  <Sparkles size={16} /> Shiny
                </label>
              </>
            )}
            
            {tab === 'url' && (
              <input 
                type="text" 
                value={customUrl} 
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://..."
                className="pokemon-picker-search-input"
              />
            )}

            {tab === 'upload' && (
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                className="pokemon-picker-file-input"
              />
            )}
          </div>
        </div>

        <div className="pokemon-picker-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-apply" onClick={() => onSelect(previewUrl)}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export const EditableImage = ({
  src,
  alt,
  onChange,
  isEditing,
  className = '',
  style = {},
  onError,
  pokemonName
}: {
  src: string;
  alt: string;
  onChange: (v: string) => void;
  isEditing: boolean;
  className?: string;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  pokemonName?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isEditing) {
    return <img src={src} alt={alt} className={className} style={style} onError={onError} />;
  }

  return (
    <>
      <div className={`editable-image-wrapper ${className}`} style={style}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: style.objectFit || 'contain' }} onError={onError} />
        <div className="editable-image-overlay" onClick={() => setIsModalOpen(true)}>
          <Camera size={24} />
        </div>
      </div>
      {isModalOpen && (
        <PokemonImagePicker
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={(url) => {
            onChange(url);
            setIsModalOpen(false);
          }}
          currentUrl={src}
          initialPokemonName={pokemonName}
        />
      )}
    </>
  );
};

export const BackgroundPickerModal = ({
  isOpen,
  onClose,
  onSelect,
  currentUrl
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string | undefined) => void;
  currentUrl?: string;
}) => {
  const [customUrl, setCustomUrl] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="pokemon-picker-modal" onClick={onClose}>
      <div className="pokemon-picker-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div className="pokemon-picker-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#38bdf8" />
            <h3 style={{ margin: 0 }}>Vyber pozadí infografiky / Select Background</h3>
          </div>
          <button className="btn-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="pokemon-picker-body">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <button
              type="button"
              className={`picker-tab ${!currentUrl ? 'active' : ''}`}
              onClick={() => { onSelect(undefined); onClose(); }}
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }}
            >
              🔄 Automatické / Auto-detect
            </button>
            <button
              type="button"
              className={`picker-tab ${currentUrl === 'none' ? 'active' : ''}`}
              onClick={() => { onSelect('none'); onClose(); }}
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem' }}
            >
              ⬛ Pouze čistý gradient / Pure Dark
            </button>
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
            Sezónní a tématická pozadí (Season & Event Backgrounds):
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '8px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {THEMATIC_BACKGROUNDS.map((bg) => {
              const isSelected = currentUrl === bg.url;
              return (
                <div
                  key={bg.id}
                  onClick={() => { onSelect(bg.url); onClose(); }}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.12)',
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.4)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  title={bg.name}
                >
                  <img
                    src={bg.url}
                    alt={bg.name}
                    style={{ width: '100%', height: '80px', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <div style={{
                    padding: '4px 6px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    background: 'rgba(13,17,23,0.9)',
                    color: isSelected ? '#38bdf8' : '#e2e8f0'
                  }}>
                    {bg.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>
              Vlastní URL obrázku (Custom URL):
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="https://... nebo /backgrounds/..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  color: '#fff',
                  fontSize: '0.8rem'
                }}
              />
              <button
                type="button"
                className="btn-apply"
                onClick={() => {
                  if (customUrl.trim()) {
                    onSelect(customUrl.trim());
                    onClose();
                  }
                }}
                disabled={!customUrl.trim()}
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Použít
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditToolbar = ({
  isEditing,
  onToggleEdit,
  hasOverrides,
  onReset,
  lang,
  currentBackground,
  onSelectBackground
}: {
  isEditing: boolean;
  onToggleEdit: () => void;
  hasOverrides: boolean;
  onReset: () => void;
  lang: Language;
  currentBackground?: string;
  onSelectBackground?: (bg: string | undefined) => void;
}) => {
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  return (
    <>
      <div className="edit-toolbar">
        <button 
          className={`edit-toolbar-btn ${isEditing ? 'active' : ''}`}
          onClick={onToggleEdit}
          title={isEditing ? "Preview Mode" : "Edit Mode"}
        >
          {isEditing ? <Eye size={16} /> : <Pencil size={16} />}
          {isEditing ? " Preview" : " Edit"}
        </button>

        {isEditing && onSelectBackground && (
          <button
            className="edit-toolbar-btn bg-picker-btn"
            onClick={() => setIsBgModalOpen(true)}
            title="Změnit pozadí / Change Background"
          >
            <Sparkles size={15} />
            <span>Pozadí</span>
          </button>
        )}
        
        {hasOverrides && (
          <button 
            className="edit-toolbar-btn reset-btn"
            onClick={onReset}
            title="Reset all changes"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>

      {isBgModalOpen && onSelectBackground && (
        <BackgroundPickerModal
          isOpen={isBgModalOpen}
          onClose={() => setIsBgModalOpen(false)}
          onSelect={onSelectBackground}
          currentUrl={currentBackground}
        />
      )}
    </>
  );
};
