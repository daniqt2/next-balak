import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Creado por ciclistas para ciclistas. Rutas, puertos y paradas de café que compartimos.',
  openGraph: {
    title: 'Nosotros | BALAK RIDE',
    description:
      'Creado por ciclistas para ciclistas. Rutas, puertos y paradas de café que compartimos.',
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
