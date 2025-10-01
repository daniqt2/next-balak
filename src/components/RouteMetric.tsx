import React from 'react';

/**
 * RouteMetric - A reusable component for displaying route statistics with icons
 * 
 * @example
 * <RouteMetric
 *   value={25.5}
 *   unit="km"
 *   icon={RouteMetricIcons.ruler}
 * />
 */
interface RouteMetricProps {
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  className?: string;
}

export default function RouteMetric({ 
  value, 
  unit, 
  icon, 
  className = '' 
}: RouteMetricProps) {
  return (
    <div className={`text-center group ${className}`}>
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-balak-500/30 flex items-center justify-center group-hover:border-balak-500 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-balak-500/20 to-balak-600/20 flex items-center justify-center">
            <div className="w-8 h-8 text-balak-400">
              {icon}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-balak-300 text-sm uppercase tracking-wider">{unit}</p>
      </div>
    </div>
  );
}

// Predefined icons for common metrics
export const RouteMetricIcons = {
  ruler: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 3 3-3 3 3 3-3 3 3M3 18l3-3 3 3 3-3 3 3 3-3M3 12l3-3 3 3 3-3 3 3" />
    </svg>
  ),
  elevation: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  ),
  clock: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  routes: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  lightning: (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};
