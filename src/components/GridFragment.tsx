'use client';

import React from 'react';

interface GridFragmentProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function GridFragment({ 
  title, 
  subtitle, 
  children, 
  className = '' 
}: GridFragmentProps) {
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
        {children}
      </div>
    </div>
  );
}
