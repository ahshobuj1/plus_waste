'use client';

import { PRODUCTS } from '@/data/shopData';
import Image from 'next/image';

export default function ShopPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <h1>Bags, gloves and PPE at trade prices</h1>
          <p>The same kit our crews use, delivered to your door or site. Order before 3:30pm Monday to Friday for next working day delivery on stocked lines.</p>
          <div className="usp">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Next working day
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Free delivery over £75
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Add to a booked collection
            </span>
          </div>
        </div>
      </section>

      <div className="shopgrid wrap">
        <div id="products">
          <h3 className="cat">Products</h3>
          <div className="prods">
            {PRODUCTS.map(p => (
              <div className="prod" key={p.id}>
                <div className="pimg">
                  {/* Using standard img tags since we have absolute/relative paths and no width/height predefined */}
                  <img src={`/assets/${p.img}.jpg`} alt={p.n} onError={(e) => { e.currentTarget.src = '/assets/image_100.jpg'; }} />
                </div>
                <div className="pb">
                  <div className="pn">{p.n}</div>
                  <div className="pu">{p.u}</div>
                  <div className="pp">£{p.cost.toFixed(2)}</div>
                  <div className="padd">
                    <button type="button">Add to Basket</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="cart" aria-label="Basket">
          <div className="cart-hd">
            <svg className="mark" viewBox="0 0 512 512" aria-hidden="true"><g className="stroke"><path d="M150 112 H350 A96 96 0 0 1 350 304 H150"/><path d="M174 280 V423"/><path d="M39 208 H350"/></g><circle cx="350" cy="208" r="24" fill="currentColor"/><rect x="66" y="157" width="47" height="101" fill="currentColor"/></svg>
            <h2>Your basket</h2>
          </div>
          <div className="cart-body" id="cartBody">
            <div className="cart-empty">Your basket is empty</div>
          </div>
          <div className="cart-tot" id="cartTot"></div>
          <div className="cart-ft">
            <button className="btn btn-go" id="checkoutBtn" type="button" disabled>Checkout</button>
            <button className="btn btn-lt" type="button">Book a collection instead</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
