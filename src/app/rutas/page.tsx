import { getRouteGroupsCached } from '@/lib/contentful-cache';
import PageHeader from '@/components/headers/pageHeader';
import RouteGroupGrid from '@/components/grids/RouteGroupGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default async function RouteGroupsPage() {
  const data = await getRouteGroupsCached({ limit: 20 });
  const routes =
    data?.routeGroupCollection?.items?.filter(Boolean) ?? [];

  return (
    <div className="min-h-screen mt-6 md:mt-10" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Rutas' }]} backHref="/" />
      <PageHeader
        title="Nuestras rutas"
        description="Descubre diferentes rutas agrupadas por área o tema"
      />
      <div className="container mx-auto px-4 pb-8 sm:pb-10 md:pb-12">
        <RouteGroupGrid routes={routes} fetchData={false} />
      </div>
    </div>
  );
}
