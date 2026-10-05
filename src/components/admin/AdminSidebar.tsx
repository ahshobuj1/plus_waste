'use client';

import React from 'react';
import { Zap, Calendar, PoundSterling, ShoppingBag, Settings2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminTabType } from '@/types';

interface NavItem {
  key: AdminTabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
}

export default function AdminSidebar() {
  const { currentTab, setCurrentTab, urgentNowCount, urgentShopCount } = useAdmin();

  const navItems: NavItem[] = [
    {
      key: 'now',
      label: 'Now',
      icon: Zap,
      badgeCount: urgentNowCount,
    },
    {
      key: 'jobs',
      label: 'Jobs',
      icon: Calendar,
    },
    {
      key: 'money',
      label: 'Money',
      icon: PoundSterling,
    },
    {
      key: 'shop',
      label: 'Shop',
      icon: ShoppingBag,
      badgeCount: urgentShopCount,
    },
    {
      key: 'setup',
      label: 'Setup',
      icon: Settings2,
    },
  ];

  return (
    <>
      {/* Desktop / Tablet Left Rail */}
      <aside className="hidden md:flex flex-col items-center w-24 shrink-0 border-r border-[#e7e3dd] bg-white py-6 gap-2 min-h-[calc(100vh-53px)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setCurrentTab(item.key)}
              className={`relative flex flex-col items-center justify-center w-18 h-18 rounded-2xl transition-all ${
                isActive
                  ? 'bg-[#fdf1ef] text-[#d32d1f] font-bold shadow-sm'
                  : 'text-[#75726d] hover:bg-[#f5f3f0] hover:text-[#141416] font-medium'
              }`}>
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[12px]">{item.label}</span>

              {Boolean(item.badgeCount && item.badgeCount > 0) && (
                <span className="absolute top-2 right-2 min-w-5 h-5 px-1 rounded-full bg-[#d32d1f] text-white text-[11px] font-extrabold flex items-center justify-center border-2 border-white">
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </aside>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        aria-label="Mobile operations tabs"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#e7e3dd] grid grid-cols-5 px-2 py-1.5 pb-[calc(6px+env(safe-area-inset-bottom,0px))]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setCurrentTab(item.key)}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-[#d32d1f] font-bold' : 'text-[#75726d] font-medium'
              }`}>
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] tracking-tight">{item.label}</span>

              {Boolean(item.badgeCount && item.badgeCount > 0) && (
                <span className="absolute top-1 right-[calc(50%-18px)] min-w-4 h-4 px-1 rounded-full bg-[#d32d1f] text-white text-[10px] font-extrabold flex items-center justify-center border border-white">
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
