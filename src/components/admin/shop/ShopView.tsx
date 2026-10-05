'use client';

import React from 'react';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { formatGbp, orderTotal, orderProfit, marginText, parseMoney } from '@/utils/adminData';

export default function ShopView() {
  const {
    orders,
    products,
    vatRegistered,
    tigerDelivery,
    setVatRegistered,
    setTigerDelivery,
    updateProduct,
    publishShop,
  } = useAdmin();

  const openOrdersCount = orders.filter((o) => !o.sent).length;

  const orderProfits = orders.map((o) => orderProfit(o, products, vatRegistered, tigerDelivery));
  const completedProfits = orderProfits.filter((r) => r.complete);

  const totalRevenue = completedProfits.reduce((sum, r) => sum + r.revenue, 0);
  const totalProfit = completedProfits.reduce((sum, r) => sum + (r.profit ?? 0), 0);
  const averageMargin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0;
  const missingCostsCount = orderProfits.length - completedProfits.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141416] tracking-tight">
          Shop Fulfillment & Margins
        </h1>
        <p className="text-[#46464c] text-[15px] mt-1">
          Orders to dispatch to Tiger Supplies, and retail pricing margins.
        </p>
      </div>

      {/* Financial Profit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#e7e3dd] bg-white p-5 shadow-sm">
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#127a4a] uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" /> Total Realised Profit
          </span>
          <b className="block text-3xl sm:text-4xl font-extrabold font-mono text-[#127a4a]">
            {formatGbp(totalProfit)}
          </b>
          <span className="text-[12.5px] text-[#75726d] mt-1 block">
            Calculated on {completedProfits.length} of {orders.length} order{orders.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="rounded-2xl border border-[#e7e3dd] bg-white p-5 shadow-sm">
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#141416] uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" /> Average Profit Margin
          </span>
          <b className="block text-3xl sm:text-4xl font-extrabold font-mono text-[#141416]">
            {averageMargin}%
          </b>
          <span className="text-[12.5px] text-[#75726d] mt-1 block">
            {missingCostsCount > 0
              ? `${missingCostsCount} order${missingCostsCount === 1 ? '' : 's'} missing wholesale cost`
              : 'All wholesale costs recorded'}
          </span>
        </div>
      </div>

      {/* Customer Orders */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#141416]">Customer Orders</h2>
          <span className="text-[13px] font-semibold text-[#75726d]">
            {openOrdersCount > 0 ? `${openOrdersCount} to send` : 'All dispatched'}
          </span>
        </div>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {orders.map((o) => {
            const tot = orderTotal(o, products);
            const prof = orderProfit(o, products, vatRegistered, tigerDelivery);
            return (
              <div key={o.ref} className="p-4 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div className="min-w-0">
                  <p className="font-bold text-[15px] text-[#141416]">{o.cust}</p>
                  <p className="text-[13px] text-[#75726d]">
                    #{o.ref} · Deliver to {o.addr}
                  </p>
                  <p className="text-[12.5px] mt-1">
                    {prof.complete ? (
                      <span>
                        Profit:{' '}
                        <b className={prof.profit && prof.profit < 0 ? 'text-[#d32d1f]' : 'text-[#127a4a]'}>
                          {formatGbp(prof.profit ?? 0)}
                        </b>
                        {!prof.delKnown && ' (before Tiger delivery charge)'}
                      </span>
                    ) : (
                      <span className="text-[#a86200]">
                        Add Tiger price for {prof.missing?.join(', ')}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-auto text-right">
                  <div>
                    <span className="block text-[16px] font-extrabold font-mono text-[#141416]">
                      {formatGbp(tot.total)}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold mt-1 ${
                        o.sent ? 'bg-[#eaf6ef] text-[#127a4a]' : 'bg-[#fdf1ef] text-[#d32d1f]'
                      }`}>
                      {o.sent ? 'Ordered from Tiger' : 'To send'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tax & Logistics Settings */}
      <section className="space-y-4 pt-4 border-t border-[#e7e3dd]">
        <h2 className="text-lg font-extrabold text-[#141416]">Fulfillment & Tax Settings</h2>
        
        <div className="space-y-3 bg-white border border-[#e7e3dd] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[15px] text-[#141416]">Plus Waste is VAT registered</p>
              <p className="text-[13px] text-[#75726d]">
                Off: Tiger’s VAT is a cost you can’t reclaim, and you charge no VAT.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={vatRegistered}
                onChange={(e) => setVatRegistered(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#ebe8e3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#127a4a]" />
            </label>
          </div>

          <div className="pt-3 border-t border-[#e7e3dd] flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[15px] text-[#141416]">Tiger’s small-order delivery charge</p>
              <p className="text-[13px] text-[#75726d]">
                Ex VAT. Applied when an order’s Tiger wholesale cost is £75 or less.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e7e3dd] rounded-xl bg-white w-28">
              <span className="text-[#75726d] font-bold">£</span>
              <input
                type="number"
                step="0.01"
                placeholder="None"
                value={tigerDelivery ?? ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? null : parseMoney(e.target.value);
                  setTigerDelivery(val);
                }}
                className="w-full text-right font-mono font-bold text-[14px] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Pricing & Margin Editor */}
      <section className="space-y-4 pt-4 border-t border-[#e7e3dd]">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-[#141416]">Product Prices & Wholesale Costs</h2>
            <p className="text-[13px] text-[#75726d]">Customer delivery is £9.99 on orders under £75</p>
          </div>
        </div>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="p-3 bg-[#f5f3f0] text-[12px] font-bold text-[#75726d] grid grid-cols-1 sm:grid-cols-12 gap-2 text-right">
            <span className="sm:col-span-6 text-left">Product</span>
            <span className="sm:col-span-3">Your Retail Price</span>
            <span className="sm:col-span-3">Tiger Cost (ex VAT)</span>
          </div>

          {products.map((p) => {
            const m = marginText(p.price, p.cost, vatRegistered);
            return (
              <div
                key={p.id}
                className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-6">
                  <p className="font-bold text-[14.5px] text-[#141416]">{p.name}</p>
                  <p className={`text-[12.5px] mt-0.5 ${m.colorClass}`}>{m.text}</p>
                </div>

                <div className="sm:col-span-3 flex justify-end">
                  <div className="flex items-center gap-1 px-3 py-1.5 border border-[#e7e3dd] rounded-xl bg-white focus-within:border-[#141416] w-32">
                    <span className="text-[#75726d] font-bold">£</span>
                    <input
                      type="number"
                      step="0.01"
                      value={p.price}
                      onChange={(e) => {
                        const parsed = parseMoney(e.target.value);
                        if (parsed !== null) updateProduct(p.id, { price: parsed });
                      }}
                      className="w-full text-right font-mono font-bold text-[14px] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 flex justify-end">
                  <div className="flex items-center gap-1 px-3 py-1.5 border border-[#e7e3dd] rounded-xl bg-[#f5f3f0] focus-within:bg-white focus-within:border-[#141416] w-32">
                    <span className="text-[#75726d] font-bold">£</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Add"
                      value={p.cost ?? ''}
                      onChange={(e) => {
                        const parsed = e.target.value === '' ? null : parseMoney(e.target.value);
                        updateProduct(p.id, { cost: parsed });
                      }}
                      className="w-full text-right font-mono font-bold text-[14px] focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Publish Shop Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={publishShop}
            className="w-full py-3.5 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 text-white font-bold text-[15px] shadow-lg shadow-[#d32d1f]/25 transition-all cursor-pointer">
            Publish shop prices
          </button>
        </div>
      </section>
    </div>
  );
}
