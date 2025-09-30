'use client';

import React from 'react';
import { useSimpleRoutes } from '@/hooks/useSimpleRoutes';

export function SimpleRouteList() {
  const { routes, loading, error, refetch } = useSimpleRoutes(6);

  if (loading) {
    return <div className="flex justify-center p-8">Loading routes...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Routes</h2>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <div key={route?.sys.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {route?.mainImage && (
              <img
                src={route.mainImage.url || ''}
                alt={route.mainImage.title || route?.title || ''}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{route?.title}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {route?.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{route?.length} km</span>
                <span>{route?.elevation}m elevation</span>
                <span>{route?.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {routes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No routes found</p>
        </div>
      )}
    </div>
  );
}
