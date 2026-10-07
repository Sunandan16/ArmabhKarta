'use client';

import { useState, FormEvent } from 'react';
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

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
  { label: 'Coverage', key: 'coverage', format: 'percentage', color: 'bg-primary' },
  { label: 'Gap Score', key: 'gap_score', format: 'percentage', color: 'bg-secondary' },
  { label: 'Missing Skills', key: 'num_missing', format: 'number' },
  { label: 'Salary Hike', key: 'predictions.salary_hike.label', format: 'badge' },
  { label: 'Success', key: 'predictions.success.label', format: 'badge' },
];

export function Demo() {
  const [text, setText] = useState('');
  const [role, setRole] = useState('data_scientist');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    if (!apiBase) {
      setLoading(false);
      setError(
        'API URL is not configured. Set NEXT_PUBLIC_API_URL in your environment.'
      );
      return;
    }

    try {
      const res = await fetch(`${apiBase}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ text, role }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.detail || `Server returned ${res.status}. Please try again.`
        );
      }

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to reach the backend. Make sure your local FastAPI server is running and ngrok is active.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demo" className="bg-surface px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-5">
          {/* Left intro */}
          <div className="lg:col-span-2">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Live Demo
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Try SkillPilot
            </h2>
            <p className="mb-8 text-muted">
              Enter your background, choose a target role, and see your skill
              gap analysis instantly.
            </p>
            <div className="space-y-4 rounded-3xl border border-primary-light bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  1
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Paste your skills and experience
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  2
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Pick your target data role
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  3
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Get predictions + a learning roadmap
                </p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-primary-light bg-white p-6 shadow-xl shadow-orange-100 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="background"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Describe your background
                  </label>
                  <textarea
                    id="background"
                    rows={5}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g. I know Python, SQL, machine learning, pandas, numpy, and Tableau."
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Target role
                  </label>
                  <select
                    id="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
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
                  disabled={loading || !text.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Skills
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {error && (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Analysis failed</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="mt-10 space-y-8">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resultCards.map((card) => {
                      const value = getNestedValue(result, card.key);
                      const isBadge = card.format === 'badge';
                      const isPercentage = card.format === 'percentage';
                      return (
                        <div
                          key={card.key}
                          className="rounded-2xl border border-primary-light bg-surface p-5"
                        >
                          <p className="mb-2 text-sm font-medium text-muted">
                            {card.label}
                          </p>
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
                            <div>
                              <p className="mb-2 text-2xl font-bold text-gray-900">
                                {formatValue(value, card.format)}
                              </p>
                              {isPercentage && (
                                <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                                  <div
                                    className={`h-full rounded-full ${card.color}`}
                                    style={{
                                      width: formatValue(value, 'percentage'),
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {Array.isArray(result.recommended_skills) &&
                    result.recommended_skills.length > 0 && (
                      <div className="rounded-2xl border border-primary-light bg-white p-6">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                          <Lightbulb className="h-5 w-5 text-primary" />
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
                    <div className="rounded-2xl border border-primary-light bg-white p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Your roadmap
                      </h3>
                      <ul className="space-y-3">
                        {result.roadmap.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
