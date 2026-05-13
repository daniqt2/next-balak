'use client';

import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { RouteTrack } from './MultiGPXMap';

const MultiGPXMap = dynamic(() => import('./MultiGPXMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl overflow-hidden relative bg-gray-100 animate-pulse"
      style={{ height: '480px' }}
    >
      {/* fake grid lines */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border border-gray-300" />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-gray-500 animate-spin" />
        <span className="text-sm text-gray-400 font-medium">Cargando mapa…</span>
      </div>
    </div>
  ),
});

interface RouteGroupMultiGPXMapProps {
  routes: RouteTrack[];
  height?: string;
  delay?: number;
}

export default function RouteGroupMultiGPXMap({
  routes,
  height = '480px',
  delay = 200,
}: RouteGroupMultiGPXMapProps) {
  if (routes.length === 0) return null;

  return (
    <AnimatedSection delay={delay}>
      <div className="mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 uppercase mb-4">
          Mapa de las Rutas
        </h2>
        <MultiGPXMap routes={routes} height={height} className="mb-6" />
      </div>
    </AnimatedSection>
  );
}
