import { useEffect, useState } from 'react';
import { routeService } from '@/services/route-service';

export function useRouteCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch with limit 0 to get only the total count without items
        const data = await routeService.getRoutes({ limit: 0 });
        setCount(data.routeCollection?.total || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch route count');
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return { count, loading, error };
}
