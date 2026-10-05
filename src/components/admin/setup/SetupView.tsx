'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { parseMoney } from '@/utils/adminData';

export default function SetupView() {
  const {
    loads,
    items,
    surcharges,
    drivers,
    offers,
    updateRateLoad,
    updateRateItem,
    updateRateSurcharge,
    addDriver,
    removeDriver,
    toggleDriver,
    toggleOffer,
    publishRates,
  } = useAdmin();

  const [newDriverName, setNewDriverName] = useState('');

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (addDriver(newDriverName)) {
      setNewDriverName('');
    }
  };

  const activeDriversCount = drivers.filter((d) => d.on).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141416] tracking-tight">
          Rate Card & Operations Setup
        </h1>
        <p className="text-[#46464c] text-[15px] mt-1">
          Your live rate card, driver fleet, and website promotional offers.
        </p>
      </div>

      {/* 1. Van Loads */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold text-[#141416]">Van Loads</h2>
          <span className="text-[13px] text-[#75726d]">18 cu yd cage capacity</span>
        </div>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {loads.map((load) => (
            <div key={load.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[15px] text-[#141416]">{load.name}</p>
                <p className="text-[12.5px] text-[#75726d]">
                  {load.cuyd} cu yd, up to {load.kg.toLocaleString('en-GB')} kg
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e7e3dd] rounded-xl bg-white focus-within:border-[#141416] w-28">
                <span className="text-[#75726d] font-bold">£</span>
                <input
                  type="number"
                  step="1"
                  value={load.price}
                  onChange={(e) => {
                    const parsed = parseMoney(e.target.value);
                    if (parsed !== null) updateRateLoad(load.id, parsed);
                  }}
                  className="w-full text-right font-mono font-bold text-[14.5px] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Individual Items */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold text-[#141416]">Individual Items</h2>
          <span className="text-[13px] text-[#75726d]">Charged on top of base loads</span>
        </div>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {items.map((item) => (
            <div key={item.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
              <p className="font-bold text-[15px] text-[#141416]">{item.name}</p>

              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e7e3dd] rounded-xl bg-white focus-within:border-[#141416] w-28">
                <span className="text-[#75726d] font-bold">£</span>
                <input
                  type="number"
                  step="1"
                  value={item.price}
                  onChange={(e) => {
                    const parsed = parseMoney(e.target.value);
                    if (parsed !== null) updateRateItem(item.id, parsed);
                  }}
                  className="w-full text-right font-mono font-bold text-[14.5px] focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Surcharges & Discounts */}
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold text-[#141416]">Surcharges and Discounts</h2>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {surcharges.map((sur) => (
            <div key={sur.id} className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[15px] text-[#141416]">{sur.name}</p>
                {sur.note && <p className="text-[12.5px] text-[#75726d]">{sur.note}</p>}
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e7e3dd] rounded-xl bg-white focus-within:border-[#141416] w-28">
                <span className="text-[#75726d] font-bold">£</span>
                <input
                  type="number"
                  step="0.01"
                  value={sur.price}
                  onChange={(e) => {
                    const parsed = parseMoney(e.target.value);
                    if (parsed !== null) updateRateSurcharge(sur.id, parsed);
                  }}
                  className="w-full text-right font-mono font-bold text-[14.5px] focus:outline-none"
                />
              </div>
            </div>
          ))}
          <div className="p-3.5 sm:p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-[15px] text-[#141416]">Account discount</p>
              <p className="text-[12.5px] text-[#75726d]">Fixed rate</p>
            </div>
            <span className="font-mono font-extrabold text-[15px] text-[#141416]">10%</span>
          </div>
        </div>
      </section>

      {/* 4. Drivers Fleet */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold text-[#141416]">Driver Fleet</h2>
          <span className="text-[13px] font-semibold text-[#75726d]">
            {activeDriversCount} active
          </span>
        </div>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {drivers.map((drv, idx) => (
            <div key={drv.name} className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[15px] text-[#141416]">{drv.name}</p>
                <p className="text-[12.5px] text-[#75726d]">
                  {drv.on ? 'Available for jobs' : 'Not taking jobs'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={drv.on}
                    onChange={(e) => toggleDriver(idx, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#ebe8e3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#127a4a]" />
                </label>

                <button
                  type="button"
                  onClick={() => removeDriver(idx)}
                  className="p-1.5 rounded-lg text-[#75726d] hover:text-[#d32d1f] hover:bg-[#fdf1ef] transition-colors cursor-pointer"
                  title={`Remove ${drv.name}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Driver Input Form */}
        <form onSubmit={handleAddDriver} className="flex gap-2">
          <input
            type="text"
            placeholder="Add driver name"
            maxLength={40}
            value={newDriverName}
            onChange={(e) => setNewDriverName(e.target.value)}
            className="flex-1 h-11 px-4 rounded-xl border border-[#e7e3dd] bg-white text-[14.5px] font-medium text-[#141416] focus:outline-none focus:border-[#141416]"
          />
          <button
            type="submit"
            disabled={!newDriverName.trim()}
            className="h-11 px-5 rounded-xl bg-[#141416] hover:bg-black active:scale-98 disabled:opacity-50 text-white font-bold text-[14px] flex items-center gap-1.5 transition-all cursor-pointer disabled:cursor-not-allowed">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </form>
      </section>

      {/* 5. Promotional Offers */}
      <section className="space-y-3">
        <h2 className="text-lg font-extrabold text-[#141416]">Promotional Website Offers</h2>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {offers.map((off, idx) => (
            <div key={off.name} className="p-3.5 sm:p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[15px] text-[#141416]">{off.name}</p>
                <p className="text-[12.5px] text-[#75726d]">
                  {off.on ? 'Showing on website' : 'Hidden from website'}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={off.on}
                  onChange={(e) => toggleOffer(idx, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#ebe8e3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#127a4a]" />
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Publish Changes Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={publishRates}
          className="w-full py-3.5 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 text-white font-bold text-[15px] shadow-lg shadow-[#d32d1f]/25 transition-all cursor-pointer">
          Publish changes
        </button>
      </div>
    </div>
  );
}
