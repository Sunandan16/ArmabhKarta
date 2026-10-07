'use client';

import { useEffect, useState, FormEvent } from 'react';
import { Loader2, AlertCircle, CheckCircle2, RefreshCw, Upload } from 'lucide-react';
import { UserDashboard } from './UserDashboard';

const roles = [
  { value: 'data_scientist', label: 'Data Scientist' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'data_engineer', label: 'Data Engineer' },
  { value: 'ml_engineer', label: 'ML Engineer' },
];

interface AnalysisResult {
  coverage?: number;
  gap_score?: number;
  num_missing?: number;
  predictions?: {
    salary_hike?: { label?: string; probability?: number };
    success?: { label?: string; probability?: number };
  };
  recommended_skills?: string[];
  current_skills?: string[];
  roadmap?: string[];
  llm?: {
    summary?: string;
    key_insights?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function formatValue(value: unknown, format: string): string {
  if (value === undefined || value === null) return '—';
  if (format === 'percentage') {
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (Number.isNaN(num)) return '—';
    return `${(num * 100).toFixed(1)}%`;
  }
  if (format === 'number') {
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (Number.isNaN(num)) return '—';
    return `${Math.round(num)}`;
  }
  return String(value);
}

const resultCards = [
  { label: 'Coverage', key: 'coverage', format: 'percentage' },
  { label: 'Gap Score', key: 'gap_score', format: 'percentage' },
  { label: 'Missing Skills', key: 'num_missing', format: 'number' },
  { label: 'Salary Hike', key: 'predictions.salary_hike.label', format: 'badge' },
  { label: 'Success', key: 'predictions.success.label', format: 'badge' },
];

export function Demo() {
  const [text, setText] = useState('');
  const [role, setRole] = useState('data_scientist');
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'text' | 'resume'>('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('skillpilot_user_id') : null;
    if (saved) setUserId(saved);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    if (!apiBase) {
      setLoading(false);
      setError('API URL is not configured. Set NEXT_PUBLIC_API_URL in your environment.');
      return;
    }

    try {
      let data: AnalysisResult & { user_id?: string };
      const headers: Record<string, string> = {
        'ngrok-skip-browser-warning': 'true',
      };

      if (mode === 'resume') {
        if (!file) {
          setLoading(false);
          setError('Please upload a PDF resume.');
          return;
        }
        const form = new FormData();
        form.append('file', file);
        form.append('role', role);
        const res = await fetch(`${apiBase}/upload-resume`, {
          method: 'POST',
          headers,
          body: form,
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || `Server returned ${res.status}`);
        }
        const uploadData = await res.json();
        data = uploadData.analysis;
        if (uploadData.user_id) {
          setUserId(uploadData.user_id);
          localStorage.setItem('skillpilot_user_id', uploadData.user_id);
        }
      } else {
        const res = await fetch(`${apiBase}/analyze`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, role }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || `Server returned ${res.status}`);
        }
        data = await res.json();
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reach the backend.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demo" className="bg-white px-4 py-20 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Try SkillPilot</h2>
          <p className="mx-auto max-w-2xl text-muted">
            Enter your background or upload your resume, choose a target role, and see your skill gap analysis.
          </p>
        </div>

        <div className="rounded-2xl border border-primary-light bg-surface p-6 shadow-card md:p-8">
          <div className="mb-6 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setMode('text')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                mode === 'text'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Type Background
            </button>
            <button
              type="button"
              onClick={() => setMode('resume')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                mode === 'resume'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Upload Resume
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'text' ? (
              <div>
                <label
                  htmlFor="background"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Describe your background
                </label>
                <textarea
                  id="background"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g. I know Python, SQL, machine learning, pandas, numpy, and Tableau."
                  className="w-full resize-none rounded-xl border border-primary-light bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
              </div>
            ) : (
              <div>
                <label
                  htmlFor="resume"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Upload your resume (PDF)
                </label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full rounded-xl border border-primary-light bg-white px-4 py-3 text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-hover"
                />
              </div>
            )}

            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-semibold text-gray-900">
                Target role
              </label>
              <select
                id="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-primary-light bg-white px-4 py-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || (mode === 'text' ? !text.trim() : !file)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : mode === 'resume' ? (
                <>
                  <Upload className="h-5 w-5" />
                  Upload & Analyze
                </>
              ) : (
                'Analyze Skills'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Analysis failed</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-10 space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {resultCards.map((card) => {
                  const value = getNestedValue(result, card.key);
                  const isBadge = card.format === 'badge';
                  return (
                    <div
                      key={card.key}
                      className="rounded-xl border border-primary-light bg-white p-5 text-center shadow-sm"
                    >
                      <p className="mb-1 text-sm font-medium text-muted">{card.label}</p>
                      {isBadge ? (
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                            String(value).toLowerCase().includes('high') ||
                            String(value).toLowerCase().includes('yes')
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {formatValue(value, card.format)}
                        </span>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">
                          {formatValue(value, card.format)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {Array.isArray(result.recommended_skills) && result.recommended_skills.length > 0 && (
                <div className="rounded-xl border border-primary-light bg-white p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    Recommended skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.recommended_skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-sm font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(result.roadmap) && result.roadmap.length > 0 && (
                <div className="rounded-xl border border-primary-light bg-white p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Your roadmap
                  </h3>
                  <ul className="space-y-2">
                    {result.roadmap.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.llm?.summary && (
                <div className="rounded-xl border border-primary-light bg-white p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Summary</h3>
                  <p className="leading-relaxed text-gray-700">{result.llm.summary}</p>
                </div>
              )}

              {Array.isArray(result.llm?.key_insights) && result.llm.key_insights.length > 0 && (
                <div className="rounded-xl border border-primary-light bg-white p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Key insights</h3>
                  <ul className="list-inside list-disc space-y-1 text-gray-700">
                    {result.llm.key_insights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {userId && (
                <div className="rounded-xl border-2 border-primary-light bg-white p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Your learning dashboard</h3>
                  <UserDashboard userId={userId} apiBase={apiBase || ''} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
