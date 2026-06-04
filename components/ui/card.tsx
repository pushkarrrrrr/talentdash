import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export default function Card({ glass = true, className = '', children, ...props }: CardProps) {
  const baseStyles = 'rounded-2xl border border-slate-900 shadow-xl';
  const glassStyles = glass ? 'glass-panel' : 'bg-slate-950';

  return (
    <div className={`${baseStyles} ${glassStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
