import React from 'react';
import { ShopTotals } from '@/types';

interface MobileBasketBarProps {
  totals: ShopTotals;
  onOpenBasket: () => void;
}

export default function MobileBasketBar({ totals, onOpenBasket }: MobileBasketBarProps) {
  if (totals.totalQuantity === 0) return null;

  return (
    <button
      className="basketbar"
      type="button"
      onClick={onOpenBasket}
      aria-label={`Review basket with ${totals.totalQuantity} items and check out`}
    >
      <span>
        <span className="bb-l">{totals.totalQuantity} item{totals.totalQuantity > 1 ? 's' : ''} in basket</span>
        <span className="bb-amt">£{totals.grandTotal.toFixed(2)}</span>
      </span>
      <span className="bb-go">Checkout</span>
    </button>
  );
}
