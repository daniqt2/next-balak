import type { Metadata } from 'next';
import HomeHero from '@/components/heroes/HomeHero';
import HomeScrollRoot from '@/components/home/HomeScrollRoot';
import HomeScrollIntro from '@/components/sections/HomeScrollIntro';
import HomeBalak from '@/components/sections/HomeBalak';
import HomeScrollAbout from '@/components/sections/HomeScrollAbout';

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Rutas de ciclismo, puertos de montaña y paradas de café. Compartimos nuestras rutas favoritas.',
  openGraph: {
    title: 'BALAK RIDE',
    description:
      'Rutas de ciclismo, puertos de montaña y paradas de café. Compartimos nuestras rutas favoritas.',
  },
};

export default function Home() {
  return (
    <HomeScrollRoot>
      <div className="min-h-screen bg-white" data-page="home">
        <div className="home-snap-section min-h-screen">
          <HomeHero />
        </div>
        <div id="intro" className="home-snap-section min-h-screen bg-charcoal-900">
          <HomeScrollIntro />
        </div>
        <div id="balak" className="home-snap-section min-h-screen bg-charcoal-900">
          <HomeBalak />
        </div>
        <div id="about" className="home-snap-section min-h-screen bg-charcoal-900">
          <HomeScrollAbout />
        </div>
      </div>
    </HomeScrollRoot>
  );
}
