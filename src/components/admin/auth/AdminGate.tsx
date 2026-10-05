'use client';

import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import Logo from '@/components/common/Logo';

export default function AdminGate() {
  const { login, enterPreview } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }

    setLoading(true);
    setError(null);

    const result = await login(username, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/95 backdrop-blur-md">
      <div className="w-full max-w-sm rounded-3xl border border-[#e7e3dd] bg-white p-7 sm:p-8 shadow-2xl shadow-[#141416]/10">
        <div className="flex items-center gap-3 mb-5">
          <Logo isDraw className="w-9 h-9 text-[#d32d1f]" />
          <div>
            <h1 className="text-xl font-extrabold text-[#141416] tracking-tight">Staff Sign In</h1>
            <p className="text-[12.5px] text-[#75726d]">Plus Waste operations console</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-[13px] font-bold text-[#141416] mb-1.5" htmlFor="adminUser">
              Username
            </label>
            <input
              id="adminUser"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              required
              className="w-full h-11 px-3.5 rounded-xl border border-[#e7e3dd] bg-[#f5f3f0]/50 text-[#141416] text-[14.5px] focus:bg-white focus:outline-none focus:border-[#141416] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-[#141416] mb-1.5" htmlFor="adminPass">
              Password
            </label>
            <input
              id="adminPass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-11 px-3.5 rounded-xl border border-[#e7e3dd] bg-[#f5f3f0]/50 text-[#141416] text-[14.5px] focus:bg-white focus:outline-none focus:border-[#141416] transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#fdf1ef] border border-[#d32d1f]/30 text-[#d32d1f] text-[13px] font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#d32d1f] hover:bg-[#e8402f] active:scale-98 disabled:opacity-60 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#d32d1f]/25 transition-all cursor-pointer">
            <Lock className="w-4 h-4" />
            {loading ? 'Verifying…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#e7e3dd] text-center space-y-3">
          <p className="text-[12px] text-[#75726d] leading-relaxed">
            Staff only. User accounts are not used on this platform.
          </p>

          <button
            type="button"
            onClick={enterPreview}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#a86200] hover:text-[#d32d1f] transition-colors cursor-pointer">
            <span>Explore demo preview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
