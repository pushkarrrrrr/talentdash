'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TitleGroup {
  category: string;
  items: string[];
}

const TITLE_GROUPS: TitleGroup[] = [
  {
    category: 'Distributed Systems',
    items: ['Distributed Systems Engineer', 'Cloud Architect', 'Systems Engineer'],
  },
  {
    category: 'Machine Learning',
    items: ['Machine Learning Engineer', 'AI Researcher', 'AI Engineer', 'NLP Specialist'],
  },
  {
    category: 'Security',
    items: ['Security Software Engineer', 'Application Security Engineer', 'Cloud Security Engineer', 'Penetration Tester'],
  },
  {
    category: 'DevOps',
    items: ['DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer', 'MLOps Engineer'],
  },
  {
    category: 'Applications',
    items: ['Backend Software Engineer', 'Frontend Software Engineer', 'Full-Stack Software Engineer', 'Applications Engineer'],
  },
  {
    category: 'Web Development',
    items: ['Web Developer', 'UI Engineer', 'UX Engineer'],
  },
  {
    category: 'Mobile Development',
    items: ['iOS Engineer', 'Android Engineer', 'Mobile Software Engineer'],
  },
  {
    category: 'Data',
    items: ['Data Engineer', 'Analytics Engineer', 'Database Administrator', 'BI Developer', 'Quantitative Developer'],
  },
];

export default function TitleDirectory() {
  const [search, setSearch] = useState('');

  // Filter title groups based on search input
  const filteredGroups = TITLE_GROUPS.map((group) => {
    const matchedItems = group.items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    return { ...group, items: matchedItems };
  }).filter((group) => group.items.length > 0 || group.category.toLowerCase().includes(search.toLowerCase()));

  // Map to the actual roles seeded in mock-data.ts for proper query matching
  const mapSearchQueryRole = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('frontend')) return 'Frontend Engineer';
    if (roleLower.includes('backend')) return 'Backend Engineer';
    if (roleLower.includes('principal')) return 'Principal Engineer';
    if (roleLower.includes('staff')) return 'Staff Engineer';
    return 'Software Engineer'; // Fallback to main Software Engineer role in mock data
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span aria-hidden="true">← </span>Back to Explorer
        </Link>
      </div>

      {/* Two Column Layout (Header / Main + Sidebar Promo) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Title Directory
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Click on a title to explore salaries. Use the filter field below to query specific tracks.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Title or focus (e.g. Distributed, ML, Frontend...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search titles and categories"
              className="w-full bg-slate-900/40 hover:bg-slate-900/60 focus:bg-slate-900/80 border border-slate-800/80 focus:border-sky-500/60 rounded-xl px-4 py-3.5 text-sm outline-none transition-all placeholder:text-slate-600 text-slate-200"
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

          {/* Tech Domains Grid */}
          <div className="space-y-8">
            <div className="border-b border-slate-900 pb-3 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">💻</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Technology
              </h2>
            </div>

            {/* Software Engineer Special Hero Box */}
            {(!search || 'software engineer'.includes(search.toLowerCase())) && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 hover:border-sky-500/30 transition-all shadow-sm">
                <Link
                  href="/salaries?role=Software+Engineer"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl select-none" aria-hidden="true">💼</span>
                    <div>
                      <h3 className="font-extrabold text-slate-100 group-hover:text-sky-400 transition-colors text-base">
                        Software Engineer
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        Primary technology engineering track containing full records.
                      </p>
                    </div>
                  </div>
                  <span className="text-slate-500 group-hover:text-sky-400 transition-colors text-sm font-bold">
                    Explore Salaries <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </div>
            )}

            {filteredGroups.length === 0 ? (
              /* Empty Search State */
              <div className="glass-panel rounded-2xl p-16 text-center border border-slate-900 flex flex-col items-center justify-center gap-4">
                <span className="text-4xl select-none" aria-hidden="true">🛠️</span>
                <h3 className="text-base font-bold text-slate-200">No matching titles found</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  We couldn&apos;t find any roles matching &quot;{search}&quot;. Try generic searches like DevOps, ML, or Systems.
                </p>
              </div>
            ) : (
              /* Group columns */
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {filteredGroups.map((group) => (
                  <li key={group.category} className="space-y-2.5">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {group.category}
                    </h3>
                    <ul className="space-y-1.5 pl-1.5 border-l border-slate-900">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/salaries?role=${encodeURIComponent(mapSearchQueryRole(item))}`}
                            className="text-xs font-semibold text-slate-300 hover:text-sky-400 hover:translate-x-1 block transition-all"
                          >
                            <span aria-hidden="true">📝 </span>{item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar Promo Column */}
        <aside aria-label="Job Openings Promotion" className="space-y-6 lg:col-span-1 lg:sticky lg:top-24">
          <div className="glass-panel border border-slate-900/60 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            {/* Briefcase icon with gradient back */}
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center text-3xl select-none" aria-hidden="true">
              💼
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <span aria-hidden="true">✨</span> NEW: TalentDash Jobs
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                Find the perfect engineering job. See which companies are hiring that pay what you want, support remote, and work on things you enjoy.
              </p>
            </div>
            <Link
              href="/"
              className="w-full text-center text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 py-3 rounded-xl transition-all shadow-md mt-2"
            >
              View Vetted Jobs
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
