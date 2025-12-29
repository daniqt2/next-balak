'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import { Modal } from '@mantine/core';

interface ImageCardCarouselProps {
  images: Array<{
    url: string;
    alt?: string;
    title?: string;
    subtitle?: string;
  }>;
  cardHeight?: string;
  showIndicators?: boolean;
  showControls?: boolean;
}

export function ImageCardCarousel({ 
  images, 
  cardHeight = '300px',
  showIndicators = true,
  showControls = true
}: ImageCardCarouselProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center bg-charcoal-800 rounded-lg" style={{ height: cardHeight }}>
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Image Gallery</h2>
        <p className="text-gray-400">Browse through our collection</p>
      </div>
      
      <Carousel
        withIndicators={showIndicators && images.length > 1}
        withControls={showControls && images.length > 3}
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        styles={{
          root: {
            width: '100%',
          },
          container: {
            gap: '1rem',
          },
          slide: {
            padding: '0 0.5rem',
            height: 'auto',
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
            <div 
              className="relative w-full rounded-xl overflow-hidden shadow-lg border-2 border-gray-700/50 hover:border-balak-500/50 transition-all duration-300 hover:shadow-xl cursor-pointer"
              style={{ height: cardHeight }}
              onClick={() => openModal(index)}
            >
              <Image
                src={image.url}
                alt={image.alt || `Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              
              {/* Overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {image.title && (
                  <h3 className="text-white font-bold text-lg mb-1">
                    {image.title}
                  </h3>
                )}
                {image.subtitle && (
                  <p className="text-balak-200 text-sm">
                    {image.subtitle}
                  </p>
                )}
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-balak-500/0 hover:bg-balak-500/10 transition-colors duration-300" />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Full-Screen Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        size="90vw"
        centered
        styles={{
          content: {
            backgroundColor: 'var(--mantine-color-charcoal-9)',
          },
          header: {
            backgroundColor: 'var(--mantine-color-charcoal-8)',
          },
        }}
      >
        <div className="relative">
          <div className="relative w-full h-[80vh]">
            <Image
              src={images[modalImageIndex]?.url}
              alt={images[modalImageIndex]?.alt || `Image ${modalImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              quality={95}
            />
          </div>
          
          {images.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-charcoal-800/80 hover:bg-gray-700/80 text-balak-300 hover:text-balak-200 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-charcoal-800/80 hover:bg-gray-700/80 text-balak-300 hover:text-balak-200 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              >
                →
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-charcoal-800/80 text-white px-3 py-1 rounded-full text-sm">
                {modalImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
