'use client';

import React, {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Logo from '@/components/common/Logo';
import MobileNav from '@/components/header/MobileNav';
import {
  subscribeToBasket,
  getBasketSnapshot,
  getServerBasketSnapshot,
} from '@/utils/shop';
import {ShopBasket} from '@/types';

export default function Header() {
  const pathname = usePathname();
  const isShopPage = pathname === '/shop';
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleCloseMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  const handleToggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((prev) => !prev);
  }, []);

  const basketJson = useSyncExternalStore(
    subscribeToBasket,
    getBasketSnapshot,
    getServerBasketSnapshot,
  );

  const totalQuantity = useMemo(() => {
    try {
      const basket: ShopBasket = JSON.parse(basketJson);
      return Object.values(basket).reduce((sum, q) => sum + q, 0);
    } catch {
      return 0;
    }
  }, [basketJson]);

  const handleBasketClick = () => {
    const cartEl = document.querySelector('.cart');
    if (cartEl) {
      cartEl.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          <Link className="brand" href="/" aria-label="Plus Waste home">
            <Logo isDraw />
            <span className="wm">
              <span className="p">PLUS</span>
              <span className="w">WASTE</span>
            </span>
          </Link>
          <nav className="hdr-nav" aria-label="Primary">
            <Link href="/#flow">Get a price</Link>
            <Link href="/#rates">Van sizes</Link>
            <Link href="/#work">Our work</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#faq">FAQs</Link>
          </nav>
          <div className="hdr-cta">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e7e3dd] hover:border-[#141416] bg-white hover:bg-[#f5f3f0] text-[12.5px] sm:text-[13px] font-bold text-[#141416] transition-all shadow-sm shrink-0"
              title="Staff operations login">
              <svg
                viewBox="0 0 24 24"
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#d32d1f]"
                aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Login</span>
            </Link>
            <a className="tel" href="tel:+447764242821">
              +44 7764 242821
            </a>
            {isShopPage ? (
              <button
                className="cartbtn"
                type="button"
                onClick={handleBasketClick}
                aria-label={`Basket with ${totalQuantity} items`}>
                Basket <span className="n">{totalQuantity}</span>
              </button>
            ) : (
              <a
                className="btn-wa"
                href="https://wa.me/message/3MIZAJGYOMJQD1"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp">
                <svg
                  viewBox="0 0 24 24"
                  width="34"
                  height="34"
                  fill="none"
                  aria-hidden="true"
                  className="wa-icon">
                  <path
                    fill="#25D366"
                    d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3z"
                  />
                </svg>
                <span className="btn-wa-text sr-only">WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              className="hdr-burger"
              onClick={handleToggleMobileNav}
              aria-label="Open mobile navigation"
              aria-expanded={isMobileNavOpen}>
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                stroke="currentColor"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={handleCloseMobileNav}
        totalQuantity={totalQuantity}
      />
    </>
  );
}
