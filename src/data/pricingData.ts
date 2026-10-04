import { PricingConfig, VanBoxCoordinates, WasteType, TimeSlotOption } from '@/types';

export const CAGE_YD = 18;

export const VAN_BOX: VanBoxCoordinates = {
  left: 9.26,
  top: 24.47,
  width: 48.61,
  height: 38.90
};

export const PRICING: PricingConfig = {
  loads: [
    { id: 'min',   name: 'Minimum load', price: 89,  kg: 100,  cuyd: 1,  bags: '10 bags',     mins: '10 min loading' },
    { id: 'small', name: 'Small load',   price: 149, kg: 150,  cuyd: 2,  bags: '20 bags',     mins: '15 min loading' },
    { id: 'med',   name: 'Medium load',  price: 289, kg: 350,  cuyd: 4,  bags: '20–40 bags',  mins: '20 min loading' },
    { id: 'large', name: 'Large load',   price: 369, kg: 700,  cuyd: 8,  bags: '40–60 bags',  mins: '30 min loading' },
    { id: 'lp',    name: 'Large+ load',  price: 449, kg: 1000, cuyd: 14, bags: '60–80 bags',  mins: '40 min loading' },
    { id: 'lpp',   name: 'Large++ load', price: 549, kg: 1500, cuyd: 18, bags: '80–150 bags', mins: '1 hour loading', best: true }
  ],
  items: [
    { id: 'fridge', name: 'Fridge or freezer', price: 79 },
    { id: 'matt-s', name: 'Mattress, single', price: 50 },
    { id: 'matt-d', name: 'Mattress, double', price: 60 },
    { id: 'matt-k', name: 'Mattress, kingsize', price: 80 },
    { id: 'sofa',   name: 'Sofa, from', price: 80 },
    { id: 'tyre',   name: 'Tyre', price: 25 },
    { id: 'bin',    name: 'Wheelie bin emptied', price: 45 }
  ],
  extras: {
    inside: 25,
    dismantleFirstTwo: 25,
    dismantlePerExtra: 10
  },
  discounts: {
    account: 0.10,
    sub: 0.15,
    guest: 0
  }
};

export const WASTE_TYPES: WasteType[] = [
  { id: 'builders',  label: "Builders' waste", iconPath: 'M3 20h18M5 20v-7h6v7M13 20v-11h6v11M5 13h6M13 9h6' },
  { id: 'household', label: 'Household',       iconPath: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6' },
  { id: 'furniture', label: 'Furniture',       iconPath: 'M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3M3 11h18v6H3zM5 17v3M19 17v3' },
  { id: 'garden',    label: 'Garden',          iconPath: 'M12 21V9M12 9c0-3 2-5 5-5 0 3-2 5-5 5zM12 12c0-3-2-5-5-5 0 3 2 5 5 5z' },
  { id: 'green',     label: 'Green waste',     iconPath: 'M5 21c0-8 5-13 14-14 0 9-5 14-14 14zM8 18c2-4 5-7 9-9' },
  { id: 'wood',      label: 'Wood',            iconPath: 'M4 7h11a3 3 0 0 1 0 10H4zM4 7a3 3 0 0 0 0 10' },
  { id: 'cardboard', label: 'Cardboard',       iconPath: 'M3 8l9-4 9 4v9l-9 4-9-4zM3 8l9 4 9-4M12 12v9' },
  { id: 'food',      label: 'Food waste',      iconPath: 'M5 3v8a3 3 0 0 0 6 0V3M8 11v10M16 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6zM16 12v9' },
  { id: 'mixed',     label: 'Mixed waste',     iconPath: 'M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6' }
];

export const TIME_SLOTS: TimeSlotOption[] = [
  { v: '8-12',   label: '8am to 12pm (morning)',  fee: 0,     min: 0 },
  { v: '12-3',   label: '12pm to 3pm (midday)',   fee: 0,     min: 0 },
  { v: '3-6',    label: '3pm to 6pm (afternoon)', fee: 0,     min: 0 },
  { v: '6-9',    label: '6pm to 9pm (evening)',   fee: 29.99, min: 0 },
  { v: '9-12',   label: '9pm to midnight',        fee: 49.99, min: 229 },
  { v: 'exact1', label: 'Exact 1-hour window',    fee: 29.99, min: 0 }
];

export const SHOP_PRICES: Record<string, number> = {
  rubble100: 37.69,
  tonnebag: 8.99,
  'glove-orange': 1.90,
  'glove-mp1': 2.50,
  'glove-nitrile': 1.90,
  'glove-hantex': 7.50,
  ffp3: 19.99,
  coverall: 8.79,
  vest: 6.40
};

export const SHOP_NAMES: Record<string, string> = {
  rubble100: 'Rubble sacks (100)',
  tonnebag: '1 tonne bulk bag',
  'glove-orange': 'Latex grip gloves',
  'glove-mp1': 'MP1 gloves',
  'glove-nitrile': 'Nitrile gloves',
  'glove-hantex': 'Hantex cut-D gloves',
  ffp3: 'FFP3 masks (10)',
  coverall: 'Type 5/6 coverall',
  vest: 'Hi-vis vest'
};
