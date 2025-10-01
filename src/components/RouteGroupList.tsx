'use client';

import React from 'react';
import { useRouteGroups } from '@/hooks/useRouteGroups';
import RouteGroupCard from './RouteGroupCard';

export function RouteGroupList() {
  const { routeGroups, loading, error, refetch } = useRouteGroups(6);

  if (loading) {
    return <div className="flex justify-center p-8 text-white">Loading route groups...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-balak-500 text-charcoal-900 rounded hover:bg-balak-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routeGroups.map((routeGroup, index) => (
          <RouteGroupCard key={routeGroup?.sys.id} routeGroup={routeGroup} index={index} />
        ))}
      </div>

      {routeGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-charcoal-400 text-lg">No route groups found</p>
        </div>
      )}
    </div>
  );
}
