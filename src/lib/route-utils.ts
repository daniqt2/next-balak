/**
 * Utility functions for route calculations and formatting
 */

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

/** Format a numeric metric to 1 decimal for display; whole numbers show without .0 (e.g. 148 not 148.0) */
export function formatMetric(value: number | null | undefined): string {
  if (value == null || typeof value !== 'number') return '';
  const n = Number(value);
  return n % 1 === 0 ? String(Math.round(n)) : n.toFixed(1);
}

export interface RouteMetrics {
  difficulty: DifficultyLevel;
  gradient: number;
  formattedLength: string;
  formattedElevation: string;
}

/**
 * Calculate route difficulty based on elevation gain
 */
export function calculateDifficulty(
  elevation: number,
  length: number
): DifficultyLevel {
  if (elevation >= 1800) return 'Hard';
  if (elevation < 600) return 'Easy';
  return 'Medium';
}

/**
 * Calculate average gradient percentage
 */
export function calculateGradient(elevation: number, length: number): number {
  return Math.round((elevation / length) * 100 * 100) / 100; // Round to 2 decimal places
}

/**
 * Format route metrics for display
 */
export function formatRouteMetrics(route: {
  length?: number | null;
  elevation?: number | null;
}): RouteMetrics | null {
  if (!route.length || !route.elevation) return null;

  const difficulty = calculateDifficulty(route.elevation, route.length);
  const gradient = calculateGradient(route.elevation, route.length);

  return {
    difficulty,
    gradient,
    formattedLength: `${formatMetric(route.length)}km`,
    formattedElevation: `${formatMetric(route.elevation)}mD+`,
  };
}

/**
 * Get difficulty color classes
 */
export function getDifficultyColor(
  difficulty: DifficultyLevel | string
): string {
  difficulty = difficulty.toLowerCase();
  switch (difficulty) {
    case 'easy':
      return 'text-lime-300';
    case 'medium':
      return 'text-amber-400';
    case 'hard':
      return 'text-rose-400';
    default:
      return 'text-gray-400';
  }
}
