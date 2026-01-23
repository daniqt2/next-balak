'use client';

import GPXMap from './GPXMap';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Download } from 'lucide-react';

interface RouteGPXMapProps {
  gpxUrl: string;
  fileName?: string | null;
  title?: string;
  delay?: number;
  height?: string;
  className?: string;
}

export default function RouteGPXMap({
  gpxUrl,
  fileName,
  title = 'Mapa de la Ruta',
  delay = 200,
  height = '500px',
  className = '',
}: RouteGPXMapProps) {
  if (!gpxUrl) {
    return null;
  }

  return (
    <AnimatedSection delay={delay}>
      <div className={`mb-8 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 uppercase">
            {title}
          </h2>
          <a
            href={gpxUrl}
            download={fileName || 'route.gpx'}
            className="inline-flex items-center gap-2 bg-balak-400 text-charcoal-900 px-4 py-2 font-semibold rounded-lg hover:bg-balak-500 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Descargar GPX
          </a>
        </div>
        <GPXMap gpxUrl={gpxUrl} height={height} className="mb-6" />
      </div>
    </AnimatedSection>
  );
}
