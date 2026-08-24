import { useRef, useState, RefObject } from 'react';
import { toPng } from 'html-to-image';
import { getFontEmbedCSS, disableTextClipping } from '../utils/exportPoster';
import { fetchImageAsBase64 } from '../utils/imageResolver';

export interface UseInfographicExportResult {
  /** Ref to attach to the poster container div */
  posterRef: RefObject<HTMLDivElement>;
  /** Whether export is currently in progress */
  isExporting: boolean;
  /** Whether the last export succeeded (resets after 2s) */
  exportSuccess: boolean;
  /** Call this to trigger the PNG export + download */
  exportAsPng: (filename: string) => Promise<void>;
}

export function useInfographicExport(): UseInfographicExportResult {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const exportAsPng = async (filename: string) => {
    if (!posterRef.current || isExporting) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 120));
    if (!posterRef.current) {
      setIsExporting(false);
      return;
    }

    const posterNode = posterRef.current;
    posterNode.classList.add('is-exporting');

    const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];
    let restoreClipping: (() => void) | null = null;

    try {
      const imgs = Array.from(posterNode.querySelectorAll('img'));

      await Promise.all(
        imgs.map(async (img) => {
          const origSrc = img.src;
          if (origSrc && !origSrc.startsWith('data:')) {
            originalSrcs.push({ img, origSrc });
            try {
              const base64 = await fetchImageAsBase64(origSrc, img);
              if (base64 && base64.startsWith('data:')) {
                img.src = base64;
              } else {
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
              }
            } catch {
              img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
          }
        })
      );

      if (typeof document !== 'undefined' && (document as any).fonts) {
        await (document as any).fonts.ready;
      }
      if (!posterRef.current) return;

      restoreClipping = disableTextClipping(posterNode);
      const fontEmbedCSS = await getFontEmbedCSS();
      
      const rect = posterNode.getBoundingClientRect();
      const w = Math.round(rect.width) || posterNode.offsetWidth || 480;
      const h = Math.round(w * 1.25);

      const dataUrl = await toPng(posterNode, { 
        cacheBust: false,
        skipFonts: !fontEmbedCSS,
        fontEmbedCSS: fontEmbedCSS || undefined,
        width: w,
        height: h,
        canvasWidth: 1080,
        canvasHeight: 1350,
        pixelRatio: 1080 / w,
        backgroundColor: '#0d1117',
        filter: (domNode) => {
          if (domNode instanceof HTMLElement) {
            if (
              domNode.classList.contains('edit-toolbar') ||
              domNode.classList.contains('editable-image-overlay') ||
              domNode.classList.contains('editable-text-icon') ||
              domNode.classList.contains('image-edit-overlay') ||
              domNode.classList.contains('editable-image-badge') ||
              domNode.classList.contains('pokemon-picker-modal')
            ) {
              return false;
            }
          }
          return true;
        },
        style: {
          width: `${w}px`,
          height: `${h}px`,
          maxWidth: `${w}px`,
          minWidth: `${w}px`,
          fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          margin: '0',
          transform: 'none',
        }
      });

      const link = document.createElement('a');
      link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 500);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      posterNode.classList.remove('is-exporting');
      originalSrcs.forEach(({ img, origSrc }) => {
        img.src = origSrc;
      });
      if (restoreClipping) {
        restoreClipping();
      }
      setIsExporting(false);
    }
  };

  return { posterRef, isExporting, exportSuccess, exportAsPng };
}
