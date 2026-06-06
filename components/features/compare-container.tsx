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
      <div className="text-center py-12 text-muted-text">
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
      case 'L3': return 'bg-muted-text/10 text-muted-text border border-muted-text/15';
      case 'L4': return 'bg-primary-accent/10 text-primary-accent border border-primary-accent/15';
      case 'L5': return 'bg-warning/10 text-warning border border-warning/15';
      case 'L6': return 'bg-error/10 text-error border border-error/15';
      case 'Principal': return 'bg-deep-text/10 text-deep-text border border-deep-text/15';
      default: return 'bg-muted-text/10 text-muted-text border border-muted-text/15';
    }
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Selectors Card */}
      <div className="glass-panel rounded-2xl p-6 border border-border-custom grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xs">
        {/* Selector A */}
        <div className="flex flex-col gap-2">
          <label htmlFor="selector-a" className="text-xs font-semibold text-muted-text uppercase tracking-wider">
            Select Offer A {aWins && <span className="ml-2 inline-flex items-center rounded-full bg-primary-accent/10 px-2 py-0.5 text-[10px] font-bold text-primary-accent border border-primary-accent/25 animate-pulse">Higher TC</span>}
          </label>
          <select
            id="selector-a"
            value={recordA.id}
            onChange={(e) => handleSelectA(e.target.value)}
            className="w-full bg-surface border border-border-custom focus:border-primary-accent rounded-xl px-4 py-3 text-sm outline-none transition-all text-body-text"
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
          <label htmlFor="selector-b" className="text-xs font-semibold text-muted-text uppercase tracking-wider">
            Select Offer B {bWins && <span className="ml-2 inline-flex items-center rounded-full bg-primary-accent/10 px-2 py-0.5 text-[10px] font-bold text-primary-accent border border-primary-accent/25 animate-pulse">Higher TC</span>}
          </label>
          <select
            id="selector-b"
            value={recordB.id}
            onChange={(e) => handleSelectB(e.target.value)}
            className="w-full bg-surface border border-border-custom focus:border-primary-accent rounded-xl px-4 py-3 text-sm outline-none transition-all text-body-text"
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
        <div className="text-xs text-muted-text">
          Comparing <span className="font-semibold text-deep-text">{recordA.company}</span> with <span className="font-semibold text-deep-text">{recordB.company}</span>
        </div>
        
        {/* Currency Switcher */}
        <div role="group" aria-label="Currency Switcher" className="flex bg-hover-surface border border-border-custom rounded-xl p-0.5 w-36">
          <button
            onClick={() => setCurrency(Currency.INR)}
            aria-pressed={currency === Currency.INR}
            className={`flex-1 text-center py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
              currency === Currency.INR ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => setCurrency(Currency.USD)}
            aria-pressed={currency === Currency.USD}
            className={`flex-1 text-center py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
              currency === Currency.USD ? 'bg-primary-accent text-white shadow-xs' : 'text-muted-text hover:text-deep-text'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="w-full overflow-x-auto rounded-2xl border border-border-custom bg-surface shadow-xs">
        <table className="w-full min-w-[750px] border-collapse text-left text-sm text-body-text">
          <caption className="sr-only">
            Side-by-side compensation package comparisons and calculated deltas between Offer A and Offer B.
          </caption>
          <thead className="border-b border-border-custom bg-hover-surface/85 text-xs font-semibold uppercase tracking-wider text-muted-text">
            <tr>
              <th scope="col" className="px-6 py-4">Field</th>
              <th scope="col" className="px-6 py-4 w-1/3">Offer A ({recordA.company})</th>
              <th scope="col" className="px-6 py-4 w-1/3">Offer B ({recordB.company})</th>
              <th scope="col" className="px-6 py-4 w-1/4">Delta (A - B)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-custom bg-surface">
            {/* Company */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Company</th>
              <td className="px-6 py-4 font-bold text-deep-text">{recordA.company}</td>
              <td className="px-6 py-4 font-bold text-deep-text">{recordB.company}</td>
              <td className="px-6 py-4 text-muted-text">—</td>
            </tr>

            {/* Role */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Role</th>
              <td className="px-6 py-4 text-body-text font-medium">{recordA.role}</td>
              <td className="px-6 py-4 text-body-text font-medium">{recordB.role}</td>
              <td className="px-6 py-4 text-muted-text">—</td>
            </tr>

            {/* Level */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Level</th>
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
              <td className="px-6 py-4 text-muted-text">—</td>
            </tr>

            {/* Location */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Location</th>
              <td className="px-6 py-4 capitalize">{recordA.location}</td>
              <td className="px-6 py-4 capitalize">{recordB.location}</td>
              <td className="px-6 py-4 text-muted-text">—</td>
            </tr>

            {/* Experience */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Experience</th>
              <td className="px-6 py-4 font-mono">{formatExperience(recordA.experienceYears)}</td>
              <td className="px-6 py-4 font-mono">{formatExperience(recordB.experienceYears)}</td>
              <td className="px-6 py-4 font-mono">
                {expDelta === 0 ? (
                  <span className="text-muted-text">Same exp</span>
                ) : (
                  <span className={expDelta > 0 ? 'text-success' : 'text-error'}>
                    {expDelta > 0 ? `+${expDelta}` : expDelta} {Math.abs(expDelta) === 1 ? 'year' : 'years'}
                  </span>
                )}
              </td>
            </tr>

            {/* Base Salary */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Base Salary</th>
              <td className="px-6 py-4 font-mono text-body-text">{formatCurrency(recordA.baseSalary, currency)}</td>
              <td className="px-6 py-4 font-mono text-body-text">{formatCurrency(recordB.baseSalary, currency)}</td>
              <td className="px-6 py-4 font-mono font-semibold">
                {baseDelta.isZero ? (
                  <span className="text-muted-text">0</span>
                ) : (
                  <span className={baseDelta.isPositive ? 'text-success' : 'text-error'}>
                    {baseDelta.text}
                  </span>
                )}
              </td>
            </tr>

            {/* Bonus */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Bonus</th>
              <td className="px-6 py-4 font-mono text-muted-text">{formatCurrency(recordA.bonus, currency)}</td>
              <td className="px-6 py-4 font-mono text-muted-text">{formatCurrency(recordB.bonus, currency)}</td>
              <td className="px-6 py-4 font-mono font-semibold">
                {bonusDelta.isZero ? (
                  <span className="text-muted-text">0</span>
                ) : (
                  <span className={bonusDelta.isPositive ? 'text-success' : 'text-error'}>
                    {bonusDelta.text}
                  </span>
                )}
              </td>
            </tr>

            {/* Stock */}
            <tr className="hover:bg-hover-surface/50">
              <th scope="row" className="px-6 py-4 font-semibold text-muted-text text-xs uppercase text-left">Stock Options</th>
              <td className="px-6 py-4 font-mono text-muted-text">{formatCurrency(recordA.stock, currency)}</td>
              <td className="px-6 py-4 font-mono text-muted-text">{formatCurrency(recordB.stock, currency)}</td>
              <td className="px-6 py-4 font-mono font-semibold">
                {stockDelta.isZero ? (
                  <span className="text-muted-text">0</span>
                ) : (
                  <span className={stockDelta.isPositive ? 'text-success' : 'text-error'}>
                    {stockDelta.text}
                  </span>
                )}
              </td>
            </tr>

            {/* Total Comp */}
            <tr className="hover:bg-hover-surface/80 bg-hover-surface/25">
              <th scope="row" className="px-6 py-5 font-semibold text-deep-text text-xs uppercase text-left">Total Comp</th>
              <td className="px-6 py-5 font-mono text-lg font-extrabold text-primary-accent">
                <div className="flex flex-col gap-1">
                  <span>{formatCurrency(recordA.totalCompensation, currency)}</span>
                  {aWins && (
                    <span className="inline-flex self-start items-center rounded bg-primary-accent/10 px-2 py-0.5 text-[9px] font-bold text-primary-accent border border-primary-accent/25 uppercase tracking-wider">
                      Higher TC
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-5 font-mono text-lg font-extrabold text-primary-accent">
                <div className="flex flex-col gap-1">
                  <span>{formatCurrency(recordB.totalCompensation, currency)}</span>
                  {bWins && (
                    <span className="inline-flex self-start items-center rounded bg-primary-accent/10 px-2 py-0.5 text-[9px] font-bold text-primary-accent border border-primary-accent/25 uppercase tracking-wider">
                      Higher TC
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-5 font-mono text-base font-extrabold">
                {totalCompDelta.isZero ? (
                  <span className="text-muted-text">0</span>
                ) : (
                  <span className={totalCompDelta.isPositive ? 'text-success' : 'text-error'}>
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
