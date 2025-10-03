'use client';

import AnimatedSection from "@/components/AnimatedSection";
import RouteGroupGrid from "@/components/RouteGroupGrid";


export default function RouteGroupsPage() {
  return (
    <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Colecciones de
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
              Rutas agrupadas por área o tema - perfectas para explorar diferentes regiones y planificar tus paseos.
            </p>
          </div>
        </AnimatedSection>

        {/* Route Groups Grid */}
        <RouteGroupGrid
          fetchData={true}
        />
      </div>
    </div>
  );
}
