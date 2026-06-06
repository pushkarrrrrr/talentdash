'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CompanyLogoProps {
  companySlug: string;
  companyName: string;
  width?: number;
  height?: number;
}

export default function CompanyLogo({
  companySlug,
  companyName,
  width = 24,
  height = 24,
}: CompanyLogoProps) {
  const [error, setError] = useState(false);

  // Generate initials (first letter of name, capitalized)
  const initial = companyName.charAt(0).toUpperCase();

  // Helper to generate a stable gradient background based on companySlug
  const getGradient = (slug: string) => {
    const gradients = [
      'from-rose-500/80 to-orange-500/80',
      'from-blue-500/80 to-indigo-500/80',
      'from-emerald-500/80 to-teal-500/80',
      'from-violet-500/80 to-fuchsia-500/80',
      'from-amber-500/80 to-yellow-500/80',
      'from-sky-500/80 to-blue-500/80',
    ];
    const code = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[code % gradients.length];
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-gradient-to-br ${getGradient(
          companySlug
        )} text-white font-extrabold select-none uppercase`}
        style={{ width: `${width}px`, height: `${height}px`, fontSize: `${width * 0.45}px` }}
        title={companyName}
      >
        {initial}
      </div>
    );
  }

  return (
    <Image
      src={`https://logo.clearbit.com/${companySlug}.com`}
      alt={companyName}
      width={width}
      height={height}
      className="object-cover rounded-md"
      onError={() => setError(true)}
    />
  );
}
