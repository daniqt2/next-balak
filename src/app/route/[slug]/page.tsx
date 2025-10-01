import { routeService } from '@/services/route-service';
import { notFound } from 'next/navigation';
import RouteMetric, { RouteMetricIcons } from '@/components/RouteMetric';
import StickyStravaMap from '@/components/StickyStravaMap';
import RouteHero from '@/components/RouteHero';
import CoffeeStopsCarousel from '@/components/CoffeeStopsCarousel';
import MountainsCarousel from '@/components/MountainsCarousel';
import AnimatedSection from '@/components/AnimatedSection';
import '@/styles/stickyMap.css';
import '@/styles/coffeeStopCard.css';

interface RouteDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function RouteDetailPage({ params }: RouteDetailPageProps) {
  try {
    const data = await routeService.getRouteBySlug(params.slug);
    const route = data.routeCollection?.items?.[0];

    if (!route) {
      notFound();
    }

    console.log("route", route);

    return (
      <div className="min-h-screen bg-charcoal-900" style={{ paddingTop: '64px' }}>
        {/* Hero Section */}
        <RouteHero route={route} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">

              {route.description && (
                <AnimatedSection delay={100}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                    <p className="text-charcoal-300 text-lg leading-relaxed">
                      {route.description}
                    </p>
                  </div>
                </AnimatedSection>
              )}

              {/* Modern Stats Display */}
              <AnimatedSection delay={200}>
                <div className="mb-12">
                  <div className="flex flex-wrap gap-8 justify-center">
                    {route.length && (
                      <RouteMetric
                        value={route.length}
                        unit="km"
                        icon={RouteMetricIcons.ruler}
                      />
                    )}
                    
                    {route.elevation && (
                      <RouteMetric
                        value={route.elevation}
                        unit="m"
                        icon={RouteMetricIcons.elevation}
                      />
                    )}
                    
                    {route.time && (
                      <RouteMetric
                        value={route.time}
                        unit="duration"
                        icon={RouteMetricIcons.clock}
                      />
                    )}
                  </div>
                </div>
              </AnimatedSection>

              {(route.startLocationName || route.endLocationName) && (
                <AnimatedSection delay={300}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Route Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {route.startLocationName && (
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h3 className="text-balak-300 font-semibold mb-2">Start Location</h3>
                          <p className="text-white">{route.startLocationName}</p>
                        </div>
                      )}
                      {route.endLocationName && (
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h3 className="text-balak-300 font-semibold mb-2">End Location</h3>
                          <p className="text-white">{route.endLocationName}</p>
                        </div>
                        
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              )}


              {/* Coffee Stops Section */}
              {route.coffeStopsCollection?.items && route.coffeStopsCollection.items.length > 0 && (
                <AnimatedSection delay={500}>
                  <CoffeeStopsCarousel coffeeStops={route.coffeStopsCollection.items.filter(Boolean) as any} />
                </AnimatedSection>
              )}

              {/* Mountains Section */}
              {route.mountainsCollection?.items && route.mountainsCollection.items.length > 0 && (
                <AnimatedSection delay={600}>
                  <MountainsCarousel mountains={route.mountainsCollection.items.filter(Boolean) as any} />
                </AnimatedSection>
              )}
            </div>

            {/* Sticky Sidebar Column */}
            <AnimatedSection delay={150} direction="right">
              <div className="lg:col-span-1">
                <StickyStravaMap route={route} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching route:', error);
    notFound();
  }
}
