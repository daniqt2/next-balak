'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

export default function ScrollTestPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (overlayRef.current) gsap.set(overlayRef.current, { yPercent: 0 });

    const goBackWithinApp = () => {
      const idx = (window.history.state && (window.history.state as any).idx) ?? 0;
      const canGoBack = window.history.length > 1 && idx > 0;
      if (canGoBack) router.back();
      else router.push('/');
    };

    const triggerPullDown = () => {
      if (!overlayRef.current) return;
      gsap.to(overlayRef.current, {
        yPercent: 100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: goBackWithinApp,
      });
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < -20) triggerPullDown();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel as any);
    };
  }, [router]);

  return (
    <div className="min-h-screen text-white flex items-center justify-center relative overflow-hidden">
      {/* Overlay panel that can slide down to reveal previous page */}
      <div ref={overlayRef} className="absolute inset-0 z-50" />

      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold">Pulled Up Page</h1>
        <p className="mt-4 text-lg text-white/70">Scroll up to go back.</p>
      </div>
    </div>
  );
}


