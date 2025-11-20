import React from 'react';
import Link from 'next/link';
import { Mountain } from 'lucide-react';
import { InterestSpot } from '@/contentful-types';

interface MountainCardProps {
  mountain: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function MountainCard({ mountain, index = 0, compact = false }: MountainCardProps) {
  if (!mountain) return null;

  const getDifficultyColor = (difficulty?: string | null) => {
    if (!difficulty) return 'bg-gray-400';
    const diff = difficulty.toLowerCase();
    if (diff.includes('easy')) return 'bg-balak-500';
    if (diff.includes('medium') || diff.includes('intermediate')) return 'bg-balak-orange-500';
    if (diff.includes('hard') || diff.includes('difficult')) return 'bg-balak-red-500';
    return 'bg-gray-400';
  };

  return (
    <Link href={`/mountain/${mountain.sys.id}`} className=" group">
      <div className="flex flex-col mx-auto items-center gap-2 transition-all duration-300 cursor-pointer w-fit">
        {/* Circle with Mountain Icon and Name */}
        <div 
          className={`
            relative w-32 h-32 md:w-36 md:h-36 rounded-full 
            flex flex-col items-center justify-center gap-1.5 px-2
            transition-all duration-300
            group-hover:scale-105 group-hover:shadow-2xl
            ${getDifficultyColor(mountain.mountainDifficulty)}
          `}
        >
          <Mountain 
            size={compact ? 28 : 32} 
            strokeWidth={2}
            color="white" 
            className="drop-shadow-lg"
          />
          <h3 
            className={`
              text-white font-semibold text-center leading-tight tracking-tight
              drop-shadow-md
              ${compact ? 'text-m' : 'text-s'}
              line-clamp-2 max-w-full px-1
            `}
          >
            {mountain.title || `Puerto ${index + 1}`}
          </h3>
        </div>
        
        {/* Values outside circle */}
        <div className="flex flex-row items-center gap-2">
          {mountain.mountainLength && (
            <span className="text-white text-xs font-medium">
              {mountain.mountainLength}km
            </span>
          )}
          {mountain.mountainElevationGain && (
            <span className="text-white text-xs font-medium">
              +{mountain.mountainElevationGain}m
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
