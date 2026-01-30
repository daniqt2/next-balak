import AnimatedSection from '@/components/ui/AnimatedSection';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import AssetGrid from '@/components/grids/AssetGrid';

import { collService } from '@/services/coll-service';
import Image from 'next/image';
import {
  BarChart3,
  MapPin,
  Mountain,
  Percent,
  TrendingUp,
  Images,
  Camera,
} from 'lucide-react';
import { notFound } from 'next/navigation';

interface MountainDetailPageProps {
  params: {
    id: string;
  };
}

function getDifficultyDotClass(difficulty?: string | null): string {
  if (!difficulty) return 'bg-gray-400';
  const d = difficulty.toLowerCase();
  if (d.includes('easy')) return 'bg-balak-500';
  if (d.includes('medium') || d.includes('intermediate'))
    return 'bg-balak-orange-500';
  if (d.includes('hard') || d.includes('difficult')) return 'bg-balak-red-500';
  return 'bg-gray-400';
}

export default async function MountainDetailPage({
  params,
}: MountainDetailPageProps) {
  try {
    const { id } = await params;
    const data = await collService.getCollById(id);
    const coll = data.coll;

    if (!coll) {
      notFound();
    }

    return (
      <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        {/* Hero */}
        <div className="relative w-full h-[420px] bg-charcoal-900 overflow-hidden">
          {coll.header?.url ? (
            <Image
              src={coll.header.url}
              alt={coll.header.title || coll.name || 'Puerto'}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal-800 to-charcoal-900 flex items-center justify-center">
              <Mountain className="w-20 h-20 text-balak-orange-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container mx-auto px-4 pb-10">
              <h1 className="text-white text-4xl md:text-6xl font-bold uppercase">
                {coll.name || 'Puerto'}
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {(coll as any).description?.json && (
                <AnimatedSection delay={200}>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-4 uppercase">
                      Sobre este puerto
                    </h2>
                    <RichTextRenderer
                      richTextJson={(coll as any).description.json}
                      className="text-charcoal-500 text-lg leading-relaxed"
                    />
                  </div>
                </AnimatedSection>
              )}

              {/* Coll Images Gallery */}
              {(coll as any).imagesCollection?.items &&
                (coll as any).imagesCollection.items.filter(Boolean).length >
                  0 && (
                  <AnimatedSection delay={300}>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase flex items-center gap-2">
                        <Images className="w-5 h-5 text-balak-700" />
                        Galería
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {(coll as any).imagesCollection.items
                          .filter(Boolean)
                          .map((img: any) => (
                            <div
                              key={img.sys.id}
                              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-100"
                            >
                              {img.url ? (
                                <Image
                                  src={img.url}
                                  alt={img.title || coll.name || 'Imagen'}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 33vw"
                                  className="object-cover"
                                />
                              ) : null}
                            </div>
                          ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )}

              {/* Variants Section */}
              {Array.isArray((coll as any).variantsCollection?.items) &&
                (coll as any).variantsCollection.items.filter(Boolean).length >
                  0 && (
                  <AnimatedSection delay={350}>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase">
                        Variantes
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(coll as any).variantsCollection.items
                          .filter(Boolean)
                          .map((variant: any, idx: number) => (
                            <div
                              key={variant?.sys?.id || idx}
                              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
                            >
                              <div className="flex items-start gap-4">
                                <div className="bg-balak-orange-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                                  <Mountain
                                    className="w-6 h-6 text-white"
                                    strokeWidth={2}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg md:text-xl font-bold text-charcoal-900 mb-1 truncate">
                                    {variant?.startLocation
                                      ? `Ascenso desde ${variant.startLocation}`
                                      : `Variante ${idx + 1}`}
                                  </h3>

                                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-charcoal-600 text-sm mt-2">
                                    {variant?.difficulty && (
                                      <span className="inline-flex items-center px-1 py-0.5 rounded-full  text-charcoal-700 text-xs font-medium">
                                        <span
                                          className={`inline-block w-2 h-2 rounded-full mr-2 ${getDifficultyDotClass(
                                            variant.difficulty
                                          )}`}
                                        />
                                        <span className="sr-only">
                                          {variant.difficulty}
                                        </span>
                                      </span>
                                    )}
                                    {variant?.length != null && (
                                      <span className="flex items-center gap-1">
                                        <BarChart3 className="w-4 h-4" />
                                        {variant.length} km
                                      </span>
                                    )}
                                    {variant?.accumulatedHeight != null && (
                                      <span className="flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4" />
                                        {variant.accumulatedHeight} mD+
                                      </span>
                                    )}
                                    {variant?.slopePercentage != null && (
                                      <span className="flex items-center gap-1">
                                        <Percent className="w-4 h-4" />
                                        {variant.slopePercentage}%
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
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
                  {/* Quick Info */}
                  <div className="bg-white rounded-xl p-6 border shadow-sm">
                    <h3 className="text-charcoal-800 font-bold text-lg mb-4 flex items-center gap-2">
                      <Mountain className="w-5 h-5 text-balak-400" />
                      INFO
                    </h3>
                    <div className="space-y-2 text-md text-charcoal-600">
                      {coll.location?.lat && coll.location?.lon && (
                        <div className="pt-3 mt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-balak-400" />
                            <a
                              href={`https://www.google.com/maps?q=${coll.location.lat},${coll.location.lon}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-charcoal-500 hover:text-charcoal-800 underline transition-colors text-sm"
                            >
                              Ver puerto en Google Maps
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Images below INFO */}
                  {(coll as any).imagesCollection?.items &&
                    (coll as any).imagesCollection.items.filter(Boolean)
                      .length > 0 && (
                      <AssetGrid
                        assets={(coll as any).imagesCollection.items}
                        title="Galería"
                        icon={<Camera className="w-6 h-6 text-balak-700" />}
                        variant="compact"
                      />
                    )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching coll:', error);
    notFound();
  }
}
