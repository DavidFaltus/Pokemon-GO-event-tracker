import React, { useEffect } from 'react';

interface AdContainerProps {
  type: 'banner' | 'sidebar' | 'rectangle' | 'inline';
  slot?: string;
  client?: string;
  lang?: 'cs' | 'en' | 'ja' | 'ru';
}

const ENABLE_ADS = false; // Set to true when AdSense is approved and ready

export const AdContainer: React.FC<AdContainerProps> = ({ 
  type, 
  slot, 
  client = "ca-pub-8800056915088711", // User AdSense Client ID
  lang = 'cs' 
}) => {
  if (!ENABLE_ADS) return null;

  const adRef = React.useRef<HTMLModElement>(null);

  useEffect(() => {
    // Attempt to load Google AdSense ads if script is present and element not filled yet
    if (slot && typeof window !== 'undefined' && adRef.current) {
      const status = adRef.current.getAttribute('data-adsbygoogle-status');
      if (!status) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          // Ignore duplicate push in dev mode
        }
      }
    }
  }, [slot]);

  const isCzech = lang === 'cs';
  const isJapanese = lang === 'ja';
  
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
    if (type === 'banner') {
      if (isJapanese) return '広告 (728x90 リーダーボード)';
      return isCzech ? 'Reklama (728x90 Leaderboard)' : 'Advertisement (728x90 Leaderboard)';
    }
    if (type === 'sidebar') {
      if (isJapanese) return '広告 (300x600 スカイスクレイパー)';
      return isCzech ? 'Reklama (300x600 Skyscraper)' : 'Advertisement (300x600 Skyscraper)';
    }
    if (type === 'rectangle') {
      if (isJapanese) return '広告 (300x250 レクタングル)';
      return isCzech ? 'Reklama (300x250 Rectangle)' : 'Advertisement (300x250 Rectangle)';
    }
    if (isJapanese) return '広告 (レスポンシブ フィード広告)';
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
          {isJapanese ? 'スポンサー提供' : isCzech ? 'Sponzorovaný obsah' : 'Sponsored Content'}
        </span>
        <ins 
          ref={adRef}
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

  // If no slot is provided, return null to avoid showing 'under construction' developer messages to bots or users
  return null;
};

