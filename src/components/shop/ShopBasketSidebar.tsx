import React from 'react';
import Link from 'next/link';
import { ShopTotals } from '@/types';

interface ShopBasketSidebarProps {
  totals: ShopTotals;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function ShopBasketSidebar({
  totals,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShopBasketSidebarProps) {
  const hasItems = totals.lines.length > 0;

  return (
    <aside className="cart" aria-label="Shopping Basket">
      <div className="cart-hd">
        <svg className="mark" viewBox="0 0 512 512" aria-hidden="true">
          <g className="stroke">
            <path d="M150 112 H350 A96 96 0 0 1 350 304 H150" />
            <path d="M174 280 V423" />
            <path d="M39 208 H350" />
          </g>
          <circle cx="350" cy="208" r="24" fill="currentColor" />
          <rect x="66" y="157" width="47" height="101" fill="currentColor" />
        </svg>
        <h2>Your basket</h2>
        {totals.totalQuantity > 0 && (
          <span className="cart-badge" aria-label={`${totals.totalQuantity} items chosen`}>
            {totals.totalQuantity}
          </span>
        )}
      </div>

      <div className="cart-body" id="cartBody">
        {!hasItems ? (
          <div className="cart-empty">Your basket is empty</div>
        ) : (
          totals.lines.map(line => (
            <div className="ci" key={line.product.id}>
              <div className="ci-left" style={{ flex: 1 }}>
                <span className="cn">
                  {line.product.n}
                  <span className="cq"> · {line.quantity} × £{line.product.cost.toFixed(2)}</span>
                </span>
                <div className="ci-qty-actions" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <button
                    type="button"
                    className="ci-btn-step"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '1px solid var(--rule)',
                      borderRadius: '4px',
                      background: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      lineHeight: 1
                    }}
                    onClick={() => onUpdateQuantity(line.product.id, line.quantity - 1)}
                    aria-label={`Reduce quantity of ${line.product.n}`}
                  >
                    −
                  </button>
                  <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    className="ci-btn-step"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '1px solid var(--rule)',
                      borderRadius: '4px',
                      background: '#fff',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'grid',
                      placeItems: 'center',
                      lineHeight: 1
                    }}
                    onClick={() => onUpdateQuantity(line.product.id, line.quantity + 1)}
                    aria-label={`Increase quantity of ${line.product.n}`}
                  >
                    +
                  </button>
                </div>
              </div>
              <span className="cp">£{line.lineTotal.toFixed(2)}</span>
              <button
                className="cx"
                type="button"
                onClick={() => onRemoveItem(line.product.id)}
                aria-label={`Remove ${line.product.n} from basket`}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-tot" id="cartTot">
        {hasItems ? (
          <>
            <div className="tr">
              <span>Subtotal ({totals.totalQuantity} item{totals.totalQuantity > 1 ? 's' : ''})</span>
              <span className="v">£{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="tr">
              <span>Delivery</span>
              <span className="v">{totals.deliveryFee > 0 ? `£${totals.deliveryFee.toFixed(2)}` : 'Free'}</span>
            </div>
            <div className="tr grand">
              <span>Total</span>
              <span className="v">£{totals.grandTotal.toFixed(2)}</span>
            </div>
            {totals.isFreeDelivery ? (
              <div className="freebar ok">Free delivery applied</div>
            ) : (
              <div className="freebar">
                Spend £{totals.shortfallForFreeDelivery.toFixed(2)} more for free delivery
              </div>
            )}
          </>
        ) : (
          <div className="tr">
            <span>Delivery is free on orders over £75</span>
          </div>
        )}
      </div>

      <div className="cart-ft">
        <button
          className="btn btn-go"
          id="checkoutBtn"
          type="button"
          disabled={!hasItems}
          onClick={onCheckout}
        >
          Checkout
        </button>
        <Link
          href="/#flow"
          className="btn btn-lt"
          style={{
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none'
          }}
        >
          Book a collection instead
        </Link>
      </div>
    </aside>
  );
}
