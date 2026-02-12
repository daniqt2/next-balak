'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatRouteMetrics, getDifficultyColor } from '@/lib/route-utils';
import { getMountainDifficultyText } from '@/helpers/mountain';
import '@/styles/routeHero.css';

interface RouteHeroProps {
  route: {
    title?: string | null;
    subTitle?: string | null;
    headerImage?: {
      url?: string | null;
      title?: string | null;
    } | null;
    length?: number | null;
    elevation?: number | null;
    time?: string | null;
    startLocationName?: string | null;
    endLocationName?: string | null;
  };
}

export default function RouteHero({ route }: RouteHeroProps) {
  const metrics = formatRouteMetrics(route);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={heroRef}
      className={`route-hero ${isVisible ? 'route-hero--visible' : ''}`}
    >
      <div className="route-hero__image-wrap">
        {route.headerImage?.url ? (
          <Image
            src={route.headerImage.url}
            alt={route.headerImage.title || route.title || 'Route image'}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="route-hero__image"
          />
        ) : (
          <div className="route-hero__placeholder">
            <div className="route-hero__placeholder-inner">
              <svg
                className="route-hero__placeholder-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
          </div>
        )}

        <div className="route-hero__overlay" />

        <div className="route-hero__content">
          <div className="route-hero__content-inner">
            <div className="route-hero__title-section">
              <h1 className="route-hero__title">
                {route.title || 'Route Detail'}
              </h1>

              {route.subTitle && (
                <p className="route-hero__subtitle">{route.subTitle}</p>
              )}

              {metrics && (
                <div
                  className={`route-hero__difficulty-badge ${getDifficultyColor(metrics.difficulty)}`}
                >
                  <span className="route-hero__difficulty-text">
                    {getMountainDifficultyText(metrics.difficulty)}
                  </span>
                </div>
              )}
            </div>

            <div className="route-hero__stats">
              {route.length && (
                <div className="route-hero__stat">
                  <div className="route-hero__stat-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 3 3-3 3 3 3-3 3 3M3 18l3-3 3 3 3-3 3 3 3-3M3 12l3-3 3 3 3-3 3 3"
                      />
                    </svg>
                  </div>
                  <div className="route-hero__stat-content">
                    <span className="route-hero__stat-value">{route.length}</span>
                    <span className="route-hero__stat-unit">km</span>
                  </div>
                </div>
              )}

              {route.elevation && (
                <div className="route-hero__stat">
                  <div className="route-hero__stat-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                  </div>
                  <div className="route-hero__stat-content">
                    <span className="route-hero__stat-value">
                      {route.elevation}
                    </span>
                    <span className="route-hero__stat-unit">mD+</span>
                  </div>
                </div>
              )}

              {route.time && (
                <div className="route-hero__stat">
                  <div className="route-hero__stat-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="route-hero__stat-content">
                    <span className="route-hero__stat-value">{route.time}</span>
                    <span className="route-hero__stat-unit">duration</span>
                  </div>
                </div>
              )}
            </div>

            {(route.startLocationName || route.endLocationName) && (
              <div className="route-hero__locations">
                {route.startLocationName && (
                  <div className="route-hero__location">
                    <div className="route-hero__location-dot route-hero__location-dot--start" />
                    <span className="route-hero__location-text">
                      {route.startLocationName}
                    </span>
                  </div>
                )}

                {route.startLocationName && route.endLocationName && (
                  <div className="route-hero__location-arrow">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                )}

                {route.endLocationName && (
                  <div className="route-hero__location">
                    <div className="route-hero__location-dot route-hero__location-dot--end" />
                    <span className="route-hero__location-text">
                      {route.endLocationName}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
