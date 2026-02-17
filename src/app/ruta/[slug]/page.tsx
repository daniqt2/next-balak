import type { Metadata } from 'next';
import { getRouteBySlugCached } from '@/lib/contentful-cache';
import { notFound } from 'next/navigation';
import StickyStravaMap from '@/components/maps/StickyStravaMap';
import RouteGPXMap from '@/components/maps/RouteGPXMap';
import RouteHero from '@/components/heroes/RouteHero';
import CoffeeStopsCarousel from '@/components/carousels/CoffeeStopsCarousel';
import CollVariantsList from '@/components/lists/CollVariantsList';
import AssetGrid from '@/components/grids/AssetGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';
import '@/styles/stickyMap.css';
import '@/styles/coffeeStopCard.css';
import { Camera } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface RouteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RouteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await getRouteBySlugCached(slug);
    const route = data?.routeCollection?.items?.[0];
    if (!route) notFound();
    const title = route.title ?? 'Ruta';
    const description = `Ruta de ciclismo: ${title}. Distancia, desnivel y paradas de café.`;
    return {
      title,
      description,
      openGraph: { title: `${title} | BALAK RIDE`, description },
    };
  } catch {
    notFound();
  }
}

export default async function RouteDetailPage({
  params,
}: RouteDetailPageProps) {
  const { slug } = await params;
  try {
    const data = await getRouteBySlugCached(slug);
    const route = data?.routeCollection?.items?.[0];

    if (!route) {
      notFound();
    }

    const collItems = (route as any).collsCollection?.items ?? [];
    const collMarkers = collItems
      .map((item: any) => {
        const coll = item?.linkedFrom?.entryCollection?.items?.find(
          (e: any) => e?.__typename === 'Coll'
        );
        const loc = coll?.location;
        if (loc?.lat == null || loc?.lon == null) return null;
        return { lat: loc.lat, lon: loc.lon, label: coll?.name ?? 'Puerto' };
      })
      .filter(Boolean) as { lat: number; lon: number; label: string }[];

    const coffeeItems = route.coffeStopsCollection?.items ?? [];
    const coffeeStopMarkers = coffeeItems
      .map((item: any) => {
        const loc = item?.location;
        if (loc?.lat == null || loc?.lon == null) return null;
        return {
          lat: loc.lat,
          lon: loc.lon,
          label: item?.title ?? 'Parada café',
        };
      })
      .filter(Boolean) as { lat: number; lon: number; label: string }[];

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        {/* Hero Section */}
        <RouteHero route={route} />

        <Breadcrumbs
          items={[
            { label: 'Rutas', href: '/rutas' },
            { label: route.title ?? 'Ruta' },
          ]}
          backHref="/rutas"
        />
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
                    <div className="text-charcoal-500 text-lg leading-relaxed whitespace-pre-line">
                      {route.description}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Modern Stats Display */}
              <AnimatedSection delay={300}>
                <div className="mb-12">
                  <div className="flex flex-wrap gap-4 justify-center">
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
                          MD+
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>

              {/* GPX Map Section */}
              {(route as any).gpx?.url ? (
                <RouteGPXMap
                  gpxUrl={(route as any).gpx.url}
                  fileName={(route as any).gpx.fileName}
                  collMarkers={collMarkers}
                  coffeeStopMarkers={coffeeStopMarkers}
                />
              ) : (
                <AnimatedSection delay={200}>
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 uppercase mb-4">
                      Mapa de la Ruta
                    </h2>
                    <div className="w-full rounded-xl bg-charcoal-800 flex items-center justify-center text-gray-400 py-12 px-4 min-h-[300px]">
                      No hay archivo GPX vinculado para esta ruta en Contentful.
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Coll Variants Section */}
              {(route as any).collsCollection?.items &&
                (route as any).collsCollection.items.length > 0 && (
                  <div className="my-12">
                    <AnimatedSection delay={600}>
                      <CollVariantsList
                        variants={
                          (route as any).collsCollection.items.filter(
                            Boolean
                          ) as any
                        }
                      />
                    </AnimatedSection>
                  </div>
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
                        icon={<Camera className="w-6 h-6 text-balak-700" />}
                        variant="compact"
                      />
                    </AnimatedSection>
                  )}
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
