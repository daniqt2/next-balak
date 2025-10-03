'use client';

import { useEffect, useState } from 'react';
import { mountainService } from '@/services/mountain-service';
import MountainCard from '@/components/MountainCard';
import AnimatedSection from '@/components/AnimatedSection';
import { Mountain, Search, Filter } from 'lucide-react';
import type { InterestSpot } from '@/contentful-types';

export default function MountainsPage() {
  const [mountains, setMountains] = useState<InterestSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMountains() {
      try {
        const data = await mountainService.getMountains({ limit: 50 });
        const mountainData = data.interestSpotCollection?.items?.filter((item): item is InterestSpot => item !== null) || [];
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
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading mountains...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
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

          {/* Stats Section */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
                <Mountain className="w-8 h-8 text-balak-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">{mountains.length}</h3>
                <p className="text-gray-300">Puertos en ruta</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
                <Filter className="w-8 h-8 text-balak-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">
                  {mountains.filter(m => m?.mountainDifficulty?.toLowerCase().includes('hard')).length}
                </h3>
                <p className="text-gray-300">Dificultad Alta</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
                <Search className="w-8 h-8 text-balak-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">
                  {mountains.filter(m => m?.mountainElevationGain && m.mountainElevationGain > 1000).length}
                </h3>
                <p className="text-gray-300">1000m+ Desnivel</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Mountains Grid */}
          <AnimatedSection delay={300}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Todas los puertos</h2>
              {mountains.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mountains.map((mountain, index) => (
                    <div
                      key={mountain?.sys.id}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        opacity: 0,
                        transform: 'translateY(20px)'
                      }}
                    >
                     {mountain ? <MountainCard mountain={mountain} index={index} /> : null}
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
