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
    <section id="how-it-works" className="bg-white px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            From text to roadmap in four simple steps.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
