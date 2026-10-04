'use client';

import React, { useState, useEffect } from 'react';
import { JOB_PHOTOS } from '@/data/photosData';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % JOB_PHOTOS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="pc-slides" id="pcSlides" aria-hidden="true">
        {JOB_PHOTOS.map((photo, idx) => (
          <img
            key={photo.file}
            src={photo.src}
            alt=""
            loading={idx === 0 ? undefined : 'lazy'}
            className={idx === activeIndex ? 'live' : ''}
          />
        ))}
      </div>
      <div className="pc-dots" id="pcDots" aria-hidden="true">
        {JOB_PHOTOS.map((photo, idx) => (
          <i
            key={photo.file}
            className={idx === activeIndex ? 'live' : ''}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
    </>
  );
}
