import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { RouteGroup } from '@/contentful-types';

interface RouteGroupDisplayProps {
  routeGroup: RouteGroup;
  index?: number;
}

export default function RouteGroupDisplay({ routeGroup, index = 0 }: RouteGroupDisplayProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const groupLink = `/coleccion-rutas/${routeGroup.slug}`;
  const routeCount = routeGroup.routesCollection?.total || 0;
  const isComingSoon = routeCount === 0;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const delay = index * 100;
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

  const cardContent = (
    <>
      {!imageLoaded && <div className="skeleton" />}

      <Image
        src={routeGroup.headerImage.url}
        alt={routeGroup.title || 'Route group image'}
        fill
        priority={isVisible}
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setImageLoaded(true)}
        className={`image ${imageLoaded ? 'image--loaded' : 'image--loading'}`}
      />

      <div className="overlay" />
      {isComingSoon && <div className="coming-soon-overlay" aria-hidden="true" />}
      {isComingSoon && <div className="coming-soon-label">Próximamente</div>}

      <div className="content">
        <div className="title-section">
          <div>
            <h3 className="title">{routeGroup.title}</h3>
            {routeGroup.subtitle && <p className="subtitle">{routeGroup.subtitle}</p>}
          </div>
        </div>

        {routeGroup.locationLabel && (
          <div className="location">
            <span className="mr-1">📍</span>
            {routeGroup.locationLabel}
          </div>
        )}
      </div>

      {routeCount > 0 && <div className="route-count-badge">{routeCount}</div>}
    </>
  );

  return (
    <div
      ref={cardRef}
      className={`route-group-display ${isVisible ? 'route-group-display--visible' : ''} ${isComingSoon ? 'route-group-display--coming-soon' : ''}`}
    >
      {isComingSoon ? (
        <div className="block h-full" aria-disabled="true">
          {cardContent}
        </div>
      ) : (
        <Link href={groupLink} className="block h-full">
          {cardContent}
        </Link>
      )}
    </div>
  );
}
