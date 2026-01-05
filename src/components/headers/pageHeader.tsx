import AnimatedSection from '../ui/AnimatedSection';

export default function PageHeader({
  title,
  description,
  variant = 'primary',
}: {
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
}) {
  const textSize =
    variant === 'primary' ? 'text-4xl md:text-6xl' : 'text-2xl md:text-5xl';

  return (
    <div className="container mx-auto px-4 pt-12">
      <AnimatedSection delay={100}>
        <div className="text-left">
          <h1
            className={`${textSize} font-extrabold text-charcoal-900 mb-2 uppercase`}
          >
            {title}
          </h1>
          <p className="text-charcoal-500 text-lg max-w-4xl">{description}</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
