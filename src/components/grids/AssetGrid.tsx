"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Asset {
  __typename?: string;
  sys: {
    id: string;
  };
  title?: string | null;
  description?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  contentType?: string | null;
}

interface AssetGridProps {
  assets: (Asset | null)[];
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showRouteAttribution?: boolean;
  routeTitle?: string;
  routeSlug?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function AssetGrid({ 
  assets, 
  title, 
  subtitle, 
  icon,
  showRouteAttribution = false,
  routeTitle,
  routeSlug,
  className = "",
  variant = 'default'
}: AssetGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  
  const filteredAssets = assets?.filter((asset): asset is Asset => asset !== null) || [];
  
  // Shuffle assets for random positioning (consistent shuffle based on asset IDs)
  const shuffledAssets = React.useMemo(() => {
    if (!filteredAssets || filteredAssets.length === 0) return [];
    const shuffled = [...filteredAssets];
    // Use a seeded random function for consistent results
    const seed = filteredAssets.reduce((acc, asset) => acc + asset.sys.id.charCodeAt(0), 0);
    let currentSeed = seed;
    
    const seededRandom = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
    };
    
    // Fisher-Yates shuffle with seeded random
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }, [filteredAssets]);
  
  if (!assets || assets.length === 0) return null;
  
  const openModal = (shuffledIndex: number) => {
    setIsModalLoading(true);
    // Find the original index in filteredAssets
    const asset = shuffledAssets[shuffledIndex];
    const originalIndex = filteredAssets.findIndex(a => a.sys.id === asset.sys.id);
    setSelectedImageIndex(originalIndex);
    
    // Preload adjacent images
    const nextIndex = (originalIndex + 1) % filteredAssets.length;
    const prevIndex = originalIndex === 0 ? filteredAssets.length - 1 : originalIndex - 1;
    
    if (filteredAssets[nextIndex]?.url) {
      const img = new window.Image();
      img.src = filteredAssets[nextIndex].url!;
    }
    if (filteredAssets[prevIndex]?.url) {
      const img = new window.Image();
      img.src = filteredAssets[prevIndex].url!;
    }
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsModalLoading(false);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      const nextIndex = (selectedImageIndex + 1) % filteredAssets.length;
      setSelectedImageIndex(nextIndex);
      
      // Preload next image after this one
      const nextNextIndex = (nextIndex + 1) % filteredAssets.length;
      if (filteredAssets[nextNextIndex]?.url) {
        const preloadImg = new window.Image();
        preloadImg.src = filteredAssets[nextNextIndex].url!;
      }
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      const prevIndex = selectedImageIndex === 0 ? filteredAssets.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
      
      // Preload previous image after this one
      const prevPrevIndex = prevIndex === 0 ? filteredAssets.length - 1 : prevIndex - 1;
      if (filteredAssets[prevPrevIndex]?.url) {
        const preloadImg = new window.Image();
        preloadImg.src = filteredAssets[prevPrevIndex].url!;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  // Create randomized sizes for masonry effect
  const getImageSize = (index: number) => {
    const sizes = variant === 'compact' ? [
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-1 row-span-1', // Small
    ] : [
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-2', // Tall
      'col-span-1 row-span-1', // Small
    ];
    
    // Use a simple hash function to create consistent randomization based on asset ID
    const assetId = filteredAssets[index]?.sys?.id || index.toString();
    const hash = assetId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return sizes[Math.abs(hash) % sizes.length];
  };

  return (
    <div className={`asset-grid ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              {icon}
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
      )}
      

      <div className={`grid gap-4 auto-rows-[200px] ${
        variant === 'compact' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {shuffledAssets.map((asset, index) => (
          <div
            key={asset.sys.id}
            className={`group relative overflow-hidden rounded-xl border border-gray-700 hover:border-balak-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-balak-500/10 cursor-pointer ${getImageSize(index)}`}
            onClick={() => openModal(index)}
          >
            {asset.url ? (
              <>
                <Image
                  src={asset.url}
                  alt={asset.title || asset.description || `Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes={variant === 'compact' 
                    ? "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  }
                  loading={index < 6 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  quality={60}
                  unoptimized={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {showRouteAttribution && routeTitle && (
                    <div className="flex items-center gap-2 mb-1">
                      <Camera className="w-3 h-3 text-balak-400" />
                      <p className="text-balak-300 text-xs font-medium">
                        {routeTitle}
                      </p>
                    </div>
                  )}
                  {(asset.title || asset.description) && (
                    <p className="text-white text-sm font-medium truncate">
                      {asset.title || asset.description}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-charcoal-800 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Full Page Modal */}
      {selectedImageIndex !== null && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 bg-black z-[9999] flex flex-col h-screen w-screen"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black border-b border-gray-800">
            <h3 className="text-white text-xl font-semibold">
              {title || "Galería de Imágenes"}
            </h3>
            <button
              onClick={closeModal}
              className="bg-charcoal-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Content - Full Screen */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            {/* Navigation Buttons */}
            {filteredAssets.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-charcoal-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-charcoal-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Container - Full Screen */}
            <div 
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredAssets[selectedImageIndex]?.url && (
                <div className="relative w-full h-full flex items-center justify-center p-8">
                  <Image
                    src={filteredAssets[selectedImageIndex].url!}
                    alt={filteredAssets[selectedImageIndex].title || filteredAssets[selectedImageIndex].description || 'Image'}
                    width={filteredAssets[selectedImageIndex].width || 1920}
                    height={filteredAssets[selectedImageIndex].height || 1080}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                    priority
                    quality={70}
                    unoptimized={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-black border-t border-gray-800">
            <div className="text-white">
              {showRouteAttribution && routeTitle && (
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4 text-balak-400" />
                  <p className="text-balak-300 text-sm font-medium">
                    {routeTitle}
                  </p>
                </div>
              )}
              {(filteredAssets[selectedImageIndex]?.title || filteredAssets[selectedImageIndex]?.description) && (
                <p className="text-white text-lg font-medium mb-1">
                  {filteredAssets[selectedImageIndex].title || filteredAssets[selectedImageIndex].description}
                </p>
              )}
              {filteredAssets.length > 1 && (
                <p className="text-gray-300 text-sm">
                  {selectedImageIndex + 1} de {filteredAssets.length}
                </p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
