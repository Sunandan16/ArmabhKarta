'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IntelligenceOrb } from '@/components/landing/IntelligenceOrb';
import { ModeSwitch } from '@/components/shared/ModeSwitch';
import { EmployeeWorkspace } from '@/components/employee/EmployeeWorkspace';
import { CompanyWorkspace } from '@/components/company/CompanyWorkspace';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Roles } from '@/components/Roles';
import { TechStack } from '@/components/TechStack';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  const [mode, setMode] = useState<'employee' | 'company'>('employee');

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-12 lg:grid-cols-[1fr_1fr] lg:pt-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-xl space-y-6"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            AI-Powered Workforce Intelligence
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-navy md:text-6xl">
            Turn skills into your next{' '}
            <span className="inline-block text-primary transition-transform duration-300 hover:scale-105">
              best move.
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-brand-muted">
            SkillPilot uses market intelligence, predictive ML, and MCTS
            optimization to find the highest-value path for people and
            organizations.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              onClick={() => {
                setMode('employee');
                document.getElementById('workspace-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full bg-brand-navy px-8 py-3.5 font-semibold text-white shadow-warm-lg transition hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
            >
              Explore Employee Mode
            </button>
            <button
              onClick={() => {
                setMode('company');
                document.getElementById('workspace-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border border-brand-border bg-white px-8 py-3.5 font-semibold text-brand-navy shadow-warm-sm transition hover:-translate-y-0.5 hover:bg-surface active:translate-y-0"
            >
              Explore Company Mode
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <IntelligenceOrb />
        </motion.div>
      </section>

      {/* How it works narrative */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl border-y border-brand-border/50 px-4 py-16"
      >
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-5">
          {[
            { num: '01', title: 'UNDERSTAND', desc: 'Extract skills & experience' },
            { num: '02', title: 'PREDICT', desc: 'Estimate success & readiness' },
            { num: '03', title: 'SEARCH', desc: 'MCTS explores trajectories' },
            { num: '04', title: 'DECIDE', desc: 'Select highest-value path' },
            { num: '05', title: 'EXPLAIN', desc: 'LLM justifies the decision' },
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <motion.div whileHover={{ y: -5 }} className="cursor-default">
                <p className="mb-2 text-2xl font-black text-primary">{step.num}</p>
                <p className="mb-1 text-sm font-bold text-brand-navy">{step.title}</p>
                <p className="text-xs text-brand-muted">{step.desc}</p>
              </motion.div>
              {idx < 4 && (
                <div className="hidden self-center md:block">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className="h-px w-full origin-left bg-brand-border"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.section>

      {/* Mode switcher + workspace */}
      <section
        id="workspace-section"
        className="mx-auto max-w-7xl px-4 py-20"
      >
        <div className="mb-12 flex justify-center">
          <ModeSwitch mode={mode} setMode={setMode} />
        </div>

        <AnimatePresence mode="wait">
          {mode === 'employee' ? (
            <motion.div
              key="employee"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-brand-navy">
                  Find the highest-value path to your target role.
                </h2>
              </div>
              <EmployeeWorkspace />
            </motion.div>
          ) : (
            <motion.div
              key="company"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-brand-navy">
                  Optimize your workforce before you hire.
                </h2>
              </div>
              <CompanyWorkspace />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Features />
      <HowItWorks />
      <Roles />
      <TechStack />
      <Footer />
    </main>
  );
}
