'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Company } from '@/types';
import { formatCurrency } from '@/lib/formatters';
import { COMPANY_RATINGS, COMPANY_REVIEWS, COMPANY_FOLLOWERS, COMPANY_STATS } from '@/lib/mock-data';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Retrieve precomputed stats
  const stats = COMPANY_STATS[company.slug] || { recordCount: 0, avgTotalComp: 0, maxTotalComp: 0 };
  const { recordCount, avgTotalComp, maxTotalComp } = stats;

  const rating = COMPANY_RATINGS[company.slug] || 4.0;
  const reviewsCount = COMPANY_REVIEWS[company.slug] || 500;
  const baseFollowers = COMPANY_FOLLOWERS[company.slug] || 5000;
  const followersDisplay = (baseFollowers + (isFollowing ? 1 : 0)).toLocaleString();

  // Create a stylized logo initials placeholder with a gradient
  const getGradient = (slug: string) => {
    const gradients = [
      'from-red-500 to-orange-500',
      'from-blue-500 to-indigo-500',
      'from-emerald-500 to-teal-500',
      'from-purple-500 to-pink-500',
      'from-amber-500 to-yellow-500',
      'from-sky-500 to-blue-500',
    ];
    // Hash slug to select index
    const code = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[code % gradients.length];
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-900/60 p-5 hover:border-sky-500/20 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top: Logo, Name, Follow */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Stylized Logo Initials Box with local SVG overlay */}
            <div className="h-11 w-11 rounded-xl bg-slate-900 border border-slate-800/80 shadow-sm flex-shrink-0 select-none overflow-hidden relative flex items-center justify-center">
              {/* Fallback initials with gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(company.slug)} flex items-center justify-center font-extrabold text-sm text-white uppercase z-0`}>
                {company.name.charAt(0)}
              </div>
              {/* Local SVG Logo */}
              <Image
                src={`/logos/${company.slug}.svg`}
                alt={company.name}
                width={44}
                height={44}
                className="object-cover w-full h-full relative z-10"
                unoptimized
              />
            </div>
            
            <div className="min-w-0">
              <Link href={`/salaries?company=${encodeURIComponent(company.name)}`}>
                <h3 className="font-bold text-slate-100 text-sm hover:text-sky-400 transition-colors leading-snug truncate">
                  {company.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5">
                {/* Rating Badge */}
                <div 
                  className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    rating >= 4.0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                  aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
                >
                  <span aria-hidden="true">★</span>
                  <span>{rating.toFixed(1)}</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  ({reviewsCount >= 1000 ? `${(reviewsCount / 1000).toFixed(1)}k` : reviewsCount} Reviews) • {followersDisplay} Followers
                </span>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            aria-label={isFollowing ? `Following ${company.name}` : `Follow ${company.name}`}
            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
              isFollowing
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-sky-600/10 text-sky-400 border-sky-500/20 hover:bg-sky-600/20'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Company Meta Tags */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          <span className="truncate max-w-[130px]" title={company.industry}>
            <span aria-hidden="true">🏢 </span>{company.industry}
          </span>
          <span>
            <span aria-hidden="true">👥 </span>{company.headcountRange}
          </span>
          <span className="truncate max-w-[100px]" title={company.headquarters}>
            <span aria-hidden="true">📍 </span>{company.headquarters.split(',')[0]}
          </span>
        </div>

        {/* Dynamic Compensation Stat Box */}
        <div className="grid grid-cols-2 gap-3 mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-900/80">
          <div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Avg Salary</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {recordCount > 0 ? `${formatCurrency(avgTotalComp, 'INR')}` : '—'}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Top Package</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {recordCount > 0 ? `${formatCurrency(maxTotalComp, 'INR')}` : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 pt-3 border-t border-slate-900/60 flex items-center justify-between gap-2 text-xs">
        <span className="text-[10px] text-slate-500 font-medium">
          {recordCount} Verified Comp Records
        </span>
        
        <div className="flex items-center gap-2">
          {/* Compare Link */}
          <Link
            href={`/compare?c1=${encodeURIComponent(company.slug)}`}
            aria-label={`Compare ${company.name}`}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-slate-800/60 px-2 py-1 rounded transition-colors"
          >
            Compare
          </Link>
          
          <Link
            href={`/salaries?company=${encodeURIComponent(company.name)}`}
            aria-label={`View ${company.name} salaries`}
            className="text-[10px] font-bold text-sky-400 hover:text-sky-300"
          >
            View Salaries <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
