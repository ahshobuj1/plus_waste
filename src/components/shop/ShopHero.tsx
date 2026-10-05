import React from 'react';

export default function ShopHero() {
  return (
    <section className="hero">
      <div className="wrap">
        <h1>Bags, gloves and PPE at trade prices</h1>
        <p>
          The same kit our crews use, delivered to your door or site. Order before
          3:30pm Monday to Friday for next working day delivery on stocked lines.
        </p>
        <div className="usp">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Next working day
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Free delivery over £75
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Add to a booked collection
          </span>
        </div>
      </div>
    </section>
  );
}
