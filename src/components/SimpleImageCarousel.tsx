'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';

interface SimpleImageCarouselProps {
  images: Array<{
    url: string;
    alt?: string;
  }>;
  height?: string;
  showIndicators?: boolean;
  showControls?: boolean;
}

export function SimpleImageCarousel({ 
  images, 
  height = '300px',
  showIndicators = true,
  showControls = true
}: SimpleImageCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center bg-charcoal-800 rounded-lg" style={{ height }}>
        <p className="text-charcoal-400">No images available</p>
      </div>
    );
  }

  return (
    <Carousel
      withIndicators={showIndicators && images.length > 1}
      withControls={showControls && images.length > 1}
      slideSize="100%"
      styles={{
        root: {
          width: '100%',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        },
        container: {
          height: height,
        },
        slide: {
          padding: 0,
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
      {images.map((image, index) => (
        <Carousel.Slide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={image.url}
              alt={image.alt || `Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              quality={85}
            />
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
