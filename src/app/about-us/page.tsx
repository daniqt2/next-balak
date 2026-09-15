import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Coffee, Instagram, Mail, Mountain } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Somos un grupo de amigos apasionados por la bici. Rutas reales, puertos míticos y las mejores paradas de café.',
};

const TRAITS = [
  {
    icon: Camera,
    title: 'Experiencias reales',
    text: 'Todas las rutas que compartimos las hemos hecho nosotros. Hemos pasado por las cafeterías y los baches de cada ruta.',
  },
  {
    icon: Mountain,
    title: 'Caza-puertos',
    text: 'Siempre buscando carreteras escondidas y subidas que aún no están en Strava.',
  },
  {
    icon: Coffee,
    title: 'Cafeteros',
    text: 'Los que saben exactamente dónde está el mejor café… y el pastel más grande.',
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Sobre nosotros' }]} backHref="/" />

      <div className="container mx-auto px-4 pb-16 md:pb-24">
        {/* Intro: copy left, team photo right */}
        <AnimatedSection delay={100}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-charcoal-600">
                Sobre nosotros
              </p>
              <h1 className="mt-4 font-anton uppercase text-charcoal-900 text-[clamp(2.6rem,5vw,4.25rem)] leading-[0.9] tracking-[-0.02em]">
                Ciclismo real,
                <br />
                sin filtros.
              </h1>

              <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-charcoal-600">
                <p>
                  Somos un grupo de 3 amigos apasionados por la bici, sobre todo
                  de carretera. Nos gusta subir puertos míticos, perdernos por
                  carreteras secundarias y descubrir sitios que merece la pena
                  conocer pedaleando.
                </p>
                <p>
                  En <strong className="font-semibold text-charcoal-900">Balak</strong>{' '}
                  compartimos rutas reales, probadas por nosotros: los puertos
                  que nos retan y los lugares donde siempre paramos a recuperar.
                  Si para ti la bici es una forma de explorar y disfrutar el
                  camino, estás en casa.
                </p>
              </div>

              <Link href="/rutas" className="about-cta mt-8">
                Nuestras rutas
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <figure className="about-photo">
              <Image
                src="/balak-team-full.jpg"
                alt="El equipo de BALAK RIDE con sus bicicletas en la Valle del Lozoya"
                fill
                priority
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <figcaption className="about-photo__caption">
                Rutas
                <br />
                Puertos
                <br />
                Café
              </figcaption>
            </figure>
          </div>
        </AnimatedSection>

        {/* What defines us */}
        <AnimatedSection delay={200}>
          <div className="about-traits">
            {TRAITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="about-trait">
                <span className="about-trait__badge" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="about-trait__title">{title}</h2>
                  <p className="about-trait__text">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Philosophy: the meaning of BALAK */}
        <AnimatedSection delay={200}>
          <div className="about-philosophy">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-charcoal-600">
                Nuestra filosofía
              </p>
              <h2 className="mt-4 font-anton uppercase text-charcoal-900 text-[clamp(2rem,3.6vw,3.25rem)] leading-[0.92] tracking-[-0.02em]">
                ¿Qué significa
                <br />
                Balak?
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg leading-relaxed text-charcoal-600">
              <p>
                BALAK nace de una palabra del maya yucateco con varios
                significados, pero todos conectan con la misma idea: el{' '}
                <span className="about-highlight">movimiento</span>.
              </p>
              <p>
                Por un lado, <span className="about-highlight">balak</span>{' '}
                aparece como un verbo relacionado con volver o regresar. No como
                retroceder, sino como dar la vuelta, cerrar un ciclo y empezar
                otro. Algo muy parecido a lo que pasa cada vez que te subes a la
                bici: sales, te pierdes un poco y siempre vuelves distinto.
              </p>
              <p>
                También está ligado al acto de{' '}
                <span className="about-highlight">rodar</span>. En expresiones
                tradicionales se usa para hablar de la rotación y del giro
                continuo, como el de una rueda. Y ahí fue donde todo encajó: la
                bici no avanza sin girar, y nosotros tampoco.
              </p>
              <p>
                Eso es lo que representa BALAK:{' '}
                <span className="about-highlight">rodar</span> sin prisa,
                repetir rutas, volver a los mismos sitios y dar vueltas sin un
                destino exacto. No moverse por obligación, sino porque apetece.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Community band */}
        <AnimatedSection delay={300}>
          <div className="about-community">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em]">
                Conecta con nosotros
              </p>
              <p className="about-community__title mt-2 font-anton uppercase text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[0.95]">
                Más rutas, mejores historias.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/balak.ride"
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta"
              >
                <Instagram size={18} aria-hidden="true" />
                Síguenos en Instagram
              </a>
              <a
                href="mailto:balak.ride@gmail.com"
                className="about-cta about-cta--ghost"
              >
                <Mail size={18} aria-hidden="true" />
                Contactar
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Privacy / Analytics notice */}
        <AnimatedSection delay={400}>
          <div className="mt-14 border-t border-charcoal-300/60 pt-8 text-center">
            <p className="mx-auto max-w-xl text-sm text-charcoal-500">
              Utilizamos análisis de uso (Vercel Analytics) para entender cómo se
              usa la web y mejorarla. No usamos cookies para este análisis.{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-charcoal-800"
              >
                Política de privacidad de Vercel
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
