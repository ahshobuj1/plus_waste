'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('pw_cookies');
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 900);
        return () => clearTimeout(timer);
      }
    } catch {
      setShow(true);
    }
  }, []);

  const handleChoice = (val: 'all' | 'essential') => {
    try {
      localStorage.setItem('pw_cookies', val);
    } catch {}
    setShow(false);
  };

  return (
    <aside
      className={`cookie ${show ? 'up' : ''}`}
      id="cookie"
      aria-label="Cookie consent"
      aria-hidden={!show}
    >
      <Logo />
      <div>
        <h3>We use essential cookies to make this site work</h3>
        <p>
          We also use analytics to see how visitors use the site so we can improve it. No advertising cookies.{' '}
          <Link href="/privacy-policy">Privacy policy</Link>
        </p>
      </div>
      <div className="acts">
        <button
          className="yes"
          id="ckYes"
          type="button"
          onClick={() => handleChoice('all')}
        >
          Accept all
        </button>
        <button
          className="no"
          id="ckNo"
          type="button"
          onClick={() => handleChoice('essential')}
        >
          Essential only
        </button>
      </div>
    </aside>
  );
}
