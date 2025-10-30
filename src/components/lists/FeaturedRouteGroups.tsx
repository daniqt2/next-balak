'use client';

import React from 'react';
import RouteGroupGrid from '../grids/RouteGroupGrid';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';

interface FeaturedRouteGroupsProps {
  routeGroups?: unknown[];
}

export default function FeaturedRouteGroups({ routeGroups }: FeaturedRouteGroupsProps) {
  return (
    <AnimatedSection delay={200}>
      <div className="mb-16">
        <SectionTitle
          title="Areas para explorar"
          subtitle="Rutas agrupadas por área o tema - perfectas para explorar diferentes regiones"
          className="section-title--routes"
        />
        
        <div className="mt-8">
          <RouteGroupGrid 
            fetchData={true}
            title=""
            subtitle=""
          />
        </div>
        
        <div className="text-center mt-8">
          <a href="/route-groups" className="inline-flex items-center text-balak-400 hover:text-balak-300 font-medium transition-colors duration-200 group">
            Ver Todas las Colecciones
            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
