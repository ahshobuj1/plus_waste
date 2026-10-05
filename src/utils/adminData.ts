import {
  RateLoad,
  RateItem,
  RateSurcharge,
  AdminProduct,
  Driver,
  Offer,
  AdminJob,
  AdminOrder,
  OrderTotalResult,
  OrderProfitResult,
  MarginTextResult,
} from '@/types';

export const VAT_RATE = 0.20;
export const TIGER_FREE_OVER = 75;

export const INITIAL_DAYS = ['Today', 'Tomorrow', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'] as const;

export const INITIAL_LOADS: RateLoad[] = [
  { id: 'min', name: 'Minimum', price: 89, cuyd: 1, kg: 100 },
  { id: 'small', name: 'Small', price: 149, cuyd: 2, kg: 150 },
  { id: 'med', name: 'Medium', price: 289, cuyd: 4, kg: 350 },
  { id: 'large', name: 'Large', price: 369, cuyd: 8, kg: 700 },
  { id: 'lp', name: 'Large+', price: 449, cuyd: 14, kg: 1000 },
  { id: 'lpp', name: 'Large++', price: 549, cuyd: 18, kg: 1500 },
];

export const INITIAL_ITEMS: RateItem[] = [
  { id: 'fridge', name: 'Fridge or freezer', price: 79 },
  { id: 'matt-s', name: 'Mattress, single', price: 50 },
  { id: 'matt-d', name: 'Mattress, double', price: 60 },
  { id: 'matt-k', name: 'Mattress, kingsize', price: 80 },
  { id: 'sofa', name: 'Sofa, from', price: 80 },
  { id: 'tyre', name: 'Tyre', price: 25 },
  { id: 'bin', name: 'Wheelie bin emptied', price: 45 },
];

export const INITIAL_SURCHARGES: RateSurcharge[] = [
  { id: 'inside', name: 'Removal from inside', note: 'Per job', price: 25 },
  { id: 'dis2', name: 'Dismantling, first two items', note: 'Per job', price: 25 },
  { id: 'disx', name: 'Dismantling, each extra item', note: 'Per item', price: 10 },
  { id: 'offpk', name: 'Evening slot, 6pm to 9pm', note: 'Per job', price: 29.99 },
  { id: 'late', name: 'Late slot, 9pm to midnight', note: '£229 minimum total', price: 49.99 },
  { id: 'exact', name: 'Exact 1-hour window', note: 'Per job', price: 29.99 },
  { id: 'member', name: 'Membership, per month', note: 'Gives 15% off', price: 29.99 },
];

export const INITIAL_PRODUCTS: AdminProduct[] = [
  { id: 'rubble100', name: 'Rubble sacks, 50L, box of 100', price: 37.69, cost: null },
  { id: 'tonnebag', name: '1 tonne bulk builders bag', price: 8.99, cost: null },
  { id: 'glove-orange', name: 'Scudo latex grip glove, orange', price: 1.90, cost: null },
  { id: 'glove-mp1', name: 'MP1 black glove', price: 2.50, cost: 1.46 },
  { id: 'glove-nitrile', name: 'Nitrile lightweight glove, red', price: 1.90, cost: 0.69 },
  { id: 'glove-hantex', name: 'Hantex HX5-PU, cut level D', price: 7.50, cost: 4.11 },
  { id: 'ffp3', name: 'JSP FFP3V mask, box of 10', price: 19.99, cost: 13.93 },
  { id: 'coverall', name: 'Type 5/6 coverall', price: 8.79, cost: null },
  { id: 'vest', name: 'C470 hi-vis vest, yellow', price: 6.40, cost: null },
];

export const INITIAL_DRIVERS: Driver[] = [
  { name: 'Marcus', on: true },
  { name: 'Kofi', on: true },
  { name: 'Dan', on: false },
];

export const INITIAL_OFFERS: Offer[] = [
  { name: '10% off your first booking', on: true },
  { name: 'Free mattress with any Large++ load', on: false },
];

export const INITIAL_JOBS: AdminJob[] = [
  {
    ref: 'PW40211',
    day: 'Today',
    time: '09:30',
    cust: 'Daniel',
    area: 'Fitzrovia W1T',
    load: 'med',
    total: 289,
    paid: true,
    driver: 'Marcus',
    done: false,
    flag: null,
  },
  {
    ref: 'PW40218',
    day: 'Today',
    time: '13:00',
    cust: 'Chloe',
    area: 'Belgravia SW1X',
    load: 'lp',
    total: 449,
    paid: false,
    driver: '',
    done: false,
    flag: null,
  },
  {
    ref: 'PW40222',
    day: 'Today',
    time: '18:30',
    cust: 'The Kitchen Co.',
    area: 'Soho W1F',
    load: 'small',
    total: 179,
    paid: true,
    driver: 'Kofi',
    done: false,
    flag: {
      ai: 'large',
      note: 'Photos look like about 8 cubic yards; the customer booked a Small load (2 cu yd).',
    },
  },
  {
    ref: 'PW40230',
    day: 'Thu',
    time: '10:00',
    cust: 'Aisha',
    area: 'Marylebone W1U',
    load: 'large',
    total: 369,
    paid: true,
    driver: '',
    done: false,
    flag: null,
  },
  {
    ref: 'PW40235',
    day: 'Fri',
    time: '08:00',
    cust: 'Tom',
    area: 'Mayfair W1K',
    load: 'lpp',
    total: 549,
    paid: false,
    driver: 'Marcus',
    done: false,
    flag: null,
  },
];

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    ref: 'PWS51180',
    cust: 'Riverside Build Ltd',
    addr: 'Paddington W2',
    items: [
      ['rubble100', 2],
      ['glove-mp1', 10],
      ['ffp3', 1],
    ],
    sent: false,
  },
  {
    ref: 'PWS51174',
    cust: 'Sam',
    addr: 'Chelsea SW3',
    items: [
      ['vest', 2],
      ['coverall', 3],
    ],
    sent: true,
  },
  {
    ref: 'PWS51169',
    cust: 'Northside Refits',
    addr: 'Marylebone W1U',
    items: [
      ['glove-mp1', 20],
      ['ffp3', 2],
      ['glove-hantex', 4],
    ],
    sent: true,
  },
];

