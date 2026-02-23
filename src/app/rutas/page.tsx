import type { RouteGroup } from '@/contentful-types';
import { getRouteGroupsCached } from '@/lib/contentful-cache';
import PageHeader from '@/components/headers/pageHeader';
import RouteGroupsWithFilters from '@/components/rutas/RouteGroupsWithFilters';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

/** Revalidate every 10 min so new routes/collections appear without redeploy */
export const revalidate = 600;

export default async function RouteGroupsPage() {
  const data = await getRouteGroupsCached({ limit: 20 });
  const routeGroups =
    data?.routeGroupCollection?.items?.filter(
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
        <RouteGroupsWithFilters routeGroups={routeGroups} />
      </div>
    </div>
  );
}
