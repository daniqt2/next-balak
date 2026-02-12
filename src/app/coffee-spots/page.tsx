'use client';
import dynamic from 'next/dynamic';
import { Coffee, Search, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { InterestSpot } from '@/contentful-types';

import { coffeeService } from '@/services/coffee-service';
import CoffeeStopCard from '@/components/cards/CoffeeStopCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PageHeader from '@/components/headers/pageHeader';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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

export default function CoffeeSpotsPage() {
  const [coffeeSpots, setCoffeeSpots] = useState<InterestSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoffeeSpots() {
      try {
        const data = await coffeeService.getCoffeeSpots({ limit: 10 });
        const spots =
          data?.interestSpotCollection?.items?.filter(
            (item): item is InterestSpot => item !== null
          ) || [];
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Cargando puntos de café...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-6 md:mt-10" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Cafés' }]} backHref="/" />
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Puntos de Café"
          description="Descubre los mejores lugares para tomar café durante tus rutas de ciclismo"
        />

        <AreaMap coffeePoints={coffeeSpots} />

        {/* USAR PARA OTRA COSAS */}
        {/* 
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-charcoal-800 p-6 rounded-xl border border-gray-700 text-center">
                <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              </div>
              <div className="bg-charcoal-800 p-6 rounded-xl border border-gray-700 text-center">
                <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              </div>
              <div className="bg-charcoal-800 p-6 rounded-xl border border-gray-700 text-center">
                <Search className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              </div>
            </div>
          </AnimatedSection> */}

        {/* Coffee Spots Grid */}
        <AnimatedSection delay={300}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6 uppercase">
              Nuestras ultimas paradas
            </h2>
            {coffeeSpots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coffeeSpots.map((coffeeSpot, index) => (
                  <div
                    key={coffeeSpot?.sys.id}
                    className="fade-in-up-item"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CoffeeStopCard coffeeStop={coffeeSpot} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Coffee className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-gray-400 text-lg">
                  No se encontraron puntos de café
                </h3>
                <p className="text-gray-500">
                  Vuelve más tarde para ver nuevos puntos de café
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
