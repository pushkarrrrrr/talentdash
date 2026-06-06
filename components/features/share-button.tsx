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
          ? 'text-success border-success/30 bg-success/5 shadow-xs'
          : 'text-muted-text hover:text-deep-text border-border-custom bg-surface hover:bg-hover-surface/50'
      }`}
    >
      <span aria-hidden="true">{copied ? '✅' : '🔗'}</span>
      <span>{copied ? 'Copied!' : 'Share Page'}</span>
    </button>
  );
}
