'use client';

import React from 'react';
import { useRoutes } from '@/hooks/useRoutes';
import { ImageCardCarousel } from './ImageCardCarousel';

export function RouteImageCardCarousel() {
  const { routes, loading, error } = useRoutes(8);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-balak-300 text-lg">Loading route images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading images: {error}</p>
      </div>
    );
  }

  // Filter routes that have header images and create image objects
  const routeImages = routes
    .filter(route => route?.headerImage?.url)
    .map(route => ({
      url: route.headerImage!.url!,
      alt: route.title || 'Route image',
    }));

  if (routeImages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-400 text-lg">No route images available</p>
      </div>
    );
  }

  return (
    <ImageCardCarousel 
      images={routeImages} 
      cardHeight="350px"
      showIndicators={true}
      showControls={true}
    />
  );
}
