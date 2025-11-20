'use client';

import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { DivIcon } from 'leaflet';
import { InterestSpot } from '@/contentful-types';

// Fix for default marker icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type MarkerVariant = 'coffee' | 'mountain';

interface CoffeeMapProps {
  coffeePoints: Array<InterestSpot>;
  areas?: Array<Array<[number, number]>>; // Polygon coordinates
  variant?: MarkerVariant;
}


// Coffee icon SVG
const coffeeIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
`;

const getDifficultyColor = (difficulty?: string | null): string => {
  if (!difficulty) return 'rgba(191, 226, 58, 1)'; // Default to balak-green
  const diff = difficulty.toLowerCase();
  if (diff.includes('easy')) return 'rgba(191, 226, 58, 1)'; // balak-500 (green)
  if (diff.includes('medium') || diff.includes('intermediate')) return 'rgba(236, 167, 75, 1)'; // balak-orange-500
  if (diff.includes('hard') || diff.includes('difficult')) return 'rgba(195, 116, 116, 1)'; // balak-red-500
  return 'rgba(191, 226, 58, 1)'; // Default to balak-green
};

const createCustomIcon = (variant: MarkerVariant = 'coffee', difficulty?: string | null): DivIcon => {
  const bgColor = variant === 'coffee' 
    ? 'rgba(245, 158, 11, 1)' 
    : getDifficultyColor(difficulty);
  const iconSvg = variant === 'coffee' ? coffeeIconSvg : mountainIconSvg;
  
  return new DivIcon({
    className: 'custom-marker-icon',
    html: `
      <div style="
        background-color: ${bgColor};
        border: 2px solid #000;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${iconSvg}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

// Mountain icon SVG
const mountainIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
  </svg>
`;

export default function CoffeeMap({ coffeePoints, areas, variant = 'coffee' }: CoffeeMapProps) {
  const center: [number, number] = coffeePoints[0] 
    ? [coffeePoints[0].location?.lat || 0, coffeePoints[0].location?.lon || 0] 
    : [40.4168, -3.7038]; // Default to Madrid


  return (
    <div className="py-12">
      <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: '400px', width: '100%' }}
      className="rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Display areas as polygons */}
      {areas?.map((area, index) => (
        <Polygon
          key={index}
          positions={area}
          pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.2 }}
        />
      ))}
      
      {/* Display coffee points as markers */}
      {coffeePoints.map((point, index) => {
        const customIcon = createCustomIcon(variant, point.mountainDifficulty);
        return (
        <Marker key={index} position={[point.location?.lat || 0, point.location?.lon || 0]} icon={customIcon}>
          <Popup>
            <div className="text-center">
              <div className="mb-2 text-xl font-bold">
                {point.title || `${variant === 'coffee' ? 'Coffee' : 'Mountain'} Point ${index + 1}`}
                <p className="text-sm text-gray-500">
                {point.mountainLength}Km {point.mountainElevationGain}D+ 
                </p>
              </div>
              {point.sys?.id && (
                <a
                  href={`/${variant === 'coffee' ? 'coffee' : 'mountain'}/${point.sys?.id}`}
                  className="text-charcoal-900  hover:text-balak-500 underline text-sm font-medium transition-colors"
                > 
                  Ver detalles
                </a>
              )}
            </div>
          </Popup>
        </Marker>
        );
      })}
    </MapContainer>
    </div>
  );
}