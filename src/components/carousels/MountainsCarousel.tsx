'use client';

import React, { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MountainCard from '../cards/MountainCard';
import SectionTitle from '../ui/SectionTitle';
import type { InterestSpot } from '@/contentful-types';
import '@/styles/coffeeStopCard.css';

interface MountainsCarouselProps {
  mountains: InterestSpot[];
}

export default function MountainsCarousel({ mountains }: MountainsCarouselProps) {
  const [embla, setEmbla] = React.useState<any>(null);
  
  if (!mountains || mountains.length === 0) {
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
        variant="tertiary"
        title="Puertos"
        className="section-title--mountains"
      />
      
      <div className="relative">
        <Carousel
        getEmblaApi={setEmbla}
        withIndicators={mountains.length > 1}
        withControls={false}
        slideSize={{ base: '100%', sm: '50%', md: '35%' }}
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
            padding: '0 0.5rem',
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
        {mountains.map((mountain, index) => (
          <Carousel.Slide key={mountain?.sys?.id || index}>
            <MountainCard mountain={mountain} index={index} compact={true} />
          </Carousel.Slide>
        ))}
        </Carousel>
        
        {/* Custom Controls for Bigger Steps */}
        {mountains.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Previous mountains"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Next mountains"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
