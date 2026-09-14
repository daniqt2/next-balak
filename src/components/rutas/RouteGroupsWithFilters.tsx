'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { RouteGroup } from '@/contentful-types';
import PagedGrid from '@/components/ui/PagedGrid';
import RouteGroupDisplay from '@/components/lists/RouteGroupDisplay';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { usePagedItems } from '@/hooks/usePagedItems';
import { ROUTE_GROUP_FILTERS, hasRouteGroupTag } from '@/lib/route-group-tags';

const PAGE_SIZE = 8;

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
  eyebrow: string;
  title: string;
  description: string;
  routeGroups: RouteGroup[];
  mapRouteGroups: RouteGroup[];
  /** How many route groups exist overall, so the rest can be prefetched. */
  total: number;
}

export default function RouteGroupsWithFilters({
  eyebrow,
  title,
  description,
  routeGroups,
  mapRouteGroups,
  total,
}: RouteGroupsWithFiltersProps) {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const { items: groups } = usePagedItems<RouteGroup>({
    initialItems: routeGroups,
    total,
    pageSize: PAGE_SIZE,
    endpoint: '/api/route-groups',
    idOf: (group) => group.sys.id,
  });

  const selectedFilter = ROUTE_GROUP_FILTERS.find((f) => f.id === selectedTagId);

  const filtered = useMemo(() => {
    if (!selectedTagId || !selectedFilter) return groups;
    return groups.filter((r) =>
      hasRouteGroupTag(
        r?.contentfulMetadata?.tags,
        selectedFilter.id!,
        selectedFilter.label
      )
    );
  }, [groups, selectedTagId, selectedFilter]);

  const filteredMapGroups = useMemo(() => {
    if (!selectedTagId || !selectedFilter) return mapRouteGroups;
    return mapRouteGroups.filter((r) =>
      hasRouteGroupTag(
        r?.contentfulMetadata?.tags,
        selectedFilter.id!,
        selectedFilter.label
      )
    );
  }, [mapRouteGroups, selectedTagId, selectedFilter]);

  return (
    <div className="space-y-10">
      {/* Title sits beside the map so the first card row stays above the fold */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <AnimatedSection delay={100}>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal-600">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-anton uppercase text-charcoal-900 text-[clamp(2.6rem,4.5vw,3.75rem)] leading-[0.9] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-charcoal-600">
            {description}
          </p>
        </AnimatedSection>

        <RouteGroupAreasMap routeGroups={filteredMapGroups} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {ROUTE_GROUP_FILTERS.map(({ id, label }, index) => (
          <button
            key={id ?? 'all'}
            type="button"
            onClick={() => setSelectedTagId(id)}
            style={{ animationDelay: `${index * 80}ms` }}
            className={`filter-pill animate-fade-in-up ${
              selectedTagId === id ? 'filter-pill--active' : ''
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-sm text-charcoal-600">
        {filtered.length}{' '}
        {filtered.length === 1 ? 'colección encontrada' : 'colecciones encontradas'}
      </p>

      {filtered.length === 0 ? (
        <p className="text-charcoal-600 text-center py-8">
          No hay colecciones con este filtro.
        </p>
      ) : (
        <PagedGrid<RouteGroup>
          items={filtered}
          pageSize={PAGE_SIZE}
          resetKey={selectedTagId ?? 'all'}
          gridClassName="grid grid-cols-2 lg:grid-cols-4 gap-4"
          keyFor={(group) => group.sys.id}
          renderItem={(group) => (
            <RouteGroupDisplay routeGroup={group} revealOnScroll={false} />
          )}
          label="Paginación de colecciones"
        />
      )}
    </div>
  );
}
