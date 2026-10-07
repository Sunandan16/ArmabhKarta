'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { GlassPanel } from '@/components/shared/GlassPanel';
import { IntelligenceMetric } from '@/components/shared/IntelligenceMetric';

export function CompanyWorkspace() {
  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <GlassPanel className="self-start space-y-6">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Enterprise Twin</h2>
          <p className="text-sm text-brand-muted">
            Optimize workforce interventions to close capability gaps.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-brand-border bg-[var(--panel-bg)] p-4">
            <Users className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-brand-navy">Upload your roster</p>
              <p className="text-xs text-brand-muted">CSV or Excel of current employees.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-brand-border bg-[var(--panel-bg)] p-4">
            <TrendingUp className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-brand-navy">Add candidates</p>
              <p className="text-xs text-brand-muted">Auto-generated or manual external hires.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-brand-border bg-[var(--panel-bg)] p-4">
            <DollarSign className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-brand-navy">Run AI plan</p>
              <p className="text-xs text-brand-muted">Build-vs-buy actions, costs, and verdict.</p>
            </div>
          </div>
        </div>

        <Link href="/enterprise">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 font-bold text-white shadow-warm-md transition hover:opacity-90"
          >
            Open Workforce Planner
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </Link>
      </GlassPanel>

      <div className="flex min-h-[480px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-border p-12 text-center">
        <div className="mb-4 rounded-2xl bg-surface p-4 text-primary">
          <TrendingUp className="h-8 w-8" />
        </div>
        <p className="text-lg font-semibold text-brand-navy">Workforce Optimization</p>
        <p className="mt-2 max-w-md text-sm text-brand-muted">
          The full enterprise planner lives on the Enterprise page. Create a
          department, upload employees, add candidates, and run the AI
          build-vs-buy plan.
        </p>
        <div className="mt-6 grid w-full max-w-lg grid-cols-3 gap-4">
          <IntelligenceMetric label="Avg savings" value="~20%" />
          <IntelligenceMetric label="Coverage" value="100%" />
          <IntelligenceMetric label="Verdict" value="Worth it" />
        </div>
      </div>
    </div>
  );
}
