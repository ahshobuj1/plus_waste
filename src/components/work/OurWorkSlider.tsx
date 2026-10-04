'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { JOB_PHOTOS } from '@/data/photosData';

export default function OurWorkSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState<'fwd' | 'back'>('fwd');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const areas = useMemo(() => {
    return Array.from(new Set(JOB_PHOTOS.map(p => p.area)));
  }, []);

  const goToSlide = (target: number, dir: 'fwd' | 'back' = 'fwd') => {
    setDirection(dir);
    setPrevIndex(currentIndex);
    setCurrentIndex((target + JOB_PHOTOS.length) % JOB_PHOTOS.length);
  };

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goToSlide(currentIndex + 1, 'fwd');
    }, 4200);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const currentPhoto = JOB_PHOTOS[currentIndex];

  return (
    <>
      <div className="slider" id="slider">
      <div className="slide-track" id="slideTrack">
        {JOB_PHOTOS.map((photo, idx) => {
          let className = '';
          if (idx === currentIndex) {
            className = 'live';
          } else if (idx === prevIndex) {
            className = direction === 'back' ? 'live' : 'out';
          }
          return (
            <img
              key={photo.file}
              src={photo.src}
              alt={photo.cap}
              loading={idx === 0 ? undefined : 'lazy'}
              className={className}
            />
          );
        })}
      </div>

      <button
        className="sl-nav prev"
        id="slPrev"
        type="button"
        aria-label="Previous"
        onClick={() => {
          goToSlide(currentIndex - 1, 'back');
          restartTimer();
        }}
      >
        ‹
      </button>
      <button
        className="sl-nav next"
        id="slNext"
        type="button"
        aria-label="Next"
        onClick={() => {
          goToSlide(currentIndex + 1, 'fwd');
          restartTimer();
        }}
      >
        ›
      </button>

      <div className="sl-meta">
        <span className="sl-area" id="slArea">{currentPhoto.area}</span>
        <span className="sl-cap" id="slCap">{currentPhoto.cap}</span>
      </div>

      <div className="sl-dots" id="slDots">
        {JOB_PHOTOS.map((photo, idx) => (
          <i
            key={photo.file}
            className={idx === currentIndex ? 'live' : ''}
            onClick={() => {
              goToSlide(idx, idx >= currentIndex ? 'fwd' : 'back');
              restartTimer();
            }}
          />
        ))}
      </div>
    </div>

    <div className="areabar" id="areaBar">
      {areas.map(area => (
        <span
          key={area}
          data-a={area}
          className={currentPhoto.area === area ? 'on' : ''}
          onClick={() => {
            const k = JOB_PHOTOS.findIndex(p => p.area === area);
            if (k >= 0) {
              goToSlide(k, 'fwd');
              restartTimer();
            }
          }}
        >
          {area}
        </span>
      ))}
    </div>
  </>
);
}
