'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { RouteGroup } from '@/contentful-types';
import RouteGroupGrid from '@/components/grids/RouteGroupGrid';
import { ROUTE_GROUP_FILTERS, hasRouteGroupTag } from '@/lib/route-group-tags';

const RouteGroupAreasMap = dynamic(
  () => import('@/components/map/RouteGroupAreasMap'),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-xl bg-charcoal-800 animate-pulse"
        style={{ height: '380px' }}
      />
    ),
  }
);

interface RouteGroupsWithFiltersProps {
  routeGroups: RouteGroup[];
  mapRouteGroups: RouteGroup[];
}

export default function RouteGroupsWithFilters({
  routeGroups,
  mapRouteGroups,
}: RouteGroupsWithFiltersProps) {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const selectedFilter = ROUTE_GROUP_FILTERS.find(f => f.id === selectedTagId);
  const filtered = useMemo(() => {
    if (!selectedTagId || !selectedFilter) return routeGroups;
    return routeGroups.filter(r =>
      hasRouteGroupTag(r?.contentfulMetadata?.tags, selectedFilter.id!, selectedFilter.label)
    );
  }, [routeGroups, selectedTagId, selectedFilter]);

  const filteredMapGroups = useMemo(() => {
    if (!selectedTagId || !selectedFilter) return mapRouteGroups;
    return mapRouteGroups.filter(r =>
      hasRouteGroupTag(r?.contentfulMetadata?.tags, selectedFilter.id!, selectedFilter.label)
    );
  }, [mapRouteGroups, selectedTagId, selectedFilter]);

  return (
    <div className="space-y-6">
      <RouteGroupAreasMap routeGroups={filteredMapGroups} />
      <div className="flex flex-wrap items-center gap-2">
        {ROUTE_GROUP_FILTERS.map(({ id, label }, index) => (
          <button
            key={id ?? 'all'}
            type="button"
            onClick={() => setSelectedTagId(id)}
            style={{ animationDelay: `${index * 80}ms` }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors animate-fade-in-up ${
              selectedTagId === id
                ? 'bg-balak-500 text-charcoal-900'
                : 'bg-charcoal-700 text-charcoal-200 hover:bg-charcoal-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-charcoal-500 text-center py-8">
          No hay colecciones con este filtro.
        </p>
      ) : (
        <RouteGroupGrid
          routes={filtered}
          fetchData={false}
          title=""
          subtitle=""
        />
      )}
    </div>
  );
}
