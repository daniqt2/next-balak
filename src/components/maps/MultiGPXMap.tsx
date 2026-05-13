'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-gpx';

if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

const TRACK_COLORS = [
  '#bfe23a',
  '#4ecdc4',
  '#f97316',
  '#a855f7',
  '#ff6b6b',
  '#06b6d4',
];

export interface RouteTrack {
  slug: string;
  title: string;
  gpxUrl: string;
}

interface MultiGPXLayersProps {
  routes: RouteTrack[];
}

function MultiGPXLayers({ routes }: MultiGPXLayersProps) {
  const map = useMap();
  const loadedRef = useRef(0);
  const combinedBoundsRef = useRef<L.LatLngBounds | null>(null);

  useEffect(() => {
    if (!map || routes.length === 0) return;

    loadedRef.current = 0;
    combinedBoundsRef.current = null;

    const layers: any[] = [];

    routes.forEach(({ slug, title, gpxUrl }, idx) => {
      const color = TRACK_COLORS[idx % TRACK_COLORS.length];

      const gpx = new (L as any).GPX(gpxUrl, {
        async: true,
        markers: { startIcon: false, endIcon: false, wptIcons: {} },
        marker_options: { shadowUrl: undefined },
        polyline_options: { color, opacity: 0.85, weight: 4 },
      });

      gpx.on('loaded', function (e: any) {
        const bounds: L.LatLngBounds = e.target.getBounds();
        if (bounds.isValid()) {
          combinedBoundsRef.current = combinedBoundsRef.current
            ? combinedBoundsRef.current.extend(bounds)
            : bounds;
        }

        loadedRef.current += 1;
        if (loadedRef.current === routes.length && combinedBoundsRef.current) {
          map.fitBounds(combinedBoundsRef.current, { padding: [30, 30] });
        }

        // Bind tooltip + click to all child layers (polylines)
        e.target.eachLayer((layer: any) => {
          if (layer instanceof L.Polyline) {
            layer.bindTooltip(
              `<strong>${title}</strong><br/><span style="font-size:11px;opacity:.8">Click para ver más</span>`,
              { sticky: true, direction: 'top', opacity: 0.95 }
            );
            layer.on('mouseover', () => {
              map.getContainer().style.cursor = 'pointer';
            });
            layer.on('mouseout', () => {
              map.getContainer().style.cursor = '';
            });
            layer.on('click', () => {
              window.open(`/ruta/${slug}`, '_self');
            });
          }
        });
      });

      gpx.on('error', (e: any) => {
        console.error('GPX load error:', e);
        loadedRef.current += 1;
      });

      gpx.addTo(map);
      layers.push(gpx);
    });

    return () => {
      layers.forEach((gpx) => {
        if (map.hasLayer(gpx)) map.removeLayer(gpx);
      });
      map.getContainer().style.cursor = '';
    };
  }, [map, routes]);

  return null;
}

interface MultiGPXMapProps {
  routes: RouteTrack[];
  height?: string;
  className?: string;
}

export default function MultiGPXMap({
  routes,
  height = '480px',
  className = '',
}: MultiGPXMapProps) {
  if (routes.length === 0) return null;

  return (
    <div className={className}>
      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={8}
        style={{ height, width: '100%' }}
        className="rounded-xl z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MultiGPXLayers routes={routes} />
      </MapContainer>
    </div>
  );
}
