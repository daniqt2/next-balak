'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { getAndClearBackNavigation } from '@/components/ui/Breadcrumbs';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>('');
  const isFirstMountRef = useRef(true);
  const [isBackNavigation, setIsBackNavigation] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsBackNavigation(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const currentPath = pathname;
    const previousPath = previousPathnameRef.current;

    // Skip animation on very first mount
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      previousPathnameRef.current = currentPath;
      if (containerRef.current) {
        gsap.set(containerRef.current, { x: 0, y: 0, opacity: 1 });
      }
      return;
    }

    // Skip if path hasn't changed
    if (previousPath === currentPath) {
      return;
    }

    const isBack =
      isBackNavigation || (typeof window !== 'undefined' && getAndClearBackNavigation());
    if (isBackNavigation) setIsBackNavigation(false);

    if (isBack && containerRef.current) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
      // Back: subtle fade (same feel as forward)
      gsap.set(containerRef.current, { x: 0, y: 0, opacity: 0 });
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
    } else if (containerRef.current) {
      // Forward: subtle lift (small y + fade)
      gsap.set(containerRef.current, {
        x: 0,
        y: 32,
        opacity: 0,
      });
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      });
    }

    previousPathnameRef.current = currentPath;
  }, [pathname, isBackNavigation]);

  return (
    <div 
      ref={containerRef} 
      className="page-transition-wrapper relative"
      style={{ 
        willChange: 'transform, opacity',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  );
}

