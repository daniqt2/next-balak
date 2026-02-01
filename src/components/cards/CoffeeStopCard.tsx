'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Coffee, MapPin } from 'lucide-react';
import type { InterestSpot } from '@/contentful-types';
import '@/styles/coffeeStopCard.css';

interface CoffeeStopCardProps {
  coffeeStop: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function CoffeeStopCard({
  coffeeStop,
  index = 0,
  compact = false,
}: CoffeeStopCardProps) {
  if (!coffeeStop) return null;

  return (
    <Link
      href={`/coffee/${coffeeStop.sys.id}`}
      className={`coffee-stop-card ${compact ? 'compact' : ''}`}
    >
      {/* Image Section */}
      <div className={`image-section ${compact ? 'compact' : ''}`}>
        {coffeeStop.headerImage?.url ? (
          <Image
            src={coffeeStop.headerImage.url}
            alt={
              coffeeStop.headerImage.title ||
              coffeeStop.title ||
              'Coffee stop image'
            }
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="coffee-image"
          />
        ) : (
          <div className="image-placeholder">
            <div className="placeholder-overlay" />
            <Coffee size={48} className="placeholder-icon" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="gradient-overlay" />
      </div>

      {/* Content Section */}
      <div className={`content-section ${compact ? 'compact' : ''}`}>
        {/* Coffee Icon Badge */}
        <div className="coffee-icon-badge">
          <Coffee size={12} color="white" />
        </div>

        {/* Title */}
        <h3 className={`coffee-stop-title ${compact ? 'compact' : ''}`}>
          {coffeeStop.title || `Coffee Stop ${index + 1}`}
        </h3>

        {/* Description */}
        <p className={`coffee-stop-description ${compact ? 'compact' : ''}`}>
          {coffeeStop.description ||
            'A perfect spot to refuel during your ride'}
        </p>

        {/* Stats */}
        <div className="stats-container">
          <div className="location-stat">
            <MapPin size={14} color="currentColor" />
            <span>{coffeeStop.locationName}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
