'use client';

import Image from 'next/image';
import { Coffee, MapPin, Star } from 'lucide-react';

export default function HomeScrollCards() {
  return (
    <section className="min-h-screen snap-start flex items-center px-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Paradas favoritas */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
          <div className="flex items-center gap-3">
            <Coffee className="text-balak-400" />
            <h3 className="text-xl font-semibold">Paradas de café favoritas</h3>
          </div>
          <ul className="mt-4 space-y-3 text-white/80">
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-balak-300 mt-0.5" /> Tostadas
              crujientes y buen café
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-balak-300 mt-0.5" /> Terraza al sol
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-4 h-4 text-balak-300 mt-0.5" /> Sitio
              bike-friendly
            </li>
          </ul>
        </div>

        {/* Card 2: Mapa teaser */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <div className="absolute inset-0">
            <Image
              src="/cafe.png"
              alt="Mapa cafés"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative p-6 h-full flex flex-col justify-end">
            <div className="flex items-center gap-2">
              <MapPin className="text-balak-300" />
              <h3 className="text-xl font-semibold">Mapa de cafés cercanos</h3>
            </div>
            <p className="mt-2 text-white/80">
              Encuentra tu próxima parada sin desviarte de la ruta.
            </p>
            <div className="mt-4">
              <a
                href="/coffee-spots"
                className="inline-block bg-white text-gray-900 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
              >
                Abrir mapa
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Consejos rápidos */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
          <div className="mt-4 space-y-3 text-white/80">
            <p>
              Somos de ese tipo de gente que planea las rutas en base a las
              paradas.
            </p>
          </div>

          <div className="mt-6 flex gap-2 text-xs text-white/60">
            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              flat white
            </span>
            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              espresso
            </span>
            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
              tostadas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
