import React from 'react';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

interface ShopCrossSellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopCrossSellModal({ isOpen, onClose }: ShopCrossSellModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal on"
      id="shopModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shopTitle"
    >
      <button className="x" id="shopX" type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <Logo />
      <h3 id="shopTitle">Need bags, gloves or PPE for this job?</h3>
      <p>
        Before you pay — we stock rubble sacks, tonne bags, gloves, masks, coveralls and hi-vis.
        Order now and the crew can bring them on the same visit. Your booking stays exactly as it is.
      </p>
      <div className="acts">
        <Link
          className="wa"
          style={{ background: 'var(--red)' }}
          href="/shop"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
        >
          Browse the shop
        </Link>
        <button className="keep" id="shopNo" type="button" onClick={onClose}>
          Not this time
        </button>
      </div>
    </div>
  );
}
