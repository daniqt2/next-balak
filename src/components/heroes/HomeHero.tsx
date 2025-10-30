'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import SideMenu from '@/components/ui/SideMenu';
import HomeScrollIntro from '@/components/sections/HomeScrollIntro';
import HomeScrollCards from '@/components/sections/HomeScrollCards';
import HomeScrollAbout from '@/components/sections/HomeScrollAbout';
import { gsap } from 'gsap';
// no route change for scroll section test

export default function HomeHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false); // Track if animation has already run (per mount)
  const hasPlayedOnceRef = useRef(false); // Persist across navigations (session)
  const hasPulledRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionIds = ['intro', 'coffee', 'about'] as const;

  // Set initial state before first paint (respect first-load-only behavior)
  useLayoutEffect(() => {
    // Read persisted flag from sessionStorage
    const played = typeof window !== 'undefined' && sessionStorage.getItem('homeIntroPlayed') === '1';
    hasPlayedOnceRef.current = played;

    const setVisible = () => {
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
      if (mobileLogoRef.current) gsap.set(mobileLogoRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
      if (desktopImageRef.current) gsap.set(desktopImageRef.current, { opacity: 1 });
      if (mobileImageRef.current) gsap.set(mobileImageRef.current, { opacity: 1 });
    };

    const setHidden = () => {
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 0 });
      if (mobileLogoRef.current) gsap.set(mobileLogoRef.current, { opacity: 0 });
      if (desktopImageRef.current) gsap.set(desktopImageRef.current, { opacity: 0 });
      if (mobileImageRef.current) gsap.set(mobileImageRef.current, { opacity: 0 });
    };

    if (played) {
      setVisible();
      setIsVisible(true);
      hasAnimatedRef.current = true;
    } else {
      setHidden();
    }
  }, []);

  useEffect(() => {
    // Prepare overlay initial state
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: 100, pointerEvents: 'none' });
    }

    const pullUp = (targetIndex?: number) => {
      if (!overlayRef.current) return;
      hasPulledRef.current = true;
      gsap.set(overlayRef.current, { pointerEvents: 'auto' });
      gsap.to(overlayRef.current, { 
        yPercent: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        onComplete: () => {
          const sc = scrollContainerRef.current;
          if (sc && typeof targetIndex === 'number') {
            sc.scrollTo({ top: targetIndex * sc.clientHeight, behavior: 'auto' });
          }
        }
      });
    };
    const pullDown = () => {
      if (!overlayRef.current) return;
      hasPulledRef.current = false;
      gsap.to(overlayRef.current, { yPercent: 100, duration: 0.8, ease: 'power3.inOut', onComplete: () => { gsap.set(overlayRef.current!, { pointerEvents: 'none' }); window.history.replaceState(null, '', location.pathname); } });
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !hasPulledRef.current) pullUp();
      // Close only if overlay is open AND inner scroll is at very top
      if (e.deltaY < -20 && hasPulledRef.current) {
        const sc = scrollContainerRef.current;
        if (sc && sc.scrollTop <= 0) pullDown();
      }
    };
    const el = heroRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: true });

    // Deep link: open overlay if hash corresponds to section
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#','') : '';
    const initialIndex = sectionIds.indexOf(hash as any);
    if (initialIndex >= 0) {
      pullUp(initialIndex);
    }

    return () => {
      if (el) el.removeEventListener('wheel', handleWheel as any);
    };
  }, []);

  // Keep hash in sync with current overlay section
  useEffect(() => {
    const sc = scrollContainerRef.current;
    if (!sc) return;
    const onScroll = () => {
      const idx = Math.round(sc.scrollTop / sc.clientHeight);
      const safeIdx = Math.min(Math.max(idx, 0), sectionIds.length - 1);
      const id = sectionIds[safeIdx];
      if (hasPulledRef.current) {
        window.history.replaceState(null, '', `#${id}`);
      }
    };
    sc.addEventListener('scroll', onScroll, { passive: true } as any);
    return () => sc.removeEventListener('scroll', onScroll as any);
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
        try {
          sessionStorage.setItem('homeIntroPlayed', '1');
          hasPlayedOnceRef.current = true;
        } catch {}
      });
    };

    // Only animate on first app load (skip if already played once in session)
    if (hasAnimatedRef.current || hasPlayedOnceRef.current) {
      // Animation already ran, just show elements
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && logoRef.current && desktopImageRef.current) {
        gsap.set(logoRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(desktopImageRef.current, { opacity: 1 });
      } else if (!isDesktop && mobileLogoRef.current && mobileImageRef.current) {
        gsap.set(mobileLogoRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
        gsap.set(mobileImageRef.current, { opacity: 1 });
      }
      setIsVisible(true);
      return;
    }

    // Wait for layout, then animate (only first time)
    const timer = setTimeout(() => {
      hasAnimatedRef.current = true; // Mark as animated (this mount)
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
        {/* Pull-up overlay for scroll test */}
        <div ref={overlayRef} className="absolute inset-0 bg-gray-900 z-50">
          {/* Scrollable stacked sections */}
          <div ref={scrollContainerRef} className="h-full w-full overflow-y-auto snap-y snap-mandatory">
            <div id="intro"><HomeScrollIntro /></div>
            <div id="coffee"><HomeScrollCards /></div>
            <div id="about"><HomeScrollAbout /></div>
          </div>
        </div>
        
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
              data-logo="mobile"
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
          <div ref={mobileImageRef} data-image="mobile" className="relative w-full bg-gray-100" style={{ aspectRatio: '16/9', opacity: 0 }}>
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

        <div className="hidden lg:block relative w-full h-full">
          <div ref={desktopImageRef} data-image="desktop" className="relative w-full bg-gray-100" style={{ 
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
              
              <div className="absolute inset-0 bg-gradient-to-l from-black/[0.02] via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute inset-0 w-[25%] bg-white flex flex-col justify-between p-12 xl:p-16 z-10 pointer-events-none overflow-visible">
            <div className="pointer-events-auto">
              {/* Logo Section */}
              <div 
                ref={logoRef}
                data-logo="desktop"
                className="flex flex-col justify-start relative z-20"
                style={{ opacity: 0 }}
              >
                <Logo 
                  width="100%" 
                  height="auto" 
                  color="#111"
                  className="scale-[2.2] xl:scale-[2.8] origin-left drop-shadow-sm"
                />
              </div>
            </div>

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

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
