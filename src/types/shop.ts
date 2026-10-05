export interface Product {
  cat: string;
  id: string;
  n: string;
  u: string;
  cost: number;
  img: string;
}

export type ShopBasket = Record<string, number>;

export interface CartLineItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface ShopTotals {
  lines: CartLineItem[];
  totalQuantity: number;
  subtotal: number;
  deliveryFee: number;
  freeDeliveryOver: number;
  shortfallForFreeDelivery: number;
  isFreeDelivery: boolean;
  grandTotal: number;
}

export interface CheckoutFormData {
  name: string;
  company?: string;
  mobile: string;
  email: string;
  address: string;
  notes?: string;
}
