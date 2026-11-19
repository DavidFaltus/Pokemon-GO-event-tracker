'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getSilhouetteZoomScale } from '../utils/pokedleEngine';

interface PokedleSilhouetteCanvasProps {
  dexId: number;
  slug: string;
  wrongGuesses: number;
  revealed: boolean;
  isLightMode?: boolean;
}

/**
 * Renders a Pokémon silhouette onto an HTML5 <canvas> using pixel compositing
 * (`globalCompositeOperation = 'source-in'`). Because the artwork URL is never
 * placed in a DOM <img> tag before reveal, players cannot peek at the Pokédex ID
 * via Inspect Element.
 */
export const PokedleSilhouetteCanvas: React.FC<PokedleSilhouetteCanvasProps> = ({
  dexId,
  slug,
  wrongGuesses,
  revealed,
  isLightMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadedImage(null);

    const urls = [
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexId}.png`,
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${dexId}.png`,
      `https://img.pokemondb.net/sprites/home/normal/${slug.toLowerCase().replace(/[^a-z0-9-]/g, '')}.png`,
    ];

    const tryLoad = (idx: number) => {
      if (cancelled || idx >= urls.length) {
        if (!cancelled) setLoading(false);
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!cancelled) {
          setLoadedImage(img);
          setLoading(false);
        }
      };
      img.onerror = () => {
        tryLoad(idx + 1);
      };
      img.src = urls[idx];
    };

    tryLoad(0);
    return () => {
      cancelled = true;
    };
  }, [dexId, slug]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 280;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const zoom = getSilhouetteZoomScale(wrongGuesses, revealed);
    const basePad = 24;
    const baseDim = size - basePad * 2;
    const drawSize = baseDim * zoom;
    const offset = (size - drawSize) / 2;

    if (revealed) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(loadedImage, offset, offset, drawSize, drawSize);
    } else {
      // Draw image first, then fill opaque pixels with silhouette tone
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(loadedImage, offset, offset, drawSize, drawSize);
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = isLightMode ? '#0f172a' : '#020617';
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'source-over';
    }
  }, [loadedImage, wrongGuesses, revealed, isLightMode]);

  return (
    <div className={`pokedle-silhouette-stage ${revealed ? 'revealed' : ''}`}>
      {loading && <div className="pokedle-silhouette-loader" aria-label="Loading silhouette" />}
      <canvas
        ref={canvasRef}
        className="pokedle-silhouette-canvas"
        width={280}
        height={280}
        role="img"
        aria-label={revealed ? 'Revealed Pokémon' : 'Mystery Pokémon silhouette'}
      />
    </div>
  );
};
