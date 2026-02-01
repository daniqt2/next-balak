'use client';

import React from 'react';
import { Carousel } from '@mantine/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import RouteCard from '@/components/cards/RouteCard';

interface VariantRoutesCarouselProps {
  routes: any[];
}

export default function VariantRoutesCarousel({
  routes,
}: VariantRoutesCarouselProps) {
  const [embla, setEmbla] = React.useState<any>(null);
  const [needsNavigation, setNeedsNavigation] = React.useState(false);

  React.useEffect(() => {
    if (!routes || routes.length === 0) return;
    const checkNavigation = () => {
      const width = window.innerWidth;
      let itemsPerView = 1;

      if (width >= 1024) itemsPerView = 3;
      else if (width >= 640) itemsPerView = 2;
      else itemsPerView = 1;

      setNeedsNavigation(routes.length > itemsPerView);
    };

    checkNavigation();
    window.addEventListener('resize', checkNavigation);
    return () => window.removeEventListener('resize', checkNavigation);
  }, [routes.length]);

  if (!routes || routes.length === 0) return null;

  const handleNext = () => {
    if (!embla) return;
    const isMobile = window.innerWidth < 640;
    embla.scrollNext();
    if (!isMobile) setTimeout(() => embla.scrollNext(), 100);
  };

  const handlePrevious = () => {
    if (!embla) return;
    const isMobile = window.innerWidth < 640;
    embla.scrollPrev();
    if (!isMobile) setTimeout(() => embla.scrollPrev(), 100);
  };

  return (
    <div className="relative">
      <Carousel
        getEmblaApi={setEmbla}
        withIndicators={needsNavigation}
        withControls={false}
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap="sm"
        withKeyboardEvents={false}
        styles={{
          root: { width: '100%' },
          container: { gap: '0.75rem' },
          slide: { padding: '0 0.25rem', height: 'auto' },
          indicator: {
            backgroundColor: 'var(--mantine-color-charcoal-6)',
            '&[data-active]': {
              backgroundColor: 'var(--mantine-color-balak-5)',
            },
          },
        }}
      >
        {routes.map((route, index) => (
          <Carousel.Slide key={route?.sys?.id || index}>
            <RouteCard route={route} index={index} />
          </Carousel.Slide>
        ))}
      </Carousel>

      {needsNavigation && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
            aria-label="Previous routes"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
            aria-label="Next routes"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
