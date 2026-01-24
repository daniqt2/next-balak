import MountainImageGrid from '@/components/grids/MountainImageGrid';
import MountainHero from '@/components/heroes/MountainHero';
import AnimatedSection from '@/components/ui/AnimatedSection';

import type { Route as RouteType } from '@/contentful-types';
import { getMountainDifficultyText } from '@/helpers/mountain';
import { mountainService } from '@/services/mountain-service';
import '@/styles/mountainHero.css';
import {
  ArrowRight,
  BarChart3,
  Clock,
  MapPin,
  Mountain,
  Route,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MountainDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MountainDetailPage({
  params,
}: MountainDetailPageProps) {
  try {
    const { id } = await params;
    const data = await mountainService.getMountainById(id);
    const mountain = data.interestSpot;

    if (!mountain) {
      notFound();
    }

    const relatedRoutes =
      mountain.linkedFrom?.routeCollection?.items?.filter(
        (item): item is RouteType => item !== null
      ) || [];

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        <MountainHero mountain={mountain} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {mountain.description && (
                <AnimatedSection delay={200}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-4 uppercase">
                      Sobre este puerto
                    </h2>
                    <div>
                      <p className="text-charcoal-500 text-lg leading-relaxed">
                        {mountain.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}
              {mountain.locationName && (
                <AnimatedSection delay={100}>
                  <div className="mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-6 h-6 text-balak-400" />
                        <h3 className="text-charcoal-800 font-semibold">
                          Área
                        </h3>
                      </div>
                      <p className="text-charcoal-800 text-lg">
                        Ascenso desde: <b>{mountain.locationName}</b>
                      </p>
                      {mountain.location?.lat && mountain.location?.lon && (
                        <p className="text-charcoal-500 text-sm mt-2">
                          <a
                            href={`https://www.google.com/maps?q=${mountain.location.lat},${mountain.location.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-charcoal-500 hover:text-charcoal-800 underline transition-colors"
                          >
                            Ver puerto en Google Maps
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Route Images Gallery */}
              <AnimatedSection delay={300}>
                <MountainImageGrid routes={relatedRoutes as any} />
              </AnimatedSection>

              {/* Related Routes */}
              {relatedRoutes.length > 0 && (
                <AnimatedSection delay={400}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase">
                      Rutas que lo incluyen
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedRoutes.map((route: any, index: number) => (
                        <Link
                          key={route.sys.id}
                          href={`/ruta/${route.slug}`}
                          className="group block"
                        >
                          <div className="bg-charcoal-800 rounded-lg overflow-hidden border border-gray-700 hover:border-balak-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-balak-500/10 hover:-translate-y-1">
                            {route.headerImage?.url ? (
                              <div className="relative h-32">
                                <img
                                  src={route.headerImage.url}
                                  alt={
                                    route.headerImage.title ||
                                    route.title ||
                                    'Route image'
                                  }
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <div className="absolute top-3 right-3">
                                  <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            ) : (
                              <div className="relative h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                <Route className="w-8 h-8 text-gray-500" />
                                <div className="absolute top-3 right-3">
                                  <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                              </div>
                            )}
                            <div className="p-4">
                              <h3 className="text-white font-semibold text-base mb-1 group-hover:text-balak-300 transition-colors duration-300">
                                {route.title}
                              </h3>
                              {route.subTitle && (
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                  {route.subTitle}
                                </p>
                              )}
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                {route.length && (
                                  <span className="flex items-center gap-1">
                                    <BarChart3 className="w-3 h-3" />
                                    {route.length} km
                                  </span>
                                )}
                                {route.elevation && (
                                  <span className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {route.elevation} m
                                  </span>
                                )}
                                {route.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {route.time}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={150} direction="right">
                <div className="sticky top-24 space-y-6">
                  {/* Quick Stats Card */}
                  <div className="bg-white rounded-xl p-6 border shadow-xl">
                    <h3 className="text-charcoal-800 font-bold text-lg mb-4 flex items-center gap-2">
                      <Mountain className="w-5 h-5 text-balak-400" />
                      DATOS
                    </h3>
                    <div className="space-y-3">
                      {mountain.mountainDifficulty && (
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal-500">Dificultad</span>
                          <span className="text-charcoal-800 font-medium">
                            {getMountainDifficultyText(
                              mountain.mountainDifficulty
                            )}
                          </span>
                        </div>
                      )}
                      {mountain.mountainLength && (
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal-500">Longitud</span>
                          <span className="text-charcoal-800 font-medium">
                            {mountain.mountainLength} km
                          </span>
                        </div>
                      )}
                      {mountain.mountainElevationGain && (
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal-500">Desnivel</span>
                          <span className="text-charcoal-800 font-medium">
                            {mountain.mountainElevationGain} m
                          </span>
                        </div>
                      )}
                      {mountain.mountainMedPercent && (
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal-500">
                            Pendiente Media
                          </span>
                          <span className="text-charcoal-800 font-medium">
                            {mountain.mountainMedPercent}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching mountain:', error);
    notFound();
  }
}
