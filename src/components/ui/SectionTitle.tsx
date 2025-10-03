import React, { useEffect, useRef, useState } from 'react';

interface SectionTitleProps {
  title: string;
  variant?: Variant;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export default function SectionTitle({ 
  title, 
  subtitle, 
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  variant 
}: SectionTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variantClass = (): string => {
    if (!variant) return '';
    switch (variant) {
      case 'secondary':
        return 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent';
      case 'tertiary':
        return 'bg-gradient-to-br from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent';
      case 'primary':
        return 'bg-gradient-to-br from-balak-500 via-balak-600 to-balak-700 bg-clip-text text-transparent';
      case 'quaternary':
        return 'bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent';
      default:
        return 'bg-gradient-to-br from-white via-gray-100 to-gray-200 bg-clip-text text-transparent';
    }
  }

  const variantColor = (): string => {
    if (!variant) return '';
    switch (variant) {
      case 'secondary':
        return '#fbbf24';
      case 'tertiary':
        return '#34d399';
      case 'primary':
        return '#d0eb66';
      case 'quaternary':
        return '#a78bfa';
    }
  }

  return (
    <div 
      ref={titleRef}
      className={`my-12 text-left ${className}`}
    >
      <div className="max-w-4xl">
        <div 
          className="flex flex-col gap-1"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out'
          }}
        >
          <h2 
            className={`text-4xl md:text-5xl font-bold leading-tight tracking-tight ${titleClassName} ${variantClass()}`}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p 
              className={`text-lg md:text-xl leading-relaxed max-w-3xl  ${subtitleClassName}`}
              style={{
                color: variantColor(),
                transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s ease-out 0.2s'
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
