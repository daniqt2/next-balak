'use client';

import { useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import HomeScrollIntro from '@/components/sections/HomeScrollIntro';
import HomeScrollCards from '@/components/sections/HomeBalak';
import HomeScrollAbout from '@/components/sections/HomeScrollAbout';
import { gsap } from 'gsap';
import HomeBalak from '@/components/sections/HomeBalak';
import { Instagram, Mail } from 'lucide-react';

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasPulledRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionIds = ['intro', 'coffee', 'about'] as const;
  const mobileTitleRef = useRef<HTMLDivElement>(null);
  const desktopTitleRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

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
            sc.scrollTo({
              top: targetIndex * sc.clientHeight,
              behavior: 'auto',
            });
          }
        },
      });
    };
    const pullDown = () => {
      if (!overlayRef.current) return;
      hasPulledRef.current = false;
      gsap.to(overlayRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current!, { pointerEvents: 'none' });
          window.history.replaceState(null, '', location.pathname);
        },
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !hasPulledRef.current) pullUp();
      // Close only if overlay is open AND inner scroll is at very top
      if (e.deltaY < -20 && hasPulledRef.current) {
        const sc = scrollContainerRef.current;
        if (sc && sc.scrollTop <= 0) pullDown();
      }
    };

    // Touch handlers for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!hasPulledRef.current) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // Only prevent default if:
        // 1. User is at the top of the page (scrollTop === 0)
        // 2. User is swiping up (scrolling down)
        // 3. Overlay is not open
        if (scrollTop === 0 && deltaY > 10) {
          isScrolling = true;
          e.preventDefault();
        }
      } else {
        // When overlay is open, check if we're at the top of the scroll container
        const sc = scrollContainerRef.current;
        if (sc && sc.scrollTop <= 0) {
          const touchY = e.touches[0].clientY;
          const deltaY = touchStartY - touchY;
          // If swiping down (scroll up) at the top, prevent default
          if (deltaY < -10) {
            e.preventDefault();
            isScrolling = true;
          }
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const deltaTime = Date.now() - touchStartTime;
      const minSwipeDistance = 50;
      const maxSwipeTime = 500;

      if (!hasPulledRef.current && isScrolling) {
        // Swipe up (scroll down) - open overlay
        if (deltaY > minSwipeDistance && deltaTime < maxSwipeTime) {
          pullUp();
        }
      } else if (hasPulledRef.current && isScrolling) {
        // Swipe down (scroll up) - close overlay if at top
        if (deltaY < -minSwipeDistance && deltaTime < maxSwipeTime) {
          const sc = scrollContainerRef.current;
          if (sc && sc.scrollTop <= 0) {
            pullDown();
          }
        }
      }
    };

    const el = heroRef.current;

    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: true });
      el.addEventListener('touchstart', handleTouchStart, { passive: true });
      el.addEventListener('touchmove', handleTouchMove, { passive: false });
      el.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Deep link: open overlay if hash corresponds to section
    const hash =
      typeof window !== 'undefined'
        ? window.location.hash.replace('#', '')
        : '';
    const initialIndex = sectionIds.indexOf(hash as any);
    if (initialIndex >= 0) {
      pullUp(initialIndex);
    }

    return () => {
      if (el) {
        el.removeEventListener('wheel', handleWheel as any);
        el.removeEventListener('touchstart', handleTouchStart as any);
        el.removeEventListener('touchmove', handleTouchMove as any);
        el.removeEventListener('touchend', handleTouchEnd as any);
      }
    };
  }, []);

  // Attach touch handlers to scroll container for closing overlay
  useEffect(() => {
    const sc = scrollContainerRef.current;
    if (!sc) return;

    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (hasPulledRef.current && sc.scrollTop <= 0) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        // If swiping down (scroll up) at the top, prevent default
        if (deltaY < -10) {
          e.preventDefault();
          isScrolling = true;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (hasPulledRef.current && isScrolling) {
        touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const deltaTime = Date.now() - touchStartTime;
        const minSwipeDistance = 50;
        const maxSwipeTime = 500;

        // Swipe down (scroll up) - close overlay if at top
        if (
          deltaY < -minSwipeDistance &&
          deltaTime < maxSwipeTime &&
          sc.scrollTop <= 0
        ) {
          hasPulledRef.current = false;
          gsap.to(overlayRef.current!, {
            yPercent: 100,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.set(overlayRef.current!, { pointerEvents: 'none' });
              window.history.replaceState(null, '', location.pathname);
            },
          });
        }
      }
    };

    sc.addEventListener('touchstart', handleTouchStart, { passive: true });
    sc.addEventListener('touchmove', handleTouchMove, { passive: false });
    sc.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      sc.removeEventListener('touchstart', handleTouchStart as any);
      sc.removeEventListener('touchmove', handleTouchMove as any);
      sc.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, []);

  // Intersection observer for title animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('title-animate-in');
          // Unobserve after animation to prevent re-triggering
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (mobileTitleRef.current) {
      observer.observe(mobileTitleRef.current);
    }
    if (desktopTitleRef.current) {
      observer.observe(desktopTitleRef.current);
    }

    return () => {
      if (mobileTitleRef.current) observer.unobserve(mobileTitleRef.current);
      if (desktopTitleRef.current) observer.unobserve(desktopTitleRef.current);
    };
  }, []);

  // Set navigation to final state immediately (no animation)
  useEffect(() => {
    const setNavState = (navElement: HTMLElement | null) => {
      if (!navElement) return;

      const links = navElement.querySelectorAll('a');
      if (links.length === 0) return;

      // Set final state immediately - no movement, just appear
      gsap.set(links, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.05em',
      });
    };

    // Set desktop nav
    if (desktopNavRef.current) {
      setNavState(desktopNavRef.current);
    }

    // Set mobile nav
    if (mobileNavRef.current) {
      setNavState(mobileNavRef.current);
    }
  }, []);

  return (
    <>
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden lg:h-screen"
        style={{
          minHeight: '100vh',
        }}
      >
        {/* Pull-up overlay: start off-screen to avoid flash of scrollable content before GSAP runs */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-charcoal-900 z-50"
          style={{ transform: 'translateY(100%)', pointerEvents: 'none' }}
        >
          {/* Scrollable stacked sections */}
          <div
            ref={scrollContainerRef}
            className="h-full w-full overflow-y-auto snap-y snap-mandatory"
          >
            <div id="intro">
              <HomeScrollIntro />
            </div>
            <div id="about">
              <HomeScrollAbout />
            </div>
            <div id="coffee">
              <HomeBalak />
            </div>
          </div>
        </div>

        {/* Mobile Layout: Logo on top, Image below */}
        <div className="lg:hidden flex flex-col w-full">
          {/* Logo Section - Mobile (very compact) */}
          <div className="relative w-full bg-white flex flex-col px-4 pt-4 pb-2">
            <div className="flex flex-col justify-start animate-fade-in">
              <Logo
                width="100%"
                height="auto"
                color="#111"
                className="max-w-full"
              />
            </div>

            {/* Bottom Text - Mobile (very compact) */}
            <div className="hidden lg:flex flex-col gap-0.5 text-gray-900 my-10 animate-fade-in-delay">
              <div
                ref={mobileTitleRef}
                className="text-m font-medium tracking-wide title-intersect"
              >
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
          <div
            className="relative w-full bg-gray-100 animate-fade-in"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src="/balak-home.jpg"
              alt="Cycling route landscape"
              fill
              className="object-contain"
              priority
              quality={95}
              sizes="100vw"
              style={{
                objectPosition: 'center center',
              }}
            />
          </div>

          {/* Navigation - Mobile (below image) */}
          <div className="w-full bg-white px-4 py-12">
            <nav
              ref={mobileNavRef}
              className="text-center lg:text-left flex flex-col gap-4 text-gray-900"
            >
              <a
                href="/rutas"
                className="nav-link-mobile text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Rutas</span>
              </a>
              <a
                href="/puertos"
                className="nav-link-mobile text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Puertos</span>
              </a>
              <a
                href="/coffee-spots"
                className="nav-link-mobile text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Cafés</span>
              </a>
              <a
                href="/about-us"
                className="nav-link-mobile text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Nosotros</span>
              </a>
            </nav>
          </div>
        </div>

        <div className="hidden lg:block relative w-full h-full">
          <div
            className="relative w-full bg-gray-100 animate-fade-in"
            style={{
              height: '100vh',
              minHeight: '600px',
            }}
          >
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
                  objectPosition: 'center right',
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-l from-black/[0.02] via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute inset-0 w-[25%] bg-white flex flex-col justify-between p-12 xl:p-16 z-10 pointer-events-none overflow-visible">
            <div className="pointer-events-auto">
              {/* Logo Section */}
              <div className="flex flex-col justify-start relative z-20 animate-fade-in">
                <Logo
                  width="100%"
                  height="auto"
                  color="#111"
                  className="scale-[2.2] xl:scale-[2.8] origin-left drop-shadow-sm"
                />
              </div>
            </div>

            <nav
              ref={desktopNavRef}
              className="flex flex-col gap-5 text-gray-900 pointer-events-auto"
            >
              <a
                href="/rutas"
                className="nav-link group text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Rutas</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
              <a
                href="/puertos"
                className="nav-link group text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Puertos</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
              <a
                href="/coffee-spots"
                className="nav-link group text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Cafés</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
              <a
                href="/about-us"
                className="nav-link group text-2xl font-medium tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Nosotros</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
            </nav>

            <div className="flex flex-col gap-2 text-gray-900 pointer-events-auto animate-fade-in-delay">
              <div
                ref={desktopTitleRef}
                className="text-base font-medium tracking-wide title-intersect"
              >
                BALAK RIDE
              </div>
              <div className="text-base font-light text-gray-700">
                Compartimos nuestras rutas favoritas
              </div>
              <div className="text-base font-light text-gray-700">
                & Paradas de café
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://instagram.com/balak.ride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="mailto:balak.ride@gmail.com"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
