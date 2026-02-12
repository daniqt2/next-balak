'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HomeScrollIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const topImgRef = useRef<HTMLDivElement>(null);
  const bottomImgRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimatedRef.current) return;

    const animateIn = () => {
      if (
        topImgRef.current &&
        bottomImgRef.current &&
        !hasAnimatedRef.current
      ) {
        hasAnimatedRef.current = true;
        gsap.fromTo(
          topImgRef.current,
          { y: -80, opacity: 0, rotate: -1.5, scale: 1.05 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
          }
        );
        gsap.fromTo(
          bottomImgRef.current,
          { y: 80, opacity: 0, rotate: 1.5, scale: 1.05 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          animateIn();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen snap-start flex items-center justify-center px-6"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Copy */}
        <div className="text-center lg:text-left max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold">
            Descubre nuestras rutas favoritas
          </h2>
          <p className="mt-4 text-white/70">
            y los mejores sitios para reponer fuerzas
          </p>
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
            <a
              href="/rutas"
              className="bg-white text-gray-900 px-6 py-3 font-semibold tracking-wide hover:bg-gray-100  transition rounded"
            >
              Ver rutas
            </a>
            <a
              href="/coffee-spots"
              className="text-white border-white border px-6 py-3 font-semibold tracking-wide transition rounded"
            >
              Ver cafés
            </a>
          </div>
        </div>

        {/* Images with wow effects */}
        <div className="relative w-full max-w-xl mx-auto">
          {/* Top image */}
          <div
            ref={topImgRef}
            className="relative h-40 sm:h-56 lg:h-64 rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/puertos.png"
              alt="Intro image top"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>

          {/* Bottom image */}
          <div
            ref={bottomImgRef}
            className="relative h-40 sm:h-56 lg:h-64 rounded-xl overflow-hidden shadow-2xl mt-6"
          >
            <Image
              src="/cafes.png"
              alt="Intro image bottom"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
