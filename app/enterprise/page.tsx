'use client';

import { useState } from 'react';
import { Loader2, Play, Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { DepartmentForm } from '@/components/enterprise/DepartmentForm';
import { EmployeeUpload } from '@/components/enterprise/EmployeeUpload';
import { CandidateManager } from '@/components/enterprise/CandidateManager';
import { PlanResults } from '@/components/enterprise/PlanResults';
import { Department, Plan, WorthItAnalysis } from '@/components/enterprise/types';

export default function EnterprisePage() {
  const [department, setDepartment] = useState<Department | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [worthIt, setWorthIt] = useState<WorthItAnalysis | null>(null);
  const [planning, setPlanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  function clearMessages() {
    setError(null);
    setInfo(null);
  }

  function handleDepartmentCreated(dept: Department) {
    setDepartment(dept);
    setPlan(null);
    setWorthIt(null);
    clearMessages();
  }

  function handleDepartmentUpdate(dept: Department) {
    setDepartment(dept);
    clearMessages();
  }

  async function runPlan() {
    if (!department || !apiBase) return;
    setPlanning(true);
    clearMessages();

    try {
      const planRes = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/plan`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      const planData = await planRes.json().catch(() => ({}));
      if (!planRes.ok) {
        throw new Error(planData.detail || `Server returned ${planRes.status}`);
      }

      // Load the report to get worth-it analysis and full department state
      const reportRes = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/report`,
        {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        }
      );
      const report = await reportRes.json().catch(() => ({}));
      if (!reportRes.ok) {
        throw new Error(report.detail || `Server returned ${reportRes.status}`);
      }

      setPlan(report.plan as Plan);
      setWorthIt(report.worth_it_analysis as WorthItAnalysis);
      setDepartment(report.department as Department);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run workforce plan');
    } finally {
      setPlanning(false);
    }
  }

  const canRunPlan =
    department &&
    department.employees.length > 0 &&
    department.candidates.length > 0;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-white px-4 pb-16 pt-12 md:px-6 md:pt-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to SkillPilot
          </Link>
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-2xl bg-surface p-3 text-primary">
              <Briefcase className="h-7 w-7" />
            </div>
            <span className="rounded-full border border-primary-light bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Enterprise
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Enterprise Workforce Planner
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Build vs. Buy workforce optimization for data teams. Create a
            department, upload your roster, add candidates, and let AI decide the
            optimal mix of upskilling and hiring.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Messages */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {info && (
            <div className="rounded-2xl border border-primary-light bg-surface p-4 text-primary">
              <p className="text-sm font-medium">{info}</p>
            </div>
          )}

          {!apiBase && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-semibold">API URL not configured</p>
              <p className="text-sm">
                Set NEXT_PUBLIC_API_URL in your environment before deploying.
              </p>
            </div>
          )}

          {/* Department setup */}
          {!department ? (
            apiBase && (
              <DepartmentForm
                apiBase={apiBase}
                onCreated={handleDepartmentCreated}
                onError={setError}
              />
            )
          ) : (
            <div className="rounded-3xl border border-primary-light bg-surface p-6 shadow-card md:p-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {department.name}
                  </h2>
                  <p className="text-muted">
                    {department.target_role.replace(/_/g, ' ')} · Budget{' '}
                    {department.budget} LPA · {department.time_horizon_months}{' '}
                    months
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDepartment(null);
                    setPlan(null);
                    setWorthIt(null);
                    clearMessages();
                  }}
                  className="rounded-full border border-primary-light bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white"
                >
                  New department
                </button>
              </div>
            </div>
          )}

          {department && apiBase && (
            <>
              <div className="grid gap-8 lg:grid-cols-2">
                <EmployeeUpload
                  department={department}
                  apiBase={apiBase}
                  onUpdate={handleDepartmentUpdate}
                  onError={setError}
                />
                <CandidateManager
                  department={department}
                  apiBase={apiBase}
                  onUpdate={handleDepartmentUpdate}
                  onError={setError}
                  onInfo={setInfo}
                />
              </div>

              <div className="rounded-3xl border border-primary-light bg-white p-6 shadow-card md:p-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Run workforce plan
                    </h2>
                    <p className="text-sm text-muted">
                      {canRunPlan
                        ? 'Ready to generate the optimal build-vs-buy plan.'
                        : 'Upload at least one employee and add at least one candidate to run the plan.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={runPlan}
                    disabled={!canRunPlan || planning}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {planning ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Planning...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        Run Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {department && plan && worthIt && apiBase && (
            <PlanResults
              department={department}
              plan={plan}
              worthIt={worthIt}
              apiBase={apiBase}
              onError={setError}
            />
          )}
        </div>
      </section>
    </main>
  );
}
