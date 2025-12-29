'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from '@mantine/carousel';
import { Modal } from '@mantine/core';

interface ImageGalleryProps {
  images: Array<{
    url: string;
    alt?: string;
    title?: string;
  }>;
  height?: string;
  showThumbnails?: boolean;
}

export function ImageGallery({ 
  images, 
  height = '400px', 
  showThumbnails = true 
}: ImageGalleryProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center bg-charcoal-800 rounded-lg" style={{ height }}>
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
    <div className="space-y-4">
      {/* Main Image Carousel */}
      <div className="relative">
        <Carousel
          withIndicators={images.length > 1}
          withControls={images.length > 1}
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
              cursor: 'pointer',
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
          onSlideChange={setActiveSlide}
        >
          {images.map((image, index) => (
            <Carousel.Slide key={index}>
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={() => openModal(index)}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  quality={85}
                />
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-medium">{image.title}</p>
                  </div>
                )}
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail Strip */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer
                border-2 transition-all duration-200 flex-shrink-0
                ${activeSlide === index 
                  ? 'border-balak-500 shadow-lg' 
                  : 'border-charcoal-600 hover:border-charcoal-500'
                }
              `}
              onClick={() => setActiveSlide(index)}
            >
              <Image
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                quality={60}
              />
            </div>
          ))}
        </div>
      )}

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
