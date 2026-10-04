export interface LoadTier {
  id: string;
  name: string;
  price: number;
  kg: number;
  cuyd: number;
  bags: string;
  mins: string;
  best?: boolean;
}

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

export interface ExtrasConfig {
  inside: number;
  dismantleFirstTwo: number;
  dismantlePerExtra: number;
}

export interface DiscountsConfig {
  account: number;
  sub: number;
  guest: number;
  [key: string]: number;
}

export interface PricingConfig {
  loads: LoadTier[];
  items: ExtraItem[];
  extras: ExtrasConfig;
  discounts: DiscountsConfig;
}

export interface VanBoxCoordinates {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface WasteType {
  id: string;
  label: string;
  iconPath: string;
}

export interface JobPhoto {
  src: string;
  cap: string;
  area: string;
  file: string;
}

export interface ReviewItem {
  n: string;
  t: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
