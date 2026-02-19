'use client';

import React, { useMemo, useState } from 'react';
import type { RouteGroup } from '@/contentful-types';
import RouteGroupGrid from '@/components/grids/RouteGroupGrid';
import { ROUTE_GROUP_FILTERS, hasRouteGroupTag } from '@/lib/route-group-tags';

interface RouteGroupsWithFiltersProps {
  routeGroups: RouteGroup[];
}

export default function RouteGroupsWithFilters({
  routeGroups,
}: RouteGroupsWithFiltersProps) {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const selectedFilter = ROUTE_GROUP_FILTERS.find(f => f.id === selectedTagId);
  const filtered = useMemo(() => {
    if (!selectedTagId || !selectedFilter) return routeGroups;
    return routeGroups.filter(r =>
      hasRouteGroupTag(r?.contentfulMetadata?.tags, selectedFilter.id!, selectedFilter.label)
    );
  }, [routeGroups, selectedTagId, selectedFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {ROUTE_GROUP_FILTERS.map(({ id, label }) => (
          <button
            key={id ?? 'all'}
            type="button"
            onClick={() => setSelectedTagId(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
