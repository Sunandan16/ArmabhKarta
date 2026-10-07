const stats = [
  {
    label: 'Skill Recovery Rate',
    value: '98.41%',
    description: '78,677 of 78,933 skill tokens successfully normalized',
  },
  {
    label: 'JDS Salary-Hike Accuracy',
    value: '86.32%',
    description: 'Best model: Logistic Regression (AUC 0.9055)',
  },
  {
    label: 'SDS Success Accuracy',
    value: '95.66%',
    description: 'Best model: XGBoost (AUC 0.9938)',
  },
  {
    label: 'Self-Label Validation',
    value: '92.31%',
    description: '12 of 13 manual samples correctly classified',
  },
];

const chartData = [
  { name: 'JDS Logistic Regression', value: 86.32 },
  { name: 'JDS Random Forest', value: 82.80 },
  { name: 'JDS XGBoost', value: 81.94 },
  { name: 'SDS Logistic Regression', value: 92.86 },
  { name: 'SDS Random Forest', value: 95.47 },
  { name: 'SDS XGBoost', value: 95.66 },
];

const maxValue = Math.max(...chartData.map((d) => d.value));

export function ModelPerformance() {
  return (
    <section id="results" className="bg-surface px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Model Performance
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            SkillPilot is built on validated behavioral models trained with
            repeated stratified cross-validation.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-primary-light bg-white p-6 text-center shadow-card"
            >
              <p className="mb-1 text-3xl font-extrabold text-primary">
                {stat.value}
              </p>
              <p className="mb-2 font-semibold text-gray-900">{stat.label}</p>
              <p className="text-sm text-muted">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-primary-light bg-white p-6 shadow-card md:p-8">
          <h3 className="mb-6 text-xl font-bold text-gray-900">
            Model accuracy comparison
          </h3>
          <div className="space-y-4">
            {chartData.map((item) => {
              const width = `${(item.value / maxValue) * 100}%`;
              return (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                    <span className="font-semibold text-primary">
                      {item.value.toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
