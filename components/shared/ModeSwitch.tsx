'use client';

import React from 'react';
import { cn } from './GlassPanel';

interface ModeSwitchProps {
  mode: 'employee' | 'company';
  setMode: (m: 'employee' | 'company') => void;
}

export function ModeSwitch({ mode, setMode }: ModeSwitchProps) {
  return (
    <div className="mx-auto flex w-full max-w-sm rounded-full border border-brand-border bg-surface/80 p-1.5 shadow-warm-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setMode('employee')}
        className={cn(
          'flex-1 rounded-full py-3 px-6 text-sm font-semibold transition-all duration-300',
          mode === 'employee'
            ? 'bg-primary text-white shadow-warm-sm'
            : 'text-brand-muted hover:text-brand-navy'
        )}
      >
        EMPLOYEE
      </button>
      <button
        type="button"
        onClick={() => setMode('company')}
        className={cn(
          'flex-1 rounded-full py-3 px-6 text-sm font-semibold transition-all duration-300',
          mode === 'company'
            ? 'bg-primary text-white shadow-warm-sm'
            : 'text-brand-muted hover:text-brand-navy'
        )}
      >
        COMPANY
      </button>
    </div>
  );
}
