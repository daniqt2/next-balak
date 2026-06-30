import type { RouteGroup } from '@/contentful-types';
import { getRouteGroupsCached, getRouteGroupsForMapCached } from '@/lib/contentful-cache';
import PageHeader from '@/components/headers/pageHeader';
import RouteGroupsWithFilters from '@/components/rutas/RouteGroupsWithFilters';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

/** Revalidate every 10 min so new routes/collections appear without redeploy */
export const revalidate = 600;

export default async function RouteGroupsPage() {
  const [gridData, mapData] = await Promise.all([
    getRouteGroupsCached({ limit: 20 }),
    getRouteGroupsForMapCached(),
  ]);

  const routeGroups =
    gridData?.routeGroupCollection?.items?.filter(
      (r): r is RouteGroup => r != null
    ) ?? [];

  const mapRouteGroups =
    mapData?.routeGroupCollection?.items?.filter(
      (r): r is RouteGroup => r != null
    ) ?? [];

  return (
    <div className="min-h-screen mt-6 md:mt-10" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Rutas' }]} backHref="/" />
      <PageHeader
        title="Nuestras rutas"
        description="Descubre diferentes rutas agrupadas por área o tema"
      />
      <div className="container mx-auto px-4 pb-8 sm:pb-10 md:pb-12">
        <RouteGroupsWithFilters routeGroups={routeGroups} mapRouteGroups={mapRouteGroups} />
      </div>
    </div>
  );
}
