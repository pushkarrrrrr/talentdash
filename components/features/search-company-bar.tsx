'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SearchCompanyBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  if (initialQuery !== prevInitialQuery) {
    setQuery(initialQuery);
    setPrevInitialQuery(initialQuery);
  }

  const updateURL = useCallback((val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // Reset pagination on search
    if (val.trim()) {
      params.set('q', val.trim());
    } else {
      params.delete('q');
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQueryInUrl = searchParams.get('q') || '';
      if (query !== currentQueryInUrl) {
        updateURL(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchParams, updateURL]);

  return (
    <div className="relative w-full">
      <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm transition-all duration-300 ${isPending ? 'opacity-40 scale-90 animate-pulse' : 'opacity-100'}`} aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search designation, company name, industry..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search designation, company name, or industry"
        className="w-full bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-900/80 border border-slate-800/80 focus:border-sky-500/60 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
