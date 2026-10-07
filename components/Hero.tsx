import { ArrowRight, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-white px-4 pb-24 pt-16 md:px-6 md:pt-28"
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-light/50 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left copy */}
        <div className="text-center lg:text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-light bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Workforce Intelligence
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Know where you stand.{' '}
            <span className="text-primary">Close the gap.</span> Get hired.
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted lg:mx-0">
            SkillPilot matches your skills against real data roles, predicts your
            salary-hike and success potential, and builds a step-by-step roadmap.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-primary-hover"
            >
              Analyze My Skills
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 shadow-sm transition hover:border-primary-light hover:bg-surface"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Right preview card */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-full">
          <div className="relative rounded-3xl border border-primary-light bg-white/80 p-6 shadow-xl shadow-orange-100 backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Target role</p>
                <p className="text-lg font-bold text-gray-900">Data Scientist</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                <TrendingUp className="h-4 w-4" />
                Live
              </span>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Coverage</span>
                  <span className="font-bold text-primary">24.8%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[24.8%] rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Gap Score</span>
                  <span className="font-bold text-primary">75.2%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[75.2%] rounded-full bg-secondary" />
                </div>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {['machine learning', 'python', 'sql', 'deep learning'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-surface p-4 text-center">
                <Target className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-xs text-muted">Missing</p>
                <p className="text-xl font-bold text-gray-900">61</p>
              </div>
              <div className="rounded-2xl bg-surface p-4 text-center">
                <Zap className="mx-auto mb-2 h-5 w-5 text-primary" />
                <p className="text-xs text-muted">Recommended</p>
                <p className="text-xl font-bold text-gray-900">30</p>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-primary-light bg-white p-4 shadow-lg md:block">
            <p className="text-xs text-muted">Salary hike prediction</p>
            <p className="text-lg font-bold text-primary">High potential</p>
          </div>
        </div>
      </div>
    </section>
  );
}
