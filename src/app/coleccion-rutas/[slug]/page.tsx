import { routeGroupService } from '@/services/route-group-service';
import { notFound } from 'next/navigation';
import RouteGroupHero from '@/components/heroes/RouteGroupHero';
import RouteGroupRoutesGrid from '@/components/grids/RouteGroupRoutesGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import type { Route } from '@/contentful-types';
import PageHeader from '@/components/headers/pageHeader';

interface RouteGroupDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function RouteGroupDetailPage({
  params,
}: RouteGroupDetailPageProps) {
  try {
    const { slug } = await params;
    const data = await routeGroupService.getRouteGroupBySlug(slug);
    const routeGroup = data?.routeGroupCollection?.items?.[0];

    if (!routeGroup) {
      notFound();
    }

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        <RouteGroupHero routeGroup={routeGroup} />

        <div className="container mx-auto px-4 py-8">
          {routeGroup.description && (
            <PageHeader
              title=""
              description={routeGroup.description}
              variant="secondary"
            />
          )}

          {routeGroup.routesCollection?.items &&
            routeGroup.routesCollection.items.length > 0 && (
              <RouteGroupRoutesGrid
                routes={
                  routeGroup.routesCollection.items.filter(Boolean) as Route[]
                }
                subtitle={`Rutas: ${routeGroup.routesCollection.total}`}
                emptyMessage="No routes found in this trip"
              />
            )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching route group:', error);
    notFound();
  }
}
