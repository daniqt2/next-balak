'use client';

import React from 'react';
import { useRouteGroups } from '@/hooks/useRouteGroups';
import RouteGroupDisplay from './RouteGroupDisplay';

export function RouteGroupResults() {
  const { routeGroups, loading, error, refetch } = useRouteGroups(6);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">Loading route groups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p className="error-message">Error: {error}</p>
        <button
          onClick={refetch}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="route-group-results">
      <div className="header">
        <h2 className="title">Route Groups</h2>
        <p className="subtitle">Discover cycling routes by location</p>
      </div>
      
      <div className="grid">
        {routeGroups.map((routeGroup, index) => (
          <RouteGroupDisplay key={routeGroup?.sys.id} routeGroup={routeGroup} index={index} />
        ))}
      </div>

      {routeGroups.length === 0 && (
        <div className="empty-state">
          <p className="empty-message">No route groups found</p>
        </div>
      )}
    </div>
  );
}
