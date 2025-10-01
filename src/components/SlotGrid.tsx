'use client';

import React from 'react';

interface SlotGridProps<T> {
  title?: string;
  subtitle?: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  className?: string;
  emptyMessage?: string;
}

export function SlotGrid<T>({ 
  title, 
  subtitle, 
  items, 
  renderItem,
  loading = false,
  error = null,
  onRetry,
  className = '',
  emptyMessage = 'No items found'
}: SlotGridProps<T>) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-balak-300 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error: {error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-balak-500 text-charcoal-900 rounded hover:bg-balak-600 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          )}
          {subtitle && (
            <p className="text-charcoal-400">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
