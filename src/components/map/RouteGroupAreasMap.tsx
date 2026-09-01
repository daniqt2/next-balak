'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  BASEMAP_ATTRIBUTION,
  BASEMAP_URL,
  BASEMAP_SUBDOMAINS,
  BASEMAP_MAX_ZOOM,
} from '@/lib/basemap';
import L from 'leaflet';
import type { RouteGroup } from '@/contentful-types';
import { ROUTE_GROUP_TAG_GRAVEL } from '@/lib/route-group-tags';

const CIRCLE_ROAD   = '#bfe23a'; // balak green
const CIRCLE_GRAVEL = '#e8a94d'; // amber

function getCircleColor(rg: RouteGroup): string {
  const tags = rg.contentfulMetadata?.tags ?? [];
  const isGravel = tags.some(t => t?.id === ROUTE_GROUP_TAG_GRAVEL);
  return isGravel ? CIRCLE_GRAVEL : CIRCLE_ROAD;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const OFFSET = 0.20; // ~50km
    const bounds = L.latLngBounds(
      points.flatMap(([lat, lon]) => [
        [lat - OFFSET, lon - OFFSET] as [number, number],
        [lat + OFFSET, lon + OFFSET] as [number, number],
      ])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

interface RouteGroupAreasMapProps {
  routeGroups: RouteGroup[];
  height?: string;
}

export default function RouteGroupAreasMap({
  routeGroups,
  height = '380px',
}: RouteGroupAreasMapProps) {
  const withArea = routeGroups.filter(
    r => r.locationArea?.lat != null && r.locationArea?.lon != null
  );

  if (withArea.length === 0) return null;

  const points = withArea.map(
    r => [r.locationArea!.lat!, r.locationArea!.lon!] as [number, number]
  );

  return (
    <MapContainer
      center={points[0]}
      zoom={7}
      style={{ height, width: '100%' }}
      className="rounded-xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution={BASEMAP_ATTRIBUTION}
        url={BASEMAP_URL}
        subdomains={BASEMAP_SUBDOMAINS}
        maxZoom={BASEMAP_MAX_ZOOM}
      />
      <FitBounds points={points} />
      {withArea.map(rg => {
        const color = getCircleColor(rg);
        return (
        <Circle
          key={rg.sys.id}
          center={[rg.locationArea!.lat!, rg.locationArea!.lon!]}
          radius={20000}
          pathOptions={{
            color,
            fillColor: color,
            fillOpacity: 0.15,
            weight: 2,
          }}
        >
          <Popup className="areas-map-popup" minWidth={220} maxWidth={220}>
            <a
              href={`/coleccion-rutas/${rg.slug}`}
              style={{ display: 'block', textDecoration: 'none', position: 'relative', width: '220px', height: '140px' }}
            >
              {rg.headerImage?.url && (
                <img
                  src={`${rg.headerImage.url}?w=440&h=280&fit=fill`}
                  alt={rg.title ?? ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '10px 12px',
                }}
              >
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '13px', margin: '0 0 4px', lineHeight: 1.2 }}>
                  {rg.title}
                </p>
                <span style={{ color, fontSize: '11px', fontWeight: 600 }}>
                  Ver colección →
                </span>
              </div>
            </a>
          </Popup>
        </Circle>
        );
      })}
    </MapContainer>
  );
}
