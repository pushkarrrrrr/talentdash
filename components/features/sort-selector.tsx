'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'popular';

  const handleSortChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === 'popular') {
      params.delete('sort');
    } else {
      params.set('sort', val);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <label htmlFor="sort-dropdown" className="text-muted-text font-semibold uppercase tracking-wider">
        Sort By:
      </label>
      <select
        id="sort-dropdown"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-surface hover:bg-hover-surface/50 border border-border-custom focus:border-primary-accent/60 rounded-lg px-3 py-1.5 outline-none transition-all text-body-text font-semibold cursor-pointer"
      >
        <option value="popular">Popular (Salary Records)</option>
        <option value="rating">Student/Employee Rating</option>
        <option value="salary">Average Salary Packages</option>
        <option value="year">Founding Year (Newest)</option>
      </select>
    </div>
  );
}
