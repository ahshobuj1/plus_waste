import React from 'react';
import { PRICING } from '@/data/pricingData';

export default function RateItemsTable() {
  const formatMoney = (n: number) => '£' + n.toFixed(2).replace(/\.00$/, '');

  return (
    <table className="rate">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody id="rateItems">
        {PRICING.items.map(item => (
          <tr key={item.id}>
            <td data-l="Item">{item.name}</td>
            <td data-l="Price" className="amt">{formatMoney(item.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
