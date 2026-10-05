import React from 'react';
import {Product} from '@/types';
import ProductCard from './ProductCard';

interface ProductCategorySectionProps {
  category: string;
  products: Product[];
  quantities: Record<string, number>;
  onQuantityChange: (productId: string, qty: number) => void;
  onAddToCart: (productId: string) => void;
}

export default function ProductCategorySection({
  category,
  products,
  quantities,
  onQuantityChange,
  onAddToCart,
}: ProductCategorySectionProps) {
  return (
    <section
      className="shop-category-section"
      aria-labelledby={`cat-${category.replace(/\s+/g, '-').toLowerCase()}`}>
      <h2
        className="cat my-4"
        id={`cat-${category.replace(/\s+/g, '-').toLowerCase()}`}>
        {category}
      </h2>
      <div className="prods">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantities[product.id] || 1}
            onQuantityChange={(qty) => onQuantityChange(product.id, qty)}
            onAddToCart={() => onAddToCart(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
