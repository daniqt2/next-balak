'use client';

import AnimatedSection from "@/components/ui/AnimatedSection";
import RouteGroupGrid from "@/components/grids/RouteGroupGrid";


export default function RouteGroupsPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
      {/* Floating corner title */}
      <div className="container mx-auto px-4 py-8">
       <AnimatedSection delay={100}>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
               Nuestras rutas
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Descubre diferentes rutas agrupadas por área o tema
              </p>
            </div>
          </AnimatedSection>
      </div>

      <div className="container mx-auto px-4 pb-8 sm:pb-10 md:pb-12">
       

        {/* Route Groups Grid */}
        <RouteGroupGrid fetchData={true} />
      </div>
    </div>
  );
}
