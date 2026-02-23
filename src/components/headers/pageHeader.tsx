import RichTextRenderer from '@/components/ui/RichTextRenderer';
import AnimatedSection from '../ui/AnimatedSection';

/** Contentful-style rich text document (nodeType: 'document', content: blocks) */
type RichTextDocument = { nodeType: string; content?: unknown[] };

function isRichTextDocument(
  value: string | RichTextDocument
): value is RichTextDocument {
  return typeof value === 'object' && value !== null && 'nodeType' in value;
}

export default function PageHeader({
  title,
  description,
  variant = 'primary',
}: {
  title: string;
  description: string | RichTextDocument;
  variant?: 'primary' | 'secondary';
}) {
  const titleClass =
    variant === 'primary'
      ? 'text-[clamp(2.6rem,4.5vw,3.75rem)] tracking-[-0.02em] leading-[0.9]'
      : 'text-[clamp(2rem,3.2vw,3rem)] tracking-[-0.02em] leading-[0.95]';

  const descriptionClassName =
    'mt-3 text-charcoal-500 text-base md:text-2xl max-w-[80%]';

  return (
    <div className="container mx-auto px-4 pt-6 md:pt-32 pb-6">
      <AnimatedSection delay={100}>
        <div className="text-left">
          <h1
            className={`${titleClass} font-anton text-charcoal-900 uppercase`}
          >
            {title}
          </h1>

          {isRichTextDocument(description) ? (
            <RichTextRenderer
              richTextJson={description}
              className={`rich-text-page-header ${descriptionClassName}`}
            />
          ) : (
            <p className={`whitespace-pre-line ${descriptionClassName}`}>
              {description}
            </p>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
