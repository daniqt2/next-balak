'use client';

import { useEffect, useState } from 'react';
import { coffeeService } from '@/services/coffee-service';
import CoffeeStopCard from '@/components/cards/CoffeeStopCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Coffee, Search, MapPin } from 'lucide-react';
import type { InterestSpot } from '@/contentful-types';

export default function CoffeeSpotsPage() {
  const [coffeeSpots, setCoffeeSpots] = useState<InterestSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoffeeSpots() {
      try {
        const data = await coffeeService.getCoffeeSpots({ limit: 50 });
        const spots = data.interestSpotCollection?.items?.filter((item): item is InterestSpot => item !== null) || [];
        setCoffeeSpots(spots);
      } catch (error) {
        console.error('Error fetching coffee spots:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCoffeeSpots();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading coffee spots...</div>
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
                Puntos de Café
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Descubre los mejores lugares para tomar café durante tus rutas de ciclismo
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
                <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">{coffeeSpots.length}</h3>
                <p className="text-gray-300">Puntos de Café</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
                <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">
                  {new Set(coffeeSpots.map(spot => spot?.locationName).filter(Boolean)).size}
                </h3>
                <p className="text-gray-300">Ubicaciones Únicas</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
                <Search className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-bold text-xl">
                  {coffeeSpots.filter(spot => spot?.description).length}
                </h3>
                <p className="text-gray-300">Con Descripción</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Coffee Spots Grid */}
          <AnimatedSection delay={300}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Todos los Puntos de Café</h2>
              {coffeeSpots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coffeeSpots.map((coffeeSpot, index) => (
                    <div
                      key={coffeeSpot?.sys.id}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        opacity: 0,
                        transform: 'translateY(20px)'
                      }}
                    >
                      <CoffeeStopCard coffeeStop={coffeeSpot} index={index} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Coffee className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-gray-400 text-lg">No se encontraron puntos de café</h3>
                  <p className="text-gray-500">Vuelve más tarde para ver nuevos puntos de café</p>
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
