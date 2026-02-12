'use client';

import { Mountain } from 'lucide-react';

export default function HomeBalak() {
  return (
    <section className="min-h-screen snap-start flex items-center px-6 py-20">
      <div className="w-full max-w-3xl mx-auto">
        {/* Icon and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Mountain size={64} className="text-balak-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block">¿Qué significa BALAK?</span>
          </h3>
        </div>

        {/* Content */}
        <div className="text-white/80 text-base sm:text-lg md:text-2xl leading-relaxed space-y-8">
          <p className="text-center sm:text-left">
            BALAK nace de una palabra del maya yucateco con varios significados,
            pero todos conectan con la misma idea: el{' '}
            <span className="text-balak-400 font-semibold">movimiento</span>.
          </p>

          <p className="text-center sm:text-left">
            Por un lado,{' '}
            <em className="text-balak-400 font-semibold not-italic">balak</em>{' '}
            aparece como un verbo relacionado con volver o regresar. No como
            retroceder, sino como dar la vuelta, cerrar un ciclo y empezar otro.
            Algo muy parecido a lo que pasa cada vez que te subes a la bici:
            sales, te pierdes un poco y siempre vuelves distinto.
          </p>

          <p className="text-center sm:text-left">
            También está ligado al acto de{' '}
            <span className="text-balak-400 font-semibold">rodar</span>. En
            expresiones tradicionales se usa para hablar de la rotación y del
            giro continuo, como el de una rueda. Y ahí fue donde todo encajó: la
            bici no avanza sin girar, y nosotros tampoco.
          </p>

          <p className="text-center sm:text-left">
            Eso es lo que representa BALAK:{' '}
            <span className="text-balak-400 font-semibold">rodar</span> sin
            prisa, repetir rutas, volver a los mismos sitios y dar vueltas sin
            un destino exacto. No moverse por obligación, sino porque apetece.
          </p>
        </div>
      </div>
    </section>
  );
}
