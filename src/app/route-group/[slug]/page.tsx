import { routeGroupService } from '@/services/route-group-service';
import { notFound } from 'next/navigation';
import RouteGroupHero from '@/components/heroes/RouteGroupHero';
import RouteGroupRoutesGrid from '@/components/grids/RouteGroupRoutesGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import type { Route } from '@/contentful-types';

interface RouteGroupDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function RouteGroupDetailPage({ params }: RouteGroupDetailPageProps) {
  try {
    const { slug } = await params;
    const data = await routeGroupService.getRouteGroupBySlug(slug);
    const routeGroup = data?.routeGroupCollection?.items?.[0];


    if (!routeGroup) {
      notFound();
    }


    return (
      <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
        <RouteGroupHero routeGroup={routeGroup} />
        
        <div className="container mx-auto px-4 py-8">
          {routeGroup.description && (
            <AnimatedSection delay={100}>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">Sobre estas rutas</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                  {routeGroup.description}
                </p>
              </div>
            </AnimatedSection>
          )}

          {routeGroup.mapIframe?.json && (
            <AnimatedSection delay={200}>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">Mapa del Área</h2>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 max-w-[80%] mx-auto">
                  <RichTextRenderer 
                    richTextJson={routeGroup.mapIframe.json}
                    className="w-full"
                  />
                </div>
              </div>
            </AnimatedSection>
          )}

          {routeGroup.routesCollection?.items && routeGroup.routesCollection.items.length > 0 && (
            <RouteGroupRoutesGrid
              routes={routeGroup.routesCollection.items.filter(Boolean) as Route[]}
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
