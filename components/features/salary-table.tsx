import Link from 'next/link';
import CompanyLogo from './company-logo';
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
        return 'bg-muted-text/10 text-muted-text border border-muted-text/15';
      case 'L4':
        return 'bg-primary-accent/10 text-primary-accent border border-primary-accent/15';
      case 'L5':
        return 'bg-warning/10 text-warning border border-warning/15';
      case 'L6':
        return 'bg-error/10 text-error border border-error/15';
      case 'Principal':
        return 'bg-deep-text/10 text-deep-text border border-deep-text/15';
      default:
        return 'bg-muted-text/10 text-muted-text border border-muted-text/15';
    }
  }

  // Helper for sort indicators
  function renderSortIndicator(field: string) {
    if (sortBy !== field) {
      return (
        <span className="ml-1 text-muted-text/60 group-hover:text-deep-text transition-colors">
          ↕
        </span>
      );
    }
    return (
      <span className="ml-1 text-primary-accent font-bold">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border-custom bg-surface">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm text-body-text">
        <caption className="sr-only">
          Verified technology salary packages showing company, designation role, level, metro location, years of experience, base salary package, stock options, and total compensation.
        </caption>
        <thead className="border-b border-border-custom bg-hover-surface/85 text-xs font-semibold uppercase tracking-wider text-muted-text">
          <tr>
            <th scope="col" className="px-6 py-4">Company</th>
            <th scope="col" className="px-6 py-4">Role</th>
            <th scope="col" className="px-6 py-4">Level</th>
            <th scope="col" className="px-6 py-4">Location</th>
            <th 
              scope="col" 
              className="px-6 py-4"
              aria-sort={sortBy === 'experienceYears' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              <Link href={getSortHref('experienceYears')} className="group flex items-center hover:text-deep-text transition-colors">
                Experience {renderSortIndicator('experienceYears')}
              </Link>
            </th>
            <th 
              scope="col" 
              className="px-6 py-4"
              aria-sort={sortBy === 'baseSalary' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              <Link href={getSortHref('baseSalary')} className="group flex items-center hover:text-deep-text transition-colors">
                Base Salary {renderSortIndicator('baseSalary')}
              </Link>
            </th>
            <th scope="col" className="px-6 py-4">Stock</th>
            <th 
              scope="col" 
              className="px-6 py-4"
              aria-sort={sortBy === 'totalCompensation' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
            >
              <Link href={getSortHref('totalCompensation')} className="group flex items-center hover:text-deep-text transition-colors">
                Total Comp {renderSortIndicator('totalCompensation')}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-custom bg-surface">
          {records.map((record) => (
            <tr
              key={record.id}
              className="hover:bg-hover-surface/70 transition-colors duration-150 group"
            >
              {/* Company cell supporting very long names */}
              <td className="px-6 py-4 max-w-[220px]">
                <Link
                  href={`/companies/${record.companySlug}`}
                  className="group/link flex items-center gap-3 transition-colors"
                >
                  <div className="relative shrink-0 w-6 h-6 rounded-md overflow-hidden bg-hover-surface border border-border-custom flex items-center justify-center">
                    <CompanyLogo
                      companySlug={record.companySlug}
                      companyName={record.company}
                      width={24}
                      height={24}
                    />
                  </div>
                  <span className="font-semibold text-deep-text group-hover/link:text-primary-accent group-hover/link:underline transition-colors min-w-0 break-words line-clamp-2">
                    {record.company}
                  </span>
                </Link>
              </td>
              <td className="px-6 py-4 font-medium text-deep-text">{record.role}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getLevelBadgeStyles(record.level)}`}>
                  {record.level}
                </span>
              </td>
              <td className="px-6 py-4 text-muted-text capitalize">{record.location}</td>
              <td className="px-6 py-4 font-mono">{formatExperience(record.experienceYears)}</td>
              <td className="px-6 py-4 font-mono">{formatCurrency(record.baseSalary, currency)}</td>
              <td className="px-6 py-4 font-mono text-muted-text">{formatCurrency(record.stock, currency)}</td>
              <td className="px-6 py-4 font-mono text-base font-bold text-primary-accent transition-colors">
                {formatCurrency(record.totalCompensation, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
