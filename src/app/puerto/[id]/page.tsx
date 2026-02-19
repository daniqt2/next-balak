import type { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import RichTextRenderer from '@/components/ui/RichTextRenderer';
import AssetGrid from '@/components/grids/AssetGrid';
import VariantRoutesCarousel from '@/components/carousels/VariantRoutesCarousel';

import { getCollByIdCached } from '@/lib/contentful-cache';
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
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { formatMetric } from '@/lib/route-utils';

interface MountainDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MountainDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getCollByIdCached(id);
    const coll = data?.coll;
    if (!coll) notFound();
    const title = coll.name ?? 'Puerto';
    const description = `Puerto de montaña: ${title}. Desnivel, dificultad y rutas que lo incluyen.`;
    return {
      title,
      description,
      openGraph: { title: `${title} | BALAK RIDE`, description },
    };
  } catch {
    notFound();
  }
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
  const { id } = await params;
  try {
    const data = await getCollByIdCached(id);
    const coll = data.coll;

    if (!coll) {
      notFound();
    }

    const variants = Array.isArray((coll as any).variantsCollection?.items)
      ? ((coll as any).variantsCollection.items.filter(Boolean) as any[])
      : [];

    const headerVariants = variants
      .map(v => ({
        name:
          typeof v?.startLocation === 'string' ? v.startLocation.trim() : '',
        difficulty:
          typeof v?.difficulty === 'string' ? (v.difficulty as string) : null,
      }))
      .filter(v => Boolean(v.name));

    const headerVisible = headerVariants.slice(0, 3);
    const headerRemaining = headerVariants.length - headerVisible.length;

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
              <h1 className="font-anton text-white text-6xl md:text-8xl font-bold uppercase">
                {coll.name || 'Puerto'}
              </h1>
              {headerVisible.length > 0 && (
                <p className="text-white/80 mt-3 text-sm md:text-base">
                  <span className="text-white/60">Se puede subir desde:</span>{' '}
                  {headerVisible.map((v, idx) => (
                    <span
                      key={`${v.name}-${idx}`}
                      className="inline-flex items-center"
                    >
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${getDifficultyDotClass(
                          v.difficulty
                        )}`}
                        aria-hidden="true"
                      />
                      <span>{v.name}</span>
                      {idx < headerVisible.length - 1 && (
                        <span className="mx-2 text-white/50">·</span>
                      )}
                    </span>
                  ))}
                  {headerRemaining > 0 && (
                    <span className="ml-2 text-white/60">
                      +{headerRemaining}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <Breadcrumbs
          items={[
            { label: 'Puertos', href: '/puertos' },
            { label: coll.name ?? 'Puerto' },
          ]}
          backHref="/puertos"
        />
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

              {/* Variants Section */}
              {Array.isArray((coll as any).variantsCollection?.items) &&
                (coll as any).variantsCollection.items.filter(Boolean).length >
                  0 && (
                  <AnimatedSection delay={350}>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase">
                        Ascenso por:
                      </h2>

                      {(coll as any).variantsCollection.items
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((variant: any, idx: number) => {
                          const routes =
                            variant?.linkedFrom?.routeCollection?.items?.filter(
                              Boolean
                            ) || [];

                          return (
                            <div
                              key={variant?.sys?.id || idx}
                              className="mb-12"
                            >
                              {/* Variant header + stats */}
                              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <div className="flex items-start justify-between gap-6 flex-wrap">
                                  <div className="min-w-0">
                                    <h3 className="text-xl md:text-2xl font-bold text-charcoal-900 mb-3">
                                      {variant?.startLocation
                                        ? `${idx === 0 ? 'A' : 'B'}. ${variant.startLocation}`
                                        : `Variante ${idx + 1}`}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-charcoal-600 text-sm">
                                      {variant?.difficulty && (
                                        <span className="inline-flex items-center">
                                          <span
                                            className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getDifficultyDotClass(
                                              variant.difficulty
                                            )}`}
                                          />
                                          <span className="sr-only">
                                            {variant.difficulty}
                                          </span>
                                        </span>
                                      )}
                                      {variant?.length != null && (
                                        <span className="flex items-center gap-2">
                                          <BarChart3 className="w-4 h-4" />
                                          {formatMetric(variant.length)} km
                                        </span>
                                      )}
                                      {variant?.slopePercentage != null && (
                                        <span className="flex items-center gap-2">
                                          <Percent className="w-4 h-4" />
                                          {formatMetric(
                                            variant.slopePercentage
                                          )}
                                          %
                                        </span>
                                      )}
                                      {variant?.accumulatedHeight != null && (
                                        <span className="flex items-center gap-2">
                                          <TrendingUp className="w-4 h-4" />
                                          {formatMetric(
                                            variant.accumulatedHeight
                                          )}{' '}
                                          mD+
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Routes section */}
                              <div className="mt-5">
                                {routes.length > 0 ? (
                                  <>
                                    <p className="text-xs uppercase tracking-wide text-charcoal-500 mb-4">
                                      Últimas rutas que incluyen este ascenso
                                    </p>
                                    <VariantRoutesCarousel routes={routes} />
                                  </>
                                ) : (
                                  <p className="text-charcoal-500 text-sm">
                                    No hay rutas asociadas a este ascenso
                                    todavía.
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
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
