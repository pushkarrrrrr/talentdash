import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'slate' | 'blue' | 'indigo' | 'purple' | 'navy' | 'emerald';
}

export default function Badge({ variant = 'slate', className = '', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-all duration-200';
  
  const variantStyles = {
    slate: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    navy: 'bg-[#0f1b3c] text-sky-300 border-sky-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
