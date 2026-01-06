import { routeService } from '@/services/route-service';
import { notFound } from 'next/navigation';
import StickyStravaMap from '@/components/maps/StickyStravaMap';
import RouteHero from '@/components/heroes/RouteHero';
import CoffeeStopsCarousel from '@/components/carousels/CoffeeStopsCarousel';
import MountainsCarousel from '@/components/carousels/MountainsCarousel';
import AssetGrid from '@/components/grids/AssetGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import '@/styles/stickyMap.css';
import '@/styles/coffeeStopCard.css';
import { Camera } from 'lucide-react';

interface RouteDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RouteDetailPage({
  params,
}: RouteDetailPageProps) {
  try {
    const { slug } = await params;
    const data = await routeService.getRouteBySlug(slug);
    const route = data?.routeCollection?.items?.[0];

    if (!route) {
      notFound();
    }

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        {/* Hero Section */}
        <RouteHero route={route} />

        <div className="container mx-auto px-4 py-8 mt-12">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {route.description && (
                <AnimatedSection delay={100}>
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 mb-4 uppercase">
                      Descripción
                    </h2>
                    <p className="text-charcoal-500 text-lg leading-relaxed">
                      {route.description}
                    </p>
                  </div>
                </AnimatedSection>
              )}

              {/* Modern Stats Display */}
              <AnimatedSection delay={300}>
                <div className="mb-12">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {route.elevation && (
                      <div
                        className="bg-charcoal-800 px-8 py-6 min-w-[140px] text-center"
                        style={{
                          clipPath:
                            'polygon(12% 10%, 100% 2%, 98% 95%, 12% 100%, 0% 15%)',
                        }}
                      >
                        <p className="text-4xl md:text-5xl font-bold text-white mb-1">
                          {route.elevation}
                        </p>
                        <p className="text-white/80 text-sm uppercase tracking-wide">
                          M
                        </p>
                      </div>
                    )}

                    {route.length && (
                      <div
                        className="bg-charcoal-800 px-8 py-6 min-w-[140px] text-center"
                        style={{
                          clipPath:
                            'polygon(10% 10%, 95% 0%, 100% 98%, 8% 100%, 0% 40%)',
                        }}
                      >
                        <p className="text-4xl md:text-5xl font-bold text-white mb-1">
                          {route.length}
                        </p>
                        <p className="text-white/80 text-sm uppercase tracking-wide">
                          KM
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>

              {/* Mountains Section */}
              {route.mountainsCollection?.items &&
                route.mountainsCollection.items.length > 0 && (
                  <p className="my-12">
                    <AnimatedSection delay={600}>
                      <MountainsCarousel
                        mountains={
                          route.mountainsCollection.items.filter(Boolean) as any
                        }
                      />
                    </AnimatedSection>
                  </p>
                )}

              {/* Coffee Stops Section */}
              {route.coffeStopsCollection?.items &&
                route.coffeStopsCollection.items.length > 0 && (
                  <AnimatedSection delay={500}>
                    <CoffeeStopsCarousel
                      coffeeStops={
                        route.coffeStopsCollection.items.filter(Boolean) as any
                      }
                    />
                  </AnimatedSection>
                )}
            </div>

            {/* Sticky Sidebar Column */}
            <AnimatedSection delay={150} direction="right">
              <div className="lg:col-span-1 space-y-8">
                {/* Image Gallery in Sidebar */}
                {route.mainCarouselCollection?.items &&
                  route.mainCarouselCollection.items.length > 0 && (
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
