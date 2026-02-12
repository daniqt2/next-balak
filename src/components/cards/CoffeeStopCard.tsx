'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Coffee, MapPin } from 'lucide-react';
import type { InterestSpot } from '@/contentful-types';
import { getStopTypeLabel } from '@/helpers/coffee';
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
            <Coffee size={48} className="placeholder-icon" />
          </div>
        )}

        {/* Shadow from bottom so text is visible */}
        <div className="coffee-card-shadow" />

        <div className={`content-overlay ${compact ? 'compact' : ''}`}>
          {getStopTypeLabel(coffeeStop.stopType) && (
            <span className="coffee-stop-type-label">
              {getStopTypeLabel(coffeeStop.stopType)}
            </span>
          )}
          <h3 className="coffee-stop-title font-anton">
            {coffeeStop.title || `Coffee Stop ${index + 1}`}
          </h3>
          {coffeeStop.locationName && (
            <div className="location-stat">
              <MapPin size={14} />
              <span>{coffeeStop.locationName}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
