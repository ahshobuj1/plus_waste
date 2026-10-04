import React from 'react';

const POINTS = [
  'Same-day slots',
  'Licensed carrier',
  'Waste transfer note included'
];

export default function HeroPoints() {
  return (
    <div className="hero-pts a-up d3">
      {POINTS.map((text, idx) => (
        <span key={idx}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {text}
        </span>
      ))}
    </div>
  );
}
