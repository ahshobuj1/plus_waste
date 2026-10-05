'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/common/Logo';
import { MobileNavProps, NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Get a price',
    href: '/#flow',
    description: 'Instant quote & same-day booking',
    badge: 'Popular',
  },
  {
    label: 'Van sizes & rates',
    href: '/#rates',
    description: 'Quarter to full load capacities',
  },
  {
    label: 'Our work',
    href: '/#work',
    description: 'Recent clearances across London',
  },
  {
    label: 'Shop',
    href: '/shop',
    description: 'Trade bags, rubble sacks & PPE',
  },
  {
    label: 'Blog & tips',
    href: '/blog',
    description: 'News and waste reduction guides',
  },
  {
    label: 'FAQs',
    href: '/#faq',
    description: 'Pricing, licensing & wait times',
  },
];

export default function MobileNav({
  isOpen,
  onClose,
  totalQuantity,
}: MobileNavProps) {
  const pathname = usePathname();
  const prevPathRef = React.useRef(pathname);

  // Close only when route actually changes
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`mob-nav-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`mob-nav-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-modal="true"
        role="dialog"
      >
        {/* Drawer Header */}
        <div className="mob-nav-header">
          <Link
            className="brand"
            href="/"
            onClick={handleLinkClick}
            aria-label="Plus Waste home"
          >
            <Logo isDraw />
            <span className="wm">
              <span className="p">PLUS</span>
              <span className="w">WASTE</span>
            </span>
          </Link>
          <button
            type="button"
            className="mob-nav-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Operating status pill */}
        <div className="mob-nav-status">
          <span className="live-dot" />
          <span>Same-day available • London crew on call</span>
        </div>

        {/* Navigation Link List */}
        <nav className="mob-nav-links">
          {NAV_ITEMS.map((item) => {
            const isShop = item.href === '/shop';
            const showBadge = isShop && totalQuantity > 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="mob-nav-item"
                onClick={handleLinkClick}
              >
                <div className="mob-nav-item-content">
                  <div className="mob-nav-item-title">
                    <span>{item.label}</span>
                    {item.badge && !showBadge && (
                      <span className="mob-nav-badge">{item.badge}</span>
                    )}
                    {showBadge && (
                      <span className="mob-nav-badge-cart">
                        {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <span className="mob-nav-item-desc">
                      {item.description}
                    </span>
                  )}
                </div>
                <svg
                  className="mob-nav-arrow"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            );
          })}

          {/* Staff Operations Portal */}
          <Link
            href="/admin"
            className="mob-nav-item border-t border-[#e7e3dd] mt-2 pt-3"
            onClick={handleLinkClick}
          >
            <div className="mob-nav-item-content">
              <div className="mob-nav-item-title">
                <span className="text-[#d32d1f] font-extrabold flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Staff Operations Login
                </span>
                <span className="mob-nav-badge" style={{ background: '#fdf1ef', color: '#d32d1f', borderColor: 'rgba(211,45,31,0.2)' }}>
                  Staff Only
                </span>
              </div>
              <span className="mob-nav-item-desc">
                Dispatch console, rate card &amp; orders
              </span>
            </div>
            <svg
              className="mob-nav-arrow text-[#d32d1f]"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </nav>

        {/* Quick Contact & Action Section */}
        <div className="mob-nav-footer">
          <div className="mob-nav-contact-grid">
            <a
              href="tel:+447764242821"
              className="mob-nav-call"
              aria-label="Call Plus Waste"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+44 7764 242821</span>
            </a>

            <a
              href="https://wa.me/message/3MIZAJGYOMJQD1"
              target="_blank"
              rel="noreferrer"
              className="mob-nav-wa"
              aria-label="Chat on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z" />
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          <Link
            href="/#flow"
            className="mob-nav-cta"
            onClick={handleLinkClick}
          >
            Check prices &amp; book online
          </Link>

          <p className="mob-nav-meta">
            Environment Agency Licensed Carrier • London
          </p>
        </div>
      </aside>
    </>
  );
}
