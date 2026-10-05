'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { INITIAL_DAYS } from '@/utils/adminData';

export default function JobsView() {
  const { jobs, loads, setSelectedJobRef } = useAdmin();
  const [selectedDay, setSelectedDay] = useState<string>('Today');

  const getLoad = (id: string) => loads.find((l) => l.id === id) || { name: '?', cuyd: 0 };

  const dayJobs = jobs
    .filter((j) => j.day === selectedDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141416] tracking-tight">
          Job Schedule
        </h1>
        <p className="text-[#46464c] text-[15px] mt-1">
          Tap a day, then a job to assign a driver or mark it done.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {INITIAL_DAYS.map((d) => {
          const count = jobs.filter((j) => j.day === d).length;
          const isSelected = selectedDay === d;
          return (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDay(d)}
              className={`shrink-0 min-w-16 px-4 py-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#141416] bg-[#141416] text-white shadow-md'
                  : 'border-[#e7e3dd] bg-white text-[#141416] hover:border-[#141416]/50'
              }`}>
              <span className={`block text-[11.5px] font-medium ${isSelected ? 'text-white/70' : 'text-[#75726d]'}`}>
                {d === 'Tomorrow' ? 'Tmrw' : d}
              </span>
              <b className="block text-[18px] font-extrabold mt-0.5">{count}</b>
              {count > 0 && (
                <span
                  className={`block w-1.5 h-1.5 rounded-full mx-auto mt-1 ${
                    isSelected ? 'bg-white' : 'bg-[#d32d1f]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Jobs for Selected Day */}
      <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
        {dayJobs.length === 0 ? (
          <p className="p-8 text-center text-[#75726d] text-[14.5px]">
            Nothing booked for {selectedDay.toLowerCase()}.
          </p>
        ) : (
          dayJobs.map((job) => {
            const l = getLoad(job.load);
            return (
              <button
                key={job.ref}
                type="button"
                onClick={() => setSelectedJobRef(job.ref)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f5f3f0]/70 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-13 shrink-0 font-extrabold text-[15px] font-mono text-[#141416]">
                    {job.time}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-[15px] text-[#141416] truncate">{job.cust}</p>
                    <p className="text-[13px] text-[#75726d] truncate">
                      {l.name} load, {job.area}
                      {job.driver ? `, driver: ${job.driver}` : ', no driver'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-3">
                  {job.done ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#ebe8e3] text-[#75726d] text-[12px] font-bold">
                      Done
                    </span>
                  ) : job.paid ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#eaf6ef] text-[#127a4a] text-[12px] font-bold">
                      Paid
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#fdf4e4] text-[#a86200] text-[12px] font-bold">
                      Unpaid
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-[#75726d] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
