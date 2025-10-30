'use client';

import AnimatedSection from "@/components/ui/AnimatedSection";
import RouteGroupGrid from "@/components/grids/RouteGroupGrid";


export default function RouteGroupsPage() {
  return (
    <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
      {/* Floating corner title */}
      <section className="relative">
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6 lg:left-10 lg:top-10 z-10">
          <h1 className="text-left leading-tight">
            <span className="block text-white/85 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide">Nuestras</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold bg-gradient-to-tr from-[#bfe23a] via-[#a6c92f] to-[#86a827] bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">Rutas</span>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mb-6">
            Encuentra rutas por zonas y descubre los mejores lugares para rodar.
          </p>
          </h1>
        </div>
        <div className="h-32 sm:h-40 lg:h-48" />
      </section>

      <div className="container mx-auto px-4 pb-8 sm:pb-10 md:pb-12">
       

        {/* Route Groups Grid */}
        <RouteGroupGrid fetchData={true} />
      </div>
    </div>
  );
}
