'use client';

import dynamic from 'next/dynamic';
import { Mountain } from 'lucide-react';

import PagedGrid from '@/components/ui/PagedGrid';
import { usePagedItems } from '@/hooks/usePagedItems';

import CollDisplay from '@/components/cards/CollDisplay';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Coll } from '@/contentful-types';
import PageHeader from '@/components/headers/pageHeader';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const AreaMap = dynamic(() => import('@/components/map/AreaMap'), {
  ssr: false,
  loading: () => (
    <div className="py-12">
      <div className="h-[400px] w-full bg-charcoal-800 rounded-xl flex items-center justify-center">
        <div className="text-gray-400">Cargando mapa...</div>
      </div>
    </div>
  ),
});

const PAGE_SIZE = 8;

interface PuertosClientProps {
  colls: Coll[];
  mapColls: Coll[];
  /** How many puertos exist overall, so the rest can be prefetched. */
  total: number;
}

export default function PuertosClient({
  colls,
  mapColls,
  total,
}: PuertosClientProps) {
  const { items } = usePagedItems<Coll>({
    initialItems: colls,
    total,
    pageSize: PAGE_SIZE,
    endpoint: '/api/colls',
    idOf: (coll) => coll.sys.id,
  });
  return (
    <div className="min-h-screen mt-6 md:mt-10" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Puertos' }]} backHref="/" />
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Puertos de montaña"
          description="Descubre los puertos de montaña más desafiantes y espectaculares incluidos en nuestras rutas de ciclismo"
        />

        <AreaMap coffeePoints={mapColls as any} variant="coll" height="500px" />

        <AnimatedSection delay={300}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase">
              Nuestros ultimos puertos
            </h2>
            {items.length > 0 ? (
              <>
                <p className="mb-6 text-sm text-charcoal-600">
                  {items.length}{' '}
                  {items.length === 1
                    ? 'puerto encontrado'
                    : 'puertos encontrados'}
                </p>

                <PagedGrid<Coll>
                  items={items}
                  pageSize={PAGE_SIZE}
                  resetKey="all"
                  gridClassName="grid grid-cols-2 lg:grid-cols-4 gap-4"
                  keyFor={(coll) => coll.sys.id}
                  renderItem={(coll, index) => (
                    <CollDisplay coll={coll} index={index} />
                  )}
                  label="Paginación de puertos"
                />
              </>
            ) : (
              <div className="text-center py-12">
                <Mountain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-gray-400 text-lg">
                  No se encontraron puertos
                </h3>
                <p className="text-gray-500">
                  Vuelve más tarde para ver nuevos puertos
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
