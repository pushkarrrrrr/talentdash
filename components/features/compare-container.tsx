'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SalaryRecord, Currency } from '@/types';
import { formatCurrency, formatExperience, formatDelta } from '@/lib/formatters';

interface CompareContainerProps {
  records: SalaryRecord[];
}

export default function CompareContainer({ records }: CompareContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameters: s1 (record 1 id), s2 (record 2 id), c1 (company 1 slug filter)
  const s1Param = searchParams.get('s1');
  const s2Param = searchParams.get('s2');
  const c1Param = searchParams.get('c1');

  // Currency selection state
  const [currency, setCurrency] = useState<Currency>(Currency.INR);

  // Memoize select options to avoid formatting currency for 65 entries * 2 selectors on every state change/render
  const selectOptions = useMemo(() => {
    return records.map((r) => ({
      id: r.id,
      label: `${r.company} · ${r.role} (${r.level}) · ${formatCurrency(r.totalCompensation, 'INR')}`,
    }));
  }, [records]);

  // Resolve Record A
  let recordA: SalaryRecord | null = null;
  if (s1Param) {
    recordA = records.find(r => r.id === s1Param) || null;
  } else if (c1Param) {
    // If c1 company slug is provided, pre-fill with the highest paying record from that company
    const companyRecords = records.filter(r => r.companySlug === c1Param);
    if (companyRecords.length > 0) {
      // Sort by totalCompensation desc to pick the highest
      recordA = [...companyRecords].sort((a, b) => b.totalCompensation - a.totalCompensation)[0];
    }
  }
  // Default to the first record in the seed data if nothing is chosen
  if (!recordA && records.length > 0) {
    recordA = records[0];
  }

  // Resolve Record B
  let recordB: SalaryRecord | null = null;
  if (s2Param) {
    recordB = records.find(r => r.id === s2Param) || null;
  }
  // Default to the second record in the seed data if nothing is chosen
  if (!recordB && records.length > 1) {
    // Avoid choosing the same record as A if possible
    recordB = records.find(r => r.id !== recordA?.id) || records[1];
  }

  // Sync state back to URL when selections change
  function updateSelections(idA: string, idB: string) {
    const params = new URLSearchParams();
    params.set('s1', idA);
    params.set('s2', idB);
    router.push(`/compare?${params.toString()}`);
  }

  function handleSelectA(id: string) {
    if (recordB) {
      updateSelections(id, recordB.id);
    }
  }

  function handleSelectB(id: string) {
    if (recordA) {
      updateSelections(recordA.id, id);
    }
  }

  if (!recordA || !recordB) {
    return (
      <div className="text-center py-12 text-slate-400">
        Loading comparison board...
      </div>
    );
  }

  // Math delta calculations
  const baseDelta = formatDelta(recordA.baseSalary, recordB.baseSalary, currency);
  const bonusDelta = formatDelta(recordA.bonus || 0, recordB.bonus || 0, currency);
  const stockDelta = formatDelta(recordA.stock || 0, recordB.stock || 0, currency);
  const totalCompDelta = formatDelta(recordA.totalCompensation, recordB.totalCompensation, currency);
  const expDelta = recordA.experienceYears - recordB.experienceYears;

  // Determine winner
  const aWins = recordA.totalCompensation > recordB.totalCompensation;
  const bWins = recordB.totalCompensation > recordA.totalCompensation;

  // Level Badge Styling
  function getLevelBadgeStyles(level: string) {
    switch (level) {
      case 'L3': return 'bg-slate-500/10 text-slate-300 border border-slate-500/20';
      case 'L4': return 'bg-blue-500/10 text-blue-300 border border-blue-500/20';
      case 'L5': return 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20';
      case 'L6': return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
      case 'Principal': return 'bg-[#0f1b3c] text-sky-300 border border-sky-500/20';
      default: return 'bg-zinc-500/10 text-zinc-300 border border-zinc-500/20';
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Selectors Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl">
        {/* Selector A */}
        <div className="flex flex-col gap-2">
          <label htmlFor="selector-a" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Offer A {aWins && <span className="ml-2 inline-flex items-center rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/25">Higher TC</span>}
          </label>
          <select
            id="selector-a"
            value={recordA.id}
            onChange={(e) => handleSelectA(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-xl px-4 py-3 text-sm outline-none transition-all text-slate-200"
          >
            {selectOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Selector B */}
        <div className="flex flex-col gap-2">
          <label htmlFor="selector-b" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Offer B {bWins && <span className="ml-2 inline-flex items-center rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/25">Higher TC</span>}
          </label>
          <select
            id="selector-b"
            value={recordB.id}
            onChange={(e) => handleSelectB(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-sky-500 rounded-xl px-4 py-3 text-sm outline-none transition-all text-slate-200"
          >
            {selectOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs text-slate-400">
          Comparing <span className="font-semibold text-slate-200">{recordA.company}</span> with <span className="font-semibold text-slate-200">{recordB.company}</span>
        </div>
        
        {/* Currency Switcher */}
        <div role="group" aria-label="Currency Switcher" className="flex bg-slate-950 border border-slate-900 rounded-xl p-0.5 w-36">
          <button
            onClick={() => setCurrency(Currency.INR)}
            aria-pressed={currency === Currency.INR}
            className={`flex-1 text-center py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
              currency === Currency.INR ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => setCurrency(Currency.USD)}
            aria-pressed={currency === Currency.USD}
            className={`flex-1 text-center py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
              currency === Currency.USD ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm shadow-2xl">
        <table className="w-full min-w-[750px] border-collapse text-left text-sm text-slate-300">
          <caption className="sr-only">
            Side-by-side compensation package comparisons and calculated deltas between Offer A and Offer B.
          </caption>
          <thead className="border-b border-slate-900 bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-4">Field</th>
              <th scope="col" className="px-6 py-4 w-1/3">Offer A ({recordA.company})</th>
              <th scope="col" className="px-6 py-4 w-1/3">Offer B ({recordB.company})</th>
              <th scope="col" className="px-6 py-4 w-1/4">Delta (A - B)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 bg-slate-950/20">
            {/* Company */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Company</th>
              <td className="px-6 py-4 font-bold text-slate-100">{recordA.company}</td>
              <td className="px-6 py-4 font-bold text-slate-100">{recordB.company}</td>
              <td className="px-6 py-4 text-slate-500">—</td>
            </tr>

            {/* Role */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Role</th>
              <td className="px-6 py-4 text-slate-200 font-medium">{recordA.role}</td>
              <td className="px-6 py-4 text-slate-200 font-medium">{recordB.role}</td>
              <td className="px-6 py-4 text-slate-500">—</td>
            </tr>

            {/* Level */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Level</th>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getLevelBadgeStyles(recordA.level)}`}>
                  {recordA.level}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getLevelBadgeStyles(recordB.level)}`}>
                  {recordB.level}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">—</td>
            </tr>

            {/* Location */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Location</th>
              <td className="px-6 py-4 capitalize">{recordA.location}</td>
              <td className="px-6 py-4 capitalize">{recordB.location}</td>
              <td className="px-6 py-4 text-slate-500">—</td>
            </tr>

            {/* Experience */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Experience</th>
              <td className="px-6 py-4 font-mono">{formatExperience(recordA.experienceYears)}</td>
              <td className="px-6 py-4 font-mono">{formatExperience(recordB.experienceYears)}</td>
              <td className="px-6 py-4 font-mono">
                {expDelta === 0 ? (
                  <span className="text-slate-500">Same exp</span>
                ) : (
                  <span className={expDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {expDelta > 0 ? `+${expDelta}` : expDelta} {Math.abs(expDelta) === 1 ? 'year' : 'years'}
                  </span>
                )}
              </td>
            </tr>

            {/* Base Salary */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Base Salary</th>
              <td className="px-6 py-4 font-mono text-slate-200">{formatCurrency(recordA.baseSalary, currency)}</td>
              <td className="px-6 py-4 font-mono text-slate-200">{formatCurrency(recordB.baseSalary, currency)}</td>
              <td className="px-6 py-4 font-mono font-semibold">
                {baseDelta.isZero ? (
                  <span className="text-slate-500">0</span>
                ) : (
                  <span className={baseDelta.isPositive ? 'text-emerald-400' : 'text-rose-500'}>
                    {baseDelta.text}
                  </span>
                )}
              </td>
            </tr>

            {/* Bonus */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Bonus</th>
              <td className="px-6 py-4 font-mono text-slate-400">{formatCurrency(recordA.bonus, currency)}</td>
              <td className="px-6 py-4 font-mono text-slate-400">{formatCurrency(recordB.bonus, currency)}</td>
              <td className="px-6 py-4 font-mono font-semibold">
                {bonusDelta.isZero ? (
                  <span className="text-slate-500">0</span>
                ) : (
                  <span className={bonusDelta.isPositive ? 'text-emerald-400' : 'text-rose-500'}>
                    {bonusDelta.text}
                  </span>
                )}
              </td>
            </tr>

            {/* Stock */}
            <tr className="hover:bg-slate-900/10">
              <th scope="row" className="px-6 py-4 font-semibold text-slate-400 text-xs uppercase text-left font-normal">Stock Options</th>
              <td className="px-6 py-4 font-mono text-slate-400">{formatCurrency(recordA.stock, currency)}</td>
              <td className="px-6 py-4 font-mono text-slate-400">{formatCurrency(recordB.stock, currency)}</td>
              <td className="px-6 py-4 font-mono font-semibold">
                {stockDelta.isZero ? (
                  <span className="text-slate-500">0</span>
                ) : (
                  <span className={stockDelta.isPositive ? 'text-emerald-400' : 'text-rose-500'}>
                    {stockDelta.text}
                  </span>
                )}
              </td>
            </tr>

            {/* Total Comp */}
            <tr className="hover:bg-slate-900/20 bg-slate-900/5">
              <th scope="row" className="px-6 py-5 font-semibold text-slate-300 text-xs uppercase text-left font-normal">Total Comp</th>
              <td className="px-6 py-5 font-mono text-lg font-extrabold text-[#0369A1]">
                <div className="flex flex-col gap-1">
                  <span>{formatCurrency(recordA.totalCompensation, currency)}</span>
                  {aWins && (
                    <span className="inline-flex self-start items-center rounded bg-sky-500/10 px-2 py-0.5 text-[9px] font-bold text-sky-400 border border-sky-500/25 uppercase tracking-wider">
                      Higher TC
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-5 font-mono text-lg font-extrabold text-[#0369A1]">
                <div className="flex flex-col gap-1">
                  <span>{formatCurrency(recordB.totalCompensation, currency)}</span>
                  {bWins && (
                    <span className="inline-flex self-start items-center rounded bg-sky-500/10 px-2 py-0.5 text-[9px] font-bold text-sky-400 border border-sky-500/25 uppercase tracking-wider">
                      Higher TC
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-5 font-mono text-base font-extrabold">
                {totalCompDelta.isZero ? (
                  <span className="text-slate-500">0</span>
                ) : (
                  <span className={totalCompDelta.isPositive ? 'text-emerald-400' : 'text-rose-500'}>
                    {totalCompDelta.text}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
