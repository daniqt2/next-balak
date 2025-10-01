import { routeGroupService } from '@/services/route-group-service';
import { notFound } from 'next/navigation';
import RouteGroupHero from '@/components/RouteGroupHero';
import RouteGroupGrid from '@/components/RouteGroupGrid';
import AnimatedSection from '@/components/AnimatedSection';

interface RouteGroupDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function RouteGroupDetailPage({ params }: RouteGroupDetailPageProps) {
  try {
    const data = await routeGroupService.getRouteGroupBySlug(params.slug);
    const routeGroup = data.routeGroupCollection?.items?.[0];

    if (!routeGroup) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-charcoal-900" style={{ paddingTop: '64px' }}>
        {/* Hero Section */}
        <RouteGroupHero routeGroup={routeGroup} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Description Section */}
          {routeGroup.description && (
            <AnimatedSection delay={100}>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4">About this Trip</h2>
                <p className="text-charcoal-300 text-lg leading-relaxed max-w-4xl">
                  {routeGroup.description}
                </p>
              </div>
            </AnimatedSection>
          )}

          {/* Routes Grid */}
          {routeGroup.routesCollection?.items && routeGroup.routesCollection.items.length > 0 && (
            <RouteGroupGrid 
              routes={routeGroup.routesCollection.items.filter(Boolean) as any}
              title="Routes in this Trip"
              subtitle={`${routeGroup.routesCollection.total} cycling routes from this adventure`}
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
