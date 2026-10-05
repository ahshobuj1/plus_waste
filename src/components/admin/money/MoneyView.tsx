'use client';

import React from 'react';
import { Download, Check, Clock } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { formatGbp, exportJobsCsv } from '@/utils/adminData';

export default function MoneyView() {
  const { jobs, loads, markJobPaid, showToast } = useAdmin();

  const unpaidJobs = jobs.filter((j) => !j.paid);
  const paidJobs = jobs.filter((j) => j.paid);

  const totalOwed = unpaidJobs.reduce((sum, j) => sum + j.total, 0);
  const totalPaid = paidJobs.reduce((sum, j) => sum + j.total, 0);

  const handleDownloadCsv = () => {
    exportJobsCsv(jobs, loads);
    showToast('Jobs downloaded as CSV');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141416] tracking-tight">
          Money & Receivables
        </h1>
        <p className="text-[#46464c] text-[15px] mt-1">
          Unpaid jobs get up to four reminders over 14 days, and stop when paid.
        </p>
      </div>

      {/* Revenue Split Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#f0dcb8] bg-[#fdf4e4] p-5 shadow-sm">
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#a86200] uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" /> Waiting to be paid
          </span>
          <b className="block text-3xl sm:text-4xl font-extrabold font-mono text-[#a86200]">
            {formatGbp(totalOwed)}
          </b>
          <span className="text-[12.5px] text-[#a86200]/80 mt-1 block">
            Across {unpaidJobs.length} booking{unpaidJobs.length === 1 ? '' : 's'}
          </span>
        </div>

        <div className="rounded-2xl border border-[#eaf6ef] bg-[#eaf6ef]/80 p-5 shadow-sm">
          <span className="flex items-center gap-1.5 text-[13px] font-bold text-[#127a4a] uppercase tracking-wider mb-1">
            <Check className="w-4 h-4" /> Cleared & Paid
          </span>
          <b className="block text-3xl sm:text-4xl font-extrabold font-mono text-[#127a4a]">
            {formatGbp(totalPaid)}
          </b>
          <span className="text-[12.5px] text-[#127a4a]/80 mt-1 block">
            Across {paidJobs.length} booking{paidJobs.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Unpaid Section */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg font-extrabold text-[#141416]">Waiting to be paid</h2>
        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {unpaidJobs.length === 0 ? (
            <p className="p-6 text-center text-[#75726d] text-[14.5px]">
              Everyone has paid up! No pending receivables.
            </p>
          ) : (
            unpaidJobs.map((j) => (
              <div
                key={j.ref}
                className="flex items-center justify-between p-4 gap-3 flex-wrap sm:flex-nowrap">
                <div className="min-w-0">
                  <p className="font-bold text-[15px] text-[#141416]">{j.cust}</p>
                  <p className="text-[13px] text-[#75726d]">
                    #{j.ref} · {j.day} at {j.time} · {j.area}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-auto">
                  <span className="text-lg font-extrabold font-mono text-[#141416]">
                    {formatGbp(j.total)}
                  </span>
                  <button
                    type="button"
                    onClick={() => markJobPaid(j.ref)}
                    className="px-3.5 py-1.5 rounded-xl border border-[#e7e3dd] hover:border-[#141416] bg-white hover:bg-[#f5f3f0] active:scale-95 text-[13px] font-bold text-[#141416] transition-all cursor-pointer">
                    Mark paid
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Paid Section with Download CSV */}
      <section className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#141416]">Paid collections</h2>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#e7e3dd] hover:border-[#141416] bg-white hover:bg-[#f5f3f0] text-[13px] font-bold text-[#141416] transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            Download CSV
          </button>
        </div>

        <div className="divide-y divide-[#e7e3dd] border border-[#e7e3dd] bg-white rounded-2xl overflow-hidden shadow-sm">
          {paidJobs.length === 0 ? (
            <p className="p-6 text-center text-[#75726d] text-[14.5px]">No payments recorded yet.</p>
          ) : (
            paidJobs.map((j) => (
              <div key={j.ref} className="flex items-center justify-between p-4">
                <div className="min-w-0">
                  <p className="font-bold text-[15px] text-[#141416]">{j.cust}</p>
                  <p className="text-[13px] text-[#75726d]">
                    #{j.ref} · {j.area}
                  </p>
                </div>
                <span className="text-lg font-extrabold font-mono text-[#127a4a]">
                  {formatGbp(j.total)}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
