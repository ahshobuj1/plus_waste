export type AdminTabType = 'now' | 'jobs' | 'money' | 'shop' | 'setup';

export interface RateLoad {
  id: string;
  name: string;
  price: number;
  cuyd: number;
  kg: number;
}

export interface RateItem {
  id: string;
  name: string;
  price: number;
}

export interface RateSurcharge {
  id: string;
  name: string;
  note?: string;
  price: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  cost: number | null;
}

export interface Driver {
  name: string;
  on: boolean;
}

export interface Offer {
  name: string;
  on: boolean;
}

export interface JobFlag {
  ai: string;
  note: string;
}

export interface AdminJob {
  ref: string;
  day: string;
  time: string;
  cust: string;
  area: string;
  load: string;
  total: number;
  paid: boolean;
  driver: string;
  done: boolean;
  flag: JobFlag | null;
}

export interface AdminOrder {
  ref: string;
  cust: string;
  addr: string;
  items: [string, number][];
  sent: boolean;
}

export interface OrderTotalResult {
  sub: number;
  del: number;
  total: number;
}

export interface OrderProfitResult {
  complete: boolean;
  missing?: string[];
  revenue: number;
  cost?: number;
  profit?: number;
  margin?: number;
  delKnown?: boolean;
  tigerSub?: number;
}

export interface MarginTextResult {
  text: string;
  colorClass: string;
}

export interface AdminToastState {
  id: string;
  message: string;
  undoFn?: (() => void) | null;
}
