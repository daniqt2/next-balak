import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cafés',
  description:
    'Paradas de café en ruta. Los mejores sitios para reponer fuerzas durante tus salidas en bici.',
  openGraph: {
    title: 'Cafés | BALAK RIDE',
    description:
      'Paradas de café en ruta. Los mejores sitios para reponer fuerzas durante tus salidas en bici.',
  },
};

export default function CoffeeSpotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
