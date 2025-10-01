import React, { useEffect, useRef, useState } from 'react';
import '@/styles/sectionTitle.css';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  className = '',
  titleClassName = '',
  subtitleClassName = ''
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

  const isCoffee = className.includes('coffee');
  const isMountains = className.includes('mountains');
  const isRoutes = className.includes('routes');

  return (
    <div 
      ref={titleRef}
      className={`section-title ${className}`}
      style={{
        marginBottom: '3rem',
        textAlign: 'left'
      }}
    >
      <div 
        className="section-title-content"
        style={{
          maxWidth: '56rem'
        }}
      >
        <div 
          className="section-title-text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s ease-out'
          }}
        >
          <h2 
            className={`section-title-heading ${titleClassName}`}
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    background: isCoffee 
                      ? 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)'
                      : isMountains
                      ? 'linear-gradient(135deg, #10b981, #059669, #047857)'
                      : isRoutes
                      ? 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)'
                      : 'white',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1rem',
                    lineHeight: '1',
                    letterSpacing: '-0.025em'
                  }}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p 
              className={`section-title-subtitle ${subtitleClassName}`}
                  style={{
                    fontSize: '1.125rem',
                    color: isCoffee ? '#fef3c7' : isMountains ? '#a7f3d0' : isRoutes ? '#fef3c7' : '#d1d5db',
                    lineHeight: '.2',
                    maxWidth: '48rem',
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
