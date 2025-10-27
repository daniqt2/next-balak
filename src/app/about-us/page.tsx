'use client';

import React from 'react';
import { Mountain, Users, Heart, MapPin, Award, Coffee, Instagram, Mail, Camera } from 'lucide-react';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useRouteCount } from '@/hooks/useRouteCount';

export default function AboutUsPage() {
  const { count: routeCount, loading: routeCountLoading } = useRouteCount();

  return (
    <div className="min-h-screen bg-gray-900" style={{ paddingTop: '64px' }}>
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
          <div className="text-center mb-16">
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Somos un grupo de amigos apasionados por la bici de carretera. Nos encanta subir puertos míticos que todo ciclista sueña con tachar de su lista, pero también descubrir esas carreteras escondidas que casi nadie conoce.
            <br/>
            <br/>
            Lo que más disfrutamos no son solo las pedaladas, sino todo lo que las rodea: las charlas en medio de una subida, las risas en la cima y, por supuesto, las paradas en los cafés donde siempre se alarga un poco más la ruta.
            Balak nació para compartir todo eso: las rutas que nos inspiran, 
            los puertos que nos hacen sufrir y los lugares donde recuperamos fuerzas. Si la bici es también tu manera de vivir aventuras, aquí vas a sentirte como en casa.
            </p>
          </div>
        </AnimatedSection>

        {/* Values Section */}
        <AnimatedSection delay={200}>
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-800 rounded-xl">
                <Mountain className="w-12 h-12 text-balak-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Experiencias Reales</h3>
                <p className="text-gray-300">
                  Todas las rutas que compartimos las hemos hecho nosotros. Hemos pasado por las cafeterías y los baches de cada ruta.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-800 rounded-xl">
                <Camera className="w-12 h-12 text-balak-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Postureo</h3>
                <p className="text-gray-300">
                Nunca falta la parada para la foto: bici apoyada, paisaje épico y sonrisa como si no dolieran las piernas.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-800 rounded-xl">
                <Heart className="w-12 h-12 text-balak-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Pasión por sufrir</h3>
                <p className="text-gray-300">
                Amamos los puertos: los míticos, los escondidos y hasta esos que juramos no volver a subir… pero siempre volvemos.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Story Section */}
        <AnimatedSection delay={300}>
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Nuestra Historia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Desde 2023</h3>
                <p className="text-gray-300 mb-4">
                  Todo comenzó con un grupo de amigos ciclistas que querían documentar las mejores 
                  rutas de bici... y sobre todo el donde para a repooner fuerzas. 
                </p>
                <p className="text-gray-300 mb-4">
                Lo que empezó como salidas de domingo se convirtió en un proyecto para dar a conocer esos lugares que marcan a los ciclistas: las carreteras que te ponen a prueba, los paisajes que se quedan en la memoria y los cafés que saben mejor después de una subida. 
                </p>
                <div className="flex items-center gap-4 text-balak-400">
                  <MapPin className="w-5 h-5" />
                  <span>{routeCountLoading ? 'Cargando...' : `${routeCount}+ Rutas Documentadas`}</span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-6">
                    🚴‍♂️ 🏔️ ☕ 🚴‍♀️ 🏔️ ☕ 🚴‍♂️
                  </div>
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-4xl mb-2">🚴‍♂️</div>
                      <div className="text-gray-300">Pedalear</div>
                    </div>
                    <div>
                      <div className="text-4xl mb-2">🏔️</div>
                      <div className="text-gray-300">Subir</div>
                    </div>
                    <div>
                      <div className="text-4xl mb-2">☕</div>
                      <div className="text-gray-300">Recuperar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection delay={400}>
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Los Amigos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-balak-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Escaladores</h3>
                <p className="text-gray-300">
                Los que aprietan en cada puerto solo para la foto del Strava.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-balak-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mountain className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Caza-Puertos</h3>
                <p className="text-gray-300">
                Siempre buscando carreteras escondidas y subidas que aún no están en Strava.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-balak-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Coffee className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cafeteros</h3>
                <p className="text-gray-300">
                    Los que saben exactamente dónde está el mejor café… y el pastel más grande.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection delay={500}>
          <div className="text-center bg-gray-800 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">¡Conecta con Nosotros!</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Síguenos en Instagram para ver nuestras aventuras en tiempo real y 
              contáctanos si tienes alguna pregunta.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="https://instagram.com/balak.ride" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
