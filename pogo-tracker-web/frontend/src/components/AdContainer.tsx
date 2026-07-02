import React, { useEffect } from 'react';

interface AdContainerProps {
  type: 'banner' | 'sidebar' | 'rectangle' | 'inline';
  slot?: string;
  client?: string;
  lang?: 'cs' | 'en';
}

export const AdContainer: React.FC<AdContainerProps> = ({ 
  type, 
  slot, 
  client = "ca-pub-8800056915088711", // User AdSense Client ID
  lang = 'cs' 
}) => {
  useEffect(() => {
    // Attempt to load Google AdSense ads if script is present
    if (slot && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.warn("Google AdSense initialization skipped or failed:", e);
      }
    }
  }, [slot]);

  const isCzech = lang === 'cs';
  
  // Dimensions based on type
  const getAdStyles = () => {
    switch (type) {
      case 'banner':
        return {
          minHeight: '90px',
          width: '100%',
          maxWidth: '728px',
          margin: '16px auto',
        };
      case 'sidebar':
        return {
          minHeight: '600px',
          width: '300px',
          margin: '0 auto',
        };
      case 'rectangle':
        return {
          minHeight: '250px',
          width: '300px',
          margin: '0 auto',
        };
      case 'inline':
        return {
          minHeight: '120px',
          width: '100%',
          margin: '16px 0',
        };
      default:
        return {};
    }
  };

  const getAdLabel = () => {
    if (type === 'banner') return isCzech ? 'Reklama (728x90 Leaderboard)' : 'Advertisement (728x90 Leaderboard)';
    if (type === 'sidebar') return isCzech ? 'Reklama (300x600 Skyscraper)' : 'Advertisement (300x600 Skyscraper)';
    if (type === 'rectangle') return isCzech ? 'Reklama (300x250 Rectangle)' : 'Advertisement (300x250 Rectangle)';
    return isCzech ? 'Reklama (Responzivní Feed ad)' : 'Advertisement (Responsive Feed ad)';
  };

  // If a slot is provided, render the actual AdSense code structure
  if (slot) {
    return (
      <div 
        className={`ad-wrapper ad-${type}`} 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getAdStyles()
        }}
      >
        <span className="ad-label" style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {isCzech ? 'Sponzorovaný obsah' : 'Sponsored Content'}
        </span>
        <ins 
          className="adsbygoogle"
          style={{ 
            display: 'block', 
            width: '100%',
            height: '100%',
            minHeight: type === 'sidebar' ? '600px' : type === 'rectangle' ? '250px' : type === 'banner' ? '90px' : 'auto'
          }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Otherwise, render a beautifully styled mock placeholder ad
  return (
    <div 
      className={`ad-wrapper ad-mock ad-${type}`} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(23, 25, 33, 0.4)',
        border: '1px dashed var(--border-color)',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...getAdStyles()
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(170, 59, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      
      <span style={{
        fontSize: '10px',
        fontWeight: 'bold',
        color: 'var(--accent-color)',
        border: '1px solid rgba(170, 59, 255, 0.3)',
        borderRadius: '4px',
        padding: '2px 6px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '12px'
      }}>
        {isCzech ? 'Reklamní Prostor' : 'Ad Space'}
      </span>
      
      <p style={{
        fontSize: '13px',
        fontWeight: '600',
        color: 'var(--text-secondary)',
        marginBottom: '4px'
      }}>
        {getAdLabel()}
      </p>
      
      <p style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        maxWidth: '240px',
        lineHeight: '1.4'
      }}>
        {isCzech 
          ? 'Pro nasazení AdSense vložte do komponenty parametr `slot="VASE_SLOT_ID"` a upravte client ID.'
          : 'To use AdSense, pass `slot="YOUR_SLOT_ID"` and update the client ID.'
        }
      </p>
    </div>
  );
};
