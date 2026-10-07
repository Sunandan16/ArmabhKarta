import React from 'react';
import { cn } from './GlassPanel';

export function IntelligenceMetric({
  label,
  value,
  subtext,
  className,
}: {
  label: string;
  value: string | number;
  subtext?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-brand-border bg-[var(--panel-bg)] p-4 shadow-warm-sm backdrop-blur-sm',
        className
      )}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label}
      </p>
      <p className="text-2xl font-bold text-brand-navy">{value}</p>
      {subtext && <p className="mt-1 text-xs text-brand-muted">{subtext}</p>}
    </div>
  );
}
