'use client';

import React from 'react';
import { useRoutes } from '@/hooks/useRoutes';
import { getDifficultyColor, calculateDifficulty } from '@/lib/route-utils';
import SmallElevationGraph from '../ui/SmallElevationGraph';
import AnimatedSection from '../ui/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { Route, Clock, TrendingUp, MapPin } from 'lucide-react';

export default function FeaturedRoutesGrid() {
  const { routes, loading, error } = useRoutes(6);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-balak-400 text-lg mb-4">Cargando rutas...</div>
        <p className="text-gray-500">Por favor espera mientras cargamos las mejores rutas.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">Error cargando rutas</div>
        <p className="text-gray-500">Por favor intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!routes || routes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">No se encontraron rutas</div>
        <p className="text-gray-500">Las rutas aparecerán aquí una vez que se agreguen.</p>
      </div>
    );
  }

  const featuredRoute = routes[0];
  const previewRoutes = routes.slice(1, 4);

  return (
    <div className="space-y-12">
      {/* Featured Hero Card */}
      <AnimatedSection delay={100}>
        <Link href={`/ruta/${featuredRoute.slug}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-balak-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-balak-500/10">
            {/* Background Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
              {featuredRoute.headerImage?.url ? (
                <Image
                  src={featuredRoute.headerImage.url}
                  alt={featuredRoute.headerImage.title || featuredRoute.title || 'Ruta destacada'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <Route size={64} className="text-balak-500/50" />
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <div className="max-w-4xl">
                  {/* Featured Badge
                  <div className="inline-flex items-center gap-2 bg-balak-500/20 backdrop-blur-sm border border-balak-500/30 rounded-full px-4 py-2 mb-4">
                    <div className="w-2 h-2 bg-balak-500 rounded-full animate-pulse" />
                    <span className="text-balak-300 text-sm font-medium">TODO ALGO AQUI?</span>
                  </div> */}
                  
                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-balak-300 transition-colors duration-300">
                    {featuredRoute.title}
                  </h3>
                  
                  {/* Subtitle */}
                  {featuredRoute.subTitle && (
                    <p className="text-lg sm:text-xl text-balak-200 mb-6 max-w-2xl">
                      {featuredRoute.subTitle}
                    </p>
                  )}
                  
                  {/* Stats */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-white">
                      <Clock size={20} className="text-balak-400" />
                      <span className="font-medium">{featuredRoute.time || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp size={20} className="text-balak-400" />
                      <span className="font-medium">{featuredRoute.length ? `${featuredRoute.length} km` : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <MapPin size={20} className="text-balak-400" />
                      <span className="font-medium">{featuredRoute.startLocationName || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </AnimatedSection>

      {/* Preview Grid */}
      <AnimatedSection delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewRoutes.map((route, index) => (
            <AnimatedSection 
              key={route?.sys?.id || index} 
              delay={300 + (index * 100)}
              direction="up"
            >
              <Link href={`/ruta/${route.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl bg-charcoal-800 border border-gray-700 hover:border-balak-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-balak-500/5 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48">
                    {route.headerImage?.url ? (
                      <Image
                        src={route.headerImage.url}
                        alt={route.headerImage.title || route.title || 'Ruta'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <Route size={32} className="text-balak-500/50" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(calculateDifficulty(route.elevation || 0, route.length || 1))}`}>
                        {route.elevation && route.elevation > 1800 ? 'Difícil' : route.elevation && route.elevation > 600 ? 'Medio' : 'Fácil'}
                      </span>
                    </div>
                    
                    {/* Small Elevation Graph */}
                    <div className="absolute bottom-3 right-3">
                      <SmallElevationGraph 
                        elevation={route.elevation || 0} 
                        difficulty={calculateDifficulty(route.elevation || 0, route.length || 1)}
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-balak-300 transition-colors duration-200">
                      {route.title}
                    </h4>
                    
                    {route.subTitle && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {route.subTitle}
                      </p>
                    )}
                    
                    {/* Quick Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{route.length ? `${route.length} km` : 'N/A'}</span>
                      <span>{route.time || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
