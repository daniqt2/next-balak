import { coffeeService } from '@/services/coffee-service';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import VariantRoutesCarousel from '@/components/carousels/VariantRoutesCarousel';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import { getStopTypeLabel } from '@/helpers/coffee';
import Image from 'next/image';
import { Coffee, MapPin } from 'lucide-react';

interface CoffeeSpotDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CoffeeSpotDetailPage({
  params,
}: CoffeeSpotDetailPageProps) {
  try {
    const { id } = await params;
    const data = await coffeeService.getCoffeeSpotById(id);
    const coffeeSpot = data?.interestSpot;
    const relatedRoutes =
      coffeeSpot?.linkedFrom?.routeCollection?.items?.filter(Boolean) || [];

    if (!coffeeSpot) {
      notFound();
    }

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        {/* Hero */}
        <div className="relative w-full h-[360px] bg-charcoal-900 overflow-hidden">
          {coffeeSpot.headerImage?.url ? (
            <Image
              src={coffeeSpot.headerImage.url}
              alt={
                coffeeSpot.headerImage.title ||
                coffeeSpot.title ||
                'Coffee spot'
              }
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-800 to-charcoal-900 flex items-center justify-center">
              <Coffee className="w-20 h-20 text-amber-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container mx-auto px-4 pb-10">
              {getStopTypeLabel(coffeeSpot.stopType) && (
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm mb-3">
                  {getStopTypeLabel(coffeeSpot.stopType)}
                </span>
              )}
              <h1 className="text-white text-4xl md:text-6xl font-bold uppercase">
                {coffeeSpot.title || 'Punto de Café'}
              </h1>
              {coffeeSpot.locationName && (
                <p className="text-white/80 mt-3 text-sm md:text-base">
                  {coffeeSpot.locationName}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Info */}
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-balak-orange-500" />
                  Info
                </h2>

                {coffeeSpot.locationName && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-balak-500 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-charcoal-900 font-semibold">
                        {coffeeSpot.locationName}
                      </p>
                      {coffeeSpot.location?.lat && coffeeSpot.location?.lon && (
                        <a
                          href={`https://www.google.com/maps?q=${coffeeSpot.location.lat},${coffeeSpot.location.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-charcoal-500 hover:text-charcoal-900 underline transition-colors text-sm"
                        >
                          Ver en Google Maps
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Description */}
            {(coffeeSpot.fullDescription?.json || (coffeeSpot.description && (coffeeSpot.description as string).trim().length > 0)) && (
              <AnimatedSection delay={200}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-4">
                    Sobre el sitio:
                  </h2>
                  {coffeeSpot.fullDescription?.json ? (
                    <RichTextRenderer
                      richTextJson={coffeeSpot.fullDescription.json}
                      className="text-charcoal-600 leading-relaxed"
                    />
                  ) : (
                    <p className="text-charcoal-600 leading-relaxed whitespace-pre-line">
                      {coffeeSpot.description}
                    </p>
                  )}
                </div>
              </AnimatedSection>
            )}

            {/* Routes that include this spot */}
            {relatedRoutes.length > 0 && (
              <AnimatedSection delay={300}>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-4">
                    Rutas que lo incluyen
                  </h2>
                  <VariantRoutesCarousel routes={relatedRoutes as any} />
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coffee spot:', error);
    notFound();
  }
}
