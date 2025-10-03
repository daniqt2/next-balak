'use client';

import React from 'react';
import { Carousel } from '@mantine/carousel';
import { useRouteGroups } from '@/hooks/useRouteGroups';
import RouteGroupDisplay from '../lists/RouteGroupDisplay';

export function RouteCarousel() {
  const { routeGroups, loading, error, refetch } = useRouteGroups(10);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-balak-300 text-lg">Loading route groups...</div>
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

  if (routeGroups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-400 text-lg">No route groups found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Route Groups</h2>
        <p className="text-charcoal-400">Discover cycling routes by location</p>
      </div>
      
      <Carousel
        withIndicators
        withControls={routeGroups.length > 3}
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
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
        {routeGroups.map((routeGroup, index) => (
          <Carousel.Slide key={routeGroup?.sys.id}>
            <RouteGroupDisplay routeGroup={routeGroup} index={index} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
