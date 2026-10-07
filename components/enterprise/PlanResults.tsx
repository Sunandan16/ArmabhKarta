import { useState } from 'react';
import { Download, Loader2, X, FileText, TrendingUp, DollarSign, PieChart, Award } from 'lucide-react';
import { Department, Plan, WorthItAnalysis, Report } from './types';

interface PlanResultsProps {
  department: Department;
  plan: Plan;
  worthIt: WorthItAnalysis;
  apiBase: string;
  onError: (msg: string) => void;
}

export function PlanResults({
  department,
  plan,
  worthIt,
  apiBase,
  onError,
}: PlanResultsProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  async function loadReport() {
    setLoadingReport(true);
    onError('');
    try {
      const res = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/report`,
        {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || `Server returned ${res.status}`);
      }
      setReport(data as Report);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to load report');
    } finally {
      setLoadingReport(false);
    }
  }

  function closeReport() {
    setReport(null);
  }

  const verdictPositive =
    worthIt.verdict.toLowerCase().includes('worth') ||
    worthIt.verdict.toLowerCase().includes('yes');

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary-light bg-white p-6 shadow-card md:p-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Workforce plan</h2>
            <p className="text-sm text-muted">
              Build-vs-buy recommendations for {department.name}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold ${
              verdictPositive
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            <Award className="h-4 w-4" />
            {worthIt.verdict}
          </span>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={DollarSign}
            label="Total cost"
            value={`${plan.total_cost.toFixed(2)} LPA`}
          />
          <SummaryCard
            icon={PieChart}
            label="Budget remaining"
            value={`${plan.budget_remaining.toFixed(2)} LPA`}
          />
          <SummaryCard
            icon={TrendingUp}
            label="Coverage"
            value={`${(plan.coverage * 100).toFixed(0)}%`}
          />
          <SummaryCard
            icon={Award}
            label="Success probability"
            value={`${(plan.success_probability * 100).toFixed(0)}%`}
          />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-primary-light bg-surface p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted">Build cost</p>
            <p className="text-xl font-bold text-primary">{plan.build_cost.toFixed(2)} LPA</p>
          </div>
          <div className="rounded-2xl border border-primary-light bg-surface p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted">Buy cost</p>
            <p className="text-xl font-bold text-primary">{plan.buy_cost.toFixed(2)} LPA</p>
          </div>
          <div className="rounded-2xl border border-primary-light bg-surface p-4 text-center">
            <p className="text-xs uppercase tracking-wide text-muted">EFV score</p>
            <p className="text-xl font-bold text-primary">{plan.efv_score.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-primary-light bg-surface p-5">
          <p className="text-sm font-semibold text-muted">AI recommendation</p>
          <p className="mt-2 leading-relaxed text-gray-800">{plan.recommendation}</p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recommended actions</h3>
          <button
            type="button"
            onClick={loadReport}
            disabled={loadingReport}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
          >
            {loadingReport ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download report
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-primary-light">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Action</th>
                <th className="px-4 py-3 font-semibold">Person / Skill</th>
                <th className="px-4 py-3 font-semibold">Cost (LPA)</th>
                <th className="px-4 py-3 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-light bg-white">
              {plan.actions.map((action, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        action.type === 'hire'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {action.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {action.type === 'hire'
                      ? action.candidate_name || `Candidate #${action.candidate_id}`
                      : `Employee #${action.employee_id} → ${action.skill}`}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {action.cost.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {action.duration_months ? `${action.duration_months} months` : 'Immediate'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {report && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Workforce plan report</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light"
                >
                  <FileText className="h-4 w-4" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={closeReport}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="space-y-6 print:block">
              <div className="rounded-2xl border border-primary-light bg-surface p-5">
                <p className="text-sm font-semibold text-muted">Department</p>
                <p className="text-lg font-bold text-gray-900">{report.department.name}</p>
                <p className="text-sm text-muted">
                  Target role: {report.department.target_role} · Budget:{' '}
                  {report.department.budget} LPA · Horizon:{' '}
                  {report.department.time_horizon_months} months
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary-light bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Total cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {report.plan.total_cost.toFixed(2)} LPA
                  </p>
                </div>
                <div className="rounded-2xl border border-primary-light bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Budget remaining</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {report.plan.budget_remaining.toFixed(2)} LPA
                  </p>
                </div>
                <div className="rounded-2xl border border-primary-light bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Coverage</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(report.plan.coverage * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="rounded-2xl border border-primary-light bg-white p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Predicted success</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(report.plan.success_probability * 100).toFixed(0)}%
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-primary-light bg-white p-5">
                <p className="text-sm font-semibold text-muted">Worth-it verdict</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {report.worth_it_analysis.verdict}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  <li>
                    Budget used: {(report.worth_it_analysis.budget_used * 100).toFixed(0)}%
                  </li>
                  <li>ROI score: {report.worth_it_analysis.roi_score.toFixed(2)}</li>
                  <li>
                    Estimated savings vs full external hire:{' '}
                    {report.worth_it_analysis.savings_vs_full_external_hire_estimate.toFixed(2)} LPA
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-bold text-gray-900">Actions</h4>
                <ul className="space-y-2">
                  {report.plan.actions.map((action, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-primary-light bg-white p-3"
                    >
                      <span className="font-medium text-gray-900">
                        {action.type === 'hire'
                          ? `Hire ${action.candidate_name || `#${action.candidate_id}`}`
                          : `Upskill employee #${action.employee_id} in ${action.skill}`}
                      </span>
                      <span className="text-sm text-muted">
                        {action.cost.toFixed(2)} LPA
                        {action.duration_months ? ` · ${action.duration_months} months` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-primary-light bg-surface p-5">
                <p className="text-sm font-semibold text-muted">Recommendation</p>
                <p className="mt-2 leading-relaxed text-gray-800">
                  {report.plan.recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-primary-light bg-surface p-4">
      <div className="inline-flex rounded-xl bg-white p-2.5 text-primary shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
