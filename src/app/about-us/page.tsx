'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { useRouteCount } from '@/hooks/useRouteCount';
import {
  Camera,
  Coffee,
  Heart,
  Instagram,
  Mail,
  Mountain,
  Users,
} from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  const { count: routeCount, loading: routeCountLoading } = useRouteCount();

  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <Image
          src="/about-optimized.jpg"
          alt="Grupo de amigos ciclistas"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Nosotros</h1>
          <p className="text-xl text-balak-200 max-w-2xl mx-auto">
            Bicis, puertos y cafés
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <AnimatedSection delay={100}>
          <div className="text-left mb-16">
            <p className="text-lg text-charcoal-800 max-w-4xl mx-auto leading-relaxed">
              Somos un grupo de amigos <b>apasionados por la bici</b>,
              especialmente de carretera. Nos motiva subir{' '}
              <b>puertos míticos</b> que todo ciclista sueña con tachar de su
              lista, pero también perdernos por <b>carreteras secundarias</b> y
              descubrir lugares a los que casi nadie llega pedaleando.
              <br />
              <br />
              Nos gusta conocer sitios en bici y disfrutar de todo lo que rodea
              a una ruta: las charlas a mitad de subida, las risas en la cima y
              las paradas improvisadas en cafés donde la ruta, casi siempre, se
              alarga un poco más.
              <br />
              <br />
              <b>Balak</b> nace para compartir todo eso: las rutas que nos
              inspiran, los puertos que nos ponen a prueba y los lugares donde
              recuperamos fuerzas antes de seguir pedaleando.
              <br />
              <br />
              Si para ti la bici es también una forma de explorar, viajar y
              vivir con calma, aquí vas a sentirte como en casa.
            </p>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection delay={400}>
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
              <div className="text-center">
                <div className="w-32 h-32 bg-balak-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-800 mb-2">
                  Experiencias Reales
                </h3>
                <p className="text-charcoal-800">
                  Todas las rutas que compartimos las hemos hecho nosotros.
                  Hemos pasado por las cafeterías y los baches de cada ruta..
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-balak-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mountain className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                  Caza-Puertos
                </h3>
                <p className="text-charcoal-800">
                  Siempre buscando carreteras escondidas y subidas que aún no
                  están en Strava.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-balak-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Coffee className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                  Cafeteros
                </h3>
                <p className="text-charcoal-800">
                  Los que saben exactamente dónde está el mejor café… y el
                  pastel más grande.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection delay={500}>
          <div className="text-center bg-charcoal-800 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              ¡Conecta con Nosotros!
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Síguenos en Instagram para ver nuestras aventuras en tiempo real y
              contáctanos si tienes alguna pregunta.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://instagram.com/balak.ride"
                target="_blank"
                rel="noopener noreferrer"
                className="lex items-center gap-3 border border-balak-400 text-balak-400 hover:bg-balak-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="mailto:balak.ride@gmail.com"
                className="flex items-center gap-3 border border-balak-400 text-balak-400 hover:bg-balak-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
