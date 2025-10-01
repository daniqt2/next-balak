'use client';

import React from 'react';
import { useRouteGroups } from '@/hooks/useRouteGroups';
import { SlotGrid } from './SlotGrid';
import RouteGroupDisplay from './RouteGroupDisplay';
import type { RouteGroup } from '@/contentful-types';

export function RouteGroupGrid() {
  const { routeGroups, loading, error, refetch } = useRouteGroups(6);

  return (
    <SlotGrid<RouteGroup>
      title="Route Groups GRID"
      subtitle="Explore routes by location"
      items={routeGroups}
      renderItem={(routeGroup, index) => (
        <RouteGroupDisplay key={routeGroup?.sys.id} routeGroup={routeGroup} index={index} />
      )}
      loading={loading}
      error={error}
      onRetry={refetch}
      emptyMessage="No route groups found"
    />
  );
}
