import Link from 'next/link';
import Image from 'next/image';
import { Mountain } from 'lucide-react';
import { InterestSpot } from '@/contentful-types';

import '@/styles/mountainDisplay.css';

interface MountainCardProps {
  mountain: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function MountainCard({ mountain, index = 0, compact = false }: MountainCardProps) {
  if (!mountain) return null;

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
        <div className="mountain-display__badge">
          <Mountain size={12} color="white" />
        </div>

        <h3 
          className={`mountain-display__title ${compact ? 'mountain-display__title--compact' : 'mountain-display__title--full'}`}
        >
          {mountain.title || `Puerto ${index + 1}`}
        </h3>
        
        <p className="mountain-display__description">
          {mountain.description || ''}
        </p>
      </div>
    </div>
    </Link>
  );
}
