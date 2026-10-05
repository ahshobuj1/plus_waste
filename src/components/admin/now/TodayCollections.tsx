'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function TodayCollections() {
  const { jobs, loads, setSelectedJobRef } = useAdmin();

  const getLoad = (id: string) => loads.find((l) => l.id === id) || { name: '?', cuyd: 0 };

  const todayJobs = jobs
    .filter((j) => j.day === 'Today')
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-lg font-extrabold text-[#141416]">Today&apos;s collections</h2>
        <span className="text-[13px] font-semibold text-[#75726d]">{todayJobs.length} booked</span>
      </div>

      <div className="divide-y divide-[#e7e3dd] border-t border-b border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
        {todayJobs.length === 0 ? (
          <p className="p-6 text-center text-[#75726d] text-[14.5px]">No collections scheduled for today.</p>
        ) : (
          todayJobs.map((job) => {
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
    </section>
  );
}
