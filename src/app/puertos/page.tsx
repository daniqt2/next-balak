'use client';
import dynamic from 'next/dynamic';
import { Mountain } from 'lucide-react';
import { useEffect, useState } from 'react';

import MountainDisplay from '@/components/cards/MountainDisplay';
import AnimatedSection from '@/components/ui/AnimatedSection';

import type { InterestSpot } from '@/contentful-types';
import { mountainService } from '@/services/mountain-service';
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
  const [mountains, setMountains] = useState<InterestSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMountains() {
      try {
        const data = await mountainService.getMountains({ limit: 50 });
        const mountainData = data?.interestSpotCollection?.items?.filter((item): item is InterestSpot => item !== null) || [];
        setMountains(mountainData);
      } catch (error) {
        console.error('Error fetching mountains:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMountains();
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
          <PageHeader title="Puertos de montaña" description="Descubre los puertos de montaña más desafiantes y espectaculares incluidos en nuestras rutas de ciclismo" />

          <AreaMap
            coffeePoints={mountains}
            variant="mountain"
            height="500px"
          />
         

          {/* Mountains Grid */}
          <AnimatedSection delay={300}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-charcoal-900 mb-6 uppercase">Todos los puertos</h2>
              {mountains.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mountains.map((mountain, index) => (
                    <div
                      key={mountain?.sys.id}
                      className="fade-in-up-item"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                     {mountain ? <MountainDisplay mountain={mountain} index={index} /> : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Mountain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-gray-400 text-lg">No se encontraron puertos</h3>
                  <p className="text-gray-500">Vuelve más tarde para ver nuevos puertos</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    );
}
