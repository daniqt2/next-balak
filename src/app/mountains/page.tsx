'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { mountainService } from '@/services/mountain-service';
import MountainCard from '@/components/cards/MountainCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Mountain, Search, Filter } from 'lucide-react';
import type { InterestSpot } from '@/contentful-types';
import MountainDisplay from '@/components/cards/MountainDisplay';

// Dynamically import AreaMap with SSR disabled to avoid window is not defined error
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
        <div className="text-white text-xl">Cargando puertos de montaña...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Puertos de montaña
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Descubre los puertos de montaña más desafiantes y espectaculares incluidos en nuestras rutas de ciclismo
              </p>
            </div>
          </AnimatedSection>

          <AreaMap
            coffeePoints={mountains}
            variant="mountain"
          />

          {/* Stats Section */}
          {/*  TODO - CREAR COMPONENTE PARA ESTADISTICAS */}
          {/* <div className="bg-charcoal-800 p-6 rounded-xl border border-gray-700 text-center">
                <Mountain className="w-8 h-8 text-balak-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">{mountains.length}</h3>
                <p className="text-gray-300">Puertos en ruta</p>
              </div> */}

          {/* Mountains Grid */}
          <AnimatedSection delay={300}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Todas los puertos</h2>
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

        <style jsx>{`
          .fade-in-up-item {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
}
