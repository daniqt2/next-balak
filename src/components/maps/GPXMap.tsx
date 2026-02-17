'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-gpx';

/** Redraw map after container has size — fixes blank map on mobile / when below the fold */
function MapSizeSync() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const t1 = window.setTimeout(() => map.invalidateSize(), 100);
    const t2 = window.setTimeout(() => map.invalidateSize(), 600);
    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('resize', onResize);
    };
  }, [map]);
  return null;
}

// Start/end dots as data URLs so the map works even if public/icons isn’t available (e.g. deploy)
const START_DOT_ICON_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bfe23a" stroke="#586b20" stroke-width="2"/></svg>'
  );
const END_DOT_ICON_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#C37474" stroke="#5f3434" stroke-width="2"/></svg>'
  );

// Mountain and coffee as data URLs so map works even if public/icons isn’t available in production
const MOUNTAIN_ICON_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#3f444b" stroke="white" stroke-width="2"/><path d="M7 22 L14 12 L17 16 L19 13 L25 22 Z" fill="white"/></svg>'
  );
const COFFEE_ICON_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#ECA74B" stroke="white" stroke-width="2"/><path d="M10 9h10v7c0 2-1.5 3-3 3h-4c-1.5 0-3-1-3-3V9z" fill="none" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 11h2c1 0 2 .8 2 2s-1 2-2 2h-2" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'
  );

function createIcon(iconUrl: string, size: [number, number] = [32, 32]) {
  return L.icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });
}

// Fix for default marker icon in Next.js
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

const mountainIcon = createIcon(MOUNTAIN_ICON_URL);
const coffeeIcon = createIcon(COFFEE_ICON_URL);

interface GPXLayerProps {
  gpxUrl: string;
  options?: {
    async?: boolean;
    markers?: { startIcon?: string; endIcon?: string };
    marker_options?: {
      iconSize?: [number, number];
      iconAnchor?: [number, number];
      shadowUrl?: string;
    };
    polyline_options?: {
      color?: string;
      opacity?: number;
      weight?: number;
    };
  };
}

function GPXLayer({ gpxUrl, options }: GPXLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!map || !gpxUrl) return;

    // leaflet-gpx uses options.markers.startIcon / endIcon (URLs), not marker_options
    const defaultOptions = {
      async: true,
      markers: {
        startIcon: START_DOT_ICON_URL,
        endIcon: END_DOT_ICON_URL,
        ...options?.markers,
      },
      marker_options: {
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        shadowUrl: undefined,
        shadowSize: undefined,
        shadowAnchor: undefined,
        ...options?.marker_options,
      },
      polyline_options: {
        color: '#bfe23a', // balak-500
        opacity: 0.75,
        weight: 4,
      },
      ...options,
    };

    // Create GPX layer
    const gpx = new (L as any).GPX(gpxUrl, defaultOptions);

    // Fit map to GPX bounds when loaded
    gpx.on('loaded', function (e: any) {
      const bounds = e.target.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    });

    // Add error handling
    gpx.on('error', function (e: any) {
      console.error('Error loading GPX:', e);
    });

    // Add to map
    gpx.addTo(map);

    // Cleanup
    return () => {
      if (map.hasLayer(gpx)) {
        map.removeLayer(gpx);
      }
    };
  }, [map, gpxUrl, options]);

  return null;
}

export type MapMarker = { lat: number; lon: number; label: string };

interface GPXMapProps {
  gpxUrl: string;
  height?: string;
  className?: string;
  center?: [number, number];
  zoom?: number;
  collMarkers?: MapMarker[];
  coffeeStopMarkers?: MapMarker[];
}

export default function GPXMap({
  gpxUrl,
  height = '400px',
  className = '',
  center = [40.4168, -3.7038], // Default to Spain (Madrid)
  zoom = 10,
  collMarkers = [],
  coffeeStopMarkers = [],
}: GPXMapProps) {
  if (!gpxUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-xl ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">No hay archivo GPX disponible</p>
      </div>
    );
  }

  return (
    <div className={className} style={{ minHeight: height, height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: '100%' }}
        className="rounded-xl z-0"
        scrollWheelZoom={true}
      >
        <MapSizeSync />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GPXLayer
          gpxUrl={gpxUrl}
          options={{
            polyline_options: {
              color: '#5a6068',
              opacity: 0.9,
              weight: 5,
            },
          }}
        />
        {collMarkers.map(
          (m, i) =>
            m.lat != null &&
            m.lon != null && (
              <Marker key={`coll-${i}`} position={[m.lat, m.lon]} icon={mountainIcon}>
                <Popup>
                  <span className="font-semibold text-charcoal-900">
                    {m.label || 'Puerto'}
                  </span>
                </Popup>
              </Marker>
            )
        )}
        {coffeeStopMarkers.map(
          (m, i) =>
            m.lat != null &&
            m.lon != null && (
              <Marker key={`coffee-${i}`} position={[m.lat, m.lon]} icon={coffeeIcon}>
                <Popup>
                  <span className="font-semibold text-charcoal-900">
                    {m.label || 'Parada café'}
                  </span>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}
