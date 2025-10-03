'use client';

import React, { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CoffeeStopCard from './CoffeeStopCard';
import SectionTitle from './SectionTitle';
import type { InterestSpot } from '@/contentful-types';
import '@/styles/coffeeStopCard.css';

interface CoffeeStopsCarouselProps {
  coffeeStops: InterestSpot[];
}

export default function CoffeeStopsCarousel({ coffeeStops }: CoffeeStopsCarouselProps) {
  const [embla, setEmbla] = React.useState<any>(null);
  const [needsNavigation, setNeedsNavigation] = React.useState(false);
  
  // Check if navigation is needed based on screen size and number of items
  React.useEffect(() => {
    if (!coffeeStops || coffeeStops.length === 0) return;
    const checkNavigation = () => {
      const width = window.innerWidth;
      let itemsPerView = 1;
      
      if (width >= 1024) { // lg
        itemsPerView = 4; // 25% each
      } else if (width >= 640) { // sm
        itemsPerView = 3; // 33% each
      } else {
        itemsPerView = 1; // 100%
      }
      
      setNeedsNavigation(coffeeStops.length > itemsPerView);
    };

    checkNavigation();
    window.addEventListener('resize', checkNavigation);
    return () => window.removeEventListener('resize', checkNavigation);
  }, [coffeeStops.length]);

  if (!coffeeStops || coffeeStops.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (embla) {
      // On mobile (base), move 1 slide. On larger screens, move 2 slides
      const isMobile = window.innerWidth < 640; // sm breakpoint
      embla.scrollNext();
      if (!isMobile) {
        setTimeout(() => embla.scrollNext(), 100);
      }
    }
  };

  const handlePrevious = () => {
    if (embla) {
      // On mobile (base), move 1 slide. On larger screens, move 2 slides
      const isMobile = window.innerWidth < 640; // sm breakpoint
      embla.scrollPrev();
      if (!isMobile) {
        setTimeout(() => embla.scrollPrev(), 100);
      }
    }
  };

  return (
    <div className="coffee-stops-section">
      <SectionTitle
        variant="secondary"
        title="Paradas"
        subtitle="Lugares perfectos para recargar energía durante tu ruta"
        className="section-title--coffee"
      />
      
      <div className="relative">
        <Carousel
        getEmblaApi={setEmbla}
        withIndicators={needsNavigation}
        withControls={false}
        slideSize={{ base: '100%', sm: '33%', md: '25%' }}
        slideGap="sm"
        withKeyboardEvents={false}
        styles={{
          root: {
            width: '100%',
          },
          container: {
            gap: '0.75rem',
          },
          slide: {
            padding: '0 0.25rem',
            height: '280px',
          },
          control: {
            backgroundColor: 'var(--mantine-color-charcoal-8)',
            border: '1px solid var(--mantine-color-charcoal-6)',
            color: 'var(--mantine-color-balak-3)',
            '&:hover': {
              backgroundColor: 'var(--mantine-color-charcoal-7)',
              color: 'var(--mantine-color-balak-2)',
            },
          },
          indicator: {
            backgroundColor: 'var(--mantine-color-charcoal-6)',
            '&[data-active]': {
              backgroundColor: 'var(--mantine-color-balak-5)',
            },
          },
        }}
      >
        {coffeeStops.map((coffeeStop, index) => (
          <Carousel.Slide key={coffeeStop?.sys?.id || index}>
            <CoffeeStopCard coffeeStop={coffeeStop} index={index} compact={true} />
          </Carousel.Slide>
        ))}
        </Carousel>
        
        {/* Custom Controls for Bigger Steps */}
        {needsNavigation && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Previous coffee stops"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Next coffee stops"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
