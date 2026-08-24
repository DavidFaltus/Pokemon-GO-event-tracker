import { toPng } from 'html-to-image';
import { fetchImageAsBase64 } from './imageResolver';

let cachedFontCss: string | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  return typeof window !== 'undefined' ? window.btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
}

/**
 * Fetches and caches the Google Fonts @font-face CSS for Outfit & Inter
 * with all font binaries inlined as Base64 data URIs so they can be
 * successfully rendered inside SVG foreignObject exports without network sandbox errors.
 */
export async function getFontEmbedCSS(): Promise<string> {
  if (cachedFontCss) return cachedFontCss;
  try {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap';
    const res = await fetch(fontUrl, { cache: 'force-cache' });
    if (!res.ok) return '';
    let cssText = await res.text();

    // Find all external font URLs: e.g. url(https://fonts.gstatic.com/s/outfit/v11/...)
    const matches = Array.from(cssText.matchAll(/url\((https:\/\/[^)]+)\)/g));

    if (matches.length > 0) {
      const inlinedReplacements = await Promise.all(
        matches.map(async ([fullMatch, url]) => {
          try {
            const fontRes = await fetch(url, { cache: 'force-cache' });
            if (!fontRes.ok) return { fullMatch, dataUrl: fullMatch };
            const buffer = await fontRes.arrayBuffer();
            const base64 = arrayBufferToBase64(buffer);
            const mime = url.includes('.woff2')
              ? 'font/woff2'
              : url.includes('.woff')
              ? 'font/woff'
              : 'font/truetype';
            return { fullMatch, dataUrl: `url(data:${mime};base64,${base64})` };
          } catch {
            return { fullMatch, dataUrl: fullMatch };
          }
        })
      );

      for (const { fullMatch, dataUrl } of inlinedReplacements) {
        cssText = cssText.split(fullMatch).join(dataUrl);
      }
    }

    cachedFontCss = cssText;
    return cachedFontCss;
  } catch (e) {
    console.warn('Could not fetch and inline font CSS for export embedding:', e);
  }
  return '';
}

/**
 * Disables overflow clipping and text-overflow ellipsis on all elements
 * inside a poster node before export. html-to-image clones the DOM and
 * reads getComputedStyle() which includes inline styles, so we must set
 * them directly on the elements rather than relying on CSS class changes.
 * Returns a restore function to undo the changes after export.
 */
export function disableTextClipping(node: HTMLElement): () => void {
  const saved: { el: HTMLElement; overflow: string; textOverflow: string }[] = [];
  const textElements = Array.from(node.querySelectorAll<HTMLElement>('span, p, h1, h2, h3, h4, h5, h6, strong, em, .editable-text-wrapper, .editable-text-content'));
  for (const el of textElements) {
    const cs = getComputedStyle(el);
    if (cs.textOverflow === 'ellipsis' || cs.overflow === 'hidden') {
      // Only apply to elements without children or with only inline children
      if (el.children.length <= 1) {
        saved.push({
          el,
          overflow: el.style.overflow,
          textOverflow: el.style.textOverflow,
        });
        el.style.overflow = 'visible';
        el.style.textOverflow = 'unset';
      }
    }
  }
  return () => {
    for (const { el, overflow, textOverflow } of saved) {
      el.style.overflow = overflow;
      el.style.textOverflow = textOverflow;
    }
  };
}

export interface ExportPosterOptions {
  fileName: string;
  pixelRatio?: number;
  targetWidth?: number;
  backgroundColor?: string;
  onBeforeExport?: () => Promise<void> | void;
  onAfterExport?: () => Promise<void> | void;
}

/**
 * High-fidelity 1:1 DOM element exporter to PNG.
 * Preserves exact on-screen font sizes, letter spacing, layout geometry, and images.
 */
export async function exportPosterToPng(
  node: HTMLElement,
  options: ExportPosterOptions
): Promise<string | null> {
  if (!node) return null;

  if (options.onBeforeExport) {
    await options.onBeforeExport();
  }

  // Small delay to ensure DOM and editor state are stabilized
  await new Promise((r) => setTimeout(r, 100));

  node.classList.add('is-exporting');
  const originalSrcs: { img: HTMLImageElement; origSrc: string }[] = [];

  try {
    // 1. Convert all nested images to base64 so SVG canvas never fails with tainted canvas
    const imgs = Array.from(node.querySelectorAll('img'));
    await Promise.all(
      imgs.map(async (img) => {
        const origSrc = img.src;
        if (origSrc && !origSrc.startsWith('data:')) {
          originalSrcs.push({ img, origSrc });
          try {
            const base64 = await fetchImageAsBase64(origSrc, img);
            if (base64 && base64.startsWith('data:')) {
              img.src = base64;
            }
          } catch {
            // Keep original or fallback if fetch fails
          }
        }
      })
    );

    // 2. Wait for document fonts to be ready
    if (typeof document !== 'undefined' && (document as any).fonts) {
      try {
        await (document as any).fonts.ready;
      } catch {}
    }

    // 3. Get exact pixel dimensions and compute 4:5 aspect ratio
    const rect = node.getBoundingClientRect();
    const width = Math.round(rect.width) || node.offsetWidth || 480;
    const height = Math.round(width * 1.25); // Strict 4:5 height calculation

    // Target Instagram standard 1080x1350 resolution
    const targetWidth = options.targetWidth || 1080;
    const targetHeight = Math.round(targetWidth * 1.25);
    const pixelRatio = targetWidth / width;

    // 4. Fetch font CSS for embedding
    const fontEmbedCSS = await getFontEmbedCSS();

    // 5. Generate PNG via html-to-image with explicit 4:5 width/height and font embedding
    const dataUrl = await toPng(node, {
      cacheBust: false,
      skipFonts: !fontEmbedCSS,
      fontEmbedCSS: fontEmbedCSS || undefined,
      width,
      height,
      canvasWidth: targetWidth,
      canvasHeight: targetHeight,
      pixelRatio,
      backgroundColor: options.backgroundColor || '#090d16',
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
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: `${width}px`,
        minWidth: `${width}px`,
        fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        margin: '0',
        transform: 'none',
      },
    });

    // 6. Trigger download
    const link = document.createElement('a');
    link.download = options.fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 500);

    return dataUrl;
  } catch (err) {
    console.error('exportPosterToPng failed:', err);
    throw err;
  } finally {
    node.classList.remove('is-exporting');
    // Always restore original image sources
    originalSrcs.forEach(({ img, origSrc }) => {
      img.src = origSrc;
    });
    if (options.onAfterExport) {
      await options.onAfterExport();
    }
  }
}
