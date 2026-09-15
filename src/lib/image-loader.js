/**
 * Contentful assets are served straight from Contentful's CDN, which already
 * resizes and converts to WebP. Routing them through Vercel's optimizer meant
 * paying (and burning metered cache writes) to re-optimise images that were
 * already optimised.
 *
 * Local /public files have no such CDN, so they keep using Next's optimizer.
 */
const CONTENTFUL_HOST = 'images.ctfassets.net';
const DEFAULT_QUALITY = 80;

export default function imageLoader({ src, width, quality }) {
  const q = quality || DEFAULT_QUALITY;

  if (src.startsWith(`https://${CONTENTFUL_HOST}/`)) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(q));
    url.searchParams.set('fm', 'webp');
    // Never upscale past the source; Contentful clamps, this just keeps URLs tidy.
    url.searchParams.set('fit', 'fill');
    return url.href;
  }

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
}
