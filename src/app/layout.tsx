import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "../components/layout/ConditionalNavbar";
import { MantineProvider } from "../components/layout/MantineProvider";
import PageTransition from "../components/layout/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BALAK RIDE",
  description: "Compartimos nuestras rutas favoritas y paradas de café",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased text-white`}
      >
        <MantineProvider>
          <ConditionalNavbar />
          <PageTransition>
            {children}
          </PageTransition>
        </MantineProvider>
      </body>
    </html>
  );
}
