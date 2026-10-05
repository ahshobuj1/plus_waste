import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  quantity,
  onQuantityChange,
  onAddToCart
}: ProductCardProps) {
  const currentQty = Math.max(1, quantity || 1);
  const [imgSrc, setImgSrc] = useState(`/assets/${product.img}.jpg`);

  return (
    <article className="prod" id={`prod-${product.id}`}>
      <div className="pimg">
        <Image
          src={imgSrc}
          alt={product.n}
          width={220}
          height={165}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          unoptimized
          onError={() => setImgSrc('/assets/image_100.jpg')}
        />
      </div>
      <div className="pb">
        <h3 className="pn" title={product.n}>{product.n}</h3>
        <div className="pu">{product.u}</div>
        <div className="pp">£{product.cost.toFixed(2)}</div>
        <div className="padd">
          <div className="qty" role="group" aria-label={`Quantity for ${product.n}`}>
            <button
              type="button"
              disabled={currentQty <= 1}
              onClick={() => onQuantityChange(Math.max(1, currentQty - 1))}
              aria-label={`Decrease quantity of ${product.n}`}
            >
              −
            </button>
            <output aria-live="polite">{currentQty}</output>
            <button
              type="button"
              onClick={() => onQuantityChange(currentQty + 1)}
              aria-label={`Increase quantity of ${product.n}`}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="btn-add"
            onClick={onAddToCart}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
