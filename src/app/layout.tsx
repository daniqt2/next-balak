import type { Metadata } from 'next';
import { Geist, Geist_Mono, Anton } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import ConditionalNavbar from '../components/layout/ConditionalNavbar';
import ComingSoon from '../components/layout/ComingSoon';
import { MantineProvider } from '../components/layout/MantineProvider';
import PageTransition from '../components/layout/PageTransition';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const anton = Anton({
  weight: '400',
  variable: '--font-anton',
  subsets: ['latin'],
});

const siteTitle = 'BALAK RIDE';
const siteDescription =
  'Compartimos nuestras rutas favoritas y paradas de café';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  icons: {
    icon: '/icon.svg',

    shortcut: '/og-image.png',
    apple: '/og-image.png',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://balak.ride'
  ),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'es_ES',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: siteTitle },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.png'],
  },
};

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased text-white`}
      >
        <MantineProvider>
          {isComingSoon ? (
            <ComingSoon />
          ) : (
            <>
              <ConditionalNavbar />
              <PageTransition>{children}</PageTransition>
            </>
          )}
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
