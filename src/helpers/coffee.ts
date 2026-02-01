/**
 * Maps Contentful stopType value to display label.
 * Returns null for "other" or unknown (don't show).
 */
export function getStopTypeLabel(stopType?: string | null): string | null {
  if (!stopType) return null;
  const value = stopType.toLowerCase();
  // TODO - ARREGLAR TYPO
  if (value === 'specialtycoffe' || value === 'specialtycoffe')
    return 'Cafetería';
  if (value === 'bar') return 'Bar';
  if (value === 'gasolinera') return 'Gasolinera';
  if (value === 'other') return null;
  return null;
}
