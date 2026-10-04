import React from 'react';
import { LoadTier } from '@/types';
import { CAGE_YD } from '@/data/pricingData';
import VanFigure from '@/components/common/VanFigure';

interface VanCardProps {
  load: LoadTier;
}

export default function VanCard({ load }: VanCardProps) {
  return (
    <article className={`vcard ${load.best ? 'best' : ''}`}>
      {load.best && (
        <span
          className="bestflag"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 20,
            backgroundColor: '#d32d1f',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            padding: '6px 12px',
            borderRadius: '13px 0 11px 0',
            textTransform: 'uppercase',
            boxShadow: '0 3px 10px rgba(211, 45, 31, 0.45)',
            lineHeight: 1.2,
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}
        >
          Best value for money
        </span>
      )}
      <VanFigure
        cuyd={load.cuyd}
        alt={`${load.name}: ${load.cuyd} of ${CAGE_YD} cubic yards of the cage`}
      />
      <div className="vb">
        <span className="nm">{load.name}</span>
        <span className="pr">£{load.price}</span>
        <div className="specs">
          <span><b>{load.kg}kg</b> max</span>
          <span><b>{load.cuyd}</b> of {CAGE_YD} cu yd</span>
          <span>{load.bags}</span>
          <span>{load.mins}</span>
        </div>
      </div>
    </article>
  );
}
