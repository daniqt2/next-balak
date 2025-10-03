import { create } from 'zustand';
import { RouteGroup } from '@/contentful-types';
import { routeGroupService } from '@/services/route-group-service';

interface RouteGroupState {
  routeGroups: RouteGroup[];
  currentRouteGroup: RouteGroup | null;
  total: number;
  loading: boolean;
  error: string | null;
  fetchRouteGroups: (limit?: number) => Promise<void>;
  fetchRouteGroupBySlug: (slug: string) => Promise<RouteGroup | null>;
  setRouteGroups: (routeGroups: RouteGroup[], total: number) => void;
  setCurrentRouteGroup: (routeGroup: RouteGroup | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRouteGroupStore = create<RouteGroupState>((set) => ({
  routeGroups: [],
  currentRouteGroup: null,
  total: 0,
  loading: false,
  error: null,

  fetchRouteGroups: async (limit = 10) => {
    set({ loading: true, error: null });

    try {
      const data = await routeGroupService.getRouteGroups({ limit });
      set({
        routeGroups: data.routeGroupCollection?.items?.filter(Boolean) as RouteGroup[] || [],
        total: data.routeGroupCollection?.total || 0,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch route groups',
        loading: false
      });
    }
  },

  fetchRouteGroupBySlug: async (slug: string) => {
    set({ loading: true, error: null });

    try {
      const data = await routeGroupService.getRouteGroupBySlug(slug);
      const routeGroup = data.routeGroupCollection?.items?.[0] as RouteGroup | null;
      
      set({
        currentRouteGroup: routeGroup,
        loading: false
      });
      
      return routeGroup;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch route group',
        loading: false
      });
      return null;
    }
  },

  setRouteGroups: (routeGroups, total) => set({ routeGroups, total }),
  setCurrentRouteGroup: (routeGroup) => set({ currentRouteGroup: routeGroup }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
