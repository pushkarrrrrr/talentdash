'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Currency, Level } from '@/types';

interface FilterBarProps {
  roles: string[];
  locations: string[];
}

export default function FilterBar({ roles, locations }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial values from URL
  const initialCompany = searchParams.get('company') || '';
  const initialRole = searchParams.get('role') || '';
  const initialLocation = searchParams.get('location') || '';
  const initialCurrency = (searchParams.get('currency') as Currency) || Currency.INR;
  
  // Handle level arrays from URL
  // Can be ?level=L4&level=L5 or ?level=L4,L5
  const getInitialLevels = useCallback((): string[] => {
    const fromParams = searchParams.getAll('level');
    if (fromParams.length > 0) return fromParams;
    
    // Check if it's comma separated
    const singleParam = searchParams.get('level');
    if (singleParam) return singleParam.split(',');
    
    return [];
  }, [searchParams]);

  const [selectedLevels, setSelectedLevels] = useState<string[]>(getInitialLevels());

  // Input states
  const [companyInput, setCompanyInput] = useState(initialCompany);

  // Sync state when URL params change during render (avoids useEffect setState rule)
  const [prevCompanyInUrl, setPrevCompanyInUrl] = useState(initialCompany);
  if (initialCompany !== prevCompanyInUrl) {
    setCompanyInput(initialCompany);
    setPrevCompanyInUrl(initialCompany);
  }

  const currentLevelsInUrl = getInitialLevels();
  const [prevLevelsInUrl, setPrevLevelsInUrl] = useState(currentLevelsInUrl);
  const levelsMatch = currentLevelsInUrl.length === prevLevelsInUrl.length &&
                      currentLevelsInUrl.every((lvl, idx) => lvl === prevLevelsInUrl[idx]);
  if (!levelsMatch) {
    setSelectedLevels(currentLevelsInUrl);
    setPrevLevelsInUrl(currentLevelsInUrl);
  }

  // Helper to construct and push new query parameters
  const updateURL = useCallback((updates: Record<string, string | string[] | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset pagination to page 1 on filter changes
    params.set('page', '1');

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key); // clear old
        if (value.length > 0) {
          // Join by comma to keep URL cleaner, but handle both
          params.set(key, value.join(','));
        }
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  // Debounced update for company name
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentCompanyInUrl = searchParams.get('company') || '';
      if (companyInput !== currentCompanyInUrl) {
        updateURL({ company: companyInput });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [companyInput, searchParams, updateURL]);

  // Handle Level Multi-select Toggles
  function toggleLevel(level: string) {
    let nextLevels: string[];
    if (selectedLevels.includes(level)) {
      nextLevels = selectedLevels.filter(l => l !== level);
    } else {
      nextLevels = [...selectedLevels, level];
    }
    setSelectedLevels(nextLevels);
    updateURL({ level: nextLevels });
  }

  // Clear all filters
  function handleClearFilters() {
    setCompanyInput('');
    setSelectedLevels([]);
    router.push(pathname); // resets all query params
  }

  const levelsOption = [Level.L3, Level.L4, Level.L5, Level.L6, Level.Principal];

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl w-full border border-slate-900 flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        {/* Company Search */}
        <div className="flex flex-col gap-2 md:col-span-4">
          <label htmlFor="company-search" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Company Name
          </label>
          <div className="relative">
            <input
              id="company-search"
              type="text"
              placeholder="e.g. Google India, Amazon..."
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-600"
            />
            {companyInput && (
              <button
                onClick={() => setCompanyInput('')}
                aria-label="Clear company search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Role Select */}
        <div className="flex flex-col gap-2 md:col-span-3">
          <label htmlFor="role-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Role / Discipline
          </label>
          <select
            id="role-select"
            value={initialRole}
            onChange={(e) => updateURL({ role: e.target.value })}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-slate-200 capitalize"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role} className="capitalize">
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Location Select */}
        <div className="flex flex-col gap-2 md:col-span-3">
          <label htmlFor="location-select" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Location
          </label>
          <select
            id="location-select"
            value={initialLocation}
            onChange={(e) => updateURL({ location: e.target.value })}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-slate-200 capitalize"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc} className="capitalize">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Toggle */}
        <div className="flex flex-col gap-2 md:col-span-2" role="group" aria-labelledby="currency-toggle-label">
          <span id="currency-toggle-label" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Currency
          </span>
          <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 w-full">
            <button
              onClick={() => updateURL({ currency: 'INR' })}
              aria-pressed={initialCurrency === 'INR'}
              className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                initialCurrency === 'INR'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => updateURL({ currency: 'USD' })}
              aria-pressed={initialCurrency === 'USD'}
              className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                initialCurrency === 'USD'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {/* Level Selection checklist as premium chips */}
      <div className="flex flex-col gap-3" role="group" aria-labelledby="level-filter-label">
        <span id="level-filter-label" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Filter by Level
        </span>
        <div className="flex flex-wrap gap-2.5">
          {levelsOption.map((lvl) => {
            const isSelected = selectedLevels.includes(lvl);
            return (
              <button
                key={lvl}
                onClick={() => toggleLevel(lvl)}
                aria-pressed={isSelected}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/10 text-sky-400 border-sky-500/40 shadow-sm shadow-sky-500/5'
                    : 'bg-slate-950/40 text-slate-400 border-slate-800/80 hover:text-slate-300 hover:border-slate-700'
                }`}
              >
                {lvl === 'Principal' ? 'Principal' : `${lvl} / SDE`}
              </button>
            );
          })}

          {/* Clear Filters helper button */}
          {(companyInput || initialRole || initialLocation || selectedLevels.length > 0) && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              Clear all filters ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
