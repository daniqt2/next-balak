'use client';

import React from 'react';
import RouteGroupCard from './RouteGroupCard';
import SectionTitle from './SectionTitle';
import AnimatedSection from './AnimatedSection';
import { useRouteGroups } from '@/hooks/useRouteGroups';

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

export default function RouteGroupGrid({ routes, title = "Aventuras de Ciclismo", subtitle = "Explora viajes completos de ciclismo y aventuras de varios días", fetchData = false }: RouteGroupGridProps) {
  const { routeGroups, loading, error } = useRouteGroups(fetchData ? 20 : 0);
  
  // Use fetched data if fetchData is true, otherwise use passed routes
  const displayRoutes = fetchData ? routeGroups : routes;
  if (loading) {
    return (
      <AnimatedSection delay={200}>
        <div className="text-center py-12">
          <div className="text-balak-400 text-lg mb-4">Cargando aventuras de ciclismo...</div>
          <p className="text-charcoal-500">Por favor espera mientras cargamos los últimos viajes.</p>
        </div>
      </AnimatedSection>
    );
  }

  if (error) {
    return (
      <AnimatedSection delay={200}>
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-4">Error cargando aventuras</div>
          <p className="text-charcoal-500">Por favor intenta de nuevo más tarde.</p>
        </div>
      </AnimatedSection>
    );
  }

  if (!displayRoutes || displayRoutes.length === 0) {
    return (
      <AnimatedSection delay={200}>
        <div className="text-center py-12">
          <div className="text-charcoal-400 text-lg mb-4">No se encontraron aventuras de ciclismo</div>
          <p className="text-charcoal-500">Las aventuras aparecerán aquí una vez que se agreguen.</p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection delay={200}>
      <div className="mb-12">
        <SectionTitle
          title={title}
          subtitle={subtitle}
          className="section-title--routes"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRoutes.map((route, index) => (
            <AnimatedSection 
              key={route?.sys?.id || index} 
              delay={300 + (index * 100)}
              direction="up"
            >
              <RouteGroupCard route={route} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}