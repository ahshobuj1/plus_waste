import React from 'react';
import { REVIEWS } from '@/data/reviewsData';

export default function ReviewTicker() {
  const marqueeItems = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <div className="ticker flex items-center bg-[#f4f2ef] border-b border-[#e6e3de] overflow-hidden relative h-[42px]" aria-label="Customer reviews">
      <div className="tick-badge flex items-center gap-2 px-4 h-full bg-[#f4f2ef] border-r border-[#e6e3de] text-[12px] text-[#6a6864] font-semibold shrink-0 z-20 shadow-[2px_0_8px_rgba(0,0,0,0.03)]">
        <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true" className="shrink-0">
          <path fill="#4285F4" d="M45 24c0-1.6-.1-2.7-.4-3.9H24v7.1h12c-.2 1.9-1.5 4.7-4.3 6.6l6.6 5.1C42.2 35.3 45 30.1 45 24z"/>
          <path fill="#34A853" d="M24 46c5.7 0 10.5-1.9 14-5.1l-6.6-5.1c-1.8 1.2-4.2 2.1-7.4 2.1-5.6 0-10.4-3.7-12.1-8.8l-6.9 5.3C8.4 41.1 15.6 46 24 46z"/>
          <path fill="#FBBC05" d="M11.9 29.1c-.4-1.3-.7-2.6-.7-4.1s.3-2.8.7-4.1l-6.9-5.4C3.5 18.4 2.7 21.1 2.7 24s.8 5.6 2.3 8.4l6.9-5.3z"/>
          <path fill="#EA4335" d="M24 10.6c3.2 0 5.3 1.4 6.5 2.5l5.8-5.7C32.8 4.1 29.7 2 24 2 15.6 2 8.4 6.9 5 14.1l6.9 5.4c1.7-5.1 6.5-8.9 12.1-8.9z"/>
        </svg>
        <span className="hidden sm:inline">Google reviews</span>
        <strong className="text-[#141416] font-bold">5.0</strong>
        <span className="text-[#d32d1f] tracking-wider text-[11px]">★★★★★</span>
      </div>
      <div className="relative flex-1 overflow-hidden h-full flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f4f2ef] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f4f2ef] to-transparent z-10 pointer-events-none" />
        <div className="tick-track" id="tickTrack">
          {marqueeItems.map((r, idx) => (
            <span key={idx} className="tick-item">
              <span className="st text-[#d32d1f] text-[12px] tracking-wider">★★★★★</span>
              <span className="nm font-semibold text-[#141416]">{r.n}</span>
              <span className="text-[#3d3d42]">{r.t}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
