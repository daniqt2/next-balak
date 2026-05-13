'use client';

interface Section {
  id: string;
  label: string;
}

export default function RouteJumpNav({ sections }: { sections: Section[] }) {
  if (sections.length === 0) return null;

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollTo(id)}
          className="rounded-full px-4 py-1.5 text-sm font-medium bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-900 hover:text-white transition-colors"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
