import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Route, MapPin, Clock, TrendingUp } from 'lucide-react';
import { formatRouteMetrics, getDifficultyColor } from '@/lib/route-utils';

interface RouteGroupCardProps {
  route: {
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
  };
}

export default function RouteGroupCard({ route }: RouteGroupCardProps) {
  if (!route) return null;

  const metrics = formatRouteMetrics(route);

  return (
    <Link href={`/route/${route.slug}`}>
      <div 
        className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-xl hover:border-balak-500/30 transition-all duration-300 cursor-pointer"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
          {route.headerImage?.url ? (
            <Image
              src={route.headerImage.url}
              alt={route.headerImage.title || route.title || 'Route image'}
              fill
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 flex items-center justify-center">
              <Route size={48} color="#f59e0b" style={{ opacity: 0.6 }} />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Difficulty Badge */}
          {metrics && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${getDifficultyColor(metrics.difficulty)}`}>
              {metrics.difficulty}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 group-hover:text-balak-300 transition-colors">
            {route.title || 'Untitled Route'}
          </h3>
          
          {/* Subtitle */}
          {route.subTitle && (
            <p className="text-charcoal-300 text-sm mb-4 line-clamp-2">
              {route.subTitle}
            </p>
          )}

          {/* Route Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {route.length && (
              <div className="flex items-center gap-2 text-charcoal-400">
                <Route size={16} color="currentColor" />
                <span className="text-sm">{route.length} km</span>
              </div>
            )}
            
            {route.elevation && (
              <div className="flex items-center gap-2 text-charcoal-400">
                <TrendingUp size={16} color="currentColor" />
                <span className="text-sm">{route.elevation} m</span>
              </div>
            )}
          </div>

          {/* Location Info */}
          {(route.startLocationName || route.endLocationName) && (
            <div className="flex items-center gap-2 text-charcoal-400 mb-4">
              <MapPin size={16} color="currentColor" />
              <span className="text-sm truncate">
                {route.startLocationName && route.endLocationName 
                  ? `${route.startLocationName} → ${route.endLocationName}`
                  : route.startLocationName || route.endLocationName
                }
              </span>
            </div>
          )}

          {/* Time */}
          {route.time && (
            <div className="flex items-center gap-2 text-charcoal-400">
              <Clock size={16} color="currentColor" />
              <span className="text-sm">{route.time}</span>
            </div>
          )}

          {/* View Route Button */}
          <div className="mt-auto pt-4">
            <div className="text-balak-400 text-sm font-medium group-hover:text-balak-300 transition-colors">
              View Route →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}