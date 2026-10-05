'use client';

import React from 'react';
import Link from 'next/link';
import {LogOut, Radio} from 'lucide-react';
import {useAdmin} from '@/context/AdminContext';
import Logo from '@/components/common/Logo';

export default function AdminHeader() {
  const {isPreviewMode, logout} = useAdmin();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#e7e3dd] bg-white/90 backdrop-blur-md">
      {isPreviewMode && (
        <div className="bg-[#fdf4e4] border-b border-[#f0dcb8] px-4 py-1.5 text-center text-[12.5px] text-[#6b4100] font-medium">
          Preview mode — sample operations data. Connect backend API for live
          booking feed.
        </div>
      )}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            title="Return to public site">
            <Logo isDraw className="w-7 h-7 text-[#d32d1f]" />
            <span className="font-extrabold text-[17px] tracking-tight text-[#141416]">
              <span className="text-[#d32d1f]">PLUS</span>WASTE
              <span className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f5f3f0] text-[#75726d] uppercase tracking-wider">
                Ops
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#f0dcb8] bg-[#fdf4e4] px-3 py-1 text-[12.5px] font-semibold text-[#a86200]">
            <Radio className="w-3 h-3 text-[#a86200] animate-pulse" />
            <span className="hidden sm:inline">Booking feed</span>
            <span>{isPreviewMode ? 'Demo' : 'Active'}</span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-[#e7e3dd] px-2.5 py-1 text-[13px] font-semibold text-[#75726d] hover:text-[#d32d1f] hover:border-[#d32d1f]/40 hover:bg-[#fdf1ef] transition-colors"
            title="Sign out of operations console">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
