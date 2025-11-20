import { coffeeService } from '@/services/coffee-service';
import { notFound } from 'next/navigation';
import CoffeeSpotHero from '@/components/heroes/CoffeeSpotHero';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';
import { Coffee, MapPin, Route, ArrowRight, Clock, BarChart3, TrendingUp } from 'lucide-react';
import '@/styles/coffeeSpotHero.css';

interface CoffeeSpotDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CoffeeSpotDetailPage({ params }: CoffeeSpotDetailPageProps) {
  try {
    const data = await coffeeService.getCoffeeSpotById(params.id);
    const coffeeSpot = data.interestSpot;

    if (!coffeeSpot) {
      notFound();
    }


    const relatedRoutes = coffeeSpot.linkedFrom?.routeCollection?.items?.filter(Boolean) || [];

    return (
      <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
        <CoffeeSpotHero coffeeSpot={coffeeSpot} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {coffeeSpot.locationName && (
                <AnimatedSection delay={100}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Ubicación</h2>
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-6 h-6 text-amber-400" />
                        <h3 className="text-amber-300 font-semibold">Área</h3>
                      </div>
                      <p className="text-white text-lg">{coffeeSpot.locationName}</p>
                      {coffeeSpot.location?.lat && coffeeSpot.location?.lon && (
                        <p className="text-gray-400 text-sm mt-2">
                          <a 
                            href={`https://www.google.com/maps?q=${coffeeSpot.location.lat},${coffeeSpot.location.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-balak-400 hover:text-balak-300 underline transition-colors"
                          >
                            Ver en Google Maps
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {coffeeSpot.description && (
                <AnimatedSection delay={200}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Sobre este Punto de Café</h2>
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {coffeeSpot.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {relatedRoutes.length > 0 && (
                <AnimatedSection delay={300}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Rutas que Incluyen este Punto de Café</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {relatedRoutes.map((route: any, index: number) => (
                        <Link 
                          key={route.sys.id} 
                          href={`/route/${route.slug}`}
                          className="group block"
                        >
                          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
                            {route.headerImage?.url ? (
                              <div className="relative h-32">
                                <img
                                  src={route.headerImage.url}
                                  alt={route.headerImage.title || route.title || 'Route image'}
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
                              <h3 className="text-white font-semibold text-base mb-1 group-hover:text-amber-300 transition-colors duration-300">
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
                  {/* Coffee Spot Info Card */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-amber-400" />
                      Información
                    </h3>
                    <div className="space-y-3">
                      {coffeeSpot.locationName && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Ubicación</span>
                          <span className="text-white font-medium">{coffeeSpot.locationName}</span>
                        </div>
                      )}
                      {coffeeSpot.location?.lat && coffeeSpot.location?.lon && (
                        <p className="text-gray-400 text-sm mt-2">
                          <a 
                            href={`https://www.google.com/maps?q=${coffeeSpot.location.lat},${coffeeSpot.location.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-balak-400 hover:text-balak-300 underline transition-colors"
                          >
                            Ver en Google Maps
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Related Routes Count */}
                  {relatedRoutes.length > 0 && (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <Route className="w-5 h-5 text-amber-400" />
                        Rutas
                      </h3>
                      <p className="text-gray-300">
                        Este punto de café está incluido en <span className="text-amber-400 font-semibold">{relatedRoutes.length}</span> ruta{relatedRoutes.length !== 1 ? 's' : ''}.
                      </p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coffee spot:', error);
    notFound();
  }
}
