'use client';

import React from 'react';
import { RouteGrid } from '@/components/RouteGrid';
import AnimatedSection from '@/components/AnimatedSection';

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-charcoal-900" style={{ paddingTop: '64px' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Todas las
              <span 
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #bfe23a, #a6c92f, #86a827)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Rutas de Ciclismo
              </span>
            </h1>
            <p className="text-xl text-balak-200 max-w-3xl mx-auto">
              Descubre nuestra colección completa de rutas de ciclismo, desde paseos fáciles y escénicos hasta aventuras desafiantes en montaña.
            </p>
          </div>
        </AnimatedSection>

        {/* Routes Grid */}
        <AnimatedSection delay={100}>
          <RouteGrid />
        </AnimatedSection>
      </div>
    </div>
  );
}
