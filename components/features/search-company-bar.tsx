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
      <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-text text-sm transition-all duration-300 ${isPending ? 'opacity-40 scale-90 animate-pulse' : 'opacity-100'}`} aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search designation, company name, industry..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search designation, company name, or industry"
        className="w-full bg-surface hover:bg-hover-surface/50 focus:bg-surface border border-border-custom focus:border-primary-accent/60 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none transition-all placeholder:text-muted-text text-deep-text shadow-xs"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-text hover:text-deep-text text-xs font-bold transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
