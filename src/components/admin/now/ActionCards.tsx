'use client';

import React, { useState } from 'react';
import { PackageCheck, AlertTriangle, UserPlus, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { formatGbp, orderTotal, orderProfit } from '@/utils/adminData';

export default function ActionCards() {
  const {
    jobs,
    orders,
    drivers,
    products,
    loads,
    vatRegistered,
    tigerDelivery,
    reviewedJobRefs,
    markOrderSent,
    assignDriver,
    tellCrewCheck,
    dismissFlag,
  } = useAdmin();

  const [driverSelections, setDriverSelections] = useState<Record<string, string>>({});

  const pendingOrders = orders.filter((o) => !o.sent);
  const flaggedJobs = jobs.filter((j) => j.flag && !reviewedJobRefs.has(j.ref) && !j.done);
  const unassignedToday = jobs.filter((j) => j.day === 'Today' && !j.driver && !j.done);

  const getLoad = (id: string) => loads.find((l) => l.id === id) || { name: '?', cuyd: 0, price: 0 };
  const getProduct = (id: string) => products.find((p) => p.id === id);

  const activeDrivers = drivers.filter((d) => d.on);

  const totalUrgent = pendingOrders.length + flaggedJobs.length + unassignedToday.length;

  return (
    <div className="space-y-4 mb-8">
      <div className="pb-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141416] tracking-tight">
          {totalUrgent === 0
            ? "You're all caught up"
            : totalUrgent === 1
            ? '1 thing needs you'
            : `${totalUrgent} things need you`}
        </h1>
        <p className="text-[#46464c] text-[15px] mt-1">
          {totalUrgent === 0
            ? 'Nothing waiting. New bookings and shop orders will appear here.'
            : 'Shop orders to send, jobs without a driver, and bookings that look too small.'}
        </p>
      </div>

      {/* 1. Pending Shop Orders */}
      {pendingOrders.map((order) => {
        const totalInfo = orderTotal(order, products);
        const profitInfo = orderProfit(order, products, vatRegistered, tigerDelivery);

        return (
          <article
            key={order.ref}
            className="rounded-2xl border-2 border-[#141416] bg-white p-5 shadow-lg shadow-[#141416]/5 transition-all">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141416] text-white text-[12px] font-bold">
                <PackageCheck className="w-3.5 h-3.5" />
                Shop order
              </span>
              <span className="text-[13px] font-semibold text-[#75726d]">#{order.ref}</span>
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#141416]">{order.cust}</h2>
              <span className="text-2xl font-extrabold font-mono tracking-tight text-[#141416]">
                {formatGbp(totalInfo.total)}
              </span>
            </div>

            <p className="text-[#46464c] text-[14.5px] mt-1">
              Deliver to <b className="text-[#141416]">{order.addr}</b>. Order from Tiger Supplies before 3:30pm for next-day delivery.
            </p>

            <div className="mt-3.5 pt-3 border-t border-[#e7e3dd] space-y-1.5 text-[14px]">
              {order.items.map(([prodId, qty]) => {
                const p = getProduct(prodId);
                return p ? (
                  <div key={prodId} className="flex justify-between text-[#46464c]">
                    <span>{qty} × {p.name}</span>
                    <span className="font-semibold text-[#141416]">{formatGbp(p.price * qty)}</span>
                  </div>
                ) : null;
              })}
              {totalInfo.del > 0 && (
                <div className="flex justify-between text-[#46464c]">
                  <span>Delivery</span>
                  <span className="font-semibold text-[#141416]">{formatGbp(totalInfo.del)}</span>
                </div>
              )}
            </div>

            <div className="mt-3 text-[13px] text-[#75726d]">
              Paid by customer ·{' '}
              {profitInfo.complete ? (
                <span>
                  Profit{' '}
                  <b className={profitInfo.profit && profitInfo.profit < 0 ? 'text-[#d32d1f]' : 'text-[#127a4a]'}>
                    {formatGbp(profitInfo.profit ?? 0)}
                  </b>
                  {!profitInfo.delKnown && ' (before Tiger delivery charge)'}
                </span>
              ) : (
                <span>Add Tiger’s price to calculate profit</span>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#e7e3dd]">
              <button
                type="button"
                onClick={() => markOrderSent(order.ref)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 text-white font-bold text-[14.5px] transition-all shadow-md shadow-[#d32d1f]/20 cursor-pointer">
                Mark as ordered from Tiger
              </button>
            </div>
          </article>
        );
      })}

      {/* 2. Flagged Jobs (Photo Mismatch) */}
      {flaggedJobs.map((job) => {
        if (!job.flag) return null;
        const aiLoad = getLoad(job.flag.ai);
        const bookedLoad = getLoad(job.load);

        return (
          <article
            key={job.ref}
            className="rounded-2xl border-2 border-[#a86200] bg-white p-5 shadow-lg shadow-[#a86200]/5 transition-all">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf4e4] text-[#a86200] text-[12px] font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Booked too small?
              </span>
              <span className="text-[13px] font-semibold text-[#75726d]">
                {job.day} {job.time}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-[#141416]">
              {job.cust}, {job.area}
            </h2>
            <p className="text-[#46464c] text-[14.5px] mt-1">{job.flag.note}</p>

            <div className="mt-3.5 pt-3 border-t border-[#e7e3dd] grid grid-cols-2 gap-3 text-[14px]">
              <div className="bg-[#f5f3f0] p-3 rounded-xl">
                <span className="text-[#75726d] text-[12px] block">Customer booked</span>
                <span className="font-extrabold text-[#141416]">{bookedLoad.name} ({formatGbp(bookedLoad.price)})</span>
              </div>
              <div className="bg-[#fdf4e4] p-3 rounded-xl border border-[#f0dcb8]">
                <span className="text-[#a86200] text-[12px] block">Photos suggest</span>
                <span className="font-extrabold text-[#a86200]">{aiLoad.name} ({formatGbp(aiLoad.price)})</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e7e3dd] flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => tellCrewCheck(job.ref)}
                className="px-5 py-2.5 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 text-white font-bold text-[14px] transition-all shadow-sm cursor-pointer">
                Tell the crew to check
              </button>
              <button
                type="button"
                onClick={() => dismissFlag(job.ref)}
                className="px-4 py-2.5 rounded-xl border border-[#e7e3dd] hover:border-[#141416] bg-white text-[#141416] font-semibold text-[14px] transition-all cursor-pointer">
                Looks fine
              </button>
            </div>
          </article>
        );
      })}

      {/* 3. Unassigned Jobs Today */}
      {unassignedToday.map((job) => {
        const l = getLoad(job.load);
        const selectedDriver = driverSelections[job.ref] || '';

        return (
          <article
            key={job.ref}
            className="rounded-2xl border-2 border-[#d32d1f] bg-white p-5 shadow-lg shadow-[#d32d1f]/5 transition-all">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf1ef] text-[#d32d1f] text-[12px] font-bold">
                <UserPlus className="w-3.5 h-3.5" />
                No driver yet
              </span>
              <span className="text-[13px] font-semibold text-[#75726d]">Today {job.time}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-[#141416]">
              {job.cust}, {job.area}
            </h2>
            <p className="text-[#46464c] text-[14.5px] mt-1">
              {l.name} load ({l.cuyd} cu yd) ·{' '}
              {job.paid ? (
                <span className="text-[#127a4a] font-semibold">Paid</span>
              ) : (
                <span className="text-[#d32d1f] font-semibold">Not paid yet</span>
              )}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <select
                aria-label={`Select driver for ${job.cust}`}
                value={selectedDriver}
                onChange={(e) =>
                  setDriverSelections((prev) => ({ ...prev, [job.ref]: e.target.value }))
                }
                className="h-11 px-3.5 rounded-xl border border-[#141416] bg-white text-[14.5px] font-semibold text-[#141416] focus:outline-none focus:ring-2 focus:ring-[#d32d1f]">
                <option value="">Choose a driver…</option>
                {activeDrivers.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                disabled={!selectedDriver}
                onClick={() => {
                  if (selectedDriver) {
                    assignDriver(job.ref, selectedDriver);
                  }
                }}
                className="h-11 px-5 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 disabled:opacity-40 text-white font-bold text-[14px] transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed">
                Assign driver
              </button>
            </div>
          </article>
        );
      })}

      {totalUrgent === 0 && (
        <div className="rounded-2xl border border-[#e7e3dd] bg-[#f5f3f0]/60 p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#127a4a] mx-auto mb-2" />
          <h3 className="font-extrabold text-[#141416] text-lg">Clean slate</h3>
          <p className="text-[#75726d] text-sm mt-1">All orders dispatched, drivers assigned, and bookings verified.</p>
        </div>
      )}
    </div>
  );
}
