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
  variant,
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

  const variantColor = (): string => {
    if (!variant) return '#ffffff';
    switch (variant) {
      case 'secondary':
        return '#ECA74B'; // balak-orange-500
      case 'tertiary':
        return '#bfe23a'; // balak-500
      case 'primary':
        return '#bfe23a'; // balak-500
      case 'quaternary':
        return '#C37474'; // balak-red-500
      default:
        return '#ffffff';
    }
  };

  return (
    <div ref={titleRef} className={`my-4 md:my-12 text-left ${className}`}>
      <div className="max-w-4xl">
        <div
          className="flex flex-col gap-1"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out',
          }}
        >
          <h2
            className={`text-3xl md:text-5xl font-bold leading-tight tracking-tight ${titleClassName}`}
            style={{
              color: variantColor(),
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className={`text-lg md:text-xl leading-relaxed max-w-3xl text-gray-400 ${subtitleClassName}`}
              style={{
                transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.6s ease-out 0.2s',
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
