import { useState, FormEvent } from 'react';
import { Loader2, Plus, RefreshCw, UserPlus, Trash2, Users } from 'lucide-react';
import { Candidate, Department, ROLES } from './types';

interface CandidateManagerProps {
  department: Department;
  apiBase: string;
  onUpdate: (dept: Department) => void;
  onError: (msg: string) => void;
  onInfo?: (msg: string) => void;
}

export function CandidateManager({
  department,
  apiBase,
  onUpdate,
  onError,
  onInfo,
}: CandidateManagerProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState(department.target_role);
  const [skills, setSkills] = useState('');
  const [salary, setSalary] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingRegen, setLoadingRegen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setLoadingAdd(true);
    onError('');

    try {
      const res = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/candidates`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            name,
            role,
            skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
            expected_salary: Number(salary),
          }),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || `Server returned ${res.status}`);
      }

      const candidate = data as Candidate;
      onUpdate({
        ...department,
        candidates: [...department.candidates, candidate],
      });
      setName('');
      setSkills('');
      setSalary('');
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to add candidate');
    } finally {
      setLoadingAdd(false);
    }
  }

  async function handleRegenerate() {
    setLoadingRegen(true);
    onError('');

    try {
      const res = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/generate-candidates`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || `Server returned ${res.status}`);
      }

      onUpdate(data as Department);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to regenerate candidates');
    } finally {
      setLoadingRegen(false);
    }
  }

  async function handleDelete(candidateId: number) {
    setDeletingId(candidateId);
    onError('');

    try {
      const res = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/candidates/${candidateId}`,
        {
          method: 'DELETE',
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );

      if (res.ok) {
        // Try to refresh full department state from report
        const reportRes = await fetch(
          `${apiBase}/enterprise/departments/${department.department_id}/report`,
          {
            headers: { 'ngrok-skip-browser-warning': 'true' },
          }
        );
        if (reportRes.ok) {
          const report = await reportRes.json();
          onUpdate(report.department as Department);
        } else {
          onUpdate({
            ...department,
            candidates: department.candidates.filter((c) => c.id !== candidateId),
          });
        }
      } else {
        // Backend may not support delete; remove from local view and notify
        onUpdate({
          ...department,
          candidates: department.candidates.filter((c) => c.id !== candidateId),
        });
        onInfo?.(
          'Candidate removed from planner view. If the backend does not support deletes, it may still be used in the plan.'
        );
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to delete candidate');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-3xl border border-primary-light bg-white p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-2xl bg-surface p-3 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Candidates</h2>
            <p className="text-sm text-muted">
              {department.candidates.length > 0
                ? `${department.candidates.length} candidate(s)`
                : 'Auto-generated and manual external hire candidates.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={loadingRegen}
          className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-light disabled:opacity-60"
        >
          {loadingRegen ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Regenerate
        </button>
      </div>

      {department.candidates.length > 0 && (
        <div className="mb-6 space-y-3">
          {department.candidates.map((c) => (
            <div
              key={c.id}
              className="flex flex-col gap-3 rounded-2xl border border-primary-light bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      c.source === 'auto'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {c.source}
                  </span>
                </div>
                <p className="text-sm text-muted">
                  {c.expected_salary} LPA · {c.skills.slice(0, 5).join(', ')}
                  {c.skills.length > 5 && '...'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                disabled={deletingId === c.id}
                className="inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:self-auto"
              >
                {deletingId === c.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-primary-light bg-surface p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <UserPlus className="h-4 w-4" />
          Add manual candidate
        </h3>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skills (comma separated)"
            className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <input
            type="number"
            required
            min={0}
            step={0.1}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Expected salary (LPA)"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          <button
            type="submit"
            disabled={loadingAdd}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            {loadingAdd ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
}
