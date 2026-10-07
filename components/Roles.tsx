import { Briefcase, DollarSign, TrendingUp } from 'lucide-react';

const roles = [
  {
    id: 'data_scientist',
    name: 'Data Scientist',
    postings: 902,
    medianSalary: '16.6 LPA',
    topSkills: ['machine learning', 'data science', 'python', 'r', 'deep learning'],
  },
  {
    id: 'data_analyst',
    name: 'Data Analyst',
    postings: 4195,
    medianSalary: '8.6 LPA',
    topSkills: ['sql', 'analytics', 'r', 'business analysis', 'sas'],
  },
  {
    id: 'data_engineer',
    name: 'Data Engineer',
    postings: 511,
    medianSalary: '14.3 LPA',
    topSkills: ['hadoop', 'sql', 'spark', 'hive', 'python'],
  },
  {
    id: 'ml_engineer',
    name: 'ML Engineer',
    postings: 144,
    medianSalary: '9.1 LPA',
    topSkills: ['machine learning', 'python', 'java', 'c', 'r'],
  },
];

export function Roles() {
  return (
    <section id="roles" className="bg-surface px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Roles
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Supported roles
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            Market-driven skill profiles for four high-demand data careers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {roles.map((role) => (
            <div
              key={role.id}
              className="flex flex-col rounded-3xl border border-primary-light bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{role.name}</h3>
                <span className="rounded-full bg-surface px-3 py-1 text-sm font-semibold text-primary">
                  {role.postings.toLocaleString()} postings
                </span>
              </div>

              <div className="mb-6 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>Median {role.medianSalary}</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>High demand</span>
                </div>
              </div>

              <div className="mt-auto">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                  Top skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.topSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex rounded-full bg-surface px-3 py-1 text-sm font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
