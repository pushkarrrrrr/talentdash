import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export default function Card({ glass = true, className = '', children, ...props }: CardProps) {
  const baseStyles = 'rounded-2xl border border-border-custom/80 shadow-xs';
  const glassStyles = glass ? 'glass-panel' : 'bg-surface';

  return (
    <div className={`${baseStyles} ${glassStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
