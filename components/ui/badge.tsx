import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'slate' | 'blue' | 'indigo' | 'purple' | 'navy' | 'emerald' | 'success' | 'warning' | 'error';
}

export default function Badge({ variant = 'slate', className = '', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-all duration-200';
  
  const variantStyles = {
    slate: 'bg-muted-text/10 text-muted-text border-muted-text/15',
    blue: 'bg-primary-accent/10 text-primary-accent border-primary-accent/15',
    indigo: 'bg-primary-accent/10 text-primary-accent border-primary-accent/15',
    purple: 'bg-primary-accent/10 text-primary-accent border-primary-accent/15',
    navy: 'bg-deep-text/10 text-deep-text border-deep-text/15',
    emerald: 'bg-success/10 text-success border-success/15',
    success: 'bg-success/10 text-success border-success/15',
    warning: 'bg-warning/10 text-warning border-warning/15',
    error: 'bg-error/10 text-error border-error/15',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
