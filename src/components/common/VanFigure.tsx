import React from 'react';
import { CAGE_YD, VAN_BOX } from '@/data/pricingData';

interface VanFigureProps {
  cuyd: number;
  alt?: string;
  hideTag?: boolean;
  hideCap?: boolean;
  className?: string;
}

export default function VanFigure({
  cuyd,
  alt,
  hideTag = false,
  hideCap = false,
  className = ''
}: VanFigureProps) {
  const share = Math.min(Math.max(0, cuyd) / CAGE_YD, 1);
  const h = VAN_BOX.height * share;
  const top = VAN_BOX.top + (VAN_BOX.height - h);
  const tagTop = Math.max(top - 1.5, VAN_BOX.top - 6);

  const defaultAlt = `Tipper cage showing ${cuyd} of ${CAGE_YD} cubic yards filled`;

  return (
    <div className={`vanfig ${className}`}>
      <img
        src="/assets/image_20.png"
        alt={alt || defaultAlt}
        loading="lazy"
      />
      <div
        className="cage"
        style={{
          left: `${VAN_BOX.left}%`,
          top: `${VAN_BOX.top}%`,
          width: `${VAN_BOX.width}%`,
          height: `${VAN_BOX.height}%`
        }}
      />
      {cuyd > 0 && (
        <div
          className="fill"
          style={{
            left: `${VAN_BOX.left}%`,
            width: `${VAN_BOX.width}%`,
            top: `${top}%`,
            height: `${h}%`
          }}
        />
      )}
      {!hideTag && cuyd > 0 && (
        <div
          className="ydtag on-fill"
          style={{
            left: `${VAN_BOX.left + 1.5}%`,
            top: `${tagTop}%`
          }}
        >
          {cuyd} cu yd
        </div>
      )}
      {!hideCap && <div className="capacity">18 cu yd cage</div>}
    </div>
  );
}
