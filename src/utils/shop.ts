import { Product, ShopBasket, ShopTotals } from '@/types';

export const SHOP_DELIVERY_FEE = 9.99;
export const SHOP_FREE_DELIVERY_OVER = 75;
export const BASKET_STORAGE_KEY = 'pw_basket';
export const BASKET_UPDATED_EVENT = 'pw_basket_updated';

export function calculateShopTotals(basket: ShopBasket, products: Product[]): ShopTotals {
  const lines = products
    .filter(p => (basket[p.id] || 0) > 0)
    .map(product => {
      const quantity = basket[product.id] || 0;
      return {
        product,
        quantity,
        lineTotal: Math.round(product.cost * quantity * 100) / 100
      };
    });

  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Math.round(lines.reduce((sum, item) => sum + item.lineTotal, 0) * 100) / 100;
  const isFreeDelivery = subtotal >= SHOP_FREE_DELIVERY_OVER;
  const deliveryFee = subtotal > 0 && !isFreeDelivery ? SHOP_DELIVERY_FEE : 0;
  const shortfallForFreeDelivery = Math.max(0, Math.round((SHOP_FREE_DELIVERY_OVER - subtotal) * 100) / 100);
  const grandTotal = Math.round((subtotal + deliveryFee) * 100) / 100;

  return {
    lines,
    totalQuantity,
    subtotal,
    deliveryFee,
    freeDeliveryOver: SHOP_FREE_DELIVERY_OVER,
    shortfallForFreeDelivery,
    isFreeDelivery,
    grandTotal
  };
}

export function subscribeToBasket(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(BASKET_UPDATED_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(BASKET_UPDATED_EVENT, callback);
  };
}

export function getBasketSnapshot(): string {
  if (typeof window === 'undefined') return '{}';
  try {
    return localStorage.getItem(BASKET_STORAGE_KEY) || '{}';
  } catch {
    return '{}';
  }
}

export function getServerBasketSnapshot(): string {
  return '{}';
}

export function getSavedBasket(): ShopBasket {
  try {
    const raw = getBasketSnapshot();
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch {}
  return {};
}

export function saveBasket(basket: ShopBasket): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
    window.dispatchEvent(new Event(BASKET_UPDATED_EVENT));
  } catch {
    // Ignore storage write errors
  }
}
