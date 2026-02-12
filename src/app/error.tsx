'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ paddingTop: '64px' }}
    >
      <div className="container max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-charcoal-800 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-balak-orange-500" />
          </div>
        </div>
        <h1 className="font-anton text-2xl sm:text-3xl text-charcoal-900 uppercase tracking-wide mb-3">
          Algo ha fallado
        </h1>
        <p className="text-charcoal-600 text-sm sm:text-base mb-8">
          No hemos podido cargar esta página. Prueba de nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-charcoal-900 text-white font-medium hover:bg-charcoal-800 transition"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-charcoal-300 text-charcoal-800 font-medium hover:bg-charcoal-100 transition"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
