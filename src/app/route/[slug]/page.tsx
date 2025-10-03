import { routeService } from '@/services/route-service';
import { notFound } from 'next/navigation';
import RouteMetric, { RouteMetricIcons } from '@/components/RouteMetric';
import StickyStravaMap from '@/components/StickyStravaMap';
import RouteHero from '@/components/RouteHero';
import CoffeeStopsCarousel from '@/components/CoffeeStopsCarousel';
import MountainsCarousel from '@/components/MountainsCarousel';
import AssetGrid from '@/components/AssetGrid';
import AnimatedSection from '@/components/AnimatedSection';
import '@/styles/stickyMap.css';
import '@/styles/coffeeStopCard.css';
import { Camera } from 'lucide-react';

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


    return (
      <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
        {/* Hero Section */}
        <RouteHero route={route} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">

            {route.description && (
                <AnimatedSection delay={100}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {route.description}
                    </p>
                  </div>
                </AnimatedSection>
              )}

               {/* Modern Stats Display */}
               <AnimatedSection delay={300}>
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
                        unit="tiempo"
                        icon={RouteMetricIcons.clock}
                      />
                    )}
                  </div>
                </div>
              </AnimatedSection>



              {(route.startLocationName || route.endLocationName) && (
                <AnimatedSection delay={400}>
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


 {/* Mountains Section */}
 {route.mountainsCollection?.items && route.mountainsCollection.items.length > 0 && (
                <AnimatedSection delay={600}>
                  <MountainsCarousel mountains={route.mountainsCollection.items.filter(Boolean) as any} />
                </AnimatedSection>
              )}

              {/* Coffee Stops Section */}
              {route.coffeStopsCollection?.items && route.coffeStopsCollection.items.length > 0 && (
                <AnimatedSection delay={500}>
                  <CoffeeStopsCarousel coffeeStops={route.coffeStopsCollection.items.filter(Boolean) as any} />
                </AnimatedSection>
              )}

            </div>

            {/* Sticky Sidebar Column */}
            <AnimatedSection delay={150} direction="right">
              <div className="lg:col-span-1 space-y-8">

                 {/* Image Gallery in Sidebar */}
                 {route.mainCarouselCollection?.items && route.mainCarouselCollection.items.length > 0 && (
                  <AnimatedSection delay={300}>
                    <AssetGrid
                      assets={route.mainCarouselCollection.items}
                      title="Galería de Imágenes"
                      icon={<Camera className="w-6 h-6 text-balak-400" />}
                      variant="compact"
                    />
                  </AnimatedSection>
                )}

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
