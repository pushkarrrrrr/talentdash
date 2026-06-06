'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LocationItem {
  name: string;
  flag: string;
  country: string;
  code: string;
}

interface Region {
  name: string;
  items: LocationItem[];
}

const REGIONS: Region[] = [
  {
    name: 'Asia',
    items: [
      { name: 'Bengaluru', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Mumbai', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Hyderabad', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Pune', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Noida', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Gurugram', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Chennai', flag: '🇮🇳', country: 'India', code: 'IN' },
      { name: 'Singapore', flag: '🇸🇬', country: 'Singapore', code: 'SG' },
      { name: 'Hong Kong', flag: '🇭🇰', country: 'Hong Kong', code: 'HK' },
      { name: 'Taipei', flag: '🇹🇼', country: 'Taiwan', code: 'TW' },
      { name: 'Tel Aviv', flag: '🇮🇱', country: 'Israel', code: 'IL' },
      { name: 'Haifa', flag: '🇮🇱', country: 'Israel', code: 'IL' },
      { name: 'Kuala Lumpur', flag: '🇲🇾', country: 'Malaysia', code: 'MY' },
      { name: 'Ho Chi Minh City', flag: '🇻🇳', country: 'Vietnam', code: 'VN' },
      { name: 'Bangkok', flag: '🇹🇭', country: 'Thailand', code: 'TH' },
      { name: 'Jakarta', flag: '🇮🇩', country: 'Indonesia', code: 'ID' },
      { name: 'Beijing', flag: '🇨🇳', country: 'China', code: 'CN' },
    ],
  },
  {
    name: 'Europe',
    items: [
      { name: 'London', flag: '🇬🇧', country: 'United Kingdom', code: 'GB' },
      { name: 'Dublin', flag: '🇮🇪', country: 'Ireland', code: 'IE' },
      { name: 'Amsterdam', flag: '🇳🇱', country: 'Netherlands', code: 'NL' },
      { name: 'Berlin', flag: '🇩🇪', country: 'Germany', code: 'DE' },
      { name: 'Munich', flag: '🇩🇪', country: 'Germany', code: 'DE' },
      { name: 'Zurich', flag: '🇨🇭', country: 'Switzerland', code: 'CH' },
      { name: 'Paris', flag: '🇫🇷', country: 'France', code: 'FR' },
      { name: 'Barcelona', flag: '🇪🇸', country: 'Spain', code: 'ES' },
      { name: 'Madrid', flag: '🇪🇸', country: 'Spain', code: 'ES' },
      { name: 'Stockholm', flag: '🇸🇪', country: 'Sweden', code: 'SE' },
      { name: 'Cambridge', flag: '🇬🇧', country: 'United Kingdom', code: 'GB' },
      { name: 'Stuttgart', flag: '🇩🇪', country: 'Germany', code: 'DE' },
    ],
  },
  {
    name: 'North America',
    items: [
      { name: 'San Francisco', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'Seattle', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'New York', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'Austin', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'Boston', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'Los Angeles', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'Chicago', flag: '🇺🇸', country: 'United States', code: 'US' },
      { name: 'Toronto', flag: '🇨🇦', country: 'Canada', code: 'CA' },
      { name: 'Vancouver', flag: '🇨🇦', country: 'Canada', code: 'CA' },
      { name: 'Montreal', flag: '🇨🇦', country: 'Canada', code: 'CA' },
    ],
  },
];

export default function LocationDirectory() {
  const [search, setSearch] = useState('');
  const [jobFamily, setJobFamily] = useState('Software Engineer');

  // Filter regions and items based on search query
  const filteredRegions = REGIONS.map((region) => {
    const matchedItems = region.items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.country.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase())
    );
    return { ...region, items: matchedItems };
  }).filter((region) => region.items.length > 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span aria-hidden="true">← </span>Back to Explorer
        </Link>
      </div>

      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          Location Directory
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-xl">
          Popular tech hubs are listed below. Use the search bar to locate specific hubs across regions and metros.
        </p>
      </div>

      {/* Control Bar (Search + Dropdown) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 items-center">
        {/* Search Input Box */}
        <div className="relative md:col-span-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" aria-hidden="true">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search over 1,000 locations across metros, countries, and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search locations"
            className="w-full bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-900/80 border border-slate-800/80 focus:border-sky-500/60 rounded-xl pl-11 pr-10 py-3 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Job Family Selector */}
        <div className="relative">
          <label htmlFor="job-family-select" className="sr-only">
            Select Job Family
          </label>
          <select
            id="job-family-select"
            value={jobFamily}
            onChange={(e) => setJobFamily(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-sky-500/60 appearance-none cursor-pointer"
          >
            <option value="Software Engineer" className="bg-slate-950 text-slate-200">Software Engineer</option>
            <option value="Product Manager" className="bg-slate-950 text-slate-200">Product Manager</option>
            <option value="Data Scientist" className="bg-slate-950 text-slate-200">Data Scientist</option>
            <option value="Product Designer" className="bg-slate-950 text-slate-200">Product Designer</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="space-y-12">
        {filteredRegions.length === 0 ? (
          /* Empty Search State */
          <div className="glass-panel rounded-2xl p-16 text-center border border-slate-900 flex flex-col items-center justify-center gap-4">
            <span className="text-4xl select-none" aria-hidden="true">🗺️</span>
            <h3 className="text-base font-bold text-slate-200">No matching locations found</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              We couldn&apos;t find any tech hubs matching &quot;{search}&quot;. Please adjust your spelling or try another search term.
            </p>
          </div>
        ) : (
          filteredRegions.map((region) => (
            <div key={region.name} className="space-y-4">
              <h2 className="text-lg font-extrabold text-slate-200 uppercase tracking-wider border-b border-slate-900 pb-2">
                {region.name}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {region.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/salaries?location=${encodeURIComponent(item.name)}&role=${encodeURIComponent(jobFamily)}`}
                      className="glass-panel hover:bg-slate-900/40 border border-slate-900/60 rounded-xl p-4 flex items-center gap-3 hover:border-sky-500/20 hover:shadow-md hover:shadow-sky-500/2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                    >
                      <span className="text-xl select-none shrink-0" role="img" aria-label={`${item.country} flag`}>{item.flag}</span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-200 text-sm group-hover:text-sky-400 transition-colors leading-snug truncate">
                          {item.name}, {item.code}
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">
                          {item.country}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
