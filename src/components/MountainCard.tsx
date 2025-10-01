import React from 'react';
import Image from 'next/image';
import { Mountain, MapPin, BarChart3 } from 'lucide-react';

interface MountainCardProps {
  mountain: {
    sys: {
      id: string;
    };
    title?: string | null;
    description?: string | null;
    mountainDifficulty?: string | null;
    mountainLength?: number | null;
    mountainElevationGain?: number | null;
    headerImage?: {
      url?: string | null;
      title?: string | null;
    } | null;
  };
  index?: number;
}

export default function MountainCard({ mountain, index = 0 }: MountainCardProps) {
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
    <div 
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid #374151',
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
        width: '100%',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.4)';
        e.currentTarget.style.borderColor = '#10b981';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#374151';
      }}
    >
      {/* Image Section */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          overflow: 'hidden'
        }}
      >
        {mountain.headerImage?.url ? (
          <Image
            src={mountain.headerImage.url}
            alt={mountain.headerImage.title || mountain.title || 'Mountain image'}
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <div 
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
              }}
            />
            <Mountain size={48} color="#10b981" style={{ opacity: 0.8 }} />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(31, 41, 55, 0.9) 0%, transparent 100%)'
          }}
        />
      </div>

      {/* Content Section */}
      <div 
        style={{
          padding: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1f2937',
          position: 'relative'
        }}
      >
        {/* Mountain Icon Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            width: '24px',
            height: '24px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Mountain size={12} color="white" />
        </div>

        {/* Title */}
        <h3 
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '18px',
            marginBottom: '8px',
            lineHeight: '1.3',
            letterSpacing: '-0.025em'
          }}
        >
          {mountain.title || `Mountain ${index + 1}`}
        </h3>
        
        {/* Description */}
        <p 
          style={{
            color: '#9ca3af',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '16px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {mountain.description || 'A challenging mountain climb with stunning views'}
        </p>
        
        {/* Stats */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #374151'
          }}
        >
          {mountain.mountainDifficulty && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              color: getDifficultyColor(mountain.mountainDifficulty),
              fontSize: '13px',
              fontWeight: '500'
            }}>
              <Mountain size={14} color="currentColor" />
              <span>{mountain.mountainDifficulty}</span>
            </div>
          )}
          
          {(mountain.mountainLength || mountain.mountainElevationGain) && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              color: '#6b7280',
              fontSize: '13px'
            }}>
              <BarChart3 size={14} color="currentColor" />
              <span>{mountain.mountainLength || '0'}km</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
