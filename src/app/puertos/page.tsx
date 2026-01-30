'use client';
import dynamic from 'next/dynamic';
import { Mountain } from 'lucide-react';
import { useEffect, useState } from 'react';

import CollDisplay from '@/components/cards/CollDisplay';
import AnimatedSection from '@/components/ui/AnimatedSection';

import type { Coll } from '@/contentful-types';
import { collService } from '@/services/coll-service';
import PageHeader from '@/components/headers/pageHeader';

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

export default function MountainsPage() {
  const [colls, setColls] = useState<Coll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColls() {
      try {
        const data = await collService.getColls({ limit: 10 });
        const collData =
          data?.collCollection?.items?.filter(
            (item): item is Coll => item !== null
          ) || [];
        setColls(collData);
      } catch (error) {
        console.error('Error fetching colls:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchColls();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Puertos de montaña"
          description="Descubre los puertos de montaña más desafiantes y espectaculares incluidos en nuestras rutas de ciclismo"
        />

        <AreaMap coffeePoints={colls as any} variant="coll" height="500px" />

        {/* Mountains Grid */}
        <AnimatedSection delay={300}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase">
              Nuestros ultimos puertos
            </h2>
            {colls.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colls.map((coll, index) => (
                  <div
                    key={coll?.sys.id}
                    className="fade-in-up-item"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {coll ? <CollDisplay coll={coll} index={index} /> : null}
                  </div>
                ))}
              </div>
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
