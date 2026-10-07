const steps = [
  {
    number: 1,
    title: 'Describe yourself',
    description:
      'Enter your skills, experience, or a short bio in natural language.',
  },
  {
    number: 2,
    title: 'Normalize & map',
    description:
      'SkillPilot cleans your input, resolves aliases, and maps skills to a canonical dictionary with 98.4% recovery rate.',
  },
  {
    number: 3,
    title: 'Predict & compare',
    description:
      'Your mapped skills are compared to role requirements and fed into trained classifiers.',
  },
  {
    number: 4,
    title: 'Get your roadmap',
    description:
      'Receive a ranked list of missing skills and a phased learning plan.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[var(--background)] px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Pipeline
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand-navy md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto max-w-2xl text-brand-muted">
            From text to roadmap in four simple steps.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-8 hidden h-0.5 w-full bg-brand-border lg:block" />
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--background)] bg-primary text-2xl font-bold text-white shadow-lg shadow-orange-200">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
