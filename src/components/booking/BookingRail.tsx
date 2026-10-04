'use client';

import React, { useEffect, useState, useRef } from 'react';
import { BookingState, QuoteResult } from '@/types';
import { CAGE_YD } from '@/data/pricingData';
import { formatMoney } from '@/utils/pricing';
import VanFigure from '@/components/common/VanFigure';
import Logo from '@/components/common/Logo';

interface BookingRailProps {
  state: BookingState;
  quote: QuoteResult;
}

export default function BookingRail({ state, quote }: BookingRailProps) {
  const [displayPrice, setDisplayPrice] = useState<number>(quote.total);
  const [isBump, setIsBump] = useState(false);
  const prevPriceRef = useRef<number>(quote.total);

  useEffect(() => {
    if (!quote.priced) {
      prevPriceRef.current = 0;
      return;
    }

    const from = prevPriceRef.current;
    const to = quote.total;
    prevPriceRef.current = to;

    if (from === to) {
      setDisplayPrice(to);
      return;
    }

    setIsBump(true);
    const bumpTimer = setTimeout(() => setIsBump(false), 300);

    const startTime = performance.now();
    const duration = 500;

    let rafId: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round((from + (to - from) * eased) * 100) / 100;
      setDisplayPrice(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplayPrice(to);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(bumpTimer);
      cancelAnimationFrame(rafId);
    };
  }, [quote.total, quote.priced]);

  const contextLines = [];
  if (state.postcode) contextLines.push({ k: 'Collecting from', v: state.postcode, mute: true });
  if (state.date) {
    contextLines.push({
      k: 'Date',
      v: state.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      mute: true
    });
  }
  if (state.slot && !state.slot.fee) {
    contextLines.push({ k: 'Slot', v: state.slot.label, mute: true });
  }
  if (state.load) {
    contextLines.push({
      k: 'Van space',
      v: `${state.load.cuyd} of ${CAGE_YD} cu yd`,
      mute: true
    });
  }

  const allLines = [...contextLines, ...quote.lines];

  return (
    <aside className="rail" aria-label="Running price">
      <div className="rail-hd">
        <Logo />
        <div>
          <div className="lb">Estimated total</div>
          <div
            className={`amt ${!quote.priced ? 'tbc' : ''} ${isBump ? 'bump' : ''}`}
            id="railAmt"
          >
            {quote.priced ? formatMoney(displayPrice) : 'Choose a size'}
          </div>
        </div>
      </div>

      <div className="rail-van" id="railVan">
        <VanFigure
          cuyd={state.load ? state.load.cuyd : 0}
          hideCap={true}
          hideTag={!state.load}
          alt={state.load ? state.load.name : 'Empty cage'}
        />
      </div>

      <div className="rail-ln" id="railLines">
        {allLines.length > 0 ? (
          allLines.map((line, idx) => (
            <div
              key={idx}
              className={`rl ${line.mute ? 'mute' : ''} ${line.off ? 'off' : ''} ${line.shop ? 'shop' : ''}`}
            >
              <span>{line.k}</span>
              <span className="v">{line.v}</span>
            </div>
          ))
        ) : (
          <div className="rl mute">
            <span>Nothing selected yet</span>
            <span className="v">—</span>
          </div>
        )}
      </div>

      <div className="rail-ft">
        <strong>Included:</strong> loading, transport, disposal at a licensed facility, and your waste transfer note by email.
      </div>
    </aside>
  );
}
