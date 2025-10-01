'use client';

import React from 'react';
import { useRoutes } from '@/hooks/useRoutes';
import { SlotGrid } from './SlotGrid';
import RouteCard from './RouteCard';
import type { Route } from '@/contentful-types';

export function RouteGrid() {
  const { routes, loading, error, refetch } = useRoutes(6);

  return (
    <SlotGrid<Route>
      title="Featured Routes GRID"
      subtitle="Discover our cycling routes"
      items={routes}
      renderItem={(route, index) => (
        <RouteCard key={route?.sys.id} route={route} index={index} />
      )}
      loading={loading}
      error={error}
      onRetry={refetch}
      emptyMessage="No routes found"
    />
  );
}
