/**
 * Shared Leaflet basemap config.
 *
 * CARTO stopped serving anonymous basemap tiles: without a key the CDN still
 * returns HTTP 200, but the PNG has an "API KEY REQUIRED" watermark baked in.
 * The key is a public, client-side key by design (it ships in the JS bundle);
 * restrict it by domain in the CARTO dashboard rather than trying to hide it.
 */
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY;

export const BASEMAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const BASEMAP_URL =
  `https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png` +
  (CARTO_KEY ? `?key=${CARTO_KEY}` : '');

export const BASEMAP_SUBDOMAINS = 'abcd';
export const BASEMAP_MAX_ZOOM = 20;
