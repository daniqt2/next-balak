'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-gpx';

// TODO MOVE TO FILES
const START_DOT_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bfe23a" stroke="#586b20" stroke-width="2"/></svg>'
  );
const END_DOT_URL =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#C37474" stroke="#5f3434" stroke-width="2"/></svg>'
  );

// Mountain and coffee markers (public/icons/)
const MOUNTAIN_ICON_URL = '/icons/map-marker-mountain.svg';
const COFFEE_ICON_URL = '/icons/map-marker-coffee.svg';

function createIcon(iconUrl: string, size: [number, number] = [32, 32]) {
  return L.icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1]],
  });
}

const mountainIcon = createIcon(MOUNTAIN_ICON_URL);
const coffeeIcon = createIcon(COFFEE_ICON_URL);

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

    // leaflet-gpx uses markers.startIcon / endIcon (URLs)
    const defaultOptions = {
      async: true,
      markers: {
        startIcon: START_DOT_URL,
        endIcon: END_DOT_URL,
        ...options?.markers,
      },
      marker_options: {
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        shadowUrl: undefined,
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
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: '100%' }}
        className="rounded-xl z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GPXLayer
          gpxUrl={gpxUrl}
          options={{
            polyline_options: {
              color: '#5a6068', //
              opacity: 0.9,
              weight: 5,
            },
          }}
        />
        {collMarkers.map(
          (m, i) =>
            m.lat != null &&
            m.lon != null && (
              <Marker
                key={`coll-${i}`}
                position={[m.lat, m.lon]}
                icon={mountainIcon}
              >
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
              <Marker
                key={`coffee-${i}`}
                position={[m.lat, m.lon]}
                icon={coffeeIcon}
              >
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
