import type { RouteGroup } from '@/contentful-types';
import {
  getRouteGroupsCached,
  getRouteGroupsForMapCached,
} from '@/lib/contentful-cache';
import RouteGroupsWithFilters from '@/components/rutas/RouteGroupsWithFilters';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

/** Revalidate every 10 min so new routes/collections appear without redeploy */
export const revalidate = 600;

/** Two pages worth, so page 2 is already in memory on first paint. */
const INITIAL_BATCH = 16;

export default async function RouteGroupsPage() {
  const [gridData, mapData] = await Promise.all([
    getRouteGroupsCached({ limit: INITIAL_BATCH }),
    getRouteGroupsForMapCached(),
  ]);

  const routeGroups =
    gridData?.routeGroupCollection?.items?.filter(
      (r): r is RouteGroup => r != null
    ) ?? [];

  const total = gridData?.routeGroupCollection?.total ?? routeGroups.length;

  const mapRouteGroups =
    mapData?.routeGroupCollection?.items?.filter(
      (r): r is RouteGroup => r != null
    ) ?? [];

  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Rutas' }]} backHref="/" />

      <div className="container mx-auto px-4 pt-6 md:pt-12 pb-8 sm:pb-10 md:pb-12">
        <RouteGroupsWithFilters
          eyebrow="Rutas"
          title="Nuestras rutas"
          description="Descubre diferentes rutas agrupadas por área o tema"
          routeGroups={routeGroups}
          mapRouteGroups={mapRouteGroups}
          total={total}
        />
      </div>
    </div>
  );
}
