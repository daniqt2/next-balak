import React from 'react';
import type { DifficultyLevel } from '@/lib/route-utils';

interface SmallElevationGraphProps {
  elevation: number;
  difficulty: DifficultyLevel;
  className?: string;
}

/**
 * Small elevation profile graph component for route cards
 * Creates a simple elevation profile with difficulty-based colors
 */
export default function SmallElevationGraph({ elevation, difficulty, className = '' }: SmallElevationGraphProps) {
  // Generate line with angle based on difficulty
  const generateDifficultyBasedProfile = () => {
    const points = 12;
    const profile = [];
    
    // Set different angles based on difficulty
    let maxHeight;
    switch (difficulty) {
      case 'Easy':
        maxHeight = 20; // Horizontal line (low height)
        break;
      case 'Medium':
        maxHeight = 50; // Diagonal line (medium height)
        break;
      case 'Hard':
        maxHeight = 90; // Almost vertical line (high height)
        break;
      default:
        maxHeight = 50;
    }
    
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1);
      // Create line with height based on difficulty
      const height = progress * maxHeight;
      profile.push(height);
    }
    
    return profile;
  };

  const elevationProfile = generateDifficultyBasedProfile();
  const maxElevation = Math.max(...elevationProfile);
  const minElevation = 0;

  // Get difficulty color
  const getDifficultyColor = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case 'Easy':
        return 'text-lime-300';
      case 'Medium':
        return 'text-amber-400';
      case 'Hard':
        return 'text-rose-400';
      default:
        return 'text-gray-400';
    }
  };

  // Create SVG path
  const createPath = () => {
    const points = elevationProfile.map((elev, index) => {
      const x = (index / (elevationProfile.length - 1)) * 100;
      const y = 100 - ((elev - minElevation) / (maxElevation - minElevation)) * 100;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const colorClass = getDifficultyColor(difficulty);

  return (
    <div className={`small-elevation-graph ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Area under the curve */}
        <path
          d={`${createPath()} L 100,100 L 0,100 Z`}
          fill="currentColor"
          fillOpacity="0.3"
          className={colorClass}
        />
        
        {/* Elevation line */}
        <path
          d={createPath()}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={colorClass}
        />
      </svg>
    </div>
  );
}
