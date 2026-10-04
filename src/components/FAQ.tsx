'use client';

import React, { useState } from 'react';
import { FAQS } from '@/data/faqsData';

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (idx: number) => {
    setOpenIndices(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className="sec rule-t w-full">
      <div className="wrap max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <div className="sec-hd text-left mb-6">
          <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#141416]">
            Questions we get asked
          </h2>
        </div>
        <div className="faq w-full border-t border-[#e6e3de]">
          {FAQS.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="qa"
                style={{
                  width: '100%',
                  margin: '0 auto',
                  display: 'block',
                  borderBottom: '1px solid var(--rule)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '17px 0',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    font: 'inherit'
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontSize: '15.5px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      paddingRight: '20px'
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      position: 'relative',
                      flex: 'none',
                      width: '16px',
                      height: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        width: '11px',
                        height: '2px',
                        background: 'var(--red)'
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        width: '2px',
                        height: '11px',
                        background: 'var(--red)',
                        transition: 'transform 0.2s',
                        transform: isOpen ? 'rotate(90deg)' : 'none',
                        opacity: isOpen ? 0 : 1
                      }}
                    />
                  </span>
                </button>
                {isOpen && (
                  <p
                    style={{
                      padding: '0 40px 17px 0',
                      color: 'var(--steel)',
                      fontSize: '14.5px',
                      lineHeight: '1.65',
                      margin: 0
                    }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
