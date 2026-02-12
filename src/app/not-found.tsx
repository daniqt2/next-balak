import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ paddingTop: '64px' }}
    >
      <div className="container max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-charcoal-800 flex items-center justify-center">
            <FileQuestion className="w-8 h-8 text-charcoal-400" />
          </div>
        </div>
        <h1 className="font-anton text-2xl sm:text-3xl text-charcoal-900 uppercase tracking-wide mb-3">
          PÁJARA EN EL KM 404.
        </h1>
        <p className="text-charcoal-600 text-sm sm:text-base mb-8">
          Esta página se quedó sin fuerzas...
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-charcoal-900 text-white font-medium hover:bg-charcoal-800 transition"
          >
            Ir al inicio
          </Link>
          <Link
            href="/rutas"
            className="px-6 py-3 rounded-lg border border-charcoal-300 text-charcoal-800 font-medium hover:bg-charcoal-100 transition"
          >
            Rutas
          </Link>
          <Link
            href="/puertos"
            className="px-6 py-3 rounded-lg border border-charcoal-300 text-charcoal-800 font-medium hover:bg-charcoal-100 transition"
          >
            Puertos
          </Link>
          <Link
            href="/coffee-spots"
            className="px-6 py-3 rounded-lg border border-charcoal-300 text-charcoal-800 font-medium hover:bg-charcoal-100 transition"
          >
            Cafés
          </Link>
        </div>
      </div>
    </div>
  );
}
