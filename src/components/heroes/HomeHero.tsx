'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import SideMenu from '@/components/ui/SideMenu';
import { gsap } from 'gsap';

export default function HomeHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);

  // Set initial state before first paint
  useLayoutEffect(() => {
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0 });
    }
    if (mobileLogoRef.current) {
      gsap.set(mobileLogoRef.current, { opacity: 0 });
    }
    if (desktopImageRef.current) {
      gsap.set(desktopImageRef.current, { opacity: 0 });
    }
    if (mobileImageRef.current) {
      gsap.set(mobileImageRef.current, { opacity: 0 });
    }
  }, []);

  useEffect(() => {
    const animateLogo = (element: HTMLElement, imageElement: HTMLElement | null, isMobile: boolean) => {
      // Get current position
      const rect = element.getBoundingClientRect();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate offset from center to final position
      const finalX = rect.left + rect.width / 2;
      const finalY = rect.top + rect.height / 2;
      const offsetX = finalX - centerX;
      const offsetY = finalY - centerY;

      // Start: centered, invisible, small
      gsap.set(element, {
        x: -offsetX,
        y: -offsetY,
        opacity: 0,
        scale: 0.7
      });

      // Start image invisible
      if (imageElement) {
        gsap.set(imageElement, {
          opacity: 0
        });
      }

      const tl = gsap.timeline();

      // 1. Fade in and scale up (at center via transform) - smoother
      tl.to(element, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      })
      // 2. Wait a bit
      .to({}, { duration: 0.6 })
      // 3. Slide to final position AND start image fade in simultaneously
      .to(element, {
        x: 0,
        y: 0,
        duration: 1.4,
        ease: 'power2.inOut'
      }, '>')
      .to(imageElement, {
        opacity: 1,
        duration: 1.4,
        ease: 'power2.inOut'
      }, '<')
      .call(() => {
        setIsVisible(true);
      });
    };

    // Wait for layout, then animate
    const timer = setTimeout(() => {
      if (logoRef.current && desktopImageRef.current && window.innerWidth >= 1024) {
        animateLogo(logoRef.current, desktopImageRef.current, false);
      }
      if (mobileLogoRef.current && mobileImageRef.current && window.innerWidth < 1024) {
        animateLogo(mobileLogoRef.current, mobileImageRef.current, true);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (logoRef.current) gsap.killTweensOf(logoRef.current);
      if (mobileLogoRef.current) gsap.killTweensOf(mobileLogoRef.current);
      if (desktopImageRef.current) gsap.killTweensOf(desktopImageRef.current);
      if (mobileImageRef.current) gsap.killTweensOf(mobileImageRef.current);
    };
  }, []);

  // Handle resize - show/hide elements correctly based on viewport size
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      
      if (isDesktop) {
        // Desktop: show desktop logo and image, hide mobile
        if (logoRef.current) {
          gsap.set(logoRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        }
        if (desktopImageRef.current) {
          gsap.set(desktopImageRef.current, { opacity: 1 });
        }
        if (mobileLogoRef.current) {
          gsap.set(mobileLogoRef.current, { opacity: 0 });
        }
        if (mobileImageRef.current) {
          gsap.set(mobileImageRef.current, { opacity: 0 });
        }
      } else {
        // Mobile: show mobile logo and image, hide desktop
        if (mobileLogoRef.current) {
          gsap.set(mobileLogoRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        }
        if (mobileImageRef.current) {
          gsap.set(mobileImageRef.current, { opacity: 1 });
        }
        if (logoRef.current) {
          gsap.set(logoRef.current, { opacity: 0 });
        }
        if (desktopImageRef.current) {
          gsap.set(desktopImageRef.current, { opacity: 0 });
        }
      }
    };

    // Debounce resize handler
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Check initial size
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <>
      <div 
        ref={heroRef}
        className="relative w-full overflow-hidden lg:h-screen"
        style={{ 
          minHeight: '100vh'
        }}
      >
        {/* Menu Button - Desktop: Top Right Corner */}
        <div className="hidden lg:block fixed top-12 right-12 z-50">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group relative bg-gray-900 text-white px-6 py-3 flex items-center gap-3 hover:bg-gray-800 transition-all duration-200 shadow-lg"
            aria-label="Open menu"
          >
            <span className="text-sm font-medium tracking-wide">MENU</span>
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-px bg-white transition-all group-hover:w-6" />
              <span className="block w-5 h-px bg-white transition-all group-hover:w-6" />
            </div>
          </button>
        </div>

        {/* Mobile Layout: Logo on top, Image below */}
        <div className="lg:hidden flex flex-col w-full">
          {/* Logo Section - Mobile (very compact) */}
          <div className="relative w-full bg-white flex flex-col px-4 pt-4 pb-2">
            <div 
              ref={mobileLogoRef}
              className="flex flex-col justify-start"
              style={{ opacity: 0 }}
            >
              <Logo 
                width="100%" 
                height="auto" 
                color="#111"
                className="max-w-full"
              />
            </div>

            {/* Bottom Text - Mobile (very compact) */}
            <div 
              className="flex flex-col gap-0.5 text-gray-900 my-10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}
            >
              <div className="text-m font-medium tracking-wide">
                BALAK RIDE
              </div>
              <div className="text-m font-light text-gray-700">
                  Compartimos nuestras rutas favoritas
              </div>
              <div className="text-m font-light text-gray-700">
                & Paradas de café
              </div>
            </div>
          </div>

          {/* Image - Mobile (below logo) */}
          <div ref={mobileImageRef} className="relative w-full bg-gray-100" style={{ aspectRatio: '16/9', opacity: 0 }}>
            <Image
              src="/balak-home.jpg"
              alt="Cycling route landscape"
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="100vw"
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>

          {/* Menu Button - Mobile: Below image, centered */}
          <div className="flex justify-center px-4 py-20">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group relative bg-gray-900 text-white px-6 py-3 flex items-center gap-3 hover:bg-gray-800 transition-all duration-200 shadow-lg"
              aria-label="Open menu"
            >
              <span className="text-sm font-medium tracking-wide">MENU</span>
              <div className="flex flex-col gap-1">
                <span className="block w-5 h-px bg-white transition-all group-hover:w-6" />
                <span className="block w-5 h-px bg-white transition-all group-hover:w-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Layout: Split screen with overlay */}
        <div className="hidden lg:block relative w-full h-full">
          {/* Full Width Image Background - Desktop */}
          <div ref={desktopImageRef} className="relative w-full bg-gray-100" style={{ 
            height: '100vh', 
            minHeight: '600px',
            opacity: 0
          }}>
            <div className="relative w-full h-full">
              <Image
                src="/balak-home.jpg"
                alt="Cycling route landscape"
                fill
                className="object-cover"
                priority
                quality={95}
                sizes="100vw"
                style={{
                  objectPosition: 'center right'
                }}
              />
              
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/[0.02] via-transparent to-transparent" />
            </div>
          </div>

          {/* Left Side - White Background with Logo - Overlay - Desktop */}
          <div className="absolute inset-0 w-[45%] bg-white flex flex-col justify-between p-12 xl:p-16 z-10 pointer-events-none">
            <div className="pointer-events-auto">
              {/* Logo Section */}
              <div 
                ref={logoRef}
                className="flex flex-col justify-start"
                style={{ opacity: 0 }}
              >
                <Logo 
                  width="100%" 
                  height="auto" 
                  color="#111"
                  className="max-w-5xl xl:max-w-6xl"
                />
              </div>
            </div>

            {/* Bottom Left Text - Desktop */}
            <div 
              className="flex flex-col gap-2 text-gray-900 pointer-events-auto"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
              }}
            >
              <div className="text-base font-medium tracking-wide">
                BALAK RIDE
              </div>
              <div className="text-base font-light text-gray-700">
                Compartimos nustras rutas favoritas
              </div>
              <div className="text-base font-light text-gray-700">
                & Paradas de café
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
