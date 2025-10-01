import { useEffect } from 'react';
import { useRouteGroupStore } from '@/stores/routeGroupStore';

export function useRouteGroups(limit: number = 10) {
  const { routeGroups, total, loading, error, fetchRouteGroups } = useRouteGroupStore();

  useEffect(() => {
    fetchRouteGroups(limit);
  }, [limit, fetchRouteGroups]);

  return { routeGroups, total, loading, error, refetch: () => fetchRouteGroups(limit) };
}
