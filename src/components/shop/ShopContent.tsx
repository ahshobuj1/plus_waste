'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from 'react';
import { PRODUCTS } from '@/data/shopData';
import { ShopBasket, CheckoutFormData } from '@/types';
import {
  calculateShopTotals,
  subscribeToBasket,
  getBasketSnapshot,
  getServerBasketSnapshot,
  getSavedBasket,
  saveBasket,
} from '@/utils/shop';
import {
  ShopHero,
  ProductCategorySection,
  ShopBasketSidebar,
  CheckoutModal,
  ToastNotification,
  MobileBasketBar,
} from '@/components/shop';

export default function ShopContent() {
  // Subscribe to external basket store via useSyncExternalStore
  const basketJson = useSyncExternalStore(
    subscribeToBasket,
    getBasketSnapshot,
    getServerBasketSnapshot,
  );

  const basket = useMemo<ShopBasket>(() => {
    try {
      const parsed = JSON.parse(basketJson);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch {}
    return {};
  }, [basketJson]);

  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = 1;
    });
    return initial;
  });
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    subMessage?: string;
  } | null>(null);

  // Auto-dismiss toast notification
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  // Derived category list
  const categories = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.cat)));
  }, []);

  // Derived shop totals
  const totals = useMemo(() => {
    return calculateShopTotals(basket, PRODUCTS);
  }, [basket]);

  // Handle per-card quantity stepper changes (minimum 1)
  const handleQuantityChange = useCallback((productId: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty),
    }));
  }, []);

  // Add to basket action
  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;

      const countToAdd = Math.max(1, quantities[productId] || 1);
      const currentBasket = getSavedBasket();
      const nextBasket: ShopBasket = {
        ...currentBasket,
        [productId]: (currentBasket[productId] || 0) + countToAdd,
      };

      saveBasket(nextBasket);

      // Reset the card quantity back to default 1
      setQuantities((prev) => ({
        ...prev,
        [productId]: 1,
      }));

      // Trigger toast feedback
      setToast({
        message: 'Added to basket',
        subMessage: `${countToAdd} × ${product.n}`,
      });
    },
    [quantities],
  );

  // Update item quantity directly in the basket
  const handleUpdateBasketQuantity = useCallback(
    (productId: string, newQty: number) => {
      const currentBasket = getSavedBasket();
      const nextBasket: ShopBasket = { ...currentBasket };
      if (newQty <= 0) {
        delete nextBasket[productId];
      } else {
        nextBasket[productId] = newQty;
      }
      saveBasket(nextBasket);
    },
    [],
  );

  // Remove item completely from the basket
  const handleRemoveFromBasket = useCallback((productId: string) => {
    const currentBasket = getSavedBasket();
    const nextBasket: ShopBasket = { ...currentBasket };
    delete nextBasket[productId];
    saveBasket(nextBasket);
  }, []);

  // Handle checkout modal submission
  const handleOrderPlaced = useCallback((formData: CheckoutFormData) => {
    saveBasket({});
    setToast({
      message: 'Order confirmed!',
      subMessage: `Thank you, ${formData.name}.`,
    });
  }, []);

  return (
    <main>
      <ShopHero />

      <div className="shopgrid wrap !mx-4 md:!mx-auto">
        <div id="products">
          {categories.map((category) => (
            <ProductCategorySection
              key={category}
              category={category}
              products={PRODUCTS.filter((p) => p.cat === category)}
              quantities={quantities}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <ShopBasketSidebar
          totals={totals}
          onUpdateQuantity={handleUpdateBasketQuantity}
          onRemoveItem={handleRemoveFromBasket}
          onCheckout={() => setIsCheckoutOpen(true)}
        />
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        totals={totals}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      <MobileBasketBar
        totals={totals}
        onOpenBasket={() => setIsCheckoutOpen(true)}
      />

      <ToastNotification
        message={toast?.message ?? null}
        subMessage={toast?.subMessage}
      />
    </main>
  );
}
