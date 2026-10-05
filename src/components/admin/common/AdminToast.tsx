'use client';

import React, { useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';

export default function AdminToast() {
  const { toast, clearToast } = useAdmin();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 5200);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-50 left-1/2 -translate-x-1/2 bottom-[calc(76px+env(safe-area-inset-bottom,0px))] md:bottom-8 bg-[#141416] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-4 text-[14px] font-medium max-w-[calc(100vw-32px)] border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <span>{toast.message}</span>
      {toast.undoFn && (
        <button
          type="button"
          onClick={() => {
            if (toast.undoFn) toast.undoFn();
            clearToast();
          }}
          className="rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 px-3 py-1 text-[13px] font-bold text-white transition-all cursor-pointer">
          Undo
        </button>
      )}
    </div>
  );
}
