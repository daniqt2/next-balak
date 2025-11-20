import React from 'react';
import Image from 'next/image';
import { Mountain, MapPin, BarChart3, Clock, TrendingUp } from 'lucide-react';
import { getMountainDifficultyText } from '@/helpers/mountain';

interface MountainHeroProps {
  mountain: {
    sys: {
      id: string;
    };
    title?: string | null;
    description?: string | null;
    locationName?: string | null;
    mountainDifficulty?: string | null;
    mountainLength?: number | null;
    mountainElevationGain?: number | null;
    mountainMedPercent?: number | null;
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

export default function MountainHero({ mountain }: MountainHeroProps) {
  if (!mountain) return null;

  return (
    <div className="mountain-hero">
      <div className="hero-image-container">
        {mountain.headerImage?.url ? (
          <Image
            src={mountain.headerImage.url}
            alt={mountain.headerImage.title || mountain.title || 'Mountain image'}
            fill
            quality={90}
            sizes="100vw"
            className="hero-image"
            priority
          />
        ) : (
          <div className="hero-image-placeholder">
            <div className="placeholder-content">
              <Mountain size={120} className="placeholder-icon" />
            </div>
          </div>
        )}
        
        <div className="hero-overlay" />
        
        <div className="hero-content">
          <div className="hero-content-inner">
            <div className="hero-title-section">
              <h1 className="hero-title">
                {mountain.title || 'Puerto de Montaña'}
              </h1>
              {mountain.description && (
                <p className="hero-subtitle line-clamp-2">
                  {mountain.description}
                </p>
              )}

              {mountain.mountainDifficulty && (
                <div className="hero-difficulty-badge">
                  <Mountain size={20} className="text-white" />
                  <span className="difficulty-text">
                    {getMountainDifficultyText(mountain.mountainDifficulty)}
                  </span>
                </div>
              )}
            </div>

            <div className="hero-stats">
              {mountain.mountainLength && (
                <div className="hero-stat">
                  <BarChart3 size={24} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{mountain.mountainLength}</span>
                    <span className="stat-unit">km</span>
                  </div>
                </div>
              )}

              {mountain.mountainElevationGain && (
                <div className="hero-stat">
                  <TrendingUp size={24} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{mountain.mountainElevationGain}</span>
                    <span className="stat-unit">m desnivel</span>
                  </div>
                </div>
              )}

              {mountain.mountainMedPercent && (
                <div className="hero-stat">
                  <Clock size={24} className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">{mountain.mountainMedPercent}%</span>
                    <span className="stat-unit">pendiente media</span>
                  </div>
                </div>
              )}
            </div>

            {mountain.locationName && (
              <div className="hero-locations">
                <div className="location-item">
                  <MapPin size={20} className="text-balak-400" />
                  <span className="location-text">{mountain.locationName}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
