'use client';

import React from 'react';
import { Carousel } from '@mantine/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import CollVariantCard from '@/components/cards/CollVariantCard';

interface CollVariantsCarouselProps {
  variants: any[];
}

export default function CollVariantsCarousel({ variants }: CollVariantsCarouselProps) {
  const [embla, setEmbla] = React.useState<any>(null);

  if (!variants || variants.length === 0) {
    return null;
  }

  const handleNext = () => {
    if (!embla) return;
    const isMobile = window.innerWidth < 640;
    embla.scrollNext();
    if (!isMobile) {
      setTimeout(() => embla.scrollNext(), 100);
    }
  };

  const handlePrevious = () => {
    if (!embla) return;
    const isMobile = window.innerWidth < 640;
    embla.scrollPrev();
    if (!isMobile) {
      setTimeout(() => embla.scrollPrev(), 100);
    }
  };

  return (
    <div className="coffee-stops-section">
      <p className="text-lg md:text-xl font-bold text-charcoal-900 mb-4 uppercase">
        Puertos en ruta (variantes)
      </p>

      <div className="relative">
        <Carousel
          getEmblaApi={setEmbla}
          withIndicators={false}
          withControls={false}
          slideSize={{ base: '100%', sm: '50%', md: '20%' }}
          slideGap="sm"
          withKeyboardEvents={false}
          styles={{
            root: {
              width: '100%',
            },
            container: {
              gap: '1rem',
            },
            slide: {
              padding: '0.5rem 1rem',
              height: 'auto',
            },
          }}
        >
          {variants.map((variant, index) => (
            <Carousel.Slide key={variant?.sys?.id || index}>
              <CollVariantCard variant={variant} index={index} />
            </Carousel.Slide>
          ))}
        </Carousel>

        {variants.length > 5 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Previous colls"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Next colls"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

