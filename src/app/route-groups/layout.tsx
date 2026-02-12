import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestras rutas',
  description:
    'Rutas agrupadas por área o tema. Viajes y colecciones de rutas de ciclismo.',
  openGraph: {
    title: 'Nuestras rutas | BALAK RIDE',
    description:
      'Rutas agrupadas por área o tema. Viajes y colecciones de rutas de ciclismo.',
  },
};

export default function RouteGroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
