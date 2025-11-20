import React from 'react';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

export default function Logo({ 
  className = '', 
  width = 900, 
  height = 160,
  color = '#111'
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 160"
      role="img"
      aria-label="BALAK RIDE wordmark"
      width={width}
      height={height}
      className={className}
    >
      <style>
        {`
          :root {
            --ink: ${color};
          }
          text {
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          }
        `}
      </style>
      <rect width="100%" height="100%" fill="none" />
      <text x="0" y="110" fontSize="120" fontWeight="800" letterSpacing="4" fill="var(--ink)">
        BALAK
      </text>
      <text x="420" y="110" fontSize="80" fontWeight="300" letterSpacing="3" fill="var(--ink)">
        RIDE
      </text>
    </svg>
  );
}

