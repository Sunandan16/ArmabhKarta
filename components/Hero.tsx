import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white px-4 pb-20 pt-16 md:px-6 md:pt-24"
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary-light blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-light blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-light bg-surface px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          AI-Powered Workforce Intelligence
        </span>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-6xl">
          Know where you stand. Close the gap. Get hired.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted md:text-xl">
          SkillPilot matches your skills against real data roles, predicts your
          salary-hike and success potential, and builds a step-by-step roadmap.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-primary-hover"
          >
            Analyze My Skills
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-light bg-white px-6 py-3 text-base font-semibold text-primary shadow-card transition hover:bg-surface"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
