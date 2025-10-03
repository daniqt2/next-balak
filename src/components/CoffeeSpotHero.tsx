import React from 'react';
import Image from 'next/image';
import { Coffee, MapPin, Clock, Star } from 'lucide-react';

interface CoffeeSpotHeroProps {
  coffeeSpot: {
    sys: {
      id: string;
    };
    title?: string | null;
    description?: string | null;
    locationName?: string | null;
    headerImage?: {
      url?: string | null;
      title?: string | null;
      description?: string | null;
    } | null;
    location?: {
      lat?: number | null;
      lon?: number | null;
    } | null;
  };
}

export default function CoffeeSpotHero({ coffeeSpot }: CoffeeSpotHeroProps) {
  if (!coffeeSpot) return null;

  return (
    <div className="coffee-spot-hero">
      <div className="hero-image-container">
        {coffeeSpot.headerImage?.url ? (
          <Image
            src={coffeeSpot.headerImage.url}
            alt={coffeeSpot.headerImage.title || coffeeSpot.title || 'Coffee spot image'}
            fill
            quality={90}
            sizes="100vw"
            className="hero-image"
            priority
          />
        ) : (
          <div className="hero-image-placeholder">
            <div className="placeholder-content">
              <Coffee size={120} className="placeholder-icon" />
            </div>
          </div>
        )}
        
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <div className="hero-content-inner">
            <div className="hero-title-section">
              <h1 className="hero-title">
                {coffeeSpot.title || 'Punto de Café'}
              </h1>
              
              {coffeeSpot.description && (
                <p className="hero-subtitle">
                  {coffeeSpot.description}
                </p>
              )}

              <div className="hero-coffee-badge">
                <Coffee size={20} className="text-white" />
                <span className="coffee-text">
                  Punto de Café
                </span>
              </div>
            </div>

            {coffeeSpot.locationName && (
              <div className="hero-locations">
                <div className="location-item">
                  <MapPin size={20} className="text-balak-400" />
                  <span className="location-text">{coffeeSpot.locationName}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
