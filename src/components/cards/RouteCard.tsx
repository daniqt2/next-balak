'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Route } from '@/contentful-types';
import { formatRouteMetrics, getDifficultyColor } from '@/lib/route-utils';
import SmallElevationGraph from '../ui/SmallElevationGraph';

interface RouteCardProps {
  route: Route;
  index?: number;
}

export default function RouteCard({ route, index = 0 }: RouteCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardLink = `/route/${route.slug}`;
  const metrics = formatRouteMetrics(route);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const delay = index * 150;
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(card);

    return () => {
      observer.unobserve(card);
    };
  }, [index]);

  if (!route) return null;

  if (!route.headerImage?.url) return null;

  return (
    <article 
      ref={cardRef}
      className={`route-card ${isVisible ? 'route-card--visible' : ''}`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
      }}
    >
      <Link href={cardLink} className="block h-full">
        {!imageLoaded && (
          <div className="skeleton" />
        )}
        
        <Image
          src={route.headerImage.url}
          alt={route.title || 'Route image'}
          fill
          priority={isVisible}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          className={`image ${imageLoaded ? 'image--loaded' : 'image--loading'}`}
        />
        
        {/* Small elevation graph in corner */}
        {metrics && (
          <div className="elevation-corner">
            <SmallElevationGraph 
              elevation={route.elevation!} 
              difficulty={metrics.difficulty}
              className="w-16 h-8"
            />
          </div>
        )}
        
        <div className="overlay" aria-hidden="true" />

        <div className="info">
          {/* Difficulty tag */}
          {metrics && (
            <div className={`difficulty-tag ${getDifficultyColor(metrics.difficulty)}`}>
               { metrics.difficulty === 'Hard' ? 'Dificil' : metrics.difficulty === 'Medium' ? 'Media' : 'Facil'}
            </div>
          )}
          
          {/* Route title */}
          <h2 className="title">
            {route.title}
          </h2>
          
          {/* Route metrics */}
          {metrics && (
            <div className="metrics">
              <div className="metric">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 3 3-3 3 3 3-3 3 3M3 18l3-3 3 3 3-3 3 3 3-3M3 12l3-3 3 3 3-3 3 3" />
                </svg>
                <span>{metrics.formattedLength}</span>
              </div>
              
              <div className="metric">
                <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span>{metrics.formattedElevation}</span>
              </div>
              
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
