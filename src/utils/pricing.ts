import { BookingState, QuoteResult, QuoteLine } from '@/types';
import { PRICING, SHOP_PRICES, SHOP_NAMES } from '@/data/pricingData';

export function formatMoney(n: number): string {
  return '£' + n.toFixed(2).replace(/\.00$/, '');
}

export function calculateQuote(
  state: BookingState,
  shopBasket: Record<string, number> = {}
): QuoteResult {
  const lines: QuoteLine[] = [];
  let base = 0;

  if (state.load) {
    base = state.load.price;
    lines.push({ k: state.load.name, v: formatMoney(base) });
  }

  let total = base;

  // Extra items
  PRICING.items.forEach(i => {
    const q = state.items[i.id] || 0;
    if (!q) return;
    const lineCost = i.price * q;
    total += lineCost;
    lines.push({
      k: `${q} × ${i.name.replace(/, from$/, '')}`,
      v: formatMoney(lineCost)
    });
  });

  // Inside removal
  if (state.place === 'inside') {
    total += PRICING.extras.inside;
    lines.push({
      k: 'Removal from inside',
      v: formatMoney(PRICING.extras.inside)
    });
  }

  // Dismantling
  if (state.disN > 0) {
    const dismantleFee =
      PRICING.extras.dismantleFirstTwo +
      Math.max(0, state.disN - 2) * PRICING.extras.dismantlePerExtra;
    total += dismantleFee;
    lines.push({
      k: `Dismantling, up to ${state.disN} items`,
      v: formatMoney(dismantleFee)
    });
  }

  // Time slot fee
  if (state.slot && state.slot.fee) {
    total += state.slot.fee;
    lines.push({
      k: `${state.slot.label} slot`,
      v: formatMoney(state.slot.fee)
    });
  }

  // Late-night minimum
  if (state.slot && state.slot.min && total < state.slot.min) {
    lines.push({
      k: 'Late-night minimum',
      v: formatMoney(state.slot.min - total),
      mute: true
    });
    total = state.slot.min;
  }

  // Discounts
  const discountRate = (PRICING.discounts as Record<string, number>)[state.acct] || 0;
  if (discountRate > 0 && total > 0) {
    const discountAmt = total * discountRate;
    total -= discountAmt;
    lines.push({
      k: `${discountRate * 100}% ${state.acct === 'sub' ? 'membership' : 'account'} discount`,
      v: '−' + formatMoney(discountAmt),
      off: true
    });
  }

  // Shop items
  let shopTotal = 0;
  for (const k in shopBasket) {
    const qty = shopBasket[k];
    const price = SHOP_PRICES[k];
    if (qty > 0 && price) {
      const itemCost = price * qty;
      shopTotal += itemCost;
      lines.push({
        k: `${qty} × ${SHOP_NAMES[k] || k}`,
        v: formatMoney(itemCost),
        shop: true
      });
    }
  }

  total += shopTotal;

  return {
    total: Math.round(total * 100) / 100,
    lines,
    priced: base > 0,
    shop: shopTotal
  };
}
