import { create } from 'zustand';
import { Route } from '@/contentful-types';
import { routeService } from '@/services/route-service';

interface SimpleRouteState {
  routes: Route[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchRoutes: (limit?: number) => Promise<void>;
  setRoutes: (routes: Route[], total: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSimpleRouteStore = create<SimpleRouteState>((set, get) => ({
  routes: [],
  total: 0,
  loading: false,
  error: null,

  fetchRoutes: async (limit = 10) => {
    set({ loading: true, error: null });
    
    try {
      const data = await routeService.getRoutes({ limit });
      set({ 
        routes: data.routeCollection?.items?.filter(Boolean) as Route[] || [],
        total: data.routeCollection?.total || 0,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch routes',
        loading: false 
      });
    }
  },

  setRoutes: (routes, total) => set({ routes, total }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
