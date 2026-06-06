'use client';

import { useState } from 'react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-1.5 text-xs font-semibold border rounded-lg transition-all duration-300 cursor-pointer px-3 py-1.5 ${
        copied
          ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5 shadow-sm shadow-emerald-500/5'
          : 'text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700 bg-slate-900/30'
      }`}
    >
      <span aria-hidden="true">{copied ? '✅' : '🔗'}</span>
      <span>{copied ? 'Copied!' : 'Share Page'}</span>
    </button>
  );
}
