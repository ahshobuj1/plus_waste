'use client';

import React from 'react';
import { X, CheckCircle, Truck, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { formatGbp } from '@/utils/adminData';

export default function JobDetailsSheet() {
  const {
    jobs,
    loads,
    drivers,
    selectedJobRef,
    setSelectedJobRef,
    assignDriver,
    markJobCollected,
  } = useAdmin();

  const job = jobs.find((j) => j.ref === selectedJobRef);

  if (!job) return null;

  const loadInfo = loads.find((l) => l.id === job.load) || { name: '?', cuyd: 0 };
  const aiLoadInfo = job.flag ? loads.find((l) => l.id === job.flag?.ai) : null;

  const activeDrivers = drivers.filter((d) => d.on || d.name === job.driver);

  const handleDriverChange = (driverName: string) => {
    assignDriver(job.ref, driverName);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#141416]/50 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedJobRef(null)}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e7e3dd]">
          <div>
            <span className="text-[12px] font-bold text-[#75726d] uppercase tracking-wider">
              Job Reference #{job.ref}
            </span>
            <h2 className="text-xl font-extrabold text-[#141416]">{job.cust}</h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedJobRef(null)}
            className="p-2 rounded-xl text-[#75726d] hover:bg-[#f5f3f0] hover:text-[#141416] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Summary Facts */}
          <div className="rounded-2xl border border-[#e7e3dd] bg-[#f5f3f0]/50 p-4 space-y-3 text-[14px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#75726d]">
                <Calendar className="w-4 h-4" /> Day & Time
              </span>
              <span className="font-bold text-[#141416]">
                {job.day} at {job.time}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#75726d]">
                <MapPin className="w-4 h-4" /> Area
              </span>
              <span className="font-bold text-[#141416]">{job.area}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#75726d]">
                <Truck className="w-4 h-4" /> Van Load
              </span>
              <span className="font-bold text-[#141416]">
                {loadInfo.name} ({loadInfo.cuyd} cu yd)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#75726d]">
                <Clock className="w-4 h-4" /> Total Price
              </span>
              <span className="font-extrabold text-[16px] text-[#141416]">
                {formatGbp(job.total)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#75726d]">Payment Status</span>
              {job.paid ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#eaf6ef] text-[#127a4a] text-[12px] font-bold">
                  Paid
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#fdf4e4] text-[#a86200] text-[12px] font-bold">
                  Not paid yet
                </span>
              )}
            </div>

            {aiLoadInfo && (
              <div className="pt-2 border-t border-[#e7e3dd] flex items-start gap-2 text-[#a86200]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[13px] leading-snug">
                  AI Photo Check: Photos suggest <b>{aiLoadInfo.name} load</b>
                </span>
              </div>
            )}
          </div>

          {/* Driver Assignment */}
          <div>
            <label className="block text-[13.5px] font-bold text-[#141416] mb-1.5">
              Assigned Driver
            </label>
            <select
              value={job.driver || ''}
              onChange={(e) => handleDriverChange(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-[#141416] bg-white text-[14.5px] font-semibold text-[#141416] focus:outline-none focus:ring-2 focus:ring-[#d32d1f]">
              <option value="">No driver assigned</option>
              {activeDrivers.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#e7e3dd] flex items-center gap-3 bg-white">
          <button
            type="button"
            disabled={job.done}
            onClick={() => {
              markJobCollected(job.ref);
              setSelectedJobRef(null);
            }}
            className="flex-1 h-12 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 disabled:opacity-50 text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed">
            <CheckCircle className="w-4 h-4" />
            {job.done ? 'Collected' : 'Mark as collected'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedJobRef(null)}
            className="px-5 h-12 rounded-xl border border-[#e7e3dd] hover:border-[#141416] text-[#141416] font-semibold text-[14.5px] transition-colors cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
