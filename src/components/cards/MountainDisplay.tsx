import Link from 'next/link';
import Image from 'next/image';
import { Mountain, BarChart3 } from 'lucide-react';
import { InterestSpot } from '@/contentful-types';

import '@/styles/mountainDisplay.css';

import { DIFFICULTY_COLORS } from '@/utils/mountains';
import { getMountainDifficultyColor, getMountainDifficultyText } from '@/helpers/mountain';


interface MountainCardProps {
  mountain: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function MountainCard({ mountain, index = 0, compact = false }: MountainCardProps) {
  if (!mountain) return null;

  const getDifficultyClass = (difficulty?: string | null) => {
    if (!difficulty) return 'mountain-display__stat--default';
    const diff = difficulty.toLowerCase();
    if (diff.includes('easy')) return 'mountain-display__stat--difficulty-easy';
    if (diff.includes('medium') || diff.includes('intermediate')) return 'mountain-display__stat--difficulty-medium';
    if (diff.includes('hard') || diff.includes('difficult')) return 'mountain-display__stat--difficulty-hard';
    return 'mountain-display__stat--default';
  };

  const getDifficultyColor = (difficulty?: string | null) => {
    if (!difficulty) return DIFFICULTY_COLORS.default;
    return getMountainDifficultyColor(difficulty);
  };

  return (
    <Link href={`/puerto/${mountain.sys.id}`} className="mountain-display">
      <div 
        className={`mountain-display__card ${compact ? 'mountain-display__card--compact' : 'mountain-display__card--full'}`}
      >
      <div 
        className={`mountain-display__image-container ${compact ? 'mountain-display__image-container--compact' : 'mountain-display__image-container--full'}`}
      >
        {mountain.headerImage?.url ? (
          <Image
            src={mountain.headerImage.url}
            alt={mountain.headerImage.title || mountain.title || 'Mountain image'}
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="mountain-display__image"
          />
        ) : (
          <div className="mountain-display__image-placeholder">
            <div className="mountain-display__image-placeholder-overlay" />
            <Mountain size={48} color="#000" className="mountain-display__image-placeholder-icon" />
          </div>
        )}
        
        <div className="mountain-display__gradient-overlay" />
      </div>

      <div 
        className={`mountain-display__content ${compact ? 'mountain-display__content--compact' : 'mountain-display__content--full'}`}
      >
        <div className="mountain-display__badge" style={{ backgroundColor: getDifficultyColor(mountain.mountainDifficulty) }}>
          <Mountain size={12} color="black" />
        </div>

        <h3 
          className={`mountain-display__title ${compact ? 'mountain-display__title--compact' : 'mountain-display__title--full'}`}
        >
          {mountain.title || `Puerto ${index + 1}`}
        </h3>
        
        <p className="mountain-display__description">
          {mountain.description || ''}
        </p>
        
        <div className="mountain-display__stats">
          {mountain.mountainDifficulty && (
            <div className={`mountain-display__stat mountain-display__stat--difficulty ${getDifficultyClass(mountain.mountainDifficulty)}`}>
              <Mountain size={14} color="currentColor" />
              <span>{getMountainDifficultyText(mountain.mountainDifficulty)}</span>
            </div>
          )}
          
          {(mountain.mountainLength || mountain.mountainElevationGain) && (
            <div className="mountain-display__stat mountain-display__stat--info">
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
