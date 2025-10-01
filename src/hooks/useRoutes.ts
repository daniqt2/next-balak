import { useEffect } from 'react';
import { useRouteStore } from '@/stores/routeStore';

export function useRoutes(limit: number = 10) {
  const { routes, total, loading, error, fetchRoutes } = useRouteStore();

  useEffect(() => {
    fetchRoutes(limit);
  }, [limit, fetchRoutes]);

  return {
    routes,
    total,
    loading,
    error,
    refetch: () => fetchRoutes(limit),
  };
}
