import React from 'react';

interface LogoProps {
  className?: string;
  isDraw?: boolean;
}

export default function Logo({ className = '', isDraw = false }: LogoProps) {
  return (
    <svg
      className={`mark ${isDraw ? 'draw' : ''} ${className}`}
      viewBox="0 0 512 512"
      aria-hidden="true"
    >
      <g className="stroke">
        <path d="M150 112 H350 A96 96 0 0 1 350 304 H150" />
        <path d="M174 280 V423" />
        <path d="M39 208 H350" />
      </g>
      <circle cx="350" cy="208" r="24" fill="currentColor" />
      <rect className="plus" x="66" y="157" width="47" height="101" />
    </svg>
  );
}
