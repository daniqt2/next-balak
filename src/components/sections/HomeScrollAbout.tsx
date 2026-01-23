'use client';

import Image from 'next/image';
import { Instagram, Mail } from 'lucide-react';

export default function HomeScrollAbout() {
  return (
    <section className="min-h-screen snap-start flex items-center px-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left copy (home-like typography) */}
        <div>
          <div className="text-white/70 text-sm tracking-wide">Nosotros</div>
          <h3 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight">
            <span className="block">Creado por ciclistas</span>
            <b className="block">para ciclistas</b>
          </h3>
          <p className="mt-4 text-white/75 max-w-xl text-xl">
            Somos un grupo de amigos apasionados por la bici de carretera. Nos
            encanta subir puertos míticos que todo ciclista sueña con tachar de
            su lista, pero también descubrir esas carreteras escondidas que casi
            nadie conoce.
          </p>

          {/* CTAs + Redes */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3 ml-2">
              <a
                href="https://instagram.com/balak.ride"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-balak-400 text-balak-400 hover:bg-balak-400 hover:text-white transition"
                aria-label="Email"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:balak.ride@gmail.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-balak-400 text-balak-400 hover:bg-balak-400 hover:text-white transition"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right visual (overlapping images like home) */}
        <div className="relative w-full max-w-xl mx-auto">
          <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/ciclistas.png"
              alt="About main"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className=" hidden md:block absolute -bottom-6 -left-6 w-2/3 h-40 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/ciclista1.png"
              alt="About secondary"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
