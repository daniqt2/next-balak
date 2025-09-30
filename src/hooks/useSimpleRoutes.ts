import { useEffect } from 'react';
import { useSimpleRouteStore } from '@/stores/simpleRouteStore';

export function useSimpleRoutes(limit: number = 10) {
  const { routes, total, loading, error, fetchRoutes } = useSimpleRouteStore();

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
