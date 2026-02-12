import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Puertos',
  description:
    'Puertos de montaña que hemos subido. Desnivel, dificultad y rutas que los incluyen.',
  openGraph: {
    title: 'Puertos | BALAK RIDE',
    description:
      'Puertos de montaña que hemos subido. Desnivel, dificultad y rutas que los incluyen.',
  },
};

export default function PuertosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
