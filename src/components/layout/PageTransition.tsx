'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

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
        gsap.set(containerRef.current, { y: 0, opacity: 1 });
      }
      return;
    }

    // Skip if path hasn't changed
    if (previousPath === currentPath) {
      return;
    }

    // Skip animation on back navigation
    if (isBackNavigation) {
      setIsBackNavigation(false);
      if (containerRef.current) {
        gsap.set(containerRef.current, { y: 0, opacity: 1 });
      }
      previousPathnameRef.current = currentPath;
      return;
    }

    // Simple slide up animation for forward route changes
    if (containerRef.current) {
      // Start: page below viewport
      gsap.set(containerRef.current, {
        y: '100vh',
        opacity: 0
      });

      // Animate: slide up and fade in
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
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

