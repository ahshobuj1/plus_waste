'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { JOB_PHOTOS } from '@/data/photosData';

export default function OurWorkSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState<'fwd' | 'back'>('fwd');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const areas = useMemo(() => {
    return Array.from(new Set(JOB_PHOTOS.map(p => p.area)));
  }, []);

  const goToSlide = useCallback((target: number, dir: 'fwd' | 'back' = 'fwd') => {
    setDirection(dir);
    setPrevIndex(currentIndex);
    setCurrentIndex((target + JOB_PHOTOS.length) % JOB_PHOTOS.length);
  }, [currentIndex]);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goToSlide(currentIndex + 1, 'fwd');
    }, 4200);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

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
            <Image
              key={photo.file}
              src={photo.src}
              alt={photo.cap}
              width={700}
              height={460}
              priority={idx === 0}
              className={className}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              unoptimized
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

      <div
        className="sl-meta pointer-events-none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          padding: '28px clamp(16px, 3vw, 32px)',
          background: 'linear-gradient(to top, rgba(16, 16, 18, 0.94) 0%, rgba(16, 16, 18, 0.6) 55%, transparent 100%)'
        }}
      >
        <span
          className="sl-area"
          id="slArea"
          style={{
            display: 'inline-block',
            backgroundColor: '#d32d1f',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: 'clamp(13px, 1.7vw, 16px)',
            padding: '6px 14px',
            borderRadius: '8px',
            marginBottom: '8px',
            boxShadow: '0 4px 14px rgba(211, 45, 31, 0.45)'
          }}
        >
          {currentPhoto.area}
        </span>
        <span
          className="sl-cap"
          id="slCap"
          style={{
            display: 'block',
            color: '#ffffff',
            fontSize: 'clamp(15px, 1.9vw, 20px)',
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.9)',
            letterSpacing: '-0.01em'
          }}
        >
          {currentPhoto.cap}
        </span>
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
