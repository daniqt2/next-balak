'use client';

import { useEffect, useRef } from 'react';
import Logo from '@/components/ui/Logo';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Instagram, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import '@/styles/homeHero.css';

export default function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mobileTitleRef = useRef<HTMLDivElement>(null);
  const desktopTitleRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

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
      <div ref={heroRef} className="home-hero">
        {/* Mobile Layout: Big hero with BALAK RIDE overlay + one floating menu card */}
        <div className="home-hero__mobile">
          <div className="home-hero__mobile-hero">
            <Image
              src="/balak-home.jpg"
              alt="Cycling route landscape"
              fill
              priority
              quality={95}
              sizes="100vw"
            />
            <div className="home-hero__overlay" />
            <div className="home-hero__title-wrap">
              <h1 ref={mobileTitleRef} className="home-hero__title">
                BALAK RIDE
              </h1>
              <p className="home-hero__subtitle">RUTAS · PUERTOS · CAFÉ</p>
            </div>
            <div className="home-hero__scroll-indicator">
              <ChevronDown className="home-hero__scroll-icon" aria-hidden />
            </div>
          </div>

          <div className="home-hero__floating-card-wrap">
            <div ref={mobileNavRef} className="home-hero__floating-card">
              <a href="/rutas">
                <span>Rutas</span>
                <ChevronRight className="home-hero__nav-chevron" />
              </a>
              <a href="/puertos">
                <span>Puertos</span>
                <ChevronRight className="home-hero__nav-chevron" />
              </a>
              <a href="/coffee-spots">
                <span>Donde parar</span>
                <ChevronRight className="home-hero__nav-chevron" />
              </a>
              <a href="/about-us">
                <span>Sobre Nosotros</span>
                <ChevronRight className="home-hero__nav-chevron" />
              </a>
            </div>
          </div>
        </div>

        <div className="home-hero__desktop">
          <div className="home-hero__desktop-image-wrap">
            <div className="home-hero__desktop-image-inner">
              <Image
                src="/balak-home.jpg"
                alt="Cycling route landscape"
                fill
                priority
                quality={95}
                sizes="100vw"
              />
              <div className="home-hero__desktop-overlay" />
            </div>
          </div>

          <div className="home-hero__desktop-sidebar">
            <div>
              <div className="home-hero__desktop-logo-wrap">
                <Logo
                  width="100%"
                  height="auto"
                  color="#111"
                  className="scale-[2.2] xl:scale-[2.8] origin-left drop-shadow-sm"
                />
              </div>
            </div>

            <nav ref={desktopNavRef} className="home-hero__desktop-nav">
              <a
                href="/rutas"
                className="nav-link group text-2xl font-anton tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Rutas</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
              <a
                href="/puertos"
                className="nav-link group text-2xl font-anton tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Puertos</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
              <a
                href="/coffee-spots"
                className="nav-link group text-2xl font-anton tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Donde parar</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
              <a
                href="/about-us"
                className="nav-link group text-2xl font-anton tracking-wider cursor-pointer relative inline-block"
              >
                <span className="relative z-10">Sobre Nosotros</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#111] to-[#666] transition-[width] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-left group-hover:w-full"></span>
              </a>
            </nav>

            <div className="home-hero__desktop-title-wrap">
              <div ref={desktopTitleRef} className="home-hero__desktop-title">
                BALAK RIDE
              </div>
              <div className="home-hero__desktop-title-text">
                Compartimos nuestras rutas favoritas
              </div>
              <div className="home-hero__desktop-title-text">
                & Paradas de café
              </div>
              <div className="home-hero__desktop-social-wrap">
                <a
                  href="https://instagram.com/balak.ride"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-hero__desktop-social-link"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="mailto:balak.ride@gmail.com"
                  className="home-hero__desktop-social-link"
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
