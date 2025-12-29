'use client';

import React from 'react';
import { RouteGrid } from '@/components/grids/RouteGrid';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function RoutesPage() {
  return (
    <div className="min-h-screen pt-[64px]">
      <div className="container mx-auto px-4 py-8">
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
      </div>
     

      <div className="container mx-auto px-4 pb-8 sm:pb-10 md:pb-12">
        <AnimatedSection delay={100}>
          <RouteGrid />
        </AnimatedSection>
      </div>
    </div>
  );
}
