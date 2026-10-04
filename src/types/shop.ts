export interface Product {
  cat: string;
  id: string;
  n: string;
  u: string;
  cost: number;
  img: string;
}

export type ShopBasket = Record<string, number>;
