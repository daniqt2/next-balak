'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatRouteMetrics, getDifficultyColor } from '@/lib/route-utils';
import RouteMetric, { RouteMetricIcons } from './RouteMetric';

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
      className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden"
    >
      {/* Hero Image */}
      <div className="relative w-full h-full">
        {route.headerImage?.url ? (
          <Image
            src={route.headerImage.url}
            alt={route.headerImage.title || route.title || 'Route image'}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charcoal-700 via-charcoal-800 to-charcoal-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-32 h-32 text-balak-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
              {/* Hero Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
                  {/* Route Title */}
                  <div 
                    className="mb-8"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">
                      {route.title || 'Route Detail'}
                    </h1>
              
              {route.subTitle && (
                <p 
                  className="text-lg sm:text-xl lg:text-2xl text-balak-200 mb-6 drop-shadow-lg max-w-3xl"
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                  }}
                >
                  {route.subTitle}
                </p>
              )}
              
              {/* Difficulty Badge */}
              {metrics && (
                <div 
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg ${getDifficultyColor(metrics.difficulty)}`}
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
                  }}
                >
                  <span className="font-semibold text-sm uppercase tracking-wider">{metrics.difficulty}</span>
                </div>
              )}
            </div>
            
            {/* Quick Stats */}
            <div 
              className="flex flex-wrap gap-6 mb-8"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
              }}
            >
              {route.length && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/40 transition-all duration-200">
                  <div className="w-6 h-6 text-balak-400 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 3 3-3 3 3 3-3 3 3M3 18l3-3 3 3 3-3 3 3 3-3M3 12l3-3 3 3 3-3 3 3" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{route.length}</span>
                    <span className="text-balak-300 text-xs uppercase tracking-wider">km</span>
                  </div>
                </div>
              )}
              
              {route.elevation && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/40 transition-all duration-200">
                  <div className="w-6 h-6 text-balak-400 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{route.elevation}</span>
                    <span className="text-balak-300 text-xs uppercase tracking-wider">m D+</span>
                  </div>
                </div>
              )}
              
              {route.time && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/40 transition-all duration-200">
                  <div className="w-6 h-6 text-balak-400 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg">{route.time}</span>
                    <span className="text-balak-300 text-xs uppercase tracking-wider">duration</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Route Locations */}
            {(route.startLocationName || route.endLocationName) && (
              <div className="flex items-center gap-4 flex-wrap">
                {route.startLocationName && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-balak-400 shadow-lg" />
                    <span className="text-white font-medium text-sm drop-shadow-lg">{route.startLocationName}</span>
                  </div>
                )}
                
                {route.startLocationName && route.endLocationName && (
                  <div className="w-4 h-4 text-balak-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
                
                {route.endLocationName && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg" />
                    <span className="text-white font-medium text-sm drop-shadow-lg">{route.endLocationName}</span>
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
