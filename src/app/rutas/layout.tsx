import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rutas',
  description:
    'Descubre nuestras rutas de ciclismo favoritas. Distancia, desnivel, dificultad y paradas de café.',
  openGraph: {
    title: 'Rutas | BALAK RIDE',
    description:
      'Descubre nuestras rutas de ciclismo favoritas. Distancia, desnivel, dificultad y paradas de café.',
  },
};

export default function RutasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