export function formatGbp(val: number): string {
  return (
    '£' +
    Number(val).toLocaleString('en-GB', {
      minimumFractionDigits: Number(val) % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}

export function parseMoney(val: string | number | null | undefined): number | null {
  const t = String(val ?? '').trim();
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(t)) return null;
  const n = Number(t);
  return n <= 100000 ? Math.round(n * 100) / 100 : null;
}

export function paidCost(product: AdminProduct, vatRegistered: boolean): number | null {
  if (product.cost == null) return null;
  return vatRegistered ? product.cost : product.cost * (1 + VAT_RATE);
}

export function netRevenue(total: number, vatRegistered: boolean): number {
  return vatRegistered ? total / (1 + VAT_RATE) : total;
}

export function orderTotal(order: AdminOrder, products: AdminProduct[]): OrderTotalResult {
  const sub = order.items.reduce((acc, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return acc + (p ? p.price * qty : 0);
  }, 0);
  const del = sub > 0 && sub < 75 ? 9.99 : 0;
  return {
    sub,
    del,
    total: Math.round((sub + del) * 100) / 100,
  };
}

export function orderProfit(
  order: AdminOrder,
  products: AdminProduct[],
  vatRegistered: boolean,
  tigerDelivery: number | null
): OrderProfitResult {
  const t = orderTotal(order, products);
  let cost = 0;
  let tigerSub = 0;
  const missing: string[] = [];

  order.items.forEach(([id, qty]) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    const c = paidCost(p, vatRegistered);
    if (c == null) {
      if (!missing.includes(p.name)) missing.push(p.name);
      return;
    }
    cost += c * qty;
    tigerSub += (p.cost ?? 0) * qty;
  });

  const rev = netRevenue(t.total, vatRegistered);
  if (missing.length) {
    return { complete: false, missing, revenue: Math.round(rev * 100) / 100 };
  }

  let del = 0;
  let delKnown = true;
  if (tigerSub <= TIGER_FREE_OVER) {
    if (tigerDelivery == null) {
      delKnown = false;
    } else {
      del = vatRegistered ? tigerDelivery : tigerDelivery * (1 + VAT_RATE);
    }
  }

  const profit = rev - cost - del;
  return {
    complete: true,
    revenue: Math.round(rev * 100) / 100,
    cost: Math.round((cost + del) * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    margin: rev ? profit / rev : 0,
    delKnown,
    tigerSub: Math.round(tigerSub * 100) / 100,
  };
}

export function marginText(
  price: number,
  cost: number | null,
  vatRegistered: boolean
): MarginTextResult {
  if (cost == null) {
    return {
      text: 'Add Tiger’s price to see profit',
      colorClass: 'text-[#75726d]',
    };
  }
  const pay = vatRegistered ? cost : cost * (1 + VAT_RATE);
  const net = netRevenue(price, vatRegistered);
  const profit = net - pay;
  const pct = net ? Math.round((profit / net) * 100) : 0;

  if (profit < 0) {
    return {
      text: `Loss of ${formatGbp(Math.round(-profit * 100) / 100)} on each one — check price`,
      colorClass: 'text-[#d32d1f]',
    };
  }
  return {
    text: `You pay ${formatGbp(Math.round(pay * 100) / 100)}${
      vatRegistered ? '' : ' inc VAT'
    }, profit ${formatGbp(Math.round(profit * 100) / 100)} (${pct}%)`,
    colorClass: 'text-[#127a4a]',
  };
}

function csvCell(val: unknown): string {
  let s = String(val ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}

export function exportJobsCsv(jobs: AdminJob[], loads: RateLoad[]): void {
  const getLoadName = (id: string) => loads.find((l) => l.id === id)?.name ?? '?';
  const headers = [
    'Ref',
    'Day',
    'Time',
    'Customer',
    'Area',
    'Load',
    'Total',
    'Paid',
    'Driver',
    'Collected',
  ];
  const rows = jobs.map((j) => [
    j.ref,
    j.day,
    j.time,
    j.cust,
    j.area,
    getLoadName(j.load),
    j.total.toFixed(2),
    j.paid ? 'Yes' : 'No',
    j.driver || '',
    j.done ? 'Yes' : 'No',
  ]);

  const csv = [headers, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `plus-waste-jobs-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
