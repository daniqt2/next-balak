'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MapPin, Route, Clock } from 'lucide-react';

interface RouteGroupHeroProps {
  routeGroup: {
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    locationLabel?: string | null;
    locationLength?: number | null;
    headerImage?: {
      url?: string | null;
      title?: string | null;
    } | null;
    routesCollection?: {
      total?: number | null;
      items?: Array<{
        length?: number | null;
      } | null> | null;
    } | null;
  };
}

export default function RouteGroupHero({ routeGroup }: RouteGroupHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Calculate total distance from all routes
  const totalDistance = routeGroup.routesCollection?.items?.reduce((sum, route) => {
    return sum + (route?.length || 0);
  }, 0) || 0;

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
      className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden"
    >
      {/* Hero Image */}
      <div className="relative w-full h-full">
        {routeGroup.headerImage?.url ? (
          <Image
            src={routeGroup.headerImage.url}
            alt={routeGroup.headerImage.title || routeGroup.title || 'Route group image'}
            fill
            quality={85}
            sizes="100vw"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <div 
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.1) 0%, transparent 70%)'
              }}
            />
            <Route size={64} color="#f59e0b" style={{ opacity: 0.6 }} />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
            {/* Trip Title */}
            <div 
              className="mb-6"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">
                {routeGroup.title || 'Cycling Trip'}
              </h1>
              
              {routeGroup.subtitle && (
                <p 
                  className="text-lg sm:text-xl lg:text-2xl text-balak-200 mb-6 drop-shadow-lg max-w-3xl"
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                  }}
                >
                  {routeGroup.subtitle}
                </p>
              )}
            </div>

            {/* Trip Stats */}
            <div 
              className="flex flex-wrap gap-6 mb-8"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}
            >
              {routeGroup.locationLabel && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/40 transition-all duration-200">
                  <MapPin size={20} color="#f59e0b" />
                  <div>
                    <p className="text-balak-200 text-sm font-medium">Lugar</p>
                    <p className="text-white text-lg font-semibold">{routeGroup.locationLabel}</p>
                  </div>
                </div>
              )}
              
              {routeGroup.routesCollection?.total && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/40 transition-all duration-200">
                  <Route size={20} color="#f59e0b" />
                  <div>
                    <p className="text-balak-200 text-sm font-medium">Rutas</p>
                    <p className="text-white text-lg font-semibold">{routeGroup.routesCollection.total} routes</p>
                  </div>
                </div>
              )}
              
              {totalDistance > 0 && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/40 transition-all duration-200">
                  <Clock size={20} color="#f59e0b" />
                  <div>
                    <p className="text-balak-200 text-sm font-medium">Distancia total</p>
                    <p className="text-white text-lg font-semibold">{totalDistance} km</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
