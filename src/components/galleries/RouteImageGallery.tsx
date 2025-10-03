'use client';

import React from 'react';
import { useRoutes } from '@/hooks/useRoutes';
import { ImageGallery } from './ImageGallery';

export function RouteImageGallery() {
  const { routes, loading, error } = useRoutes(6);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-balak-300 text-lg">Loading images...</div>
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
      title: route.title || undefined,
    }));

  if (routeImages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-400 text-lg">No route images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Route Gallery</h2>
        <p className="text-charcoal-400">Explore stunning cycling route images</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <ImageGallery 
          images={routeImages} 
          height="500px"
          showThumbnails={true}
        />
      </div>
    </div>
  );
}
