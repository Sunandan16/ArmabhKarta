import { useState, FormEvent } from 'react';
import { Loader2, Upload, Users } from 'lucide-react';
import { Department, Employee } from './types';

interface EmployeeUploadProps {
  department: Department;
  apiBase: string;
  onUpdate: (dept: Department) => void;
  onError: (msg: string) => void;
}

export function EmployeeUpload({
  department,
  apiBase,
  onUpdate,
  onError,
}: EmployeeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      onError('Please select a CSV or Excel file.');
      return;
    }

    setLoading(true);
    onError('');

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch(
        `${apiBase}/enterprise/departments/${department.department_id}/employees`,
        {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          body: form,
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || `Server returned ${res.status}`);
      }

      const updated: Department = {
        ...department,
        employees: [...department.employees, ...(data.employees || [])],
      };
      onUpdate(updated);
      setFile(null);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to upload employees');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-primary-light bg-white p-6 shadow-card md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="inline-flex rounded-2xl bg-surface p-3 text-primary">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Employee roster</h2>
          <p className="text-sm text-muted">
            {department.employees.length > 0
              ? `${department.employees.length} employee(s) uploaded`
              : 'Upload a CSV or Excel file of current employees.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-900">
            Upload file (.csv, .xlsx)
          </label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-hover"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              Upload Employees
            </>
          )}
        </button>
      </form>

      {department.employees.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-primary-light">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Current skills</th>
                <th className="px-4 py-3 font-semibold">Salary (LPA)</th>
                <th className="px-4 py-3 font-semibold">Trainable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-light">
              {department.employees.map((emp, i) => (
                <tr key={i} className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {emp.name}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {emp.current_skills.slice(0, 4).join(', ')}
                    {emp.current_skills.length > 4 && '...'}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {emp.current_salary}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {emp.max_skills_to_train}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
