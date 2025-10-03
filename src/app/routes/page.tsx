'use client';

import React from 'react';
import { RouteGrid } from '@/components/RouteGrid';
import AnimatedSection from '@/components/AnimatedSection';

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-900 pt-[64px]">
      <div className="container mx-auto px-4 py-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Todas nuestras
              <span 
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #bfe23a, #a6c92f, #86a827)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Rutas
              </span>
            </h1>
            <p className="text-xl text-balak-200 max-w-3xl mx-auto">
            Explora todas las rutas de ciclismo que hemos probado y que recomendamos
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <RouteGrid />
        </AnimatedSection>
      </div>
    </div>
  );
}
