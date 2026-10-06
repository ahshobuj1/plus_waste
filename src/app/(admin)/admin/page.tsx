'use client';

import React from 'react';
import {AdminProvider, useAdmin} from '@/context/AdminContext';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGate from '@/components/admin/auth/AdminGate';
import ActionCards from '@/components/admin/now/ActionCards';
import TodayCollections from '@/components/admin/now/TodayCollections';
import JobsView from '@/components/admin/jobs/JobsView';
import JobDetailsSheet from '@/components/admin/jobs/JobDetailsSheet';
import MoneyView from '@/components/admin/money/MoneyView';
import ShopView from '@/components/admin/shop/ShopView';
import SetupView from '@/components/admin/setup/SetupView';
import AdminToast from '@/components/admin/common/AdminToast';

function AdminDashboardContent() {
  const {isAuthenticated, currentTab} = useAdmin();

  if (!isAuthenticated) {
    return <AdminGate />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f8] pb-24 md:pb-12 text-[#141416]">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8">
          {currentTab === 'now' && (
            <div>
              <ActionCards />
              <TodayCollections />
            </div>
          )}
          {currentTab === 'jobs' && <JobsView />}
          {currentTab === 'money' && <MoneyView />}
          {currentTab === 'shop' && <ShopView />}
          {currentTab === 'setup' && <SetupView />}
        </main>
      </div>

      <JobDetailsSheet />
      <AdminToast />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminProvider>
      <AdminDashboardContent />
    </AdminProvider>
  );
}
