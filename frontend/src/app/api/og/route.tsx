import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Pokémon GO Event Tracker';
    const image = searchParams.get('image');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f1015',
            backgroundImage: 'radial-gradient(circle at center, rgba(170, 59, 255, 0.2) 0%, transparent 70%)',
            color: '#f8fafc',
            fontFamily: 'sans-serif',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          {image && (
            <img
              src={image}
              alt={title}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '24px',
                marginBottom: '24px',
                objectFit: 'cover',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              }}
            />
          )}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #aa3bff 0%, #7e22ce 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '16px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, color: '#94a3b8' }}>
            Pokémon GO Event Tracker • pogoevents.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
