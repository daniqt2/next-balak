import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mountain, MapPin, BarChart3 } from 'lucide-react';
import { InterestSpot } from '@/contentful-types';
import { getMountainDifficultyText } from '@/helpers/mountain';

interface MountainCardProps {
  mountain: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function MountainCard({ mountain, index = 0, compact = false }: MountainCardProps) {
  if (!mountain) return null;

  const getDifficultyColor = (difficulty?: string | null) => {
    if (!difficulty) return 'text-gray-400';
    const diff = difficulty.toLowerCase();
    if (diff.includes('easy')) return 'text-lime-300';
    if (diff.includes('medium') || diff.includes('intermediate')) return 'text-amber-400';
    if (diff.includes('hard') || diff.includes('difficult')) return 'text-rose-400';
    return 'text-gray-400';
  };

  return (
    <Link href={`/mountain/${mountain.sys.id}`} className="block">
      <div 
        className={`
          bg-charcoal-800 rounded-2xl overflow-hidden border border-gray-700 
          flex flex-col w-full transition-all duration-300 cursor-pointer
          hover:-translate-y-1 hover:shadow-2xl hover:border-balak-500
          ${compact ? 'h-70' : 'h-96'}
        `}
      >
      {/* Image Section */}
      <div 
        className={`
          relative w-full overflow-hidden
          ${compact ? 'h-35' : 'h-50'}
        `}
      >
        {mountain.headerImage?.url ? (
          <Image
            src={mountain.headerImage.url}
            alt={mountain.headerImage.title || mountain.title || 'Mountain image'}
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300"
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br from-balak-800 via-balak-700 to-balak-600 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-radial from-balak-500/10 to-transparent" />
            <Mountain size={48} color="#10b981" className="opacity-80" />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-gray-800/90 to-transparent" />
      </div>

      {/* Content Section */}
      <div 
        className={`
          flex-1 flex flex-col bg-charcoal-800 relative
          ${compact ? 'p-3' : 'p-5'}
        `}
      >
        {/* Mountain Icon Badge */}
        <div className="absolute -top-3 right-5 w-6 h-6 bg-balak-500 rounded-full flex items-center justify-center shadow-lg">
          <Mountain size={12} color="white" />
        </div>

        {/* Title */}
        <h3 
          className={`
            text-white font-bold leading-tight tracking-tight
            ${compact ? 'text-base mb-1.5' : 'text-lg mb-2'}
          `}
        >
          {mountain.title || `Puerto ${index + 1}`}
        </h3>
        
        {/* Description */}
        <p 
          className={`
            text-gray-400 leading-relaxed flex-1 overflow-hidden line-clamp-1
          `}
        >
          {mountain.description || ''}
        </p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-gray-700">
          {mountain.mountainDifficulty && (
            <div className={`flex items-center gap-1.5 text-xs font-medium ${getDifficultyColor(mountain.mountainDifficulty)}`}>
              <Mountain size={14} color="currentColor" />
              <span>{getMountainDifficultyText(mountain.mountainDifficulty)}</span>
            </div>
          )}
          
          {(mountain.mountainLength || mountain.mountainElevationGain) && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <BarChart3 size={14} color="currentColor" />
              <span>{mountain.mountainLength || '0'}km</span>
            </div>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
