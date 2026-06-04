import Link from 'next/link';
import Image from 'next/image';
import { SalaryRecord } from '@/types';
import { formatCurrency, formatExperience } from '@/lib/formatters';

interface SalaryTableProps {
  records: SalaryRecord[];
  currency: 'INR' | 'USD';
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  searchParams: Record<string, string | string[] | undefined>;
  basePath?: string;
}

export default function SalaryTable({
  records,
  currency,
  sortBy,
  sortOrder,
  searchParams,
  basePath = '/salaries',
}: SalaryTableProps) {
  // Helper to generate sort link href
  function getSortHref(field: string) {
    const params = new URLSearchParams();
    
    // Copy existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    // Toggle sort order or change sort field
    if (sortBy === field) {
      params.set('sortOrder', sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      params.set('sortBy', field);
      params.set('sortOrder', 'desc'); // default to descending for new fields
    }
    
    // Reset page to 1 when sort changes
    params.set('page', '1');

    return `${basePath}?${params.toString()}`;
  }

  // Level badge styling function
  function getLevelBadgeStyles(level: string) {
    switch (level) {
      case 'L3':
        return 'bg-slate-500/10 text-slate-300 border border-slate-500/20';
      case 'L4':
        return 'bg-blue-500/10 text-blue-300 border border-blue-500/20';
      case 'L5':
        return 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20';
      case 'L6':
        return 'bg-purple-500/10 text-purple-300 border border-purple-500/20';
      case 'Principal':
        return 'bg-[#0f1b3c] text-sky-300 border border-sky-500/20'; // Navy theme
      default:
        return 'bg-zinc-500/10 text-zinc-300 border border-zinc-500/20';
    }
  }

  // Helper for sort indicators
  function renderSortIndicator(field: string) {
    if (sortBy !== field) {
      return (
        <span className="ml-1 text-slate-600 group-hover:text-slate-400 transition-colors">
          ↕
        </span>
      );
    }
    return (
      <span className="ml-1 text-sky-400 font-bold">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-900 bg-slate-950/40 backdrop-blur-sm">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm text-slate-300">
        <thead className="border-b border-slate-900 bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <tr>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Level</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4">
              <Link href={getSortHref('experienceYears')} className="group flex items-center hover:text-slate-200 transition-colors">
                Experience {renderSortIndicator('experienceYears')}
              </Link>
            </th>
            <th className="px-6 py-4">
              <Link href={getSortHref('baseSalary')} className="group flex items-center hover:text-slate-200 transition-colors">
                Base Salary {renderSortIndicator('baseSalary')}
              </Link>
            </th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">
              <Link href={getSortHref('totalCompensation')} className="group flex items-center hover:text-slate-200 transition-colors">
                Total Comp {renderSortIndicator('totalCompensation')}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60 bg-slate-950/20">
          {records.map((record) => (
            <tr
              key={record.id}
              className="hover:bg-slate-900/35 transition-colors duration-150 group"
            >
              {/* Company cell supporting very long names */}
              <td className="px-6 py-4 max-w-[220px]">
                <Link
                  href={`/companies/${record.companySlug}`}
                  className="group/link flex items-center gap-3 transition-colors"
                >
                  <div className="relative shrink-0 w-6 h-6 rounded-md overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Image
                      src={`https://logo.clearbit.com/${record.companySlug}.com`}
                      alt={record.company}
                      width={24}
                      height={24}
                      className="object-cover"
                      unoptimized // Because it's an external placeholder that can fail
                    />
                  </div>
                  <span className="font-semibold text-slate-100 group-hover/link:text-sky-400 group-hover/link:underline transition-colors min-w-0 break-words line-clamp-2">
                    {record.company}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-4 font-medium text-slate-200">{record.role}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getLevelBadgeStyles(record.level)}`}>
                  {record.level}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-400 capitalize">{record.location}</td>
              <td className="px-6 py-4 font-mono">{formatExperience(record.experienceYears)}</td>
              <td className="px-6 py-4 font-mono">{formatCurrency(record.baseSalary, currency)}</td>
              <td className="px-6 py-4 font-mono text-slate-400">{formatCurrency(record.stock, currency)}</td>
              <td className="px-6 py-4 font-mono text-base font-bold text-[#0369A1] group-hover:text-sky-400 transition-colors">
                {formatCurrency(record.totalCompensation, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
