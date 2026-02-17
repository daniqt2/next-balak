'use client';

import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Download } from 'lucide-react';

const GPXMap = dynamic(() => import('./GPXMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full rounded-xl bg-charcoal-800 flex items-center justify-center text-gray-300"
      style={{ minHeight: 400, height: '500px' }}
    >
      <span className="text-lg">Cargando mapa...</span>
    </div>
  ),
});

export type MapMarker = { lat: number; lon: number; label: string };

interface RouteGPXMapProps {
  gpxUrl: string;
  fileName?: string | null;
  title?: string;
  delay?: number;
  height?: string;
  className?: string;
  collMarkers?: MapMarker[];
  coffeeStopMarkers?: MapMarker[];
}

export default function RouteGPXMap({
  gpxUrl,
  fileName,
  title = 'Mapa de la Ruta',
  delay = 200,
  height = '500px',
  className = '',
  collMarkers,
  coffeeStopMarkers,
}: RouteGPXMapProps) {
  if (!gpxUrl) {
    return null;
  }

  const normalizeGpxFilename = (input?: string | null) => {
    const raw = (input || 'route.gpx').trim();
    if (!raw) return 'route.gpx';
    if (raw.toLowerCase().endsWith('.gpx')) return raw;
    if (raw.toLowerCase().endsWith('.xml')) return raw.slice(0, -4) + '.gpx';
    // if there's some other extension, keep base name but force .gpx
    const lastDot = raw.lastIndexOf('.');
    if (lastDot > 0) return raw.slice(0, lastDot) + '.gpx';
    return raw + '.gpx';
  };

  async function handleDownload() {
    const name = normalizeGpxFilename(fileName);
    try {
      const res = await fetch(gpxUrl);
      if (!res.ok) throw new Error('Fetch failed');
      const buffer = await res.arrayBuffer();
      const blob = new Blob([buffer], { type: 'application/gpx+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(gpxUrl, '_blank');
    }
  }

  return (
    <AnimatedSection delay={delay}>
      <div className={`mb-8 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal-900 uppercase">
            {title}
          </h2>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-balak-500 text-charcoal-900 px-4 py-2  font-semibold rounded-lg hover:bg-balak-500 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Descargar GPX
          </button>
        </div>
        <GPXMap
          gpxUrl={gpxUrl}
          height={height}
          className="mb-6"
          collMarkers={collMarkers}
          coffeeStopMarkers={coffeeStopMarkers}
        />
      </div>
    </AnimatedSection>
  );
}
