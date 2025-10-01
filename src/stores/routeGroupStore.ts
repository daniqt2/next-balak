import { create } from 'zustand';
import { RouteGroup } from '@/contentful-types';
import { routeGroupService } from '@/services/route-group-service';

interface RouteGroupState {
  routeGroups: RouteGroup[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchRouteGroups: (limit?: number) => Promise<void>;
  setRouteGroups: (routeGroups: RouteGroup[], total: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRouteGroupStore = create<RouteGroupState>((set) => ({
  routeGroups: [],
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

  setRouteGroups: (routeGroups, total) => set({ routeGroups, total }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
