import { useState, FormEvent } from 'react';
import { Loader2, Building2 } from 'lucide-react';
import { ROLES, Department } from './types';

interface DepartmentFormProps {
  apiBase: string;
  onCreated: (dept: Department) => void;
  onError: (msg: string) => void;
}

export function DepartmentForm({
  apiBase,
  onCreated,
  onError,
}: DepartmentFormProps) {
  const [name, setName] = useState('');
  const [targetRole, setTargetRole] = useState('data_scientist');
  const [budget, setBudget] = useState('');
  const [horizon, setHorizon] = useState('12');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    onError('');

    try {
      const res = await fetch(`${apiBase}/enterprise/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          name,
          target_role: targetRole,
          budget: Number(budget),
          time_horizon_months: Number(horizon),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || `Server returned ${res.status}`);
      }

      onCreated(data as Department);
      setName('');
      setBudget('');
      setHorizon('12');
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to create department');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-primary-light bg-white p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="inline-flex rounded-2xl bg-surface p-3 text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Department setup</h2>
          <p className="text-sm text-muted">Create a department for workforce planning.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Department name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. AI Team"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Target role
          </label>
          <select
            required
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Budget (LPA)
          </label>
          <input
            type="number"
            required
            min={0}
            step={0.1}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="50"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Time horizon (months)
          </label>
          <input
            type="number"
            required
            min={1}
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Department'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
