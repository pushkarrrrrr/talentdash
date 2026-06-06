'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingCompareHelper() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show helper after 2 seconds for pleasant entrance effect
    const timer = setTimeout(() => {
      // Only show if user hasn't explicitly dismissed it in this session
      const dismissed = sessionStorage.getItem('dismiss_compare_helper') === 'true';
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('dismiss_compare_helper', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-[340px] glass-panel border border-amber-500/20 rounded-2xl p-4 shadow-2xl shadow-amber-500/5 animate-in slide-in-from-bottom-8 duration-300">
      <div className="relative flex items-start gap-3.5 pr-6">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-0 right-0 p-0.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-900/60 transition-colors cursor-pointer"
          aria-label="Dismiss notice"
          title="Dismiss notice"
        >
          <span className="text-sm font-bold" aria-hidden="true">✕</span>
        </button>

        {/* Emoji illustration */}
        <div className="h-11 w-11 flex-shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl border border-amber-500/20 select-none animate-bounce" aria-hidden="true">
          🤔
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider">
            Compare Companies
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Confused about which company pays better or has a better culture?
          </p>
          <div className="pt-1">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center text-[10px] font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-3.5 py-2 rounded-lg transition-colors shadow-md shadow-amber-500/10"
            >
              Compare Offer Comp Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
