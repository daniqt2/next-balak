'use client';
import type { RouteGroup } from '@/contentful-types';

import { useRouteGroups } from '@/hooks/useRouteGroups';

import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedSection from '@/components/ui/AnimatedSection';
import RouteGroupDisplay from '@/components/lists/RouteGroupDisplay';

interface RouteGroupGridProps {
  routes?: Array<{
    sys: {
      id: string;
    };
    title?: string | null;
    subTitle?: string | null;
    slug?: string | null;
    length?: number | null;
    elevation?: number | null;
    time?: string | null;
    startLocationName?: string | null;
    endLocationName?: string | null;
    headerImage?: {
      url?: string | null;
      title?: string | null;
    } | null;
  }>;
  title?: string;
  subtitle?: string;
  fetchData?: boolean;
}

export default function RouteGroupGrid({ routes, title = "", subtitle = "", fetchData = false }: RouteGroupGridProps) {
  const { routeGroups, loading, error } = useRouteGroups(fetchData ? 20 : 0);

  const displayRoutes = fetchData ? routeGroups : routes;
  
  if (loading) {
    return (
      <AnimatedSection delay={200}>
        <div className="text-center py-12">
          <div className="text-balak-400 text-lg mb-4 animate-pulse">Cargando...</div>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection delay={200}>
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-4">Error de carga</div>
          <p className="text-gray-500">Por favor intenta de nuevo más tarde.</p>
        </div>
      </AnimatedSection>
    );
  }

  if (!displayRoutes || displayRoutes.length === 0) {
    return (
      <AnimatedSection delay={200}>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No se encontraron rutas</div>
          <p className="text-gray-500">Las rutas aparecerán aquí una vez que se agreguen.</p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={200}>
      <div className="mb-12">
        <SectionTitle
          variant="primary"
          title={title}
          subtitle={subtitle}
          className="section-title--routes"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRoutes.map((routeGroup, index) => (
            <AnimatedSection 
              key={routeGroup?.sys?.id || index} 
              delay={300 + (index * 100)}
              direction="up"
            >
              <RouteGroupDisplay routeGroup={routeGroup as RouteGroup} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}