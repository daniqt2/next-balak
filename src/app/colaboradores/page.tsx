import type { Metadata } from 'next';
import type { Partner } from '@/contentful-types';
import { getPartnersCached } from '@/lib/contentful-cache';
import PartnerRow from '@/components/colaboradores/PartnerRow';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AnimatedSection from '@/components/ui/AnimatedSection';

/** Revalidate every 10 min so new partners appear without redeploy */
export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Colaboradores',
  description: 'Marcas y proyectos que comparten nuestra forma de entender el ciclismo.',
};

export default async function ColaboradoresPage() {
  const data = await getPartnersCached({ limit: 50 });

  const partners =
    data?.partnerCollection?.items?.filter((p): p is Partner => p != null) ?? [];

  return (
    <div className="min-h-screen" style={{ paddingTop: '64px' }}>
      <Breadcrumbs items={[{ label: 'Colaboradores' }]} backHref="/" />

      <div className="container mx-auto px-4 pt-6 md:pt-12 pb-12 md:pb-20">
        <AnimatedSection delay={100}>
          <h1 className="font-anton uppercase text-charcoal-900 text-[clamp(2.6rem,4.5vw,3.75rem)] leading-[0.9] tracking-[-0.02em]">
            Colaboradores
          </h1>
          <p className="mt-4 max-w-xl text-base md:text-lg text-charcoal-600">
            Marcas y proyectos que nos ayudan a compartir nuestra forma de entender el ciclismo. 
          </p>
        </AnimatedSection>

        {partners.length === 0 ? (
          <p className="mt-16 text-charcoal-600">
            Pronto compartiremos con quién rodamos.
          </p>
        ) : (
          <div className="mt-12 md:mt-16">
            {partners.map((partner, index) => (
              <PartnerRow
                key={partner.sys.id}
                partner={partner}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
