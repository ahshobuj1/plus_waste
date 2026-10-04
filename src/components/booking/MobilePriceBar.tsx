'use client';

import React from 'react';

interface MobilePriceBarProps {
  priced: boolean;
  total: number;
  onBreakdownClick: () => void;
}

export default function MobilePriceBar({
  priced,
  total,
  onBreakdownClick
}: MobilePriceBarProps) {
  if (!priced) return null;

  const formatted = '£' + total.toFixed(2).replace(/\.00$/, '');

  return (
    <button
      className="mobbar"
      id="mobBar"
      type="button"
      aria-label="See your price breakdown"
      onClick={onBreakdownClick}
    >
      <span>
        <span className="mb-l">Your price</span>
        <span className="mb-amt" id="mobAmt">{formatted}</span>
      </span>
      <span className="mb-go">Breakdown</span>
    </button>
  );
}
