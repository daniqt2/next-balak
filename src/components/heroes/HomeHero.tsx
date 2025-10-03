'use client';

import { useEffect, useRef, useState } from 'react';

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
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
        
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
              Nuestras Rutas
              <span className="block bg-gradient-to-br from-balak-400 via-balak-500 to-balak-600 bg-clip-text text-transparent">
                Favoritas
              </span>
            </h1>
          </div>
          
          <div 
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <p className="text-l sm:text-xl lg:text-2xl text-balak-200 mb-3 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
              Un par de amigos compartiendo nuestras rutas favoritas de ciclismo, cafés y puertos
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
