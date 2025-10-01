'use client';

import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useRoutes } from '@/hooks/useRoutes';
import RouteCard from './RouteCard';

export function RouteCardCarousel() {
  const { routes, loading, error, refetch } = useRoutes(10);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-balak-300 text-lg">Loading routes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error: {error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-balak-500 text-charcoal-900 rounded hover:bg-balak-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-400 text-lg">No routes found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Featured Routes</h2>
        <p className="text-charcoal-400">Explore our cycling routes</p>
      </div>
      
      <Carousel
        withIndicators
        withControls={routes.length > 3}
        initialSlide={2}
        styles={{
          root: {
            width: '100%',
          },
          container: {
            gap: '1rem',
          },
          slide: {
            padding: '0 0.5rem',
            height: 'auto',
          },
        }}
      >
        {routes.map((route, index) => (
          <Carousel.Slide key={route?.sys.id}>
            <RouteCard route={route} index={index} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
