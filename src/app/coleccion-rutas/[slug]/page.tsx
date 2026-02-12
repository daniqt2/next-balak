import type { Metadata } from 'next';
import { routeGroupService } from '@/services/route-group-service';
import { notFound } from 'next/navigation';
import RouteGroupHero from '@/components/heroes/RouteGroupHero';
import RouteGroupRoutesGrid from '@/components/grids/RouteGroupRoutesGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import type { Route } from '@/contentful-types';
import PageHeader from '@/components/headers/pageHeader';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface RouteGroupDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RouteGroupDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await routeGroupService.getRouteGroupBySlug(slug);
    const routeGroup = data?.routeGroupCollection?.items?.[0];
    if (!routeGroup) notFound();
    const title = routeGroup.title ?? 'Colección';
    const description =
      (typeof routeGroup.description === 'string'
        ? routeGroup.description.slice(0, 160)
        : null) ?? `Colección de rutas: ${title}.`;
    return {
      title,
      description,
      openGraph: { title: `${title} | BALAK RIDE`, description },
    };
  } catch {
    notFound();
  }
}

export default async function RouteGroupDetailPage({
  params,
}: RouteGroupDetailPageProps) {
  const { slug } = await params;
  try {
    const data = await routeGroupService.getRouteGroupBySlug(slug);
    const routeGroup = data?.routeGroupCollection?.items?.[0];

    if (!routeGroup) {
      notFound();
    }

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        <RouteGroupHero routeGroup={routeGroup} />

        <Breadcrumbs
          items={[
            { label: 'Rutas', href: '/rutas' },
            { label: routeGroup.title ?? 'Colección' },
          ]}
          backHref="/rutas"
        />
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
                subtitle={`${routeGroup.routesCollection.total} rutas`}
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
