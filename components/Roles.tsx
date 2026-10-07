import { Briefcase, DollarSign } from 'lucide-react';

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
    <section id="roles" className="bg-white px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Supported roles
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            Market-driven skill profiles for four high-demand data careers.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-xl border border-primary-light bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                {role.name}
              </h3>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{role.postings.toLocaleString()} postings analyzed</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>Median {role.medianSalary}</span>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  Top skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.topSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex rounded-md bg-surface px-2 py-1 text-xs font-medium text-primary"
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
