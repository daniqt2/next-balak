'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Coffee, MapPin, BarChart3 } from 'lucide-react';
import type { InterestSpot } from '@/contentful-types';

interface CoffeeStopCardProps {
  coffeeStop: InterestSpot;
  index?: number;
  compact?: boolean;
}

export default function CoffeeStopCard({ coffeeStop, index = 0, compact = false }: CoffeeStopCardProps) {
  if (!coffeeStop) return null;

  return (
    <Link href={`/coffee/${coffeeStop.sys.id}`} className="block">
      <div 
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #374151',
          display: 'flex',
          flexDirection: 'column',
          height: compact ? '280px' : '400px',
          width: '100%',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.borderColor = '#f59e0b';
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
          height: compact ? '140px' : '200px',
          overflow: 'hidden'
        }}
      >
        {coffeeStop.headerImage?.url ? (
          <Image
            src={coffeeStop.headerImage.url}
            alt={coffeeStop.headerImage.title || coffeeStop.title || 'Coffee stop image'}
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
              background: 'linear-gradient(135deg, #92400e 0%, #a16207 50%, #ca8a04 100%)',
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
                background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
              }}
            />
                  <Coffee size={48} color="#fbbf24" style={{ opacity: 0.8 }} />
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
          padding: compact ? '12px' : '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1f2937',
          position: 'relative'
        }}
      >
        {/* Coffee Icon Badge */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            width: '24px',
            height: '24px',
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
          }}
        >
                <Coffee size={12} color="white" />
        </div>

        {/* Title */}
        <h3 
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: compact ? '16px' : '18px',
            marginBottom: compact ? '6px' : '8px',
            lineHeight: '1.3',
            letterSpacing: '-0.025em'
          }}
        >
          {coffeeStop.title || `Coffee Stop ${index + 1}`}
        </h3>
        
        {/* Description */}
        <p 
          style={{
            color: '#9ca3af',
            fontSize: compact ? '12px' : '14px',
            lineHeight: '1.5',
            marginBottom: compact ? '12px' : '16px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {coffeeStop.description || 'A perfect spot to refuel during your ride'}
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            color: '#f59e0b',
            fontSize: '13px',
            fontWeight: '500'
          }}>
                  <MapPin size={14} color="currentColor" />
            <span>
              {coffeeStop.locationName}
            </span>
          </div>
          
          {(coffeeStop.mountainLength || coffeeStop.mountainElevationGain) && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              color: '#6b7280',
              fontSize: '13px'
            }}>
                    <BarChart3 size={14} color="currentColor" />
              <span>{coffeeStop.mountainLength || '0'}km</span>
            </div>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}
