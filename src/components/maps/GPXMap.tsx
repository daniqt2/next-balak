'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-gpx';

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
    marker_options?: {
      startIconUrl?: string;
      endIconUrl?: string;
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

    // Default options
    const defaultOptions = {
      async: true,
      marker_options: {
        startIconUrl: undefined,
        endIconUrl: undefined,
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
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

interface GPXMapProps {
  gpxUrl: string;
  height?: string;
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export default function GPXMap({
  gpxUrl,
  height = '400px',
  className = '',
  center = [40.4168, -3.7038], // Default to Spain (Madrid)
  zoom = 10,
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
              opacity: .90,
              weight: 5,
            },
          }}
        />
      </MapContainer>
    </div>
  );
}
