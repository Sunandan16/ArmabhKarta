'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function IntelligenceOrb() {
  return (
    <div className="relative mx-auto flex h-[420px] w-[420px] items-center justify-center md:h-[500px] md:w-[500px]">
      {/* Outer glow rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-primary-light/40"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-6 rounded-full border border-dashed border-primary-light/50"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-12 rounded-full border border-primary-light/30"
      />

      {/* SVG core */}
      <svg viewBox="0 0 200 200" className="relative z-10 h-64 w-64 md:h-80 md:w-80">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="60%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#FED7AA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Aura */}
        <circle cx="100" cy="100" r="90" fill="url(#coreGlow)" opacity="0.25" />
        <circle cx="100" cy="100" r="70" fill="url(#innerGlow)" opacity="0.35" />

        {/* Core sun */}
        <motion.circle
          cx="100"
          cy="100"
          r="36"
          fill="#F97316"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="100" cy="100" r="46" fill="#FB923C" opacity="0.4" />

        {/* Orbiting skill nodes */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          <circle cx="100" cy="30" r="5" fill="#F97316" />
          <circle cx="170" cy="100" r="4" fill="#FB923C" />
          <circle cx="100" cy="170" r="3" fill="#FED7AA" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '100px', originY: '100px' }}
        >
          <circle cx="50" cy="60" r="3" fill="#FDBA74" />
          <circle cx="150" cy="140" r="4" fill="#FB923C" />
        </motion.g>
      </svg>

      {/* Floating labels */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 right-8 rounded-xl border border-brand-border bg-[var(--panel-bg)] px-3 py-1.5 shadow-warm-sm backdrop-blur-md"
      >
        <p className="flex items-center text-[10px] font-bold uppercase tracking-wider text-brand-navy">
          <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          MCTS Optimization
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 left-6 rounded-xl border border-brand-border bg-[var(--panel-bg)] px-3 py-1.5 shadow-warm-sm backdrop-blur-md"
      >
        <p className="flex items-center text-[10px] font-bold uppercase tracking-wider text-primary">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-navy" />
          Skill Gap Intelligence
        </p>
      </motion.div>
    </div>
  );
}
