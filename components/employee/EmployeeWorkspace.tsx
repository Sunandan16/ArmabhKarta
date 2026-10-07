'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, CheckCircle2, Lightbulb, Upload } from 'lucide-react';
import { GlassPanel } from '@/components/shared/GlassPanel';
import { IntelligenceMetric } from '@/components/shared/IntelligenceMetric';
import { UserDashboard } from '@/components/UserDashboard';
import { ROLES } from '@/components/enterprise/types';

interface AnalysisResult {
  coverage?: number;
  gap_score?: number;
  num_missing?: number;
  predictions?: {
    salary_hike?: { label?: string; probability?: number };
    success?: { label?: string; probability?: number };
  };
  recommended_skills?: string[];
  roadmap?: string[];
  llm?: {
    summary?: string;
    key_insights?: string[];
  };
}

export function EmployeeWorkspace() {
  const [mode, setMode] = useState<'text' | 'resume'>('text');
  const [form, setForm] = useState({
    targetRole: 'data_scientist',
    skills: 'Python, SQL, machine learning',
    experience: '2',
    time: '12',
  });
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  async function handleAnalyze() {
    setAnalyzing(true);
    setResult(null);
    setError(null);
    setUserId(null);

    if (!apiBase) {
      setAnalyzing(false);
      setError('API URL is not configured.');
      return;
    }

    try {
      let data: AnalysisResult & { user_id?: string };
      const headers: Record<string, string> = {
        'ngrok-skip-browser-warning': 'true',
      };

      if (mode === 'resume') {
        if (!file) {
          setAnalyzing(false);
          setError('Please upload a PDF resume.');
          return;
        }
        const uploadForm = new FormData();
        uploadForm.append('file', file);
        uploadForm.append('role', form.targetRole);
        const res = await fetch(`${apiBase}/upload-resume`, {
          method: 'POST',
          headers,
          body: uploadForm,
        });
        const uploadData = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(uploadData.detail || `Server returned ${res.status}`);
        }
        data = uploadData.analysis;
        if (uploadData.user_id) {
          setUserId(uploadData.user_id);
          localStorage.setItem('skillpilot_user_id', uploadData.user_id);
        }
      } else {
        const text = `I have ${form.experience} years of experience. My skills include ${form.skills}.`;
        const res = await fetch(`${apiBase}/analyze`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, role: form.targetRole }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(json.detail || `Server returned ${res.status}`);
        }
        data = json;
      }

      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  }

  const canSubmit =
    mode === 'text'
      ? form.skills.trim()
      : !!file;

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <GlassPanel className="self-start space-y-6">
        <div>
          <h2 className="text-xl font-bold text-brand-navy">Career Profiler</h2>
          <p className="text-sm text-brand-muted">
            Input your background or upload your resume to discover the
            highest-value path.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-full border border-brand-border bg-[var(--input-bg)] p-1">
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
              mode === 'text'
                ? 'bg-primary text-white shadow-warm-sm'
                : 'text-brand-muted hover:text-brand-navy'
            }`}
          >
            Type Background
          </button>
          <button
            type="button"
            onClick={() => setMode('resume')}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
              mode === 'resume'
                ? 'bg-primary text-white shadow-warm-sm'
                : 'text-brand-muted hover:text-brand-navy'
            }`}
          >
            Upload Resume
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-brand-navy">
              Target role
            </label>
            <select
              value={form.targetRole}
              onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
              className="w-full rounded-xl border border-brand-border bg-[var(--input-bg)] px-3 py-2.5 text-sm text-brand-navy focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {mode === 'text' ? (
            <>
              <div>
                <label className="mb-1 block text-xs font-semibold text-brand-navy">
                  Current skills (comma separated)
                </label>
                <input
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className="w-full rounded-xl border border-brand-border bg-[var(--input-bg)] px-3 py-2.5 text-sm text-brand-navy focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-brand-navy">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full rounded-xl border border-brand-border bg-[var(--input-bg)] px-3 py-2.5 text-sm text-brand-navy focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-brand-navy">
                    Time (months)
                  </label>
                  <input
                    type="number"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full rounded-xl border border-brand-border bg-[var(--input-bg)] px-3 py-2.5 text-sm text-brand-navy focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="mb-1 block text-xs font-semibold text-brand-navy">
                Upload your resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full rounded-xl border border-brand-border bg-[var(--input-bg)] px-3 py-2.5 text-sm text-brand-navy file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-hover"
              />
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={analyzing || !canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-warm-md transition hover:bg-primary-hover disabled:opacity-70"
        >
          {analyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : mode === 'resume' ? (
            <>
              <Upload className="h-4 w-4" /> Upload & Analyze
            </>
          ) : (
            <>
              Find My Best Path <ArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </GlassPanel>

      <div className="flex min-h-[480px] flex-col gap-6">
        <AnimatePresence mode="wait">
          {!result && !analyzing && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brand-border p-12 text-center"
            >
              <div className="mb-4 rounded-2xl bg-surface p-4 text-primary">
                <Lightbulb className="h-8 w-8" />
              </div>
              <p className="text-lg font-semibold text-brand-navy">Ready for Analysis</p>
              <p className="mt-2 max-w-sm text-sm text-brand-muted">
                Enter your profile or upload a resume to trigger AI skill gap
                analysis and MCTS trajectory search.
              </p>
            </motion.div>
          )}

          {analyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col items-center justify-center gap-4"
            >
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-surface border-t-primary" />
              <div className="text-center">
                <p className="font-semibold text-brand-navy">Running Intelligence Pipeline</p>
                <p className="animate-pulse text-sm text-brand-muted">
                  Evaluating market signals & optimizing paths...
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700"
            >
              <p className="font-bold">Analysis Failed</p>
              <p className="mt-1 text-sm">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <IntelligenceMetric
                  label="Success"
                  value={`${((result.predictions?.success?.probability ?? 0) * 100).toFixed(0)}%`}
                />
                <IntelligenceMetric
                  label="Coverage"
                  value={`${((result.coverage ?? 0) * 100).toFixed(1)}%`}
                />
                <IntelligenceMetric
                  label="Gap Score"
                  value={`${((result.gap_score ?? 0) * 100).toFixed(1)}%`}
                />
                <IntelligenceMetric label="Missing" value={result.num_missing ?? 0} />
              </div>

              {result.roadmap && result.roadmap.length > 0 && (
                <GlassPanel>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-navy">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Optimal Roadmap
                  </h3>
                  <div className="relative space-y-4 pl-2 before:absolute before:inset-0 before:ml-[13px] before:h-full before:w-0.5 before:bg-brand-border">
                    {result.roadmap.map((step, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        key={i}
                        className="relative pl-8"
                      >
                        <div className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] bg-primary shadow-[0_0_8px_#F97316]" />
                        <div className="rounded-xl border border-brand-border bg-[var(--panel-bg)] p-3 shadow-warm-sm">
                          <p className="text-sm font-medium text-brand-navy">{step}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassPanel>
              )}

              {result.recommended_skills && result.recommended_skills.length > 0 && (
                <GlassPanel>
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-brand-navy">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Recommended skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.recommended_skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              )}

              {result.llm?.summary && (
                <GlassPanel className="bg-brand-navy text-white">
                  <h3 className="mb-2 text-lg font-bold text-white">Executive Explanation</h3>
                  <p className="text-sm leading-relaxed text-white/90">{result.llm.summary}</p>
                </GlassPanel>
              )}

              {userId && apiBase && (
                <div className="rounded-2xl border-2 border-brand-border bg-[var(--panel-bg)] p-6">
                  <h3 className="mb-4 text-lg font-semibold text-brand-navy">
                    Your learning dashboard
                  </h3>
                  <UserDashboard userId={userId} apiBase={apiBase} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
