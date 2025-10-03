import { useEffect } from 'react';
import { useRouteGroupStore } from '@/stores/routeGroupStore';

export function useRouteGroup(slug: string) {
  const { currentRouteGroup, loading, error, fetchRouteGroupBySlug } = useRouteGroupStore();

  useEffect(() => {
    if (slug) {
      fetchRouteGroupBySlug(slug);
    }
  }, [slug, fetchRouteGroupBySlug]);

  return { 
    routeGroup: currentRouteGroup, 
    loading, 
    error, 
    refetch: () => fetchRouteGroupBySlug(slug) 
  };
}
