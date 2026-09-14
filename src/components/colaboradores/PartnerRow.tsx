import Image from 'next/image';
import { ArrowUpRight, Instagram } from 'lucide-react';
import type { Partner } from '@/contentful-types';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface PartnerRowProps {
  partner: Partner;
  /** Zero-based position, rendered as the 01 / 02 marker on the photo. */
  index: number;
}

/** Strips a leading @ or a full instagram.com URL down to the bare handle. */
function toInstagramHandle(value: string) {
  const trimmed = value.trim().replace(/\/+$/, '');
  const fromUrl = trimmed.match(/instagram\.com\/([^/?#]+)/i);
  return (fromUrl ? fromUrl[1] : trimmed).replace(/^@/, '');
}

export default function PartnerRow({ partner, index }: PartnerRowProps) {
  const handle = partner.instagram ? toInstagramHandle(partner.instagram) : null;
  const number = String(index + 1).padStart(2, '0');
  /* PNGs are usually transparent lockups, so they need a white ground to read
     against. Anything else carries its own background already. */
  const isPng = partner.image?.contentType === 'image/png';

  return (
    <AnimatedSection delay={100}>
      <article className="partner-row">
        <div
          className={`partner-row__media${
            isPng ? ' partner-row__media--png' : ''
          }`}
        >
          {partner.image?.url ? (
            /* These assets are brand lockups, not photos. They sit in a fixed
               centred box so every logo gets the same cap height regardless of
               its own aspect ratio, and none of them is cropped. */
            <div className="partner-row__logo">
              <Image
                src={partner.image.url}
                alt={partner.image.title || partner.title || 'Colaborador'}
                fill
                quality={90}
                sizes="(max-width: 1024px) 70vw, 40vw"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="partner-row__placeholder" />
          )}

          <div className="partner-row__number">
            <span className="partner-row__rule" aria-hidden="true" />
            {number}
          </div>
        </div>

        <div className="partner-row__body">
          {partner.title &&
            (partner.image?.url ? (
              <p className="partner-row__eyebrow">{partner.title}</p>
            ) : (
              <>
                <p className="partner-row__eyebrow">{partner.title}</p>
                <p className="partner-row__wordmark">{partner.title}</p>
              </>
            ))}

          {partner.description && (
            <p className="partner-row__description">{partner.description}</p>
          )}

          {(handle || partner.web) && (
            <div className="partner-row__links">
              {handle && (
                <a
                  href={`https://instagram.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-row__link"
                >
                  <Instagram size={18} aria-hidden="true" />
                  <span>@{handle}</span>
                </a>
              )}

              {partner.web && (
                <a
                  href={partner.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-row__link"
                >
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span>Visitar web</span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </AnimatedSection>
  );
}
