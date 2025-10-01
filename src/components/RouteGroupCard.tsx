import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { RouteGroup } from '@/contentful-types';

interface RouteGroupCardProps {
  routeGroup: RouteGroup;
  index?: number;
}

export default function RouteGroupCard({ routeGroup, index = 0 }: RouteGroupCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const groupLink = `route-group/${routeGroup.slug}`;

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

  if (!routeGroup) return null;

  if (!routeGroup.headerImage?.url) return null;

  return (
    <article
      ref={cardRef}
      className={`
        relative w-full h-[400px]
        rounded-xl overflow-hidden shadow-md
        opacity-0 translate-y-4
        transition-all duration-700 ease-out
        sm:h-[450px]
        md:h-[500px]
        ${isVisible ? 'opacity-100 translate-y-0' : ''}
      `}
    >
      <Link href={groupLink} className="block h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}

        <Image
          src={routeGroup.headerImage.url}
          alt={routeGroup.title || 'Route group image'}
          fill
          priority={isVisible}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          className={`
            object-cover
            ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            transition-all duration-700 ease-out
          `}
        />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8">
          <h2 className="
            inline-block font-extrabold text-white shadow-xl
            bg-charcoal-900/60 backdrop-blur-sm px-3 py-1 text-lg
            sm:px-4 sm:py-2 sm:text-2xl
            md:px-6 md:py-3 md:text-3xl
          ">
            {routeGroup.title}
          </h2>
          {routeGroup.subtitle && (
            <p className="
              mt-2 inline-block text-balak-200 rounded-md shadow
              bg-charcoal-800/80 px-2 py-1 text-xs
              sm:px-3 sm:py-1.5 sm:text-sm
              md:px-4 md:py-2 md:text-base
            ">
              {routeGroup.subtitle}
            </p>
          )}
          {routeGroup.locationLabel && (
            <p className="
              mt-1 inline-block text-white/90 rounded-md shadow
              bg-charcoal-700/60 px-2 py-1 text-xs
              sm:px-3 sm:py-1 sm:text-sm
              md:px-4 md:py-1.5 md:text-base
            ">
              📍 {routeGroup.locationLabel}
            </p>
          )}
          {routeGroup.routesCollection?.total && (
            <p className="
              mt-1 inline-block text-balak-300 rounded-md shadow
              bg-charcoal-800/60 px-2 py-1 text-xs
              sm:px-3 sm:py-1 sm:text-sm
              md:px-4 md:py-1.5 md:text-base
            ">
              {routeGroup.routesCollection.total} route{routeGroup.routesCollection.total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
