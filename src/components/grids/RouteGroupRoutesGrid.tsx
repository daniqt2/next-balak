'use client';

import React from 'react';
import { SlotGrid } from './SlotGrid';
import RouteCard from '../cards/RouteCard';
import type { Route } from '@/contentful-types';

interface RouteGroupRoutesGridProps {
  routes: Route[];
  title?: string;
  subtitle: string;
  emptyMessage?: string;
}

export default function RouteGroupRoutesGrid({ 
  routes, 
  title, 
  subtitle, 
  emptyMessage = "No routes found in this trip" 
}: RouteGroupRoutesGridProps) {
  return (
    <SlotGrid
      title={title}
      subtitle={subtitle}
      items={routes}
      renderItem={(route, index) => (
        <RouteCard key={route?.sys.id} route={route} index={index} />
      )}
      emptyMessage={emptyMessage}
    />
  );
}
