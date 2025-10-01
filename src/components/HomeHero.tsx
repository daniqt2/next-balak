'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Route, MapPin, Clock } from 'lucide-react';

export default function HomeHero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-[80vh] min-h-[600px] max-h-[800px] overflow-hidden"
      style={{ marginTop: '64px' }}
    >
      {/* Hero Background */}
      <div 
        className="relative w-full h-full"
        style={{
          backgroundImage: 'url(/balak-home.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%)'
          }}
        />
        
        {/* Balak Pattern Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(191, 226, 58, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(191, 226, 58, 0.05) 0%, transparent 50%)'
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Main Title */}
          <div 
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
              Nuestras Rutas
              <span 
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #bfe23a, #a6c92f, #86a827)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Favoritas
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div 
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <p className="text-xl sm:text-2xl lg:text-3xl text-balak-200 mb-8 drop-shadow-lg max-w-4xl mx-auto leading-relaxed">
              Un par de amigos compartiendo nuestras rutas favoritas de ciclismo, cafés y puertos
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
